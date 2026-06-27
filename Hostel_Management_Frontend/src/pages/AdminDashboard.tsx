import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

import {
  FaBuilding,
  FaBed,
  FaClipboardList,
  FaUtensils,
  FaCalendarAlt,
  FaExclamationCircle,
  FaCalendarDay,
  FaMoon,
  FaArrowRight,
} from "react-icons/fa";

import { motion } from "framer-motion";

export default function AdminDashboard() {

  // (optional safety) role check
  const role = localStorage.getItem("role");

  const cards = [
    {
      name: "Hostel Management",
      link: "/admin/hostels",
      color: "from-cyan-500 to-blue-600",
      desc: "Add & manage hostel details efficiently",
      icon: <FaBuilding className="w-10 h-10 text-cyan-300" />,
    },
    {
      name: "Room Management",
      link: "/admin/rooms",
      color: "from-green-500 to-emerald-600",
      desc: "Add and manage hostel rooms easily",
      icon: <FaBed className="w-10 h-10 text-green-300" />,
    },
    {
      name: "Room Requests",
      link: "/admin/requests",
      color: "from-yellow-500 to-orange-500",
      desc: "Approve or reject room requests",
      icon: <FaClipboardList className="w-10 h-10 text-yellow-200" />,
    },
    {
      name: "Mess Menu",
      link: "/admin/messmenu",
      color: "from-pink-500 to-rose-600",
      desc: "Manage daily & weekly mess menus",
      icon: <FaUtensils className="w-10 h-10 text-pink-200" />,
    },
    {
      name: "Night Out Requests",
      link: "/admin/nightout",
      color: "from-purple-500 to-indigo-600",
      desc: "Approve student night out requests",
      icon: <FaMoon className="w-10 h-10 text-purple-200" />,
    },
    {
      name: "Holiday Requests",
      link: "/admin/holidays",
      color: "from-sky-500 to-cyan-600",
      desc: "Manage holiday leave requests",
      icon: <FaCalendarAlt className="w-10 h-10 text-cyan-200" />,
    },
    {
      name: "Complaints",
      link: "/admin/complaints",
      color: "from-red-500 to-pink-600",
      desc: "Track and resolve student complaints",
      icon: <FaExclamationCircle className="w-10 h-10 text-red-200" />,
    },
    {
      name: "Attendance",
      link: "/admin/attendance",
      color: "from-indigo-500 to-violet-600",
      desc: "Monitor and manage attendance",
      icon: <FaCalendarDay className="w-10 h-10 text-violet-200" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 relative overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute top-[-100px] left-[-80px] w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-120px] right-[-80px] w-[28rem] h-[28rem] bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

      {/* NAVBAR */}
      <div className="relative z-20">
        <Navbar />
      </div>

      {/* MAIN */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">

        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[32px] shadow-2xl p-8 mb-12"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">

            <div>
              <p className="uppercase tracking-[0.25em] text-cyan-300 mb-3 text-sm">
                Hostel Administration Panel
              </p>

              <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
                Welcome Back,
                <span className="text-cyan-400"> Admin 👋</span>
              </h1>

              <p className="text-gray-300 text-lg max-w-2xl">
                Manage hostels, rooms, attendance, complaints, mess operations
                and student activities from one dashboard.
              </p>
            </div>

            {/* DATE */}
            <div className="bg-white/10 border border-cyan-400/20 rounded-2xl px-7 py-5 backdrop-blur-xl min-w-[230px]">

              <p className="text-cyan-300 text-sm uppercase tracking-widest font-semibold mb-3">
                Current Date
              </p>

              <h3 className="text-white text-2xl font-extrabold">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                })}
              </h3>

              <p className="text-gray-200 text-lg">
                {new Date().toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>

              {/* ROLE DEBUG (optional) */}
              <p className="text-xs text-gray-400 mt-2">
                Role: {role}
              </p>

            </div>
          </div>
        </motion.div>

        {/* TITLE */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Management Modules
          </h2>
          <p className="text-gray-400">
            Access and manage all hostel modules
          </p>
        </div>

        {/* CARDS */}
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">

          {cards.map((card, index) => (
            <Link key={index} to={card.link}>

              <div className="group relative h-[260px] bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl hover:-translate-y-3 transition">

                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${card.color}`}></div>

                <div className="p-7 h-full flex flex-col justify-between">

                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center`}>
                    {card.icon}
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {card.name}
                    </h3>
                    <p className="text-gray-300 text-sm">
                      {card.desc}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-cyan-300 font-semibold text-sm">
                      Open Module
                    </span>
                    <FaArrowRight className="text-white" />
                  </div>

                </div>
              </div>

            </Link>
          ))}

        </div>

        {/* FOOTER */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm">
            Hostel Mess Management Admin Dashboard
          </p>
        </div>

      </div>
    </div>
  );
}