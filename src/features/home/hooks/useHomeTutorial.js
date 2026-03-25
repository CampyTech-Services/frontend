import { useEffect, useState } from "react";
import { tutorialSteps } from "../data/tutorialSteps";

const TUTORIAL_STORAGE_KEY = "campytech_tutorial_completed";

export function useHomeTutorial({ ready }) {
  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);

  useEffect(() => {
    if (!ready) {
      return;
    }

    const hasSeenTutorial = window.localStorage.getItem(TUTORIAL_STORAGE_KEY);

    if (!hasSeenTutorial) {
      setShowTutorial(true);
    }
  }, [ready]);

  useEffect(() => {
    if (!showTutorial) {
      return;
    }

    const currentStep = tutorialSteps[tutorialStep];

    if (!currentStep?.highlight) {
      return;
    }

    const highlightedElement = document.querySelector(
      `[data-tutorial-id="${currentStep.highlight}"]`,
    );

    if (!highlightedElement) {
      return;
    }

    highlightedElement.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });
  }, [showTutorial, tutorialStep]);

  function completeTutorial() {
    window.localStorage.setItem(TUTORIAL_STORAGE_KEY, "true");
    setShowTutorial(false);
    setTutorialStep(0);
  }

  function nextStep() {
    if (tutorialStep < tutorialSteps.length - 1) {
      setTutorialStep((currentStep) => currentStep + 1);
      return;
    }

    completeTutorial();
  }

  function previousStep() {
    setTutorialStep((currentStep) => Math.max(0, currentStep - 1));
  }

  function restartTutorial() {
    setTutorialStep(0);
    setShowTutorial(true);
  }

  return {
    showTutorial,
    tutorialStep,
    tutorialSteps,
    setTutorialStep,
    nextStep,
    previousStep,
    completeTutorial,
    restartTutorial,
  };
}
