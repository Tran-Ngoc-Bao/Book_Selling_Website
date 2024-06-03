import React from "react";
import footer from "./Footer.module.css";

function Footer() {
  return (
    <div className={footer.footer_container}>
      <div className={footer.footer_row}>
        <div className={footer.social_link}>
          <a href="https://facebook.com">
            <img
              src={require("../../images/icons/icons8-facebook-50.png")}
              alt="facebook"
              className={footer.icon}
            />
          </a>
          <a href="https://linkedin.com">
            <img
              src={require("../../images/icons/icons8-linkedin-50.png")}
              alt="facebook"
              className={footer.icon}
            />
          </a>
          <a href="https://youtube.com">
            <img
              src={require("../../images/icons/icons8-youtube-50.png")}
              alt="facebook"
              className={footer.icon}
            />
          </a>
          <a href="https://instagram.com">
            <img
              src={require("../../images/icons/icons8-instagram-50.png")}
              alt="facebook"
              className={footer.icon}
            />
          </a>
        </div>
        <div className={footer.page_logo}>
          <span className={footer.logo_icon}>BK BoSto</span>
        </div>
      </div>
    </div>
  );
}

export default Footer;
