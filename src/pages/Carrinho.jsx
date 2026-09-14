import { Link } from "react-router-dom";
import { produtos, calcularTotal } from "../data/produtos";
import ItemCarrinho from "../components/ItemCarrinho";
import ResumoCompra from "../components/ResumoCompra";

// RF02 — Carrinho fixo: sem catálogo, inclusão, remoção ou alteração de
// quantidades. Itens e quantidades já vêm definidos em `data/produtos.js`.
function Carrinho() {
  const total = calcularTotal(produtos);

  return (
    <main className="pagina">
      <p className="etapa-atual">Etapa 1 de 3 · Carrinho</p>
      <h1>Resumo do carrinho</h1>
      <p className="pagina__introducao">
        Confira os itens selecionados antes de seguir para o pagamento.
      </p>

      <div className="tabela-wrapper">
        {/* RF03 — Renderização com map e key estável (produto.id) */}
        <table className="tabela-carrinho">
          <caption className="oculto-visualmente">Itens do carrinho</caption>
          <thead>
            <tr>
              <th scope="col">Produto</th>
              <th scope="col">Preço unitário</th>
              <th scope="col">Qtd.</th>
              <th scope="col">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((produto) => (
              <ItemCarrinho key={produto.id} produto={produto} />
            ))}
          </tbody>
        </table>
      </div>

      <ResumoCompra total={total} />

      {/* RF04 — Link que leva do carrinho à tela de pagamento */}
      <Link to="/pagamento" className="botao botao--primario">
        Finalizar compra
      </Link>
    </main>
  );
}

export default Carrinho;
