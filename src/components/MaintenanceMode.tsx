import { AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

export default function MaintenanceMode() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <Card className="max-w-md w-full bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <AlertTriangle className="h-16 w-16 text-yellow-500" />
          </div>
          <CardTitle className="text-2xl text-white">Under Maintenance</CardTitle>
          <CardDescription className="text-slate-300 text-base mt-2">
            We're currently performing scheduled maintenance to improve your experience.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-slate-400 mb-4">
            We'll be back shortly. Thank you for your patience!
          </p>
          <p className="text-sm text-slate-500">
            Expected downtime: Less than 1 hour
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
