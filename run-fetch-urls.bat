@echo off
chcp 65001 >nul
color 0A
cls

echo.
echo ╔════════════════════════════════════════════╗
echo ║   🎵 音乐 URL 自动获取工具                ║
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

REM 运行脚本
echo ⏳ 正在启动脚本...
echo.

node fetch-music-urls.js

if errorlevel 0 (
    echo.
    echo ✅ 任务完成！
    echo.
    echo 📝 接下来的步骤：
    echo    1. 刷新浏览器查看更新
    echo    2. 尝试点击播放按钮
    echo    3. 如果没有声音，可能需要使用本地 MP3 文件
    echo.
)

pause
