import cac from "cac";
import { version } from "./utils/getVersion";

const cli = cac();

cli.on("command:*", () => {
  console.error("Invalid command: %s", cli.args.join(" "));
  process.exit(1);
});

export async function main() {
  cli
    .command("-p <pkgName>", "Provide a package name")
    .action((pkgName, options) => {
      console.log(pkgName, options);
    });

  cli.help();
  cli.version(await version());

  cli.parse();
}
