"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";

import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import { ClipboardPaste } from "lucide-react";

type Props = {
  saveStory: () => void;
};

export const CodeInsert = ({ saveStory }: Props) => {
  const [language, setLanguage] = useState<string>("javascript");
  const [code, setCode] = useState<string>("");
  const [highlightedCode, setHighlightedCode] = useState<string>("");

  const onChangeLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value);
  };

  const onChangeCode = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    setCode(event.currentTarget.value || "");
  };

  const onPaste = async () => {
    try {
      const clipboardData = await navigator.clipboard.readText();
      toast("Code Pasted");

      setCode((prev) => prev + clipboardData);
    } catch (error) {
      toast("Error pasting code");
    }
  };

  useEffect(() => {
    const highlighted = hljs.highlight(code, {
      language,
      ignoreIllegals: true,
    }).value;
    setHighlightedCode(highlighted);
    saveStory();
  }, [language, code, highlightedCode]);

  return (
    <div className="w-full">
      <div className="w-full relative bg-stone-100 rounded-sm p-5 focus:outline-none">
        <div>
          <select
            contentEditable={false}
            className="bg-gray-100 border-dotted border-[2px] rounded-sm p-1 text-stone-700"
            defaultValue={language}
            onChange={onChangeLanguage}>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
          </select>
        </div>
        <textarea
          className="focus:outline-none p-2 w-full mt-4"
          onChange={(e) => {
            e.preventDefault();
            onChangeCode(e);
          }}
          onPaste={onPaste}
        />
        <button
          onClick={onPaste}
          className="absolute top-2 right-2 cursor-pointer">
          <ClipboardPaste />
        </button>
        <div
          className={`language-${language} text-base block overflow-auto p-3 focus:outline-none`}
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
          style={{ whiteSpace: "pre-wrap" }}></div>
      </div>
      <p data-p-placeholder="Continue writing..."></p>
    </div>
  );
};
