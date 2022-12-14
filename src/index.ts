import cac from "cac";
import pc from "picocolors";
import { version } from "./utils/getVersion";
import { checkName } from "./utils/checkName";
import { checkTypes, checkTypesByName } from "./utils/checkTypes";
import { checkDep } from "./utils/checkDeps";

const cli = cac();

export async function main() {
  cli
    .command("[...pkgName]", "Provide a package name")
    .option("-t", "Check types")
    .option("-p", "Check package name")
    .option("-c", "Check dependencies")
    .action(async (pkgName, options) => {
      if (options.p && pkgName.length > 0) {
        let str = "\n";

        for (const p of pkgName)
          str += await checkName(p);

        console.log(str);
      }
      else if (options.p && pkgName.length === 0) {
        console.log(`${pc.bgRed("ERROR:")} ${pc.red("Please input a package name")}`);
      }

      if (options.t && pkgName.length > 0) {
        const o = await checkTypesByName(pkgName);
        console.log(o);
      }
      else if (options.t && pkgName.length === 0) {
        const o = await checkTypes();
        console.log(o);
      }

      if (options.c && pkgName.length === 0)
        await checkDep();
    });

  cli.help();
  cli.version(await version());

  cli.parse();
}
