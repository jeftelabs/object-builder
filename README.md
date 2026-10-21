# `@jeftelabs/object-builder`

`ObjectBuilder` ajuda a montar um objeto gradualmente quando algumas propriedades dependem de condições. A classe preserva os tipos inferidos dos valores adicionados e permite ignorar `null` opcionalmente.

## Requisitos

O pacote requer Node.js `>=20.6.0` e é publicado como ESM com declarações TypeScript.

## Instalação

```sh
npm install @jeftelabs/object-builder
```

## Uso

```ts
import { ObjectBuilder } from '@jeftelabs/object-builder'

const user = {
  id: 42,
  firstName: 'Ada',
  lastName: 'Lovelace',
  nickname: undefined as string | undefined,
}

const result = new ObjectBuilder({})
  .add('id', user.id)
  .add('name', user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : undefined)
  .add('nickname', user.nickname)
  .toObject()

// { id: 42, name: 'Ada Lovelace' }
```

O construtor recebe um objeto inicial. Cada chamada `add` retorna o builder, permitindo encadear operações; `undefined` é ignorado. Consulte o [guia de uso](./docs/guides/using-object-builder.md) para opções de `null`, leitura, remoção e tipos.

### Ignorar valores `null`

Por padrão, `null` é adicionado como qualquer outro valor. Passe `true` como segundo argumento para ignorá-lo:

```ts
const result = new ObjectBuilder({}, true)
  .add('name', null)
  .add('role', 'admin')
  .toObject()

// { role: 'admin' }
```

### Métodos disponíveis

```ts
builder.add(key, value) // adiciona se o valor não for filtrado
builder.get(key)        // obtém o valor associado
builder.has(key)        // true se get(key) não for undefined
builder.remove(key)     // remove a chave
builder.toObject()      // retorna o objeto mutável mantido pelo builder
```

## Documentação

A [documentação completa](./docs/README.md) explica arquitetura, API, tipos, testes e manutenção. As regras de contribuição para agentes, incluindo a obrigação de documentar toda alteração, estão em [`AGENTS.md`](./AGENTS.md).

## Desenvolvimento

```sh
npm install
npm run quick:test
npm run lint
npm run typecheck
npm run build
```

O [guia de desenvolvimento](./docs/guides/development.md) descreve os scripts, testes, build e publicação. `npm test` inclui lint e cobertura; `npm run format` modifica arquivos.

## Licença

MIT. Consulte [`LICENSE`](./LICENSE).
