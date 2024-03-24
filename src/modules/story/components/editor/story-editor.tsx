"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import MediumEditor from "medium-editor";
import "medium-editor/dist/css/medium-editor.css";
import "medium-editor/dist/css/themes/default.css";
import "../../styles/style.css";

import { InsertToolButton } from "./insert-button";
import { updateStory } from "../../actions/story";
import { PublishButton } from "./publish-button";

type Props = {
  id: string;
  content: string | null | undefined;
  publish: boolean | undefined;
};

export const StoryEditor = ({ id, content, publish }: Props) => {
  const [saving, setSaving] = useState<boolean>(false);
  const contentEditableRef = useRef<HTMLDivElement | null>(null);
  const [buttonPosition, setButtonPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });

  function debounce<T extends (...args: any[]) => any>(
    func: T,
    delay: number
  ): (...args: Parameters<T>) => void {
    let timeoutId: ReturnType<typeof setTimeout>;

    return function (this: ThisParameterType<T>, ...args: Parameters<T>): void {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }

  const getCaretPosition = () => {
    let x = 0;
    let y = 0;

    const isSupported = typeof window.getSelection !== "undefined";

    if (isSupported) {
      const selection = window.getSelection() as Selection;
      if (selection?.rangeCount > 0) {
        const range = selection.getRangeAt(0).cloneRange();
        const rect = range.getClientRects()[0];
        if (rect) {
          x = rect.left + window.screenX;
          y = rect.top + window.scrollY - 80;
        }
      }
    }

    return { x, y };
  };

  useEffect(() => {
    const handleInput = () => {
      const { x, y } = getCaretPosition();
      setButtonPosition({ top: y, left: -50 });

      saveStoryDebounce();
    };

    contentEditableRef.current?.addEventListener("input", handleInput);
  }, []);

  useEffect(() => {
    if (typeof window.document !== "undefined") {
      const editor = new MediumEditor(".editable", {
        elementsContainer: document.getElementById("container") as HTMLElement,
        toolbar: {
          buttons: [
            "bold",
            "italic",
            "underline",
            "anchor",
            "unorderedlist",
            "orderedlist",
            "h2",
            "h3",
            "h4",
            "quote",
          ],
        },
      });
      return () => {
        editor.destroy();
      };
    }
  }, []);

  const saveStoryDebounce = useRef(
    debounce(() => {
      saveStory();
    }, 1000)
  ).current;

  const saveStory = async () => {
    const content = contentEditableRef.current?.innerHTML;
    setSaving(true);

    try {
      const response = await updateStory(id, content ?? "");
      if (!response) {
        toast.error("Failed to create story");
        return;
      }
    } catch (error) {
      toast.error("Failed to create story");
    }
    setSaving(false);
  };

  return (
    <main id="container" className="relative">
      <div className="flex items-center justify-between py-8">
        <p className="text-muted-foreground">
          {saving ? "Saving..." : "Saved"}
        </p>
        <PublishButton storyId={id} publish={publish} />
      </div>
      <div
        id="editable"
        ref={contentEditableRef}
        contentEditable
        suppressContentEditableWarning
        className="outline-none focus:outline-none editable max-w-[800px] prose"
        style={{ whiteSpace: "pre-line" }}>
        <div>
          {content ? (
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
          ) : (
            <div>
              <h1
                className="font-medium"
                data-h1-placeholder="New Story Title"></h1>
              <p data-p-placeholder="Continue writing..."></p>
            </div>
          )}
        </div>
      </div>
      <div
        className={`z-10 ${buttonPosition.top === 0 ? "hidden" : ""}`}
        style={{
          position: "absolute",
          top: buttonPosition.top,
          left: buttonPosition.left,
        }}>
        <InsertToolButton
          contentEditableRef={contentEditableRef}
          saveStory={saveStory}
        />
      </div>
    </main>
  );
};
