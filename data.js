// ============================================================
// DATA.JS - Dados do site "Dos Amigos em Oração"
// Edite este arquivo para atualizar o conteúdo do site
// ============================================================

const SITE_DATA = {

  // --- CABEÇALHO ---
  titulo: "DOS AMIGOS EM ORAÇÃO",
  subtitulo: "🙏 PAZ SEJA CONVOSCO 🔥",
  data: new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" }),
  lema: [
    "OREMOS JUNTOS e,",
    "UNS PELOS OUTROS",
    "INTERCESSÃO",
    "SALVAÇÃO",
    "REAVIVAMENTO"
  ],

  // --- HINO / SALMO DO DIA ---
  hinodia: {
    referencia: "Sl 23:1",
    numero: "1872",
    titulo: "O BOM PASTOR",
    link: "https://youtu.be/XXsqW2XeZps?si=MUNu33hPAH8YubxV"
  },

  // --- ORADOR DO DIA ---
  orador: "EDSON GONÇALVES Pr.",

  // --- INTERCEDIDO DO DIA (1º da lista — atualizado automaticamente pelo rodízio) ---
  intercedidoDia: "Edson Gonçalves Pr.",

  // --- REPRESENTAÇÃO ---
  representacao: "DE NOSSOS GRUPOS, NOSSAS LISTAS, EXTENSIVO AOS AMIGOS E FAMILIARES – SE, TIVER INIMIGOS (Mat. 5:44) INCLUA pfv.",

  // --- PEDIDOS E AGRADECIMENTOS ---
  pedidos: [
    {
      tipo: "gratidao",
      de: "Valéria (do grupo, Dos amigos em oração)",
      nome: "Carlos Credidio",
      detalhe: "cunhado",
      pedido: "Retina",
      descricao: "A 1ª etapa do tratamento foi bem sucedida. Já começou a enxergar. Há previsão de tratamentos por volta de 3 meses ainda. Muito obrigada pelas orações até aqui. Ainda necessita das orações.",
      agradecimento: true
    },
    {
      tipo: "pedido",
      nome: "Kelly",
      pedido: "Quadro de ansiedade extrema",
      descricao: "Venho pedir oração por mim — quadro de ansiedade extrema."
    },
    {
      tipo: "pedido",
      de: "Valéria",
      nome: "Paloma Pacheco",
      pedido: "Transplantada de medula. Com bactéria perigosa. Sem imunidade.",
      descricao: ""
    },
    {
      tipo: "pedido",
      de: "Vânia (do grupo: O Poder Da Oração)",
      nome: "Wellington Brancatti",
      pedido: "Tumor no cérebro (ainda não confirmado)",
      descricao: ""
    },
    {
      tipo: "pedido",
      de: "Miriam",
      nome: "Samille (21)",
      pedido: "Síndrome HELLP — situação grave desde 16/10",
      descricao: "Mãe que acabou de conceber o pequeno André Luiz, apresentou Síndrome Hellp — situação grave, entubada. O caso dela agravou consideravelmente. Somente um milagre pode reverter esse caso."
    },
    {
      tipo: "pedido",
      de: "Aurélio",
      nome: "Maiele / Melina",
      detalhe: "nora e netinha",
      pedido: "Saúde mãe e filha pós parto",
      descricao: "Por favor peço oração para que Deus cuide delas."
    },
    {
      tipo: "gratidao",
      de: "Marcia",
      nome: "Heloísa (18)",
      pedido: "Atropelada por um caminhão, próximo Catanduva/SP",
      descricao: "Fará várias cirurgias: tornozelo, mãos, clavículas. Já fez a cirurgia na cabeça, agora é só monitoramento. No geral, ela está bem. A família agradece as orações e pede que continuem orando.",
      agradecimento: true
    },
    {
      tipo: "pedido",
      nome: "Marco Antônio",
      pedido: "Saúde e Situação financeira",
      descricao: ""
    },
    {
      tipo: "pedido",
      de: "Araguacy",
      nome: "Geni (esposa)",
      pedido: "Saúde",
      descricao: "Continuemos em oração."
    },
    {
      tipo: "pedido",
      de: "Valéria",
      nome: "Sérgio Nascimento",
      detalhe: "Primo do marido",
      pedido: "Recuperação de cirurgia (infarto)",
      descricao: ""
    },
    {
      tipo: "pedido",
      de: "Ivo",
      nome: "Gabriele / Amanda / Marcelo / Rafael / Maithe",
      pedido: "Líderes da Igreja — receber entendimento do plano da Igreja e, acima de tudo, o Plano de Deus",
      descricao: ""
    },
    {
      tipo: "pedido",
      de: "Maria Deolinda",
      nome: "Maria Deolinda Forte Nascimento",
      pedido: "Dengue, dores no corpo, ombro direito, formigamento nas pernas, mãos e fraqueza",
      descricao: "Tive dengue e ainda estou com muitas dores no corpo, nas juntas e levei um tombo que afetou meu ombro direito. Os médicos estão pedindo pra consultar reumatologista e neurologista, agora com dores fortes nas pernas. Formigamento nas pernas, mãos e fraqueza pra caminhar. Martin continua se recuperando a cada dia melhor."
    },
    {
      tipo: "pedido",
      de: "Alexandra",
      nome: "Sr. Getal Pego",
      detalhe: "pai",
      pedido: "Câncer na garganta — em tratamento",
      descricao: ""
    },
    {
      tipo: "pedido",
      de: "Divane (do grupo O Poder da Oração)",
      nome: "Divane",
      pedido: "Depressão muito forte",
      descricao: "Peço oração por mim."
    },
    {
      tipo: "pedido",
      de: "Miriam",
      nome: "Cecília / Josiele / Guilherme",
      detalhe: "neta, nora e filho",
      pedido: "Agradecimento e intercessão",
      descricao: ""
    },
    {
      tipo: "pedido",
      nome: "Curió",
      pedido: "Forte anemia causada por bactéria KPC — esteve 30 dias internado",
      descricao: "Amigos, não me encontro bem de saúde, estou com uma forte anemia, causada por uma bactéria KPC, estive 30 dias internado, orem por mim."
    },
    {
      tipo: "gratidao",
      de: "Valmir",
      nome: "Andréia (esposa)",
      pedido: "Pulmão e Coração — em casa recuperando",
      descricao: "Em casa recuperando. Peço que continuem orando.",
      agradecimento: true
    },
    {
      tipo: "pedido",
      nome: "Juan (17)",
      detalhe: "Filho de Waldemir e Aline, irmão de Evelyn",
      pedido: "Doença degenerativa — crises fortíssimas. CURA!",
      descricao: "🔥 Manifesta o Teu Poder Senhor 🔥",
      urgente: true
    },
    {
      tipo: "pedido",
      de: "Marcia",
      nome: "Aparecida (89 anos)",
      detalhe: "tia",
      pedido: "Cura!",
      descricao: "Minha família agradece!"
    },
    {
      tipo: "pedido",
      de: "Divane (do grupo O Poder da Oração)",
      nome: "Dilson",
      pedido: "AVC",
      descricao: "Peço que me ajudem a orar por ele."
    },
    {
      tipo: "pedido",
      de: "Lúcia",
      nome: "Leila / Matheus",
      pedido: "Leila: AVC internada, alimentando por sonda. Matheus: tumor cerebral gravíssimo, DESENGANADO!",
      descricao: "Leila (mãe de uma amiga): AVC — está internada e se alimentando por sonda, sem se movimentar. Matheus (meu sobrinho): tumor cerebral gravíssimo, DESENGANADO!",
      urgente: true
    },
    {
      tipo: "pedido",
      de: "Paulo Duarte",
      nome: "Katilym / Lucas Guaçu / Valcir / Tati Guaçu / Samuel",
      pedido: "Convulsão internada Mogi / Internado grave / Câncer / Câncer / Drogas",
      descricao: "Katilym: convulsão internada Mogi. Lucas Guaçu: internado grave. Valcir: câncer. Tati Guaçu: câncer. Samuel: drogas."
    },
    {
      tipo: "pedido",
      de: "Valéria",
      nome: "Renata Dotto (Renatinha)",
      pedido: "Câncer de mama — cirurgia para retirada das duas mamas",
      descricao: "Encontra-se cansada... Porém, confia muito em nossas orações. Jesus, o médico dos médicos! Eu creio! Salvador - Bahia.",
      urgente: true
    },
    {
      tipo: "pedido",
      de: "Valéria",
      nome: "Neusa",
      detalhe: "prima — São Paulo",
      pedido: "Pneumonia forte — muita tosse e falta de ar",
      descricao: "Já iniciou tratamento com antibióticos fortes, mas precisa muito das nossas orações. Que Deus estenda Suas mãos sobre ela, traga cura completa, alivie sua respiração e fortaleça seu corpo."
    },
    {
      tipo: "pedido",
      nome: "Cutrim Raimundo Pr.",
      pedido: "Sua Vida, Sua Saúde, Sua Família",
      descricao: ""
    },
    {
      tipo: "pedido",
      de: "Lúcia",
      nome: "Joana D'arc Ribeiro de Jesus",
      pedido: "Saúde",
      descricao: ""
    },
    {
      tipo: "pedido",
      de: "Valéria",
      nome: "Wellington (45 anos) — Alagoinhas/BA",
      pedido: "Fraturou 2 vértebras na cervical. Não sente os braços e as pernas.",
      descricao: "A família pede oração por ele. Que Deus tenha misericórdia.",
      urgente: true
    },
    {
      tipo: "pedido",
      de: "Purita (mãe)",
      nome: "Karoline Rodrigues Cabral",
      pedido: "CA Mama (Carcinoma) — retirada de mama",
      descricao: "Que a recuperação seja rápida. CURE-A SENHOR."
    },
    {
      tipo: "pedido",
      de: "Alvaro (Madrid)",
      nome: "Nando Moura",
      pedido: "Precisa de oração",
      descricao: "Tem vídeos na internet esclarecedores sobre música e está precisando oração."
    },
    {
      tipo: "pedido",
      de: "Valéria",
      nome: "Fábio (39 anos)",
      pedido: "Novo tratamento oncológico — internação de 15 a 20 dias",
      descricao: "A médica decidiu iniciar um novo tratamento, já aprovado nos EUA e disponível no Brasil há quase dois anos. Serão três ciclos. Os exames mostraram inflamação nos linfonodos. Já o nódulo no pulmão está pequeno e estabilizado. A médica está confiante pois ele reagiu muito bem à quimioterapia e à radioterapia. Hospital Samaritano - SP.",
      urgente: true
    },
    {
      tipo: "pedido",
      nome: "Calil",
      pedido: "Saúde / família",
      descricao: ""
    },
    {
      tipo: "gratidao",
      de: "Alzita Bonavides (vovó)",
      nome: "Laurinha (8 meses)",
      pedido: "Cirurgia no coração — em casa se recuperando",
      descricao: "Agradecemos a todos que estão orando nesse momento de aflição.",
      agradecimento: true
    },
    {
      tipo: "pedido",
      de: "Daniela (filha)",
      nome: "Dolores (mãe)",
      pedido: "Problemas de Saúde — Cura Senhor!",
      descricao: ""
    },
    {
      tipo: "pedido",
      nome: "Cardoso",
      pedido: "Venda de um terreno — necessidade financeira",
      descricao: ""
    },
    {
      tipo: "gratidao",
      nome: "Valéria",
      pedido: "Medicamento de altíssimo custo concedido pelo Ministério da Saúde",
      descricao: "Meu coração transborda gratidão. Agradeço a Deus pelo cuidado, pela provisão e pela fidelidade em cada detalhe da minha vida. O medicamento, de altíssimo custo e essencial para a manutenção da minha saúde, foi concedido. O processo junto ao Ministério da Saúde foi favorável, e essa vitória não é apenas jurídica — é divina. Obrigada Senhor!",
      agradecimento: true
    },
    {
      tipo: "pedido",
      de: "Suely",
      nome: "Teresa / José Carlos / Margarida / Francisco / Socorro / Sara / Manuel",
      pedido: "Derramamento do Espírito Santo e Paz — problemas de saúde e desentendimento familiar",
      descricao: "Precisam crer em Jesus! Em Nome de Jesus que o Sobrenatural aconteça, a Paz prevaleça e eles possam crer no Poder de Deus!"
    },
    {
      tipo: "pedido",
      de: "Pr. Adilson Cruz",
      nome: "Família do Pr. Ronaldo Braz",
      pedido: "Richard (27) — veio a óbito em acidente de carro. Rael (mãe) — UTI estado grave.",
      descricao: "O Pr. Ronaldo Braz pede que continuem orando neste momento difícil.",
      urgente: true
    },
    {
      tipo: "pedido",
      de: "Valéria",
      nome: "Rui Fernando (primo)",
      pedido: "Traqueostomia — situação extremamente delicada",
      descricao: "Passou pela traqueostomia, mas a situação continua extremamente delicada. Está muito agitado. Como sempre fez uso de medicações fortes para esquizofrenia, o quadro tem sido bastante complexo. SP - Hospital Samaritano.",
      urgente: true
    },
    {
      tipo: "pedido",
      de: "Edson Gonçalves Pr.",
      nome: "Ubirajara / Cleber / Lourival / Edivaldo / Alison / Célia Regina / Sirlei Lopes / Filomena / Domingos Gonzalez / Marcão e família / Ericles e esposa",
      pedido: "Saúde física e espiritual",
      descricao: ""
    },
    {
      tipo: "pedido",
      de: "Kelly",
      nome: "Maurício José Secon dos Santos",
      pedido: "Depressão e problema espiritual",
      descricao: ""
    },
    {
      tipo: "pedido",
      de: "Aylton",
      nome: "Raissa (22)",
      pedido: "Alergia grave por medicação — queimaduras de 3º grau, entubada na UTI do Hosp. São Paulo",
      descricao: "Familiares desesperados.",
      urgente: true
    },
    {
      tipo: "pedido",
      de: "Marcia",
      nome: "Edite",
      pedido: "Problemas de Saúde — urgência",
      descricao: "",
      urgente: true
    },
    {
      tipo: "pedido",
      de: "Valéria",
      nome: "Marcia Alves",
      pedido: "Complicações de câncer — em SP",
      descricao: "A família crê no poder da oração.",
      urgente: true
    },
    {
      tipo: "pedido",
      de: "Gisele",
      nome: "Isabelle / Gabrielle",
      detalhe: "filhas",
      pedido: "Que os planos de Deus se cumpram — paz que excede todo entendimento",
      descricao: "Obrigada pelas orações. Que Deus nos dê a paz que excede todo o entendimento durante as provações pelas quais passamos."
    },
    {
      tipo: "pedido",
      de: "Maria Deolinda",
      nome: "Martin Francisco Forte Nascimento",
      detalhe: "filho",
      pedido: "Intercessão geral",
      descricao: ""
    },
    {
      tipo: "pedido",
      de: "Carlos",
      nome: "Jandyra Valino Garcia / Rosa da Cunha Garcia",
      pedido: "AVC (Jandyra) / intercessão geral (Rosa)",
      descricao: ""
    },
    {
      tipo: "pedido",
      de: "Marcia",
      nome: "Sara (11 anos)",
      detalhe: "aluna",
      pedido: "Epilepsia e transtornos mentais",
      descricao: ""
    },
    {
      tipo: "pedido",
      nome: "Marco Antônio",
      pedido: "Finanças — situação crítica",
      descricao: "Meus queridos irmãos, venho aqui pedir encarecidamente oração pelas minhas finanças! Não sei o que fazer, só peço oração!"
    },
    {
      tipo: "pedido",
      de: "Marco Antônio",
      nome: "Fernando (amigo)",
      pedido: "Situação extremamente grave — recuperação lenta",
      descricao: "Estamos crendo em um milagre.",
      urgente: true
    },
    {
      tipo: "gratidao",
      de: "Marcia",
      nome: "Juliano",
      pedido: "Recuperação",
      descricao: "Teve alta da clínica, ainda sendo monitorado, trabalhando de uber.",
      agradecimento: true
    },
    {
      tipo: "pedido",
      de: "Valéria",
      nome: "Maria Fontoura (10 anos)",
      pedido: "Dengue hemorrágica na UTI do Aliança (Salvador - Bahia) — quadro agravado",
      descricao: "Que Deus tenha misericórdia e restaure sua saúde.",
      urgente: true
    },
    {
      tipo: "pedido",
      nome: "Samarone / Diana Gomes",
      pedido: "Necessitamos das vossas orações",
      descricao: ""
    },
    {
      tipo: "pedido",
      de: "Paulo Duarte",
      nome: "Rosângela / André Guaçu / Denise Mogi / Eliane Mogi / Henrique Dr / Miguel / Paula Mogi / Roberto Munhoz / Tati Guaçu / Valdir Mogi",
      pedido: "Saúde (fibromialgia, coluna), câncer, depressão/drogas, intercessão geral",
      descricao: ""
    },
    {
      tipo: "gratidao",
      de: "Valéria",
      nome: "Rebeca (6)",
      pedido: "Em casa — tratamento e recuperação",
      descricao: "",
      agradecimento: true
    },
    {
      tipo: "pedido",
      de: "Haniel Prado Pr.",
      nome: "Laís Priscila (27)",
      detalhe: "esposa",
      pedido: "Diagnosticada câncer estágio 4 — de crescimento muito rápido. CURA SENHOR!",
      descricao: "",
      urgente: true
    },
    {
      tipo: "pedido",
      nome: "Luis Carlos Calil",
      pedido: "Família — Proteção e Harmonia de Deus",
      descricao: ""
    },
    {
      tipo: "gratidao",
      de: "Laudier",
      nome: "Reginaldo Palito",
      pedido: "Se recupera de cirurgia de prótese femural",
      descricao: "Minha família agradece!",
      agradecimento: true
    },
    {
      tipo: "gratidao",
      de: "Araguacy",
      nome: "Vanderson",
      pedido: "Bactéria no pulmão — MILAGRE! Recebeu alta, está em casa.",
      descricao: "Esteve internado 23 dias, todos pensavam que ele morreria devido à bactéria nos pulmões. A situação era gravíssima. Graças a Deus de um dia para o outro foi curado. Recebeu alta, está em casa com sua família!",
      agradecimento: true,
      milagre: true
    },
    {
      tipo: "pedido",
      de: "Luiz Carlos",
      nome: "Pedro Dotto Neto (irmão)",
      pedido: "Rins em estado delicado",
      descricao: "Agradeço a inclusão do meu nome em orações e peço a inclusão do nome de meu irmão Pedro que necessita MUITO. Deus é Pai.... Super agradecido."
    },
    {
      tipo: "pedido",
      nome: "Curió — Marco Antônio / Sandra / Diego / Natália / Maria Clara / Samuel",
      pedido: "Saúde / Situação financeira",
      descricao: ""
    },
    {
      tipo: "pedido",
      de: "Paulo Duarte",
      nome: "Paula (filha)",
      pedido: "Depressão — uso de drogas — CURA SENHOR!",
      descricao: "Por favor irmã fé, ore me ajuda. Intercessão — Deus Espírito Santo libertar e salvar do pecado. Irmãos, servo de Deus Altíssimo, de fé e orações.",
      urgente: true
    }
  ],

  // --- MOTIVOS GERAIS DE ORAÇÃO ---
  motivosGerais: [
    {
      titulo: "ABATIDOS",
      referencia: "II Coríntios 4:8,9,16-18",
      link: "https://www.youtube.com/watch?v=IZqlVGxQP60"
    },
    {
      titulo: "ABENÇOE-NOS",
      referencia: "II Coríntios 4:8,9,16-18",
      link: "https://youtu.be/zPBJBh9odzE?si=WbMrOkFp3RAW-8BS"
    },
    { titulo: "ABUSADOS", referencia: "", link: "" },
    { titulo: "ADOLESCENTES", referencia: "", link: "" },
    { titulo: "AFASTADOS DE DEUS", referencia: "", link: "" },
    {
      titulo: "AFLITOS",
      referencia: "II Coríntios 4:8,9,16-18",
      link: "https://youtu.be/10R-d2cGzKs?si=D9W2CFRbg0Bn1P0a",
      descricao: "Oremos por todas as pessoas que se encontram AFLITAS agora."
    },
    { titulo: "AGRESSORES", referencia: "", link: "" },
    { titulo: "AGREDIDOS", referencia: "", link: "" },
    {
      titulo: "ANGUSTIADOS",
      referencia: "II Coríntios 4:8,9,16-18",
      link: "https://youtu.be/10R-d2cGzKs?si=cEIN2psxoWEoYaQC",
      descricao: "Oremos por todas as pessoas que se encontram ANGUSTIADAS agora."
    },
    {
      titulo: "ATRIBULADOS",
      referencia: "II Coríntios 4:8,9,16-18",
      link: "https://youtu.be/10R-d2cGzKs?si=D9W2CFRbg0Bn1P0a"
    },
    {
      titulo: "AUMENTA-NOS A FÉ",
      referencia: "II Coríntios 4:8,9,16-18",
      link: "https://youtu.be/zPBJBh9odzE?si=WbMrOkFp3RAW-8BS"
    },
    { titulo: "BUSCAR A DEUS", referencia: "", link: "" },
    { titulo: "CRIANÇAS", referencia: "", link: "" },
    {
      titulo: "CURA — Mental / Física / Espiritual",
      referencia: "",
      link: "https://youtu.be/t797z0-FXbk?si=2dU6-iTrtU54NU_1",
      descricao: "Oremos incessantemente e fervorosamente por todos aqueles que necessitam de cura."
    },
    {
      titulo: "DESAMPARADOS",
      referencia: "II Coríntios 4:8,9,16-18",
      link: "https://youtu.be/zPBJBh9odzE?si=WbMrOkFp3RAW-8BS"
    },
    {
      titulo: "DESANIMADOS",
      referencia: "II Coríntios 4:8,9,16-18",
      link: "https://youtu.be/zPBJBh9odzE?si=WbMrOkFp3RAW-8BS"
    },
    { titulo: "DESEMPREGADOS", referencia: "", link: "" },
    { titulo: "DROGADOS", referencia: "", link: "" },
    { titulo: "ENDIVIDADOS", referencia: "", link: "" },
    { titulo: "ENFERMOS", referencia: "", link: "" },
    { titulo: "ENLUTADOS", referencia: "", link: "" },
    {
      titulo: "ENTREGA",
      referencia: "Salmos 37:5",
      link: "",
      descricao: "\"Entrega o teu caminho ao Senhor; confia n'Ele, e Ele tudo fará.\""
    },
    {
      titulo: "ESPÍRITO SANTO",
      referencia: "",
      link: "",
      descricao: "\"Pedi e dar-se-vos-á; buscai e achareis; batei e abrir-se-vos-á.... Pois se vós, sendo maus, sabeis dar boas dádivas aos vossos filhos, quanto mais dará O Pai celestial, o Espírito Santo àqueles que Lho pedirem.\" ME1 147.5"
    },
    {
      titulo: "FAMÍLIAS",
      referencia: "Atos 3:25",
      link: "",
      descricao: "\"...Na tua descendência serão benditas todas as famílias da terra.\""
    },
    { titulo: "FIÉIS", referencia: "", link: "" },
    { titulo: "FRUTO DO ESPÍRITO", referencia: "", link: "" },
    {
      titulo: "GOVERNANTES",
      referencia: "Salmos 33:12",
      link: "https://youtu.be/hgpzBKcHiF4",
      descricao: "\"Bem-aventurada é a nação cujo Deus é o Senhor, e o povo que ele escolheu para a sua herança.\""
    },
    { titulo: "GRAÇA — CALVÁRIO", referencia: "", link: "" },
    {
      titulo: "GRATIDÃO",
      referencia: "",
      link: "https://youtu.be/R1sOuGYPNCs",
      descricao: "\"A salvação é inteiramente um dom gratuito.\" FO 17.2 — Ponto de Oração 84"
    },
    { titulo: "IDOSOS", referencia: "", link: "" },
    { titulo: "INFIÉIS", referencia: "", link: "" },
    { titulo: "INJUSTIÇADO", referencia: "", link: "" },
    { titulo: "JOVENS", referencia: "", link: "" },
    { titulo: "LARES", referencia: "", link: "" },
    {
      titulo: "LIBERDADE RELIGIOSA",
      referencia: "Salmos 144:15",
      link: "https://youtu.be/0IzslKDJxSw?si=upzM56af0zbQvMbr",
      descricao: "\"...Bem-aventurado é o povo cujo Deus é o Senhor!\""
    },
    {
      titulo: "MILAGRE",
      referencia: "",
      link: "https://youtu.be/V3lTQ2CDtkY",
      descricao: "Oremos por todas as pessoas que precisam de um MILAGRE agora."
    },
    {
      titulo: "MISERICÓRDIA",
      referencia: "II Coríntios 4:8,9,16-18",
      link: "https://youtu.be/zPBJBh9odzE?si=WbMrOkFp3RAW-8BS"
    },
    {
      titulo: "NOVOS SUPRIMENTOS",
      referencia: "II Coríntios 4:8,9,16-18",
      link: "https://youtu.be/zPBJBh9odzE?si=WbMrOkFp3RAW-8BS"
    },
    { titulo: "OBEDIENTES", referencia: "", link: "" },
    { titulo: "PAZ", referencia: "", link: "" },
    {
      titulo: "PERSEGUIDOS",
      referencia: "II Coríntios 4:8,9,16-18",
      link: "https://youtu.be/zPBJBh9odzE?si=WbMrOkFp3RAW-8BS"
    },
    {
      titulo: "PERPLEXOS",
      referencia: "II Coríntios 4:8,9,16-18",
      link: "https://youtu.be/zPBJBh9odzE?si=WbMrOkFp3RAW-8BS"
    },
    {
      titulo: "RECONCILIAÇÃO",
      referencia: "II Coríntios 5:18-21",
      link: "https://youtu.be/unWjygyGGDQ?si=H-6xWjbT4zrbG6nO"
    },
    { titulo: "REJEITADOS", referencia: "", link: "" },
    {
      titulo: "SAÚDE",
      referencia: "",
      link: "",
      descricao: "Oremos por todas as pessoas que precisam ter sua Saúde restaurada agora."
    },
    {
      titulo: "SOFRIMENTOS",
      referencia: "II Coríntios 4:8,9,16-18",
      link: "https://youtu.be/10R-d2cGzKs?si=D9W2CFRbg0Bn1P0a"
    },
    {
      titulo: "SOLIDÃO",
      referencia: "",
      link: "https://youtu.be/zPBJBh9odzE?si=XF8N_QhlRRNLCxtn",
      descricao: "Oremos por todas as pessoas que se sentem só, abandonadas, sem esperança, rejeitadas, desamparadas."
    },
    { titulo: "VICIADOS", referencia: "", link: "" },
    { titulo: "VIOLENTADOS", referencia: "", link: "" }
  ],

  // --- LISTA DE INTERCEDIDOS ---
  lista: [
    "Edson Gonçalves Pr.",
    "Edison / Vera",
    "Dotto Luiz Carlos",
    "Dorival Duarte Jr. Dr.",
    "Dorival Dr. / Sonia Dra. Duarte",
    "Diz / Neusa / Fernando / Beto Torres",
    "Derson Jr.",
    "Derson",
    "Denival / Marise",
    "Delmer Pr. / Rute",
    "Darçonito",
    "\"Curió\" Marco Antônio / Sandra / Diego / Natália / Maria Clara / Samuel",
    "Clodoaldo Santana",
    "Cleudo / Claudia",
    "Cleônio Aguiar",
    "Cleonice / Bruno / Alvaro",
    "Cleide / Cecília / Cláudio",
    "Cleber Dr. / Catalina Pinheiro",
    "Cláudio / Cleide / Cecília",
    "Cirilo Gonçalves Pr",
    "Cibele / Elsaby",
    "Celio Pr / Salomé Barcelos",
    "Carlos Frederico",
    "Carlinhos / Lucimeire",
    "Carlinhos (MMirim)",
    "Cardoso",
    "Camacho Pr. / Inaira",
    "Calil / Jane",
    "Carlos Cabral — Estocolmo",
    "Bruno / Cleonice / Alvaro",
    "Bragalia Toni",
    "Aylton / Laise Pozzy",
    "Aurélio / Rosângela / Renan Felipe / Aurélio Henrique / Maile / Camila",
    "Assad Pr / Najila Bechara",
    "Arlete — do PG. Chuva Serôdia - Madrid",
    "Araguacy / Geni",
    "Andrey Jação Pr.",
    "André Pr. / Taiane Marinho",
    "Alzita Bonavides",
    "Alvaro / Vanessa / Natan",
    "Alexandre / Rose Brejão",
    "Alexandra Pego",
    "Afonso / Silvia Ligório",
    "Afonso / Merari / Hellen / Daniel",
    "Adma Simoni",
    "Adilson Pr. / Ruth / Anelise / Lisiane Cruz",
    "Acilio Pr. / Tânia Alves",
    "Abel / Marcia Pompeu",
    "Wolney",
    "Walter Di Pardi",
    "Vargas / Eliana / Sybil / Yul Costa",
    "Valéria / Élson / Rachel",
    "Valdir Nascimento",
    "Umberto Pr. / Eliane Moura",
    "Toninho Pr. / Hozana",
    "Thelmo",
    "Suely / Marcelo / Maya / Max",
    "Sonia / Ivo Rostirola Pr.",
    "Sonia / Isaias / Juliana / Mariana",
    "Silvio Roberto",
    "Silas - Roberto Pereira",
    "Sibyl Costa",
    "Samarone / Diana Gomes",
    "Rodrigo Pr / Laura Silva",
    "Roberval Fuentes",
    "Roberto / Denise Ripari",
    "Rinaldo de Paula",
    "Renato Pr. / Hellen Stencel",
    "Regines Dr. / Claudia Dra.",
    "Reginaldo Rocha",
    "Ranieri Pr. / Mara Sales",
    "Raimundo Gonçalves Pr",
    "Rafael Marques / Rafael (filho) / Leila",
    "Rafael Albertti Drago",
    "Purita",
    "Pitico / Wilma",
    "Paulo Vicente",
    "Paulo Pr. / Neide Fonseca",
    "Paulo / Rosangela Duarte",
    "Panchorra",
    "Ozeas Moura Pr.",
    "Osvair / Zezé",
    "Negreiros Valter",
    "Nathanael Pr. / Daniela",
    "Nanci Gorski",
    "Misael Jr.",
    "Miriam Santini",
    "Milton / Simone / Pietra / Miltinho",
    "Mike Connolly and your Family",
    "Merari / Afonso / Cristhian / Hellen",
    "Meire Ellen / Emerson / Théo Monteiro",
    "Mary Galindo Martins",
    "Marta / Junior Constantino",
    "Marquinhos",
    "Marlene Rodrigues",
    "Maria / Renato",
    "Maria Deolinda",
    "Marcus Cavalcanti",
    "Marcos Pereira Martins",
    "Marcos Lestrade",
    "Marco",
    "Marcio Pr. / Shirley Gerley",
    "Marcia Gaspar",
    "Márcia / Marcelo / Lino Canônico",
    "Luiz / Sonia Monteiro",
    "Luiz Matsunaga",
    "Luis Drago",
    "Luciana / Ivan / Vinicius Wholers",
    "Laudier",
    "Kelly / Francisco",
    "Junior / Marta Constantino",
    "Josefa",
    "Jorge Amaral",
    "Joelson Pr. / Grace Moura",
    "Jimmy Pr. / Rute Cardoso",
    "Jetro / Denise",
    "Jader / Valquíria",
    "Gilson / Andréia / Gilson Ferraz Jr.",
    "Gilson Pr / Zena Brito",
    "Gilmar Gravina",
    "Gilberto / Darlene Garcia",
    "Gigi - Carlos Prieto",
    "Geraldo Pierotti",
    "Ferelli / Gisele / Isabelle / Gabrielle",
    "Felipe Melo",
    "Estêvão / Marli",
    "Esdras",
    "Enildo Pr",
    "Edilson Pr. / Nelí Valiante",
    "Emerson / Meire Ellen / Théo Monteiro",
    "Elizeu / Janice",
    "Elisabete Silva",
    "Elisabeth",
    "Eládio / Neneca",
    "Eduardo Nascimento"
  ],

  // --- RODAPÉ ---
  rodape: "Deus te abençoe 🌹 🙏🔥🙏🔥🙏🔥🙏",
  versiculoReavivamento: "\"Um REAVIVAMENTO da verdadeira piedade entre nós, eis a maior e a mais urgente de todas as nossas necessidades.\" | \"Só podemos esperar um REAVIVAMENTO em resposta à oração.\" 1ME 121.1",

  // --- GRUPOS DE WHATSAPP ---
  grupos: [
    {
      nome: "Dos Amigos em Oração",
      link: "https://chat.whatsapp.com/",
      descricao: "Grupo principal de pedidos e intercessão"
    }
  ],

  // --- CONFIGURAÇÕES DO SITE ---
  config: {
    nomeGrupo: "Dos Amigos em Oração",
    senhaAdmin: "oracao2026",  // TROQUE ESSA SENHA!
    linkSite: "https://seu-site.netlify.app",  // Atualize após publicar
    mensagemWhatsApp: "\uD83D\uDE4F DOS AMIGOS EM ORAÇÃO — {DATA}\n\n\uD83D\uDE4FOração do Dia: {ORACAO}\n\n        POR: {ORADOR}\n\n         {REPRESENTACAO}\n\n\u25B6\uFE0F {LINK_YOUTUBE}\n\n\uD83D\uDCCB Segue a lista completa de pedidos e intercessões:\n\n\uD83D\uDD17ORE POR ELES - UM PRIVILÉGIO\n\n {LINK_SITE}\n\nOremos juntos uns pelos outros \uD83D\uDD25 \n\nPARTICIPE E DESFRUTE DESTA BÊNÇÃO DIARIAMENTE"
  }
};

// Exporta para uso nos outros arquivos
if (typeof module !== 'undefined') module.exports = SITE_DATA;
