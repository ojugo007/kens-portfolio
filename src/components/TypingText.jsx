import { useEffect, useState } from "react";

export default function TypingText({
  texts,
  typingSpeed = 80,
  deletingSpeed = 50,
  pauseTime = 1500,
  className = "",
}) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[index];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        const nextText = currentText.slice(0, text.length + 1);

        setText(nextText);

        if (nextText === currentText) {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        const nextText = currentText.slice(0, text.length - 1);

        setText(nextText);

        if (nextText === "") {
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timer);
  }, [
    text,
    index,
    isDeleting,
    texts,
    typingSpeed,
    deletingSpeed,
    pauseTime,
  ]);

  return (
    <p className={className}>
      {text}
      <span className="animate-pulse">|</span>
    </p>
  );
}