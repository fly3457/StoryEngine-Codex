# STORY SEED — 灰港

> 本文件由可选 Seed 启动入口生成，是用户提供的创作输入，不是 StoryEngine Canon，
> 也不表示 PROJECT、世界、人物、结构或任何 Review Gate 已获批准。

## 导入与验真

- **Blueprint:** gray_harbor @ 0.3.0（schema 0.3）
- **Blueprint Hash:** `89d629fb5e2281fd3d45acefe5c518d39aaddb1e7c6a51f01321776255157b96`
- **Run ID:** gray-harbor-rerun-20260901
- **Root Seed:** 20260901
- **Source Status:** approved；只表示来源工具状态，不是 StoryEngine Gate 批准
- **Validation:** blueprint=PASS；genesis=PASS；world fabric=PASS
- **Counts:** aggregate_populations=1；anchors=1；characters=4；conflicts=2；end_conditions=3；factions=4；global_reservations=55；global_state_keys=5；missions=1；pressure_channels=3；resources=3；routes=5；secrets=2；world_nodes=7
- **Imported source files:**
  - `compiled_blueprint.json` — SHA-256 `67a8ba50790d3e8b38060fa7f9fc7e33647f1f4bcc3c61f9cffa7a2fa01a06e3`
  - `manifest.json` — SHA-256 `6daa3a2d107c74d50443d3e06b34954a4c89774efa8aa4e6189009a614f36f82`
  - `validation_report.json` — SHA-256 `09322f32174a39251bd209c5fbea4305dfe0b6df636c771478e807021d162508`
  - `genesis_validation_report.json` — SHA-256 `09322f32174a39251bd209c5fbea4305dfe0b6df636c771478e807021d162508`
  - `world_fabric_report.json` — SHA-256 `79c0a6fb6eaf7e75053fc79afad744328aaab01b3a2d3bebe662598416847295`

## 约束与使用规则

- AUTHORING/fixed 事实、内容限制、世界法则、人物内核与秘密知识边界必须保留，除非导演明确修改 Canon。
- Manifest 的 tick-0 解析值默认作为故事开篇事实；抽象指标应转译为可感知状态，不要求在正文直接展示小数。
- 压力机制、揭示路径、使命和候选终局是结构素材，不是假定已经发生的事实。
- Phase 1–4 应把采用的内容逐步写入现有标准文件并分别通过 Review Gate；Phase 5 起只依赖已批准的标准 Canon。
- 本文件不引入模拟运行器、结构化故事状态或第二套批准账本。

### 内容限制

- 不使用真实人物或真实政治组织
- 不把任何群体设定为天生邪恶

### 导演级不可妥协项

- 灰港危机来自结构性依赖，不存在杀掉一个坏人即可解决的问题
- Pressure 必须先改变 World，再由 Perception 进入角色
- Character 与 Agent 分离
- BiographyFact 与 Memory 分离
- Genesis 不预写完整 Goal / Plan

## Phase 1 — Conception 输入

- **Working Title:** 灰港
- **Premise:** 依赖老矿维持供暖与贸易的北方港镇，在严冬封锁前同时面对矿脉枯竭、 救济款争议、药品风险和制度合法性下降。
- **Language:** zh-CN
- **Genres:** political_drama、mystery、survival
- **Themes:** 共同体生存、真相与秩序、私人承诺与公共责任
- **Tone:** restrained、tense、morally_ambiguous
- **World Mode:** dramatic_sandbox
- **Source Run Horizon:** 2592000 秒（30天）
- **Source Key Character Count:** 4

## Phase 2 — World Building 输入

### 世界节点

- **灰港世界**（`gray_harbor_world`，world）— 被严冬交通条件逐步隔绝的北方沿海区域。
- **灰港镇**（`gray_harbor`，settlement）— 依靠煤矿与港口转运维持的封闭港镇。；上级：`gray_harbor_world`
- **议事厅**（`council_hall`，location）— 行政、档案与配给决策中心。；上级：`gray_harbor`
- **旧港区**（`old_port`，location）— 正式贸易与夜间非正式交易交叠的港区。；上级：`gray_harbor`
- **矿工区**（`mine_district`，location）— 矿工家庭与矿井入口所在区域。；上级：`gray_harbor`
- **深层矿井**（`deep_mine`，location）— 地质状况已经明显恶化的深层矿区。；上级：`mine_district`
- **灰港诊所**（`clinic`，location）— 唯一具备复杂手术和药品储藏能力的诊所。；上级：`gray_harbor`

### 路线与空间约束

- `route_council_port`: `council_hall` → `old_port`；双向；行程 900 秒（15分）
- `route_council_mine`: `council_hall` → `mine_district`；双向；行程 1800 秒（30分）
- `route_mine_deep`: `mine_district` → `deep_mine`；双向；行程 1200 秒（20分）
- `route_council_clinic`: `council_hall` → `clinic`；双向；行程 900 秒（15分）
- `route_port_clinic`: `old_port` → `clinic`；双向；行程 1200 秒（20分）

### 世界法则

- **economy:** free_resource_creation=false；resource_conservation=true
- **information:** instant_global_communication=false；secrets_default_hidden=true
- **mortality:** death_is_canonical=true；reversible=false
- **space:** movement_requires_route=true；simultaneous_presence_requires_same_location=true
- **time:** calendar=gray_harbor_winter_countdown；world_time_unit=second

### 势力

#### 灰港议事会（`town_council`）

维持行政秩序、配给制度与对外信用的正式治理机构。

- **目标:** 避免秩序崩溃、保持配给系统运作
- **资源:** records、permits、legitimacy

#### 矿工互助会（`miners_guild`）

由矿工家庭、维修工和仓库人员组成的互助与谈判组织。

- **目标:** 保护矿工家庭、避免无补偿停矿
- **资源:** labor、mine_knowledge、solidarity

#### 潮汐圣所（`tide_sanctuary`）

承担救济、照护和公共调解的地方机构。

- **目标:** 保护弱势居民、维持公共救济
- **资源:** volunteers、trust、kitchens

#### 夜潮网络（`night_tide_network`）

利用旧港与私人船只维持非正式贸易的松散网络。

- **目标:** 保持隐秘贸易路线、保护网络成员
- **资源:** boats、contacts、covert_trade

### 开篇世界状态（tick 0）

- **Resolved Variables:** contaminated_batch_real=true；initial_food_units=257；winter_onset_world_time_seconds=1819667
- **Globals:** contaminated_batch_real=true；council_legitimacy=0.58；public_fear=0.31；public_order=0.66；winter_onset_world_time_seconds=1819667
- **Resources:** coal=amount=410；unit=heating_unit；food=amount=257；unit=ration_crate；medicine=amount=48；unit=treatment_unit
- **Winter Onset:** 1819667 秒（21天1小时27分47秒）
- **Contaminated Batch Truth:** true
- **Relationships:**
  - `mayor_zhou` → `engineer_lin`: trusts，强度 0.42
  - `doctor_xu` → `smuggler_chen`: owes，强度 0.64
- **Aggregate Population `harbor_population`:** 地点 `gray_harbor`；人口 3900,4500；属性 public_fear=0.31
- **Supporting Slot `slot_dock_workers`:** dock_worker；数量 3、8；地点 `old_port`

### 压力通道

#### 资源压力（`resource_pressure`）

- **初始 / 临界:** 0.38 / 0.82
- **影响节点:** gray_harbor、old_port、mine_district、clinic
- **增长:** per_world_day=0.015
- **表现:** resource_pressure_ration_reduction（条件 pressure_at_least=0.6；效果 ration_availability_multiplier=0.82）；resource_pressure_market_price（条件 pressure_at_least=0.72；效果 market_food_price_multiplier=1.25）
- **缓解条件:** food_security_above=0.68

#### 信息压力（`information_pressure`）

- **初始 / 临界:** 0.27 / 0.74
- **影响节点:** gray_harbor
- **增长:** when_shortage_visible=0.06
- **表现:** information_pressure_rumor（条件 pressure_at_least=0.55；效果 rumor_event_probability_delta=0.15）
- **缓解条件:** trusted_shared_facts_established=true

#### 合法性压力（`legitimacy_pressure`）

- **初始 / 临界:** 0.31 / 0.78
- **影响节点:** council_hall、gray_harbor
- **增长:** when_secret_exposed=0.18
- **表现:** legitimacy_pressure_compliance（条件 pressure_at_least=0.65；效果 public_compliance_multiplier=0.85）
- **缓解条件:** credible_public_audit=true

### 秘密真值与初始知情边界

#### mine_exhaustion

- **真值:** 主矿脉可安全开采的剩余寿命远低于公开报告。
- **初始知情人:** engineer_lin
- **可能揭示路径:** 林栖主动提交报告、其他角色取得真实地质记录

#### relief_funds_diverted

- **真值:** 部分救济款被用于没有公开审批的紧急药品采购。
- **初始知情人:** mayor_zhou、smuggler_chen
- **可能揭示路径:** 完整审计议事会账目、经手人主动披露

## Phase 3 — Character Architecture 输入

### 周砺（`mayor_zhou`）

- **Identity:** 灰港市长兼议事会主持人，擅长维持脆弱联盟。
- **Occupation / Faction:** mayor / `town_council`
- **Initial Location:** `council_hall`
- **Capabilities:** negotiation、administration、permit_control
- **Opening Properties:** health=82；money=140；status=alive
- **Core Beliefs:** 失控会让脆弱共同体付出比不透明更大的代价、公共权力必须最终为后果负责
- **Core Values:** 秩序、灰港存续、承担公共责任
- **Core Desires:** 让灰港在自己任期内活过严冬
- **Core Drives:** 避免集体恐慌、修补制度合法性
- **Core Fears:** 公共秩序突然崩溃、自己的隐瞒造成不可逆伤亡
- **Temperament:** 克制、善于妥协、高压力下会控制信息
- **Decision Biases:** 公共风险巨大时偏向渐进披露、对不可逆制度崩溃高度厌恶
- **Deep Attachments:** 灰港本身、议事会制度
- **Moral Boundaries:** 不主动牺牲明确无辜者换取政治便利
- **Identity Narrative:** 我是负责把一个快要散架的共同体撑住的人，即使有时必须承担难看的决定。
- **Initial Motivations:** 确认冬季前还有多少真实可用资源、判断救济款问题还能隐瞒多久
- **Seed Relationships:** from=mayor_zhou；intensity=0.42；to=engineer_lin；type=trusts

#### 传记事实

- `fact_mayor_relief_decision`: 周砺曾批准把一部分救济款用于没有公开审批的紧急药品采购。（可见性 secret）

#### 主观记忆与初始知识

- `mem_mayor_relief_choice` [episodic/participant]：我记得自己签下那份没有公开审批的采购决定，当时没有更快的正式渠道。（confidence 1；fact `fact_mayor_relief_decision`）
- `belief_mayor_secret_purchase_necessary` [world_belief/inferred]：我仍相信那次秘密采购在当时避免了更大的医疗伤亡，但公开方式会决定它是否摧毁议事会。（confidence 0.78；fact `fact_mayor_relief_decision`）
- `mem_secret_relief_funds_diverted_mayor_zhou` [semantic/declared_initial_knowledge]：部分救济款被用于没有公开审批的紧急药品采购。（confidence 1；secret `relief_funds_diverted`）

### 林栖（`engineer_lin`）

- **Identity:** 灰港总工程师，负责矿井安全、产量报告和结构评估。
- **Occupation / Faction:** chief_engineer / `miners_guild`
- **Initial Location:** `deep_mine`
- **Capabilities:** engineering、risk_assessment、technical_evidence
- **Opening Properties:** health=76；money=90；status=alive
- **Core Beliefs:** 技术事实不会因为政治压力消失、专业判断必须能经受事后追问
- **Core Values:** 事实、专业责任、人命
- **Core Desires:** 让矿工在真相公开后仍有生计
- **Core Drives:** 阻止重大矿难、保存完整数据
- **Core Fears:** 自己的沉默造成群死群伤、家人被卷入报复
- **Temperament:** 精确、内疚、回避公开冲突
- **Decision Biases:** 面对技术风险时保守、面对公开冲突时倾向延迟
- **Deep Attachments:** 矿工家庭、专业声誉
- **Moral Boundaries:** 不伪造安全数据、不明知危险仍签署安全许可
- **Identity Narrative:** 我首先是工程师；如果事实被我亲手扭曲，我就失去了存在理由。
- **Initial Motivations:** 确认最危险巷道是否还能继续工作
- **Seed Relationships:** from=mayor_zhou；intensity=0.42；to=engineer_lin；type=trusts

#### 传记事实

- `fact_lin_mine_discovery`: 林栖在三个月前确认主矿脉可安全开采寿命远低于公开报告。（可见性 secret）

#### 主观记忆与初始知识

- `mem_lin_discovery` [episodic/participant]：我亲手核对了衰减曲线，主矿脉的安全寿命已经不是可以靠乐观估算延长的问题。（confidence 1；fact `fact_lin_mine_discovery`）
- `mem_secret_mine_exhaustion_engineer_lin` [semantic/declared_initial_knowledge]：主矿脉可安全开采的剩余寿命远低于公开报告。（confidence 1；secret `mine_exhaustion`）

### 陈默潮（`smuggler_chen`）

- **Identity:** 夜潮网络主要协调者，熟悉港区、外部联系人和非正式贸易。
- **Occupation / Faction:** network_coordinator / `night_tide_network`
- **Initial Location:** `old_port`
- **Capabilities:** covert_trade、route_knowledge、bargaining
- **Opening Properties:** health=88；money=210；status=alive
- **Core Beliefs:** 正式规则失效时人情网络才是实际秩序、欠下的救命人情不能只用钱结清
- **Core Values:** 自由、互惠、保护自己人
- **Core Desires:** 为夜潮成员换来合法生存空间
- **Core Drives:** 保持路线可用、证明夜潮网络对灰港有价值
- **Core Fears:** 网络被一次性清算、自己人被当成可牺牲品
- **Temperament:** 机敏、记恩、高风险偏好
- **Decision Biases:** 机会窗口短时倾向先行动后谈判、对制度承诺保持低信任
- **Deep Attachments:** 夜潮成员、旧港
- **Moral Boundaries:** 不主动出卖已经履行承诺的伙伴
- **Identity Narrative:** 我不是来维持漂亮规则的，我负责让真实的人在规则失效时还有路走。
- **Initial Motivations:** 无
- **Seed Relationships:** from=doctor_xu；intensity=0.64；to=smuggler_chen；type=owes

#### 传记事实

- `fact_mayor_relief_decision`: 周砺曾批准把一部分救济款用于没有公开审批的紧急药品采购。（可见性 secret）
- `fact_chen_saved_clinic`: 陈默潮曾在正式供应链断裂时通过夜潮网络向诊所送入一批急救药品。（可见性 private）

#### 主观记忆与初始知识

- `mem_chen_delivery` [episodic/participant]：那次正式渠道断掉时，是我把急救药送进诊所；徐澄没有问货从哪里来，先去救人。（confidence 1；fact `fact_chen_saved_clinic`）
- `mem_secret_relief_funds_diverted_smuggler_chen` [semantic/declared_initial_knowledge]：部分救济款被用于没有公开审批的紧急药品采购。（confidence 1；secret `relief_funds_diverted`）

### 徐澄（`doctor_xu`）

- **Identity:** 灰港唯一能独立完成复杂手术的医生，可跨多个阵营行动。
- **Occupation / Faction:** doctor / `tide_sanctuary`
- **Initial Location:** `clinic`
- **Capabilities:** medicine、triage、evidence_testing、cross_faction_access
- **Opening Properties:** health=73；money=55；status=alive
- **Core Beliefs:** 信息不足时应优先减少不可逆伤害、阵营身份不应决定紧急救治顺序
- **Core Values:** 生命、专业诚实、公平治疗
- **Core Desires:** 建立不被政治垄断的最低医疗秩序
- **Core Drives:** 维持诊所、查清药品风险
- **Core Fears:** 再次因为资源不足选择谁应该死、污染药品造成可避免伤害
- **Temperament:** 直接、疲惫、高责任感
- **Decision Biases:** 生命风险优先于政治关系、未确认风险时倾向先检测
- **Deep Attachments:** 诊所患者、医疗职业伦理
- **Moral Boundaries:** 不故意向患者隐瞒已确认的直接医疗风险
- **Identity Narrative:** 我的工作不是选择谁值得活，而是在资源不足时仍尽可能减少不可逆伤害。
- **Initial Motivations:** 确认夜潮药品批次是否安全
- **Seed Relationships:** from=doctor_xu；intensity=0.64；to=smuggler_chen；type=owes

#### 传记事实

- `fact_chen_saved_clinic`: 陈默潮曾在正式供应链断裂时通过夜潮网络向诊所送入一批急救药品。（可见性 private）
- `fact_xu_triage_winter`: 徐澄曾在上一场严冬中因药品不足被迫连续进行高风险分诊，并失去两名本可救治的患者。（可见性 private）

#### 主观记忆与初始知识

- `mem_xu_delivery` [episodic/participant]：我记得夜潮药品曾救过一批患者，因此我欠陈默潮人情，但这不代表下一批药一定安全。（confidence 1；fact `fact_chen_saved_clinic`）
- `mem_xu_winter_triage` [episodic/participant]：上一场严冬我因为药品不足失去了两名原本有机会救治的患者，我不愿再把风险拖到最后一刻。（confidence 1；fact `fact_xu_triage_winter`）

## Phase 4 — Structural Outlining 输入

### 核心使命

- `preserve_or_evacuate_gray_harbor`: 在严冬封锁前，使灰港形成可持续新秩序，或以可接受代价完成有序撤离。

### 冲突拓扑

- `conflict_council_mine`: `town_council` → `miners_guild`；depends_on；主题“煤炭与就业”；强度 0.78
- `conflict_council_night`: `town_council` → `night_tide_network`；distrusts；主题“非正式贸易与合法性”；强度 0.72

### 时间锚点与世界期限

- `anchor_winter_shortage` 严冬短缺压力：1296000 秒（15天） 至 2592000 秒（30天）；效果 resource_consumption_multiplier=1.2
- **Soft Horizon:** 2160000 秒（25天）
- **Hard Horizon:** 2592000 秒（30天）

### 候选终局（均未发生）

- **多方改革**（`ending_stable_reform` / stable_transformation）：多方建立新的贸易、配给与监督制度，灰港继续存在。；条件 stable_governance=true
- **有序撤离**（`ending_orderly_exodus` / exodus）：大多数居民通过组织化撤离保存下来。；条件 evacuation_completed_ratio_above=0.72
- **灰港崩溃**（`ending_collapse` / collapse）：灰港失去维持共同体的资源、制度或人口基础。；条件 public_order_below=0.12

## 仍需由原流程完成的创作决策

- Phase 1：目标篇幅、目标读者、比较作品，以及最终 logline。
- Phase 2：具体时代感、感官氛围、技术日常、历史年表与故事日历表达。
- Phase 3：年龄、外貌、故事功能、POV 分配、人物弧线、Voice DNA、关键场景与完整关系动态。
- Phase 4：唯一采用的终局方向、章节数、幕结构、转折、Scene Card、伏笔期限与逐章篇幅。
- Phase 5：三份 300–500 词候选样稿、最终叙事距离、句法节奏、母题和批准样稿。

## 未采用的同目录材料

- `snapshot.tick-0.json`、`world_state.tick-0.json`、`agent_state.tick-0.json`：与 manifest 的相关状态重复。
- `run_config.json`：与 blueprint 的叙事和规则配置重复。
- `world_overview.txt`：只作人类速览，信息不完整。
- `reservation_registry.json`、`run_metadata.json`、`blueprint.lock.json`：运行器标识、哈希和重建账本。
- 其他运行器组件说明不进入小说 Canon。
