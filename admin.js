/* ============================================================
   admin.js —— 后台管理逻辑
   ------------------------------------------------------------
   流程：
     密码校验 → 读数据（优先读 localStorage 里的改动）→ 增删改
     → 存回 localStorage → 首页自动生效
     → 导出代码 → 上传 GitHub 才对所有人生效
   ============================================================ */

/* ---------- 0. 密码 ----------
   ⚠️ 重要：btoa 只是简单编码，不是加密。
   任何人打开浏览器开发者工具，运行 atob("MTIz") 就能看到明文 "123"。
   静态网页没有后端，做不到真正的密码保护。
   这里的密码只用来防止自己或别人误触，别用它保护敏感内容。 */
const PWD_ENCODED = btoa('123');

const KEY_TOOLS    = 'admin_tools';      // 改动存在 localStorage 的键名
const KEY_ARTICLES = 'admin_articles';
const KEY_AUTH     = 'admin_authed';     // 本次登录状态（关掉标签页就失效）

// ---------- 1. 抓元素 ----------
const loginMask  = document.getElementById('loginMask');
const loginForm  = document.getElementById('loginForm');
const pwdInput   = document.getElementById('pwdInput');
const loginErr   = document.getElementById('loginErr');
const panel      = document.getElementById('panel');
const listBox    = document.getElementById('list');
const adminEmpty = document.getElementById('adminEmpty');
const statText   = document.getElementById('statText');
const adminSearch= document.getElementById('adminSearch');
const formMask   = document.getElementById('formMask');
const itemForm   = document.getElementById('itemForm');
const formTitle  = document.getElementById('formTitle');
const exportMask = document.getElementById('exportMask');
const exportArea = document.getElementById('exportArea');
const catList    = document.getElementById('catList');

// ---------- 2. 状态 ----------
let curTab      = 'tools';   // 'tools' | 'articles'
let editingIdx  = -1;        // -1 表示新增
let exportFile  = 'tools';   // 导出面板当前显示哪个文件

// 从 localStorage 读改动，没有就用原始数据
function loadSaved(key, base) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return base.map(o => ({ ...o }));
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : base.map(o => ({ ...o }));
  } catch (e) {
    console.warn('读取本地数据失败，改用原始数据', e);
    return base.map(o => ({ ...o }));
  }
}

let toolsData    = loadSaved(KEY_TOOLS, TOOLS);
let articlesData = loadSaved(KEY_ARTICLES, ARTICLES);

function curData()    { return curTab === 'tools' ? toolsData : articlesData; }
function curKey()     { return curTab === 'tools' ? KEY_TOOLS : KEY_ARTICLES; }

function save() {
  try {
    localStorage.setItem(KEY_TOOLS, JSON.stringify(toolsData));
    localStorage.setItem(KEY_ARTICLES, JSON.stringify(articlesData));
  } catch (e) {
    alert('保存失败：浏览器存储空间可能已满');
  }
}

// ---------- 3. 登录 ----------
function checkPwd(val) {
  return btoa(val) === PWD_ENCODED;
}

function enterPanel() {
  loginMask.hidden = true;
  panel.hidden = false;
  sessionStorage.setItem(KEY_AUTH, '1');
  render();
}

function logout() {
  sessionStorage.removeItem(KEY_AUTH);
  panel.hidden = true;
  loginMask.hidden = false;
  pwdInput.value = '';
  loginErr.hidden = true;
  pwdInput.focus();
}

loginForm.addEventListener('submit', e => {
  e.preventDefault();
  if (checkPwd(pwdInput.value)) {
    enterPanel();
  } else {
    loginErr.hidden = false;
    pwdInput.value = '';
    pwdInput.focus();
  }
});

// 已经登录过（同一标签页内刷新）就直接进
if (sessionStorage.getItem(KEY_AUTH) === '1') enterPanel();

// ---------- 4. 渲染列表 ----------
function colorOf(name) {
  const colors = ['#5b5bd6','#8b5cf6','#ec4899','#f43f5e','#f97316',
                  '#eab308','#22c55e','#14b8a6','#06b6d4','#3b82f6'];
  let sum = 0;
  for (const ch of name) sum += ch.charCodeAt(0);
  return colors[sum % colors.length];
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, c => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[c]));
}

/** 当前表格应该显示的字段（工具：price；资讯：platform/freq/wx） */
function metaOf(item) {
  return curTab === 'tools'
    ? [item.cat, item.price]
    : [item.cat, item.platform, item.freq];
}

function render() {
  const kw = adminSearch.value.trim().toLowerCase();
  const all = curData();
  const list = kw
    ? all.filter(i => (i.name + i.desc + i.cat).toLowerCase().includes(kw))
    : all;

  listBox.innerHTML = list.map(item => {
    // 找到它在原数组里的真实下标（筛选后不能用循环下标）
    const idx = all.indexOf(item);
    return `
      <div class="row">
        <div class="row-avatar" style="background:${colorOf(item.name)}">
          ${escapeHtml(item.name.slice(0, 1))}
        </div>
        <div class="row-main">
          <div class="row-title">${escapeHtml(item.name)}</div>
          <div class="row-desc">${escapeHtml(item.desc)}</div>
        </div>
        <div class="row-meta">
          ${metaOf(item).filter(Boolean).map(m => `<span class="chip-sm">${escapeHtml(m)}</span>`).join('')}
        </div>
        <div class="row-actions">
          <button class="btn tiny" data-edit="${idx}">编辑</button>
          <button class="btn tiny danger-ghost" data-del="${idx}">删除</button>
        </div>
      </div>`;
  }).join('');

  adminEmpty.hidden = list.length > 0;
  statText.textContent = kw
    ? `筛选出 ${list.length} 条 / 共 ${all.length} 条`
    : `共 ${all.length} 条${curTab === 'tools' ? '工具' : '资讯源'}`;

  // 更新分类下拉候选
  const cats = curTab === 'tools' ? CATEGORIES : ARTICLE_CATS;
  const extra = [...new Set(all.map(i => i.cat))];
  catList.innerHTML = [...new Set([...cats, ...extra])]
    .filter(c => c && c !== '全部')
    .map(c => `<option value="${escapeHtml(c)}">`)
    .join('');
}

// ---------- 5. 列表操作：编辑 / 删除 ----------
listBox.addEventListener('click', e => {
  const editBtn = e.target.closest('[data-edit]');
  const delBtn  = e.target.closest('[data-del]');
  if (editBtn) openForm(Number(editBtn.dataset.edit));
  if (delBtn)  doDelete(Number(delBtn.dataset.del));
});

function doDelete(idx) {
  const item = curData()[idx];
  if (!item) return;
  if (!confirm(`确定删除「${item.name}」吗？`)) return;
  curData().splice(idx, 1);
  save();
  render();
}

// ---------- 6. 新增 / 编辑表单 ----------
function openForm(idx) {
  editingIdx = idx;
  const isEdit = idx >= 0;
  const item = isEdit ? curData()[idx] : {};

  formTitle.textContent = isEdit ? `编辑：${item.name}` : '新增';

  // 工具不显示平台/频率/微信号，资讯不显示收费
  const isTool = curTab === 'tools';
  document.getElementById('priceWrap').hidden    = !isTool;
  document.getElementById('platformWrap').hidden = isTool;
  document.getElementById('freqWrap').hidden     = isTool;
  document.getElementById('wxWrap').hidden       = isTool;

  // 填值
  itemForm.elements.name.value  = item.name  || '';
  itemForm.elements.desc.value  = item.desc  || '';
  itemForm.elements.cat.value   = item.cat   || (isTool ? CATEGORIES[1] : ARTICLE_CATS[1]);
  itemForm.elements.tags.value  = (item.tags || []).join(',');
  itemForm.elements.url.value   = item.url   || '';
  itemForm.elements.price.value = item.price || '免费';
  itemForm.elements.platform.value = item.platform || '网站';
  itemForm.elements.freq.value  = item.freq  || '日更';
  itemForm.elements.wx.value    = item.wx    || '';

  formMask.hidden = false;
  itemForm.elements.name.focus();
}

document.getElementById('addBtn').addEventListener('click', () => openForm(-1));

itemForm.addEventListener('submit', e => {
  e.preventDefault();

  const isTool = curTab === 'tools';
  // 中文逗号也支持，省得切换输入法
  const tags = itemForm.elements.tags.value
    .split(/[,，]/).map(s => s.trim()).filter(Boolean);

  const obj = {
    name: itemForm.elements.name.value.trim(),
    desc: itemForm.elements.desc.value.trim(),
    cat:  itemForm.elements.cat.value.trim(),
    tags,
    url:  itemForm.elements.url.value.trim(),
  };

  if (isTool) {
    obj.price = itemForm.elements.price.value;
  } else {
    obj.platform = itemForm.elements.platform.value;
    obj.freq     = itemForm.elements.freq.value.trim() || '不定期';
    if (itemForm.elements.wx.value.trim()) obj.wx = itemForm.elements.wx.value.trim();
  }

  if (!obj.name || !obj.desc || !obj.cat || !obj.url) {
    alert('名称、简介、分类、链接 都不能为空');
    return;
  }

  const arr = curData();
  if (editingIdx >= 0) arr[editingIdx] = obj;
  else arr.unshift(obj);   // 新增的排最前面，方便马上看到

  save();
  formMask.hidden = true;
  render();
});

// ---------- 7. 板块切换 ----------
document.querySelector('.panel .tabs').addEventListener('click', e => {
  const btn = e.target.closest('.tab');
  if (!btn || btn.dataset.tab === curTab) return;
  curTab = btn.dataset.tab;
  document.querySelectorAll('.panel .tabs .tab')
    .forEach(t => t.classList.toggle('active', t.dataset.tab === curTab));
  adminSearch.value = '';
  render();
});

adminSearch.addEventListener('input', render);

// ---------- 8. 退出 & 关闭弹窗 ----------
document.getElementById('logoutBtn').addEventListener('click', logout);

document.querySelectorAll('[data-close]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.getElementById(btn.dataset.close).hidden = true;
  });
});

// 点遮罩空白处关闭
[formMask, exportMask].forEach(m => {
  m.addEventListener('click', e => { if (e.target === m) m.hidden = true; });
});

// ---------- 9. 导出代码 ----------
const TOOL_KEYS = ['name', 'desc', 'cat', 'tags', 'url', 'price'];
const ART_KEYS  = ['name', 'desc', 'platform', 'cat', 'freq', 'wx', 'tags', 'url'];

/** 把数据数组转成可直接粘贴的 JS 文件内容 */
function serialize(arr, keys, varName) {
  const lines = arr.map(o => {
    const parts = keys
      .filter(k => o[k] !== undefined && o[k] !== '')
      .map(k => {
        const v = o[k];
        if (Array.isArray(v)) {
          return `${k}: [${v.map(x => JSON.stringify(x)).join(', ')}]`;
        }
        return `${k}: ${JSON.stringify(v)}`;
      });
    return '  { ' + parts.join(', ') + ' }';
  });
  return `const ${varName} = [\n${lines.join(',\n')}\n];\n`;
}

function exportContent(file) {
  return file === 'tools'
    ? serialize(toolsData, TOOL_KEYS, 'TOOLS')
    : serialize(articlesData, ART_KEYS, 'ARTICLES');
}

document.getElementById('exportBtn').addEventListener('click', () => {
  exportFile = 'tools';
  document.querySelectorAll('.export-switch .tab')
    .forEach(t => t.classList.toggle('active', t.dataset.file === exportFile));
  exportArea.value = exportContent(exportFile);
  exportMask.hidden = false;
});

document.querySelector('.export-switch').addEventListener('click', e => {
  const btn = e.target.closest('.tab');
  if (!btn) return;
  exportFile = btn.dataset.file;
  document.querySelectorAll('.export-switch .tab')
    .forEach(t => t.classList.toggle('active', t.dataset.file === exportFile));
  exportArea.value = exportContent(exportFile);
});

document.getElementById('copyBtn').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(exportArea.value);
    alert('已复制');
  } catch (e) {
    exportArea.select();
    alert('自动复制失败，请手动按 Ctrl+C');
  }
});

document.getElementById('downloadBtn').addEventListener('click', () => {
  const name = exportFile === 'tools' ? 'tools.js' : 'articles.js';
  const blob = new Blob([exportArea.value], { type: 'text/javascript;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = name;
  a.click();
  URL.revokeObjectURL(a.href);
});

// ---------- 10. 恢复默认 ----------
document.getElementById('resetBtn').addEventListener('click', () => {
  if (!confirm('将丢弃所有本地改动，恢复成 tools.js / articles.js 里的原始数据。确定吗？')) return;
  localStorage.removeItem(KEY_TOOLS);
  localStorage.removeItem(KEY_ARTICLES);
  toolsData    = loadSaved(KEY_TOOLS, TOOLS);
  articlesData = loadSaved(KEY_ARTICLES, ARTICLES);
  render();
  alert('已恢复默认');
});
