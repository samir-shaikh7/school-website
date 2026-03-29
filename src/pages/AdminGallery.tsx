import { useState, useEffect } from "react";
import { supabase } from "@/supabaseClient";

const AdminGallery = () => {
  const [images, setImages] = useState<any[]>([]);
  const [file, setFile] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const { data } = await supabase.from("gallery").select("*");
    setImages(data || []);
  };

  // 🔥 FAST UPLOAD
  const handleUpload = async () => {
    if (!file) return null;

    const fileName = Date.now() + "-" + file.name;

    const { error } = await supabase.storage
      .from("gallery")
      .upload(fileName, file);

    if (error) {
      alert("Upload failed");
      return null;
    }

    return supabase.storage
      .from("gallery")
      .getPublicUrl(fileName).data.publicUrl;
  };

  // 🔥 MAIN FIX
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!title) {
      alert("Title required");
      return;
    }

    setLoading(true);

    let image_url = null;

    if (file) {
      image_url = await handleUpload();
    }

    try {
      if (editId) {
        const updateData: any = { title };

        if (image_url) {
          updateData.image_url = image_url;
        }

        const { error } = await supabase
          .from("gallery")
          .update(updateData)
          .eq("id", editId);

        if (error) throw error;

        // 🔥 INSTANT UPDATE UI
        setImages((prev) =>
          prev.map((img) =>
            img.id === editId
              ? { ...img, ...updateData }
              : img
          )
        );

        alert("Updated");
        setEditId(null);

      } else {
        if (!image_url) {
          alert("Select image");
          return;
        }

        const { data, error } = await supabase
          .from("gallery")
          .insert([{ image_url, title }])
          .select()
          .single();

        if (error) throw error;

        // 🔥 INSTANT ADD (NO FETCH)
        setImages((prev) => [data, ...prev]);

        alert("Added");
      }

      setFile(null);
      setTitle("");

    } catch (err) {
      console.error(err);
      alert("Error");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (img: any) => {
    setTitle(img.title);
    setEditId(img.id);
  };

  const deleteImage = async (id: number) => {
    if (!window.confirm("Delete?")) return;

    await supabase.from("gallery").delete().eq("id", id);

    // 🔥 INSTANT REMOVE
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">

      <h1 className="text-2xl font-bold mb-6">Manage Gallery</h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md mb-8 space-y-4"
      >
        <input
          type="text"
          placeholder="Image Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
            ? "Update Image"
            : "Upload Image"}
        </button>
      </form>

      {loading && <p>Loading...</p>}

      {/* IMAGES */}
      <div className="grid md:grid-cols-3 gap-6">
        {images.map((img) => (
          <div
            key={img.id}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <img
              src={img.image_url}
              className="w-full h-40 object-cover"
            />

            <div className="p-4">
              <h3 className="font-semibold">{img.title}</h3>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleEdit(img)}
                  className="bg-yellow-400 px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteImage(img.id)}
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

export default AdminGallery;