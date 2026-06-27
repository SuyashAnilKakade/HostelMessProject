import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../api/api";

import {
  FaBed,
  FaWifi,
  FaFan,
  FaTable,
  FaDoorOpen,
  FaUsers,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

interface Room {
  id: number;
  roomNumber: string;
  roomType: "Single" | "Double";
  capacity: number;
  services: string[];
  status: "Available" | "Occupied";
}

export default function StudentRoom() {
  const { hostelId } = useParams<{ hostelId: string }>();

  const [rooms, setRooms] = useState<Room[]>([]);
  const [requestedRoomIds, setRequestedRoomIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (hostelId) {
      fetchRooms();
      fetchMyRequests();
    }
  }, [hostelId]);

  /* ================= FETCH ROOMS ================= */
  const fetchRooms = async () => {
    try {
      const res = await api.get(
        `/api/student/rooms/${hostelId}`
      );

      setRooms(res.data);
    } catch (err) {
      console.error("Failed to fetch rooms", err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= FETCH REQUESTS ================= */
  const fetchMyRequests = async () => {
    try {
      const res = await api.get(
        "/api/student/room-requests/my"
      );

      setRequestedRoomIds(
        res.data.map((r: any) => r.roomId)
      );
    } catch (err) {
      console.error("Failed to fetch requests", err);
    }
  };

  /* ================= REQUEST ROOM ================= */
  const requestRoom = async (roomId: number) => {
    try {
      await api.post(
        `/api/student/room-requests/${roomId}`
      );

      alert("Room request sent successfully");

      setRequestedRoomIds((prev) => [
        ...prev,
        roomId,
      ]);
    } catch (err: any) {
      alert(err.response?.data || "Request failed");
    }
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 flex items-center justify-center">

        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-5"></div>

          <p className="text-cyan-200 text-xl font-medium">
            Loading Rooms...
          </p>
        </div>

      </div>
    );
  }

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

      {/* MAIN */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">

        {/* HEADER */}
        <div className="mb-12">

          <p className="uppercase tracking-[0.25em] text-cyan-300 text-sm mb-3">
            Student Portal
          </p>

          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Available Rooms
          </h1>

          <p className="text-gray-300 text-lg max-w-2xl leading-relaxed">
            Browse available hostel rooms, services,
            and request your preferred room instantly.
          </p>

        </div>

        {/* EMPTY */}
        {rooms.length === 0 ? (
          <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl p-16 text-center">

            <div className="w-20 h-20 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaDoorOpen className="text-cyan-300 text-3xl" />
            </div>

            <h2 className="text-2xl font-bold text-white mb-3">
              No Rooms Available
            </h2>

            <p className="text-gray-400 text-lg">
              There are currently no rooms available.
            </p>

          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

            {rooms.map((room) => {
              const alreadyRequested =
                requestedRoomIds.includes(room.id);

              return (
                <div
                  key={room.id}
                  className="
                    group
                    bg-white/10
                    backdrop-blur-2xl
                    border
                    border-white/10
                    rounded-[30px]
                    p-6
                    shadow-2xl
                    hover:-translate-y-3
                    hover:shadow-cyan-500/20
                    transition-all
                    duration-500
                  "
                >

                  {/* TOP */}
                  <div className="flex items-center justify-between mb-6">

                    <div>
                      <h2 className="text-3xl font-black text-white">
                        Room {room.roomNumber}
                      </h2>

                      <p className="text-cyan-300 mt-1">
                        {room.roomType} Room
                      </p>
                    </div>

                    <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center">
                      <FaDoorOpen className="text-cyan-300 text-2xl" />
                    </div>

                  </div>

                  {/* CAPACITY */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-5">

                    <div className="flex items-center justify-between">

                      <div>
                        <p className="text-gray-400 text-sm mb-1">
                          Capacity
                        </p>

                        <h3 className="text-white text-3xl font-black">
                          {room.capacity}
                        </h3>
                      </div>

                      <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                        <FaUsers className="text-cyan-300 text-xl" />
                      </div>

                    </div>

                  </div>

                  {/* SERVICES */}
                  <div className="mb-6">

                    <p className="text-gray-300 mb-3 font-semibold">
                      Services
                    </p>

                    <div className="flex flex-wrap gap-3">

                      {room.services.includes("bed") && (
                        <div className="bg-white/10 px-3 py-2 rounded-xl text-white text-sm flex items-center gap-2">
                          <FaBed />
                          Bed
                        </div>
                      )}

                      {room.services.includes("wifi") && (
                        <div className="bg-white/10 px-3 py-2 rounded-xl text-white text-sm flex items-center gap-2">
                          <FaWifi />
                          WiFi
                        </div>
                      )}

                      {room.services.includes("fan") && (
                        <div className="bg-white/10 px-3 py-2 rounded-xl text-white text-sm flex items-center gap-2">
                          <FaFan />
                          Fan
                        </div>
                      )}

                      {room.services.includes("table") && (
                        <div className="bg-white/10 px-3 py-2 rounded-xl text-white text-sm flex items-center gap-2">
                          <FaTable />
                          Table
                        </div>
                      )}

                      {room.services.length === 0 && (
                        <div className="text-gray-400 text-sm">
                          No services available
                        </div>
                      )}

                    </div>

                  </div>

                  {/* STATUS */}
                  <div
                    className={`flex items-center justify-center gap-3 py-3 rounded-2xl font-bold mb-5 ${
                      room.status === "Available"
                        ? "bg-green-500/20 text-green-300 border border-green-400/20"
                        : "bg-red-500/20 text-red-300 border border-red-400/20"
                    }`}
                  >
                    <FaCheckCircle />
                    {room.status}
                  </div>

                  {/* BUTTON */}
                  {room.status === "Available" && (
                    <button
                      disabled={alreadyRequested}
                      onClick={() =>
                        requestRoom(room.id)
                      }
                      className={`
                        w-full
                        h-[56px]
                        flex
                        items-center
                        justify-center
                        gap-3
                        rounded-2xl
                        font-bold
                        text-white
                        transition-all
                        duration-300
                        ${
                          alreadyRequested
                            ? "bg-gray-500 cursor-not-allowed"
                            : `
                              bg-gradient-to-r
                              from-cyan-500
                              to-blue-600
                              hover:from-cyan-400
                              hover:to-blue-500
                              shadow-xl
                              hover:shadow-cyan-500/30
                              hover:scale-[1.02]
                            `
                        }
                      `}
                    >
                      {alreadyRequested ? (
                        <>
                          <FaClock />
                          Requested
                        </>
                      ) : (
                        <>
                          <FaCheckCircle />
                          Request Room
                        </>
                      )}
                    </button>
                  )}

                </div>
              );
            })}

          </div>
        )}

      </div>
    </div>
  );
}