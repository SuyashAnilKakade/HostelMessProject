import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

import {
  FaExclamationCircle,
  FaUserGraduate,
  FaEnvelope,
  FaCheck,
  FaTimes,
  FaClipboardList,
} from "react-icons/fa";

interface Complaint {
  id: number;
  student: {
    id: number;
    email: string;
    name: string;
  };
  title: string;
  description: string;
  status: "PENDING" | "RESOLVED" | "REJECTED";
  createdAt: string;
}

export default function AdminComplaints() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const token = localStorage.getItem("token");

  // ================= FETCH =================
  const fetchComplaints = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:8080/api/admin/complaints", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`);
      }

      const data = await res.json();
      setComplaints(data || []);
    } catch (err) {
      console.error("Error fetching complaints:", err);
      setError("Failed to load complaints");
      setComplaints([]);
    } finally {
      setLoading(false);
    }
  };

  // ================= APPROVE =================
  const handleApprove = async (id: number) => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/admin/complaints/${id}/approve`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) fetchComplaints();
      else console.error("Approve failed:", res.status);
    } catch (err) {
      console.error("Approve error:", err);
    }
  };

  // ================= REJECT =================
  const handleReject = async (id: number) => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/admin/complaints/${id}/reject`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) fetchComplaints();
      else console.error("Reject failed:", res.status);
    } catch (err) {
      console.error("Reject error:", err);
    }
  };

  useEffect(() => {
    fetchComplaints();
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
              Complaint Management
            </p>

            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              Student Complaints
            </h1>

            <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
              Review, approve and manage all student complaints
              submitted through the hostel management system.
            </p>
          </div>

          <div className="w-20 h-20 rounded-3xl bg-cyan-500/20 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <FaClipboardList className="text-cyan-300 text-4xl" />
          </div>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/20 text-red-300 px-6 py-4 rounded-2xl backdrop-blur-xl">
            {error}
          </div>
        )}

        {/* LOADING */}
        {loading ? (
          <div className="bg-white/10 border border-white/10 backdrop-blur-2xl rounded-3xl p-10 text-center text-gray-300 shadow-2xl">
            Loading complaints...
          </div>
        ) : complaints.length === 0 ? (
          <div className="bg-white/10 border border-white/10 backdrop-blur-2xl rounded-3xl p-10 text-center text-gray-300 shadow-2xl">
            No complaints found
          </div>
        ) : (
          <div className="space-y-6">

            {complaints.map((c) => (
              <div
                key={c.id}
                className="group bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-2xl hover:-translate-y-2 hover:shadow-cyan-500/20 transition-all duration-500"
              >

                <div className="flex flex-col lg:flex-row justify-between gap-6">

                  {/* LEFT CONTENT */}
                  <div className="flex-1">

                    {/* STUDENT INFO */}
                    <div className="flex flex-wrap items-center gap-4 mb-5">

                      <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center">
                        <FaUserGraduate className="text-cyan-300 text-2xl" />
                      </div>

                      <div>
                        <h2 className="text-white font-bold text-xl">
                          {c.student.name}
                        </h2>

                        <div className="flex items-center gap-2 text-gray-300 text-sm mt-1">
                          <FaEnvelope className="text-cyan-400" />
                          <span>{c.student.email}</span>
                        </div>
                      </div>

                    </div>

                    {/* TITLE */}
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <FaExclamationCircle className="text-cyan-400" />

                        <p className="text-cyan-300 uppercase tracking-wider text-xs font-semibold">
                          Complaint Title
                        </p>
                      </div>

                      <h3 className="text-2xl font-bold text-white">
                        {c.title}
                      </h3>
                    </div>

                    {/* DESCRIPTION */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                      <p className="text-gray-300 leading-relaxed">
                        {c.description}
                      </p>
                    </div>

                  </div>

                  {/* RIGHT SIDE */}
                  <div className="flex flex-col justify-between items-start lg:items-end gap-5">

                    {/* STATUS */}
                    <span
                      className={`px-5 py-2 rounded-full text-sm font-bold tracking-wide shadow-lg ${
                        c.status === "RESOLVED"
                          ? "bg-green-500/20 text-green-300 border border-green-400/20"
                          : c.status === "REJECTED"
                          ? "bg-red-500/20 text-red-300 border border-red-400/20"
                          : "bg-yellow-500/20 text-yellow-300 border border-yellow-400/20"
                      }`}
                    >
                      {c.status}
                    </span>

                    {/* ACTIONS */}
                    {c.status === "PENDING" && (
                      <div className="flex gap-3">

                        <button
                          onClick={() => handleApprove(c.id)}
                          className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white px-5 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-green-500/30 transition-all duration-300 hover:scale-105"
                        >
                          <FaCheck />
                          Approve
                        </button>

                        <button
                          onClick={() => handleReject(c.id)}
                          className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-400 hover:to-pink-500 text-white px-5 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-red-500/30 transition-all duration-300 hover:scale-105"
                        >
                          <FaTimes />
                          Reject
                        </button>

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