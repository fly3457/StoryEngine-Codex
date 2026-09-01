# Seed E2E Run Log

## Metadata
- **Run ID:** e2e-seed-20260901
- **Source:** `examples/seed-20260901`
- **Objective:** 验证可选 Seed 启动能在不改变八阶段的前提下走完一部 8 章测试小说。
- **Gate Authorization:** 用户明确选择测试专用自动 Gate。
- **Framework Mutation Order:** 导入器与工程测试先完成并全绿；随后才创建本故事 fixture。

## Events
1. 在独立目录复制空白 StoryEngine 状态；未把根故事或 minimal-story 当作活动 Canon。
2. 运行新 Seed 入口，生成 `STORY_SEED.md`；其他故事文件当时未变化。
3. Phase 1–5 完成并通过有记录的测试专用 Gate；项目进入 Chapter 01 起草前状态。
4. Chapter 01 完成 Read → Draft → Update → Verify；1,662 个汉字，T1/T2 打开，28 人无伤撤离，原始地质记录离开林的单独控制。
5. Chapter 02 完成完整合同；1,680 个汉字，17 单位污染药封存、31 可用，T3/T4 打开，徐澄尚未联系到陈且没有越过知识边界。
6. Chapter 03 完成完整合同；1,623 个汉字，建立 Day 3 资源守恒口径，T5/T6 打开，周的七天策略与扣船命令把四条危机推向旧港。
7. Chapter 04 完成完整合同；1,752 个汉字，四人首次共享核心事实，白脊中转线与四十八小时空船许可建立，T7/T8 打开，浮冰提前四日。
8. Chapter 05 完成完整合同；1,735 个汉字，旧坐标引发无死亡的两人伤情，完整矿图和林的延迟责任公开，T1 关闭、T9 打开。
9. Chapter 06 完成完整合同；1,824 个汉字，两伤者稳定、可用药降至 27，磨损瓶误疑关闭，公开库存/分诊/批检开始运行，Day 15 账目公开被写死。
10. Chapter 07 完成完整合同；1,778 个汉字，救济账与个人责任公开，T5/T6 关闭，四方两签制度和有条件最后航次成立，T10 打开。
11. Chapter 08 完成完整合同；1,898 个汉字，Day 15 离港/Day 20 返港衔接明确，粮 142→238、药 27→51、煤保持 325，全部十条线程关闭。全稿 13,952 个汉字。
12. Phase 7 完成连续性、声音与隔离读者模拟三项正式 Review；原始报告保留，Gate 7 按本 fixture 的用户授权通过，未在审阅阶段修改正文。
13. Phase 8 按修订合同先记录策略，再原位修订 Ch. 01/03/04/05/06/07/08；tracker、threads 与 changelog 随后更新。全稿修订后 13,970 个汉字，所有章节仍在卡片区间。
14. 逐项回查连续性、声音、读者发现、资源与下游引用后通过 Gate 8；由八个最终章节生成 `manuscript.md`，项目八阶段全部完成。
15. 最终工程验收：importer `node --check` 退出 0，Seed contracts 32/32，完整测试 59/59，`git diff --check` 退出 0；仓库根没有遗留 `STORY_SEED.md`。结果归档到 `test-run/final-evaluation.md`。
