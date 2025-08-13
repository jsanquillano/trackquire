import { cn } from "./../../lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface RegisterFormProps extends React.ComponentProps<"form"> {
  form: {
    username: string;
    password: string;
    phone: string;
    email: string;
    name: string;
  };
  onFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function SignUpForm({
  className,
  form,
  onFormChange,
  onSubmit,
  ...props
}: RegisterFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-1 text-center">
        <h1 className="text-lg font-bold">Create your account</h1>
        <p className="text-muted-foreground text-xs text-balance">
          Enter your credentials below to sign up
        </p>
      </div>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="username" className="text-xs">
            Username
          </Label>
          <Input
            id="username"
            name="username"
            type="text"
            required
            value={form.username}
            onChange={onFormChange}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="name" className="text-xs">
            Full Name
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={onFormChange}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email" className="text-xs">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={onFormChange}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phone" className="text-xs">
            Phone Number
          </Label>
          <Input
            id="phone"
            name="phone"
            type="text"
            required
            value={form.phone}
            onChange={onFormChange}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password" className="text-xs">
            Password
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            value={form.password}
            onChange={onFormChange}
          />
        </div>

        <Button type="submit" className="w-full cursor-pointer">
          Register
        </Button>

        <div className="text-center text-xs">
          Do you have an account?{" "}
          <a href="/login" className="underline underline-offset-4">
            Login
          </a>
        </div>
      </div>
    </form>
  );
}
