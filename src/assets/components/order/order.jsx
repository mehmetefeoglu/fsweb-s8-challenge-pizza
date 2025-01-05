import React, { useState, useEffect } from "react";
import axios from "axios";
import './order.css';

const sizes = [
    { value: 'S', label: 'S' },
    { value: 'M', label: 'M' },
    { value: 'L', label: 'L' },
];

const doughTypes = [
    { value: 'İnce', label: 'İnce' },
    { value: 'Kalın', label: 'Kalın' },
];

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

const initialFormState = {
    name: '',          
    size: '',         
    doughType: '',     
    toppings: [],      
    note: '',          
    quantity: 1,       
};

const initialErrorsState = {
    name: '',
    size: '',
    doughType: '',    
    toppings: '',
    quantity: '',
};

const Order = ({ onSubmit }) => {
    const [formData, setFormData] = useState(initialFormState);
    const [errors, setErrors] = useState(initialErrorsState);
    const [totalPrice, setTotalPrice] = useState(0);

    // Toppings doğrulaması
    useEffect(() => {
        const selectedToppingsCount = formData.toppings.length;
        if (selectedToppingsCount < 4) {
            setErrors({
                ...errors,
                toppings: "En az 4 malzeme seçmelisiniz!"
            });
        } else if (selectedToppingsCount > 10) {
            setErrors({
                ...errors,
                toppings: "En fazla 10 malzeme seçebilirsiniz!"
            });
        } else {
            setErrors({
                ...errors,
                toppings: ''  // Hata temizlendi
            });
        }
    }, [formData.toppings]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        let errorMsg = '';

        // İsim alanı doğrulaması
        if (name === 'name') {
            if (value.trim() === '') {
                errorMsg = "İsim alanı boş bırakılamaz!";
            } else if (value.trim().length < 3) {
                errorMsg = "İsim en az 3 karakter olmalıdır!";
            }
        }

        let newFormData = { ...formData };
        if (type === "checkbox") {
            const updatedToppings = checked
                ? [...newFormData.toppings, value]
                : newFormData.toppings.filter(topping => topping !== value);
            newFormData.toppings = updatedToppings;
        } else {
            newFormData[name] = value;
        }

        setFormData(newFormData);

        // Hata mesajlarını güncelle
        setErrors({
            ...errors,
            [name]: errorMsg,
        });
    };

    const calculateTotal = () => {
        const basePrice = 85.50;
        const toppingPrice = 5;
        return (basePrice + (formData.toppings.length * toppingPrice)) * formData.quantity;
    };

    useEffect(() => {
        const total = calculateTotal();
        setTotalPrice(total);
    }, [formData.toppings, formData.quantity]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // İsim ve malzeme kontrolü
        if (formData.name.trim() === '') {
            setErrors({
                ...errors,
                name: "İsim alanı boş bırakılamaz!"
            });
            return;
        }

        if (formData.name.trim().length < 3) {
            setErrors({
                ...errors,
                name: "İsim en az 3 karakter olmalıdır!"
            });
            return;
        }

        if (formData.toppings.length < 4) {
            setErrors({
                ...errors,
                toppings: "En az 4 malzeme seçmelisiniz!"
            });
            return;
        }

        // submit edilmeden önce hataları kontrol etme
        const hasErrors = Object.values(errors).some((error) => error !== "");
        if (hasErrors) {
            console.log("Hatalar var, gönderim yapılmaz.");
            return;
        }

        const orderData = {
            isim: formData.name,
            boyut: formData.size,
            malzemeler: formData.toppings,
            özel: formData.note,
            miktar: formData.quantity,
            hamur: formData.doughType,
            total: totalPrice
        };

        axios.post('https://reqres.in/api/pizza', orderData)
            .then(response => {
                console.log('Gelen Yanıt:', response.data);
                onSubmit(orderData); // App.jsx e data yı gönder
            })
            .catch(error => {
                console.error('Hata:', error);
            });
    };

    const renderSizes = () => {
        return sizes.map(({ value, label }) => (
            <label key={value}>
                <input
                    type="radio"
                    name="size"
                    value={value}
                    checked={formData.size === value}
                    onChange={handleChange}
                    required
                />
                {label}
            </label>
        ));
    };

    const renderDoughTypes = () => {
        return doughTypes.map(({ value, label }) => (
            <option key={value} value={value}>
                {label}
            </option>
        ));
    };

    const renderToppings = () => {
        return availableToppings.map((topping, index) => (
            <div key={topping} className="topping">
                <input
                    id={`topping-${index}`}
                    name="toppings"
                    type="checkbox"
                    value={topping}
                    checked={formData.toppings.includes(topping)}
                    onChange={handleChange}
                />
                <label htmlFor={`topping-${index}`}>{topping}</label>
            </div>
        ));
    };

    return (
        <form className="order-form" onSubmit={handleSubmit}>
            <div className="description">
                <img src="images/iteration-2-images/pictures/form-banner.png" alt="banner.png" />
                <h2>Position Absolute Acı Pizza</h2>
                <h3>85.50₺</h3>
                <p>Pizza Açıklaması...</p>
            </div>

            <div>
                <input
                    autoComplete="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="İsim"
                    required
                />
                {errors.name && <div className="error-message">{errors.name}</div>}
            </div>

            <div className="hamur-boyut">
                <h3>Boyut Seç:</h3>
                {renderSizes()}
                <select
                    name="doughType"
                    value={formData.doughType}
                    onChange={handleChange}
                    required
                >
                    <option value="">Hamur Kalınlığı Seç</option>
                    {renderDoughTypes()}
                </select>
                {errors.doughType && <div className="error-message">{errors.doughType}</div>}  {/* hamur kalınlığı için hata mesajı*/}
            </div>

            <label>Ek Malzemeler:</label>
            <div className="topping-container">
                {renderToppings()}
            </div>
            {errors.toppings && <div className="error-message">{errors.toppings}</div>}

            <div>
                <textarea
                    name="note"
                    value={formData.note}
                    onChange={handleChange}
                    placeholder="Sipariş Notu"
                />
            </div>

            <div className="quantity-container">
                <label htmlFor="quantity">Miktar:</label>
                <input
                    name="quantity"
                    type="number"
                    id="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    min="1"
                />
                {errors.quantity && <div className="error-message">{errors.quantity}</div>}
            </div>

            <div className="border-box">
                <p>Sipariş Toplamı: {totalPrice.toFixed(2)}₺</p>
                <strong>Toplam: {totalPrice.toFixed(2)}₺</strong>
                <button className="button" type="submit">Sipariş Ver</button>
            </div>
        </form>
    );
};

export default Order;
