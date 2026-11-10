# numerologia-mcp

Servidor MCP de **numerologia pitagórica** para usar com o Claude. Calcula o mapa a partir do nome de registro e da data de nascimento, e os ciclos pessoais (ciclo de 9 anos) para qualquer data. Não depende de serviços externos e não guarda dados: tudo é calculado a cada chamada.

## Ferramentas

| Ferramenta | O que faz |
|---|---|
| `calcular_mapa` | Caminho de Vida, Expressão, Desejo da Alma, Personalidade, Aniversário, Maturidade, 3 ciclos de vida, 4 pináculos e 4 desafios (com idades e anos) |
| `ciclo_pessoal` | Ano, Mês e Dia Pessoal de uma data (padrão: hoje, fuso de Fortaleza) |
| `linha_do_tempo` | Ano e Mês Pessoal mês a mês num período de até 120 meses |
| `significado_numero` | Palavras-chave (luz e sombra) de 0–9, 11, 22 e 33 |

### Convenções de cálculo

- Tabela pitagórica (A=1 … I=9, J=1 … R=9, S=1 … Z=8). Acentos e cedilha são removidos.
- **Caminho de Vida:** dia, mês e ano reduzidos separadamente e depois somados.
- **Ciclos de vida:** juventude = mês, maturidade = dia, sabedoria = ano. A juventude termina aos 36 − Caminho de Vida e a maturidade dura 27 anos.
- **Números mestres** 11, 22 e 33 são preservados nos números do mapa (opção `preservar_mestres`). Nos ciclos pessoais a redução vai até 1–9.
- **Y** conta como consoante, a menos que `y_como_vogal` seja `true`.
- **Ano Pessoal** muda em 1º de janeiro por padrão; use `inicio_do_ano: "aniversario"` para virar no dia do aniversário.

## Rodando localmente

```bash
npm install
npm test          # testes dos cálculos
npm run dev       # endpoint em http://localhost:3000/api/mcp
```

## Deploy na Vercel

1. Importe este repositório na Vercel (sem configuração extra: `api/mcp.ts` vira a função).
2. O endpoint fica em `https://<seu-projeto>.vercel.app/api/mcp`.
3. No Claude: **Configurações → Conectores → Adicionar conector personalizado** e cole essa URL.

> O endpoint não tem autenticação, já que só faz cálculos e não guarda nada. Se a URL for divulgada, qualquer pessoa pode usá-lo.
