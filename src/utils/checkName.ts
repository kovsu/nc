import fetch from "node-fetch-native";

export async function check(pkgName: string) {
  const res = (await (await fetch(`https://registry.npmjs.org/${pkgName}`)).json())?.name;
  return !!res;
}
