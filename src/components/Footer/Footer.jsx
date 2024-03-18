import React from "react";
import "./Footer.css";

export const Footer = ({
  copyrightText = "© 2024 Your Company Name",
  links,
}) => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {copyrightText && <p className="copyright">{copyrightText}</p>}
        {links && (
          <nav className="footer-links">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="footer-link">
                {link.text}
              </a>
            ))}
          </nav>
        )}
      </div>
    </footer>
  );
};
