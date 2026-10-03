import { useState } from 'react';
import { H2, H3, P, Demo, ApiTable } from './DocShell';
import {
  Button, IconButton, Segmented,
  Field, Input, SearchInput, Textarea, NumberInput,
  Select, Checkbox, Radio, Switch, Slider,
} from '../flat-ui';
import { IconStar, IconHeart, IconShare, IconDownload, IconSearch } from '../flat-ui/icons';

/* ============ 按钮页 ============ */
export function ButtonsPage() {
  const [seg, setSeg] = useState('day');
  return (
    <div>
      <h1 className="doc-h1">按钮</h1>
      <p className="doc-lead">Button 是系统中最重要的行动点。实心主按钮一个视图只允许出现一次。</p>

      <H2>变体</H2>
      <Demo code={`<Button variant="primary">主要按钮</Button>
<Button variant="secondary">次要按钮</Button>
<Button variant="outline">描边按钮</Button>
<Button variant="ghost">幽灵按钮</Button>
<Button variant="danger">危险按钮</Button>`}>
        <Button>主要按钮</Button>
        <Button variant="secondary">次要按钮</Button>
        <Button variant="outline">描边按钮</Button>
        <Button variant="ghost">幽灵按钮</Button>
        <Button variant="danger">危险按钮</Button>
      </Demo>

      <H2>尺寸与状态</H2>
      <Demo code={`<Button size="sm">小号</Button>
<Button size="md">中号</Button>
<Button size="lg">大号</Button>
<Button loading>加载中</Button>
<Button disabled>不可用</Button>
<Button icon={<IconDownload />}>带图标</Button>`}>
        <Button size="sm">小号</Button>
        <Button>中号</Button>
        <Button size="lg">大号</Button>
        <Button loading>加载中</Button>
        <Button disabled>不可用</Button>
        <Button variant="outline" icon={<IconDownload size={15} />}>导出</Button>
      </Demo>

      <H2>图标按钮</H2>
      <Demo code={`<IconButton><IconStar /></IconButton>
<IconButton><IconHeart /></IconButton>
<IconButton ghost><IconShare /></IconButton>`}>
        <IconButton aria-label="收藏"><IconStar size={16} /></IconButton>
        <IconButton aria-label="喜欢"><IconHeart size={16} /></IconButton>
        <IconButton aria-label="分享" ghost><IconShare size={16} /></IconButton>
        <IconButton aria-label="下载" size="sm"><IconDownload size={14} /></IconButton>
        <IconButton aria-label="搜索" size="lg" ghost><IconSearch size={18} /></IconButton>
      </Demo>

      <H2>分段控制器</H2>
      <P>用于在 2–5 个互斥视图之间高频切换。</P>
      <Demo code={`const [v, setV] = useState('day');

<Segmented
  value={v} onChange={setV}
  options={[
    { label: '日', value: 'day' },
    { label: '周', value: 'week' },
    { label: '月', value: 'month' },
    { label: '年', value: 'year' },
  ]}
/>`}>
        <Segmented value={seg} onChange={setSeg} options={[
          { label: '日', value: 'day' }, { label: '周', value: 'week' },
          { label: '月', value: 'month' }, { label: '年', value: 'year' },
        ]} />
      </Demo>

      <H2>API</H2>
      <H3>Button</H3>
      <ApiTable rows={[
        ['variant', '按钮类型', "'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'", "'primary'"],
        ['size', '尺寸', "'sm' | 'md' | 'lg'", "'md'"],
        ['loading', '加载中，禁用点击', 'boolean', 'false'],
        ['block', '撑满父容器', 'boolean', 'false'],
        ['icon', '前置图标', 'ReactNode', '-'],
      ]} />
      <H3>Segmented</H3>
      <ApiTable rows={[
        ['options', '选项列表', "{ label, value }[]", '-'],
        ['value', '当前值', 'string', '-'],
        ['onChange', '切换回调', '(value: string) => void', '-'],
      ]} />
    </div>
  );
}

/* ============ 输入页 ============ */
export function InputsPage() {
  const [num, setNum] = useState(3);
  return (
    <div>
      <h1 className="doc-h1">表单输入</h1>
      <p className="doc-lead">所有输入控件共享同一套描边与焦点语言：默认 1px 强描边，聚焦时品牌色描边 + 3px 外环。</p>

      <H2>输入框 Input</H2>
      <Demo code={`<Field label="项目名称" required hint="2-24 个字符">
  <Input placeholder="输入项目名称" />
</Field>
<Field label="邮箱" error="邮箱格式不正确">
  <Input error defaultValue="hello@flat" />
</Field>
<Input disabled placeholder="禁用状态" />`} column>
        <div style={{ maxWidth: 360 }} className="fui-col">
          <Field label="项目名称" required hint="2–24 个字符，创建后不可修改">
            <Input placeholder="输入项目名称" />
          </Field>
          <Field label="邮箱" error="邮箱格式不正确">
            <Input error defaultValue="hello@flat" />
          </Field>
          <Input disabled placeholder="禁用状态" />
        </div>
      </Demo>

      <H2>尺寸与前后缀</H2>
      <Demo code={`<Input size="sm" placeholder="小号 28px" />
<Input placeholder="中号 36px" />
<Input size="lg" placeholder="大号 44px" />
<SearchInput placeholder="搜索组件…" />`} column>
        <div style={{ maxWidth: 360 }} className="fui-col">
          <Input size="sm" placeholder="小号 28px" />
          <Input placeholder="中号 36px" />
          <Input size="lg" placeholder="大号 44px" />
          <SearchInput placeholder="搜索组件…" />
        </div>
      </Demo>

      <H2>多行文本 Textarea</H2>
      <Demo code={`<Textarea placeholder="写点什么…" maxLength={140} showCount />`} column>
        <div style={{ maxWidth: 420 }}>
          <Textarea placeholder="写点什么…" maxLength={140} showCount />
        </div>
      </Demo>

      <H2>数字输入 NumberInput</H2>
      <Demo code={`const [num, setNum] = useState(3);

<NumberInput value={num} onChange={setNum} min={0} max={10} />`}>
        <NumberInput value={num} onChange={setNum} min={0} max={10} />
        <span className="fui-mono" style={{ fontSize: 13, color: 'var(--fui-ink-3)' }}>value = {num}</span>
      </Demo>

      <H2>API</H2>
      <ApiTable rows={[
        ['size', '控件高度', "'sm'(28) | 'md'(36) | 'lg'(44)", "'md'"],
        ['prefix / suffix', '前后缀内容', 'ReactNode', '-'],
        ['error', '错误态描边', 'boolean', 'false'],
        ['maxLength / showCount', '字数限制与计数（Textarea）', 'number / boolean', '-'],
      ]} />
    </div>
  );
}

/* ============ 选择控件页 ============ */
export function SelectionPage() {
  const [fruit, setFruit] = useState('apple');
  const [plan, setPlan] = useState('pro');
  const [vol, setVol] = useState(64);
  return (
    <div>
      <h1 className="doc-h1">选择控件</h1>
      <p className="doc-lead">从开关到滑块——所有「做选择」的控件。选中态一律使用品牌色。</p>

      <H2>下拉选择 Select</H2>
      <Demo code={`const [fruit, setFruit] = useState('apple');

<Select
  value={fruit} onChange={setFruit}
  options={[
    { label: '苹果 Apple', value: 'apple' },
    { label: '香蕉 Banana', value: 'banana' },
    { label: '樱桃 Cherry', value: 'cherry' },
    { label: '榴莲 Durian', value: 'durian', disabled: true },
  ]}
/>`}>
        <Select value={fruit} onChange={setFruit} options={[
          { label: '苹果 Apple', value: 'apple' },
          { label: '香蕉 Banana', value: 'banana' },
          { label: '樱桃 Cherry', value: 'cherry' },
          { label: '榴莲 Durian（售罄）', value: 'durian', disabled: true },
        ]} />
      </Demo>

      <H2>复选框 Checkbox</H2>
      <Demo code={`<Checkbox label="接收产品更新" defaultChecked />
<Checkbox label="接收营销邮件"
  description="每月不超过一封，可随时退订" />
<Checkbox label="禁用选项" disabled />`} column>
        <div className="fui-col">
          <Checkbox label="接收产品更新" defaultChecked />
          <Checkbox label="接收营销邮件" description="每月不超过一封，可随时退订" />
          <Checkbox label="禁用选项" disabled />
        </div>
      </Demo>

      <H2>单选框 Radio</H2>
      <Demo code={`const [plan, setPlan] = useState('pro');

<Radio name="plan" value="free" label="免费版"
  checked={plan === 'free'} onChange={() => setPlan('free')} />
<Radio name="plan" value="pro" label="专业版"
  checked={plan === 'pro'} onChange={() => setPlan('pro')} />`} column>
        <div className="fui-col">
          <Radio name="plan" label="免费版" description="个人项目，10 个组件" checked={plan === 'free'} onChange={() => setPlan('free')} />
          <Radio name="plan" label="专业版" description="团队协作，全部 30+ 组件" checked={plan === 'pro'} onChange={() => setPlan('pro')} />
          <Radio name="plan" label="企业版（即将推出）" disabled checked={false} onChange={() => {}} />
        </div>
      </Demo>

      <H2>开关 Switch</H2>
      <Demo code={`<Switch label="深色模式跟随系统" defaultChecked />
<Switch label="自动保存" />
<Switch size="sm" label="小号开关" />
<Switch label="禁用" disabled />`} column>
        <div className="fui-col">
          <Switch label="深色模式跟随系统" defaultChecked />
          <Switch label="自动保存" />
          <Switch size="sm" label="小号开关" />
          <Switch label="禁用" disabled />
        </div>
      </Demo>

      <H2>滑块 Slider</H2>
      <Demo code={`const [vol, setVol] = useState(64);

<Slider value={vol} onChange={setVol} />
<Slider value={30} onChange={() => {}} showValue={false} />`} column>
        <Slider value={vol} onChange={setVol} />
        <Slider value={30} onChange={() => {}} showValue={false} />
      </Demo>

      <H2>选用规则</H2>
      <P>· 立即生效用 <b>Switch</b>，提交后才生效用 <b>Checkbox</b>。</P>
      <P>· 选项 ≤ 5 个用 Radio 平铺；&gt; 5 个用 Select 收纳；需要一眼看清全部选项用 Segmented。</P>
    </div>
  );
}
