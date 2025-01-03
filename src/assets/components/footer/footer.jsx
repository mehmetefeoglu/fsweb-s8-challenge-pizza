import React from 'react';  
import './Footer.css';   

const Footer = () => {  
  return (  
    <footer className="footer">  
      <div className="footer-content">  
        <div className="footer-section-about">  
            <h1 className='title'>Teknolojik <br /> Yemekler</h1>  
            <p><img src="images\iteration-2-images\footer\icons\icon-1.png" alt="icon-1.png" />  341 Londonderry Road,<br /> İstanbul Türkiye </p>  
            <p><img src="images\iteration-2-images\footer\icons\icon-2.png" alt="icon-2.png" />  aciktim@teknolojikyemekler.com</p>  
            <p><img src="images\iteration-2-images\footer\icons\icon-3.png" alt="icon-3.png" />  +90 216 123 45 67</p>  
           </div> 

        <div className="footer-section-menu">  
                <h2>Hot Menu</h2>  
                <p>Terminal Pizza</p>  
                <p>5 Kişilik Hackathlon Pizza</p>  
                <p>useEffect Tavuklu Pizza</p>  
                <p>Beyaz Console Frosty</p>  
                <p>Testler Geçti Mutlu Burger</p>  
                <p>Position Absolute Acı Burger</p>  
               
        </div>  
        <div className="footer-section-instagram">  
            <h2>Instagram</h2>  
            <div className="instagram-images1">  
                <img src="images\iteration-2-images\footer\insta\li-0.png" alt="li-0.png" />  
                <img src="images\iteration-2-images\footer\insta\li-1.png" alt="li-1.png" />  
                <img src="images\iteration-2-images\footer\insta\li-2.png" alt="li-2.png" /> 
                 </div> 
                <div className="instagram-images2">
                <img src="images\iteration-2-images\footer\insta\li-3.png" alt="li-3.png" />  
                <img src="images\iteration-2-images\footer\insta\li-4.png" alt="li-4.png" />  
                <img src="images\iteration-2-images\footer\insta\li-5.png" alt="li-5.png" />  
                </div>    
        </div> 
        </div>  
      <hr class="h_line"></hr>
      <div className='under'> <p>© 2023 Teknolojik Yemekler.</p> 
      </div>  
    </footer>  
  );  
};  

export default Footer;