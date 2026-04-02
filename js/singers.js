// 歌手页面逻辑
let allSingers = [];

document.addEventListener('DOMContentLoaded', function() {
    allSingers = getAllSingers();
    displaySingers(allSingers);
    setupEventListeners();
    
    // 检查是否有通过链接传来的歌手名
    const singerName = window.location.hash.substring(1);
    if (singerName) {
        const singer = getSingerByName(decodeURIComponent(singerName));
        if (singer) {
            showSingerDetail(singer);
        }
    }
});

function setupEventListeners() {
    // 搜索功能
    document.getElementById('singerSearchBtn').addEventListener('click', () => {
        performSingerSearch();
    });
    
    document.getElementById('singerSearchInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSingerSearch();
        }
    });
}

function performSingerSearch() {
    const keyword = document.getElementById('singerSearchInput').value.toLowerCase();
    const filtered = allSingers.filter(singer => 
        singer.name.toLowerCase().includes(keyword)
    );
    displaySingers(filtered);
}

function displaySingers(singers) {
    const container = document.getElementById('singersList');
    container.innerHTML = '';
    
    document.getElementById('singerCount').textContent = singers.length;
    
    if (singers.length === 0) {
        container.innerHTML = '<div class="no-result" style="grid-column: 1 / -1;">没有找到相关歌手</div>';
        return;
    }
    
    singers.forEach(singer => {
        const card = createSingerCard(singer);
        container.appendChild(card);
    });
}

function createSingerCard(singer) {
    const card = document.createElement('div');
    card.className = 'singer-card';
    
    // 根据歌手名的首字生成头像
    const avatarLetter = singer.name.charAt(0);
    
    card.innerHTML = `
        <div class="singer-card-inner">
            <div class="singer-avatar">
                <div class="avatar-circle">${avatarLetter}</div>
            </div>
            <div class="singer-card-content">
                <h3 class="singer-name">${escapeHtml(singer.name)}</h3>
                <p class="singer-intro">${escapeHtml(singer.intro)}</p>
                <div class="singer-info">
                    <span class="gender-badge">${singer.gender}</span>
                    <span class="genre-badges">
                        ${singer.genre.map(g => `<span class="genre-badge">${g}</span>`).join('')}
                    </span>
                </div>
                <div class="song-count">歌曲数: ${singer.works}</div>
                <button class="detail-btn">查看详情</button>
            </div>
        </div>
    `;
    
    card.addEventListener('click', function(e) {
        if (e.target.classList.contains('detail-btn')) {
            showSingerDetail(singer);
        } else {
            showSingerDetail(singer);
        }
    });
    
    return card;
}

function showSingerDetail(singer) {
    if (typeof singer === 'string') {
        try {
            singer = JSON.parse(singer);
        } catch (e) {
            // 如果是字符串，尝试从数据库找出
            singer = getSingerByName(singer);
        }
    }
    
    const panel = document.getElementById('singerDetailPanel');
    
    // 填充歌手信息
    document.getElementById('detailName').textContent = singer.name;
    document.getElementById('detailIntro').textContent = singer.intro;
    document.getElementById('detailGenre').textContent = singer.genre.join('、');
    document.getElementById('detailWorks').textContent = singer.works;
    
    // 生成头像
    const avatarLetter = singer.name.charAt(0);
    document.getElementById('detailAvatar').textContent = avatarLetter;
    
    // 显示该歌手的歌曲
    const singerSongs = getSongsBySinger(singer.name);
    const songsList = document.getElementById('singerSongsList');
    songsList.innerHTML = '';
    
    if (singerSongs.length === 0) {
        songsList.innerHTML = '<p>暂无歌曲</p>';
    } else {
        singerSongs.forEach((song, index) => {
            const songItem = document.createElement('div');
            songItem.className = 'detail-song-item';
            songItem.innerHTML = `
                <span class="item-index">${index + 1}.</span>
                <span class="item-name">${escapeHtml(song.name)}</span>
                <span class="item-year">(${song.year})</span>
                <span class="item-genre">${song.genre}</span>
                <span class="item-plays">${formatPlayCount(song.plays)}</span>
            `;
            songsList.appendChild(songItem);
        });
    }
    
    panel.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeSingerDetail() {
    document.getElementById('singerDetailPanel').style.display = 'none';
    document.body.style.overflow = 'auto';
}

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

// 点击panel外部关闭
document.addEventListener('click', function(e) {
    const panel = document.getElementById('singerDetailPanel');
    if (panel && panel.style.display === 'block' && e.target === panel) {
        closeSingerDetail();
    }
});
