
import React from 'react';  
import './success.css';  

const Success = ({ resetOrder, order }) => {  
    return (  
        <div className='successMessage'>  
            <h1>TEBRİKLER! <br /> SİPARİŞİNİZ ALINDI!</h1>  
            <p><strong>İsim:</strong> {order.isim}</p>  
            <p><strong>Hamur:</strong> {order.hamur}</p> {/* Düzeltme yapıldı */}  
            <p><strong>Boyut:</strong> {order.boyut}</p>  {/* Düzeltme yapıldı */}  
             
            <p><strong>Ek Malzemeler:</strong> {order.malzemeler.length > 0 ? order.malzemeler.join(', ') : 'Yok'}</p>  
            <p><strong>Notlar:</strong> {order.özel || 'Yok'}</p>  
            <p><strong>Miktar:</strong> {order.miktar}</p>  
            <p><strong>Sipariş Toplamı:</strong> {((order.total || 0).toFixed(2))}₺</p>   
            <button onClick={resetOrder}>Yeni Sipariş Ver</button>  
        </div>  
    );  
};  

export default Success;  