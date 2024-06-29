async function status(request, response) {
  try {
    const apiResponse = await fetch(
      "https://economia.awesomeapi.com.br/last/EUR-BRL,BRL-EUR",
    );
    const data = await apiResponse.json();
    const euroAsk = data.EURBRL.ask;
    const realAsk = data.BRLEUR.ask;
    await response.status(200).json({ euroAsk, realAsk });
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
    await response.status(500).json({ error: "Erro ao buscar dados da API" });
  }
}

export default status;
