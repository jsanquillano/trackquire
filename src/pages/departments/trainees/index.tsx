import { useId } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRightIcon, HomeIcon } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import CreateTrainee from "@/components/department/create-trainee";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const items = [
  {
    id: "1",
    name: "Alex Thompson",
    email: "alex.t@company.com",
    department: "Trainee",
    status: "Active",
    action: "View",
  },
  {
    id: "2",
    name: "Sarah Chen",
    email: "sarah.c@company.com",
    department: "Trainee",
    status: "Active",
    action: "View",
  },
  {
    id: "3",
    name: "James Wilson",
    email: "j.wilson@company.com",
    department: "Trainee",
    status: "Inactive",
    action: "View",
  },
  {
    id: "4",
    name: "Maria Garcia",
    email: "m.garcia@company.com",
    department: "Trainee",
    status: "Active",
    action: "View",
  },
  {
    id: "5",
    name: "David Kim",
    email: "d.kim@company.com",
    department: "Trainee",
    status: "Active",
    action: "View",
  },
];

const Trainees = () => {
  const id = useId();
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
              <BreadcrumbPage>Trainees</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex justify-between items-center my-4">
          <div className="*:not-first:mt-2 ">
            <Input id={id} placeholder="Search..." type="email" />
          </div>
          <CreateTrainee />
        </div>
      </div>
      <div className="bg-background overflow-hidden rounded-md border">
        <Table>
          <TableHeader className="bg-[#2b3692]">
            <TableRow className="hover:bg-transparent">
              <TableHead className="h-11 text-white">Name</TableHead>
              <TableHead className="h-11 text-white">Email</TableHead>
              <TableHead className="h-11 text-white">Department</TableHead>

              <TableHead className="h-11 text-white text-right">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id} className="text-xs">
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.department}</TableCell>

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
    </div>
  );
};

export default Trainees;
