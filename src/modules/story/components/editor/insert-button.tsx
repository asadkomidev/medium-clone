import { Plus } from "lucide-react";
import React, { useState } from "react";

import { Toolbar } from "./tools/toolbar";

type Props = {
  contentEditableRef: React.RefObject<HTMLDivElement>;
  saveStory: () => void;
};

export const InsertToolButton = ({ contentEditableRef, saveStory }: Props) => {
  const [openTools, setOpenTools] = useState<boolean>(false);

  return (
    <div className="ml-12 md:ml-0 my-12 md:mt-0">
      <button
        onClick={() => setOpenTools(!openTools)}
        id="tooltip"
        className="border-[1px] border-neutral-500 p-1 rounded-full inline-block">
        <Plus
          className={`duration-300 ease-linear ${openTools ? "rotate-90" : ""}`}
        />
      </button>
      <div
        id="tools"
        className={`flex items-center space-x-4 absolute top-0 left-24 md:left-14 my-12 md:mt-0 ${
          openTools ? "visible" : "invisible"
        }`}>
        <Toolbar
          openTools={openTools}
          setOpenTools={setOpenTools}
          contentEditableRef={contentEditableRef}
          saveStory={saveStory}
        />
      </div>
    </div>
  );
};
