## nc

### Usage

```bash
npm i @kovsun/nc -g
```

### nc -c

View the latest version of dependencies in package.json.

```bash
nc -c
```

### nc -t [...pkgName]

Check whether the dependencies in package.json require type declarations.

```bash
nc -t

or

nc -t pkg1 pkg2 pkg3
```


### nc -p [...pkgName]

Check whether the package name already exists in npm.


```bash
nc -p pkg1 pkg2 pkg3
```



