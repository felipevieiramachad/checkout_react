// RF06 — Espaços e hífens no número do cartão devem ser desconsiderados
// tanto na validação de formato quanto na regra de simulação.
export function normalizarNumeroCartao(numero = "") {
  return numero.replace(/[\s-]/g, "");
}

// RF07 — Regra da simulação: a compra falha somente quando os 16 dígitos
// do número do cartão são todos iguais entre si. Considera apenas o
// número do cartão informado nesta compra, nada além disso.
export function todosDigitosIguais(numero) {
  const digitos = normalizarNumeroCartao(numero);
  if (digitos.length === 0) return false;
  return digitos.split("").every((digito) => digito === digitos[0]);
}

// Formatação monetária em reais, usada no carrinho e no pagamento.
export function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
