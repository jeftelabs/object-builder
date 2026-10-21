# Referência de testes

## Runner

[`bin/test.ts`](../../bin/test.ts) processa argumentos CLI e configura `@t8ngs/runner` com plugins `@t8ngs/expect`, `@t8ngs/assert`, `@t8ngs/fs` e `@t8ngs/expect-type`. O glob configurado é `tests/**/*.spec.ts`.

`npm run quick:test` executa o runner com `ts-node-maintained`. `npm test` executa primeiro lint (hook `pretest`) e depois cobertura com `c8`; o relatório configurado inclui texto e HTML, excluindo `tests/**` da medição.

## Contratos existentes

[`tests/object_builder.spec.ts`](../../tests/object_builder.spec.ts) cobre:

- objeto inicial e seu tipo;
- adição de propriedade, várias propriedades e encadeamento;
- filtro de `undefined` sem chave nova no tipo;
- aceitação de `null` por padrão;
- omissão de `null` quando `ignoreNull` é true;
- obtenção e restrição de chave por tipo;
- existência para valores definidos, incluindo `false`;
- remoção e ausência após remoção.

## Manutenção

Quando o comportamento, a assinatura ou a inferência de tipos mudar, mantenha testes de runtime e type assertions em sincronia. Atualize esta página e a referência da API na mesma tarefa. Os scripts devem ser conferidos no `package.json`; não presuma que o workflow de CI execute todos os testes.
