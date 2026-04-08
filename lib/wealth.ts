export type WealthLevel = 1 | 2 | 3 | 4 | 5 | 6;

export const LEVEL_MINIMUMS = [
  0,
  14_000_000,
  140_000_000,
  1_400_000_000,
  14_000_000_000,
  140_000_000_000
] as const;

export type StrategySet = {
  headline: string;
  keyStrategy: string[];
  avoidStrategy: string[];
  explanation: string;
};

export const STRATEGIES: Record<WealthLevel, StrategySet> = {
  1: {
    headline: "Stabilize your runway first",
    explanation: "Your system starts with survival strength. Secure monthly cash flow and remove debt volatility.",
    keyStrategy: ["Stabilize income", "Avoid debt risk", "Survival focus"],
    avoidStrategy: ["Speculative investing", "High fixed-cost lifestyle", "Complex optimization"]
  },
  2: {
    headline: "Maximize earning power",
    explanation: "At this stage, growth comes from skill stacking and aggressive income expansion, not penny-saving.",
    keyStrategy: ["Increase income aggressively", "Skill growth", "Reject over-saving mindset"],
    avoidStrategy: ["Over-optimizing small expenses", "Comfort-zone career moves", "Single income stream"]
  },
  3: {
    headline: "Build leverage systems",
    explanation: "Shift from trading time to creating systems that multiply output through capital, content, or business.",
    keyStrategy: ["Build leverage (business/capital/content)", "Shift labor to systems", "Create repeatable assets"],
    avoidStrategy: ["Only hourly output", "Lifestyle inflation", "Random opportunities"]
  },
  4: {
    headline: "Optimize capital allocation",
    explanation: "Capital decisions now dominate results. Reallocate for return quality and lower time dependency.",
    keyStrategy: ["Optimize capital allocation", "Reduce time dependency", "Scale system income"],
    avoidStrategy: ["Reactive investments", "Founder bottleneck", "Manual-only operations"]
  },
  5: {
    headline: "Control assets and ownership",
    explanation: "Wealth acceleration comes from control rights, ownership structures, and durable asset networks.",
    keyStrategy: ["Asset control", "Ownership focus", "Platform-level decisions"],
    avoidStrategy: ["Short-term trading noise", "Micromanaging everything", "Passive-only posture"]
  },
  6: {
    headline: "Deploy influence and capital",
    explanation: "Focus on influence, strategic capital deployment, and legacy-scale initiatives.",
    keyStrategy: ["Influence and capital deployment", "Institutional partnerships", "Long-cycle impact plays"],
    avoidStrategy: ["Small tactical distractions", "Short horizon decisions", "Operating without succession planning"]
  }
};

export function getWealthLevel(netWorth: number): WealthLevel {
  if (netWorth < LEVEL_MINIMUMS[1]) return 1;
  if (netWorth < LEVEL_MINIMUMS[2]) return 2;
  if (netWorth < LEVEL_MINIMUMS[3]) return 3;
  if (netWorth < LEVEL_MINIMUMS[4]) return 4;
  if (netWorth < LEVEL_MINIMUMS[5]) return 5;
  return 6;
}

export function getNextLevelTarget(netWorth: number): number | null {
  const level = getWealthLevel(netWorth);
  return level === 6 ? null : LEVEL_MINIMUMS[level];
}

export function onePercentRule(netWorth: number) {
  return Math.max(netWorth * 0.01, 0);
}

export function dailySpendRule(netWorth: number) {
  return Math.max(netWorth * 0.0001, 0);
}

export function generateActions(level: WealthLevel): string[] {
  const map: Record<WealthLevel, string[]> = {
    1: [
      "Secure one additional stable income source within 30 days",
      "Cut high-interest debt exposure this month",
      "Create a weekly cash survival review block",
      "Protect downside: keep fixed costs lean"
    ],
    2: [
      "Launch a skill upgrade plan tied to higher-paying roles",
      "Pitch one income expansion opportunity every week",
      "Build a second revenue stream with low upfront cost",
      "Spend less time on minor savings and more on earning moves"
    ],
    3: [
      "Design one scalable system (content/product/process)",
      "Automate repetitive work consuming your core hours",
      "Allocate capital to leverage instead of only labor",
      "Convert expertise into reusable assets"
    ],
    4: [
      "Audit portfolio allocation and rebalance by expected return",
      "Delegate operator tasks to reduce time dependency",
      "Build predictable system income channels",
      "Schedule monthly capital review decisions"
    ],
    5: [
      "Increase ownership stake in high-conviction assets",
      "Strengthen asset protection and governance structure",
      "Acquire or partner where control rights matter",
      "Focus on asymmetric, ownership-first opportunities"
    ],
    6: [
      "Define a strategic capital deployment thesis",
      "Build influence through high-leverage partnerships",
      "Design legacy vehicles and succession architecture",
      "Prioritize opportunities with multi-decade compounding"
    ]
  };

  return map[level].slice(0, 5);
}

export function progressToNextLevel(netWorth: number) {
  const level = getWealthLevel(netWorth);
  if (level === 6) return 1;

  const min = LEVEL_MINIMUMS[level - 1];
  const max = LEVEL_MINIMUMS[level];
  const span = max - min;
  return Math.min(Math.max((netWorth - min) / span, 0), 1);
}
