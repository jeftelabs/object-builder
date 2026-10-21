# Desenvolvimento e manutenção

## Ambiente

O [`package.json`](../../package.json) requer Node.js `>=20.6.0`, ESM, TypeScript e npm. Use `npm install` para instalar as dependências do lockfile (`package-lock.json`).

## Estrutura e fluxo

1. Leia [`AGENTS.md`](../../AGENTS.md) e esta documentação.
2. Confira implementação e contratos de runtime/tipos em `index.ts` e `tests/`.
3. Faça mudanças no código-fonte, sem editar artefatos gerados em `build/`.
4. Atualize documentação detalhada em `docs/` na mesma tarefa; mantenha `docs/README.md` e README raiz em sincronia quando aplicável.
5. Consulte `package.json` e os workflows antes de alterar build, scripts ou publicação.

## Scripts disponíveis

| Comando | Finalidade |
| --- | --- |
| `npm run quick:test` | Executa `bin/test.ts` pelo `ts-node-maintained`, sem cobertura. |
| `npm test` | Executa `pretest` (lint) e `c8 npm run quick:test`. |
| `npm run lint` | Executa ESLint. |
| `npm run typecheck` | Executa `tsc --noEmit`. |
| `npm run compile` | Executa `tsup-node` e emite declarações TypeScript. |
| `npm run build` | Executa `compile` (inclui lint por `precompile`). |
| `npm run format` | Executa Prettier com escrita nos arquivos. |

Consulte sempre scripts atuais antes de recomendá-los. O formatador modifica o workspace.

## Testes

`bin/test.ts` configura `@t8ngs/runner` com plugins de expect, assert, filesystem e assertions de tipos. O runner lê `tests/**/*.spec.ts`. Atualmente [`tests/object_builder.spec.ts`](../../tests/object_builder.spec.ts) cobre objeto inicial, adição e encadeamento, filtragem de `undefined` e `null`, leitura, presença, remoção e inferência de tipos.

Mudanças de comportamento ou assinatura devem manter os testes de runtime e os de tipo alinhados, além de atualizar as referências e guias afetados.

## Build e pacote

`tsup` usa `index.ts` como entry, gera ESM em `build/`, limpa o destino e inclui sourcemaps. `tsc --emitDeclarationOnly --declaration` emite declarações. `files` inclui `build` com exclusão de `build/bin` e `build/tests`; `main` e `exports["."]` apontam a `build/index.js`.

## CI, release e publicação

- `.husky/pre-commit` roda `npm test` antes do commit local.
- `.github/workflows/checks.yml` valida mensagens Conventional Commits (não executa os testes do pacote).
- `.github/workflows/release.yml` usa release-please na branch `main` e, quando aplicável, gera e anexa um tarball.
- `.github/workflows/deploy.yml` publica em GitHub Packages e npm após a publicação de uma release.
- `labels.yml` sincroniza labels manualmente; `stale.yml` fecha issues e PRs inativos conforme os prazos configurados.

Revise esses arquivos-fonte se a automação mudar. Segredos de publicação são mantidos nas configurações do GitHub Actions, não no código do pacote.
