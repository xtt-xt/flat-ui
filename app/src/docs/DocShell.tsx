import React from 'react';
import { IconMoon, IconSun, IconMenu, IconX, IconChevronLeft, IconChevronRight } from '../flat-ui/icons';

/* ---- 文档页面小标题 ---- */
export function H2({ id, children }: { id?: string; children: React.ReactNode }) {
  return <h2 id={id} className="doc-h2">{children}</h2>;
}
export function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="doc-h3">{children}</h3>;
}
export function P({ children }: { children: React.ReactNode }) {
  return <p className="doc-p">{children}</p>;
}

/* ---- 复制：优先 Clipboard API，非安全上下文（file:// 等）退回 execCommand ---- */
function legacyCopy(text: string) {
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.top = '-1000px';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    ta.setSelectionRange(0, text.length);
    document.execCommand('copy');
    document.body.removeChild(ta);
  } catch { /* 忽略 */ }
}

export function copyText(text: string) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text).catch(() => legacyCopy(text));
  }
  legacyCopy(text);
  return Promise.resolve();
}

/* ---- 示例容器：上面演示，下面代码 ---- */
export function Demo({ code, children, column, bare }: {
  code: string; children: React.ReactNode; column?: boolean; bare?: boolean;
}) {
  const [show, setShow] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const copy = () => {
    copyText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };
  return (
    <div className="doc-demo">
      <div className={`doc-demo__stage${column ? ' doc-demo__stage--col' : ''}${bare ? ' doc-demo__stage--bare' : ''}`}>{children}</div>
      <div className="doc-demo__bar">
        <button className="doc-demo__btn" onClick={() => setShow((v) => !v)} aria-expanded={show}>
          {show ? '收起代码' : '查看代码'}
        </button>
        <button className="doc-demo__btn" onClick={copy}>{copied ? '已复制 ✓' : '复制'}</button>
      </div>
      {show && <pre className="doc-code"><code>{code}</code></pre>}
    </div>
  );
}

/* ---- API 属性表 ---- */
export function ApiTable({ rows }: { rows: [string, string, string, string][] }) {
  return (
    <div className="doc-api">
      <table className="fui-table">
        <thead><tr><th>属性</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[0]}>
              <td><code className="doc-inline-code">{r[0]}</code></td>
              <td>{r[1]}</td>
              <td><code className="doc-inline-code">{r[2]}</code></td>
              <td><code className="doc-inline-code">{r[3]}</code></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---- 色板 ---- */
export function Swatch({ name, token, value, dark }: { name: string; token: string; value: string; dark?: boolean }) {
  return (
    <div className="doc-swatch">
      <div className="doc-swatch__color" style={{ background: value, boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.06)' }} />
      <div className="doc-swatch__meta">
        <span className={`doc-swatch__name${dark ? '' : ''}`}>{name}</span>
        <code className="doc-swatch__token">{token}</code>
        <code className="doc-swatch__value">{value}</code>
      </div>
    </div>
  );
}

/* ---- 页面外壳 ---- */
export interface NavItem { key: string; label: string; en?: string }
export interface NavGroup { title: string; items: NavItem[] }

export function DocShell({ nav, page, onNavigate, theme, onToggleTheme, navOpen, onOpenNav, onCloseNav, children }: {
  nav: NavGroup[]; page: string; onNavigate: (key: string) => void;
  theme: 'light' | 'dark'; onToggleTheme: () => void;
  navOpen: boolean; onOpenNav: () => void; onCloseNav: () => void;
  children: React.ReactNode;
}) {
  const flat = nav.flatMap((g) => g.items);
  const idx = flat.findIndex((i) => i.key === page);
  const prev = idx > 0 ? flat[idx - 1] : null;
  const next = idx >= 0 && idx < flat.length - 1 ? flat[idx + 1] : null;

  // Esc 关闭移动端目录
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onCloseNav(); };
    if (navOpen) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [navOpen, onCloseNav]);

  return (
    <div className="doc-shell">
      {navOpen && <div className="doc-scrim" onClick={onCloseNav} aria-hidden />}
      <aside className={`doc-sidebar${navOpen ? ' is-open' : ''}`}>
        <div className="doc-logo" onClick={() => onNavigate('overview')}>
          <span className="doc-logo__mark">F</span>
          <span className="doc-logo__text">
            <strong>FlatUI</strong>
            <small>扁平化设计系统</small>
          </span>
          <button className="doc-sidebar__close" onClick={onCloseNav} aria-label="关闭目录">
            <IconX size={16} />
          </button>
        </div>
        <nav className="doc-nav">
          {nav.map((g) => (
            <div key={g.title} className="doc-nav__group">
              <div className="doc-nav__title">{g.title}</div>
              {g.items.map((it) => (
                <button key={it.key}
                  className={`doc-nav__item${page === it.key ? ' is-active' : ''}`}
                  onClick={() => onNavigate(it.key)}>
                  {it.label}
                  {it.en && <span className="doc-nav__en">{it.en}</span>}
                </button>
              ))}
            </div>
          ))}
        </nav>
        <div className="doc-sidebar__foot">
          <span className="fui-mono" style={{ fontSize: 11, color: 'var(--fui-ink-3)' }}>v1.0.0 · MIT</span>
        </div>
      </aside>

      <div className="doc-main">
        <header className="doc-topbar">
          <button className="fui-iconbtn fui-iconbtn--ghost doc-topbar__menu" onClick={onOpenNav} aria-label="打开目录">
            <IconMenu size={18} />
          </button>
          <span className="doc-topbar__path fui-mono">flat-ui / {page}</span>
          <button className="fui-iconbtn fui-iconbtn--ghost" onClick={onToggleTheme}
            aria-label={theme === 'light' ? '切换到暗色主题' : '切换到亮色主题'}>
            {theme === 'light' ? <IconMoon size={16} /> : <IconSun size={16} />}
          </button>
        </header>

        <main className="doc-content">
          {children}

          <nav className="doc-pager" aria-label="上下页">
            {prev
              ? <button className="doc-pager__btn doc-pager__btn--prev" onClick={() => onNavigate(prev.key)}>
                  <small>上一页</small>
                  <span><IconChevronLeft size={14} />{prev.label}</span>
                </button>
              : <span />}
            {next
              ? <button className="doc-pager__btn doc-pager__btn--next" onClick={() => onNavigate(next.key)}>
                  <small>下一页</small>
                  <span>{next.label}<IconChevronRight size={14} /></span>
                </button>
              : <span />}
          </nav>
        </main>
      </div>
    </div>
  );
}
