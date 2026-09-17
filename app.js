/* ============================================================
   app.js —— 网页的「行为」
   负责：渲染卡片、搜索过滤、分类切换、深色模式
   核心思路只有一条：
       数据(TOOLS) → 过滤(filterTools) → 渲染(render)
   每次输入或点击，就重新走一遍这三步
   ============================================================ */

// ---------- 1. 先抓住页面上的元素 ----------
const grid        = document.getElementById('grid');
const searchInput = document.getElementById('searchInput');
const clearBtn    = document.getElementById('clearBtn');
const categoryBar = document.getElementById('categoryBar');
const resultInfo  = document.getElementById('resultInfo');
const emptyBox    = document.getElementById('empty');
const themeBtn    = document.getElementById('themeBtn');
const topBtn      = document.getElementById('topBtn');

// 当前状态：搜什么词 + 选哪个分类
let keyword  = '';
let curCat   = '全部';

// ---------- 2. 小工具函数 ----------

/** 把特殊字符转义，防止内容里的尖括号破坏页面结构 */
function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

/** 给一段文字里的关键词加上高亮（黄色背景） */
function highlight(text, kw) {
  const safe = escapeHtml(text);
  if (!kw) return safe;
  // 正则里的特殊字符要先转义，否则用户输入 . * 会报错
  const pattern = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return safe.replace(new RegExp(pattern, 'gi'), m => `<mark>${m}</mark>`);
}

/** 根据名字生成一个稳定的头像颜色，同名的工具颜色永远一样 */
function colorOf(name) {
  const colors = [
    '#5b5bd6', '#8b5cf6', '#ec4899', '#f43f5e', '#f97316',
    '#eab308', '#22c55e', '#14b8a6', '#06b6d4', '#3b82f6',
  ];
  let sum = 0;
  for (const ch of name) sum += ch.charCodeAt(0);
  return colors[sum % colors.length];
}

/** 免费/付费标签的样式类名 */
function badgeClass(price) {
  if (price === '免费') return 'free';
  if (price === '付费') return 'paid';
  return '';
}

// ---------- 3. 生成分类按钮 ----------
function renderCategories() {
  categoryBar.innerHTML = CATEGORIES.map(cat =>
    `<button class="chip ${cat === curCat ? 'active' : ''}" data-cat="${cat}">${cat}</button>`
  ).join('');

  // 事件委托：只在父元素上挂一个监听，不用给每个按钮都挂
  categoryBar.addEventListener('click', e => {
    const btn = e.target.closest('.chip');
    if (!btn) return;
    curCat = btn.dataset.cat;
    renderCategories();   // 刷新高亮状态
    update();             // 刷新卡片
  });
}

// ---------- 4. 过滤：根据关键词 + 分类筛出要显示的工具 ----------
function filterTools() {
  const kw = keyword.trim().toLowerCase();

  return TOOLS.filter(tool => {
    // 先看分类对不对
    if (curCat !== '全部' && tool.cat !== curCat) return false;
    if (!kw) return true;

    // 再看关键词：名称、描述、分类、标签、收费方式，任一字段命中就算匹配
    // （这样搜「免费」就能筛出所有免费工具）
    const haystack = [tool.name, tool.desc, tool.cat, tool.price, ...tool.tags]
      .join(' ')
      .toLowerCase();
    return haystack.includes(kw);
  });
}

// ---------- 5. 渲染：把工具数组变成 HTML 卡片 ----------
function render(list) {
  const kw = keyword.trim();

  grid.innerHTML = list.map(tool => `
    <a class="card" href="${escapeHtml(tool.url)}" target="_blank" rel="noopener">
      <div class="card-head">
        <div class="avatar" style="background:${colorOf(tool.name)}">
          ${escapeHtml(tool.name.slice(0, 1))}
        </div>
        <div class="card-title">${highlight(tool.name, kw)}</div>
        <span class="badge ${badgeClass(tool.price)}" style="margin-left:auto">
          ${escapeHtml(tool.price)}
        </span>
      </div>
      <p class="card-desc">${highlight(tool.desc, kw)}</p>
      <div class="tags">
        ${tool.tags.map(t => `<span class="tag">${highlight(t, kw)}</span>`).join('')}
      </div>
      <span class="card-link">立即访问 →</span>
    </a>
  `).join('');

  // 更新提示文案
  resultInfo.textContent = kw
    ? `找到 ${list.length} 个与「${kw}」相关的工具`
    : `共收录 ${list.length} 个工具`;

  // 搜不到就显示空状态
  emptyBox.hidden = list.length > 0;
}

// ---------- 6. 统一入口：过滤 + 渲染 ----------
function update() {
  render(filterTools());
}

// ---------- 7. 绑定事件 ----------

// 搜索框：每敲一个字就重新过滤（input 事件 = 实时响应）
searchInput.addEventListener('input', e => {
  keyword = e.target.value;
  clearBtn.classList.toggle('show', keyword.length > 0);
  update();
});

// 清空按钮
clearBtn.addEventListener('click', () => {
  keyword = '';
  searchInput.value = '';
  clearBtn.classList.remove('show');
  searchInput.focus();
  update();
});

// 快捷键：按 / 直接聚焦搜索框
document.addEventListener('keydown', e => {
  if (e.key === '/' && document.activeElement !== searchInput) {
    e.preventDefault();
    searchInput.focus();
  }
  if (e.key === 'Escape' && document.activeElement === searchInput) {
    searchInput.blur();
  }
});

// 深色模式切换，并记住用户的选择
themeBtn.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark');
  themeBtn.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// 回到顶部
topBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
window.addEventListener('scroll', () => {
  topBtn.hidden = window.scrollY < 400;
});

// ---------- 8. 页面启动时跑一遍 ----------
function init() {
  // 恢复上次选择的主题
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    themeBtn.textContent = '☀️';
  }
  document.getElementById('totalCount').textContent = TOOLS.length;
  renderCategories();
  update();
}

init();
