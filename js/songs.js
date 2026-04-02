// 歌曲页面逻辑
let currentSongs = [];
let currentSort = 'default';

// 初始化页面
document.addEventListener('DOMContentLoaded', function() {
    initializeGenreFilter();
    displaySongs(getAllSongs());
    setupEventListeners();
});

// 初始化类型筛选器
function initializeGenreFilter() {
    const genres = getAllGenres();
    const select = document.getElementById('genreFilter');
    genres.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre;
        option.textContent = genre;
        select.appendChild(option);
    });
}

// 设置事件监听
function setupEventListeners() {
    // 搜索功能
    document.getElementById('searchBtn').addEventListener('click', () => {
        performSearch();
    });
    
    document.getElementById('searchInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // 类型筛选
    document.getElementById('genreFilter').addEventListener('change', (e) => {
        const genre = e.target.value;
        if (genre) {
            displaySongs(filterByGenre(genre));
        } else {
            displaySongs(getAllSongs());
        }
    });
    
    // 排序功能
    document.querySelectorAll('.sort-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentSort = this.dataset.sort;
            displaySongs(currentSongs);
        });
    });
}

// 执行搜索
function performSearch() {
    const keyword = document.getElementById('searchInput').value;
    displaySongs(searchSongs(keyword));
}

// 排序歌曲
function sortSongs(songs, sortType) {
    const sorted = [...songs];
    switch(sortType) {
        case 'popular':
            return sorted.sort((a, b) => b.plays - a.plays);
        case 'year':
            return sorted.sort((a, b) => b.year - a.year);
        default:
            return sorted;
    }
}

// 显示歌曲列表
function displaySongs(songs) {
    currentSongs = sortSongs(songs, currentSort);
    const container = document.getElementById('songsList');
    container.innerHTML = '';
    
    document.getElementById('songCount').textContent = currentSongs.length;
    
    if (currentSongs.length === 0) {
        container.innerHTML = '<div class="no-result">没有找到相关歌曲</div>';
        return;
    }
    
    currentSongs.forEach((song, index) => {
        const songItem = createSongItem(song, index + 1);
        container.appendChild(songItem);
    });
}

// 创建歌曲项目元素
function createSongItem(song, rank) {
    const item = document.createElement('div');
    item.className = 'song-item';
    
    // 格式化播放数
    const plays = formatPlayCount(song.plays);
    
    item.innerHTML = `
        <div class="song-rank">${rank}</div>
        <div class="song-info">
            <div class="song-name">${escapeHtml(song.name)}</div>
            <div class="song-details">
                <span class="singer-link" onclick="goToSinger('${escapeHtml(song.singer)}')">${escapeHtml(song.singer)}</span>
                <span class="song-genre">${song.genre}</span>
                <span class="song-year">${song.year}年</span>
            </div>
        </div>
        <div class="song-plays">${plays}</div>
        <div class="song-actions">
            <button class="action-btn" title="播放" onclick="playSongFromList({id: ${song.id}, name: '${escapeHtml(song.name)}', singer: '${escapeHtml(song.singer)}'})">♫</button>
            <button class="action-btn" title="收藏" onclick="addFavorite(${song.id}, '${escapeHtml(song.name)}', '${escapeHtml(song.singer)}')">♥</button>
        </div>
    `;
    
    return item;
}

// 格式化播放数
function formatPlayCount(count) {
    if (count >= 10000000) {
        return (count / 1000000).toFixed(1) + 'M';
    } else if (count >= 1000000) {
        return (count / 1000000).toFixed(1) + 'M';
    } else if (count >= 10000) {
        return (count / 10000).toFixed(1) + '万';
    } else {
        return count;
    }
}

// 转义HTML字符
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// 跳转到歌手页面
function goToSinger(singerName) {
    // 保存选中歌手到localStorage
    localStorage.setItem('selectedSinger', singerName);
    window.location.href = 'singers.html#' + singerName;
}

// 添加到收藏
function addFavorite(songId, songName, singerName) {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const favorite = {
        id: songId,
        name: songName,
        singer: singerName,
        addedTime: new Date().toISOString()
    };
    
    // 检查是否已存在
    if (!favorites.some(f => f.id === songId)) {
        favorites.push(favorite);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        showNotification(`已添加 "${songName}" 到收藏`);
    } else {
        showNotification(`"${songName}" 已在收藏中`);
    }
}

// 显示通知
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 2000);
}

// 初始化播放器事件监听
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        setupPlayerControls();
    }, 500);
});

function setupPlayerControls() {
    const playerElement = document.getElementById('musicPlayer');
    if (!playerElement) return;

    // 播放/暂停按钮
    const playBtn = playerElement.querySelector('.play-btn');
    if (playBtn) {
        playBtn.addEventListener('click', () => {
            player.togglePlay();
        });
    }

    // 上一首按钮
    const prevBtn = playerElement.querySelector('.prev-btn');
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            player.playPrev();
        });
    }

    // 下一首按钮
    const nextBtn = playerElement.querySelector('.next-btn');
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            player.playNext();
        });
    }

    // 音量按钮
    const volumeBtn = playerElement.querySelector('.volume-btn');
    if (volumeBtn) {
        volumeBtn.addEventListener('click', () => {
            player.toggleMute();
        });
    }

    // 音量滑块
    const volumeSlider = playerElement.querySelector('.volume-slider');
    if (volumeSlider) {
        volumeSlider.addEventListener('input', (e) => {
            player.setVolume(parseFloat(e.target.value));
        });
    }

    // 进度条点击
    const progressContainer = playerElement.querySelector('.progress-container');
    if (progressContainer) {
        progressContainer.addEventListener('click', (e) => {
            const rect = progressContainer.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            player.seek(percent * player.getDuration());
        });
    }

    // 关闭按钮
    const closeBtn = playerElement.querySelector('.close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            player.stop();
            player.hidePlayer();
        });
    }
}
