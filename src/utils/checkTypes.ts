import { readPackageJSON } from "pkg-types";
import fetch from "node-fetch-native";
import pc from "picocolors";

export async function checkTypes() {
  const pkgPath = process.cwd();
  const res = await (await readPackageJSON(pkgPath));

  const dependencies = Object.keys(Object.assign(res.dependencies!, res.devDependencies));
  const needDeclaration: string[] = [];

  for (const d of dependencies) {
    const res = (await (await fetch(`https://registry.npmjs.org/${d}`)).json());
    const latest = res["dist-tags"].latest;
    const latestConfig = res.versions[latest];

    if (!latestConfig.types)
      needDeclaration.push(d);
  }

  return wrap(needDeclaration);
}

export async function checkTypesByName(pkgName: string) {
  const needCheck: string[] = [];
  for (const p of pkgName) {
    const res = (await (await fetch(`https://registry.npmjs.org/${p}`)).json());
    const latest = res["dist-tags"].latest;
    const latestConfig = res.versions[latest];
    if (!latestConfig.types)
      needCheck.push(p);
  }

  return wrap(needCheck);
}

function wrap(deps: string[]) {
  let str = deps.length > 0
    ? `
  npm i -D`
    : `
    no declaration to install`;
  for (const d of deps)
    str += ` @types/${d}`;

  return deps.length > 0 ? pc.red(str) : pc.green(str);
}
