import { useState } from 'react';
import { Sparkles } from 'lucide-react';

// Import Components
import BlogAnnouncement from './components/BlogAnnouncement';
import DownloadButton from './components/DownloadButton';
// import LoadingSpinner from './components/LoadingSpinner';
import MaintenanceMode from './components/MaintenanceMode';
import Footer from './components/Footer';

function App() {
  // Check maintenance mode
  const isMaintenanceMode = import.meta.env.VITE_MAINTENANCE_MODE === 'true';
  
  // Add types to our state hooks
  const [generatedCard, setGeneratedCard] = useState<string | null>(null);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [loadingText, setLoadingText] = useState<string>('');

  if (isMaintenanceMode) {
    return <MaintenanceMode />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 relative overflow-hidden">
      {/* Decorative circles in background */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-40 right-10 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      
      <div className="container mx-auto px-4 py-6 md:py-8 max-w-6xl relative z-10">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="h-7 w-7 text-black" />
            <h1 className="text-3xl md:text-4xl font-bold text-black">
              X Glass Card Generator
            </h1>
          </div>
          <p className="text-gray-600 text-base md:text-lg mb-6">
            Transform your X profile into stunning glass card designs
          </p>
          
          {/* Buy Me Chai Button - Prominent Position */}
          <a
            href={import.meta.env.VITE_RAZORPAY_LINK || 'https://razorpay.me/@yourusername'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <button className="bg-black text-white hover:bg-gray-800 font-semibold px-6 py-2.5 rounded-full shadow-lg transition-all duration-200 flex items-center gap-2 mx-auto transform hover:scale-105 text-sm">
              <span className="text-base">☕</span>
              <span>Buy Me Chai</span>
            </button>
          </a>
        </header>

        {/* Blog Post Announcement */}
        <BlogAnnouncement />

        {/* Loading State */}
        {/* {isLoading && <LoadingSpinner text={loadingText} />} */}

        {/* Download Section */}
        {generatedCard && (
          <DownloadButton 
            imageDataUrl={generatedCard} 
            onReset={() => {
              setGeneratedCard(null);
            }} 
          />
        )}

      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;