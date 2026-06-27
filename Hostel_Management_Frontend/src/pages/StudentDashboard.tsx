import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

import {
  FaCalendarCheck,
  FaBuilding,
  FaUtensils,
  FaCalendarDay,
  FaMoon,
  FaClipboardList,
  FaArrowRight,
} from "react-icons/fa";

import { motion } from "framer-motion";

export default function StudentDashboard() {
  // Mock Student Info
  const studentInfo = {
    name: localStorage.getItem("name") || "Student",
  };

  // Student Service Cards
  const cards = [
    {
      name: "View Hostels",
      link: "/student/hostels",
      color: "from-cyan-500 to-blue-600",
      desc: "Browse hostels and available rooms",
      icon: <FaBuilding className="w-10 h-10 text-cyan-200" />,
    },
    {
      name: "Mess Menu",
      link: "/student/messmenu",
      color: "from-green-500 to-emerald-600",
      desc: "View and vote for daily mess menu",
      icon: <FaUtensils className="w-10 h-10 text-green-200" />,
    },
    {
      name: "Attendance",
      link: "/student/attendance",
      color: "from-yellow-500 to-orange-500",
      desc: "Track your daily attendance record",
      icon: <FaCalendarDay className="w-10 h-10 text-yellow-200" />,
    },
    {
      name: "Night Out",
      link: "/student/nightout",
      color: "from-pink-500 to-rose-600",
      desc: "Submit night out permission requests",
      icon: <FaMoon className="w-10 h-10 text-pink-200" />,
    },
    {
      name: "Complaints",
      link: "/student/complaints",
      color: "from-purple-500 to-fuchsia-600",
      desc: "Raise and manage hostel complaints",
      icon: (
        <FaClipboardList className="w-10 h-10 text-purple-200" />
      ),
    },
    {
      name: "Holiday Request",
      link: "/student/holidays",
      color: "from-sky-500 to-cyan-600",
      desc: "Apply for hostel holiday leave",
      icon: (
        <FaCalendarCheck className="w-10 h-10 text-cyan-200" />
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 relative overflow-hidden">

      {/* ================= BACKGROUND EFFECTS ================= */}
      <div className="absolute top-[-100px] left-[-80px] w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>

      <div className="absolute bottom-[-120px] right-[-80px] w-[28rem] h-[28rem] bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>

      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

      {/* ================= NAVBAR ================= */}
      <div className="relative z-20">
        <Navbar />
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">

        {/* ================= WELCOME SECTION ================= */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[32px] shadow-[0_20px_80px_rgba(0,0,0,0.5)] p-8 md:p-10 mb-12"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">

            {/* LEFT SIDE */}
            <div>
              <p className="uppercase tracking-[0.25em] text-cyan-300 mb-3 text-sm">
                Student Dashboard
              </p>

              <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
                Welcome Back,
                <span className="text-cyan-400">
                  {" "}
                  {studentInfo.name} 
                </span>
              </h1>

              <p className="text-gray-300 text-lg max-w-2xl leading-relaxed">
                Access hostel services, manage attendance,
                request permissions, explore mess menus and
                stay connected with all student activities.
              </p>
            </div>

            {/* RIGHT SIDE - IMPROVED DATE CARD */}
            <div className="bg-white/10 border border-cyan-400/20 rounded-2xl px-7 py-5 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.35)] min-w-[240px]">

              <p className="text-cyan-300 text-sm uppercase tracking-widest font-semibold mb-3">
                Current Date
              </p>

              <div className="space-y-1">
                <h3 className="text-white text-2xl font-extrabold tracking-wide">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                  })}
                </h3>

                <p className="text-gray-200 text-lg font-medium">
                  {new Date().toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ================= SECTION TITLE ================= */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-white mb-2">
            Student Services
          </h2>

          <p className="text-gray-400">
            Access all student hostel and mess related services.
          </p>
        </motion.div>

        {/* ================= SERVICE CARDS ================= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3"
        >
          {cards.map((card, index) => (
            <Link key={index} to={card.link}>
              <div
                className={`group relative h-[260px] bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl hover:shadow-cyan-500/20 hover:-translate-y-3 transition-all duration-500`}
              >
                {/* TOP GRADIENT BAR */}
                <div
                  className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${card.color}`}
                ></div>

                {/* CONTENT */}
                <div className="p-7 h-full flex flex-col justify-between">

                  {/* ICON */}
                  <div
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition duration-300`}
                  >
                    {card.icon}
                  </div>

                  {/* TEXT */}
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {card.name}
                    </h3>

                    <p className="text-gray-300 leading-relaxed text-sm">
                      {card.desc}
                    </p>
                  </div>

                  {/* BUTTON */}
                  <div className="flex items-center justify-between mt-5">

                    <span className="text-cyan-300 font-semibold text-sm">
                      Open Service
                    </span>

                    <div className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center group-hover:bg-cyan-500 transition duration-300">
                      <FaArrowRight className="text-white text-sm" />
                    </div>
                  </div>
                </div>

                {/* HOVER GLOW */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-cyan-500/5 to-blue-500/5"></div>
              </div>
            </Link>
          ))}
        </motion.div>

        {/* ================= FOOTER TEXT ================= */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm tracking-wide">
            Hostel Mess Management Student Dashboard
          </p>
        </div>
      </div>
    </div>
  );
}