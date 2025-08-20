"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { HomeIcon, Search } from "lucide-react";

import CreateRequirement from "@/components/department/requirements/create-requirement";
import EditRequirement from "@/components/department/requirements/edit-requirements";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Types
interface Requirement {
  requirement_id: number;
  document_name: string;
  document_category: string;
  due_date: string;
  is_mandatory: string;
  status: boolean;
}

const RequirementsPage = () => {
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(""); // ✅ Search input state

  // ✅ Fetch requirements
  const fetchRequirements = async () => {
    try {
      const res = await fetch("http://localhost:5070/api/requirements");
      if (!res.ok) throw new Error("Failed to fetch requirements");
      const data: Requirement[] = await res.json();
      setRequirements(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequirements();
  }, []);

  // ✅ Handle update after PUT
  const handleRequirementUpdated = (updated: Requirement) => {
    setRequirements((prev) =>
      prev.map((r) =>
        r.requirement_id === updated.requirement_id ? updated : r
      )
    );
  };

  const filteredRequirements = requirements.filter(
    (req) =>
      req.document_name.toLowerCase().includes(search.toLowerCase()) ||
      req.document_category.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Requirements</h1>
        <p className="text-muted-foreground">
          Manage and track all pre-employment and onboarding requirements.
        </p>
      </div>

      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="flex items-center gap-1">
              <HomeIcon size={16} />
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/requirements" className="text-black">
              Requirements
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Search + Add */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="relative w-full sm:max-w-sm">
          <Input
            id="search"
            placeholder="Search requirements..."
            type="text"
            className="pl-9"
            value={search} // ✅ controlled input
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
        <CreateRequirement />
      </div>

      {/* Requirements Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredRequirements.length > 0 ? (
          filteredRequirements.map((req) => (
            <Card
              key={req.requirement_id}
              className="border shadow-sm hover:shadow-md transition-shadow"
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">
                      {req.document_name}
                    </CardTitle>
                    <CardDescription>{req.document_category}</CardDescription>
                  </div>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      req.status
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {req.status ? "Active" : "Inactive"}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>
                  <span className="font-medium">Due Date:</span> {req.due_date}
                </p>
                <p>
                  <span className="font-medium">Mandatory:</span>{" "}
                  {req.is_mandatory}
                </p>
              </CardContent>
              <CardFooter className="flex justify-end">
                <EditRequirement
                  requirement={req}
                  onUpdated={handleRequirementUpdated}
                />
              </CardFooter>
            </Card>
          ))
        ) : (
          <p className="text-gray-500">No requirements found.</p>
        )}
      </div>
    </div>
  );
};

export default RequirementsPage;
