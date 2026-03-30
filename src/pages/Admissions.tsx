import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";
import { CheckCircle } from "lucide-react";

const Admissions = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from("admissions_content")
        .select("id, section, title, content"); // 🔥 optimized

      if (error) throw error;

      setData(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 SCROLL FIX
  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 50);
    }
  }, [loading]);

  const getSection = (name: string) =>
    data.find((item) => item.section === name);

  const process = getSection("process");
  const documents = getSection("documents");
  const dates = getSection("dates");

  // CLEAN ARRAY
  const cleanArray = (val: any) => {
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

  // 🔥 PREMIUM LOADING (Skeleton UI)
  if (loading) {
    return (
      <div className="p-10 max-w-4xl mx-auto animate-pulse space-y-6">
        <div className="h-10 bg-gray-200 rounded w-1/3 mx-auto"></div>

        <div className="h-40 bg-gray-200 rounded"></div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
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
          <div className="rounded-2xl bg-white p-10 shadow-md mb-10">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              {process?.title || "Admission Process"}
            </h2>

            <div className="space-y-4">
              {cleanArray(process?.content).map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <p className="text-gray-600">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">

            {/* DOCUMENTS */}
            <div className="rounded-2xl bg-white p-8 shadow-md">
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                {documents?.title || "Required Documents"}
              </h3>

              <ul className="space-y-2 text-sm text-gray-600">
                {cleanArray(documents?.content).map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>

            {/* DATES */}
            <div className="rounded-2xl bg-white p-8 shadow-md">
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                {dates?.title || "Important Dates"}
              </h3>

              <ul className="space-y-2 text-sm text-gray-600">
                {cleanArray(dates?.content).map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>

              <p className="mt-4 text-sm text-gray-500">
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