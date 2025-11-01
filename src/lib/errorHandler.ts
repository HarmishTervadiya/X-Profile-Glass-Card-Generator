export class AppError extends Error {
  public code?: string;
  public statusCode?: number;
  
  constructor(
    message: string,
    code?: string,
    statusCode?: number
  ) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.statusCode = statusCode;
  }
}

export const ErrorMessages = {
  RATE_LIMIT_EXCEEDED: 'You have reached your daily limit of 3 generations. Please try again tomorrow.',
  UPLOAD_FAILED: 'Failed to upload image. Please try again with a valid image file.',
  GENERATION_FAILED: 'Failed to generate card. Please try again or contact support.',
  API_ERROR: 'An error occurred while communicating with the AI service. Please try again.',
  INVALID_IMAGE: 'Invalid image format. Please upload a PNG or JPEG image.',
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  MAINTENANCE_MODE: 'The service is currently under maintenance. Please check back later.',
  UNKNOWN_ERROR: 'An unexpected error occurred. Please try again.',
  PASTE_UNAVAILABLE: 'We\'re unable to process pasted files right now. Please upload your file manually or try again after a few minutes — our servers are currently busy.',
  PASTE_PERMISSION_DENIED: 'Clipboard access was denied. Please check your browser permissions or use the upload button instead.',
  PASTE_NOT_SUPPORTED: 'Paste is not supported in your browser. Please use the upload button to select your file.',
  PASTE_GENERIC_ERROR: 'Unable to paste image. Please use the upload button to select your file manually.',
};

export function getErrorMessage(error: unknown): string {
  if (error instanceof AppError) {
    return error.message;
  }
  
  if (error instanceof Error) {
    const errorMessage = error.message.toLowerCase();
    
    // Check for specific error patterns
    if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
      return ErrorMessages.NETWORK_ERROR;
    }
    if (errorMessage.includes('api') || errorMessage.includes('401') || errorMessage.includes('403')) {
      return ErrorMessages.API_ERROR;
    }
    if (errorMessage.includes('quota') || errorMessage.includes('rate limit') || errorMessage.includes('exceeded') || errorMessage.includes('429')) {
      return ErrorMessages.RATE_LIMIT_EXCEEDED;
    }
    
    return error.message;
  }
  
  return ErrorMessages.UNKNOWN_ERROR;
}

export function handleError(error: unknown): { message: string; code?: string } {
  console.error('Application Error:', error);
  
  const message = getErrorMessage(error);
  const code = error instanceof AppError ? error.code : undefined;
  
  return { message, code };
}

/**
 * Handles clipboard paste errors with user-friendly messages
 */
export function handlePasteError(error: unknown): string {
  console.error('Paste error:', error);
  
  const errorMessage = error instanceof Error ? error.message.toLowerCase() : '';
  
  if (errorMessage.includes('quota') || errorMessage.includes('rate limit') || errorMessage.includes('exceeded') || errorMessage.includes('429')) {
    return ErrorMessages.PASTE_UNAVAILABLE;
  } else if (errorMessage.includes('permission') || errorMessage.includes('denied') || errorMessage.includes('not allowed')) {
    return ErrorMessages.PASTE_PERMISSION_DENIED;
  } else if (errorMessage.includes('not supported') || errorMessage.includes('not available')) {
    return ErrorMessages.PASTE_NOT_SUPPORTED;
  } else {
    return ErrorMessages.PASTE_GENERIC_ERROR;
  }
}