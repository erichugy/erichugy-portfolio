export interface Project {
  title: string;
  description: string;
  longDescription: string;
  image: string;
  techStack: readonly string[];
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  imageBackgroundClassName: string;
  emoji?: string;
  featured?: boolean;
}

export const PROJECTS: readonly Project[] = [
  {
    title: "Turing Poker Bot",
    description:
      "An autonomous Texas Hold'em poker bot built for the McGill Physics Hackathon.",
    longDescription:
      "Developed for the McGill Physics Hackathon/Tournament, this poker bot plays Texas Hold'em autonomously. The core logic analyzes pot odds, estimates opponent hand ranges, and simulates win probabilities in real time. It adapts to table dynamics by modeling opponent behavior and shifting between conservative and aggressive playstyles, qualifying for cash prizes in two separate rounds.",
    image: "/inspiration.png",
    techStack: [
      "Python",
      "Probability Theory",
      "Game Theory",
      "Monte Carlo Simulation",
    ],
    primaryCtaLabel: "View on GitHub",
    primaryCtaHref: "https://github.com/denis-tsariov/python-poker-bot",
    imageBackgroundClassName:
      "bg-gradient-to-br from-emerald-500/80 to-cyan-600/80",
    emoji: "🃏",
    featured: true,
  },
  {
    title: "Stock Sentiment Analyzer",
    description:
      "A hackathon project that fetches news and runs NLP sentiment analysis to generate stock recommendations.",
    longDescription:
      "Built at McHacks 10, this tool fetches the latest news articles via the Alpaca Markets API, runs them through Cohere's NLP model to evaluate sentiment, then generates a BUY, SELL, or HOLD recommendation with a confidence score. It includes a live demo backed by real-time analysis.",
    image: "/inspiration.png",
    techStack: ["Python", "Flask", "Cohere", "Alpaca API", "BeautifulSoup"],
    primaryCtaLabel: "Try Live Demo",
    primaryCtaHref: "/projects/trading-bot",
    secondaryCtaLabel: "View Code",
    secondaryCtaHref: "https://github.com/erichugy/",
    imageBackgroundClassName:
      "bg-gradient-to-br from-violet-500/80 to-fuchsia-600/80",
    emoji: "📈",
  },
  {
    title: "Distributed RL Path-Finding",
    description:
      "Research on distributed deep reinforcement learning for path-finding in dynamic environments.",
    longDescription:
      "Architected a distributed path-finding system using IMPALA and RLlib, proposing a hybrid A*/RL framework for global navigation with local collision avoidance. A revolving mini-batch training strategy eliminated catastrophic forgetting and improved generalization across distinct obstacle layouts during research at McGill University.",
    image: "/inspiration.png",
    techStack: ["Python", "PyTorch", "RLlib", "IMPALA", "A3C"],
    primaryCtaLabel: "View Report",
    primaryCtaHref: "/Eric_Huang_Software-can.pdf",
    imageBackgroundClassName:
      "bg-gradient-to-br from-amber-500/80 to-orange-600/80",
    emoji: "🧠",
  },
];
