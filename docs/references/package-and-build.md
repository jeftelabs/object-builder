# Referência de pacote e build

## Identidade e entry point

[`package.json`](../../package.json) identifica o pacote como `@jeftelabs/object-builder`, versão `1.0.0`, Node.js `>=20.6.0`, formato ESM. `main` e `exports["."]` apontam para `build/index.js`; o código fonte de entrada é [`index.ts`](../../index.ts). Não há export subpath adicional.

O campo `files` inclui `build` e exclui `build/bin` e `build/tests`.

## TypeScript e compilação

[`tsconfig.json`](../../tsconfig.json) estende `@arapucajs/tsconfig/tsconfig.package.json`, configura raiz e destino `build/`. `tsup` usa `index.ts`, limpa o destino, gera ESM, sourcemaps e target `esnext`. Em seguida `tsc --emitDeclarationOnly --declaration` emite declarações.

## Scripts e dependências

Os comandos estão em `package.json`. As ferramentas de desenvolvimento agrupam execução de TS (`ts-node-maintained`), testes (`@t8ngs/*`, `c8`), build (`tsup`, TypeScript), estilo (`eslint`, `prettier`, configs ArapucaJS) e commits (`commitlint`, `commitizen`, `husky`). A classe em si não declara dependências de runtime.

## Automação

- `.husky/pre-commit` executa `npm test` localmente.
- `.github/workflows/checks.yml` verifica mensagens de commits em push/PR.
- `.github/workflows/release.yml` gera release e artefato por release-please quando há push a `main`.
- `.github/workflows/deploy.yml` publica os pacotes após uma release.
- `labels.yml` e `stale.yml` gerenciam labels e itens inativos.

Para comportamento operacional atualizado, consulte os próprios arquivos de configuração.
