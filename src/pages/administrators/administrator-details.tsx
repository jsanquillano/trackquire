import CreateAdministrator from "@/components/administrators/create-administrator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HomeIcon } from "lucide-react";

export default function AdminDetails() {
  // Hard-coded data
  const admin = {
    fullName: "John Doe",
    gender: "Male",
    email: "john.doe@example.com",
    department: "Human Resources",
    role: "Administrator",
    dateCreated: "2024-07-01",
  };

  return (
    <div>
      <div className="mb-5">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                <HomeIcon size={16} aria-hidden="true" />
                <span className="sr-only">Home</span>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/administrators">
                Administrators
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Details</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="w-full mx-auto p-6 bg-white ">
        {/* Profile Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Avatar className="size-8">
              <AvatarImage
                src="https://raw.githubusercontent.com/origin-space/origin-images/refs/heads/main/exp1/user_sam4wh.png"
                width={32}
                height={32}
                alt="Profile image"
              />
              <AvatarFallback>KK</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl font-semibold">{admin.fullName}</h1>
              <p className="text-gray-500">{admin.email}</p>
            </div>
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Edit
          </button>
        </div>
        {/* Details Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <Label className="block text-gray-500 mb-2">Full Name</Label>
            <Input
              type="text"
              value={admin.fullName}
              readOnly
              className="w-full bg-gray-100 p-2 rounded"
            />
          </div>
          <div>
            <Label className="block text-gray-500 mb-2">Department</Label>
            <Input
              type="text"
              value={admin.department}
              readOnly
              className="w-full bg-gray-100 p-2 rounded"
            />
          </div>
          <div>
            <Label className="block text-gray-500 mb-2">Gender</Label>
            <Input
              type="text"
              value={admin.gender}
              readOnly
              className="w-full bg-gray-100 p-2 rounded"
            />
          </div>
          <div>
            <Label className="block text-gray-500 mb-2">Role</Label>
            <Input
              type="text"
              value={admin.role}
              readOnly
              className="w-full bg-gray-100 p-2 rounded"
            />
          </div>
          <div>
            <Label className="block text-gray-500 mb-2">Email Address</Label>
            <Input
              type="text"
              value={admin.email}
              readOnly
              className="w-full bg-gray-100 p-2 rounded"
            />
          </div>
          <div>
            <Label className="block text-gray-500 mb-2">Date Created</Label>
            <Input
              type="text"
              value={new Date(admin.dateCreated).toLocaleDateString()}
              readOnly
              className="w-full bg-gray-100 p-2 rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
