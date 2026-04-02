# 🚀 Cloudflare Pages 部署指南

## 📋 项目已配置完成

该项目已针对 Cloudflare Pages 优化，包含以下配置文件：

- ✅ `wrangler.toml` - Cloudflare 项目配置
- ✅ `package.json` - Node.js 项目元数据
- ✅ `_redirects` - URL 路由规则
- ✅ `_headers` - HTTP 响应头配置

---

## 🎯 部署方法

### **方法 1：用 Wrangler CLI 部署（推荐）**

#### 步骤 1：安装 Wrangler
```powershell
npm install -g wrangler
```

#### 步骤 2：登录 Cloudflare
```powershell
wrangler login
```
浏览器会打开，授权您的 Cloudflare 账号。

#### 步骤 3：部署
```powershell
cd d:\Visual Studio Code\projects\简版网页
wrangler pages deploy
```

**完成！** 🎉 Cloudflare 会给您一个 URL，例如：
```
https://简版网页.pages.dev
```

---

### **方法 2：Git 连接（完全自动）**

#### 步骤 1：将项目推送到 GitHub
```powershell
git remote add origin https://github.com/你的用户名/简版网页.git
git push -u origin main
```

#### 步骤 2：连接到 Cloudflare Pages
1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 点击 **Pages** → **创建项目**
3. 选择 **连接到 Git**
4. 授权并选择您的仓库
5. 选择分支：`main`
6. **框架预设**：选择 `无` 或 `自定义`
7. **构建命令**：留空
8. **构建输出目录**：`.` 或 `public`（如果存在）
9. 点击 **保存并部署**

**之后每次 git push，Cloudflare 会自动部署！** 🔄

---

### **方法 3：拖拽部署**

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 点击 **Pages** → **创建项目** → **直接上传**
3. 将本项目文件夹拖拽到浏览器窗口
4. 完成！

---

## 📁 项目结构（Cloudflare 友好）

```
简版网页/
├── _redirects          ← 路由规则（自动识别）
├── _headers            ← 响应头配置（自动识别）
├── package.json        ← 项目信息
├── wrangler.toml       ← Cloudflare 配置
│
├── mainpage.html       ← 主页
├── menu.html           ← 菜单
├── songs.html          ← 歌曲
├── singers.html        ← 歌手
├── rank.html           ← 排行榜
├── favorite.html       ← 收藏
├── mine.html           ← 我的
│
├── css/
│   └── menu.css
├── js/
│   ├── music-data.js
│   ├── player.js
│   ├── songs.js
│   ├── ... 其他 JS
│   └── favorite.js
├── images/
│   └── BackGround.png
└── music/              ← 本地音乐文件夹（可选）
    ├── 1.mp3
    ├── 2.mp3
    └── ...
```

---

## ⚙️ 配置说明

### `wrangler.toml`
```toml
name = "简版网页"                    # 项目名称
pages_build_output_dir = "."         # 构建输出目录（.表示根目录）
```

### `package.json`
```json
{
  "name": "简版网页-音乐播放器",
  "version": "1.0.0",
  "description": "中文在线听歌网站",
  "scripts": {
    "deploy": "wrangler pages deploy"
  }
}
```

### `_redirects`
URL 路由规则：
```
/ /mainpage.html 200        # 根路径指向主页
/songs /songs.html 200      # /songs 重定向到 songs.html
```

### `_headers`
HTTP 响应头：
```
Cache-Control: public, max-age=86400    # 缓存 24 小时
X-Content-Type-Options: nosniff         # 防止 MIME 嗅探
```

---

## 🔗 部署后的 URL

部署成功后，您会获得：

```
主页:        https://你的项目.pages.dev/
歌曲页面:    https://你的项目.pages.dev/songs
歌手页面:    https://你的项目.pages.dev/singers
排行榜:      https://你的项目.pages.dev/rank
收藏:        https://你的项目.pages.dev/favorite
个人中心:    https://你的项目.pages.dev/mine
```

---

## 📊 部署后的功能

✅ **完全静态网站** - 无需后端服务器
✅ **全球 CDN 加速** - 自动分发到全球边缘节点
✅ **自动 HTTPS** - 默认支持 SSL
✅ **Git 自动部署** - 代码更新自动上线
✅ **无限页面扩展** - 支持无限 Pages 项目
✅ **环境变量支持** - 可配置敏感信息

---

## 🎵 音乐 URL 配置

部署前确保已运行：
```powershell
node fetch-music-urls.js
```

这会将所有歌曲的 URL 写入 `js/music-data.js`。

---

## 🚨 常见问题

### Q: 部署后歌曲无法播放？
**A:** 检查：
1. 是否运行了 `node fetch-music-urls.js`
2. `music-data.js` 中是否有有效的 URL
3. 浏览器控制台是否有错误信息（F12）

### Q: 自定义域名如何配置？
**A:** 
1. Cloudflare Dashboard → Pages → 项目设置
2. **自定义域名** → 添加自定义域名
3. 配置 DNS 记录

### Q: 如何更新已部署的网站？
**A:** 
- **Git 方式**：`git push` 自动触发重新部署
- **Wrangler 方式**：`wrangler pages deploy` 重新部署

### Q: 每次部署需要多长时间？
**A:** 通常 1-2 分钟内完成

---

## 💡 优化建议

### 1. 启用 Cloudflare 缓存
- Dashboard → Pages → 设置 → 缓存规则
- 设置 HTML 缓存: 1 小时
- 设置图片缓存: 30 天

### 2. 配置自动部署
- 连接 GitHub 后自动触发
- 每次 push 自动部署新版本

### 3. 使用 Cloudflare 分析
- 查看网站访问数据
- 监控性能指标

### 4. 启用页面规则
```
例如：防止首页被缓存
URL: https://你的网站.pages.dev/*
缓存级别: 标准
```

---

## 🎉 完成检查清单

- [ ] 已安装 Wrangler CLI
- [ ] 已配置 Cloudflare 账号
- [ ] 已运行 `fetch-music-urls.js`
- [ ] 已部署到 Cloudflare Pages
- [ ] 已测试所有页面和功能
- [ ] 已配置自定义域名（可选）

---

## 📞 需要帮助？

- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)
- [Wrangler CLI 文档](https://developers.cloudflare.com/workers/wrangler/)
- [Cloudflare 社区论坛](https://community.cloudflare.com/)

---

**祝您部署顺利！🚀**
