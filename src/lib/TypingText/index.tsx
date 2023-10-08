import { useEffect, useRef, useState } from "react";

interface TypingTextProps {
  text: string[] | string;
}

export const TypingText = ({ text }: TypingTextProps) => {
  const textRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (isTyping) {
        const newText = typeof text === "string" ? text : text[currentIndex];
        setCurrentText((prevText) => {
          const nextChar = newText.charAt(prevText.length);
          return prevText + nextChar;
        });
        if (currentText.length === newText.length) {
          setIsTyping(false);

          const deleteInterval = setInterval(() => {
            setCurrentText((prevText) =>
              prevText.slice(0, prevText.length - 1)
            );

            if (currentText.length === 0) {
              clearInterval(deleteInterval);
              setCurrentIndex((prevIndex) => (prevIndex + 1) % text.length);
            }
          }, 100);

          setTimeout(() => {
            setIsTyping(true);
            clearInterval(deleteInterval);
            setCurrentIndex((prevIndex) => (prevIndex + 1) % text.length);
            setCurrentText("");
          }, 1000);
        }
      }
    }, 200);

    return () => {
      clearInterval(typingInterval);
    };
  }, [currentIndex, currentText, isTyping, text]);

  const blinkStyle = {
    animation: "blink 1s step-end infinite",
    fontSize: "20px",
  };

  return (
    <div className="box" style={{ lineHeight: "30px", whiteSpace: "pre-line" }}>
      <span className="text" ref={textRef}>
        {currentText}
      </span>
      <span className="blink" style={blinkStyle}>
        |
      </span>
      <style>
        {`
          @keyframes blink {
            50% {
              opacity: 0;
            }
          }
        `}
      </style>
    </div>
  );
};
