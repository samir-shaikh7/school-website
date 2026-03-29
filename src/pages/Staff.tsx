import { User, Users, Briefcase } from "lucide-react";

const staffSections = [
  {
    title: "Principal",
    icon: User,
    members: [
      { name: "Principal Name", role: "Principal, Shri Basweshwar Education Campus", desc: "Leading the institution with vision and dedication for academic excellence." },
    ],
  },
  {
    title: "Teaching Staff",
    icon: Users,
    members: [
      { name: "Teacher 1", role: "Mathematics", desc: "Experienced educator passionate about making math accessible." },
      { name: "Teacher 2", role: "Science", desc: "Dedicated to nurturing curiosity through hands-on experiments." },
      { name: "Teacher 3", role: "English", desc: "Committed to building strong communication skills." },
      { name: "Teacher 4", role: "Social Studies", desc: "Bringing history and geography to life in the classroom." },
      { name: "Teacher 5", role: "Marathi", desc: "Promoting love for the mother tongue and literature." },
      { name: "Teacher 6", role: "Hindi", desc: "Fostering bilingual excellence and cultural understanding." },
    ],
  },
  {
    title: "Administrative Staff",
    icon: Briefcase,
    members: [
      { name: "Admin Staff 1", role: "Office Superintendent", desc: "Managing campus administration and operations." },
      { name: "Admin Staff 2", role: "Accountant", desc: "Handling financial administration and fee management." },
      { name: "Admin Staff 3", role: "Clerk", desc: "Supporting day-to-day office operations and records." },
    ],
  },
];

const Staff = () => (
  <div>
    <section className="bg-primary py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Our Staff</h1>
        <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
          Meet the dedicated team behind our success.
        </p>
      </div>
    </section>

    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-5xl space-y-16">
        {staffSections.map((section) => (
          <div key={section.title}>
            <div className="flex items-center gap-3 mb-8">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <section.icon className="h-5 w-5 text-primary" />
              </div>
              <h2 className="font-heading text-2xl font-bold text-foreground">{section.title}</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.members.map((m, i) => (
                <div key={i} className="rounded-xl bg-card border border-border p-6 shadow-sm text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary mx-auto mb-4">
                    <User className="h-8 w-8 text-secondary-foreground" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-foreground">{m.name}</h3>
                  <p className="text-sm text-primary font-medium mb-2">{m.role}</p>
                  <p className="text-xs text-muted-foreground">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  </div>
);

export default Staff;
