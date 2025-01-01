import React, { useState } from 'react';  
import Home from './assets/components/home/home'; // Anasayfa bileşeni  
import Order from './assets/components/order/order';  // Sipariş formu bileşeni  
import Success from './assets/components/success/success';  // Başarılı mesaj bileşeni  
import Header from './assets/components/header/header';  // Header bileşeni  
import Footer from './assets/components/footer/footer';  // Footer bileşeni  
import './App.css'; // CSS dosyası (isteğe bağlı)  

const App = () => {  
  const [showOrderForm, setShowOrderForm] = useState(false); // Sipariş formu görünümü için durum  
  const [orderSuccess, setOrderSuccess] = useState(false); // Sipariş başarısı durumu  

  const handleOrderSubmit = () => {  
    setOrderSuccess(true); // Sipariş başarı durumunu true yap  
    setShowOrderForm(false); // Sipariş formunu kapat  
  };  

  const resetOrder = () => {  
    setOrderSuccess(false); // Sipariş başarı durumunu sıfırla  
    setShowOrderForm(false); // Sipariş formunu kapat  
  };  

  let currentStep = 'Anasayfa';  
  if (showOrderForm) {  
    currentStep = 'Anasayfa/Sipariş Formu';  
  } else if (orderSuccess) {  
    currentStep = 'Anasayfa/Sipariş Başarılı';  
  }  

  return (  
    <div>  
      <Header currentStep={currentStep} />  
      {orderSuccess ? (  
        <Success resetOrder={resetOrder} />  
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