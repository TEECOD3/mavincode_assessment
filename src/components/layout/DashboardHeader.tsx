import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export const DashboardHeader = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">▶</span>
              </div>
              <span className="text-xl font-semibold text-gray-900">
                tobler
              </span>
            </div>

            <nav className="flex items-center space-x-6">
              <a
                href="#"
                className="flex items-center space-x-2 text-blue-500 border-b-2 border-blue-500 pb-4"
              >
                <span className="text-sm font-medium">🏠 Home</span>
              </a>
              <a
                href="#"
                className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 pb-4"
              >
                <span className="text-sm font-medium">🔧 Interface</span>
              </a>
              <a
                href="#"
                className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 pb-4"
              >
                <span className="text-sm font-medium">📦 Components</span>
              </a>
              <a
                href="#"
                className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 pb-4"
              >
                <span className="text-sm font-medium">📄 Pages</span>
              </a>
              <a
                href="#"
                className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 pb-4"
              >
                <span className="text-sm font-medium">📝 Forms</span>
              </a>
              <a
                href="#"
                className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 pb-4"
              >
                <span className="text-sm font-medium">🖼️ Gallery</span>
              </a>
              <a
                href="#"
                className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 pb-4"
              >
                <span className="text-sm font-medium">📚 Documentation</span>
              </a>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              className="text-blue-500 border-blue-500"
            >
              Source code
            </Button>

            <div className="relative">
              <Bell className="w-5 h-5 text-gray-500" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </div>

            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-gray-600">JP</span>
              </div>
              <div className="text-sm">
                <div className="font-medium text-gray-900">Jane Pearson</div>
                <div className="text-gray-500 text-xs">Administrator</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
