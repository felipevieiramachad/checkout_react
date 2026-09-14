import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { produtos, calcularTotal } from "../data/produtos";
import ResumoCompra from "../components/ResumoCompra";
import { usePagamento } from "../hooks/usePagamento";
import { normalizarNumeroCartao } from "../utils/pagamento";

// RF06 — Validação de formato dos dados do cartão.
// Titular preenchido; cartão com 16 dígitos (espaços/hífens ignorados);
// validade MM/AA com mês entre 01 e 12; CVV com 3 dígitos.
// Bandeira, algoritmo de Luhn e vencimento real não são validados.
const esquemaPagamento = z.object({
  titular: z
    .string()
    .trim()
    .min(1, "Informe o nome do titular impresso no cartão."),
  numeroCartao: z
    .string()
    .min(1, "Informe o número do cartão.")
    .transform((valor) => normalizarNumeroCartao(valor))
    .refine((valor) => /^\d{16}$/.test(valor), {
      message: "O número do cartão deve ter 16 dígitos.",
    }),
  validade: z
    .string()
    .trim()
    .min(1, "Informe a validade do cartão.")
    .refine((valor) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(valor), {
      message: "Use o formato MM/AA, com mês entre 01 e 12.",
    }),
  cvv: z
    .string()
    .trim()
    .min(1, "Informe o código de segurança.")
    .refine((valor) => /^\d{3}$/.test(valor), {
      message: "O CVV deve ter exatamente 3 dígitos.",
    }),
});

function Pagamento() {
  const navigate = useNavigate();
  const { processando, processarCompra } = usePagamento();
  const total = calcularTotal(produtos);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(esquemaPagamento),
    defaultValues: { titular: "", numeroCartao: "", validade: "", cvv: "" },
  });

  // RF07/RF09 — Após validar o formato, a regra de simulação decide o
  // resultado e o usuário é encaminhado para a rota correspondente.
  const aoConfirmarPagamento = async (dados) => {
    const resultado = await processarCompra(dados.numeroCartao);
    navigate(resultado === "sucesso" ? "/sucesso" : "/falha");
  };

  return (
    <main className="pagina">
      <p className="etapa-atual">Etapa 2 de 3 · Pagamento</p>
      <h1>Dados do cartão</h1>

      <ResumoCompra total={total} />

      <form
        className="formulario-pagamento"
        onSubmit={handleSubmit(aoConfirmarPagamento)}
        noValidate
      >
        <div className="campo">
          <label htmlFor="titular">Nome do titular</label>
          <input
            id="titular"
            type="text"
            autoComplete="cc-name"
            aria-invalid={Boolean(errors.titular)}
            aria-describedby={errors.titular ? "erro-titular" : undefined}
            disabled={processando}
            {...register("titular")}
          />
          {errors.titular && (
            <p id="erro-titular" className="erro-campo" role="alert">
              {errors.titular.message}
            </p>
          )}
        </div>

        <div className="campo">
          <label htmlFor="numeroCartao">Número do cartão</label>
          <input
            id="numeroCartao"
            type="text"
            inputMode="numeric"
            placeholder="0000 0000 0000 0000"
            autoComplete="cc-number"
            aria-invalid={Boolean(errors.numeroCartao)}
            aria-describedby={errors.numeroCartao ? "erro-numeroCartao" : undefined}
            disabled={processando}
            {...register("numeroCartao")}
          />
          {errors.numeroCartao && (
            <p id="erro-numeroCartao" className="erro-campo" role="alert">
              {errors.numeroCartao.message}
            </p>
          )}
        </div>

        <div className="campo-linha">
          <div className="campo">
            <label htmlFor="validade">Validade</label>
            <input
              id="validade"
              type="text"
              placeholder="MM/AA"
              autoComplete="cc-exp"
              aria-invalid={Boolean(errors.validade)}
              aria-describedby={errors.validade ? "erro-validade" : undefined}
              disabled={processando}
              {...register("validade")}
            />
            {errors.validade && (
              <p id="erro-validade" className="erro-campo" role="alert">
                {errors.validade.message}
              </p>
            )}
          </div>

          <div className="campo">
            <label htmlFor="cvv">CVV</label>
            <input
              id="cvv"
              type="text"
              inputMode="numeric"
              placeholder="000"
              autoComplete="cc-csc"
              aria-invalid={Boolean(errors.cvv)}
              aria-describedby={errors.cvv ? "erro-cvv" : undefined}
              disabled={processando}
              {...register("cvv")}
            />
            {errors.cvv && (
              <p id="erro-cvv" className="erro-campo" role="alert">
                {errors.cvv.message}
              </p>
            )}
          </div>
        </div>

        {/* RF08 — Estado de processamento anunciado para leitores de tela
            e botão desabilitado para evitar envios duplicados. */}
        <button
          type="submit"
          className="botao botao--primario"
          disabled={processando}
          aria-busy={processando}
        >
          {processando ? "Processando compra..." : "Confirmar pagamento"}
        </button>
        <p className="mensagem-status" role="status" aria-live="polite">
          {processando ? "Processando compra..." : ""}
        </p>
      </form>
    </main>
  );
}

export default Pagamento;
