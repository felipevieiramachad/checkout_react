import { formatarMoeda } from "../utils/pagamento";

// RF12 — Componente reutilizável: recebe um único produto via props e
// exibe nome, preço unitário, quantidade e subtotal do item.
function ItemCarrinho({ produto }) {
  const subtotal = produto.precoUnitario * produto.quantidade;

  return (
    <tr className="item-carrinho">
      <th scope="row" className="item-carrinho__nome">
        {produto.nome}
      </th>
      <td data-rotulo="Preço unitário">{formatarMoeda(produto.precoUnitario)}</td>
      <td data-rotulo="Quantidade">{produto.quantidade}</td>
      <td data-rotulo="Subtotal" className="item-carrinho__subtotal">
        {formatarMoeda(subtotal)}
      </td>
    </tr>
  );
}

export default ItemCarrinho;
