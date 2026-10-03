/**
 * 冒烟测试：用 jsdom 把构建产物真的跑一遍，确认能挂载、能翻页、无运行时报错。
 * 用法：node tools/smoke.mjs [dist|dist-single]
 */
import fs from 'node:fs';
import path from 'node:path';
import { JSDOM, VirtualConsole } from 'jsdom';

const root = new URL('..', import.meta.url).pathname.replace(/\/$/, '');
const which = process.argv[2] || 'dist';
const entry = which === 'dist-single'
  ? path.join(root, 'app/dist-single/flat-ui-standalone.html')
  : path.join(root, 'app/dist/index.html');

const errors = [];
const known = [];
const vc = new VirtualConsole();
vc.on('jsdomError', (e) => {
  const msg = String(e.message || e);
  // jsdom 的 CSS 解析器不认 `.\[--cell-size\:--spacing\(8\)\]` 这类转义选择器
  // （原工程自带，真浏览器没问题），归到已知局限，不算运行时错误。
  if (msg.includes('Could not parse CSS stylesheet')) known.push(msg);
  else errors.push('jsdomError: ' + msg);
});
vc.on('error', (...a) => errors.push('console.error: ' + a.join(' ').slice(0, 200)));

const dom = new JSDOM(fs.readFileSync(entry, 'utf8'), {
  runScripts: 'dangerously',
  resources: 'usable',
  pretendToBeVisual: true,
  url: 'file://' + entry,
  virtualConsole: vc,
});

const { window } = dom;
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
await new Promise((r) => window.addEventListener('load', r, { once: true }));
await wait(600);

const doc = window.document;
const rootEl = doc.getElementById('root');
const text = () => (rootEl.textContent || '').replace(/\s+/g, ' ');

const out = [];
out.push(['挂载', rootEl.childElementCount > 0 ? `OK（root 子节点 ${rootEl.childElementCount} 个）` : '失败：root 为空']);
out.push(['总览文案', text().includes('扁平化前端控件库') ? 'OK' : '缺失']);

// 组件一览索引
const indexBtns = doc.querySelectorAll('.doc-index__group').length;
out.push(['组件一览分组', indexBtns + ' 组']);

// 逐个页面切一遍
const pages = ['color', 'typography', 'spacing', 'button', 'input', 'selection', 'nav', 'data', 'feedback', 'overview'];
for (const p of pages) {
  window.location.hash = p;
  window.dispatchEvent(new window.HashChangeEvent('hashchange'));
  await wait(120);
  const t = text();
  const h1 = doc.querySelector('h1')?.textContent?.trim() || '(无 h1)';
  const demos = doc.querySelectorAll('.doc-demo').length;
  out.push([`页面 ${p}`, `h1=「${h1}」 示例块=${demos} 字数=${t.length}`]);
}

// 分段控制器：滑块与选中状态（jsdom 没有真实布局，只验结构与状态流转）
window.location.hash = 'button';
window.dispatchEvent(new window.HashChangeEvent('hashchange'));
await wait(150);
const seg = doc.querySelector('.fui-segmented');
const thumb = seg?.querySelector('.fui-segmented__thumb');
if (seg && thumb) {
  const items = [...seg.querySelectorAll('.fui-segmented__item')];
  out.push(['分段控制器', `${items.length} 项，滑块 ready=${thumb.dataset.ready} anim=${thumb.dataset.anim} 内联样式=${thumb.getAttribute('style') ? '有' : '无'}`]);
  items[items.length - 1].dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
  await wait(100);
  const last = items[items.length - 1];
  const one = items.filter((i) => i.getAttribute('aria-selected') === 'true').length === 1;
  out.push(['分段切换', last.getAttribute('aria-selected') === 'true' && one ? `OK → 「${last.textContent}」唯一选中` : '失败']);
} else {
  out.push(['分段控制器', '缺失']);
}

// 标签页：滑动下划线 / 滑动卡片（jsdom 没布局，只验结构与状态流转）
window.location.hash = 'nav';
window.dispatchEvent(new window.HashChangeEvent('hashchange'));
await wait(150);
const tabGroups = [...doc.querySelectorAll('.fui-tabs')];
if (tabGroups.length) {
  const first = tabGroups[0];
  const ind = first.querySelector('.fui-tabs__indicator');
  const tabs = [...first.querySelectorAll('.fui-tabs__tab')];
  out.push(['标签页', `${tabGroups.length} 组，指示器 ready=${ind?.dataset.ready} anim=${ind?.dataset.anim} 内联样式=${ind?.getAttribute('style') ? '有' : '无'}`]);
  tabs[tabs.length - 1].dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
  await wait(100);
  const unique = tabs.filter((t) => t.getAttribute('aria-selected') === 'true').length === 1;
  out.push(['标签页切换', tabs[tabs.length - 1].getAttribute('aria-selected') === 'true' && unique ? `OK → 「${tabs[tabs.length - 1].textContent}」唯一选中` : '失败']);
  const card = tabGroups.find((t) => t.classList.contains('fui-tabs--card'));
  out.push(['卡片式标签', card ? (card.querySelector('.fui-tabs__indicator') ? '指示器存在' : '缺指示器') : '未找到']);
} else {
  out.push(['标签页', '缺失']);
}

// 主题切换
const themeBtn = [...doc.querySelectorAll('button')].find((b) => (b.getAttribute('aria-label') || '').includes('主题'));
if (themeBtn) {
  themeBtn.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
  await wait(80);
  out.push(['主题切换', doc.documentElement.dataset.theme === 'dark' ? 'OK → dark' : '失败']);
} else {
  out.push(['主题切换', '没找到按钮']);
}

// 移动端抽屉：假设窄屏下菜单按钮存在
const menuBtn = doc.querySelector('.doc-topbar__menu');
out.push(['移动端菜单按钮', menuBtn ? '存在' : '缺失']);

// 上下页
out.push(['上下页导航', doc.querySelectorAll('.doc-pager__btn').length + ' 个按钮']);

console.log('=== ' + which + ' 冒烟测试 ===');
for (const [k, v] of out) console.log(String(k).padEnd(16, ' '), v);
console.log('运行时错误：', errors.length ? errors.slice(0, 5) : '无');
if (known.length) console.log('已知 jsdom 局限：', known.length + ' 条 CSS 解析警告（转义选择器，真浏览器正常，忽略）');
process.exit(errors.length ? 1 : 0);
