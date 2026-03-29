import { useState, useEffect } from "react";
import { supabase } from "@/supabaseClient";

const AdminEvents = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    date: "",
    description: ""
  });
  const [file, setFile] = useState<any>(null);
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const { data } = await supabase.from("events").select("*");
    setEvents(data || []);
  };

  // 🔥 FAST UPLOAD
  const handleUpload = async () => {
    if (!file) return null;

    const fileName = Date.now() + "-" + file.name;

    const { error } = await supabase.storage
      .from("events")
      .upload(fileName, file);

    if (error) {
      alert("Upload failed");
      return null;
    }

    return supabase.storage
      .from("events")
      .getPublicUrl(fileName).data.publicUrl;
  };

  // 🔥 MAIN FIX
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!form.title || !form.date || !form.description) {
      alert("Fill all fields");
      return;
    }

    setLoading(true);

    let image_url = null;

    // 🔥 ONLY upload if file selected
    if (file) {
      image_url = await handleUpload();
    }

    try {
      if (editId) {
        const { error } = await supabase
          .from("events")
          .update({
            ...form,
            ...(image_url && { image_url }) // 🔥 keep old image if no new
          })
          .eq("id", editId);

        if (error) throw error;

        alert("Updated");

      } else {
        const { data, error } = await supabase
          .from("events")
          .insert([{ ...form, image_url }])
          .select()
          .single();

        if (error) throw error;

        // 🔥 INSTANT UI UPDATE (NO FETCH)
        setEvents((prev) => [data, ...prev]);

        alert("Added");
      }

      setForm({ title: "", date: "", description: "" });
      setFile(null);
      setEditId(null);

    } catch (err) {
      console.error(err);
      alert("Error");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (ev: any) => {
    setForm({
      title: ev.title,
      date: ev.date,
      description: ev.description
    });
    setEditId(ev.id);
  };

  const deleteEvent = async (id: number) => {
    if (!window.confirm("Delete?")) return;

    await supabase.from("events").delete().eq("id", id);

    // 🔥 INSTANT REMOVE
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">

      <h1 className="text-2xl font-bold mb-6">Manage Events</h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md mb-8 space-y-4"
      >
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          className="w-full border p-2 rounded"
        />

        <input
          type="date"
          value={form.date}
          onChange={(e) =>
            setForm({ ...form, date: e.target.value })
          }
          className="w-full border p-2 rounded"
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          className="w-full border p-2 rounded"
        />

        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0])}
        />

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {loading
            ? "Processing..."
            : editId
            ? "Update Event"
            : "Add Event"}
        </button>
      </form>

      {/* EVENTS */}
      <div className="grid md:grid-cols-3 gap-6">
        {events.map((ev) => (
          <div key={ev.id} className="bg-white rounded-xl shadow-md">

            {ev.image_url && (
              <img
                src={ev.image_url}
                className="w-full h-40 object-cover"
              />
            )}

            <div className="p-4">
              <h3 className="font-semibold">{ev.title}</h3>
              <p className="text-sm text-gray-500">{ev.date}</p>
              <p className="text-sm mt-2">{ev.description}</p>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleEdit(ev)}
                  className="bg-yellow-400 px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteEvent(ev.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default AdminEvents;