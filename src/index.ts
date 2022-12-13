import cac from "cac";
import { version } from "./utils/getVersion";
import { checkName } from "./utils/checkName";
import { checkTypes, checkTypesByName } from "./utils/checkTypes";

const cli = cac();

cli.on("command:*", () => {
  console.log("Invalid command: %s", cli.args.join(" "));
  process.exit(1);
});

export async function main() {
  cli.option("-c", "Check dependencies");

  cli
    .command("[...pkgName]", "Provide a package name")
    .option("-t", "Check types")
    .option("-p", "Check package name")
    .action(async (pkgName, options) => {
      if (options.p) {
        let str = "\n";

        for (const p of pkgName)
          str += await checkName(p);

        console.log(str);
      }

      if (options.t && pkgName.length > 0) {
        const o = await checkTypesByName(pkgName);
        console.log(o);
      }
      else if (options.t && pkgName.length === 0) {
        const o = await checkTypes();
        console.log(o);
      }
    });

  cli.help();
  cli.version(await version());

  cli.parse();
}
