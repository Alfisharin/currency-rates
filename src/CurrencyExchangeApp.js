import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function CurrencyExchangeApp() {
  const [currencyData, setCurrencyData] = useState([]);
  const apiKey = 'a9322b49f6ef41cb98823541a3342049'; 
  const currencies = ['CAD', 'EUR', 'IDR', 'JPY', 'CHF', 'GBP'];

  useEffect(() => {
    async function fetchCurrencyData() {
      try {
        const response = await axios.get(`https://api.currencyfreaks.com/latest?apikey=${apiKey}`);

        if (response.status !== 200) {
          throw new Error('Failed to fetch exchange rates');
        }

        const data = response.data;

        const updatedCurrencyData = currencies.map((currency) => ({
          currency,
          exchangeRate: data.rates[currency],
          weBuy: data.rates[currency] * 1.05,
          weSell: data.rates[currency] * 0.95,
        }));

        setCurrencyData(updatedCurrencyData);
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
      }
    }

    fetchCurrencyData();
  }, [apiKey]);

  return (
    <div className="currency-exchange-app">
      <h1>Currency Exchange Rates (1 USD)</h1>
      <table>
        <thead>
          <tr>
            <th>Currency</th>
            <th>We Buy</th>
            <th>Exchange Rate</th>
            <th>We Sell</th>
          </tr>
        </thead>
        <tbody>
          {currencyData.map((data) => (
            <tr key={data.currency}>
              <td>{data.currency}</td>
              <td>{data.weBuy.toFixed(4)}</td>
              <td>{data.exchangeRate}</td>
              <td>{data.weSell.toFixed(4)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Rates are based from 1 usd</p>
      <p>This application uses API from https://currencyfreaks.com.</p>
    </div>
  );
}

export default CurrencyExchangeApp;
