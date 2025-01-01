import React from 'react';
import './success.css';  
//<p><strong>İsim:</strong> {order.name}</p>  
     // <p><strong>Boyut:</strong> {order.size}</p>  
     // <p><strong>Hamur:</strong> {order.doughType}</p>  
    //  <p><strong>Ek Malzemeler:</strong> {order.toppings.join(', ')}</p>  
     // <p><strong>Notlar:</strong> {order.note}</p>  
    //  <p><strong>Miktar:</strong> {order.quantity}</p>  
    //  <p><strong>Sipariş Toplamı:</strong> {order.total.toFixed(2)}₺</p> 
const Success = ({ order }) => {  
  return (  
    <div className='successMessage'>  
      <h1>TEBRİKLER! <br /> SİPARİŞİNİZ ALINDI!</h1>  
      
    </div>  
  );  
};  

export default Success;  