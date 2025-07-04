import DashboardNavbar from "@/components/dashboard-navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Upload,
  ArrowLeft,
  Camera,
  Image,
  Video,
  FileText,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "../../../../supabase/server";

export default async function UploadPhotosPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Mock data for existing folders
  const folders = [
    { id: 1, name: "Sarah's Wedding", photoCount: 127 },
    { id: 2, name: "Family Reunion 2024", photoCount: 89 },
  ];

  return (
    <>
      <DashboardNavbar />
      <main className="w-full bg-gradient-to-b from-blue-50/30 to-green-50/30 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link href="/dashboard">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Upload className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Upload Photos & Videos
                </h1>
                <p className="text-gray-600">
                  Add media to your shared folders
                </p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Upload Interface */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Select Destination</CardTitle>
                  <CardDescription>
                    Choose which folder to upload to
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Select name="folder">
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a shared folder" />
                    </SelectTrigger>
                    <SelectContent>
                      {folders.map((folder) => (
                        <SelectItem
                          key={folder.id}
                          value={folder.id.toString()}
                        >
                          {folder.name} ({folder.photoCount} photos)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upload Files</CardTitle>
                  <CardDescription>
                    Drag and drop or click to select photos and videos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-purple-400 transition-colors cursor-pointer">
                    <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">
                      Drop files here
                    </h3>
                    <p className="text-gray-600 mb-4">
                      or click to browse your device
                    </p>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      <Camera className="w-4 h-4 mr-2" />
                      Select Files
                    </Button>
                  </div>

                  <div className="mt-4 text-sm text-gray-500">
                    <p>Supported formats: JPG, PNG, GIF, MP4, MOV, AVI</p>
                    <p>Maximum file size: 100MB per file</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Upload Status & Info */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Upload Progress</CardTitle>
                  <CardDescription>Track your file uploads</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center py-8">
                      <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-500">No files selected</p>
                      <p className="text-sm text-gray-400">
                        Choose files to see upload progress
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="w-5 h-5" />
                    Upload Tips
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Batch Upload</h4>
                      <p className="text-sm text-gray-600">
                        Select multiple files at once for faster uploading
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Auto-Organize</h4>
                      <p className="text-sm text-gray-600">
                        Files are automatically organized by upload date
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Real-time Sync</h4>
                      <p className="text-sm text-gray-600">
                        All guests see new uploads instantly
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Supported File Types</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Image className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-sm">Photos</p>
                        <p className="text-xs text-gray-500">
                          JPG, PNG, GIF, HEIC
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Video className="w-5 h-5 text-purple-600" />
                      <div>
                        <p className="font-medium text-sm">Videos</p>
                        <p className="text-xs text-gray-500">MP4, MOV, AVI</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Recent Uploads */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Recent Uploads</CardTitle>
              <CardDescription>
                Your latest contributions to shared folders
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Camera className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500 mb-2">No recent uploads</p>
                <p className="text-sm text-gray-400">
                  Your uploaded files will appear here
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
