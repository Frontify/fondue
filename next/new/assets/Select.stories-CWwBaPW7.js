import{j as e,r as We,F as C}from"./iframe-B9HwFvdU.js";import{c as l}from"./fondue-icons369-B3g093-t.js";import{B as Ae}from"./Button-BGzN8IST.js";import{a as Fe,b as Ne,c as Ee,d as De,e as He,S as t}from"./Select-DilWxuVj.js";import"./preload-helper-mNEUNaaY.js";import"./index-Dx9WyAro.js";import"./index-B3kVSotr.js";import"./index-C_6QHQdg.js";import"./index-S_Rr3onM.js";import"./index-BJ8sFQYc.js";import"./index-CNfw5sYZ.js";import"./index-BE6nUZPr.js";import"./component-KoAj-ECc.js";import"./LoadingCircle-DkwAP3Am.js";import"./useTranslation-CRW8x7n2.js";const Ze={title:"Components/Select",component:He,subcomponents:{"Select.Combobox":De,"Select.Slot":Ee,"Select.Group":Ne,"Select.Item":Fe},tags:["autodocs"],parameters:{status:{type:"released"}},args:{"aria-label":"Select an item",placeholder:"Select an item"}},a={name:"Select",render:s=>e.jsxs(t,{...s,children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]})},n={args:{placeholder:"Select an item"},render:s=>e.jsxs(t.Combobox,{...s,children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]})},o={args:{placeholder:"Select an item",getAsyncItems:async s=>{const c=[{value:"test1",label:"Test 1 - Custom Content",content:e.jsxs(C,{gap:4,align:"center",children:[e.jsx("img",{src:"https://flagsapi.com/CH/flat/16.png",alt:"Switzerland"}),e.jsx("p",{children:"Switzerland"})]})},{value:"test2",label:"Test 2",content:e.jsxs(C,{gap:4,align:"center",children:[e.jsx("p",{children:"With a Component"}),e.jsx(l,{size:16})]})},{value:"test3",label:"Test 3",content:e.jsxs(C,{gap:4,align:"center",children:["Test 3",e.jsx(l,{})]})},{value:"aaaa",label:"AAAA"},{value:"bbbb",label:"BBBB"},{value:"cccc",label:"CCCC"}].filter(r=>r.label.toLowerCase().includes(s.toLowerCase()));return await new Promise(r=>setTimeout(r,500)),c}},render:s=>e.jsx(t.Combobox,{...s})},m={args:{disabled:!0},render:s=>e.jsx(t,{...s,children:e.jsxs(t.Slot,{name:"menu",children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]})})},i={args:{placeholder:"Select an item"},render:s=>e.jsx(t,{...s,children:e.jsxs(t.Slot,{name:"menu",children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]})})},S={args:{placeholder:"Select an item"},render:s=>e.jsxs(t,{...s,children:[e.jsx(t.Slot,{name:"left",children:e.jsx(l,{size:16})}),e.jsx(t.Slot,{name:"right",children:e.jsx(l,{size:16})}),e.jsxs(t.Slot,{name:"menu",children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]})]})},u={args:{placeholder:"Select an item"},render:s=>e.jsxs(t,{...s,children:[e.jsx(t.Slot,{name:"right",children:e.jsx(l,{size:16})}),e.jsx(t.Slot,{name:"clear"}),e.jsxs(t.Slot,{name:"menu",children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]})]})},d={args:{placeholder:"Select an item"},render:s=>e.jsxs(t,{...s,children:[e.jsx(t.Slot,{name:"clear",children:e.jsx(Ae,{size:"small",emphasis:"strong",onPress:()=>{},children:"Clear"})}),e.jsx(t.Slot,{name:"left",children:e.jsx(l,{size:16})}),e.jsx(t.Slot,{name:"right",children:e.jsx(l,{size:16})}),e.jsxs(t.Slot,{name:"menu",children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]})]})},I={args:{defaultValue:"test1"},render:s=>e.jsx(t,{...s,children:e.jsxs(t.Slot,{name:"menu",children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]})})},v={render:s=>e.jsx(t,{...s,children:e.jsxs(t.Slot,{name:"menu",children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsxs(t.Group,{groupId:"Group 1",children:[e.jsx(t.Item,{value:"test3",children:"Test3"}),e.jsx(t.Item,{value:"test4",children:"Test4"}),e.jsx(t.Item,{value:"test5",children:"Test5"})]}),e.jsx(t.Item,{value:"test6",children:"Test6"})]})})},h={render:s=>e.jsx(t,{...s,children:e.jsxs(t.Slot,{name:"menu",children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsxs(t.Group,{groupId:"Group 1",heading:"Group 1",children:[e.jsx(t.Item,{value:"test3",children:"Test3"}),e.jsx(t.Item,{value:"test4",children:"Test4"}),e.jsx(t.Item,{value:"test5",children:"Test5"})]}),e.jsxs(t.Group,{groupId:"Group 2",heading:"Group 2",children:[e.jsx(t.Item,{value:"test6",children:"Test6"}),e.jsx(t.Item,{value:"test7",children:"Test7"}),e.jsx(t.Item,{value:"test8",children:"Test8"})]}),e.jsx(t.Item,{value:"test9",children:"Test9"})]})})},x={render:s=>e.jsx(t,{...s,children:e.jsxs(t.Slot,{name:"menu",children:[e.jsxs(t.Group,{groupId:"Group 1",children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"})]}),e.jsxs(t.Group,{groupId:"Group 2",children:[e.jsx(t.Item,{value:"test3",children:"Test3"}),e.jsx(t.Item,{value:"test4",children:"Test4"}),e.jsx(t.Item,{value:"test5",children:"Test5"})]})]})})},p={render:s=>e.jsx(t,{...s,children:e.jsxs(t.Slot,{name:"menu",children:[e.jsx(t.Item,{value:"ch",label:"Switzerland",children:e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-4",children:[e.jsx("img",{src:"https://flagsapi.com/CH/flat/16.png",alt:"Switzerland"}),e.jsx("p",{children:"Switzerland"})]})}),e.jsx(t.Item,{value:"icon",label:"Component",children:e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-4",children:[e.jsx("p",{children:"With a Component"}),e.jsx(l,{size:16})]})}),e.jsx(t.Item,{value:"basic",label:"Basic",children:"Basic"})]})})},T={render:s=>e.jsx(t,{...s,showStringValue:!1,children:e.jsxs(t.Slot,{name:"menu",children:[e.jsx(t.Item,{value:"ch",label:"Switzerland",children:e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-4",children:[e.jsx("img",{src:"https://flagsapi.com/CH/flat/16.png",alt:"Switzerland"}),e.jsx("p",{children:"Switzerland"})]})}),e.jsx(t.Item,{value:"icon",label:"Component",children:e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-4",children:[e.jsx("p",{children:"With a Component"}),e.jsx(l,{size:16})]})}),e.jsx(t.Item,{value:"basic",label:"Basic",children:"Basic"})]})})},g={decorators:[s=>e.jsx("div",{className:"tw-flex tw-gap-4",children:e.jsx(s,{})})],render:s=>{const[y,c]=We.useState();return e.jsxs(e.Fragment,{children:[e.jsx(t,{onSelect:r=>{c(()=>r)},value:y,...s,children:e.jsxs(t.Slot,{name:"menu",children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]})}),e.jsx(Ae,{onPress:()=>c("test1"),children:"Set Test1"})]})}},j={args:{placeholder:"Select an item"},render:s=>e.jsxs("div",{style:{display:"flex",gap:8,maxWidth:600},children:[e.jsxs(t,{...s,children:[e.jsx(t.Item,{value:"test1",children:"Test1 - This is a very long text to see how it overflows This is a very long text to see how it overflows This is a very long text to see how it overflows y long text to see how it overflows This is a very long text to see how it overflows This is a very long text to see how it overflows y long text to see how it overflows This is a very long text to see how it overflows This is a very long text to see how it overflows"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]}),e.jsxs(t.Combobox,{...s,children:[e.jsx(t.Item,{value:"test1",children:"Test1 - This is a very long text to see how it overflows"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]}),e.jsxs(t.Combobox,{...s,children:[e.jsx(t.Item,{value:"test1",children:"Test1 - This is a very long text to see how it overflows"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]})]})},w={decorators:[s=>e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:32},children:e.jsx(s,{})})],parameters:{viewport:{viewports:{mobile:{name:"Mobile",styles:{width:"300px",height:"272px"}}},defaultViewport:"mobile"}},render:s=>e.jsxs(e.Fragment,{children:[e.jsxs(t,{...s,children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"}),e.jsx(t.Item,{value:"test4",children:"Test4"}),e.jsx(t.Item,{value:"test5",children:"Test5"}),e.jsx(t.Item,{value:"test6",children:"Test6"}),e.jsx(t.Item,{value:"test7",children:"Test7"})]}),e.jsxs(t,{...s,children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"}),e.jsx(t.Item,{value:"test4",children:"Test4"}),e.jsx(t.Item,{value:"test5",children:"Test5"}),e.jsx(t.Item,{value:"test6",children:"Test6"}),e.jsx(t.Item,{value:"test7",children:"Test7"})]}),e.jsxs(t,{...s,children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"}),e.jsx(t.Item,{value:"test4",children:"Test4"}),e.jsx(t.Item,{value:"test5",children:"Test5"}),e.jsx(t.Item,{value:"test6",children:"Test6"}),e.jsx(t.Item,{value:"test7",children:"Test7"})]}),e.jsxs(t,{...s,children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"}),e.jsx(t.Item,{value:"test4",children:"Test4"}),e.jsx(t.Item,{value:"test5",children:"Test5"}),e.jsx(t.Item,{value:"test6",children:"Test6"}),e.jsx(t.Item,{value:"test7",children:"Test7"})]})]})},b={args:{status:"success"},render:s=>e.jsxs(t,{...s,children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]})},f={args:{status:"error"},render:s=>e.jsxs(t.Combobox,{...s,children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]})};var G,z,B;a.parameters={...a.parameters,docs:{...(G=a.parameters)==null?void 0:G.docs,source:{originalSource:`{
  name: 'Select',
  render: args => {
    return <Select {...args}>
                <Select.Item value="test1">Test1</Select.Item>
                <Select.Item value="test2">Test2</Select.Item>
                <Select.Item value="test3">Test3</Select.Item>
            </Select>;
  }
}`,...(B=(z=a.parameters)==null?void 0:z.docs)==null?void 0:B.source}}};var A,W,F;n.parameters={...n.parameters,docs:{...(A=n.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    placeholder: 'Select an item'
  },
  render: args => {
    return <Select.Combobox {...args}>
                <Select.Item value="test1">Test1</Select.Item>
                <Select.Item value="test2">Test2</Select.Item>
                <Select.Item value="test3">Test3</Select.Item>
            </Select.Combobox>;
  }
}`,...(F=(W=n.parameters)==null?void 0:W.docs)==null?void 0:F.source}}};var N,E,D;o.parameters={...o.parameters,docs:{...(N=o.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    placeholder: 'Select an item',
    getAsyncItems: async (filterText: string) => {
      const items = [{
        value: 'test1',
        label: 'Test 1 - Custom Content',
        content: <Flex gap={4} align="center">
                            <img src="https://flagsapi.com/CH/flat/16.png" alt="Switzerland" />
                            <p>Switzerland</p>
                        </Flex>
      }, {
        value: 'test2',
        label: 'Test 2',
        content: <Flex gap={4} align="center">
                            <p>With a Component</p>
                            <IconIcon size={16} />
                        </Flex>
      }, {
        value: 'test3',
        label: 'Test 3',
        content: <Flex gap={4} align="center">
                            Test 3<IconIcon />
                        </Flex>
      }, {
        value: 'aaaa',
        label: 'AAAA'
      }, {
        value: 'bbbb',
        label: 'BBBB'
      }, {
        value: 'cccc',
        label: 'CCCC'
      }];
      const filteredItems = items.filter(item => item.label.toLowerCase().includes(filterText.toLowerCase()));
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay

      return filteredItems;
    }
  },
  render: args => {
    return <Select.Combobox {...args}></Select.Combobox>;
  }
}`,...(D=(E=o.parameters)==null?void 0:E.docs)==null?void 0:D.source}}};var H,P,O;m.parameters={...m.parameters,docs:{...(H=m.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    disabled: true
  },
  render: args => {
    return <Select {...args}>
                <Select.Slot name="menu">
                    <Select.Item value="test1">Test1</Select.Item>
                    <Select.Item value="test2">Test2</Select.Item>
                    <Select.Item value="test3">Test3</Select.Item>
                </Select.Slot>
            </Select>;
  }
}`,...(O=(P=m.parameters)==null?void 0:P.docs)==null?void 0:O.source}}};var L,V,M;i.parameters={...i.parameters,docs:{...(L=i.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    placeholder: 'Select an item'
  },
  render: args => {
    return <Select {...args}>
                <Select.Slot name="menu">
                    <Select.Item value="test1">Test1</Select.Item>
                    <Select.Item value="test2">Test2</Select.Item>
                    <Select.Item value="test3">Test3</Select.Item>
                </Select.Slot>
            </Select>;
  }
}`,...(M=(V=i.parameters)==null?void 0:V.docs)==null?void 0:M.source}}};var _,k,R;S.parameters={...S.parameters,docs:{...(_=S.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    placeholder: 'Select an item'
  },
  render: args => {
    return <Select {...args}>
                <Select.Slot name="left">
                    <IconIcon size={16} />
                </Select.Slot>
                <Select.Slot name="right">
                    <IconIcon size={16} />
                </Select.Slot>
                <Select.Slot name="menu">
                    <Select.Item value="test1">Test1</Select.Item>
                    <Select.Item value="test2">Test2</Select.Item>
                    <Select.Item value="test3">Test3</Select.Item>
                </Select.Slot>
            </Select>;
  }
}`,...(R=(k=S.parameters)==null?void 0:k.docs)==null?void 0:R.source}}};var q,J,K;u.parameters={...u.parameters,docs:{...(q=u.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    placeholder: 'Select an item'
  },
  render: args => {
    return <Select {...args}>
                <Select.Slot name="right">
                    <IconIcon size={16} />
                </Select.Slot>
                <Select.Slot name="clear" />
                <Select.Slot name="menu">
                    <Select.Item value="test1">Test1</Select.Item>
                    <Select.Item value="test2">Test2</Select.Item>
                    <Select.Item value="test3">Test3</Select.Item>
                </Select.Slot>
            </Select>;
  }
}`,...(K=(J=u.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};var Q,U,X;d.parameters={...d.parameters,docs:{...(Q=d.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    placeholder: 'Select an item'
  },
  render: args => {
    return <Select {...args}>
                <Select.Slot name="clear">
                    <Button size="small" emphasis="strong" onPress={() => {}}>
                        Clear
                    </Button>
                </Select.Slot>
                <Select.Slot name="left">
                    <IconIcon size={16} />
                </Select.Slot>
                <Select.Slot name="right">
                    <IconIcon size={16} />
                </Select.Slot>
                <Select.Slot name="menu">
                    <Select.Item value="test1">Test1</Select.Item>
                    <Select.Item value="test2">Test2</Select.Item>
                    <Select.Item value="test3">Test3</Select.Item>
                </Select.Slot>
            </Select>;
  }
}`,...(X=(U=d.parameters)==null?void 0:U.docs)==null?void 0:X.source}}};var Y,Z,$;I.parameters={...I.parameters,docs:{...(Y=I.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  args: {
    defaultValue: 'test1'
  },
  render: args => {
    return <Select {...args}>
                <Select.Slot name="menu">
                    <Select.Item value="test1">Test1</Select.Item>
                    <Select.Item value="test2">Test2</Select.Item>
                    <Select.Item value="test3">Test3</Select.Item>
                </Select.Slot>
            </Select>;
  }
}`,...($=(Z=I.parameters)==null?void 0:Z.docs)==null?void 0:$.source}}};var ee,te,se;v.parameters={...v.parameters,docs:{...(ee=v.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  render: args => {
    return <Select {...args}>
                <Select.Slot name="menu">
                    <Select.Item value="test1">Test1</Select.Item>
                    <Select.Item value="test2">Test2</Select.Item>
                    <Select.Group groupId="Group 1">
                        <Select.Item value="test3">Test3</Select.Item>
                        <Select.Item value="test4">Test4</Select.Item>
                        <Select.Item value="test5">Test5</Select.Item>
                    </Select.Group>
                    <Select.Item value="test6">Test6</Select.Item>
                </Select.Slot>
            </Select>;
  }
}`,...(se=(te=v.parameters)==null?void 0:te.docs)==null?void 0:se.source}}};var le,re,ce;h.parameters={...h.parameters,docs:{...(le=h.parameters)==null?void 0:le.docs,source:{originalSource:`{
  render: args => {
    return <Select {...args}>
                <Select.Slot name="menu">
                    <Select.Item value="test1">Test1</Select.Item>
                    <Select.Item value="test2">Test2</Select.Item>
                    <Select.Group groupId="Group 1" heading="Group 1">
                        <Select.Item value="test3">Test3</Select.Item>
                        <Select.Item value="test4">Test4</Select.Item>
                        <Select.Item value="test5">Test5</Select.Item>
                    </Select.Group>
                    <Select.Group groupId="Group 2" heading="Group 2">
                        <Select.Item value="test6">Test6</Select.Item>
                        <Select.Item value="test7">Test7</Select.Item>
                        <Select.Item value="test8">Test8</Select.Item>
                    </Select.Group>
                    <Select.Item value="test9">Test9</Select.Item>
                </Select.Slot>
            </Select>;
  }
}`,...(ce=(re=h.parameters)==null?void 0:re.docs)==null?void 0:ce.source}}};var ae,ne,oe;x.parameters={...x.parameters,docs:{...(ae=x.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  render: args => {
    return <Select {...args}>
                <Select.Slot name="menu">
                    <Select.Group groupId="Group 1">
                        <Select.Item value="test1">Test1</Select.Item>
                        <Select.Item value="test2">Test2</Select.Item>
                    </Select.Group>
                    <Select.Group groupId="Group 2">
                        <Select.Item value="test3">Test3</Select.Item>
                        <Select.Item value="test4">Test4</Select.Item>
                        <Select.Item value="test5">Test5</Select.Item>
                    </Select.Group>
                </Select.Slot>
            </Select>;
  }
}`,...(oe=(ne=x.parameters)==null?void 0:ne.docs)==null?void 0:oe.source}}};var me,ie,Se;p.parameters={...p.parameters,docs:{...(me=p.parameters)==null?void 0:me.docs,source:{originalSource:`{
  render: args => {
    return <Select {...args}>
                <Select.Slot name="menu">
                    <Select.Item value="ch" label="Switzerland">
                        <div className="tw-flex tw-items-center tw-gap-4">
                            <img src="https://flagsapi.com/CH/flat/16.png" alt="Switzerland" />
                            <p>Switzerland</p>
                        </div>
                    </Select.Item>
                    <Select.Item value="icon" label="Component">
                        <div className="tw-flex tw-items-center tw-gap-4">
                            <p>With a Component</p>
                            <IconIcon size={16} />
                        </div>
                    </Select.Item>
                    <Select.Item value="basic" label="Basic">
                        Basic
                    </Select.Item>
                </Select.Slot>
            </Select>;
  }
}`,...(Se=(ie=p.parameters)==null?void 0:ie.docs)==null?void 0:Se.source}}};var ue,de,Ie;T.parameters={...T.parameters,docs:{...(ue=T.parameters)==null?void 0:ue.docs,source:{originalSource:`{
  render: args => {
    return <Select {...args} showStringValue={false}>
                <Select.Slot name="menu">
                    <Select.Item value="ch" label="Switzerland">
                        <div className="tw-flex tw-items-center tw-gap-4">
                            <img src="https://flagsapi.com/CH/flat/16.png" alt="Switzerland" />
                            <p>Switzerland</p>
                        </div>
                    </Select.Item>
                    <Select.Item value="icon" label="Component">
                        <div className="tw-flex tw-items-center tw-gap-4">
                            <p>With a Component</p>
                            <IconIcon size={16} />
                        </div>
                    </Select.Item>
                    <Select.Item value="basic" label="Basic">
                        Basic
                    </Select.Item>
                </Select.Slot>
            </Select>;
  }
}`,...(Ie=(de=T.parameters)==null?void 0:de.docs)==null?void 0:Ie.source}}};var ve,he,xe;g.parameters={...g.parameters,docs:{...(ve=g.parameters)==null?void 0:ve.docs,source:{originalSource:`{
  decorators: [Story => {
    return <div className="tw-flex tw-gap-4">
                    <Story />
                </div>;
  }],
  render: args => {
    const [activeItem, setActiveItem] = useState<string | null>();
    return <>
                <Select onSelect={selectedItem => {
        setActiveItem(() => selectedItem);
      }} value={activeItem} {...args}>
                    <Select.Slot name="menu">
                        <Select.Item value="test1">Test1</Select.Item>
                        <Select.Item value="test2">Test2</Select.Item>
                        <Select.Item value="test3">Test3</Select.Item>
                    </Select.Slot>
                </Select>
                <Button onPress={() => setActiveItem('test1')}>Set Test1</Button>
            </>;
  }
}`,...(xe=(he=g.parameters)==null?void 0:he.docs)==null?void 0:xe.source}}};var pe,Te,ge;j.parameters={...j.parameters,docs:{...(pe=j.parameters)==null?void 0:pe.docs,source:{originalSource:`{
  args: {
    placeholder: 'Select an item'
  },
  render: args => {
    return <div style={{
      display: 'flex',
      gap: 8,
      maxWidth: 600
    }}>
                <Select {...args}>
                    <Select.Item value="test1">
                        Test1 - This is a very long text to see how it overflows This is a very long text to see how it
                        overflows This is a very long text to see how it overflows y long text to see how it overflows
                        This is a very long text to see how it overflows This is a very long text to see how it
                        overflows y long text to see how it overflows This is a very long text to see how it overflows
                        This is a very long text to see how it overflows
                    </Select.Item>
                    <Select.Item value="test2">Test2</Select.Item>
                    <Select.Item value="test3">Test3</Select.Item>
                </Select>
                <Select.Combobox {...args}>
                    <Select.Item value="test1">Test1 - This is a very long text to see how it overflows</Select.Item>
                    <Select.Item value="test2">Test2</Select.Item>
                    <Select.Item value="test3">Test3</Select.Item>
                </Select.Combobox>
                <Select.Combobox {...args}>
                    <Select.Item value="test1">Test1 - This is a very long text to see how it overflows</Select.Item>
                    <Select.Item value="test2">Test2</Select.Item>
                    <Select.Item value="test3">Test3</Select.Item>
                </Select.Combobox>
            </div>;
  }
}`,...(ge=(Te=j.parameters)==null?void 0:Te.docs)==null?void 0:ge.source}}};var je,we,be;w.parameters={...w.parameters,docs:{...(je=w.parameters)==null?void 0:je.docs,source:{originalSource:`{
  decorators: [Story => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 32
  }}>
                <Story />
            </div>],
  parameters: {
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '300px',
            height: '272px'
          }
        }
      },
      defaultViewport: 'mobile'
    }
  },
  render: args => {
    return <>
                <Select {...args}>
                    <Select.Item value="test1">Test1</Select.Item>
                    <Select.Item value="test2">Test2</Select.Item>
                    <Select.Item value="test3">Test3</Select.Item>
                    <Select.Item value="test4">Test4</Select.Item>
                    <Select.Item value="test5">Test5</Select.Item>
                    <Select.Item value="test6">Test6</Select.Item>
                    <Select.Item value="test7">Test7</Select.Item>
                </Select>
                <Select {...args}>
                    <Select.Item value="test1">Test1</Select.Item>
                    <Select.Item value="test2">Test2</Select.Item>
                    <Select.Item value="test3">Test3</Select.Item>
                    <Select.Item value="test4">Test4</Select.Item>
                    <Select.Item value="test5">Test5</Select.Item>
                    <Select.Item value="test6">Test6</Select.Item>
                    <Select.Item value="test7">Test7</Select.Item>
                </Select>
                <Select {...args}>
                    <Select.Item value="test1">Test1</Select.Item>
                    <Select.Item value="test2">Test2</Select.Item>
                    <Select.Item value="test3">Test3</Select.Item>
                    <Select.Item value="test4">Test4</Select.Item>
                    <Select.Item value="test5">Test5</Select.Item>
                    <Select.Item value="test6">Test6</Select.Item>
                    <Select.Item value="test7">Test7</Select.Item>
                </Select>
                <Select {...args}>
                    <Select.Item value="test1">Test1</Select.Item>
                    <Select.Item value="test2">Test2</Select.Item>
                    <Select.Item value="test3">Test3</Select.Item>
                    <Select.Item value="test4">Test4</Select.Item>
                    <Select.Item value="test5">Test5</Select.Item>
                    <Select.Item value="test6">Test6</Select.Item>
                    <Select.Item value="test7">Test7</Select.Item>
                </Select>
            </>;
  }
}`,...(be=(we=w.parameters)==null?void 0:we.docs)==null?void 0:be.source}}};var fe,Ce,ye;b.parameters={...b.parameters,docs:{...(fe=b.parameters)==null?void 0:fe.docs,source:{originalSource:`{
  args: {
    status: 'success'
  },
  render: args => {
    return <Select {...args}>
                <Select.Item value="test1">Test1</Select.Item>
                <Select.Item value="test2">Test2</Select.Item>
                <Select.Item value="test3">Test3</Select.Item>
            </Select>;
  }
}`,...(ye=(Ce=b.parameters)==null?void 0:Ce.docs)==null?void 0:ye.source}}};var Ge,ze,Be;f.parameters={...f.parameters,docs:{...(Ge=f.parameters)==null?void 0:Ge.docs,source:{originalSource:`{
  args: {
    status: 'error'
  },
  render: args => {
    return <Select.Combobox {...args}>
                <Select.Item value="test1">Test1</Select.Item>
                <Select.Item value="test2">Test2</Select.Item>
                <Select.Item value="test3">Test3</Select.Item>
            </Select.Combobox>;
  }
}`,...(Be=(ze=f.parameters)==null?void 0:ze.docs)==null?void 0:Be.source}}};const $e=["SimpleSelect","Combobox","ComboboxWithAsyncItems","Disabled","WithPlaceholder","WithDecorator","Clearable","CustomClearElement","DefaultItem","ItemGroups","ItemGroupsWithHeaders","OnlyItemGroups","CustomItem","CustomItemIncludingSelectField","ExternallyControlled","OverflowingText","ListOverflow","Success","Errored"];export{u as Clearable,n as Combobox,o as ComboboxWithAsyncItems,d as CustomClearElement,p as CustomItem,T as CustomItemIncludingSelectField,I as DefaultItem,m as Disabled,f as Errored,g as ExternallyControlled,v as ItemGroups,h as ItemGroupsWithHeaders,w as ListOverflow,x as OnlyItemGroups,j as OverflowingText,a as SimpleSelect,b as Success,S as WithDecorator,i as WithPlaceholder,$e as __namedExportsOrder,Ze as default};
