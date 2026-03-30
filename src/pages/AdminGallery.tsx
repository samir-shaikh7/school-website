import { useState, useEffect } from "react";
import { supabase } from "@/supabaseClient";

const AdminGallery = () => {
  const [images, setImages] = useState<any[]>([]);
  const [file, setFile] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const { data } = await supabase.from("gallery").select("*");
    setImages(data || []);
  };

  const handleUpload = async () => {
    if (!file) return null;

    const fileName = Date.now() + "-" + file.name;

    await supabase.storage.from("gallery").upload(fileName, file);

    return supabase.storage
      .from("gallery")
      .getPublicUrl(fileName).data.publicUrl;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!title) return alert("Title required");

    setLoading(true);

    let image_url = null;
    if (file) image_url = await handleUpload();

    if (editId) {
      const updateData: any = { title, description };

      if (image_url) updateData.image_url = image_url;

      await supabase.from("gallery").update(updateData).eq("id", editId);

      setImages((prev) =>
        prev.map((img) =>
          img.id === editId ? { ...img, ...updateData } : img
        )
      );

      setEditId(null);

    } else {
      if (!image_url) return alert("Select image");

      const { data } = await supabase
        .from("gallery")
        .insert([{ image_url, title, description }])
        .select()
        .single();

      setImages((prev) => [data, ...prev]);
    }

    setFile(null);
    setTitle("");
    setDescription("");
    setLoading(false);
  };

  const handleEdit = (img: any) => {
    setTitle(img.title);
    setDescription(img.description);
    setEditId(img.id);
  };

  const deleteImage = async (id: number) => {
    await supabase.from("gallery").delete().eq("id", id);
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">

      <h1 className="text-2xl font-bold mb-6">Manage Gallery</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md space-y-4">

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0])}
        />

        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          {loading ? "Loading..." : editId ? "Update" : "Upload"}
        </button>

      </form>

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {images.map((img) => (
          <div key={img.id} className="bg-white rounded-xl shadow-md overflow-hidden">

            <img src={img.image_url} className="h-40 w-full object-cover" />

            <div className="p-4">
              <h3 className="font-semibold">{img.title}</h3>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {img.description}
              </p>

              <div className="flex gap-2 mt-4">
                <button onClick={() => handleEdit(img)} className="bg-yellow-400 px-3 py-1 rounded">
                  Edit
                </button>

                <button onClick={() => deleteImage(img.id)} className="bg-red-500 text-white px-3 py-1 rounded">
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