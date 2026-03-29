import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";

const Gallery = () => {
  const [images, setImages] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState(null);

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
      <section className="bg-primary py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Gallery
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Glimpses of campus life, events, and celebrations.
          </p>
        </div>
      </section>

      {/* GALLERY */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {images.map((img) => (
              <div
                key={img.id}
                onClick={() => setSelectedImage(img)} // 🔥 CLICK
                className="group overflow-hidden rounded-xl border border-border shadow-sm cursor-pointer"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={img.image_url}
                    alt={img.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                <div className="p-4 bg-card">
                  <p className="text-sm font-semibold text-foreground">
                    {img.title}
                  </p>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* 🔥 MODAL */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="max-w-4xl w-full px-4">
            <img
              src={selectedImage.image_url}
              alt={selectedImage.title}
              className="w-full max-h-[80vh] object-contain rounded-lg"
            />

            <p className="text-white text-center mt-4">
              {selectedImage.title}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;