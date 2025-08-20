"use client";

import { useEffect, useState } from "react";
import api from "@/api/axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  HomeIcon,
  Search,
  Filter,
  Calendar,
  CheckCircle,
  XCircle,
  FileText,
  AlertTriangle,
  Clock,
  Users,
  TrendingUp,
  Grid3X3,
  List,
} from "lucide-react";

import CreateRequirement from "@/components/department/requirements/create-requirement";
import EditRequirement from "@/components/department/requirements/edit-requirements";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Fetch requirements
  const fetchRequirements = async () => {
    try {
      const res = await api.get<Requirement[]>("/requirements");
      setRequirements(res.data);
    } catch (err) {
      console.error("Error fetching requirements:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequirements();
  }, []);

  // Handle update after PUT
  const handleRequirementUpdated = (updated: Requirement) => {
    setRequirements((prev) =>
      prev.map((r) =>
        r.requirement_id === updated.requirement_id ? updated : r
      )
    );
  };

  // Enhanced filtering logic
  const filteredRequirements = requirements.filter((req) => {
    const matchesSearch =
      req.document_name.toLowerCase().includes(search.toLowerCase()) ||
      req.document_category.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && req.status) ||
      (statusFilter === "inactive" && !req.status);

    const matchesCategory =
      categoryFilter === "all" || req.document_category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Get unique categories for filter
  const categories = Array.from(
    new Set(requirements.map((req) => req.document_category))
  );

  // Calculate stats
  const stats = {
    total: requirements.length,
    active: requirements.filter((req) => req.status).length,
    inactive: requirements.filter((req) => !req.status).length,
    mandatory: requirements.filter(
      (req) => req.is_mandatory === "Yes" || req.is_mandatory === "true"
    ).length,
  };

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: any } = {
      Security: AlertTriangle,
      Health: FileText,
      Education: FileText,
      Legal: FileText,
      HR: Users,
    };
    const IconComponent = icons[category] || FileText;
    return <IconComponent size={16} />;
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  const isOverdue = (dateString: string) => {
    try {
      return new Date(dateString) < new Date();
    } catch {
      return false;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-lg font-medium text-gray-700">
                Loading requirements...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="space-y-8">
        {/* Enhanced Header with Stats */}
        <div className="relative overflow-hidden bg-white rounded-2xl border border-gray-200 shadow-sm">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
          <div className="relative p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                  Requirements
                </h1>
                <p className="mt-2 text-md text-gray-600">
                  Track and manage all pre-employment and onboarding
                  requirements
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-100">
                  <div className="text-2xl font-bold text-blue-700">
                    {stats.total}
                  </div>
                  <div className="text-sm text-blue-600">Total</div>
                </div>
                <div className="bg-green-50 rounded-xl p-4 text-center border border-green-100">
                  <div className="text-2xl font-bold text-green-700">
                    {stats.active}
                  </div>
                  <div className="text-sm text-green-600">Active</div>
                </div>
                <div className="bg-red-50 rounded-xl p-4 text-center border border-red-100">
                  <div className="text-2xl font-bold text-red-700">
                    {stats.inactive}
                  </div>
                  <div className="text-sm text-red-600">Inactive</div>
                </div>
                <div className="bg-yellow-50 rounded-xl p-4 text-center border border-yellow-100">
                  <div className="text-2xl font-bold text-yellow-700">
                    {stats.mandatory}
                  </div>
                  <div className="text-sm text-yellow-600">Mandatory</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Breadcrumb */}
        <div className="bg-white px-6 py-4 rounded-xl border border-gray-200 shadow-sm">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/"
                  className="flex items-center gap-2 hover:text-blue-600 transition-colors"
                >
                  <HomeIcon size={16} />
                  <span className="hidden sm:inline">Dashboard</span>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/requirements"
                  className="text-blue-600 font-medium"
                >
                  Requirements
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Enhanced Controls */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Input
                  placeholder="Search requirements..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>

              {/* Filters */}
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[130px] cursor-pointer">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all" className="cursor-pointer">
                      All Status
                    </SelectItem>
                    <SelectItem value="active" className="cursor-pointer">
                      Active
                    </SelectItem>
                    <SelectItem value="inactive" className="cursor-pointer">
                      Inactive
                    </SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={categoryFilter}
                  onValueChange={setCategoryFilter}
                >
                  <SelectTrigger className="w-[140px] cursor-pointer">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem
                        key={category}
                        value={category}
                        className="cursor-pointer"
                      >
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* View Toggle */}
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-md"
                >
                  <Grid3X3 size={16} />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-md"
                >
                  <List size={16} />
                </Button>
              </div>

              <CreateRequirement />
            </div>
          </div>
        </div>

        {/* Results Summary */}
        {search || statusFilter !== "all" || categoryFilter !== "all" ? (
          <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg px-4 py-3">
            <p className="text-sm text-blue-800">
              Showing{" "}
              <span className="font-medium">{filteredRequirements.length}</span>{" "}
              of <span className="font-medium">{requirements.length}</span>{" "}
              requirements
            </p>
            {(search || statusFilter !== "all" || categoryFilter !== "all") && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearch("");
                  setStatusFilter("all");
                  setCategoryFilter("all");
                }}
                className="text-blue-700 hover:text-blue-800"
              >
                Clear filters
              </Button>
            )}
          </div>
        ) : null}

        {/* Requirements Display */}
        {filteredRequirements.length > 0 ? (
          <div
            className={`${
              viewMode === "grid"
                ? "grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                : "space-y-4"
            }`}
          >
            {filteredRequirements.map((req) => (
              <Card
                key={req.requirement_id}
                className={`group hover:shadow-lg transition-all duration-200 border-gray-200 hover:border-gray-300 ${
                  viewMode === "list" ? "flex flex-row" : ""
                }`}
              >
                <CardHeader
                  className={`${viewMode === "list" ? "flex-1" : ""}`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-2 rounded-lg ${
                            req.status ? "bg-green-100" : "bg-gray-100"
                          }`}
                        >
                          {getCategoryIcon(req.document_category)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-xl font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                            {req.document_name}
                          </CardTitle>
                          <CardDescription className="text-sm text-gray-600 mt-1">
                            {req.document_category}
                          </CardDescription>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <Badge
                        variant={req.status ? "default" : "secondary"}
                        className={`${
                          req.status
                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                            : "bg-red-100 text-red-800 hover:bg-red-200"
                        }`}
                      >
                        {req.status ? (
                          <>
                            <CheckCircle size={12} className="mr-1" /> Active
                          </>
                        ) : (
                          <>
                            <XCircle size={12} className="mr-1" /> Inactive
                          </>
                        )}
                      </Badge>

                      {(req.is_mandatory === "Yes" ||
                        req.is_mandatory === "true") && (
                        <Badge
                          variant="outline"
                          className="bg-yellow-50 text-yellow-700 border-yellow-200"
                        >
                          Required
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>

                <CardContent
                  className={`pt-0 ${viewMode === "list" ? "flex-1" : ""}`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar size={14} className="text-gray-400" />
                      <span className="text-gray-600">Due:</span>
                      <span
                        className={`font-medium ${
                          isOverdue(req.due_date)
                            ? "text-red-600"
                            : "text-gray-900"
                        }`}
                      >
                        {formatDate(req.due_date)}
                      </span>
                      {isOverdue(req.due_date) && (
                        <Badge
                          variant="outline"
                          className="bg-red-50 text-red-700 border-red-200 text-xs"
                        >
                          Overdue
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="pt-0 flex justify-end">
                  <EditRequirement
                    requirement={req}
                    onUpdated={handleRequirementUpdated}
                  />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <FileText size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No requirements found
            </h3>
            <p className="text-gray-600 mb-6 max-w-sm mx-auto">
              {search || statusFilter !== "all" || categoryFilter !== "all"
                ? "Try adjusting your search or filters to find what you're looking for."
                : "Get started by creating your first requirement."}
            </p>
            {!search && statusFilter === "all" && categoryFilter === "all" && (
              <CreateRequirement />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RequirementsPage;
