export function pickUpBusinessDays(dias: number) {
  const dataAtual = new Date();
  let contadorDias = 0;

  while (contadorDias < dias) {
      // Adiciona 1 dia
      dataAtual.setDate(dataAtual.getDate() + 1);

      // Verifica se é dia útil (segunda = 1, terça = 2, ..., sexta = 5)
      if (dataAtual.getDay() >= 1 && dataAtual.getDay() <= 5) {
          contadorDias++;
      }
  }

    // Retorna a data de vencimento em milissegundos
    return dataAtual.getTime();
}
