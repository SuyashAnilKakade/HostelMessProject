import { useEffect, useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";

export default function Attendance() {
  const [attendance, setAttendance] = useState<any[]>([]);

  useEffect(() => {
    api.get("/student/attendance").then(res => setAttendance(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Attendance Record</h1>
        <div className="bg-white rounded-2xl shadow overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-gray-700 font-medium">Date</th>
                <th className="px-6 py-3 text-left text-gray-700 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map(a => (
                <tr key={a.date} className="border-b hover:bg-gray-50 transition">
                  <td className="px-6 py-3">{a.date}</td>
                  <td className={`px-6 py-3 font-semibold ${a.status === "Present" ? "text-green-600" : "text-red-600"}`}>
                    {a.status}
                  </td>
                </tr>
              ))}
              {attendance.length === 0 && (
                <tr>
                  <td colSpan={2} className="px-6 py-4 text-center text-gray-500">
                    No attendance records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
