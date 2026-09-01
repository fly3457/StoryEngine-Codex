# Continuity Audit Report — 2026-09-01

## Summary
- **Chapters Audited:** 8（按 `chapter-01.md` → `chapter-08.md` 分两批顺序读取）
- **Issues Found:** 4
- **Critical (breaks plot):** 0
- **Moderate (noticeable to careful readers):** 2
- **Minor (nitpicks / provenance clarity):** 2
- **Missing required reads:** 无

## Critical Issues

无。

## Moderate Issues

### Issue 1 — 设施库状态年份冲突
- **Location:** Chapter 8, paragraph 12
- **Problem:** 听证结论称设施系统在 **2025 年**把二号站改为“待迁改备用”；既有世界时间线把同一变更定在 **2026-06**。两者是同一事件的互斥年份，且终章 tracker 已跟随正文写成 2025。
- **Contradicts:** `world/timeline.md` “2026-06 市级系统把二号站标注为待迁改备用”；`drafts/chapter-08.md` paragraph 12；`continuity/tracker.md` “名录错位原因”。
- **Suggested Fix:** 以已有世界时间线为 Canon，把 Chapter 8 和 tracker 的 2025 改为 2026 年 6 月；若导演选择 2025，则应反向更新世界时间线并复核方素梅何时收到提醒。不要同时保留两版。

### Issue 2 — 平台到水时间比重算晚约 25 分钟，正文没有给物理原因
- **Location:** Chapter 4, paragraph 11；Chapter 6, paragraph 31
- **Problem:** Chapter 4 在约 20:45 重算“两个小时左右”追上 32.6 米平台，指向约 22:45；Chapter 6 在 23:02 试泵后、接近本章 23:10 末尾时，水才“舔到内平台的边沿”。在此之前泵没有稳定运行、内红阀直到 Chapter 6 才打开，正文也未说明降雨转弱或入流下降。
- **Contradicts:** `world/rules.md` Soft Rule “水位预测可偏差，但偏差必须在正文中有物理原因”；`drafts/chapter-04.md` paragraph 11；`drafts/chapter-06.md` paragraphs 29–31。
- **Suggested Fix:** 最小修复是把 Chapter 4 的估算改为“两个半小时左右”；或在 Chapter 5/6 明确一个能减慢入流但不造成水位下降的物理变化。前者不改变动作时序。

## Minor Issues

### Issue 3 — 终章“最后一段画面”的来源未在点名章建立
- **Location:** Chapter 8, paragraph 3
- **Problem:** 终章称唐晓满最后拍到一段全黑画面，其中方素梅让八人轮流报名字；对应的 Chapter 6 点名段没有写唐开启录像。Chapter 7 又明确区分“不是录像，新录音存在手机里”，容易让读者误以为终章突然增加了一个此前未追踪的媒体文件。
- **Contradicts:** 不构成硬事实互斥，但削弱核心证据链的对象来源清晰度；参见 `drafts/chapter-06.md` 点名段、`drafts/chapter-07.md` 开头、`continuity/tracker.md` 手机/录音条目。
- **Suggested Fix:** 在 Chapter 6 点名时增加一句唐用破手机录下全黑画面，或把 Chapter 8 改为一个已明确建立的文件并相应调整内容。前者能保留现有开头意象。

### Issue 4 — 翻板受力方向表述含混
- **Location:** Chapter 5, paragraph 28
- **Problem:** 陈、马从站内侧疏通堤外翻板后，正文写“外面的水压把翻板推开”。作为防倒灌翻板，读者通常会理解外侧江水压力把门压闭；真正帮助排水打开的应是管内侧压力、人工腰背发力或两者共同作用。当前措辞让唯一排水路径的机械方向短暂失真。
- **Contradicts:** `world/rules.md` Hard Rule 4 对旁通/翻板的单向排水功能；不影响后续实际结果，但机械因果不够清楚。
- **Suggested Fix:** 改成“他们的腰背和管内积水把翻板顶开不到半尺”或“松动后的翻板被内侧水压推开”。

## Thread Health
- **Open threads past deadline:** 无。`continuity/threads.md` 的 Open / Active 均为“无”。
- **Threads that seem forgotten:** 无。T1–T14 均有 setup、推进和明确 closure。
- **Threads resolved too abruptly:** 无硬性问题。T9 的具体年份存在 Issue 1，但“旧图—设施库—内部提醒—听证整改”的结构闭环完整；T14 虽在终章关闭，但其材料从 Chapters 1–7 已持续建立。
- **Closure quality:** 生存线程集中在 Chapter 7 关闭，证据/制度线程在 Chapter 8 关闭，符合大纲期限；未把未决判决、赔偿和安置误列为遗忘伏笔。

## Audit Verdict

初稿没有破坏情节的连续性错误，人物伤势、物件、电量、知识边界和八人数量总体稳定。最需要修订的是一个明确 Canon 年份冲突和一个水位时钟偏差；另外两项属于证据来源与工程措辞的可读性修复。报告只提出问题，未修改正文或 Canon。
