import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n";

export type WealthLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type Bottleneck =
  | "income"
  | "spending"
  | "debt"
  | "investing"
  | "strategy"
  | "execution"
  | "sales";

export const LEVEL_MINIMUMS = [
  0,
  14_000_000,
  140_000_000,
  1_400_000_000,
  14_000_000_000,
  140_000_000_000
] as const;

type LocalizedText = Record<Locale, string>;

const BOTTLENECK_LABELS: Record<Bottleneck, LocalizedText> = {
  income: { ko: "소득 부족", en: "Low income" },
  spending: { ko: "지출 통제 실패", en: "Spending control issues" },
  debt: { ko: "부채 압박", en: "Debt pressure" },
  investing: { ko: "투자 혼란", en: "Investment confusion" },
  strategy: { ko: "전략 부재", en: "Lack of strategy" },
  execution: { ko: "실행력 부족", en: "Weak execution" },
  sales: { ko: "세일즈 약함", en: "Weak sales" }
};

type NextActionRule = {
  primary: LocalizedText;
  secondary: LocalizedText[];
  avoid: LocalizedText[];
};

type NextActionRuleSet = Record<Bottleneck, NextActionRule>;

const BASE_NEXT_ACTION_RULES: NextActionRuleSet = {
  income: {
    primary: {
      ko: "이번 주 안정적인 추가 소득원 1개 확보하기",
      en: "Secure one stable additional income source this week"
    },
    secondary: [
      { ko: "2시간 안에 가능한 소규모 서비스 1개 정의", en: "Define one small service you can deliver in 2 hours" },
      { ko: "지인 3명에게 서비스 테스트 제안 보내기", en: "Send a service test offer to 3 people" }
    ],
    avoid: [
      { ko: "앱부터 만들기", en: "Building an app first" },
      { ko: "새로운 장비 구매", en: "Buying new equipment" },
      { ko: "가격 없는 상담", en: "Unpriced consultations" }
    ]
  },
  spending: {
    primary: {
      ko: "고정비 2개 즉시 축소 또는 해지하기",
      en: "Reduce or cancel 2 fixed expenses immediately"
    },
    secondary: [
      { ko: "구독/보험/통신비 30분 점검", en: "Audit subscriptions/insurance/telecom for 30 minutes" },
      { ko: "지출 한도 계좌를 별도로 분리", en: "Split a dedicated spending-cap account" }
    ],
    avoid: [
      { ko: "무계획 할인 쇼핑", en: "Unplanned discount shopping" },
      { ko: "현금흐름 없는 투자", en: "Investments without cash-flow control" },
      { ko: "소액 절약 집착", en: "Obsessing over tiny savings" }
    ]
  },
  debt: {
    primary: {
      ko: "고금리 부채 상환 우선순위 1순위 확정하기",
      en: "Set top-priority repayment for high-interest debt"
    },
    secondary: [
      { ko: "이자율 기준 상환 순서표 작성", en: "Create a repayment order by interest rate" },
      { ko: "월 상환 자동이체 설정", en: "Set monthly auto-repayment" }
    ],
    avoid: [
      { ko: "신규 할부", en: "New installments" },
      { ko: "리볼빙 유지", en: "Keeping revolving balances" },
      { ko: "단기 고위험 투자", en: "Short-term high-risk bets" }
    ]
  },
  investing: {
    primary: {
      ko: "비상금 기준 충족 전 고위험 투자 중단하기",
      en: "Pause high-risk investing until emergency fund target is met"
    },
    secondary: [
      { ko: "투자 원칙 3줄로 정의", en: "Define investing rules in 3 lines" },
      { ko: "자동이체 날짜 고정", en: "Fix recurring transfer date" }
    ],
    avoid: [
      { ko: "테마주/단타", en: "Theme/short-term trading" },
      { ko: "감정 매매", en: "Emotion-driven trades" },
      { ko: "정보 과소비", en: "Over-consuming market content" }
    ]
  },
  strategy: {
    primary: {
      ko: "7일 검증 미션 시작하기",
      en: "Start a 7-day validation mission"
    },
    secondary: [
      { ko: "해결할 문제 1문장 작성", en: "Write one sentence for the problem you solve" },
      { ko: "타깃 고객 1명 정의", en: "Define one target customer" }
    ],
    avoid: [
      { ko: "아이디어만 수집하기", en: "Collecting ideas only" },
      { ko: "앱/브랜딩 선행 제작", en: "Building app/branding first" },
      { ko: "실행 없는 학습", en: "Learning without execution" }
    ]
  },
  execution: {
    primary: {
      ko: "오늘 20분 실행 블록 1개 캘린더에 고정",
      en: "Lock one 20-minute execution block in your calendar today"
    },
    secondary: [
      { ko: "이번 주 핵심 행동 1개만 선택", en: "Choose only one core action for this week" },
      { ko: "완료 증거 1개 남기기", en: "Leave one completion proof" }
    ],
    avoid: [
      { ko: "할 일 10개 나열", en: "Listing 10 to-dos" },
      { ko: "준비만 반복", en: "Looping preparation only" },
      { ko: "마감 없는 목표", en: "Goals without deadlines" }
    ]
  },
  sales: {
    primary: {
      ko: "고객 진단 질문 5개 먼저 만들기",
      en: "Create 5 diagnostic customer questions first"
    },
    secondary: [
      { ko: "오퍼 문장 1개 작성", en: "Write one offer sentence" },
      { ko: "잠재고객 5명에게 진단 질문 발송", en: "Send diagnostic questions to 5 prospects" }
    ],
    avoid: [
      { ko: "기능만 설명하기", en: "Explaining features only" },
      { ko: "할인부터 제시", en: "Leading with discounts" },
      { ko: "무타깃 대량 발송", en: "Untargeted mass outreach" }
    ]
  }
};

const NEXT_ACTION_RULES: Record<
  WealthLevel,
  NextActionRuleSet
> = {
  1: BASE_NEXT_ACTION_RULES,
  2: {
    ...BASE_NEXT_ACTION_RULES,
    income: {
      ...BASE_NEXT_ACTION_RULES.income,
      primary: {
        ko: "이번 주 수익화 가능한 서비스 오퍼 1개 만들기",
        en: "Create one monetizable service offer this week"
      }
    }
  },
  3: {
    ...BASE_NEXT_ACTION_RULES,
    strategy: {
      ...BASE_NEXT_ACTION_RULES.strategy,
      primary: {
        ko: "14일 검증 실험으로 고객 반응 10건 수집하기",
        en: "Run a 14-day validation sprint to collect 10 customer responses"
      }
    }
  },
  4: {
    ...BASE_NEXT_ACTION_RULES,
    execution: {
      ...BASE_NEXT_ACTION_RULES.execution,
      primary: {
        ko: "운영 업무 1개 위임 또는 자동화하기",
        en: "Delegate or automate one recurring operating task"
      }
    }
  },
  5: {
    ...BASE_NEXT_ACTION_RULES,
    sales: {
      ...BASE_NEXT_ACTION_RULES.sales,
      primary: {
        ko: "프리미엄 고객용 오퍼 1개 재설계하기",
        en: "Redesign one offer for premium customers"
      }
    }
  },
  6: {
    ...BASE_NEXT_ACTION_RULES,
    strategy: {
      ...BASE_NEXT_ACTION_RULES.strategy,
      primary: {
        ko: "전략적 파트너십 1건 실행 계획 수립하기",
        en: "Draft an execution plan for one strategic partnership"
      }
    }
  }
};

export type StrategySet = {
  headline: string;
  keyStrategy: string[];
  avoidStrategy: string[];
  explanation: string;
};

const STRATEGIES: Record<
  WealthLevel,
  {
    headline: LocalizedText;
    keyStrategy: LocalizedText[];
    avoidStrategy: LocalizedText[];
    explanation: LocalizedText;
  }
> = {
  1: {
    headline: {
      ko: "먼저 생존 여력을 안정화하세요",
      en: "Stabilize your runway first"
    },
    explanation: {
      ko: "이 단계의 핵심은 생존 체력을 만드는 것입니다. 월 현금흐름을 안정시키고 부채 변동성을 줄이세요.",
      en: "Your system starts with survival strength. Secure monthly cash flow and remove debt volatility."
    },
    keyStrategy: [
      { ko: "수입 안정화", en: "Stabilize income" },
      { ko: "부채 리스크 축소", en: "Avoid debt risk" },
      { ko: "생존 중심 운영", en: "Survival focus" }
    ],
    avoidStrategy: [
      { ko: "투기성 투자", en: "Speculative investing" },
      { ko: "고정비가 큰 라이프스타일", en: "High fixed-cost lifestyle" },
      { ko: "복잡한 최적화", en: "Complex optimization" }
    ]
  },
  2: {
    headline: {
      ko: "수익 창출력을 극대화하세요",
      en: "Maximize earning power"
    },
    explanation: {
      ko: "이 단계의 성장은 푼돈 절약이 아니라 역량 확장과 공격적인 소득 확대에서 나옵니다.",
      en: "At this stage, growth comes from skill stacking and aggressive income expansion, not penny-saving."
    },
    keyStrategy: [
      { ko: "소득 공격적으로 늘리기", en: "Increase income aggressively" },
      { ko: "역량 성장", en: "Skill growth" },
      { ko: "과도한 절약 사고 버리기", en: "Reject over-saving mindset" }
    ],
    avoidStrategy: [
      { ko: "사소한 지출 최적화 집착", en: "Over-optimizing small expenses" },
      { ko: "안전지대에 머무는 커리어 선택", en: "Comfort-zone career moves" },
      { ko: "단일 소득원 의존", en: "Single income stream" }
    ]
  },
  3: {
    headline: {
      ko: "레버리지 시스템을 만드세요",
      en: "Build leverage systems"
    },
    explanation: {
      ko: "시간을 직접 파는 단계에서 벗어나 자본, 콘텐츠, 사업으로 산출을 증폭시키는 시스템을 만들어야 합니다.",
      en: "Shift from trading time to creating systems that multiply output through capital, content, or business."
    },
    keyStrategy: [
      { ko: "레버리지 구축(사업/자본/콘텐츠)", en: "Build leverage (business/capital/content)" },
      { ko: "노동을 시스템으로 전환", en: "Shift labor to systems" },
      { ko: "반복 가능한 자산 만들기", en: "Create repeatable assets" }
    ],
    avoidStrategy: [
      { ko: "시간당 생산만으로 머무르기", en: "Only hourly output" },
      { ko: "생활 수준 인플레이션", en: "Lifestyle inflation" },
      { ko: "무작위 기회 추적", en: "Random opportunities" }
    ]
  },
  4: {
    headline: {
      ko: "자본 배분을 최적화하세요",
      en: "Optimize capital allocation"
    },
    explanation: {
      ko: "이제는 자본 배분 결정이 성과를 좌우합니다. 수익의 질을 높이고 시간 의존도를 낮추도록 재배치하세요.",
      en: "Capital decisions now dominate results. Reallocate for return quality and lower time dependency."
    },
    keyStrategy: [
      { ko: "자본 배분 최적화", en: "Optimize capital allocation" },
      { ko: "시간 의존도 축소", en: "Reduce time dependency" },
      { ko: "시스템 수익 확장", en: "Scale system income" }
    ],
    avoidStrategy: [
      { ko: "반응형 투자", en: "Reactive investments" },
      { ko: "창업자 병목", en: "Founder bottleneck" },
      { ko: "수작업 중심 운영", en: "Manual-only operations" }
    ]
  },
  5: {
    headline: {
      ko: "자산과 소유권을 통제하세요",
      en: "Control assets and ownership"
    },
    explanation: {
      ko: "이 단계의 자산 증가는 지배권, 소유 구조, 오래가는 자산 네트워크에서 가속됩니다.",
      en: "Wealth acceleration comes from control rights, ownership structures, and durable asset networks."
    },
    keyStrategy: [
      { ko: "자산 통제력 확보", en: "Asset control" },
      { ko: "소유권 중심 사고", en: "Ownership focus" },
      { ko: "플랫폼 수준의 의사결정", en: "Platform-level decisions" }
    ],
    avoidStrategy: [
      { ko: "단기 매매 잡음", en: "Short-term trading noise" },
      { ko: "모든 것을 직접 미세관리", en: "Micromanaging everything" },
      { ko: "수동적 자세만 유지", en: "Passive-only posture" }
    ]
  },
  6: {
    headline: {
      ko: "영향력과 자본을 배치하세요",
      en: "Deploy influence and capital"
    },
    explanation: {
      ko: "영향력, 전략적 자본 배치, 그리고 유산 규모의 장기 프로젝트에 집중해야 할 단계입니다.",
      en: "Focus on influence, strategic capital deployment, and legacy-scale initiatives."
    },
    keyStrategy: [
      { ko: "영향력과 자본 배치", en: "Influence and capital deployment" },
      { ko: "기관급 파트너십", en: "Institutional partnerships" },
      { ko: "긴 주기의 임팩트 투자", en: "Long-cycle impact plays" }
    ],
    avoidStrategy: [
      { ko: "작은 전술적 잡음", en: "Small tactical distractions" },
      { ko: "짧은 시계열의 의사결정", en: "Short horizon decisions" },
      { ko: "승계 계획 없는 운영", en: "Operating without succession planning" }
    ]
  }
};

const GENERATED_ACTIONS: Record<WealthLevel, { key: string; label: LocalizedText }[]> = {
  1: [
    {
      key: "level-1-income-source",
      label: {
        ko: "30일 안에 안정적인 추가 소득원 1개 확보",
        en: "Secure one additional stable income source within 30 days"
      }
    },
    {
      key: "level-1-debt-risk",
      label: {
        ko: "이번 달 고금리 부채 노출 줄이기",
        en: "Cut high-interest debt exposure this month"
      }
    },
    {
      key: "level-1-cash-review",
      label: {
        ko: "주간 현금 생존 점검 시간 만들기",
        en: "Create a weekly cash survival review block"
      }
    },
    {
      key: "level-1-fixed-costs",
      label: {
        ko: "하방 보호를 위해 고정비를 가볍게 유지하기",
        en: "Protect downside: keep fixed costs lean"
      }
    }
  ],
  2: [
    {
      key: "level-2-skill-upgrade",
      label: {
        ko: "더 높은 보상 역할과 연결된 역량 업그레이드 계획 시작",
        en: "Launch a skill upgrade plan tied to higher-paying roles"
      }
    },
    {
      key: "level-2-income-pitch",
      label: {
        ko: "매주 1회 소득 확대 기회 제안하기",
        en: "Pitch one income expansion opportunity every week"
      }
    },
    {
      key: "level-2-second-stream",
      label: {
        ko: "낮은 초기 비용으로 두 번째 수익원 만들기",
        en: "Build a second revenue stream with low upfront cost"
      }
    },
    {
      key: "level-2-earning-moves",
      label: {
        ko: "사소한 절약보다 소득을 키우는 행동에 더 많은 시간 쓰기",
        en: "Spend less time on minor savings and more on earning moves"
      }
    }
  ],
  3: [
    {
      key: "level-3-scalable-system",
      label: {
        ko: "확장 가능한 시스템 1개 설계하기(콘텐츠/제품/프로세스)",
        en: "Design one scalable system (content/product/process)"
      }
    },
    {
      key: "level-3-automation",
      label: {
        ko: "핵심 시간을 잡아먹는 반복 업무 자동화하기",
        en: "Automate repetitive work consuming your core hours"
      }
    },
    {
      key: "level-3-capital-leverage",
      label: {
        ko: "노동만이 아니라 레버리지에 자본 배치하기",
        en: "Allocate capital to leverage instead of only labor"
      }
    },
    {
      key: "level-3-reusable-assets",
      label: {
        ko: "전문성을 재사용 가능한 자산으로 전환하기",
        en: "Convert expertise into reusable assets"
      }
    }
  ],
  4: [
    {
      key: "level-4-portfolio-audit",
      label: {
        ko: "기대수익 기준으로 포트폴리오 배분 점검 및 재조정",
        en: "Audit portfolio allocation and rebalance by expected return"
      }
    },
    {
      key: "level-4-delegate-ops",
      label: {
        ko: "시간 의존도를 줄이기 위해 운영 업무 위임하기",
        en: "Delegate operator tasks to reduce time dependency"
      }
    },
    {
      key: "level-4-system-income",
      label: {
        ko: "예측 가능한 시스템 수익 채널 만들기",
        en: "Build predictable system income channels"
      }
    },
    {
      key: "level-4-capital-review",
      label: {
        ko: "월간 자본 배분 의사결정 리뷰 일정 잡기",
        en: "Schedule monthly capital review decisions"
      }
    }
  ],
  5: [
    {
      key: "level-5-ownership-stake",
      label: {
        ko: "확신 높은 자산의 소유 지분 늘리기",
        en: "Increase ownership stake in high-conviction assets"
      }
    },
    {
      key: "level-5-governance",
      label: {
        ko: "자산 보호와 거버넌스 구조 강화하기",
        en: "Strengthen asset protection and governance structure"
      }
    },
    {
      key: "level-5-control-rights",
      label: {
        ko: "지배권이 중요한 곳에서 인수 또는 파트너십 추진",
        en: "Acquire or partner where control rights matter"
      }
    },
    {
      key: "level-5-asymmetry",
      label: {
        ko: "비대칭적이고 소유권 중심의 기회에 집중하기",
        en: "Focus on asymmetric, ownership-first opportunities"
      }
    }
  ],
  6: [
    {
      key: "level-6-capital-thesis",
      label: {
        ko: "전략적 자본 배치 테제를 정의하기",
        en: "Define a strategic capital deployment thesis"
      }
    },
    {
      key: "level-6-partnerships",
      label: {
        ko: "고레버리지 파트너십으로 영향력 확대하기",
        en: "Build influence through high-leverage partnerships"
      }
    },
    {
      key: "level-6-legacy",
      label: {
        ko: "유산 구조와 승계 아키텍처 설계하기",
        en: "Design legacy vehicles and succession architecture"
      }
    },
    {
      key: "level-6-compounding",
      label: {
        ko: "수십 년 복리 효과를 만드는 기회에 우선순위 두기",
        en: "Prioritize opportunities with multi-decade compounding"
      }
    }
  ]
};

const GENERATED_ACTION_LOOKUP = Object.fromEntries(
  Object.values(GENERATED_ACTIONS)
    .flat()
    .map((entry) => [entry.key, entry.label])
) as Record<string, LocalizedText>;

export function getStrategy(level: WealthLevel, locale: Locale): StrategySet {
  const strategy = STRATEGIES[level];

  return {
    headline: strategy.headline[locale],
    explanation: strategy.explanation[locale],
    keyStrategy: strategy.keyStrategy.map((item) => item[locale]),
    avoidStrategy: strategy.avoidStrategy.map((item) => item[locale])
  };
}

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

export function generateActions(level: WealthLevel, locale: Locale = DEFAULT_LOCALE): string[] {
  return GENERATED_ACTIONS[level].map((entry) => entry.label[locale]).slice(0, 5);
}

export function generateActionDefinitions(level: WealthLevel, locale: Locale = DEFAULT_LOCALE) {
  return GENERATED_ACTIONS[level].map((entry) => ({
    actionKey: entry.key,
    title: entry.label[locale]
  }));
}

export function getGeneratedActionKey(level: WealthLevel, title: string) {
  const normalizedTitle = title.trim();

  return GENERATED_ACTIONS[level].find(
    (entry) => entry.label.ko === normalizedTitle || entry.label.en === normalizedTitle
  )?.key;
}

export function getGeneratedActionTitle(actionKey: string, locale: Locale) {
  return GENERATED_ACTION_LOOKUP[actionKey]?.[locale];
}

export function getActionDisplayTitle(
  action: { title: string; actionKey?: string },
  locale: Locale
) {
  return action.actionKey ? getGeneratedActionTitle(action.actionKey, locale) ?? action.title : action.title;
}

export function progressToNextLevel(netWorth: number) {
  const level = getWealthLevel(netWorth);
  if (level === 6) return 1;

  const min = LEVEL_MINIMUMS[level - 1];
  const max = LEVEL_MINIMUMS[level];
  const span = max - min;
  return Math.min(Math.max((netWorth - min) / span, 0), 1);
}

export function getBottleneckLabel(bottleneck: Bottleneck, locale: Locale) {
  return BOTTLENECK_LABELS[bottleneck][locale];
}

export function getNextBestAction(level: WealthLevel, bottleneck: Bottleneck, locale: Locale) {
  const rule = NEXT_ACTION_RULES[level][bottleneck];

  return {
    primary: rule.primary[locale],
    secondary: rule.secondary.map((item) => item[locale]),
    avoid: rule.avoid.map((item) => item[locale])
  };
}
