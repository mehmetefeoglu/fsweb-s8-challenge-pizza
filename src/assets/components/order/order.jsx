import React, { useState } from "react";  
import axios from "axios";  
import './order.css'

const availableToppings = [  
    'Pepperoni',   
    'Tavuk Izgara',  
    'Mısır',  
    'Sarmısak',   
    'Ananas',  
    'Sucuk',  
    'Sosis',  
    'Soğan',    
    'Biber',  
    'Kabak',  
    'Kanada Jambonu',  
    'Domates',  
    'Jalapeno',  
];  

const Order = ({ onSubmit }) => {  
    const [name, setName] = useState('');  
    const [size, setSize] = useState('');  
    const [doughType, setDoughType] = useState("Hamur Seç");  
    const [toppings, setToppings] = useState([]);  
    const [note, setNote] = useState('');  
    const [quantity, setQuantity] = useState(1);  

    const handleToppingChange = (topping) => {  
        setToppings((prev) =>   
            prev.includes(topping) ? prev.filter((t) => t !== topping) : [...prev, topping]  
        );  
    };  

    const handleSizeChange = (e) => {  
        setSize(e.target.value);  
    };  

    const calculateTotal = () => {  
        const basePrice = 85.50;  
        const toppingPrice = 5;  
        return (basePrice + (toppings.length * toppingPrice)) * quantity;  
    };  

    const handleSubmit = async (e) => {  
      e.preventDefault();   

      const total = calculateTotal(); // Toplamı hesapla  

      const orderData = {  
          isim: name,  
          boyut: size,  
          malzemeler: toppings,  
          özel: note,  
          miktar: quantity,  
          hamur: doughType,  
          total: total  // Toplamı buraya ekliyoruz   
      };  

      try {  
          const response = await axios.post('https://reqres.in/api/pizza', orderData);  
          console.log('Gelen Yanıt:', response.data);  
          onSubmit(orderData); // Siparişi App bileşenine gönder   
      } catch (error) {  
          console.error('Hata:', error);  
      }  
    };  

    return (  
        <form className="order-form" onSubmit={handleSubmit}>
          
           <div className="description">
           <img src="images\iteration-2-images\pictures\form-banner.png" alt="banner.png" /> 
            <h2>Position Absolute Acı Pizza</h2> 
            <h3>85.50₺</h3> 
            <p>Frontent Dev olarak hala position:absolute kullanıyorsan bu çok acı pizza tam
                 sana göre. Pizza, domates, peynir ve genellikle çeşitli diğer malzemelerle 
                 kaplanmış, daha sonra geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta 
                 pişirilen, genellikle yuvarlak, düzeltilmiş mayalı buğday bazlı hamurdan oluşan 
                 İtalyan kökenli lezzetli bir yemektir. Küçük bir pizzaya bazen pizzetta denir. 
            </p>
            </div>
            <div>
            <label htmlFor="name">  
                <input  
                    autoComplete="name"  
                    type="text"   
                    value={name}   
                    onChange={(e) => setName(e.target.value)}   
                    placeholder="İsim"   
                    id="name"  
                    name="name"  
                    required   
                />  
            </label> 
            </div> 
            <div className="hamur-boyut">
            <div>
            <h3>Boyut Seç:</h3>  
            <label htmlFor="Küçük" >  
                <input   
                    type="radio"   
                    value="S"   
                    checked={size === 'S'}   
                    onChange={handleSizeChange}   
                    id="Küçük"  
                    required   
                />  
                S 
            </label>  

            <label htmlFor="Orta">  
                <input   
                    type="radio"   
                    value="M"   
                    checked={size === 'M'}   
                    onChange={handleSizeChange}  
                    id="Orta"   
                    required   
                />  
                M  
            </label>  

            <label htmlFor="Büyük">  
                <input   
                    type="radio"   
                    value="L"   
                    checked={size === 'L'}   
                    onChange={handleSizeChange}  
                    id="Büyük"   
                    required   
                />  
                L  
            </label>  
            </div>
             <div>
            <select value={doughType} onChange={(e) => setDoughType(e.target.value)} required>  
                <option value="Hamur Seç">Hamur Kalınlığı</option>  
                <option value="İnce">İnce</option>  
                <option value="Kalın">Kalın</option>  
            </select>  
            </div>
            </div>
            <label>Ek Malzemeler:</label>  
<div className="topping-container">  
    {availableToppings.map((topping, index) => (  
        <div key={topping} className="topping">  
            <input  
                id={`topping-${index}`} // Benzersiz id oluşturma  
                name="topping"  
                type="checkbox"  
                checked={toppings.includes(topping)}  
                onChange={() => handleToppingChange(topping)}  
            />  
            <label htmlFor={`topping-${index}`}>{topping}</label>  
        </div> 
         
    ))}  
</div>  

<div>
<textarea  
    value={note}  
    id="note"  
    onChange={(e) => setNote(e.target.value)}  
    placeholder="Sipariş Notu"  
/>  
</div>
<div className="quantity-container">  
    <label htmlFor="quantity">Miktar:</label>  
    <input  
        name="quantity"  
        type="number"  
        id="quantity"  
        value={quantity}  
        onChange={(e) => setQuantity(e.target.value)}  
        min="1"  
    />  
</div>  

<div className="border-box">  
    <p>Sipariş Toplamı: {calculateTotal().toFixed(2)}₺</p>  
    <p><strong>Toplam: {calculateTotal().toFixed(2)}₺</strong></p>  
  

<button className="button" type="submit">Sipariş Ver</button>   </div> 
        </form>  
    );  
};  

export default Order;