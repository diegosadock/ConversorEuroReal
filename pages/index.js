import React, { useState, useEffect } from "react";
import styles from "./home-style.module.css";

function Home() {
  const [realAmount, setRealAmount] = useState("");
  const [euroAmount, setEuroAmount] = useState("");
  const [euroAsk, setEuroAsk] = useState(null);
  const [realAsk, setRealAsk] = useState(null);
  const [error, setError] = useState(null);
  const [isEuroToReal, setIsEuroToReal] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/v1/status");
        const data = await response.json();
        setEuroAsk(data.euroAsk);
        setRealAsk(data.realAsk);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  const handleConvert = () => {
    if (isEuroToReal) {
      if (euroAmount !== "" && euroAsk !== null) {
        const realValue = parseFloat(euroAmount) * parseFloat(euroAsk);
        setRealAmount(realValue.toFixed(2));
      } else {
        setError("Preencha o valor em Euro e aguarde a cotação ser carregada.");
      }
    } else {
      if (realAmount !== "" && realAsk !== null) {
        const euroValue = parseFloat(realAmount) / parseFloat(euroAsk);
        setEuroAmount(euroValue.toFixed(2));
      } else {
        setError("Preencha o valor em Real e aguarde a cotação ser carregada.");
      }
    }
  };

  return (
    <div className={styles.home}>
      <img
        src="https://th.bing.com/th/id/OIG2.EhnL6ydxfGiyakmkjALM?pid=ImgGn"
        alt="Guia de conversão de moedas"
        className={styles.currencyGuideImage}
      />
      <h1>Conversor de Moedas 🌍</h1>
      {error && <p className="error">{error}</p>}
      <input
        type="number"
        placeholder={
          isEuroToReal ? "Valor em Euro (EUR) 💶" : "Valor em Real (BRL)"
        }
        value={isEuroToReal ? euroAmount : realAmount}
        onChange={(e) =>
          isEuroToReal
            ? setEuroAmount(e.target.value)
            : setRealAmount(e.target.value)
        }
      />
      <button onClick={handleConvert}>
        {isEuroToReal ? "Converter para Real" : "Converter para Euro 💶"}
      </button>
      <p className={styles.real}>
        {isEuroToReal ? "Valor em Real:" : "Valor em Euro:"}{" "}
        {isEuroToReal ? realAmount : euroAmount}
      </p>
      <button onClick={() => setIsEuroToReal(!isEuroToReal)}>
        Trocar direção da conversão 🔃
      </button>
      <div className={styles.centro}>
        <p>
          <span className={styles.euroColor}>1 Euro</span> vale{" "}
          <span className={styles.realColor}>
            {parseFloat(euroAsk).toFixed(2)} Reais
          </span>
          <br></br>
          <span className={styles.euroColor}>100 Euros</span> valem{" "}
          <span className={styles.realColor}>
            {parseFloat(euroAsk * 100).toFixed(0)} Reais
          </span>
          <br></br>
          <span className={styles.euroColor}>500 Euros</span> valem{" "}
          <span className={styles.realColor}>
            {parseFloat(euroAsk * 500).toFixed(0)} Reais
          </span>
          <br></br>
          <span className={styles.euroColor}>1000 Euros</span> valem{" "}
          <span className={styles.realColor}>
            {parseFloat(euroAsk * 1000).toFixed(0)} Reais
          </span>
          <br></br>
          <span className={styles.euroColor}>3000 Euros</span> valem{" "}
          <span className={styles.realColor}>
            {parseFloat(euroAsk * 3000).toFixed(0)} Reais
          </span>
          <br></br>
          <span className={styles.euroColor}>5000 Euros</span> valem{" "}
          <span className={styles.realColor}>
            {parseFloat(euroAsk * 5000).toFixed(0)} Reais
          </span>
        </p>
      </div>
    </div>
  );
}

export default Home;
