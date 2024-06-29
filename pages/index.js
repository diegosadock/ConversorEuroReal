import React, { useState, useEffect } from "react";

function Home() {
  const [realAmount, setRealAmount] = useState("");
  const [euroAmount, setEuroAmount] = useState("");
  const [euroAsk, setEuroAsk] = useState(null); // State for Euro ask value
  const [realAsk, setRealAsk] = useState(null);
  const [error, setError] = useState(null); // State for potential errors

  // Fetch Euro ask value on component mount
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

  const handleConvertToEuro = () => {
    if (realAmount !== "" && realAsk !== null) {
      const euroValue = parseFloat(realAmount) / parseFloat(euroAsk);
      setRealAmount(euroValue.toFixed(2));
    } else {
      setError("Preencha o valor em Euro e aguarde a cotação ser carregada.");
    }
  };

  const handleConvertToReal = () => {
    if (euroAmount !== "" && euroAsk !== null) {
      const realValue = parseFloat(euroAmount) * parseFloat(euroAsk);
      setRealAmount(realValue.toFixed(2)); // Format to two decimal places
    } else {
      setError("Preencha o valor em Euro e aguarde a cotação ser carregada.");
    }
  };

  return (
    <div>
      <h1>Conversor de Moedas</h1>
      {error ? <p className="error">{error}</p> : null}
      <input
        type="number"
        placeholder="Valor em Euro (EUR)"
        value={euroAmount}
        onChange={(e) => setEuroAmount(e.target.value)}
      />
      <button onClick={handleConvertToReal}>Converter para Real</button>
      <p>Valor em Real: {realAmount}</p>

      <input
        type="number"
        placeholder="Valor em Real (BRL)"
        value={realAmount}
        onChange={(e) => setRealAmount(e.target.value)}
        disabled // Disable input for converted Real value
      />
      <button onClick={handleConvertToEuro}>Converter para Euro</button>
      <p>Valor em Euro: {euroAmount}</p>
    </div>
  );
}

export default Home;
