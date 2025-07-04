import DashboardNavbar from "@/components/dashboard-navbar";
import {
  Camera,
  FolderPlus,
  QrCode,
  Share2,
  Users,
  Upload,
  Eye,
  Settings,
  Plus,
  ArrowRight,
} from "lucide-react";
import { redirect } from "next/navigation";
import { createClient } from "../../../supabase/server";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function Dashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Mock data for shared folders - in real implementation, this would come from Google Drive API
  const sharedFolders = [
    {
      id: 1,
      name: "Sarah's Wedding",
      createdAt: "2024-01-15",
      photoCount: 127,
      guestCount: 8,
      status: "active",
    },
    {
      id: 2,
      name: "Family Reunion 2024",
      createdAt: "2024-01-10",
      photoCount: 89,
      guestCount: 12,
      status: "active",
    },
  ];

  return (
    <>
      <DashboardNavbar />
      <main className="w-full bg-gradient-to-b from-blue-50/30 to-green-50/30 min-h-screen">
        <div className="container mx-auto px-4 py-8 flex flex-col gap-8">
          {/* Welcome Header */}
          <header className="text-center py-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Camera className="w-8 h-8 text-blue-600" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Welcome to PhotoShare
              </h1>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Create shared photo collections, invite guests, and preserve
              memories together. Start by creating your first shared folder.
            </p>
          </header>

          {/* Quick Actions */}
          <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-blue-200 hover:border-blue-300">
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FolderPlus className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">Create Folder</CardTitle>
                <CardDescription>
                  Start a new shared photo collection
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-green-200 hover:border-green-300">
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <QrCode className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-lg">Generate QR</CardTitle>
                <CardDescription>
                  Create QR codes for easy sharing
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-purple-200 hover:border-purple-300">
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Upload className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-lg">Upload Photos</CardTitle>
                <CardDescription>
                  Add photos to existing folders
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-orange-200 hover:border-orange-300">
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle className="text-lg">Invite Guests</CardTitle>
                <CardDescription>
                  Share folders with friends & family
                </CardDescription>
              </CardHeader>
            </Card>
          </section>

          {/* Main Action */}
          <section className="text-center py-8">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-4 text-lg"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Your First Shared Folder
            </Button>
          </section>

          {/* Existing Folders */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Your Shared Folders
              </h2>
              <Button variant="outline" className="flex items-center gap-2">
                <FolderPlus className="w-4 h-4" />
                New Folder
              </Button>
            </div>

            {sharedFolders.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sharedFolders.map((folder) => (
                  <Card
                    key={folder.id}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg mb-1">
                            {folder.name}
                          </CardTitle>
                          <CardDescription>
                            Created {folder.createdAt}
                          </CardDescription>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-1">
                          <Camera className="w-4 h-4" />
                          <span>{folder.photoCount} photos</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{folder.guestCount} guests</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Share2 className="w-4 h-4 mr-1" />
                          Share
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Camera className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    No shared folders yet
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Create your first shared folder to start collecting memories
                    with friends and family.
                  </p>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <FolderPlus className="w-4 h-4 mr-2" />
                    Create Folder
                  </Button>
                </CardContent>
              </Card>
            )}
          </section>

          {/* How It Works */}
          <section className="bg-white rounded-xl p-8 border shadow-sm">
            <h2 className="text-2xl font-bold text-center mb-8">
              How PhotoShare Works
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FolderPlus className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">1. Create Folder</h3>
                <p className="text-gray-600 text-sm">
                  Set up a shared Google Drive folder for your event or occasion
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">2. Invite Guests</h3>
                <p className="text-gray-600 text-sm">
                  Share QR codes or links so guests can easily join and upload
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Camera className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">3. Collect Memories</h3>
                <p className="text-gray-600 text-sm">
                  Everyone can upload photos and videos to create a shared
                  collection
                </p>
              </div>
            </div>
          </section>

          {/* User Info */}
          <section className="bg-white rounded-xl p-6 border shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold text-lg">
                  {user.email?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Signed in as</h3>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
