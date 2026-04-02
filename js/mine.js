// 用户信息数据
let userProfile = {
    nickname: '用户昵称',
    gender: '',
    intro: '',
    birthday: '',
    genres: '',
    follows: ''
};

// 从本地存储加载数据
function loadUserProfile() {
    const saved = localStorage.getItem('userProfile');
    if (saved) {
        userProfile = JSON.parse(saved);
    }
    displayUserProfile();
}

// 显示用户资料
function displayUserProfile() {
    document.getElementById('displayNickname').textContent = userProfile.nickname;
    document.getElementById('avatarInitial').textContent = userProfile.nickname.charAt(0);
    
    // 显示生日
    if (userProfile.birthday) {
        const date = new Date(userProfile.birthday);
        const month = date.getMonth() + 1;
        const day = date.getDate();
        document.getElementById('displayBirthday').textContent = `生日: ${month}月${day}日`;
    } else {
        document.getElementById('displayBirthday').textContent = '生日未设置';
    }
    
    // 显示其他信息
    document.getElementById('displayGender').textContent = userProfile.gender || '未设置';
    document.getElementById('displayIntro').textContent = userProfile.intro || '暂无简介';
    document.getElementById('displayGenres').textContent = userProfile.genres || '未设置';
    document.getElementById('displayFollows').textContent = userProfile.follows || '暂无关注';
}

// 进入编辑模式
function enterEditMode() {
    document.getElementById('infoDisplay').style.display = 'none';
    document.getElementById('infoForm').style.display = 'block';
    document.getElementById('editBtn').style.display = 'none';
    
    // 填充表单数据
    document.getElementById('nickname').value = userProfile.nickname;
    document.getElementById('gender').value = userProfile.gender;
    document.getElementById('intro').value = userProfile.intro;
    document.getElementById('birthday').value = userProfile.birthday;
    document.getElementById('genres').value = userProfile.genres;
    document.getElementById('follows').value = userProfile.follows;
}

// 退出编辑模式
function exitEditMode() {
    document.getElementById('infoDisplay').style.display = 'block';
    document.getElementById('infoForm').style.display = 'none';
    document.getElementById('editBtn').style.display = 'block';
}

// 保存用户资料
function saveUserProfile() {
    userProfile.nickname = document.getElementById('nickname').value || '用户昵称';
    userProfile.gender = document.getElementById('gender').value;
    userProfile.intro = document.getElementById('intro').value;
    userProfile.birthday = document.getElementById('birthday').value;
    userProfile.genres = document.getElementById('genres').value;
    userProfile.follows = document.getElementById('follows').value;
    
    // 保存到本地存储
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
    
    // 更新显示
    displayUserProfile();
    exitEditMode();
    
    // 显示保存成功提示
    showNotification('资料已保存成功！');
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

// 初始化事件监听
document.addEventListener('DOMContentLoaded', function() {
    loadUserProfile();
    
    // 编辑按钮
    document.getElementById('editBtn').addEventListener('click', enterEditMode);
    
    // 取消按钮
    document.getElementById('cancelBtn').addEventListener('click', exitEditMode);
    
    // 表单提交
    document.getElementById('infoForm').addEventListener('submit', function(e) {
        e.preventDefault();
        saveUserProfile();
    });
});
