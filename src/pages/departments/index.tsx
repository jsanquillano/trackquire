import { useId } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, HomeIcon } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import CreateDepartment from "@/components/department/create-department";

// Updated items to match table headers
const items = [
  {
    id: "1",
    department: "AADX",
    location: "N-PAX Cebu Corporation, Mandaue",
    status: "Active",
    action: "View",
  },
  {
    id: "2",
    department: "ERP",
    location: "N-PAX Cebu Corporation, Mandaue",
    status: "Active",
    action: "View",
  },
  {
    id: "3",
    department: "MCF",
    location: "N-PAX Cebu Corporation, Mandaue",
    status: "Inactive",
    action: "View",
  },
  {
    id: "4",
    department: "HCR",
    location: "N-PAX Cebu Corporation, Mandaue",
    status: "Active",
    action: "View",
  },
  {
    id: "5",
    department: "Trainees",
    location: "N-PAX Cebu Corporation, Mandaue",
    status: "Active",
    action: "View",
    link: "trainees",
  },
];

const Departments = () => {
  const id = useId();
  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
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
              <BreadcrumbLink href="/departments" className="text-black">
                Departments
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div>
          <CreateDepartment />
        </div>
      </div>
      <div className="bg-background overflow-hidden rounded-md border ">
        <Table>
          <TableHeader className="bg-[#2b3692]">
            <TableRow className="hover:bg-transparent">
              <TableHead className="h-11 text-white ">Department</TableHead>
              <TableHead className="h-11 text-white ">Location</TableHead>
              <TableHead className="h-11 text-white ">Status</TableHead>
              <TableHead className="h-11 text-white  text-right">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id} className="text-xs">
                <TableCell className="font-medium ">
                  {item.department}
                </TableCell>
                <TableCell className="">{item.location}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="gap-1.5">
                    <span
                      className={`size-1.5 rounded-full  ${
                        item.status === "Inactive"
                          ? "bg-red-500"
                          : "bg-emerald-500"
                      }`}
                      aria-hidden="true"
                    ></span>
                    {item.status}
                  </Badge>
                </TableCell>

                <TableCell className="text-right">
                  <Button
                    className="cursor-pointer text-white bg-blue-400 text-xs px-4 py-2"
                    size="sm"
                  >
                    <Link
                      to={`/departments/${item.link}`}
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
    </div>
  );
};

export default Departments;
