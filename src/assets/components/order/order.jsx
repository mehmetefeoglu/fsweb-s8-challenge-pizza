import React, { useState } from "react";  
import axios from "axios";  

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
            <h2>Pizza Sipariş Formu</h2>  
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
            <h3>Boyut Seç:</h3>  
            <label htmlFor="Küçük" >  
                <input   
                    type="radio"   
                    value="Küçük"   
                    checked={size === 'Küçük'}   
                    onChange={handleSizeChange}   
                    id="Küçük"  
                    required   
                />  
                S 
            </label>  

            <label htmlFor="Orta">  
                <input   
                    type="radio"   
                    value="Orta"   
                    checked={size === 'Orta'}   
                    onChange={handleSizeChange}  
                    id="Orta"   
                    required   
                />  
                M  
            </label>  

            <label htmlFor="Büyük">  
                <input   
                    type="radio"   
                    value="Büyük"   
                    checked={size === 'Büyük'}   
                    onChange={handleSizeChange}  
                    id="Büyük"   
                    required   
                />  
                L  
            </label>  

            <select value={doughType} onChange={(e) => setDoughType(e.target.value)} required>  
                <option value="Hamur Seç">Hamur Kalınlığı</option>  
                <option value="İnce">İnce</option>  
                <option value="Kalın">Kalın</option>  
            </select>  

            <label>Ek Malzemeler:</label>  
            {availableToppings.map((topping, index) => (  
                <div key={topping}>  
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
             
            <textarea   
                value={note}   
                id="note"  
                onChange={(e) => setNote(e.target.value)}   
                placeholder="Sipariş Notu"   
            />  
            
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

            <p><strong>Sipariş Toplamı: {calculateTotal().toFixed(2)}₺</strong></p>  
            <button type="submit">Sipariş Ver</button>  
        </form>  
    );  
};  

export default Order;