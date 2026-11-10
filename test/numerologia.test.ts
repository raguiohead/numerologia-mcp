import { describe, expect, it } from "vitest";
import {
  anoPessoal,
  caminhoDeVida,
  ciclosDeVida,
  desejoDaAlma,
  diaPessoal,
  expressao,
  mesPessoal,
  normalizarNome,
  parseData,
  personalidade,
  pinaculosEDesafios,
  reduzir,
} from "../src/numerologia.js";

describe("redução", () => {
  it("reduz a um dígito", () => {
    expect(reduzir(1987)).toBe(7);
    expect(reduzir(19)).toBe(1);
  });
  it("preserva números mestres", () => {
    expect(reduzir(29)).toBe(11);
    expect(reduzir(22)).toBe(22);
    expect(reduzir(29, false)).toBe(2);
  });
});

describe("datas", () => {
  it("aceita ISO e formato brasileiro", () => {
    expect(parseData("1961-08-04")).toEqual({ dia: 4, mes: 8, ano: 1961 });
    expect(parseData("04/08/1961")).toEqual({ dia: 4, mes: 8, ano: 1961 });
  });
  it("rejeita datas inexistentes", () => {
    expect(() => parseData("2023-02-29")).toThrow();
  });
});

describe("nome", () => {
  it("remove acentos e cedilha", () => {
    expect(normalizarNome("  João  da Conceição ")).toBe("JOAO DA CONCEICAO");
  });
  it("reduz o nome por partes (padrão) ou pelo total", () => {
    // ANA = 7, COSTA = 13 → 4. Por partes: 7 + 4 = 11. Total: 20 → 2.
    expect(expressao("Ana Costa")).toBe(11);
    expect(expressao("Ana Costa", { reducaoNome: "total" })).toBe(2);
  });

  it("calcula Expressão, Alma e Personalidade", () => {
    // J=1 O=6 S=1 E=5
    expect(expressao("José")).toBe(4); // 13 → 4
    expect(desejoDaAlma("José")).toBe(11); // O+E = 11 (mestre)
    expect(personalidade("José")).toBe(2); // J+S
  });
});

describe("Caminho de Vida e ciclos", () => {
  const nasc = parseData("1961-08-04");

  it("Caminho de Vida", () => {
    expect(caminhoDeVida(nasc)).toBe(2); // 8 + 4 + 8 = 20 → 2
  });

  it("Ano, Mês e Dia Pessoal", () => {
    const ref = parseData("2026-11-10");
    expect(anoPessoal(nasc, ref)).toBe(4); // 4 + 8 + 1 = 13 → 4
    expect(mesPessoal(nasc, ref)).toBe(6); // 4 + 11 = 15 → 6
    expect(diaPessoal(nasc, ref)).toBe(7); // 6 + 1 = 7
  });

  it("Ano Pessoal com início no aniversário", () => {
    expect(anoPessoal(nasc, parseData("2026-08-03"), "aniversario")).toBe(3); // ainda 2025
    expect(anoPessoal(nasc, parseData("2026-08-04"), "aniversario")).toBe(4);
  });

  it("ciclos de vida (juventude, maturidade, sabedoria)", () => {
    const ciclos = ciclosDeVida(nasc);
    expect(ciclos.map((c) => c.numero)).toEqual([8, 4, 8]);
    expect(ciclos.map((c) => [c.idadeInicio, c.idadeFim])).toEqual([
      [0, 34],
      [35, 61],
      [62, null],
    ]);
  });

  it("pináculos e desafios", () => {
    const { pinaculos, desafios } = pinaculosEDesafios(nasc);
    expect(pinaculos.map((p) => p.numero)).toEqual([3, 3, 6, 7]);
    expect(desafios.map((d) => d.numero)).toEqual([4, 4, 0, 0]);
    expect(pinaculos[0].idadeFim).toBe(34); // 36 - 2
    expect(pinaculos[3].idadeFim).toBeNull();
  });
});
