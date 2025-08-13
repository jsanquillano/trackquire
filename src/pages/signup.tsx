"use client";

import { useEffect, useState } from "react";

import { SignUpForm } from "../components/auth/signup-form";

export default function SignUp() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    username: "",
    password: "",
    phone: "",
    email: "",
    name: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("signupData");
    if (saved) {
      const data = JSON.parse(saved);
      console.log(data);
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Save form data to localStorage
    localStorage.setItem("signupData", JSON.stringify(form));

    // Optional: clear form after submission
    setForm({
      username: "",
      password: "",
      phone: "",
      email: "",
      name: "",
    });

    alert("Account registered successfully!");
  };
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <img
              src="/npax-logo.png"
              alt="Image"
              className="h-full w-[150px]"
            />
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignUpForm
              form={form}
              onFormChange={handleChange}
              onSubmit={handleSubmit}
            />
            {error && (
              <p className="mt-4 text-sm text-red-500 text-center">{error}</p>
            )}
            {success && (
              <p className="mt-4 text-sm text-green-500 text-center">
                {success}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="relative w-full h-full">
        <img
          src="/npax-logo-big.png"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
