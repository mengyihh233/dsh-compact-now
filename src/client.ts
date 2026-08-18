/**
 * dsh-compact-now client — 会话输入框「压缩」按钮
 *
 * 挂在 conversation.input.right（发送键左侧的工具行）。点击调用
 * `ctx.remote.commands.execute(sessionId, '/compact')` —— 与 ui-commands
 * 渲染 /compact 命令完全相同的通道，复用官方 compaction 服务（compactNow）。
 */

declare const React: {
  createElement: (type: unknown, props: Record<string, unknown> | null, ...children: unknown[]) => unknown
  useState: <T>(initial: T) => [T, (v: T | ((p: T) => T)) => void]
}

import type { Context } from '@deepseek-ai/cordis'

export const name = 'dsh-compact-now'
export const inject: string[] = []

/** 输入区按钮工厂：闭包持有 ctx，点击执行 /compact。 */
function createCompactButton(ctx: Context) {
  return function CompactButton(props: { sessionId?: string }) {
  const [busy, setBusy] = React.useState(false)
  const [done, setDone] = React.useState(false)
  const sessionId = props && props.sessionId

  const run = () => {
    if (busy || !sessionId) return
    setBusy(true)
    const remote = ctx.get('remote') as
      | { commands?: { execute: (sessionId: string, line: string) => Promise<unknown> } }
      | undefined
    const cmd = remote && remote.commands && typeof remote.commands.execute === 'function'
      ? remote.commands.execute(sessionId, '/compact')
      : Promise.resolve({ ok: false })
    Promise.resolve(cmd).then(
      () => {
        setBusy(false)
        setDone(true)
        setTimeout(() => setDone(false), 2500)
      },
      () => {
        setBusy(false)
        setDone(true)
        setTimeout(() => setDone(false), 2500)
      },
    )
  }

  return React.createElement('button', {
    onClick: run,
    disabled: busy || !sessionId,
    title: '压缩上下文：把旧历史折叠成摘要，降低每轮 token 开销',
    style: {
      background: 'transparent',
      border: '1px solid var(--dsw-border, rgba(128,128,128,0.35))',
      borderRadius: 6,
      cursor: busy ? 'default' : 'pointer',
      fontSize: 13,
      padding: '3px 8px',
      color: done ? 'var(--dsw-state-success, #4caf50)' : 'var(--dsw-text-primary, #ddd)',
      opacity: busy ? 0.6 : 1,
    },
  }, busy ? '压缩中…' : done ? '已压缩 ✓' : '🗜 压缩')
  }
}

export function apply(ctx: Context): void {
  const slots = ctx.get('slots')
  if (slots === undefined) return
  const CompactButton = createCompactButton(ctx)
  slots.inject('conversation.input.right', () =>
    slots.register(
      { name: 'conversation.input.right', id: 'compact-now', order: 5 },
      (props: { sessionId?: string }) => React.createElement(CompactButton, props),
    ),
  )
}
