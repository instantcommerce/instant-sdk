import path from "path";

export const getBlockNameFromPath = (filePath: string) =>
  path.dirname(filePath).split(path.sep).pop()!;
