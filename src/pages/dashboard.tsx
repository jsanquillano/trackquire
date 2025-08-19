"use client";

import { useEffect, useState } from "react";

interface User {
  id: number;
  fullName: string;
  email: string;
  department: string;
  role: string;
  createdAt: string;
}

export default function Dashboard() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("http://localhost:5070/api/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((json: User[]) => {
        setUsers(json);
        console.log("Fetched users:", json);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>{user.fullName}</strong> — {user.email} — {user.department}{" "}
            — {user.role} — Joined: {formatDate(user.createdAt)}
          </li>
        ))}
      </ul>
    </div>
  );
}
