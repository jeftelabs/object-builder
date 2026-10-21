import { ObjectBuilder } from '../index.js'
/*
 * @jeftelabs/object-builder
 *
 * (c) Jeftelabs
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test } from '@t8ngs/runner'

test.group('ObjectBuilder', () => {
  test('define initial value', ({ assert, expectTypeOf }) => {
    const value = new ObjectBuilder({ name: 'virk' }).toObject()
    expectTypeOf(value).toEqualTypeOf<{ name: string }>()

    assert.deepEqual(value, {
      name: 'virk',
    })
  })

  test('add value to the object', ({ assert, expectTypeOf }) => {
    const value = new ObjectBuilder({}).add('name', 'virk').toObject()
    expectTypeOf(value).toEqualTypeOf<{ name: string }>()

    assert.deepEqual(value, {
      name: 'virk',
    })
  })

  test('add multiple values to the object', ({ assert, expectTypeOf }) => {
    const value = new ObjectBuilder({}).add('name', 'jefte').add('email', 'foo@bar.com').toObject()
    expectTypeOf(value).toEqualTypeOf<{ name: string; email: string }>()

    assert.deepEqual(value, {
      name: 'jefte',
      email: 'foo@bar.com',
    })
  })

  test('ignore if value is undefined', ({ assert, expectTypeOf }) => {
    const value = new ObjectBuilder({}).add('name', undefined).toObject()

    expectTypeOf(value).toEqualTypeOf<{}>()
    assert.deepEqual(value, {})
  })

  test('add null values', ({ assert, expectTypeOf }) => {
    const value = new ObjectBuilder({}).add('name', null).toObject()

    expectTypeOf(value).toEqualTypeOf<{ name: null }>()
    assert.deepEqual(value, { name: null })
  })

  test('conditionally ignore null values', ({ assert, expectTypeOf }) => {
    const value = new ObjectBuilder({}, true).add('name', null).toObject()

    expectTypeOf(value).toEqualTypeOf<{}>()
    assert.deepEqual(value, {})
  })

  test('get existing value', ({ assert }) => {
    let obj = new ObjectBuilder<{ name: string }>({} as any)
    obj.add('name', 'jefte')

    assert.equal(obj.get('name'), 'jefte')
    // @ts-expect-error
    assert.isUndefined(obj.get('age'))
  })

  test('find if a value exists', ({ assert }) => {
    const obj = new ObjectBuilder<{ name: string; foo: false }>({} as any)
    obj.add('name', 'jefte')
    obj.add('foo', false)

    assert.isTrue(obj.has('name'))
    assert.isTrue(obj.has('foo'))

    // @ts-expect-error
    assert.isFalse(obj.has('age'))
  })

  test('remove value', ({ assert }) => {
    const obj = new ObjectBuilder<{ name?: string }>({})
    obj.add('name', 'jefte')
    obj.remove('name')

    assert.isFalse(obj.has('name'))
    assert.deepEqual(obj.toObject(), {})
  })
})
