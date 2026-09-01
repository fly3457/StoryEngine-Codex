# Continuity Audit Report — 2026-09-01

## Summary
- Chapters Audited: 8（按文件名顺序分为 Ch. 01–04、Ch. 05–08 两批）
- Issues Found: 6
- Critical (breaks plot): 0
- Moderate (noticeable to careful readers): 4
- Minor (nitpicks): 2
- Coverage: 事实、Day 0–21 时间、固定路线、角色知识、物件、资源、关系、伤势与世界规则均已核对；资源总账本身闭合。

## Critical Issues

无。

## Moderate Issues

### Issue 1 — 撤离名册合计为 29，不是 28
- **Location:** Chapter 01, paragraph 27
- **Problem:** 分区人数为抽水沟 2 + 东掘进 12 + 维修 7 + 运输 6，再加林栖与高岩，共 29；同段计数牌与后续 Canon 均为 28。
- **Contradicts:** Chapter 01 paragraphs 27–28；`continuity/tracker.md` 的 Day 0 “28 名当班人员全部撤离”。
- **Suggested Fix:** 将一个分区人数减一（例如东掘进 11），保留 28 枚铜片、最后一名维修棚值守与无人受伤的既定结果。

### Issue 2 — 安全短班恢复日差一天
- **Location:** Chapter 04, paragraph 33
- **Problem:** Day 5 的“从前日恢复”通常指 Day 3，但 Chapter 03 明确预测“从明天”即 Day 4 恢复，376 的煤账也按 Day 4–5 两日净减 5 计算。
- **Contradicts:** Chapter 03 paragraph 5；`continuity/tracker.md` 的“Day 4 起安全区短班恢复”。
- **Suggested Fix:** 将“从前日恢复”改为“从昨日恢复”，不改资源数字。

### Issue 3 — 矿工区至深层矿井耗时违反固定路线
- **Location:** Chapter 05, paragraph 15
- **Problem:** 正文写“平时四十分钟”、本次二十七分钟；世界时间表把矿工区 ↔ 深层矿井固定为 20 分钟。紧急场景反而比 Canon 固定时长更慢，且没有路障或绕行解释。
- **Contradicts:** `world/timeline.md` Fixed Durations；`world/rules.md` 的路线/现实耗时硬规则。
- **Suggested Fix:** 改为平时 20 分钟、本次在安全可行范围内约 18–20 分钟；相应时钟仍足以容纳 13:19 后的事故与 15:40 公示。

### Issue 4 — 最后航次两签缺少直接风险方
- **Location:** Chapter 07, paragraphs 29 and 32；Chapter 08, paragraph 2
- **Problem:** 协议刚规定“涉及某方直接风险时，其中一签必须来自该方”，但航次许可被写成林栖与徐澄两签。实际直接承担航海风险的是夜潮/陈默潮，陈在 Ch. 07 只“公开”资料，没有被明确写成签字人。
- **Contradicts:** Chapter 07 paragraph 29；`continuity/tracker.md` 的“两签且含直接风险方”规则。
- **Suggested Fix:** 明确陈以承运与船员风险方签字，再由林或徐作为第二签；另一人的工程/医疗条件保留为验收附件。同步修改 Ch. 07/08 的签名表述，不改变航次结果。

## Minor Issues

### Issue 5 — 矿工区至议事厅多出七分钟
- **Location:** Chapter 03, paragraph 6
- **Problem:** 正文称林栖从矿工区到议事厅用了 37 分钟，世界表列固定耗时 30 分钟；虽可理解为步行或进门延误，正文没有说明。
- **Contradicts:** `world/timeline.md` Fixed Durations。
- **Suggested Fix:** 直接改为 30 分钟，或补一句七分钟用于安检/候门；前者最小。

### Issue 6 — 一七四收条审计后的保管位置没有落地
- **Location:** Chapter 07, paragraph 10
- **Problem:** 陈把收条原件放到公开桌上，场末未说明归还或封存；tracker 仍断言原件由陈持有。读者不一定注意，但物件链缺最后一步。
- **Contradicts:** Chapter 04 paragraph 44 的原件位置；`continuity/tracker.md` 当前物件条目。
- **Suggested Fix:** 在 Ch. 07 审计后补一句白芷验印/复制并将原件归还陈，或明确转入公共封存并同步 tracker。

## Thread Health
- Open threads past deadline: 无。
- Threads that seem forgotten: 无；T1–T10 均有打开、推进与关闭记录。
- Threads resolved too abruptly: 无。T5 中“谁藏了账页”被明确保留为证据不足的次级问题，核心的款项用途与签字责任已经结清，不构成误报关闭。
- Residual costs intentionally preserved: 周的任期审查、矿工收入下降、17 单位污染药隔离、煤持续净消耗与夜潮路线优势损失。

## Resource Ledger Verification
- Coal: 410 → 386 → 376 → 361 → 352 → 340 → 325；无补煤，阶段产出/消耗相符。
- Food: 257 → 239 → 227 → 209 → 191 → 167 → 142 → 238；Day 16 起由每日 6 箱降至 5 箱，末次交付 +96。
- Medicine: 48 → 31 usable + 17 quarantined → 27 + 17 → 51 + 17；4 单位治疗扣减与 24 单位检测后入库相符。
