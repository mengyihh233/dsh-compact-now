#!/usr/bin/env node
/**
 * dsh-compact-now client 鏋勫缓
 * DSH 鐨?client 鎻掍欢鍗婇儴瑕佹眰 `window.__ModuleLoader__.load({ id, factory })`
 * 鍖呰鏍煎紡锛坋sbuild CJS bundle锛夆€斺€旀櫘閫?ESM 浜х墿涓嶄細琚?client 杩愯鏃惰杞姐€? * 鍙傝€?dsh-learn-everything / dsh-optimizer / dsh-toolctl銆? */
import { build } from 'esbuild'
import { resolve, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repo = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const pluginId = 'dsh-compact-now'

await build({
  entryPoints: [join(repo, 'src', 'client.ts')],
  bundle: true,
  format: 'cjs',
  platform: 'browser',
  target: ['es2022'],
  outfile: join(repo, 'lib', 'client.js'),
  external: ['react'],
  banner: {
    js: `window.__ModuleLoader__.load({ id: "${pluginId}", factory: (require) => { var module = { exports: {} }; var exports = module.exports;`,
  },
  footer: { js: 'return module.exports; } });' },
  define: { 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV ?? 'production') },
  logLevel: 'info',
})

console.log('[dsh-compact-now] client bundle built -> lib/client.js')
