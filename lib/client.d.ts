/**
 * dsh-compact-now client — 会话输入框「压缩」按钮
 *
 * 挂在 conversation.input.right（发送键左侧的工具行）。点击调用
 * `ctx.remote.commands.execute(sessionId, '/compact')` —— 与 ui-commands
 * 渲染 /compact 命令完全相同的通道，复用官方 compaction 服务（compactNow）。
 */
import type { Context } from '@deepseek-ai/cordis';
export declare const name = "dsh-compact-now";
export declare const inject: string[];
export declare function apply(ctx: Context): void;
