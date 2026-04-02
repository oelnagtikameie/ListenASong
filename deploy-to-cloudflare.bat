@echo off
chcp 65001 >nul
color 0A
cls

echo.
echo ╔════════════════════════════════════════════╗
echo ║   🚀 Cloudflare Pages 自动部署工具        ║
echo ╚════════════════════════════════════════════╝
echo.

REM 检查 Node.js 是否已安装
where node >nul 2>nul
if errorlevel 1 (
    echo ❌ 检测到 Node.js 未安装！
    echo.
    echo 📥 请先安装 Node.js：
    echo    https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo ✓ Node.js 已安装
node --version
echo.

REM 检查 Wrangler 是否已安装
where wrangler >nul 2>nul
if errorlevel 1 (
    echo ⚠️  检测到 Wrangler 未全局安装
    echo.
    echo 📥 正在安装 Wrangler...
    call npm install -g wrangler
    if errorlevel 1 (
        echo ❌ Wrangler 安装失败
        pause
        exit /b 1
    )
)

echo ✓ Wrangler 已安装
wrangler --version
echo.

echo ════════════════════════════════════════════
echo 📋 部署前检查清单
echo ════════════════════════════════════════════
echo.
echo [1] 确保已配置 Cloudflare 账号
echo [2] 确保已运行 node fetch-music-urls.js
echo [3] 确保所有代码已提交到 Git
echo.

REM 询问是否继续
echo.
set /p continue="是否继续部署？(y/n) "
if /i not "%continue%"=="y" (
    echo ⏭️  已取消部署
    pause
    exit /b 0
)

echo.
echo ⏳ 检查 Cloudflare 登录状态...
wrangler whoami >nul 2>nul
if errorlevel 1 (
    echo.
    echo 🔑 需要登录 Cloudflare
    echo 正在打开登录页面...
    pause
    wrangler login
)

echo.
echo ✓ 登录成功
echo.

echo ════════════════════════════════════════════
echo 🚀 开始部署到 Cloudflare Pages
echo ════════════════════════════════════════════
echo.

wrangler pages deploy

if errorlevel 0 (
    echo.
    echo ╔════════════════════════════════════════════╗
    echo ║         ✅ 部署成功！                      ║
    echo ╚════════════════════════════════════════════╝
    echo.
    echo 📝 部署信息：
    echo    • 查看部署状态: wrangler pages list
    echo    • 查看部署日志: wrangler pages deployment list
    echo.
    echo 💡 下一步：
    echo    • 刷新网页以查看更新
    echo    • 配置自定义域名（可选）
    echo    • 在 Cloudflare Dashboard 中检查分析
    echo.
) else (
    echo.
    echo ❌ 部署失败！
    echo.
    echo 🔍 故障排除：
    echo    1. 确保已运行 wrangler login
    echo    2. 检查网络连接
    echo    3. 查看错误信息并访问：
    echo       https://developers.cloudflare.com/pages/
    echo.
)

pause
