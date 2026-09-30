/**
 * Fails if the two locale dictionaries drift apart.
 *
 *   node scripts/check-i18n.mjs
 *
 * A missing Vietnamese key silently falls back to English at runtime, which
 * looks like an untranslated page rather than an error. This makes it a build
 * failure instead.
 */
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const file = join(ROOT, 'src', 'lib', 'i18n.ts')
const src = readFileSync(file, 'utf8')

function keysOf(dictName) {
  const start = src.indexOf(`const ${dictName}: Dict = {`)
  if (start === -1) throw new Error(`could not find dictionary: ${dictName}`)
  const open = src.indexOf('{', start)
  let depth = 0
  let end = open
  for (let i = open; i < src.length; i++) {
    if (src[i] === '{') depth++
    else if (src[i] === '}') {
      depth--
      if (depth === 0) {
        end = i
        break
      }
    }
  }
  const body = src.slice(open, end)
  const keys = new Set()
  const re = /^\s{2}'([^']+)':/gm
  let m
  while ((m = re.exec(body)) !== null) keys.add(m[1])
  return keys
}

const en = keysOf('en')
const vi = keysOf('vi')

const missingVi = [...en].filter((k) => !vi.has(k))
const extraVi = [...vi].filter((k) => !en.has(k))

console.log(`check-i18n: en=${en.size} vi=${vi.size}`)

if (missingVi.length) {
  console.error(`\nmissing ${missingVi.length} Vietnamese key(s):`)
  for (const k of missingVi) console.error('  - ' + k)
}
if (extraVi.length) {
  console.error(`\n${extraVi.length} Vietnamese key(s) not in English:`)
  for (const k of extraVi) console.error('  + ' + k)
}

// Interpolated placeholders must line up, or a sentence renders with a
// literal "{parts}" in the output.
const placeholders = (dictName) => {
  const start = src.indexOf(`const ${dictName}: Dict = {`)
  const open = src.indexOf('{', start)
  let depth = 0
  let end = open
  for (let i = open; i < src.length; i++) {
    if (src[i] === '{') depth++
    else if (src[i] === '}') {
      depth--
      if (depth === 0) {
        end = i
        break
      }
    }
  }
  const out = new Map()
  const re = /^\s{2}'([^']+)':([\s\S]*?)(?=^\s{2}'|^\s{2}\})/gm
  let m
  while ((m = re.exec(src.slice(open, end))) !== null) {
    const vars = new Set((m[2].match(/\{(\w+)\}/g) || []).map((s) => s.slice(1, -1)))
    out.set(m[1], vars)
  }
  return out
}

const enVars = placeholders('en')
const viVars = placeholders('vi')
let varProblems = 0
for (const [key, vars] of enVars) {
  const other = viVars.get(key)
  if (!other) continue
  const missing = [...vars].filter((v) => !other.has(v))
  if (missing.length) {
    console.error(`  placeholder mismatch in "${key}": vi is missing {${missing.join('}, {')}}`)
    varProblems++
  }
}

if (missingVi.length || extraVi.length || varProblems) {
  console.error('\ncheck-i18n: FAILED')
  process.exit(1)
}
console.log('check-i18n: OK')
