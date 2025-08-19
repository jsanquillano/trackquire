import { Routes, Route } from "react-router-dom";
import Layout from "@/layout";
import Login from "@/pages/login";
import Signup from "@/pages/signup";
import Dashboard from "@/pages/dashboard";
import Departments from "@/pages/departments";
import Administrators from "@/pages/administrators";
import Documents from "@/pages/documents";
import Announcements from "@/pages/announcements";
import Trainees from "@/pages/departments/trainees";
import TraineeDetails from "@/pages/departments/trainees/trainee-details";
import AdministratorDetails from "./pages/administrators/administrator-details";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/departments/trainees" element={<Trainees />} />
        <Route path="/departments/trainees/:id" element={<TraineeDetails />} />

        <Route path="/documents" element={<Documents />} />
        <Route path="/administrators" element={<Administrators />} />
        <Route path="/administrators/:id" element={<AdministratorDetails />} />
        <Route path="/announcements" element={<Announcements />} />
      </Route>
    </Routes>
  );
};

export default App;
