import{j as e,r as ol,F as D}from"./iframe-DPtR_jWT.js";import{c as s}from"./fondue-icons369-CpMV0xNV.js";import{B as nl}from"./Button-DY9NWv_q.js";import{a as ml,b as Sl,c as il,d as ul,e as Il,S as t}from"./Select-CWanf07C.js";import"./preload-helper-BWcRnP3k.js";import"./index-DgWv1K50.js";import"./index-CyD8R4az.js";import"./index-B4uA52Ry.js";import"./index-F_TYzYv_.js";import"./index-yhrf_yX6.js";import"./Combination-DtFff72U.js";import"./LoadingCircle-DbaxLbWI.js";import"./useTranslation-75Hwls0t.js";const Gl={title:"Components/Select",component:Il,subcomponents:{"Select.Combobox":ul,"Select.Slot":il,"Select.Group":Sl,"Select.Item":ml},tags:["autodocs"],parameters:{status:{type:"released"}},args:{"aria-label":"Select an item",placeholder:"Select an item"}},c={name:"Select",render:l=>e.jsxs(t,{...l,children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]})},a={args:{placeholder:"Select an item"},render:l=>e.jsxs(t.Combobox,{...l,children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]})},r={args:{placeholder:"Select an item",getAsyncItems:async l=>{const E=[{value:"test1",label:"Test 1 - Custom Content",content:e.jsxs(D,{gap:4,align:"center",children:[e.jsx("img",{src:"https://flagsapi.com/CH/flat/16.png",alt:"Switzerland"}),e.jsx("p",{children:"Switzerland"})]})},{value:"test2",label:"Test 2",content:e.jsxs(D,{gap:4,align:"center",children:[e.jsx("p",{children:"With a Component"}),e.jsx(s,{size:16})]})},{value:"test3",label:"Test 3",content:e.jsxs(D,{gap:4,align:"center",children:["Test 3",e.jsx(s,{})]})},{value:"aaaa",label:"AAAA"},{value:"bbbb",label:"BBBB"},{value:"cccc",label:"CCCC"}].filter(z=>z.label.toLowerCase().includes(l.toLowerCase()));return await new Promise(z=>setTimeout(z,500)),E}},render:l=>e.jsx(t.Combobox,{...l})},n={args:{disabled:!0},render:l=>e.jsx(t,{...l,children:e.jsxs(t.Slot,{name:"menu",children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]})})},o={args:{placeholder:"Select an item"},render:l=>e.jsx(t,{...l,children:e.jsxs(t.Slot,{name:"menu",children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]})})},m={args:{placeholder:"Select an item"},render:l=>e.jsxs(t,{...l,children:[e.jsx(t.Slot,{name:"left",children:e.jsx(s,{size:16})}),e.jsx(t.Slot,{name:"right",children:e.jsx(s,{size:16})}),e.jsxs(t.Slot,{name:"menu",children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]})]})},S={args:{placeholder:"Select an item"},render:l=>e.jsxs(t,{...l,children:[e.jsx(t.Slot,{name:"right",children:e.jsx(s,{size:16})}),e.jsx(t.Slot,{name:"clear"}),e.jsxs(t.Slot,{name:"menu",children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]})]})},i={args:{placeholder:"Select an item"},render:l=>e.jsxs(t,{...l,children:[e.jsx(t.Slot,{name:"clear",children:e.jsx(nl,{size:"small",emphasis:"strong",onPress:()=>{},children:"Clear"})}),e.jsx(t.Slot,{name:"left",children:e.jsx(s,{size:16})}),e.jsx(t.Slot,{name:"right",children:e.jsx(s,{size:16})}),e.jsxs(t.Slot,{name:"menu",children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]})]})},u={args:{defaultValue:"test1"},render:l=>e.jsx(t,{...l,children:e.jsxs(t.Slot,{name:"menu",children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]})})},I={render:l=>e.jsx(t,{...l,children:e.jsxs(t.Slot,{name:"menu",children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsxs(t.Group,{groupId:"Group 1",children:[e.jsx(t.Item,{value:"test3",children:"Test3"}),e.jsx(t.Item,{value:"test4",children:"Test4"}),e.jsx(t.Item,{value:"test5",children:"Test5"})]}),e.jsx(t.Item,{value:"test6",children:"Test6"})]})})},d={render:l=>e.jsx(t,{...l,children:e.jsxs(t.Slot,{name:"menu",children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsxs(t.Group,{groupId:"Group 1",heading:"Group 1",children:[e.jsx(t.Item,{value:"test3",children:"Test3"}),e.jsx(t.Item,{value:"test4",children:"Test4"}),e.jsx(t.Item,{value:"test5",children:"Test5"})]}),e.jsxs(t.Group,{groupId:"Group 2",heading:"Group 2",children:[e.jsx(t.Item,{value:"test6",children:"Test6"}),e.jsx(t.Item,{value:"test7",children:"Test7"}),e.jsx(t.Item,{value:"test8",children:"Test8"})]}),e.jsx(t.Item,{value:"test9",children:"Test9"})]})})},p={render:l=>e.jsx(t,{...l,children:e.jsxs(t.Slot,{name:"menu",children:[e.jsxs(t.Group,{groupId:"Group 1",children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"})]}),e.jsxs(t.Group,{groupId:"Group 2",children:[e.jsx(t.Item,{value:"test3",children:"Test3"}),e.jsx(t.Item,{value:"test4",children:"Test4"}),e.jsx(t.Item,{value:"test5",children:"Test5"})]})]})})},v={render:l=>e.jsx(t,{...l,children:e.jsxs(t.Slot,{name:"menu",children:[e.jsx(t.Item,{value:"ch",label:"Switzerland",children:e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-4",children:[e.jsx("img",{src:"https://flagsapi.com/CH/flat/16.png",alt:"Switzerland"}),e.jsx("p",{children:"Switzerland"})]})}),e.jsx(t.Item,{value:"icon",label:"Component",children:e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-4",children:[e.jsx("p",{children:"With a Component"}),e.jsx(s,{size:16})]})}),e.jsx(t.Item,{value:"basic",label:"Basic",children:"Basic"})]})})},h={render:l=>e.jsx(t,{...l,showStringValue:!1,children:e.jsxs(t.Slot,{name:"menu",children:[e.jsx(t.Item,{value:"ch",label:"Switzerland",children:e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-4",children:[e.jsx("img",{src:"https://flagsapi.com/CH/flat/16.png",alt:"Switzerland"}),e.jsx("p",{children:"Switzerland"})]})}),e.jsx(t.Item,{value:"icon",label:"Component",children:e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-4",children:[e.jsx("p",{children:"With a Component"}),e.jsx(s,{size:16})]})}),e.jsx(t.Item,{value:"basic",label:"Basic",children:"Basic"})]})})},T={decorators:[l=>e.jsx("div",{className:"tw-flex tw-gap-4",children:e.jsx(l,{})})],render:l=>{const[G,E]=ol.useState();return e.jsxs(e.Fragment,{children:[e.jsx(t,{onSelect:z=>{E(()=>z)},value:G,...l,children:e.jsxs(t.Slot,{name:"menu",children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]})}),e.jsx(nl,{onPress:()=>E("test1"),children:"Set Test1"})]})}},x={args:{placeholder:"Select an item"},render:l=>e.jsxs("div",{style:{display:"flex",gap:8,maxWidth:600},children:[e.jsxs(t,{...l,children:[e.jsx(t.Item,{value:"test1",children:"Test1 - This is a very long text to see how it overflows This is a very long text to see how it overflows This is a very long text to see how it overflows y long text to see how it overflows This is a very long text to see how it overflows This is a very long text to see how it overflows y long text to see how it overflows This is a very long text to see how it overflows This is a very long text to see how it overflows"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]}),e.jsxs(t.Combobox,{...l,children:[e.jsx(t.Item,{value:"test1",children:"Test1 - This is a very long text to see how it overflows"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]}),e.jsxs(t.Combobox,{...l,children:[e.jsx(t.Item,{value:"test1",children:"Test1 - This is a very long text to see how it overflows"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]})]})},g={decorators:[l=>e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:32},children:e.jsx(l,{})})],parameters:{viewport:{viewports:{mobile:{name:"Mobile",styles:{width:"300px",height:"272px"}}},defaultViewport:"mobile"}},render:l=>e.jsxs(e.Fragment,{children:[e.jsxs(t,{...l,children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"}),e.jsx(t.Item,{value:"test4",children:"Test4"}),e.jsx(t.Item,{value:"test5",children:"Test5"}),e.jsx(t.Item,{value:"test6",children:"Test6"}),e.jsx(t.Item,{value:"test7",children:"Test7"})]}),e.jsxs(t,{...l,children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"}),e.jsx(t.Item,{value:"test4",children:"Test4"}),e.jsx(t.Item,{value:"test5",children:"Test5"}),e.jsx(t.Item,{value:"test6",children:"Test6"}),e.jsx(t.Item,{value:"test7",children:"Test7"})]}),e.jsxs(t,{...l,children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"}),e.jsx(t.Item,{value:"test4",children:"Test4"}),e.jsx(t.Item,{value:"test5",children:"Test5"}),e.jsx(t.Item,{value:"test6",children:"Test6"}),e.jsx(t.Item,{value:"test7",children:"Test7"})]}),e.jsxs(t,{...l,children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"}),e.jsx(t.Item,{value:"test4",children:"Test4"}),e.jsx(t.Item,{value:"test5",children:"Test5"}),e.jsx(t.Item,{value:"test6",children:"Test6"}),e.jsx(t.Item,{value:"test7",children:"Test7"})]})]})},b={args:{status:"success"},render:l=>e.jsxs(t,{...l,children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]})},j={args:{status:"error"},render:l=>e.jsxs(t.Combobox,{...l,children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]})},w={args:{placeholder:"Select an item"},render:l=>e.jsxs(t,{...l,onEscapeKeyDown:()=>{alert("Escape key was pressed!")},children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]})},C={args:{placeholder:"Select an item"},render:l=>e.jsxs(t,{...l,onEscapeKeyDown:G=>{G.preventDefault(),alert("Escape key pressed, but select will not close!")},children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]})},f={args:{placeholder:"Select an item"},render:l=>e.jsxs(t.Combobox,{...l,onEscapeKeyDown:()=>{alert("Escape key was pressed!")},children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]})},y={args:{placeholder:"Select an item"},render:l=>e.jsxs(t.Combobox,{...l,onEscapeKeyDown:G=>{G.preventDefault(),alert("Escape key pressed, but combobox will not close!")},children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]})};var B,A,W;c.parameters={...c.parameters,docs:{...(B=c.parameters)==null?void 0:B.docs,source:{code:`const SimpleSelect = () => {
  return (
    <Select aria-label="Select an item" placeholder="Select an item">
      <Select.Item value="test1">Test1</Select.Item>
      <Select.Item value="test2">Test2</Select.Item>
      <Select.Item value="test3">Test3</Select.Item>
    </Select>
  );
};
`,...(W=(A=c.parameters)==null?void 0:A.docs)==null?void 0:W.source}}};var O,F,K;a.parameters={...a.parameters,docs:{...(O=a.parameters)==null?void 0:O.docs,source:{code:`const Combobox = () => {
  return (
    <Select.Combobox aria-label="Select an item" placeholder="Select an item">
      <Select.Item value="test1">Test1</Select.Item>
      <Select.Item value="test2">Test2</Select.Item>
      <Select.Item value="test3">Test3</Select.Item>
    </Select.Combobox>
  );
};
`,...(K=(F=a.parameters)==null?void 0:F.docs)==null?void 0:K.source}}};var P,k,N;r.parameters={...r.parameters,docs:{...(P=r.parameters)==null?void 0:P.docs,source:{code:`const ComboboxWithAsyncItems = () => {
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
`,...(N=(k=r.parameters)==null?void 0:k.docs)==null?void 0:N.source}}};var H,L,V;n.parameters={...n.parameters,docs:{...(H=n.parameters)==null?void 0:H.docs,source:{code:`const Disabled = () => {
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
`,...(V=(L=n.parameters)==null?void 0:L.docs)==null?void 0:V.source}}};var M,_,R;o.parameters={...o.parameters,docs:{...(M=o.parameters)==null?void 0:M.docs,source:{code:`const WithPlaceholder = () => {
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
`,...(R=(_=o.parameters)==null?void 0:_.docs)==null?void 0:R.source}}};var q,J,Q;m.parameters={...m.parameters,docs:{...(q=m.parameters)==null?void 0:q.docs,source:{code:`const WithDecorator = () => {
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
`,...(Q=(J=m.parameters)==null?void 0:J.docs)==null?void 0:Q.source}}};var U,X,Y;S.parameters={...S.parameters,docs:{...(U=S.parameters)==null?void 0:U.docs,source:{code:`const Clearable = () => {
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
`,...(Y=(X=S.parameters)==null?void 0:X.docs)==null?void 0:Y.source}}};var Z,$,ee;i.parameters={...i.parameters,docs:{...(Z=i.parameters)==null?void 0:Z.docs,source:{code:`const CustomClearElement = () => {
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
`,...(ee=($=i.parameters)==null?void 0:$.docs)==null?void 0:ee.source}}};var te,le,se;u.parameters={...u.parameters,docs:{...(te=u.parameters)==null?void 0:te.docs,source:{code:`const DefaultItem = () => {
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
`,...(se=(le=u.parameters)==null?void 0:le.docs)==null?void 0:se.source}}};var ce,ae,re;I.parameters={...I.parameters,docs:{...(ce=I.parameters)==null?void 0:ce.docs,source:{code:`const ItemGroups = () => {
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
`,...(re=(ae=I.parameters)==null?void 0:ae.docs)==null?void 0:re.source}}};var ne,oe,me;d.parameters={...d.parameters,docs:{...(ne=d.parameters)==null?void 0:ne.docs,source:{code:`const ItemGroupsWithHeaders = () => {
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
`,...(me=(oe=d.parameters)==null?void 0:oe.docs)==null?void 0:me.source}}};var Se,ie,ue;p.parameters={...p.parameters,docs:{...(Se=p.parameters)==null?void 0:Se.docs,source:{code:`const OnlyItemGroups = () => {
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
`,...(ue=(ie=p.parameters)==null?void 0:ie.docs)==null?void 0:ue.source}}};var Ie,de,pe;v.parameters={...v.parameters,docs:{...(Ie=v.parameters)==null?void 0:Ie.docs,source:{code:`const CustomItem = () => {
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
`,...(pe=(de=v.parameters)==null?void 0:de.docs)==null?void 0:pe.source}}};var ve,he,Te;h.parameters={...h.parameters,docs:{...(ve=h.parameters)==null?void 0:ve.docs,source:{code:`const CustomItemIncludingSelectField = () => {
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
`,...(Te=(he=h.parameters)==null?void 0:he.docs)==null?void 0:Te.source}}};var xe,ge,be;T.parameters={...T.parameters,docs:{...(xe=T.parameters)==null?void 0:xe.docs,source:{code:`const ExternallyControlled = () => {
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
`,...(be=(ge=T.parameters)==null?void 0:ge.docs)==null?void 0:be.source}}};var je,we,Ce;x.parameters={...x.parameters,docs:{...(je=x.parameters)==null?void 0:je.docs,source:{code:`const OverflowingText = () => {
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
`,...(Ce=(we=x.parameters)==null?void 0:we.docs)==null?void 0:Ce.source}}};var fe,ye,Ge;g.parameters={...g.parameters,docs:{...(fe=g.parameters)==null?void 0:fe.docs,source:{code:`const ListOverflow = () => {
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
`,...(Ge=(ye=g.parameters)==null?void 0:ye.docs)==null?void 0:Ge.source}}};var ze,Ee,De;b.parameters={...b.parameters,docs:{...(ze=b.parameters)==null?void 0:ze.docs,source:{code:`const Success = () => {
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
`,...(De=(Ee=b.parameters)==null?void 0:Ee.docs)==null?void 0:De.source}}};var Be,Ae,We;j.parameters={...j.parameters,docs:{...(Be=j.parameters)==null?void 0:Be.docs,source:{code:`const Errored = () => {
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
`,...(We=(Ae=j.parameters)==null?void 0:Ae.docs)==null?void 0:We.source}}};var Oe,Fe,Ke;w.parameters={...w.parameters,docs:{...(Oe=w.parameters)==null?void 0:Oe.docs,source:{code:`const OnEscapeKeyDown = () => {
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
`,...(Ke=(Fe=w.parameters)==null?void 0:Fe.docs)==null?void 0:Ke.source}}};var Pe,ke,Ne;C.parameters={...C.parameters,docs:{...(Pe=C.parameters)==null?void 0:Pe.docs,source:{code:`const PreventCloseOnEscape = () => {
  return (
    <Select
      aria-label="Select an item"
      placeholder="Select an item"
      onEscapeKeyDown={(event) => {
        event.preventDefault();
        alert("Escape key pressed, but select will not close!");
      }}
    >
      <Select.Item value="test1">Test1</Select.Item>
      <Select.Item value="test2">Test2</Select.Item>
      <Select.Item value="test3">Test3</Select.Item>
    </Select>
  );
};
`,...(Ne=(ke=C.parameters)==null?void 0:ke.docs)==null?void 0:Ne.source}}};var He,Le,Ve;f.parameters={...f.parameters,docs:{...(He=f.parameters)==null?void 0:He.docs,source:{code:`const ComboboxOnEscapeKeyDown = () => {
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
`,...(Ve=(Le=f.parameters)==null?void 0:Le.docs)==null?void 0:Ve.source}}};var Me,_e,Re;y.parameters={...y.parameters,docs:{...(Me=y.parameters)==null?void 0:Me.docs,source:{code:`const ComboboxPreventCloseOnEscape = () => {
  return (
    <Select.Combobox
      aria-label="Select an item"
      placeholder="Select an item"
      onEscapeKeyDown={(event) => {
        event.preventDefault();
        alert("Escape key pressed, but combobox will not close!");
      }}
    >
      <Select.Item value="test1">Test1</Select.Item>
      <Select.Item value="test2">Test2</Select.Item>
      <Select.Item value="test3">Test3</Select.Item>
    </Select.Combobox>
  );
};
`,...(Re=(_e=y.parameters)==null?void 0:_e.docs)==null?void 0:Re.source}}};var qe,Je,Qe;c.parameters={...c.parameters,docs:{...(qe=c.parameters)==null?void 0:qe.docs,source:{originalSource:`{
  name: 'Select',
  render: args => {
    return <Select {...args}>
                <Select.Item value="test1">Test1</Select.Item>
                <Select.Item value="test2">Test2</Select.Item>
                <Select.Item value="test3">Test3</Select.Item>
            </Select>;
  }
}`,...(Qe=(Je=c.parameters)==null?void 0:Je.docs)==null?void 0:Qe.source}}};var Ue,Xe,Ye;a.parameters={...a.parameters,docs:{...(Ue=a.parameters)==null?void 0:Ue.docs,source:{originalSource:`{
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
}`,...(Ye=(Xe=a.parameters)==null?void 0:Xe.docs)==null?void 0:Ye.source}}};var Ze,$e,et;r.parameters={...r.parameters,docs:{...(Ze=r.parameters)==null?void 0:Ze.docs,source:{originalSource:`{
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
}`,...(et=($e=r.parameters)==null?void 0:$e.docs)==null?void 0:et.source}}};var tt,lt,st;n.parameters={...n.parameters,docs:{...(tt=n.parameters)==null?void 0:tt.docs,source:{originalSource:`{
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
}`,...(st=(lt=n.parameters)==null?void 0:lt.docs)==null?void 0:st.source}}};var ct,at,rt;o.parameters={...o.parameters,docs:{...(ct=o.parameters)==null?void 0:ct.docs,source:{originalSource:`{
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
}`,...(rt=(at=o.parameters)==null?void 0:at.docs)==null?void 0:rt.source}}};var nt,ot,mt;m.parameters={...m.parameters,docs:{...(nt=m.parameters)==null?void 0:nt.docs,source:{originalSource:`{
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
}`,...(mt=(ot=m.parameters)==null?void 0:ot.docs)==null?void 0:mt.source}}};var St,it,ut;S.parameters={...S.parameters,docs:{...(St=S.parameters)==null?void 0:St.docs,source:{originalSource:`{
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
}`,...(ut=(it=S.parameters)==null?void 0:it.docs)==null?void 0:ut.source}}};var It,dt,pt;i.parameters={...i.parameters,docs:{...(It=i.parameters)==null?void 0:It.docs,source:{originalSource:`{
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
}`,...(pt=(dt=i.parameters)==null?void 0:dt.docs)==null?void 0:pt.source}}};var vt,ht,Tt;u.parameters={...u.parameters,docs:{...(vt=u.parameters)==null?void 0:vt.docs,source:{originalSource:`{
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
}`,...(Tt=(ht=u.parameters)==null?void 0:ht.docs)==null?void 0:Tt.source}}};var xt,gt,bt;I.parameters={...I.parameters,docs:{...(xt=I.parameters)==null?void 0:xt.docs,source:{originalSource:`{
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
}`,...(bt=(gt=I.parameters)==null?void 0:gt.docs)==null?void 0:bt.source}}};var jt,wt,Ct;d.parameters={...d.parameters,docs:{...(jt=d.parameters)==null?void 0:jt.docs,source:{originalSource:`{
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
}`,...(Ct=(wt=d.parameters)==null?void 0:wt.docs)==null?void 0:Ct.source}}};var ft,yt,Gt;p.parameters={...p.parameters,docs:{...(ft=p.parameters)==null?void 0:ft.docs,source:{originalSource:`{
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
}`,...(Gt=(yt=p.parameters)==null?void 0:yt.docs)==null?void 0:Gt.source}}};var zt,Et,Dt;v.parameters={...v.parameters,docs:{...(zt=v.parameters)==null?void 0:zt.docs,source:{originalSource:`{
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
}`,...(Dt=(Et=v.parameters)==null?void 0:Et.docs)==null?void 0:Dt.source}}};var Bt,At,Wt;h.parameters={...h.parameters,docs:{...(Bt=h.parameters)==null?void 0:Bt.docs,source:{originalSource:`{
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
}`,...(Wt=(At=h.parameters)==null?void 0:At.docs)==null?void 0:Wt.source}}};var Ot,Ft,Kt;T.parameters={...T.parameters,docs:{...(Ot=T.parameters)==null?void 0:Ot.docs,source:{originalSource:`{
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
}`,...(Kt=(Ft=T.parameters)==null?void 0:Ft.docs)==null?void 0:Kt.source}}};var Pt,kt,Nt;x.parameters={...x.parameters,docs:{...(Pt=x.parameters)==null?void 0:Pt.docs,source:{originalSource:`{
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
}`,...(Nt=(kt=x.parameters)==null?void 0:kt.docs)==null?void 0:Nt.source}}};var Ht,Lt,Vt;g.parameters={...g.parameters,docs:{...(Ht=g.parameters)==null?void 0:Ht.docs,source:{originalSource:`{
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
}`,...(Vt=(Lt=g.parameters)==null?void 0:Lt.docs)==null?void 0:Vt.source}}};var Mt,_t,Rt;b.parameters={...b.parameters,docs:{...(Mt=b.parameters)==null?void 0:Mt.docs,source:{originalSource:`{
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
}`,...(Rt=(_t=b.parameters)==null?void 0:_t.docs)==null?void 0:Rt.source}}};var qt,Jt,Qt;j.parameters={...j.parameters,docs:{...(qt=j.parameters)==null?void 0:qt.docs,source:{originalSource:`{
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
}`,...(Qt=(Jt=j.parameters)==null?void 0:Jt.docs)==null?void 0:Qt.source}}};var Ut,Xt,Yt;w.parameters={...w.parameters,docs:{...(Ut=w.parameters)==null?void 0:Ut.docs,source:{originalSource:`{
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
}`,...(Yt=(Xt=w.parameters)==null?void 0:Xt.docs)==null?void 0:Yt.source}}};var Zt,$t,el;C.parameters={...C.parameters,docs:{...(Zt=C.parameters)==null?void 0:Zt.docs,source:{originalSource:`{
  args: {
    placeholder: 'Select an item'
  },
  render: args => {
    return <Select {...args} onEscapeKeyDown={event => {
      event.preventDefault();
      alert('Escape key pressed, but select will not close!');
    }}>
                <Select.Item value="test1">Test1</Select.Item>
                <Select.Item value="test2">Test2</Select.Item>
                <Select.Item value="test3">Test3</Select.Item>
            </Select>;
  }
}`,...(el=($t=C.parameters)==null?void 0:$t.docs)==null?void 0:el.source}}};var tl,ll,sl;f.parameters={...f.parameters,docs:{...(tl=f.parameters)==null?void 0:tl.docs,source:{originalSource:`{
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
}`,...(sl=(ll=f.parameters)==null?void 0:ll.docs)==null?void 0:sl.source}}};var cl,al,rl;y.parameters={...y.parameters,docs:{...(cl=y.parameters)==null?void 0:cl.docs,source:{originalSource:`{
  args: {
    placeholder: 'Select an item'
  },
  render: args => {
    return <Select.Combobox {...args} onEscapeKeyDown={event => {
      event.preventDefault();
      alert('Escape key pressed, but combobox will not close!');
    }}>
                <Select.Item value="test1">Test1</Select.Item>
                <Select.Item value="test2">Test2</Select.Item>
                <Select.Item value="test3">Test3</Select.Item>
            </Select.Combobox>;
  }
}`,...(rl=(al=y.parameters)==null?void 0:al.docs)==null?void 0:rl.source}}};const zl=["SimpleSelect","Combobox","ComboboxWithAsyncItems","Disabled","WithPlaceholder","WithDecorator","Clearable","CustomClearElement","DefaultItem","ItemGroups","ItemGroupsWithHeaders","OnlyItemGroups","CustomItem","CustomItemIncludingSelectField","ExternallyControlled","OverflowingText","ListOverflow","Success","Errored","OnEscapeKeyDown","PreventCloseOnEscape","ComboboxOnEscapeKeyDown","ComboboxPreventCloseOnEscape"];export{S as Clearable,a as Combobox,f as ComboboxOnEscapeKeyDown,y as ComboboxPreventCloseOnEscape,r as ComboboxWithAsyncItems,i as CustomClearElement,v as CustomItem,h as CustomItemIncludingSelectField,u as DefaultItem,n as Disabled,j as Errored,T as ExternallyControlled,I as ItemGroups,d as ItemGroupsWithHeaders,g as ListOverflow,w as OnEscapeKeyDown,p as OnlyItemGroups,x as OverflowingText,C as PreventCloseOnEscape,c as SimpleSelect,b as Success,m as WithDecorator,o as WithPlaceholder,zl as __namedExportsOrder,Gl as default};
