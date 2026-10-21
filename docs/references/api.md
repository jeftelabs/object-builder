# Referência da API e dos tipos

A única exportação pública atual é `ObjectBuilder`, definida e exportada em [`index.ts`](../../index.ts). Não há subpaths adicionais declarados em `package.json`.

## Tipos auxiliares

`PickKeysByValue<T, V>` seleciona chaves de `T` cujo tipo é atribuível a `V`. `OmitProperties<T, P>` remove essas propriedades do tipo. Ambos são aliases internos, não exportados publicamente; `OmitProperties` é usado no tipo de retorno com omissão de `null`.

## `ObjectBuilder`

```ts
class ObjectBuilder<ReturnType extends Record<string, any>, IgnoreNull extends boolean = false> {
  constructor(initialValue: ReturnType, ignoreNull?: IgnoreNull)
  values: ReturnType
  add<Prop extends string>(key: Prop, value: undefined): this
  add<Prop extends string, Value>(key: Prop, value: Value): ObjectBuilder<ReturnType & { [P in Prop]: Value }, IgnoreNull>
  remove<K extends keyof ReturnType>(key: K): this
  has<K extends keyof ReturnType>(key: K): boolean
  get<K extends keyof ReturnType>(key: K): ReturnType[K]
  toObject(): IgnoreNull extends true
    ? { [K in keyof OmitProperties<ReturnType, null>]: ReturnType[K] }
    : { [K in keyof ReturnType]: ReturnType[K] }
}
```

### Construtor

- `initialValue` é obrigatório e vira diretamente o objeto interno `values`.
- `ignoreNull` é opcional; o builder habilita a filtragem somente quando o valor é literalmente `true` (`ignoreNull === true`).
- O parâmetro genérico `IgnoreNull` preserva o literal booleano para condicionar o tipo de `toObject()`.

### `add(key, value)`

- Se `value === undefined`, não escreve nada e retorna `this`; a sobrecarga evita adicionar essa chave ao tipo.
- Se `ignoreNull` for `true` e `value === null`, não escreve nada em runtime.
- Demais valores são atribuídos diretamente ao objeto e o tipo retornado é `ReturnType & { [P in Prop]: Value }`.
- A sobrecarga geral não retira `null` do tipo durante `add`; em modo `ignoreNull`, a transformação condicional ocorre em `toObject()`.
- `add` substitui o valor de uma chave já existente em runtime. A interseção de tipos pode, contudo, não representar essa substituição como um simples overwrite.

### `remove(key)`

Apaga a propriedade de `values` e retorna o builder. A chave é limitada a `keyof ReturnType` em tempo de tipo; o método não remove sua chave do tipo genérico acumulado.

### `get(key)` e `has(key)`

`get` retorna o valor tipado como `ReturnType[K]`. `has` retorna `this.get(key) !== undefined`, não usa `key in object` nem `hasOwnProperty`. Um valor `null`, `false`, `0` ou `''` é considerado presente; valor `undefined` não.

### `toObject()`

Retorna `values` diretamente, sem clone. Para `IgnoreNull extends true`, o tipo mapeado omite chaves cujo tipo se estende a `null`; caso contrário, mantém as chaves/tipos de `ReturnType`.

## Efeitos e limites

O estado é mutável, exposto pela propriedade pública `values`, pelo objeto inicial e pela referência retornada por `toObject()`. Não há validação de chaves, proteção contra prototype pollution, cópia ou congelamento implementados. Considere cuidadosamente o objeto/chaves de entrada na aplicação que usa a biblioteca.
