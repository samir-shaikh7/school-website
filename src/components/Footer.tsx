import { Link } from "react-router-dom";
import { GraduationCap, MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => (
  <footer className="bg-foreground text-background">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="leading-tight">
              <span className="block font-heading text-lg font-bold">Shri Basweshwar</span>
              <span className="block text-xs opacity-70">Education Campus</span>
            </div>
          </div>
          <p className="text-sm opacity-70 leading-relaxed">
            Providing quality education in Nanded District, Maharashtra since over 20 years.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-heading text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm opacity-80">
            {["About Us", "Academics", "Admissions", "Gallery", "Contact"].map((l) => (
              <li key={l}>
                <Link to={`/${l.toLowerCase().replace(" ", "-").replace("about-us", "about")}`} className="hover:opacity-100 transition-opacity">
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-heading text-lg font-semibold mb-4">Contact Info</h4>
          <ul className="space-y-3 text-sm opacity-80">
            <li className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
              Kamtha BK, Nanded District, Maharashtra, India
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0" />
              +91 94217 65864
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0" />
              info@sbecampus.edu.in
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="font-heading text-lg font-semibold mb-4">Follow Us</h4>
          <div className="flex gap-3">
            {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-background/10 hover:bg-primary transition-colors"
                aria-label="Social media"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-background/20 mt-8 pt-6 text-center text-sm opacity-60">
        © {new Date().getFullYear()} Shri Basweshwar Education Campus. All rights reserved.
      </div>

      <div className="mt-4 pt-4 text-center text-lg opacity-90 font-semibold mb-4 flex justify-center items-center gap-2">
        <a href="https://instagram.com/its_sam___77"
          target="_blank">
          <span>Developed By:</span>
        </a>
        <a
          href="https://instagram.com/its_sam___77"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-pink-500 hover:underline"
        >
          Sam
          <Instagram size={18} />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
