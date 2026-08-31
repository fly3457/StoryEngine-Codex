# StoryEngine-Codex v1 交付报告

实施日期：2026-09-01。上游基准为
[`ec42f2709391d42968cb9059c107ae64e2fd42b3`](https://github.com/brian-caylor/StoryEngine_Template/tree/ec42f2709391d42968cb9059c107ae64e2fd42b3)。
初始实现提交：`581f02444ac615a5cd8d9408d3bb536911c1d99e`。
本报告记录工程交付与验证结果，不把契约测试通过当作长篇创作效果已经得到验证。

## Implementation Summary

- 在指定目录直接建立独立 Git 仓库，分支为 main；没有额外嵌套目录、远程仓库或推送。
- 先完成全部 29 个上游文件的审计、SHA 清单和迁移映射，再创建实现。
- 交付简短 AGENTS、三份核心协议文档、十份 Prompt、全部状态模板、三个 Act 模板和空 drafts。
- 保留八阶段、四个核心原则、Review Gate、11 个自然语言命令、三类审阅和原位修订流程。
- 保留 Bash / CommonJS 工具；增加固定 docx 9.7.1 的 npm 清单与锁文件、Node 内置测试。
- 提供一个地点、两名角色、物件与秘密、一个线程和一个 Scene Card 的最小状态示例；不提交小说章节。
- README 与迁移说明使用中文，AGENTS、核心协议、Prompt 与模板字段使用英文。
- LICENSE 原文和 brian-caylor 版权保留；README 保留上游链接与 OddlyUseful.app 署名。
- 现有 Prompt 资料包及 ZIP 保留原位、排除提交和运行依赖；未执行其中的独立评分审计或万字小说任务。

核心写作直接在 Codex 中运行，不需要 OpenAI API Key，也不依赖 npm 安装。
项目没有引入其他工作区项目、数据库、RAG、多 Agent、Web UI、API Server 或 TIDARC 依赖。

## Original → Codex Mapping

| 原版 | Codex 版本 | 迁移要点 |
|---|---|---|
| SYSTEM_PROMPT 核心指令 | AGENTS + architecture / workflow / state-model | 导航与详细协议分层，核心语义保留 |
| SYSTEM_PROMPT 前五阶段 | conception 至 style-calibration 五份 Prompt | 从原文提取，不新增阶段 |
| 原五份写作、审阅、修订 Prompt | 同名 Prompt | 保留步骤、检查项、严重度与报告格式，适配文件读取 |
| PROJECT、world、characters、outline、continuity、style | 仓库根目录同名状态文件 | 保留 Markdown 字段与章节来源标签 |
| init 中的 Act 模板 | outline/act-1.md 至 act-3.md | 将原初始化内容显式纳入模板仓库 |
| 四个 Bash 脚本、build-docx.js | 同名入口 | 保留技术栈和用途，执行已批准的小修复 |
| 两份 README、LICENSE | 中文 README、原文 LICENSE | 合并操作说明，保留来源与作者 attribution |

逐文件 SHA、职责及目标位置见 [source inventory](source-inventory.md)。
覆盖全部源文件、八阶段、命令与应急协议的五列映射见 [parity matrix](parity-matrix.md)。

## Intentional Differences

平台适配：由手动加载 SYSTEM_PROMPT 改为根 AGENTS 导航；详细内容按任务读取。
reader-sim 在读取故事状态之前路由，只以正文作为故事输入，并披露已有会话上下文限制。

用户要求的补充：把 PROJECT 纳入写前读取，记录缺失项；将审批、冲突、反馈、修订策略和
验证结果写入现有 changelog；补齐文风字段；增加目录占位、示例、清单、锁文件和测试。
工程实施授权不批准任何后续创作阶段，也没有为示例伪造用户审批。

已批准的工具修复：初始化匹配真实标题占位符、转义特殊字符且不覆盖已填写内容；
字数目标读取真实 Target Length，跳过无效值并防止进度条溢出；编译只收数字章节，
排除报告、保护输入和 Canon；快照预检缺失文件与同分钟重名；DOCX 改读 drafts，
正确提取题名并在无有效英文文件名时回退 manuscript.docx。

没有增加命令解析器或创作运行框架。完整差异与不变设计见 [port notes](codex-port-notes.md)。

## Parity Gaps

- 不同模型不保证生成相同正文；文件协议不能强制证明每次模型执行都遵守读取、审批和更新要求。
- 同一会话已有的作者上下文无法真正清除，reader-sim 不能被称为严格盲测。
- 保留 wc -w 空白分词语义，不提供中文字数统计；DOCX 保留原轻量 Markdown 解析器。
- DOCX 已验证内容和 OOXML 排版属性，但本机缺少 LibreOffice/soffice，页面渲染未完成；不宣称通过视觉 QA。
- 本次未运行完整长篇创作、万字小说实验或独立评分审计，也未验证长篇文风稳定性。
- 实际工具验收平台为 Windows + Git Bash；没有宣称在原生 BSD 工具或所有操作系统上完成实测。

## Tests

验收环境：Windows、Git Bash 5.3.9、Node.js 24.16.0、npm 11.17.0。

| 验证 | 结果 |
|---|---|
| 工作仓库 npm test | 47 passed，0 failed，0 skipped |
| 干净 Git 克隆：使用已有 npm 缓存执行 npm ci --offline --ignore-scripts --no-audit --no-fund，然后 npm test | 安装成功；47 passed，0 failed，0 skipped |
| 脱离原仓库的完整临时副本，无 node_modules | 契约测试通过，未依赖源工作区或本地资料包 |
| Git 克隆独立性 | 使用 --no-local --no-hardlinks；无 Git objects alternates；git fsck --full 通过 |
| Bash / JavaScript 语法 | 四个脚本 bash -n 与 build-docx.js 的 node --check 通过 |
| 源文件文本对照 | 15 份保留或仅替换平台名称的文件对照通过；比较时统一换行与文件尾空白 |
| 原始字节对照 | LICENSE、角色模板、Scene Card 模板的 Git blob SHA 与上游一致 |
| DOCX 原版对照 | 相同受控输入及 docx 9.7.1 下，document.xml、styles.xml、numbering.xml、settings.xml 完全一致 |
| 本地资料保护 | 三份 Prompt 文件与原 ZIP 对应条目一致，资料包与 ZIP 均未纳入提交 |
| 行末空白 | 新增/修改文件检查通过；原角色模板及示例副本各保留两处上游行末空格，已明确记录 |

47 项测试覆盖目录、十份 Prompt、内部链接、八阶段顺序与 Gate、必读文件、写后更新顺序、
三类报告、Canon 冲突、修订传播授权和独立性。部分契约检查还用刻意损坏的文本验证能否发现遗漏。

工具测试在临时故事中实际运行：中文和特殊字符题名、重复初始化、CRLF、章节排序、
报告排除、空稿、目标解析、输出覆盖保护、快照重名与缺文件预检，以及含空格和中文的路径。
真实生成 DOCX 并检查题名、内容顺序、6×9 页面、Georgia、缩进、斜体和场景分隔。
所有测试正文仅存在于临时夹具中，不写入活动故事。

另外调用 documents 技能的 render_docx.py 尝试页面检查，因找不到 soffice 启动失败。
按该技能允许的缺失依赖回退路径保留结构检查结果；没有页面 PNG 或视觉验收结论。

完整套件可通过 npm ci 后运行 npm test 复验；仅结构与协议检查可直接运行 npm run test:contracts。
离线安装成功依赖本次机器已有的 npm 缓存，不代表首次安装不需要下载依赖。

## Deferred Improvements

anti-AI prose evaluator、advanced retrieval、automated benchmark、multi-agent reviews、
structured state DB、world simulation integration、中文计数策略和完整 Markdown 导出均未实现。
它们不属于 v1 的运行依赖；任何后续方向需要单独确定范围。TIDARC 集成不属于本项目。

## Recommended Next Experiment

另行授权后，在独立故事副本中做一次受控短篇实验，保留真实的阶段审批，逐章检查实际读取、
tracker / threads / changelog 的更新以及后续影响；完成三份 Review 和一次限定范围的修订。
先评价文件记忆和修订传播是否可靠，再决定是否进行万字级验证。
这只是建议，本次没有启动实验、生成完整章节或实施第二阶段功能。
