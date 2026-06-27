import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../api/api";

import {
  FaMapMarkerAlt,
  FaBed,
  FaArrowRight,
  FaBuilding,
} from "react-icons/fa";

interface Hostel {
  id: number;
  name: string;
  location: string;
  totalRooms: number;
  availableRooms: number;
  image?: string;
}

export default function HostelList() {
  const [hostels, setHostels] = useState<Hostel[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");

    // ROLE PROTECTION
    if (role !== "STUDENT" && role !== "ROLE_STUDENT") {
      navigate("/login");
      return;
    }

    fetchHostels();
  }, []);

  const fetchHostels = async () => {
    try {
      const res = await api.get("/api/student/hostels");
      setHostels(res.data || []);
    } catch (err) {
      console.error("Failed to load hostels", err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 flex items-center justify-center">

        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-5"></div>

          <p className="text-cyan-200 text-xl font-medium">
            Loading Hostels...
          </p>
        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 relative overflow-hidden">

      {/* BACKGROUND EFFECTS */}
      <div className="absolute top-[-100px] left-[-100px] w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>

      <div className="absolute bottom-[-120px] right-[-80px] w-[28rem] h-[28rem] bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>

      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

      {/* NAVBAR */}
      <div className="relative z-20">
        <Navbar />
      </div>

      {/* MAIN */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">

        {/* HEADER */}
        <div className="mb-12">

          <p className="uppercase tracking-[0.25em] text-cyan-300 text-sm mb-3">
            Student Portal
          </p>

          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Available Hostels
          </h1>

          <p className="text-gray-300 text-lg max-w-2xl leading-relaxed">
            Explore hostel facilities, room availability,
            and choose your preferred accommodation.
          </p>

        </div>

        {/* EMPTY STATE */}
        {hostels.length === 0 ? (
          <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl p-16 text-center">

            <div className="w-20 h-20 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaBuilding className="text-cyan-300 text-3xl" />
            </div>

            <h2 className="text-2xl font-bold text-white mb-3">
              No Hostels Available
            </h2>

            <p className="text-gray-400 text-lg">
              There are currently no hostels available.
            </p>

          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

            {hostels.map((h) => (
              <div
                key={h.id}
                className="
                  group
                  bg-white/10
                  backdrop-blur-2xl
                  border
                  border-white/10
                  rounded-[30px]
                  overflow-hidden
                  shadow-2xl
                  hover:-translate-y-3
                  hover:shadow-cyan-500/20
                  transition-all
                  duration-500
                "
              >

                {/* IMAGE */}
                <div className="relative overflow-hidden">

                  {h.image ? (
                    <img
                      src={
                        h.image.startsWith("http")
                          ? h.image
                          : `http://localhost:8080${h.image}`
                      }
                      className="
                        h-60
                        w-full
                        object-cover
                        group-hover:scale-110
                        transition-transform
                        duration-700
                      "
                      alt={h.name}
                    />
                  ) : (
                    <div className="h-60 bg-gradient-to-br from-cyan-600 to-blue-800 flex items-center justify-center">
                      <FaBuilding className="text-white text-6xl opacity-70" />
                    </div>
                  )}

                  {/* OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

                  {/* ROOM BADGE */}
                  <div className="absolute top-4 right-4 bg-cyan-500/90 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    {h.availableRooms} Rooms Left
                  </div>

                </div>

                {/* CONTENT */}
                <div className="p-6">

                  {/* TITLE */}
                  <div className="mb-5">

                    <h2 className="text-2xl font-black text-white mb-3">
                      {h.name}
                    </h2>

                    <div className="flex items-center gap-2 text-gray-300">
                      <FaMapMarkerAlt className="text-cyan-300" />

                      <span>{h.location}</span>
                    </div>

                  </div>

                  {/* STATS */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-6">

                    <div className="flex items-center justify-between">

                      <div>
                        <p className="text-gray-400 text-sm mb-1">
                          Available Rooms
                        </p>

                        <h3 className="text-3xl font-black text-cyan-300">
                          {h.availableRooms}
                        </h3>
                      </div>

                      <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center">
                        <FaBed className="text-cyan-300 text-2xl" />
                      </div>

                    </div>

                    <div className="mt-4 w-full bg-white/10 rounded-full h-2 overflow-hidden">

                      <div
                        className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                        style={{
                          width: `${
                            (h.availableRooms / h.totalRooms) * 100
                          }%`,
                        }}
                      ></div>

                    </div>

                    <p className="text-gray-400 text-sm mt-2">
                      {h.availableRooms} available out of{" "}
                      {h.totalRooms} total rooms
                    </p>

                  </div>

                  {/* BUTTON */}
                  <button
                    onClick={() =>
                      navigate(`/student/hostel/${h.id}/rooms`)
                    }
                    className="
                      w-full
                      h-[56px]
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
                    "
                  >
                    View Rooms
                    <FaArrowRight className="text-sm" />
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}