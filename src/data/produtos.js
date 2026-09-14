// RF01 — Carrinho fixo: array local de produtos.
// Cada produto tem id, nome, preço unitário e quantidade já definidos.
// Poderia igualmente vir de uma API (ex.: fetch em um serviço), mantendo
// o mesmo formato de objeto abaixo.
export const produtos = [
  {
    id: 1,
    nome: "Fone de Ouvido Bluetooth",
    precoUnitario: 189.9,
    quantidade: 1,
  },
  {
    id: 2,
    nome: "Mouse Sem Fio Ergonômico",
    precoUnitario: 79.9,
    quantidade: 2,
  },
  {
    id: 3,
    nome: "Teclado Mecânico Compacto",
    precoUnitario: 259.9,
    quantidade: 1,
  },
];

// RF03 — Cálculo do total da compra a partir dos dados do carrinho.
export function calcularTotal(listaProdutos) {
  return listaProdutos.reduce(
    (acumulado, produto) => acumulado + produto.precoUnitario * produto.quantidade,
    0
  );
}
