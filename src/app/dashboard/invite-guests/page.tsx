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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Users,
  ArrowLeft,
  Send,
  Copy,
  Share2,
  Mail,
  MessageSquare,
  QrCode,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "../../../../supabase/server";

export default async function InviteGuestsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Mock data for existing folders
  const folders = [
    {
      id: 1,
      name: "Sarah's Wedding",
      guestCount: 8,
      link: "https://drive.google.com/folder/abc123",
    },
    {
      id: 2,
      name: "Family Reunion 2024",
      guestCount: 12,
      link: "https://drive.google.com/folder/def456",
    },
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
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Invite Guests
                </h1>
                <p className="text-gray-600">
                  Share your photo folders with friends and family
                </p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Invitation Form */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Send Invitations</CardTitle>
                  <CardDescription>
                    Invite people to contribute to your shared folder
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
                              {folder.name} ({folder.guestCount} guests)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="emails">Email Addresses *</Label>
                      <Textarea
                        id="emails"
                        name="emails"
                        placeholder="Enter email addresses separated by commas&#10;example@email.com, friend@email.com"
                        rows={4}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">
                        Personal Message (Optional)
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Add a personal note to your invitation..."
                        rows={3}
                      />
                    </div>

                    <Button
                      className="w-full bg-orange-600 hover:bg-orange-700"
                      size="lg"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Send Invitations
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Share Options</CardTitle>
                  <CardDescription>
                    Alternative ways to share your folder
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Folder Link
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Share via Text Message
                  </Button>
                  <Link href="/dashboard/generate-qr">
                    <Button variant="outline" className="w-full justify-start">
                      <QrCode className="w-4 h-4 mr-2" />
                      Generate QR Code
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Invitation Preview & Management */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Invitation Preview</CardTitle>
                  <CardDescription>
                    How your invitation will look to recipients
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 border rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">
                          You're Invited to Share Photos!
                        </h3>
                        <p className="text-sm text-gray-600">
                          From {user.email}
                        </p>
                      </div>
                    </div>
                    <div className="bg-white border rounded p-4 mb-4">
                      <h4 className="font-medium mb-2">[Folder Name]</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        [Your personal message will appear here]
                      </p>
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        View & Upload Photos
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500">
                      Recipients can upload photos and videos directly to your
                      Google Drive folder
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Guest Management</CardTitle>
                  <CardDescription>
                    Manage who has access to your folders
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {folders.map((folder) => (
                      <div key={folder.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{folder.name}</h4>
                          <span className="text-sm text-gray-500">
                            {folder.guestCount} guests
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            View Guests
                          </Button>
                          <Button variant="outline" size="sm">
                            <Copy className="w-3 h-3 mr-1" />
                            Copy Link
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    Invitation Tips
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
                      <h4 className="font-medium">Personal Touch</h4>
                      <p className="text-sm text-gray-600">
                        Add a personal message to increase participation
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
                      <h4 className="font-medium">Clear Instructions</h4>
                      <p className="text-sm text-gray-600">
                        Explain what the folder is for and when to upload
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
                      <h4 className="font-medium">Follow Up</h4>
                      <p className="text-sm text-gray-600">
                        Send reminders closer to your event date
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
