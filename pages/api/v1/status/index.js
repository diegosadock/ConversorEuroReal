async function status(request, response) {
  try {
    const apiResponse = await fetch(
      "https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL",
    );
    const data = await apiResponse.json();
    await response.status(200).json({ data });
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
    await response.status(500).json({ error: "Erro ao buscar dados da API" });
  }
}

export default status;
