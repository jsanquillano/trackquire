import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  Table,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

import { Link, useParams } from "react-router-dom";
import CreateTrainee from "@/components/department/create-trainee";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { HomeIcon, ChevronDownIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CreateRequirement from "@/components/department/create-requirement";

const items = [
  {
    id: "1",
    documents: "Transcript of Record",
    category: "Pre-employment",
    last_modified: "8/11/2025",
    status: "Rejected",
    action: "View",
  },
  {
    id: "2",
    documents: "Diploma",
    category: "Pre-employment",
    last_modified: "8/11/2025",
    status: "Accepted",
    action: "View",
  },
  {
    id: "3",
    documents: "SSS E1 Form / SSS ID",
    category: "Pre-employment",
    last_modified: "8/11/2025",
    status: "Pending",
    action: "View",
  },
  {
    id: "4",
    documents: "TIN ID",
    category: "Pre-employment",
    last_modified: "8/11/2025",
    status: "Accepted",
    action: "View",
  },
  {
    id: "5",
    documents: "Pag-ibig MDF / Photocopy of ID",
    category: "Pre-employment",
    last_modified: "8/11/2025",
    status: "Accepted",
    action: "View",
  },
];

export default function TraineeDetails() {
  const { id } = useParams<{ id: string }>();
  const [selected, setSelected] = useState("Status");

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
              <BreadcrumbLink href="/departments">Departments</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/departments/trainees">
                Trainees
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Details</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex justify-between items-center my-4">
          <div className="*:not-first:mt-2 ">
            <Input id={id} placeholder="Search..." type="email" />
          </div>
          <CreateRequirement />
        </div>
      </div>
      <h1></h1>
      {/* <p>{}</p>
      <p>ID: {id}</p> */}
      <div className="bg-background overflow-hidden rounded-md border">
        <Table>
          <TableHeader className="bg-[#2b3692]">
            <TableRow className="hover:bg-transparent">
              <TableHead className="h-11 text-white">Documents</TableHead>
              <TableHead className="h-11 text-white">Category</TableHead>
              <TableHead className="h-11 text-white">Last Modified</TableHead>
              <TableHead className="h-11 text-white">Status</TableHead>
              <TableHead className="h-11 text-white text-right">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id} className="text-xs">
                <TableCell className="font-medium">{item.documents}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.last_modified}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="text-xs cursor-pointer "
                      >
                        {selected}
                        <ChevronDownIcon
                          className="-me-1 opacity-60"
                          size={16}
                          aria-hidden="true"
                        />
                      </Button>
                    </DropdownMenuTrigger>

                    {/* Keep same width as trigger */}
                    <DropdownMenuContent className="max-w-[50px] !text-center">
                      {["Pending", "Accepted", "Rejected", "Expired"].map(
                        (status) => (
                          <DropdownMenuItem
                            key={status}
                            onClick={() => setSelected(status)}
                            className="text-xs !text-center cursor-pointer"
                          >
                            {status}
                          </DropdownMenuItem>
                        )
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  {/* <Badge variant="outline" className="gap-1.5">
                    <span
                      className={`size-1.5 rounded-full ${
                        item.status === "Pending"
                          ? "bg-yellow-500"
                          : item.status === "Accepted"
                          ? "bg-emerald-500"
                          : item.status === "Rejected"
                          ? "bg-red-500"
                          : "bg-gray-500" // fallback for inactive/unknown
                      }`}
                      aria-hidden="true"
                    ></span>
                    {item.status}
                  </Badge> */}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    className="cursor-pointer text-white bg-blue-400 text-xs px-4 py-2"
                    size="sm"
                  >
                    <Link
                      to={`/departments/trainees/${item.id}}`}
                      className="flex gap-2 items-center"
                    >
                      {item.action}
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Here you can fetch trainee data using the id */}
    </div>
  );
}
