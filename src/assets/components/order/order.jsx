import React, { useState } from "react";  
import axios from "axios";  
import './Order.css';  

const availableToppings = [  
    'Pepperoni',   
    'Tavuk Izgara',  
    'Mısır',  
    'Sarmısak',   
    'Ananas',  
    'Sosis',  
    'Soğan',  
    'Sucuk',  
    'Biber',  
    'Kabak',  
    'Kanada Jambonu',  
    'Domates',  
    'Jalapeño',  
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
        const basePrice = 85.50; // Varsayılan pizza tutarı  
        const toppingPrice = 5; // Her ek malzeme için  
        return basePrice + (toppings.length * toppingPrice) * quantity;  
    };  

    const handleSubmit = async (e) => {  
        e.preventDefault();  

        // Kontroller  
        if (name.length < 3) {  
            alert('İsim en az 3 karakter olmalıdır.');  
            return;  
        }  
        if (toppings.length < 4 || toppings.length > 10) {  
            alert('Malzeme sayısı en az 4, en fazla 10 olmalı.');  
            return;  
        }  

        const order = {  
            isim: name,  
            boyut: size,  
            hamur: doughType,  
            malzemeler: toppings,  
            özel: note,  
            miktar: quantity,  
            toplam: calculateTotal(),  
        };  

        try {  
            // API isteği  
            const response = await axios.post('https://reqres.in/api/pizza', order);  
            console.log('Sipariş Özeti:', {  
                isim: response.data.isim || name,  
                boyut: response.data.boyut || size,  
                malzemeler: response.data.malzemeler || toppings,  
                özel: response.data.özel || note,  
                miktar: quantity,  
                toplam: response.data.toplam || order.toplam,  
                id: response.data.id, // API'den dönen id  
                tarih: response.data.tarih // API'den dönen tarih  
            }); // Gelen yanıtı console'a yazdır  
            onSubmit(order); // Siparişi App bileşenine gönder  
        } catch (error) {  
            console.error('API isteği sırasında bir hata oluştu:', error);  
        }  
    };  

    return (  
        <form className="order-form" onSubmit={handleSubmit}>  
            <h2>Pizza Sipariş Formu</h2>  
            <input   
                type="text"   
                value={name}   
                onChange={(e) => setName(e.target.value)}   
                placeholder="İsim"   
                required   
            />  
                    
            <h3>Boyut Seç:</h3>  
            <label>  
                <input   
                    type="radio"   
                    value="Küçük"   
                    checked={size === 'Küçük'}   
                    onChange={handleSizeChange}   
                    required   
                />  
                Küçük  
            </label>  

            <label>  
                <input   
                    type="radio"   
                    value="Orta"   
                    checked={size === 'Orta'}   
                    onChange={handleSizeChange}   
                    required   
                />  
                Orta  
            </label>  

            <label>  
                <input   
                    type="radio"   
                    value="Büyük"   
                    checked={size === 'Büyük'}   
                    onChange={handleSizeChange}   
                    required   
                />  
                Büyük  
            </label>   

            <select  
                value={doughType}  
                onChange={(e) => setDoughType(e.target.value)}  
                required  
            >  
                <option value="Hamur Seç">Hamur Kalınlığı</option>  
                <option value="İnce">İnce</option>  
                <option value="Kalın">Kalın</option>  
            </select>  

            <label>Ek Malzemeler:</label>  
            {availableToppings.map((topping) => (  
                <div key={topping}>  
                    <input   
                        type="checkbox"   
                        checked={toppings.includes(topping)}   
                        onChange={() => handleToppingChange(topping)}   
                    />  
                    {topping}  
                </div>  
            ))}  

            <textarea   
                value={note}   
                onChange={(e) => setNote(e.target.value)}   
                placeholder="Sipariş Notu"   
            />  
            
            <div className="quantity-container">  
                <label>Miktar:</label>  
                <input  
                    type="number"  
                    value={quantity}  
                    onChange={(e) => setQuantity(e.target.value)}  
                    min="1"  
                />  
            </div>  

            <p><strong>Sipariş Toplamı: {calculateTotal().toFixed(2)}₺</strong></p>  
            <button type="submit">Sipariş Ver</button>  
        </form>  
    );  
}  

export default Order;