import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, GraduationCap, Users, Award, Library, Monitor, TreePine, FlaskConical, Tv, Bell, CalendarDays, Megaphone } from "lucide-react";
import heroCampus from "@/assets/hero-campus.jpg";


const stats = [
  { icon: Users, value: "800+", label: "Students" },
  { icon: GraduationCap, value: "20+", label: "Teachers" },
  { icon: Award, value: "20+", label: "Years of Education" },
  { icon: BookOpen, value: "100%", label: "Board Results" },
];

const facilities = [
  { icon: Library, name: "Library" },
  { icon: Monitor, name: "Computer Lab" },
  { icon: TreePine, name: "Playground" },
  { icon: FlaskConical, name: "Science Laboratory" },
  { icon: Tv, name: "Smart Classrooms" },
];




const Index = () => {

  const [notices, setNotices] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {

      // Notices
      const { data: noticesData } = await supabase
        .from("notices")
        .select("*")
        .limit(3);

      setNotices(noticesData || []);

      // Gallery
      const { data: galleryData } = await supabase
        .from("gallery")
        .select("*")
        .order("id", { ascending: false })
        .limit(6);

      setGallery(galleryData || []);
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* Hero */}


      <section className="relative h-[85vh] min-h-[500px] flex items-center justify-center overflow-hidden">

        {/* Background Image */}
        <motion.img
          src={heroCampus}
          alt="Shri Basweshwar Education Campus"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 hero-overlay" />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        >
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4 leading-tight">
            Welcome to Shri Basweshwar Education Campus
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Providing Quality Education in Nanded District, Maharashtra
          </p>

          <div className="flex flex-wrap gap-4 justify-center">

            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 hover:scale-105 transition-all duration-300 font-semibold text-base px-8"
            >
              <Link to="/admissions">Admissions</Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/40 hover:bg-primary-foreground/10 hover:scale-105 transition-all duration-300 font-semibold text-base px-8"
            >
              <Link to="/contact">Contact Us</Link>
            </Button>

          </div>
        </motion.div>

      </section>

      {/* Notices */}
      <section className="py-20 section-gradient">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground text-center mb-6">Latest Notices</h2>
          <div className="w-16 h-1 bg-accent mx-auto mb-12 rounded-full" />
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {notices.map((n, i) => (
              <div key={i} className="rounded-xl bg-card border border-border p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20 mb-4">
                  {i === 0 && <Bell className="h-5 w-5 text-accent" />}
                  {i === 1 && <CalendarDays className="h-5 w-5 text-accent" />}
                  {i === 2 && <Megaphone className="h-5 w-5 text-accent" />}
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">{n.title}</h3>
                <p className="text-sm text-muted-foreground">{n.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-20 section-gradient">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">About Our Campus</h2>
          <div className="w-16 h-1 bg-accent mx-auto mb-8 rounded-full" />
          <p className="text-muted-foreground text-lg leading-relaxed">
            Shri Basweshwar Education Campus, located in Kamtha BK, Nanded District, Maharashtra, has been a beacon of quality education for over two decades. Our campus houses two esteemed institutions — Shri Basweshwar Vidyalay (Classes 5-10) and Shri Basweshwar High School & Junior College (Classes 11-12). We are committed to nurturing young minds with academic excellence, moral values, and holistic development.
          </p>
          <Button asChild variant="link" className="mt-6 text-primary font-semibold">
            <Link to="/about">Learn More →</Link>
          </Button>
        </div>
      </section>

      {/* Academics */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground text-center mb-6">Our Academics</h2>
          <div className="w-16 h-1 bg-accent mx-auto mb-12 rounded-full" />
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="rounded-xl bg-card border border-border p-8 shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 mb-5">
                <BookOpen className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2">Shri Basweshwar Vidyalay</h3>
              <p className="text-muted-foreground">Classes 5 to 10 — Building strong foundations with comprehensive curriculum and dedicated teaching.</p>
            </div>
            <div className="rounded-xl bg-card border border-border p-8 shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent/20 mb-5">
                <GraduationCap className="h-7 w-7 text-accent" />
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2">High School & Junior College</h3>
              <p className="text-muted-foreground">Classes 11 to 12 — Preparing students for higher education and competitive examinations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-20 section-gradient">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground text-center mb-6">Our Facilities</h2>
          <div className="w-16 h-1 bg-accent mx-auto mb-12 rounded-full" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
            {facilities.map((f) => (
              <div key={f.name} className="flex flex-col items-center gap-3 rounded-xl bg-card border border-border p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <span className="text-sm font-semibold text-foreground text-center">{f.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((s) => (
              <div key={s.label} className="text-center text-primary-foreground">
                <s.icon className="h-8 w-8 mx-auto mb-3 opacity-80" />
                <div className="text-3xl md:text-4xl font-heading font-bold mb-1">{s.value}</div>
                <div className="text-sm opacity-80">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground text-center mb-6">Campus Gallery</h2>
          <div className="w-16 h-1 bg-accent mx-auto mb-12 rounded-full" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {gallery.map((img, i) => (
              <div
  key={i}
  className="rounded-xl overflow-hidden bg-white shadow-sm cursor-pointer"
  onClick={() => setSelectedImage(img)} // ✅ NEW
>

                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={img.image_url}
                    alt={img.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                <div className="p-3">
                  <p className="text-sm font-semibold text-foreground text-center">
                    {img.title}
                  </p>
                </div>

              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild variant="outline">
              <Link to="/gallery">View Full Gallery</Link>
            </Button>
          </div>
        </div>
      </section>

      {selectedImage && (
  <div
    className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
    onClick={() => setSelectedImage(null)}
  >
    <div className="relative max-w-4xl w-full px-4">

      {/* CLOSE BUTTON */}
      <button
        onClick={() => setSelectedImage(null)}
        className="absolute top-2 right-2 text-white text-2xl font-bold"
      >
        ✕
      </button>

      {/* IMAGE */}
      <img
        src={selectedImage.image_url}
        alt={selectedImage.title}
        className="w-full max-h-[80vh] object-contain rounded-lg"
      />

      {/* TITLE */}
      <p className="text-white text-center mt-4 text-lg font-semibold">
        {selectedImage.title}
      </p>

    </div>
  </div>
)}


    </div>
  );
};

export default Index;
