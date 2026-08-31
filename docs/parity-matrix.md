# StoryEngine Original → Codex Port Parity Matrix

基准：[`ec42f2709391d42968cb9059c107ae64e2fd42b3`](https://github.com/brian-caylor/StoryEngine_Template/tree/ec42f2709391d42968cb9059c107ae64e2fd42b3)。完整源清单见 [source inventory](source-inventory.md)。

状态含义：**Preserved** 保留内容或行为；**Extracted** 从原系统提示拆出；**Adapted** 平台适配或已批准的小修复；**Added** 用户要求的交付补充；**Gap** 明确保留的能力限制。此表不声称不同模型会生成相同正文，也不以静态测试代替真实创作实测。

## 逐文件映射

| StoryEngine Original | Codex Port | Status | Difference | Reason |
|---|---|---|---|---|
| [LICENSE](https://github.com/brian-caylor/StoryEngine_Template/blob/ec42f2709391d42968cb9059c107ae64e2fd42b3/LICENSE) | LICENSE | Preserved | 原文保留 MIT 许可证及 brian-caylor 版权声明。 | 无需平台迁移，保留原设计 |
| [README.md](https://github.com/brian-caylor/StoryEngine_Template/blob/ec42f2709391d42968cb9059c107ae64e2fd42b3/README.md) | README.md | Adapted | 与模板 README 合并；Codex 入口、中文说明及正确来源链接。 | Codex 适配、明确交付要求或已批准的可用性修复 |
| [story-engine-template/PROJECT.md](https://github.com/brian-caylor/StoryEngine_Template/blob/ec42f2709391d42968cb9059c107ae64e2fd42b3/story-engine-template/PROJECT.md) | PROJECT.md | Adapted | 仅将 Claude 引导改为 Codex；保留原字段和复选框。 | Codex 适配、明确交付要求或已批准的可用性修复 |
| [story-engine-template/README.md](https://github.com/brian-caylor/StoryEngine_Template/blob/ec42f2709391d42968cb9059c107ae64e2fd42b3/story-engine-template/README.md) | README.md | Adapted | 保留操作语义、原署名与可选 Word 导出，取消手动加载系统提示。 | Codex 适配、明确交付要求或已批准的可用性修复 |
| [story-engine-template/SYSTEM_PROMPT.md](https://github.com/brian-caylor/StoryEngine_Template/blob/ec42f2709391d42968cb9059c107ae64e2fd42b3/story-engine-template/SYSTEM_PROMPT.md) | AGENTS.md; docs/architecture.md; docs/workflow.md; docs/state-model.md; prompts/ | Extracted | 分拆职责而不改叙事架构；前五阶段提取为独立 Prompt。 | Codex 指令分层及用户要求 |
| [story-engine-template/build-docx.js](https://github.com/brian-caylor/StoryEngine_Template/blob/ec42f2709391d42968cb9059c107ae64e2fd42b3/story-engine-template/build-docx.js) | build-docx.js | Adapted | 修复输入目录与标题提取；保留 CommonJS、docx 和原排版。 | Codex 适配、明确交付要求或已批准的可用性修复 |
| [story-engine-template/characters/_TEMPLATE.md](https://github.com/brian-caylor/StoryEngine_Template/blob/ec42f2709391d42968cb9059c107ae64e2fd42b3/story-engine-template/characters/_TEMPLATE.md) | characters/_TEMPLATE.md | Preserved | 保留身份、心理、弧线、Voice DNA、关系和秘密等字段。 | 无需平台迁移，保留原设计 |
| [story-engine-template/characters/cast.md](https://github.com/brian-caylor/StoryEngine_Template/blob/ec42f2709391d42968cb9059c107ae64e2fd42b3/story-engine-template/characters/cast.md) | characters/cast.md | Preserved | 保留主角、配角、次要角色和关键关系。 | 无需平台迁移，保留原设计 |
| [story-engine-template/continuity/changelog.md](https://github.com/brian-caylor/StoryEngine_Template/blob/ec42f2709391d42968cb9059c107ae64e2fd42b3/story-engine-template/continuity/changelog.md) | continuity/changelog.md | Preserved | 保留 Markdown 模板；协议规定在本文件记录读入缺失、审批、冲突及修订策略。 | 无需平台迁移，保留原设计 |
| [story-engine-template/continuity/threads.md](https://github.com/brian-caylor/StoryEngine_Template/blob/ec42f2709391d42968cb9059c107ae64e2fd42b3/story-engine-template/continuity/threads.md) | continuity/threads.md | Preserved | 保留 Open / Active / Closed 及章节标记。 | 无需平台迁移，保留原设计 |
| [story-engine-template/continuity/tracker.md](https://github.com/brian-caylor/StoryEngine_Template/blob/ec42f2709391d42968cb9059c107ae64e2fd42b3/story-engine-template/continuity/tracker.md) | continuity/tracker.md | Preserved | 保留五类事实及确立/最后提及的章节。 | 无需平台迁移，保留原设计 |
| [story-engine-template/outline/scenes/_TEMPLATE.md](https://github.com/brian-caylor/StoryEngine_Template/blob/ec42f2709391d42968cb9059c107ae64e2fd42b3/story-engine-template/outline/scenes/_TEMPLATE.md) | outline/scenes/_TEMPLATE.md | Preserved | 保留全部节拍、钩子、情绪、连续性输入输出与线程字段。 | 无需平台迁移，保留原设计 |
| [story-engine-template/outline/structure.md](https://github.com/brian-caylor/StoryEngine_Template/blob/ec42f2709391d42968cb9059c107ae64e2fd42b3/story-engine-template/outline/structure.md) | outline/structure.md | Preserved | 保留结构选择及默认三幕；不新增创作阶段。 | 无需平台迁移，保留原设计 |
| [story-engine-template/prompts/continuity-check.md](https://github.com/brian-caylor/StoryEngine_Template/blob/ec42f2709391d42968cb9059c107ae64e2fd42b3/story-engine-template/prompts/continuity-check.md) | prompts/continuity-check.md | Adapted | Codex 文件读取协议；保留七类检查、问题严重度与 Thread Health 报告。 | Codex 适配、明确交付要求或已批准的可用性修复 |
| [story-engine-template/prompts/draft-chapter.md](https://github.com/brian-caylor/StoryEngine_Template/blob/ec42f2709391d42968cb9059c107ae64e2fd42b3/story-engine-template/prompts/draft-chapter.md) | prompts/draft-chapter.md | Adapted | 保留全部原读入与五步检查；补充 PROJECT、缺失记录、Canon 和显式更新验证。 | Codex 适配、明确交付要求或已批准的可用性修复 |
| [story-engine-template/prompts/reader-review.md](https://github.com/brian-caylor/StoryEngine_Template/blob/ec42f2709391d42968cb9059c107ae64e2fd42b3/story-engine-template/prompts/reader-review.md) | prompts/reader-review.md | Adapted | 保留只读正文和完整报告格式；明确同一会话无法真正遗忘作者上下文。 | Codex 适配、明确交付要求或已批准的可用性修复 |
| [story-engine-template/prompts/revision-pass.md](https://github.com/brian-caylor/StoryEngine_Template/blob/ec42f2709391d42968cb9059c107ae64e2fd42b3/story-engine-template/prompts/revision-pass.md) | prompts/revision-pass.md | Adapted | 保留六步与传播授权；将策略/反馈落盘，补明确验证与已授权不重复询问。 | Codex 适配、明确交付要求或已批准的可用性修复 |
| [story-engine-template/prompts/voice-check.md](https://github.com/brian-caylor/StoryEngine_Template/blob/ec42f2709391d42968cb9059c107ae64e2fd42b3/story-engine-template/prompts/voice-check.md) | prompts/voice-check.md | Adapted | 保留七项分析、严重度、角色声音评分及完整报告格式。 | Codex 适配、明确交付要求或已批准的可用性修复 |
| [story-engine-template/scripts/compile-manuscript.sh](https://github.com/brian-caylor/StoryEngine_Template/blob/ec42f2709391d42968cb9059c107ae64e2fd42b3/story-engine-template/scripts/compile-manuscript.sh) | scripts/compile-manuscript.sh | Adapted | 保留入口、默认输出、章节范围与 wc -w；增加输出不覆盖输入或 Canon 的保护。 | Codex 适配、明确交付要求或已批准的可用性修复 |
| [story-engine-template/scripts/continuity-snapshot.sh](https://github.com/brian-caylor/StoryEngine_Template/blob/ec42f2709391d42968cb9059c107ae64e2fd42b3/story-engine-template/scripts/continuity-snapshot.sh) | scripts/continuity-snapshot.sh | Adapted | 保留三文件和分钟时间戳；缺文件或重名先报错，不覆盖快照。 | Codex 适配、明确交付要求或已批准的可用性修复 |
| [story-engine-template/scripts/init-project.sh](https://github.com/brian-caylor/StoryEngine_Template/blob/ec42f2709391d42968cb9059c107ae64e2fd42b3/story-engine-template/scripts/init-project.sh) | scripts/init-project.sh; outline/act-1.md; outline/act-2.md; outline/act-3.md | Adapted | 匹配真实标题占位符并转义输入；补目录，保留已有文件；替换 Claude 引导。 | Codex 适配、明确交付要求或已批准的可用性修复 |
| [story-engine-template/scripts/word-count.sh](https://github.com/brian-caylor/StoryEngine_Template/blob/ec42f2709391d42968cb9059c107ae64e2fd42b3/story-engine-template/scripts/word-count.sh) | scripts/word-count.sh | Adapted | 保留 wc -w，读取真实 Target Length；跳过模板/无效值并约束进度条长度。 | Codex 适配、明确交付要求或已批准的可用性修复 |
| [story-engine-template/style/motifs.md](https://github.com/brian-caylor/StoryEngine_Template/blob/ec42f2709391d42968cb9059c107ae64e2fd42b3/story-engine-template/style/motifs.md) | style/motifs.md | Preserved | 保留视觉母题、主题回声与象征物。 | 无需平台迁移，保留原设计 |
| [story-engine-template/style/samples.md](https://github.com/brian-caylor/StoryEngine_Template/blob/ec42f2709391d42968cb9059c107ae64e2fd42b3/story-engine-template/style/samples.md) | style/samples.md | Adapted | 仅替换 Claude 为 Codex。 | Codex 适配、明确交付要求或已批准的可用性修复 |
| [story-engine-template/style/voice-guide.md](https://github.com/brian-caylor/StoryEngine_Template/blob/ec42f2709391d42968cb9059c107ae64e2fd42b3/story-engine-template/style/voice-guide.md) | style/voice-guide.md | Adapted | 保留全部原字段；按用户要求显式补齐叙事距离、句长、段落节奏、描写密度与说明策略。 | Codex 适配、明确交付要求或已批准的可用性修复 |
| [story-engine-template/world/locations.md](https://github.com/brian-caylor/StoryEngine_Template/blob/ec42f2709391d42968cb9059c107ae64e2fd42b3/story-engine-template/world/locations.md) | world/locations.md | Preserved | 原样保留。 | 无需平台迁移，保留原设计 |
| [story-engine-template/world/rules.md](https://github.com/brian-caylor/StoryEngine_Template/blob/ec42f2709391d42968cb9059c107ae64e2fd42b3/story-engine-template/world/rules.md) | world/rules.md | Preserved | 原样保留。 | 无需平台迁移，保留原设计 |
| [story-engine-template/world/setting.md](https://github.com/brian-caylor/StoryEngine_Template/blob/ec42f2709391d42968cb9059c107ae64e2fd42b3/story-engine-template/world/setting.md) | world/setting.md | Preserved | 原样保留。 | 无需平台迁移，保留原设计 |
| [story-engine-template/world/timeline.md](https://github.com/brian-caylor/StoryEngine_Template/blob/ec42f2709391d42968cb9059c107ae64e2fd42b3/story-engine-template/world/timeline.md) | world/timeline.md | Preserved | 原样保留。 | 无需平台迁移，保留原设计 |

## 行为、命令与补充交付

| StoryEngine Original | Codex Port | Status | Difference | Reason |
|---|---|---|---|---|
| SYSTEM_PROMPT: Core Directives | AGENTS.md; docs/architecture.md | Extracted | Files Are Memory、Read Before Write、Write → Update → Verify、User Is Director 均保留 | 采用简短 Codex 导航，详细协议按需读取 |
| Phase 1: Conception | prompts/conception.md | Extracted | 保留澄清题材、语气、长度、主题、受众与 PROJECT 审批 | 原段落提取 |
| Phase 2: World Building | prompts/world-building.md | Extracted | 四个 world 文件、逐份审阅及阶段 Gate 不变 | 原段落提取 |
| Phase 3: Character Architecture | prompts/character-architecture.md | Extracted | 角色名单、角色模板、Voice DNA 与审批不变 | 原段落提取 |
| Phase 4: Structural Outlining | prompts/structural-outlining.md | Extracted | 结构、三幕、章节与场景卡不变 | 幕模板来自原 init 脚本 |
| Phase 5: Style Calibration | prompts/style-calibration.md | Extracted | 三份 300–500 词样稿、选择与批准样稿保留 | 采用 SYSTEM_PROMPT 的明确三份要求而非 README 的 2–3 份概述 |
| Phase 6: Iterative Drafting | prompts/draft-chapter.md; docs/workflow.md | Adapted | 前两章、场景、角色、事实、线程、文风和样稿都读取；逐章更新后验证 | 增加任务要求的 PROJECT 读取及缺失记录 |
| Phase 7: Review Cycles | 三份原审阅 Prompt | Preserved | 完整初稿后依次审阅并提交三份报告；单项命令仍可提前调用 | 不增设阶段或评分引擎 |
| Phase 8: Revision | prompts/revision-pass.md | Adapted | 策略、原位编辑、状态维护、后续影响、用户传播授权不变 | 将聊天反馈和修订策略写入 changelog，满足 Files Are Memory |
| Review: Continuity Audit | continuity/audit-report.md | Preserved | 原报告严重度、来源定位、建议修复与 Thread Health 保留 | 审阅不会偷偷修正文稿或改变 Canon |
| Review: Voice Consistency | style/consistency-report.md | Preserved | 原声音分析与报告字段保留 | 引用 voice-guide、samples 和相关角色 Voice DNA |
| Review: Reader Simulation | drafts/reader-report.md | Adapted | 只将按序正文作为故事信息源，保留全部报告字段 | 路由先于常规状态读取，避免主动泄漏设定 |
| Reader Simulation: zero foreknowledge | docs/codex-port-notes.md | Gap | 同一会话无法真正消除先前作者上下文 | 不引入多 Agent 或新会话编排；不宣称严格盲测 |
| Continuity state | docs/state-model.md; continuity/ | Preserved | Characters / Objects & Items / Information & Secrets / Relationships / World State | 保留章节标签和文件事实源 |
| Threads | continuity/threads.md | Preserved | Open / Active / Closed 和 opened/advanced/resolved 章节 | 不引入数据库或状态机服务 |
| Scene state | outline/scenes/_TEMPLATE.md | Preserved | 全部元数据、目的、双钩子、节拍、情绪、依赖与输出 | 模板原样保留 |
| Context Window Limits | docs/workflow.md | Preserved | 定向读取、tracker 摘要、按 3–5 章分批完整审阅 | 不得跳过章节或把最新状态误当成过去状态 |
| Contradictions Detected | AGENTS.md; docs/workflow.md | Adapted | 停写、在 changelog 记录两种版本及来源、用户裁定、更新受影响文件后恢复 | 用户已明确裁定时不重复请求同一授权 |
| Voice Drift Detected | docs/workflow.md | Preserved | 完整重读 samples、临时 100 词校准段、删除后续写 | 不提交校准段或计入正文/统计 |
| status / review [file] | docs/workflow.md | Preserved | 读取当前进度；展示指定文件，不自动编辑 | 自然语言协议而非 CLI parser |
| revise [chapter] | docs/workflow.md; prompts/revision-pass.md | Preserved | 按既有反馈进入指定章节修订 | 遵守已授权范围 |
| continuity / threads | docs/workflow.md | Preserved | 展示事实或 Open / Active / Closed 状态 | 不把展示当成审计或修改 |
| wordcount / compile | docs/workflow.md; scripts/ | Preserved | 运行原入口；编译默认 manuscript.md、可传输出名 | 仅选 chapter-*.md，保留 wc -w 语义 |
| audit / voice-check / reader-sim | docs/workflow.md; prompts/ | Preserved | 分别路由三种审阅及其原报告 | 不需要 API 或服务 |
| next | docs/workflow.md | Adapted | 推进已满足 Gate 的下一阶段或下一章，不自动跳阶段 | 推进和用户确认写入文件；不从工程实施授权推断创作授权 |
| Git scaffold / empty directories | 根目录、drafts/.gitkeep、三个 Act 文件 | Added | 上游嵌套模板提升到仓库根，提交必需空目录及幕模板 | 独立 clone 后即可使用 |
| Contract and script tests | tests/ | Added | Node 内置测试、临时夹具、独立性检查与真实 DOCX 检查 | 验证工程契约，不评价小说质量 |
| Minimal example | examples/minimal-story/ | Added | 小型状态实例与一个场景卡，无章节正文 | 验证模板可表达工作流，不等同真实八阶段创作实测 |
| Dependency manifest | package.json; package-lock.json | Added | 固定 docx 9.7.1；测试不引入框架 | 核心 Codex 写作无需 npm 安装；仅开发测试/可选导出用 Node |
| Local task materials | 忽略的 Prompt 资料包及 ZIP | Added | 保留原文件，不提交、不依赖、不执行第二或第三项任务 | 用户指定本次只完成第一版 Port |

## 验证边界

- 契约测试核对入口、协议顺序、状态/报告格式与路径；工具测试运行真实脚本。
- 原始 29 个文件均有映射；未改动模板和许可证可通过源 Git blob SHA 检查。
- Markdown 文件仍是唯一长期故事状态。无数据库、向量检索、Agent 框架、后台任务或外部私有路径。
- 本版不会执行本地资料包中的独立审计任务或万字小说任务；具体测试结果见 [v1 交付报告](implementation-report.md)。
