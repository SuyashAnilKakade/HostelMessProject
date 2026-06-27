import { useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaUtensils,
  FaClipboardList,
  FaLock,
} from "react-icons/fa";
import { motion } from "framer-motion";

const features = [
  {
    title: "Student Management",
    description:
      "Easily manage hostel students and room allocation.",
    icon: <FaUsers className="text-cyan-400 text-5xl" />,
  },
  {
    title: "Mess Voting",
    description:
      "Smart digital mess menu with live voting system.",
    icon: <FaUtensils className="text-green-400 text-5xl" />,
  },
  {
    title: "Complaints",
    description:
      "Raise and track complaints online instantly.",
    icon: <FaClipboardList className="text-pink-400 text-5xl" />,
  },
  {
    title: "Secure Access",
    description:
      "JWT authentication with protected admin/student routes.",
    icon: <FaLock className="text-yellow-400 text-5xl" />,
  },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 overflow-hidden relative">

      {/* ================= BACKGROUND EFFECTS ================= */}
      <div className="absolute top-[-120px] left-[-80px] w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>

      <div className="absolute bottom-[-140px] right-[-100px] w-[28rem] h-[28rem] bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>

      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

      {/* ================= NAVBAR ================= */}
      <nav className="w-full px-6 md:px-10 py-5 flex items-center justify-between backdrop-blur-xl bg-white/5 border-b border-white/10 relative z-20">

        {/* LOGO */}
        <h1
          className="text-3xl md:text-5xl font-extrabold tracking-wide cursor-pointer select-none"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 bg-clip-text text-transparent">
            HostelMess
          </span>
        </h1>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-5">

          {/* PROFILE ICON */}
          <div className="w-11 h-11 rounded-full border border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition cursor-pointer">
            <i className="bx bx-user text-2xl text-white"></i>
          </div>

          {/* LOGIN BUTTON */}
          <button
            onClick={() => navigate("/login")}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 hover:scale-105"
          >
            Login
          </button>
        </div>
      </nav>

      {/* ================= HERO SECTION ================= */}
      <main className="flex-grow flex items-center relative z-10 px-6 md:px-10 py-16">

        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">

          {/* ================= LEFT CONTENT ================= */}
          <motion.div
            initial={{ opacity: 0, x: -70 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="text-white"
          >
            <p className="uppercase tracking-[0.25em] text-cyan-300 mb-5 text-sm md:text-base">
              Smart Digital Hostel Platform
            </p>

            <h1 className="text-5xl md:text-7xl font-black leading-[1.05] mb-8">
              Hostel &
              <span className="text-cyan-400"> Mess </span>
              <br />
              Management
            </h1>

            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mb-10">
              Simplify hostel administration, automate mess management,
              track attendance, manage complaints, and handle room allocation —
              all in one intelligent platform.
            </p>

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-5">

              <button
                onClick={() => navigate("/login")}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-8 py-4 rounded-2xl text-lg font-bold shadow-xl hover:shadow-cyan-500/30 transition-all duration-300 hover:scale-105"
              >
                Get Started
              </button>

              <button
                onClick={() => navigate("/register")}
                className="border border-white/20 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 hover:scale-105"
              >
                Create Account
              </button>
            </div>
          </motion.div>

          {/* ================= RIGHT FEATURE CARDS ================= */}
          <motion.div
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="grid sm:grid-cols-2 gap-6"
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="group h-[250px] bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl p-7 shadow-2xl hover:shadow-cyan-500/20 hover:border-cyan-400/30 transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="mb-5 transition-transform duration-300 group-hover:scale-110">
                    {feature.icon}
                  </div>

                  <h3 className="text-white text-2xl font-bold mb-3">
                    {feature.title}
                  </h3>

                  <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                    {feature.description}
                  </p>
                </div>

                {/* Bottom Accent Line */}
                <div className="w-16 h-1 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"></div>
              </div>
            ))}
          </motion.div>
        </div>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="relative z-20 border-t border-white/10 bg-black/30 backdrop-blur-xl py-5 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} Hostel Mess Management System.
        All rights reserved.
      </footer>
    </div>
  );
};

export default Home;