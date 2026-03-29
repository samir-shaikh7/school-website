import { BookOpen, GraduationCap } from "lucide-react";

const Academics = () => (
  <div>
    <section className="bg-primary py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Academics</h1>
        <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
          Comprehensive education from Classes 5 to 12 under one campus.
        </p>
      </div>
    </section>

    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-10">
          <div className="rounded-xl bg-card border border-border p-10 shadow-sm">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 mb-6">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-foreground mb-4">Shri Basweshwar Vidyalay</h2>
            <p className="text-muted-foreground mb-4">Classes 5 to 10</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Maharashtra State Board curriculum</li>
              <li>• Subjects: Marathi, Hindi, English, Mathematics, Science, Social Studies</li>
              <li>• Regular assessments and parent-teacher meetings</li>
              <li>• Co-curricular activities and sports</li>
              <li>• Experienced and dedicated faculty</li>
            </ul>
          </div>
          <div className="rounded-xl bg-card border border-border p-10 shadow-sm">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-accent/20 mb-6">
              <GraduationCap className="h-8 w-8 text-accent" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-foreground mb-4">High School & Junior College</h2>
            <p className="text-muted-foreground mb-4">Classes 11 to 12</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Science and Arts streams</li>
              <li>• Board exam preparation and guidance</li>
              <li>• Competitive exam coaching support</li>
              <li>• Laboratory practicals and project work</li>
              <li>• Career counseling sessions</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default Academics;
