import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";
import { Link } from "react-router-dom";

const Events = () => {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from("events")
      .select("*");

    if (error) {
      console.error(error);
      return;
    }

    setEvents(data || []);
  };

  const today = new Date();

  // 🔥 FIRST FILTER → THEN SORT (IMPORTANT)
  const upcoming = events
    .filter((e) => new Date(e.date) >= today)
    .sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

  const past = events
    .filter((e) => new Date(e.date) < today)
    .sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

  return (
    <div className="p-8 bg-gray-50 min-h-screen">

      <h1 className="text-3xl font-bold text-center mb-10">
        School Events
      </h1>

      {/* Upcoming */}
      <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {upcoming.map((e) => (
          <Link to={`/events/${e.id}`} key={e.id}>
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden cursor-pointer">

              {e.image_url && (
                <img
                  src={e.image_url}
                  className="w-full h-48 object-cover"
                />
              )}

              <div className="p-4">
                <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
                  {e.date}
                </span>

                <h3 className="text-lg font-semibold mt-2">
                  {e.title}
                </h3>

                <p className="text-sm text-gray-600 mt-1">
                  {e.description}
                </p>
              </div>

            </div>
          </Link>
        ))}
      </div>

      {/* Past */}
      <h2 className="text-xl font-semibold mb-4">Past Events</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {past.map((e) => (
          <Link to={`/events/${e.id}`} key={e.id}>
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden opacity-80 cursor-pointer">

              {e.image_url && (
                <img
                  src={e.image_url}
                  className="w-full h-48 object-cover brightness-90"
                />
              )}

              <div className="p-4">
                <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">
                  {e.date}
                </span>

                <h3 className="text-lg font-semibold mt-2">
                  {e.title}
                </h3>

                <p className="text-sm text-gray-600 mt-1">
                  {e.description}
                </p>
              </div>

            </div>
          </Link>
        ))}
      </div>

    </div>
  );
};

export default Events;