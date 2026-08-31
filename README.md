# StoryEngine-Codex

A Codex-native port of StoryEngine_Template.

这是一个把 Codex 当作叙事架构师、作者、编辑和连续性管理者的文件式小说工作流，
用于验证 Agentic + File-based State 是否能够支持持续的长篇创作。它不是调用
OpenAI API 的应用，也不需要配置 API Key。

本项目基于 [brian-caylor/StoryEngine_Template](https://github.com/brian-caylor/StoryEngine_Template)，
固定参考提交 [ec42f2709391d42968cb9059c107ae64e2fd42b3](https://github.com/brian-caylor/StoryEngine_Template/tree/ec42f2709391d42968cb9059c107ae64e2fd42b3)。
原项目署名：Built by [OddlyUseful.app](https://oddlyuseful.app)。本版保留 MIT 许可证及
Copyright (c) 2026 brian-caylor；见 [LICENSE](LICENSE)。这是独立 Port，不宣称是上游官方发行版。

## 核心原则

- **Files are memory.** 世界、人物、剧情、文风、事实、审阅和修订历史必须写入文件。
- **Read before write.** 写作前实际读取相关状态，不用聊天记忆代替文件。
- **Write → Update → Verify.** 每章之后更新 tracker、threads、changelog，再检查矛盾。
- **User is the director.** 用户决定创作方向，阶段之间保留 Review Gate。

## 快速开始

1. 克隆自己的 StoryEngine-Codex 仓库，或使用完整的本地副本。本版只建立本地 Git 仓库，
   没有为你创建远程 URL；下方占位符应替换成你后来创建的仓库地址。
2. 在 Codex 中打开这个仓库的根目录。
3. 告诉 Codex：**“我想写一个关于……的故事，请按 StoryEngine 工作流开始。”**
4. Codex 读取根目录的 [AGENTS.md](AGENTS.md)，进入 Conception。
5. 审阅各阶段文件后继续；批准记录和当前阶段会写入项目文件。

```bash
git clone <YOUR_REPOSITORY_URL> StoryEngine-Codex
cd StoryEngine-Codex
# 可选：设置空白模板的书名，不会批准任何阶段
bash scripts/init-project.sh "你的故事标题"
```

无需手动粘贴 SYSTEM_PROMPT，无需更改 Codex 全局配置。AGENTS 按 Codex 的
[项目指令机制](https://learn.chatgpt.com/docs/agent-configuration/agents-md)加载；
如果任务在 AGENTS 创建前已打开，可新开一次任务或明确要求重新读取该文件。

## 八阶段工作流

| Phase | 阶段 | 主要产物 |
|---|---|---|
| 1 | Conception | PROJECT：题名、前提、主题、题材、长度和状态 |
| 2 | World Building | setting、rules、timeline、locations |
| 3 | Character Architecture | cast 与角色档案、弧线、Voice DNA |
| 4 | Structural Outlining | structure、act 文件与 Scene Card |
| 5 | Style Calibration | 三种样稿、用户选择、voice-guide、motifs、批准样稿 |
| 6 | Iterative Drafting | 逐章正文和同步更新的连续性状态 |
| 7 | Review Cycles | 连续性、文风、首次读者三份报告 |
| 8 | Revision | 原位修订、传播检查、状态维护与差异摘要 |

原阶段顺序不变。三个 Review 报告写到 continuity/audit-report.md、
style/consistency-report.md、drafts/reader-report.md；运行相应 Review 前没有报告是正常状态。
详细步骤见 [workflow](docs/workflow.md)，文件责任见 [state model](docs/state-model.md)。

## 项目地图

| 位置 | 用途 |
|---|---|
| AGENTS.md | 简短的任务导航与核心不变量 |
| docs/ | 架构、流程、状态责任、源清单与迁移说明 |
| PROJECT.md | 当前故事及其阶段状态 |
| world/、characters/ | 世界与人物 |
| outline/、outline/scenes/ | 故事结构与场景卡 |
| drafts/ | chapter-01.md 等正文，初始为空 |
| continuity/ | tracker、threads、changelog 及按需快照/审计 |
| style/ | 文风、母题及批准的参考样稿 |
| prompts/ | 十份独立任务协议 |
| scripts/、build-docx.js | 原 Bash 工具与 Word 导出 |
| tests/ | 工程契约与真实工具测试 |
| examples/minimal-story/ | 小型状态示例，不是默认活动故事 |

一个完整仓库副本对应一个故事。不要把 examples 的状态和根目录的创作混用。
使用示例时，先建一个全新的完整副本，再将示例状态覆盖到该副本根目录；
见 [最小示例说明](examples/minimal-story/README.md)。已有小说不应执行这种覆盖。

## 会话命令

这些是对 Codex 说的自然语言指令，不是新增的 CLI parser。

| 命令 | 行为 |
|---|---|
| status | 当前阶段、真实进度、待批准项和下一步 |
| review [file] | 展示指定文件供用户审阅，不自动编辑 |
| revise [chapter] | 依据反馈修订指定章节 |
| continuity | 展示连续性事实 |
| threads | 展示 Open / Active / Closed 线程 |
| wordcount | 运行逐章字数统计 |
| compile | 合并正文为 manuscript.md，或明确指定的安全文件名 |
| audit | 连续性审计 |
| voice-check | 文风一致性检查 |
| reader-sim | 只依据正文的首次读者模拟 |
| next | 在当前 Gate 满足后推进一个阶段或一章 |

## 可选工具

核心工作流只需要能读写项目文件的 Codex。工具沿用 Bash 与 GNU sed/coreutils；Node.js 22+ 用于开发测试
和可选 DOCX 导出。Windows 推荐 Git Bash；如果 PATH 中的 bash 指向 WSL，使用 Git Bash
终端，或显式调用安装目录中的 bash.exe。不需要 PowerShell 重写脚本。

```bash
bash scripts/init-project.sh "Story Title"
bash scripts/word-count.sh
bash scripts/compile-manuscript.sh
bash scripts/compile-manuscript.sh "my manuscript.md"
bash scripts/continuity-snapshot.sh

# 可选：安装已锁定的依赖并导出 Word
npm ci
node build-docx.js
```

所有 Bash 工具都从含 PROJECT.md 的故事根目录运行。编译输出必须留在该目录内，
父目录必须已存在，不能覆盖 Canon、章节或工程文件，也不能使用指向这些文件的别名。
快照仅复制 tracker、threads、changelog，保留分钟时间戳；同一分钟重复运行会报错，
请保留旧备份并在下一分钟再运行。

正文文件使用一致补零的数字命名：chapter-01.md、chapter-02.md……；预计超过 99 章时
统一使用三位编号。工具按文件名顺序处理，不合并 reader-report.md 或 chapter-notes.md。
字数保持上游 `wc -w` 的空白分词语义，包括 Markdown 标题，**不等于中文字符数**。
进度仅从已填写的 Target Length 中读取正整数 words 目标，模板示例和无效值不会作为目标。

Word 导出读取 drafts，使用 Working Title（或项目标题回退）；无可用英文文件名时
输出 manuscript.docx。保留上游 6×9 英寸、Georgia 字体、首行缩进、斜体和居中场景分隔。
它是轻量 Markdown 导出器，并非完整 Markdown 排版引擎。无章节时仍生成标题页，保持原行为。

## 测试与已知限制

```bash
npm ci
npm test
# 只验证 Markdown/结构契约，无需安装 docx 或 jszip
npm run test:contracts
```

Node 内置测试验证目录、Prompt、八阶段、读写契约、Review、授权传播、许可证、独立性，
并在临时故事夹具中运行脚本和真实 DOCX 导出。ZIP 检查使用 jszip（docx 本身已有的依赖，
在此显式列为测试依赖），不引入测试框架。测试会清理自己的临时文件，不修改真实故事。
如 Windows 测试无法发现 Git Bash，可设置 STORYENGINE_BASH 指向实际 bash.exe。

这些测试不能证明模型每次都真实执行了全部读取，也不能证明小说质量或长期文风稳定。
reader-sim 不主动读隐藏状态，但同一会话先前的作者上下文无法真正清除；不能称为严格盲测。
本次只提供最小状态示例，不执行万字端到端创作，也不自动运行独立评分审计。

迁移细节见 [source inventory](docs/source-inventory.md)、[parity matrix](docs/parity-matrix.md)
与 [port notes](docs/codex-port-notes.md)。不引入 TIDARC、数据库、RAG、多 Agent、Web UI、
API Server 或世界模拟架构；后续实验只在获得新的任务指令后进行。
