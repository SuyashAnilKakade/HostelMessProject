import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/api";

import {
  FaUserCheck,
  FaCalendarDay,
  FaSync,
  FaUsers,
  FaEnvelope,
  FaClock,
} from "react-icons/fa";

interface Attendance {
  id: number;
  student: {
    name: string;
    email: string;
  };
  date: string;
}

export default function AdminAttendance() {
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchToday();
  }, []);

  const fetchToday = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await api.get("/api/admin/attendance/today");

      setAttendance(res.data || []);
    } catch (err) {
      console.error("Failed to fetch attendance", err);
      setError("Failed to load attendance data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 relative overflow-hidden">

      {/* BACKGROUND EFFECTS */}
      <div className="absolute top-[-100px] left-[-80px] w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>

      <div className="absolute bottom-[-120px] right-[-80px] w-[28rem] h-[28rem] bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>

      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

      {/* NAVBAR */}
      <div className="relative z-20">
        <Navbar />
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">

        {/* HEADER */}
        <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[32px] shadow-[0_20px_80px_rgba(0,0,0,0.5)] p-8 mb-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">

          <div>
            <p className="uppercase tracking-[0.25em] text-cyan-300 mb-3 text-sm">
              Attendance Management
            </p>

            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              Today's Attendance
            </h1>

            <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
              Monitor daily student attendance records,
              track present students and manage attendance updates.
            </p>
          </div>

          <button
            onClick={fetchToday}
            className="flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-7 py-4 rounded-2xl font-bold shadow-xl hover:shadow-cyan-500/30 transition-all duration-300 hover:scale-105"
          >
            <FaSync className={loading ? "animate-spin" : ""} />
            Refresh Data
          </button>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/20 text-red-300 px-6 py-4 rounded-2xl backdrop-blur-xl">
            {error}
          </div>
        )}

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          {/* PRESENT STUDENTS */}
          <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-2xl hover:-translate-y-2 hover:shadow-cyan-500/20 transition-all duration-500">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">
                  Present Students
                </p>

                <h2 className="text-5xl font-black text-green-300">
                  {attendance.length}
                </h2>
              </div>

              <div className="w-20 h-20 rounded-3xl bg-green-500/20 flex items-center justify-center">
                <FaUserCheck className="text-green-300 text-4xl" />
              </div>

            </div>

          </div>

          {/* DATE */}
          <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-2xl hover:-translate-y-2 hover:shadow-cyan-500/20 transition-all duration-500">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">
                  Current Date
                </p>

                <h2 className="text-xl font-bold text-white leading-relaxed">
                  {new Date().toDateString()}
                </h2>
              </div>

              <div className="w-20 h-20 rounded-3xl bg-cyan-500/20 flex items-center justify-center">
                <FaCalendarDay className="text-cyan-300 text-4xl" />
              </div>

            </div>

          </div>

          {/* STATUS */}
          <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-2xl hover:-translate-y-2 hover:shadow-cyan-500/20 transition-all duration-500">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">
                  System Status
                </p>

                <h2 className="text-2xl font-bold text-white">
                  {loading ? "Loading..." : "Updated"}
                </h2>
              </div>

              <div className="w-20 h-20 rounded-3xl bg-purple-500/20 flex items-center justify-center">
                <FaClock className="text-purple-300 text-4xl" />
              </div>

            </div>

          </div>

        </div>

        {/* TABLE SECTION */}
        <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[32px] shadow-[0_20px_80px_rgba(0,0,0,0.5)] overflow-hidden">

          {/* TABLE HEADER */}
          <div className="flex items-center gap-4 px-8 py-6 border-b border-white/10">

            <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center">
              <FaUsers className="text-cyan-300 text-2xl" />
            </div>

            <div>
              <p className="uppercase tracking-[0.25em] text-cyan-300 text-xs mb-2">
                Attendance Records
              </p>

              <h2 className="text-2xl font-black text-white">
                Student Attendance List
              </h2>
            </div>

          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-white/5">

                <tr className="text-left">

                  <th className="px-8 py-5 text-cyan-300 uppercase tracking-wider text-sm font-semibold">
                    Student Name
                  </th>

                  <th className="px-8 py-5 text-cyan-300 uppercase tracking-wider text-sm font-semibold">
                    Email Address
                  </th>

                  <th className="px-8 py-5 text-cyan-300 uppercase tracking-wider text-sm font-semibold">
                    Attendance Date
                  </th>

                </tr>

              </thead>

              <tbody>

                {!loading && attendance.length === 0 && (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-8 py-12 text-center text-gray-400"
                    >
                      No attendance recorded today
                    </td>
                  </tr>
                )}

                {attendance.map((a) => (
                  <tr
                    key={a.id}
                    className="border-t border-white/10 hover:bg-white/5 transition"
                  >

                    {/* NAME */}
                    <td className="px-8 py-5">

                      <div className="flex items-center gap-4">

                        <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 flex items-center justify-center">
                          <FaUsers className="text-cyan-300" />
                        </div>

                        <div>
                          <h3 className="text-white font-semibold text-lg">
                            {a.student.name}
                          </h3>
                        </div>

                      </div>

                    </td>

                    {/* EMAIL */}
                    <td className="px-8 py-5">

                      <div className="flex items-center gap-3 text-gray-300">
                        <FaEnvelope className="text-cyan-400" />
                        <span>{a.student.email}</span>
                      </div>

                    </td>

                    {/* DATE */}
                    <td className="px-8 py-5">

                      <span className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-sm font-semibold">
                        {new Date(a.date).toLocaleDateString()}
                      </span>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </div>
  );
}