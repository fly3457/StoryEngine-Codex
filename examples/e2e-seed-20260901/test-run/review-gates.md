# Automated Review Gates — Seed E2E 20260901

> 用户明确选择“双层完整验证”，允许本 fixture 自动记录并通过正常 Review Gate；授权只适用于 `examples/e2e-seed-20260901/`。下列记录不虚构逐条人工反馈，也不改变 StoryEngine 的一般流程。

## Gate 1 — Conception
- **Artifacts:** `PROJECT.md`.
- **Checks:** Seed 标题/前提/题材/主题/基调已保留；补齐 8 章、12,000–15,000 汉字、成年读者与比较参照。
- **Default:** 《灰港》；现实主义政治悬疑；四人轮转；代价式多方改革。
- **Result:** PASS；进入 Phase 2。

## Gate 2 — World Building
- **Artifacts:** 四份 `world/` 文件。
- **Checks:** 7 节点、5 路线、4 势力、精确开篇资源、污染真值、严冬时点和硬规则均已映射；感官与社会结构可直接写作。
- **Default:** 无魔法的近现代工业世界；抽象数值只在 Canon 记录，正文转译为可感知后果。
- **Result:** PASS；进入 Phase 3。

## Gate 3 — Character Architecture
- **Artifacts:** cast 与四份主角档案。
- **Checks:** Seed 内核、传记、记忆、初始知识与关系未串位；年龄、外貌、弧线、Voice DNA 和关键场景齐全。
- **Default:** 林栖/徐澄/周砺/陈默潮各两章限知 POV，配四名功能性支持角色。
- **Result:** PASS；进入 Phase 4。

## Gate 4 — Structural Outlining
- **Artifacts:** structure、三幕文件、8 张 Scene Card。
- **Checks:** 八章覆盖矿脉、污染、救济款、航路和改革；每章含 purpose、hooks、beats、情绪、依赖、输出和线程；计划输出未冒充事实。
- **Default:** Act 1 两章、Act 2 四章、Act 3 两章；稳定改革终局保留权力、收入、信誉与航路代价。
- **Result:** PASS；进入 Phase 5。

## Gate 5 — Style Calibration
- **Artifacts:** 三种候选的比较记录、最终 voice guide、motifs、approved sample。
- **Checks:** Option C 能同时保持限知内心、动作清晰、角色职业注意差异和长文本可持续性。
- **Default:** 中近距离第三人称限知、中短句、稀疏工业/医疗/潮汐隐喻；删除未选候选正文。
- **Result:** PASS；进入 Phase 6，并获准连续逐章起草但每章仍完整执行 Read → Draft → Update → Verify。

## Gate 6 — Iterative Drafting
- **Artifacts:** `drafts/chapter-01.md` 至 `drafts/chapter-08.md`、tracker、threads、changelog 与逐章读取记录。
- **Checks:** 八章固定 POV 顺序完成；每章均在目标汉字区间；全稿 13,952 汉字；Day 0–21 时间、资源、伤势、物件、知识边界、Scene Card beats/hooks 和十条线程已逐章验证。
- **Default:** 按用户给定的八章事件顺序连续起草；每章仍单独执行强制 Read → Draft → Update → Verify，不把自动授权当作免检。
- **Result:** PASS；第一稿完成，进入 Phase 7 三项独立 Review。

## Gate 7 — Multi-Layer Review
- **Artifacts:** `continuity/audit-report.md`、`style/consistency-report.md`、`drafts/reader-report.md`，三份原始报告全部保留。
- **Checks:** 连续性审计为 0 critical / 4 moderate / 2 minor；声音审阅确认整体稳定并标出 3 处抽象漂移；受限读者模拟仅顺序读取八章正文并明确披露同会话局限。
- **Default:** 不重写全稿；只处理报告已经指出的数字、时间、签字/物证链、抽象句和局部阅读清晰度问题。
- **Authorization:** 用户在本 E2E 计划中明确授权自动 Gate；授权依据与适用目录已记录在 `PROJECT.md`，不外溢到其他故事。
- **Result:** PASS；进入 Phase 8，仅执行一次定向 Revision Pass。

## Gate 8 — Revision
- **Artifacts:** 七个定向修改章节、更新后的 tracker/threads/changelog、保留不变的三份 Review 报告与最终 `manuscript.md`。
- **Checks:** 6 项连续性发现和 3 项声音漂移均已处理；读者报告中的签字、物证、条款密度和时间切换问题得到局部修复；八章目标区间与全稿 13,970 汉字、资源账、POV、beats/hooks、秘密边界全部复核。
- **Default:** 不重写 Chapter 02，不扩张为新的航海章节；以清晰回溯处理读者报告的可选高潮建议，保留已批准的 Day 20 返港框架。
- **Authorization:** 本 fixture 的一次定向 Revision Pass 已在用户计划中明确授权；没有扩大到根故事或其他 example。
- **Result:** PASS；八阶段完成，所有状态勾选关闭。
