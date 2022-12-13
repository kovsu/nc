import fetch from "node-fetch-native";
import pc from "picocolors";
import emoji from "node-emoji";

export async function checkName(pkgName: string) {
  const res = (await (await fetch(`https://registry.npmjs.org/${pkgName}`)).json())?.name;
  return wrap(!!res, pkgName);
}

function wrap(isValid: boolean, p: string) {
  if (isValid)
    return pc.green(`  ${p} : ${emoji.get(":heart_eyes:")} Valid package name\n`);
  else
    return pc.red(`  ${p} : ${emoji.get(":persevere:")} Invalid package name \n`);
}
