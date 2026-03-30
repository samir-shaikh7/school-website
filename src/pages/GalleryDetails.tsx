import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";
import { motion } from "framer-motion";

const GalleryDetails = () => {
  const { id } = useParams();
  const [image, setImage] = useState<any>(null);

  useEffect(() => {
    fetchImage();
  }, []);

  const fetchImage = async () => {
    const { data } = await supabase
      .from("gallery")
      .select("*")
      .eq("id", id)
      .single();

    setImage(data);
  };

  if (!image) {
    return <p className="p-10 text-center">Loading...</p>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* TOP BAR */}
      <div className="max-w-5xl mx-auto px-6 md:px-20 pt-10">
        <Link
          to="/gallery"
          className="text-primary font-medium hover:underline"
        >
          ← Back to Gallery
        </Link>
      </div>

      {/* IMAGE */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto px-6 md:px-20 mt-6"
      >
        <img
          src={image.image_url}
          className="w-full rounded-2xl shadow-md"
        />
      </motion.div>

      {/* CONTENT */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-5xl mx-auto px-6 md:px-20 py-10"
      >

        <div className="bg-white rounded-2xl shadow-md p-6 md:p-10">

          <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">
            {image.title}
          </h1>

          <p className="text-gray-600 leading-relaxed text-lg">
            {image.description}
          </p>

        </div>

      </motion.div>

    </div>
  );
};

export default GalleryDetails;