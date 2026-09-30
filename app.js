/* ============================================================
   app.js —— 网页的「行为」
   负责：渲染卡片、搜索过滤、分类切换、板块切换、深色模式
   核心思路只有一条：
       选数据源 → 过滤(filter) → 渲染(render)
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
const tabsBox     = document.querySelector('.hero .tabs');
const overrideTip = document.getElementById('overrideTip');

// 当前状态：看哪个板块 + 搜什么词 + 选哪个分类
let curTab   = 'tools';   // 'tools' 工具 | 'articles' 资讯
let keyword  = '';
let curCat   = '全部';

// 后台改动存在 localStorage 的键名（要和 admin.js 里保持一致）
const KEY_TOOLS    = 'admin_tools';
const KEY_ARTICLES = 'admin_articles';

/**
 * 后台在浏览器里改过数据，就优先用改动后的版本；
 * 没改过就用 tools.js / articles.js 里的原始数据。
 */
function loadOverride(base, key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return base;
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : base;
  } catch (e) {
    console.warn('读取本地改动失败，使用原始数据', e);
    return base;
  }
}

const TOOLS_V2    = loadOverride(TOOLS, KEY_TOOLS);
const ARTICLES_V2 = loadOverride(ARTICLES, KEY_ARTICLES);
const HAS_OVERRIDE = localStorage.getItem(KEY_TOOLS) || localStorage.getItem(KEY_ARTICLES);

/**
 * 分类按钮 = 文件里声明的分类 + 数据里实际出现的分类
 * 这样后台新增了自定义分类，首页也能自动显示出来
 */
function buildCats(declared, list) {
  const out = [];
  const push = c => { if (c && !out.includes(c)) out.push(c); };
  push('全部');
  declared.forEach(c => push(c));      // push 内部会跳过重复的「全部」
  list.forEach(i => push(i.cat));      // 补充后台新增的分类
  return out;
}

/** 根据当前板块，取对应的数据、分类和单位词 */
function getData() {
  if (curTab === 'tools') {
    const list = TOOLS_V2;
    return { list, cats: buildCats(CATEGORIES, list), unit: '个工具' };
  }
  const list = ARTICLES_V2;
  return { list, cats: buildCats(ARTICLE_CATS, list), unit: '个资讯源' };
}

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

/** 根据名字生成一个稳定的头像颜色，同名的永远一样 */
function colorOf(name) {
  const colors = [
    '#5b5bd6', '#8b5cf6', '#ec4899', '#f43f5e', '#f97316',
    '#eab308', '#22c55e', '#14b8a6', '#06b6d4', '#3b82f6',
  ];
  let sum = 0;
  for (const ch of name) sum += ch.charCodeAt(0);
  return colors[sum % colors.length];
}

/** 工具卡片的「免费/付费」标签样式 */
function priceClass(price) {
  if (price === '免费') return 'free';
  if (price === '付费') return 'paid';
  return '';
}

/** 资讯卡片的平台标签样式 */
function platformClass(p) {
  if (p === '公众号')   return 'wx';
  if (p === '邮件订阅') return 'mail';
  if (p === '社区')     return 'forum';
  return 'site';        // 网站
}

// ---------- 3. 生成分类按钮 ----------
function renderCategories() {
  const { cats } = getData();
  // 如果当前选中的分类已经被删光了，就退回「全部」
  if (!cats.includes(curCat)) curCat = '全部';
  categoryBar.innerHTML = cats.map(cat =>
    `<button class="chip ${cat === curCat ? 'active' : ''}" data-cat="${cat}">${cat}</button>`
  ).join('');
}

// 绑定一次事件委托（只挂一次，避免重复监听）
categoryBar.addEventListener('click', e => {
  const btn = e.target.closest('.chip');
  if (!btn) return;
  curCat = btn.dataset.cat;
  renderCategories();
  update();
});

// ---------- 4. 板块 Tab 切换 ----------
tabsBox.addEventListener('click', e => {
  const btn = e.target.closest('.tab');
  if (!btn || btn.dataset.tab === curTab) return;
  curTab = btn.dataset.tab;
  curCat = '全部';

  // 切板块时顺手清空搜索词，否则会带着上一个板块的关键词，结果莫名其妙
  keyword = '';
  searchInput.value = '';
  clearBtn.classList.remove('show');

  // 更新按钮高亮
  tabsBox.querySelectorAll('.tab').forEach(t =>
    t.classList.toggle('active', t.dataset.tab === curTab));

  // 换搜索框提示语
  searchInput.placeholder = curTab === 'tools'
    ? '试试搜「绘画」「代码」「免费」或工具名…'
    : '试试搜「快讯」「论文」「开源」或媒体名…';

  renderCategories();
  update();
});

// ---------- 5. 过滤 ----------
function filterList() {
  const { list } = getData();
  const kw = keyword.trim().toLowerCase();

  return list.filter(item => {
    if (curCat !== '全部' && item.cat !== curCat) return false;
    if (!kw) return true;

    // 工具：搜名称、描述、分类、标签、收费方式
    // 资讯：搜名称、描述、分类、标签、平台、更新频率、公众号 ID
    const fields = [item.name, item.desc, item.cat, ...(item.tags || [])];
    if (curTab === 'tools') fields.push(item.price);
    if (curTab === 'articles') fields.push(item.platform, item.freq, item.wx || '');

    return fields.join(' ').toLowerCase().includes(kw);
  });
}

// ---------- 6. 渲染 ----------

/** 渲染一张工具卡片 */
function toolCard(t, kw) {
  return `
    <a class="card" href="${escapeHtml(t.url)}" target="_blank" rel="noopener">
      <div class="card-head">
        <div class="avatar" style="background:${colorOf(t.name)}">
          ${escapeHtml(t.name.slice(0, 1))}
        </div>
        <div class="card-title">${highlight(t.name, kw)}</div>
        <span class="badge ${priceClass(t.price)}" style="margin-left:auto">
          ${escapeHtml(t.price)}
        </span>
      </div>
      <p class="card-desc">${highlight(t.desc, kw)}</p>
      <div class="tags">
        ${(t.tags || []).map(x => `<span class="tag">${highlight(x, kw)}</span>`).join('')}
      </div>
      <span class="card-link">立即访问 →</span>
    </a>`;
}

/** 渲染一张资讯卡片 */
function articleCard(a, kw) {
  return `
    <a class="card" href="${escapeHtml(a.url)}" target="_blank" rel="noopener">
      <div class="card-head">
        <div class="avatar" style="background:${colorOf(a.name)}">
          ${escapeHtml(a.name.slice(0, 1))}
        </div>
        <div class="card-title">${highlight(a.name, kw)}</div>
        <span class="badge ${platformClass(a.platform)}" style="margin-left:auto">
          ${escapeHtml(a.platform)}
        </span>
      </div>
      <p class="card-desc">${highlight(a.desc, kw)}</p>
      <div class="tags">
        <span class="tag freq">🔔 ${highlight(a.freq, kw)}</span>
        ${(a.tags || []).map(x => `<span class="tag">${highlight(x, kw)}</span>`).join('')}
      </div>
      <div class="card-foot">
        <span class="card-link">${a.wx ? '去关注 →' : '去阅读 →'}</span>
        ${a.wx ? `<span class="wx-id" title="在微信搜索这个 ID 即可关注">微信搜：${escapeHtml(a.wx)}</span>` : ''}
      </div>
    </a>`;
}

function render(list) {
  const kw = keyword.trim();
  grid.innerHTML = list.map(item =>
    curTab === 'tools' ? toolCard(item, kw) : articleCard(item, kw)
  ).join('');

  const { unit } = getData();
  resultInfo.textContent = kw
    ? `找到 ${list.length} ${unit}与「${kw}」相关`
    : `共收录 ${list.length} ${unit}`;

  emptyBox.hidden = list.length > 0;
}

// ---------- 7. 统一入口 ----------
function update() {
  render(filterList());
}

// ---------- 8. 绑定事件 ----------

// 搜索框：每敲一个字就重新过滤
searchInput.addEventListener('input', e => {
  keyword = e.target.value;
  clearBtn.classList.toggle('show', keyword.length > 0);
  update();
});

clearBtn.addEventListener('click', () => {
  keyword = '';
  searchInput.value = '';
  clearBtn.classList.remove('show');
  searchInput.focus();
  update();
});

// 快捷键：/ 聚焦搜索框，Esc 退出
// Ctrl + Shift + A 打开后台
document.addEventListener('keydown', e => {
  if (e.key === '/' && document.activeElement !== searchInput) {
    e.preventDefault();
    searchInput.focus();
  }
  if (e.key === 'Escape' && document.activeElement === searchInput) {
    searchInput.blur();
  }
  if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
    e.preventDefault();
    location.href = 'admin.html';
  }
});

// 深色模式
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

// ---------- 9. 启动 ----------
function init() {
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    themeBtn.textContent = '☀️';
  }
  document.getElementById('totalTools').textContent    = TOOLS_V2.length;
  document.getElementById('totalArticles').textContent = ARTICLES_V2.length;
  if (HAS_OVERRIDE) overrideTip.hidden = false;
  renderCategories();
  update();
}

init();
