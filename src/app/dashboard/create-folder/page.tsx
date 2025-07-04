import DashboardNavbar from "@/components/dashboard-navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FolderPlus, ArrowLeft, Camera, Users, Share2 } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "../../../../supabase/server";

export default async function CreateFolderPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

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
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <FolderPlus className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Create Shared Folder
                </h1>
                <p className="text-gray-600">
                  Set up a new Google Drive folder for photo sharing
                </p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Create Folder Form */}
            <Card>
              <CardHeader>
                <CardTitle>Folder Details</CardTitle>
                <CardDescription>
                  Provide information about your shared photo collection
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <form className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="folderName">Folder Name *</Label>
                    <Input
                      id="folderName"
                      name="folderName"
                      placeholder="e.g., Sarah's Wedding, Family Reunion 2024"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Tell guests what this collection is for..."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="eventDate">Event Date (Optional)</Label>
                    <Input id="eventDate" name="eventDate" type="date" />
                  </div>

                  <div className="space-y-4">
                    <Label>Folder Permissions</Label>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="viewOnly"
                          name="permissions"
                          value="view"
                          className="w-4 h-4 text-blue-600"
                        />
                        <Label
                          htmlFor="viewOnly"
                          className="text-sm font-normal"
                        >
                          View Only - Guests can only view and download photos
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="uploadEnabled"
                          name="permissions"
                          value="upload"
                          defaultChecked
                          className="w-4 h-4 text-blue-600"
                        />
                        <Label
                          htmlFor="uploadEnabled"
                          className="text-sm font-normal"
                        >
                          Upload Enabled - Guests can upload and view photos
                        </Label>
                      </div>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    size="lg"
                  >
                    <FolderPlus className="w-4 h-4 mr-2" />
                    Create Folder in Google Drive
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Preview & Next Steps */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="w-5 h-5" />
                    What Happens Next?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-blue-600 font-semibold text-sm">
                        1
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium">Folder Created</h4>
                      <p className="text-sm text-gray-600">
                        A new folder will be created in your Google Drive
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-green-600 font-semibold text-sm">
                        2
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium">Sharing Links Generated</h4>
                      <p className="text-sm text-gray-600">
                        Get shareable links and QR codes for easy access
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-purple-600 font-semibold text-sm">
                        3
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium">Invite Guests</h4>
                      <p className="text-sm text-gray-600">
                        Share with friends and family to start collecting
                        memories
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Quick Actions After Creation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/dashboard/generate-qr">
                    <Button variant="outline" className="w-full justify-start">
                      <Share2 className="w-4 h-4 mr-2" />
                      Generate QR Code
                    </Button>
                  </Link>
                  <Link href="/dashboard/invite-guests">
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="w-4 h-4 mr-2" />
                      Invite Guests
                    </Button>
                  </Link>
                  <Link href="/dashboard/upload-photos">
                    <Button variant="outline" className="w-full justify-start">
                      <Camera className="w-4 h-4 mr-2" />
                      Upload First Photos
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
