import { parseArgs } from "node:util";
import { readFileSync } from "node:fs";

(async function main() {
  const {
    values: { file, word, line, bytes },
  } = parseArgs({
    options: {
      file: {
        type: "string",
        short: "f",
        default: "not",
      },
      word: {
        type: "boolean",
        short: "w",
        default: false,
      },
      line: {
        type: "boolean",
        short: "l",
        default: false,
      },
      bytes: {
        type: "boolean",
        short: "b",
        default: false,
      },
    },
  });

  if (file === "not") {
    console.error(
      "Incorrect number of arguments.\n" +
        "\nPlease use format: node index.js -f <filename>" +
        "\n\nExiting process..."
    );

    process.exit(1);
  }

  try {
    const data = await readFileSync(file, "utf8");

    if (line) {
      countLine(data);
    }
    if (word) {
      countWord(data);
    }
    if (bytes) {
      countBytes(data);
    }
  } catch (error) {
    console.error("Error reading file: " + file + "\n\nExiting process...");
    console.error(error.message);

    process.exit(1);
  }
})();

const countLine = (data) => {
  console.log(data.split("\n").length, "lines");
};

const countWord = (data) => {
  console.log(data.split(" ").filter((ele) => ele !== "\n").length, "words");
};

const countBytes = (data) => {
  console.log(data.length, "bytes");
};
