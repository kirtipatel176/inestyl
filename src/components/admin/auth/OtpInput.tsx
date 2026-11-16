"use client";

import { useRef, useEffect, ClipboardEvent, KeyboardEvent, ChangeEvent } from "react";

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  disabled?: boolean;
  hasError?: boolean;
}

export function OtpInput({
  value,
  onChange,
  length = 6,
  disabled = false,
  hasError = false,
}: OtpInputProps) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // Split string into array of characters padded to length
  const digits = Array.from({ length }, (_, i) => value[i] || "");

  useEffect(() => {
    // Focus first empty input on mount
    const firstEmpty = digits.findIndex((d) => !d);
    const targetIdx = firstEmpty === -1 ? length - 1 : firstEmpty;
    inputsRef.current[targetIdx]?.focus();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const rawVal = e.target.value.replace(/[^0-9]/g, "");
    if (!rawVal) return;

    const char = rawVal[rawVal.length - 1]; // take the latest entered char
    const newDigits = [...digits];
    newDigits[index] = char;
    const combined = newDigits.join("");
    onChange(combined);

    // Auto-advance
    if (index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (!digits[index] && index > 0) {
        // Move back and clear previous
        const newDigits = [...digits];
        newDigits[index - 1] = "";
        onChange(newDigits.join(""));
        inputsRef.current[index - 1]?.focus();
      } else {
        const newDigits = [...digits];
        newDigits[index] = "";
        onChange(newDigits.join(""));
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, length);
    if (pasted) {
      onChange(pasted);
      const nextIndex = Math.min(pasted.length, length - 1);
      inputsRef.current[nextIndex]?.focus();
    }
  };

  return (
    <div className="flex items-center justify-between gap-2 sm:gap-3">
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => {
            inputsRef.current[i] = el;
          }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={digits[i] || ""}
          disabled={disabled}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          onPaste={handlePaste}
          className={`w-11 h-14 sm:w-12 sm:h-14 text-center font-mono text-xl font-bold rounded-xl border bg-white transition-all duration-150 focus:outline-none ${
            hasError
              ? "border-[#D92D20] text-[#D92D20] focus:ring-3 focus:ring-[#D92D20]/20"
              : "border-[#E5E7EB] text-[#1D1D1F] hover:border-[#D1D5DB] focus:border-[#0071E3] focus:ring-3 focus:ring-[#0071E3]/20"
          } disabled:bg-[#F5F5F7] disabled:text-[#86868B] disabled:cursor-not-allowed`}
          aria-label={`Digit ${i + 1}`}
        />
      ))}
    </div>
  );
}
