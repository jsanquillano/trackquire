import { Routes, Route } from "react-router-dom";
import Layout from "@/layout";
import Login from "@/pages/login";
import Signup from "@/pages/signup";
import Dashboard from "@/pages/dashboard";
import Departments from "@/pages/departments";
import Administrators from "@/pages/administrators";
import Documents from "@/pages/documents";
import Announcements from "./pages/announcements";
import FreshGraduates from "./pages/departments/fresh-graduates";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/departments" element={<Departments />} />
        <Route
          path="/departments/fresh-graduates"
          element={<FreshGraduates />}
        />
        <Route path="/documents" element={<Documents />} />
        <Route path="/administrators" element={<Administrators />} />
        <Route path="/announcements" element={<Announcements />} />
      </Route>
    </Routes>
  );
};

export default App;
