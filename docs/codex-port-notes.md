# Codex Port Notes

基准与逐文件证据见 [source inventory](source-inventory.md)，全部行为映射见
[parity matrix](parity-matrix.md)。本次是高保真迁移，不是新的叙事系统。

## What changed — Claude → Codex

- SYSTEM_PROMPT 的导航和核心不变量进入简短 AGENTS；详细协议进入 architecture、workflow、state-model；前五阶段提取为独立 Prompt。
- 活动指令中的 Claude Code 身份和手动粘贴系统提示步骤改为 Codex 的根目录 AGENTS 工作流。
- 原 Prompt 的 cat 示例改为 READ 文件协议，不假定某个模型专有工具或实现新的命令解析器。
- 先判断 reader-sim，再决定读取范围，避免常规项目初始化读取主动泄漏隐藏故事状态。
- 明确已有用户授权仍然有效，不在同一范围重复请求；不从工程实施或测试推断创作审批。

## 用户要求的交付补充

- 模板从上游嵌套目录提升为独立仓库根目录；三个 Act 模板取自原初始化脚本，drafts 使用占位文件。
- PROJECT 加入逐章必读清单；保留原 Prompt 已有的前两章、样稿、场景、POV、tracker 和 threads。
- 把实际读取、缺失项、用户反馈、Gate、修订策略、冲突来源和验证结果记入现有 changelog，不增加故事数据库或另一份状态账本。
- 在原 Voice Guide 字段上补齐叙事距离、句长倾向、段落节奏、描写密度和说明策略；原 Tense 和禁止项保留。
- 增加中文使用/迁移说明、源清单、parity matrix、轻量测试、最小状态示例及可复现依赖锁。
- 统一文本为 LF，适合 Bash 和 Git；“Preserved”指内容/语义保留，原本 CRLF 文件的原始 blob SHA 仍在源清单中，不伪称字节相同。
- 角色模板保留上游两个空字段后的行末空格（示例中的副本也相同），以维持原始字节；不为消除格式警告修改模板。其他新增/修改文件单独检查行末空白。

## 已批准的可用性修复

| 工具 | 原问题 | 本版处理 |
|---|---|---|
| init-project | 标题占位符不匹配；替换值可能含 sed 元字符 | 匹配原真实占位符并转义，拒绝多行题名，只替换尚未填写的标题；补缺失目录，不覆盖已有 Act 或 Canon |
| init-project | find/head 在严格管道检查下可能提前中断 | 列表使用完整消费输入的 sed，只显示前 30 行；不改变创作数据 |
| word-count | 查找不存在的 Estimated Word Count 字段 | 从真实 Target Length 中提取已填写的 words 目标，跳过占位符、零值、负值、非法/过大值 |
| word-count | 超目标进度条宽度可能为负，tr 不能可靠生成多字节块字符 | 保留实际百分比，条宽最多 30 格，以 Bash 字符串替换生成完整 UTF-8 字符 |
| compile / word-count | 原 chapter-* 通配符可纳入 chapter-notes 等非正文 | 仅接受数字章节，与原 DOCX 选择一致；命名与顺序协议不变 |
| compile | 可覆盖输入或 Canon；直接写入会暴露部分结果 | 输出限定当前故事的非保护位置，拒绝目录/符号链接/受保护硬链接；先写临时稿再替换输出 |
| snapshot | 同分钟覆盖备份，缺失源文件仍可能显示成功 | 预检三个输入和输出，缺失/同名即报错；保留原分钟文件名及三份内容 |
| build-docx | 读取不存在的 second-draft，书名包含 PROJECT 前缀 | 改为 drafts；优先 Working Title，回退去前缀的标题；空 slug 使用 manuscript.docx |

以上不构成新增叙事架构。四个工具保留原 Bash 入口、参数和主体操作；DOCX 保留
CommonJS、docx 及原解析/排版。Node 测试与 npm 锁是开发工具，不是模型调用依赖。

## What intentionally did NOT change

- 四个核心原则、原八阶段顺序、用户作为导演、阶段 Review Gate。
- 世界四文件、角色模板全部字段、结构模板、Scene Card 的全部输入/输出/线程信息。
- 五类连续性事实、章节来源标签、Open / Active / Closed 线程。
- 逐章先读前两章和相关状态，写完更新三个连续性文件并验证。
- 三份 300–500 词文风样稿、批准样稿、母题；漂移后的临时 100 词校准及删除步骤。
- 三类 Review 的输出路径、严重度/评分和报告模板；3–5 章分批审阅。
- 原位修订、保留有效段落、后续章节传播检查与范围授权。
- 全部 11 个自然语言命令；没有 CLI parser、服务器或后台执行框架。
- wc -w 的英文空白分词语义、按一致补零文件名排序、空稿编译的标题页行为。
- DOCX 的 6×9 英寸、Georgia 11pt 正文、首段不缩进、后续段 0.5 英寸缩进、斜体与场景分隔。
- MIT 许可证及原作者版权/署名。

## Parity Gaps / 验证限制

1. 不同模型不会生成相同正文。本版针对行为协议和文件状态，而非逐字生成结果。
2. 同一 Codex 会话无法真正清除作者上下文。reader-sim 只限制主动读取和报告证据；不能宣称严格独立盲测。
3. 指令和静态契约测试不能强制或证明模型每次读取/审批都正确。真实执行仍需查看文件与读写记录。
4. 没有新增自定义 CLI parser；自然语言命令依赖 Codex 正确路由。工具只执行明确的文件操作。
5. wc -w 不统计中文字数；docx 是原轻量解析器，不完整支持任意 Markdown。中文实际字体会取决于阅读器的字体回退。
6. 本次不执行本地第二项独立评分审计或第三项万字叙事测试；最小示例不冒充完整创作验证。

## DOCX 验证说明

真实导出测试检查 ZIP/OOXML 内容、章节顺序、标题、6×9 页面、Georgia、缩进、斜体及场景分隔。
另以同一组受控标题/章节和同一 docx 9.7.1，分别运行上游原脚本与本版；document.xml、
styles.xml、numbering.xml、settings.xml 四个部件完全一致，验证排版主体没有被重写。
已按 documents 技能调用 render_docx.py，但本机没有 LibreOffice/soffice，渲染启动失败。
按该技能允许的缺失依赖回退路径完成结构检查；未生成页面 PNG，不能宣称通过视觉 QA。

## Deferred Improvements

以下仅列为延期讨论，不实现、不安装、不作为本版依赖：anti-AI prose evaluator、advanced
retrieval、automated benchmark、multi-agent reviews、structured state DB、world simulation
integration、中文计数策略、完整 Markdown 导出。TIDARC 集成及其专有架构不属于本项目。

## Recommended Next Experiment

下一次另开明确实验，在独立故事副本中按八阶段完成一个受控短篇；逐章保留实际读入记录、
状态差异、三份 Review 和一次修订结果，先评价文件记忆和传播检查是否有效。不要在本版
交付过程中提前生成小说、跳过真实用户 Gate 或反向改造框架使实验通过。
