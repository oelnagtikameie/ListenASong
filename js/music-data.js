// 音乐数据库 - 包含真实的歌曲和歌手信息
const musicDatabase = {
    songs: [
        // 周杰伦的歌曲
        { id: 1, name: '稻香', singer: '周杰伦', genre: '流行', year: 2008, plays: 15420000 },
        { id: 2, name: '说好不哭', singer: '周杰伦', genre: '流行', year: 2019, plays: 12340000 },
        { id: 3, name: '夜曲', singer: '周杰伦', genre: '流行', year: 2005, plays: 10890000 },
        { id: 4, name: '青花瓷', singer: '周杰伦', genre: '古风', year: 2007, plays: 18900000 },
        { id: 5, name: '龙卷风', singer: '周杰伦', genre: '摇滚', year: 2002, plays: 16230000 },
        { id: 6, name: '告白气球', singer: '周杰伦', genre: '流行', year: 2014, plays: 14560000 },
        { id: 7, name: '晴天', singer: '周杰伦', genre: '流行', year: 2003, plays: 17890000 },
        { id: 8, name: '千里之外', singer: '周杰伦', genre: '古风', year: 2005, plays: 12340000 },
        { id: 9, name: '菊花台', singer: '周杰伦', genre: '古风', year: 2005, plays: 14560000 },
        { id: 10, name: '霍元甲', singer: '周杰伦', genre: '国风', year: 2006, plays: 11230000 },
        
        // 陈奕迅的歌曲
        { id: 11, name: 'K歌之王', singer: '陈奕迅', genre: '流行', year: 2000, plays: 16890000 },
        { id: 12, name: '浮躁', singer: '陈奕迅', genre: '摇滚', year: 2003, plays: 13450000 },
        { id: 13, name: '十年', singer: '陈奕迅', genre: '流行', year: 2003, plays: 15670000 },
        { id: 14, name: '打开那扇窗', singer: '陈奕迅', genre: '流行', year: 2005, plays: 12340000 },
        { id: 15, name: '孤独的病人', singer: '陈奕迅', genre: '流行', year: 2008, plays: 11230000 },
        { id: 16, name: '一个人的精彩', singer: '陈奕迅', genre: '流行', year: 2011, plays: 10890000 },
        { id: 17, name: '爱你', singer: '陈奕迅', genre: '流行', year: 2012, plays: 13450000 },
        { id: 18, name: '硬币', singer: '陈奕迅', genre: '流行', year: 2004, plays: 12340000 },
        { id: 19, name: '身体健康', singer: '陈奕迅', genre: '流行', year: 2016, plays: 9780000 },
        { id: 20, name: '圣诞夜惊魂', singer: '陈奕迅', genre: '创意', year: 2005, plays: 10890000 },
        
        // 林俊杰的歌曲
        { id: 21, name: '江南', singer: '林俊杰', genre: '流行', year: 2004, plays: 17890000 },
        { id: 22, name: '不为谁而唱', singer: '林俊杰', genre: '流行', year: 2009, plays: 14560000 },
        { id: 23, name: '樱花草', singer: '林俊杰', genre: '流行', year: 2003, plays: 12340000 },
        { id: 24, name: '她说', singer: '林俊杰', genre: '流行', year: 2007, plays: 13450000 },
        { id: 25, name: '可惜没如果', singer: '林俊杰', genre: '流行', year: 2015, plays: 15670000 },
        { id: 26, name: '进行曲', singer: '林俊杰', genre: '流行', year: 2008, plays: 11230000 },
        { id: 27, name: '丹青客', singer: '林俊杰', genre: '古风', year: 2012, plays: 10890000 },
        { id: 28, name: '西界', singer: '林俊杰', genre: '摇滚', year: 2006, plays: 9780000 },
        { id: 29, name: '多远都要来找你', singer: '林俊杰', genre: '流行', year: 2011, plays: 12340000 },
        { id: 30, name: '修炼爱情', singer: '林俊杰', genre: '流行', year: 2008, plays: 11230000 },
        
        // 五月天的歌曲
        { id: 31, name: '怎样', singer: '五月天', genre: '摇滚', year: 2000, plays: 14560000 },
        { id: 32, name: '关键词', singer: '五月天', genre: '摇滚', year: 2004, plays: 13450000 },
        { id: 33, name: '如果我们不曾相遇', singer: '五月天', genre: '摇滚', year: 2006, plays: 12340000 },
        { id: 34, name: '飞翔', singer: '五月天', genre: '摇滚', year: 2007, plays: 11230000 },
        { id: 35, name: '第二人生', singer: '五月天', genre: '摇滚', year: 2008, plays: 10890000 },
        { id: 36, name: '好好', singer: '五月天', genre: '流行', year: 2011, plays: 12340000 },
        { id: 37, name: '今天的拥抱', singer: '五月天', genre: '摇滚', year: 2013, plays: 11230000 },
        { id: 38, name: '温柔', singer: '五月天', genre: '流行', year: 2009, plays: 10890000 },
        { id: 39, name: '离开地球表面', singer: '五月天', genre: '摇滚', year: 2010, plays: 9780000 },
        { id: 40, name: '时光机', singer: '五月天', genre: '摇滚', year: 2015, plays: 11230000 },
        
        // 许嵩的歌曲
        { id: 41, name: '灵感少女', singer: '许嵩', genre: '流行', year: 2009, plays: 13450000 },
        { id: 42, name: '白色风车', singer: '许嵩', genre: '流行', year: 2008, plays: 12340000 },
        { id: 43, name: '有何不可', singer: '许嵩', genre: '流行', year: 2010, plays: 14560000 },
        { id: 44, name: '山外小楼夜听雨', singer: '许嵩', genre: '古风', year: 2011, plays: 11230000 },
        { id: 45, name: '千百度', singer: '许嵩', genre: '流行', year: 2012, plays: 10890000 },
        { id: 46, name: '怎么说呢', singer: '许嵩', genre: '流行', year: 2016, plays: 9780000 },
        { id: 47, name: '清明雨上', singer: '许嵩', genre: '古风', year: 2009, plays: 13450000 },
        { id: 48, name: '断桥残雪', singer: '许嵩', genre: '古风', year: 2012, plays: 12340000 },
        { id: 49, name: '竹外', singer: '许嵩', genre: '古风', year: 2015, plays: 10890000 },
        { id: 50, name: '玲珑', singer: '许嵩', genre: '流行', year: 2013, plays: 11230000 },
        
        // 汪峰的歌曲
        { id: 51, name: '北京北京', singer: '汪峰', genre: '摇滚', year: 2004, plays: 15670000 },
        { id: 52, name: '光芒', singer: '汪峰', genre: '摇滚', year: 2007, plays: 13450000 },
        { id: 53, name: '怒放的生命', singer: '汪峰', genre: '摇滚', year: 2005, plays: 16230000 },
        { id: 54, name: '春天里', singer: '汪峰', genre: '摇滚', year: 2008, plays: 14560000 },
        { id: 55, name: '生来高贵', singer: '汪峰', genre: '摇滚', year: 2009, plays: 12340000 },
        { id: 56, name: '不是我不明白', singer: '汪峰', genre: '摇滚', year: 2003, plays: 11230000 },
        { id: 57, name: '飞得更高', singer: '汪峰', genre: '摇滚', year: 2006, plays: 13450000 },
        { id: 58, name: '花火', singer: '汪峰', genre: '摇滚', year: 2010, plays: 10890000 },
        { id: 59, name: '迷楼', singer: '汪峰', genre: '摇滚', year: 2011, plays: 12340000 },
        { id: 60, name: '我爱你中国', singer: '汪峰', genre: '爱国', year: 2009, plays: 11230000 },
        
        // 张信哲的歌曲
        { id: 61, name: '逆光', singer: '张信哲', genre: '流行', year: 1997, plays: 13450000 },
        { id: 62, name: '过敏', singer: '张信哲', genre: '流行', year: 1995, plays: 12340000 },
        { id: 63, name: '一直很安静', singer: '张信哲', genre: '流行', year: 1999, plays: 14560000 },
        { id: 64, name: '不得不爱', singer: '张信哲', genre: '流行', year: 2005, plays: 11230000 },
        { id: 65, name: '想你的夜', singer: '张信哲', genre: '流行', year: 1992, plays: 10890000 },
        { id: 66, name: '有没有一首歌', singer: '张信哲', genre: '流行', year: 2008, plays: 12340000 },
        { id: 67, name: '爱很简单', singer: '张信哲', genre: '流行', year: 2003, plays: 11230000 },
        { id: 68, name: '等你回来', singer: '张信哲', genre: '流行', year: 2006, plays: 10890000 },
        { id: 69, name: '我愿意为你', singer: '张信哲', genre: '流行', year: 2000, plays: 9780000 },
        { id: 70, name: '天下无不散筵席', singer: '张信哲', genre: '流行', year: 2007, plays: 11230000 },
        
        // 徐良的歌曲
        { id: 71, name: '手心的温度', singer: '徐良', genre: '流行', year: 2007, plays: 13450000 },
        { id: 72, name: '一个人', singer: '徐良', genre: '流行', year: 2009, plays: 12340000 },
        { id: 73, name: '浪漫满屋', singer: '徐良', genre: '流行', year: 2010, plays: 11230000 },
        { id: 74, name: '我们的故事', singer: '徐良', genre: '流行', year: 2011, plays: 10890000 },
        { id: 75, name: '诗人的眼泪', singer: '徐良', genre: '民谣', year: 2012, plays: 12340000 },
        { id: 76, name: '你不是我想要的', singer: '徐良', genre: '流行', year: 2013, plays: 11230000 },
        { id: 77, name: '假如我是真的', singer: '徐良', genre: '流行', year: 2008, plays: 10890000 },
        { id: 78, name: '灵魂摆渡人', singer: '徐良', genre: '流行', year: 2014, plays: 9780000 },
        { id: 79, name: '雨中的回忆', singer: '徐良', genre: '民谣', year: 2015, plays: 11230000 },
        { id: 80, name: '街角的秘密', singer: '徐良', genre: '流行', year: 2016, plays: 10890000 },
        
        // 张杰的歌曲
        { id: 81, name: '逆战', singer: '张杰', genre: '流行', year: 2012, plays: 15670000 },
        { id: 82, name: '这就是爱', singer: '张杰', genre: '流行', year: 2009, plays: 14560000 },
        { id: 83, name: '我想', singer: '张杰', genre: '流行', year: 2008, plays: 13450000 },
        { id: 84, name: '午夜的咖啡屋', singer: '张杰', genre: '流行', year: 2010, plays: 12340000 },
        { id: 85, name: '光芒', singer: '张杰', genre: '流行', year: 2011, plays: 11230000 },
        { id: 86, name: '想和你去吹吹风', singer: '张杰', genre: '流行', year: 2015, plays: 13450000 },
        { id: 87, name: '在你背后', singer: '张杰', genre: '流行', year: 2013, plays: 12340000 },
        { id: 88, name: '仰望', singer: '张杰', genre: '流行', year: 2014, plays: 11230000 },
        { id: 89, name: '黄玫瑰', singer: '张杰', genre: '流行', year: 2016, plays: 10890000 },
        { id: 90, name: '梦想绽放', singer: '张杰', genre: '流行', year: 2017, plays: 9780000 },
        
        // 薛之谦的歌曲
        { id: 91, name: '演员', singer: '薛之谦', genre: '流行', year: 2014, plays: 18900000 },
        { id: 92, name: '动物世界', singer: '薛之谦', genre: '流行', year: 2018, plays: 17890000 },
        { id: 93, name: '一半', singer: '薛之谦', genre: '流行', year: 2012, plays: 16230000 },
        { id: 94, name: '绅士', singer: '薛之谦', genre: '流行', year: 2016, plays: 14560000 },
        { id: 95, name: '代理人', singer: '薛之谦', genre: '流行', year: 2018, plays: 13450000 },
        { id: 96, name: '爸爸妈妈', singer: '薛之谦', genre: '流行', year: 2017, plays: 12340000 },
        { id: 97, name: '丑美人', singer: '薛之谦', genre: '流行', year: 2019, plays: 11230000 },
        { id: 98, name: '我女友的男朋友', singer: '薛之谦', genre: '创意', year: 2015, plays: 10890000 },
        { id: 99, name: '光芒', singer: '薛之谦', genre: '流行', year: 2013, plays: 9780000 },
        { id: 100, name: '慢半拍', singer: '薛之谦', genre: '流行', year: 2011, plays: 11230000 },
        
        // 哥哥(黑豹乐队)的歌曲
        { id: 101, name: '无地自容', singer: '黑豹乐队', genre: '摇滚', year: 1990, plays: 12340000 },
        { id: 102, name: '朋友', singer: '黑豹乐队', genre: '摇滚', year: 1992, plays: 11230000 },
        { id: 103, name: '同归于尽', singer: '黑豹乐队', genre: '摇滚', year: 1991, plays: 10890000 },
        { id: 104, name: '漫漫长路', singer: '黑豹乐队', genre: '摇滚', year: 1993, plays: 9780000 },
        { id: 105, name: '绝情', singer: '黑豹乐队', genre: '摇滚', year: 1994, plays: 11230000 },
    ],
    
    singers: [
        { 
            id: 1, 
            name: '周杰伦', 
            gender: '男', 
            birthYear: 1979, 
            intro: '华语乐坛天王级歌手,创作型歌手',
            genre: ['流行', '摇滚', '古风'],
            works: 10 
        },
        { 
            id: 2, 
            name: '陈奕迅', 
            gender: '男', 
            birthYear: 1974, 
            intro: '香港实力派歌手,以慢歌著称',
            genre: ['流行', '摇滚'],
            works: 10 
        },
        { 
            id: 3, 
            name: '林俊杰', 
            gender: '男', 
            birthYear: 1981, 
            intro: '新加坡歌手,词曲作家',
            genre: ['流行', '古风', '摇滚'],
            works: 10 
        },
        { 
            id: 4, 
            name: '五月天', 
            gender: '组合', 
            birthYear: 1999, 
            intro: '台湾摇滚乐队,乐队灵魂人物为阿信',
            genre: ['摇滚'],
            works: 10 
        },
        { 
            id: 5, 
            name: '许嵩', 
            gender: '男', 
            birthYear: 1986, 
            intro: '中国创作型歌手,古风音乐代表人物',
            genre: ['流行', '古风'],
            works: 10 
        },
        { 
            id: 6, 
            name: '汪峰', 
            gender: '男', 
            birthYear: 1969, 
            intro: '中国摇滚乐代表,以激情摇滚著称',
            genre: ['摇滚', '爱国'],
            works: 10 
        },
        { 
            id: 7, 
            name: '张信哲', 
            gender: '男', 
            birthYear: 1966, 
            intro: '资深歌手,以深情慢歌著称',
            genre: ['流行'],
            works: 10 
        },
        { 
            id: 8, 
            name: '徐良', 
            gender: '男', 
            birthYear: 1990, 
            intro: '创作歌手,网络歌手先驱',
            genre: ['流行', '民谣'],
            works: 10 
        },
        { 
            id: 9, 
            name: '张杰', 
            gender: '男', 
            birthYear: 1987, 
            intro: '歌手,中国好声音导师',
            genre: ['流行'],
            works: 10 
        },
        { 
            id: 10, 
            name: '薛之谦', 
            gender: '男', 
            birthYear: 1983, 
            intro: '创作歌手,演员',
            genre: ['流行'],
            works: 10 
        },
        { 
            id: 11, 
            name: '黑豹乐队', 
            gender: '组合', 
            birthYear: 1986, 
            intro: '中国摇滚乐先驱,代表作无地自容',
            genre: ['摇滚'],
            works: 5 
        },
    ]
};

// 获取所有歌曲
function getAllSongs() {
    return musicDatabase.songs;
}

// 获取所有歌手
function getAllSingers() {
    return musicDatabase.singers;
}

// 按歌手名或歌曲名搜索
function searchSongs(keyword) {
    if (!keyword) return musicDatabase.songs;
    const kw = keyword.toLowerCase();
    return musicDatabase.songs.filter(song => 
        song.name.toLowerCase().includes(kw) || 
        song.singer.toLowerCase().includes(kw)
    );
}

// 按类型筛选
function filterByGenre(genre) {
    if (!genre) return musicDatabase.songs;
    return musicDatabase.songs.filter(song => song.genre === genre);
}

// 获取所有类型
function getAllGenres() {
    const genres = new Set();
    musicDatabase.songs.forEach(song => genres.add(song.genre));
    return Array.from(genres).sort();
}

// 根据歌手名获取歌手信息
function getSingerByName(name) {
    return musicDatabase.singers.find(singer => singer.name === name);
}

// 根据歌手名获取该歌手的所有歌曲
function getSongsBySinger(singerName) {
    return musicDatabase.songs.filter(song => song.singer === singerName);
}
