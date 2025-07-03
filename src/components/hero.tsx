import Link from "next/link";
import { ArrowUpRight, Check, Camera, Users, Share2 } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-white">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-green-50 opacity-70" />

      <div className="relative pt-24 pb-32 sm:pt-32 sm:pb-40">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-8">
              <div className="flex items-center gap-3 px-4 py-2 bg-blue-100 rounded-full text-blue-700 text-sm font-medium">
                <Camera className="w-4 h-4" />
                <span>Collaborative Media Sharing</span>
              </div>
            </div>

            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-8 tracking-tight">
              Share{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
                Memories
              </span>{" "}
              Together
            </h1>

            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Create shared Google Drive folders where you and your guests can
              upload and view photos and videos together. Perfect for events,
              parties, and special moments.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/dashboard"
                className="inline-flex items-center px-8 py-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
              >
                Start Sharing Now
                <ArrowUpRight className="ml-2 w-5 h-5" />
              </Link>

              <Link
                href="#features"
                className="inline-flex items-center px-8 py-4 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-lg font-medium"
              >
                See How It Works
              </Link>
            </div>

            <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>Google Drive integration</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>Real-time updates</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>Easy sharing with QR codes</span>
              </div>
            </div>

            {/* Visual elements */}
            <div className="mt-20 flex justify-center items-center gap-8 opacity-60">
              <div className="flex items-center gap-2 text-gray-500">
                <Users className="w-6 h-6" />
                <span className="text-sm">Invite Guests</span>
              </div>
              <div className="w-8 h-px bg-gray-300"></div>
              <div className="flex items-center gap-2 text-gray-500">
                <Camera className="w-6 h-6" />
                <span className="text-sm">Upload Media</span>
              </div>
              <div className="w-8 h-px bg-gray-300"></div>
              <div className="flex items-center gap-2 text-gray-500">
                <Share2 className="w-6 h-6" />
                <span className="text-sm">Share Memories</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
