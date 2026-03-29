import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/supabaseClient";
import { Calendar, Bell, MessageSquare, Image, FileText } from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.clear();
    navigate("/login", { replace: true });
    window.location.reload();
  };

  const cards = [
    {
      title: "Manage Events",
      icon: Calendar,
      link: "/admin/events",
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Manage Notices",
      icon: Bell,
      link: "/admin/notices",
      color: "bg-yellow-100 text-yellow-600"
    },
    {
      title: "View Messages",
      icon: MessageSquare,
      link: "/admin/messages",
      color: "bg-green-100 text-green-600"
    },
    {
      title: "Manage Gallery",
      icon: Image,
      link: "/admin/gallery",
      color: "bg-purple-100 text-purple-600"
    },

    // ✅ NEW ADMISSIONS CARD
    {
      title: "Manage Admissions",
      icon: FileText,
      link: "/admin/admissions",
      color: "bg-indigo-100 text-indigo-600"
    }
  ];

  return (
    <div className="p-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>

        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {cards.map((card, i) => (
          <Link to={card.link} key={i}>
            <div className="p-6 rounded-xl shadow-md bg-white hover:shadow-lg transition cursor-pointer border">

              <div className={`w-12 h-12 flex items-center justify-center rounded-lg mb-4 ${card.color}`}>
                <card.icon className="w-6 h-6" />
              </div>

              <h2 className="text-lg font-semibold">{card.title}</h2>

              <p className="text-sm text-gray-500 mt-2">
                Click to manage
              </p>

            </div>
          </Link>
        ))}
      </div>

    </div>
  );
};

export default AdminDashboard;