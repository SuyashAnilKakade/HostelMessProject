import { useEffect, useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";

import {
  FaUtensils,
  FaCheckCircle,
  FaVoteYea,
  FaLeaf,
  FaDrumstickBite,
} from "react-icons/fa";

interface Thali {
  id: number;
  name: string;
  bhaji1: string;
  bhaji2: string;
  rice: string;
  dal: string;
  roti: string;
  sweet: string;
  image: string;
}

export default function MessMenu() {
  const [thalis, setThalis] = useState<Thali[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH MENU ================= */
  const fetchMenu = async () => {
    try {
      const res = await api.get("/api/student/messmenu");
      setThalis(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= CHECK VOTE ================= */
  const checkVote = async () => {
    try {
      const res = await api.get("/api/student/has-voted");
      setHasVoted(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role !== "ROLE_STUDENT" && role !== "STUDENT") {
      return;
    }

    fetchMenu();
    checkVote();
  }, []);

  /* ================= VOTE ================= */
  const vote = async () => {
    if (!selected) {
      alert("Please select a thali");
      return;
    }

    try {
      await api.post("/api/student/vote", {
        thaliId: selected,
      });

      alert("Vote submitted successfully");

      setHasVoted(true);
      setSelected(null);

    } catch (e: any) {
      if (e.response?.status === 403) {
        alert("You already voted");
        setHasVoted(true);
      } else {
        alert("Voting failed");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 relative overflow-hidden">

      {/* ================= BACKGROUND EFFECTS ================= */}
      <div className="absolute top-[-100px] left-[-100px] w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>

      <div className="absolute bottom-[-120px] right-[-100px] w-[30rem] h-[30rem] bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>

      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

      {/* ================= NAVBAR ================= */}
      <div className="relative z-20">
        <Navbar />
      </div>

      {/* ================= MAIN ================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">

        {/* ================= HEADER ================= */}
        <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 shadow-[0_20px_80px_rgba(0,0,0,0.5)] mb-10">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

            <div>
              <p className="uppercase tracking-[0.25em] text-cyan-300 text-sm mb-3">
                Hostel Mess System
              </p>

              <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
                Vote For Today's Thali
              </h1>

              <p className="text-gray-300 text-lg max-w-2xl">
                Select your preferred meal for today's mess menu.
                Your vote helps improve food quality and variety.
              </p>
            </div>

            {/* STATUS CARD */}
            <div className="bg-white/10 border border-white/10 rounded-3xl p-6 min-w-[280px]">

              <div className="flex items-center gap-4">

                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                    hasVoted
                      ? "bg-green-500/20"
                      : "bg-cyan-500/20"
                  }`}
                >
                  {hasVoted ? (
                    <FaCheckCircle className="text-3xl text-green-300" />
                  ) : (
                    <FaVoteYea className="text-3xl text-cyan-300" />
                  )}
                </div>

                <div>
                  <p className="text-gray-400 text-sm mb-1">
                    Voting Status
                  </p>

                  <h2
                    className={`text-2xl font-black ${
                      hasVoted
                        ? "text-green-300"
                        : "text-white"
                    }`}
                  >
                    {hasVoted ? "Voted" : "Pending"}
                  </h2>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* ================= LOADING ================= */}
        {loading ? (
          <div className="bg-white/10 border border-white/10 backdrop-blur-2xl rounded-3xl p-16 text-center text-gray-300 text-lg">
            Loading mess menu...
          </div>
        ) : thalis.length === 0 ? (

          /* ================= EMPTY ================= */
          <div className="bg-white/10 border border-white/10 backdrop-blur-2xl rounded-3xl p-16 text-center text-gray-300 text-lg">
            No thali available today.
          </div>

        ) : (

          <>
            {/* ================= THALI CARDS ================= */}
            <div className="grid lg:grid-cols-2 gap-8 mb-10">

              {thalis.map((t) => {
                const isSelected = selected === t.id;

                return (
                  <div
                    key={t.id}
                    onClick={() => !hasVoted && setSelected(t.id)}
                    className={`
                      relative
                      group
                      cursor-pointer
                      rounded-[32px]
                      overflow-hidden
                      border
                      transition-all
                      duration-300
                      hover:-translate-y-2
                      ${
                        isSelected
                          ? "border-cyan-400 shadow-[0_0_40px_rgba(34,211,238,0.35)]"
                          : "border-white/10"
                      }
                      bg-white/10
                      backdrop-blur-2xl
                    `}
                  >

                    {/* IMAGE */}
                    <div className="relative h-64 overflow-hidden">

                      <img
                        src={`http://localhost:8080${t.image}`}
                        alt={t.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                      {/* SELECTED BADGE */}
                      {isSelected && (
                        <div className="absolute top-5 right-5 bg-cyan-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                          <FaCheckCircle />
                          Selected
                        </div>
                      )}

                      {/* TITLE */}
                      <div className="absolute bottom-5 left-5">

                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xl flex items-center justify-center">
                            <FaUtensils className="text-white text-xl" />
                          </div>

                          <div>
                            <h2 className="text-3xl font-black text-white">
                              {t.name}
                            </h2>

                            <p className="text-cyan-200 text-sm">
                              Complete Meal
                            </p>
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* CONTENT */}
                    <div className="p-6">

                      {/* MENU ITEMS */}
                      <div className="grid grid-cols-2 gap-4 mb-6">

                        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                          <p className="text-gray-400 text-xs mb-2">
                            Bhaji 1
                          </p>

                          <h3 className="text-white font-semibold flex items-center gap-2">
                            <FaLeaf className="text-green-300" />
                            {t.bhaji1}
                          </h3>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                          <p className="text-gray-400 text-xs mb-2">
                            Bhaji 2
                          </p>

                          <h3 className="text-white font-semibold flex items-center gap-2">
                            <FaLeaf className="text-green-300" />
                            {t.bhaji2}
                          </h3>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                          <p className="text-gray-400 text-xs mb-2">
                            Rice
                          </p>

                          <h3 className="text-white font-semibold">
                            {t.rice}
                          </h3>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                          <p className="text-gray-400 text-xs mb-2">
                            Dal
                          </p>

                          <h3 className="text-white font-semibold">
                            {t.dal}
                          </h3>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                          <p className="text-gray-400 text-xs mb-2">
                            Roti
                          </p>

                          <h3 className="text-white font-semibold">
                            {t.roti}
                          </h3>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                          <p className="text-gray-400 text-xs mb-2">
                            Sweet
                          </p>

                          <h3 className="text-white font-semibold flex items-center gap-2">
                            <FaDrumstickBite className="text-pink-300" />
                            {t.sweet}
                          </h3>
                        </div>

                      </div>

                      {/* RADIO */}
                      <div className="flex items-center justify-between">

                        <div>
                          <p className="text-white font-semibold">
                            Choose this thali
                          </p>

                          <p className="text-gray-400 text-sm">
                            Tap to select your preference
                          </p>
                        </div>

                        <div
                          className={`
                            w-7
                            h-7
                            rounded-full
                            border-2
                            flex
                            items-center
                            justify-center
                            transition
                            ${
                              isSelected
                                ? "border-cyan-400"
                                : "border-gray-500"
                            }
                          `}
                        >
                          {isSelected && (
                            <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
                          )}
                        </div>

                      </div>

                    </div>
                  </div>
                );
              })}

            </div>

            {/* ================= SUBMIT BUTTON ================= */}
            <div className="flex justify-center">

              <button
                onClick={vote}
                disabled={hasVoted}
                className={`
                  min-w-[260px]
                  h-[64px]
                  px-10
                  rounded-2xl
                  font-bold
                  text-lg
                  transition-all
                  duration-300
                  flex
                  items-center
                  justify-center
                  gap-3
                  ${
                    hasVoted
                      ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                      : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white hover:scale-105 shadow-xl hover:shadow-cyan-500/30"
                  }
                `}
              >
                {hasVoted ? (
                  <>
                    <FaCheckCircle />
                    Already Voted
                  </>
                ) : (
                  <>
                    <FaVoteYea />
                    Submit Vote
                  </>
                )}
              </button>

            </div>
          </>
        )}
      </div>
    </div>
  );
}