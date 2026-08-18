/**
 * dsh-compact-now — DSH 一键压缩上下文插件（host 半部）
 *
 * 全部逻辑在 client 半部：输入框「压缩」按钮调用
 * `ctx.remote.commands.execute(sessionId, '/compact')`，复用 DSH 内置
 * /compact 命令（compaction 服务的 compactNow），把旧历史折叠成摘要，
 * 降低每轮请求重发全部历史的 token 开销。
 */
import type { Context } from '@deepseek-ai/cordis'

export const name = 'dsh-compact-now'
export const inject: string[] = []

export function apply(_ctx: Context): void {
  // host 半部无事可做；按钮逻辑在 client 半部。
}
