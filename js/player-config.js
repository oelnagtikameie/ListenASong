// 音乐播放器配置文件
// 修改这个文件来自定义音乐源和播放器行为

const MUSIC_PLAYER_CONFIG = {
    // ==================== 音乐源配置 ====================
    
    // 选择音乐源类型: 'demo', 'local', 'netease', 'qq', 'youtube'
    musicSource: 'demo',
    
    // 演示音乐源（SoundHelix 示例）
    demoMusicFiles: [
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    ],
    
    // 本地音乐文件配置
    // 使用此配置前，请在项目根目录创建 music/ 文件夹
    // 并将 MP3 文件命名为 1.mp3, 2.mp3 等
    localMusicPath: './music/',
    
    // 网易云音乐 API 配置
    neteaseConfig: {
        apiUrl: '/api/music/search',  // 你的后端 API 地址
        timeout: 5000,
    },
    
    // QQ音乐配置
    qqMusicConfig: {
        apiUrl: '/api/qq/search',
        timeout: 5000,
    },
    
    // ==================== 播放器行为配置 ====================
    
    // 自动播放下一首
    autoPlayNext: true,
    
    // 循环播放模式: 'off', 'all', 'one'
    loopMode: 'off',
    
    // 默认音量 (0-1)
    defaultVolume: 0.7,
    
    // 播放器位置: 'bottom', 'top', 'floating'
    playerPosition: 'bottom',
    
    // 显示播放器时自动隐藏侧边栏
    hideMenuOnPlay: false,
    
    // ==================== 调试配置 ====================
    
    // 启用调试日志
    debug: true,
    
    // 缓存音乐信息
    cacheMusicInfo: true,
    
    // 保存播放历史
    saveHistory: true,
};

// ============================================================
// 如何使用这个配置文件
// ============================================================

/*

方案 1: 使用演示音乐（推荐 - 无需配置）
-----------------------------------------
1. 保持 musicSource: 'demo'
2. 现在就可以使用，无需其他配置
3. 需要真实音乐时，选择其他方案


方案 2: 使用本地音乐文件
-----------------------------------------
步骤 1: 创建文件夹结构
  项目根目录/
  ├── music/
  │   ├── 1.mp3
  │   ├── 2.mp3
  │   ├── 3.mp3
  │   └── ...

步骤 2: 修改 player.js 中的 getMusicUrl 方法
  getMusicUrl(song) {
      return MUSIC_PLAYER_CONFIG.localMusicPath + song.id + '.mp3';
  }

步骤 3: 更改配置
  musicSource: 'local',


方案 3: 集成网易云音乐 API
-----------------------------------------
步骤 1: 创建后端服务器 (Node.js + Express)
  // server.js
  const express = require('express');
  const axios = require('axios');
  
  app.get('/api/music/search', async (req, res) => {
      const { name, singer } = req.query;
      // 调用网易云 API
      // 返回 { musicUrl: '...' }
  });

步骤 2: 修改 player.js
  async getMusicUrl(song) {
      const response = await fetch(
          MUSIC_PLAYER_CONFIG.neteaseConfig.apiUrl + 
          `?name=${song.name}&singer=${song.singer}`
      );
      return (await response.json()).musicUrl;
  }

步骤 3: 更改配置
  musicSource: 'netease',
  neteaseConfig: { apiUrl: 'http://localhost:3000/api/music/search' },


方案 4: 使用 QQ 音乐 API
-----------------------------------------
类似方案 3，使用 QQ 音乐的 API

*/

// 导出配置（在 player.js 中使用）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MUSIC_PLAYER_CONFIG;
}
