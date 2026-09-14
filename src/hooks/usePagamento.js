import { useCallback, useState } from "react";
import { todosDigitosIguais } from "../utils/pagamento";

// Tempo simulado de processamento da compra.
const TEMPO_PROCESSAMENTO_MS = 1600;

// RF13 — Custom hook que extrai o estado e a lógica de processamento da
// compra (RF08) para fora dos componentes de página. Chamado sempre no
// nível superior do componente que o utiliza (Pagamento.jsx).
export function usePagamento() {
  const [processando, setProcessando] = useState(false);

  // RF08 — Simula uma operação assíncrona de pagamento, retornando uma
  // Promise que resolve com "sucesso" ou "falha" (RF07), sem permitir
  // novos envios enquanto `processando` for verdadeiro.
  const processarCompra = useCallback((numeroCartao) => {
    setProcessando(true);

    return new Promise((resolve) => {
      setTimeout(() => {
        const resultado = todosDigitosIguais(numeroCartao) ? "falha" : "sucesso";
        setProcessando(false);
        resolve(resultado);
      }, TEMPO_PROCESSAMENTO_MS);
    });
  }, []);

  return { processando, processarCompra };
}
