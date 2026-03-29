import { Library, Monitor, TreePine, FlaskConical, Tv } from "lucide-react";

const facilities = [
  { icon: Library, name: "Library", desc: "A well-stocked library with thousands of books, reference materials, periodicals, and digital resources for students and staff." },
  { icon: Monitor, name: "Computer Lab", desc: "Modern computer laboratory with high-speed internet access, enabling students to develop essential digital skills." },
  { icon: TreePine, name: "Playground", desc: "Spacious playground for cricket, football, kabaddi, athletics, and other outdoor sports activities." },
  { icon: FlaskConical, name: "Science Laboratory", desc: "Fully equipped physics, chemistry, and biology laboratories for practical learning and experiments." },
  { icon: Tv, name: "Smart Classrooms", desc: "Technology-enabled classrooms with projectors and interactive boards for engaging learning experiences." },
];

const Facilities = () => (
  <div>
    <section className="bg-primary py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Our Facilities</h1>
        <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
          State-of-the-art infrastructure for holistic education.
        </p>
      </div>
    </section>

    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((f) => (
            <div key={f.name} className="rounded-xl bg-card border border-border p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mb-5">
                <f.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-3">{f.name}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Facilities;
