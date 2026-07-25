import { useState, useEffect, useRef } from "react";

/**
 * Página de vendas — "Guia Anti Compulsão Emocional" (marca Korvyn)
 * React + Tailwind (classes core) + tokens de cor inline → cola direto no Lovable.
 * Cores calmas de saúde emocional. Responsivo desktop / tablet / mobile.
 * Links de checkout em placeholder: #checkout-basico / #checkout-completo
 */

const C = {
  paper: "#F6F2EB",
  paperAlt: "#EFE9DE",
  cream: "#FBF8F2",
  forest: "#33493C",
  forestDeep: "#26382D",
  sage: "#7E9384",
  sageSoft: "#DCE4DA",
  honey: "#C0894A",
  honeyDk: "#A5732F",
  clay: "#E7D6C7",
  ink: "#2B2E29",
  inkSoft: "#5D6259",
  line: "#E2DBCF",
};

const CHECKOUT_BASICO = "#checkout-basico";
const CHECKOUT_COMPLETO = "#checkout-completo";

function LeafMark({ size = 16, color = C.honey }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20 4C11 4 4 9 4 17c0 1 .3 2 .3 2s1-.3 2-.3C14 18 20 12 20 4Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M6 18C9 14 13 10 18 7" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function Eyebrow({ children, color = C.honey }) {
  return (
    <span
      className="inline-flex items-center gap-2 mb-4"
      style={{
        color,
        fontFamily: "'Nunito Sans', sans-serif",
        fontWeight: 700,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        fontSize: "0.72rem",
      }}
    >
      <LeafMark size={14} color={color} />
      {children}
    </span>
  );
}

function Reveal({ children, className = "", as: Tag = "div", delay = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.classList.add("kv-in");
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("kv-in");
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <Tag ref={ref} className={`kv-reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
}

function Stars() {
  return (
    <div className="flex gap-0.5" aria-label="5 de 5 estrelas">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={C.honey} aria-hidden="true">
          <path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7L12 2Z" />
        </svg>
      ))}
    </div>
  );
}

function Cta({ href, children, variant = "primary", full = false, small = false }) {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    fontFamily: "'Nunito Sans', sans-serif",
    fontWeight: 800,
    letterSpacing: "0.01em",
    borderRadius: "999px",
    textDecoration: "none",
    cursor: "pointer",
    transition: "transform .18s ease, box-shadow .18s ease, background-color .18s ease",
    textAlign: "center",
    lineHeight: 1.15,
    padding: small ? "0.85rem 1.5rem" : "1.15rem 2.1rem",
    fontSize: small ? "0.95rem" : "1.02rem",
    width: full ? "100%" : "auto",
  };
  const styles =
    variant === "primary"
      ? { ...base, backgroundColor: C.honey, color: "#fff", boxShadow: "0 10px 24px -10px rgba(165,115,47,.7)" }
      : { ...base, backgroundColor: "transparent", color: C.forest, border: `1.5px solid ${C.forest}` };
  return (
    <a
      href={href}
      className="kv-cta"
      style={styles}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        if (variant === "primary") e.currentTarget.style.backgroundColor = C.honeyDk;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "none";
        if (variant === "primary") e.currentTarget.style.backgroundColor = C.honey;
      }}
    >
      {children}
    </a>
  );
}

/* ---------- DADOS ---------- */

const depoimentos = [
  { nome: "Juliana M.", idade: 34, cidade: "São Paulo (SP)", texto: "Achei que fosse comprar só mais um ebook… mas foi a primeira vez que alguém explicou por que eu perdia totalmente o controle quando ficava ansiosa. Hoje consigo parar, respirar e pensar antes de atacar a geladeira." },
  { nome: "Fernanda R.", idade: 42, cidade: "Belo Horizonte (MG)", texto: "Eu vivia naquele ciclo de comer, sentir culpa e prometer que segunda-feira seria diferente. Depois de entender meus gatilhos, percebi que o problema nunca foi falta de disciplina. Só isso já tirou um peso enorme das minhas costas." },
  { nome: "Camila S.", idade: 29, cidade: "Curitiba (PR)", texto: "Os áudios do bônus viraram minha salvação. Quando bate aquela ansiedade à noite, coloco um deles e consigo diminuir muito a vontade de descontar tudo na comida." },
  { nome: "Patrícia A.", idade: 47, cidade: "Recife (PE)", texto: "O que mais gostei foi que não fala em dieta maluca. É um material muito humano. Você entende o que está acontecendo com você e aprende pequenas atitudes que realmente consegue colocar em prática." },
  { nome: "Daniela C.", idade: 38, cidade: "Porto Alegre (RS)", texto: "Sempre achei que eu era fraca. Depois de ler o guia, entendi que minha ansiedade comandava minhas escolhas. Hoje consigo reconhecer os sinais antes que o impulso fique enorme." },
  { nome: "Renata L.", idade: 36, cidade: "Goiânia (GO)", texto: "O Diário dos Gatilhos foi o que mais me surpreendeu. Nunca tinha percebido que eu comia quase sempre quando estava cansada ou preocupada. Hoje consigo identificar isso antes de abrir qualquer pacote." },
  { nome: "Aline P.", idade: 31, cidade: "Salvador (BA)", texto: "É um daqueles materiais que você consulta várias vezes. Não ficou esquecido na pasta de downloads. Sempre volto quando sinto que a ansiedade está aumentando." },
  { nome: "Simone T.", idade: 51, cidade: "Campinas (SP)", texto: "Pela primeira vez consegui olhar para mim sem aquela culpa constante. Ainda estou aprendendo, mas hoje sinto que tenho ferramentas para lidar com a ansiedade sem descontar tudo na comida." },
];

const etapas = [
  { n: 1, titulo: "Entenda por que você come mesmo sem estar com fome", itens: ["A diferença entre fome física e fome emocional", "Por que o comer por impulso acontece mesmo quando você sabe que não deveria", "Como a ansiedade interfere diretamente nas suas escolhas alimentares", "O ciclo que mantém milhares de mulheres presas entre ansiedade, compulsão, culpa e recomeços"], resultado: "Você deixará de acreditar que seu problema é falta de disciplina e finalmente compreenderá o que realmente está acontecendo com seu comportamento alimentar." },
  { n: 2, titulo: "Descubra os gatilhos que despertam sua fome emocional", itens: ["Como identificar os principais gatilhos emocionais", "O impacto da ansiedade, do estresse e do cansaço na alimentação", "Como reconhecer seus próprios padrões antes que o impulso apareça", "Exercícios simples para desenvolver mais consciência emocional"], resultado: "Você começará a perceber os sinais que antecedem a compulsão, criando espaço para fazer escolhas mais conscientes." },
  { n: 3, titulo: "Entenda por que a ansiedade dificulta o emagrecimento", itens: ["Por que é comum manter o foco durante o dia e perder o controle à noite", "Como a ansiedade influencia suas decisões sem que você perceba", "Por que a culpa alimenta novos episódios de compulsão", "Como dietas extremamente restritivas aumentam o risco de comer por impulso"], resultado: "Você compreenderá que cuidar da alimentação não depende apenas de controlar a comida, mas também de aprender a cuidar das emoções." },
  { n: 4, titulo: "Ferramentas para interromper o impulso antes que ele aconteça", itens: ["A técnica da Respiração SOS", "Como utilizar a Pausa Consciente nos momentos críticos", "Estratégias rápidas para reduzir a intensidade da ansiedade", "Ferramentas práticas para recuperar o controle antes de agir no automático"], resultado: "Você terá recursos simples para usar exatamente quando sentir que está prestes a descontar suas emoções na comida." },
  { n: 5, titulo: "Construa uma rotina que trabalha a seu favor", itens: ["Pequenos hábitos que ajudam a diminuir a ansiedade", "Como o sono influencia diretamente seu comportamento alimentar", "O papel da alimentação e do movimento no equilíbrio emocional", "Como criar uma rotina leve e consistente, sem cobranças excessivas"], resultado: "Você desenvolverá um ambiente mais favorável para cuidar das emoções e construir novos hábitos de forma natural." },
];

const beneficios = [
  { icon: "🌿", titulo: "Reconhecer fome física x fome emocional", texto: "Pare de confundir ansiedade com fome e identifique quando o corpo precisa de alimento e quando a emoção pede acolhimento." },
  { icon: "🧠", titulo: "Descobrir o que desperta a compulsão", texto: "Identifique os gatilhos emocionais que fazem você perder o controle e ganhe consciência antes que o impulso aconteça." },
  { icon: "💛", titulo: "Interromper o ciclo de culpa e recomeços", texto: "Entenda por que a culpa alimenta novos episódios e aprenda a quebrar esse ciclo de forma mais gentil consigo mesma." },
  { icon: "🌸", titulo: "Reduzir o impulso nos momentos de ansiedade", texto: "Técnicas simples, aplicáveis em poucos minutos, para diminuir a intensidade da vontade de comer por emoção." },
  { icon: "🌙", titulo: "Mais tranquilidade à noite", texto: "Se você costuma perder o controle principalmente à noite, terá ferramentas práticas para enfrentar esse momento com equilíbrio." },
  { icon: "🤍", titulo: "Uma relação mais saudável com o corpo", texto: "Substitua a autocrítica constante por compreensão, autocuidado e respeito ao seu próprio processo." },
];

const idealPara = [
  { titulo: "Controlar a ansiedade sem descontar na comida", texto: "Aprender formas mais saudáveis de lidar com as emoções, reduzindo o impulso sempre que a ansiedade, o estresse ou a preocupação aparecem." },
  { titulo: "Sair do ciclo de compulsão, culpa e recomeços", texto: "Cansada de prometer que começa de novo toda segunda-feira e querendo uma relação mais leve e consistente com a alimentação." },
  { titulo: "Entender por que perde o controle à noite", texto: "Você mantém o foco de dia, mas à noite sente que a disciplina desaparece. Descubra por que isso acontece e como mudar." },
  { titulo: "Cuidar da alimentação sem guerra com a comida", texto: "Não é seguir mais uma dieta restritiva, mas aprender a fazer escolhas equilibradas sem culpa, punição ou sensação de fracasso." },
  { titulo: "Reconhecer gatilhos antes da compulsão", texto: "Identificar situações, pensamentos ou emoções que despertam a fome emocional para agir antes que o impulso tome conta." },
  { titulo: "Reconstruir a confiança em si mesma", texto: "Mais do que o corpo, recuperar a confiança, desenvolver autocuidado e sentir que está novamente no controle das próprias escolhas." },
];

const bonus = [
  { tag: "Bônus 01", titulo: "SOS Ansiedade: 7 Áudios para o Momento do Impulso", desc: "Quando a ansiedade aperta e a vontade de comer parece incontrolável, você coloca um dos áudios e segue a condução. 7 práticas guiadas de 3 a 5 minutos, com respiração, ancoragem emocional e pausa consciente.", itens: ["Reduzir a ansiedade nos momentos mais difíceis", "Criar um espaço entre a emoção e a decisão de comer", "Recuperar o controle com exercícios simples e guiados"], valor: "R$ 39,00" },
  { tag: "Bônus 02", titulo: "Cardápio da Calma", desc: "Um material de consulta rápida com a lista organizada de alimentos que favorecem a regulação emocional e quais merecem mais atenção quando a ansiedade está elevada.", itens: ["Fazer escolhas mais conscientes no dia a dia", "Organizar suas refeições com mais tranquilidade", "Ter um guia rápido para consultar sempre que precisar"], valor: "R$ 59,00" },
  { tag: "Bônus 03", titulo: "Corpo Calmo: Rotina de 5 Minutos", desc: "Nem sempre você precisa de um treino intenso. Um guia ilustrado com alongamentos, mobilidade leve, respiração diafragmática e exercícios que favorecem o relaxamento do sistema nervoso.", itens: ["Rotina da manhã", "Rotina do período da noite", "Micro pausas para momentos de ansiedade no dia"], valor: "R$ 49,00" },
  { tag: "Bônus 04", titulo: "Diário dos Gatilhos da Fome Emocional", desc: "Você só muda um comportamento quando percebe seus padrões. Este diário guiado ajuda a registrar emoções, situações e pensamentos que despertam a fome emocional.", itens: ["Desenvolver mais autoconhecimento", "Identificar padrões emocionais", "Acompanhar sua evolução ao longo das semanas"], valor: "R$ 34,00" },
];

const faq = [
  { q: "O Guia é um livro ou um curso?", a: "É um ebook prático, feito para ser consultado sempre que você precisar. Além do conteúdo explicativo, reúne exercícios, checklists, protocolos rápidos e ferramentas de aplicação imediata para lidar com a fome emocional." },
  { q: "Isso realmente pode me ajudar se eu como por ansiedade?", a: "Sim. O guia foi criado justamente para mulheres que percebem que comem por impulso quando estão ansiosas, estressadas ou sobrecarregadas. Você aprende a identificar seus gatilhos e conhece estratégias práticas para agir antes do automático." },
  { q: "Substitui acompanhamento médico, psicológico ou nutricional?", a: "Não. O material tem caráter educativo e informativo e não substitui o acompanhamento de médicos, psicólogos, nutricionistas ou outros profissionais de saúde. Se você apresenta sintomas intensos ou persistentes, procure um profissional qualificado." },
  { q: "Em quanto tempo recebo o acesso?", a: "O acesso é liberado automaticamente após a confirmação do pagamento. Na maioria dos casos, em poucos minutos. Você recebe todas as instruções por e-mail." },
  { q: "Posso acessar pelo celular?", a: "Sim. Você acessa pelo celular, computador ou tablet, no momento e no lugar que preferir." },
  { q: "Preciso ter algum conhecimento na área?", a: "Não. O conteúdo é escrito em linguagem simples e acolhedora, pensado para qualquer mulher que queira entender melhor sua relação com a ansiedade e a alimentação." },
  { q: "O que está incluído no Plano Completo?", a: "Além do Guia: SOS Ansiedade (7 áudios), Cardápio da Calma, Corpo Calmo (rotina de 5 minutos) e Diário dos Gatilhos da Fome Emocional. É a opção com o melhor custo-benefício." },
  { q: "E se eu perceber que não é para mim?", a: "Você está protegida pela garantia. Basta solicitar o reembolso dentro do prazo e devolvemos 100% do valor pago, sem burocracia." },
  { q: "Esse guia promete emagrecimento?", a: "Não. O objetivo é ajudar você a compreender a relação entre ansiedade, fome emocional e comportamento alimentar, com estratégias para uma relação mais consciente com a comida. Mudanças de hábito podem favorecer o emagrecimento, mas ele não é prometido como resultado garantido." },
];

/* ---------- SEÇÕES ---------- */

function FloatingCta({ visible }) {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden px-4 pb-4 pt-3"
      style={{
        background: "linear-gradient(to top, rgba(38,56,45,.96), rgba(38,56,45,.75) 70%, transparent)",
        transform: visible ? "translateY(0)" : "translateY(120%)",
        transition: "transform .35s ease",
      }}
    >
      <Cta href={CHECKOUT_COMPLETO} variant="primary" full small>
        QUERO O PLANO COMPLETO →
      </Cta>
    </div>
  );
}

function Hero() {
  return (
    <header
      className="relative overflow-hidden px-5 pt-14 pb-20 md:pt-20 md:pb-28"
      style={{ backgroundColor: C.forest, color: C.cream }}
    >
      <div
        className="kv-breathe pointer-events-none absolute -top-24 -right-24 rounded-full"
        style={{ width: 420, height: 420, background: `radial-gradient(circle, ${C.sage}55 0%, transparent 70%)` }}
        aria-hidden="true"
      />
      <div
        className="kv-breathe-slow pointer-events-none absolute bottom-0 -left-32 rounded-full"
        style={{ width: 360, height: 360, background: `radial-gradient(circle, ${C.honey}33 0%, transparent 70%)` }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-3xl text-center">
        <Eyebrow color={C.honey}>Guia Anti Compulsão Emocional</Eyebrow>
        <h1
          className="mx-auto"
          style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, lineHeight: 1.08, fontSize: "clamp(2rem, 6vw, 3.4rem)", letterSpacing: "-0.01em" }}
        >
          Pare de lutar contra a comida como se o problema fosse{" "}
          <em style={{ color: C.honey, fontStyle: "italic" }}>falta de força de vontade!</em>
        </h1>
        <p
          className="mx-auto mt-6"
          style={{ maxWidth: "40rem", fontFamily: "'Nunito Sans', sans-serif", fontSize: "clamp(1.05rem, 2.4vw, 1.25rem)", lineHeight: 1.6, color: "#E9E3D6" }}
        >
          Descubra como a ansiedade desperta a fome emocional e aprenda a interromper o impulso
          antes que ele vire culpa — recuperando o controle da alimentação com mais consciência e leveza.
        </p>
        <div className="mt-9 flex flex-col items-center gap-3">
          <Cta href={CHECKOUT_COMPLETO} variant="primary">
            QUERO RECUPERAR O CONTROLE AGORA
          </Cta>
          <span style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: ".85rem", color: "#CBD3C6" }}>
            ✓ Acesso imediato após a confirmação do pagamento
          </span>
        </div>
      </div>
    </header>
  );
}

function Reconhece() {
  const paras = [
    "Você passa o dia inteiro tentando fazer tudo “certo”. Segue a dieta, controla as refeições e acredita que, desta vez, vai conseguir.",
    "Mas basta um dia mais estressante, uma preocupação ou alguns minutos de ansiedade para surgir aquela vontade quase incontrolável de comer. E, quando percebe, já aconteceu.",
    "Depois vem a culpa. A promessa de recomeçar. E a sensação de que falta alguma coisa dentro de você.",
  ];
  return (
    <section className="px-5 py-16 md:py-24" style={{ backgroundColor: C.paper }}>
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <Eyebrow>Talvez você se reconheça nisso</Eyebrow>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: "clamp(1.6rem,4vw,2.3rem)", lineHeight: 1.15, color: C.forest }}>
            Na maioria das vezes, o problema não é a comida — nem falta de disciplina.
          </h2>
        </Reveal>
        <div className="mt-6 space-y-5">
          {paras.map((p, i) => (
            <Reveal key={i} delay={i * 60}>
              <p style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "1.1rem", lineHeight: 1.7, color: C.inkSoft }}>{p}</p>
            </Reveal>
          ))}
          <Reveal delay={180}>
            <p style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "1.15rem", lineHeight: 1.7, color: C.ink, fontWeight: 700 }}>
              O que muitas mulheres nunca aprenderam é como a ansiedade influencia as emoções,
              altera as escolhas alimentares e alimenta um ciclo que parece impossível de quebrar.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <p style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "1.1rem", lineHeight: 1.7, color: C.inkSoft }}>
              É exatamente aqui que o <strong style={{ color: C.forest }}>Guia Anti Compulsão Emocional</strong> entra:
              para você entender esse processo e aplicar estratégias simples justamente nos momentos em que o impulso aparece.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ProvaSocial() {
  return (
    <section className="px-5 py-16 md:py-24" style={{ backgroundColor: C.forest }}>
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center">
          <Eyebrow color={C.honey}>Quem já aplicou</Eyebrow>
          <h2 className="mx-auto" style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: "clamp(1.6rem,4vw,2.3rem)", lineHeight: 1.15, color: C.cream, maxWidth: "34rem" }}>
            O problema nunca foi falta de força de vontade
          </h2>
          <p className="mx-auto mt-4" style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "1.05rem", color: "#CBD3C6", maxWidth: "32rem" }}>
            Veja o que algumas leitoras contaram depois de aplicar as estratégias do guia.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {depoimentos.map((d, i) => (
            <Reveal key={i} delay={(i % 3) * 70}>
              <figure
                className="h-full rounded-2xl p-6"
                style={{ backgroundColor: C.cream, boxShadow: "0 18px 40px -28px rgba(0,0,0,.55)" }}
              >
                <Stars />
                <blockquote className="mt-3" style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "1rem", lineHeight: 1.6, color: C.ink }}>
                  “{d.texto}”
                </blockquote>
                <figcaption className="mt-4 flex items-center gap-3">
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-full"
                    style={{ backgroundColor: C.sageSoft, color: C.forest, fontFamily: "'Fraunces', serif", fontWeight: 600 }}
                  >
                    {d.nome.charAt(0)}
                  </span>
                  <span style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: ".9rem", color: C.inkSoft }}>
                    <strong style={{ color: C.forest, display: "block" }}>{d.nome}, {d.idade}</strong>
                    {d.cidade}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Demonstrativo() {
  const recursos = ["Linguagem simples e acolhedora", "Quadros-resumo para revisar rápido", "Checklists para identificar gatilhos", "Exercícios de aplicação imediata", "Protocolos de autorregulação", "Páginas preenchíveis de evolução"];
  return (
    <section className="px-5 py-16 md:py-24" style={{ backgroundColor: C.paper }}>
      <div className="mx-auto max-w-5xl">
        <Reveal className="text-center">
          <Eyebrow>Muito mais que um ebook</Eyebrow>
          <h2 className="mx-auto" style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: "clamp(1.7rem,4.2vw,2.5rem)", lineHeight: 1.13, color: C.forest, maxWidth: "38rem" }}>
            Uma ferramenta prática para usar exatamente quando a ansiedade aparecer
          </h2>
          <p className="mx-auto mt-5" style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "1.1rem", lineHeight: 1.6, color: C.inkSoft, maxWidth: "36rem" }}>
            Em vez de páginas cheias de teoria, recursos objetivos que você consulta sempre que precisar —
            sem ler tudo de uma vez.
          </p>
        </Reveal>

        <Reveal className="mt-10">
          <div className="grid gap-3 sm:grid-cols-2">
            {recursos.map((r, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl px-5 py-4" style={{ backgroundColor: C.cream, border: `1px solid ${C.line}` }}>
                <span style={{ color: C.honey, fontWeight: 800 }}>✓</span>
                <span style={{ fontFamily: "'Nunito Sans', sans-serif", color: C.ink, fontSize: "1rem" }}>{r}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-14 text-center">
          <h3 style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: "clamp(1.4rem,3.4vw,1.9rem)", color: C.forest }}>
            O guia é organizado em 5 etapas
          </h3>
        </Reveal>
        <div className="mt-8 space-y-4">
          {etapas.map((e, i) => (
            <Reveal key={e.n} delay={i * 40}>
              <div className="flex items-start gap-4 rounded-2xl p-5 md:p-6" style={{ backgroundColor: C.cream, border: `1px solid ${C.line}` }}>
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: C.sageSoft, color: C.forest, fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: "1.15rem" }}
                >
                  {e.n}
                </span>
                <p style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "1.08rem", lineHeight: 1.5, color: C.ink, fontWeight: 600, paddingTop: "0.4rem" }}>
                  {e.titulo}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Beneficios() {
  return (
    <section className="px-5 py-16 md:py-24" style={{ backgroundColor: C.paperAlt }}>
      <div className="mx-auto max-w-5xl">
        <Reveal className="text-center">
          <Eyebrow>O que muda pra você</Eyebrow>
          <h2 className="mx-auto" style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: "clamp(1.7rem,4.2vw,2.5rem)", lineHeight: 1.13, color: C.forest, maxWidth: "36rem" }}>
            Imagine viver sem sentir que a comida controla suas emoções
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {beneficios.map((b, i) => (
            <Reveal key={i} delay={(i % 3) * 70}>
              <div className="h-full rounded-2xl p-6" style={{ backgroundColor: C.cream, border: `1px solid ${C.line}` }}>
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full" style={{ backgroundColor: C.sageSoft, fontSize: "1.4rem" }}>
                  {b.icon}
                </div>
                <h3 style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: "1.2rem", lineHeight: 1.25, color: C.forest }}>{b.titulo}</h3>
                <p className="mt-2" style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: ".98rem", lineHeight: 1.6, color: C.inkSoft }}>{b.texto}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Urgencia() {
  return (
    <section className="px-5 py-20 md:py-28" style={{ backgroundColor: C.forestDeep, color: C.cream }}>
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: "clamp(1.7rem,4.5vw,2.6rem)", lineHeight: 1.18 }}>
            Quantas vezes mais você vai prometer que <em style={{ color: C.honey }}>“segunda-feira eu começo”</em>{" "}
            enquanto a ansiedade continua decidindo por você?
          </h2>
          <p className="mx-auto mt-6" style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "1.1rem", lineHeight: 1.65, color: "#D6DCCF", maxWidth: "34rem" }}>
            Você não precisa esperar sentir mais força de vontade. Você precisa das ferramentas certas
            para agir quando a ansiedade aparecer — e é exatamente isso que está dentro do guia.
          </p>
          <div className="mt-9 flex justify-center">
            <Cta href={CHECKOUT_COMPLETO} variant="primary">QUERO RECUPERAR O CONTROLE AGORA</Cta>
          </div>
          <p className="mt-4" style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: ".85rem", color: "#B9C2B3" }}>
            ✓ Acesso imediato após a confirmação do pagamento
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function IdealPara() {
  return (
    <section className="px-5 py-16 md:py-24" style={{ backgroundColor: C.paper }}>
      <div className="mx-auto max-w-5xl">
        <Reveal className="text-center">
          <Eyebrow>É pra você?</Eyebrow>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: "clamp(1.7rem,4.2vw,2.4rem)", color: C.forest }}>
            Este guia foi feito para você que deseja…
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {idealPara.map((it, i) => (
            <Reveal key={i} delay={(i % 2) * 60}>
              <div className="flex h-full gap-4 rounded-2xl p-6" style={{ backgroundColor: C.cream, border: `1px solid ${C.line}` }}>
                <LeafMark size={22} color={C.honey} />
                <div>
                  <h3 style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: "1.15rem", lineHeight: 1.3, color: C.forest }}>{it.titulo}</h3>
                  <p className="mt-2" style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: ".98rem", lineHeight: 1.6, color: C.inkSoft }}>{it.texto}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TudoQueRecebe() {
  return (
    <section className="px-5 py-16 md:py-24" style={{ backgroundColor: C.paperAlt }}>
      <div className="mx-auto max-w-4xl">
        <Reveal className="text-center">
          <Eyebrow>Conteúdo completo</Eyebrow>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: "clamp(1.7rem,4.2vw,2.5rem)", color: C.forest }}>
            Tudo o que você vai receber
          </h2>
          <p className="mx-auto mt-4" style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "1.08rem", lineHeight: 1.6, color: C.inkSoft, maxWidth: "38rem" }}>
            Cada etapa foi organizada para você avançar de forma simples, prática e aplicável ao seu dia a dia.
          </p>
        </Reveal>

        <div className="mt-10 space-y-5">
          {etapas.map((e, i) => (
            <Reveal key={e.n} delay={i * 40}>
              <div className="rounded-2xl p-6 md:p-8" style={{ backgroundColor: C.cream, border: `1px solid ${C.line}` }}>
                <div className="flex items-center gap-3">
                  <span style={{ fontFamily: "'Nunito Sans', sans-serif", fontWeight: 800, letterSpacing: ".16em", fontSize: ".72rem", textTransform: "uppercase", color: C.honey }}>
                    Etapa {e.n}
                  </span>
                </div>
                <h3 className="mt-2" style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: "clamp(1.25rem,3vw,1.5rem)", lineHeight: 1.22, color: C.forest }}>
                  {e.titulo}
                </h3>
                <ul className="mt-4 space-y-2">
                  {e.itens.map((it, j) => (
                    <li key={j} className="flex gap-3" style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "1rem", lineHeight: 1.55, color: C.ink }}>
                      <span style={{ color: C.sage, fontWeight: 800 }}>✓</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 rounded-xl px-4 py-3" style={{ backgroundColor: C.sageSoft }}>
                  <p style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: ".95rem", lineHeight: 1.5, color: C.forest }}>
                    <strong>Resultado:</strong> {e.resultado}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8">
          <div className="rounded-2xl p-6 md:p-8" style={{ backgroundColor: C.forest, color: C.cream }}>
            <p style={{ fontFamily: "'Fraunces', serif", fontSize: "1.2rem", fontWeight: 600 }}>E ainda, para transformar conhecimento em ação:</p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {["Checklists", "Exercícios rápidos", "Quadros-resumo", "Espaços para anotações", "Ferramentas de consulta rápida", "Páginas preenchíveis"].map((x, i) => (
                <span key={i} className="flex items-center gap-2" style={{ fontFamily: "'Nunito Sans', sans-serif", color: "#E4E9DE" }}>
                  <span style={{ color: C.honey }}>✓</span> {x}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Bonus() {
  return (
    <section className="px-5 py-16 md:py-24" style={{ backgroundColor: C.paper }}>
      <div className="mx-auto max-w-5xl">
        <Reveal className="text-center">
          <Eyebrow>Presentes exclusivos</Eyebrow>
          <h2 className="mx-auto" style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: "clamp(1.7rem,4.2vw,2.5rem)", color: C.forest, maxWidth: "36rem" }}>
            No Plano Completo você também leva 4 bônus
          </h2>
          <p className="mx-auto mt-4" style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "1.05rem", color: C.inkSoft, maxWidth: "34rem" }}>
            Criados para ajudar exatamente nos momentos em que a ansiedade costuma falar mais alto.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {bonus.map((b, i) => (
            <Reveal key={i} delay={(i % 2) * 70}>
              <div className="flex h-full flex-col rounded-2xl p-6 md:p-7" style={{ backgroundColor: C.cream, border: `1px solid ${C.line}`, boxShadow: "0 16px 36px -30px rgba(0,0,0,.4)" }}>
                <div className="flex items-center justify-between">
                  <span className="rounded-full px-3 py-1" style={{ backgroundColor: C.sageSoft, color: C.forest, fontFamily: "'Nunito Sans', sans-serif", fontWeight: 800, fontSize: ".7rem", letterSpacing: ".12em", textTransform: "uppercase" }}>
                    {b.tag}
                  </span>
                  <span style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: ".85rem", color: C.inkSoft, textDecoration: "line-through" }}>{b.valor}</span>
                </div>
                <h3 className="mt-4" style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: "1.3rem", lineHeight: 1.22, color: C.forest }}>{b.titulo}</h3>
                <p className="mt-3" style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: ".98rem", lineHeight: 1.6, color: C.inkSoft }}>{b.desc}</p>
                <ul className="mt-4 space-y-2">
                  {b.itens.map((it, j) => (
                    <li key={j} className="flex gap-2" style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: ".95rem", color: C.ink }}>
                      <span style={{ color: C.honey, fontWeight: 800 }}>✓</span> {it}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function PlanCard({ recomendado, nome, itens, de, por, cta, href }) {
  return (
    <div
      className="relative flex h-full flex-col rounded-3xl p-7 md:p-8"
      style={{
        backgroundColor: recomendado ? C.forest : C.cream,
        color: recomendado ? C.cream : C.ink,
        border: recomendado ? "none" : `1px solid ${C.line}`,
        boxShadow: recomendado ? "0 30px 60px -30px rgba(38,56,45,.75)" : "0 14px 34px -28px rgba(0,0,0,.35)",
        transform: recomendado ? "scale(1)" : "scale(1)",
      }}
    >
      {recomendado && (
        <span
          className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1"
          style={{ backgroundColor: C.honey, color: "#fff", fontFamily: "'Nunito Sans', sans-serif", fontWeight: 800, fontSize: ".72rem", letterSpacing: ".12em", textTransform: "uppercase", whiteSpace: "nowrap" }}
        >
          ⭐ Mais escolhido
        </span>
      )}
      <h3 style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: "1.5rem", color: recomendado ? C.cream : C.forest }}>{nome}</h3>
      <ul className="mt-5 space-y-2.5 flex-1">
        {itens.map((it, j) => (
          <li key={j} className="flex gap-2.5" style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: ".98rem", lineHeight: 1.45, color: recomendado ? "#E4E9DE" : C.ink }}>
            <span style={{ color: C.honey, fontWeight: 800 }}>✓</span> {it}
          </li>
        ))}
      </ul>
      <div className="mt-6">
        {de && (
          <p style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: ".9rem", color: recomendado ? "#B9C2B3" : C.inkSoft }}>
            {recomendado ? "Valor dos materiais: " : "De "}
            <span style={{ textDecoration: "line-through" }}>{de}</span>
          </p>
        )}
        <p className="mt-1 flex items-baseline gap-2">
          <span style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: ".9rem", color: recomendado ? "#B9C2B3" : C.inkSoft }}>
            {recomendado ? "hoje por" : "por apenas"}
          </span>
          <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: "2.4rem", color: recomendado ? C.honey : C.forest, lineHeight: 1 }}>{por}</span>
        </p>
        <p style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: ".82rem", color: recomendado ? "#B9C2B3" : C.inkSoft }}>pagamento único</p>
      </div>
      <div className="mt-6">
        <Cta href={href} variant={recomendado ? "primary" : "secondary"} full>{cta}</Cta>
      </div>
    </div>
  );
}

function Oferta() {
  const linhas = [
    ["Guia Anti Compulsão Emocional", true, true],
    ["SOS Ansiedade (7 áudios)", false, true],
    ["Cardápio da Calma", false, true],
    ["Corpo Calmo — Rotina de 5 min", false, true],
    ["Diário dos Gatilhos", false, true],
  ];
  return (
    <section id="oferta" className="px-5 py-16 md:py-24" style={{ backgroundColor: C.paperAlt }}>
      <div className="mx-auto max-w-5xl">
        <Reveal className="text-center">
          <Eyebrow>Sua oferta de hoje</Eyebrow>
          <h2 className="mx-auto" style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: "clamp(1.7rem,4.2vw,2.5rem)", color: C.forest, maxWidth: "36rem", lineHeight: 1.13 }}>
            Escolha como começar hoje a recuperar o controle
          </h2>
          <p className="mx-auto mt-4" style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "1.05rem", color: C.inkSoft, maxWidth: "34rem" }}>
            Todo o material do Plano Completo somaria <strong style={{ color: C.forest }}>R$ 200,90</strong>. Hoje você não paga nem perto disso.
          </p>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-3xl gap-6 md:grid-cols-2 md:items-stretch">
          <Reveal>
            <PlanCard
              nome="Plano Básico"
              itens={["Guia Anti Compulsão Emocional completo"]}
              de="R$ 79,00"
              por="R$ 19,90"
              cta="QUERO COMEÇAR"
              href={CHECKOUT_BASICO}
            />
          </Reveal>
          <Reveal delay={80}>
            <PlanCard
              recomendado
              nome="Plano Completo"
              itens={["Guia Anti Compulsão Emocional", "Bônus 1 — SOS Ansiedade (7 áudios)", "Bônus 2 — Cardápio da Calma", "Bônus 3 — Corpo Calmo (rotina de 5 min)", "Bônus 4 — Diário dos Gatilhos"]}
              de="R$ 200,90"
              por="R$ 27,90"
              cta="QUERO O PLANO COMPLETO"
              href={CHECKOUT_COMPLETO}
            />
          </Reveal>
        </div>

        <Reveal className="mx-auto mt-6 max-w-2xl text-center">
          <p className="rounded-xl px-5 py-4" style={{ backgroundColor: C.sageSoft, fontFamily: "'Nunito Sans', sans-serif", fontSize: "1rem", lineHeight: 1.55, color: C.forest }}>
            Por apenas <strong>R$ 8,00 a mais</strong>, você leva todos os bônus criados para os momentos em que a ansiedade aparece.
            É por isso que a maioria escolhe o Plano Completo.
          </p>
        </Reveal>

        {/* Comparativo */}
        <Reveal className="mx-auto mt-10 max-w-2xl">
          <div className="overflow-hidden rounded-2xl" style={{ border: `1px solid ${C.line}` }}>
            <table className="w-full border-collapse" style={{ fontFamily: "'Nunito Sans', sans-serif" }}>
              <thead>
                <tr style={{ backgroundColor: C.forest, color: C.cream }}>
                  <th className="p-3 text-left" style={{ fontSize: ".9rem", fontWeight: 700 }}>Incluso</th>
                  <th className="p-3 text-center" style={{ fontSize: ".85rem", fontWeight: 700 }}>Básico</th>
                  <th className="p-3 text-center" style={{ fontSize: ".85rem", fontWeight: 700, color: C.honey }}>Completo</th>
                </tr>
              </thead>
              <tbody>
                {linhas.map(([nome, b, c], i) => (
                  <tr key={i} style={{ backgroundColor: i % 2 ? C.paper : C.cream }}>
                    <td className="p-3" style={{ fontSize: ".9rem", color: C.ink }}>{nome}</td>
                    <td className="p-3 text-center" style={{ color: b ? C.sage : "#C9BFB0", fontWeight: 800 }}>{b ? "✓" : "—"}</td>
                    <td className="p-3 text-center" style={{ color: c ? C.honey : "#C9BFB0", fontWeight: 800 }}>{c ? "✓" : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Garantia() {
  return (
    <section className="px-5 py-16 md:py-24" style={{ backgroundColor: C.paper }}>
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <div className="rounded-3xl p-8 md:p-10 text-center" style={{ backgroundColor: C.cream, border: `1.5px solid ${C.honey}55` }}>
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full" style={{ backgroundColor: C.sageSoft, fontSize: "1.8rem" }}>🛡️</div>
            <Eyebrow>Risco zero</Eyebrow>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: "clamp(1.5rem,4vw,2.1rem)", color: C.forest, lineHeight: 1.15 }}>
              Garantia incondicional de 7 dias
            </h2>
            <p className="mt-4" style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "1.08rem", lineHeight: 1.65, color: C.inkSoft }}>
              Você tem 7 dias de garantia, conforme o Código de Defesa do Consumidor. Acesse todo o conteúdo, conheça o material
              e avalie com calma. Se perceber que não é para você, devolvemos <strong style={{ color: C.forest }}>100% do valor</strong>, sem complicação.
            </p>
            <p className="mt-5" style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "1rem", color: C.ink, fontWeight: 700 }}>
              O risco é totalmente nosso. Você decide com total tranquilidade.
            </p>
            <div className="mt-7 flex justify-center">
              <Cta href={CHECKOUT_COMPLETO} variant="primary">QUERO COMEÇAR COM GARANTIA</Cta>
            </div>
            <p className="mt-4" style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: ".82rem", color: C.inkSoft }}>
              🔒 Compra segura • Garantia de 7 dias • Acesso imediato
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ComoAcessa() {
  const passos = [
    { t: "Finalize com segurança", d: "Escolha o plano, preencha seus dados e conclua o pagamento em ambiente seguro. Pix, cartão de crédito e outros meios disponíveis." },
    { t: "Receba o acesso na hora", d: "Após a confirmação do pagamento, você recebe um e-mail com todas as instruções. Com Pix ou cartão, a liberação costuma ser em minutos." },
    { t: "Abra em qualquer aparelho", d: "Acesse pelo celular, computador ou tablet. Leia no seu ritmo e use as ferramentas nos momentos em que a ansiedade aumentar." },
    { t: "Comece a aplicar no mesmo dia", d: "Logo nas primeiras páginas há exercícios e estratégias que você já coloca em prática para interromper o impulso." },
  ];
  return (
    <section className="px-5 py-16 md:py-24" style={{ backgroundColor: C.forest, color: C.cream }}>
      <div className="mx-auto max-w-4xl">
        <Reveal className="text-center">
          <Eyebrow color={C.honey}>Simples e rápido</Eyebrow>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: "clamp(1.7rem,4.2vw,2.4rem)", color: C.cream }}>
            Seu acesso em poucos minutos
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {passos.map((p, i) => (
            <Reveal key={i} delay={(i % 2) * 60}>
              <div className="flex h-full gap-4 rounded-2xl p-6" style={{ backgroundColor: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)" }}>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: C.honey, color: "#fff", fontFamily: "'Fraunces', serif", fontWeight: 600 }}>{i + 1}</span>
                <div>
                  <h3 style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: "1.15rem", color: C.cream }}>{p.t}</h3>
                  <p className="mt-1.5" style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: ".95rem", lineHeight: 1.55, color: "#CBD3C6" }}>{p.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Autoridade() {
  return (
    <section className="px-5 py-16 md:py-24" style={{ backgroundColor: C.paperAlt }}>
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <Eyebrow>Quem desenvolveu</Eyebrow>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: "clamp(1.6rem,4vw,2.2rem)", color: C.forest, lineHeight: 1.15 }}>
            Feito por quem entende a relação entre ansiedade, emoções e alimentação
          </h2>
          <div className="mt-6 space-y-4" style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "1.08rem", lineHeight: 1.7, color: C.inkSoft }}>
            <p>Durante anos, acompanhei a mesma realidade se repetir: mulheres inteligentes, determinadas e cheias de vontade de mudar — mas que terminavam o dia acreditando que o problema era falta de disciplina.</p>
            <p>Na prática, não era. Por trás do comportamento havia emoções mal compreendidas, ansiedade acumulada e um ciclo de culpa que fazia tudo recomeçar.</p>
            <p>Quase ninguém ensinava como lidar com a ansiedade que desperta o impulso de comer. Foi por isso que criei o <strong style={{ color: C.forest }}>Guia Anti Compulsão Emocional</strong>: para transformar informação complexa em estratégias simples, práticas e acolhedoras.</p>
            <p style={{ color: C.ink, fontWeight: 600 }}>Ninguém deveria viver acreditando que a culpa define quem é. Você merece entender suas emoções e cuidar de si com respeito, equilíbrio e gentileza.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FaqItem({ item, open, onClick }) {
  return (
    <div className="rounded-2xl" style={{ backgroundColor: C.cream, border: `1px solid ${C.line}` }}>
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between gap-4 p-5 text-left"
        style={{ background: "transparent", border: "none", cursor: "pointer" }}
        aria-expanded={open}
      >
        <span style={{ fontFamily: "'Nunito Sans', sans-serif", fontWeight: 700, fontSize: "1.02rem", color: C.forest }}>{item.q}</span>
        <span style={{ color: C.honey, fontSize: "1.4rem", lineHeight: 1, transform: open ? "rotate(45deg)" : "none", transition: "transform .2s ease" }}>+</span>
      </button>
      <div style={{ maxHeight: open ? 400 : 0, overflow: "hidden", transition: "max-height .3s ease" }}>
        <p className="px-5 pb-5" style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "1rem", lineHeight: 1.6, color: C.inkSoft }}>{item.a}</p>
      </div>
    </div>
  );
}

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="px-5 py-16 md:py-24" style={{ backgroundColor: C.paper }}>
      <div className="mx-auto max-w-2xl">
        <Reveal className="text-center">
          <Eyebrow>Ainda com dúvidas?</Eyebrow>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: "clamp(1.7rem,4.2vw,2.4rem)", color: C.forest }}>
            Perguntas frequentes
          </h2>
        </Reveal>
        <div className="mt-8 space-y-3">
          {faq.map((item, i) => (
            <Reveal key={i} delay={(i % 4) * 30}>
              <FaqItem item={item} open={open === i} onClick={() => setOpen(open === i ? -1 : i)} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <p className="mx-auto mb-6" style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "1.08rem", lineHeight: 1.65, color: C.inkSoft, maxWidth: "34rem" }}>
            Talvez você tenha chegado até aqui cansada de recomeçar e de sentir culpa. Agora você sabe que existe um caminho diferente.
          </p>
          <Cta href={CHECKOUT_COMPLETO} variant="primary">SIM! QUERO RECUPERAR O CONTROLE</Cta>
          <p className="mt-4" style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: ".82rem", color: C.inkSoft }}>
            🔒 Compra 100% segura • Garantia de 7 dias • Acesso imediato
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Rodape() {
  return (
    <footer className="px-5 py-14" style={{ backgroundColor: C.forestDeep, color: "#CBD3C6" }}>
      <div className="mx-auto max-w-3xl text-center">
        <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: "1.5rem", color: C.cream }}>Korvyn</span>
        <p className="mx-auto mt-4" style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "1rem", lineHeight: 1.6, maxWidth: "38rem" }}>
          O <strong style={{ color: C.cream }}>Guia Anti Compulsão Emocional</strong> ajuda mulheres a compreender a relação entre ansiedade,
          fome emocional e comportamento alimentar. Pequenas mudanças consistentes costumam gerar resultados mais duradouros do que soluções extremas.
        </p>

        <div className="mx-auto my-8 h-px w-full max-w-md" style={{ backgroundColor: "rgba(255,255,255,.12)" }} />

        <p style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: ".82rem", lineHeight: 1.6, color: "#A6B0A2" }}>
          <strong style={{ color: "#CBD3C6" }}>Aviso legal:</strong> material com finalidade exclusivamente educativa e informativa.
          Não substitui consultas, diagnósticos ou tratamentos de médicos, psicólogos, nutricionistas ou outros profissionais da saúde.
          Em caso de sintomas persistentes, procure acompanhamento profissional.
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-1" style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: ".8rem", color: "#A6B0A2" }}>
          <span>🔒 Pagamento seguro</span>
          <span>✅ Acesso imediato</span>
          <span>🛡️ Garantia de 7 dias</span>
        </div>
        <p className="mt-8" style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: ".75rem", color: "#8A958697" }}>
          © 2026 Korvyn — Guia Anti Compulsão Emocional. Todos os direitos reservados. Reprodução não autorizada, no todo ou em parte,
          constitui violação dos direitos autorais (Lei nº 9.610/98).
        </p>
      </div>
    </footer>
  );
}

export default function PaginaVendas() {
  const [showFloat, setShowFloat] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowFloat(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ backgroundColor: C.paper }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,400;1,9..144,600&family=Nunito+Sans:ital,opsz,wght@0,6..12,400;0,6..12,600;0,6..12,700;0,6..12,800&display=swap');
        * { box-sizing: border-box; }
        .kv-reveal { opacity: 0; transform: translateY(20px); transition: opacity .7s ease, transform .7s ease; }
        .kv-reveal.kv-in { opacity: 1; transform: none; }
        .kv-breathe { animation: kvBreathe 9s ease-in-out infinite; }
        .kv-breathe-slow { animation: kvBreathe 12s ease-in-out infinite; }
        @keyframes kvBreathe {
          0%,100% { transform: scale(1); opacity: .85; }
          50% { transform: scale(1.12); opacity: 1; }
        }
        .kv-cta:focus-visible { outline: 3px solid ${C.honey}; outline-offset: 3px; }
        @media (prefers-reduced-motion: reduce) {
          .kv-reveal { opacity: 1 !important; transform: none !important; transition: none !important; }
          .kv-breathe, .kv-breathe-slow { animation: none !important; }
        }
      `}</style>

      <Hero />
      <Reconhece />
      <ProvaSocial />
      <Demonstrativo />
      <Beneficios />
      <Urgencia />
      <IdealPara />
      <TudoQueRecebe />
      <Bonus />
      <Oferta />
      <Garantia />
      <ComoAcessa />
      <Autoridade />
      <Faq />
      <Rodape />

      <FloatingCta visible={showFloat} />
    </div>
  );
}
