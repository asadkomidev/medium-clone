import React from "react";
import { TopicType } from "../types/topic";

import Filters from "./filters";

type Props = {
  topics: TopicType[];
  tags: TopicType[];
};

const TopicList = async ({ topics, tags }: Props) => {
  return (
    <div className="max-w-5xl overflow-hidden">
      <Filters topics={topics || []} tags={tags} />
    </div>
  );
};

export default TopicList;
