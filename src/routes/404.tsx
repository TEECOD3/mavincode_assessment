import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Component = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="relative">
            <h1 className="text-9xl font-bold text-gray-200 select-none">
              404
            </h1>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center animate-bounce">
                <Search className="w-12 h-12 text-white" />
              </div>
            </div>
            
            <div className="absolute top-4 left-8 w-4 h-4 bg-purple-400 rounded-full animate-pulse"></div>
            <div className="absolute top-12 right-12 w-6 h-6 bg-blue-400 rounded-full animate-pulse delay-300"></div>
            <div className="absolute bottom-8 left-12 w-3 h-3 bg-pink-400 rounded-full animate-pulse delay-700"></div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Oops! Page Not Found
          </h2>
          <p className="text-gray-600 leading-relaxed">
            The page you're looking for seems to have wandered off into the digital void. 
            Don't worry, it happens to the best of us!
          </p>
        </div>

        <div className="space-y-4">
          <Link to="/dashboard">
            <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
              <Home className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500">
            If you believe this is an error, please contact our support team or try refreshing the page.
          </p>
        </div>

        <div className="mt-6 text-xs text-gray-400">
          <p>Error Code: 404 • Page Not Found</p>
        </div>
      </div>
    </div>
  );
};

export default Component;