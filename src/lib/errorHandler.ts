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
};

export function getErrorMessage(error: unknown): string {
  if (error instanceof AppError) {
    return error.message;
  }
  
  if (error instanceof Error) {
    // Check for specific error patterns
    if (error.message.includes('network') || error.message.includes('fetch')) {
      return ErrorMessages.NETWORK_ERROR;
    }
    if (error.message.includes('API') || error.message.includes('401') || error.message.includes('403')) {
      return ErrorMessages.API_ERROR;
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
