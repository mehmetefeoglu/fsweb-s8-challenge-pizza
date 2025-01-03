
import React from 'react';  
import './success.css';  

const Success = ({ order }) => { 
  let secim = (order.malzemeler.length)*5
    return (  
      
        <div className='successMessage'>  
            <h4 className='text-lezzet'>lezzetin yolda</h4>
            <h1> SİPARİŞ ALINDI</h1>  
            <hr class="h-line"></hr>
            <p>İsim: <strong>{order.isim}</strong> </p>  
            <p>Boyut: <strong>{order.boyut}</strong> </p> 
            <p>Hamur: <strong>{order.hamur}</strong> </p>    
            <p>Ek Malzemeler: <strong>{order.malzemeler.length > 0 ? order.malzemeler.join(', ') : 'Yok'}</strong> </p>  
            <p className='total'>Sipariş Toplamı <br /><br />Seçimler:            {secim}₺ <br /><br />Toplam:      {((order.total || 0).toFixed(2))}₺ </p> 
            
        </div>  
    );  
};  

export default Success;  