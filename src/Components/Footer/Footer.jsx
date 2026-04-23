import React from "react";
import './Footer.scss'
import logo from "../../assets/logo.svg"

const Footer = () => {
  return (
    <footer>
      <div className="top">
        <div className="one">
          <img src={logo}  alt="logo" />
          <p className="">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>

        <div className="two">
          <div>
            <h2 className="">Links</h2>
            <ul className="">
              <li>
                Home
              </li>
              <li>
                About us
              </li>
              <li>
                Categories
              </li>
              <li>
                Contact Us
              </li>
              <li>
                Privacy Policy
              </li>
            </ul>
          </div>
        </div>

        <div className="three">
          <div className="subc">
            <h2 className="">Get in touch</h2>
            <div className="">
              <p>+91 7034016568</p>
              <p>pranavmn7034@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
      <p className="bottom">
        Copyright 2025 © Pranavmn.dev All Right Reserved.
      </p>
    </footer>
  );
};

export default Footer;