# Visão geral e arquitetura

## Objetivo

`@jeftelabs/object-builder` exporta `ObjectBuilder`, uma classe pequena para construir incrementalmente um objeto com propriedades condicionais. Ela evita espalhar lógica de spread condicional ou mutações manuais quando campos opcionais são preparados.

## Estrutura

- [`index.ts`](../../index.ts) contém a implementação, os tipos auxiliares privados e a exportação pública.
- [`tests/object_builder.spec.ts`](../../tests/object_builder.spec.ts) registra contratos de runtime e inferência de tipo.
- [`bin/test.ts`](../../bin/test.ts) configura os plugins e o padrão `tests/**/*.spec.ts`.
- `tsup` empacota `index.ts` como ESM, e TypeScript emite declarações em `build/`.
- [`package.json`](../../package.json) define o pacote npm, requisitos, entry point e automações.

## Modelo de funcionamento

O consumidor fornece um objeto inicial ao construtor. O builder mantém esse mesmo objeto em `values` e suas operações modificam esse estado:

1. `add(key, value)` não faz nada quando `value` é `undefined`.
2. Quando `ignoreNull` é `true`, `add` também não faz nada para `null`.
3. Caso contrário, `add` grava a propriedade e retorna o builder para encadeamento.
4. `get` lê a propriedade; `has` verifica se o valor lido não é `undefined`; `remove` apaga a propriedade.
5. `toObject` devolve o objeto mantido, sem copiar.

## Tipos

O tipo inicial `ReturnType` é o formato do objeto inicial. Cada adição válida em cadeia retorna um builder tipado como `ReturnType & { chave: Valor }`. A sobrecarga de `add` para `undefined` retorna `this` sem acrescentar a chave ao tipo. Com `IgnoreNull` igual a `true`, o tipo de retorno de `toObject` omite chaves cujos valores são `null` no tipo acumulado.

Essas regras de tipagem e as limitações de `has` estão explicitadas na [referência de API](../references/api.md).

## Limites

A biblioteca não clona, valida, congela nem serializa objetos. Ela não inclui API de merge, defaults ou transformação. O estado é mutável e o chamador pode observar a mesma referência via `values` ou `toObject()`.
