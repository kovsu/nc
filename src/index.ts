import cac from "cac";
import pc from "picocolors";
import emoji from "node-emoji";
import { version } from "./utils/getVersion";
import { check } from "./utils/checkName";

const cli = cac();

cli.on("command:*", () => {
  console.log("Invalid command: %s", cli.args.join(" "));
  process.exit(1);
});

export async function main() {
  cli.option("-c", "Check dependencies");
  cli.option("-t", "Check type declarations");
  cli.option("-p <pkgName>", "Provide a package name");

  cli.help();
  cli.version(await version());

  const parsed = cli.parse();

  if (parsed.options.p) {
    // true => invalid pkg name
    const res = await check(parsed.options.p);
    if (!res)
      console.log(pc.green(`${emoji.get(":heart_eyes:")} Valid package name`));
    else
      console.log(pc.red(`${emoji.get(":persevere:")} Invalid package name`));
  }
}
