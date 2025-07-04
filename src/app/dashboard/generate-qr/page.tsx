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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  QrCode,
  ArrowLeft,
  Download,
  Copy,
  Share2,
  Smartphone,
  Camera,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "../../../../supabase/server";

export default async function GenerateQRPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Mock data for existing folders
  const folders = [
    { id: 1, name: "Sarah's Wedding", created: "2024-01-15" },
    { id: 2, name: "Family Reunion 2024", created: "2024-01-10" },
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
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <QrCode className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Generate QR Code
                </h1>
                <p className="text-gray-600">
                  Create QR codes for easy folder access
                </p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* QR Generator Form */}
            <Card>
              <CardHeader>
                <CardTitle>QR Code Settings</CardTitle>
                <CardDescription>
                  Select a folder and customize your QR code
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <form className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="folder">Select Folder *</Label>
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
                            {folder.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="qrSize">QR Code Size</Label>
                    <Select name="qrSize" defaultValue="medium">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small (200x200px)</SelectItem>
                        <SelectItem value="medium">
                          Medium (400x400px)
                        </SelectItem>
                        <SelectItem value="large">Large (600x600px)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="customText">Custom Text (Optional)</Label>
                    <Input
                      id="customText"
                      name="customText"
                      placeholder="e.g., Scan to share your photos!"
                    />
                  </div>

                  <Button
                    className="w-full bg-green-600 hover:bg-green-700"
                    size="lg"
                  >
                    <QrCode className="w-4 h-4 mr-2" />
                    Generate QR Code
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* QR Code Preview & Actions */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>QR Code Preview</CardTitle>
                  <CardDescription>
                    Your generated QR code will appear here
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <QrCode className="w-24 h-24 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 mb-2">QR Code Preview</p>
                    <p className="text-sm text-gray-400">
                      Select a folder to generate QR code
                    </p>
                  </div>

                  <div className="mt-6 space-y-3">
                    <Button className="w-full" variant="outline" disabled>
                      <Download className="w-4 h-4 mr-2" />
                      Download PNG
                    </Button>
                    <Button className="w-full" variant="outline" disabled>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Link
                    </Button>
                    <Button className="w-full" variant="outline" disabled>
                      <Share2 className="w-4 h-4 mr-2" />
                      Share QR Code
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Smartphone className="w-5 h-5" />
                    How to Use QR Codes
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
                      <h4 className="font-medium">Print or Display</h4>
                      <p className="text-sm text-gray-600">
                        Print QR codes for physical events or display on screens
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
                      <h4 className="font-medium">Guests Scan</h4>
                      <p className="text-sm text-gray-600">
                        Guests use their phone camera to scan the code
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
                      <h4 className="font-medium">Instant Access</h4>
                      <p className="text-sm text-gray-600">
                        Direct link to your shared photo folder
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Usage Tips */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="w-5 h-5" />
                QR Code Best Practices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">📱</span>
                  </div>
                  <h4 className="font-medium mb-2">Size Matters</h4>
                  <p className="text-sm text-gray-600">
                    Make QR codes at least 2x2 inches when printed for easy
                    scanning
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h4 className="font-medium mb-2">Strategic Placement</h4>
                  <p className="text-sm text-gray-600">
                    Place QR codes at eye level and in well-lit areas
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">💡</span>
                  </div>
                  <h4 className="font-medium mb-2">Add Instructions</h4>
                  <p className="text-sm text-gray-600">
                    Include simple text like &quot;Scan to share photos&quot;
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
