import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import api from "../api/api";

import {
  FaPlus,
  FaBed,
  FaDoorOpen,
  FaWifi,
  FaFan,
  FaTable,
  FaCheckCircle,
  FaTimes,
} from "react-icons/fa";

interface Hostel {
  id: number;
  name: string;
}

interface Room {
  id: number;
  roomNumber: string;
  roomType: "Single" | "Double";
  capacity: number;
  services: string[];
  status: "Available" | "Occupied";
}

export default function AdminRooms() {
  const [hostels, setHostels] = useState<Hostel[]>([]);
  const [selectedHostel, setSelectedHostel] = useState<number | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    roomNumber: "",
    roomType: "Single" as "Single" | "Double",
    capacity: "",
    services: {
      bed: false,
      fan: false,
      wifi: false,
      table: false,
    },
  });

  /* ================= FETCH HOSTELS ================= */
  const fetchHostels = async () => {
    try {
      const res = await api.get("/api/admin/hostels");
      setHostels(res.data);
    } catch (err) {
      console.error("Failed to fetch hostels", err);
    }
  };

  /* ================= FETCH ROOMS ================= */
  const fetchRooms = async (hostelId: number) => {
    try {
      const res = await api.get(`/api/admin/rooms/${hostelId}`);
      setRooms(res.data);
    } catch (err) {
      console.error("Failed to fetch rooms", err);
    }
  };

  useEffect(() => {
    fetchHostels();
  }, []);

  useEffect(() => {
    if (selectedHostel !== null) {
      fetchRooms(selectedHostel);
    }
  }, [selectedHostel]);

  /* ================= ADD ROOM ================= */
  const addRoom = async () => {
    if (!selectedHostel) {
      alert("Please select a hostel");
      return;
    }

    if (!form.roomNumber || !form.capacity) {
      alert("Please fill required fields");
      return;
    }

    const payload = {
      roomNumber: form.roomNumber,
      roomType: form.roomType,
      capacity: Number(form.capacity),
      services: Object.keys(form.services).filter(
        (s) => form.services[s as keyof typeof form.services]
      ),
    };

    try {
      await api.post(`/api/admin/rooms/${selectedHostel}`, payload);

      alert("Room added successfully");

      setShowForm(false);
      setForm({
        roomNumber: "",
        roomType: "Single",
        capacity: "",
        services: {
          bed: false,
          fan: false,
          wifi: false,
          table: false,
        },
      });

      fetchRooms(selectedHostel);
    } catch (err) {
      console.error("Failed to add room", err);
      alert("Failed to add room");
    }
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

      {/* MAIN */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">
        {/* HEADER */}
        <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 shadow-[0_20px_80px_rgba(0,0,0,0.5)] mb-10">
          <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-10">
            <div className="max-w-3xl">
              <p className="uppercase tracking-[0.25em] text-cyan-300 text-sm mb-3">
                Room Administration
              </p>

              <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
                Hostel Room Management
              </h1>

              <p className="text-gray-300 text-lg leading-relaxed">
                Manage hostel rooms, occupancy status, services and room allocation efficiently.
              </p>
            </div>

            <div className="w-full xl:w-auto">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="w-full sm:w-[340px]">
                  <div className="relative group">
                    <div className="absolute -inset-[1px] bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-300"></div>

                    <div className="relative bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
                      <select
                        value={selectedHostel ?? ""}
                        onChange={(e) =>
                          setSelectedHostel(
                            e.target.value ? Number(e.target.value) : null
                          )
                        }
                        className="w-full h-[60px] appearance-none bg-transparent px-5 pr-14 text-white text-base font-semibold outline-none cursor-pointer"
                      >
                        <option value="" className="bg-slate-900 text-gray-300">
                          Select Hostel
                        </option>

                        {hostels.map((h) => (
                          <option
                            key={h.id}
                            value={h.id}
                            className="bg-slate-900 text-white"
                          >
                            {h.name}
                          </option>
                        ))}
                      </select>

                      <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg
                          className="w-5 h-5 text-cyan-300"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="h-[24px] mt-2 flex items-center">
                    {selectedHostel && (
                      <p className="text-cyan-300 text-sm font-medium tracking-wide">
                        Rooms for selected hostel
                      </p>
                    )}
                  </div>
                </div>

                <div className="sm:pt-0 pt-1">
                  {selectedHostel && (
                    <button
                      onClick={() => setShowForm(true)}
                      className="h-[60px] min-w-[190px] px-8 flex items-center justify-center gap-3 rounded-2xl font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-xl hover:shadow-cyan-500/30 transition-all duration-300 hover:scale-[1.03] active:scale-100 whitespace-nowrap"
                    >
                      <FaPlus className="text-sm" />
                      Add Room
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ROOMS */}
        {selectedHostel ? (
          rooms.length === 0 ? (
            <div className="bg-white/10 border border-white/10 backdrop-blur-2xl rounded-3xl p-16 text-center text-gray-300 text-lg">
              No rooms added yet.
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {rooms.map((room) => (
                <div
                  key={room.id}
                  className="group bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-2xl hover:-translate-y-3 hover:shadow-cyan-500/20 transition-all duration-500"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-3xl font-black text-white">
                        {room.roomNumber}
                      </h2>

                      <p className="text-cyan-300 mt-1">
                        {room.roomType} Room
                      </p>
                    </div>

                    <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center">
                      <FaDoorOpen className="text-cyan-300 text-2xl" />
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-5">
                    <p className="text-gray-400 text-sm mb-1">Capacity</p>
                    <h3 className="text-white text-2xl font-black">
                      {room.capacity}
                    </h3>
                  </div>

                  <div className="mb-5">
                    <p className="text-gray-300 mb-3 font-semibold">
                      Services
                    </p>

                    <div className="flex flex-wrap gap-3">
                      {room.services?.includes("bed") && (
                        <div className="bg-white/10 px-3 py-2 rounded-xl text-white text-sm flex items-center gap-2">
                          <FaBed />
                          Bed
                        </div>
                      )}

                      {room.services?.includes("wifi") && (
                        <div className="bg-white/10 px-3 py-2 rounded-xl text-white text-sm flex items-center gap-2">
                          <FaWifi />
                          WiFi
                        </div>
                      )}

                      {room.services?.includes("fan") && (
                        <div className="bg-white/10 px-3 py-2 rounded-xl text-white text-sm flex items-center gap-2">
                          <FaFan />
                          Fan
                        </div>
                      )}

                      {room.services?.includes("table") && (
                        <div className="bg-white/10 px-3 py-2 rounded-xl text-white text-sm flex items-center gap-2">
                          <FaTable />
                          Table
                        </div>
                      )}
                    </div>
                  </div>

                  <div
                    className={`flex items-center justify-center gap-3 py-3 rounded-2xl font-bold ${
                      room.status === "Available"
                        ? "bg-green-500/20 text-green-300 border border-green-400/20"
                        : "bg-red-500/20 text-red-300 border border-red-400/20"
                    }`}
                  >
                    <FaCheckCircle />
                    {room.status}
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="bg-white/10 border border-white/10 backdrop-blur-2xl rounded-3xl p-16 text-center text-gray-300 text-lg">
            Please select a hostel to manage rooms.
          </div>
        )}
      </div>

      {/* ================= ADD ROOM MODAL ================= */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="w-full max-w-2xl bg-slate-900 border border-white/10 rounded-3xl shadow-2xl p-8 relative">
            {/* CLOSE */}
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-5 right-5 text-gray-300 hover:text-white text-xl"
            >
              <FaTimes />
            </button>

            <h2 className="text-3xl font-black text-white mb-2">
              Add New Room
            </h2>
            <p className="text-gray-400 mb-8">
              Fill the details below to create a room for the selected hostel.
            </p>

            <div className="grid md:grid-cols-2 gap-5">
              {/* ROOM NUMBER */}
              <div>
                <label className="block text-gray-300 mb-2">Room Number</label>
                <input
                  type="text"
                  value={form.roomNumber}
                  onChange={(e) =>
                    setForm({ ...form, roomNumber: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white outline-none"
                  placeholder="Enter room number"
                />
              </div>

              {/* ROOM TYPE */}
              <div>
                <label className="block text-gray-300 mb-2">Room Type</label>
                <select
                  value={form.roomType}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      roomType: e.target.value as "Single" | "Double",
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white outline-none"
                >
                  <option value="Single" className="bg-slate-900">
                    Single
                  </option>
                  <option value="Double" className="bg-slate-900">
                    Double
                  </option>
                </select>
              </div>

              {/* CAPACITY */}
              <div className="md:col-span-2">
                <label className="block text-gray-300 mb-2">Capacity</label>
                <input
                  type="number"
                  value={form.capacity}
                  onChange={(e) =>
                    setForm({ ...form, capacity: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white outline-none"
                  placeholder="Enter room capacity"
                />
              </div>

              {/* SERVICES */}
              <div className="md:col-span-2">
                <label className="block text-gray-300 mb-3">Services</label>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {(["bed", "fan", "wifi", "table"] as const).map((service) => (
                    <label
                      key={service}
                      className="flex items-center gap-3 bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={form.services[service]}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            services: {
                              ...form.services,
                              [service]: e.target.checked,
                            },
                          })
                        }
                      />
                      <span className="capitalize">{service}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={() => setShowForm(false)}
                className="px-6 py-3 rounded-xl border border-white/10 text-gray-300 hover:bg-white/10"
              >
                Cancel
              </button>

              <button
                onClick={addRoom}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold hover:from-cyan-400 hover:to-blue-500"
              >
                Save Room
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}