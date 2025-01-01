import React from 'react';  

const Success = ({ order }) => {  
  return (  
    <div>  
      <h1>Siparişiniz başarıyla alındı!</h1>  
      <p><strong>İsim:</strong> {order.name}</p>  
      <p><strong>Boyut:</strong> {order.size}</p>  
      <p><strong>Hamur:</strong> {order.doughType}</p>  
      <p><strong>Ek Malzemeler:</strong> {order.toppings.join(', ')}</p>  
      <p><strong>Notlar:</strong> {order.note}</p>  
      <p><strong>Miktar:</strong> {order.quantity}</p>  
      <p><strong>Sipariş Toplamı:</strong> {order.total.toFixed(2)}₺</p>  
    </div>  
  );  
};  

export default Success;  