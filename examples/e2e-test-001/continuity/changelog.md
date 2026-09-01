# Continuity Changelog

## Log

### 2026-09-01 — Test scaffold initialized
- 在 `examples/e2e-test-001/` 创建独立空白故事脚手架。
- 仅复制原有 Markdown 状态类别与模板字段；未读取或采用 `examples/minimal-story/` 的故事状态。
- 当前尚未作出故事 Canon 决策。

### 2026-09-01 — Phase 1: Conception
- **实际读取：** `PROJECT.md`、`continuity/changelog.md`。
- **缺失读取：** 无；本阶段所需文件均存在。
- 依据用户指定的题材、规模与自动 Gate 授权，确定工作标题《水位线以下》、八章结构、约 12,500–13,500 中文字目标，以及现实主义密闭空间灾难基调。
- 用户未指定的创作选择采用合理默认：虚构中国南方城市、成年大众读者、克制而非猎奇的叙述。
- **Review Gate：** PROJECT 字段完整，符合“悬疑 / 生存 / 群像 / 社会冲突”与完整故事要求；按用户本次测试的自动化授权视为 Gate 通过，范围仅限 Phase 1 产物。
- 更新 `PROJECT.md`：勾选 PROJECT approved，进入 Phase 2。

### 2026-09-01 — Phase 2: World Building
- **实际读取：** `PROJECT.md`、`continuity/changelog.md`、`world/setting.md`、`world/rules.md`、`world/timeline.md`、`world/locations.md`。
- **缺失读取：** 无；四个 world 文件为本测试初始化的待生成模板，未含既有 Canon。
- 建立 2026 年溪津市、七号码头拆迁与澜庭项目的社会背景；固定鹭湾二号站结构、设备限制、主渠非法封堵、旧旁通与焊死竖井等物理规则。
- 建立 1998—2026 年前史及 2026-09-01 至 09-02 的故事时钟；后续正文不得用巧合救援、超常技能或无代价设备突破这些限制。
- **Review Gate：** 已逐项检查 setting、rules、timeline、locations 的模板责任；物理限制能支撑完整生存线，社会结构能支撑责任冲突，无悬而未决的世界 Canon。
- 依据用户自动 Gate 授权通过 Phase 2；更新 `PROJECT.md`，进入 Phase 3。

### 2026-09-01 — Phase 3: Character Architecture
- **实际读取：** `PROJECT.md`、全部四个 `world/` Canon 文件、`characters/cast.md`、`characters/_TEMPLATE.md`、`continuity/changelog.md`；当时不存在其他角色档案。
- **缺失读取：** 无。待创建的个人档案不作为缺失依赖。
- 创建八名受困者的完整角色档案，保留模板要求的 Identity、Physical、Backstory、Psychology、Arc、Voice DNA、Relationships、Key Scenes、Secrets、Notes。
- 将解题能力分散：江澜负责图纸与计算，戚长林负责机械记忆，陈渡负责水性与路线，马成业负责焊接，许葵负责医疗，方素梅负责人力组织，唐晓满负责影像，周竞掌握命令链且兼具阻力。
- 修正 `world/rules.md` 一处 Markdown 表格缺少结尾竖线的格式错误；Canon 内容未改变。
- **Review Gate：** 检查八人动机、恐惧、秘密、语言和关系互相咬合；没有万能角色，周竞的合作不会构成免责，所有计划弧线均仍属计划而非正文事实。
- 依据用户自动 Gate 授权通过 Phase 3；更新 `PROJECT.md`，进入 Phase 4。

### 2026-09-01 — Phase 4: Structural Outlining
- **实际读取：** `PROJECT.md`、全部 `world/` 文件、`characters/` 中 cast、模板与八份人物档案、现有 `outline/structure.md`、三个 act 模板、`outline/scenes/_TEMPLATE.md`、`continuity/tracker.md`、`continuity/threads.md`、`continuity/changelog.md`。
- **缺失读取：** 无；起始 tracker/threads 如实为空，尚无正文事实或已打开线程。
- 建立三幕八章结构，包含开端、诱发事件、升级、中点、危机、高潮与结局；每章一个连续主场景、一个限知 POV、明确时钟和约 1,500–1,900 中文字目标。
- 创建 `ch01-s1.md` 至 `ch08-s1.md` 八张 Scene Card，完整填写 purpose、entry/exit hook、5 beats、情绪轨迹、依赖、输出与线程计划。
- 大纲中的 T1–T14 均为计划标签，未写入 `continuity/threads.md`，避免把预定 payoff 当成已完成事实。
- **Review Gate：** 检查八章总目标约 13,600 中文字（允许正文压缩至项目 10,000–15,000 范围），每项硬规则和主要弧线均有 setup/payoff，终章无新悬疑义务。
- 依据用户自动 Gate 授权通过 Phase 4；更新 `PROJECT.md`，进入 Phase 5。

### 2026-09-01 — Phase 5A: Style Candidates
- **实际读取：** `PROJECT.md`、`characters/cast.md`、五名 POV 角色档案、`outline/structure.md`、三个 act 文件、现有 `style/voice-guide.md`、`style/motifs.md`、`style/samples.md`、`continuity/changelog.md`。
- **缺失读取：** 无；三个 style 文件为待生成模板。
- 在 `style/samples.md` 写入 A（文学内倾）、B（电影推进）、C（克制混合）三个明确标记为 Unapproved 的候选。
- **Canon 影响：** 无。候选内所有动作只作声音示范，不建立正文事实、不打开或关闭线程。
- 下一步按自动化 Gate 授权比较三案并作出默认选择；未提前把任何候选当作批准样稿。

### 2026-09-01 — Phase 5B: Style Selection and Codification
- **实际读取：** `style/samples.md` 三个候选全文，并回看本阶段已读的五名 POV Voice DNA 与结构节奏要求。
- **Default choice:** 选择 Option C“混合型、克制而具推进力”。A 的内倾密度可能挤压生存动作，B 的持续短切可能削弱社会灰度；C 能同时容纳物理可读性、限知内心和差异化对白。
- 从 `style/samples.md` 删除 A、B 候选，只保留 C 为 `Approved Sample`；明确样稿动作不构成 Canon。
- 完整填写 `style/voice-guide.md` 原模板全部字段，建立 POV、距离、句段节奏、描写/隐喻密度、对白、信息策略、节奏哲学与禁用模式。
- 完整填写 `style/motifs.md`，固定水位线、名字/签字、蓝光、手、门阀及六个象征物的计划用法。
- **Review Gate：** 样稿、指南与母题彼此一致，能区分主要人物说话方式，且适合八章倒计时。依据用户自动 Gate 授权通过 Phase 5，并视用户“完成端到端测试”指令为已明确授权开始起草。
- 更新 `PROJECT.md`：进入 Phase 6，下一步 Chapter 1。

### 2026-09-01 — Chapter 1 pre-draft read
- **实际读取：** `PROJECT.md`、`outline/scenes/ch01-s1.md`、`continuity/tracker.md`、`continuity/threads.md`、`continuity/changelog.md`、`style/voice-guide.md`、`style/samples.md`、`characters/jiang-lan.md`。
- **缺失/不适用：** Chapter 1 无 N-1 与 N-2；`drafts/chapter-00.md` 不存在属预期，不创建虚构前章。
- **Pre-draft checklist:** 已确认场景目的、首尾钩子、五个 beats、情绪轨迹、全部依赖、批准声音，以及江澜想补救、怕专业判断再次害人、隐瞒签字全貌的状态。
- 所有必需依赖均已在 Canon 中建立，可以起草。

### 2026-09-01 — Chapter 1 DRAFTED and state updated
- **Draft:** `drafts/chapter-01.md`《雨进门》，覆盖 18:34–19:20。
- **Beats hit:** 七人进入；入口坍塌；周竞左脚受伤；VHF 联络；发现新鲜割管；监控报八人；工具间两次异响；水过 20 厘米线。
- **Tracker changes:** 建立七名可见受困者与未知第八人、携带物、周竞伤势、入口/电力/水位/泵状态和各人知识边界。
- **Thread changes:** 打开 T1（第八人）、T2（割管）、T3（外援与水位）、T4（图筒）；无线程关闭。
- **Other Canon owners:** 无需更新 world/characters；正文实现了既有 Canon，没有新增冲突世界规则。
- **Files changed:** `drafts/chapter-01.md`、`continuity/tracker.md`、`continuity/threads.md`、`continuity/changelog.md`、`test-run/context-read-log.md`。
- **Verification:** PASS。重新读取正文、tracker 与 threads，并核对 Scene Card：五个 beats、首尾钩子和“相信避险点→封闭/被窥视”的情绪轨迹均落地；最终正文约 1,509 个汉字。
- **Continuity checks:** 时间 18:34–19:20、前室→泵厅位置、图筒/手机/吸入剂/VHF/钥匙/油管状态、七人可见与第八人未知的知识边界、周竞脚伤、仍有市电及水位上涨均无冲突。
- **Voice check:** 江澜以刻度、时间和任务理解危机；对白按角色 Voice DNA 区分；未出现跳头、过量术语或样稿事件误作 Canon。
- **Hook check:** 开头广告蓝光与图筒形成责任意象；结尾两下敲击推进 T1。
- **Resolution/no-change:** 初次核验发现字数仅 1,227 个汉字，已在不新增剧情事实的范围补足封门尝试、健康点名与泵厅感官层，复核为约 1,509 个汉字；无需改 tracker/threads。
- 更新 `PROJECT.md`：下一步 Chapter 2。

### 2026-09-01 — Chapter 2 pre-draft read
- **实际读取：** `PROJECT.md`、`drafts/chapter-01.md`、`outline/scenes/ch02-s1.md`、`continuity/tracker.md`、`continuity/threads.md`、`continuity/changelog.md`、`style/voice-guide.md`、`style/samples.md`、`characters/chen-du.md`。
- **缺失/不适用：** `drafts/chapter-00.md` 为 Chapter 2 的 N-2，不存在属预期。
- **Pre-draft checklist:** 已确认场景五 beats、首尾钩子、情绪轨迹、所有已建立物件/伤势/知识边界；陈渡想找出破坏者、以嘲讽应压、尚不公开涵管恐惧。
- T1 到期应在本章真实关闭；T2 只能推进到直接执行者，不能提前让命令链完全解决。

### 2026-09-01 — Chapter 2 DRAFTED and state updated
- **Draft:** `drafts/chapter-02.md`《第八个人》，覆盖 19:20–20:05。
- **Beats hit:** 搜索与互疑；工具间内锁、血和接头；发现马成业并包扎右掌；马承认割管但回避命令者；工具包与角磨机建立；主渠封头/四处焊点公开；水过 40 厘米线；唐展示录像。
- **Tracker changes:** 未知第八人更新为马成业；建立其伤势、工具包/备用胶管/管箍/角磨机状态、封头与焊点知识、录像内容和电力/水位变化。
- **Thread changes:** T1 按期关闭；T2、T3 转 Active；打开 T5（主渠封头）、T6（焊死竖井）、T7（录像）；T4 明确无变化，仍 Open。
- **Other Canon owners:** 无需更新 world/characters；正文落实既有设置，未新增 Canon 冲突。
- **Files changed:** `drafts/chapter-02.md`、`continuity/tracker.md`、`continuity/threads.md`、`continuity/changelog.md`、`test-run/context-read-log.md`。
- **Verification:** PASS。重新读取本章并逐项检索马成业、割管承认、封头、四焊点、40 厘米线和 8 月 18 日录像；五个 beats、入口/出口钩子及“抓到威胁→看到更大命令链”的情绪变化齐全。
- **Continuity checks:** 承接 Ch. 1 的七人、入口、图筒/手机/吸入剂/VHF、周竞脚伤和水位；马右掌伤、工具包物件、电池三格、陈渡小手电两格/捆绳、考勤卡、仍有市电均已入 tracker。马只承认直接执行，未越过知识边界说出命令者。
- **Voice check:** 陈渡以路线和剩余分钟组织感知、用反问攻击权威；马先说工序后回避人名；周保持被动/风险措辞。未跳入非 POV 心理。
- **Length check:** 初稿约 1,276 个汉字；核验时补足不改变情节结果的空间搜索、分包考勤物证与离线素材动作，并同步 tracker，最终约 1,580 个汉字。
- **Thread check:** T1 真实兑现后关闭；T2 仅推进直接执行者；T5–T7 由正文实际打开；没有按大纲预先关闭任何线程。
- 更新 `PROJECT.md`：下一步 Chapter 3。

### 2026-09-01 — Chapter 3 pre-draft read
- **实际读取：** `PROJECT.md`、`drafts/chapter-02.md`、`drafts/chapter-01.md`、`outline/scenes/ch03-s1.md`、`continuity/tracker.md`、`continuity/threads.md`、`continuity/changelog.md`、`style/voice-guide.md`、`style/samples.md`、`characters/xu-kui.md`。
- **缺失读取：** 无；N-1、N-2 均存在并完整读取。
- **Pre-draft checklist:** 已确认目的、首尾钩子、五 beats、情绪轨迹和全部依赖；本章只公开江澜会签，不提前交代完整异议；20:16 后市电不得恢复。
- 许葵的核心压力为同时看护马右掌、周左踝与群体恐慌；她会从“冲突以后再说”转向保护证据当下的控制权。

### 2026-09-01 — Chapter 3 DRAFTED and state updated
- **Draft:** `drafts/chapter-03.md`《签字页》，覆盖 20:05–20:45；20:16 市电按硬规则永久中断。
- **Beats hit:** 录像时间码/声音；周索取手机、许制止；江展示迁改图并承认会签；断电与搬运；马指认周的 17:50 命令；错误数据库和午夜救援窗口；隔离门鼓起。
- **Tracker changes:** 更新江/许/周/马身体与知识状态；图筒重新密封、工具上移、VHF 转低电量；建立录像声音、会签、割管命令、名录错位和隔离门状态。
- **Thread changes:** T2–T7 均按正文推进；T4 从 Open 转 Active；打开 T8（签字/异议）和 T9（名录错位）；无线程关闭。
- **Other Canon owners:** 无需更新 world/characters；时间与断电遵守既有规则。
- **Files changed:** `drafts/chapter-03.md`、`continuity/tracker.md`、`continuity/threads.md`、`continuity/changelog.md`、`test-run/context-read-log.md`。
- **Verification:** PASS。重新读取并逐项检索录像原声、手机控制权、江澜会签、20:16 断电、17:50 命令、待迁改数据库与弯曲门栓；所有 beats、首尾钩子和“证据确定→权威全失”的轨迹齐全。
- **Continuity checks:** Ch. 1–2 的伤势、工具电量、图筒/手机/吸入剂、割管知识和水位均顺接；明确柴油泵仅底座浸水、发动机/油箱仍干，保留后续可启动性。马只报告亲历命令，周保留争辩；江仅承认会签，T8 未提前解决。
- **Voice check:** 全章限许葵；以呼吸、血运、脉搏、伤员和物资分级感知冲突，并让她意识到证据控制也是当下安全问题。人物对白保持区分。
- **Length check:** 初稿约 1,310 个汉字；核验补足录像语境、许葵与七号码头关系、夹层搬运空间，并把新增事实同步 tracker；最终约 1,652 个汉字。
- **Thread check:** T2–T7 有可定位推进；T8/T9 由正文打开；无线程被大纲预先关闭。
- 更新 `PROJECT.md`：下一步 Chapter 4。

### 2026-09-01 — Chapter 4 pre-draft read
- **实际读取：** `PROJECT.md`、`drafts/chapter-03.md`、`drafts/chapter-02.md`、`outline/scenes/ch04-s1.md`、`continuity/tracker.md`、`continuity/threads.md`、`continuity/changelog.md` 相关记录、`style/voice-guide.md`、`style/samples.md`、`characters/jiang-lan.md`。
- **缺失读取：** 无；N-1、N-2 及全部必需状态完整。
- **Pre-draft checklist:** 已确认五 beats、钩子、情绪转折与硬规则；20:16 后不恢复市电，戚的腿伤/听力损坏必须从本章起持续，陈救周不构成和解。
- T8 本章需公开完整事实；旧旁通必须由江澜图纸缺口与戚长林现场记忆共同确认，不能写成单人灵感。

### 2026-09-01 — Chapter 4 DRAFTED and state updated
- **Draft:** `drafts/chapter-04.md`《图上消失的管》，覆盖 20:45–21:30，完成结构 midpoint。
- **Beats hit:** 隔离门破裂；戚左腿伤/助听器失效；陈救周但不和解；物资上移与涨速重算；江公开三份文件和未追踪；图/弯头/戚记忆共同确认旧旁通；01:30 外援；逐人表决；开启黑水管口。
- **Tracker changes:** 更新戚/陈/周伤势与听力，完整文件知识、图筒状态、红轮/检修盖/旁通及四步方案；新增立轴泵高位发动机结构并同步 Canon owner `world/setting.md`。
- **Thread changes:** T8 真实关闭；T3–T5 推进；打开 T10（旧旁通）；T2/T6/T7 持续，T9 明确无变化。
- **Files changed:** `drafts/chapter-04.md`、`world/setting.md`、`continuity/tracker.md`、`continuity/threads.md`、`continuity/changelog.md`、`test-run/context-read-log.md`。
- **Verification:** PASS。重新读取本章并检索隔离门破裂、戚腿伤/助听器、陈右膝、退回回执、26 米旁通、01:30 和“两个人”钩子；所有 Scene Card beats 与 midpoint 功能均落地，正文约 1,588 个汉字。
- **Continuity checks:** 永久断电、图筒/手机/工具、马右掌、周左踝、许左腕从前章延续；新增戚左腿伤/听力失效与陈右膝撞伤已入 tracker。立轴泵高位发动机解释后续可用性并同步 `world/setting.md`，未改变既有硬规则。
- **Knowledge/relationship checks:** 完整文件仅在本章公开；旁通由图、弯头和戚维护记忆交叉确认；七人同意、周加入不等于信任或免责；陈救周未写成和解。
- **Voice/hook checks:** 江澜以条件变化、标高和四步方案组织内心，主动承认未追踪；开头轻响承接 Ch. 3 门栓，结尾黑水管与“两人回来”构成行动钩子。
- **Thread check:** T8 基于完整公开而关闭；T10 在入口实际打开后成立；T9 明确无变化。没有未记录的新线程。
- 更新 `PROJECT.md`：下一步 Chapter 5。

### 2026-09-01 — Chapter 5 pre-draft read
- **实际读取：** `PROJECT.md`、`drafts/chapter-04.md`、`drafts/chapter-03.md`、`outline/scenes/ch05-s1.md`、`continuity/tracker.md`、`continuity/threads.md`、`continuity/changelog.md` 相关记录、`style/voice-guide.md`、`style/samples.md`、`characters/chen-du.md`。
- **缺失读取：** 无；N-1、N-2 和全部状态可用。
- **Pre-draft checklist:** 已确认动作、钩子、情绪和物理依赖；角磨机不得用于旁通；陈右膝、马右掌、戚左腿/听力、周左踝、许左腕均需延续。
- 严格限陈渡 POV：他进管后，夹层事件只能通过绳号、模糊声音和返回后所见呈现；不得偷看周竞或唐晓满内心。

### 2026-09-01 — Chapter 5 DRAFTED and state updated
- **Draft:** `drafts/chapter-05.md`《二十六米黑水》，覆盖 21:30–22:20。
- **Beats hit:** 陈公开涵管恐惧并交出主绳；戚用复述/绳号交底；陈马穿管、回流与短暂灭灯；马完整陈述；清淤开外翻板；返回后见手机争夺；手机破裂、存储卡和共同见证公开；离合断开空载试机失败并喷油雾。
- **Tracker changes:** 更新陈/马低温擦伤、陈手电一格、35 米救生绳、扳手/扎带、翻板、破手机/存储卡、油路跨接与未带水状态；保留所有旧伤。
- **Thread changes:** T2/T6/T7/T10 推进；打开 T11（存储卡安全）与 T12（油管稳定）；T3/T4/T5/T9 明确无变化。
- **Other Canon owners:** 无需更新；外翻板和空载试机遵守 world hard rules，角磨机未消耗。
- **Files changed:** `drafts/chapter-05.md`、`continuity/tracker.md`、`continuity/threads.md`、`continuity/changelog.md`、`test-run/context-read-log.md`。
- **Verification:** PASS。重新读取并检索恐惧公开、35 米救生绳/绳号、手电进水、马完整陈述、外翻板不足半尺、手机裂屏、存储卡和离合断开；所有 beats 与出口泵机失败钩子齐全。
- **Continuity checks:** 戚腿伤/听力、陈右膝、马右掌、周左踝、许左腕均持续；小手电由两格降一格，角磨机三格未用，吸入剂未用，图筒/VHF 无变化。外闸打开但内阀/旁通未切，空载试机未带水，未违反硬规则。
- **POV check:** 进管期间只写陈的身体、马的可听言行和绳上传来的信号；夹层争夺仅在两人返回后呈现，没有偷看非 POV 事件。
- **Voice/arc check:** 陈以路程和时限对抗恐慌，首次把主绳控制权交给具体他人；对马、周的合作仍不构成赦免。
- **Length check:** 初稿约 1,445 个汉字；核验补足结绳安全、管内空间与“六双具体的手”，不改变剧情结果，最终约 1,748 个汉字；无额外 tracker 变更。
- **Thread check:** 外翻板疑问实际解决但 T10 仍需完整排水；T11/T12 由物件事件真实打开；T3/T4/T5/T9 明确无变化。
- 更新 `PROJECT.md`：下一步 Chapter 6。

### 2026-09-01 — Chapter 6 pre-draft read
- **实际读取：** `PROJECT.md`、`drafts/chapter-05.md`（N-1）、`drafts/chapter-04.md`（N-2）、`outline/scenes/ch06-s1.md`、`continuity/tracker.md`、`continuity/threads.md`、`continuity/changelog.md` 相关记录、`style/voice-guide.md`、`style/samples.md`、`characters/fang-sumei.md`。
- **缺失读取：** 无；N-1、N-2 和全部必需状态均已完整读取。
- **Pre-draft checklist:** 已确认方素梅的名单型限知视角、隐瞒事实与责任边界；本章必须完成内红阀/旁通切换，但泵不能稳定；唐晓满只首次使用吸入剂，VHF 只能在低电量基础上耗尽。
- 延续陈右膝/低温、马右掌、戚左腿/听力、周左踝、许左腕；破损手机、独立存储卡、密封图筒、角磨机三格和救生绳状态不得重置。

### 2026-09-01 — Chapter 6 DRAFTED and state updated
- **Draft:** `drafts/chapter-06.md`《名单以外》，覆盖 22:20–23:10。
- **Beats hit:** 方逐项清点八人/伤势/资源并公开知情和降级报告；改用逐人风险复述；马重修油管；红色内阀与旁通选择杆到位；唐首次哮喘发作并使用吸入剂；VHF 电尽；首次带泵因接头外滑停止；水触内平台；周明确承认割管命令并自愿压接头。
- **Tracker changes:** 更新方/唐/周/马状态；记录名单、吸入剂、VHF、泵/油管、红阀和水位；保留图筒、破手机、独立存储卡、角磨机三格、救生绳及全部旧伤。
- **Thread changes:** T2/T3/T5/T9/T10/T12 推进；打开 T13（同步脱困）；T4/T6/T7/T11 明确无变化，尚未关闭线程。
- **Other Canon owners:** 无需更新；正文实现既有硬规则，未修改 world/characters/outline。
- **Files changed before verification:** `drafts/chapter-06.md`、`continuity/tracker.md`、`continuity/threads.md`、`continuity/changelog.md`、`test-run/context-read-log.md`。
- **Verification:** PASS。重新读取正文、tracker 与 threads；逐项检索方公开知情/降级、风险复述、红阀、旁通选择、吸入剂、VHF 电尽、短时带泵、平台水位和周的明确承认，所有 Scene Card beats 与首尾钩子齐全。
- **Continuity checks:** 全部旧伤延续；吸入剂仅首次使用两下，手机/存储卡/图筒未易主，角磨机仍三格未用，陈手电仍一格，VHF 由低电量自然耗尽。外翻板、内阀、选择杆按硬规则全部到位，但油路不稳使水位没有可见下降。
- **Voice/POV check:** 全章限方素梅，以名单、门牌、栏目和逐人点名组织内心；戚长林通过读唇/书写/手势沟通，没有恢复听力或跳入他人心理。
- **Length check:** 首次核验为约 1,437 个汉字；补足不改变情节结果的名单含义和逐人应答层，同时发现并纠正联络员“苏勤→苏琴”及吸入剂“外套内袋→书包侧袋”两处源文件连续性细节，复核约 1,699 个汉字。
- **Thread/hook check:** T13 由实际同步困境打开；周的口头承认推进 T2 但因未录音/无外部见证暂不关闭；结尾“告诉我按哪里”直接进入高潮行动。
- 更新 `PROJECT.md`：下一步 Chapter 7。

### 2026-09-01 — Chapter 7 pre-draft read
- **实际读取：** `PROJECT.md`、`drafts/chapter-06.md`（N-1）、`drafts/chapter-05.md`（N-2）、`outline/scenes/ch07-s1.md`、`continuity/tracker.md`、`continuity/threads.md`、`continuity/changelog.md` 相关记录、`style/voice-guide.md`、`style/samples.md`、`characters/jiang-lan.md`。
- **缺失读取：** 无；高潮所需 Canon、两章即时上下文和江澜 Voice DNA 均已确认。
- **Pre-draft checklist:** 外闸/内红阀/选择杆到位，油管需持续压紧，平台水刚触边；VHF 已死、灯仅剩陈手电一格；角磨机三格且只能在本章连续完成四焊点；唐已用吸入剂两下，手机损坏但能开机，原片卡另藏。
- 本章须使八个人的行动构成同一因果链；周协作不能写成赦免；江救周而由他人补取图筒，落实其人物弧线。

### 2026-09-01 — Chapter 7 DRAFTED and state updated
- **Draft:** `drafts/chapter-07.md`《四个焊点》，覆盖 23:10–00:25，完成生存高潮。
- **Beats hit:** 按名同步分工；周在唐录音中完整复述命令；泵稳定、戚纠正回压、水位下降；角磨机一次连续切完四点；轻装外援凭最后呼叫/切割声定位；护栏断裂、江救周而唐/方/陈取图筒；竖井开启、八人逐一脱困；周试图改写后被录音打断；江实名陈述；上传进度到 1%。
- **Tracker changes:** 更新八人脱困、图筒落水取回、破手机新录音/一格信号、原片卡带出、角磨机耗尽、绳索用途、泵/压力/水位、外援路径和江的弧线选择。
- **Thread changes:** 关闭 T2/T3/T5/T6/T10/T12/T13；推进 T4/T7/T11；T9 明确无变化；打开 T14（证据进入正式责任链）。
- **Other Canon owners:** 无需更新；主渠封头未消失，外援轻装路径与 01:30 重型清障预测不冲突，既有 world hard rules 保持。
- **Files changed before verification:** `drafts/chapter-07.md`、`continuity/tracker.md`、`continuity/threads.md`、`continuity/changelog.md`、`test-run/context-read-log.md`。
- **Verification:** PASS。重新读取正文、tracker 与 threads；逐项定位八人分工、完整录音、压力纠正、实际降水、一次性切割四点、轻装外援因果、救周/取筒分工、八人出井、实名陈述和 1% 上传钩子。
- **Continuity checks:** 全部八人按唐/许/戚/周/方/陈/马/江顺序出井；周左踝再撞后由许固定，马右掌/陈右膝/戚左腿与失聪/唐呼吸状态均未重置。角磨机三格耗尽，小手电仍一格未宣称耗尽，VHF/市电未恢复，原片卡始终另藏，图筒密封完好但背扣损坏。
- **Mechanics check:** 先由周压接头再合离合；戚以触感/表针发现回压，红轮回收半圈；平台露出后才切割。主渠封头明确“没拆/仍在”，排水只走旧旁通。自动检索一度因“没拆”含“拆”字给出假阳性，人工语义复核通过。
- **Rescue causality check:** 01:30 仍是街面重型清障预计；23:02 最后呼叫触发的是高侧徒步轻装组，角磨声只帮助末端定位，不是无铺垫的救援捷径。
- **POV/arc check:** 全章限江澜，以条件、压力、刻度和人数组织感知；她在图筒/周竞之间先救人，证据由唐/方/陈补位取回，随后实名承担，未把救周写成原谅周。
- **Length/thread check:** 正文约 1,869 个汉字；关闭 T2/T3/T5/T6/T10/T12/T13 的生存义务，T14 仅接管正式责任线，未重复保留已解决谜底。
- 更新 `PROJECT.md`：下一步 Chapter 8。

### 2026-09-01 — Chapter 8 pre-draft read
- **实际读取：** `PROJECT.md`、`drafts/chapter-07.md`（N-1）、`drafts/chapter-06.md`（N-2）、`outline/scenes/ch08-s1.md`、`continuity/tracker.md`、`continuity/threads.md`、`continuity/changelog.md` 相关记录、`style/voice-guide.md`、`style/samples.md`、`characters/tang-xiaoman.md`。
- **缺失读取：** 无；终章依赖的全部开放线程、物件状态、伤势、唐的 Voice DNA 与成熟弧线均已确认。
- **Pre-draft checklist:** 八人已脱困，图筒密封但背扣坏、破手机有新口供/一格信号、原片卡另藏带出；清晨证词必须限制到个人所知并形成三处独立副本，六周听证只给程序性结果。
- 本章要明确名录错位的文件年份/同步机制，交代项目停工与周接受调查，同时保留拆迁、租户安置、赔偿和终局责任未决；这些现实未决不作为续集钩子。

### 2026-09-01 — Chapter 8 DRAFTED and state updated
- **Draft:** `drafts/chapter-08.md`《水位线》，覆盖 2026-09-02 06:40、六周后听证及听证后一周的重开泵站，完成结局。
- **Beats hit:** 许限定伤情/时间表；原片写保护核验并复制三处；江/马/方/许各签所知；初版简报被多源证据纠正；名录错位原因查明；六周听证落实六名材料贡献与唐的证据边界；责任/安置仍未终局；整改后泵站重开；唐放下手机扶戚过门槛。
- **Tracker changes:** 更新八名角色结局、图筒/手机/原片卡/新录音/钥匙维护册、名录年份与同步缺口、项目/调查状态、共同版本目录和泵站整改结果。
- **Thread changes:** 关闭 T4/T7/T9/T11/T14；无新线程，Active 归零。T2 已在 Ch. 7 关闭，本章只把其材料送入正式程序。
- **Other Canon owners:** 无需更新；六周内只写调查启动和程序编号，未越权写终审判决。重开站的整改结果属于终章已发生事实，已同步 tracker。
- **Files changed before verification:** `drafts/chapter-08.md`、`continuity/tracker.md`、`continuity/threads.md`、`continuity/changelog.md`、`test-run/context-read-log.md`。
- **Verification:** PASS。重新读取正文、tracker 与 threads；逐项定位八人点名、伤情时间表、只读原始目录、写保护复制/三名保管人、限定证词、通报纠正、名录年份/同步缺口、听证行动、未决边界、旧图撤换、放下手机和无旁白水位线。
- **Continuity checks:** 图筒三份材料、原片卡、新口供分别登记；破手机与戚的听力/左腿持续，未虚构伤势自动消失。2023 社区图/2025 设施库错位有明确机制与整改；项目停工和调查启动不等于判决，拆迁/安置/赔偿仍标为现实未决。
- **Character/voice checks:** 全章限唐晓满，以取景框、素材来源、时间码和剪辑选择组织注意；她从先剪片转为只读存证、限定证据边界，最后放下手机扶人。江、陈、方、戚、马、许、周均有可观察收束，八人未被写成和睦朋友。
- **Length check:** 首次核验约 1,296 个汉字；补足唐暂停剪辑及新旧名录可观察整改，不增加新判决，最终约 1,492 个汉字。
- **Thread check:** Open/Active 均为“无”，T1–T14 各有文件化 closure；一次脚本检查因未包含标题括号而误报 Active 非空，人工读取与精确检查确认是测试表达式假阳性。
- **Full manuscript count:** 八章最终文件共约 13,145 个汉字（含章标题），位于 10,000–15,000 测试范围及 12,500–13,500 目标带内。
- 更新 `PROJECT.md`：初稿完成，进入 Phase 7 Full Reviews；下一步 Continuity Audit。

### 2026-09-01 — Phase 7A: Continuity Audit
- **实际读取：** `prompts/continuity-check.md`；`continuity/tracker.md`、`continuity/threads.md`；`world/rules.md`、`world/timeline.md`、`world/locations.md`；`characters/cast.md`；随后按数字顺序分批完整读取 Chapters 1–4、5–8。
- **缺失读取：** 无；本次问题均可由 cast/tracker/world/正文判定，无需追加个人档案。
- 创建 `continuity/audit-report.md`：8 章、4 项问题、0 Critical、2 Moderate、2 Minor。
- **Unresolved Canon conflict recorded:** `world/timeline.md` 将设施库变更定为 2026-06，Chapter 8 paragraph 12 与当前 tracker 定为 2025；两版来源并存，Revision Pass 前不擅自选择。
- **Unresolved rule/timeline discrepancy recorded:** Chapter 4 在约 20:45 预测两小时到平台，Chapter 6 接近 23:10 才触边，且泵尚未稳定；违反“预测偏差需物理原因”的软规则说明要求。
- **Additional findings:** Chapter 8 八人点名视频来源未在 Chapter 6 显式建立；Chapter 5 “外面的水压”推开防倒灌翻板的方向含混。
- 按 Continuity Audit prompt 未静默修正文或 Canon；四项均留待用户已授权的一次 Revision Pass 统一处理。
- 更新 `PROJECT.md`：Phase 7 下一步 Voice Consistency Check。

### 2026-09-01 — Phase 7B: Voice Consistency Check
- **实际读取：** `prompts/voice-check.md`、`style/voice-guide.md`、`style/samples.md`、八名主要角色完整档案；随后按数字顺序分批完整读取 Chapters 1–4、5–8。
- **缺失读取：** 无；批准样稿、指南与所有相关 Voice DNA 均可用。
- 创建 `style/consistency-report.md`；总体稳定，记录 2 Moderate、1 Minor 局部漂移，无 Major。
- **Findings:** Chapter 4 一句越过江澜直接宣布戚动机；Chapter 7 在井内全知苏琴派队细节；Chapter 8 paragraphs 9–17 制度摘要暂时挤出唐的取景框/收音注意方式。
- **Strongest voice:** Chapters 1、2、3、5、6。角色对白可辨度 8–9/10；没有普遍同声化或紫化。
- 按 Voice prompt 未修改正文；定点建议留待一次 Revision Pass。
- 更新 `PROJECT.md`：Phase 7 下一步 Reader Simulation。

### 2026-09-01 — Phase 7C: Reader Simulation (isolated input)
- **Routing:** 在读取任何普通状态前先读取 `prompts/reader-review.md` 与程序性 `docs/workflow.md`；随后只按数字顺序分批读取 Chapters 1–4、5–8，未把 PROJECT/world/characters/outline/continuity/style 或其他评审报告作为读者输入。
- **Isolation limitation:** 同一会话不能真实删除此前作者上下文；已在 `drafts/reader-report.md` 首节披露，不虚构“完全失忆”。
- 创建 `drafts/reader-report.md`：八章逐章清晰度、投入、节奏、情绪、问题、亮点与担忧，以及宏观节奏、角色排序、掉线、可预测性、情绪高低点和最终推荐结论。
- **Reader findings:** 核心线程无明显掉落；Chapter 5 投入最高；Chapter 6 前半程序感形成小低谷；Chapter 7 payoff 密集但有效；Chapter 8 听证中段偏事故后记摘要。读者另注意到点名视频来源与翻板受力措辞。
- Reader Simulation 期间未修改正文；报告完成后才恢复普通 bookkeeping。

### 2026-09-01 — Gate 7 passed; Phase 8 revision scope fixed
- 三项报告均已真实生成：`continuity/audit-report.md`、`style/consistency-report.md`、`drafts/reader-report.md`。
- 用户原始任务已明确要求“根据报告执行一次 Revision Pass，不要无限优化”，因此无需再次请求 Gate 授权；合理默认是合并重叠问题，执行一次定点修订。
- **Authorized scope:** 修复 Canon 年份、水位预测、翻板方向、点名视频来源、Ch. 4/7 POV 越界与 Ch. 8 制度摘要；允许同步受影响的 tracker/world timeline/changelog。保持八章结构、结局、角色责任分配和未决制度边界。
- **No expansion:** 不添加新情节线、不改 Workflow/架构、不重写整部小说；Ch. 6 程序感仅在不破坏高潮整队功能时微调。
- 更新 `PROJECT.md`：Reviews complete，进入 Phase 8 Revision；下一步读取 revision prompt 并写修订策略。

### 2026-09-01 — Phase 8 revision strategy (pre-edit)
- **实际读取：** `prompts/revision-pass.md`；`PROJECT.md`；三份评审报告；`continuity/tracker.md`、`continuity/threads.md` 与本 changelog；`style/voice-guide.md`、`style/samples.md`；`world/timeline.md`、`world/rules.md`；受影响 Chapters 4–8 的 Scene Cards、正文与对应 POV 角色档案。
- **Canon choice:** `world/timeline.md` 是设施状态时间的 Canon owner，明确记录 2026-06 改为“待迁改备用”；Chapter 8、tracker 与 T9 的 2025 是下游错写。本次保留 Canon owner，修正下游文件，不修改 world timeline。
- **What is changing:** Ch. 4 将平台触水预测改为约两个半小时，并把对戚动机的直接断言改成江澜的限知判断；Ch. 5 澄清翻板由管内一侧受力推开；Ch. 6 显式建立防水袋内黑画面点名录像；Ch. 7 把轻装救援路径改由井外喊话提供，消除江澜不可能知道的调度细节；Ch. 8 以唐晓满看到的公示屏、投影与材料状态呈现制度信息，并统一设施变更时间为 2026-06。
- **What is staying:** 八章结构、全部 Scene Card 结果、生存因果链、角色责任分配、证据边界、现实未决事项与结尾动作不变；Ch. 6 必要的清点/风险复述功能保留，不扩写新场景或新线程。
- **Ripple effects:** 同步 tracker 中 Ch. 4 水位预测、唐手机录像来源与名录变更年份；同步 threads 中 T9 年份。Ch. 7 仅改变信息如何进入 POV，不改变外援路径事实。三份初稿评审报告保持原样，作为问题发现证据。
- **Continuity impact:** T1–T14 的开启/关闭状态不变，Open/Active 继续为零；world、characters、outline 和 style Canon 不需改动。用户原始任务已授权这一次有限修订及必要的状态传播。
- **Pass limit:** 仅执行本次合并 Revision Pass；完成后做定点检索、全文关联检索、场景节拍/声音/线程复核，不进入无限优化循环。

### 2026-09-01 — Phase 8 REVISED and verified
- **Revised in place:** `drafts/chapter-04.md` 至 `chapter-08.md`；未重建手稿，Chapters 1–3 无需修改。
- **Continuity report resolutions:** (1) 设施库年份依 Canon owner 统一为 2026-06，并同步 Chapter 8、tracker、T9；(2) Ch. 4 平台触水预测改为约两个半小时，与 Ch. 6 约 23:10 触边一致；(3) Ch. 6 明写黑画面点名录像并在周竞承认前停录，补足 Ch. 8 来源；(4) Ch. 5 改为腰背与管内积水顶开翻板，消除受力方向歧义。
- **Voice report resolutions:** Ch. 4 将戚留钥匙的动机改为江澜的当下理解；Ch. 7 的调度/徒步/定位信息全部由井外郑梁喊话传入江澜限知；Ch. 8 的通报、名录错位和未结事项改由公示屏、并排投影、手机取景与共享目录呈现。
- **Reader report response:** 修复读者同样注意到的翻板和点名录像问题；保留 Ch. 6 必要的资源/职责重置，仅以录像动作增加人物在场感；Ch. 8 摘要段落已场景化。Ch. 7 payoff 密度、完整高潮和结局结果不改。
- **State propagation:** 更新 `continuity/tracker.md` 的唐晓满手机、水位预测和名录年份；更新 `continuity/threads.md` 的 T7/T9。T1–T14 关闭状态不变，Open/Active 均为无。
- **No-change declarations:** `world/timeline.md` 已是正确 Canon，无改动；world 其余文件、characters、outline、style Canon 与 Chapters 1–3 均无变化；三份初稿评审报告保持原样。
- **Verification:** PASS。全文复读所有修改段；活动正文/状态中检索不到旧年份、旧两小时预测、旧翻板受力措辞或两处 POV 越界句。2026-06 在 world timeline、Chapter 8、tracker、T9 一致；Ch. 6 录像在周竞发言前明确停止；Ch. 7 路径事实只经可听喊话进入 POV。
- **Scene/voice/thread check:** 所有原 Scene Card beats、开头/结尾钩子、伤势、物件归属、泵/旁通因果与现实未决边界保持；唐的终章 Voice 恢复为取景/材料边界；无新线程。
- **Length:** 修订后 Chapters 1–8 汉字数依次为 1,509 / 1,580 / 1,660 / 1,594 / 1,753 / 1,765 / 1,842 / 1,596，共 13,299，仍在 10,000–15,000 要求与 12,500–13,500 目标带内。
- 更新 `PROJECT.md`：Phase 8 Revision complete；Gate 8 PASS。依约不再开启第二轮 Revision。
