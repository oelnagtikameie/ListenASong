// 排行榜页面逻辑
let currentRankType = 'songs';
let currentSortType = 'default';

// 初始化排行榜
document.addEventListener('DOMContentLoaded', function() {
    displayRankList('songs');
    setupEventListeners();
});

// 设置事件监听
function setupEventListeners() {
    // 排行榜标签页切换
    document.querySelectorAll('.rank-tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.rank-tab-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const rankType = this.dataset.rank;
            currentRankType = rankType;
            currentSortType = 'default';
            
            // 重置排序按钮
            document.querySelectorAll('.sort-option-btn').forEach(b => b.classList.remove('active'));
            document.querySelector('.sort-option-btn[data-sort-type="default"]').classList.add('active');
            
            displayRankList(rankType);
        });
    });

    // 排序选项
    document.querySelectorAll('.sort-option-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.sort-option-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentSortType = this.dataset.sortType;
            displayRankList(currentRankType);
        });
    });
}

// 显示排行榜列表
function displayRankList(rankType) {
    document.querySelectorAll('.rank-list').forEach(list => {
        list.classList.remove('active');
    });
    
    const rankList = document.getElementById(`rank-${rankType}`);
    if (rankList) {
        rankList.classList.add('active');
    }

    switch(rankType) {
        case 'songs':
            displaySongsRank();
            break;
        case 'singers':
            displaySingersRank();
            break;
        case 'newest':
            displayNewestRank();
            break;
    }
}

// 歌曲热度排行
function displaySongsRank() {
    let songs = [...getAllSongs()];
    songs = sortRankList(songs, 'plays');
    
    const container = document.getElementById('rank-songs-list');
    container.innerHTML = '';

    songs.forEach((song, index) => {
        const item = createSongRankItem(song, index + 1);
        container.appendChild(item);
    });
}

// 歌手热度排行
function displaySingersRank() {
    const singers = getAllSingers();
    
    // 计算每个歌手的总播放数
    const singerStats = singers.map(singer => {
        const singerSongs = getSongsBySinger(singer.name);
        const totalPlays = singerSongs.reduce((sum, song) => sum + song.plays, 0);
        return {
            ...singer,
            totalPlays: totalPlays
        };
    });

    let rankedSingers = sortRankList(singerStats, 'totalPlays');
    
    const container = document.getElementById('rank-singers-list');
    container.innerHTML = '';

    rankedSingers.forEach((singer, index) => {
        const item = createSingerRankItem(singer, index + 1);
        container.appendChild(item);
    });
}

// 最新歌曲排行
function displayNewestRank() {
    let songs = [...getAllSongs()];
    songs = sortRankByYear(songs);
    
    const container = document.getElementById('rank-newest-list');
    container.innerHTML = '';

    songs.forEach((song, index) => {
        const item = createNewestRankItem(song, index + 1);
        container.appendChild(item);
    });
}

// 排序函数
function sortRankList(list, sortField) {
    let sorted = [...list];

    if (currentSortType === 'default') {
        // 默认降序（热度最高）
        sorted.sort((a, b) => b[sortField] - a[sortField]);
    } else if (currentSortType === 'ascending') {
        // 升序
        sorted.sort((a, b) => a[sortField] - b[sortField]);
    } else if (currentSortType === 'descending') {
        // 降序
        sorted.sort((a, b) => b[sortField] - a[sortField]);
    }

    return sorted;
}

// 按年份排序（新歌排行）
function sortRankByYear(list) {
    let sorted = [...list];

    if (currentSortType === 'default') {
        // 默认按年份降序（最新的在前）
        sorted.sort((a, b) => b.year - a.year);
    } else if (currentSortType === 'ascending') {
        // 按年份升序（最老的在前）
        sorted.sort((a, b) => a.year - b.year);
    } else if (currentSortType === 'descending') {
        // 按年份降序（最新的在前）
        sorted.sort((a, b) => b.year - a.year);
    }

    return sorted;
}

// 创建歌曲排行项目
function createSongRankItem(song, rank) {
    const item = document.createElement('div');
    item.className = 'rank-item';
    
    // 根据排名给予不同的样式
    if (rank === 1) item.classList.add('rank-1');
    else if (rank === 2) item.classList.add('rank-2');
    else if (rank === 3) item.classList.add('rank-3');

    const plays = formatPlayCount(song.plays);
    const rankMedal = getRankMedal(rank);

    item.innerHTML = `
        <span class="rank-number">${rankMedal}</span>
        <span class="rank-name">${escapeHtml(song.name)}</span>
        <span class="rank-artist">${escapeHtml(song.singer)}</span>
        <span class="rank-genre">${song.genre}</span>
        <span class="rank-plays">${plays}</span>
        <span class="rank-year">${song.year}</span>
    `;

    return item;
}

// 创建歌手排行项目
function createSingerRankItem(singer, rank) {
    const item = document.createElement('div');
    item.className = 'rank-item';
    
    if (rank === 1) item.classList.add('rank-1');
    else if (rank === 2) item.classList.add('rank-2');
    else if (rank === 3) item.classList.add('rank-3');

    const totalPlays = formatPlayCount(singer.totalPlays);
    const rankMedal = getRankMedal(rank);

    item.innerHTML = `
        <span class="rank-number">${rankMedal}</span>
        <span class="rank-name">${escapeHtml(singer.name)}</span>
        <span class="rank-artist">${singer.gender}</span>
        <span class="rank-genre">${singer.genre.join('、')}</span>
        <span class="rank-plays">${totalPlays}</span>
        <span class="rank-year">${singer.works}</span>
    `;

    return item;
}

// 创建最新歌曲排行项目
function createNewestRankItem(song, rank) {
    const item = document.createElement('div');
    item.className = 'rank-item';
    
    if (rank === 1) item.classList.add('rank-1');
    else if (rank === 2) item.classList.add('rank-2');
    else if (rank === 3) item.classList.add('rank-3');

    const plays = formatPlayCount(song.plays);
    const rankMedal = getRankMedal(rank);

    item.innerHTML = `
        <span class="rank-number">${rankMedal}</span>
        <span class="rank-name">${escapeHtml(song.name)}</span>
        <span class="rank-artist">${escapeHtml(song.singer)}</span>
        <span class="rank-genre">${song.genre}</span>
        <span class="rank-plays">${song.year}</span>
        <span class="rank-year">${plays}</span>
    `;

    return item;
}

// 获取排名奖牌
function getRankMedal(rank) {
    const medals = {
        1: '🥇',
        2: '🥈',
        3: '🥉',
    };
    return medals[rank] || `${rank}`;
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

// 转义HTML
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
