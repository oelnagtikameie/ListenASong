/**
 * 音乐 URL 自动获取脚本
 * 从免费音乐 API 获取歌曲 URL 并更新 music-data.js
 * 
 * 使用方法：
 * 1. 确保已安装 Node.js
 * 2. 在项目根目录运行：node fetch-music-urls.js
 * 3. 脚本会自动查询 API 并更新 music-data.js
 */

const fs = require('fs');
const https = require('https');
const path = require('path');

// ==================== 配置 ====================

// 使用多个免费音乐源作为备选
const MUSIC_SOURCES = {
    deezer: {
        name: 'Deezer',
        search: 'https://api.deezer.com/search?q=',
        getUrl: (data) => {
            if (data.data && data.data[0]) {
                return data.data[0].preview;
            }
            return null;
        }
    },
    // fallback: 演示音乐
    demo: [
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    ]
};

// ==================== 工具函数 ====================

/**
 * 发起 HTTPS 请求
 */
function makeRequest(url) {
    return new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => {
            reject(new Error('请求超时'));
        }, 5000);

        https.get(url, (res) => {
            clearTimeout(timeoutId);
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    resolve(data);
                }
            });
        }).on('error', (err) => {
            clearTimeout(timeoutId);
            reject(err);
        });
    });
}

/**
 * 从 Deezer 获取音乐 URL
 */
async function getMusicUrlFromDeezer(songName, singerName) {
    try {
        const query = `${songName} ${singerName}`;
        const searchUrl = MUSIC_SOURCES.deezer.search + encodeURIComponent(query);
        
        const data = await makeRequest(searchUrl);
        
        if (data.data && data.data[0] && data.data[0].preview) {
            return data.data[0].preview;
        }
        return null;
    } catch (error) {
        return null;
    }
}

/**
 * 获取演示音乐 URL（备选）
 */
function getDemoMusicUrl(index) {
    return MUSIC_SOURCES.demo[index % MUSIC_SOURCES.demo.length];
}

/**
 * 生成进度条
 */
function createProgressBar(current, total) {
    const percent = Math.floor((current / total) * 100);
    const filled = Math.floor(percent / 5);
    const empty = 20 - filled;
    const bar = '█'.repeat(filled) + '░'.repeat(empty);
    return `[${bar}] ${percent}% (${current}/${total})`;
}

// ==================== 主程序 ====================

async function main() {
    console.log('🎵 音乐 URL 自动获取脚本\n');

    // 读取 music-data.js
    const filePath = path.join(__dirname, 'js', 'music-data.js');
    let fileContent = fs.readFileSync(filePath, 'utf-8');

    // 提取歌曲数据
    const songMatch = fileContent.match(/songs:\s*\[([\s\S]*?)\]/);
    if (!songMatch) {
        console.error('❌ 无法解析 music-data.js 中的歌曲数据');
        process.exit(1);
    }

    const songsText = songMatch[1];
    const songObjects = songsText.match(/\{\s*id:[^}]*\}/g) || [];
    
    console.log(`📊 检测到 ${songObjects.length} 首歌曲\n`);
    console.log('⏳ 正在从 API 获取 URL...\n');

    let successCount = 0;
    let failureCount = 0;

    // 遍历每首歌曲
    for (let i = 0; i < songObjects.length; i++) {
        const songText = songObjects[i];
        
        // 提取歌曲信息
        const idMatch = songText.match(/id:\s*(\d+)/);
        const nameMatch = songText.match(/name:\s*'([^']*)'|name:\s*"([^"]*)"/);
        const singerMatch = songText.match(/singer:\s*'([^']*)'|singer:\s*"([^"]*)"/);
        
        if (!idMatch || !nameMatch || !singerMatch) continue;

        const id = idMatch[1];
        const name = nameMatch[1] || nameMatch[2];
        const singer = singerMatch[1] || singerMatch[2];

        // 显示进度
        process.stdout.write(`\r${createProgressBar(i + 1, songObjects.length)}`);

        let url = null;

        // 尝试从 Deezer 获取
        url = await getMusicUrlFromDeezer(name, singer);

        // 如果失败，使用演示音乐作为备选
        if (!url) {
            url = getDemoMusicUrl(i);
            failureCount++;
        } else {
            successCount++;
        }

        // 更新歌曲对象 - 添加 url 字段
        const oldSongObject = songText;
        const newSongObject = songText.replace(
            /\s*\}/,
            `, url: '${url}' }`
        );

        fileContent = fileContent.replace(oldSongObject, newSongObject);
    }

    console.log('\n');

    // 保存更新后的文件
    fs.writeFileSync(filePath, fileContent, 'utf-8');

    console.log('✅ 完成！\n');
    console.log(`📈 统计结果：`);
    console.log(`   ✓ 成功获取：${successCount} 首`);
    console.log(`   ⚠ 使用演示音乐：${failureCount} 首`);
    console.log(`\n📝 已更新文件：${filePath}\n`);
    
    console.log('💡 提示：');
    console.log('   • 部分 URL 可能为预览版本（30秒长度）');
    console.log('   • 如需完整歌曲，请使用本地 MP3 文件');
    console.log('   • 播放器已自动配置使用新的 URL\n');
}

// 运行主程序
main().catch(error => {
    console.error('❌ 出错了：', error.message);
    process.exit(1);
});
