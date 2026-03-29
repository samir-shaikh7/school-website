import { useState } from "react";
import { supabase } from "@/supabaseClient";
import { useNavigate } from "react-router-dom";
import { GraduationCap } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // ✅ NEW
  const navigate = useNavigate();

  const handleLogin = async (e: any) => {
    e.preventDefault();

    // ✅ VALIDATION
    if (!email || !password) {
      alert("Enter email and password");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message); // ✅ Better error
      return;
    }

    // ✅ SUCCESS
    alert("Login successful");

    navigate("/admin"); // dashboard
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        {/* HEADER */}
        <div className="flex flex-col items-center mb-6">
          <div className="bg-primary text-white p-3 rounded-full mb-2">
            <GraduationCap size={28} />
          </div>

          <h1 className="text-xl font-bold text-center">
            Shri Basweshwar Education Campus
          </h1>

          <p className="text-sm text-gray-500">
            Admin Login Panel
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleLogin} className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            value={email} // ✅ controlled
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <input
            type="password"
            placeholder="Password"
            value={password} // ✅ controlled
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary text-white rounded-lg hover:opacity-90 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default Login;