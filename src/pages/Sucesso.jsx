import { Link } from "react-router-dom";

// RF10 — Tela de confirmação de compra aprovada com link para o carrinho.
function Sucesso() {
  return (
    <main className="pagina pagina--resultado pagina--sucesso">
      <p className="etapa-atual">Etapa 3 de 3 · Resultado</p>
      <div className="icone-resultado icone-resultado--sucesso" aria-hidden="true">
        ✓
      </div>
      <h1>Compra aprovada</h1>
      <p className="pagina__introducao">
        Seu pagamento foi confirmado e o pedido já está sendo preparado para envio.
      </p>
      <Link to="/" className="botao botao--primario">
        Voltar ao carrinho
      </Link>
    </main>
  );
}

export default Sucesso;
