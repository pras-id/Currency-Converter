"use client"; // Menandakan bahwa ini adalah Client Component

import { useState } from 'react';

export default function Home() {
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [result, setResult] = useState(null);
  const [currencySymbol, setCurrencySymbol] = useState(''); // Untuk menyimpan simbol mata uang

  const currencies = ['USD', 'EUR', 'GBP', 'IDR', 'JPY'];

  const getCurrencySymbol = (currency) => {
    switch (currency) {
      case 'USD':
        return '$';
      case 'EUR':
        return '€';
      case 'GBP':
        return '£';
      case 'IDR':
        return 'Rp';
      case 'JPY':
        return '¥';
      default:
        return '';
    }
  };

  const convertCurrency = async () => {
    try {
      const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
      const data = await res.json();
      const rate = data.rates[toCurrency];
      const conversionResult = amount * rate;
      // Simpan hasil konversi dan simbol mata uang
      setResult(conversionResult.toLocaleString('id-ID'));
      setCurrencySymbol(getCurrencySymbol(toCurrency)); // Set simbol mata uang yang sesuai
    } catch (error) {
      console.error("Error fetching data:", error);
      setResult("Error in conversion");
    }
  };

  return (
    <div className="container">
      <h1>Currency Converter</h1>

      <div>
        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <div>
        <label>From Currency:</label>
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>To Currency:</label>
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>

      <button onClick={convertCurrency}>
        Convert
      </button>

      {result && (
        <div>
          <h2>Conversion Result:</h2>
          <p>{amount} {fromCurrency} = {currencySymbol} {result}</p> {/* Hilangkan toCurrency di belakang */}
        </div>
      )}
    </div>
  );
}
