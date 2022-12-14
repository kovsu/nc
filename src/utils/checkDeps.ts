import { readPackageJSON } from "pkg-types";
import fetch from "node-fetch-native";
import pc from "picocolors";

export async function checkDep() {
  const pkgPath = process.cwd();
  const pkg = (await readPackageJSON(pkgPath));
  const deps = Object.assign({}, pkg.dependencies || {}, pkg.devDependencies || {});

  for (const dep in deps) {
    const res = (await (await fetch(`https://registry.npmjs.org/${dep}`)).json())?.["dist-tags"]?.latest;
    if (deps[dep].includes(res))
      console.log(`${dep}: ${deps[dep]} -> ${res}`);
    else
      console.log(`${pc.red(dep)}: ${pc.red(deps[dep])} -> ${pc.green(res)}`);
  }
}
