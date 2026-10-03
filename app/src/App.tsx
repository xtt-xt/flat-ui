import { useCallback, useEffect, useState } from 'react';
import './flat-ui/tokens.css';
import './flat-ui/flat-ui.css';
import './docs/docs.css';
import { DocShell, type NavGroup } from './docs/DocShell';
import { OverviewPage, ColorPage, TypographyPage, SpacingPage } from './docs/tokenPages';
import { ButtonsPage, InputsPage, SelectionPage } from './docs/componentPages1';
import { NavPage, DataPage, FeedbackPage } from './docs/componentPages2';
import { ToastProvider } from './flat-ui';

const NAV: NavGroup[] = [
  {
    title: '开始',
    items: [{ key: 'overview', label: '总览', en: 'Overview' }],
  },
  {
    title: '设计标准',
    items: [
      { key: 'color', label: '色彩系统', en: 'Color' },
      { key: 'typography', label: '字体排印', en: 'Typography' },
      { key: 'spacing', label: '间距·形状·动效', en: 'Spacing' },
    ],
  },
  {
    title: '组件',
    items: [
      { key: 'button', label: '按钮', en: 'Button' },
      { key: 'input', label: '表单输入', en: 'Input' },
      { key: 'selection', label: '选择控件', en: 'Selection' },
      { key: 'nav', label: '导航组件', en: 'Navigation' },
      { key: 'data', label: '数据展示', en: 'Data Display' },
      { key: 'feedback', label: '反馈组件', en: 'Feedback' },
    ],
  },
];

const STORE_KEY = 'flatui-theme';

/* localStorage 在 file:// 下可能被禁用，全部包一层 */
function readTheme(): 'light' | 'dark' | null {
  try {
    const v = localStorage.getItem(STORE_KEY);
    return v === 'light' || v === 'dark' ? v : null;
  } catch { return null; }
}
function saveTheme(t: 'light' | 'dark') {
  try { localStorage.setItem(STORE_KEY, t); } catch { /* 忽略 */ }
}

export default function App() {
  const [page, setPage] = useState(() => location.hash.replace('#', '') || 'overview');
  const [theme, setTheme] = useState<'light' | 'dark'>(() =>
    readTheme() ?? (window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    saveTheme(theme);
  }, [theme]);

  useEffect(() => {
    const onHash = () => setPage(location.hash.replace('#', '') || 'overview');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const navigate = useCallback((key: string) => {
    location.hash = key;
    setPage(key);
    setNavOpen(false);
    window.scrollTo({ top: 0 });
  }, []);

  const closeNav = useCallback(() => setNavOpen(false), []);

  return (
    <ToastProvider>
      <div className="fui-root">
        <DocShell nav={NAV} page={page} onNavigate={navigate}
          theme={theme} onToggleTheme={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
          navOpen={navOpen} onOpenNav={() => setNavOpen(true)} onCloseNav={closeNav}>
          {page === 'overview' && <OverviewPage onNavigate={navigate} />}
          {page === 'color' && <ColorPage />}
          {page === 'typography' && <TypographyPage />}
          {page === 'spacing' && <SpacingPage />}
          {page === 'button' && <ButtonsPage />}
          {page === 'input' && <InputsPage />}
          {page === 'selection' && <SelectionPage />}
          {page === 'nav' && <NavPage />}
          {page === 'data' && <DataPage />}
          {page === 'feedback' && <FeedbackPage />}
        </DocShell>
      </div>
    </ToastProvider>
  );
}
