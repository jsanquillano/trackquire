import { useState, useEffect } from "react";
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

type Requirement = {
  requirement_id: number;
  document_name: string;
  document_category: string;
  due_date: string;
  is_mandatory: string;
  status: boolean;
};

export default function EditRequirement({
  requirement,
  onUpdated,
}: {
  requirement: Requirement;
  onUpdated?: (req: Requirement) => void;
}) {
  const [form, setForm] = useState<Requirement>(requirement);
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  // Reset form whenever a different row is opened
  useEffect(() => {
    if (open) setForm(requirement);
  }, [requirement, open]);

  const handleChange = (field: keyof Requirement, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const e: typeof errors = {};
    if (!form.document_name.trim())
      e.document_name = "Document name is required.";
    if (!form.document_category.trim())
      e.document_category = "Category is required.";
    if (!form.due_date.trim()) e.due_date = "Due date is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleUpdate = async () => {
    if (!validate()) return;

    setSaving(true);
    try {
      const res = await fetch(
        `http://localhost:5070/api/requirements/${form.requirement_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      if (!res.ok) throw new Error(`Update failed (${res.status})`);

      // Handle 204 No Content OR 200 with body
      let updated: Requirement = form;
      const hasBody =
        res.status !== 204 &&
        (res.headers.get("content-length") ?? "0") !== "0";
      if (hasBody) {
        updated = (await res.json()) as Requirement;
      }

      onUpdated?.(updated); // update parent
      setOpen(false); // close modal
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-xs cursor-pointer">
          View Details
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Requirement Details</DialogTitle>
          <DialogDescription>
            Update the requirement fields and save your changes.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Document Name</Label>
            <Input
              value={form.document_name}
              onChange={(e) => handleChange("document_name", e.target.value)}
              className="mt-2"
            />
            {errors.document_name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.document_name}
              </p>
            )}
          </div>

          <div>
            <Label>Category</Label>
            <Select
              value={form.document_category} // ✅ Pre-fills with current value
              onValueChange={(v) => handleChange("document_category", v)}
            >
              <SelectTrigger className="mt-2 cursor-pointer">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pre-Employment Requirements">
                  Pre-Employment Requirements
                </SelectItem>
                <SelectItem value="Post-Employment Requirements">
                  Post-Employment Requirements
                </SelectItem>
                <SelectItem value="Onboarding Documents">
                  Onboarding Documents
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.document_category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.document_category}
              </p>
            )}
          </div>

          <div>
            <Label>Due Date</Label>
            <Input
              type="date"
              value={form.due_date}
              onChange={(e) => handleChange("due_date", e.target.value)}
              className="mt-2"
            />
            {errors.due_date && (
              <p className="text-red-500 text-sm mt-1">{errors.due_date}</p>
            )}
          </div>

          <div>
            <Label>Is Mandatory?</Label>
            <Select
              value={form.is_mandatory}
              onValueChange={(v) => handleChange("is_mandatory", v)}
            >
              <SelectTrigger className="mt-2 cursor-pointer">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="">
            <Label>Status</Label>
            <Switch
              checked={form.status}
              onCheckedChange={(v) => handleChange("status", v)}
              className="mt-2"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            className="cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleUpdate}
            disabled={saving}
            className="bg-[var(--button-color)] cursor-pointer"
          >
            {saving ? "Saving..." : "Update"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
