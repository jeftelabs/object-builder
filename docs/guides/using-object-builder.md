# Guia de uso do `ObjectBuilder`

## Criar um builder

Importe a classe da entrada pública e forneça um objeto inicial (obrigatório):

```ts
import { ObjectBuilder } from '@jeftelabs/object-builder'

const builder = new ObjectBuilder({ id: 1 })
```

O objeto inicial é armazenado diretamente; chamadas a `add` ou `remove` modificam essa mesma referência.

## Adicionar valores condicionais

`add` encadeia e ignora sempre valores `undefined`:

```ts
const payload = new ObjectBuilder({})
  .add('id', 1)
  .add('displayName', name || undefined)
  .toObject()
```

Se `name` não estiver disponível, não será criada a propriedade `displayName`.

## Tratar `null`

Por padrão, `null` é armazenado. Para omitir `null`, passe `true` no segundo argumento do construtor:

```ts
const payload = new ObjectBuilder({}, true)
  .add('nickname', null)
  .add('active', true)
  .toObject()
// { active: true }
```

O argumento é uma opção booleana posicional, chamado `IgnoreNull` nos tipos genéricos. Para falsy values como `false`, `0` e `''`, o builder não faz filtragem: todos são armazenados.

## Consultar e remover

```ts
const builder = new ObjectBuilder({ enabled: false, label: 'ready' })

builder.has('enabled') // true: false é diferente de undefined
builder.get('label')   // 'ready'
builder.remove('label')
builder.has('label')    // false
```

`has` equivale a `get(key) !== undefined`. Por isso, uma propriedade armazenada como `null` conta como existente; propriedade com valor `undefined` não conta como existente.

## Ler o objeto construído

```ts
const result = builder.toObject()
```

O valor retornado é o mesmo objeto interno, não uma cópia. Alterar o resultado altera o estado do builder e vice-versa. A propriedade pública `values` também expõe esse objeto.

## Inferência e tipos explícitos

As adições encadeadas ampliam o tipo conhecido:

```ts
const result = new ObjectBuilder({ id: 1 }).add('name', 'Ada').toObject()
// tipo: { id: number } & { name: string }
```

Se o tipo deve representar chaves opcionais ou um formato mais amplo previamente conhecido, declare o tipo do builder explicitamente, por exemplo `new ObjectBuilder<{ name?: string }>({})`. Consulte [`references/api.md`](../references/api.md) para comportamento de `null` e condicionais de tipo.

## Limites de uso

- `add` e `remove` mutam o objeto de entrada.
- `remove` aceita apenas chaves conhecidas pelo tipo `ReturnType`, embora o objeto em runtime seja JavaScript comum.
- `toObject()` não produz um objeto imutável nem independente.
- Valores falsy diferentes de `undefined`/`null` permanecem, inclusive `false`, `0` e string vazia.
