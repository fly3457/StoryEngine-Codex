# Independent Parity Audit — StoryEngine-Codex

审计日期：2026-09-01。角色：Reviewer。范围：迁移保真度、协议可执行性、工程工具与独立性；不是小说质量评测。

## 最终结论

**修复后可以称为 high-fidelity Codex port，而不是重新设计的相似项目。**
文件式记忆、原八阶段、导演审批、写前上下文、写后状态维护、三类审阅和原位修订均有直接的上游依据，未发现被新架构替换。

最终未关闭问题：**Critical = 0，Major = 0，Minor = 2**。本次发现并修复了 1 项 Major，保留其复现与关闭证据，未通过改名或降级消除问题。

```text
Architecture Parity      100/100
Prompt Parity            100/100
Workflow Parity          100/100
State Model Parity       100/100
Codex Adaptation          96/100
Independence             100/100
Scope Discipline         100/100

Overall Parity Score      99/100
```

评分口径：以本任务列出的上游契约为检查集合；100 表示在该集合内未发现缺失或行为替换，**不表示模型执行成功率为 100%**。
合理的平台适配和上游本来就有的能力边界不扣分。剩余两个外围工具问题各扣 Codex Adaptation 2 分；已关闭的 Major 不再重复扣分。
总分为七项等权平均后四舍五入：696 / 7 = 99.43 → 99。分数是本次实现审计结论，不是自动 benchmark 分数。

未进行完整八阶段真人审批创作、万字稿生成或跨模型 A/B 写作；不据此宣称长篇连续性、文风稳定性或首次读者盲测效果已经得到实证。

## 基准、方法与证据范围

- 上游：[brian-caylor/StoryEngine_Template](https://github.com/brian-caylor/StoryEngine_Template)，本次重新从公开地址克隆，实际 HEAD 为 [`ec42f2709391d42968cb9059c107ae64e2fd42b3`](https://github.com/brian-caylor/StoryEngine_Template/tree/ec42f2709391d42968cb9059c107ae64e2fd42b3)，不是从本地说明推定版本。
- 上游 `git ls-tree -r --long HEAD`：29 个文件、51,794 字节。已读取全部内容，包括两份 README、主提示词、五个独立提示词、所有状态模板、四个 Bash 工具、Word 导出和 LICENSE。
- 本地起点：`823fb4eda6f2f46df8d4d81cb4c95b9fae623804`，79 个 Git 跟踪文件，审计开始时工作区干净。最终审计对象为该基线加本报告列出的工程补丁；没有替用户提交或推送。
- 本地实际读取了 AGENTS、十个 Prompt、architecture/workflow/state-model、状态模板、示例、全部工具、依赖清单/锁文件及测试实现。
- README、parity-matrix、codex-port-notes 和旧交付报告只作为待核对的声明。先读源码再检查声明；源清单中的 29 个 blob SHA 另与新克隆的 Git 对象逐一对上，不把声明数量当作保真证据。
- 执行基线测试、无 npm 包的克隆契约测试、克隆完整测试、上游/本版受控工具对照、额外边界探针，以及修复后的完整复测。所有合成正文、导出和初始化实验均在临时夹具或独立克隆中进行。
- 本次修复未更改活动故事的 PROJECT、world、characters、outline、drafts、continuity、style，也未更改创作 Prompt、AGENTS、运行脚本或依赖。

### 目录结构对照

| 责任 | 上游实际结构 | 本地实际结构 | 判定 |
|---|---|---|---|
| 启动指令 | `story-engine-template/SYSTEM_PROMPT.md`；README 要求粘贴或经 CLAUDE 引用 | 根 AGENTS + 按需 docs/prompts；无第二个 SYSTEM_PROMPT 或 CLAUDE 入口 | 原协议分层，不是另造引擎 |
| 故事根 | `story-engine-template/` | 仓库根 | 路径提升，单个副本仍只对应一个故事 |
| 世界与人物 | `world/` 四文件、角色模板、cast | 相同文件名和职责 | 保留 |
| 结构与场景 | structure、Scene Card 模板；Act 文件由 init 脚本生成 | 原结构/场景模板及预先提交的 act-1/2/3 | 对照上游 heredoc，三份 Act 模板内容一致 |
| 正文 | 协议指定 `drafts/chapter-[N].md`；Git 未跟踪空 drafts | `drafts/.gitkeep`，正文命名协议不变 | 补足 Git 空目录问题 |
| 连续性与文风 | continuity 三文件、style 三文件 | 相同文件与字段；voice-guide 增补五个细化字段 | 无新的故事状态存储 |
| 任务提示 | 独立 Prompt 5 个；前五阶段在主提示词内 | 独立 Prompt 10 个 | 前五阶段被提取，阶段总数仍为八 |
| 工具 | 4 个 Bash 脚本 + CommonJS Word 导出 | 相同入口与技术栈 | 有边界修复，未改成应用服务 |
| 本地新增 | 无 | docs、tests、npm 锁、minimal-story 示例 | 文档/测试/演示；不是运行编排层 |

上游结构的实际依据是 [Git 树](https://github.com/brian-caylor/StoryEngine_Template/tree/ec42f2709391d42968cb9059c107ae64e2fd42b3/story-engine-template) 与 [初始化脚本](https://github.com/brian-caylor/StoryEngine_Template/blob/ec42f2709391d42968cb9059c107ae64e2fd42b3/story-engine-template/scripts/init-project.sh)，不是 README 画出的预期目录树。

## 1. Core Philosophy Parity

| 原原则 | 上游证据 | 本地实现证据与判定 |
|---|---|---|
| Files Are Memory | 主提示词 9–10 行：故事事实和决定必须落到文件 | AGENTS 35–36 行；state-model 将 Canon、批准、反馈、修订策略和历史指定到已有文件。聊天不是第二份状态；通过 |
| Read Before Write | 主提示词 12–16 行；各任务的读取列表 | AGENTS 37–38 行及任务路由；人物先读 cast/world，写章先读近期正文和状态，修订先读目标及反馈。reader-sim 有显式例外；通过 |
| Write → Update → Verify | 主提示词 18–23 行及 draft 五步协议 | AGENTS 39–40、55–59 行；draft Step 4/5；revision 更新三文件并验证。未把“文件写入成功”当作完成；通过 |
| User Is Director | 主提示词 25–26 行、八阶段触发条件 | AGENTS 41–43 行；workflow Gate 与 next；各前置阶段末尾 Review Gate。批准证据写 changelog，状态写 PROJECT；通过 |

依据：[上游 Core Directives](https://github.com/brian-caylor/StoryEngine_Template/blob/ec42f2709391d42968cb9059c107ae64e2fd42b3/story-engine-template/SYSTEM_PROMPT.md#L7)、[本地 AGENTS](../AGENTS.md)、[state-model](state-model.md)。
当前根 PROJECT 的审批项仍未勾选；工程审计没有被当作创作批准。无冲突时保留已明确给出的授权，也没有要求重复确认同一事项。

## 2. Workflow Parity：完整八阶段

| 阶段 | 对照后的必要行为 | 本地入口 | Review Gate / 判定 |
|---|---|---|---|
| Conception | 澄清题材、语气、长度、主题、受众；填写标题、logline、premise、可比作品等原字段 | [conception](../prompts/conception.md) | PROJECT 获用户批准再推进；通过 |
| World Building | 读取 PROJECT，建立 setting、rules、timeline、locations，逐份审阅 | [world-building](../prompts/world-building.md) | 世界文件获批准；通过 |
| Character Architecture | 读取全部 world 与既有 cast；主要人物使用原模板，包含动机、弧线、Voice DNA、关系和秘密 | [character-architecture](../prompts/character-architecture.md) | 人物获批准；通过 |
| Structural Outlining | 读取 world/characters；总体结构、Act 章节分解、完整 Scene Card | [structural-outlining](../prompts/structural-outlining.md) | 结构、章节、场景获批准；通过 |
| Style Calibration | A 文学内省、B 电影式推进、C 混合；三份各 300–500 words；用户选择后形成 guide、motifs、approved sample | [style-calibration](../prompts/style-calibration.md) | 风格获批准且用户要求开始写作；通过 |
| Iterative Drafting | 按章读取、写作、更新、检查、提交正文与节拍/连续性摘要 | [draft-chapter](../prompts/draft-chapter.md) | 按用户授权逐章推进，完整初稿获准进入 Review；通过 |
| Review Cycles | 初稿完成后顺序执行 continuity、voice、reader 三类审阅并提交报告 | [workflow](workflow.md) 74–84 行及三份 Review Prompt | 用户审阅报告/提供修订意见；通过 |
| Revision | 加载反馈和上下文，先写策略，原位编辑、维护状态、检测传播并给出差异摘要 | [revision-pass](../prompts/revision-pass.md) | 扩大范围须获授权，最终修订由用户审阅；通过 |

上游对应 [Phase Protocol](https://github.com/brian-caylor/StoryEngine_Template/blob/ec42f2709391d42968cb9059c107ae64e2fd42b3/story-engine-template/SYSTEM_PROMPT.md#L30)。
上游 README 的“2–3 个样稿”概述与主提示词的明确“三个、各 300–500 words”不一致，本版遵循更具体的主提示词，属于正确消歧。
故事可以选三幕、五幕或其他结构；“故事幕数”没有被误当成“工作流阶段数”。

全部 11 个自然语言命令仍可找到且语义区分明确：`status`、`review [file]`、`revise [chapter]`、`continuity`、`threads`、`wordcount`、`compile`、`audit`、`voice-check`、`reader-sim`、`next`。
其中显示文件不是编辑，显示 tracker 不是自动审计；单项审阅/修订可提前调用，但不自动宣布整阶段完成；next 仅推进已满足 Gate 的下一步。
对照：[上游 Commands](https://github.com/brian-caylor/StoryEngine_Template/blob/ec42f2709391d42968cb9059c107ae64e2fd42b3/story-engine-template/SYSTEM_PROMPT.md#L217)、[本地 Commands](workflow.md#commands)。

## 3. State Parity

| 状态 | 本地文件 | 与上游对照 |
|---|---|---|
| PROJECT | [PROJECT.md](../PROJECT.md) | 原字段、Current Phase、八项 Status 保留；只替换平台名称 |
| World | [setting](../world/setting.md)、[rules](../world/rules.md)、[timeline](../world/timeline.md)、[locations](../world/locations.md) | 原全部章节保留，含硬/软规则、认知与真相差异、历史与故事时间线 |
| Character | [cast](../characters/cast.md)、[角色模板](../characters/_TEMPLATE.md) | 身份、身体、背景、心理、弧线、Voice DNA、关系、关键场景、秘密、备注均保留 |
| Outline | [structure](../outline/structure.md)、[act-1](../outline/act-1.md)、[act-2](../outline/act-2.md)、[act-3](../outline/act-3.md) | 原结构选择和转折字段保留；Act 内容取自上游 init |
| Scene Card | [场景模板](../outline/scenes/_TEMPLATE.md) | 元数据、POV、时地、word target、目的、双钩子、节拍、双重情绪轨迹、依赖、输出、线程、备注均保留 |
| Draft | `drafts/chapter-[N].md` | 逐章正文仍是读者实际获得的信息；报告和非数字 chapter-notes 不进入稿件 |
| Continuity | [tracker](../continuity/tracker.md) | Characters、Objects & Items、Information & Secrets、Relationships、World State 五类与章节来源标记均保留 |
| Threads | [threads](../continuity/threads.md) | Open / Active / Closed，打开、推进、解决章节和期限保留；计划中的输出不算已完成事实 |
| Changelog | [changelog](../continuity/changelog.md) | 原历史文件保留；批准、缺失读取、冲突双方、反馈、策略和验证继续写在这里，不另建账本 |
| Style | [voice-guide](../style/voice-guide.md)、[motifs](../style/motifs.md)、[samples](../style/samples.md) | 原字段均保留；guide 加叙事距离、句长、段落节奏、描写密度、说明策略五项；候选样稿不冒充批准样稿 |
| Review Reports | `continuity/audit-report.md`、`style/consistency-report.md`、`drafts/reader-report.md` | 原路径与完整报告格式保留；审阅建议不自动成为 Canon |

独立机械对照结果：15 个上游状态文件加 LICENSE 共 16 个文件，13 个归一化文本相同、2 个仅 Claude→Codex、1 个为上述 voice-guide 追加字段；所有原章节标题均在。
归一化只处理 CRLF/LF 和文件尾空白。LICENSE、角色模板、Scene Card 另作原始字节 Git blob 校验，三者完全一致。

三份 Review 报告在空模板中不存在是正常的按需产出，不是缺文件。本次没有向活动故事填入虚构的“审阅通过”报告。
示例的状态、场景输出和短样句明确标为未批准的 fixture；根 AGENTS 禁止把示例默认为活动故事。

## 4. Draft Context Contract

对照 [上游 draft-chapter](https://github.com/brian-caylor/StoryEngine_Template/blob/ec42f2709391d42968cb9059c107ae64e2fd42b3/story-engine-template/prompts/draft-chapter.md) 与 [本地 Step 1](../prompts/draft-chapter.md#step-1-pre-draft-reads)：

| Chapter N 写前读取 | 上游 | 本地 |
|---|---|---|
| 前一章 `chapter-[N-1].md` | 明确 | 明确，16 行 |
| 前两章 `chapter-[N-2].md` | 明确 | 明确，17 行 |
| `outline/scenes/[scene-id].md` | 明确 | 明确，18 行；要求本章所有卡 |
| `continuity/tracker.md` | 明确 | 明确，19 行 |
| `continuity/threads.md` | 明确 | 明确，20 行 |
| `style/voice-guide.md` | 明确 | 明确，21 行 |
| `style/samples.md` | 独立写章 Prompt 明确 | 明确，22 行 |
| `characters/[pov-character].md` | 明确 | 明确，23 行；适用 POV 均读取 |
| `PROJECT.md` | 主流程有项目上下文，独立写章表未列 | 本版显式增加，15 行 |

本地还明确真实文件名/补零解析、读取和缺失原因落盘、首两章不存在历史的正常例外，以及缺失必要 Canon/依赖时先解决再写。
这些是原 Read Before Write 的可执行细化，未删减原八项读取。
Step 2 的目的、钩子、情绪、依赖、文风和 POV 欲望/恐惧/隐瞒检查亦全部保留。

## 5. Post Draft Contract

[本地写章 Prompt](../prompts/draft-chapter.md) 36–64 行明确顺序：

```text
Draft
  → UPDATE continuity/tracker.md
  → UPDATE continuity/threads.md
  → UPDATE continuity/changelog.md
  → Verify continuity / voice / beats / hooks / emotional trajectory
  → 记录验证结果并向用户呈现
```

tracker 含事实章节来源，threads 包含 opened/advanced/closed，无变化也要显式记录。
Verify 保留上游独立 Prompt 的全部五项检查，补充历史时点与最新 tracker 状态的区别；未退化成只检查文件存在。
与 [上游 Core 3 / Phase 6](https://github.com/brian-caylor/StoryEngine_Template/blob/ec42f2709391d42968cb9059c107ae64e2fd42b3/story-engine-template/SYSTEM_PROMPT.md#L18) 及写章 Step 4/5 一致。

## 6. Review / Revision Parity

| 审阅 | 保留的输入与分析 | 原输出格式 | 判定 |
|---|---|---|---|
| Continuity Audit | tracker、threads、rules、timeline、cast；逐章七项：事实、时间、知识、物件、世界规则、关系、身体状态。本版补地点及按需人物档案 | Summary；Critical/Moderate/Minor；Location/Problem/Contradicts/Suggested Fix；Thread Health | [本地](../prompts/continuity-check.md) 与 [上游](https://github.com/brian-caylor/StoryEngine_Template/blob/ec42f2709391d42968cb9059c107ae64e2fd42b3/story-engine-template/prompts/continuity-check.md) 一致 |
| Voice Consistency Check | guide + samples；节奏、用词、隐喻、对话、POV 距离、段落、语气七项；角色 Voice DNA 有实际读取指示 | 总评、漂移位置与示例、建议声音、角色独特性 1–10、最强/待修章节 | [本地](../prompts/voice-check.md) 与 [上游](https://github.com/brian-caylor/StoryEngine_Template/blob/ec42f2709391d42968cb9059c107ae64e2fd42b3/story-engine-template/prompts/voice-check.md) 一致 |
| Reader Simulation | 只用顺序正文；清晰度、投入、节奏、人物、张力、可预测性、情感、问题八项；不借后文倒推早期反应 | 第一印象、逐章反应、节奏弧线、人物关心度、掉线、可预测性、情感高低点、大问题、推荐结论 | [本地](../prompts/reader-review.md) 与 [上游](https://github.com/brian-caylor/StoryEngine_Template/blob/ec42f2709391d42968cb9059c107ae64e2fd42b3/story-engine-template/prompts/reader-review.md) 一致 |

独立提取并比较两边的三段 `markdown` 报告模板，归一化后逐段完全相同。
三类操作均有 AGENTS 路由、可读取的输入约定和仓库内输出位置，无待实现函数、外部评审 API 或缺失执行服务。
这是“Codex 可按协议执行”的确认，不是声称已经用真实完整稿运行了三轮生成式评审。

reader-sim 在状态加载前路由，不读取 PROJECT、world、characters、outline、continuity、style 或既有评审作为故事证据；但同一会话早先上下文不能真正清除。本版要求披露这点，不能将其包装成严格盲测。

修订对照 [上游 revision-pass](https://github.com/brian-caylor/StoryEngine_Template/blob/ec42f2709391d42968cb9059c107ae64e2fd42b3/story-engine-template/prompts/revision-pass.md) 与 [本地 revision-pass](../prompts/revision-pass.md)：

- 原六步保留：读目标/参考 → 读反馈 → 策略 → 原位修订 → 状态更新 → 下游传播检查。
- 策略保留“改什么、保留什么、传播效应、连续性影响”；反馈、授权范围和策略先落 changelog，不依赖聊天记忆。
- 不重生成整稿；tracker、threads、changelog 均更新，验证后给差异摘要。
- 修改已确立事实时搜索后续章节并报告影响；未授权的扩展必须询问，已有明确授权不重复索要。
- Canon 冲突先停受影响写作、记双方及来源、请导演裁定，再更新所有获授权的受影响文件；不默选一方。

原应急逻辑也保留：定向读取、tracker 压缩摘要、全稿按 3–5 章分批覆盖；文风漂移时完整重读 samples、写临时 100-word 校准段、删除后续写。见 [本地 Emergency protocols](workflow.md#emergency-protocols) 与 [上游对应段落](https://github.com/brian-caylor/StoryEngine_Template/blob/ec42f2709391d42968cb9059c107ae64e2fd42b3/story-engine-template/SYSTEM_PROMPT.md#L191)。

## 7. Codex Adaptation Quality

AGENTS 实测 **82 行、4,562 bytes**；上游主提示词为 233 行、9,010 bytes。行数不计最后的空行，字节数按文件内容测量。
AGENTS 仅含身份、十条任务导航、四项不变量、必要读写/冲突规则与详细文档链接；没有塞入场景模板、审阅报告格式或八阶段完整长文。不是失控的超长 Prompt。

根 AGENTS 的发现机制与 Codex 官方文档一致：运行时建立项目指令链，项目根到工作目录按层加载，默认合并上限 32 KiB；本版不需要改全局配置或粘贴 Claude 系统提示。[官方 AGENTS.md 文档](https://learn.chatgpt.com/docs/agent-configuration/agents-md)

活动指令中的 Claude Code 身份、CLAUDE.md 和手动粘贴要求已去除。`cat` 示例改成工具无关的 READ 协议，仍要求实际读文件，不是声称实现了 READ 解析器。
已有 Bash 和 CommonJS 工具保留；没有为了“Codex-native”引入 SDK、API Key、模型调用层或自制编排器。

外围适配仍有两个可复现 Minor，详见问题清单。它们不删正文、不改 Canon、不改变审批及读写契约，但使工具输出的边界行为不够一致。

## 8. Overengineering / Scope Discipline

对活动文件、工程代码、依赖和测试逐项搜索，结合命中位置判断，而不是见到关键词即判违规：

| 检查项 | 实际发现 | 结论 |
|---|---|---|
| database / vector database / RAG | 仅禁止说明或延期讨论；无数据库/向量组件、存储服务或依赖 | 无实现 |
| multi-agent framework / complex orchestration engine | 文档排除/延期；无 Agent 调度、任务图执行器或编排依赖 | 无实现 |
| API server / Web UI | 无服务器、前端、端口监听或托管配置；`createServer` 只在负例字符串/检测器内 | 无实现 |
| TIDARC dependencies | 仅排除说明及用来验证拒绝耦合的负例；无导入、子模块或私有路径要求 | 无耦合 |
| Tick / AgentSoul / PerceptionProjection / World Fabric Plane | Tick 无运行实现；其他名称仅检测器或负例字符串 | 无实现 |

负例字符串没有被执行或加载成真实依赖；Deferred Improvements 没有被计成违规。
本次新增 `tests/fixtures.cjs` 只是工具测试的固定输入，既不被创作协议读取，也不为故事运行提供第二份状态。**Scope violations = 0。**

## 9. Independence

- 实际执行 `git clone --no-local --no-hardlinks` 创建完整独立克隆，Git 对象无 alternates，`git fsck --full` 通过；不依赖原仓库对象借用。
- 克隆内无 node_modules、无本地 Prompt 资料包时，`npm run test:contracts` 已 21/21 通过；测试中的另一份脱离源目录的副本也通过。
- 克隆执行 `npm ci --offline --ignore-scripts --no-audit --no-fund` 从现有公共包缓存安装 22 个包，再跑完整测试 47/47 通过。离线成功只证明此次缓存足够，不声称首次安装无需网络。
- 唯一声明的运行 npm 包是 `docx@9.7.1`，测试依赖是 `jszip@3.10.1`；锁文件所有包地址均为公开 npm registry。无 `file:`、`link:`、`workspace:` 私有包、Git 子模块或工作区外导入。
- 全部基线 Git 跟踪文件为普通文件，无符号链接/子模块入口；协议内的故事路径均在项目内。ignored 的旧 `.tmp` 和 Prompt 资料包未作为本次证据来源或运行依赖。
- Codex 写作入口只需要本地文件读写。可选 Node/Bash 工具与模型 API 无关；本次没有另开模型会话去伪造八阶段创作通过。
- 本地没有远程发布地址；本次已验证 Git 可克隆性，但没有创建公开托管、上传仓库或声称已测试一个不存在的公网 clone URL。

因此满足单独复制、Git 克隆和在 Codex 中以本地文件协议运行的结构/工具条件，不依赖任何 TIDARC 文件或外部私有仓库。

## 10. License

[本地 LICENSE](../LICENSE) 与新克隆中的 [上游 LICENSE](https://github.com/brian-caylor/StoryEngine_Template/blob/ec42f2709391d42968cb9059c107ae64e2fd42b3/LICENSE) 原始 Git blob 均为：

```text
026e180e4e141d90ffbceafe8012c69f39852c68
```

MIT 授权文本、保留版权/许可通知要求、免责声明及 `Copyright (c) 2026 brian-caylor` 均未删改。
本地 README 保留上游链接及上游内层 README 中的 OddlyUseful.app 署名，并声明是独立 Port。MIT attribution 检查通过。

## 问题清单与修复闭环

### Critical

未发现。初审 0，复审未关闭 0。

### Major

**MJR-001 — 正常初始化故事后，工程验证因“活动故事必须为空白”的测试假设而失败。已修复。**

- 定位：基线 `tests/helpers.cjs` 30–43 行，`tests/test_scripts.test.cjs` 32/41 行，以及依赖此夹具的空模板 DOCX 测试。
- 复现：在已通过 47 项基线测试的独立 Git 克隆中运行 `bash scripts/init-project.sh "Initialized Audit Fixture"`，然后运行 `node --test tests/test_scripts.test.cjs tests/test_docx.test.cjs`。
- 实际结果：26 项中 23 pass、3 fail。失败分别为特殊字符题名初始化、CRLF 模板初始化、空模板 Word 导出。不是网络、缺依赖或模型生成不稳定。
- 根因：tempProject 把当前 PROJECT 当成未填模板；一个有效的书名会改变三项测试前提。Act 再生成测试还把当前故事的 act-2 内容误作空白模板 oracle。
- 严重度理由：一次受支持的正常初始化便破坏强制工程验证，影响“一克隆一故事”长期维护后的可验证工作流。它不是叙事架构替换，但不能以模板目录的绿色测试掩盖，列为 Major 而非“不影响核心测试”的 Minor。
- 修复：[fixtures.cjs](../tests/fixtures.cjs) 提供固定工具测试数据；[helpers.cjs](../tests/helpers.cjs) 只复制当前工具/可复用模板，不复制活动 Canon；CRLF 与 Act 断言改用固定夹具。没有通过重置真实 PROJECT 使测试通过。
- 回归：[新增测试](../tests/test_scripts.test.cjs) 模拟已初始化、已填写 Act/world/tracker/角色/正文的源目录，确认只复制工具，测试状态仍独立，源文件不变。
- 关闭证据：工作目录完整测试 48/48；将相同测试补丁移植到之前的已初始化克隆，并填写其 Act 2，再跑完整测试亦 48/48、0 skipped。测试前后克隆 PROJECT、Act 2、world/rules、tracker 字节未变。

最终未关闭 Major：0。没有放宽现有断言、跳过失败测试、重新初始化活动故事或改动创作 Gate。

### Minor

**MNR-001 — Target Length 的整数/单位识别不完整。未修复。**

- 定位：[word-count.sh](../scripts/word-count.sh) 48–53 行。
- 独立复现：18-word 的受控正文，目标 `1,2 words` 被解释为 12，显示 `150% (18 / 12)`；`5 wordsmiths` 被解释为 5，显示 `360% (18 / 5)`。
- 原因：数字模式允许任意逗号分组，`words?` 没有完整单位边界。现有非法目标测试未覆盖这两类。
- 影响：仅可选进度条的目标/比例错误；正文的 `wc -w` 总数仍为 18，故事状态不被修改，核心写作/审阅/修订测试不受影响。
- 建议：严格验证整个数值 token 的千分位格式及 word/words 单位边界，并补负例；不必引入中文 tokenizer 或新计数架构。

**MNR-002 — Markdown 与 DOCX 的书名取值规则不一致。未修复。**

- 定位：[compile-manuscript.sh](../scripts/compile-manuscript.sh) 55 行、[build-docx.js](../build-docx.js) 115–138 行。
- 独立复现：PROJECT 首行保留 `Old Header`，Working Title 改成 `New Working Title`；Markdown 输出标题为 `Old Header`，DOCX 则正确使用 `New Working Title`。
- 原因：Markdown 沿用上游首行读取；本版 Word 导出已改为优先 Working Title，两种入口未统一。
- 影响：当标题字段与首行不同步时，导出元数据不一致；章节正文、顺序和 Canon 均未改变。普通初始化同时填写两处时不触发。
- 建议：让 Markdown 也优先读取 Working Title、保留首行回退，并增加双导出一致性测试；无需改故事状态模型。

### Intentional Acceptable Difference

1. **主提示拆分和入口替换。** SYSTEM_PROMPT → 简短 AGENTS + docs + 按任务读取的 Prompt；Claude → Codex；原 cat → READ 指令。文件操作仍由宿主工具完成，不增加解析器。
2. **仓库根提升与空目录持久化。** 去掉一层模板包装目录，提交原 init 生成的 Act 模板与 drafts 占位文件；原文件职责不变。
3. **文件记忆的执行细化。** 增加 PROJECT 写前读取、实际读入/缺失日志、审批/策略/验证落盘、历史状态消歧、全部适用场景与 POV；没有新增状态后端。
4. **文风字段显式化。** 保留原 voice-guide 字段并细化叙事距离等五项，不替换原三候选/用户选择/批准样稿流程。
5. **修复上游工具的明确错接。** init 占位符与 PROJECT 不匹配、word-count 查不存在的 Estimated Word Count、Word 导出指向不存在的 second-draft，均在源码中直接确认；纠正它们不构成叙事重设计。
6. **导出与备份安全边界。** 数字章节过滤、禁止编译覆盖 Canon/输入、临时输出替换、快照重名/缺源预检，不改变正常输入下的正文与三个状态文件职责。
7. **轻量工程验证与示例。** npm 锁、Node 内置测试、固定测试夹具、未批准的 minimal-story 是工程辅助；无运行调度或自动创作扩权。
8. **明确平台/继承能力边界。** Bash/GNU 工具、`wc -w` 空白分词、原轻量 Markdown→DOCX、同会话 reader-sim 无法清空上下文均明确披露；没有新增强行“解决”这些问题的 RAG、Agent 或排版引擎。

这些差异均已按实际文件/代码检查；本次不依据旧文档“已获批准”的自述去推断任何历史用户授权。

## 验证记录与边界

环境：Windows + Git Bash 5.3.9，Node.js 24.16.0，npm 11.17.0。新增测试不依赖新包。

| 验证 | 本次实际结果 |
|---|---|
| 上游版本/完整目录 | 新克隆 HEAD 与固定基准一致；29 文件、51,794 字节 |
| 源清单独立复核 | 29/29 Git blob 对上；不是只数本地表格行数 |
| 状态/许可内容 | 16 文件对照：13 归一化相同、2 平台名称替换、1 voice-guide 追加；无原字段遗漏 |
| 原报告/Act 内容 | 三份报告模板完全保留；三份 Act 与上游 heredoc 实例化内容一致 |
| 基线工作目录 | npm test：47 passed、0 failed、0 skipped |
| 无 npm 包的新 Git 克隆 | test:contracts：21 passed、0 failed、0 skipped |
| 独立克隆完整测试 | 缓存安装 22 包后：47 passed、0 failed、0 skipped；无对象 alternates，fsck 通过 |
| 正常初始化后的额外探针 | 修复前：26 项工具测试中 3 failed；MJR-001 的独立复现 |
| 修复后工作目录 | npm test：48 passed、0 failed、0 skipped |
| 修复后的已初始化/已填写 Act 克隆 | 完整 48 passed、0 failed、0 skipped；测试未改其已填 Canon |
| 上游/本版 Markdown 对照 | 同一受控输入，合并内容相同；两边 wordcount 均为 18 |
| 上游/本版快照对照 | 各三文件，均与各自输入逐字一致 |
| 上游/本版 Word 对照 | 同一 docx 9.7.1、同一可见题名/正文，document.xml、styles.xml、numbering.xml、settings.xml 完全一致 |
| 语法/差异 | 四个 Bash 文件逐个 bash -n；导出与修改的测试 JavaScript node --check；git diff --check 通过 |
| 活动故事与运行协议保护 | 对 AGENTS、PROJECT、故事目录、prompts、scripts、build-docx、依赖和 LICENSE 的定向 git diff 无变化 |

工具对照在临时副本中将上游脚本行尾归一化为 LF；上游 Word 的受控正文放在其原来读取的 second-draft，本版放在 drafts，避免把已明确修复的输入路径问题误当作排版变化。
可见题名也保持相同，以隔离标题解析差异。DOCX 比较是结构/内容校验，**本次未做页面渲染或视觉 QA**。

复跑当前工程验证：

```bash
npm ci
npm test
npm run test:contracts
```

静态契约测试能发现缺少的路径、字段或部分顺序错误，不能证明模型每次真实读取、正确审美判断、遵守全部 Gate 或完整理解上下文。
三类审阅在本次按协议/输入输出/可达性审计，没有借用临时工具文本冒充真实长篇评审。
初始化后的回归只验证工程可复测性，也没有冒充完成八阶段创作。

本次仓库写入范围仅为本报告、固定测试夹具、夹具帮助函数、相关回归/断言及 parity-matrix 的测试行为说明。
未生成活动章节、批准创作阶段、改变故事 Canon、安装外部服务或引入下一版架构。
