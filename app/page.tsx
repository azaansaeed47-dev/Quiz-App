"use client";

import { useState } from "react";

type Question = {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

const questions: Question[] = [
  {
    question: "Which language runs natively in a web browser?",
    options: ["JavaScript", "Python", "C++", "Java"],
    answer: 0,
    explanation:
      "JavaScript is the standard programming language supported by web browsers.",
  },
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Trainer Marking Language",
      "HyperText Markup Language",
      "HighText Machine Language",
      "HyperText Markdown Language",
    ],
    answer: 1,
    explanation:
      "HTML stands for HyperText Markup Language and structures web pages.",
  },
  {
    question: "Which CSS property changes text color?",
    options: ["font-style", "background", "color", "text-size"],
    answer: 2,
    explanation: "The CSS color property sets the foreground color of text.",
  },
  {
    question: "Which keyword declares a block-scoped variable in JavaScript?",
    options: ["varname", "let", "define", "dim"],
    answer: 1,
    explanation: "let declares a block-scoped variable in JavaScript.",
  },
  {
    question: "What does DOM stand for?",
    options: [
      "Document Object Model",
      "Data Oriented Method",
      "Digital Ordinance Model",
      "Document Output Mode",
    ],
    answer: 0,
    explanation:
      "The DOM represents a web document as objects that JavaScript can access and manipulate.",
  },
  {
    question: "Which array method adds an item to the end?",
    options: ["pop()", "shift()", "push()", "slice()"],
    answer: 2,
    explanation: "push() adds one or more elements to the end of an array.",
  },
  {
    question: "Which HTTP status code means Not Found?",
    options: ["200", "301", "404", "500"],
    answer: 2,
    explanation:
      "HTTP 404 indicates that the requested resource was not found.",
  },
  {
    question: "Which Git command creates a new commit?",
    options: ["git push", "git commit", "git clone", "git status"],
    answer: 1,
    explanation:
      "git commit records staged changes in the local repository history.",
  },
  {
    question:
      "Which CSS layout system is designed for two-dimensional layouts?",
    options: ["Float", "Inline", "CSS Grid", "Text flow"],
    answer: 2,
    explanation:
      "CSS Grid handles rows and columns, making it suitable for two-dimensional layouts.",
  },
  {
    question: "What does JSON.parse() do in JavaScript?",
    options: [
      "Converts an object into a JSON string",
      "Parses a JSON string into a JavaScript value",
      "Sends a request to a server",
      "Creates a new HTML element",
    ],
    answer: 1,
    explanation:
      "JSON.parse() converts valid JSON text into its corresponding JavaScript value.",
  },
];

type Phase = "welcome" | "quiz" | "result";

export default function Home() {
  const [phase, setPhase] = useState<Phase>("welcome");
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<Record<number, number>>({});

  const question = questions[current];
  const score = questions.reduce(
    (total, item, index) => total + (selected[index] === item.answer ? 1 : 0),
    0,
  );
  const percentage = Math.round((score / questions.length) * 100);
  const answered = Object.keys(selected).length;
  const progress = ((current + 1) / questions.length) * 100;

  function startQuiz() {
    setCurrent(0);
    setSelected({});
    setPhase("quiz");
  }

  function finishQuiz() {
    setPhase("result");
  }

  function chooseAnswer(optionIndex: number) {
    setSelected((previous) => ({
      ...previous,
      [current]: optionIndex,
    }));
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#090811] text-white">
      {/* Decorative purple background */}
      <div className="pointer-events-none absolute -left-40 -top-32 h-96 w-96 rounded-full bg-purple-700/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 top-1/3 h-96 w-96 rounded-full bg-indigo-600/20 blur-[130px]" />

      <header className="relative z-10 border-b `border-white/[0.08]`">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
          <button
            onClick={() => setPhase("welcome")}
            className="flex items-center gap-3 text-left"
            aria-label="Go to QuizNova home"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl `bg-gradient-to-br` from-violet-500 to-indigo-600 text-xl font-black shadow-lg shadow-violet-900/40">
              Q
            </span>
            <span>
              <span className="block text-lg font-bold tracking-tight">
                Quiz-App
              </span>
              <span className="block text-xs text-slate-400">
                Learn. Challenge. Grow.
              </span>
            </span>
          </button>

          <div className="rounded-full border border-white/10 `bg-white/[0.04]` px-4 py-2 text-xs font-medium text-slate-300">
            Interactive Quiz
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-16">
        {phase === "welcome" && (
          <section className="mx-auto flex min-h-[65vh] max-w-3xl flex-col items-center justify-center text-center">
            <div className="mb-7 rounded-full border border-violet-400/20 `bg-violet-400/[0.08]` px-4 py-2 text-sm text-violet-200">
              ✨ Your next challenge starts here
            </div>
            <div className="mb-7 rounded-full border border-violet-400/20 `bg-violet-400/[0.08]` px-4 py-2 text-sm text-violet-200">
              Let's Play the Coding Quiz! 🚀
            </div>

            <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              Test your skills.
              <span className="mt-2 block `bg-gradient-to-r` from-violet-400 via-purple-300 to-indigo-400 bg-clip-text text-transparent">
                Discover your potential.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-slate-400 sm:text-lg">
              Take on 10 carefully selected web development questions. Challenge
              yourself, track your score, and review every answer.
            </p>

            <div className="mt-9 grid w-full max-w-lg grid-cols-3 gap-3">
              {[
                ["10", "Questions"],
                ["4", "Options each"],
                ["100%", "Your effort"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-2xl border `border-white/[0.09]` bg-white/[0.035] p-4"
                >
                  <p className="text-xl font-bold text-violet-300 sm:text-2xl">
                    {value}
                  </p>
                  <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={startQuiz}
              className="mt-9 w-full max-w-xs rounded-2xl `bg-gradient-to-r` from-violet-600 to-indigo-600 px-7 py-4 font-semibold shadow-xl shadow-violet-950/50 transition hover:-translate-y-0.5 hover:from-violet-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 focus:ring-offset-[#090811]"
            >
              Start the Quiz <span aria-hidden="true">→</span>
            </button>

            <p className="mt-4 text-xs text-slate-500">
              No pressure. Just learn something new.
            </p>
          </section>
        )}

        {phase === "quiz" && (
          <section className="mx-auto max-w-3xl">
            <div className="mb-7 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-violet-300">WEB DEVELOPMENT</p>
                <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
                  Knowledge Check
                </h1>
              </div>
              <div className="shrink-0 rounded-xl border border-white/10 `bg-white/[0.04]` px-4 py-3 text-right">
                <p className="text-xs text-slate-400">QUESTION</p>
                <p className="mt-1 font-bold">
                  {String(current + 1).padStart(2, "0")}
                  <span className="text-slate-500"> / {questions.length}</span>
                </p>
              </div>
            </div>

            <div
              className="mb-8 h-2 overflow-hidden rounded-full bg-white/10"
              role="progressbar"
              aria-label="Quiz progress"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progress)}
            >
              <div
                className="h-full rounded-full `bg-gradient-to-r` from-violet-500 to-indigo-400 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#11101c]/90 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-9">
              <p className="text-sm text-slate-400">
                Question {current + 1} of {questions.length}
              </p>

              <h2 className="mt-4 text-2xl font-bold leading-snug sm:text-3xl">
                {question.question}
              </h2>

              <p className="mt-3 text-sm text-slate-400">
                Select one answer to continue.
              </p>

              <div className="mt-8 space-y-3">
                {question.options.map((option, index) => {
                  const isSelected = selected[current] === index;

                  return (
                    <button
                      key={option}
                      onClick={() => chooseAnswer(index)}
                      aria-pressed={isSelected}
                      className={`group flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition sm:p-5 ${
                        isSelected
                          ? "border-violet-400 `bg-violet-500/[0.13]` shadow-lg shadow-violet-950/20"
                          : "`border-white/[0.09]` `bg-white/[0.025]` hover:border-violet-400/50 `hover:bg-violet-400/[0.05]`"
                      }`}
                    >
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold transition ${
                          isSelected
                            ? "bg-violet-500 text-white"
                            : "bg-white/[0.07] text-slate-300 group-hover:bg-violet-500/20"
                        }`}
                      >
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="flex-1 text-sm font-medium leading-6 sm:text-base">
                        {option}
                      </span>
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                          isSelected
                            ? "border-violet-400 bg-violet-500"
                            : "border-slate-600"
                        }`}
                      >
                        {isSelected && (
                          <span className="h-2 w-2 rounded-full bg-white" />
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 flex flex-col-reverse gap-3 border-t border-white/8 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <button
                  onClick={() => setCurrent((value) => value - 1)}
                  disabled={current === 0}
                  className="rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-slate-300 transition `hover:bg-white/[0.06]` disabled:cursor-not-allowed disabled:opacity-30"
                >
                  ← Previous
                </button>

                <p className="text-center text-xs text-slate-500">
                  {answered} of {questions.length} answered
                </p>

                {current === questions.length - 1 ? (
                  <button
                    onClick={finishQuiz}
                    className="rounded-xl `bg-gradient-to-r` from-violet-600 to-indigo-600 px-6 py-3 text-sm font-semibold transition hover:from-violet-500 hover:to-indigo-500"
                  >
                    See My Results →
                  </button>
                ) : (
                  <button
                    onClick={() => setCurrent((value) => value + 1)}
                    className="rounded-xl `bg-gradient-to-r` from-violet-600 to-indigo-600 px-6 py-3 text-sm font-semibold transition hover:from-violet-500 hover:to-indigo-500"
                  >
                    Next Question →
                  </button>
                )}
              </div>
            </div>

            <p className="mt-5 text-center text-xs text-slate-500">
              You can go back and change your answers before finishing.
            </p>
          </section>
        )}

        {phase === "result" && (
          <section className="mx-auto max-w-3xl">
            <div className="rounded-3xl border border-white/10 bg-[#11101c]/90 p-6 text-center shadow-2xl shadow-black/20 sm:p-10">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl `bg-gradient-to-br` from-violet-500/20 to-indigo-500/20 text-4xl">
                {percentage >= 80 ? "🏆" : percentage >= 50 ? "🎯" : "💪"}
              </div>

              <p className="mt-6 text-sm font-medium uppercase tracking-[0.2em] text-violet-300">
                Quiz completed
              </p>
              <h1 className="mt-3 text-3xl font-black sm:text-5xl">
                {percentage >= 80
                  ? "Outstanding work!"
                  : percentage >= 50
                    ? "Good progress!"
                    : "Keep practicing!"}
              </h1>
              <p className="mt-3 text-slate-400">
                {percentage >= 80
                  ? "Excellent effort. You have a strong foundation."
                  : percentage >= 50
                    ? "Nice effort. Review the answers to improve further."
                    : "Every attempt helps. Learn from your answers and try again."}
              </p>

              <div className="mx-auto mt-8 flex h-40 w-40 items-center justify-center rounded-full border-4 border-violet-400/40 `bg-gradient-to-br` from-violet-500/15 to-indigo-500/10">
                <div>
                  <p className="text-4xl font-black">{percentage}%</p>
                  <p className="mt-1 text-sm text-slate-400">Your score</p>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { label: "Correct", value: score, color: "text-emerald-400" },
                  {
                    label: "Incorrect",
                    value: answered - score,
                    color: "text-rose-400",
                  },
                  {
                    label: "Unanswered",
                    value: questions.length - answered,
                    color: "text-amber-300",
                  },
                  {
                    label: "Total",
                    value: questions.length,
                    color: "text-violet-300",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border `border-white/[0.08]` `bg-white/[0.03]` p-4"
                  >
                    <p className={`text-2xl font-bold ${item.color}`}>
                      {item.value}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">{item.label}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={startQuiz}
                className="mt-8 w-full rounded-xl `bg-gradient-to-r` from-violet-600 to-indigo-600 px-6 py-4 font-semibold transition hover:from-violet-500 hover:to-indigo-500 sm:w-auto"
              >
                ↻ Try Again
              </button>
            </div>

            <div className="mt-8">
              <div className="mb-5">
                <p className="text-sm text-violet-300">
                  LEARN FROM YOUR RESULTS
                </p>
                <h2 className="mt-2 text-2xl font-bold">Answer Review</h2>
                <p className="mt-2 text-sm text-slate-400">
                  Check your answers and understand each correct response.
                </p>
              </div>

              <div className="space-y-4">
                {questions.map((item, index) => {
                  const userAnswer = selected[index];
                  const isCorrect = userAnswer === item.answer;
                  const isUnanswered = userAnswer === undefined;

                  return (
                    <article
                      key={item.question}
                      className="rounded-2xl border border-white/10 bg-[#11101c]/90 p-5 sm:p-6"
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${
                            isCorrect
                              ? "bg-emerald-500/15 text-emerald-400"
                              : "bg-rose-500/15 text-rose-400"
                          }`}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={`rounded-full px-3 py-1 text-xs font-medium ${
                                isCorrect
                                  ? "bg-emerald-500/10 text-emerald-400"
                                  : "bg-rose-500/10 text-rose-400"
                              }`}
                            >
                              {isCorrect
                                ? "Correct"
                                : isUnanswered
                                  ? "Not answered"
                                  : "Incorrect"}
                            </span>
                          </div>

                          <h3 className="mt-3 font-semibold leading-6">
                            {item.question}
                          </h3>

                          <p className="mt-3 text-sm leading-6 text-slate-400">
                            Your answer:{" "}
                            <span
                              className={
                                isCorrect ? "text-emerald-300" : "text-rose-300"
                              }
                            >
                              {isUnanswered
                                ? "Not answered"
                                : item.options[userAnswer]}
                            </span>
                          </p>

                          <p className="mt-2 text-sm leading-6 text-slate-300">
                            Correct answer:{" "}
                            <span className="font-medium text-emerald-300">
                              {item.options[item.answer]}
                            </span>
                          </p>

                          <p className="mt-3 rounded-xl bg-white/[0.035] p-3 text-sm leading-6 text-slate-400">
                            <span className="font-semibold text-violet-300">
                              Explanation:{" "}
                            </span>
                            {item.explanation}
                          </p>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              <button
                onClick={startQuiz}
                className="mt-6 w-full rounded-xl border border-violet-400/30 `bg-violet-500/[0.08]` px-6 py-4 font-semibold text-violet-200 transition `hover:bg-violet-500/[0.15]`"
              >
                ↻ Restart Quiz
              </button>
            </div>
          </section>
        )}
      </div>

      <footer className="relative z-10 border-t `border-white/[0.08]` px-5 py-6 text-center text-xs text-slate-500">
        © 2026 Quiz-App · Built for curious minds.
      </footer>
    </main>
  );
}
