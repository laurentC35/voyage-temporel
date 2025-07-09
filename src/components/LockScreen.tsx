import React, { useState, useRef } from "react";
import "./lockScreen.css";

interface LockScreenProps {
  onUnlock: () => void;
}

const LockScreen: React.FC<LockScreenProps> = ({ onUnlock }) => {
  const [code, setCode] = useState(["", "", "", ""]);
  const [error, setError] = useState(false);

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return; // autorise seulement les chiffres

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Aller au champ suivant automatiquement
    if (value && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = () => {
    const enteredCode = code.join("");
    const correctCode = "1234"; // Tu peux changer ici le code secret

    if (enteredCode === correctCode) {
      onUnlock();
    } else {
      setError(true);
      setCode(["", "", "", ""]);
      inputsRef.current[0]?.focus();
    }
  };

  return (
    <div className="lockscreen">
      <h2>Voyage Musical</h2>
      <div className="code-inputs">
        {code.map((digit, index) => (
          <input
            key={index}
            type="password"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            ref={(el) => (inputsRef.current[index] = el)}
            className={error ? "error" : ""}
          />
        ))}
      </div>
      <button onClick={handleSubmit}>Valider</button>
      {error && <div className="lock-error">🔒 Code incorrect</div>}
    </div>
  );
};

export default LockScreen;
