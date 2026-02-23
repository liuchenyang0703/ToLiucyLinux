---
title: Git常见面试题
icon: circle-info
order: 1
category:
  - 面试题
tag:
  - Git常见面试题
  - 运维
date: 2026-02-07
pageview: true
article: false
breadcrumb: false
isOriginal: true
---

## 1、Git 的基本工作流程是怎样的？

**基础流程：**
1. **工作区修改** - 在工作目录中编辑文件
2. **暂存更改** - `git add` 将修改放入暂存区（Index）
3. **本地提交** - `git commit` 保存到本地仓库（Repository）
4. **推送远程** - `git push` 同步到远程仓库（Remote）

**运维视角补充：**
- **三种状态**：已修改（Modified）→ 已暂存（Staged）→ 已提交（Committed）
- **快照机制**：Git 保存的是文件快照而非差异，切换版本时直接恢复完整快照 
- **分布式特性**：每个本地仓库都是完整备份，支持离线工作和多远程协作

## 2、如何创建一个新的 Git 仓库？

**两种方式：**

```bash
# 方式一：初始化全新仓库
git init                    # 创建 .git 目录
git init --bare project.git # 创建裸仓库（用于服务器中央仓库）

# 方式二：克隆现有仓库
git clone https://github.com/user/repo.git
git clone --depth 1 https://...  # 浅克隆，只取最新提交（节省带宽/空间）
```

**运维要点：**
- **裸仓库（Bare）**：无工作目录，仅存储版本数据，适合作为中央服务器仓库
- **镜像克隆**：`git clone --mirror` 用于完整备份包括所有远程分支和配置

## 3、解释 .git 目录下的重要文件和目录

| 路径          | 作用                                   | 运维关注点                                  |
| ------------- | -------------------------------------- | ------------------------------------------- |
| `HEAD`        | 指向当前分支或提交                     | 可手动修改指向进行分离头指针操作            |
| `config`      | 仓库级配置文件                         | 存储远程地址、分支追踪、钩子配置            |
| `objects/`    | Git 对象数据库（blob/tree/commit/tag） | 占用空间大户，`git gc` 清理冗余             |
| `refs/`       | 引用存储（heads/tags/remotes）         | 分支和标签的指针文件                        |
| `hooks/`      | 客户端/服务端钩子脚本                  | **CI/CD 关键**，如 pre-commit、post-receive |
| `index`       | 暂存区二进制索引                       | 冲突时可能损坏，可删除重建                  |
| `logs/`       | 引用日志（reflog）                     | **故障恢复关键**，记录所有 HEAD 变动        |
| `packed-refs` | 压缩后的引用存储                       | 优化大量标签/分支的查询性能                 |

**高级补充：**
- **objects 类型**：blob（文件内容）、tree（目录结构）、commit（提交信息）、tag（标签）
- **存储机制**：SHA-1 哈希前两位作为子目录，后 38 位作为文件名

## 4、如何查看当前仓库的状态？

```bash
git status                  # 详细状态
git status -s / --short     # 精简模式（推荐脚本使用）
git status -sb              # 显示分支名和精简状态

# 其他状态检查
git diff                    # 工作区 vs 暂存区
git diff --cached           # 暂存区 vs 最新提交
git diff HEAD~1             # 与上一次提交对比
```

**输出符号解读：**
- `??` 未跟踪（Untracked）
- `M` 已修改（Modified，红色=未暂存，绿色=已暂存）
- `A` 已添加（Added）
- `D` 已删除（Deleted）
- `R` 重命名（Renamed）

## 5、如何撤销最后一次提交？

**三种场景，三种命令：**

```bash
# 场景1：保留更改到工作区（撤销提交但保留修改）
git reset --soft HEAD~1
# 用途：重新提交，修改提交信息或拆分提交

# 场景2：保留更改到工作区但取消暂存（默认模式）
git reset --mixed HEAD~1  # 或 git reset HEAD~1

# 场景3：完全删除提交和更改（危险！）
git reset --hard HEAD~1
# 用途：彻底丢弃错误提交，如包含敏感信息

# 场景4：已推送到远程的撤销（生成反向提交）
git revert HEAD           # 创建新提交抵消上次更改，历史保留
```

**运维安全原则：**
- **已推送的提交** 严禁使用 `reset --hard` + `push -f`，应使用 `revert`
- **强制推送** 必须使用 `--force-with-lease` 而非 `--force`，防止覆盖他人工作 

## 6、如何创建和切换分支？

```bash
# 传统方式（Git 2.23 之前）
git branch feature-x        # 创建分支
git checkout feature-x      # 切换分支
git checkout -b feature-x   # 创建并切换

# 现代方式（Git 2.23+ 推荐）
git switch feature-x        # 切换分支（更清晰语义）
git switch -c feature-x     # 创建并切换（create）
git switch -                # 切换到上一个分支（快速来回）
```

**运维场景：**
- **分离头指针**：`git checkout <commit-id>` 用于临时查看历史版本
- **工作树（Worktree）**：`git worktree add ../hotfix hotfix-branch` 同时处理多分支，避免频繁切换 

## 7、解释 Git 的合并（Merge）与变基（Rebase）区别

| 特性         | Merge                      | Rebase                         |
| ------------ | -------------------------- | ------------------------------ |
| **历史记录** | 保留分支历史，产生合并提交 | 线性历史，无合并提交           |
| **提交哈希** | 原提交不变                 | 重新计算提交哈希（重写历史）   |
| **冲突处理** | 一次解决所有冲突           | 可能需要多次解决冲突（逐提交） |
| **适用场景** | 公共分支（main/master）    | 私有特性分支（推送前整理）     |
| **风险**     | 历史复杂                   | **禁止对已推送提交使用**       |

**运维最佳实践：**
```bash
# 特性分支开发流程
git checkout feature
git rebase main             # 先变基保持线性
git checkout main
git merge feature --no-ff   # 再合并保留分支痕迹

# 交互式变基（整理提交）
git rebase -i HEAD~3        # 合并/修改/删除最近3个提交
```

## 8、如何解决代码冲突（Conflict）？

**解决流程：**
```bash
git pull origin main        # 触发冲突
# 或 git merge/rebase 时冲突

# 查看冲突文件
git status                  # 标记为 "Unmerged paths"

# 手动编辑冲突文件（查找 <<<<<<< ======= >>>>>>> 标记）
# 或使用合并工具
git mergetool               # 调用配置的合并工具（如 vimdiff, meld）

# 标记解决
git add <resolved-file>     # 暂存解决后的文件
git rebase --continue       # 或 git commit（取决于合并方式）
```

**运维自动化：**
- **预配置合并工具**：
  ```bash
  git config --global merge.tool vimdiff
  git config --global mergetool.prompt false
  ```

## 9、什么是 Git 钩子（Hooks）？举例说明运维场景

**常用钩子：**

| 钩子名         | 触发时机         | 运维应用场景                                 |
| -------------- | ---------------- | -------------------------------------------- |
| `pre-commit`   | 提交前           | 代码格式检查、敏感信息扫描（如禁止提交密码） |
| `pre-push`     | 推送前           | 运行单元测试、检查提交信息规范               |
| `post-receive` | 服务器接收推送后 | **自动化部署**，更新生产环境代码             |
| `pre-receive`  | 服务器接收推送前 | 权限检查、禁止强制推送、分支保护             |

**示例：自动部署钩子**（`hooks/post-receive`）：
```bash
#!/bin/bash
TARGET="/var/www/production"
while read oldrev newrev refname; do
    if [[ $refname == "refs/heads/main" ]]; then
        echo "Deploying to production..."
        git --work-tree=$TARGET --git-dir=/repo/project.git checkout -f main
        systemctl restart nginx
    fi
done
```

## 10、如何查看和恢复历史版本？

```bash
# 查看历史
git log --oneline --graph --all   # 图形化简洁历史
git log -p -2                     # 显示最近2次提交的差异
git log --author="ops" --since="1 week ago"

#  reflog - 运维救命稻草（记录所有操作）
git reflog                        # 查看 HEAD 所有变动
git reset --hard HEAD@{2}         # 恢复到 reflog 中的第3个状态

# 恢复单个文件
git checkout HEAD~2 -- config/nginx.conf   # 恢复历史版本文件
git restore --source=HEAD~1 nginx.conf     # Git 2.23+ 新命令
```

**灾难恢复场景：**
- **误删分支**：通过 `git reflog` 找到分支最后一个提交，然后 `git checkout -b branch-name <commit>`
- **误用 reset --hard**：立即使用 `git reflog` + `git cherry-pick` 或 `git reset --hard` 恢复

## 11、解释 Git 的三种远程协议及运维配置

| 协议      | 特点                      | 适用场景                   |
| --------- | ------------------------- | -------------------------- |
| **HTTPS** | 需输入密码/Token，端口443 | 防火墙严格环境，快速上手   |
| **SSH**   | 密钥认证，端口22          | **生产环境推荐**，免密安全 |
| **Git**   | 无加密，端口9418          | 内网高速传输（已较少使用） |

**SSH 免密配置（运维必会）：**
```bash
# 生成密钥
ssh-keygen -t ed25519 -C "ops@company.com"

# 添加到 ssh-agent
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# 公钥添加到 Git 服务器（GitHub/GitLab 网页配置）
cat ~/.ssh/id_ed25519.pub

# 测试连接
ssh -T git@github.com
```

## 12、如何优化大型 Git 仓库的性能？

**运维常见问题：仓库体积过大、克隆缓慢**

```bash
# 1. 浅克隆（Shallow Clone）
git clone --depth 1 https://...        # 仅最新提交
git fetch --unshallow                  # 后续转为完整仓库

# 2. 稀疏检出（Sparse Checkout）- 大仓库只取部分目录
git clone --filter=blob:none --no-checkout https://...
git sparse-checkout init --cone
git sparse-checkout set ops/scripts monitoring/

# 3. 清理大文件（从历史中彻底删除）
git filter-repo --path-glob '*.log' --invert-paths  # 需安装 git-filter-repo

# 4. 垃圾回收
git gc --aggressive --prune=now        # 压缩对象，清理悬空对象
```

## 13、Git 在 CI/CD 中的最佳实践

**分支策略（Git Flow 简化版）：**
- `main`：生产环境，保护分支
- `develop`：集成测试环境
- `feature/*`：特性开发
- `hotfix/*`：紧急修复

**自动化检查（pre-commit 配置）：**
```yaml
# .pre-commit-config.yaml
repos:
  - repo: https://github.com/pre-commit/pre-commit-hooks
    hooks:
      - id: check-yaml           # 检查 YAML 语法
      - id: check-json           # 检查 JSON 语法
      - id: detect-private-key   # **检测私钥提交**
      - id: trailing-whitespace  # 清理行尾空格
```

**CI 环境变量：**
```bash
# 避免 CI 中交互式提示
git config --global user.email "ci@company.com"
git config --global user.name "CI Bot"
```

## 14、场景题：误将敏感信息（如密码、密钥）提交到 Git，如何处理？

**紧急处理流程：**

```bash
# 步骤1：立即撤销提交（但历史仍保留）
git reset --hard HEAD~1          # 仅本地有效，已推送无用

# 步骤2：从历史彻底删除（重写历史）
git filter-repo --path credentials.conf --invert-paths
# 或使用 BFG Repo-Cleaner（更快）

# 步骤3：强制推送（谨慎！）
git push origin --force --all    # 所有分支
git push origin --force --tags   # 所有标签

# 步骤4：通知团队重新克隆
# 原仓库克隆者仍有本地副本，需轮换所有暴露的凭证！
```

**预防措施：**
- 使用 `git-secrets` 或 `truffleHog` 扫描提交
- 配置 `.gitignore` 忽略敏感文件
- 使用 `git-crypt` 或 `sops` 加密敏感配置

## 15、如何比较两个分支的差异？

```bash
# 查看差异概览
git diff main..feature            # feature 比 main 多出的内容
git diff main...feature           # 从 main 分叉后 feature 的改动

# 查看文件列表
git diff --name-only main feature

# 查看某文件历史
git log -p --follow -- nginx.conf

# 统计改动
git diff --stat main feature
```

## 16、标签（Tag）的管理与版本发布

```bash
# 创建标签
git tag -a v1.2.0 -m "Release version 1.2.0"   # 附注标签（推荐）
git tag v1.2.0-lw                              # 轻量标签

# 推送标签到远程
git push origin v1.2.0                         # 推送单个
git push origin --tags                         # 推送所有

# 删除标签
git tag -d v1.2.0
git push origin --delete v1.2.0

# 基于标签创建分支（热修复）
git checkout -b hotfix-1.2.1 v1.2.0
```

**语义化版本（SemVer）：**
- `v1.2.3`：主版本.次版本.修订号
- 运维脚本可通过 `git describe --tags` 获取当前版本号

## 17、Git 与 SVN 的核心区别（运维视角）

| 特性         | Git                              | SVN                                |
| ------------ | -------------------------------- | ---------------------------------- |
| **架构**     | 分布式，本地有完整仓库           | 集中式，依赖中央服务器             |
| **离线工作** | 完全支持（提交、分支、历史查看） | 仅查看本地缓存                     |
| **分支**     | 轻量（指针操作，秒级）           | 重量（复制目录，耗时）             |
| **存储**     | 快照（完整文件）                 | 差异（Delta）                      |
| **适合场景** | 互联网开发、微服务、开源项目     | 传统软件、大文件管理（如游戏资源） |

## 18、常用 Git 别名配置（提升运维效率）

```bash
# 添加到 ~/.gitconfig
[alias]
    st = status -sb
    co = checkout
    br = branch -vv
    ci = commit
    lg = log --oneline --graph --decorate --all
    last = log -1 HEAD --stat
    unstage = reset HEAD --
    discard = checkout --
    visual = !gitk
    whoami = config user.name
```

## 19、如何排查 "git push" 被拒绝的常见原因？

**排查清单：**
1. **权限问题**：检查 SSH 密钥或 HTTPS Token 权限
2. **非快进推送**：远程有新提交，需先 `git pull` 合并
3. **分支保护**：GitHub/GitLab 设置了保护规则，禁止直接推送
4. **钩子拦截**：`pre-receive` 钩子检查失败（如代码规范）
5. **存储配额**：远程仓库已满（常见于自托管 GitLab）

**解决：**
```bash
# 强制推送（仅限确定要覆盖时）
git push --force-with-lease    # 安全强制推送（检查是否有新提交）

# 拉取更新
git pull --rebase origin main  # 先变基再推送
```

## 20、Git 仓库备份策略

**备份方案：**
```bash
# 1. 镜像克隆（完整备份）
git clone --mirror https://github.com/user/repo.git backup.git
cd backup.git
git remote update

# 2. 打包备份
git bundle create repo-backup.bundle --all

# 3. 恢复
git clone repo-backup.bundle restored-repo
```

**自动化脚本（cron 定时任务）：**
```bash
#!/bin/bash
# /opt/backup/git-backup.sh
REPOS="project1 project2 project3"
BACKUP_DIR="/backup/git"

for repo in $REPOS; do
    cd $BACKUP_DIR/$repo.git && git remote update
done
```

