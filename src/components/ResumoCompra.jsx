import { formatarMoeda } from "../utils/pagamento";

// RF12 — Componente reutilizável: recebe o total via props e é usado
// tanto na tela de carrinho quanto na tela de pagamento, garantindo que
// o valor exibido em ambas seja sempre o mesmo (RF04).
function ResumoCompra({ total, rotulo = "Total da compra" }) {
  return (
    <div className="resumo-compra">
      <span className="resumo-compra__rotulo">{rotulo}</span>
      <strong className="resumo-compra__valor">{formatarMoeda(total)}</strong>
    </div>
  );
}

export default ResumoCompra;
