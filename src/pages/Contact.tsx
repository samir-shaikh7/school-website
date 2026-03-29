import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { supabase } from "@/supabaseClient";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

const handleSubmit = async (e: any) => {
  e.preventDefault();

  // 🔥 VALIDATION
  if (!form.name || !form.email || !form.phone || !form.message) {
    alert("Please fill all fields");
    return;
  }

  // 🔥 EMAIL CHECK
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(form.email)) {
    alert("Enter valid email");
    return;
  }

  // 🔥 PHONE CHECK (10 digits)
  if (form.phone.length < 10) {
    alert("Enter valid phone number");
    return;
  }

  const { error } = await supabase.from("contacts").insert([form]);

  if (error) {
    alert("Error sending message");
    console.log(error);
  } else {
    alert("Message sent successfully!");

    setForm({
      name: "",
      email: "",
      phone: "",
      message: ""
    });
  }
};

  return (
    <div>
      <section className="bg-primary py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Contact Us</h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            We'd love to hear from you. Reach out to us anytime.
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12">

            {/* Info */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Get In Touch</h2>
              <div className="space-y-6">
                {[
                  { icon: MapPin, label: "Address", value: "Kamtha BK, Tq. Ardhapur, Nanded, Maharashtra - 431704" },
                  { icon: Phone, label: "Phone", value: "+91 94217 65864" },
                  { icon: Mail, label: "Email", value: "info@sbecampus.edu.in" },
                  { icon: Clock, label: "Office Hours", value: "Monday - Saturday: 10:00 AM - 4:00 PM" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 shrink-0">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{item.label}</h3>
                      <p className="text-sm text-muted-foreground">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map */}
              <div className="mt-8 rounded-xl overflow-hidden border border-border">
                <iframe
                  title="School Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1070.3765021792465!2d77.31175334418589!3d19.284713580405768!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd1d1be696d91cd%3A0x9b06122f2e1669cc!2sShri%20Basweshwar%20Highschool%2C%20Kamtha%20(bk.)!5e1!3m2!1sen!2sin!4v1774779429575!5m2!1sen!2sin"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Form */}
            <div className="rounded-xl bg-card border border-border p-8 shadow-sm">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Send a Message</h2>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Full Name</label>
                  <Input required name="name" value={form.name} onChange={handleChange} placeholder="Your full name" />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                  <Input required name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Phone</label>
                  <Input required name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="Enter your phone" />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Message</label>
                  <Textarea required name="message" value={form.message} onChange={handleChange} placeholder="Your message..." rows={4} />
                </div>

                <Button type="submit" className="w-full">Send Message</Button>
              </form>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;