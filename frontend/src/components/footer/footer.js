import React from "react";
import footer from "./Footer.module.css";

function Footer() {
  return (
    <div className={footer.footer}>
      <div className={footer.social_media}>
        <h3>Social Media</h3>
        <ul>
          <li>
            <a href="https://twitter.com">Twitter</a>
          </li>
          <li>
            <a href="https://facebook.com">Facebook</a>
          </li>
          <li>
            <a href="https://instagram.com">Instagram</a>
          </li>
        </ul>
      </div>
      <div className={footer.site_links}>
        <h3>Site Links</h3>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
