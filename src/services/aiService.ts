import { GoogleGenAI } from '@google/genai';
import { AppError, ErrorMessages } from '@/lib/errorHandler';

const API_KEY = import.meta.env.VITE_GOOGLE_AI_API_KEY;

interface GenerateImageRequest {
  userScreenshot: string;
}

interface GenerateImageResponse {
  generatedImage: string;
}

const SYSTEM_INSTRUCTION = `Create a hyper-realistic 3D glass profile card held delicately between two fingers, set in a dimly lit environment with soft neon rim lighting inspired by the colors from the provided X (Twitter) profile image.

The card must exactly replicate the layout, proportions, and typography of the reference glass profile card — with pixel-perfect spacing, alignment, and icon positioning.

Profile Details (must be 100% accurate, no spelling or numerical mistakes):

Profile Picture: Use the exact profile picture from the input X profile image.
Name: From the input X profile image
Username: From the input X profile image
Bio Line: From the input X profile image
Website: From the input X profile image
Born: From the input X profile image
Joined: From the input X profile image
Following & Followers: The numbers must be exactly as shown in the input X profile image, with no changes or approximations.

Design Specifications:

Use the same glowing translucent glass card design and corner proportions as the reference card.

Text color: pure white (#FFFFFF), with correct hierarchy — bold name, lighter metadata.

Include the verified badge beside the name if it has.
Include Twitter/X-style icons for website, birth date, joined date, and verification — same design, size, and position as in the reference.
Do not include the banner image from the X profile.
All text, icons, and numerical values must maintain the same layout, scale, and typography as the reference glass card.
The background should be dark with subtle depth and soft bokeh, to highlight the glowing card.
The card edges must have a gradient neon glow blending orange and purple hues.
The hand should hold the card naturally at the same angle, orientation, and lighting as in the sample.
Do not include any buttons from the c profile image
The card should be properly filled with all the details from the input image. Any details must not be clipped

Visual Style:
Photorealistic and ultra-detailed
Cinematic lighting, soft depth of field
Sharp focus on card text and icons
Aspect ratio: 682x1024 pixels (portrait, 3:4 ratio)
Professional, elegant, and modern glowing aesthetic

CRITICAL: The inside of the glass card MUST be completely filled with all profile content. Ensure proper spacing and layout so that NO empty space remains inside the card boundaries. All profile information (name, username, bio, stats, metadata) should be visible and well-distributed within the card frame without any clipping or overflow.
`;

// Convert base64 data URL to just the base64 string
function extractBase64Data(dataUrl: string): string {
  if (dataUrl.includes(',')) {
    return dataUrl.split(',')[1];
  }
  return dataUrl;
}

// Determine MIME type from data URL
function getMimeType(dataUrl: string): string {
  if (dataUrl.includes('data:image/png')) {
    return 'image/png';
  } else if (dataUrl.includes('data:image/jpeg') || dataUrl.includes('data:image/jpg')) {
    return 'image/jpeg';
  }
  return 'image/jpeg';
}

// Load reference image from public folder and convert to base64
async function loadReferenceImage(): Promise<{ data: string; mimeType: string }> {
  try {
    const response = await fetch('/reference-card.png');
    if (!response.ok) {
      throw new Error('Reference image not found');
    }
    
    const blob = await response.blob();
    const mimeType = blob.type || 'image/png';
    
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        const base64Data = extractBase64Data(dataUrl);
        resolve({ data: base64Data, mimeType });
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error loading reference image:', error);
    throw new AppError(
      'Reference image not found. Please ensure reference-card.png is in the public folder.',
      'REFERENCE_IMAGE_MISSING',
      500
    );
  }
}

export async function generateCardWithAI(
  request: GenerateImageRequest
): Promise<GenerateImageResponse> {
  if (!API_KEY) {
    throw new AppError(
      'Google AI API key is not configured. Please add VITE_GOOGLE_AI_API_KEY to your .env file.',
      'API_KEY_MISSING',
      500
    );
  }

  try {
    const ai = new GoogleGenAI({
      apiKey: API_KEY,
    });

    const config = {
      responseModalities: ['IMAGE', 'TEXT'],
      imageConfig: {
        imageSize: '1K',
      },
      systemInstruction: [
        {
          text: SYSTEM_INSTRUCTION,
        },
      ],
    } as any; // Type assertion needed for SDK compatibility

    const model = 'gemini-2.5-flash-image';
    
    // Load reference image
    const referenceImage = await loadReferenceImage();
    
    // Prepare user screenshot
    const base64Data = extractBase64Data(request.userScreenshot);
    const mimeType = getMimeType(request.userScreenshot);

    const contents = [
      {
        role: 'user' as const,
        parts: [
          {
            text: 'Here is the reference glass card design to follow:',
          },
          {
            inlineData: {
              mimeType: referenceImage.mimeType,
              data: referenceImage.data,
            },
          },
          {
            text: 'Now, here is the X (Twitter) profile screenshot. Generate a glass card exactly like the reference, but with the profile information from this screenshot. Make it photorealistic with the hand holding it.',
          },
          {
            inlineData: {
              mimeType,
              data: base64Data,
            },
          },
        ],
      },
    ];

    const response = await ai.models.generateContentStream({
      model,
      config,
      contents,
    });

    let generatedImageData: string | null = null;
    let generatedMimeType: string | null = null;

    for await (const chunk of response) {
      if (!chunk.candidates || !chunk.candidates[0]?.content?.parts) {
        continue;
      }

      const inlineData = chunk.candidates[0].content.parts[0]?.inlineData;
      if (inlineData?.data) {
        generatedImageData = inlineData.data;
        generatedMimeType = inlineData.mimeType || 'image/png';
        break;
      }
    }

    if (!generatedImageData) {
      throw new AppError(
        'No image was generated. Please try again.',
        'NO_IMAGE_GENERATED',
        500
      );
    }

    // Convert back to data URL format
    const dataUrl = `data:${generatedMimeType};base64,${generatedImageData}`;

    return {
      generatedImage: dataUrl,
    };

  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    console.error('AI Service Error:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('API key') || error.message.includes('401')) {
        throw new AppError(
          'Invalid API key. Please check your Google AI API key configuration.',
          'INVALID_API_KEY',
          401
        );
      }
      
      if (error.message.includes('quota') || error.message.includes('429')) {
        throw new AppError(
          'API quota exceeded. Please try again later.',
          'QUOTA_EXCEEDED',
          429
        );
      }
    }

    throw new AppError(
      ErrorMessages.GENERATION_FAILED,
      'GENERATION_ERROR',
      500
    );
  }
}
