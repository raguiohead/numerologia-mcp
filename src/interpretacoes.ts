/**
 * Interpretações por número e por parte do mapa.
 * Textos originais, escritos como ponto de partida para a leitura:
 * o Claude combina e aprofunda conforme o contexto da pessoa.
 */

export type Secao =
  | "caminhoDeVida"
  | "expressao"
  | "desejoDaAlma"
  | "personalidade"
  | "cicloDeVida"
  | "anoPessoal"
  | "mesPessoal";

export const NOMES_SECOES: Record<Secao, string> = {
  caminhoDeVida: "Caminho de Vida (Missão): a grande lição desta vida",
  expressao: "Expressão (Talentos): os dons naturais para cumprir a missão",
  desejoDaAlma: "Desejo da Alma (Desejos): o que motiva cada escolha",
  personalidade: "Personalidade: como os outros te percebem à primeira vista",
  cicloDeVida: "Ciclo de Vida: o clima de uma fase longa da vida",
  anoPessoal: "Ano Pessoal: o tema do ano dentro do ciclo de 9 anos",
  mesPessoal: "Mês Pessoal: o tom do mês dentro do ano pessoal",
};

type Interpretacao = { arquetipo: string; essencia: string } & Record<Secao, string>;

export const INTERPRETACOES: Record<number, Interpretacao> = {
  1: {
    arquetipo: "O Pioneiro",
    essencia: "Força de começo, vontade própria e coragem de abrir caminho onde ainda não há trilha.",
    caminhoDeVida:
      "A lição é aprender a confiar no próprio julgamento e agir sem esperar aprovação. A vida vai colocar você em situações onde ninguém mais vai liderar; o desafio é fazer isso sem atropelar quem caminha ao lado.",
    expressao:
      "Talento para iniciar, decidir rápido e transformar uma ideia solta em movimento. Rende mais quando tem autonomia e um território que é seu.",
    desejoDaAlma:
      "No fundo, você quer ser dono do próprio destino e ser reconhecido pelo que construiu sozinho. Depender dos outros incomoda mais do que parece.",
    personalidade:
      "Passa a imagem de alguém decidido, independente e um pouco difícil de convencer. As pessoas tendem a te colocar na frente, mesmo quando você não pediu.",
    cicloDeVida:
      "Fase de afirmação individual: a vida pede que você se defina, tome iniciativa e aprenda a se sustentar por conta própria.",
    anoPessoal:
      "Ano de plantio. Comece o que vem adiando, assuma a iniciativa e defina a direção dos próximos nove anos. O que nasce agora dá o tom do ciclo inteiro.",
    mesPessoal: "Mês para dar o primeiro passo: iniciar, decidir, se posicionar.",
  },
  2: {
    arquetipo: "O Mediador",
    essencia: "Sensibilidade, parceria e a arte de unir pontos de vista diferentes.",
    caminhoDeVida:
      "A lição é a cooperação: entender que nada grande se faz sozinho e que paciência também é ação. O risco é se anular para manter a paz.",
    expressao:
      "Talento para escutar, perceber o que não foi dito e construir pontes. Brilha em duplas, bastidores e negociações delicadas.",
    desejoDaAlma:
      "Você deseja harmonia, companhia e sentir que pertence. Conflitos abertos desgastam mais você do que os outros.",
    personalidade:
      "Passa a imagem de alguém gentil, acessível e confiável. Às vezes é visto como mais frágil ou indeciso do que realmente é.",
    cicloDeVida:
      "Fase de relações: parcerias, sociedades e vínculos afetivos ganham peso. O crescimento vem pela convivência, não pela pressa.",
    anoPessoal:
      "Ano de germinação. As sementes do ano anterior crescem debaixo da terra: o ritmo é mais lento, as relações ficam em evidência e a diplomacia vale mais que a força. Estude, observe e coopere.",
    mesPessoal: "Mês de paciência e parceria: ouça mais, force menos, cuide dos detalhes.",
  },
  3: {
    arquetipo: "O Comunicador",
    essencia: "Expressão, criatividade, alegria e a necessidade de ser visto e ouvido.",
    caminhoDeVida:
      "A lição é transformar emoção em expressão construtiva: falar, criar e inspirar sem se dispersar. O risco é espalhar energia em mil projetos sem terminar nenhum.",
    expressao:
      "Talento para comunicar, encantar e criar: escrita, fala, arte, humor. Ideias fluem com facilidade; o trabalho é dar forma a elas.",
    desejoDaAlma:
      "Você deseja se expressar, ser admirado pelo que cria e viver com leveza, amizades e boas conversas. Ficar calado por muito tempo pesa.",
    personalidade:
      "Passa a imagem de alguém simpático, espirituoso e sociável. É lembrado pela energia que traz para o ambiente.",
    cicloDeVida:
      "Fase de expressão e vida social: amizades, criatividade e prazeres ganham espaço. É o momento de desenvolver a própria voz e aprender a dosar os excessos.",
    anoPessoal:
      "Ano de florescer. Visibilidade, criatividade e vida social aumentam. É hora de mostrar o que está sendo construído, comunicar e se divertir, sem perder o foco.",
    mesPessoal: "Mês de expressão: comunique, crie, socialize e mostre seu trabalho.",
  },
  4: {
    arquetipo: "O Construtor",
    essencia: "Estrutura, método, disciplina e o prazer de construir algo que dure.",
    caminhoDeVida:
      "A lição é lidar com limites e construir grande a partir de passos pequenos e constantes. A vida parece impor mais restrições a você do que aos outros; elas são o material da sua obra. O risco é a rigidez.",
    expressao:
      "Talento para organizar, planejar e executar com consistência. Você cria ordem onde havia caos e é a pessoa que termina o que os outros começam.",
    desejoDaAlma:
      "Você deseja segurança, previsibilidade e a sensação de que tudo está no lugar. Bagunça externa vira inquietação interna.",
    personalidade:
      "Passa a imagem de alguém sério, confiável e trabalhador. Pode parecer inflexível para quem ainda não te conhece.",
    cicloDeVida:
      "Fase de trabalho e fundação: carreira, rotina e responsabilidades pedem esforço contínuo. O que se constrói aqui sustenta as fases seguintes.",
    anoPessoal:
      "Ano de fundação. Trabalho duro, organização e cuidado com saúde e finanças. O retorno é lento, mas sólido: construa a base que o ano 5 vai movimentar.",
    mesPessoal: "Mês de trabalho: mais tarefas, mais responsabilidade, foco em organização.",
  },
  5: {
    arquetipo: "O Viajante",
    essencia: "Liberdade, movimento, curiosidade e adaptação.",
    caminhoDeVida:
      "A lição é usar a liberdade com responsabilidade: experimentar a vida sem se perder nos excessos e aprender com a mudança em vez de fugir dela.",
    expressao:
      "Talento para se adaptar, aprender rápido, vender ideias e circular entre mundos diferentes. Rende em ambientes dinâmicos.",
    desejoDaAlma:
      "Você deseja liberdade, novidade e experiências intensas. Rotina rígida soa como prisão.",
    personalidade:
      "Passa a imagem de alguém interessante, versátil e magnético, sempre com uma história nova para contar.",
    cicloDeVida:
      "Fase de movimento: mudanças de cidade, de área ou de rumo são prováveis. É o tempo de experimentar e ampliar horizontes.",
    anoPessoal:
      "Ano de mudança. Portas se abrem, planos mudam de rota e surgem oportunidades inesperadas. Diga sim ao novo, mas evite decisões impulsivas.",
    mesPessoal: "Mês de mudanças e novidades: flexibilidade e abertura, cuidado com excessos.",
  },
  6: {
    arquetipo: "O Guardião",
    essencia: "Cuidado, responsabilidade, família e senso de harmonia e beleza.",
    caminhoDeVida:
      "A lição é amar e servir sem se sacrificar nem controlar. A vida coloca você no papel de quem cuida; o desafio é cuidar também de si.",
    expressao:
      "Talento para acolher, aconselhar, ensinar e harmonizar ambientes. Tem olhar estético e senso de justiça.",
    desejoDaAlma:
      "Você deseja um lar em paz, pessoas queridas por perto e a sensação de ser útil para quem ama.",
    personalidade:
      "Passa a imagem de alguém responsável, acolhedor e digno de confiança: o amigo para quem todos ligam.",
    cicloDeVida:
      "Fase de responsabilidades afetivas: casa, família, compromissos e comunidade ganham centralidade.",
    anoPessoal:
      "Ano de responsabilidade. Família, casa, relacionamentos sérios e compromissos em evidência. Bom para assumir compromissos e harmonizar a vida pessoal.",
    mesPessoal: "Mês de cuidado: família, casa e compromissos pedem atenção.",
  },
  7: {
    arquetipo: "O Sábio",
    essencia: "Introspecção, análise, estudo e busca por sentido.",
    caminhoDeVida:
      "A lição é confiar na própria intuição e buscar a verdade por trás das aparências. O risco é se isolar e desconfiar de tudo.",
    expressao:
      "Talento para pesquisar, analisar e se tornar especialista. Sua mente vai fundo onde outros param na superfície.",
    desejoDaAlma:
      "Você deseja compreender: conhecimento, silêncio e tempo para pensar são necessidades, não luxos.",
    personalidade:
      "Passa a imagem de alguém reservado, observador e enigmático. Pode parecer distante até ganhar confiança.",
    cicloDeVida:
      "Fase de estudo e especialização: a vida pede recolhimento, aprofundamento e desenvolvimento de uma expertise.",
    anoPessoal:
      "Ano de pausa e reflexão. Menos ação externa, mais estudo, autoconhecimento e espiritualidade. Reavalie a rota antes da colheita do ano 8.",
    mesPessoal: "Mês de recolhimento: estude, descanse, reflita e escute a intuição.",
  },
  8: {
    arquetipo: "O Realizador",
    essencia: "Poder pessoal, ambição, gestão e realização material.",
    caminhoDeVida:
      "A lição é lidar bem com poder e dinheiro: conquistar sem se deixar dominar pela conquista. A vida testa sua ética e seu equilíbrio.",
    expressao:
      "Talento para liderar, gerir recursos e enxergar o potencial de negócios. Pensa em escala e em resultado.",
    desejoDaAlma:
      "Você deseja reconhecimento, segurança financeira e influência para fazer as coisas acontecerem.",
    personalidade:
      "Passa a imagem de alguém competente, ambicioso e com autoridade natural.",
    cicloDeVida:
      "Fase de realização material: carreira, finanças e posição social em foco. Esforço bem direcionado traz resultados concretos.",
    anoPessoal:
      "Ano de colheita material. Carreira, dinheiro e reconhecimento em evidência. Bom para negociar, investir em si e assumir posições de liderança.",
    mesPessoal: "Mês de resultados: negocie, cobre, decida sobre carreira e finanças.",
  },
  9: {
    arquetipo: "O Humanitário",
    essencia: "Compaixão, visão ampla, generosidade e encerramento de ciclos.",
    caminhoDeVida:
      "A lição é o desapego: servir a algo maior que você e soltar o que já cumpriu seu papel. O risco é carregar o peso de tudo e de todos.",
    expressao:
      "Talento para inspirar, ensinar e enxergar o quadro geral. Tem facilidade com causas, arte e pessoas de origens diferentes.",
    desejoDaAlma:
      "Você deseja fazer diferença no mundo e viver de acordo com ideais elevados.",
    personalidade:
      "Passa a imagem de alguém generoso, maduro e com uma presença marcante.",
    cicloDeVida:
      "Fase de conclusão e generosidade: colher o aprendizado, compartilhar o que sabe e se desapegar.",
    anoPessoal:
      "Ano de encerramento. Feche ciclos, solte relações e projetos que não cabem mais e prepare espaço para o novo ciclo que começa no ano 1.",
    mesPessoal: "Mês de finalizar: conclua pendências, desapegue e faça limpeza.",
  },
  11: {
    arquetipo: "O Inspirador (mestre)",
    essencia: "Intuição elevada, sensibilidade e capacidade de inspirar. Vibra também como 2.",
    caminhoDeVida:
      "A lição é canalizar uma sensibilidade intensa em visão e inspiração para os outros, sem se perder na ansiedade. Nos momentos difíceis, a vida pede a paciência do 2.",
    expressao:
      "Talento para perceber o que está por vir e comunicar isso de forma que mobiliza as pessoas. Ideias chegam como lampejos.",
    desejoDaAlma:
      "Você deseja um propósito espiritual ou idealista e sentir que sua vida ilumina a de outras pessoas.",
    personalidade:
      "Passa a imagem de alguém carismático, sensível e um pouco fora do comum.",
    cicloDeVida:
      "Fase de despertar: intuição forte, tensão nervosa e chances de inspirar outros. Pede cuidado com a energia emocional.",
    anoPessoal: "Ano 2 com intensidade de mestre: intuição e revelações em alta, pedindo paciência e equilíbrio emocional.",
    mesPessoal: "Mês 2 intensificado: intuição aguçada e emoções à flor da pele.",
  },
  22: {
    arquetipo: "O Mestre Construtor",
    essencia: "Visão grandiosa com capacidade prática de executá-la. Vibra também como 4.",
    caminhoDeVida:
      "A lição é transformar uma grande visão em obra concreta que beneficie muita gente. A pressão interna é alta; nos períodos de dúvida, a vida pede o método do 4.",
    expressao:
      "Talento raro de unir visão e execução: enxergar algo em escala global e quebrá-lo em passos práticos. O risco é a autossabotagem diante do tamanho do sonho.",
    desejoDaAlma:
      "Você deseja deixar um legado concreto, algo que permaneça depois de você.",
    personalidade:
      "Passa a imagem de alguém sólido, capaz e com ambições grandes.",
    cicloDeVida:
      "Fase de grandes construções: projetos de longo prazo e de grande alcance ganham forma.",
    anoPessoal: "Ano 4 com escala de mestre: trabalho intenso com potencial de construir algo grande e duradouro.",
    mesPessoal: "Mês 4 ampliado: trabalho pesado com potencial de grande resultado.",
  },
  33: {
    arquetipo: "O Mestre do Amor",
    essencia: "Serviço, cura e ensino guiados pelo amor. Vibra também como 6.",
    caminhoDeVida:
      "A lição é servir e ensinar com amor incondicional, sem se tornar mártir. Nos momentos difíceis, a vida pede o equilíbrio do 6.",
    expressao:
      "Talento para curar, aconselhar e elevar as pessoas ao redor pelo exemplo.",
    desejoDaAlma:
      "Você deseja aliviar o sofrimento dos outros e viver com propósito de serviço.",
    personalidade:
      "Passa a imagem de alguém compassivo, acolhedor e inspirador.",
    cicloDeVida:
      "Fase de serviço amoroso: família, comunidade e cuidado ganham dimensão maior.",
    anoPessoal: "Ano 6 com intensidade de mestre: responsabilidades afetivas ampliadas e chances de servir de forma marcante.",
    mesPessoal: "Mês 6 ampliado: cuidado e responsabilidade em evidência.",
  },
};

/** Desafios (0–8): a dificuldade a ser trabalhada em cada período. */
export const DESAFIOS: Record<number, string> = {
  0: "Desafio da escolha: todos os caminhos estão abertos, e a dificuldade é decidir e se comprometer com um.",
  1: "Desafio da autoafirmação: aprender a se posicionar sem cair na teimosia nem na submissão.",
  2: "Desafio da sensibilidade: não levar tudo para o lado pessoal e não se anular pelos outros.",
  3: "Desafio da expressão: dizer o que sente sem se esconder nem se dispersar.",
  4: "Desafio da disciplina: equilibrar rigidez e preguiça, aceitar limites e manter constância.",
  5: "Desafio da liberdade: usar a liberdade sem excessos e não fugir dos compromissos.",
  6: "Desafio da responsabilidade: cuidar sem controlar e aceitar que os outros têm seus próprios caminhos.",
  7: "Desafio da fé: confiar na vida e nas pessoas sem se isolar ou cair no ceticismo.",
  8: "Desafio do poder: lidar com dinheiro e autoridade sem obsessão nem medo.",
};

/** Resolve o número usado para buscar o texto (0 só existe em desafios). */
export function interpretar(numero: number, secao: Secao) {
  const i = INTERPRETACOES[numero];
  if (!i) return null;
  return { numero, arquetipo: i.arquetipo, texto: i[secao] };
}
