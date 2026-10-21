# Orientações para Claude e agentes de IA

As instruções canônicas deste repositório estão em [`AGENTS.md`](./AGENTS.md). Leia-o junto das páginas aplicáveis em [`docs/README.md`](./docs/README.md). Este projeto é `@jeftelabs/object-builder`, uma biblioteca TypeScript/ESM focada na classe `ObjectBuilder`.

## Entenda antes de alterar

1. Confira `AGENTS.md` e a documentação técnica da área.
2. Leia [`index.ts`](./index.ts) e os testes em `tests/`; confirme o comportamento em runtime e os tipos inferidos.
3. Consulte [`package.json`](./package.json), [`tsconfig.json`](./tsconfig.json) e `.github/workflows/` para entry point, scripts, build e publicação.
4. Use [`README.md`](./README.md) como documentação pública. `README copy.md` é uma referência editorial, não fonte de comportamento deste pacote.

## Documentação obrigatória em cada alteração

É **extremamente obrigatório criar ou atualizar documentação detalhada sempre que algo novo for criado ou qualquer parte do projeto for modificada**. Isso cobre implementação, API, tipos, testes, exemplos, configurações, dependências, scripts, CI/CD e documentação. Conclua a documentação na mesma tarefa.

- Explique o motivo, propósito, funcionamento, exemplos de uso, efeitos, limitações e manutenção para humanos e agentes de IA.
- Mantenha as páginas duráveis em `docs/`, organizadas em `guides`, `references`, `planning` e outras áreas úteis.
- Registre páginas novas no índice [`docs/README.md`](./docs/README.md) e mantenha caminho de descoberta no README raiz.
- Atualize `README.md` quando a API, instalação, exemplos, requisitos ou instruções para usuários mudarem.
- Confira cada assinatura e exemplo no código e nos testes; não importe capacidades ou descrições de outro `object-builder` sem validar localmente.
- Não deixe documentação pendente ao terminar o trabalho.

## Resumo do pacote

- `ObjectBuilder` começa com um objeto existente e altera esse objeto ao adicionar ou remover propriedades.
- `add` sempre ignora `undefined`; o segundo argumento do construtor ativa a omissão de `null`.
- `has` considera a chave presente quando `get` não retorna `undefined` (um valor `null` conta como presente).
- `toObject()` retorna o objeto mantido pelo builder, não uma cópia.
- A API é exportada por `index.ts`; o build usa `tsup` e TypeScript.

## Comandos e práticas

Confira os scripts de `package.json`. Os comandos atuais incluem `npm run quick:test`, `npm test` (lint mais cobertura), `npm run lint`, `npm run typecheck`, `npm run build` e `npm run format` (altera os arquivos). Execute verificações adequadas ao pedido e à mudança.

Preserve ESM, tipos e comportamento públicos. Siga ESLint, Prettier e Conventional Commits. Commit, push e PR só quando solicitados explicitamente; nunca descarte alterações do workspace nem exponha segredos.
