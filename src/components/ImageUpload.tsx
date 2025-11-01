import React, { useRef, useEffect, useState } from 'react';
import { Upload, Image as ImageIcon, Clipboard } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

interface ImageUploadProps {
  onImageUpload: (imageDataUrl: string) => void;
  disabled?: boolean;
}

function ImageUpload({ onImageUpload, disabled = false }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [pasteSupported, setPasteSupported] = useState(true);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please upload a valid image file (PNG or JPEG)');
        return;
      }
      
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          onImageUpload(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    if (!disabled) {
      inputRef.current?.click();
    }
  };

  const handlePaste = async () => {
    // This is now handled by the ClipboardEvent listener
    // Keeping this function for the button click handler
    alert('Please use Ctrl+V to paste, or click "Upload File" to select an image.');
  };

  const processImageFile = (file: File) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please paste a valid image file (PNG or JPEG)');
      return false;
    }
    
    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('Image size must be less than 10MB');
      return false;
    }
    
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        onImageUpload(reader.result);
      }
    };
    reader.readAsDataURL(file);
    return true;
  };

  // Check clipboard API support and add global paste listener
  useEffect(() => {
    setPasteSupported('clipboard' in navigator && 'read' in navigator.clipboard);
    
    // Universal paste handler using ClipboardEvent (works for both file copies and screenshots)
    const handleClipboardPaste = async (e: ClipboardEvent) => {
      if (disabled) return;
      
      let handled = false;
      
      // First, try to get files from clipboardData (works for copied files)
      const items = e.clipboardData?.items;
      if (items) {
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          
          // Handle image files and blobs
          if (item.kind === 'file' && item.type.startsWith('image/')) {
            e.preventDefault();
            const file = item.getAsFile();
            
            if (file && processImageFile(file)) {
              handled = true;
              return;
            }
          }
        }
      }
      
      // If no files found, try Clipboard API (works for screenshots and web images)
      if (!handled) {
        try {
          const clipboardItems = await navigator.clipboard.read();
          
          for (const item of clipboardItems) {
            const imageTypes = item.types.filter(type => type.startsWith('image/'));
            
            if (imageTypes.length > 0) {
              e.preventDefault();
              const blob = await item.getType(imageTypes[0]);
              
              // Convert blob to file for consistent processing
              const file = new File([blob], 'pasted-image.png', { type: blob.type });
              
              if (processImageFile(file)) {
                handled = true;
                return;
              }
            }
          }
        } catch (err) {
          console.error('Clipboard API error:', err);
          
          // Provide user-friendly error messages
          const errorMessage = err instanceof Error ? err.message.toLowerCase() : '';
          
          if (errorMessage.includes('quota') || errorMessage.includes('rate limit') || errorMessage.includes('exceeded') || errorMessage.includes('429')) {
            alert('We\'re unable to process pasted files right now. Please upload your file manually or try again after a few minutes — our servers are currently busy.');
          } else if (errorMessage.includes('permission') || errorMessage.includes('denied') || errorMessage.includes('not allowed')) {
            alert('Clipboard access was denied. Please check your browser permissions or use the upload button instead.');
          } else if (errorMessage.includes('not supported') || errorMessage.includes('not available')) {
            alert('Paste is not supported in your browser. Please use the upload button to select your file.');
          }
          return;
        }
      }
      
      // If nothing was handled, show appropriate message
      if (!handled) {
        alert('No image found in clipboard. Please copy an image or use the upload button.');
      }
    };
    
    window.addEventListener('paste', handleClipboardPaste);
    
    return () => {
      window.removeEventListener('paste', handleClipboardPaste);
    };
  }, [disabled]);

  return (
    <div className="relative group">
      <div className="absolute -inset-1 bg-black rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-300"></div>
      <Card className="relative border-2 border-black bg-white hover:shadow-2xl transition-all">
        <CardContent className="p-8">
          <div className="flex flex-col items-center space-y-6">
            <div className="p-5 rounded-2xl bg-gray-100 border-2 border-black">
              <ImageIcon className="h-10 w-10 text-black" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-xl font-bold text-black">Upload or Paste Screenshot</h3>
              <p className="text-sm text-gray-600 max-w-md">
                Upload or paste (Ctrl+V) a screenshot of your profile page. Dark mode screenshots work best.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <Button 
                onClick={handleClick} 
                disabled={disabled}
                size="lg"
                className="flex-1 bg-black hover:bg-gray-800 text-white shadow-lg border-2 border-black"
              >
                <Upload className="mr-2 h-5 w-5" />
                Upload File
              </Button>
              
              {pasteSupported && (
                <Button 
                  onClick={handlePaste} 
                  disabled={disabled}
                  size="lg"
                  variant="outline"
                  className="flex-1 border-2 border-black text-black hover:bg-gray-100"
                >
                  <Clipboard className="mr-2 h-5 w-5" />
                  Paste (Ctrl+V)
                </Button>
              )}
            </div>
            
            <input
              type="file"
              ref={inputRef}
              id="screenshot-upload"
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              disabled={disabled}
              aria-label="Upload screenshot file"
            />
            <p className="text-xs text-gray-500 flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-black rounded-full"></span>
              Supported: PNG, JPEG • Max: 10MB • Press Ctrl+V to paste
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ImageUpload;