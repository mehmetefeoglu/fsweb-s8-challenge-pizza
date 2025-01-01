import React from 'react';  
import './home.css'; 

const Home = ({ setShowOrderForm }) => {  
  const handleOrderClick = () => {  
    setShowOrderForm(true); // Order'u göster  
  };  

  return (  
    <div className="hero">  
      <h3>Teknolojik Yemekler</h3>  
      <h1>KOD ACIKTIRIR, <br /> PİZZA DOYURUR</h1>  
      <button className="order-button" onClick={handleOrderClick}>  
        ACIKTIM 
      </button>  
    </div>  
  );  
};  

export default Home;  