import { useState } from "react";
import { cn } from "./../../lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Simulated credentials
  const validUsername = "admin";
  const validPassword = "1234";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const username = formData.get("username")?.toString().trim();
    const password = formData.get("password")?.toString().trim();

    // Fake async check
    setTimeout(() => {
      if (username === validUsername && password === validPassword) {
        alert("Login successful! ✅");
        // here you can navigate to dashboard
      } else {
        setError("Invalid username or password.");
      }
      setLoading(false);
    }, 800);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-1 text-center">
        <h1 className="text-lg font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-xs text-balance">
          Enter your email below to login to your account
        </p>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="username" className="text-xs">
            Username
          </Label>
          <Input id="username" name="username" type="text" required />
        </div>

        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password" className="text-xs">
              Password
            </Label>
            {/* <a
              href="#"
              className="ml-auto text-xs underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a> */}
          </div>
          <Input id="password" name="password" type="password" required />
        </div>

        {error && <p className="text-xs text-red-500 font-medium">{error}</p>}

        <Button
          type="submit"
          className="w-full cursor-pointer"
          disabled={loading}
        >
          {loading ? "Checking..." : "Login"}
        </Button>
      </div>
    </form>
  );
}
