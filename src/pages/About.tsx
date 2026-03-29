import { Eye, Target, Heart } from "lucide-react";

const About = () => (
  <div>
    {/* Header */}
    <section className="bg-primary py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-4">About Us</h1>
        <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
          Discover our legacy of educational excellence spanning over two decades.
        </p>
      </div>
    </section>

    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <p className="text-lg text-muted-foreground leading-relaxed mb-12">
          Shri Basweshwar Education Campus was established with the noble vision of providing accessible, quality education to the rural and semi-urban communities of Nanded District. Located in Kamtha BK, our campus has grown to become a trusted name in education, nurturing thousands of students over the years. Our campus comprises Shri Basweshwar Vidyalay (Classes 5-10) and Shri Basweshwar High School & Junior College (Classes 11-12), both committed to academic excellence and all-round development.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Eye, title: "Our Vision", desc: "To be a leading educational institution that empowers students with knowledge, skills, and values to become responsible citizens." },
            { icon: Target, title: "Our Mission", desc: "To provide quality education through innovative teaching methods, modern infrastructure, and a nurturing environment." },
            { icon: Heart, title: "Our Values", desc: "Integrity, discipline, respect, excellence, and a commitment to the holistic development of every student." },
          ].map((item) => (
            <div key={item.title} className="rounded-xl bg-card border border-border p-8 text-center shadow-sm">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mx-auto mb-5">
                <item.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-3">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default About;
