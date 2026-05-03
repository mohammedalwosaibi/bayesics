import { Tex } from "@/components/Math";
import type { ModuleId } from "./curriculum";

export type LessonMcq = {
  kind: "mcq";
  prompt: React.ReactNode;
  options: { id: string; label: React.ReactNode }[];
  correctId: string;
  explanation?: React.ReactNode;
};

export type LessonNumeric = {
  kind: "numeric";
  prompt: React.ReactNode;
  answer: number;
  tolerance?: number;
  unit?: string;
  placeholder?: string;
  successNote?: React.ReactNode;
  wrongNote?: React.ReactNode;
  explanation?: React.ReactNode;
};

export type LessonQuestion = LessonMcq | LessonNumeric;

export const questionsByLessonId: Record<string, LessonQuestion> = {
  // ─── Module 1 — Foundations ───
  "sample-spaces": {
    kind: "numeric",
    prompt: (
      <span>
        A fair six-sided die is rolled once. How many outcomes are in the sample
        space <Tex tex="\Omega" />?
      </span>
    ),
    answer: 6,
    tolerance: 0,
    placeholder: "e.g. 6",
    explanation: (
      <span>
        The sample space is{" "}
        <Tex tex="\Omega = \{1, 2, 3, 4, 5, 6\}" /> — one outcome per face.
      </span>
    ),
  },
  "set-operations": {
    kind: "mcq",
    prompt: (
      <span>
        Roll a fair die. Let <Tex tex="A" /> = "even" and <Tex tex="B" /> = "
        <Tex tex="\geq 4" />". What is <Tex tex="P(A \cup B)" />?
      </span>
    ),
    options: [
      { id: "a", label: <Tex tex="1/2" /> },
      { id: "b", label: <Tex tex="2/3" /> },
      { id: "c", label: <Tex tex="3/4" /> },
      { id: "d", label: <Tex tex="5/6" /> },
    ],
    correctId: "b",
    explanation: (
      <span>
        <Tex tex="A \cup B = \{2, 4, 5, 6\}" />, so the probability is{" "}
        <Tex tex="4/6 = 2/3" />.
      </span>
    ),
  },
  axioms: {
    kind: "numeric",
    prompt: (
      <span>
        If <Tex tex="P(A) = 0.4" /> and <Tex tex="P(B) = 0.5" /> with{" "}
        <Tex tex="A" /> and <Tex tex="B" /> disjoint (mutually exclusive), what
        is <Tex tex="P(A \cup B)" />?
      </span>
    ),
    answer: 0.9,
    placeholder: "e.g. 0.9",
    explanation: (
      <span>
        For disjoint events the additivity axiom gives{" "}
        <Tex tex="P(A \cup B) = P(A) + P(B) = 0.4 + 0.5 = 0.9" />.
      </span>
    ),
  },
  "equally-likely": {
    kind: "numeric",
    prompt: (
      <span>
        Two fair dice are rolled. What is the probability that the sum equals 7?
        Enter as a decimal.
      </span>
    ),
    answer: 1 / 6,
    tolerance: 0.02,
    placeholder: "e.g. 0.167",
    explanation: (
      <span>
        Six of the 36 equally likely outcomes sum to 7:{" "}
        <Tex tex="(1,6), (2,5), (3,4), (4,3), (5,2), (6,1)" />. So the
        probability is <Tex tex="6/36 = 1/6 \approx 0.167" />.
      </span>
    ),
  },
  "multiplication-principle": {
    kind: "numeric",
    prompt: (
      <span>
        A meal has <strong>3</strong> appetizers, <strong>4</strong> mains, and{" "}
        <strong>2</strong> desserts. How many distinct three-course meals are
        possible?
      </span>
    ),
    answer: 24,
    tolerance: 0,
    placeholder: "e.g. 24",
    explanation: (
      <span>
        By the multiplication principle, <Tex tex="3 \times 4 \times 2 = 24" />.
      </span>
    ),
  },
  permutations: {
    kind: "numeric",
    prompt: (
      <span>
        How many ways can <strong>5</strong> distinct books be arranged on a
        shelf?
      </span>
    ),
    answer: 120,
    tolerance: 0,
    placeholder: "e.g. 120",
    explanation: (
      <span>
        <Tex tex="5! = 5 \cdot 4 \cdot 3 \cdot 2 \cdot 1 = 120" /> orderings.
      </span>
    ),
  },
  combinations: {
    kind: "numeric",
    prompt: (
      <span>
        From a group of <strong>10</strong> students, how many ways can a
        committee of <strong>3</strong> be chosen (order doesn't matter)?
      </span>
    ),
    answer: 120,
    tolerance: 0,
    placeholder: "e.g. 120",
    explanation: (
      <span>
        <Tex tex="\binom{10}{3} = \frac{10!}{3!\, 7!} = 120" />.
      </span>
    ),
  },
  "inclusion-exclusion": {
    kind: "mcq",
    prompt: (
      <span>
        A number is drawn uniformly at random from <Tex tex="1" /> to{" "}
        <Tex tex="100" />. What is the probability that it is divisible by 2 or
        by 5?
      </span>
    ),
    options: [
      { id: "a", label: "0.50" },
      { id: "b", label: "0.55" },
      { id: "c", label: "0.60" },
      { id: "d", label: "0.70" },
    ],
    correctId: "c",
    explanation: (
      <span>
        <Tex tex="50/100 + 20/100 - 10/100 = 60/100" />. The 10 numbers
        divisible by both (i.e. divisible by 10) are subtracted to avoid
        double-counting.
      </span>
    ),
  },

  // ─── Module 2 — Conditional Probability ───
  "conditional-definition": {
    kind: "numeric",
    prompt: (
      <span>
        Roll a fair die. Given the result is even, what is the probability it
        is a 6? Enter as a decimal.
      </span>
    ),
    answer: 1 / 3,
    tolerance: 0.02,
    placeholder: "e.g. 0.333",
    explanation: (
      <span>
        <Tex tex="P(6 \mid \text{even}) = \frac{P(\{6\} \cap \text{even})}{P(\text{even})} = \frac{1/6}{1/2} = \frac{1}{3}" />
        . Since <Tex tex="\{6\} \subset \text{even}" />, the intersection is
        just <Tex tex="\{6\}" />.
      </span>
    ),
  },
  "multiplication-rule": {
    kind: "numeric",
    prompt: (
      <span>
        An urn has <strong>5 red</strong> and <strong>5 blue</strong> balls.
        Two balls are drawn without replacement. What is the probability both
        are red?
      </span>
    ),
    answer: 2 / 9,
    tolerance: 0.02,
    placeholder: "e.g. 0.222",
    explanation: (
      <span>
        <Tex tex="P(R_1) \cdot P(R_2 \mid R_1) = \frac{5}{10} \cdot \frac{4}{9} = \frac{2}{9}" />
        .
      </span>
    ),
  },
  independence: {
    kind: "numeric",
    prompt: (
      <span>
        A fair coin is flipped twice. What is the probability both flips are
        heads?
      </span>
    ),
    answer: 0.25,
    tolerance: 0.01,
    placeholder: "e.g. 0.25",
    explanation: (
      <span>
        Independent flips:{" "}
        <Tex tex="P(HH) = P(H)\,P(H) = (1/2)(1/2) = 1/4" />.
      </span>
    ),
  },
  "total-probability": {
    kind: "numeric",
    prompt: (
      <span>
        Urn 1 has <strong>2 red</strong> and <strong>3 blue</strong>; Urn 2 has{" "}
        <strong>4 red</strong> and <strong>1 blue</strong>. A fair coin
        chooses an urn, then one ball is drawn. What is the probability the
        ball is red?
      </span>
    ),
    answer: 0.6,
    tolerance: 0.01,
    placeholder: "e.g. 0.6",
    explanation: (
      <span>
        <Tex tex="P(R) = \tfrac{1}{2}\cdot \tfrac{2}{5} + \tfrac{1}{2}\cdot \tfrac{4}{5} = \tfrac{3}{5}" />
        .
      </span>
    ),
  },
  "bayes-theorem": {
    kind: "mcq",
    prompt: (
      <span>
        A disease affects <strong>1%</strong> of a population. A test has{" "}
        <strong>99% sensitivity</strong> and <strong>99% specificity</strong>.
        If a random person tests positive, what is{" "}
        <Tex tex="P(D \mid +)" />?
      </span>
    ),
    options: [
      { id: "a", label: "About 50%" },
      { id: "b", label: "About 75%" },
      { id: "c", label: "About 99%" },
      { id: "d", label: "About 1%" },
    ],
    correctId: "a",
    explanation: (
      <span>
        <Tex tex="P(D \mid +) = \tfrac{0.99 \cdot 0.01}{0.99 \cdot 0.01 + 0.01 \cdot 0.99} = 0.5" />
        . With a 1% base rate, false positives match true positives one-for-one.
      </span>
    ),
  },
  "bayes-pitfalls": {
    kind: "mcq",
    prompt: (
      <span>
        A DNA match has a 1-in-1,000,000 random-match probability. A prosecutor
        argues "there's a 1-in-a-million chance he's innocent." Which best
        describes the error?
      </span>
    ),
    options: [
      { id: "a", label: "No error — the math is right." },
      {
        id: "b",
        label: (
          <span>
            Confuses <Tex tex="P(\text{match} \mid \text{innocent})" /> with{" "}
            <Tex tex="P(\text{innocent} \mid \text{match})" />.
          </span>
        ),
      },
      { id: "c", label: "Underestimates the strength of the evidence." },
      { id: "d", label: "Ignores test sensitivity." },
    ],
    correctId: "b",
    explanation: (
      <span>
        The two conditionals are not equal — the base rate of guilt and the
        size of the database both matter. This is the prosecutor's fallacy.
      </span>
    ),
  },

  // ─── Module 3 — Discrete Random Variables ───
  "random-variable": {
    kind: "mcq",
    prompt: (
      <span>
        Let <Tex tex="X" /> be the number of heads in two fair coin flips. What
        values can <Tex tex="X" /> take?
      </span>
    ),
    options: [
      { id: "a", label: <Tex tex="\{0, 1\}" /> },
      { id: "b", label: <Tex tex="\{1, 2\}" /> },
      { id: "c", label: <Tex tex="\{0, 1, 2\}" /> },
      { id: "d", label: <Tex tex="\{0, 1, 2, 3\}" /> },
    ],
    correctId: "c",
    explanation: (
      <span>
        With two flips the heads count ranges from 0 (TT) to 2 (HH).
      </span>
    ),
  },
  pmf: {
    kind: "numeric",
    prompt: (
      <span>
        For <Tex tex="X" /> = number of heads in 2 fair coin flips, what is{" "}
        <Tex tex="P(X = 1)" />? Enter as a decimal.
      </span>
    ),
    answer: 0.5,
    tolerance: 0.01,
    placeholder: "e.g. 0.5",
    explanation: (
      <span>
        Outcomes <strong>HT</strong> and <strong>TH</strong> out of 4 equally
        likely outcomes: <Tex tex="2/4 = 0.5" />.
      </span>
    ),
  },
  "cdf-discrete": {
    kind: "numeric",
    prompt: (
      <span>
        For <Tex tex="X" /> = roll of a fair die, what is{" "}
        <Tex tex="F(3) = P(X \leq 3)" />? Enter as a decimal.
      </span>
    ),
    answer: 0.5,
    tolerance: 0.01,
    placeholder: "e.g. 0.5",
    explanation: (
      <span>
        Outcomes <Tex tex="\{1, 2, 3\}" /> out of 6: <Tex tex="3/6 = 0.5" />.
      </span>
    ),
  },
  "expected-value": {
    kind: "numeric",
    prompt: (
      <span>
        A fair six-sided die is rolled. What is <Tex tex="E[X]" />?
      </span>
    ),
    answer: 3.5,
    tolerance: 0.01,
    placeholder: "e.g. 3.5",
    explanation: (
      <span>
        <Tex tex="E[X] = \tfrac{1+2+3+4+5+6}{6} = 3.5" />.
      </span>
    ),
  },
  variance: {
    kind: "numeric",
    prompt: (
      <span>
        A fair six-sided die is rolled. What is <Tex tex="\mathrm{Var}(X)" />?
        Enter as a decimal.
      </span>
    ),
    answer: 35 / 12,
    tolerance: 0.01,
    placeholder: "e.g. 2.917",
    explanation: (
      <span>
        <Tex tex="E[X^2] = 91/6" />, so{" "}
        <Tex tex="\mathrm{Var}(X) = 91/6 - (7/2)^2 = 35/12 \approx 2.917" />.
      </span>
    ),
  },
  bernoulli: {
    kind: "numeric",
    prompt: (
      <span>
        <Tex tex="X \sim \mathrm{Bernoulli}(0.3)" />. What is{" "}
        <Tex tex="\mathrm{Var}(X)" />?
      </span>
    ),
    answer: 0.21,
    tolerance: 0.01,
    placeholder: "e.g. 0.21",
    explanation: (
      <span>
        <Tex tex="\mathrm{Var}(X) = p(1-p) = 0.3 \cdot 0.7 = 0.21" />.
      </span>
    ),
  },
  binomial: {
    kind: "numeric",
    prompt: (
      <span>
        A basketball player makes free throws independently with probability{" "}
        <Tex tex="0.8" />. In <strong>5</strong> attempts, what is the
        probability of exactly <strong>4</strong> makes?
      </span>
    ),
    answer: 0.4096,
    tolerance: 0.02,
    placeholder: "e.g. 0.41",
    explanation: (
      <span>
        <Tex tex="\binom{5}{4}(0.8)^4(0.2) = 5 \cdot 0.4096 \cdot 0.2 = 0.4096" />
        .
      </span>
    ),
  },
  geometric: {
    kind: "numeric",
    prompt: (
      <span>
        Flip a fair coin until the first head. What is the probability the
        first head occurs on the <strong>3rd</strong> flip?
      </span>
    ),
    answer: 0.125,
    tolerance: 0.01,
    placeholder: "e.g. 0.125",
    explanation: (
      <span>
        <Tex tex="P(X = 3) = (1/2)^2 \cdot (1/2) = 1/8 = 0.125" />.
      </span>
    ),
  },
  poisson: {
    kind: "numeric",
    prompt: (
      <span>
        Calls arrive at a help desk at rate <Tex tex="\lambda = 2" /> per
        minute. What is the probability of exactly <strong>0</strong> calls in
        a given minute?
      </span>
    ),
    answer: Math.exp(-2),
    tolerance: 0.02,
    placeholder: "e.g. 0.135",
    explanation: (
      <span>
        <Tex tex="P(X = 0) = e^{-2} \cdot 2^0 / 0! = e^{-2} \approx 0.135" />.
      </span>
    ),
  },
  hypergeometric: {
    kind: "numeric",
    prompt: (
      <span>
        An urn has <strong>5 red</strong> and <strong>5 blue</strong> balls.
        Draw <strong>3</strong> without replacement. What is the probability of
        exactly <strong>2 red</strong>?
      </span>
    ),
    answer: 5 / 12,
    tolerance: 0.02,
    placeholder: "e.g. 0.417",
    explanation: (
      <span>
        <Tex tex="\binom{5}{2}\binom{5}{1} / \binom{10}{3} = (10 \cdot 5)/120 = 5/12 \approx 0.417" />
        .
      </span>
    ),
  },

  // ─── Module 4 — Continuous Random Variables ───
  "discrete-to-continuous": {
    kind: "numeric",
    prompt: (
      <span>
        For a continuous random variable <Tex tex="X" />, what is{" "}
        <Tex tex="P(X = c)" /> for any specific value <Tex tex="c" />?
      </span>
    ),
    answer: 0,
    tolerance: 0,
    placeholder: "e.g. 0",
    explanation: (
      <span>
        Continuous distributions assign zero probability to any single point —
        only intervals carry positive probability.
      </span>
    ),
  },
  pdf: {
    kind: "numeric",
    prompt: (
      <span>
        <Tex tex="X" /> has PDF <Tex tex="f(x) = 2x" /> for{" "}
        <Tex tex="0 \leq x \leq 1" />, else 0. What is{" "}
        <Tex tex="P(X \leq 1/2)" />?
      </span>
    ),
    answer: 0.25,
    tolerance: 0.01,
    placeholder: "e.g. 0.25",
    explanation: (
      <span>
        <Tex tex="\int_0^{1/2} 2x \, dx = (1/2)^2 = 1/4" />.
      </span>
    ),
  },
  "cdf-continuous": {
    kind: "numeric",
    prompt: (
      <span>
        For <Tex tex="X \sim \mathrm{Uniform}(0, 1)" />, what is{" "}
        <Tex tex="F(0.4)" />?
      </span>
    ),
    answer: 0.4,
    tolerance: 0.01,
    placeholder: "e.g. 0.4",
    explanation: (
      <span>
        For Uniform(0,1), <Tex tex="F(x) = x" /> on <Tex tex="[0, 1]" />.
      </span>
    ),
  },
  "expectation-continuous": {
    kind: "numeric",
    prompt: (
      <span>
        For <Tex tex="X \sim \mathrm{Uniform}(0, 1)" />, what is{" "}
        <Tex tex="E[X]" />?
      </span>
    ),
    answer: 0.5,
    tolerance: 0.01,
    placeholder: "e.g. 0.5",
    explanation: (
      <span>
        <Tex tex="E[X] = (a+b)/2 = (0+1)/2 = 0.5" />.
      </span>
    ),
  },
  "variance-continuous": {
    kind: "numeric",
    prompt: (
      <span>
        For <Tex tex="X \sim \mathrm{Uniform}(0, 1)" />, what is{" "}
        <Tex tex="\mathrm{Var}(X)" />? Enter as a decimal.
      </span>
    ),
    answer: 1 / 12,
    tolerance: 0.02,
    placeholder: "e.g. 0.083",
    explanation: (
      <span>
        <Tex tex="\mathrm{Var}(X) = (b - a)^2 / 12 = 1/12 \approx 0.083" />.
      </span>
    ),
  },
  uniform: {
    kind: "numeric",
    prompt: (
      <span>
        <Tex tex="X \sim \mathrm{Uniform}(2, 8)" />. What is{" "}
        <Tex tex="P(3 \leq X \leq 5)" />?
      </span>
    ),
    answer: 1 / 3,
    tolerance: 0.02,
    placeholder: "e.g. 0.333",
    explanation: (
      <span>
        Length 2 over total length 6: <Tex tex="2/6 = 1/3" />.
      </span>
    ),
  },
  exponential: {
    kind: "numeric",
    prompt: (
      <span>
        <Tex tex="X \sim \mathrm{Exponential}(\lambda = 1)" /> (mean 1). What
        is <Tex tex="P(X > 1)" />?
      </span>
    ),
    answer: Math.exp(-1),
    tolerance: 0.02,
    placeholder: "e.g. 0.368",
    explanation: (
      <span>
        <Tex tex="P(X > t) = e^{-\lambda t} = e^{-1} \approx 0.368" />.
      </span>
    ),
  },
  memorylessness: {
    kind: "mcq",
    prompt: (
      <span>
        <Tex tex="X \sim \mathrm{Exponential}(\lambda)" />. Given{" "}
        <Tex tex="X > 2" />, what is <Tex tex="P(X > 5 \mid X > 2)" />?
      </span>
    ),
    options: [
      { id: "a", label: <Tex tex="P(X > 3)" /> },
      { id: "b", label: <Tex tex="P(X > 5)" /> },
      { id: "c", label: <Tex tex="P(X > 7)" /> },
      { id: "d", label: <Tex tex="0" /> },
    ],
    correctId: "a",
    explanation: (
      <span>
        Memorylessness:{" "}
        <Tex tex="P(X > s + t \mid X > s) = P(X > t)" />. Here{" "}
        <Tex tex="t = 5 - 2 = 3" />.
      </span>
    ),
  },
  normal: {
    kind: "numeric",
    prompt: (
      <span>
        <Tex tex="X \sim N(0, 1)" />. What is{" "}
        <Tex tex="P(-1 \leq X \leq 1)" />? Enter as a decimal to three places.
      </span>
    ),
    answer: 0.683,
    tolerance: 0.02,
    placeholder: "e.g. 0.683",
    explanation: (
      <span>
        The "68% rule": about 68.27% of a standard normal lies within one
        standard deviation of the mean.
      </span>
    ),
  },
  standardization: {
    kind: "numeric",
    prompt: (
      <span>
        Heights are <Tex tex="N(\mu = 170,\, \sigma = 10)" /> cm. What Z-score
        corresponds to a height of <strong>185</strong> cm?
      </span>
    ),
    answer: 1.5,
    tolerance: 0.01,
    placeholder: "e.g. 1.5",
    explanation: (
      <span>
        <Tex tex="Z = (185 - 170)/10 = 1.5" />.
      </span>
    ),
  },

  // ─── Module 5 — Multiple Random Variables ───
  "joint-discrete": {
    kind: "numeric",
    prompt: (
      <span>
        Flip two fair coins. Let <Tex tex="X" /> = number of heads,{" "}
        <Tex tex="Y = 1" /> if first flip is H, else 0. What is{" "}
        <Tex tex="P(X = 1, Y = 1)" />?
      </span>
    ),
    answer: 0.25,
    tolerance: 0.01,
    placeholder: "e.g. 0.25",
    explanation: (
      <span>
        That joint event picks out the single outcome <strong>HT</strong>:{" "}
        <Tex tex="1/4 = 0.25" />.
      </span>
    ),
  },
  marginal: {
    kind: "numeric",
    prompt: (
      <span>
        Same setup as before:{" "}
        <Tex tex="X" /> = #heads in two flips,{" "}
        <Tex tex="Y = 1" /> iff first flip is H. What is the marginal{" "}
        <Tex tex="P(Y = 1)" />?
      </span>
    ),
    answer: 0.5,
    tolerance: 0.01,
    placeholder: "e.g. 0.5",
    explanation: (
      <span>
        Sum across the row: the first flip is H with probability 1/2 regardless
        of <Tex tex="X" />.
      </span>
    ),
  },
  "conditional-dist": {
    kind: "numeric",
    prompt: (
      <span>
        Same setup. What is <Tex tex="P(X = 1 \mid Y = 1)" />?
      </span>
    ),
    answer: 0.5,
    tolerance: 0.01,
    placeholder: "e.g. 0.5",
    explanation: (
      <span>
        Given the first flip is H, the second flip is H or T equally;{" "}
        <Tex tex="X = 1" /> iff the second flip is T.
      </span>
    ),
  },
  "independence-rvs": {
    kind: "mcq",
    prompt: (
      <span>
        Two fair dice are rolled independently with results{" "}
        <Tex tex="X" /> and <Tex tex="Y" />. Are <Tex tex="X" /> and{" "}
        <Tex tex="Y" /> independent?
      </span>
    ),
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" },
      { id: "c", label: "Only when their sum is even" },
      { id: "d", label: "Cannot tell from the description" },
    ],
    correctId: "a",
    explanation: (
      <span>
        The joint PMF factors:{" "}
        <Tex tex="P(X = i, Y = j) = (1/6)(1/6)" /> for every{" "}
        <Tex tex="(i, j)" />.
      </span>
    ),
  },
  "linearity-of-expectation": {
    kind: "numeric",
    prompt: (
      <span>
        Roll two fair dice with results <Tex tex="X" /> and <Tex tex="Y" />.
        What is <Tex tex="E[X + Y]" />?
      </span>
    ),
    answer: 7,
    tolerance: 0.01,
    placeholder: "e.g. 7",
    explanation: (
      <span>
        Linearity:{" "}
        <Tex tex="E[X + Y] = E[X] + E[Y] = 3.5 + 3.5 = 7" /> — independence isn't
        needed.
      </span>
    ),
  },
  "joint-continuous": {
    kind: "numeric",
    prompt: (
      <span>
        <Tex tex="(X, Y)" /> is uniform on the unit square{" "}
        <Tex tex="[0, 1]^2" />. What is <Tex tex="P(X + Y \leq 1)" />?
      </span>
    ),
    answer: 0.5,
    tolerance: 0.01,
    placeholder: "e.g. 0.5",
    explanation: (
      <span>
        The region <Tex tex="x + y \leq 1" /> inside the unit square is a right
        triangle with area <Tex tex="1/2" />.
      </span>
    ),
  },
  covariance: {
    kind: "numeric",
    prompt: (
      <span>
        <Tex tex="X" /> is a fair die roll and <Tex tex="Y = X" />. What is{" "}
        <Tex tex="\mathrm{Cov}(X, Y)" />? Enter as a decimal.
      </span>
    ),
    answer: 35 / 12,
    tolerance: 0.02,
    placeholder: "e.g. 2.917",
    explanation: (
      <span>
        <Tex tex="\mathrm{Cov}(X, X) = \mathrm{Var}(X) = 35/12 \approx 2.917" />
        .
      </span>
    ),
  },
  correlation: {
    kind: "mcq",
    prompt: (
      <span>
        If <Tex tex="Y = 2X + 3" /> with <Tex tex="\mathrm{Var}(X) > 0" />, what
        is <Tex tex="\mathrm{Corr}(X, Y)" />?
      </span>
    ),
    options: [
      { id: "a", label: <Tex tex="-1" /> },
      { id: "b", label: <Tex tex="0" /> },
      { id: "c", label: <Tex tex="0.5" /> },
      { id: "d", label: <Tex tex="1" /> },
    ],
    correctId: "d",
    explanation: (
      <span>
        A positive linear transformation gives perfect positive correlation.
      </span>
    ),
  },
  "conditional-expectation": {
    kind: "numeric",
    prompt: (
      <span>
        Roll two fair dice <Tex tex="X_1" /> and <Tex tex="X_2" />; let{" "}
        <Tex tex="S = X_1 + X_2" />. What is{" "}
        <Tex tex="E[S \mid X_1 = 4]" />?
      </span>
    ),
    answer: 7.5,
    tolerance: 0.01,
    placeholder: "e.g. 7.5",
    explanation: (
      <span>
        <Tex tex="E[S \mid X_1 = 4] = 4 + E[X_2] = 4 + 3.5 = 7.5" />.
      </span>
    ),
  },
  "sums-of-rvs": {
    kind: "mcq",
    prompt: (
      <span>
        <Tex tex="X \sim \mathrm{Binomial}(5, 0.5)" /> and{" "}
        <Tex tex="Y \sim \mathrm{Binomial}(7, 0.5)" /> are independent. What is
        the distribution of <Tex tex="X + Y" />?
      </span>
    ),
    options: [
      { id: "a", label: <Tex tex="\mathrm{Binomial}(12, 0.5)" /> },
      { id: "b", label: <Tex tex="\mathrm{Binomial}(12, 0.25)" /> },
      { id: "c", label: <Tex tex="\mathrm{Binomial}(35, 0.5)" /> },
      { id: "d", label: "Not Binomial" },
    ],
    correctId: "a",
    explanation: (
      <span>
        Sums of independent binomials with the <em>same</em> p are binomial,
        with summed n.
      </span>
    ),
  },

  // ─── Module 6 — Limit Theorems ───
  "markov-inequality": {
    kind: "numeric",
    prompt: (
      <span>
        <Tex tex="X \geq 0" /> has <Tex tex="E[X] = 4" />. What is the best
        Markov upper bound on <Tex tex="P(X \geq 16)" />?
      </span>
    ),
    answer: 0.25,
    tolerance: 0.01,
    placeholder: "e.g. 0.25",
    explanation: (
      <span>
        <Tex tex="P(X \geq a) \leq E[X]/a = 4/16 = 0.25" />.
      </span>
    ),
  },
  chebyshev: {
    kind: "numeric",
    prompt: (
      <span>
        <Tex tex="X" /> has mean <strong>10</strong> and variance{" "}
        <strong>4</strong>. What is the Chebyshev upper bound on{" "}
        <Tex tex="P(|X - 10| \geq 4)" />?
      </span>
    ),
    answer: 0.25,
    tolerance: 0.01,
    placeholder: "e.g. 0.25",
    explanation: (
      <span>
        <Tex tex="\sigma = 2" />, so <Tex tex="k = 4/2 = 2" /> and{" "}
        <Tex tex="1/k^2 = 1/4 = 0.25" />.
      </span>
    ),
  },
  wlln: {
    kind: "numeric",
    prompt: (
      <span>
        Flip a fair coin <Tex tex="n" /> times and let <Tex tex="\hat p_n" /> be
        the fraction of heads. As <Tex tex="n \to \infty" />,{" "}
        <Tex tex="\hat p_n" /> converges in probability to what value?
      </span>
    ),
    answer: 0.5,
    tolerance: 0.01,
    placeholder: "e.g. 0.5",
    explanation: (
      <span>
        Weak law of large numbers: the sample mean converges in probability to
        the true mean, here <Tex tex="p = 0.5" />.
      </span>
    ),
  },
  clt: {
    kind: "numeric",
    prompt: (
      <span>
        Roll a fair die <strong>100</strong> times; let{" "}
        <Tex tex="S" /> be the sum. By the CLT,{" "}
        <Tex tex="S" /> is approximately normal. What is{" "}
        <Tex tex="E[S]" />?
      </span>
    ),
    answer: 350,
    tolerance: 0.01,
    placeholder: "e.g. 350",
    explanation: (
      <span>
        <Tex tex="E[S] = 100 \cdot E[X] = 100 \cdot 3.5 = 350" />. (Variance:{" "}
        <Tex tex="100 \cdot 35/12 \approx 291.7" />.)
      </span>
    ),
  },
  "normal-approx-binomial": {
    kind: "numeric",
    prompt: (
      <span>
        <Tex tex="X \sim \mathrm{Binomial}(100, 0.5)" />. Using the normal
        approximation (no continuity correction), estimate{" "}
        <Tex tex="P(X \geq 60)" />.
      </span>
    ),
    answer: 0.0228,
    tolerance: 0.05,
    placeholder: "e.g. 0.023",
    explanation: (
      <span>
        <Tex tex="\mu = 50,\; \sigma = 5" />, so{" "}
        <Tex tex="Z = (60 - 50)/5 = 2" />, and{" "}
        <Tex tex="P(Z \geq 2) \approx 0.0228" />.
      </span>
    ),
  },

  // ─── Module 7 — Stochastic Processes ───
  "markov-states": {
    kind: "numeric",
    prompt: (
      <span>
        A two-state Markov chain on <strong>Sunny / Rainy</strong> has{" "}
        <Tex tex="P(S \to R) = 0.2" /> and{" "}
        <Tex tex="P(R \to S) = 0.5" />. If today is Sunny, what is the
        probability tomorrow is Sunny?
      </span>
    ),
    answer: 0.8,
    tolerance: 0.01,
    placeholder: "e.g. 0.8",
    explanation: (
      <span>
        <Tex tex="P(S \to S) = 1 - P(S \to R) = 0.8" />.
      </span>
    ),
  },
  "transition-matrices": {
    kind: "numeric",
    prompt: (
      <span>
        Same chain. If today is Sunny, what is the probability the day{" "}
        <em>after</em> tomorrow is Sunny?
      </span>
    ),
    answer: 0.74,
    tolerance: 0.01,
    placeholder: "e.g. 0.74",
    explanation: (
      <span>
        <Tex tex="0.8 \cdot 0.8 + 0.2 \cdot 0.5 = 0.64 + 0.10 = 0.74" />.
      </span>
    ),
  },
  "stationary-distributions": {
    kind: "numeric",
    prompt: (
      <span>
        For the same chain, what is the stationary probability of{" "}
        <strong>Sunny</strong>? Enter as a decimal.
      </span>
    ),
    answer: 5 / 7,
    tolerance: 0.02,
    placeholder: "e.g. 0.714",
    explanation: (
      <span>
        Solve <Tex tex="\pi_S \cdot 0.2 = \pi_R \cdot 0.5" /> with{" "}
        <Tex tex="\pi_S + \pi_R = 1" />: <Tex tex="\pi_S = 5/7 \approx 0.714" />
        .
      </span>
    ),
  },
  "poisson-processes": {
    kind: "numeric",
    prompt: (
      <span>
        Customers arrive as a Poisson process with rate <strong>3</strong> per
        hour. What is the probability exactly <strong>2</strong> customers
        arrive in a given hour?
      </span>
    ),
    answer: (9 * Math.exp(-3)) / 2,
    tolerance: 0.02,
    placeholder: "e.g. 0.224",
    explanation: (
      <span>
        <Tex tex="P(N = 2) = e^{-3} \cdot 3^2 / 2! = 9 e^{-3}/2 \approx 0.224" />
        .
      </span>
    ),
  },
};

export const unitTestByModuleId: Record<ModuleId, LessonQuestion> = {
  foundations: {
    kind: "numeric",
    prompt: (
      <span>
        A 4-digit PIN uses digits 0–9 with <strong>no repeated digits</strong>.
        What is the probability that a random such PIN contains{" "}
        <strong>both</strong> a 0 and a 9? Enter as a decimal.
      </span>
    ),
    answer: 2 / 15,
    tolerance: 0.02,
    placeholder: "e.g. 0.133",
    explanation: (
      <span>
        Total PINs: <Tex tex="10 \cdot 9 \cdot 8 \cdot 7 = 5040" />. By
        inclusion–exclusion, PINs missing 0 <em>or</em> 9 number{" "}
        <Tex tex="2 \cdot (9 \cdot 8 \cdot 7 \cdot 6) - (8 \cdot 7 \cdot 6 \cdot 5) = 4368" />
        . So{" "}
        <Tex tex="P(\text{both}) = 1 - 4368/5040 = 2/15 \approx 0.133" />.
      </span>
    ),
  },
  conditional: {
    kind: "numeric",
    prompt: (
      <span>
        A factory's machines <strong>A</strong> and <strong>B</strong> produce
        60% and 40% of items, with defect rates 2% and 5% respectively. Given a
        randomly selected item is defective, what is the probability it came
        from machine <strong>B</strong>?
      </span>
    ),
    answer: 0.625,
    tolerance: 0.02,
    placeholder: "e.g. 0.625",
    explanation: (
      <span>
        <Tex tex="P(B \mid D) = \tfrac{0.4 \cdot 0.05}{0.6 \cdot 0.02 + 0.4 \cdot 0.05} = \tfrac{0.02}{0.032} = 5/8" />
        .
      </span>
    ),
  },
  discrete: {
    kind: "numeric",
    prompt: (
      <span>
        A coin with <Tex tex="P(H) = 0.3" /> is flipped <strong>10</strong>{" "}
        times independently. What is the <em>variance</em> of the number of
        heads?
      </span>
    ),
    answer: 2.1,
    tolerance: 0.01,
    placeholder: "e.g. 2.1",
    explanation: (
      <span>
        For <Tex tex="\mathrm{Binomial}(n, p)" />,{" "}
        <Tex tex="\mathrm{Var} = np(1-p) = 10 \cdot 0.3 \cdot 0.7 = 2.1" />.
        (Mean <Tex tex="np = 3" />.)
      </span>
    ),
  },
  continuous: {
    kind: "numeric",
    prompt: (
      <span>
        Bus arrivals are <Tex tex="\mathrm{Exponential}" /> with mean{" "}
        <strong>10</strong> minutes. You've already waited 5 minutes. What is
        the probability you wait <strong>at least 10 more</strong> minutes?
      </span>
    ),
    answer: Math.exp(-1),
    tolerance: 0.02,
    placeholder: "e.g. 0.368",
    explanation: (
      <span>
        By memorylessness, the additional wait is again{" "}
        <Tex tex="\mathrm{Exp}(1/10)" />, so{" "}
        <Tex tex="P(\text{wait} > 10) = e^{-1} \approx 0.368" />.
      </span>
    ),
  },
  joint: {
    kind: "numeric",
    prompt: (
      <span>
        Roll two fair dice independently with values <Tex tex="X" /> and{" "}
        <Tex tex="Y" />; let <Tex tex="S = X + Y" />. What is{" "}
        <Tex tex="\mathrm{Var}(S)" />? Enter as a decimal.
      </span>
    ),
    answer: 35 / 6,
    tolerance: 0.02,
    placeholder: "e.g. 5.833",
    explanation: (
      <span>
        Independence gives{" "}
        <Tex tex="\mathrm{Var}(S) = \mathrm{Var}(X) + \mathrm{Var}(Y) = 35/12 + 35/12 = 35/6 \approx 5.833" />
        .
      </span>
    ),
  },
  limits: {
    kind: "numeric",
    prompt: (
      <span>
        A fair coin is flipped <strong>10,000</strong> times. Using the CLT
        (no continuity correction), estimate the probability that the number of
        heads lies between 4,900 and 5,100.
      </span>
    ),
    answer: 0.954,
    tolerance: 0.02,
    placeholder: "e.g. 0.954",
    explanation: (
      <span>
        <Tex tex="\mu = 5000,\; \sigma = 50" />. The bounds are{" "}
        <Tex tex="\pm 2\sigma" />, giving{" "}
        <Tex tex="\Phi(2) - \Phi(-2) \approx 0.9544" />.
      </span>
    ),
  },
  stochastic: {
    kind: "numeric",
    prompt: (
      <span>
        Phone calls arrive as a Poisson process at rate <strong>4</strong> per
        hour. What is the probability of <strong>zero calls</strong> in a
        30-minute interval?
      </span>
    ),
    answer: Math.exp(-2),
    tolerance: 0.02,
    placeholder: "e.g. 0.135",
    explanation: (
      <span>
        For interval <Tex tex="t" /> hours,{" "}
        <Tex tex="N(t) \sim \mathrm{Poisson}(\lambda t)" /> with{" "}
        <Tex tex="\lambda t = 4 \cdot 0.5 = 2" />. So{" "}
        <Tex tex="P(N = 0) = e^{-2} \approx 0.135" />.
      </span>
    ),
  },
};
