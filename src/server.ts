import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import {
  anoPessoal,
  diaPessoal,
  mapaCompleto,
  mesPessoal,
  parseData,
  type DataNascimento,
  type InicioDoAno,
} from "./numerologia.js";
import { CICLO_PESSOAL, SIGNIFICADOS } from "./significados.js";
import { DESAFIOS, INTERPRETACOES, NOMES_SECOES, interpretar, type Secao } from "./interpretacoes.js";

const dataSchema = z
  .string()
  .describe("Data no formato AAAA-MM-DD ou DD/MM/AAAA");

const inicioSchema = z
  .enum(["janeiro", "aniversario"])
  .default("janeiro")
  .describe(
    "Quando o Ano Pessoal muda: 'janeiro' (1º de janeiro, mais comum) ou 'aniversario' (no dia do aniversário)",
  );

function hojeFortaleza(): DataNascimento {
  const partes = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Fortaleza",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
  return parseData(partes);
}

function json(dados: unknown) {
  return {
    content: [{ type: "text" as const, text: JSON.stringify(dados, null, 2) }],
    structuredContent: dados as Record<string, unknown>,
  };
}

function cicloEm(nasc: DataNascimento, ref: DataNascimento, inicio: InicioDoAno) {
  const ano = anoPessoal(nasc, ref, inicio);
  const mes = mesPessoal(nasc, ref, inicio);
  const dia = diaPessoal(nasc, ref, inicio);
  return {
    data: `${ref.ano}-${String(ref.mes).padStart(2, "0")}-${String(ref.dia).padStart(2, "0")}`,
    anoPessoal: { numero: ano, tema: CICLO_PESSOAL[ano], interpretacao: INTERPRETACOES[ano].anoPessoal },
    mesPessoal: { numero: mes, tema: CICLO_PESSOAL[mes], interpretacao: INTERPRETACOES[mes].mesPessoal },
    diaPessoal: { numero: dia, tema: CICLO_PESSOAL[dia] },
  };
}

export function criarServidor(): McpServer {
  const server = new McpServer({ name: "numerologia-mcp", version: "0.2.0" });

  server.registerTool(
    "calcular_mapa",
    {
      title: "Calcular mapa numerológico",
      description:
        "Calcula o mapa numerológico pitagórico completo: Caminho de Vida, Expressão, Desejo da Alma, Personalidade, Aniversário, Maturidade, ciclos de vida (juventude, maturidade e sabedoria), pináculos e desafios. Use o nome completo de registro (certidão de nascimento).",
      inputSchema: {
        nome_completo: z.string().min(2).describe("Nome completo de registro"),
        data_nascimento: dataSchema,
        preservar_mestres: z
          .boolean()
          .default(true)
          .describe("Mantém 11, 22 e 33 sem reduzir"),
        y_como_vogal: z.boolean().default(false).describe("Conta a letra Y como vogal"),
        reducao_nome: z
          .enum(["por_parte", "total"])
          .default("por_parte")
          .describe(
            "'por_parte' (padrão, igual ao Teledipity): reduz cada nome e depois a soma. 'total': soma todas as letras e reduz uma vez. Só muda o resultado quando aparece número mestre.",
          ),
        com_interpretacao: z
          .boolean()
          .default(true)
          .describe("Inclui textos de interpretação para cada número"),
      },
      annotations: { readOnlyHint: true, openWorldHint: false },
    },
    async ({
      nome_completo,
      data_nascimento,
      preservar_mestres,
      y_como_vogal,
      reducao_nome,
      com_interpretacao,
    }) => {
      const nasc = parseData(data_nascimento);
      const mapa = mapaCompleto(nome_completo, nasc, {
        preservarMestres: preservar_mestres,
        yComoVogal: y_como_vogal,
        reducaoNome: reducao_nome,
      });
      if (!com_interpretacao) return json(mapa);
      return json({
        ...mapa,
        interpretacao: {
          caminhoDeVida: interpretar(mapa.caminhoDeVida, "caminhoDeVida"),
          expressao: interpretar(mapa.expressao, "expressao"),
          desejoDaAlma: interpretar(mapa.desejoDaAlma, "desejoDaAlma"),
          personalidade: interpretar(mapa.personalidade, "personalidade"),
          ciclosDeVida: mapa.ciclosDeVida.map((c) => ({
            ciclo: c.ciclo,
            ...interpretar(c.numero, "cicloDeVida"),
          })),
          desafios: mapa.desafios.map((d) => ({ numero: d.numero, texto: DESAFIOS[d.numero] })),
        },
        equivalenciaTeledipity: {
          "Life Path": "caminhoDeVida",
          Talents: "expressao",
          Desires: "desejoDaAlma",
          Personality: "personalidade",
          "Life Cycles": "ciclosDeVida (juventude e maturidade)",
        },
      });
    },
  );

  server.registerTool(
    "ciclo_pessoal",
    {
      title: "Ano, mês e dia pessoal",
      description:
        "Retorna o Ano Pessoal, Mês Pessoal e Dia Pessoal (ciclo de 9 anos) para uma data. Sem data de referência, usa hoje no fuso de Fortaleza.",
      inputSchema: {
        data_nascimento: dataSchema,
        data_referencia: dataSchema.optional(),
        inicio_do_ano: inicioSchema,
      },
      annotations: { readOnlyHint: true, openWorldHint: false },
    },
    async ({ data_nascimento, data_referencia, inicio_do_ano }) => {
      const nasc = parseData(data_nascimento);
      const ref = data_referencia ? parseData(data_referencia) : hojeFortaleza();
      return json(cicloEm(nasc, ref, inicio_do_ano));
    },
  );

  server.registerTool(
    "linha_do_tempo",
    {
      title: "Linha do tempo de ciclos",
      description:
        "Lista Ano Pessoal e Mês Pessoal mês a mês entre duas datas (máx. 120 meses). Útil para planejar o ano ou cruzar com trânsitos astrológicos.",
      inputSchema: {
        data_nascimento: dataSchema,
        inicio: dataSchema.describe("Primeiro mês do período (AAAA-MM-DD)"),
        fim: dataSchema.describe("Último mês do período (AAAA-MM-DD)"),
        inicio_do_ano: inicioSchema,
      },
      annotations: { readOnlyHint: true, openWorldHint: false },
    },
    async ({ data_nascimento, inicio, fim, inicio_do_ano }) => {
      const nasc = parseData(data_nascimento);
      const a = parseData(inicio);
      const b = parseData(fim);
      const meses = (b.ano - a.ano) * 12 + (b.mes - a.mes) + 1;
      if (meses < 1) throw new Error("A data final precisa ser depois da inicial.");
      if (meses > 120) throw new Error("Período máximo: 120 meses.");

      const linhas = [];
      for (let i = 0; i < meses; i++) {
        const total = a.mes - 1 + i;
        const ref = { ano: a.ano + Math.floor(total / 12), mes: (total % 12) + 1, dia: 1 };
        // Com início no aniversário, o mês do aniversário é avaliado após a data.
        if (inicio_do_ano === "aniversario" && ref.mes === nasc.mes) ref.dia = nasc.dia;
        const ano = anoPessoal(nasc, ref, inicio_do_ano);
        const mes = mesPessoal(nasc, ref, inicio_do_ano);
        linhas.push({
          mes: `${ref.ano}-${String(ref.mes).padStart(2, "0")}`,
          anoPessoal: ano,
          mesPessoal: mes,
          temaDoMes: CICLO_PESSOAL[mes],
        });
      }
      return json({ linhas });
    },
  );

  server.registerTool(
    "significado_numero",
    {
      title: "Significado de um número",
      description:
        "Interpretação de um número (1 a 9, 11, 22 ou 33): arquétipo, essência, luz e sombra e o texto para cada parte do mapa (Caminho de Vida, Expressão, Desejo da Alma, Personalidade, Ciclo de Vida, Ano e Mês Pessoal). Use 'secao' para pedir só uma parte. O 0 só existe como desafio.",
      inputSchema: {
        numero: z.number().int().describe("0 a 9, 11, 22 ou 33"),
        secao: z
          .enum(Object.keys(NOMES_SECOES) as [Secao, ...Secao[]])
          .optional()
          .describe("Parte do mapa para a qual interpretar o número"),
      },
      annotations: { readOnlyHint: true, openWorldHint: false },
    },
    async ({ numero, secao }) => {
      const sig = SIGNIFICADOS[numero];
      if (!sig) throw new Error("Use um número de 0 a 9, 11, 22 ou 33.");
      const interp = INTERPRETACOES[numero];
      const base = {
        numero,
        tema: sig.tema,
        luz: sig.luz,
        sombra: sig.sombra,
        comoDesafio: numero <= 8 ? DESAFIOS[numero] : null,
      };
      if (!interp) return json(base);
      if (secao) {
        return json({ ...base, arquetipo: interp.arquetipo, secao: NOMES_SECOES[secao], texto: interp[secao] });
      }
      const { arquetipo, essencia, ...secoes } = interp;
      return json({ ...base, arquetipo, essencia, secoes });
    },
  );

  return server;
}
