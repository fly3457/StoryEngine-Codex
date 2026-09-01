# Automated Review Gates

> 用户在测试任务中明确授权：各阶段无需等待人工确认，记录本应发生的 Review Gate，并采用合理默认选择继续。下列记录不虚构人工意见，只引用该自动化授权与当时检查结果。

## Gate 1 — Conception
- **Artifacts reviewed:** `PROJECT.md`
- **Checks:** 题材覆盖、完整故事规模、目标中文字数、主题、基调、受众与比较参照均已明确。
- **Default choice:** 采用工作标题《水位线以下》；现实主义、克制、成年大众向；八章约 12,500–13,500 中文字。
- **Authorization basis:** 用户明确要求自动执行八阶段并允许合理默认选择。
- **Result:** PASS；推进至 Phase 2。

## Gate 2 — World Building
- **Artifacts reviewed:** `world/setting.md`、`world/rules.md`、`world/timeline.md`、`world/locations.md`
- **Checks:** 时间地点明确；排水、供电、无线电、伤势与逃生路线有硬限制；社会权力链和信息错位可驱动冲突；地点具备可写的感官细节。
- **Default choice:** 采用完全现实主义规则；救援不会及时解决核心危机；结局允许调查启动但不承诺快速正义。
- **Authorization basis:** 用户的自动化 Gate 授权。
- **Result:** PASS；推进至 Phase 3。

## Gate 3 — Character Architecture
- **Artifacts reviewed:** `characters/cast.md` 与八份个人档案。
- **Checks:** 所有主要人物具备欲望、需求、缺陷、恐惧、应对机制、弧线、Voice DNA、关系、秘密与高潮职责；群像能力互补；社会立场不是简单善恶标签。
- **Default choice:** 采用五名 POV（江澜、陈渡、许葵、方素梅、唐晓满），三名非 POV 关键角色；周竞只有局部人性化，不设置洗白弧。
- **Authorization basis:** 用户的自动化 Gate 授权。
- **Result:** PASS；推进至 Phase 4。

## Gate 4 — Structural Outlining
- **Artifacts reviewed:** `outline/structure.md`、三个 act 文件、八张 Scene Card。
- **Checks:** 八章覆盖完整叙事曲线；时间、水位、物件和伤势依赖明确；五名 POV 分配合理；setup/payoff 表无悬空核心承诺；字数在测试范围内。
- **Default choice:** 一章一张连续场景卡，以 6 小时密闭时钟维持推进；第八章承担清晨与六周后双段尾声。
- **Authorization basis:** 用户的自动化 Gate 授权。
- **Result:** PASS；推进至 Phase 5。

## Gate 5 — Style Calibration
- **Artifacts reviewed:** 三个候选样稿、最终 `style/samples.md`、`style/voice-guide.md`、`style/motifs.md`。
- **Checks:** 比较内倾密度、动作清晰度、群像对白差异与长文本可持续性；最终参考具备明确禁用模式。
- **Default choice:** Option C 混合型；保留克制内心和功能性细节，以中短句推进。A、B 未选文本已从有效参考文件删除。
- **Authorization basis:** 用户的自动化 Gate 授权，以及“完成小说”的明确起草指令。
- **Result:** PASS；推进至 Phase 6，获准连续逐章起草，但仍需每章独立执行完整合同。

## Gate 6 — Iterative Drafting
- **Artifacts reviewed:** `drafts/chapter-01.md` 至 `drafts/chapter-08.md`、`continuity/tracker.md`、`continuity/threads.md`、`continuity/changelog.md`、`test-run/context-read-log.md`。
- **Checks:** 八章均有可定位的 pre-draft 实际读取记录与 DRAFT→UPDATE→THREADS→CHANGELOG→VERIFY 结果；总计约 13,145 个汉字；完整开端、诱发事件、升级、中点、危机、高潮、结局均落地；Open/Active 线程归零。
- **Default choice:** 接受此版为 First Draft，而非跳过评审直接定稿；不在 Gate 内做审美润色，把问题发现留给三项正式 Review。
- **Authorization basis:** 用户的自动化 Gate 授权。
- **Result:** PASS；推进至 Phase 7，按 Continuity Audit → Voice Consistency Check → Reader Simulation 顺序执行。

## Gate 7 — Full Reviews
- **Artifacts reviewed:** `continuity/audit-report.md`、`style/consistency-report.md`、`drafts/reader-report.md`。
- **Checks:** 三项评审按规定顺序完成且未在报告阶段改正文；连续性报告发现 4 项、声音报告发现 3 项、读者报告覆盖八章并披露同会话隔离限制；问题有重叠且可由一次有限修订处理。
- **Default choice:** 接受报告作为 Revision Brief，优先修复 Canon/物理/POV，再改善终章场景化；保持完整结局与现实未决边界，不追求第二轮无限优化。
- **Authorization basis:** 用户明确要求根据三报告执行一次 Revision Pass 且“不无限优化”。
- **Result:** PASS；推进至 Phase 8 Revision。

## Gate 8 — Revision
- **Artifacts reviewed:** 修订后的 Chapters 4–8、`continuity/tracker.md`、`continuity/threads.md`、`continuity/changelog.md`，以及保持不变的三份初稿评审报告。
- **Checks:** 七项锁定问题逐项映射到正文/状态修复；`world/timeline.md` 的 2026-06 Canon 与下游一致；水位预测、翻板受力、点名录像来源、Ch. 4/7 POV 和 Ch. 8 场景化均通过定点与关联检索；T1–T14 仍全部关闭；最终正文 13,299 个汉字。
- **Default choice:** 接受一次合并定点修订为 Final Draft；不追加第二轮润色，不改变八章结构、结局或现实未决边界。
- **Authorization basis:** 用户明确要求根据三项报告执行一次 Revision Pass，并要求不要无限优化。
- **Result:** PASS；八阶段创作流程完成，进入测试工程评估（非新增创作阶段）。
