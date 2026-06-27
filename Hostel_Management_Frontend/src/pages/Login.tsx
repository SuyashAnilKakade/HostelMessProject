import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  sub: string;
  role: string;
  name?: string;
  exp?: number;
  iat?: number;
}

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/api/auth/login", {
        email: form.email,
        password: form.password,
      });

      console.log("Login response:", res.data);

      // ================= GET TOKEN =================
      const token = res.data.token;

      if (!token) {
        alert("Login failed: token not received");
        return;
      }

      // ================= DECODE TOKEN =================
      const decoded: DecodedToken = jwtDecode(token);
      console.log("Decoded JWT:", decoded);

      // role can come from response OR token
      const roleFromResponse = res.data.role;
      const roleFromToken = decoded.role;

      const finalRole = roleFromResponse || roleFromToken;

      if (!finalRole) {
        alert("Login failed: role not found");
        return;
      }

      // ================= SAVE TO LOCAL STORAGE =================
      localStorage.setItem("token", token);
      localStorage.setItem("role", finalRole);
      localStorage.setItem("email", decoded.sub || form.email);
      localStorage.setItem("name", res.data.name || decoded.name || "");

      console.log("Saved token:", localStorage.getItem("token"));
      console.log("Saved role:", localStorage.getItem("role"));

      // ================= NORMALIZE ROLE =================
      const normalizedRole =
        finalRole === "ROLE_ADMIN"
          ? "ADMIN"
          : finalRole === "ROLE_STUDENT"
          ? "STUDENT"
          : finalRole;

      // ================= REDIRECT =================
      if (normalizedRole === "ADMIN") {
        navigate("/admin");
      } else if (normalizedRole === "STUDENT") {
        navigate("/student");
      } else {
        alert("Unknown role");
      }
    } catch (err: any) {
      console.error("Login failed", err);

      if (err.response?.status === 401) {
        alert("Invalid email or password");
      } else {
        alert("Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl">
        <p className="uppercase tracking-[0.25em] text-cyan-300 text-sm mb-3 text-center">
          Welcome Back
        </p>

        <h1 className="text-4xl font-black text-white text-center mb-2">
          Login
        </h1>

        <p className="text-gray-300 text-center mb-8">
          Sign in to continue to Hostel Management
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* EMAIL */}
          <div>
            <label className="text-gray-300 text-sm mb-2 block">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              className="w-full px-5 py-3 rounded-2xl bg-white/10 border border-white/10 text-white placeholder-gray-400 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-gray-300 text-sm mb-2 block">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              className="w-full px-5 py-3 rounded-2xl bg-white/10 border border-white/10 text-white placeholder-gray-400 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white py-3 rounded-2xl font-bold shadow-xl hover:shadow-cyan-500/30 transition-all duration-300 disabled:opacity-70"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* REGISTER LINK */}
        <p className="text-gray-300 text-sm text-center mt-6">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="text-cyan-300 hover:text-cyan-200 font-semibold"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}