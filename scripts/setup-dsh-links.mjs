#!/usr/bin/env node
/**
 * dsh-compact-now setup-dsh-links
 *
 * bundle 鎻掍欢鐨?host 鍗婇儴杩愯鏃?import @deepseek-ai/cordis銆傚湪 link 缂撳瓨
 * 瀹夎妯″紡锛坉shpm 鎶?git 浠撳簱 clone 鍒?plugin-manager-src 鍚庣洿鎺ユ墽琛岋級涓嬶紝
 * 鎻掍欢鐨?node_modules 閲屾病鏈夎繖浜涘唴閮ㄥ寘锛孨ode 浠庣紦瀛樼洰褰曞悜涓婁篃瑙ｆ瀽涓嶅埌 鈫? * 鍚姩鍗冲穿锛圕annot find package锛夈€? *
 * 鏈剼鏈妸閮ㄧ讲鏍圭殑 @deepseek-ai/cordis junction 閾炬帴杩涙彃浠惰嚜宸辩殑
 * node_modules锛坙earn-everything / dsh-optimizer 鍚屾鏂规锛夈€? * 閮ㄧ讲鏍规帰娴嬶細DSH_DEPLOY_ROOT 鐜鍙橀噺 鈫?Windows 甯歌璺緞 鈫?浠庢彃浠朵綅缃帹瀵笺€? */
import { existsSync, mkdirSync, symlinkSync, readdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const repo = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const NEEDED = ['cordis']

function candidateRoots() {
  const out = []
  if (process.env.DSH_DEPLOY_ROOT) out.push(process.env.DSH_DEPLOY_ROOT)
  out.push('D:\\deepseek harness\\resources\\host')
  const up = resolve(repo, '..', '..')
  if (/deepseek|harness/i.test(up)) {
    for (const guess of [
      join(up, 'resources', 'host'),
      join(up, 'host'),
      join(up, 'deepseek-harness', 'resources', 'host'),
    ]) {
      if (existsSync(join(guess, 'node_modules', '@deepseek-ai'))) out.push(guess)
    }
  }
  const home = process.env.USERPROFILE || process.env.HOME || ''
  if (home) {
    const profiles = join(home, '.dsh', 'profiles')
    if (existsSync(profiles)) {
      for (const prof of readdirSync(profiles)) {
        out.push(join(profiles, prof))
      }
    }
  }
  return out
}

let src = null
for (const root of candidateRoots()) {
  const nm = join(root, 'node_modules', '@deepseek-ai')
  if (existsSync(join(nm, 'cordis'))) {
    src = nm
    break
  }
}

if (!src) {
  console.error('[dsh-compact-now] 鏈壘鍒?DSH 閮ㄧ讲鏍?@deepseek-ai 鍖呫€傝璁剧疆鐜鍙橀噺 DSH_DEPLOY_ROOT 鎸囧悜閮ㄧ讲鏍圭洰褰曘€?)
  process.exit(1)
}

mkdirSync(join(repo, 'node_modules', '@deepseek-ai'), { recursive: true })
let linked = 0
for (const name of NEEDED) {
  const link = join(repo, 'node_modules', '@deepseek-ai', name)
  if (existsSync(link)) continue
  try {
    symlinkSync(join(src, name), link, 'junction')
    linked++
  } catch (e) {
    console.error(`[dsh-compact-now] 閾炬帴 ${name} 澶辫触: ${e.message}`)
  }
}
console.log(`[dsh-compact-now] @deepseek-ai 閾炬帴瀹屾垚锛堟柊澧?${linked} 涓紝鏉ユ簮: ${src}锛塦)
