import { useEffect, useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";

import {
  FaMoon,
  FaClock,
  FaCalendarAlt,
  FaClipboardList,
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
  FaPaperPlane,
} from "react-icons/fa";

// ================= TYPES =================
interface NightOutRequest {
  id: number;
  date: string;
  returnTime: string;
  reason: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
}

export default function NightOut() {
  const [date, setDate] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const [returnTime, setReturnTime] = useState<string>("");

  const [myRequests, setMyRequests] = useState<
    NightOutRequest[]
  >([]);

  const [loading, setLoading] = useState(false);

  // ================= SUBMIT =================
  const submitRequest = async () => {
    if (!date || !reason || !returnTime) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await api.post("/api/student/nightout", {
        date,
        reason,
        returnTime,
      });

      alert("Night out request submitted successfully ✅");

      setDate("");
      setReason("");
      setReturnTime("");

      fetchMyRequests();

    } catch (err) {
      console.error(err);
      alert("Failed to submit request");
    } finally {
      setLoading(false);
    }
  };

  // ================= FETCH =================
  const fetchMyRequests = async () => {
    try {
      const res = await api.get<NightOutRequest[]>(
        "/api/student/nightout/my"
      );

      setMyRequests(res.data || []);

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMyRequests();
  }, []);

  // ================= STATUS STYLING =================
  const statusStyle = (
    status: "PENDING" | "APPROVED" | "REJECTED"
  ) => {
    switch (status) {
      case "APPROVED":
        return {
          color:
            "bg-green-500/20 text-green-300 border border-green-400/20",
          icon: <FaCheckCircle />,
        };

      case "REJECTED":
        return {
          color:
            "bg-red-500/20 text-red-300 border border-red-400/20",
          icon: <FaTimesCircle />,
        };

      default:
        return {
          color:
            "bg-yellow-500/20 text-yellow-300 border border-yellow-400/20",
          icon: <FaHourglassHalf />,
        };
    }
  };

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
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-10">

        {/* HEADER */}
        <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 shadow-[0_20px_80px_rgba(0,0,0,0.5)] mb-10">

          <p className="uppercase tracking-[0.25em] text-cyan-300 text-sm mb-3">
            Student Services
          </p>

          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Night Out Request
          </h1>

          <p className="text-gray-300 text-lg max-w-3xl">
            Submit your night out request and track approval
            status from hostel administration.
          </p>
        </div>

        {/* CONTENT */}
        <div className="grid lg:grid-cols-2 gap-8">

          {/* ================= FORM ================= */}
          <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 shadow-2xl">

            <div className="flex items-center gap-4 mb-8">

              <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 flex items-center justify-center">
                <FaMoon className="text-cyan-300 text-3xl" />
              </div>

              <div>
                <h2 className="text-3xl font-black text-white">
                  Submit Request
                </h2>

                <p className="text-gray-400 mt-1">
                  Fill all required details
                </p>
              </div>
            </div>

            <div className="space-y-5">

              {/* DATE */}
              <div>
                <label className="text-gray-300 text-sm mb-2 block">
                  Date
                </label>

                <div className="relative">

                  <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-300" />

                  <input
                    type="date"
                    value={date}
                    onChange={(e) =>
                      setDate(e.target.value)
                    }
                    className="
                      w-full
                      h-[58px]
                      pl-12
                      pr-4
                      rounded-2xl
                      bg-white/10
                      border
                      border-white/10
                      text-white
                      outline-none
                      focus:border-cyan-400
                      transition
                    "
                  />
                </div>
              </div>

              {/* RETURN TIME */}
              <div>
                <label className="text-gray-300 text-sm mb-2 block">
                  Return Time
                </label>

                <div className="relative">

                  <FaClock className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-300" />

                  <input
                    type="time"
                    value={returnTime}
                    onChange={(e) =>
                      setReturnTime(e.target.value)
                    }
                    className="
                      w-full
                      h-[58px]
                      pl-12
                      pr-4
                      rounded-2xl
                      bg-white/10
                      border
                      border-white/10
                      text-white
                      outline-none
                      focus:border-cyan-400
                      transition
                    "
                  />
                </div>
              </div>

              {/* REASON */}
              <div>
                <label className="text-gray-300 text-sm mb-2 block">
                  Reason
                </label>

                <div className="relative">

                  <FaClipboardList className="absolute left-4 top-5 text-cyan-300" />

                  <textarea
                    placeholder="Enter reason for night out..."
                    value={reason}
                    onChange={(e) =>
                      setReason(e.target.value)
                    }
                    rows={5}
                    className="
                      w-full
                      pl-12
                      pr-4
                      py-4
                      rounded-2xl
                      bg-white/10
                      border
                      border-white/10
                      text-white
                      placeholder-gray-400
                      outline-none
                      focus:border-cyan-400
                      transition
                      resize-none
                    "
                  />
                </div>
              </div>

              {/* BUTTON */}
              <button
                onClick={submitRequest}
                disabled={loading}
                className="
                  w-full
                  h-[58px]
                  flex
                  items-center
                  justify-center
                  gap-3
                  rounded-2xl
                  font-bold
                  text-white
                  bg-gradient-to-r
                  from-cyan-500
                  to-blue-600
                  hover:from-cyan-400
                  hover:to-blue-500
                  shadow-xl
                  hover:shadow-cyan-500/30
                  transition-all
                  duration-300
                  hover:scale-[1.02]
                  disabled:opacity-60
                "
              >
                <FaPaperPlane />

                {loading
                  ? "Submitting..."
                  : "Submit Request"}
              </button>

            </div>
          </div>

          {/* ================= HISTORY ================= */}
          <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[32px] shadow-2xl overflow-hidden">

            {/* HEADER */}
            <div className="border-b border-white/10 px-8 py-6 flex items-center gap-4">

              <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 flex items-center justify-center">
                <FaClipboardList className="text-cyan-300 text-3xl" />
              </div>

              <div>
                <h2 className="text-3xl font-black text-white">
                  My Requests
                </h2>

                <p className="text-gray-400 mt-1">
                  Track all submitted requests
                </p>
              </div>
            </div>

            {/* LIST */}
            <div className="p-6 space-y-5 max-h-[700px] overflow-y-auto">

              {myRequests.length === 0 ? (
                <div className="text-center py-16 text-gray-400">
                  No requests submitted yet.
                </div>
              ) : (
                myRequests.map((req) => {
                  const style = statusStyle(req.status);

                  return (
                    <div
                      key={req.id}
                      className="
                        bg-white/5
                        border
                        border-white/10
                        rounded-3xl
                        p-6
                        hover:bg-white/10
                        transition
                      "
                    >

                      {/* TOP */}
                      <div className="flex items-start justify-between gap-4 mb-5">

                        <div>
                          <h3 className="text-xl font-bold text-white mb-2">
                            Night Out Request
                          </h3>

                          <div className="space-y-2 text-gray-300">

                            <p className="flex items-center gap-2">
                              <FaCalendarAlt className="text-cyan-300" />
                              {new Date(
                                req.date
                              ).toLocaleDateString()}
                            </p>

                            <p className="flex items-center gap-2">
                              <FaClock className="text-cyan-300" />
                              Return by {req.returnTime}
                            </p>
                          </div>
                        </div>

                        <div
                          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold ${style.color}`}
                        >
                          {style.icon}
                          {req.status}
                        </div>
                      </div>

                      {/* REASON */}
                      <div className="bg-white/5 rounded-2xl p-4 border border-white/5">

                        <p className="text-gray-400 text-sm mb-2">
                          Reason
                        </p>

                        <p className="text-white leading-relaxed">
                          {req.reason}
                        </p>
                      </div>

                    </div>
                  );
                })
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}