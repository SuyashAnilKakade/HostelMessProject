import { useEffect, useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";

import {
  FaCheckCircle,
  FaTimesCircle,
  FaUserGraduate,
  FaCalendarAlt,
  FaClock,
  FaClipboardList,
  FaMoon,
  FaEnvelope,
} from "react-icons/fa";

interface NightOutRequest {
  id: number;
  date: string;
  returnTime: string;
  reason: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  student: { id: number; email: string };
}

export default function AdminNightOut() {
  const [requests, setRequests] = useState<NightOutRequest[]>([]);

  const fetchRequests = async () => {
    try {
      const res = await api.get<NightOutRequest[]>("api/admin/nightout");
      setRequests(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const approve = async (id: number) => {
    try {
      await api.post(`api/admin/nightout/${id}/approve`);
      fetchRequests();
    } catch (err) {
      console.error(err);
    }
  };

  const reject = async (id: number) => {
    try {
      await api.post(`api/admin/nightout/${id}/reject`);
      fetchRequests();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

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
              Permission Management
            </p>

            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              Night Out Requests
            </h1>

            <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
              Review and manage all student night out permissions,
              approvals and request statuses from one dashboard.
            </p>
          </div>

          <div className="w-20 h-20 rounded-3xl bg-cyan-500/20 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <FaMoon className="text-cyan-300 text-4xl" />
          </div>
        </div>

        {/* EMPTY STATE */}
        {requests.length === 0 ? (
          <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 text-center text-gray-300 shadow-2xl">
            No pending requests
          </div>
        ) : (

          /* REQUEST CARDS */
          <div className="space-y-6">

            {requests.map((req) => (
              <div
                key={req.id}
                className="group bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-2xl hover:-translate-y-2 hover:shadow-cyan-500/20 transition-all duration-500"
              >

                <div className="flex flex-col lg:flex-row justify-between gap-8">

                  {/* LEFT SIDE */}
                  <div className="flex-1">

                    {/* STUDENT INFO */}
                    <div className="flex items-center gap-4 mb-6">

                      <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center">
                        <FaUserGraduate className="text-cyan-300 text-2xl" />
                      </div>

                      <div>
                        <h2 className="text-white text-2xl font-bold">
                          Student Request
                        </h2>

                        <div className="flex items-center gap-2 text-gray-300 text-sm mt-1">
                          <FaEnvelope className="text-cyan-400" />
                          <span>{req.student.email}</span>
                        </div>
                      </div>

                    </div>

                    {/* DETAILS GRID */}
                    <div className="grid md:grid-cols-2 gap-4 mb-4">

                      {/* DATE */}
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-5">

                        <div className="flex items-center gap-3 mb-2">
                          <FaCalendarAlt className="text-cyan-400" />

                          <p className="text-cyan-300 uppercase tracking-wider text-xs font-semibold">
                            Date
                          </p>
                        </div>

                        <h3 className="text-white text-xl font-bold">
                          {req.date}
                        </h3>

                      </div>

                      {/* RETURN TIME */}
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-5">

                        <div className="flex items-center gap-3 mb-2">
                          <FaClock className="text-cyan-400" />

                          <p className="text-cyan-300 uppercase tracking-wider text-xs font-semibold">
                            Return Time
                          </p>
                        </div>

                        <h3 className="text-white text-xl font-bold">
                          {req.returnTime}
                        </h3>

                      </div>

                    </div>

                    {/* REASON */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">

                      <div className="flex items-center gap-3 mb-3">
                        <FaClipboardList className="text-cyan-400" />

                        <p className="text-cyan-300 uppercase tracking-wider text-xs font-semibold">
                          Reason
                        </p>
                      </div>

                      <p className="text-gray-300 leading-relaxed">
                        {req.reason}
                      </p>

                    </div>

                  </div>

                  {/* RIGHT SIDE */}
                  <div className="flex flex-col justify-between items-start lg:items-end gap-5">

                    {/* STATUS */}
                    <span
                      className={`px-5 py-2 rounded-full text-sm font-bold tracking-wide shadow-lg ${
                        req.status === "APPROVED"
                          ? "bg-green-500/20 text-green-300 border border-green-400/20"
                          : req.status === "REJECTED"
                          ? "bg-red-500/20 text-red-300 border border-red-400/20"
                          : "bg-yellow-500/20 text-yellow-300 border border-yellow-400/20"
                      }`}
                    >
                      {req.status}
                    </span>

                    {/* ACTION BUTTONS */}
                    {req.status === "PENDING" ? (
                      <div className="flex gap-3">

                        <button
                          onClick={() => approve(req.id)}
                          className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white px-5 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-green-500/30 transition-all duration-300 hover:scale-105"
                        >
                          <FaCheckCircle />
                          Approve
                        </button>

                        <button
                          onClick={() => reject(req.id)}
                          className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-400 hover:to-pink-500 text-white px-5 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-red-500/30 transition-all duration-300 hover:scale-105"
                        >
                          <FaTimesCircle />
                          Reject
                        </button>

                      </div>
                    ) : (
                      <div className="text-gray-400 text-sm font-medium">
                        Request Processed
                      </div>
                    )}

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
}