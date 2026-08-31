# 上游源文件清单

本项目以 [StoryEngine_Template](https://github.com/brian-caylor/StoryEngine_Template) 为唯一参考实现。

- 审计日期：2026-09-01。
- 固定提交：`ec42f2709391d42968cb9059c107ae64e2fd42b3`（2026-04-13）。
- 完整递归目录树：29 个文件，51,794 字节；全部内容已读取，不仅是 README。
- 下表 SHA 为上游 Git blob SHA-1，包含原始换行，不是迁移后文件的哈希。
- 未读取或引入其他工作区项目。原始 Prompt 资料包是本地任务材料，不属于上游或运行依赖。

## 文件清单与迁移位置

| Source file | Git blob SHA-1 | 职责 | Codex 目标 |
|---|---|---|---|
| [LICENSE](https://github.com/brian-caylor/StoryEngine_Template/blob/ec42f2709391d42968cb9059c107ae64e2fd42b3/LICENSE) | `026e180e4e141d90ffbceafe8012c69f39852c68` | 许可证 | `LICENSE` |
| [README.md](https://github.com/brian-caylor/StoryEngine_Template/blob/ec42f2709391d42968cb9059c107ae64e2fd42b3/README.md) | `d747b86ec4302122c9437ea9f83665b1cb1d259e` | 仓库介绍与快速开始 | `README.md` |
| [story-engine-template/PROJECT.md](https://github.com/brian-caylor/StoryEngine_Template/blob/ec42f2709391d42968cb9059c107ae64e2fd42b3/story-engine-template/PROJECT.md) | `59bae9355bac06c70f13df1d2b0726839fcfa0b4` | 小说元数据与阶段状态 | `PROJECT.md` |
| [story-engine-template/README.md](https://github.com/brian-caylor/StoryEngine_Template/blob/ec42f2709391d42968cb9059c107ae64e2fd42b3/story-engine-template/README.md) | `d385f28d6a76a21c7785b80beb514afc1b4acab8` | 完整使用指南与命令 | `README.md` |
| [story-engine-template/SYSTEM_PROMPT.md](https://github.com/brian-caylor/StoryEngine_Template/blob/ec42f2709391d42968cb9059c107ae64e2fd42b3/story-engine-template/SYSTEM_PROMPT.md) | `f9e7dbefe008a7e84328d4d70bbf4c273aac9487` | 核心协议、八阶段、应急协议与命令 | `AGENTS.md`、`docs/architecture.md`、`docs/workflow.md`、`docs/state-model.md`、`prompts/` |
| [story-engine-template/build-docx.js](https://github.com/brian-caylor/StoryEngine_Template/blob/ec42f2709391d42968cb9059c107ae64e2fd42b3/story-engine-template/build-docx.js) | `51e2951683253380e9d3f044ecba6213292bca58` | Word 稿件导出 | `build-docx.js` |
| [story-engine-template/characters/_TEMPLATE.md](https://github.com/brian-caylor/StoryEngine_Template/blob/ec42f2709391d42968cb9059c107ae64e2fd42b3/story-engine-template/characters/_TEMPLATE.md) | `e02c46a8aa4f1f7cd76fdf50d4085b716b31c7c0` | 角色档案模板 | `characters/_TEMPLATE.md` |
| [story-engine-template/characters/cast.md](https://github.com/brian-caylor/StoryEngine_Template/blob/ec42f2709391d42968cb9059c107ae64e2fd42b3/story-engine-template/characters/cast.md) | `06399781efa971627f975e8d82ef751c1e8aca58` | 角色名单与关系 | `characters/cast.md` |
| [story-engine-template/continuity/changelog.md](https://github.com/brian-caylor/StoryEngine_Template/blob/ec42f2709391d42968cb9059c107ae64e2fd42b3/story-engine-template/continuity/changelog.md) | `608dae7c31f75dfadcebad9f7a4fc3aa15a0f9e3` | 逐章及修订日志 | `continuity/changelog.md` |
| [story-engine-template/continuity/threads.md](https://github.com/brian-caylor/StoryEngine_Template/blob/ec42f2709391d42968cb9059c107ae64e2fd42b3/story-engine-template/continuity/threads.md) | `88e819169d69b8f92c8f3a4d77fdae8d278aa32a` | 叙事承诺与线索 | `continuity/threads.md` |
| [story-engine-template/continuity/tracker.md](https://github.com/brian-caylor/StoryEngine_Template/blob/ec42f2709391d42968cb9059c107ae64e2fd42b3/story-engine-template/continuity/tracker.md) | `7bdb7fba742b6e4b92a0176ae7905e147b82fc6d` | 已经确立的事实 | `continuity/tracker.md` |
| [story-engine-template/outline/scenes/_TEMPLATE.md](https://github.com/brian-caylor/StoryEngine_Template/blob/ec42f2709391d42968cb9059c107ae64e2fd42b3/story-engine-template/outline/scenes/_TEMPLATE.md) | `918dfd5d7be0ee117f210225fa870ead6e453e66` | 场景卡模板 | `outline/scenes/_TEMPLATE.md` |
| [story-engine-template/outline/structure.md](https://github.com/brian-caylor/StoryEngine_Template/blob/ec42f2709391d42968cb9059c107ae64e2fd42b3/story-engine-template/outline/structure.md) | `6364ba75c217c2601ababfe2fc3c6654bb941d60` | 故事结构与转折 | `outline/structure.md` |
| [story-engine-template/prompts/continuity-check.md](https://github.com/brian-caylor/StoryEngine_Template/blob/ec42f2709391d42968cb9059c107ae64e2fd42b3/story-engine-template/prompts/continuity-check.md) | `df7f13170b8dcbbbc6390080dd2b33447edd356b` | 连续性审计与报告 | `prompts/continuity-check.md` |
| [story-engine-template/prompts/draft-chapter.md](https://github.com/brian-caylor/StoryEngine_Template/blob/ec42f2709391d42968cb9059c107ae64e2fd42b3/story-engine-template/prompts/draft-chapter.md) | `7da990f6d6fc7e5008aa3ea533891077946475f4` | 逐章写作协议 | `prompts/draft-chapter.md` |
| [story-engine-template/prompts/reader-review.md](https://github.com/brian-caylor/StoryEngine_Template/blob/ec42f2709391d42968cb9059c107ae64e2fd42b3/story-engine-template/prompts/reader-review.md) | `cffcd94eedb2097b5164db8414b595b0b2ff5d65` | 首次读者模拟 | `prompts/reader-review.md` |
| [story-engine-template/prompts/revision-pass.md](https://github.com/brian-caylor/StoryEngine_Template/blob/ec42f2709391d42968cb9059c107ae64e2fd42b3/story-engine-template/prompts/revision-pass.md) | `a616657437bf877a98dddfc5ec6412b750694e34` | 原位修订与传播检查 | `prompts/revision-pass.md` |
| [story-engine-template/prompts/voice-check.md](https://github.com/brian-caylor/StoryEngine_Template/blob/ec42f2709391d42968cb9059c107ae64e2fd42b3/story-engine-template/prompts/voice-check.md) | `8d710831b14aaf0eb6b85af9685032e6b7cda3e9` | 文风一致性审阅 | `prompts/voice-check.md` |
| [story-engine-template/scripts/compile-manuscript.sh](https://github.com/brian-caylor/StoryEngine_Template/blob/ec42f2709391d42968cb9059c107ae64e2fd42b3/story-engine-template/scripts/compile-manuscript.sh) | `9958795fb4f4cdd4c6ef2e8382533edae008b84a` | 合并 Markdown 稿件 | `scripts/compile-manuscript.sh` |
| [story-engine-template/scripts/continuity-snapshot.sh](https://github.com/brian-caylor/StoryEngine_Template/blob/ec42f2709391d42968cb9059c107ae64e2fd42b3/story-engine-template/scripts/continuity-snapshot.sh) | `5dca129c71ea7392b400ce9a0b5ae31f2a2f85bb` | 连续性备份 | `scripts/continuity-snapshot.sh` |
| [story-engine-template/scripts/init-project.sh](https://github.com/brian-caylor/StoryEngine_Template/blob/ec42f2709391d42968cb9059c107ae64e2fd42b3/story-engine-template/scripts/init-project.sh) | `ea2f37400a73efea2fd3fceb5ae212534a1f471b` | 初始化与幕模板 | `scripts/init-project.sh`、`outline/act-1.md`、`outline/act-2.md`、`outline/act-3.md` |
| [story-engine-template/scripts/word-count.sh](https://github.com/brian-caylor/StoryEngine_Template/blob/ec42f2709391d42968cb9059c107ae64e2fd42b3/story-engine-template/scripts/word-count.sh) | `b3532993faf60c1e2a642a5c9f9edee9ab60e088` | 逐章字数与进度 | `scripts/word-count.sh` |
| [story-engine-template/style/motifs.md](https://github.com/brian-caylor/StoryEngine_Template/blob/ec42f2709391d42968cb9059c107ae64e2fd42b3/story-engine-template/style/motifs.md) | `d6af50ef2c423c96ff144cf8e49c7a22ee88a438` | 母题与象征 | `style/motifs.md` |
| [story-engine-template/style/samples.md](https://github.com/brian-caylor/StoryEngine_Template/blob/ec42f2709391d42968cb9059c107ae64e2fd42b3/story-engine-template/style/samples.md) | `32168c8816395dbcadff40b41a5dea87bb10719b` | 批准的声音样稿 | `style/samples.md` |
| [story-engine-template/style/voice-guide.md](https://github.com/brian-caylor/StoryEngine_Template/blob/ec42f2709391d42968cb9059c107ae64e2fd42b3/story-engine-template/style/voice-guide.md) | `34b97ba69b2e3fb5fc4b4922edf55e98a1316289` | 文风定义 | `style/voice-guide.md` |
| [story-engine-template/world/locations.md](https://github.com/brian-caylor/StoryEngine_Template/blob/ec42f2709391d42968cb9059c107ae64e2fd42b3/story-engine-template/world/locations.md) | `9b288e24ba22456625f8f730b362e9acae6680d1` | 地点感官信息 | `world/locations.md` |
| [story-engine-template/world/rules.md](https://github.com/brian-caylor/StoryEngine_Template/blob/ec42f2709391d42968cb9059c107ae64e2fd42b3/story-engine-template/world/rules.md) | `09614526633e969c1185cb5172c804e3f2f60a73` | 世界硬/软规则与认知差异 | `world/rules.md` |
| [story-engine-template/world/setting.md](https://github.com/brian-caylor/StoryEngine_Template/blob/ec42f2709391d42968cb9059c107ae64e2fd42b3/story-engine-template/world/setting.md) | `a914e0bf37920746e0e1ea54a9a7b68c76518298` | 时空、气氛与社会背景 | `world/setting.md` |
| [story-engine-template/world/timeline.md](https://github.com/brian-caylor/StoryEngine_Template/blob/ec42f2709391d42968cb9059c107ae64e2fd42b3/story-engine-template/world/timeline.md) | `43d37768e6faf334c14444c30cc27be95d59f382` | 背景与故事时间线 | `world/timeline.md` |

## 审计发现

1. 上游只有五份独立 Prompt；前五阶段在 SYSTEM_PROMPT 中。迁移将其提取为五份文件，不能视为新阶段。
2. 上游 Git 中没有 drafts 目录和三个 Act 文件；Act 模板实际由 init-project.sh 的 heredoc 生成。本版提交这些空白模板及 drafts 占位文件。
3. init-project.sh 替换 `[Working Title]`，而 PROJECT 使用 `[Your Story Title]` 和 `[Title]`，所以原脚本不能正确设置标题。
4. word-count.sh 查找 `Estimated Word Count`，而 PROJECT 的实际字段为 `Target Length`。
5. build-docx.js 读取不存在的 `second-draft/`；正文工作流和其他工具使用 `drafts/`。其标题读取还会把 `PROJECT —` 当作书名。
6. compile-manuscript.sh 允许直接覆盖输入章节或 Canon；快照脚本在同一分钟运行会覆盖同名备份。
7. 原命令和工具之间不存在 Claude SDK 或 API 耦合。保留 Bash、CommonJS 和 docx，不统一重写技术栈。

差异分类和行为映射见 [parity matrix](parity-matrix.md)；修复边界见 [port notes](codex-port-notes.md)。
