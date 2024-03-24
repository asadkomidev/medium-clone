"use client";

import { Code, Image, MoreHorizontal } from "lucide-react";
import { useRef } from "react";
import { createRoot } from "react-dom/client";

import { ImageInsert } from "./image-insert";
import { DividerInsert } from "./divider-insert";
import { CodeInsert } from "./code-insert";

type Props = {
  openTools: boolean;
  setOpenTools: (open: boolean) => void;
  contentEditableRef: React.RefObject<HTMLDivElement>;
  saveStory: () => void;
};

export const Toolbar = ({
  openTools,
  setOpenTools,
  contentEditableRef,
  saveStory,
}: Props) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const insertImage = () => {
    fileInputRef.current?.click();
  };

  const insertDivider = () => {
    const divider = <DividerInsert />;
    setOpenTools(false);
    const dividerContainer = document.createElement("div");
    const root = createRoot(dividerContainer);
    root.render(divider);
    contentEditableRef.current?.appendChild(dividerContainer);
    saveStory();
  };

  const insertCode = () => {
    const code = <CodeInsert saveStory={saveStory} />;
    setOpenTools(false);
    const codeContainer = document.createElement("div");
    const root = createRoot(codeContainer);
    root.render(code);
    contentEditableRef.current?.appendChild(codeContainer);
  };

  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file) {
      setOpenTools(false);
      const localImageUrl = URL.createObjectURL(file);
      const imageToSave = (
        <ImageInsert
          imageUrl={localImageUrl}
          file={file}
          saveStory={saveStory}
        />
      );

      const imageContainer = document.createElement("div");
      const root = createRoot(imageContainer);
      root.render(imageToSave);

      contentEditableRef.current?.appendChild(imageContainer);
    }
  };

  return (
    <div className="flex items-center gap-x-4">
      <span
        onClick={insertImage}
        className={`border rounded-full block p-[6px] ${
          openTools ? "scale-100 visible" : "scale-0 invisible"
        } ease-linear duration-100 bg-white cursor-pointer`}>
        <Image size={20} className="opacity-60" />
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={onChangeImage}
        />
      </span>
      <span
        onClick={insertDivider}
        className={`border rounded-full block p-[6px] ${
          openTools ? "scale-100 visible" : "scale-0 invisible"
        } ease-linear duration-100 delay-75 bg-white cursor-pointer`}>
        <MoreHorizontal size={20} className="opacity-60" />
      </span>
      <span
        onClick={insertCode}
        className={`border rounded-full block p-[6px] ${
          openTools ? "scale-100 visible" : "scale-0 invisible"
        } ease-linear duration-100 delay-100 bg-white cursor-pointer`}>
        <Code size={20} className="opacity-60" />
      </span>
    </div>
  );
};
