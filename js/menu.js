// ========== 首页内的四个子菜单点击事件 ==========
const introBtns = document.querySelectorAll('.intro-btn');
const sections = document.querySelectorAll('.section');

introBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetSection = btn.getAttribute('data-section');
        
        // 更新按钮样式
        introBtns.forEach(item => item.classList.remove('active'));
        btn.classList.add('active');
        
        // 显示对应内容
        sections.forEach(section => section.classList.remove('active'));
        document.getElementById(targetSection).classList.add('active');
    });
});

// ========== 初始化 ==========
// 默认显示首页的"创建人"内容
const creatorBtn = document.querySelector('[data-section="creator"]');
if (creatorBtn) {
    creatorBtn.click();
}
