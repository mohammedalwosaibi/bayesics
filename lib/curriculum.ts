export type ModuleId =
  | "foundations"
  | "conditional"
  | "discrete"
  | "continuous"
  | "joint"
  | "limits"
  | "stochastic";

export type LessonMeta = {
  id: string;
  moduleId: ModuleId;
  slug: string;
  title: string;
  eyebrow: string;
  blurb: string;
  order: number;
};

export type ModuleMeta = {
  id: ModuleId;
  number: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  slug: string;
  title: string;
  tagline: string;
  lessons: LessonMeta[];
  unitTestId: string;
};

function lessons(
  moduleId: ModuleId,
  defs: Array<{ slug: string; title: string; blurb: string }>,
): LessonMeta[] {
  return defs.map((d, i) => ({
    id: d.slug,
    moduleId,
    slug: d.slug,
    title: d.title,
    eyebrow: `Lesson ${String(i + 1).padStart(2, "0")}`,
    blurb: d.blurb,
    order: i + 1,
  }));
}

export const curriculum: ModuleMeta[] = [
  {
    id: "foundations",
    number: 1,
    slug: "foundations",
    title: "Foundations",
    tagline: "Outcomes, events, and how to count them.",
    unitTestId: "foundations-unit-test",
    lessons: lessons("foundations", [
      {
        slug: "sample-spaces",
        title: "Sample spaces and events",
        blurb: "Every probability question starts by listing what could happen.",
      },
      {
        slug: "set-operations",
        title: "Set operations on events",
        blurb: "Unions, intersections, complements — the grammar of events.",
      },
      {
        slug: "axioms",
        title: "Probability axioms",
        blurb: "Three Kolmogorov rules every probability obeys.",
      },
      {
        slug: "equally-likely",
        title: "Equally likely outcomes",
        blurb: "When symmetry hands you the answer for free.",
      },
      {
        slug: "multiplication-principle",
        title: "The multiplication principle",
        blurb: "Counting choices step by step.",
      },
      {
        slug: "permutations",
        title: "Permutations",
        blurb: "How many ways can you order things?",
      },
      {
        slug: "combinations",
        title: "Combinations",
        blurb: "How many ways can you choose, when order doesn't matter?",
      },
      {
        slug: "inclusion-exclusion",
        title: "Inclusion–exclusion",
        blurb: "Add the parts, subtract the overlap.",
      },
    ]),
  },
  {
    id: "conditional",
    number: 2,
    slug: "conditional",
    title: "Conditional Probability",
    tagline: "How information reshapes the odds.",
    unitTestId: "conditional-unit-test",
    lessons: lessons("conditional", [
      {
        slug: "conditional-definition",
        title: "Conditional probability",
        blurb: "Probability after you learn something new.",
      },
      {
        slug: "multiplication-rule",
        title: "The multiplication rule",
        blurb: "Joint probability from a chain of conditionals.",
      },
      {
        slug: "independence",
        title: "Independence of events",
        blurb: "When knowing one event tells you nothing about the other.",
      },
      {
        slug: "total-probability",
        title: "Law of total probability",
        blurb: "Build a probability by summing over a partition.",
      },
      {
        slug: "bayes-theorem",
        title: "Bayes' theorem",
        blurb: "Flip a conditional — and watch the surprising answer fall out.",
      },
      {
        slug: "bayes-pitfalls",
        title: "Common Bayes pitfalls",
        blurb: "Base-rate fallacy and prosecutor's fallacy, in plain English.",
      },
    ]),
  },
  {
    id: "discrete",
    number: 3,
    slug: "discrete",
    title: "Discrete Random Variables",
    tagline: "Numbers that come from chance.",
    unitTestId: "discrete-unit-test",
    lessons: lessons("discrete", [
      {
        slug: "random-variable",
        title: "What is a random variable?",
        blurb: "A number whose value depends on a random outcome.",
      },
      {
        slug: "pmf",
        title: "Probability mass function (PMF)",
        blurb: "How probability is distributed over the possible values.",
      },
      {
        slug: "cdf-discrete",
        title: "Cumulative distribution function",
        blurb: "Probability of being at most a given value.",
      },
      {
        slug: "expected-value",
        title: "Expected value",
        blurb: "The long-run average outcome.",
      },
      {
        slug: "variance",
        title: "Variance and standard deviation",
        blurb: "How far values spread from the mean.",
      },
      {
        slug: "bernoulli",
        title: "Bernoulli distribution",
        blurb: "One coin flip — the simplest random variable.",
      },
      {
        slug: "binomial",
        title: "Binomial distribution",
        blurb: "Counting successes across n independent trials.",
      },
      {
        slug: "geometric",
        title: "Geometric distribution",
        blurb: "How long until your first success?",
      },
      {
        slug: "poisson",
        title: "Poisson distribution",
        blurb: "Counts of rare events over a fixed window.",
      },
      {
        slug: "hypergeometric",
        title: "Hypergeometric distribution",
        blurb: "Drawing without replacement.",
      },
    ]),
  },
  {
    id: "continuous",
    number: 4,
    slug: "continuous",
    title: "Continuous Random Variables",
    tagline: "From bars to curves.",
    unitTestId: "continuous-unit-test",
    lessons: lessons("continuous", [
      {
        slug: "discrete-to-continuous",
        title: "From discrete to continuous",
        blurb: "Why a single point has probability zero.",
      },
      {
        slug: "pdf",
        title: "Probability density function (PDF)",
        blurb: "Density isn't probability — area is.",
      },
      {
        slug: "cdf-continuous",
        title: "CDF for continuous variables",
        blurb: "Add up density from minus infinity to x.",
      },
      {
        slug: "expectation-continuous",
        title: "Expected value (continuous)",
        blurb: "Integrate x against its density.",
      },
      {
        slug: "variance-continuous",
        title: "Variance (continuous)",
        blurb: "Spread for densities.",
      },
      {
        slug: "uniform",
        title: "Uniform distribution",
        blurb: "Every value in an interval equally likely.",
      },
      {
        slug: "exponential",
        title: "Exponential distribution",
        blurb: "Waiting time for a memoryless event.",
      },
      {
        slug: "memorylessness",
        title: "Memorylessness",
        blurb: "The past doesn't matter — only what's left.",
      },
      {
        slug: "normal",
        title: "Normal distribution",
        blurb: "The bell curve and the 68/95/99.7 rule.",
      },
      {
        slug: "standardization",
        title: "Standardization and Z-scores",
        blurb: "Move any normal to a standard one.",
      },
    ]),
  },
  {
    id: "joint",
    number: 5,
    slug: "joint",
    title: "Multiple Random Variables",
    tagline: "When two things vary together.",
    unitTestId: "joint-unit-test",
    lessons: lessons("joint", [
      {
        slug: "joint-discrete",
        title: "Joint distributions (discrete)",
        blurb: "Probability over pairs of outcomes.",
      },
      {
        slug: "marginal",
        title: "Marginal distributions",
        blurb: "Sum across the rows or columns.",
      },
      {
        slug: "conditional-dist",
        title: "Conditional distributions",
        blurb: "One row of the table, renormalized.",
      },
      {
        slug: "independence-rvs",
        title: "Independence of random variables",
        blurb: "When the joint factors into the marginals.",
      },
      {
        slug: "linearity-of-expectation",
        title: "Linearity of expectation",
        blurb: "Expectations add — even when the variables are tangled.",
      },
      {
        slug: "joint-continuous",
        title: "Joint distributions (continuous)",
        blurb: "Density over the plane.",
      },
      {
        slug: "covariance",
        title: "Covariance",
        blurb: "Do two variables move together?",
      },
      {
        slug: "correlation",
        title: "Correlation",
        blurb: "Covariance, scale-free.",
      },
      {
        slug: "conditional-expectation",
        title: "Conditional expectation",
        blurb: "The mean — once you know what the other variable did.",
      },
      {
        slug: "sums-of-rvs",
        title: "Sums of independent random variables",
        blurb: "What happens when you add them up.",
      },
    ]),
  },
  {
    id: "limits",
    number: 6,
    slug: "limits",
    title: "Limit Theorems",
    tagline: "Why averages get predictable.",
    unitTestId: "limits-unit-test",
    lessons: lessons("limits", [
      {
        slug: "markov-inequality",
        title: "Markov's inequality",
        blurb: "A loose-but-useful bound from the mean alone.",
      },
      {
        slug: "chebyshev",
        title: "Chebyshev's inequality",
        blurb: "Bound the tails using the variance.",
      },
      {
        slug: "wlln",
        title: "Weak law of large numbers",
        blurb: "Sample averages settle on the true mean.",
      },
      {
        slug: "clt",
        title: "Central limit theorem",
        blurb: "Sums end up looking normal — almost no matter what you started with.",
      },
      {
        slug: "normal-approx-binomial",
        title: "Normal approximation to the binomial",
        blurb: "When n is big, the bell curve is close enough.",
      },
    ]),
  },
  {
    id: "stochastic",
    number: 7,
    slug: "stochastic",
    title: "Stochastic Processes",
    tagline: "Probability that unfolds over time.",
    unitTestId: "stochastic-unit-test",
    lessons: lessons("stochastic", [
      {
        slug: "markov-states",
        title: "Markov chains: states and transitions",
        blurb: "The future depends only on the present.",
      },
      {
        slug: "transition-matrices",
        title: "Transition matrices",
        blurb: "Pack all the transition probabilities into one grid.",
      },
      {
        slug: "stationary-distributions",
        title: "Stationary distributions",
        blurb: "The long-run mix the chain settles into.",
      },
      {
        slug: "poisson-processes",
        title: "Poisson processes",
        blurb: "Random events arriving over continuous time.",
      },
    ]),
  },
];

export function getModule(slug: string): ModuleMeta | undefined {
  return curriculum.find((m) => m.slug === slug);
}

export function getLesson(
  moduleSlug: string,
  lessonSlug: string,
): { module: ModuleMeta; lesson: LessonMeta } | undefined {
  const m = getModule(moduleSlug);
  if (!m) return undefined;
  const l = m.lessons.find((x) => x.slug === lessonSlug);
  if (!l) return undefined;
  return { module: m, lesson: l };
}

export type Step =
  | { kind: "lesson"; module: ModuleMeta; lesson: LessonMeta }
  | { kind: "unitTest"; module: ModuleMeta };

export function flatSteps(): Step[] {
  const out: Step[] = [];
  for (const m of curriculum) {
    for (const l of m.lessons) {
      out.push({ kind: "lesson", module: m, lesson: l });
    }
    out.push({ kind: "unitTest", module: m });
  }
  return out;
}

export function neighbors(lessonId: string): {
  prev?: Step;
  next?: Step;
} {
  const steps = flatSteps();
  const idx = steps.findIndex(
    (s) => s.kind === "lesson" && s.lesson.id === lessonId,
  );
  if (idx === -1) return {};
  return {
    prev: idx > 0 ? steps[idx - 1] : undefined,
    next: idx < steps.length - 1 ? steps[idx + 1] : undefined,
  };
}

export function unitTestNeighbors(moduleId: ModuleId): {
  prev?: Step;
  next?: Step;
} {
  const steps = flatSteps();
  const idx = steps.findIndex(
    (s) => s.kind === "unitTest" && s.module.id === moduleId,
  );
  if (idx === -1) return {};
  return {
    prev: idx > 0 ? steps[idx - 1] : undefined,
    next: idx < steps.length - 1 ? steps[idx + 1] : undefined,
  };
}

export function stepHref(step: Step): string {
  if (step.kind === "lesson") {
    return `/curriculum/${step.module.slug}/${step.lesson.slug}`;
  }
  return `/curriculum/${step.module.slug}/unit-test`;
}

export function stepLabel(step: Step): string {
  if (step.kind === "lesson") return step.lesson.title;
  return `${step.module.title} · Unit test`;
}
