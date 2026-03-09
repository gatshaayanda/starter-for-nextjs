import { NextResponse } from "next/server";

type BotResponse = { reply: string; suggestions?: string[] };

const LINKS = {
  docs: "https://appwrite.io/docs",
  console: "https://cloud.appwrite.io",
  pricing: "https://appwrite.io/pricing",
  github: "https://github.com/appwrite",
};

const SUGG = {
  WHY_APPWRITE: "Why Appwrite?",
  FEATURES: "Core features",
  AUTH: "Authentication",
  DATABASE: "Database & storage",
  OPEN_SOURCE: "Open source",
  PRICING: "Pricing",
  DOCS: "Read docs",
  CONSOLE: "Open console",
  GITHUB: "GitHub",
} as const;

const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

const reply = (text: string, suggestions?: string[]): BotResponse => ({
  reply: text.trim(),
  suggestions,
});

const normalize = (s: unknown): string =>
  String(s ?? "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

const includesAny = (s: string, pats: (string | RegExp)[]) =>
  pats.some((p) => (p instanceof RegExp ? p.test(s) : s.includes(p)));

let memory: { greeted?: boolean; lastIntent?: string } = {};

const tone = {
  greet: [
    "Hi 👋 I’m the Appwrite demo assistant.",
    "Hello 👋 I can help you quickly understand why developers choose Appwrite.",
    "Welcome 👋 Ask me about Appwrite’s features, developer experience, or why it stands out.",
  ],
  why: [
    "Appwrite is compelling because it gives developers core backend building blocks like authentication, databases, storage, and server-side capabilities without forcing them to build that infrastructure from scratch.",
    "A big reason developers like Appwrite is that it reduces backend setup friction while still giving teams meaningful control over how they build and ship products.",
  ],
  features: [
    "Appwrite gives developers a strong backend foundation with authentication, databases, storage, and other product-ready services.",
    "Its appeal comes from bundling common backend needs into a developer-first platform so teams can move faster.",
  ],
  auth: [
    "Authentication is one of Appwrite’s strongest value points because it helps teams add user access flows faster instead of building auth manually from zero.",
    "Appwrite helps streamline authentication so developers can focus more on product quality and less on repetitive setup.",
  ],
  database: [
    "Appwrite is attractive for app builders because it combines backend structure with useful data and storage capabilities in one platform.",
    "Database and storage support make Appwrite practical for real-world apps, not just demos.",
  ],
  openSource: [
    "Its open-source nature is a major advantage because it gives teams more visibility, flexibility, and long-term control over their stack.",
    "Open source makes Appwrite especially appealing for teams that want more ownership over platform decisions.",
  ],
  pricing: [
    `You can explore Appwrite pricing here: ${LINKS.pricing}`,
    `For official pricing details, check: ${LINKS.pricing}`,
  ],
  docs: [
    `The official documentation is here: ${LINKS.docs}`,
    `Best next step: read the docs here → ${LINKS.docs}`,
  ],
  console: [
    `You can open the Appwrite console here: ${LINKS.console}`,
    `The Appwrite console is available here: ${LINKS.console}`,
  ],
  github: [
    `Appwrite’s GitHub is here: ${LINKS.github}`,
    `You can explore the project on GitHub here: ${LINKS.github}`,
  ],
  fallback: [
    "Ask me something like: Why Appwrite, authentication, database, open source, pricing, or docs.",
    "I can help with: Why Appwrite, core features, auth, database, pricing, docs, or GitHub.",
    "Try one of the quick options below and I’ll keep it brief.",
  ],
};

type Intent = {
  name: string;
  weight: number;
  matchers: (string | RegExp)[];
  respond: (text: string) => BotResponse;
};

const INTENTS: Intent[] = [
  {
    name: "greeting",
    weight: 5,
    matchers: [/\b(hello|hi|hey|start|help|menu)\b/],
    respond: () => {
      memory.greeted = true;
      return reply(`${pick(tone.greet)}\n\nWhat would you like to know?`, [
        SUGG.WHY_APPWRITE,
        SUGG.FEATURES,
        SUGG.AUTH,
        SUGG.DATABASE,
        SUGG.OPEN_SOURCE,
        SUGG.DOCS,
      ]);
    },
  },
  {
    name: "why-appwrite",
    weight: 6,
    matchers: [/\b(why appwrite|why use appwrite|why choose appwrite|appwrite benefit|benefits)\b/],
    respond: () =>
      reply(pick(tone.why), [
        SUGG.FEATURES,
        SUGG.AUTH,
        SUGG.OPEN_SOURCE,
        SUGG.DOCS,
      ]),
  },
  {
    name: "features",
    weight: 5,
    matchers: [/\b(feature|features|what does appwrite do|what can appwrite do|services)\b/],
    respond: () =>
      reply(
        `${pick(tone.features)}\n\nCommon areas people care about:\n• Authentication\n• Database & storage\n• Developer workflow\n• Open-source flexibility`,
        [SUGG.AUTH, SUGG.DATABASE, SUGG.OPEN_SOURCE, SUGG.DOCS]
      ),
  },
  {
    name: "authentication",
    weight: 5,
    matchers: [/\b(auth|authentication|login|sign in|signup|user accounts|users)\b/],
    respond: () =>
      reply(pick(tone.auth), [
        SUGG.WHY_APPWRITE,
        SUGG.FEATURES,
        SUGG.DOCS,
        SUGG.CONSOLE,
      ]),
  },
  {
    name: "database",
    weight: 5,
    matchers: [/\b(database|db|storage|files|data)\b/],
    respond: () =>
      reply(pick(tone.database), [
        SUGG.FEATURES,
        SUGG.WHY_APPWRITE,
        SUGG.DOCS,
        SUGG.CONSOLE,
      ]),
  },
  {
    name: "open-source",
    weight: 4,
    matchers: [/\b(open source|self host|self-host|control|ownership|flexibility)\b/],
    respond: () =>
      reply(pick(tone.openSource), [
        SUGG.WHY_APPWRITE,
        SUGG.GITHUB,
        SUGG.DOCS,
        SUGG.FEATURES,
      ]),
  },
  {
    name: "pricing",
    weight: 4,
    matchers: [/\b(price|pricing|cost|free|plan|plans)\b/],
    respond: () =>
      reply(pick(tone.pricing), [
        SUGG.PRICING,
        SUGG.DOCS,
        SUGG.CONSOLE,
      ]),
  },
  {
    name: "docs",
    weight: 4,
    matchers: [/\b(doc|docs|documentation|guide|guides|learn)\b/],
    respond: () =>
      reply(pick(tone.docs), [
        SUGG.DOCS,
        SUGG.CONSOLE,
        SUGG.GITHUB,
      ]),
  },
  {
    name: "console",
    weight: 4,
    matchers: [/\b(console|dashboard|cloud)\b/],
    respond: () =>
      reply(pick(tone.console), [
        SUGG.CONSOLE,
        SUGG.DOCS,
        SUGG.PRICING,
      ]),
  },
  {
    name: "github",
    weight: 3,
    matchers: [/\b(github|repo|repository|source code)\b/],
    respond: () =>
      reply(pick(tone.github), [
        SUGG.GITHUB,
        SUGG.OPEN_SOURCE,
        SUGG.DOCS,
      ]),
  },
];

const FALLBACK = () =>
  reply(pick(tone.fallback), [
    SUGG.WHY_APPWRITE,
    SUGG.FEATURES,
    SUGG.AUTH,
    SUGG.DATABASE,
    SUGG.OPEN_SOURCE,
    SUGG.DOCS,
  ]);

function detectIntent(text: string): Intent | null {
  const scores = INTENTS.map((intent) => {
    const hits = intent.matchers.reduce(
      (acc, m) => (includesAny(text, [m]) ? acc + 1 : acc),
      0
    );
    return { intent, score: hits * intent.weight };
  });

  scores.sort((a, b) => b.score - a.score);
  const top = scores[0];
  return top && top.score > 0 ? top.intent : null;
}

export async function POST(req: Request) {
  let text = "";

  try {
    const body = await req.json();
    text = normalize(body?.message ?? "");
  } catch {}

  if (!text) {
    return NextResponse.json(
      reply(`${pick(tone.greet)}\n\nChoose a topic below.`, [
        SUGG.WHY_APPWRITE,
        SUGG.FEATURES,
        SUGG.AUTH,
        SUGG.DATABASE,
        SUGG.OPEN_SOURCE,
        SUGG.DOCS,
      ])
    );
  }

  const intent = detectIntent(text);
  if (intent) {
    memory.lastIntent = intent.name;
    return NextResponse.json(intent.respond(text));
  }

  return NextResponse.json(FALLBACK());
}