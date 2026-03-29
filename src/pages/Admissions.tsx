import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";
import { CheckCircle } from "lucide-react";

const Admissions = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from("admissions_content")
        .select("*");

      if (error) throw error;

      setData(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getSection = (name) =>
    data.find((item) => item.section === name);

  const process = getSection("process");
  const documents = getSection("documents");
  const dates = getSection("dates");

  // 🔥 CLEAN FIX (NO BRACKETS / NO QUOTES)
  const cleanArray = (val) => {
    if (Array.isArray(val)) return val;

    if (typeof val === "string") {
      try {
        const parsed = JSON.parse(val);
        if (Array.isArray(parsed)) return parsed;
      } catch {}

      return val
        .replace(/[\[\]"]/g, "")
        .split(",")
        .map((i) => i.trim())
        .filter(Boolean);
    }

    return [];
  };

  if (loading) {
    return <p className="p-10 text-center">Loading...</p>;
  }

  return (
    <div>
      {/* HEADER */}
      <section className="bg-primary py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Admissions
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Join our family of learners. Admissions are now open for 2026-27.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">

          {/* PROCESS */}
          <div className="rounded-xl bg-card border border-border p-10 shadow-sm mb-10">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
              {process?.title || "Admission Process"}
            </h2>

            <div className="space-y-4">
              {cleanArray(process?.content).map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <p className="text-muted-foreground">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">

            {/* DOCUMENTS */}
            <div className="rounded-xl bg-card border border-border p-8 shadow-sm">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                {documents?.title || "Required Documents"}
              </h3>

              <ul className="space-y-2 text-sm text-muted-foreground">
                {cleanArray(documents?.content).map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>

            {/* DATES */}
            <div className="rounded-xl bg-card border border-border p-8 shadow-sm">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                {dates?.title || "Important Dates"}
              </h3>

              <ul className="space-y-2 text-sm text-muted-foreground">
                {cleanArray(dates?.content).map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>

              <p className="mt-4 text-sm text-muted-foreground">
                For queries, contact the school office or call us.
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Admissions;