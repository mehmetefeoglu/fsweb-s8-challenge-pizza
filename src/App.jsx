import React, { useState } from 'react';  
import Home from './assets/components/home/home'; // Anasayfa bileşeni  
import Order from './assets/components/order/order';  // Sipariş formu bileşeni  
import Success from './assets/components/success/success';  // Başarılı mesaj bileşeni  
import Header from './assets/components/header/header';  // Header bileşeni  
import Footer from './assets/components/footer/footer';  // Footer bileşeni  
import './App.css'; // CSS dosyası  

const App = () => {  
  const [showOrderForm, setShowOrderForm] = useState(false); // Sipariş formu görünümü için durum  
  const [orderSuccess, setOrderSuccess] = useState(false); // Sipariş başarısı durumu  
  const [order, setOrder] = useState(null); // Sipariş bilgilerini saklamak için durum  

  const handleOrderSubmit = (orderData) => {  
    setOrder(orderData); // Sipariş bilgilerini sakla  
    setOrderSuccess(true); // Sipariş başarı durumunu true yap  
    setShowOrderForm(false); // Sipariş formunu kapat  
  };  

  const resetOrder = () => {  
    setOrderSuccess(false); // Sipariş başarı durumunu sıfırla  
    setShowOrderForm(false); // Sipariş formunu kapat  
    setOrder(null); // Sipariş bilgilerini sıfırla  
  };  

  let currentStep = 'Anasayfa';  
  if (showOrderForm) {  
    currentStep = 'Anasayfa/Sipariş Formu';  
  } else if (orderSuccess) {  
    currentStep = 'Anasayfa/Sipariş Başarılı';  
  }  

  return (  
    <div className='app-container'>  
      <Header currentStep={currentStep} />  
      {orderSuccess ? (  
        <Success order={order} resetOrder={resetOrder} /> // Sipariş bilgilerini geç  
      ) : (  
        !showOrderForm ? (  
          <Home setShowOrderForm={setShowOrderForm} /> // Anasayfa göster  
        ) : (  
          <Order onSubmit={handleOrderSubmit} /> // Sipariş formu göster  
        )  
      )}  
      <Footer />  
    </div>  
  );  
};  

export default App;   