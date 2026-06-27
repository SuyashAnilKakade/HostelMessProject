
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/api";

import {
  FaBuilding,
  FaMapMarkerAlt,
  FaBed,
  FaPlus,
  FaImage,
} from "react-icons/fa";

interface Hostel {
  id: number;
  name: string;
  location: string;
  totalRooms: number;
  allottedRooms: number;
  availableRooms: number;
  description: string;
  image: string;
}

export default function AdminHostels() {
  const [hostels, setHostels] = useState<Hostel[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  // ================= FORM STATE =================
  const [form, setForm] = useState<{
    name: string;
    location: string;
    totalRooms: string;
    availableRooms: string;
    description: string;
    image: File | null;
  }>({
    name: "",
    location: "",
    totalRooms: "",
    availableRooms: "",
    description: "",
    image: null,
  });

  /* ================= FETCH HOSTELS ================= */
  const fetchHostels = async () => {
    try {
      const res = await api.get("/api/admin/hostels");
      setHostels(res.data);
    } catch (error) {
      console.error("Failed to fetch hostels", error);
      alert("Failed to load hostels");
    }
  };

  useEffect(() => {
    fetchHostels();
  }, []);

  /* ================= ADD HOSTEL ================= */
  const addHostel = async () => {
    setLoading(true);

    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("location", form.location);
    formData.append("totalRooms", form.totalRooms);

    // allottedRooms auto set to 0
    formData.append("allottedRooms", "0");

    formData.append(
      "availableRooms",
      form.availableRooms || form.totalRooms
    );

    formData.append("description", form.description);

    if (form.image) {
      formData.append("image", form.image);
    }

    try {
      await api.post("/api/admin/hostels", formData);

      await fetchHostels();

      resetForm();

      setShowForm(false);
    } catch (err) {
      console.error("Failed to add hostel", err);
      alert("Failed to add hostel");
    } finally {
      setLoading(false);
    }
  };

  /* ================= EDIT HOSTEL ================= */

  const updateHostel = async () => {
  if (!editId) return;

  setLoading(true);

  const formData = new FormData();

  formData.append("name", form.name);
  formData.append("location", form.location);
  formData.append("totalRooms", form.totalRooms);
  formData.append("allottedRooms", "0");
  formData.append("availableRooms", form.availableRooms || form.totalRooms);
  formData.append("description", form.description);

  if (form.image) {
    formData.append("image", form.image);
  }

  try {
    await api.put(`/api/admin/hostels/${editId}`, formData);

    await fetchHostels();

    resetForm();
    setEditId(null);
    setShowForm(false);

  } catch (err) {
    console.error("Failed to update hostel", err);
    alert("Failed to update hostel");
  } finally {
    setLoading(false);
  }
};


  /* ================= RESET FORM ================= */
  const resetForm = () => {
    setForm({
      name: "",
      location: "",
      totalRooms: "",
      availableRooms: "",
      description: "",
      image: null,
    });
  };

  /* ================= UI ================= */
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

        {/* ================= HEADER ================= */}
        <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[32px] shadow-[0_20px_80px_rgba(0,0,0,0.5)] p-8 mb-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">

          <div>
            <p className="uppercase tracking-[0.25em] text-cyan-300 mb-3 text-sm">
              Hostel Administration
            </p>

            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              Hostel Management
            </h1>

            <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
              Add, manage and monitor all hostel details,
              room availability and allocations from one place.
            </p>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-7 py-4 rounded-2xl font-bold shadow-xl hover:shadow-cyan-500/30 transition-all duration-300 hover:scale-105"
          >
            <FaPlus />
            Add Hostel
          </button>
        </div>

        {/* ================= HOSTEL CARDS ================= */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {hostels.map((h) => (
            <div
              key={h.id}
              className="group bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl hover:-translate-y-3 hover:shadow-cyan-500/20 transition-all duration-500"
            >
              {/* IMAGE */}
              {h.image && (
                <div className="overflow-hidden">
                  <img
                    src={`http://localhost:8080${h.image}`}
                    alt={h.name}
                    className="h-56 w-full object-cover group-hover:scale-110 transition duration-700"
                  />
                </div>
              )}

              {/* CONTENT */}
              <div className="p-6">

                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-bold text-2xl text-white">
                    {h.name}
                  </h2>

                  <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                    <FaBuilding className="text-cyan-300 text-xl" />
                  </div>
                </div>

                <div className="flex items-center gap-2 text-gray-300 mb-4">
                  <FaMapMarkerAlt className="text-cyan-400" />
                  <p>{h.location}</p>
                </div>

                <p className="text-gray-300 leading-relaxed text-sm mb-6">
                  {h.description}
                </p>

               {/* STATS */}
<div className="grid grid-cols-3 gap-3 mb-6">

  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center backdrop-blur-xl">
    <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">
      Total
    </p>

    <h3 className="text-white font-black text-xl">
      {h.totalRooms}
    </h3>
  </div>

  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center backdrop-blur-xl">
    <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">
      Allotted
    </p>

    <h3 className="text-yellow-300 font-black text-xl">
      {h.allottedRooms}
    </h3>
  </div>

  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center backdrop-blur-xl">
    <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">
      Available
    </p>

    <h3 className="text-green-300 font-black text-xl">
      {h.availableRooms}
    </h3>
  </div>
</div>

{/* ACTION BUTTONS */}
<div className="flex gap-3">

  {/* EDIT BUTTON */}
  <button
    onClick={() => {
      setEditId(h.id);
      setShowForm(true);

      setForm({
        name: h.name,
        location: h.location,
        totalRooms: String(h.totalRooms),
        availableRooms: String(h.availableRooms),
        description: h.description,
        image: null,
      });
    }}
    className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white py-3 rounded-2xl font-semibold shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 hover:scale-[1.03]"
  >
    Edit
  </button>

  {/* DELETE BUTTON */}
  <button
    onClick={async () => {
      if (!window.confirm("Are you sure you want to delete this hostel?")) return;

      try {
        await api.delete(`/api/admin/hostels/${h.id}`);
        await fetchHostels();
      } catch (err) {
        console.error("Delete failed", err);
        alert("Failed to delete hostel");
      }
    }}
    className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-400 hover:to-pink-500 text-white py-3 rounded-2xl font-semibold shadow-lg hover:shadow-red-500/30 transition-all duration-300 hover:scale-[1.03]"
  >
    Delete
  </button>

</div>
              </div>
            </div>
          ))}
        </div>

        {/* ================= MODAL ================= */}
        {showForm && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm overflow-y-auto z-50 px-4 py-20">
  <div className="min-h-full flex items-center justify-center">

           <div className="w-full max-w-3xl max-h-[95vh] overflow-y-auto bg-slate-900/95 border border-white/10 backdrop-blur-2xl rounded-[32px] shadow-[0_20px_80px_rgba(0,0,0,0.6)]">

              {/* HEADER */}
              <div className="border-b border-white/10 px-8 py-6 flex items-center justify-between">

                <div>
                  <p className="uppercase tracking-[0.25em] text-cyan-300 text-xs mb-2">
                    Hostel Form
                  </p>

                  <h2 className="text-3xl font-black text-white">
                    Add New Hostel
                  </h2>
                </div>

                <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center">
                  <FaBuilding className="text-cyan-300 text-2xl" />
                </div>
              </div>

              {/* FORM */}
              <div className="p-8">

                <div className="grid md:grid-cols-2 gap-6">

                  {/* HOSTEL NAME */}
                  <div>
                    <label className="text-gray-300 text-sm mb-2 block">
                      Hostel Name
                    </label>

                    <div className="relative">
                      <FaBuilding className="absolute top-1/2 left-4 -translate-y-1/2 text-cyan-400" />

                      <input
                        placeholder="Enter hostel name"
                        value={form.name}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            name: e.target.value,
                          })
                        }
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-400 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition"
                      />
                    </div>
                  </div>

                  {/* LOCATION */}
                  <div>
                    <label className="text-gray-300 text-sm mb-2 block">
                      Location
                    </label>

                    <div className="relative">
                      <FaMapMarkerAlt className="absolute top-1/2 left-4 -translate-y-1/2 text-cyan-400" />

                      <input
                        placeholder="Enter location"
                        value={form.location}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            location: e.target.value,
                          })
                        }
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-400 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition"
                      />
                    </div>
                  </div>

                  {/* TOTAL ROOMS */}
                  <div>
                    <label className="text-gray-300 text-sm mb-2 block">
                      Total Rooms
                    </label>

                    <div className="relative">
                      <FaBed className="absolute top-1/2 left-4 -translate-y-1/2 text-cyan-400" />

                      <input
                        type="number"
                        placeholder="Total rooms"
                        value={form.totalRooms}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            totalRooms: e.target.value,
                          })
                        }
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-400 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition"
                      />
                    </div>
                  </div>

                  {/* AVAILABLE ROOMS */}
                  <div>
                    <label className="text-gray-300 text-sm mb-2 block">
                      Available Rooms
                    </label>

                    <div className="relative">
                      <FaBed className="absolute top-1/2 left-4 -translate-y-1/2 text-cyan-400" />

                      <input
                        type="number"
                        placeholder="Available rooms"
                        value={form.availableRooms}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            availableRooms: e.target.value,
                          })
                        }
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-400 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition"
                      />
                    </div>
                  </div>

                  {/* IMAGE */}
                  <div className="md:col-span-2">
                    <label className="text-gray-300 text-sm mb-2 block">
                      Hostel Image
                    </label>

                    <label className="flex items-center gap-4 bg-white/10 border border-dashed border-cyan-400/30 rounded-2xl px-5 py-5 cursor-pointer hover:bg-white/15 transition">

                      <div className="w-14 h-14 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                        <FaImage className="text-cyan-300 text-xl" />
                      </div>

                      <div>
                        <p className="text-white font-medium">
                          Upload Hostel Image
                        </p>

                        <p className="text-gray-400 text-sm">
                          PNG, JPG or JPEG
                        </p>
                      </div>

                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={(e) =>
                          setForm({
                            ...form,
                            image: e.target.files
                              ? e.target.files[0]
                              : null,
                          })
                        }
                      />
                    </label>

                    {form.image && (
                      <p className="text-cyan-300 text-sm mt-2">
                        Selected: {form.image.name}
                      </p>
                    )}
                  </div>
                </div>

                {/* DESCRIPTION */}
                <div className="mt-6">
                  <label className="text-gray-300 text-sm mb-2 block">
                    Description
                  </label>

                  <textarea
                    rows={4}
                    placeholder="Enter hostel description..."
                    value={form.description}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        description: e.target.value,
                      })
                    }
                    className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 text-white placeholder-gray-400 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition resize-none"
                  />
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex justify-end gap-4 mt-8">

                  <button
                    onClick={() => setShowForm(false)}
                    className="px-6 py-3 rounded-xl border border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 transition"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={editId ? updateHostel : addHostel}
                    disabled={loading}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-7 py-3 rounded-xl font-bold shadow-lg hover:shadow-cyan-500/30 transition-all duration-300"
                  >
                    {loading ? "Saving..." : "Save Hostel"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          </div>
        )}
      </div>
    </div>
    
  );
}