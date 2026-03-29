import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";

const AdminAdmissions = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔥 UNIVERSAL FIX FUNCTION (MAIN)
  const toArray = (val) => {
    if (Array.isArray(val)) return val;

    if (typeof val === "string") {
      try {
        const parsed = JSON.parse(val);
        if (Array.isArray(parsed)) return parsed;
      } catch {}

      return val.split(",");
    }

    return [];
  };

  // ✅ FETCH DATA
  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from("admissions_content")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) throw error;

      setData(data || []);
    } catch (err) {
      console.error(err);
      alert("Error loading data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ TITLE CHANGE
  const changeTitle = (i, val) => {
    const copy = [...data];
    copy[i].title = val;
    setData(copy);
  };

  // ✅ LINE CHANGE
  const changeLine = (i, j, val) => {
    const copy = [...data];
    const arr = toArray(copy[i].content);
    arr[j] = val;
    copy[i].content = arr;
    setData(copy);
  };

  // ✅ ADD LINE
  const addLine = (i) => {
    const copy = [...data];
    const arr = toArray(copy[i].content);
    arr.push("");
    copy[i].content = arr;
    setData(copy);
  };

  // ✅ SAVE (WORKING)
  const save = async () => {
    try {
      setLoading(true);

      for (let item of data) {
        await supabase
          .from("admissions_content")
          .update({
            title: item.title,
            content: toArray(item.content),
          })
          .eq("id", item.id);
      }

      alert("Saved successfully ✅");
      fetchData();

    } catch (err) {
      console.error(err);
      alert("Save error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">

      <h1 className="text-xl font-bold mb-4">Edit Admissions Page</h1>

      {(!data || data.length === 0) && (
        <p>No data found (check Supabase)</p>
      )}

      {data.map((item, i) => (
        <div key={item.id} className="bg-white p-4 mb-4 rounded shadow">

          <p className="font-semibold mb-2 capitalize">{item.section}</p>

          {/* TITLE */}
          <input
            value={item.title || ""}
            onChange={(e) => changeTitle(i, e.target.value)}
            className="w-full border p-2 mb-2"
          />

          {/* CONTENT */}
          {toArray(item.content).map((line, j) => (
            <input
              key={j}
              value={line || ""}
              onChange={(e) => changeLine(i, j, e.target.value)}
              className="w-full border p-2 mb-2"
            />
          ))}

          {/* ADD */}
          <button
            onClick={() => addLine(i)}
            className="text-blue-600 text-sm"
          >
            + Add Line
          </button>

        </div>
      ))}

      {/* SAVE */}
      <button
        onClick={save}
        className="bg-primary text-white px-4 py-2 rounded"
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>

    </div>
  );
};

export default AdminAdmissions;