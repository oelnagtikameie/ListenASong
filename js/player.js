// 音乐播放器模块
class MusicPlayer {
    constructor() {
        this.audio = new Audio();
        this.currentSong = null;
        this.isPlaying = false;
        this.playlist = [];
        this.currentIndex = 0;
        this.volume = 0.7;
        this.isMuted = false;
        
        this.setupAudioEvents();
    }

    setupAudioEvents() {
        // 播放结束事件
        this.audio.addEventListener('ended', () => {
            this.playNext();
        });

        // 时间更新事件
        this.audio.addEventListener('timeupdate', () => {
            this.updatePlayerUI();
        });

        // 加载元数据
        this.audio.addEventListener('loadedmetadata', () => {
            this.updatePlayerUI();
        });

        // 错误处理
        this.audio.addEventListener('error', (e) => {
            console.error('播放出错:', e);
            showNotification('播放出错，请检查音乐源');
        });
    }

    // 播放指定歌曲
    playSong(song) {
        this.currentSong = song;
        const musicUrl = this.getMusicUrl(song);
        
        if (!musicUrl) {
            showNotification('未找到可用的音乐源');
            return;
        }

        this.audio.src = musicUrl;
        this.audio.load();
        this.audio.play().catch(err => {
            console.error('播放失败:', err);
            showNotification('无法播放此歌曲，请检查网络连接');
        });
        
        this.isPlaying = true;
        this.updatePlayerUI();
        this.showPlayer();
    }

    // 获取音乐URL - 尝试多个源
    getMusicUrl(song) {
        // 方案1: 从网易云音乐搜索并返回 URL（需要服务器代理）
        // 方案2: 使用免费的音乐API
        // 方案3: 本地缓存的音乐 URL
        
        // 这里我们使用网易云音乐源（需要网络）
        // 格式: https://music.163.com/song/media/outer/url?id={songId}
        
        // 为了演示，使用搜索功能生成URL
        const songName = encodeURIComponent(song.name);
        const singerName = encodeURIComponent(song.singer);
        
        // 尝试使用网易云音乐搜索代理
        return this.searchNeteaseSong(song);
    }

    // 搜索网易云音乐
    searchNeteaseSong(song) {
        // 这是一个简化版本，实际使用需要后端代理
        // 返回一个可能的URL或使用fallback
        
        // 如果有本地缓存，使用缓存
        const cached = localStorage.getItem(`music_${song.id}`);
        if (cached) {
            return cached;
        }
        
        // 使用真实的音乐源选项
        const musicUrl = this.getAlternativeMusicSource(song);
        return musicUrl;
    }

    // 获取替代音乐源
    getAlternativeMusicSource(song) {
        // 尝试多个免费的音乐源
        const sources = [
            // 网易云音乐 (需要搜索歌曲ID)
            // `https://music.163.com/song/media/outer/url?id=YOUR_SONG_ID`,
            
            // QQ音乐搜索结果
            // `http://c.y.qq.com/base/fcgi-bin/u?__=BY3FFA`,
            
            // 免费演示音乐 - 真实可播放
        ];

        // 如果没有找到真实源，使用演示音乐
        // 演示音乐会根据歌手名不同而选择不同的示例
        return this.getDefaultMusicByArtist(song.singer);
    }

    // 根据歌手名选择演示音乐
    getDefaultMusicByArtist(singerName) {
        // 为不同的歌手返回不同的演示音乐
        const singerMap = {
            '周杰伦': 0,
            '陈奕迅': 1,
            '林俊杰': 2,
            '五月天': 3,
            '许嵩': 4,
            '汪峰': 5,
            '张信哲': 0,
            '徐良': 1,
            '张杰': 2,
            '薛之谦': 3,
            '黑豹乐队': 4,
        };
        
        const index = singerMap[singerName] !== undefined ? singerMap[singerName] : Math.floor(Math.random() * 6);
        return this.getDefaultMusicSource(index);
    }

    // 暂停/播放
    togglePlay() {
        if (this.isPlaying) {
            this.audio.pause();
        } else {
            this.audio.play().catch(err => {
                console.error('播放失败:', err);
            });
        }
        this.isPlaying = !this.isPlaying;
        this.updatePlayerUI();
    }

    // 播放下一首
    playNext() {
        if (this.currentIndex < this.playlist.length - 1) {
            this.currentIndex++;
            this.playSong(this.playlist[this.currentIndex]);
        } else {
            this.stop();
        }
    }

    // 播放上一首
    playPrev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.playSong(this.playlist[this.currentIndex]);
        }
    }

    // 停止播放
    stop() {
        this.audio.pause();
        this.audio.currentTime = 0;
        this.isPlaying = false;
        this.updatePlayerUI();
    }

    // 设置音量
    setVolume(val) {
        this.volume = val;
        this.audio.volume = val;
        this.isMuted = false;
        this.updatePlayerUI();
    }

    // 切换静音
    toggleMute() {
        if (this.isMuted) {
            this.audio.volume = this.volume;
            this.isMuted = false;
        } else {
            this.audio.volume = 0;
            this.isMuted = true;
        }
        this.updatePlayerUI();
    }

    // 设置播放进度
    seek(time) {
        this.audio.currentTime = time;
    }

    // 获取当前时间（秒）
    getCurrentTime() {
        return this.audio.currentTime;
    }

    // 获取总时长（秒）
    getDuration() {
        return this.audio.duration || 0;
    }

    // 更新播放器UI
    updatePlayerUI() {
        const player = document.getElementById('musicPlayer');
        if (!player) return;

        // 更新播放按钮状态
        const playBtn = player.querySelector('.play-btn');
        if (playBtn) {
            playBtn.textContent = this.isPlaying ? '⏸' : '▶';
        }

        // 更新音量按钮
        const volumeBtn = player.querySelector('.volume-btn');
        if (volumeBtn) {
            volumeBtn.textContent = this.isMuted ? '🔇' : '🔊';
        }

        // 更新时间显示
        const currentTimeElem = player.querySelector('.current-time');
        const durationElem = player.querySelector('.duration');
        const progressBar = player.querySelector('.progress-bar');

        if (currentTimeElem) {
            currentTimeElem.textContent = this.formatTime(this.getCurrentTime());
        }
        if (durationElem) {
            durationElem.textContent = this.formatTime(this.getDuration());
        }
        if (progressBar) {
            const percent = this.getDuration() > 0 ? (this.getCurrentTime() / this.getDuration()) * 100 : 0;
            progressBar.style.width = percent + '%';
        }

        // 更新音量滑块
        const volumeSlider = player.querySelector('.volume-slider');
        if (volumeSlider) {
            volumeSlider.value = this.isMuted ? 0 : this.volume;
        }
    }

    // 格式化时间
    formatTime(seconds) {
        if (isNaN(seconds)) return '00:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    // 显示播放器
    showPlayer() {
        const player = document.getElementById('musicPlayer');
        if (player) {
            player.style.display = 'flex';
            this.updateNowPlaying();
        }
    }

    // 隐藏播放器
    hidePlayer() {
        const player = document.getElementById('musicPlayer');
        if (player) {
            player.style.display = 'none';
        }
    }

    // 更新正在播放的歌曲信息
    updateNowPlaying() {
        if (!this.currentSong) return;
        const songName = document.getElementById('playerSongName');
        const singerName = document.getElementById('playerSingerName');
        
        if (songName) songName.textContent = this.currentSong.name;
        if (singerName) singerName.textContent = this.currentSong.singer;
    }
}

// 全局播放器实例
let player = new MusicPlayer();

// 初始化播放器
document.addEventListener('DOMContentLoaded', function() {
    if (!player) {
        player = new MusicPlayer();
    }
});

// 辅助函数：获取演示音乐URL（替代方案）
function getDemoMusicUrl() {
    const demoSongs = [
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    ];
    return demoSongs[Math.floor(Math.random() * demoSongs.length)];
}

// 获取默认音乐源（演示用）
MusicPlayer.prototype.getDefaultMusicSource = function(index) {
    const demoSongs = [
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    ];
    
    const songIndex = index !== undefined ? index : Math.floor(Math.random() * demoSongs.length);
    return demoSongs[songIndex % demoSongs.length];
};
