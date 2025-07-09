import { Facebook, Instagram, Twitter, Linkedin, Youtube, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {

  const handleMenuClick = (item) => {
    const targetId = item.trim().toLowerCase().replace(/\s+/g, "-");
    const section = document.getElementById(targetId);

    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }

    setIsMobileMenuOpen(false);
  };

  return (
    <footer className="relative bg-primary  text-gray-300 pt-6 lg:pt-12 pb-6 px-6 md:px-12">
      {/* Light sweep effect overlay */}
      <div className="absolute inset-0  md:group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 z-10 pointer-events-none translate-x-0 md:translate-x-[-50%]"></div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-gray-800 pb-8">
        {/* Brand Section */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-white text-black flex items-center justify-center text-xl font-bold rounded">N</div>
            <div>
              <h2 className="text-xl font-semibold">nSkills</h2>
              <p className="text-xs text-gray-400">RESHAPE YOUR DESTINY</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-gray-400 mb-4">
            Learn tech skills and stay job-ready with AI-powered, mentor-led, career-focused courses.
          </p>
          {/* Social Icons */}
          <div className="flex gap-4">
            <a href="#" aria-label="Facebook" className="hover:text-purple-400 transition">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-purple-400 transition">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-purple-400 transition">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-purple-400 transition">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" aria-label="YouTube" className="hover:text-purple-400 transition">
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><button onClick={() => handleMenuClick('Programs')} className="hover:text-purple-400 transition">Programs</button></li>
            <li><button onClick={() => handleMenuClick('Earnings')} className="hover:text-purple-400 transition">Earnings</button></li>
            <li><button onClick={() => handleMenuClick('Contact')} className="hover:text-purple-400 transition">Contact</button></li>
            <li><button onClick={() => handleMenuClick('Privacy Policy')} className="hover:text-purple-400 transition">Privacy Policy</button></li>
          </ul>
        </div>

        {/* Courses */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Courses</h3>
          <ul className="space-y-2 text-sm">
            <li><button onClick={() => handleMenuClick('programs')} className="hover:text-purple-400 transition">Standard Program</button></li>
            <li><button onClick={() => handleMenuClick('programs')} className="hover:text-purple-400 transition">Premium Program</button></li>
            <li><button onClick={() => handleMenuClick('programs')} className="hover:text-purple-400 transition">Classroom (Gurgaon)</button></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Get In Touch</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-purple-400" />
              <span>support@nskills.in</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-purple-400" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-purple-400" />
              <span>Gurgaon, India</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Disclaimer */}
      <div className="mt-8 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} nSkills. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
