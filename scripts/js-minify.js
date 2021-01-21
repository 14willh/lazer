const esbuild = require("esbuild");
const fs = require("fs");
const path = require("path");

const args = process.argv;
const file_arg = args[2];
const out_arg = args[3];

if (!file_arg) {
  console.log("No file specified.");
  process.exit(1);
} else {
  const file_path = path.resolve(__dirname, "../", file_arg);
  const file_string = fs.readFileSync(file_path).toString();

  try {
    const { code } = esbuild.transformSync(file_string, { minify: true });
    fs.writeFileSync(out_arg || file_path, code);
  } catch (e) {
    console.log("Can only minify valid JS files.");
  }
}
