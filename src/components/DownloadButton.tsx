import { Download, RefreshCw, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface DownloadButtonProps {
  imageDataUrl: string | null;
  onReset: () => void;
}

function DownloadButton({ imageDataUrl, onReset }: DownloadButtonProps) {
  if (!imageDataUrl) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageDataUrl;
    link.download = `x-profile-card-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="bg-white border-2 border-black shadow-lg max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-black">
          <CheckCircle2 className="h-6 w-6 text-black" />
          Your Glass Card is Ready!
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col space-y-6 justify-center items-center">
        {/* <div className="rounded-lg overflow-hidden border-2 border-black bg-gray-50"> */}
            <img 
              src={imageDataUrl} 
              alt="Generated X Profile Glass Card" 
              className="w-80 object-fit rounded-lg"
              
            />
        {/* </div> */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            onClick={handleDownload} 
            size="lg"
            className="flex-1 bg-black hover:bg-gray-800 text-white border-2 border-black"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Image
          </Button>
          <Button 
            onClick={onReset} 
            size="lg"
            variant="outline"
            className="flex-1 border-2 border-black text-black hover:bg-gray-100"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Create Another
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default DownloadButton;

