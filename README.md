# dsh-compact-now

DSH 会话输入框 **「🗜 压缩」按钮**：一键压缩上下文，旧历史折叠成摘要，每轮 token 立即下降。

## 问题

会话聊得越久，每轮请求都要把**全部历史**（含所有工具调用结果）重新发给模型——历史越大每轮越贵，指数恶化。手动打 `/compact` 能压，但要点两下、不好记。

## 功能

输入框工具行右侧（发送键左边）新增「🗜 压缩」按钮：

```
压缩中… → 已压缩 ✓
```

点击 = 执行 DSH 内置 `/compact` 命令（复用官方 compaction 服务的 `compactNow`），把旧历史折叠成摘要节点，后续每轮 token 显著下降。

## 安装

```bash
dsh plugin --profile web add github:mengyihh233/dsh-compact-now
```

装完重启 dsh web（bundle 插件需重启才 active），输入框出现「🗜 压缩」按钮。

## 原理

- 按钮挂 `conversation.input.right` slot（发送键左侧工具行，`sessionId` 由 slot props 提供）。
- 点击调用 `ctx.remote.commands.execute(sessionId, '/compact')` —— 与 ui-commands 渲染 `/compact` 命令完全相同的通道，不是 hack。
- 压缩需要 agent 空闲（模型不在跑）时点击；压缩本身花一次模型调用生成摘要，但远小于长会话每轮重发全部历史。

## 开发

```bash
npm install        # 触发 prepare：junction 链接部署根 @deepseek-ai 包
npm run build      # tsc 编译 host + esbuild 打包 client（ModuleLoader 格式）
```

## 说明

- 纯 client 插件：host 半部为空。
- 动态插件版本（Cordis 会话内定义）与此 bundle 版本功能等价，bundle 版可持久安装。
- 无 CSS 注入（按钮样式内联），不依赖 `styles` builtin。

## License

MIT
