import React from 'react';
import { FiArrowRight } from 'react-icons/fi'; 
import { Link } from 'react-router-dom'; 

import '../styles/pages/landing.css';

import logoImg from '../images/svg-balls.svg';

function Landing() {
  return (
    <div id="page-landing">
      <div className="content-wrapper">
        {/* <img src={logoImg} alt="Happy" /> */}

        <main>
          <h1>Pratique esportes</h1>
          <p>Reuna seus amigos e joguem seus esportes favoritos</p>
        </main>

        <div className="location">
          <strong>Minas Gerais</strong>
          <span>Ipatinga</span>
        </div>

        <Link to="/app" className="enter-app">
          <FiArrowRight size={26} color="rgba(0,0,0,0.6)" />
        </Link>
      </div>
    </div>
  );
}

export default Landing;