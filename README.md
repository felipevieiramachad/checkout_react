# Checkout React — Loja Virtual

Aplicação React que simula o checkout de uma loja virtual: o usuário confere
o carrinho, informa dados fictícios do cartão e recebe uma resposta
instantânea de sucesso ou falha, sem sair da página.

## Como executar

Pré-requisitos: [Node.js](https://nodejs.org/) 18 ou superior.

```bash
npm install
npm run dev
```

O terminal exibirá o endereço local (normalmente `http://localhost:5173`).

Outros scripts:

```bash
npm run build     # gera a versão de produção em dist/
npm run preview   # serve a build de produção localmente
```

## Fluxo da aplicação

1. **Carrinho** (`/`) — lista os produtos, subtotais e o total da compra.
2. **Pagamento** (`/pagamento`) — formulário com titular, número do
   cartão, validade e CVV.
3. **Sucesso** (`/sucesso`) ou **Falha** (`/falha`) — resultado da
   simulação, conforme a regra abaixo.

### Regra da simulação de pagamento

Qualquer número de cartão com 16 dígitos válidos é aceito, **exceto**
quando todos os dígitos são iguais entre si (ex.: `1111 1111 1111 1111`).
Nesse caso a compra é recusada e a aplicação exibe a mensagem
**"tentativa de golpe"**.

## Estrutura do projeto

```
checkout-react/
├── package.json          — dependências e scripts do Vite
├── vite.config.js        — configuração do Vite
├── README.md             — este arquivo
└── src/
    ├── main.jsx           — ponto de entrada da aplicação
    ├── App.jsx            — configuração das quatro rotas
    ├── pages/
    │   ├── Carrinho.jsx    — produtos, subtotais e total da compra
    │   ├── Pagamento.jsx   — formulário com React Hook Form e Zod
    │   ├── Sucesso.jsx     — confirmação da compra
    │   └── Falha.jsx       — mensagem "tentativa de golpe"
    ├── components/
    │   ├── ItemCarrinho.jsx  — exibição de um produto via props
    │   └── ResumoCompra.jsx  — resumo dos valores da compra
    ├── hooks/
    │   └── usePagamento.js — estado e processamento da compra simulada
    ├── utils/
    │   └── pagamento.js    — regra que identifica dígitos todos iguais
    ├── data/
    │   └── produtos.js     — array fixo de produtos
    └── assets/
        ├── styles/index.css — estilos e responsividade
        └── img/logo.svg     — identidade visual da loja
```

## Requisitos atendidos

| Requisito | Onde foi implementado |
| --- | --- |
| RF01 — Produtos (array com id, nome, preço, quantidade) | `src/data/produtos.js` |
| RF02 — Carrinho fixo | `src/data/produtos.js` (sem inclusão/remoção) |
| RF03 — Resumo com `map`/`key`, subtotal e total | `Carrinho.jsx` + `ItemCarrinho.jsx` |
| RF04 — Botão para pagamento, total consistente | `Carrinho.jsx` + `ResumoCompra.jsx` |
| RF06 — Validação de formato do cartão | `Pagamento.jsx` (schema Zod) |
| RF07 — Regra de dígitos iguais | `src/utils/pagamento.js` |
| RF08 — Processamento assíncrono, botão desabilitado | `usePagamento.js` + `Pagamento.jsx` |
| RF09 — Navegação para sucesso/falha | `Pagamento.jsx` (`useNavigate`) |
| RF10 — Tela de sucesso | `Sucesso.jsx` |
| RF11 — Tela de falha com mensagem exata | `Falha.jsx` |
| RF12 — Componentização e reutilização com props | `ItemCarrinho.jsx`, `ResumoCompra.jsx` |
| RF13 — Custom hook | `hooks/usePagamento.js` |

## Tecnologias

- React + Vite
- React Router (navegação entre as quatro telas)
- React Hook Form + Zod (formulário e validação)
- CSS puro, responsivo e com foco em acessibilidade (estados de foco
  visíveis, `aria-live` no status de processamento, tabela adaptada em
  telas estreitas)
