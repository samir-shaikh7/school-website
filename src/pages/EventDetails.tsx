import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/supabaseClient";
import { motion } from "framer-motion";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchEvent = async () => {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("id", id)
      .single();

    if (!error) setEvent(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchEvent();
  }, []);

  if (loading) {
    return <p className="p-10 text-center">Loading...</p>;
  }

  if (!event) {
    return <p className="p-10 text-center">Event not found</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* 🔙 BACK BUTTON */}
      <div className="max-w-5xl mx-auto px-4 pt-6">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:underline"
        >
          ← Back to Events
        </button>
      </div>

      {/* 🔥 HERO IMAGE */}
      <div className="max-w-5xl mx-auto mt-4">
        <motion.img
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          src={event.image_url}
          className="w-full h-80 object-cover rounded-xl shadow"
        />
      </div>

      {/* 📄 CONTENT */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto px-4 py-8"
      >

        {/* DATE */}
        <span className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded">
          {event.date}
        </span>

        {/* TITLE */}
        <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-4">
          {event.title}
        </h1>

        {/* DESCRIPTION */}
        <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
          {event.description || "No description available"}
        </p>

      </motion.div>

    </div>
  );
};

export default EventDetails;