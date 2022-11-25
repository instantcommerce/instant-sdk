import { defineBlock } from "instant-client";
import { CustomBlock } from "./block";
import "../test.css";
import "./styles.css";

export default defineBlock({
  title: "CustomBlock",
  component: CustomBlock,
  preview: {
    decorators: [
      (children) => <div className="p-6 bg-gray-400">{children}</div>,
    ],
  },
  customizerSchema: {
    fields: [{ type: "TEXT", name: "textColor", preview: "#A020F0" }],
  },
  contentSchema: {
    fields: [{ type: "TEXT", name: "title", preview: "Placeholder" }],
  },
});
