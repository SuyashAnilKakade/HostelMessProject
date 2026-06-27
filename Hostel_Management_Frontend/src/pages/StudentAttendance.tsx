import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/api";

import {
  FaCalendarCheck,
  FaCheckCircle,
  FaTimesCircle,
  FaHistory,
  FaChartPie,
} from "react-icons/fa";

interface Attendance {
  id: number;
  date: string;
  status: "PRESENT" | "ABSENT";
}

export default function StudentAttendance() {
  const [todayStatus, setTodayStatus] = useState<
    "PRESENT" | "ABSENT"
  >("ABSENT");

  const [history, setHistory] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAttendance();
  }, []);

  const loadAttendance = async () => {
    try {
      setLoading(true);

      const [todayRes, historyRes] = await Promise.all([
        api.get("/api/student/attendance/today"),
        api.get("/api/student/attendance/history"),
      ]);

      setTodayStatus(todayRes.data.status || "ABSENT");
      setHistory(historyRes.data || []);

    } catch (err) {
      console.error("Failed to load attendance", err);
      setTodayStatus("ABSENT");
    } finally {
      setLoading(false);
    }
  };

  // ================= STATS =================
  const presentCount = history.filter(
    (a) => a.status === "PRESENT"
  ).length;

  const absentCount = history.filter(
    (a) => a.status === "ABSENT"
  ).length;

  const totalDays = history.length;

  const percentage =
    totalDays > 0
      ? ((presentCount / totalDays) * 100).toFixed(1)
      : "0";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 relative overflow-hidden">

      {/* BACKGROUND EFFECTS */}
      <div className="absolute top-[-120px] left-[-100px] w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>

      <div className="absolute bottom-[-120px] right-[-80px] w-[28rem] h-[28rem] bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>

      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

      {/* NAVBAR */}
      <div className="relative z-20">
        <Navbar />
      </div>

      {/* MAIN */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">

        {/* HEADER */}
        <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 shadow-[0_20px_80px_rgba(0,0,0,0.5)] mb-10">

          <p className="uppercase tracking-[0.25em] text-cyan-300 text-sm mb-3">
            Student Dashboard
          </p>

          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            My Attendance
          </h1>

          <p className="text-gray-300 text-lg max-w-3xl">
            Track your attendance history and today's
            attendance status. Attendance is automatically
            marked when you vote for the mess menu.
          </p>
        </div>

        {/* TODAY STATUS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

          {/* TODAY */}
          <div className="md:col-span-2 bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl">

            <div className="flex items-center justify-between mb-6">

              <div>
                <p className="text-cyan-300 uppercase tracking-widest text-sm mb-2">
                  Today's Status
                </p>

                <h2
                  className={`text-4xl font-black ${
                    todayStatus === "PRESENT"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {todayStatus}
                </h2>
              </div>

              <div
                className={`w-20 h-20 rounded-3xl flex items-center justify-center ${
                  todayStatus === "PRESENT"
                    ? "bg-green-500/20"
                    : "bg-red-500/20"
                }`}
              >
                {todayStatus === "PRESENT" ? (
                  <FaCheckCircle className="text-4xl text-green-400" />
                ) : (
                  <FaTimesCircle className="text-4xl text-red-400" />
                )}
              </div>
            </div>

            <p className="text-gray-300">
              Attendance is marked when you vote for the
              mess menu.
            </p>
          </div>

          {/* PRESENT */}
          <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-2xl">

            <div className="flex items-center justify-between mb-4">

              <div>
                <p className="text-gray-400 text-sm">
                  Present
                </p>

                <h2 className="text-4xl font-black text-green-400">
                  {presentCount}
                </h2>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-green-500/20 flex items-center justify-center">
                <FaCalendarCheck className="text-green-400 text-2xl" />
              </div>
            </div>
          </div>

          {/* PERCENTAGE */}
          <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-2xl">

            <div className="flex items-center justify-between mb-4">

              <div>
                <p className="text-gray-400 text-sm">
                  Percentage
                </p>

                <h2 className="text-4xl font-black text-cyan-300">
                  {percentage}%
                </h2>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center">
                <FaChartPie className="text-cyan-300 text-2xl" />
              </div>
            </div>
          </div>
        </div>

        {/* HISTORY */}
        <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[32px] shadow-2xl overflow-hidden">

          {/* TABLE HEADER */}
          <div className="px-8 py-6 border-b border-white/10 flex items-center gap-4">

            <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center">
              <FaHistory className="text-cyan-300 text-2xl" />
            </div>

            <div>
              <h2 className="text-3xl font-black text-white">
                Attendance History
              </h2>

              <p className="text-gray-400 mt-1">
                Complete attendance records
              </p>
            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-white/5">
                <tr>
                  <th className="p-5 text-left text-gray-300 font-semibold">
                    Date
                  </th>

                  <th className="p-5 text-left text-gray-300 font-semibold">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>

                {loading ? (
                  <tr>
                    <td
                      colSpan={2}
                      className="p-10 text-center text-gray-400"
                    >
                      Loading attendance...
                    </td>
                  </tr>
                ) : history.length === 0 ? (
                  <tr>
                    <td
                      colSpan={2}
                      className="p-10 text-center text-gray-400"
                    >
                      No attendance history found
                    </td>
                  </tr>
                ) : (
                  history.map((a) => (
                    <tr
                      key={a.id}
                      className="border-t border-white/10 hover:bg-white/5 transition"
                    >

                      <td className="p-5 text-white font-medium">
                        {new Date(a.date).toLocaleDateString()}
                      </td>

                      <td className="p-5">

                        <div
                          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold ${
                            a.status === "PRESENT"
                              ? "bg-green-500/20 text-green-300 border border-green-400/20"
                              : "bg-red-500/20 text-red-300 border border-red-400/20"
                          }`}
                        >
                          {a.status === "PRESENT" ? (
                            <FaCheckCircle />
                          ) : (
                            <FaTimesCircle />
                          )}

                          {a.status}
                        </div>

                      </td>
                    </tr>
                  ))
                )}

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}