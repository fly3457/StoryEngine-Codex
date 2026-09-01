#!/usr/bin/env node
'use strict';

const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

const SOURCE_FILES = [
  'compiled_blueprint.json',
  'manifest.json',
  'validation_report.json',
  'genesis_validation_report.json',
  'world_fabric_report.json',
];

function problem(message) {
  throw new Error(message);
}

function objectAt(value, label) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    problem(`${label} must be an object`);
  }
  return value;
}

function arrayAt(value, label) {
  if (!Array.isArray(value)) problem(`${label} must be an array`);
  return value;
}

function stringAt(value, label) {
  if (typeof value !== 'string' || value.trim() === '') problem(`${label} must be a non-empty string`);
  return value;
}

function same(label, ...values) {
  if (values.some(value => value === undefined) || new Set(values).size !== 1) {
    problem(`${label} mismatch: ${values.map(value => JSON.stringify(value)).join(' != ')}`);
  }
}

function uniqueIds(items, field, label) {
  const ids = new Set();
  for (const [index, item] of items.entries()) {
    objectAt(item, `${label}[${index}]`);
    const id = stringAt(item[field], `${label}[${index}].${field}`);
    if (ids.has(id)) problem(`${label} contains duplicate ${field}: ${id}`);
    ids.add(id);
  }
  return ids;
}

function sha256(buffer) {
  return crypto.createHash('sha256').update(buffer).digest('hex');
}

function readJson(seedDir, name) {
  const file = path.join(seedDir, name);
  let stat;
  try {
    stat = fs.lstatSync(file);
  } catch {
    problem(`missing required seed file: ${name}`);
  }
  if (!stat.isFile() || stat.isSymbolicLink()) problem(`seed input must be a regular file: ${name}`);
  const raw = fs.readFileSync(file);
  let value;
  try {
    value = JSON.parse(raw.toString('utf8').replace(/^\uFEFF/, ''));
  } catch (error) {
    problem(`invalid JSON in ${name}: ${error.message}`);
  }
  return { name, raw, hash: sha256(raw), value };
}

function validateReport(report, name) {
  objectAt(report, name);
  const errors = arrayAt(report.errors, `${name}.errors`);
  arrayAt(report.warnings, `${name}.warnings`);
  if (report.ok !== true || errors.length > 0) {
    problem(`${name} did not pass validation`);
  }
}

function validateInputs(inputs) {
  const compiled = objectAt(inputs.compiled_blueprint.value, 'compiled_blueprint.json');
  const document = objectAt(compiled.blueprint_document, 'blueprint_document');
  const blueprint = objectAt(document.blueprint, 'blueprint_document.blueprint');
  const compiledMetadata = objectAt(compiled.compiled_metadata, 'compiled_metadata');

  const manifestFile = objectAt(inputs.manifest.value, 'manifest.json');
  const manifest = objectAt(manifestFile.manifest, 'manifest');
  const manifestMetadata = objectAt(manifestFile.manifest_metadata, 'manifest_metadata');
  const blueprintRef = objectAt(manifest.blueprint_ref, 'manifest.blueprint_ref');

  const fabric = objectAt(inputs.world_fabric_report.value, 'world_fabric_report.json');
  const fabricBlueprint = objectAt(fabric.blueprint, 'world_fabric_report.blueprint');

  validateReport(inputs.validation_report.value, 'validation_report.json');
  validateReport(inputs.genesis_validation_report.value, 'genesis_validation_report.json');
  if (fabric.fabric_ok !== true) problem('world_fabric_report.json did not pass validation');

  same('blueprint id', stringAt(blueprint.id, 'blueprint.id'),
    stringAt(compiledMetadata.blueprint_id, 'compiled_metadata.blueprint_id'),
    stringAt(blueprintRef.id, 'manifest.blueprint_ref.id'),
    stringAt(fabricBlueprint.id, 'world_fabric_report.blueprint.id'));
  same('blueprint version', stringAt(blueprint.version, 'blueprint.version'),
    stringAt(compiledMetadata.blueprint_version, 'compiled_metadata.blueprint_version'),
    stringAt(blueprintRef.version, 'manifest.blueprint_ref.version'),
    stringAt(fabricBlueprint.version, 'world_fabric_report.blueprint.version'));
  same('schema version', stringAt(blueprint.schema_version, 'blueprint.schema_version'),
    stringAt(compiledMetadata.schema_version, 'compiled_metadata.schema_version'),
    stringAt(blueprintRef.schema_version, 'manifest.blueprint_ref.schema_version'));
  same('blueprint hash', stringAt(compiledMetadata.blueprint_hash, 'compiled_metadata.blueprint_hash'),
    stringAt(blueprintRef.hash, 'manifest.blueprint_ref.hash'),
    stringAt(fabricBlueprint.hash, 'world_fabric_report.blueprint.hash'));
  if (fabric.run_id !== undefined) {
    same('run id', stringAt(manifestMetadata.run_id, 'manifest_metadata.run_id'),
      stringAt(fabric.run_id, 'world_fabric_report.run_id'));
  }

  const designIntent = objectAt(document.design_intent, 'design_intent');
  for (const field of ['content_constraints', 'genres', 'human_non_negotiables', 'themes', 'tone']) {
    arrayAt(designIntent[field], `design_intent.${field}`);
  }
  const worldGraph = objectAt(document.world_graph, 'world_graph');
  const nodeIds = uniqueIds(arrayAt(worldGraph.nodes, 'world_graph.nodes'), 'id', 'world_graph.nodes');
  const routes = arrayAt(worldGraph.routes, 'world_graph.routes');
  uniqueIds(routes, 'id', 'world_graph.routes');
  for (const route of routes) {
    if (!nodeIds.has(route.from) || !nodeIds.has(route.to)) {
      problem(`route ${route.id} references an unknown world node`);
    }
  }
  const factions = arrayAt(document.factions, 'factions');
  const factionIds = uniqueIds(factions, 'id', 'factions');
  const population = objectAt(document.population, 'population');
  const keyCharacters = arrayAt(population.key_characters, 'population.key_characters');
  const characterIds = uniqueIds(keyCharacters, 'id', 'population.key_characters');
  for (const character of keyCharacters) {
    if (!nodeIds.has(character.location_id)) problem(`character ${character.id} has an unknown location`);
    if (!factionIds.has(character.faction_id)) problem(`character ${character.id} has an unknown faction`);
  }
  const narrative = objectAt(document.narrative, 'narrative');
  for (const field of ['anchors', 'conflict_topology', 'end_conditions', 'mission_seeds', 'pressure_channels', 'secrets']) {
    arrayAt(narrative[field], `narrative.${field}`);
  }
  const secretIds = uniqueIds(narrative.secrets, 'id', 'narrative.secrets');
  for (const secret of narrative.secrets) {
    for (const knower of arrayAt(secret.initial_knowers, `secret ${secret.id}.initial_knowers`)) {
      if (!characterIds.has(knower)) problem(`secret ${secret.id} references unknown knower ${knower}`);
    }
  }

  const characterManifests = arrayAt(manifest.character_manifests, 'manifest.character_manifests');
  const manifestCharacterIds = uniqueIds(characterManifests, 'character_id', 'manifest.character_manifests');
  if (manifestCharacterIds.size !== characterIds.size || [...characterIds].some(id => !manifestCharacterIds.has(id))) {
    problem('manifest characters do not match blueprint key characters');
  }
  const souls = arrayAt(manifest.agent_souls, 'manifest.agent_souls');
  const soulCharacterIds = uniqueIds(souls, 'character_id', 'manifest.agent_souls');
  if ([...characterIds].some(id => !soulCharacterIds.has(id))) problem('manifest is missing a character interior seed');
  for (const memory of arrayAt(manifest.initial_agent_memories, 'manifest.initial_agent_memories')) {
    if (!characterIds.has(memory.character_id)) problem(`memory references unknown character ${memory.character_id}`);
    if (memory.source_secret_id && !secretIds.has(memory.source_secret_id)) {
      problem(`memory references unknown secret ${memory.source_secret_id}`);
    }
  }
  objectAt(manifest.initial_state, 'manifest.initial_state');
  objectAt(manifest.resolved_variables, 'manifest.resolved_variables');

  const counts = fabric.counts && typeof fabric.counts === 'object' ? fabric.counts : {};
  for (const [field, actual] of [
    ['world_nodes', worldGraph.nodes.length], ['routes', routes.length], ['factions', factions.length],
    ['characters', keyCharacters.length], ['secrets', narrative.secrets.length],
  ]) {
    if (counts[field] !== undefined && counts[field] !== actual) {
      problem(`world_fabric_report count mismatch for ${field}`);
    }
  }

  return { document, blueprint, compiledMetadata, manifest, manifestMetadata, fabric };
}

function clean(value) {
  return String(value ?? '').replace(/\r\n?/g, '\n').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .trim();
}

function inline(value) {
  return clean(value).replace(/\s+/g, ' ').replace(/`/g, '\\`');
}

function list(values, fallback = '（无）') {
  if (!Array.isArray(values) || values.length === 0) return `- ${fallback}`;
  return values.map(value => `- ${inline(value)}`).join('\n');
}

function names(values) {
  return Array.isArray(values) && values.length ? values.map(inline).join('、') : '无';
}

function compact(value) {
  if (value === null) return 'null';
  if (Array.isArray(value)) return value.map(compact).join('、');
  if (value && typeof value === 'object') {
    return Object.keys(value).sort().map(key => `${inline(key)}=${compact(value[key])}`).join('；');
  }
  if (typeof value === 'boolean') return value ? 'true' : 'false';
  return inline(value);
}

function duration(seconds) {
  if (!Number.isFinite(seconds)) return inline(seconds);
  let rest = Math.trunc(seconds);
  const days = Math.floor(rest / 86400);
  rest %= 86400;
  const hours = Math.floor(rest / 3600);
  rest %= 3600;
  const minutes = Math.floor(rest / 60);
  const secs = rest % 60;
  const parts = [];
  if (days) parts.push(`${days}天`);
  if (hours) parts.push(`${hours}小时`);
  if (minutes) parts.push(`${minutes}分`);
  if (secs || parts.length === 0) parts.push(`${secs}秒`);
  return `${seconds} 秒（${parts.join('')}）`;
}

function renderSeed(inputs, data) {
  const { document, blueprint, compiledMetadata, manifest, manifestMetadata, fabric } = data;
  const intent = document.design_intent;
  const graph = document.world_graph;
  const narrative = document.narrative;
  const biographies = new Map((manifest.biography_facts || document.population.biography_facts || [])
    .map(fact => [fact.id, fact]));
  const characterManifests = new Map(manifest.character_manifests.map(character => [character.character_id, character]));
  const souls = new Map(manifest.agent_souls.map(soul => [soul.character_id, soul]));
  const motivations = new Map((manifest.initial_motivation_seeds || [])
    .map(item => [item.character_id, item.motivations || []]));
  const memories = new Map();
  for (const memory of manifest.initial_agent_memories) {
    if (!memories.has(memory.character_id)) memories.set(memory.character_id, []);
    memories.get(memory.character_id).push(memory);
  }
  const relationships = manifest.initial_state.relationships || [];
  const lines = [];
  const add = (...values) => lines.push(...values);

  add(`# STORY SEED — ${inline(blueprint.title)}`, '',
    '> 本文件由可选 Seed 启动入口生成，是用户提供的创作输入，不是 StoryEngine Canon，',
    '> 也不表示 PROJECT、世界、人物、结构或任何 Review Gate 已获批准。', '',
    '## 导入与验真', '',
    `- **Blueprint:** ${inline(blueprint.id)} @ ${inline(blueprint.version)}（schema ${inline(blueprint.schema_version)}）`,
    `- **Blueprint Hash:** \`${inline(compiledMetadata.blueprint_hash)}\``,
    `- **Run ID:** ${inline(manifestMetadata.run_id)}`,
    `- **Root Seed:** ${inline(manifest.root_seed)}`,
    `- **Source Status:** ${inline(blueprint.status)}；只表示来源工具状态，不是 StoryEngine Gate 批准`,
    `- **Validation:** blueprint=PASS；genesis=PASS；world fabric=${fabric.fabric_ok ? 'PASS' : 'FAIL'}`,
    `- **Counts:** ${compact(fabric.counts || {})}`,
    '- **Imported source files:**');
  for (const name of SOURCE_FILES) add(`  - \`${name}\` — SHA-256 \`${inputs[name.replace(/\.json$/, '')].hash}\``);

  add('', '## 约束与使用规则', '',
    '- AUTHORING/fixed 事实、内容限制、世界法则、人物内核与秘密知识边界必须保留，除非导演明确修改 Canon。',
    '- Manifest 的 tick-0 解析值默认作为故事开篇事实；抽象指标应转译为可感知状态，不要求在正文直接展示小数。',
    '- 压力机制、揭示路径、使命和候选终局是结构素材，不是假定已经发生的事实。',
    '- Phase 1–4 应把采用的内容逐步写入现有标准文件并分别通过 Review Gate；Phase 5 起只依赖已批准的标准 Canon。',
    '- 本文件不引入模拟运行器、结构化故事状态或第二套批准账本。', '',
    '### 内容限制', '', list(intent.content_constraints), '',
    '### 导演级不可妥协项', '', list(intent.human_non_negotiables), '',
    '## Phase 1 — Conception 输入', '',
    `- **Working Title:** ${inline(blueprint.title)}`,
    `- **Premise:** ${inline(blueprint.premise)}`,
    `- **Language:** ${inline(blueprint.language)}`,
    `- **Genres:** ${names(intent.genres)}`,
    `- **Themes:** ${names(intent.themes)}`,
    `- **Tone:** ${names(intent.tone)}`,
    `- **World Mode:** ${inline(blueprint.world_mode)}`);
  if (intent.target_run) {
    add(`- **Source Run Horizon:** ${duration(intent.target_run.target_world_duration_seconds)}`,
      `- **Source Key Character Count:** ${inline(intent.target_run.key_character_count)}`);
  }

  add('', '## Phase 2 — World Building 输入', '', '### 世界节点', '');
  for (const node of graph.nodes) {
    add(`- **${inline(node.name)}**（\`${inline(node.id)}\`，${inline(node.type)}）— ${inline(node.description)}` +
      `${node.parent_id ? `；上级：\`${inline(node.parent_id)}\`` : ''}`);
  }
  add('', '### 路线与空间约束', '');
  for (const route of graph.routes) {
    add(`- \`${inline(route.id)}\`: \`${inline(route.from)}\` → \`${inline(route.to)}\`；` +
      `${route.bidirectional ? '双向' : '单向'}；行程 ${duration(route.travel_duration_seconds)}`);
  }
  add('', '### 世界法则', '');
  for (const [section, rules] of Object.entries(document.world_laws)) add(`- **${inline(section)}:** ${compact(rules)}`);
  add('', '### 势力', '');
  for (const faction of document.factions) {
    add(`#### ${inline(faction.name)}（\`${inline(faction.id)}\`）`, '', inline(faction.identity), '',
      `- **目标:** ${names(faction.objectives)}`, `- **资源:** ${names(faction.resources)}`, '');
  }
  add('### 开篇世界状态（tick 0）', '',
    `- **Resolved Variables:** ${compact(manifest.resolved_variables)}`,
    `- **Globals:** ${compact(manifest.initial_state.globals)}`,
    `- **Resources:** ${compact(manifest.initial_state.resources)}`,
    `- **Winter Onset:** ${duration(manifest.initial_state.globals.winter_onset_world_time_seconds)}`,
    `- **Contaminated Batch Truth:** ${compact(manifest.initial_state.globals.contaminated_batch_real)}`,
    '- **Relationships:**');
  for (const relation of relationships) {
    add(`  - \`${inline(relation.from)}\` → \`${inline(relation.to)}\`: ${inline(relation.type)}，强度 ${inline(relation.intensity)}`);
  }
  for (const group of manifest.aggregate_groups || []) {
    add(`- **Aggregate Population \`${inline(group.id)}\`:** 地点 \`${inline(group.location_id)}\`；` +
      `人口 ${inline(group.population)}；属性 ${compact(group.properties || {})}`);
  }
  for (const slot of manifest.supporting_character_slots || []) {
    add(`- **Supporting Slot \`${inline(slot.id)}\`:** ${inline(slot.archetype)}；数量 ${compact(slot.count)}；` +
      `地点 \`${inline(slot.location_id)}\``);
  }
  add('', '### 压力通道', '');
  for (const pressure of narrative.pressure_channels) {
    add(`#### ${inline(pressure.name)}（\`${inline(pressure.id)}\`）`, '',
      `- **初始 / 临界:** ${inline(pressure.initial_level)} / ${inline(pressure.critical_threshold)}`,
      `- **影响节点:** ${names(pressure.affected_nodes)}`,
      `- **增长:** ${compact(pressure.growth)}`,
      `- **表现:** ${pressure.manifestations.map(item => `${item.id}（条件 ${compact(item.when)}；效果 ${compact(item.world_effects)}）`).join('；')}`,
      `- **缓解条件:** ${compact(pressure.relief_conditions)}`, '');
  }
  add('### 秘密真值与初始知情边界', '');
  for (const secret of narrative.secrets) {
    add(`#### ${inline(secret.id)}`, '', `- **真值:** ${inline(secret.truth)}`,
      `- **初始知情人:** ${names(secret.initial_knowers)}`,
      `- **可能揭示路径:** ${names(secret.reveal_paths)}`, '');
  }

  add('## Phase 3 — Character Architecture 输入', '');
  for (const sourceCharacter of document.population.key_characters) {
    const character = characterManifests.get(sourceCharacter.id);
    const soul = souls.get(sourceCharacter.id);
    const characterMemories = memories.get(sourceCharacter.id) || [];
    const characterRelations = relationships.filter(item => item.from === sourceCharacter.id || item.to === sourceCharacter.id);
    add(`### ${inline(character.display_name)}（\`${inline(character.character_id)}\`）`, '',
      `- **Identity:** ${inline(character.identity)}`,
      `- **Occupation / Faction:** ${inline(character.occupation)} / \`${inline(character.faction_id)}\``,
      `- **Initial Location:** \`${inline(character.initial_location_id)}\``,
      `- **Capabilities:** ${names(character.capabilities)}`,
      `- **Opening Properties:** ${compact(character.world_properties)}`,
      `- **Core Beliefs:** ${names(soul.core_beliefs)}`,
      `- **Core Values:** ${names(soul.core_values)}`,
      `- **Core Desires:** ${names(soul.core_desires)}`,
      `- **Core Drives:** ${names(soul.core_drives)}`,
      `- **Core Fears:** ${names(soul.core_fears)}`,
      `- **Temperament:** ${names(soul.temperament)}`,
      `- **Decision Biases:** ${names(soul.decision_biases)}`,
      `- **Deep Attachments:** ${names(soul.deep_attachments)}`,
      `- **Moral Boundaries:** ${names(soul.moral_boundaries)}`,
      `- **Identity Narrative:** ${inline(soul.identity_narrative)}`,
      `- **Initial Motivations:** ${names(motivations.get(sourceCharacter.id) || sourceCharacter.initial_motivation_seed || [])}`,
      `- **Seed Relationships:** ${characterRelations.length ? characterRelations.map(compact).join('；') : '无'}`, '',
      '#### 传记事实', '');
    const facts = (character.biography_fact_ids || []).map(id => biographies.get(id)).filter(Boolean);
    if (facts.length === 0) add('- （无）');
    for (const fact of facts) {
      add(`- \`${inline(fact.id)}\`: ${inline(fact.fact)}（可见性 ${inline(fact.visibility)}）`);
    }
    add('', '#### 主观记忆与初始知识', '');
    if (characterMemories.length === 0) add('- （无）');
    for (const memory of characterMemories) {
      add(`- \`${inline(memory.memory_id)}\` [${inline(memory.memory_type)}/${inline(memory.access_mode)}]：` +
        `${inline(memory.subjective_content)}（confidence ${inline(memory.confidence)}；` +
        `${memory.source_secret_id ? `secret \`${inline(memory.source_secret_id)}\`` : `fact \`${inline(memory.source_fact_id)}\``}）`);
    }
    add('');
  }

  add('## Phase 4 — Structural Outlining 输入', '', '### 核心使命', '');
  for (const mission of narrative.mission_seeds) add(`- \`${inline(mission.id)}\`: ${inline(mission.mandate)}`);
  add('', '### 冲突拓扑', '');
  for (const conflict of narrative.conflict_topology) {
    add(`- \`${inline(conflict.id)}\`: \`${inline(conflict.from)}\` → \`${inline(conflict.to)}\`；` +
      `${inline(conflict.type)}；主题“${inline(conflict.subject)}”；强度 ${inline(conflict.intensity)}`);
  }
  add('', '### 时间锚点与世界期限', '');
  for (const anchor of narrative.anchors) {
    add(`- \`${inline(anchor.id)}\` ${inline(anchor.name)}：${duration(anchor.activation_window.start_world_time_seconds)} 至 ` +
      `${duration(anchor.activation_window.end_world_time_seconds)}；效果 ${compact(anchor.pressure_effects)}`);
  }
  if (narrative.world_horizon) {
    add(`- **Soft Horizon:** ${duration(narrative.world_horizon.soft_world_time_seconds)}`,
      `- **Hard Horizon:** ${duration(narrative.world_horizon.hard_world_time_seconds)}`);
  }
  add('', '### 候选终局（均未发生）', '');
  for (const ending of narrative.end_conditions) {
    add(`- **${inline(ending.name)}**（\`${inline(ending.id)}\` / ${inline(ending.classification)}）：` +
      `${inline(ending.summary)}；条件 ${compact(ending.when)}`);
  }

  add('', '## 仍需由原流程完成的创作决策', '',
    '- Phase 1：目标篇幅、目标读者、比较作品，以及最终 logline。',
    '- Phase 2：具体时代感、感官氛围、技术日常、历史年表与故事日历表达。',
    '- Phase 3：年龄、外貌、故事功能、POV 分配、人物弧线、Voice DNA、关键场景与完整关系动态。',
    '- Phase 4：唯一采用的终局方向、章节数、幕结构、转折、Scene Card、伏笔期限与逐章篇幅。',
    '- Phase 5：三份 300–500 词候选样稿、最终叙事距离、句法节奏、母题和批准样稿。', '',
    '## 未采用的同目录材料', '',
    '- `snapshot.tick-0.json`、`world_state.tick-0.json`、`agent_state.tick-0.json`：与 manifest 的相关状态重复。',
    '- `run_config.json`：与 blueprint 的叙事和规则配置重复。',
    '- `world_overview.txt`：只作人类速览，信息不完整。',
    '- `reservation_registry.json`、`run_metadata.json`、`blueprint.lock.json`：运行器标识、哈希和重建账本。',
    '- 其他运行器组件说明不进入小说 Canon。', '');
  return lines.join('\n');
}

function writeExclusive(target, content) {
  if (fs.existsSync(target)) {
    const existing = fs.readFileSync(target, 'utf8').replace(/\r\n/g, '\n');
    if (existing === content) return false;
    problem('STORY_SEED.md already exists with different content; refusing to overwrite');
  }
  let handle;
  try {
    handle = fs.openSync(target, 'wx');
    fs.writeFileSync(handle, content, 'utf8');
    fs.fsyncSync(handle);
  } catch (error) {
    if (handle !== undefined) {
      try { fs.closeSync(handle); } catch {}
      handle = undefined;
      try { fs.unlinkSync(target); } catch {}
    }
    throw error;
  } finally {
    if (handle !== undefined) fs.closeSync(handle);
  }
  return true;
}

function main(argv = process.argv.slice(2), root = process.cwd()) {
  if (argv.length !== 1) problem('usage: npm run init:seed -- <seed-directory>');
  const projectFile = path.join(root, 'PROJECT.md');
  if (!fs.existsSync(projectFile) || !fs.statSync(projectFile).isFile()) {
    problem('run from a complete StoryEngine-Codex project root (PROJECT.md is required)');
  }
  const seedDir = path.resolve(root, argv[0]);
  let seedStat;
  try { seedStat = fs.lstatSync(seedDir); } catch { problem('seed directory does not exist'); }
  if (!seedStat.isDirectory() || seedStat.isSymbolicLink()) problem('seed input must be a regular directory');

  const inputs = {};
  for (const name of SOURCE_FILES) inputs[name.replace(/\.json$/, '')] = readJson(seedDir, name);
  const data = validateInputs(inputs);
  const content = renderSeed(inputs, data);
  const target = path.join(root, 'STORY_SEED.md');
  const created = writeExclusive(target, content);
  process.stdout.write(created
    ? `Created STORY_SEED.md from ${path.basename(seedDir)}; no Canon or Review Gate was changed.\n`
    : 'STORY_SEED.md already matches this seed; no changes made.\n');
}

if (require.main === module) {
  try {
    main();
  } catch (error) {
    process.stderr.write(`Error: ${error.message}\n`);
    process.exitCode = 1;
  }
}

module.exports = { SOURCE_FILES, main, readJson, renderSeed, validateInputs };
