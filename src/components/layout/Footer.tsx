import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const footerLinks = {
  company: [
    { name: "About", path: "/about" },
    { name: "What We Build", path: "/what-we-build" },
    { name: "Materials", path: "/materials" },
  ],
  connect: [
    { name: "Start a Project", path: "/start-project" },
    { name: "Contact", path: "/contact" },
  ],
};

export const Footer = () => {
  return (
    <footer className="bg-midnight-light border-t border-ash/10">
      <div className="section-container py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <Link to="/">
              <span className="text-2xl font-bold tracking-tight text-concrete">
                ETERNA
              </span>
            </Link>
            <p className="mt-4 text-concrete-muted max-w-sm leading-relaxed">
              Premium biodegradable packaging for forward-thinking food brands.
              Engineering sustainability without compromise.
            </p>
            <motion.a
              href="/start-project"
              className="inline-flex items-center gap-2 mt-6 text-copper font-medium group"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              Start your packaging project
              <ArrowUpRight
                size={18}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </motion.a>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-sm font-semibold text-concrete mb-4 uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-concrete-muted hover:text-copper transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Links */}
          <div>
            <h4 className="text-sm font-semibold text-concrete mb-4 uppercase tracking-wider">
              Connect
            </h4>
            <ul className="space-y-3">
              {footerLinks.connect.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-concrete-muted hover:text-copper transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-ash/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-ash">
            © {new Date().getFullYear()} Eterna. All rights reserved.
          </p>
          <p className="text-sm text-ash">
            Engineering the future of packaging.
          </p>
        </div>
      </div>
    </footer>
  );
};
