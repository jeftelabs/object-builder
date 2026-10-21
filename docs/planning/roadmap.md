# Escopo atual e critérios de evolução

## Estado observado

O pacote atualmente publica uma única classe, `ObjectBuilder`, para composição incremental e mutável de objetos JavaScript, com filtragem de `undefined` e opção de ignorar `null`. Essa delimitação é baseada em `index.ts`, nos testes e nas exportações de `package.json`.

Este documento descreve critérios de planejamento. Não registra promessas, datas ou funcionalidades futuras aprovadas.

## Critérios para uma proposta

Para avaliar uma evolução, documente:

1. O caso de uso concreto e por que a API atual não atende.
2. O contrato pretendido em runtime e nos tipos TypeScript.
3. Efeitos de mutação, referência, cópia, valores `null`/`undefined` e sobrescrita de chaves.
4. Compatibilidade com a versão já publicada e necessidade de mudança major/minor/patch.
5. Cobertura de testes, atualização de guias/referências/README e impacto em build/publicação.

## Páginas a revisar por área

- API ou inferência: `references/api.md` e `guides/using-object-builder.md`.
- Escopo ou responsabilidades: `guides/overview.md`.
- Testes: `references/tests.md` e `guides/development.md`.
- Scripts, typescript, distribuição ou workflows: `references/package-and-build.md`.
- Descoberta de documentação: `docs/README.md` e README raiz.

## Manutenção

Somente registre roadmap como compromisso após decisão explícita do mantenedor. Revise afirmações de estado quando o código ou os testes mudarem, indique a fonte de evidência e atualize as páginas afetadas na mesma alteração.
