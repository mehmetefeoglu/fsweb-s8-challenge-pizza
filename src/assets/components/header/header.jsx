import React from 'react';  
import './Header.css'; // CSS dosyasını ekleyebiliriz  

const Header = ({ currentStep }) => {  
  return (  
    <header className="header">  
      <h2>Teknolojik Yemekler</h2>  
      <nav>  
        <p>{currentStep}</p>  
      </nav>  
    </header>  
  );  
};  

export default Header;