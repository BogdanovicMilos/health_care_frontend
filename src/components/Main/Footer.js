import React from "react";
import "../../assets/main/footer.scss";
import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="page-footer">
      <div className="mainFooter">
        <div className="logo">
          <Link to="/" className="mainLogo">
            <h1>Health Care</h1>
          </Link>
          <div className="socialMedia">
            <div>
              <a href="/#">
                <FaInstagram className="insta" />
              </a>
            </div>
            <div>
              <a href="/#">
                <FaFacebookF className="facebook" />
              </a>
            </div>
            <div>
              <a href="/#">
                <FaTwitter className="twitter" />
              </a>
            </div>
          </div>
          <p>&copy; Copyright 2020 Health Care</p>
        </div>
        <ul>
          <h3>Visite</h3>
          <li>
            <Link className="homeClass" to="/">
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link className="aboutClass" to="/about">
              <span>About</span>
            </Link>
          </li>
          <li>
            <Link className="contactClass" to="/contact">
              <span>Contact</span>
            </Link>
          </li>
        </ul>
        <ul>
          <h3>Contact</h3>
          <li>Adress: blablabla 4b</li>
          <li>Tel: 064/3213-321</li>
          <li>Email: blablabla@gmail.com</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
