import { HelpCircle } from "lucide-react";

export function HomeTutorialOverlay({
  showTutorial,
  tutorialStep,
  tutorialSteps,
  onSetStep,
  onNext,
  onPrevious,
  onSkip,
  onRestart,
}) {
  const activeStep = tutorialSteps[tutorialStep];

  return (
    <>
      <button
        type="button"
        onClick={onRestart}
        className="fixed bottom-6 right-6 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[linear-gradient(135deg,_#06b6d4_0%,_#2563eb_100%)] text-white shadow-[0_18px_40px_rgba(14,116,144,0.26)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_60px_rgba(37,99,235,0.3)]"
        aria-label="Restart homepage tutorial"
      >
        <HelpCircle className="h-6 w-6" />
      </button>

      {showTutorial && (
        <>
          <div className="fixed inset-0 z-50 bg-slate-950/65 backdrop-blur-[2px]" />

          {activeStep?.highlight && (
            <style>{`
              [data-tutorial-id="${activeStep.highlight}"] {
                position: relative;
                z-index: 60 !important;
                box-shadow: 0 0 0 4px rgba(6, 182, 212, 0.45), 0 0 0 9999px rgba(15, 23, 42, 0.68);
                border-radius: 24px;
              }
            `}</style>
          )}

          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <div className="relative w-full max-w-lg overflow-hidden rounded-[2rem] bg-white shadow-[0_30px_100px_rgba(15,23,42,0.28)]">
              <div className="absolute inset-x-0 top-0 h-1 bg-slate-100">
                <div
                  className="h-full bg-[linear-gradient(90deg,_#06b6d4_0%,_#2563eb_100%)] transition-all duration-300"
                  style={{
                    width: `${((tutorialStep + 1) / tutorialSteps.length) * 100}%`,
                  }}
                />
              </div>

              <div className="px-8 pb-8 pt-10">
                <div className="text-center">
                  <div className="text-6xl">{activeStep.icon}</div>
                  <h2 className="mt-5 text-3xl font-black text-slate-950">
                    {activeStep.title}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                    {activeStep.description}
                  </p>
                </div>

                <div className="mt-6 text-center text-sm font-semibold text-slate-500">
                  Step {tutorialStep + 1} of {tutorialSteps.length}
                </div>

                <div className="mt-8 flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={onSkip}
                    className="text-sm font-semibold text-slate-500 transition hover:text-slate-900"
                  >
                    Skip Tour
                  </button>

                  <div className="flex items-center gap-3">
                    {tutorialStep > 0 && (
                      <button
                        type="button"
                        onClick={onPrevious}
                        className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                      >
                        Back
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={onNext}
                      className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-600"
                    >
                      {tutorialStep === tutorialSteps.length - 1
                        ? "Get Started"
                        : "Next"}
                    </button>
                  </div>
                </div>

                <div className="mt-6 flex justify-center gap-2">
                  {tutorialSteps.map((step, index) => (
                    <button
                      key={step.id}
                      type="button"
                      onClick={() => onSetStep(index)}
                      className={`h-2 rounded-full transition-all ${
                        index === tutorialStep
                          ? "w-8 bg-cyan-600"
                          : index < tutorialStep
                            ? "w-2 bg-cyan-300"
                            : "w-2 bg-slate-300"
                      }`}
                      aria-label={`Go to tutorial step ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
