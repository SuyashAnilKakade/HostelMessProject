import { useEffect, useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";

import {
  FaCalendarAlt,
  FaPaperPlane,
  FaClipboardList,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
} from "react-icons/fa";

// ✅ FRONTEND TYPE FOR HOLIDAY REQUEST
interface HolidayRequest {
  id: number;
  fromDate: string;
  toDate: string;
  reason: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
}

export default function StudentHoliday() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");

  // ✅ Typed state for my requests
  const [myRequests, setMyRequests] = useState<HolidayRequest[]>([]);

  // ================= SUBMIT =================
  const submitRequest = async () => {
    if (!fromDate || !toDate || !reason) {
      alert("Please fill all fields");
      return;
    }

    try {
      await api.post("api/student/holidays", {
        fromDate,
        toDate,
        reason,
      });

      alert("Holiday request submitted 🎉");

      setFromDate("");
      setToDate("");
      setReason("");

      fetchMyRequests();
    } catch (err) {
      alert("Failed to submit request");
    }
  };

  // ================= FETCH =================
  const fetchMyRequests = async () => {
    try {
      const res = await api.get<HolidayRequest[]>(
        "api/student/holidays/my"
      );

      setMyRequests(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMyRequests();
  }, []);

  // ================= STATUS COLOR =================
  const statusStyle = (
    status: "PENDING" | "APPROVED" | "REJECTED"
  ): string => {
    if (status === "APPROVED") {
      return "text-green-300 bg-green-500/20 border border-green-400/30";
    }

    if (status === "REJECTED") {
      return "text-red-300 bg-red-500/20 border border-red-400/30";
    }

    return "text-yellow-300 bg-yellow-500/20 border border-yellow-400/30";
  };

  // ================= STATUS ICON =================
  const statusIcon = (
    status: "PENDING" | "APPROVED" | "REJECTED"
  ) => {
    if (status === "APPROVED") {
      return <FaCheckCircle />;
    }

    if (status === "REJECTED") {
      return <FaTimesCircle />;
    }

    return <FaClock />;
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
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-10">

        {/* ================= HEADER ================= */}
        <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[32px] shadow-[0_20px_80px_rgba(0,0,0,0.5)] p-8 mb-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">

          <div>
            <p className="uppercase tracking-[0.25em] text-cyan-300 mb-3 text-sm">
              Student Leave Portal
            </p>

            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              Holiday Requests
            </h1>

            <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
              Submit and manage your holiday leave requests with
              real-time approval tracking from hostel administration.
            </p>
          </div>

          <div className="w-20 h-20 rounded-3xl bg-cyan-500/20 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <FaClipboardList className="text-cyan-300 text-4xl" />
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">

          {/* ================= FORM ================= */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[32px] shadow-[0_20px_80px_rgba(0,0,0,0.5)] p-8 sticky top-10">

              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center">
                  <FaPaperPlane className="text-cyan-300 text-2xl" />
                </div>

                <div>
                  <p className="text-cyan-300 uppercase tracking-[0.2em] text-xs">
                    Request Form
                  </p>

                  <h2 className="text-2xl font-black text-white">
                    Apply Leave
                  </h2>
                </div>
              </div>

              <div className="space-y-6">

                {/* FROM DATE */}
                <div>
                  <label className="text-gray-300 text-sm mb-2 block">
                    From Date
                  </label>

                  <div className="relative">
                    <FaCalendarAlt className="absolute top-1/2 left-4 -translate-y-1/2 text-cyan-400" />

                    <input
                      type="date"
                      value={fromDate}
                      onChange={(e) =>
                        setFromDate(e.target.value)
                      }
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition"
                    />
                  </div>
                </div>

                {/* TO DATE */}
                <div>
                  <label className="text-gray-300 text-sm mb-2 block">
                    To Date
                  </label>

                  <div className="relative">
                    <FaCalendarAlt className="absolute top-1/2 left-4 -translate-y-1/2 text-cyan-400" />

                    <input
                      type="date"
                      value={toDate}
                      onChange={(e) =>
                        setToDate(e.target.value)
                      }
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition"
                    />
                  </div>
                </div>

                {/* REASON */}
                <div>
                  <label className="text-gray-300 text-sm mb-2 block">
                    Reason
                  </label>

                  <textarea
                    rows={5}
                    value={reason}
                    onChange={(e) =>
                      setReason(e.target.value)
                    }
                    placeholder="Family function, medical leave, personal work..."
                    className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 text-white placeholder-gray-400 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition resize-none"
                  />
                </div>

                {/* BUTTON */}
                <button
                  onClick={submitRequest}
                  className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white py-4 rounded-2xl font-bold shadow-xl hover:shadow-cyan-500/30 transition-all duration-300 hover:scale-[1.02]"
                >
                  <FaPaperPlane />
                  Submit Request
                </button>
              </div>
            </div>
          </div>

          {/* ================= REQUEST LIST ================= */}
          <div className="lg:col-span-3">

            <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[32px] shadow-[0_20px_80px_rgba(0,0,0,0.5)] p-8">

              <div className="flex items-center justify-between mb-8">

                <div>
                  <p className="uppercase tracking-[0.25em] text-cyan-300 text-xs mb-2">
                    Leave History
                  </p>

                  <h2 className="text-3xl font-black text-white">
                    My Requests
                  </h2>
                </div>

                <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center">
                  <FaClipboardList className="text-cyan-300 text-2xl" />
                </div>
              </div>

              {myRequests.length === 0 ? (
                <div className="bg-white/5 border border-white/10 rounded-3xl py-16 text-center">
                  <p className="text-gray-400 text-lg">
                    No holiday requests submitted yet.
                  </p>
                </div>
              ) : (
                <div className="space-y-5">
                  {myRequests.map((req) => (
                    <div
                      key={req.id}
                      className="group bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">

                        <div className="flex-1">

                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 flex items-center justify-center">
                              <FaCalendarAlt className="text-cyan-300" />
                            </div>

                            <div>
                              <h3 className="text-white font-bold text-lg">
                                {req.fromDate} → {req.toDate}
                              </h3>

                              <p className="text-gray-400 text-sm">
                                Holiday Duration Request
                              </p>
                            </div>
                          </div>

                          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 ml-0 md:ml-16">
                            <p className="text-gray-300 leading-relaxed">
                              {req.reason}
                            </p>
                          </div>
                        </div>

                        {/* STATUS */}
                        <div
                          className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm ${statusStyle(
                            req.status
                          )}`}
                        >
                          {statusIcon(req.status)}
                          {req.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}