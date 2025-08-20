import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function CreateRequirement() {
  const [form, setForm] = useState({
    document_name: "",
    document_category: "",
    due_date: "",
    is_mandatory: "No",
    status: true,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" })); // clear error when typing
  };

  const validateForm = () => {
    let newErrors: { [key: string]: string } = {};

    if (!form.document_name.trim())
      newErrors.document_name = "Document name is required.";
    if (!form.document_category.trim())
      newErrors.document_category = "Category is required.";
    if (!form.due_date.trim()) newErrors.due_date = "Due date is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return; // stop if validation fails

    try {
      const res = await fetch("http://localhost:5070/api/requirements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to add requirement");
      alert("Requirement added successfully!");
    } catch (err) {
      console.error(err);
      alert("Error adding requirement");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="bg-[var(--button-color)] text-sm cursor-pointer"
        >
          Add Requirement
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Requirement</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new requirement.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Document Name */}
          <div>
            <Label>Document Name</Label>
            <Input
              value={form.document_name}
              onChange={(e) => handleChange("document_name", e.target.value)}
              placeholder="e.g. Birth Certificate"
              className="mt-2"
            />
            {errors.document_name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.document_name}
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <Label>Category</Label>
            <Select
              value={form.document_category}
              onValueChange={(v) => handleChange("document_category", v)}
            >
              <SelectTrigger className="mt-2 cursor-pointer">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pre-Employment Requirements">
                  Pre-Employment Requirements
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.document_category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.document_category}
              </p>
            )}
          </div>

          {/* Due Date */}
          <div>
            <Label>Due Date</Label>
            <Input
              type="date"
              value={form.due_date}
              onChange={(e) => handleChange("due_date", e.target.value)}
              className="mt-2"
            />
            {errors.due_date && (
              <p className="text-red-500 text-xs mt-1">{errors.due_date}</p>
            )}
          </div>

          {/* Mandatory */}
          <div>
            <Label>Is Mandatory?</Label>
            <Select
              value={form.is_mandatory}
              onValueChange={(val) => handleChange("is_mandatory", val)}
            >
              <SelectTrigger className="mt-2 cursor-pointer">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Status */}
          <div>
            <Label>Status</Label>
            <Switch
              checked={form.status}
              onCheckedChange={(val) => handleChange("status", val)}
              className="mt-2 cursor-pointer"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            size="sm"
            type="button"
            onClick={handleSubmit}
            className="cursor-pointer text-sm bg-[var(--button-color)]"
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
