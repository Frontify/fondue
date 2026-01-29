import{j as e,r as Qt,F as G}from"./iframe-iiY1GLSZ.js";import{c as s}from"./fondue-icons369-BBw2IgWb.js";import{B as Jt}from"./Button-BQ0oweYn.js";import{a as Ut,b as Xt,c as Yt,d as Zt,e as $t,S as t}from"./Select-Ga2PXwx7.js";import"./preload-helper-C1FmrZbK.js";import"./index-CfK3SXa-.js";import"./index-DO5GI3vL.js";import"./index-BR3SIW2J.js";import"./index-jmEib0KV.js";import"./index-D68IlXR0.js";import"./Combination-B97e_myn.js";import"./LoadingCircle-DNTSr2CT.js";import"./useTranslation-C09tU7m5.js";const Il={title:"Components/Select",component:$t,subcomponents:{"Select.Combobox":Zt,"Select.Slot":Yt,"Select.Group":Xt,"Select.Item":Ut},tags:["autodocs"],parameters:{status:{type:"released"}},args:{"aria-label":"Select an item",placeholder:"Select an item"}},c={name:"Select",render:l=>e.jsxs(t,{...l,children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]})},a={args:{placeholder:"Select an item"},render:l=>e.jsxs(t.Combobox,{...l,children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]})},n={args:{placeholder:"Select an item",getAsyncItems:async l=>{const y=[{value:"test1",label:"Test 1 - Custom Content",content:e.jsxs(G,{gap:4,align:"center",children:[e.jsx("img",{src:"https://flagsapi.com/CH/flat/16.png",alt:"Switzerland"}),e.jsx("p",{children:"Switzerland"})]})},{value:"test2",label:"Test 2",content:e.jsxs(G,{gap:4,align:"center",children:[e.jsx("p",{children:"With a Component"}),e.jsx(s,{size:16})]})},{value:"test3",label:"Test 3",content:e.jsxs(G,{gap:4,align:"center",children:["Test 3",e.jsx(s,{})]})},{value:"aaaa",label:"AAAA"},{value:"bbbb",label:"BBBB"},{value:"cccc",label:"CCCC"}].filter(C=>C.label.toLowerCase().includes(l.toLowerCase()));return await new Promise(C=>setTimeout(C,500)),y}},render:l=>e.jsx(t.Combobox,{...l})},r={args:{disabled:!0},render:l=>e.jsx(t,{...l,children:e.jsxs(t.Slot,{name:"menu",children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]})})},o={args:{placeholder:"Select an item"},render:l=>e.jsx(t,{...l,children:e.jsxs(t.Slot,{name:"menu",children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]})})},m={args:{placeholder:"Select an item"},render:l=>e.jsxs(t,{...l,children:[e.jsx(t.Slot,{name:"left",children:e.jsx(s,{size:16})}),e.jsx(t.Slot,{name:"right",children:e.jsx(s,{size:16})}),e.jsxs(t.Slot,{name:"menu",children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]})]})},S={args:{placeholder:"Select an item"},render:l=>e.jsxs(t,{...l,children:[e.jsx(t.Slot,{name:"right",children:e.jsx(s,{size:16})}),e.jsx(t.Slot,{name:"clear"}),e.jsxs(t.Slot,{name:"menu",children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]})]})},i={args:{placeholder:"Select an item"},render:l=>e.jsxs(t,{...l,children:[e.jsx(t.Slot,{name:"clear",children:e.jsx(Jt,{size:"small",emphasis:"strong",onPress:()=>{},children:"Clear"})}),e.jsx(t.Slot,{name:"left",children:e.jsx(s,{size:16})}),e.jsx(t.Slot,{name:"right",children:e.jsx(s,{size:16})}),e.jsxs(t.Slot,{name:"menu",children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]})]})},u={args:{defaultValue:"test1"},render:l=>e.jsx(t,{...l,children:e.jsxs(t.Slot,{name:"menu",children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]})})},I={render:l=>e.jsx(t,{...l,children:e.jsxs(t.Slot,{name:"menu",children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsxs(t.Group,{groupId:"Group 1",children:[e.jsx(t.Item,{value:"test3",children:"Test3"}),e.jsx(t.Item,{value:"test4",children:"Test4"}),e.jsx(t.Item,{value:"test5",children:"Test5"})]}),e.jsx(t.Item,{value:"test6",children:"Test6"})]})})},d={render:l=>e.jsx(t,{...l,children:e.jsxs(t.Slot,{name:"menu",children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsxs(t.Group,{groupId:"Group 1",heading:"Group 1",children:[e.jsx(t.Item,{value:"test3",children:"Test3"}),e.jsx(t.Item,{value:"test4",children:"Test4"}),e.jsx(t.Item,{value:"test5",children:"Test5"})]}),e.jsxs(t.Group,{groupId:"Group 2",heading:"Group 2",children:[e.jsx(t.Item,{value:"test6",children:"Test6"}),e.jsx(t.Item,{value:"test7",children:"Test7"}),e.jsx(t.Item,{value:"test8",children:"Test8"})]}),e.jsx(t.Item,{value:"test9",children:"Test9"})]})})},p={render:l=>e.jsx(t,{...l,children:e.jsxs(t.Slot,{name:"menu",children:[e.jsxs(t.Group,{groupId:"Group 1",children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"})]}),e.jsxs(t.Group,{groupId:"Group 2",children:[e.jsx(t.Item,{value:"test3",children:"Test3"}),e.jsx(t.Item,{value:"test4",children:"Test4"}),e.jsx(t.Item,{value:"test5",children:"Test5"})]})]})})},v={render:l=>e.jsx(t,{...l,children:e.jsxs(t.Slot,{name:"menu",children:[e.jsx(t.Item,{value:"ch",label:"Switzerland",children:e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-4",children:[e.jsx("img",{src:"https://flagsapi.com/CH/flat/16.png",alt:"Switzerland"}),e.jsx("p",{children:"Switzerland"})]})}),e.jsx(t.Item,{value:"icon",label:"Component",children:e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-4",children:[e.jsx("p",{children:"With a Component"}),e.jsx(s,{size:16})]})}),e.jsx(t.Item,{value:"basic",label:"Basic",children:"Basic"})]})})},h={render:l=>e.jsx(t,{...l,showStringValue:!1,children:e.jsxs(t.Slot,{name:"menu",children:[e.jsx(t.Item,{value:"ch",label:"Switzerland",children:e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-4",children:[e.jsx("img",{src:"https://flagsapi.com/CH/flat/16.png",alt:"Switzerland"}),e.jsx("p",{children:"Switzerland"})]})}),e.jsx(t.Item,{value:"icon",label:"Component",children:e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-4",children:[e.jsx("p",{children:"With a Component"}),e.jsx(s,{size:16})]})}),e.jsx(t.Item,{value:"basic",label:"Basic",children:"Basic"})]})})},T={decorators:[l=>e.jsx("div",{className:"tw-flex tw-gap-4",children:e.jsx(l,{})})],render:l=>{const[z,y]=Qt.useState();return e.jsxs(e.Fragment,{children:[e.jsx(t,{onSelect:C=>{y(()=>C)},value:z,...l,children:e.jsxs(t.Slot,{name:"menu",children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]})}),e.jsx(Jt,{onPress:()=>y("test1"),children:"Set Test1"})]})}},x={args:{placeholder:"Select an item"},render:l=>e.jsxs("div",{style:{display:"flex",gap:8,maxWidth:600},children:[e.jsxs(t,{...l,children:[e.jsx(t.Item,{value:"test1",children:"Test1 - This is a very long text to see how it overflows This is a very long text to see how it overflows This is a very long text to see how it overflows y long text to see how it overflows This is a very long text to see how it overflows This is a very long text to see how it overflows y long text to see how it overflows This is a very long text to see how it overflows This is a very long text to see how it overflows"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]}),e.jsxs(t.Combobox,{...l,children:[e.jsx(t.Item,{value:"test1",children:"Test1 - This is a very long text to see how it overflows"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]}),e.jsxs(t.Combobox,{...l,children:[e.jsx(t.Item,{value:"test1",children:"Test1 - This is a very long text to see how it overflows"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]})]})},g={decorators:[l=>e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:32},children:e.jsx(l,{})})],parameters:{viewport:{viewports:{mobile:{name:"Mobile",styles:{width:"300px",height:"272px"}}},defaultViewport:"mobile"}},render:l=>e.jsxs(e.Fragment,{children:[e.jsxs(t,{...l,children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"}),e.jsx(t.Item,{value:"test4",children:"Test4"}),e.jsx(t.Item,{value:"test5",children:"Test5"}),e.jsx(t.Item,{value:"test6",children:"Test6"}),e.jsx(t.Item,{value:"test7",children:"Test7"})]}),e.jsxs(t,{...l,children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"}),e.jsx(t.Item,{value:"test4",children:"Test4"}),e.jsx(t.Item,{value:"test5",children:"Test5"}),e.jsx(t.Item,{value:"test6",children:"Test6"}),e.jsx(t.Item,{value:"test7",children:"Test7"})]}),e.jsxs(t,{...l,children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"}),e.jsx(t.Item,{value:"test4",children:"Test4"}),e.jsx(t.Item,{value:"test5",children:"Test5"}),e.jsx(t.Item,{value:"test6",children:"Test6"}),e.jsx(t.Item,{value:"test7",children:"Test7"})]}),e.jsxs(t,{...l,children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"}),e.jsx(t.Item,{value:"test4",children:"Test4"}),e.jsx(t.Item,{value:"test5",children:"Test5"}),e.jsx(t.Item,{value:"test6",children:"Test6"}),e.jsx(t.Item,{value:"test7",children:"Test7"})]})]})},j={args:{status:"success"},render:l=>e.jsxs(t,{...l,children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]})},b={args:{status:"error"},render:l=>e.jsxs(t.Combobox,{...l,children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]})},w={args:{placeholder:"Select an item"},render:l=>e.jsxs(t,{...l,onEscapeKeyDown:()=>{alert("Escape key was pressed!")},children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]})},f={args:{placeholder:"Select an item"},render:l=>e.jsxs(t.Combobox,{...l,onEscapeKeyDown:()=>{alert("Escape key was pressed!")},children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]})};var B,E,A;c.parameters={...c.parameters,docs:{...(B=c.parameters)==null?void 0:B.docs,source:{code:`const SimpleSelect = () => {
  return (
    <Select aria-label="Select an item" placeholder="Select an item">
      <Select.Item value="test1">Test1</Select.Item>
      <Select.Item value="test2">Test2</Select.Item>
      <Select.Item value="test3">Test3</Select.Item>
    </Select>
  );
};
`,...(A=(E=c.parameters)==null?void 0:E.docs)==null?void 0:A.source}}};var W,D,F;a.parameters={...a.parameters,docs:{...(W=a.parameters)==null?void 0:W.docs,source:{code:`const Combobox = () => {
  return (
    <Select.Combobox aria-label="Select an item" placeholder="Select an item">
      <Select.Item value="test1">Test1</Select.Item>
      <Select.Item value="test2">Test2</Select.Item>
      <Select.Item value="test3">Test3</Select.Item>
    </Select.Combobox>
  );
};
`,...(F=(D=a.parameters)==null?void 0:D.docs)==null?void 0:F.source}}};var O,N,H;n.parameters={...n.parameters,docs:{...(O=n.parameters)==null?void 0:O.docs,source:{code:`const ComboboxWithAsyncItems = () => {
  return (
    <Select.Combobox
      aria-label="Select an item"
      placeholder="Select an item"
      getAsyncItems={async (filterText: string) => {
        const items = [
          {
            value: "test1",
            label: "Test 1 - Custom Content",
            content: (
              <Flex gap={4} align="center">
                <img
                  src="https://flagsapi.com/CH/flat/16.png"
                  alt="Switzerland"
                />
                <p>Switzerland</p>
              </Flex>
            ),
          },
          {
            value: "test2",
            label: "Test 2",
            content: (
              <Flex gap={4} align="center">
                <p>With a Component</p>
                <IconIcon size={16} />
              </Flex>
            ),
          },
          {
            value: "test3",
            label: "Test 3",
            content: (
              <Flex gap={4} align="center">
                Test 3<IconIcon />
              </Flex>
            ),
          },
          { value: "aaaa", label: "AAAA" },
          { value: "bbbb", label: "BBBB" },
          { value: "cccc", label: "CCCC" },
        ];

        const filteredItems = items.filter((item) =>
          item.label.toLowerCase().includes(filterText.toLowerCase()),
        );

        await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay

        return filteredItems;
      }}
    />
  );
};
`,...(H=(N=n.parameters)==null?void 0:N.docs)==null?void 0:H.source}}};var K,P,L;r.parameters={...r.parameters,docs:{...(K=r.parameters)==null?void 0:K.docs,source:{code:`const Disabled = () => {
  return (
    <Select aria-label="Select an item" placeholder="Select an item" disabled>
      <Select.Slot name="menu">
        <Select.Item value="test1">Test1</Select.Item>
        <Select.Item value="test2">Test2</Select.Item>
        <Select.Item value="test3">Test3</Select.Item>
      </Select.Slot>
    </Select>
  );
};
`,...(L=(P=r.parameters)==null?void 0:P.docs)==null?void 0:L.source}}};var k,V,M;o.parameters={...o.parameters,docs:{...(k=o.parameters)==null?void 0:k.docs,source:{code:`const WithPlaceholder = () => {
  return (
    <Select aria-label="Select an item" placeholder="Select an item">
      <Select.Slot name="menu">
        <Select.Item value="test1">Test1</Select.Item>
        <Select.Item value="test2">Test2</Select.Item>
        <Select.Item value="test3">Test3</Select.Item>
      </Select.Slot>
    </Select>
  );
};
`,...(M=(V=o.parameters)==null?void 0:V.docs)==null?void 0:M.source}}};var _,R,q;m.parameters={...m.parameters,docs:{...(_=m.parameters)==null?void 0:_.docs,source:{code:`const WithDecorator = () => {
  return (
    <Select aria-label="Select an item" placeholder="Select an item">
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
    </Select>
  );
};
`,...(q=(R=m.parameters)==null?void 0:R.docs)==null?void 0:q.source}}};var J,Q,U;S.parameters={...S.parameters,docs:{...(J=S.parameters)==null?void 0:J.docs,source:{code:`const Clearable = () => {
  return (
    <Select aria-label="Select an item" placeholder="Select an item">
      <Select.Slot name="right">
        <IconIcon size={16} />
      </Select.Slot>
      <Select.Slot name="clear" />
      <Select.Slot name="menu">
        <Select.Item value="test1">Test1</Select.Item>
        <Select.Item value="test2">Test2</Select.Item>
        <Select.Item value="test3">Test3</Select.Item>
      </Select.Slot>
    </Select>
  );
};
`,...(U=(Q=S.parameters)==null?void 0:Q.docs)==null?void 0:U.source}}};var X,Y,Z;i.parameters={...i.parameters,docs:{...(X=i.parameters)==null?void 0:X.docs,source:{code:`const CustomClearElement = () => {
  return (
    <Select aria-label="Select an item" placeholder="Select an item">
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
    </Select>
  );
};
`,...(Z=(Y=i.parameters)==null?void 0:Y.docs)==null?void 0:Z.source}}};var $,ee,te;u.parameters={...u.parameters,docs:{...($=u.parameters)==null?void 0:$.docs,source:{code:`const DefaultItem = () => {
  return (
    <Select
      aria-label="Select an item"
      placeholder="Select an item"
      defaultValue="test1"
    >
      <Select.Slot name="menu">
        <Select.Item value="test1">Test1</Select.Item>
        <Select.Item value="test2">Test2</Select.Item>
        <Select.Item value="test3">Test3</Select.Item>
      </Select.Slot>
    </Select>
  );
};
`,...(te=(ee=u.parameters)==null?void 0:ee.docs)==null?void 0:te.source}}};var le,se,ce;I.parameters={...I.parameters,docs:{...(le=I.parameters)==null?void 0:le.docs,source:{code:`const ItemGroups = () => {
  return (
    <Select aria-label="Select an item" placeholder="Select an item">
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
    </Select>
  );
};
`,...(ce=(se=I.parameters)==null?void 0:se.docs)==null?void 0:ce.source}}};var ae,ne,re;d.parameters={...d.parameters,docs:{...(ae=d.parameters)==null?void 0:ae.docs,source:{code:`const ItemGroupsWithHeaders = () => {
  return (
    <Select aria-label="Select an item" placeholder="Select an item">
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
    </Select>
  );
};
`,...(re=(ne=d.parameters)==null?void 0:ne.docs)==null?void 0:re.source}}};var oe,me,Se;p.parameters={...p.parameters,docs:{...(oe=p.parameters)==null?void 0:oe.docs,source:{code:`const OnlyItemGroups = () => {
  return (
    <Select aria-label="Select an item" placeholder="Select an item">
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
    </Select>
  );
};
`,...(Se=(me=p.parameters)==null?void 0:me.docs)==null?void 0:Se.source}}};var ie,ue,Ie;v.parameters={...v.parameters,docs:{...(ie=v.parameters)==null?void 0:ie.docs,source:{code:`const CustomItem = () => {
  return (
    <Select aria-label="Select an item" placeholder="Select an item">
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
    </Select>
  );
};
`,...(Ie=(ue=v.parameters)==null?void 0:ue.docs)==null?void 0:Ie.source}}};var de,pe,ve;h.parameters={...h.parameters,docs:{...(de=h.parameters)==null?void 0:de.docs,source:{code:`const CustomItemIncludingSelectField = () => {
  return (
    <Select
      aria-label="Select an item"
      placeholder="Select an item"
      showStringValue={false}
    >
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
    </Select>
  );
};
`,...(ve=(pe=h.parameters)==null?void 0:pe.docs)==null?void 0:ve.source}}};var he,Te,xe;T.parameters={...T.parameters,docs:{...(he=T.parameters)==null?void 0:he.docs,source:{code:`const ExternallyControlled = () => {
  const [activeItem, setActiveItem] = useState<string | null>();

  return (
    <>
      <Select
        onSelect={(selectedItem) => {
          setActiveItem(() => selectedItem);
        }}
        value={activeItem}
        aria-label="Select an item"
        placeholder="Select an item"
      >
        <Select.Slot name="menu">
          <Select.Item value="test1">Test1</Select.Item>
          <Select.Item value="test2">Test2</Select.Item>
          <Select.Item value="test3">Test3</Select.Item>
        </Select.Slot>
      </Select>
      <Button onPress={() => setActiveItem("test1")}>Set Test1</Button>
    </>
  );
};
`,...(xe=(Te=T.parameters)==null?void 0:Te.docs)==null?void 0:xe.source}}};var ge,je,be;x.parameters={...x.parameters,docs:{...(ge=x.parameters)==null?void 0:ge.docs,source:{code:`const OverflowingText = () => {
  return (
    <div style={{ display: "flex", gap: 8, maxWidth: 600 }}>
      <Select aria-label="Select an item" placeholder="Select an item">
        <Select.Item value="test1">
          Test1 - This is a very long text to see how it overflows This is a
          very long text to see how it overflows This is a very long text to see
          how it overflows y long text to see how it overflows This is a very
          long text to see how it overflows This is a very long text to see how
          it overflows y long text to see how it overflows This is a very long
          text to see how it overflows This is a very long text to see how it
          overflows
        </Select.Item>
        <Select.Item value="test2">Test2</Select.Item>
        <Select.Item value="test3">Test3</Select.Item>
      </Select>
      <Select.Combobox aria-label="Select an item" placeholder="Select an item">
        <Select.Item value="test1">
          Test1 - This is a very long text to see how it overflows
        </Select.Item>
        <Select.Item value="test2">Test2</Select.Item>
        <Select.Item value="test3">Test3</Select.Item>
      </Select.Combobox>
      <Select.Combobox aria-label="Select an item" placeholder="Select an item">
        <Select.Item value="test1">
          Test1 - This is a very long text to see how it overflows
        </Select.Item>
        <Select.Item value="test2">Test2</Select.Item>
        <Select.Item value="test3">Test3</Select.Item>
      </Select.Combobox>
    </div>
  );
};
`,...(be=(je=x.parameters)==null?void 0:je.docs)==null?void 0:be.source}}};var we,fe,Ce;g.parameters={...g.parameters,docs:{...(we=g.parameters)==null?void 0:we.docs,source:{code:`const ListOverflow = () => {
  return (
    <>
      <Select aria-label="Select an item" placeholder="Select an item">
        <Select.Item value="test1">Test1</Select.Item>
        <Select.Item value="test2">Test2</Select.Item>
        <Select.Item value="test3">Test3</Select.Item>
        <Select.Item value="test4">Test4</Select.Item>
        <Select.Item value="test5">Test5</Select.Item>
        <Select.Item value="test6">Test6</Select.Item>
        <Select.Item value="test7">Test7</Select.Item>
      </Select>
      <Select aria-label="Select an item" placeholder="Select an item">
        <Select.Item value="test1">Test1</Select.Item>
        <Select.Item value="test2">Test2</Select.Item>
        <Select.Item value="test3">Test3</Select.Item>
        <Select.Item value="test4">Test4</Select.Item>
        <Select.Item value="test5">Test5</Select.Item>
        <Select.Item value="test6">Test6</Select.Item>
        <Select.Item value="test7">Test7</Select.Item>
      </Select>
      <Select aria-label="Select an item" placeholder="Select an item">
        <Select.Item value="test1">Test1</Select.Item>
        <Select.Item value="test2">Test2</Select.Item>
        <Select.Item value="test3">Test3</Select.Item>
        <Select.Item value="test4">Test4</Select.Item>
        <Select.Item value="test5">Test5</Select.Item>
        <Select.Item value="test6">Test6</Select.Item>
        <Select.Item value="test7">Test7</Select.Item>
      </Select>
      <Select aria-label="Select an item" placeholder="Select an item">
        <Select.Item value="test1">Test1</Select.Item>
        <Select.Item value="test2">Test2</Select.Item>
        <Select.Item value="test3">Test3</Select.Item>
        <Select.Item value="test4">Test4</Select.Item>
        <Select.Item value="test5">Test5</Select.Item>
        <Select.Item value="test6">Test6</Select.Item>
        <Select.Item value="test7">Test7</Select.Item>
      </Select>
    </>
  );
};
`,...(Ce=(fe=g.parameters)==null?void 0:fe.docs)==null?void 0:Ce.source}}};var ye,Ge,ze;j.parameters={...j.parameters,docs:{...(ye=j.parameters)==null?void 0:ye.docs,source:{code:`const Success = () => {
  return (
    <Select
      aria-label="Select an item"
      placeholder="Select an item"
      status="success"
    >
      <Select.Item value="test1">Test1</Select.Item>
      <Select.Item value="test2">Test2</Select.Item>
      <Select.Item value="test3">Test3</Select.Item>
    </Select>
  );
};
`,...(ze=(Ge=j.parameters)==null?void 0:Ge.docs)==null?void 0:ze.source}}};var Be,Ee,Ae;b.parameters={...b.parameters,docs:{...(Be=b.parameters)==null?void 0:Be.docs,source:{code:`const Errored = () => {
  return (
    <Select.Combobox
      aria-label="Select an item"
      placeholder="Select an item"
      status="error"
    >
      <Select.Item value="test1">Test1</Select.Item>
      <Select.Item value="test2">Test2</Select.Item>
      <Select.Item value="test3">Test3</Select.Item>
    </Select.Combobox>
  );
};
`,...(Ae=(Ee=b.parameters)==null?void 0:Ee.docs)==null?void 0:Ae.source}}};var We,De,Fe;w.parameters={...w.parameters,docs:{...(We=w.parameters)==null?void 0:We.docs,source:{code:`const OnEscapeKeyDown = () => {
  return (
    <Select
      aria-label="Select an item"
      placeholder="Select an item"
      onEscapeKeyDown={() => {
        alert("Escape key was pressed!");
      }}
    >
      <Select.Item value="test1">Test1</Select.Item>
      <Select.Item value="test2">Test2</Select.Item>
      <Select.Item value="test3">Test3</Select.Item>
    </Select>
  );
};
`,...(Fe=(De=w.parameters)==null?void 0:De.docs)==null?void 0:Fe.source}}};var Oe,Ne,He;f.parameters={...f.parameters,docs:{...(Oe=f.parameters)==null?void 0:Oe.docs,source:{code:`const ComboboxOnEscapeKeyDown = () => {
  return (
    <Select.Combobox
      aria-label="Select an item"
      placeholder="Select an item"
      onEscapeKeyDown={() => {
        alert("Escape key was pressed!");
      }}
    >
      <Select.Item value="test1">Test1</Select.Item>
      <Select.Item value="test2">Test2</Select.Item>
      <Select.Item value="test3">Test3</Select.Item>
    </Select.Combobox>
  );
};
`,...(He=(Ne=f.parameters)==null?void 0:Ne.docs)==null?void 0:He.source}}};var Ke,Pe,Le;c.parameters={...c.parameters,docs:{...(Ke=c.parameters)==null?void 0:Ke.docs,source:{originalSource:`{
  name: 'Select',
  render: args => {
    return <Select {...args}>
                <Select.Item value="test1">Test1</Select.Item>
                <Select.Item value="test2">Test2</Select.Item>
                <Select.Item value="test3">Test3</Select.Item>
            </Select>;
  }
}`,...(Le=(Pe=c.parameters)==null?void 0:Pe.docs)==null?void 0:Le.source}}};var ke,Ve,Me;a.parameters={...a.parameters,docs:{...(ke=a.parameters)==null?void 0:ke.docs,source:{originalSource:`{
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
}`,...(Me=(Ve=a.parameters)==null?void 0:Ve.docs)==null?void 0:Me.source}}};var _e,Re,qe;n.parameters={...n.parameters,docs:{...(_e=n.parameters)==null?void 0:_e.docs,source:{originalSource:`{
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
}`,...(qe=(Re=n.parameters)==null?void 0:Re.docs)==null?void 0:qe.source}}};var Je,Qe,Ue;r.parameters={...r.parameters,docs:{...(Je=r.parameters)==null?void 0:Je.docs,source:{originalSource:`{
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
}`,...(Ue=(Qe=r.parameters)==null?void 0:Qe.docs)==null?void 0:Ue.source}}};var Xe,Ye,Ze;o.parameters={...o.parameters,docs:{...(Xe=o.parameters)==null?void 0:Xe.docs,source:{originalSource:`{
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
}`,...(Ze=(Ye=o.parameters)==null?void 0:Ye.docs)==null?void 0:Ze.source}}};var $e,et,tt;m.parameters={...m.parameters,docs:{...($e=m.parameters)==null?void 0:$e.docs,source:{originalSource:`{
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
}`,...(tt=(et=m.parameters)==null?void 0:et.docs)==null?void 0:tt.source}}};var lt,st,ct;S.parameters={...S.parameters,docs:{...(lt=S.parameters)==null?void 0:lt.docs,source:{originalSource:`{
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
}`,...(ct=(st=S.parameters)==null?void 0:st.docs)==null?void 0:ct.source}}};var at,nt,rt;i.parameters={...i.parameters,docs:{...(at=i.parameters)==null?void 0:at.docs,source:{originalSource:`{
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
}`,...(rt=(nt=i.parameters)==null?void 0:nt.docs)==null?void 0:rt.source}}};var ot,mt,St;u.parameters={...u.parameters,docs:{...(ot=u.parameters)==null?void 0:ot.docs,source:{originalSource:`{
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
}`,...(St=(mt=u.parameters)==null?void 0:mt.docs)==null?void 0:St.source}}};var it,ut,It;I.parameters={...I.parameters,docs:{...(it=I.parameters)==null?void 0:it.docs,source:{originalSource:`{
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
}`,...(It=(ut=I.parameters)==null?void 0:ut.docs)==null?void 0:It.source}}};var dt,pt,vt;d.parameters={...d.parameters,docs:{...(dt=d.parameters)==null?void 0:dt.docs,source:{originalSource:`{
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
}`,...(vt=(pt=d.parameters)==null?void 0:pt.docs)==null?void 0:vt.source}}};var ht,Tt,xt;p.parameters={...p.parameters,docs:{...(ht=p.parameters)==null?void 0:ht.docs,source:{originalSource:`{
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
}`,...(xt=(Tt=p.parameters)==null?void 0:Tt.docs)==null?void 0:xt.source}}};var gt,jt,bt;v.parameters={...v.parameters,docs:{...(gt=v.parameters)==null?void 0:gt.docs,source:{originalSource:`{
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
}`,...(bt=(jt=v.parameters)==null?void 0:jt.docs)==null?void 0:bt.source}}};var wt,ft,Ct;h.parameters={...h.parameters,docs:{...(wt=h.parameters)==null?void 0:wt.docs,source:{originalSource:`{
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
}`,...(Ct=(ft=h.parameters)==null?void 0:ft.docs)==null?void 0:Ct.source}}};var yt,Gt,zt;T.parameters={...T.parameters,docs:{...(yt=T.parameters)==null?void 0:yt.docs,source:{originalSource:`{
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
}`,...(zt=(Gt=T.parameters)==null?void 0:Gt.docs)==null?void 0:zt.source}}};var Bt,Et,At;x.parameters={...x.parameters,docs:{...(Bt=x.parameters)==null?void 0:Bt.docs,source:{originalSource:`{
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
}`,...(At=(Et=x.parameters)==null?void 0:Et.docs)==null?void 0:At.source}}};var Wt,Dt,Ft;g.parameters={...g.parameters,docs:{...(Wt=g.parameters)==null?void 0:Wt.docs,source:{originalSource:`{
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
}`,...(Ft=(Dt=g.parameters)==null?void 0:Dt.docs)==null?void 0:Ft.source}}};var Ot,Nt,Ht;j.parameters={...j.parameters,docs:{...(Ot=j.parameters)==null?void 0:Ot.docs,source:{originalSource:`{
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
}`,...(Ht=(Nt=j.parameters)==null?void 0:Nt.docs)==null?void 0:Ht.source}}};var Kt,Pt,Lt;b.parameters={...b.parameters,docs:{...(Kt=b.parameters)==null?void 0:Kt.docs,source:{originalSource:`{
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
}`,...(Lt=(Pt=b.parameters)==null?void 0:Pt.docs)==null?void 0:Lt.source}}};var kt,Vt,Mt;w.parameters={...w.parameters,docs:{...(kt=w.parameters)==null?void 0:kt.docs,source:{originalSource:`{
  args: {
    placeholder: 'Select an item'
  },
  render: args => {
    return <Select {...args} onEscapeKeyDown={() => {
      alert('Escape key was pressed!');
    }}>
                <Select.Item value="test1">Test1</Select.Item>
                <Select.Item value="test2">Test2</Select.Item>
                <Select.Item value="test3">Test3</Select.Item>
            </Select>;
  }
}`,...(Mt=(Vt=w.parameters)==null?void 0:Vt.docs)==null?void 0:Mt.source}}};var _t,Rt,qt;f.parameters={...f.parameters,docs:{...(_t=f.parameters)==null?void 0:_t.docs,source:{originalSource:`{
  args: {
    placeholder: 'Select an item'
  },
  render: args => {
    return <Select.Combobox {...args} onEscapeKeyDown={() => {
      alert('Escape key was pressed!');
    }}>
                <Select.Item value="test1">Test1</Select.Item>
                <Select.Item value="test2">Test2</Select.Item>
                <Select.Item value="test3">Test3</Select.Item>
            </Select.Combobox>;
  }
}`,...(qt=(Rt=f.parameters)==null?void 0:Rt.docs)==null?void 0:qt.source}}};const dl=["SimpleSelect","Combobox","ComboboxWithAsyncItems","Disabled","WithPlaceholder","WithDecorator","Clearable","CustomClearElement","DefaultItem","ItemGroups","ItemGroupsWithHeaders","OnlyItemGroups","CustomItem","CustomItemIncludingSelectField","ExternallyControlled","OverflowingText","ListOverflow","Success","Errored","OnEscapeKeyDown","ComboboxOnEscapeKeyDown"];export{S as Clearable,a as Combobox,f as ComboboxOnEscapeKeyDown,n as ComboboxWithAsyncItems,i as CustomClearElement,v as CustomItem,h as CustomItemIncludingSelectField,u as DefaultItem,r as Disabled,b as Errored,T as ExternallyControlled,I as ItemGroups,d as ItemGroupsWithHeaders,g as ListOverflow,w as OnEscapeKeyDown,p as OnlyItemGroups,x as OverflowingText,c as SimpleSelect,j as Success,m as WithDecorator,o as WithPlaceholder,dl as __namedExportsOrder,Il as default};
