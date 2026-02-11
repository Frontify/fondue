import{j as e,r as nl,F as E}from"./iframe-BQKSbjTt.js";import{c as s}from"./fondue-icons372-d-VvLRxV.js";import{B as ol}from"./Button-C2xQhFFE.js";import{a as ml,b as Sl,c as il,C as ul,d as Il,e as dl,f as pl,S as t}from"./index-v12vZtwH.js";import"./preload-helper-dp6Dx4rL.js";import"./index-DF0IITlz.js";import"./index-CdqUc-5O.js";import"./index-CAf_aFS4.js";import"./index-B3Qmw4cD.js";import"./index-Dm3QqkdM.js";import"./Combination-UKc7Kpqw.js";import"./LoadingCircle-VY-AUTtu.js";import"./useTranslation-BR-vij_v.js";import"./Badge-CXeOMr-W.js";const El={title:"Components/Select",component:pl,subcomponents:{"Select.Multiple":dl,"Select.Combobox":Il,"Select.Combobox.Multiple":ul,"Select.Slot":il,"Select.Group":Sl,"Select.Item":ml},tags:["autodocs"],parameters:{status:{type:"released"}},args:{"aria-label":"Select an item",placeholder:"Select an item"}},c={name:"Select",render:l=>e.jsxs(t,{...l,children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]})},a={name:"Select Multiple",render:l=>e.jsxs(t.Multiple,{...l,children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]})},r={args:{placeholder:"Select an item"},render:l=>e.jsxs(t.Combobox,{...l,children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]})},n={name:"Combobox Multiple",render:()=>{const[l,B]=nl.useState([]),z=G=>{B(G??[])};return e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:16},children:e.jsxs(t.Combobox.Multiple,{placeholder:"Search and select items",value:l,onSelect:z,children:[e.jsx(t.Item,{value:"apple",children:"Apple"}),e.jsx(t.Item,{value:"banana",children:"Banana"}),e.jsx(t.Item,{value:"cherry",children:"Cherry"}),e.jsx(t.Item,{value:"date",children:"Date"}),e.jsx(t.Item,{value:"elderberry",children:"Elderberry"}),e.jsx(t.Item,{value:"fig",children:"Fig"}),e.jsx(t.Item,{value:"grape",children:"Grape"})]})})}},o={args:{placeholder:"Select an item",getAsyncItems:async l=>{const z=[{value:"test1",label:"Test 1 - Custom Content",content:e.jsxs(E,{gap:4,align:"center",children:[e.jsx("img",{src:"https://flagsapi.com/CH/flat/16.png",alt:"Switzerland"}),e.jsx("p",{children:"Switzerland"})]})},{value:"test2",label:"Test 2",content:e.jsxs(E,{gap:4,align:"center",children:[e.jsx("p",{children:"With a Component"}),e.jsx(s,{size:16})]})},{value:"test3",label:"Test 3",content:e.jsxs(E,{gap:4,align:"center",children:["Test 3",e.jsx(s,{})]})},{value:"aaaa",label:"AAAA"},{value:"bbbb",label:"BBBB"},{value:"cccc",label:"CCCC"}].filter(G=>G.label.toLowerCase().includes(l.toLowerCase()));return await new Promise(G=>setTimeout(G,500)),z}},render:l=>e.jsx(t.Combobox,{...l})},m={args:{disabled:!0},render:l=>e.jsx(t,{...l,children:e.jsxs(t.Slot,{name:"menu",children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]})})},S={args:{placeholder:"Select an item"},render:l=>e.jsx(t,{...l,children:e.jsxs(t.Slot,{name:"menu",children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]})})},i={args:{placeholder:"Select an item"},render:l=>e.jsxs(t,{...l,children:[e.jsx(t.Slot,{name:"left",children:e.jsx(s,{size:16})}),e.jsx(t.Slot,{name:"right",children:e.jsx(s,{size:16})}),e.jsxs(t.Slot,{name:"menu",children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]})]})},u={args:{placeholder:"Select an item"},render:l=>e.jsxs(t,{...l,children:[e.jsx(t.Slot,{name:"right",children:e.jsx(s,{size:16})}),e.jsx(t.Slot,{name:"clear"}),e.jsxs(t.Slot,{name:"menu",children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]})]})},I={args:{placeholder:"Select an item"},render:l=>e.jsxs(t,{...l,children:[e.jsx(t.Slot,{name:"clear",children:e.jsx(ol,{size:"small",emphasis:"strong",onPress:()=>{},children:"Clear"})}),e.jsx(t.Slot,{name:"left",children:e.jsx(s,{size:16})}),e.jsx(t.Slot,{name:"right",children:e.jsx(s,{size:16})}),e.jsxs(t.Slot,{name:"menu",children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]})]})},d={args:{defaultValue:"test1"},render:l=>e.jsx(t,{...l,children:e.jsxs(t.Slot,{name:"menu",children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]})})},p={render:l=>e.jsx(t,{...l,children:e.jsxs(t.Slot,{name:"menu",children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsxs(t.Group,{groupId:"Group 1",children:[e.jsx(t.Item,{value:"test3",children:"Test3"}),e.jsx(t.Item,{value:"test4",children:"Test4"}),e.jsx(t.Item,{value:"test5",children:"Test5"})]}),e.jsx(t.Item,{value:"test6",children:"Test6"})]})})},v={render:l=>e.jsx(t,{...l,children:e.jsxs(t.Slot,{name:"menu",children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsxs(t.Group,{groupId:"Group 1",heading:"Group 1",children:[e.jsx(t.Item,{value:"test3",children:"Test3"}),e.jsx(t.Item,{value:"test4",children:"Test4"}),e.jsx(t.Item,{value:"test5",children:"Test5"})]}),e.jsxs(t.Group,{groupId:"Group 2",heading:"Group 2",children:[e.jsx(t.Item,{value:"test6",children:"Test6"}),e.jsx(t.Item,{value:"test7",children:"Test7"}),e.jsx(t.Item,{value:"test8",children:"Test8"})]}),e.jsx(t.Item,{value:"test9",children:"Test9"})]})})},h={render:l=>e.jsx(t,{...l,children:e.jsxs(t.Slot,{name:"menu",children:[e.jsxs(t.Group,{groupId:"Group 1",children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"})]}),e.jsxs(t.Group,{groupId:"Group 2",children:[e.jsx(t.Item,{value:"test3",children:"Test3"}),e.jsx(t.Item,{value:"test4",children:"Test4"}),e.jsx(t.Item,{value:"test5",children:"Test5"})]})]})})},T={render:l=>e.jsx(t,{...l,children:e.jsxs(t.Slot,{name:"menu",children:[e.jsx(t.Item,{value:"ch",label:"Switzerland",children:e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-4",children:[e.jsx("img",{src:"https://flagsapi.com/CH/flat/16.png",alt:"Switzerland"}),e.jsx("p",{children:"Switzerland"})]})}),e.jsx(t.Item,{value:"icon",label:"Component",children:e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-4",children:[e.jsx("p",{children:"With a Component"}),e.jsx(s,{size:16})]})}),e.jsx(t.Item,{value:"basic",label:"Basic",children:"Basic"})]})})},x={render:l=>e.jsx(t,{...l,showStringValue:!1,children:e.jsxs(t.Slot,{name:"menu",children:[e.jsx(t.Item,{value:"ch",label:"Switzerland",children:e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-4",children:[e.jsx("img",{src:"https://flagsapi.com/CH/flat/16.png",alt:"Switzerland"}),e.jsx("p",{children:"Switzerland"})]})}),e.jsx(t.Item,{value:"icon",label:"Component",children:e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-4",children:[e.jsx("p",{children:"With a Component"}),e.jsx(s,{size:16})]})}),e.jsx(t.Item,{value:"basic",label:"Basic",children:"Basic"})]})})},g={decorators:[l=>e.jsx("div",{className:"tw-flex tw-gap-4",children:e.jsx(l,{})})],render:l=>{const[B,z]=nl.useState();return e.jsxs(e.Fragment,{children:[e.jsx(t,{onSelect:G=>{z(()=>G)},value:B,...l,children:e.jsxs(t.Slot,{name:"menu",children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]})}),e.jsx(ol,{onPress:()=>z("test1"),children:"Set Test1"})]})}},b={args:{placeholder:"Select an item"},render:l=>e.jsxs("div",{style:{display:"flex",gap:8,maxWidth:600},children:[e.jsxs(t,{...l,children:[e.jsx(t.Item,{value:"test1",children:"Test1 - This is a very long text to see how it overflows This is a very long text to see how it overflows This is a very long text to see how it overflows y long text to see how it overflows This is a very long text to see how it overflows This is a very long text to see how it overflows y long text to see how it overflows This is a very long text to see how it overflows This is a very long text to see how it overflows"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]}),e.jsxs(t.Combobox,{...l,children:[e.jsx(t.Item,{value:"test1",children:"Test1 - This is a very long text to see how it overflows"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]}),e.jsxs(t.Combobox,{...l,children:[e.jsx(t.Item,{value:"test1",children:"Test1 - This is a very long text to see how it overflows"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]})]})},j={decorators:[l=>e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:32},children:e.jsx(l,{})})],parameters:{viewport:{viewports:{mobile:{name:"Mobile",styles:{width:"300px",height:"272px"}}},defaultViewport:"mobile"}},render:l=>e.jsxs(e.Fragment,{children:[e.jsxs(t,{...l,children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"}),e.jsx(t.Item,{value:"test4",children:"Test4"}),e.jsx(t.Item,{value:"test5",children:"Test5"}),e.jsx(t.Item,{value:"test6",children:"Test6"}),e.jsx(t.Item,{value:"test7",children:"Test7"})]}),e.jsxs(t,{...l,children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"}),e.jsx(t.Item,{value:"test4",children:"Test4"}),e.jsx(t.Item,{value:"test5",children:"Test5"}),e.jsx(t.Item,{value:"test6",children:"Test6"}),e.jsx(t.Item,{value:"test7",children:"Test7"})]}),e.jsxs(t,{...l,children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"}),e.jsx(t.Item,{value:"test4",children:"Test4"}),e.jsx(t.Item,{value:"test5",children:"Test5"}),e.jsx(t.Item,{value:"test6",children:"Test6"}),e.jsx(t.Item,{value:"test7",children:"Test7"})]}),e.jsxs(t,{...l,children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"}),e.jsx(t.Item,{value:"test4",children:"Test4"}),e.jsx(t.Item,{value:"test5",children:"Test5"}),e.jsx(t.Item,{value:"test6",children:"Test6"}),e.jsx(t.Item,{value:"test7",children:"Test7"})]})]})},w={args:{status:"success"},render:l=>e.jsxs(t,{...l,children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]})},C={args:{status:"error"},render:l=>e.jsxs(t.Combobox,{...l,children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]})},f={args:{placeholder:"Select an item"},render:l=>e.jsxs(t,{...l,onEscapeKeyDown:()=>{alert("Escape key was pressed!")},children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]})},y={args:{placeholder:"Select an item"},render:l=>e.jsxs(t.Combobox,{...l,onEscapeKeyDown:()=>{alert("Escape key was pressed!")},children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]})};var D,A,M;c.parameters={...c.parameters,docs:{...(D=c.parameters)==null?void 0:D.docs,source:{code:`const SimpleSelect = () => {
  return (
    <Select aria-label="Select an item" placeholder="Select an item">
      <Select.Item value="test1">Test1</Select.Item>
      <Select.Item value="test2">Test2</Select.Item>
      <Select.Item value="test3">Test3</Select.Item>
    </Select>
  );
};
`,...(M=(A=c.parameters)==null?void 0:A.docs)==null?void 0:M.source}}};var W,F,V;a.parameters={...a.parameters,docs:{...(W=a.parameters)==null?void 0:W.docs,source:{code:`const MultipleSelect = () => {
  return (
    <Select.Multiple aria-label="Select an item" placeholder="Select an item">
      <Select.Item value="test1">Test1</Select.Item>
      <Select.Item value="test2">Test2</Select.Item>
      <Select.Item value="test3">Test3</Select.Item>
    </Select.Multiple>
  );
};
`,...(V=(F=a.parameters)==null?void 0:F.docs)==null?void 0:V.source}}};var O,N,H;r.parameters={...r.parameters,docs:{...(O=r.parameters)==null?void 0:O.docs,source:{code:`const Combobox = () => {
  return (
    <Select.Combobox aria-label="Select an item" placeholder="Select an item">
      <Select.Item value="test1">Test1</Select.Item>
      <Select.Item value="test2">Test2</Select.Item>
      <Select.Item value="test3">Test3</Select.Item>
    </Select.Combobox>
  );
};
`,...(H=(N=r.parameters)==null?void 0:N.docs)==null?void 0:H.source}}};var K,P,L;n.parameters={...n.parameters,docs:{...(K=n.parameters)==null?void 0:K.docs,source:{code:`const MultipleCombobox = () => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleSelect = (values: string[] | null): void => {
    setSelectedValues(values ?? []);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Select.Combobox.Multiple
        placeholder="Search and select items"
        value={selectedValues}
        onSelect={handleSelect}
      >
        <Select.Item value="apple">Apple</Select.Item>
        <Select.Item value="banana">Banana</Select.Item>
        <Select.Item value="cherry">Cherry</Select.Item>
        <Select.Item value="date">Date</Select.Item>
        <Select.Item value="elderberry">Elderberry</Select.Item>
        <Select.Item value="fig">Fig</Select.Item>
        <Select.Item value="grape">Grape</Select.Item>
      </Select.Combobox.Multiple>
    </div>
  );
};
`,...(L=(P=n.parameters)==null?void 0:P.docs)==null?void 0:L.source}}};var k,_,R;o.parameters={...o.parameters,docs:{...(k=o.parameters)==null?void 0:k.docs,source:{code:`const ComboboxWithAsyncItems = () => {
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
`,...(R=(_=o.parameters)==null?void 0:_.docs)==null?void 0:R.source}}};var q,J,Q;m.parameters={...m.parameters,docs:{...(q=m.parameters)==null?void 0:q.docs,source:{code:`const Disabled = () => {
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
`,...(Q=(J=m.parameters)==null?void 0:J.docs)==null?void 0:Q.source}}};var U,X,Y;S.parameters={...S.parameters,docs:{...(U=S.parameters)==null?void 0:U.docs,source:{code:`const WithPlaceholder = () => {
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
`,...(Y=(X=S.parameters)==null?void 0:X.docs)==null?void 0:Y.source}}};var Z,$,ee;i.parameters={...i.parameters,docs:{...(Z=i.parameters)==null?void 0:Z.docs,source:{code:`const WithDecorator = () => {
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
`,...(ee=($=i.parameters)==null?void 0:$.docs)==null?void 0:ee.source}}};var te,le,se;u.parameters={...u.parameters,docs:{...(te=u.parameters)==null?void 0:te.docs,source:{code:`const Clearable = () => {
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
`,...(se=(le=u.parameters)==null?void 0:le.docs)==null?void 0:se.source}}};var ce,ae,re;I.parameters={...I.parameters,docs:{...(ce=I.parameters)==null?void 0:ce.docs,source:{code:`const CustomClearElement = () => {
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
`,...(re=(ae=I.parameters)==null?void 0:ae.docs)==null?void 0:re.source}}};var ne,oe,me;d.parameters={...d.parameters,docs:{...(ne=d.parameters)==null?void 0:ne.docs,source:{code:`const DefaultItem = () => {
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
`,...(me=(oe=d.parameters)==null?void 0:oe.docs)==null?void 0:me.source}}};var Se,ie,ue;p.parameters={...p.parameters,docs:{...(Se=p.parameters)==null?void 0:Se.docs,source:{code:`const ItemGroups = () => {
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
`,...(ue=(ie=p.parameters)==null?void 0:ie.docs)==null?void 0:ue.source}}};var Ie,de,pe;v.parameters={...v.parameters,docs:{...(Ie=v.parameters)==null?void 0:Ie.docs,source:{code:`const ItemGroupsWithHeaders = () => {
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
`,...(pe=(de=v.parameters)==null?void 0:de.docs)==null?void 0:pe.source}}};var ve,he,Te;h.parameters={...h.parameters,docs:{...(ve=h.parameters)==null?void 0:ve.docs,source:{code:`const OnlyItemGroups = () => {
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
`,...(Te=(he=h.parameters)==null?void 0:he.docs)==null?void 0:Te.source}}};var xe,ge,be;T.parameters={...T.parameters,docs:{...(xe=T.parameters)==null?void 0:xe.docs,source:{code:`const CustomItem = () => {
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
`,...(be=(ge=T.parameters)==null?void 0:ge.docs)==null?void 0:be.source}}};var je,we,Ce;x.parameters={...x.parameters,docs:{...(je=x.parameters)==null?void 0:je.docs,source:{code:`const CustomItemIncludingSelectField = () => {
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
`,...(Ce=(we=x.parameters)==null?void 0:we.docs)==null?void 0:Ce.source}}};var fe,ye,Ge;g.parameters={...g.parameters,docs:{...(fe=g.parameters)==null?void 0:fe.docs,source:{code:`const ExternallyControlled = () => {
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
`,...(Ge=(ye=g.parameters)==null?void 0:ye.docs)==null?void 0:Ge.source}}};var ze,Be,Ee;b.parameters={...b.parameters,docs:{...(ze=b.parameters)==null?void 0:ze.docs,source:{code:`const OverflowingText = () => {
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
`,...(Ee=(Be=b.parameters)==null?void 0:Be.docs)==null?void 0:Ee.source}}};var De,Ae,Me;j.parameters={...j.parameters,docs:{...(De=j.parameters)==null?void 0:De.docs,source:{code:`const ListOverflow = () => {
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
`,...(Me=(Ae=j.parameters)==null?void 0:Ae.docs)==null?void 0:Me.source}}};var We,Fe,Ve;w.parameters={...w.parameters,docs:{...(We=w.parameters)==null?void 0:We.docs,source:{code:`const Success = () => {
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
`,...(Ve=(Fe=w.parameters)==null?void 0:Fe.docs)==null?void 0:Ve.source}}};var Oe,Ne,He;C.parameters={...C.parameters,docs:{...(Oe=C.parameters)==null?void 0:Oe.docs,source:{code:`const Errored = () => {
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
`,...(He=(Ne=C.parameters)==null?void 0:Ne.docs)==null?void 0:He.source}}};var Ke,Pe,Le;f.parameters={...f.parameters,docs:{...(Ke=f.parameters)==null?void 0:Ke.docs,source:{code:`const OnEscapeKeyDown = () => {
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
`,...(Le=(Pe=f.parameters)==null?void 0:Pe.docs)==null?void 0:Le.source}}};var ke,_e,Re;y.parameters={...y.parameters,docs:{...(ke=y.parameters)==null?void 0:ke.docs,source:{code:`const ComboboxOnEscapeKeyDown = () => {
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
  name: 'Select Multiple',
  render: args => {
    return <Select.Multiple {...args}>
                <Select.Item value="test1">Test1</Select.Item>
                <Select.Item value="test2">Test2</Select.Item>
                <Select.Item value="test3">Test3</Select.Item>
            </Select.Multiple>;
  }
}`,...(Ye=(Xe=a.parameters)==null?void 0:Xe.docs)==null?void 0:Ye.source}}};var Ze,$e,et;r.parameters={...r.parameters,docs:{...(Ze=r.parameters)==null?void 0:Ze.docs,source:{originalSource:`{
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
}`,...(et=($e=r.parameters)==null?void 0:$e.docs)==null?void 0:et.source}}};var tt,lt,st;n.parameters={...n.parameters,docs:{...(tt=n.parameters)==null?void 0:tt.docs,source:{originalSource:`{
  name: 'Combobox Multiple',
  render: () => {
    const [selectedValues, setSelectedValues] = useState<string[]>([]);
    const handleSelect = (values: string[] | null): void => {
      setSelectedValues(values ?? []);
    };
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }}>
                <Select.Combobox.Multiple placeholder="Search and select items" value={selectedValues} onSelect={handleSelect}>
                    <Select.Item value="apple">Apple</Select.Item>
                    <Select.Item value="banana">Banana</Select.Item>
                    <Select.Item value="cherry">Cherry</Select.Item>
                    <Select.Item value="date">Date</Select.Item>
                    <Select.Item value="elderberry">Elderberry</Select.Item>
                    <Select.Item value="fig">Fig</Select.Item>
                    <Select.Item value="grape">Grape</Select.Item>
                </Select.Combobox.Multiple>
            </div>;
  }
}`,...(st=(lt=n.parameters)==null?void 0:lt.docs)==null?void 0:st.source}}};var ct,at,rt;o.parameters={...o.parameters,docs:{...(ct=o.parameters)==null?void 0:ct.docs,source:{originalSource:`{
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
}`,...(rt=(at=o.parameters)==null?void 0:at.docs)==null?void 0:rt.source}}};var nt,ot,mt;m.parameters={...m.parameters,docs:{...(nt=m.parameters)==null?void 0:nt.docs,source:{originalSource:`{
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
}`,...(mt=(ot=m.parameters)==null?void 0:ot.docs)==null?void 0:mt.source}}};var St,it,ut;S.parameters={...S.parameters,docs:{...(St=S.parameters)==null?void 0:St.docs,source:{originalSource:`{
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
}`,...(ut=(it=S.parameters)==null?void 0:it.docs)==null?void 0:ut.source}}};var It,dt,pt;i.parameters={...i.parameters,docs:{...(It=i.parameters)==null?void 0:It.docs,source:{originalSource:`{
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
}`,...(pt=(dt=i.parameters)==null?void 0:dt.docs)==null?void 0:pt.source}}};var vt,ht,Tt;u.parameters={...u.parameters,docs:{...(vt=u.parameters)==null?void 0:vt.docs,source:{originalSource:`{
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
}`,...(Tt=(ht=u.parameters)==null?void 0:ht.docs)==null?void 0:Tt.source}}};var xt,gt,bt;I.parameters={...I.parameters,docs:{...(xt=I.parameters)==null?void 0:xt.docs,source:{originalSource:`{
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
}`,...(bt=(gt=I.parameters)==null?void 0:gt.docs)==null?void 0:bt.source}}};var jt,wt,Ct;d.parameters={...d.parameters,docs:{...(jt=d.parameters)==null?void 0:jt.docs,source:{originalSource:`{
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
}`,...(Ct=(wt=d.parameters)==null?void 0:wt.docs)==null?void 0:Ct.source}}};var ft,yt,Gt;p.parameters={...p.parameters,docs:{...(ft=p.parameters)==null?void 0:ft.docs,source:{originalSource:`{
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
}`,...(Gt=(yt=p.parameters)==null?void 0:yt.docs)==null?void 0:Gt.source}}};var zt,Bt,Et;v.parameters={...v.parameters,docs:{...(zt=v.parameters)==null?void 0:zt.docs,source:{originalSource:`{
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
}`,...(Et=(Bt=v.parameters)==null?void 0:Bt.docs)==null?void 0:Et.source}}};var Dt,At,Mt;h.parameters={...h.parameters,docs:{...(Dt=h.parameters)==null?void 0:Dt.docs,source:{originalSource:`{
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
}`,...(Mt=(At=h.parameters)==null?void 0:At.docs)==null?void 0:Mt.source}}};var Wt,Ft,Vt;T.parameters={...T.parameters,docs:{...(Wt=T.parameters)==null?void 0:Wt.docs,source:{originalSource:`{
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
}`,...(Vt=(Ft=T.parameters)==null?void 0:Ft.docs)==null?void 0:Vt.source}}};var Ot,Nt,Ht;x.parameters={...x.parameters,docs:{...(Ot=x.parameters)==null?void 0:Ot.docs,source:{originalSource:`{
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
}`,...(Ht=(Nt=x.parameters)==null?void 0:Nt.docs)==null?void 0:Ht.source}}};var Kt,Pt,Lt;g.parameters={...g.parameters,docs:{...(Kt=g.parameters)==null?void 0:Kt.docs,source:{originalSource:`{
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
}`,...(Lt=(Pt=g.parameters)==null?void 0:Pt.docs)==null?void 0:Lt.source}}};var kt,_t,Rt;b.parameters={...b.parameters,docs:{...(kt=b.parameters)==null?void 0:kt.docs,source:{originalSource:`{
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
}`,...(Rt=(_t=b.parameters)==null?void 0:_t.docs)==null?void 0:Rt.source}}};var qt,Jt,Qt;j.parameters={...j.parameters,docs:{...(qt=j.parameters)==null?void 0:qt.docs,source:{originalSource:`{
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
}`,...(Qt=(Jt=j.parameters)==null?void 0:Jt.docs)==null?void 0:Qt.source}}};var Ut,Xt,Yt;w.parameters={...w.parameters,docs:{...(Ut=w.parameters)==null?void 0:Ut.docs,source:{originalSource:`{
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
}`,...(Yt=(Xt=w.parameters)==null?void 0:Xt.docs)==null?void 0:Yt.source}}};var Zt,$t,el;C.parameters={...C.parameters,docs:{...(Zt=C.parameters)==null?void 0:Zt.docs,source:{originalSource:`{
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
}`,...(el=($t=C.parameters)==null?void 0:$t.docs)==null?void 0:el.source}}};var tl,ll,sl;f.parameters={...f.parameters,docs:{...(tl=f.parameters)==null?void 0:tl.docs,source:{originalSource:`{
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
}`,...(sl=(ll=f.parameters)==null?void 0:ll.docs)==null?void 0:sl.source}}};var cl,al,rl;y.parameters={...y.parameters,docs:{...(cl=y.parameters)==null?void 0:cl.docs,source:{originalSource:`{
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
}`,...(rl=(al=y.parameters)==null?void 0:al.docs)==null?void 0:rl.source}}};const Dl=["SimpleSelect","MultipleSelect","Combobox","MultipleCombobox","ComboboxWithAsyncItems","Disabled","WithPlaceholder","WithDecorator","Clearable","CustomClearElement","DefaultItem","ItemGroups","ItemGroupsWithHeaders","OnlyItemGroups","CustomItem","CustomItemIncludingSelectField","ExternallyControlled","OverflowingText","ListOverflow","Success","Errored","OnEscapeKeyDown","ComboboxOnEscapeKeyDown"];export{u as Clearable,r as Combobox,y as ComboboxOnEscapeKeyDown,o as ComboboxWithAsyncItems,I as CustomClearElement,T as CustomItem,x as CustomItemIncludingSelectField,d as DefaultItem,m as Disabled,C as Errored,g as ExternallyControlled,p as ItemGroups,v as ItemGroupsWithHeaders,j as ListOverflow,n as MultipleCombobox,a as MultipleSelect,f as OnEscapeKeyDown,h as OnlyItemGroups,b as OverflowingText,c as SimpleSelect,w as Success,i as WithDecorator,S as WithPlaceholder,Dl as __namedExportsOrder,El as default};
