import { Link } from "react-router-dom";

// RF11 — Tela de falha com a mensagem exata "tentativa de golpe" e link
// para tentar novamente, retornando ao formulário de pagamento.
function Falha() {
  return (
    <main className="pagina pagina--resultado pagina--falha">
      <p className="etapa-atual">Etapa 3 de 3 · Resultado</p>
      <div className="icone-resultado icone-resultado--falha" aria-hidden="true">
        !
      </div>
      <h1>Compra não aprovada</h1>
      <p className="mensagem-falha" role="alert">
        tentativa de golpe
      </p>
      <Link to="/pagamento" className="botao botao--secundario">
        Tentar novamente
      </Link>
    </main>
  );
}

export default Falha;
