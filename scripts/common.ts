import * as chalk from "chalk";
import * as os from "os";
import * as path from "path";

export type WatchMain = (
  reportError: (errs: CompileError[]) => void,
  buildStart: () => void,
  buildComplete: (dir: string) => void,
  notFoundTSConfig: () => void,
) => void;

export const srcPath = path.join(process.cwd(), "./src");
export const mainPath = path.join(process.cwd(), "./src/main");
export const rendererPath = path.join(process.cwd(), "./src/renderer");
export const outDir = path.join(process.cwd(), "./app");
export const outDirMain = path.join(process.cwd(), "./app/main");
export const outDirRenderer = path.join(process.cwd(), "./app/renderer");
export const distDir = path.join(process.cwd(), "./dist");
export const entryPath = path.join(mainPath, "index.ts");

export const consoleMessagePrefix = "[script]";
export const consoleViteMessagePrefix = "[vite]";

export const cannotFoundTSConfigMessage =
  "Could not find a valid 'tsconfig.json'.";
export const startMessage = chalk.cyan(
  `${consoleMessagePrefix} Start compile main process...`
);
export const finishMessage = chalk.green(
  `${consoleMessagePrefix} Finished compiled. Rerun electron main process...`
);

export interface CompileError {
  location: {
    column: number;
    file: string;
    length: number;
    line: number;
    lineText: string;
  } | undefined | null;
  message: string;
}

function repeatString(char: string, len: number): string {
  return Array(len).fill(char).join("");
}

function formatCompileError(error: CompileError): string {
  if (!error.location) return error.message;

  const pathMessage =
    chalk.cyan(error.location.file) +
    ":" +
    chalk.yellow(error.location.line) +
    ":" +
    chalk.yellow(error.location.column);
  const categoryMessage = chalk.red("error:");

  const code =
    chalk.gray(error.location.line) +
    " " +
    error.location.lineText +
    os.EOL +
    repeatString(
      " ",
      error.location.column + `${error.location.line}`.length + 1 + 1
    ) +
    chalk.red(repeatString("~", error.location.length)) +
    repeatString(
      " ",
      error.location.lineText.length -
        error.location.column -
        error.location.length
    );

  return `${pathMessage} - ${categoryMessage} ${error.message} ${os.EOL} ${code}`;
}

export function formatDiagnosticsMessage(errors: CompileError[]): string {
  const messages = errors.map((e) => formatCompileError(e));
  const errorMessage = `Found ${errors.length} errors. Watching for file changes.`;

  let diagnosticDetail = "";
  messages.forEach((item, index, { length }) => {
    diagnosticDetail += item
      .split(os.EOL)
      .map((i) => "  " + i)
      .join(os.EOL);
    if (index + 1 !== length) {
      diagnosticDetail += os.EOL;
    }
  });

  const res =
    chalk.rgb(
      255,
      161,
      237
    )(`${consoleMessagePrefix} Some typescript compilation errors occurred:`) +
    "\n" +
    diagnosticDetail +
    "\n" +
    chalk.rgb(255, 161, 237)(errorMessage);

  return res;
}
