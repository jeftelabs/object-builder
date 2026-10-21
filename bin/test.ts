import { assert } from '@t8ngs/assert'
import { expect } from '@t8ngs/expect'
import { expectTypeOf } from '@t8ngs/expect-type'
import { fileSystem } from '@t8ngs/fs'
import { configure, processCLIArgs, run } from '@t8ngs/runner'

processCLIArgs(process.argv.splice(2))
configure({
  files: ['tests/**/*.spec.ts'],
  plugins: [expect(), assert(), fileSystem(), expectTypeOf()],
})

run()
