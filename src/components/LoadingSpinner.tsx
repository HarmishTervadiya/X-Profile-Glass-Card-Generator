import { Loader2 } from 'lucide-react';
import { Card, CardContent } from './ui/card';

interface LoadingSpinnerProps {
  text?: string;
}

const LoadingSpinner = ({ text }: LoadingSpinnerProps) => (
  <Card className="bg-white border-2 border-black shadow-lg max-w-md mx-auto">
    <CardContent className="p-8">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="h-12 w-12 text-black animate-spin" />
        <p className="text-black text-center font-medium">{text || 'Loading...'}</p>
      </div>
    </CardContent>
  </Card>
);

export default LoadingSpinner;

