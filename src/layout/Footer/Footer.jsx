import React from "react";
import logo from "./../../assets/img/PoiopTicket.jpg";
import { NavLink } from "react-router-dom";
import "./_footer.scss";

const Footer = () => {
  return (
    <div className="footerPt flex flex-col my-5 py-10">
      {/* logo  */}
      <div>
        <NavLink to={"/"} className="flex justify-center items-center">
          <div className="">
            <img src={logo} alt="" className="w-20 mb-5" />
          </div>
          <div className="ml-3">
            <h3 className="text-3xl font-bold">PoiopTicket</h3>
          </div>
        </NavLink>
        <hr />
      </div>
      {/* contact */}
      <div className="grid grid-cols-3 ">
        {/* About us */}
        <div className="contact footerTag text-center">
          <h4 className="font-bold mt-10 text-2xl">Phone</h4>
          <NavLink to="tel: +(21) 255 088 4943" className="linkFooter">
            <i class="fa-solid fa-phone"></i> +(21) 255 088 4943
          </NavLink>
        </div>

        {/* mail */}
        <div className="contact footerTag text-center">
          <h4 className="font-bold mt-10 text-2xl">Email</h4>
          <NavLink to="mailto:dungle.cisco@gmail.com" className="linkFooter">
            <i class="fa-regular fa-envelope"></i>
            dungle.cisco@gmail.com
          </NavLink>
        </div>

        <div className="contact footerTag text-center">
          <h4 className="font-bold mt-10 text-2xl">Social</h4>
          <div className="socialLink" style={{marginTop: "10px"}}>
            <div className="socialIcon">
              <NavLink to={"/"}>
                <i class="fa-brands fa-facebook-f"></i>
              </NavLink>
              <NavLink to={"/"}>
                <i class="fa-brands fa-instagram"></i>
              </NavLink>
              <NavLink to={"/"}>
                <i class="fa-brands fa-x-twitter"></i>
              </NavLink>
              <NavLink to={"/"}>
                <i class="fa-brands fa-reddit-alien"></i>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;



