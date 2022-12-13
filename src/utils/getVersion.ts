import { readPackageJSON } from "pkg-types";

export async function version() {
  const pkgPath = process.cwd();
  return (await readPackageJSON(pkgPath)).version || "0.0.0";
}
