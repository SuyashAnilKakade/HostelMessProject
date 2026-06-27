import { BrowserRouter, Routes, Route } from "react-router-dom";

// PUBLIC
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

// ADMIN
import AdminDashboard from "./pages/AdminDashboard";
import AdminHostels from "./pages/AdminHostels";
import AdminRooms from "./pages/AdminRooms";
import AdminRequests from "./pages/AdminRequests";
import AdminMessMenu from "./pages/AdminMessMenu";
import AdminNightOut from "./pages/AdminNightOut";
import AdminAttendance from "./pages/AdminAttendance";
import AdminHolidayRequests from "./pages/AdminHolidayRequests";
import AdminComplaints from "./pages/AdminComplaints";

// STUDENT
import StudentDashboard from "./pages/StudentDashboard";
import HostelList from "./pages/HostelList";
import RoomList from "./pages/RoomList";
import MessMenu from "./pages/MessMenu";
import Attendance from "./pages/Attendance";
import NightOut from "./pages/NightOut";
import Complaints from "./pages/Complaints";
import StudentAttendance from "./pages/StudentAttendance";
import StudentHoliday from "./pages/StudentHoliday";

// COMPONENTS
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= PUBLIC ================= */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ================= ADMIN ================= */}
        <Route path="/admin" element={
          <ProtectedRoute role="ADMIN">
            <AdminDashboard />
          </ProtectedRoute>
        } />

        <Route path="/admin/hostels" element={
          <ProtectedRoute role="ADMIN">
            <AdminHostels />
          </ProtectedRoute>
        } />

        <Route path="/admin/rooms" element={
          <ProtectedRoute role="ADMIN">
            <AdminRooms />
          </ProtectedRoute>
        } />

        <Route path="/admin/requests" element={
          <ProtectedRoute role="ADMIN">
            <AdminRequests />
          </ProtectedRoute>
        } />

        <Route path="/admin/messmenu" element={
          <ProtectedRoute role="ADMIN">
            <AdminMessMenu />
          </ProtectedRoute>
        } />

        <Route path="/admin/nightout" element={
          <ProtectedRoute role="ADMIN">
            <AdminNightOut />
          </ProtectedRoute>
        } />

        <Route path="/admin/holidays" element={
          <ProtectedRoute role="ADMIN">
            <AdminHolidayRequests />
          </ProtectedRoute>
        } />

        <Route path="/admin/complaints" element={
          <ProtectedRoute role="ADMIN">
            <AdminComplaints />
          </ProtectedRoute>
        } />

        <Route path="/admin/attendance" element={
          <ProtectedRoute role="ADMIN">
            <AdminAttendance />
          </ProtectedRoute>
        } />

        {/* ================= STUDENT ================= */}
        <Route path="/student" element={
          <ProtectedRoute role="STUDENT">
            <StudentDashboard />
          </ProtectedRoute>
        } />

        <Route path="/student/hostels" element={
          <ProtectedRoute role="STUDENT">
            <HostelList />
          </ProtectedRoute>
        } />

        <Route path="/student/hostel/:hostelId/rooms" element={
          <ProtectedRoute role="STUDENT">
            <RoomList />
          </ProtectedRoute>
        } />

        <Route path="/student/messmenu" element={
          <ProtectedRoute role="STUDENT">
            <MessMenu />
          </ProtectedRoute>
        } />

        <Route path="/student/attendance" element={
          <ProtectedRoute role="STUDENT">
            <StudentAttendance />
          </ProtectedRoute>
        } />

        <Route path="/student/nightout" element={
          <ProtectedRoute role="STUDENT">
            <NightOut />
          </ProtectedRoute>
        } />

        <Route path="/student/complaints" element={
          <ProtectedRoute role="STUDENT">
            <Complaints />
          </ProtectedRoute>
        } />

        <Route path="/student/holidays" element={
          <ProtectedRoute role="STUDENT">
            <StudentHoliday />
          </ProtectedRoute>
        } />

        {/* ================= 404 ================= */}
        <Route path="*" element={
          <h1 className="p-10 text-center text-2xl">
            404 - Page Not Found
          </h1>
        } />

      </Routes>
    </BrowserRouter>
  );
}

export default App;