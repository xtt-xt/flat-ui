import React from 'react';
import { H2, P, Demo, Swatch } from './DocShell';
import { Button, Badge, Switch, Progress, Avatar, AvatarGroup, Tag } from '../flat-ui';

/* ============ 总览 ============ */
const COMPONENT_INDEX: { group: string; en: string; page: string; items: string[] }[] = [
  { group: '按钮', en: 'Button', page: 'button', items: ['Button', 'IconButton', 'Segmented'] },
  { group: '表单输入', en: 'Input', page: 'input', items: ['Field', 'Input', 'SearchInput', 'Textarea', 'NumberInput'] },
  { group: '选择控件', en: 'Selection', page: 'selection', items: ['Select', 'Checkbox', 'Radio', 'Switch', 'Slider'] },
  { group: '导航组件', en: 'Navigation', page: 'nav', items: ['Tabs', 'Accordion', 'Breadcrumb', 'Pagination', 'Steps', 'Dropdown', 'Tooltip'] },
  { group: '数据展示', en: 'Data Display', page: 'data', items: ['Table', 'Card', 'Badge', 'Tag', 'Avatar', 'AvatarGroup', 'Kbd', 'Divider', 'EmptyState'] },
  { group: '反馈组件', en: 'Feedback', page: 'feedback', items: ['Alert', 'Toast', 'Dialog', 'Drawer', 'Progress', 'Spinner', 'Skeleton'] },
];

export function OverviewPage({ onNavigate }: { onNavigate: (k: string) => void }) {
  return (
    <div>
      <section className="doc-hero">
        <span className="doc-hero__eyebrow">FLAT-UI · DESIGN SYSTEM</span>
        <h1 className="doc-hero__title">
          去掉多余的一切，<br />只留下<em>清晰</em>。
        </h1>
        <p className="doc-hero__sub">
          FlatUI 是一套扁平化前端控件库：1px 描边、零渐变、零柔和投影、单一主色。
          它由一份完整的设计令牌（Design Tokens）驱动，内置 36 个高质量控件，支持亮暗双主题。
        </p>
        <div className="fui-row">
          <Button size="lg" onClick={() => onNavigate('color')}>阅读设计标准</Button>
          <Button size="lg" variant="outline" onClick={() => onNavigate('button')}>浏览组件</Button>
        </div>
        <div className="doc-hero__stats">
          <div className="doc-hero__stat"><b>36</b><span>控件组件</span></div>
          <div className="doc-hero__stat"><b>60+</b><span>设计令牌</span></div>
          <div className="doc-hero__stat"><b>2</b><span>主题模式</span></div>
          <div className="doc-hero__stat"><b>0</b><span>渐变与柔影</span></div>
        </div>
      </section>

      <H2>设计原则</H2>
      <div className="doc-principles">
        <div className="doc-principle">
          <span className="num">01</span><b>扁平即诚实</b>
          <p>元素不伪装成立体的实物。用色彩、描边和排版表达层级，而不是用阴影和渐变。</p>
        </div>
        <div className="doc-principle">
          <span className="num">02</span><b>唯一的强调色</b>
          <p>一个页面只允许一种品牌色发声。克制让每一次强调都真正被注意到。</p>
        </div>
        <div className="doc-principle">
          <span className="num">03</span><b>4px 基网</b>
          <p>所有间距、尺寸都是 4 的倍数。一致的韵律让界面自己「对齐」。</p>
        </div>
        <div className="doc-principle">
          <span className="num">04</span><b>快速而克制的动效</b>
          <p>120–320ms、单一缓动曲线。动效用于反馈，不用于表演。</p>
        </div>
      </div>

      <H2>即刻上手</H2>
      <P>控件库以 CSS 令牌 + React 组件的形式组织，所有样式均可通过令牌覆盖：</P>
      <Demo code={`import { Button, Badge, Switch, Progress } from './flat-ui';
import './flat-ui/tokens.css';
import './flat-ui/flat-ui.css';

<Button variant="primary">开始使用</Button>
<Badge tone="success" dot>运行中</Badge>
<Switch defaultChecked label="接收通知" />
<Progress value={72} />`}>
        <Button>开始使用</Button>
        <Badge tone="success" dot>运行中</Badge>
        <Switch defaultChecked label="接收通知" />
        <div style={{ flex: 1, minWidth: 160 }}><Progress value={72} /></div>
      </Demo>

      <H2>快速预览</H2>
      <P>一套令牌，驱动所有控件。切换右上角的主题开关，可以看到整套系统的暗色表现。</P>
      <div className="doc-demo">
        <div className="doc-demo__stage" style={{ gap: 16 }}>
          <AvatarGroup>
            <Avatar name="星天" /><Avatar name="Kimi" /><Avatar name="Design" /><Avatar name="React" />
          </AvatarGroup>
          <Tag variant="accent" closable>v1.0.0</Tag>
          <Tag closable>设计系统</Tag>
          <Badge tone="accent" variant="solid">NEW</Badge>
          <Badge tone="warning" dot>待审核</Badge>
        </div>
      </div>

      <H2>组件一览</H2>
      <P>点击任意分组进入对应文档页——每页都带真实演示、可一键复制的代码，以及 API 属性表。</P>
      <div className="doc-index">
        {COMPONENT_INDEX.map((g) => (
          <button key={g.page} className="doc-index__group" onClick={() => onNavigate(g.page)}>
            <span className="doc-index__head"><b>{g.group}</b><em>{g.items.length} 个 · {g.en}</em></span>
            <span className="doc-index__tags">
              {g.items.map((n) => <span key={n} className="doc-index__tag">{n}</span>)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ============ 色彩系统 ============ */
export function ColorPage() {
  return (
    <div>
      <h1 className="doc-h1">色彩系统</h1>
      <p className="doc-lead">FlatUI 的颜色分为三层：中性色搭建骨架，单一品牌色负责强调，语义色传达状态。全部通过 CSS 自定义属性暴露，可被任意覆盖。</p>

      <H2>品牌色</H2>
      <P>整个系统只有 <code className="doc-inline-code">--fui-accent</code> 一个强调色。它出现在主按钮、选中态、焦点环和链接上。</P>
      <div className="doc-swatch-grid">
        <Swatch name="Accent" token="--fui-accent" value="#5340ff" />
        <Swatch name="Accent Hover" token="--fui-accent-hover" value="#4130e8" />
        <Swatch name="Accent Active" token="--fui-accent-active" value="#3627c9" />
        <Swatch name="Accent Soft" token="--fui-accent-soft" value="#efedff" />
      </div>

      <H2>中性色</H2>
      <P>近黑而非纯黑的正文、三级灰度文字、两级描边——所有灰阶都带极轻微的冷调，与品牌紫同温。</P>
      <div className="doc-swatch-grid">
        <Swatch name="背景 / BG" token="--fui-bg" value="#ffffff" />
        <Swatch name="次级背景" token="--fui-bg-subtle" value="#f7f7f8" />
        <Swatch name="弱化背景" token="--fui-bg-muted" value="#efeff1" />
        <Swatch name="描边" token="--fui-border" value="#e5e5e9" />
        <Swatch name="强描边" token="--fui-border-strong" value="#c8c8cf" />
        <Swatch name="正文" token="--fui-ink" value="#141416" />
        <Swatch name="次要文字" token="--fui-ink-2" value="#55555e" />
        <Swatch name="辅助文字" token="--fui-ink-3" value="#8a8a93" />
      </div>

      <H2>语义色</H2>
      <P>每种语义色都配有 10% 浓度的 Soft 底色，用于 Alert、Badge 等需要大面积铺色的场景。</P>
      <div className="doc-swatch-grid">
        <Swatch name="成功 Success" token="--fui-success" value="#1c9a6c" />
        <Swatch name="警告 Warning" token="--fui-warning" value="#d97b06" />
        <Swatch name="危险 Danger" token="--fui-danger" value="#e5484d" />
        <Swatch name="信息 Info" token="--fui-info" value="#3e7bfa" />
      </div>

      <H2>使用规则</H2>
      <P>· 大面积底色永远用中性色，彩色只用于行动点和状态。</P>
      <P>· 文字与背景的对比度不低于 4.5:1，次要文字不低于 3:1。</P>
      <P>· 暗色主题下品牌色提亮为 <code className="doc-inline-code">#8b7fff</code>，语义色同步提亮一档，保证对比度。</P>
    </div>
  );
}

/* ============ 字体排印 ============ */
export function TypographyPage() {
  const rows: [string, string, number][] = [
    ['text-xs', '辅助说明 / 徽章', 12],
    ['text-sm', '次要信息 / 表格', 13],
    ['text-md', '正文 / 控件默认', 14],
    ['text-lg', '强调正文 / 卡片标题', 16],
    ['text-xl', '弹窗标题', 18],
    ['text-2xl', '区块标题', 20],
    ['text-3xl', '页面小节', 24],
    ['text-4xl', '页面标题', 30],
    ['text-5xl', '展示标题', 38],
    ['text-6xl', '巨型展示', 48],
  ];
  return (
    <div>
      <h1 className="doc-h1">字体排印</h1>
      <p className="doc-lead">双字体系统：Space Grotesk 搭配系统中文字体负责界面，JetBrains Mono 负责数字、代码与令牌。字号按 1.2 倍率递增，共 10 级。</p>

      <H2>字阶 Type Scale</H2>
      <div>
        {rows.map(([token, usage, px]) => (
          <div className="doc-type-row" key={token}>
            <span className="doc-type-row__label">{token} · {px}px<br />{usage}</span>
            <span style={{ fontSize: px, lineHeight: 1.3, letterSpacing: px >= 24 ? '-0.02em' : 0 }}>
              扁平设计 Flat Design
            </span>
          </div>
        ))}
      </div>

      <H2>字族 Font Family</H2>
      <Demo code={`--fui-font-sans: "Space Grotesk", "PingFang SC",
  "Microsoft YaHei", sans-serif;
--fui-font-mono: "JetBrains Mono", Menlo,
  Consolas, monospace;`} column>
        <div>
          <div style={{ fontSize: 24, marginBottom: 4 }}>界面字体 Sans · 星天的扁平控件库 0123456789</div>
          <div className="fui-mono" style={{ fontSize: 18, color: 'var(--fui-ink-2)' }}>等宽字体 Mono · --fui-accent: #5340ff · 0123456789</div>
        </div>
      </Demo>

      <H2>使用规则</H2>
      <P>· 正文用 14px / 1.6 行高；标题收紧字距（-0.02em）提升展示感。</P>
      <P>· 数字、ID、代码、令牌一律使用等宽字体，保证纵向对齐。</P>
      <P>· 中文不使用斜体；需要强调时用字重或颜色。</P>
    </div>
  );
}

/* ============ 间距与形状 ============ */
export function SpacingPage() {
  const spaces: [string, number][] = [
    ['space-1', 4], ['space-2', 8], ['space-3', 12], ['space-4', 16],
    ['space-5', 24], ['space-6', 32], ['space-7', 48], ['space-8', 64],
  ];
  return (
    <div>
      <h1 className="doc-h1">间距与形状</h1>
      <p className="doc-lead">4px 基网上的 8 级间距、4 级圆角与 1 条描边规则，共同构成 FlatUI 的几何语言。</p>

      <H2>间距阶梯</H2>
      <div style={{ margin: '16px 0 32px' }}>
        {spaces.map(([token, px]) => (
          <div className="doc-space-row" key={token}>
            <span className="doc-space-row__label">--fui-{token}</span>
            <span className="doc-space-row__bar" style={{ width: px * 3 }} />
            <span className="doc-space-row__val">{px}px</span>
          </div>
        ))}
      </div>
      <P>· 控件内部用 space-2 ~ space-4；卡片与区块用 space-5 ~ space-6；页面级留白用 space-7 ~ space-8。</P>

      <H2>圆角</H2>
      <Demo code={`--fui-radius-none: 0;    /* 表格、分割线 */
--fui-radius-sm:   4px;  /* 按钮、输入框、徽章 */
--fui-radius-md:   8px;  /* 卡片、弹层 */
--fui-radius-lg:   12px; /* 对话框 */
--fui-radius-pill: 999px;/* 开关、头像 */`}>
        {[0, 4, 8, 12].map((r) => (
          <div key={r} style={{
            width: 64, height: 64, background: 'var(--fui-accent-soft)',
            border: '1.5px solid var(--fui-accent)', borderRadius: r,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--fui-font-mono)', fontSize: 12, color: 'var(--fui-accent)',
          }}>{r}px</div>
        ))}
        <div style={{
          width: 64, height: 64, background: 'var(--fui-accent-soft)',
          border: '1.5px solid var(--fui-accent)', borderRadius: 999,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--fui-font-mono)', fontSize: 12, color: 'var(--fui-accent)',
        }}>pill</div>
      </Demo>

      <H2>描边与投影</H2>
      <P>扁平系统的「层次」靠描边而非投影：常规 1px <code className="doc-inline-code">--fui-border</code>，输入控件 1px <code className="doc-inline-code">--fui-border-strong</code>，焦点态用品牌色 3px 外环。</P>
      <P>浮层（下拉、气泡、弹窗）允许使用唯一的硬投影 <code className="doc-inline-code">--fui-shadow-pop: 4px 4px 0 rgba(20,20,22,.07)</code> —— 无模糊、带方向感，保持扁平气质。</P>

      <H2>动效</H2>
      <Demo code={`--fui-dur-1: 120ms;  /* 悬停、按下 */
--fui-dur-2: 200ms;  /* 浮层、展开 */
--fui-dur-3: 320ms;  /* 对话框、抽屉 */
--fui-ease: cubic-bezier(.2, .7, .3, 1);`} column>
        <MotionDemo />
      </Demo>
      <P>悬停下方的方块感受三档时长。所有控件共享同一条缓动曲线：起步快、收尾稳，没有回弹。</P>
    </div>
  );
}

function MotionDemo() {
  const [on, setOn] = React.useState(false);
  return (
    <div className="fui-col" onMouseEnter={() => setOn(true)} onMouseLeave={() => setOn(false)}>
      {(['--fui-dur-1: 120ms', '--fui-dur-2: 200ms', '--fui-dur-3: 320ms'] as const).map((label, i) => (
        <div key={label} className="fui-row" style={{ gap: 12 }}>
          <span className="fui-mono" style={{ fontSize: 11, color: 'var(--fui-ink-3)', width: 150 }}>{label}</span>
          <div style={{
            width: 44, height: 20, background: 'var(--fui-accent)', borderRadius: 4,
            transform: on ? 'translateX(240px)' : 'translateX(0)',
            transition: `transform ${[120, 200, 320][i]}ms var(--fui-ease)`,
          }} />
        </div>
      ))}
    </div>
  );
}
