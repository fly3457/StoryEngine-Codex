# 贡献指南

[简体中文](CONTRIBUTING.md) | [English](CONTRIBUTING.en.md)

感谢你愿意改进 StoryEngine-Codex。本项目既是可复用的小说工作流模板，也是一个经过契约测试的
Codex 移植项目。贡献应保持文件式状态、八阶段 Review Gate 和“用户是导演”的边界。

## 开始之前

- 安全漏洞不要提交公开 Issue；请遵循[安全政策](SECURITY.md)。
- 一般问题、文档错误和小型修复可以直接提交 Issue 或 Pull Request。
- 大型功能、协议变更或目录重构请先发起 Discussion 或 Issue，说明使用场景和兼容性影响。
- 本项目 v1 不包含数据库、RAG、多 Agent 框架、Web UI、API Server 或世界模拟引擎。新增这些
  架构属于重大范围变化，应先取得维护者共识。

## 本地开发

需要：

- Git；
- Node.js 22 或更高版本；
- Bash、GNU `sed` 和 coreutils。Windows 推荐 Git Bash。

```bash
git clone https://github.com/fly3457/StoryEngine-Codex.git
cd StoryEngine-Codex
npm ci
npm test
```

如果 Windows 测试找不到 Git Bash，可设置 `STORYENGINE_BASH` 指向实际的 `bash.exe`。

## 修改原则

1. 先阅读根目录 `AGENTS.md`，再阅读与改动有关的代码、测试和文档。
2. 保持一个仓库副本对应一个故事；不要把 `examples/` 当成活动故事根目录。
3. 不要用生成长篇小说来测试脚手架。测试应使用临时夹具或小型示例。
4. 工程维护不构成故事 Canon 审批，也不得自动勾选任何 Review Gate。
5. 修改公开使用说明时，同时更新中英文版本。
6. 不要提交 API Key、访问令牌、私人手稿或其他无权公开的数据。
7. 保留上游 MIT 许可证、来源链接和 `NOTICE.md` 中的署名。

## 测试

```bash
# 完整测试，包括真实 Bash 工具和 DOCX 导出
npm test

# 仅结构与协议契约
npm run test:contracts
```

提交 Pull Request 前请确保：

- `npm test` 通过；
- `git diff --check` 无空白错误；
- 新增或修改的 Markdown 本地链接有效；
- 行为变化包含相应测试和中英文用户文档；
- 没有意外修改根目录故事 Canon 或生成真实小说正文。

## Pull Request

请保持一次 PR 聚焦一个主题，并在说明中包含：

- 问题与动机；
- 采用的解决方案；
- 测试证据；
- 对工作流、兼容性和已有故事的影响；
- 不在本次范围内的内容。

提交贡献即表示你有权提交这些内容，并同意按本项目的 [MIT License](LICENSE) 授权发布。

