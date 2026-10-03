# FlatUI · 扁平化前端控件库

**零渐变、单一主色、1px 描边、亮暗双主题。** 一套不依赖任何 UI 框架的控件库 —— 纯 CSS 变量 + React 组件。

- **67** 个设计令牌 · **36** 个控件 · **24** 个线性图标
- 只吃 CSS 和 React，**不依赖** Radix / MUI / Ant 之类的 UI 框架
- 产物是纯静态页：丢到任意静态托管能跑，双击 `index.html`（`file://`）也能跑

在线文档：<https://flatui.xtt.p8.ink/> ｜ 单文件试玩版：`flat-ui-standalone.html`（CSS/JS 全内联，双击即开）

## 设计原则

| 原则 | 做法 |
| --- | --- |
| 零渐变 / 零柔和投影 | 只用 1px 描边 + 实心色块分层，没有 blur、没有渐变 |
| 单一主色 | 全站只有一个强调色 `--fui-accent`（默认 `#5340ff`），按钮 / 标签 / 链接 / 选中态都从它派生 |
| 高对比 | 文字与背景对比度足够；暗色主题用同一套变量重算，不是简单反色 |
| 直角感 | 圆角统一走 `--fui-radius-*`，小圆角、不做大圆角 |
| 动效克制 | 分段控制器、标签页用滑动指示器；尊重 `prefers-reduced-motion` |
| 令牌驱动 | 所有颜色 / 字号 / 间距都是 CSS 变量，改一处全站生效 |

## 组件一览（36）

| 分组 | 控件 |
| --- | --- |
| 按钮 | Button · IconButton · Segmented |
| 表单输入 | Field · Input · SearchInput · Textarea · NumberInput |
| 选择控件 | Select · Checkbox · Radio · Switch · Slider |
| 导航组件 | Tabs · Accordion · Breadcrumb · Pagination · Steps · Dropdown · Tooltip |
| 数据展示 | Table · Card · Badge · Tag · Avatar · AvatarGroup · Kbd · Divider · EmptyState |
| 反馈组件 | Alert · Toast · Dialog · Drawer · Progress · Spinner · Skeleton |

图标走 `Icons.xxx`，24 个线性图标内置（不用再装图标库）。

## 快速开始

### 1. 只用样式（不写 React 也行）

```html
<link rel="stylesheet" href="tokens.css" />
<link rel="stylesheet" href="flat-ui.css" />

<button class="fui-btn fui-btn--primary">主要按钮</button>
<span class="fui-tag fui-tag--accent">新</span>
```

### 2. 用 React 组件

```tsx
import { Button, Card, Input, Tag } from './flat-ui';
import './flat-ui/tokens.css';
import './flat-ui/flat-ui.css';

<Card>
  <Input placeholder="搜点什么" />
  <Tag variant="accent">新</Tag>
  <Button variant="primary">确定</Button>
</Card>
```

### 3. 跑文档站（开发）

```bash
cd app
npm install
npm run dev        # http://localhost:3000
```

### 4. 构建静态站

```bash
cd app && npm run build      # tsc -b && vite build → app/dist
cd .. && node tools/postbuild.mjs    # ① 转经典 script（file:// 可用）② 生成单文件版
node tools/smoke.mjs dist            # 冒烟测试：jsdom 真跑一遍 10 个页面 + 交互
```

产物：`dist/`（直接托管的那份）、`dist-single/flat-ui-standalone.html`（单文件版）。

## 目录结构

```
app/                        文档站工程（Vite 7 + React 19 + TypeScript）
  src/flat-ui/              ← 控件库本体
    tokens.css                设计令牌（67 个变量，亮 / 暗两套）
    flat-ui.css               控件样式（.fui-* 类，无框架依赖）
    buttons.tsx  forms.tsx  display.tsx  feedback.tsx  nav.tsx    36 个组件
    icons.tsx                 24 个线性图标
    indicator.ts              滑动指示器（分段控制器 / 标签页共用一份测量逻辑）
  src/docs/                 10 页文档内容（总览 / 色彩 / 字体 / 间距 / 六组组件）
tools/
  postbuild.mjs             构建后处理 + 单文件版
  smoke.mjs                 jsdom 冒烟测试
```

## 文档站

10 页：**总览**（含组件一览，点任意控件直达对应页）、**色彩系统**、**字体排印**、**间距·形状·动效**、**按钮**、**表单输入**、**选择控件**、**导航组件**、**数据展示**、**反馈组件**。
每页底部有上一页 / 下一页，≤860px 时侧边栏变抽屉（顶栏汉堡按钮唤出）。

## 双主题

`html[data-theme="light|dark"]` 切换。文档站会记住选择（localStorage）并跟随系统 `prefers-color-scheme`，首屏前置脚本避免闪白。

## 兼容性

- 现代浏览器（Chrome / Edge / Safari / Firefox 近两年版本），用到了 `color-mix()` 等较新 CSS
- 产物为经典 `<script>` + 相对路径：`file://` 双击可跑，子路径托管（`xtt-xt.github.io/flat-ui/`）或自定义域名（`flatui.xtt.p8.ink`）都没问题
- 字体走 Google Fonts（Space Grotesk / JetBrains Mono），离线时回落到系统字体

## 部署

仓库自带 GitHub Actions：推 `main` 会自动构建并发布到 GitHub Pages（配置见 `.github/workflows/deploy.yml`）。
也可以手动把 `dist/` 里的内容丢到任意静态托管。

## 鸣谢

感谢Kimi k3的控件基底和deepseek的后期修改

## License

MIT
