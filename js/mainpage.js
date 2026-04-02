// 获取页面元素
const mainPage = document.getElementById('mainPage');
const menuPage = document.getElementById('menuPage');
let isScrolling = false;
let currentPage = 0; // 0: 主页, 1: 目录页

// 鼠标滚轮事件
document.addEventListener('wheel', (e) => {
    if (isScrolling) return;
    
    e.preventDefault();
    
    if (e.deltaY > 0) {
        // 向下滚动
        scrollDown();
    } else {
        // 向上滚动
        scrollUp();
    }
}, { passive: false });

// 触摸事件（移动设备支持）
let touchStartY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchend', (e) => {
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY - touchEndY;
    
    if (isScrolling) return;
    
    if (diff > 50) {
        // 向下滑动
        scrollDown();
    } else if (diff < -50) {
        // 向上滑动
        scrollUp();
    }
});

function scrollDown() {
    if (currentPage === 0) {
        isScrolling = true;
        // 跳转到菜单页面
        window.location.href = 'menu.html';
    }
}

function scrollUp() {
    if (currentPage === 1) {
        isScrolling = true;
        // 返回主页
        window.location.href = 'mainpage.html';
    }
}

// 键盘支持 (向下箭头/PageDown 进入目录)
document.addEventListener('keydown', (e) => {
    if (isScrolling) return;
    
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        scrollDown();
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        scrollUp();
    }
});
