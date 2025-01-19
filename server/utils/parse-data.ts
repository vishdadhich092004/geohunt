import { HintType } from "../shared/types";

export const parseData = (result: string) => {
  try {
    const cleanedData = result
      .replace("```json\n", "")
      .replace("```", "")
      .trim();

    const hints: HintType[] = [];

    const quoteRegex = /"([^"]*)"/g;
    let match: RegExpExecArray | null;
    // Extract all quoted strings
    while (
      (match = quoteRegex.exec(cleanedData)) !== null &&
      hints.length < 3
    ) {
      const hintText = match[1].trim();
      if (hintText) {
        hints.push(hintText);
      }
    }

    // Validate we have exactly 3 hints
    if (hints.length !== 3) {
      throw new Error("3 Hints are not generated");
    }
    return hints;
  } catch (e) {
    console.error(e);
    throw new Error("Failed to parse hints.");
  }
};
