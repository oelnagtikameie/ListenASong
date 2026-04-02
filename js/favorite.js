// 收藏和歌单页面逻辑

let favorites = [];
let playlists = [];
let selectedPlaylistId = null;

// 初始化页面
document.addEventListener('DOMContentLoaded', function() {
    loadFavoritesAndPlaylists();
    displayFavorites();
    displayPlaylists();
    setupEventListeners();
});

// 设置事件监听
function setupEventListeners() {
    // 标签页切换
    document.querySelectorAll('.favorite-tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            switchTab(this.dataset.tab);
        });
    });

    // 创建歌单按钮
    document.getElementById('createPlaylistBtn').addEventListener('click', () => {
        openCreatePlaylistModal();
    });

    // 清空收藏按钮
    document.getElementById('clearAllBtn').addEventListener('click', () => {
        if (favorites.length > 0 && confirm('确认要清空所有收藏吗？')) {
            favorites = [];
            saveFavoritesAndPlaylists();
            displayFavorites();
            showNotification('已清空所有收藏');
        }
    });

    // 创建歌单对话框
    document.getElementById('playlistNameInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            confirmCreatePlaylist();
        }
    });
}

// 切换标签页
function switchTab(tabName) {
    document.querySelectorAll('.favorite-tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.favorite-tab-content').forEach(content => content.classList.remove('active'));
    
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(`tab-${tabName}`).classList.add('active');
}

// 从 localStorage 加载收藏和歌单
function loadFavoritesAndPlaylists() {
    const savedFavorites = localStorage.getItem('favorites');
    const savedPlaylists = localStorage.getItem('playlists');
    
    if (savedFavorites) {
        favorites = JSON.parse(savedFavorites);
    }
    if (savedPlaylists) {
        playlists = JSON.parse(savedPlaylists);
    }
}

// 保存收藏和歌单到 localStorage
function saveFavoritesAndPlaylists() {
    localStorage.setItem('favorites', JSON.stringify(favorites));
    localStorage.setItem('playlists', JSON.stringify(playlists));
}

// 添加收藏
function addFavorite(songId, songName, singerName) {
    const favorite = {
        id: songId,
        name: songName,
        singer: singerName,
        addedTime: new Date().toISOString()
    };
    
    if (!favorites.some(f => f.id === songId)) {
        favorites.push(favorite);
        saveFavoritesAndPlaylists();
        displayFavorites();
        showNotification(`已添加 "${songName}" 到我喜欢的列表中`);
        return true;
    } else {
        showNotification(`"${songName}" 已在收藏中`);
        return false;
    }
}

// 删除收藏
function removeFavorite(songId) {
    favorites = favorites.filter(f => f.id !== songId);
    saveFavoritesAndPlaylists();
    displayFavorites();
}

// 显示收藏列表
function displayFavorites() {
    const container = document.getElementById('favoritesList');
    const count = document.getElementById('favoriteCount');
    
    count.textContent = favorites.length;

    if (favorites.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">♡</div>
                <p>还没有收藏任何歌曲</p>
                <p class="empty-hint">在歌曲列表中点击♥按钮来收藏喜欢的歌曲</p>
            </div>
        `;
        return;
    }

    container.innerHTML = '';
    favorites.forEach((favorite, index) => {
        const item = createFavoriteItem(favorite, index + 1);
        container.appendChild(item);
    });
}

// 创建收藏项目
function createFavoriteItem(favorite, index) {
    const item = document.createElement('div');
    item.className = 'favorite-item';
    
    item.innerHTML = `
        <div class="favorite-item-inner">
            <div class="favorite-rank">${index}</div>
            <div class="favorite-info">
                <div class="favorite-song-name">${escapeHtml(favorite.name)}</div>
                <div class="favorite-singer-name">${escapeHtml(favorite.singer)}</div>
            </div>
            <div class="favorite-actions">
                <button class="action-btn" title="添加到歌单" onclick="showAddToPlaylistMenu(${favorite.id}, '${escapeHtml(favorite.name)}')">➕</button>
                <button class="action-btn" title="删除收藏" onclick="removeFavorite(${favorite.id})">🗑️</button>
            </div>
        </div>
    `;

    return item;
}

// 显示添加到歌单的菜单
function showAddToPlaylistMenu(songId, songName) {
    if (playlists.length === 0) {
        showNotification('请先创建歌单');
        return;
    }

    const menuItems = playlists.map(playlist => 
        `<li><a onclick="addSongToPlaylist(${songId}, '${escapeHtml(songName)}', '${playlist.id}')">
            ${escapeHtml(playlist.name)}
        </a></li>`
    ).join('');

    // 创建上下文菜单
    let menu = document.getElementById('playlistContextMenu');
    if (!menu) {
        menu = document.createElement('div');
        menu.id = 'playlistContextMenu';
        menu.className = 'context-menu';
        document.body.appendChild(menu);
    }

    menu.innerHTML = `<ul>${menuItems}</ul>`;
    menu.style.display = 'block';

    // 点击其他地方关闭菜单
    setTimeout(() => {
        document.addEventListener('click', closeContextMenu, { once: true });
    }, 0);
}

// 关闭上下文菜单
function closeContextMenu(e) {
    const menu = document.getElementById('playlistContextMenu');
    if (menu && !menu.contains(e.target)) {
        menu.style.display = 'none';
    }
}

// 添加歌曲到歌单
function addSongToPlaylist(songId, songName, playlistId) {
    const playlist = playlists.find(p => p.id === playlistId);
    if (!playlist) return;

    const song = { id: songId, name: songName };
    
    if (!playlist.songs.some(s => s.id === songId)) {
        playlist.songs.push(song);
        saveFavoritesAndPlaylists();
        showNotification(`已添加 "${songName}" 到歌单 "${playlist.name}"`);
    } else {
        showNotification(`"${songName}" 已在歌单中`);
    }

    closeContextMenu({ target: {} });
}

// 创建歌单对话框
function openCreatePlaylistModal() {
    document.getElementById('createPlaylistModal').style.display = 'flex';
    document.getElementById('playlistNameInput').focus();
}

function closeCreatePlaylistModal() {
    document.getElementById('createPlaylistModal').style.display = 'none';
    document.getElementById('playlistNameInput').value = '';
    document.getElementById('playlistDescInput').value = '';
}

// 确认创建歌单
function confirmCreatePlaylist() {
    const name = document.getElementById('playlistNameInput').value.trim();
    const desc = document.getElementById('playlistDescInput').value.trim();

    if (!name) {
        showNotification('请输入歌单名称');
        return;
    }

    const playlist = {
        id: 'playlist_' + Date.now(),
        name: name,
        desc: desc,
        songs: [],
        createTime: new Date().toISOString()
    };

    playlists.push(playlist);
    saveFavoritesAndPlaylists();
    displayPlaylists();
    closeCreatePlaylistModal();
    showNotification(`歌单 "${name}" 创建成功`);
}

// 删除歌单
function deletePlaylist(playlistId) {
    if (confirm('确认删除此歌单吗？')) {
        playlists = playlists.filter(p => p.id !== playlistId);
        saveFavoritesAndPlaylists();
        displayPlaylists();
        showNotification('歌单已删除');
    }
}

// 显示歌单列表
function displayPlaylists() {
    const grid = document.getElementById('playlistsGrid');

    if (playlists.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📋</div>
                <p>还没有创建任何歌单</p>
                <p class="empty-hint">点击"创建新歌单"按钮来开始创建</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = '';
    playlists.forEach(playlist => {
        const card = createPlaylistCard(playlist);
        grid.appendChild(card);
    });
}

// 创建歌单卡片
function createPlaylistCard(playlist) {
    const card = document.createElement('div');
    card.className = 'playlist-card';
    
    const createDate = new Date(playlist.createTime);
    const dateStr = createDate.toLocaleDateString('zh-CN');

    card.innerHTML = `
        <div class="playlist-card-header" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
            <div class="playlist-icon">🎵</div>
        </div>
        <div class="playlist-card-body">
            <h3 class="playlist-name">${escapeHtml(playlist.name)}</h3>
            <p class="playlist-desc">${playlist.desc ? escapeHtml(playlist.desc) : '暂无描述'}</p>
            <div class="playlist-stats">
                <span>歌曲数: ${playlist.songs.length}</span>
                <span>创建: ${dateStr}</span>
            </div>
            <div class="playlist-actions">
                <button class="action-btn view-btn" onclick="showPlaylistDetail('${playlist.id}')">查看</button>
                <button class="action-btn delete-btn" onclick="deletePlaylist('${playlist.id}')">删除</button>
            </div>
        </div>
    `;

    return card;
}

// 显示歌单详情
function showPlaylistDetail(playlistId) {
    const playlist = playlists.find(p => p.id === playlistId);
    if (!playlist) return;

    document.getElementById('detailPlaylistName').textContent = playlist.name;
    document.getElementById('detailSongCount').textContent = playlist.songs.length;
    document.getElementById('detailCreateTime').textContent = new Date(playlist.createTime).toLocaleDateString('zh-CN');

    const songsList = document.getElementById('detailSongs');
    
    if (playlist.songs.length === 0) {
        songsList.innerHTML = '<div class="empty-hint">歌单中还没有歌曲</div>';
    } else {
        songsList.innerHTML = '';
        playlist.songs.forEach((song, index) => {
            const songItem = document.createElement('div');
            songItem.className = 'detail-song-item';
            songItem.innerHTML = `
                <span class="item-number">${index + 1}.</span>
                <span class="item-name">${escapeHtml(song.name)}</span>
                <button class="item-remove-btn" onclick="removeSongFromPlaylist('${playlistId}', ${song.id})">✕</button>
            `;
            songsList.appendChild(songItem);
        });
    }

    document.getElementById('playlistDetailPanel').style.display = 'block';
}

// 关闭歌单详情
function closePlaylistDetail() {
    document.getElementById('playlistDetailPanel').style.display = 'none';
}

// 从歌单中删除歌曲
function removeSongFromPlaylist(playlistId, songId) {
    const playlist = playlists.find(p => p.id === playlistId);
    if (!playlist) return;

    playlist.songs = playlist.songs.filter(s => s.id !== songId);
    saveFavoritesAndPlaylists();
    showPlaylistDetail(playlistId);
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

// 转义 HTML
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

// 关键：导出 addFavorite 函数供 songs.js 使用
window.addFavoriteSong = addFavorite;
