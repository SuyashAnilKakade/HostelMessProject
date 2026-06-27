import { useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";

import {
  FaExclamationTriangle,
  FaPaperPlane,
  FaClipboardList,
  FaUtensils,
  FaWater,
  FaBolt,
  FaBroom,
  FaBug,
} from "react-icons/fa";

export default function Complaints() {
  const [issueType, setIssueType] = useState("Quality");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // ================= SUBMIT =================
  const submitComplaint = async () => {
    if (!description.trim()) {
      alert("Please add a description");
      return;
    }

    try {
      setLoading(true);

      await api.post("/api/student/complaints", {
        issueType,
        description,
      });

      alert("Complaint submitted successfully ✅");

      setDescription("");
      setIssueType("Quality");

    } catch (err) {
      console.error(err);
      alert("Failed to submit complaint");
    } finally {
      setLoading(false);
    }
  };

  // ================= ISSUE TYPES =================
  const issueOptions = [
    {
      name: "Quality",
      icon: <FaUtensils />,
    },
    {
      name: "Water",
      icon: <FaWater />,
    },
    {
      name: "Electricity",
      icon: <FaBolt />,
    },
    {
      name: "Cleaning",
      icon: <FaBroom />,
    },
    {
      name: "Pest Control",
      icon: <FaBug />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 relative overflow-hidden">

      {/* BACKGROUND EFFECTS */}
      <div className="absolute top-[-120px] left-[-100px] w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-pulse"></div>

      <div className="absolute bottom-[-120px] right-[-80px] w-[28rem] h-[28rem] bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>

      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

      {/* NAVBAR */}
      <div className="relative z-20">
        <Navbar />
      </div>

      {/* MAIN */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-10">

        {/* HEADER */}
        <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 shadow-[0_20px_80px_rgba(0,0,0,0.5)] mb-10">

          <p className="uppercase tracking-[0.25em] text-red-300 text-sm mb-3">
            Student Support
          </p>

          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Submit Complaint
          </h1>

          <p className="text-gray-300 text-lg max-w-3xl">
            Report hostel or mess related issues directly to
            administration for quick resolution.
          </p>
        </div>

        {/* CONTENT */}
        <div className="grid lg:grid-cols-5 gap-8">

          {/* ================= LEFT SIDE ================= */}
          <div className="lg:col-span-2 space-y-6">

            {/* INFO CARD */}
            <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 shadow-2xl">

              <div className="w-20 h-20 rounded-3xl bg-red-500/20 flex items-center justify-center mb-6">
                <FaExclamationTriangle className="text-red-300 text-4xl" />
              </div>

              <h2 className="text-3xl font-black text-white mb-4">
                Need Help?
              </h2>

              <p className="text-gray-300 leading-relaxed">
                Submit complaints regarding hostel facilities,
                mess food, electricity, water supply, cleaning,
                or maintenance issues.
              </p>
            </div>

            {/* ISSUE TYPES */}
            <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[32px] p-6 shadow-2xl">

              <div className="flex items-center gap-3 mb-6">

                <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center">
                  <FaClipboardList className="text-cyan-300 text-2xl" />
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white">
                    Issue Types
                  </h3>

                  <p className="text-gray-400 text-sm">
                    Common complaint categories
                  </p>
                </div>
              </div>

              <div className="space-y-3">

                {issueOptions.map((issue) => (
                  <button
                    key={issue.name}
                    onClick={() =>
                      setIssueType(issue.name)
                    }
                    className={`
                      w-full
                      flex
                      items-center
                      gap-4
                      px-5
                      py-4
                      rounded-2xl
                      border
                      transition-all
                      duration-300
                      ${
                        issueType === issue.name
                          ? "bg-red-500/20 border-red-400/30 text-red-300"
                          : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                      }
                    `}
                  >
                    <div className="text-xl">
                      {issue.icon}
                    </div>

                    <span className="font-semibold">
                      {issue.name}
                    </span>
                  </button>
                ))}

              </div>
            </div>
          </div>

          {/* ================= FORM ================= */}
          <div className="lg:col-span-3 bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 shadow-2xl">

            <div className="flex items-center gap-4 mb-8">

              <div className="w-16 h-16 rounded-2xl bg-red-500/20 flex items-center justify-center">
                <FaPaperPlane className="text-red-300 text-3xl" />
              </div>

              <div>
                <h2 className="text-3xl font-black text-white">
                  Complaint Form
                </h2>

                <p className="text-gray-400 mt-1">
                  Describe your issue clearly
                </p>
              </div>
            </div>

            {/* ISSUE TYPE */}
            <div className="mb-6">

              <label className="text-gray-300 text-sm mb-3 block">
                Issue Type
              </label>

              <select
                value={issueType}
                onChange={(e) =>
                  setIssueType(e.target.value)
                }
                className="
                  w-full
                  h-[58px]
                  px-5
                  rounded-2xl
                  bg-white/10
                  border
                  border-white/10
                  text-white
                  outline-none
                  focus:border-red-400
                  transition
                "
              >

                {issueOptions.map((issue) => (
                  <option
                    key={issue.name}
                    value={issue.name}
                    className="bg-slate-900"
                  >
                    {issue.name}
                  </option>
                ))}

              </select>
            </div>

            {/* DESCRIPTION */}
            <div className="mb-8">

              <label className="text-gray-300 text-sm mb-3 block">
                Complaint Description
              </label>

              <textarea
                placeholder="Describe your issue in detail..."
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                rows={8}
                className="
                  w-full
                  px-5
                  py-4
                  rounded-2xl
                  bg-white/10
                  border
                  border-white/10
                  text-white
                  placeholder-gray-400
                  outline-none
                  focus:border-red-400
                  transition
                  resize-none
                "
              />
            </div>

            {/* BUTTON */}
            <button
              onClick={submitComplaint}
              disabled={loading}
              className="
                w-full
                h-[60px]
                flex
                items-center
                justify-center
                gap-3
                rounded-2xl
                font-bold
                text-white
                bg-gradient-to-r
                from-red-500
                to-orange-500
                hover:from-red-400
                hover:to-orange-400
                shadow-xl
                hover:shadow-red-500/30
                transition-all
                duration-300
                hover:scale-[1.02]
                disabled:opacity-60
              "
            >
              <FaPaperPlane />

              {loading
                ? "Submitting..."
                : "Submit Complaint"}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}