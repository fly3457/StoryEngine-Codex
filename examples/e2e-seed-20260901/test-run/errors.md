# Errors and Exceptions

## Log
- 初始化时第一次从仓库根调用导入器，立即检测到作用域错误；该次只生成了根 `STORY_SEED.md`，未读取或修改根 Canon。文件随后删除，并从本独立目录正确重跑。此错误不影响 E2E 故事状态。
- Chapter 03 写前连续性核验发现 outline 将 Day 0 粮食基数直接与 Ch. 08 补给相加，遗漏日常消耗；在受影响正文出现前修正 Ch. 03/06/07/08 Scene Cards，并记录完整守恒口径。
- Chapter 06 写前读取发现 tracker 中两条 Ch. 02/03 的知识快照未在 Ch. 04 后替换，且地质记录有重复条目；正文 Canon 无冲突，已在继续起草前合并为当前知识/物件状态。
- Chapter 08 写前发现 Ch. 07 的“今晚不开船”与 Ch. 08 的 Day 20 场景若按启航场面直写会相差五天；在末章正文前把卡片 Beat 1 明确为 Day 15 当夜离港、Day 20 返航时回收航次记录，未改变既定章节时间或事件顺序。
- Phase 8 合订时，PATH 中的 `bash` 指向未安装 Linux 发行版的 Windows WSL shim，第一次调用退出 1 且未生成文件；随后显式使用已安装的 Git Bash 运行同一仓库脚本，成功生成 `manuscript.md`。无故事或 Canon 文件受该失败调用影响。

## Current Status
- 无未解决或阻断性错误。
