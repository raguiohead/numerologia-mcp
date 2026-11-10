import { describe, expect, it } from "vitest";
import { DESAFIOS, INTERPRETACOES, NOMES_SECOES, type Secao } from "../src/interpretacoes.js";

describe("interpretações", () => {
  const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33];

  it("cobre todos os números e todas as seções", () => {
    for (const n of numeros) {
      const i = INTERPRETACOES[n];
      expect(i, `número ${n}`).toBeDefined();
      expect(i.arquetipo.length).toBeGreaterThan(0);
      expect(i.essencia.length).toBeGreaterThan(0);
      for (const secao of Object.keys(NOMES_SECOES) as Secao[]) {
        expect(i[secao]?.length, `${n}.${secao}`).toBeGreaterThan(0);
      }
    }
  });

  it("cobre todos os desafios possíveis (0 a 8)", () => {
    for (let n = 0; n <= 8; n++) expect(DESAFIOS[n]?.length).toBeGreaterThan(0);
  });
});
