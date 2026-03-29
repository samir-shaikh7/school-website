import { useState, useEffect } from "react";
import { supabase } from "@/supabaseClient";

const AdminNotice = () => {
  const [notices, setNotices] = useState<any[]>([]);
  const [loading, setLoading] = useState(false); // ✅ NEW
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: ""
  });
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    setLoading(true);

    const { data, error } = await supabase.from("notices").select("*");

    if (error) {
      alert("Error fetching notices");
    } else {
      setNotices(data || []);
    }

    setLoading(false);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!form.title || !form.description || !form.date) {
      alert("Fill all fields");
      return;
    }

    if (editId) {
      const { error } = await supabase
        .from("notices")
        .update(form)
        .eq("id", editId);

      if (error) {
        alert("Update failed");
        return;
      }

      alert("Notice updated");
      setEditId(null);
    } else {
      const { error } = await supabase.from("notices").insert([form]);

      if (error) {
        alert("Insert failed");
        return;
      }

      alert("Notice added");
    }

    setForm({ title: "", description: "", date: "" });
    fetchNotices();
  };

  const handleEdit = (n: any) => {
    setForm({
      title: n.title,
      description: n.description,
      date: n.date
    });
    setEditId(n.id);
  };

  const deleteNotice = async (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?"); // ✅ NEW

    if (!confirmDelete) return;

    const { error } = await supabase.from("notices").delete().eq("id", id);

    if (error) {
      alert("Delete failed");
      return;
    }

    fetchNotices();
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">

      <h1 className="text-2xl font-bold mb-6">Manage Notices</h1>

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

        <button
          type="submit"
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          {editId ? "Update Notice" : "Add Notice"}
        </button>
      </form>

      {/* LOADING */}
      {loading && <p>Loading...</p>}

      {/* NOTICE LIST */}
      <div className="grid md:grid-cols-3 gap-6">
        {notices.map((n) => (
          <div
            key={n.id}
            className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition"
          >
            <span className="text-xs bg-yellow-100 text-yellow-600 px-2 py-1 rounded">
              {n.date}
            </span>

            <h3 className="font-semibold mt-2">{n.title}</h3>

            <p className="text-sm text-gray-600 mt-2">
              {n.description}
            </p>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => handleEdit(n)}
                className="px-3 py-1 bg-blue-500 text-white rounded"
              >
                Edit
              </button>

              <button
                onClick={() => deleteNotice(n.id)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default AdminNotice;