import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";
import { Link } from "react-router-dom";

const Gallery = () => {
  const [images, setImages] = useState<any[]>([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const { data } = await supabase.from("gallery").select("*");
    setImages(data || []);
  };

  return (
    <div>

      {/* HEADER */}
      <section className="bg-primary py-20 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Gallery</h1>
        <p className="opacity-80">
          Glimpses of campus life and events
        </p>
      </section>

      {/* GALLERY */}
      <section className="py-20 px-6 md:px-20 bg-gray-50">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {images.map((img) => (
            <Link to={`/gallery/${img.id}`} key={img.id}>
              <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 cursor-pointer overflow-hidden">

                {/* IMAGE */}
                <div className="overflow-hidden">
                  <img
                    src={img.image_url}
                    className="w-full h-56 object-cover group-hover:scale-110 transition duration-500"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-4">
                  <h3 className="font-semibold text-lg">
                    {img.title}
                  </h3>

                  <p
                    className="text-sm text-gray-600 mt-1 overflow-hidden"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {img.description}
                  </p>
                </div>

              </div>
            </Link>
          ))}

        </div>
      </section>

    </div>
  );
};

export default Gallery;