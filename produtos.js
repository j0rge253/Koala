const bancoDeDadosCamisas = [
    // === PREMIER LEAGUE ===
    { id: "liverpool-25-26", nome: "Liverpool 25-26", preco: 180.00, categorias: ["internacional"], liga: "premier", tamanhos: ["P","M","G","GG"], prontaEntrega: true, pasta: "Liverpool 25-26" },
    { id: "west-ham-24-25", nome: "West Ham 24-25", preco: 180.00, categorias: ["internacional"], liga: "premier", tamanhos: ["P","M","G","GG"], prontaEntrega: true, pasta: "West Ham 24-25" },
    { id: "newcastle-fora-25-26", nome: "Newcastle Fora 25-26", preco: 180.00, categorias: ["internacional"], liga: "premier", tamanhos: ["P","M","G","GG"], prontaEntrega: true, pasta: "Newcastle  Fora 25-26" },
    { id: "chelsea-25-26", nome: "Chelsea 25-26", preco: 180.00, categorias: ["internacional"], liga: "premier", tamanhos: ["P","M","G","GG"], prontaEntrega: true, pasta: "Chelsea 25-26" },
    { id: "chelsea-fora-25-26", nome: "Chelsea Fora 25-26", preco: 180.00, categorias: ["internacional"], liga: "premier", tamanhos: ["P","M","G","GG"], prontaEntrega: true, pasta: "Chelsea Fora 25-26" },
    { id: "tottenham-fora-25-26", nome: "Tottenham Fora 25-26", preco: 180.00, categorias: ["internacional"], liga: "premier", tamanhos: ["P","M","G","GG"], prontaEntrega: true, pasta: "Tottenham Fora 25-26" },
    { id: "manchester-united-special-25-26", nome: "Manchester United Special 25-26", preco: 180.00, categorias: ["internacional"], liga: "premier", tamanhos: ["P","M","G","GG"], prontaEntrega: true, pasta: "Manchester United Special 25-26" },
    { id: "manchester-united-25-26", nome: "Manchester United 25-26", preco: 180.00, categorias: ["internacional"], liga: "premier", tamanhos: ["P","M","G","GG"], prontaEntrega: true, pasta: "Manchester United 25-26" },
    { id: "arsenal-special-25-26", nome: "Arsenal Special 25-26", preco: 180.00, categorias: ["internacional"], liga: "premier", tamanhos: ["P","M","G","GG"], prontaEntrega: true, pasta: "Arsenal Special 25-26" },
    { id: "arsenal-25-26", nome: "Arsenal 25-26", preco: 180.00, categorias: ["internacional"], liga: "premier", tamanhos: ["P","M","G","GG"], prontaEntrega: true, pasta: "Arsenal 25-26" },
    { id: "aston-villa-fora-25-26", nome: "Aston Villa Fora 25-26", preco: 180.00, categorias: ["internacional"], liga: "premier", tamanhos: ["P","M","G","GG"], prontaEntrega: true, pasta: "Aston Villa Fora 25-26" },
    { id: "manchester-city-24-25", nome: "Manchester City 24-25", preco: 180.00, categorias: ["internacional"], liga: "premier", tamanhos: ["P","M","G","GG"], prontaEntrega: true, pasta: "Manchester City 24-25" },

    // === LA LIGA ===
    { id: "barcelona-25-26", nome: "Barcelona 25-26", preco: 180.00, categorias: ["internacional","lançamento"], liga: "laliga", tamanhos: ["P","M","G","GG"], prontaEntrega: true, pasta: "Barcelona 25-26" },
    { id: "barcelona-retro-15-16", nome: "Barcelona Retro 15-16", preco: 230.00, categorias: ["internacional","retro"], liga: "laliga", tamanhos: ["P","M","G","GG"], prontaEntrega: true, pasta: "Barcelona Retro 15-16" },
    { id: "atletico-madrid-25-26", nome: "Atlético de Madrid 25-26", preco: 180.00, categorias: ["internacional"], liga: "laliga", tamanhos: ["P","M","G","GG"], prontaEntrega: true, pasta: "Atletico Madrid 25-26" },
    { id: "barcelona-retro-05-06", nome: "Barcelona Retro 05-06", preco: 230.00, categorias: ["internacional","retro"], liga: "laliga", tamanhos: ["P","M","G","GG"], prontaEntrega: true, pasta: "Barcelona Retro 05-06" },
    { id: "real-madrid-fora-25-26", nome: "Real Madrid Fora 25-26", preco: 180.00, categorias: ["internacional"], liga: "laliga", tamanhos: ["P","M","G","GG"], prontaEntrega: true, pasta: "Real Madrid Fora 25-26" },
    { id: "sevilla-25-26", nome: "Sevilla 25-26", preco: 180.00, categorias: ["internacional"], liga: "laliga", tamanhos: ["P","M","G","GG"], prontaEntrega: true, pasta: "Sevilla 25-26" },
    { id: "retro-real-madrid-special-25-26", nome: "Retro Real Madrid Special 25-26", preco: 230.00, categorias: ["internacional","retro"], liga: "laliga", tamanhos: ["P","M","G","GG"], prontaEntrega: true, pasta: "Retro Real Madrid Special 25-26" },
    { id: "real-madrid-25-26", nome: "Real Madrid 25-26", preco: 180.00, categorias: ["internacional","lançamento"], liga: "laliga", tamanhos: ["P","M","G","GG"], prontaEntrega: true, pasta: "Real Madrid 25-26" },

    // === SERIE A ===
    { id: "inter-de-milao-retro-97-98", nome: "Inter de Milão Retro 97-98", preco: 230.00, categorias: ["internacional","retro"], liga: "seriea", tamanhos: ["P","M","G","GG"], prontaEntrega: true, pasta: "Inter de Milao Retro 97-98" },
    { id: "inter-de-milao-25-26", nome: "Inter de Milão 25-26", preco: 180.00, categorias: ["internacional"], liga: "seriea", tamanhos: ["P","M","G","GG"], prontaEntrega: true, pasta: "Inter de Milao 25-26" },
    { id: "lazio-fora-25-26", nome: "Lazio Fora 25-26", preco: 180.00, categorias: ["internacional"], liga: "seriea", tamanhos: ["P","M","G","GG"], prontaEntrega: true, pasta: "Lazio Fora 25-26" },
    { id: "lazio-25-26", nome: "Lazio 25-26", preco: 180.00, categorias: ["internacional"], liga: "seriea", tamanhos: ["P","M","G","GG"], prontaEntrega: true, pasta: "Lazio 25-26" },
    { id: "juventus-especial-25-26", nome: "Juventus Especial 25-26", preco: 180.00, categorias: ["internacional"], liga: "seriea", tamanhos: ["P","M","G","GG"], prontaEntrega: true, pasta: "Juventus Especial 25-26" },
    { id: "milan-25-26-fora", nome: "Milan 25-26 Fora", preco: 180.00, categorias: ["internacional"], liga: "seriea", tamanhos: ["P","M","G","GG"], prontaEntrega: true, pasta: "Milan 25-26 Fora" },
    { id: "juventus-25-26", nome: "Juventus 25-26", preco: 180.00, categorias: ["internacional"], liga: "seriea", tamanhos: ["P","M","G","GG"], prontaEntrega: true, pasta: "Juventus 25-26" },
    { id: "milan-retro-06-07", nome: "Milan Retro 06-07", preco: 230.00, categorias: ["internacional","retro"], liga: "seriea", tamanhos: ["P","M","G","GG"], prontaEntrega: true, pasta: "Milan Retro 06-07" },
    { id: "florence-retro-1998", nome: "Florence Retro 1998", preco: 230.00, categorias: ["internacional","retro"], liga: "seriea", tamanhos: ["P","M","G","GG"], prontaEntrega: true, pasta: "Florence Retro 1998" },

    // === BUNDESLIGA ===
    { id: "frankfurt-fora-25-26", nome: "Frankfurt Fora 25-26", preco: 180.00, categorias: ["internacional"], liga: "bundesliga", tamanhos: ["P","M","G","GG"], prontaEntrega: true, pasta: "Frankfurt Fora 25-26" },
    { id: "borussia-dortmund-25-26", nome: "Borussia Dortmund 25-26", preco: 180.00, categorias: ["internacional"], liga: "bundesliga", tamanhos: ["P","M","G","GG"], prontaEntrega: true, pasta: "Borussia Dortmund 25-26" },
    { id: "bayern-goalkeeper-25-26", nome: "Bayern Munich Goalkeeper 25-26", preco: 180.00, categorias: ["internacional"], liga: "bundesliga", tamanhos: ["P","M","G","GG"], prontaEntrega: true, pasta: "Bayern Munich Goalkeeper 25-26" },

    // === LIGUE 1 ===
    { id: "psg-fora-25-26", nome: "PSG Fora 25-26", preco: 180.00, categorias: ["internacional"], liga: "ligue1", tamanhos: ["P","M","G","GG"], prontaEntrega: true, pasta: "PSG FORA 25-26" },
    { id: "lyon-special-25-26", nome: "Lyon Special 25-26", preco: 180.00, categorias: ["internacional"], liga: "ligue1", tamanhos: ["P","M","G","GG"], prontaEntrega: true, pasta: "Lyon Special 25-26" },
    { id: "psg-25-26", nome: "PSG 25-26", preco: 180.00, categorias: ["internacional"], liga: "ligue1", tamanhos: ["P","M","G","GG"], prontaEntrega: true, pasta: "PSG 25-26" },
    { id: "lyon-25-26", nome: "Lyon 25-26", preco: 180.00, categorias: ["internacional"], liga: "ligue1", tamanhos: ["P","M","G","GG"], prontaEntrega: true, pasta: "Lyon 25-26" },

    // === BRASILEIRÃO ===
    { id: "palmeiras-fora-25-26", nome: "Palmeiras Fora 25-26", preco: 180.00, categorias: ["nacional"], liga: "brasileirao", tamanhos: ["P","M","G","GG"], prontaEntrega: true, pasta: "Palmeras Fora 25-26" },
    { id: "palmeiras-25-26", nome: "Palmeiras 25-26", preco: 180.00, categorias: ["nacional"], liga: "brasileirao", tamanhos: ["P","M","G","GG"], prontaEntrega: true, pasta: "Palmeiras 25-26" },
    { id: "atletico-mineiro-25-26", nome: "Atlético Mineiro 25-26", preco: 180.00, categorias: ["nacional"], liga: "brasileirao", tamanhos: ["P","M","G","GG"], prontaEntrega: true, pasta: "Atletico Mineiro 25-26" },
    { id: "fortaleza-25-26", nome: "Fortaleza 25-26", preco: 180.00, categorias: ["nacional"], liga: "brasileirao", tamanhos: ["P","M","G","GG"], prontaEntrega: true, pasta: "Fortaleza 25-26" },
    { id: "gremio-25-26", nome: "Grêmio 25-26", preco: 180.00, categorias: ["nacional"], liga: "brasileirao", tamanhos: ["P","M","G","GG"], prontaEntrega: true, pasta: "Gremio 25-26" },
    { id: "cruzeiro-retro-2015", nome: "Cruzeiro Retro 2015", preco: 230.00, categorias: ["nacional","retro"], liga: "brasileirao", tamanhos: ["P","M","G","GG"], prontaEntrega: true, pasta: "Cruzeiro Retro 2015" },
    { id: "cruzeiro-25-26", nome: "Cruzeiro 25-26", preco: 180.00, categorias: ["nacional"], liga: "brasileirao", tamanhos: ["P","M","G","GG"], prontaEntrega: true, pasta: "Cruzeiro 25-26" },
    { id: "flamengo-25-26", nome: "Flamengo 25-26", preco: 180.00, categorias: ["nacional","lançamento"], liga: "brasileirao", tamanhos: ["P","M","G","GG"], prontaEntrega: true, pasta: "Flamengo 25-26" },
    { id: "flamengo-fora-25-26", nome: "Flamengo Fora 25-26", preco: 180.00, categorias: ["nacional"], liga: "brasileirao", tamanhos: ["P","M","G","GG"], prontaEntrega: true, pasta: "Flamengo Fora 25-26" },
    { id: "santos-retro-11-12", nome: "Santos Retro 11-12", preco: 230.00, categorias: ["nacional","retro"], liga: "brasileirao", tamanhos: ["P","M","G","GG"], prontaEntrega: true, pasta: "Santos Retro 11-12" },
    { id: "flamengo-retro-08-09", nome: "Flamengo Retro 08-09", preco: 230.00, categorias: ["nacional","retro"], liga: "brasileirao", tamanhos: ["P","M","G","GG"], prontaEntrega: true, pasta: "Flamengo Retro_08-09" },

    // === SELEÇÕES ===
    { id: "alemanha-especial-25-26", nome: "Alemanha Especial 25-26", preco: 180.00, categorias: ["selecao"], liga: null, tamanhos: ["P","M","G","GG"], prontaEntrega: true, pasta: "Alemanha Especial 25-26" },
    { id: "brasil-25-26", nome: "Brasil 25-26", preco: 180.00, categorias: ["selecao","lançamento"], liga: null, tamanhos: ["P","M","G","GG"], prontaEntrega: true, pasta: "Brasil 25-26" },
    { id: "brasil-2026", nome: "Brasil 2026", preco: 230.00, categorias: ["selecao","retro"], liga: null, tamanhos: ["P","M","G","GG"], prontaEntrega: true, pasta: "Brasil-2026" },
    { id: "coreia-do-sul-25-26", nome: "Coreia do Sul 25-26", preco: 180.00, categorias: ["selecao"], liga: null, tamanhos: ["P","M","G","GG"], prontaEntrega: true, pasta: "Coreia do Sul 25-26" },
    { id: "franca-25-26", nome: "França 25-26", preco: 180.00, categorias: ["selecao"], liga: null, tamanhos: ["P","M","G","GG"], prontaEntrega: true, pasta: "França 25-26" },
    { id: "nigeria-fora-25-26", nome: "Nigéria Fora 25-26", preco: 180.00, categorias: ["selecao"], liga: null, tamanhos: ["P","M","G","GG"], prontaEntrega: true, pasta: "Nigeria Fora 25-26" },
    { id: "portugal-26-27", nome: "Portugal 26-27", preco: 180.00, categorias: ["selecao"], liga: null, tamanhos: ["P","M","G","GG"], prontaEntrega: true, pasta: "Portugal 26-27" },

    // === OUTROS / INFANTIL ===
    { id: "al-nassr-kit-infantil-25-26", nome: "Al-Nassr Kit Infantil 25-26", preco: 180.00, categorias: ["internacional","infantil"], liga: null, tamanhos: ["P","M","G","GG"], prontaEntrega: true, pasta: "Al-Nassr Kit Infantil 25-26" },
    { id: "inter-miami-25-26", nome: "Inter Miami 25-26", preco: 180.00, categorias: ["internacional"], liga: null, tamanhos: ["P","M","G","GG"], prontaEntrega: true, pasta: "Inter Miami 25-26" },
    { id: "inter-miami-fora-25-26", nome: "Inter Miami Fora 25-26", preco: 180.00, categorias: ["internacional"], liga: null, tamanhos: ["P","M","G","GG"], prontaEntrega: true, pasta: "Inter Miami Fora 25-26" },
];
