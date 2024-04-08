import React from "react";
import Wrapper from "../sections/Wrapper";
import avatarImage from "../assets/kishan.jpeg"
import { FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";

function About() {
  return <div className="profile">
  
    <img src={avatarImage} alt="avatar"  className="profile-image"/>
    <h1 className="profile-text">Olá, me chamo Rennan</h1>
    <h2 className="profile-tex">esse é meu projeto de batalha pokedex</h2>
    <h4 className="profile-text">esse projeto foi criado para estudos de react/typescript/scss e etc</h4>

    <div className="profile-links">
      <a href="https://github.com/RennanFabricioSMP">
        <FaGithub />
      </a>
      <a href="">
        <FaYoutube />
      </a>
      <a href="https://www.linkedin.com/in/rennan-fabr%C3%ADcio-285489287/">
        <FaLinkedin />
      </a>
    </div>

  </div>
  
}
export default Wrapper(About);