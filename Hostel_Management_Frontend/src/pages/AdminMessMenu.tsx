import { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import api from "../api/api";

import {
  FaUtensils,
  FaEdit,
  FaTrash,
  FaPlus,
  FaImage,
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
  voteCount: number;
}

export default function AdminMessMenu() {
  const [thalis, setThalis] = useState<Thali[]>([]);

  const [form, setForm] = useState<{
    name: string;
    bhaji1: string;
    bhaji2: string;
    rice: string;
    dal: string;
    roti: string;
    sweet: string;
    image: File | null;
    voteCount: number;
  }>({
    name: "",
    bhaji1: "",
    bhaji2: "",
    rice: "",
    dal: "",
    roti: "",
    sweet: "",
    image: null,
    voteCount: 0,
  });

  const [editingId, setEditingId] = useState<number | null>(null);

  // ✅ IMPORTANT: file input ref so same image can be selected again
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  /* ================= FETCH ================= */
  const fetchThalis = async () => {
    try {
      const res = await api.get("/api/admin/messmenu");
      setThalis(res.data);
    } catch (err) {
      console.error("Failed to fetch thalis:", err);
    }
  };

  useEffect(() => {
    fetchThalis();

    const interval = setInterval(fetchThalis, 5000);
    return () => clearInterval(interval);
  }, []);

  /* ================= RESET FORM ================= */
  const resetForm = () => {
    setForm({
      name: "",
      bhaji1: "",
      bhaji2: "",
      rice: "",
      dal: "",
      roti: "",
      sweet: "",
      image: null,
      voteCount: 0,
    });

    setEditingId(null);

    // ✅ clear actual file input also
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  /* ================= VALIDATE ================= */
  const validateForm = () => {
    if (
      !form.name.trim() ||
      !form.bhaji1.trim() ||
      !form.bhaji2.trim() ||
      !form.rice.trim() ||
      !form.dal.trim() ||
      !form.roti.trim() ||
      !form.sweet.trim()
    ) {
      alert("Please fill all thali fields");
      return false;
    }

    // image required only while creating new thali
    if (!editingId && !form.image) {
      alert("Please select a thali image");
      return false;
    }

    return true;
  };

  /* ================= SAVE ================= */
  const saveThali = async () => {
    if (!validateForm()) return;

    const formData = new FormData();

    formData.append("name", form.name.trim());
    formData.append("bhaji1", form.bhaji1.trim());
    formData.append("bhaji2", form.bhaji2.trim());
    formData.append("rice", form.rice.trim());
    formData.append("dal", form.dal.trim());
    formData.append("roti", form.roti.trim());
    formData.append("sweet", form.sweet.trim());
    formData.append("voteCount", String(form.voteCount));

    // while creating -> image must be present
    // while editing -> image optional
    if (form.image) {
      formData.append("image", form.image);
    }

    try {
      if (editingId !== null) {
        await api.put(`/api/admin/messmenu/${editingId}`, formData);
        alert("Thali updated successfully");
      } else {
        await api.post("/api/admin/messmenu", formData);
        alert("Thali added successfully");
      }

      resetForm();
      fetchThalis();
    } catch (e: any) {
      console.error("SAVE THALI ERROR:", e);
      console.error("Response status:", e?.response?.status);
      console.error("Response data:", e?.response?.data);
      alert("Operation failed");
    }
  };

  /* ================= DELETE ALL ================= */
  const deleteAll = async () => {
    if (!confirm("Delete all thalis?")) return;

    try {
      await api.delete("/api/admin/messmenu");
      fetchThalis();
    } catch (err) {
      console.error("Delete all failed:", err);
      alert("Failed to delete all thalis");
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
        <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[32px] shadow-[0_20px_80px_rgba(0,0,0,0.5)] p-8 mb-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <p className="uppercase tracking-[0.25em] text-cyan-300 mb-3 text-sm">
              Mess Administration
            </p>

            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              Thali Management
            </h1>

            <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
              Add, manage and update daily mess thalis with live voting
              insights for hostel students.
            </p>
          </div>
        </div>

        {/* FORM SECTION */}
        <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[32px] shadow-[0_20px_80px_rgba(0,0,0,0.5)] p-8 mb-10">

          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="uppercase tracking-[0.2em] text-cyan-300 text-xs mb-2">
                Thali Form
              </p>

              <h2 className="text-3xl font-black text-white">
                {editingId ? "Edit Thali" : "Create New Thali"}
              </h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center">
              <FaUtensils className="text-cyan-300 text-2xl" />
            </div>
          </div>

          {/* INPUTS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              ["name", "Thali Name"],
              ["bhaji1", "Bhaji 1"],
              ["bhaji2", "Bhaji 2"],
              ["rice", "Rice"],
              ["dal", "Dal"],
              ["roti", "Roti"],
              ["sweet", "Sweet"],
            ].map(([key, placeholder]) => (
              <div key={key}>
                <label className="text-gray-300 text-sm mb-2 block">
                  {placeholder}
                </label>

                <input
                  value={(form as any)[key]}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      [key]: e.target.value,
                    })
                  }
                  placeholder={`Enter ${placeholder.toLowerCase()}`}
                  className="w-full px-5 py-3 rounded-2xl bg-white/10 border border-white/10 text-white placeholder-gray-400 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition"
                />
              </div>
            ))}

            {/* IMAGE */}
            <div className="md:col-span-2">
              <label className="text-gray-300 text-sm mb-2 block">
                Thali Image
              </label>

              <label className="flex items-center gap-4 bg-white/10 border border-dashed border-cyan-400/30 rounded-2xl px-5 py-5 cursor-pointer hover:bg-white/15 transition">
                <div className="w-14 h-14 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                  <FaImage className="text-cyan-300 text-xl" />
                </div>

                <div>
                  <p className="text-white font-medium">
                    Upload Thali Image
                  </p>

                  <p className="text-gray-400 text-sm">
                    PNG, JPG or JPEG
                  </p>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) =>
                    setForm({
                      ...form,
                      image:
                        e.target.files && e.target.files.length > 0
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

              {!form.image && editingId && (
                <p className="text-gray-400 text-sm mt-2">
                  No new image selected. Old image will remain unchanged.
                </p>
              )}
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-4 mt-5 justify-center">
            <button
              onClick={saveThali}
              className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-7 py-4 rounded-2xl font-bold shadow-xl hover:shadow-cyan-500/30 transition-all duration-300 hover:scale-105"
            >
              <FaPlus />
              {editingId ? "Update Thali" : "Add Thali"}
            </button>

            {editingId && (
              <button
                onClick={resetForm}
                className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-7 py-4 rounded-2xl font-bold shadow-xl transition-all duration-300 hover:scale-105"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </div>

        {/* THALI LIST */}
        <div className="grid lg:grid-cols-2 gap-8">
          {thalis.map((t) => (
            <div
              key={t.id}
              className="group bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl hover:-translate-y-2 hover:shadow-cyan-500/20 transition-all duration-500"
            >
              {/* IMAGE */}
              <div className="overflow-hidden relative">
                <img
                  src={`http://localhost:8080${t.image}`}
                  alt={t.name}
                  className="h-64 w-full object-cover group-hover:scale-110 transition duration-700"
                />

                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-semibold border border-white/10">
                  👍 {t.voteCount} Votes
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-black text-white">
                    {t.name}
                  </h2>

                  <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                    <FaUtensils className="text-cyan-300 text-xl" />
                  </div>
                </div>

                {/* FOOD ITEMS */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <p className="text-xs text-gray-400 mb-1">Bhaji 1</p>
                    <p className="text-white font-medium">{t.bhaji1}</p>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <p className="text-xs text-gray-400 mb-1">Bhaji 2</p>
                    <p className="text-white font-medium">{t.bhaji2}</p>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <p className="text-xs text-gray-400 mb-1">Rice</p>
                    <p className="text-white font-medium">{t.rice}</p>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <p className="text-xs text-gray-400 mb-1">Dal</p>
                    <p className="text-white font-medium">{t.dal}</p>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <p className="text-xs text-gray-400 mb-1">Roti</p>
                    <p className="text-white font-medium">{t.roti}</p>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <p className="text-xs text-gray-400 mb-1">Sweet</p>
                    <p className="text-white font-medium">{t.sweet}</p>
                  </div>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      setEditingId(t.id);

                      setForm({
                        name: t.name,
                        bhaji1: t.bhaji1,
                        bhaji2: t.bhaji2,
                        rice: t.rice,
                        dal: t.dal,
                        roti: t.roti,
                        sweet: t.sweet,
                        image: null, // keep null unless admin selects new image
                        voteCount: t.voteCount,
                      });

                      // clear old file selection when entering edit mode
                      if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                      }

                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }}
                    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white py-3 rounded-2xl font-semibold transition-all duration-300 hover:scale-105"
                  >
                    <FaEdit />
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* DELETE ALL */}
        {thalis.length > 0 && (
          <div className="mt-10">
            <button
              onClick={deleteAll}
              className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-red-500/30 transition-all duration-300"
            >
              🗑 Delete All Thalis
            </button>
          </div>
        )}
      </div>
    </div>
  );
}