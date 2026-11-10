/**
 * Palavras-chave de referência para cada número (tradição pitagórica geral).
 * Servem de ponto de partida para a interpretação, não como leitura final.
 */
export const SIGNIFICADOS: Record<number, { tema: string; luz: string[]; sombra: string[] }> = {
  0: { tema: "Potencial aberto (usado em desafios)", luz: ["livre escolha", "amplitude"], sombra: ["falta de direção"] },
  1: { tema: "Início e individualidade", luz: ["iniciativa", "liderança", "independência", "coragem"], sombra: ["egocentrismo", "impaciência", "isolamento"] },
  2: { tema: "Parceria e sensibilidade", luz: ["cooperação", "diplomacia", "escuta", "paciência"], sombra: ["dependência", "indecisão", "hipersensibilidade"] },
  3: { tema: "Expressão e criatividade", luz: ["comunicação", "alegria", "arte", "sociabilidade"], sombra: ["dispersão", "superficialidade", "autocrítica"] },
  4: { tema: "Estrutura e trabalho", luz: ["disciplina", "método", "estabilidade", "construção"], sombra: ["rigidez", "teimosia", "excesso de trabalho"] },
  5: { tema: "Mudança e liberdade", luz: ["adaptação", "curiosidade", "movimento", "experiência"], sombra: ["inquietação", "excessos", "inconstância"] },
  6: { tema: "Responsabilidade e cuidado", luz: ["família", "harmonia", "serviço", "beleza"], sombra: ["controle", "perfeccionismo", "sobrecarga"] },
  7: { tema: "Introspecção e conhecimento", luz: ["análise", "espiritualidade", "estudo", "intuição"], sombra: ["isolamento", "desconfiança", "frieza"] },
  8: { tema: "Poder e realização material", luz: ["ambição", "gestão", "prosperidade", "autoridade"], sombra: ["materialismo", "dominação", "estresse"] },
  9: { tema: "Conclusão e humanitarismo", luz: ["compaixão", "generosidade", "sabedoria", "desapego"], sombra: ["dificuldade de encerrar ciclos", "dispersão emocional"] },
  11: { tema: "Mestre 11 — intuição e inspiração", luz: ["visão", "sensibilidade espiritual", "inspirar outros"], sombra: ["ansiedade", "tensão nervosa", "idealismo excessivo"] },
  22: { tema: "Mestre 22 — o construtor", luz: ["transformar visão em obra concreta", "grande escala", "legado"], sombra: ["pressão interna", "medo de não estar à altura"] },
  33: { tema: "Mestre 33 — o mestre do serviço", luz: ["amor altruísta", "cura", "ensino"], sombra: ["autossacrifício", "carregar o mundo nas costas"] },
};

/** Temas do ciclo de 9 anos para Ano/Mês/Dia Pessoal. */
export const CICLO_PESSOAL: Record<number, string> = {
  1: "Plantio: começar projetos, tomar iniciativa, abrir caminhos novos.",
  2: "Germinação: paciência, parcerias, detalhes e relacionamentos.",
  3: "Florescer: expressão, criatividade, vida social e visibilidade.",
  4: "Fundação: trabalho duro, organização, saúde e estrutura.",
  5: "Mudança: liberdade, viagens, mudanças de rota e experiências.",
  6: "Responsabilidade: casa, família, compromissos e cuidado.",
  7: "Pausa e reflexão: estudo, autoconhecimento e espiritualidade.",
  8: "Colheita material: carreira, finanças, reconhecimento e poder pessoal.",
  9: "Encerramento: concluir, soltar o que já cumpriu seu papel, preparar o novo ciclo.",
};
