/**
 * Núcleo de numerologia pitagórica.
 * Funções puras, sem dependências externas.
 */

export const NUMEROS_MESTRES = [11, 22, 33] as const;

/** Tabela pitagórica: A=1 ... I=9, J=1 ... R=9, S=1 ... Z=8 */
const VALOR_LETRA: Record<string, number> = Object.fromEntries(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((l, i) => [l, (i % 9) + 1]),
);

const VOGAIS = new Set(["A", "E", "I", "O", "U"]);

export interface Opcoes {
  /** Preserva 11, 22 e 33 na redução (padrão: true) */
  preservarMestres?: boolean;
  /** Trata Y como vogal (padrão: false) */
  yComoVogal?: boolean;
}

export interface DataNascimento {
  dia: number;
  mes: number;
  ano: number;
}

/** Remove acentos, cedilha e tudo que não for letra; devolve em maiúsculas. */
export function normalizarNome(nome: string): string {
  return nome
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toUpperCase()
    .replace(/[^A-Z ]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function somaDigitos(n: number): number {
  return String(Math.abs(n))
    .split("")
    .reduce((acc, d) => acc + Number(d), 0);
}

/** Reduz até um dígito, preservando números mestres quando pedido. */
export function reduzir(n: number, preservarMestres = true): number {
  let atual = Math.abs(n);
  while (atual > 9) {
    if (preservarMestres && (NUMEROS_MESTRES as readonly number[]).includes(atual)) {
      return atual;
    }
    atual = somaDigitos(atual);
  }
  return atual;
}

/** Valor reduzido "simples" de um número mestre (11→2, 22→4, 33→6). */
export function raiz(n: number): number {
  return reduzir(n, false);
}

export function parseData(data: string): DataNascimento {
  const iso = /^(\d{4})-(\d{2})-(\d{2})$/.exec(data);
  const br = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(data);
  let dia: number, mes: number, ano: number;
  if (iso) {
    [ano, mes, dia] = [Number(iso[1]), Number(iso[2]), Number(iso[3])];
  } else if (br) {
    [dia, mes, ano] = [Number(br[1]), Number(br[2]), Number(br[3])];
  } else {
    throw new Error(`Data inválida: "${data}". Use AAAA-MM-DD ou DD/MM/AAAA.`);
  }
  const d = new Date(Date.UTC(ano, mes - 1, dia));
  if (d.getUTCFullYear() !== ano || d.getUTCMonth() !== mes - 1 || d.getUTCDate() !== dia) {
    throw new Error(`Data inexistente: "${data}".`);
  }
  return { dia, mes, ano };
}

function somaLetras(nome: string, filtro: (letra: string) => boolean): number {
  return normalizarNome(nome)
    .replace(/ /g, "")
    .split("")
    .filter(filtro)
    .reduce((acc, l) => acc + VALOR_LETRA[l], 0);
}

/**
 * Caminho de Vida: reduz dia, mês e ano separadamente (preservando mestres)
 * e depois reduz a soma.
 */
export function caminhoDeVida(nasc: DataNascimento, op: Opcoes = {}): number {
  const pm = op.preservarMestres ?? true;
  return reduzir(reduzir(nasc.mes, pm) + reduzir(nasc.dia, pm) + reduzir(nasc.ano, pm), pm);
}

/** Expressão (Destino): todas as letras do nome completo de registro. */
export function expressao(nome: string, op: Opcoes = {}): number {
  return reduzir(somaLetras(nome, () => true), op.preservarMestres ?? true);
}

function ehVogal(l: string, op: Opcoes) {
  return VOGAIS.has(l) || (op.yComoVogal === true && l === "Y");
}

/** Desejo da Alma (Motivação): apenas vogais. */
export function desejoDaAlma(nome: string, op: Opcoes = {}): number {
  return reduzir(somaLetras(nome, (l) => ehVogal(l, op)), op.preservarMestres ?? true);
}

/** Personalidade (Impressão): apenas consoantes. */
export function personalidade(nome: string, op: Opcoes = {}): number {
  return reduzir(somaLetras(nome, (l) => !ehVogal(l, op)), op.preservarMestres ?? true);
}

/** Número do Aniversário: o dia de nascimento reduzido. */
export function aniversario(nasc: DataNascimento, op: Opcoes = {}): number {
  return reduzir(nasc.dia, op.preservarMestres ?? true);
}

/** Maturidade: Caminho de Vida + Expressão. */
export function maturidade(nasc: DataNascimento, nome: string, op: Opcoes = {}): number {
  return reduzir(caminhoDeVida(nasc, op) + expressao(nome, op), op.preservarMestres ?? true);
}

export type InicioDoAno = "janeiro" | "aniversario";

/**
 * Ano Pessoal = dia + mês de nascimento + ano de referência.
 * Com inicio="aniversario", o ano pessoal só vira no dia do aniversário.
 */
export function anoPessoal(
  nasc: DataNascimento,
  referencia: DataNascimento,
  inicio: InicioDoAno = "janeiro",
): number {
  let ano = referencia.ano;
  if (inicio === "aniversario") {
    const antesDoAniversario =
      referencia.mes < nasc.mes || (referencia.mes === nasc.mes && referencia.dia < nasc.dia);
    if (antesDoAniversario) ano -= 1;
  }
  return reduzir(reduzir(nasc.dia, false) + reduzir(nasc.mes, false) + reduzir(ano, false), false);
}

/** Mês Pessoal = Ano Pessoal + mês do calendário. */
export function mesPessoal(
  nasc: DataNascimento,
  referencia: DataNascimento,
  inicio: InicioDoAno = "janeiro",
): number {
  return reduzir(anoPessoal(nasc, referencia, inicio) + referencia.mes, false);
}

/** Dia Pessoal = Mês Pessoal + dia do calendário. */
export function diaPessoal(
  nasc: DataNascimento,
  referencia: DataNascimento,
  inicio: InicioDoAno = "janeiro",
): number {
  return reduzir(mesPessoal(nasc, referencia, inicio) + reduzir(referencia.dia, false), false);
}

export interface Periodo {
  numero: number;
  idadeInicio: number;
  idadeFim: number | null;
  anoInicio: number;
  anoFim: number | null;
}

/** Quatro pináculos (realizações) e quatro desafios com suas faixas de idade. */
export function pinaculosEDesafios(nasc: DataNascimento, op: Opcoes = {}) {
  const pm = op.preservarMestres ?? true;
  const m = reduzir(nasc.mes, false);
  const d = reduzir(nasc.dia, false);
  const a = reduzir(nasc.ano, false);

  const p1 = reduzir(m + d, pm);
  const p2 = reduzir(d + a, pm);
  const p3 = reduzir(raiz(p1) + raiz(p2), pm);
  const p4 = reduzir(m + a, pm);

  const c1 = Math.abs(m - d);
  const c2 = Math.abs(d - a);
  const c3 = Math.abs(c1 - c2);
  const c4 = Math.abs(m - a);

  const fimPrimeiro = 36 - raiz(caminhoDeVida(nasc, op));
  const faixas: Array<[number, number | null]> = [
    [0, fimPrimeiro],
    [fimPrimeiro + 1, fimPrimeiro + 9],
    [fimPrimeiro + 10, fimPrimeiro + 18],
    [fimPrimeiro + 19, null],
  ];

  const montar = (nums: number[]): Periodo[] =>
    nums.map((numero, i) => ({
      numero,
      idadeInicio: faixas[i][0],
      idadeFim: faixas[i][1],
      anoInicio: nasc.ano + faixas[i][0],
      anoFim: faixas[i][1] === null ? null : nasc.ano + (faixas[i][1] as number),
    }));

  return { pinaculos: montar([p1, p2, p3, p4]), desafios: montar([c1, c2, c3, c4]) };
}

export function mapaCompleto(nome: string, nasc: DataNascimento, op: Opcoes = {}) {
  return {
    nomeNormalizado: normalizarNome(nome),
    caminhoDeVida: caminhoDeVida(nasc, op),
    expressao: expressao(nome, op),
    desejoDaAlma: desejoDaAlma(nome, op),
    personalidade: personalidade(nome, op),
    aniversario: aniversario(nasc, op),
    maturidade: maturidade(nasc, nome, op),
    ...pinaculosEDesafios(nasc, op),
  };
}
