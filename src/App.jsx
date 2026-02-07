import { useEffect, useState } from "react";
import styles from "./App.module.css";

import Description from "./components/Description/Description";
import Options from "./components/Options/Options";
import Feedback from "./components/FeedBack/FeedBack";
import Notification from "./components/Notification/Notification";

const STORAGE_KEY = "sip-happens-feedback";

const initialFeedback = {
  good: 0,
  neutral: 0,
  bad: 0,
};

export default function App() {
  const [feedback, setFeedback] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return initialFeedback;

    try {
      const parsed = JSON.parse(saved);
      return {
        good: Number(parsed.good) || 0,
        neutral: Number(parsed.neutral) || 0,
        bad: Number(parsed.bad) || 0,
      };
    } catch {
      return initialFeedback;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(feedback));
  }, [feedback]);

  const updateFeedback = (feedbackType) => {
    setFeedback((prev) => ({
      ...prev,
      [feedbackType]: prev[feedbackType] + 1,
    }));
  };

  const resetFeedback = () => setFeedback(initialFeedback);

  const { good, neutral, bad } = feedback;
  const totalFeedback = good + neutral + bad;
  const positiveFeedback = totalFeedback
    ? Math.round((good / totalFeedback) * 100)
    : 0;

  return (
    <div className={styles.app}>
      <div className={styles.card}>
        <Description
          title="Sip Happens Café"
          text="Please leave your feedback about our service by selecting one of the options below."
        />

        <Options
          options={Object.keys(feedback)}
          onLeaveFeedback={updateFeedback}
          total={totalFeedback}
          onReset={resetFeedback}
        />

        {totalFeedback > 0 ? (
          <Feedback
            good={good}
            neutral={neutral}
            bad={bad}
            total={totalFeedback}
            positive={positiveFeedback}
          />
        ) : (
          <Notification message="No feedback yet" />
        )}
      </div>
    </div>
  );
}
