import { useState } from 'react';
import { H2, H3, P, Demo } from './DocShell';
import {
  Tabs, Accordion, Breadcrumb, Pagination, Steps, Dropdown, Tooltip,
  Table, Card, Badge, Tag, Avatar, AvatarGroup, Kbd, Divider, EmptyState,
  Alert, Dialog, Drawer, Progress, Spinner, Skeleton, Button, Select, useToast,
} from '../flat-ui';
import { IconEdit, IconCopy, IconTrash } from '../flat-ui/icons';

/* ============ 导航组件页 ============ */
export function NavPage() {
  const [tab, setTab] = useState('a');
  const [tab2, setTab2] = useState('x');
  const [page, setPage] = useState(3);
  return (
    <div>
      <h1 className="doc-h1">导航组件</h1>
      <p className="doc-lead">帮助用户理解「我在哪、能去哪」的一组控件。</p>

      <H2>标签页 Tabs</H2>
      <Demo code={`const [tab, setTab] = useState('a');

<Tabs activeKey={tab} onChange={setTab} items={[
  { key: 'a', label: '概览', children: '概览内容' },
  { key: 'b', label: '成员', children: '成员内容' },
  { key: 'c', label: '设置', children: '设置内容' },
]} />

<Tabs variant="card" ... />  // 卡片式变体`} column>
        <Tabs activeKey={tab} onChange={setTab} items={[
          { key: 'a', label: '概览', children: <P>项目概览面板。线式标签适合页面级切换。</P> },
          { key: 'b', label: '成员', children: <P>成员列表面板。</P> },
          { key: 'c', label: '设置', children: <P>项目设置面板。</P> },
        ]} />
        <Tabs variant="card" activeKey={tab2} onChange={setTab2} items={[
          { key: 'x', label: '代码', children: <P>卡片式标签适合面板内的次级切换。</P> },
          { key: 'y', label: '预览', children: <P>预览面板。</P> },
        ]} />
      </Demo>

      <H2>面包屑 Breadcrumb</H2>
      <Demo code={`<Breadcrumb items={[
  { label: '首页', href: '#' },
  { label: '组件', href: '#' },
  { label: '导航组件' },
]} />`}>
        <Breadcrumb items={[
          { label: '首页', href: '#' }, { label: '组件', href: '#' }, { label: '导航组件' },
        ]} />
      </Demo>

      <H2>分页 Pagination</H2>
      <Demo code={`const [page, setPage] = useState(3);

<Pagination page={page} total={128} onChange={setPage} />`}>
        <Pagination page={page} total={128} onChange={setPage} />
      </Demo>

      <H2>步骤条 Steps</H2>
      <Demo code={`<Steps current={1} items={[
  { title: '创建项目', description: '填写基础信息' },
  { title: '配置主题', description: '覆盖设计令牌' },
  { title: '发布', description: '上线你的设计系统' },
]} />`} column>
        <Steps current={1} items={[
          { title: '创建项目', description: '填写基础信息' },
          { title: '配置主题', description: '覆盖设计令牌' },
          { title: '发布上线', description: '生成你的设计系统' },
        ]} />
      </Demo>

      <H2>下拉菜单 Dropdown</H2>
      <Demo code={`<Dropdown onSelect={(k) => console.log(k)} items={[
  { key: 'edit', label: '编辑', icon: <IconEdit />, kbd: '⌘E' },
  { key: 'copy', label: '复制', icon: <IconCopy />, kbd: '⌘C' },
  { key: 'd1', label: '', divider: true },
  { key: 'del', label: '删除', icon: <IconTrash />, danger: true },
]}>
  <Button variant="outline">操作 ▾</Button>
</Dropdown>`}>
        <Dropdown onSelect={() => {}} items={[
          { key: 'edit', label: '编辑', icon: <IconEdit size={14} />, kbd: '⌘E' },
          { key: 'copy', label: '复制', icon: <IconCopy size={14} />, kbd: '⌘C' },
          { key: 'd1', label: '', divider: true },
          { key: 'del', label: '删除', icon: <IconTrash size={14} />, danger: true },
        ]}>
          <Button variant="outline">操作 ▾</Button>
        </Dropdown>
      </Demo>

      <H2>折叠面板 Accordion</H2>
      <Demo code={`<Accordion defaultOpen={['1']} items={[
  { key: '1', title: 'FlatUI 支持暗色主题吗？',
    content: '支持。所有令牌都有暗色映射…' },
  { key: '2', title: '如何定制品牌色？',
    content: '覆盖 --fui-accent 即可…' },
]} />`} column>
        <Accordion defaultOpen={['1']} items={[
          { key: '1', title: 'FlatUI 支持暗色主题吗？', content: '支持。每个设计令牌都定义了暗色映射，切换 html 上的 data-theme="dark" 即可全局生效，组件零改动。' },
          { key: '2', title: '如何定制品牌色？', content: '在引入 tokens.css 之后覆盖 --fui-accent、--fui-accent-hover、--fui-accent-soft 三个变量即可，整套组件自动跟随。' },
          { key: '3', title: '可以不使用 React 吗？', content: '可以。tokens.css 与 flat-ui.css 是纯 CSS，类名即 API（如 .fui-btn.fui-btn--primary），React 组件只是语法糖。' },
        ]} />
      </Demo>

      <H2>文字提示 Tooltip</H2>
      <Demo code={`<Tooltip tip="复制到剪贴板">
  <Button variant="outline">悬停我</Button>
</Tooltip>
<Tooltip tip="从下方弹出" side="bottom">
  <Button variant="ghost">下方提示</Button>
</Tooltip>`}>
        <Tooltip tip="复制到剪贴板 ⌘C">
          <Button variant="outline">悬停我</Button>
        </Tooltip>
        <Tooltip tip="提示也可以从下方弹出" side="bottom">
          <Button variant="ghost">下方提示</Button>
        </Tooltip>
      </Demo>
    </div>
  );
}

/* ============ 数据展示页 ============ */
interface LibRow { name: string; token: string; status: string; usage: number }

export function DataPage() {
  const [tags, setTags] = useState(['扁平', '设计令牌', '双主题', 'TypeScript']);
  const data: LibRow[] = [
    { name: 'Button', token: '--fui-accent', status: '稳定', usage: 98 },
    { name: 'Input', token: '--fui-border-strong', status: '稳定', usage: 92 },
    { name: 'Dialog', token: '--fui-shadow-modal', status: '稳定', usage: 71 },
    { name: 'Slider', token: '--fui-accent', status: 'Beta', usage: 45 },
    { name: 'Drawer', token: '--fui-z-modal', status: '稳定', usage: 38 },
  ];
  return (
    <div>
      <h1 className="doc-h1">数据展示</h1>
      <p className="doc-lead">呈现信息的一组控件：表格、卡片、徽章、标签、头像与空状态。</p>

      <H2>表格 Table</H2>
      <Demo code={`<Table
  rowKey={(r) => r.name}
  columns={[
    { key: 'name', title: '组件' },
    { key: 'token', title: '关联令牌' },
    { key: 'status', title: '状态',
      render: (r) => <Badge tone="success" dot>{r.status}</Badge> },
    { key: 'usage', title: '使用率', align: 'right',
      render: (r) => <span className="num">{r.usage}%</span> },
  ]}
  data={data}
/>`} column>
        <Table<LibRow>
          rowKey={(r) => r.name}
          columns={[
            { key: 'name', title: '组件' },
            { key: 'token', title: '关联令牌', render: (r) => <code className="doc-inline-code">{r.token}</code> },
            { key: 'status', title: '状态', render: (r) => <Badge tone={r.status === '稳定' ? 'success' : 'warning'} dot>{r.status}</Badge> },
            { key: 'usage', title: '使用率', align: 'right', render: (r) => <span className="num">{r.usage}%</span> },
          ]}
          data={data}
        />
      </Demo>

      <H2>卡片 Card</H2>
      <Demo code={`<Card hover>
  <Card.Head extra={<Badge tone="accent">NEW</Badge>}>设计令牌</Card.Head>
  <Card.Body>60+ 个 CSS 自定义属性驱动的设计决策。</Card.Body>
  <Card.Foot>更新于 2 小时前</Card.Foot>
</Card>`} column>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
          <Card hover>
            <Card.Head extra={<Badge tone="accent" variant="soft">NEW</Badge>}>设计令牌</Card.Head>
            <Card.Body>60+ 个 CSS 自定义属性，承载每一个设计决策。</Card.Body>
            <Card.Foot><span style={{ fontSize: 12, color: 'var(--fui-ink-3)' }}>更新于 2 小时前</span></Card.Foot>
          </Card>
          <Card hover>
            <Card.Head extra={<Badge tone="success" dot>稳定</Badge>}>控件库</Card.Head>
            <Card.Body>36 个扁平控件，亮暗双主题开箱即用。</Card.Body>
            <Card.Foot><span style={{ fontSize: 12, color: 'var(--fui-ink-3)' }}>更新于 5 分钟前</span></Card.Foot>
          </Card>
        </div>
      </Demo>

      <H2>徽章 Badge</H2>
      <Demo code={`<Badge tone="accent" variant="solid">NEW</Badge>
<Badge tone="success" dot>运行中</Badge>
<Badge tone="warning" dot>待审核</Badge>
<Badge tone="danger" variant="soft">已过期</Badge>
<Badge tone="info" variant="outline">BETA</Badge>`}>
        <Badge tone="accent" variant="solid">NEW</Badge>
        <Badge tone="success" dot>运行中</Badge>
        <Badge tone="warning" dot>待审核</Badge>
        <Badge tone="danger">已过期</Badge>
        <Badge tone="info" variant="outline">BETA</Badge>
        <Badge>默认</Badge>
      </Demo>

      <H2>标签 Tag</H2>
      <Demo code={`const [tags, setTags] = useState(['扁平', '设计令牌', '双主题']);

{tags.map((t) => (
  <Tag key={t} closable
    onClose={() => setTags(tags.filter((x) => x !== t))}>
    {t}
  </Tag>
))}`}>
        {tags.map((t) => (
          <Tag key={t} closable onClose={() => setTags(tags.filter((x) => x !== t))}>{t}</Tag>
        ))}
        <Tag variant="accent">品牌色</Tag>
        <Tag variant="filled">实心</Tag>
      </Demo>

      <H2>头像 Avatar</H2>
      <Demo code={`<Avatar name="星天" />
<Avatar name="Kimi" size="lg" />
<Avatar name="React" square />
<AvatarGroup>
  <Avatar name="星天" /><Avatar name="Kimi" /><Avatar name="Design" />
</AvatarGroup>`}>
        <Avatar name="星天" size="sm" />
        <Avatar name="Kimi" />
        <Avatar name="Design" size="lg" />
        <Avatar name="React" size="xl" square />
        <Divider />
        <AvatarGroup>
          <Avatar name="星天" /><Avatar name="Kimi" /><Avatar name="Flat" /><Avatar name="Design" />
        </AvatarGroup>
      </Demo>

      <H2>快捷键 Kbd 与分割线 Divider</H2>
      <Demo code={`按 <Kbd>⌘</Kbd> + <Kbd>K</Kbd> 打开命令面板。

<Divider />
<Divider text="或" />`} column>
        <P>按 <Kbd>⌘</Kbd> <Kbd>K</Kbd> 打开命令面板，按 <Kbd>Esc</Kbd> 关闭。</P>
        <Divider />
        <Divider text="设计标准" />
      </Demo>

      <H2>空状态 EmptyState</H2>
      <Demo code={`<EmptyState
  text="还没有任何组件，从创建一个按钮开始吧"
  action={<Button size="sm">新建组件</Button>}
/>`} column>
        <Card><EmptyState text="还没有任何组件，从创建一个按钮开始吧" action={<Button size="sm">新建组件</Button>} /></Card>
      </Demo>
    </div>
  );
}

/* ============ 反馈组件页 ============ */
export function FeedbackPage() {
  const toast = useToast();
  const [dlg, setDlg] = useState(false);
  const [drw, setDrw] = useState(false);
  return (
    <div>
      <h1 className="doc-h1">反馈组件</h1>
      <p className="doc-lead">系统与用户对话的方式：轻量提示用 Toast，阻断式确认用 Dialog，复杂任务用 Drawer。</p>

      <H2>警告提示 Alert</H2>
      <Demo code={`<Alert tone="info" title="提示">新版本 v1.1 将于下周发布。</Alert>
<Alert tone="success" title="成功">主题令牌已同步到 4 个页面。</Alert>
<Alert tone="warning" title="注意">自定义令牌将在覆盖时丢失。</Alert>
<Alert tone="danger" title="错误" closable>构建失败：找不到 tokens.css。</Alert>`} column>
        <Alert tone="info" title="提示">新版本 v1.1 将于下周发布，包含 3 个新组件。</Alert>
        <Alert tone="success" title="成功">主题令牌已同步到全部 4 个页面。</Alert>
        <Alert tone="warning" title="注意">直接修改构建产物中的令牌，下次构建时会被覆盖。</Alert>
        <Alert tone="danger" title="错误" closable>构建失败：找不到 tokens.css，请检查引入路径。</Alert>
      </Demo>

      <H2>全局提示 Toast</H2>
      <Demo code={`const toast = useToast();

<Button onClick={() => toast('已保存')}>默认</Button>
<Button onClick={() => toast('保存成功', 'success')}>成功</Button>
<Button onClick={() => toast('请注意输入格式', 'warning')}>警告</Button>
<Button onClick={() => toast('删除失败', 'danger')}>危险</Button>`}>
        <Button variant="outline" onClick={() => toast('已保存到草稿箱')}>默认</Button>
        <Button variant="outline" onClick={() => toast('保存成功', 'success')}>成功</Button>
        <Button variant="outline" onClick={() => toast('请注意输入格式', 'warning')}>警告</Button>
        <Button variant="outline" onClick={() => toast('删除失败，请重试', 'danger')}>危险</Button>
      </Demo>

      <H2>对话框 Dialog 与抽屉 Drawer</H2>
      <Demo code={`const [open, setOpen] = useState(false);

<Dialog open={open} title="删除组件" onClose={() => setOpen(false)}
  footer={<>
    <Button variant="ghost" onClick={() => setOpen(false)}>取消</Button>
    <Button variant="danger" onClick={() => setOpen(false)}>确认删除</Button>
  </>}>
  删除后不可恢复，相关引用将失效。
</Dialog>

<Drawer open={open} title="组件属性" onClose={...}>...</Drawer>`}>
        <Button onClick={() => setDlg(true)}>打开对话框</Button>
        <Button variant="outline" onClick={() => setDrw(true)}>打开抽屉</Button>
      </Demo>
      <Dialog open={dlg} title="删除组件" onClose={() => setDlg(false)}
        footer={<>
          <Button variant="ghost" onClick={() => setDlg(false)}>取消</Button>
          <Button variant="danger" onClick={() => { setDlg(false); toast('组件已删除', 'success'); }}>确认删除</Button>
        </>}>
        「按钮 Button」被 12 个页面引用。删除后不可恢复，所有引用位置将显示为空状态。
      </Dialog>
      <Drawer open={drw} title="组件属性" onClose={() => setDrw(false)}>
        <div className="fui-col" style={{ gap: 20 }}>
          <FieldDemo />
        </div>
      </Drawer>

      <H2>进度条 Progress</H2>
      <Demo code={`<Progress value={45} />
<Progress value={80} tone="success" />
<Progress value={20} tone="danger" />
<Progress value={60} striped />`} column>
        <Progress value={45} />
        <Progress value={80} tone="success" />
        <Progress value={20} tone="danger" />
        <Progress value={60} striped />
      </Demo>

      <H2>加载 Spinner 与骨架屏 Skeleton</H2>
      <Demo code={`<Spinner size="sm" /> <Spinner /> <Spinner size="lg" />

<Skeleton variant="title" />
<Skeleton /> <Skeleton width="80%" />
<Skeleton variant="circle" width={40} height={40} />`} column>
        <div className="fui-row">
          <Spinner size="sm" /><Spinner /><Spinner size="lg" />
        </div>
        <Divider />
        <div className="fui-col" style={{ gap: 10, maxWidth: 420 }}>
          <Skeleton variant="title" />
          <Skeleton />
          <Skeleton width="82%" />
          <div className="fui-row"><Skeleton variant="circle" width={40} height={40} /><Skeleton width="60%" /></div>
        </div>
      </Demo>

      <H2>选用规则</H2>
      <P>· <b>Alert</b> 常驻页面，承载与上下文强相关的信息；<b>Toast</b> 轻量短暂，只用于操作结果。</P>
      <P>· <b>Dialog</b> 打断用户，仅用于不可逆操作的确认；<b>Drawer</b> 不离开当前页，适合详情与二级任务。</P>
      <P>· 加载预期 &lt; 1s 用 Spinner，&gt; 1s 用 Skeleton 描绘页面结构。</P>
    </div>
  );
}

function FieldDemo() {
  const [v, setV] = useState('primary');
  return (
    <>
      <H3>外观</H3>
      <Select value={v} onChange={setV} options={[
        { label: '主要 Primary', value: 'primary' },
        { label: '描边 Outline', value: 'outline' },
        { label: '幽灵 Ghost', value: 'ghost' },
      ]} />
      <H3>描述</H3>
      <p style={{ margin: 0, fontSize: 13, color: 'var(--fui-ink-2)' }}>
        抽屉适合承载与当前页强相关的二级任务，例如编辑组件属性。按 Esc 或点击遮罩关闭。
      </p>
    </>
  );
}
