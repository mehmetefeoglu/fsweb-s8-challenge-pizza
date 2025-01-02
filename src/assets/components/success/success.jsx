
import React from 'react';  
import './success.css';  

const Success = ({ order }) => { 
  let secim = (order.malzemeler.length)*5
    return (  
      
        <div className='successMessage'>  
            <h4>lezzetin yolda</h4>
            <h1> SİPARİŞ ALINDI</h1>  
            <p>İsim: <strong>{order.isim}</strong> </p>  
            <p>Boyut: <strong>{order.boyut}</strong> </p> 
            <p>Hamur: <strong>{order.hamur}</strong> </p>    
            <p>Ek Malzemeler: <strong>{order.malzemeler.length > 0 ? order.malzemeler.join(', ') : 'Yok'}</strong> </p>  
            <p>Sipariş Toplamı <br />Seçimler:<strong> {secim}₺ <br /></strong>Toplam <strong>{((order.total || 0).toFixed(2))}₺</strong> </p> 
            
        </div>  
    );  
};  

export default Success;  