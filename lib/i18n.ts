export type Locale = "ko" | "en";

export const LOCALES = ["ko", "en"] as const satisfies readonly Locale[];
export const DEFAULT_LOCALE: Locale = "ko";
export const LOCALE_STORAGE_KEY = "eerstep-locale";

export const LOCALE_LABELS: Record<Locale, string> = {
  ko: "한국어",
  en: "English"
};

const NUMBER_LOCALES: Record<Locale, string> = {
  ko: "ko-KR",
  en: "en-US"
};

export function isLocale(value: unknown): value is Locale {
  return value === "ko" || value === "en";
}

export function getNumberLocale(locale: Locale) {
  return NUMBER_LOCALES[locale];
}

export const APP_COPY = {
  ko: {
    nav: {
      home: "홈",
      diagnosis: "진단",
      result: "결과",
      dashboard: "대시보드",
      strategy: "전략",
      actions: "액션"
    },
    landing: {
      eyebrow: "전략 기반 자산 성장",
      title: "당신의 자산 문제는 노력이 아니라 전략입니다.",
      description:
        "eerstep은 현재 자산 레벨에 맞는 다음 행동을 알려줍니다. 복잡한 가계부 대신, 지금 실행할 전략만 보여줍니다.",
      cta: "4개 숫자로 시작하기",
      helper: "회원가입 없이 바로 진단할 수 있습니다.",
      promiseTitle: "서비스 약속",
      currentStateLabel: "현재 상태:",
      currentStateBody: "지금 내 실제 레벨을 즉시 파악합니다.",
      strategyLabel: "전략:",
      strategyBody: "그 레벨에 맞는 자산 전략을 사용합니다.",
      nextActionLabel: "다음 액션:",
      nextActionBody: "상승을 만드는 3-5개 행동을 실행합니다.",
      howItWorksTitle: "이 앱은 이렇게 사용합니다",
      stepOneTitle: "1. 숫자 4개 입력",
      stepOneBody: "총자산, 총부채, 월 소득, 월 지출을 입력합니다. 정확한 값이 아니어도 최근 기준의 대략적인 수치면 충분합니다.",
      stepTwoTitle: "2. 현재 레벨 확인",
      stepTwoBody: "당신의 순자산 기준 레벨, 다음 목표 금액, 지금 써야 할 전략과 피해야 할 행동을 보여줍니다.",
      stepThreeTitle: "3. 다음 행동 실행",
      stepThreeBody: "대시보드에서 추천 액션을 확인하고, 필요한 행동을 추가하며 현재 전략에 집중합니다."
    },
    diagnosis: {
      eyebrow: "진단",
      title: "지금 위치가 어디인가요?",
      description: "숫자 네 가지만 입력하면 현재 레벨, 전략, 다음 액션을 보여드립니다.",
      assets: "총자산 (원)",
      liabilities: "총부채 (원)",
      income: "월 소득 (원)",
      expenses: "월 지출 (원)",
      submit: "내 레벨 분석하기",
      guideTitle: "무엇을 입력하나요?",
      assetsHelp: "총자산: 예금, 투자금, 부동산 등 내가 가진 자산의 총합",
      liabilitiesHelp: "총부채: 대출, 카드론 등 갚아야 할 금액의 총합",
      incomeHelp: "월 소득: 한 달 평균 수입",
      expensesHelp: "월 지출: 한 달 평균 지출",
      currencyNote: "한국어 모드에서는 원화 기준으로 입력합니다.",
      reassurance: "정확한 회계 수준이 아니어도 괜찮습니다. 최근 기준의 대략적인 숫자만으로도 진단할 수 있습니다."
    },
    result: {
      eyebrow: "결과",
      netWorth: "순자산",
      nextLevelTarget: "다음 레벨 목표",
      topLevelAchieved: "최상위 레벨 달성",
      strategyTitle: "전략",
      avoidTitle: "하지 말아야 할 것",
      recommendedActions: "추천 액션",
      cta: "대시보드로 이동"
    },
    actionsPage: {
      eyebrow: "액션 플랜",
      title: "지금 무엇을 해야 하나요?",
      description: "다음 자산 레벨로 가는 데 직접 연결되는 액션을 하나 추가하세요.",
      placeholder: "레버리지 높은 액션 추가",
      submit: "액션 추가"
    },
    strategyPage: {
      currentState: "현재 상태",
      keyStrategy: "핵심 전략",
      avoidStrategy: "피해야 할 전략",
      nextAction: "다음 액션",
      preview: "미리보기"
    },
    sections: {
      nextActions: "다음 액션",
      trendMock: "추세 (목업)",
      currentState: "현재 상태",
      progressToNextLevel: "다음 레벨까지 진행률",
      topLevelReached: "최상위 레벨 도달",
      onePercentRule: "1% 룰",
      onePercentDescription: "이 금액만큼 순자산을 늘릴 수 없는 일에는 시간을 쓰지 마세요.",
      dailySpendRule: "0.01% 룰",
      dailySpendDescription: "이 금액은 매일 부담 없이 써도 되는 소비 한도입니다.",
      strategy: "전략",
      doThis: "이렇게 하세요",
      avoidThis: "이것은 피하세요"
    },
    language: {
      label: "언어"
    }
  },
  en: {
    nav: {
      home: "Home",
      diagnosis: "Diagnosis",
      result: "Result",
      dashboard: "Dashboard",
      strategy: "Strategy",
      actions: "Actions"
    },
    landing: {
      eyebrow: "Strategy-based wealth progression",
      title: "Your wealth problem is not effort. It's strategy.",
      description:
        "eerstep tells you what to do next based on your current wealth level. No budgeting complexity, just the strategy you should execute now.",
      cta: "Start with 4 numbers",
      helper: "No signup needed. You can diagnose your level right away.",
      promiseTitle: "System promise",
      currentStateLabel: "Current state:",
      currentStateBody: "Identify your real level instantly.",
      strategyLabel: "Strategy:",
      strategyBody: "Use the right wealth strategy for that level.",
      nextActionLabel: "Next action:",
      nextActionBody: "Execute 3-5 actions that move you upward.",
      howItWorksTitle: "How to use this app",
      stepOneTitle: "1. Enter 4 numbers",
      stepOneBody: "Add your total assets, total liabilities, monthly income, and monthly expenses. A recent estimate is good enough.",
      stepTwoTitle: "2. See your level",
      stepTwoBody: "We'll show your current wealth level, your next target, the strategy to use now, and what to avoid.",
      stepThreeTitle: "3. Take the next step",
      stepThreeBody: "Use the dashboard to review recommended actions, add your own actions, and focus on the right strategy."
    },
    diagnosis: {
      eyebrow: "Diagnosis",
      title: "Where are you now?",
      description: "Enter four numbers. We'll return your level, strategy, and next actions.",
      assets: "Total assets (USD)",
      liabilities: "Total liabilities (USD)",
      income: "Monthly income (USD)",
      expenses: "Monthly expenses (USD)",
      submit: "Analyze my level",
      guideTitle: "What should I enter?",
      assetsHelp: "Total assets: savings, investments, property, and other assets you own",
      liabilitiesHelp: "Total liabilities: loans, credit balances, and other debt you owe",
      incomeHelp: "Monthly income: your average income per month",
      expensesHelp: "Monthly expenses: your average spending per month",
      currencyNote: "English mode uses USD for input and display.",
      reassurance: "You do not need accounting-level precision. A reasonable recent estimate is enough to get useful guidance."
    },
    result: {
      eyebrow: "Result",
      netWorth: "Net worth",
      nextLevelTarget: "Next level target",
      topLevelAchieved: "Top level achieved",
      strategyTitle: "Strategy",
      avoidTitle: "What NOT to do",
      recommendedActions: "Recommended actions",
      cta: "Go to Dashboard"
    },
    actionsPage: {
      eyebrow: "Action plan",
      title: "What should I do next?",
      description: "Add one action that directly moves you toward your next wealth level.",
      placeholder: "Add a high-leverage action",
      submit: "Add action"
    },
    strategyPage: {
      currentState: "Current state",
      keyStrategy: "Key strategy",
      avoidStrategy: "Avoid strategy",
      nextAction: "Next action",
      preview: "Preview"
    },
    sections: {
      nextActions: "Next actions",
      trendMock: "Trend (mock)",
      currentState: "Current state",
      progressToNextLevel: "Progress to next level",
      topLevelReached: "Top level reached",
      onePercentRule: "1% Rule",
      onePercentDescription: "Do not spend time on tasks that cannot increase your net worth by this amount.",
      dailySpendRule: "0.01% Rule",
      dailySpendDescription: "This is your daily guilt-free spending.",
      strategy: "Strategy",
      doThis: "Do this",
      avoidThis: "Avoid this"
    },
    language: {
      label: "Language"
    }
  }
} as const;
