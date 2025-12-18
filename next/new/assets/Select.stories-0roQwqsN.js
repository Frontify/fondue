import{j as e,r as Et,F as C}from"./iframe-BxhwzE3V.js";import{c as s}from"./fondue-icons369-BObKBCRc.js";import{B as Nt}from"./Button-C8LjZTRE.js";import{a as Ht,b as Pt,c as Dt,d as Ot,e as Lt,S as t}from"./Select-m3Ufn4DZ.js";import"./preload-helper-mNEUNaaY.js";import"./index-B6GavWOE.js";import"./index-BhZpd4YR.js";import"./index-2_YSeu5Y.js";import"./index-Cnyf2lUn.js";import"./index-C-utw5jm.js";import"./index-Vg3YS3uy.js";import"./index-Bp_I19rh.js";import"./component-CfdnzIb9.js";import"./LoadingCircle-DTQBLbqt.js";import"./useTranslation-DgOFz4xb.js";const tl={title:"Components/Select",component:Lt,subcomponents:{"Select.Combobox":Ot,"Select.Slot":Dt,"Select.Group":Pt,"Select.Item":Ht},tags:["autodocs"],parameters:{status:{type:"released"}},args:{"aria-label":"Select an item",placeholder:"Select an item"}},c={name:"Select",render:l=>e.jsxs(t,{...l,children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]})},a={args:{placeholder:"Select an item"},render:l=>e.jsxs(t.Combobox,{...l,children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]})},n={args:{placeholder:"Select an item",getAsyncItems:async l=>{const f=[{value:"test1",label:"Test 1 - Custom Content",content:e.jsxs(C,{gap:4,align:"center",children:[e.jsx("img",{src:"https://flagsapi.com/CH/flat/16.png",alt:"Switzerland"}),e.jsx("p",{children:"Switzerland"})]})},{value:"test2",label:"Test 2",content:e.jsxs(C,{gap:4,align:"center",children:[e.jsx("p",{children:"With a Component"}),e.jsx(s,{size:16})]})},{value:"test3",label:"Test 3",content:e.jsxs(C,{gap:4,align:"center",children:["Test 3",e.jsx(s,{})]})},{value:"aaaa",label:"AAAA"},{value:"bbbb",label:"BBBB"},{value:"cccc",label:"CCCC"}].filter(w=>w.label.toLowerCase().includes(l.toLowerCase()));return await new Promise(w=>setTimeout(w,500)),f}},render:l=>e.jsx(t.Combobox,{...l})},r={args:{disabled:!0},render:l=>e.jsx(t,{...l,children:e.jsxs(t.Slot,{name:"menu",children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]})})},m={args:{placeholder:"Select an item"},render:l=>e.jsx(t,{...l,children:e.jsxs(t.Slot,{name:"menu",children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]})})},o={args:{placeholder:"Select an item"},render:l=>e.jsxs(t,{...l,children:[e.jsx(t.Slot,{name:"left",children:e.jsx(s,{size:16})}),e.jsx(t.Slot,{name:"right",children:e.jsx(s,{size:16})}),e.jsxs(t.Slot,{name:"menu",children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]})]})},S={args:{placeholder:"Select an item"},render:l=>e.jsxs(t,{...l,children:[e.jsx(t.Slot,{name:"right",children:e.jsx(s,{size:16})}),e.jsx(t.Slot,{name:"clear"}),e.jsxs(t.Slot,{name:"menu",children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]})]})},i={args:{placeholder:"Select an item"},render:l=>e.jsxs(t,{...l,children:[e.jsx(t.Slot,{name:"clear",children:e.jsx(Nt,{size:"small",emphasis:"strong",onPress:()=>{},children:"Clear"})}),e.jsx(t.Slot,{name:"left",children:e.jsx(s,{size:16})}),e.jsx(t.Slot,{name:"right",children:e.jsx(s,{size:16})}),e.jsxs(t.Slot,{name:"menu",children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]})]})},u={args:{defaultValue:"test1"},render:l=>e.jsx(t,{...l,children:e.jsxs(t.Slot,{name:"menu",children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]})})},I={render:l=>e.jsx(t,{...l,children:e.jsxs(t.Slot,{name:"menu",children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsxs(t.Group,{groupId:"Group 1",children:[e.jsx(t.Item,{value:"test3",children:"Test3"}),e.jsx(t.Item,{value:"test4",children:"Test4"}),e.jsx(t.Item,{value:"test5",children:"Test5"})]}),e.jsx(t.Item,{value:"test6",children:"Test6"})]})})},d={render:l=>e.jsx(t,{...l,children:e.jsxs(t.Slot,{name:"menu",children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsxs(t.Group,{groupId:"Group 1",heading:"Group 1",children:[e.jsx(t.Item,{value:"test3",children:"Test3"}),e.jsx(t.Item,{value:"test4",children:"Test4"}),e.jsx(t.Item,{value:"test5",children:"Test5"})]}),e.jsxs(t.Group,{groupId:"Group 2",heading:"Group 2",children:[e.jsx(t.Item,{value:"test6",children:"Test6"}),e.jsx(t.Item,{value:"test7",children:"Test7"}),e.jsx(t.Item,{value:"test8",children:"Test8"})]}),e.jsx(t.Item,{value:"test9",children:"Test9"})]})})},v={render:l=>e.jsx(t,{...l,children:e.jsxs(t.Slot,{name:"menu",children:[e.jsxs(t.Group,{groupId:"Group 1",children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"})]}),e.jsxs(t.Group,{groupId:"Group 2",children:[e.jsx(t.Item,{value:"test3",children:"Test3"}),e.jsx(t.Item,{value:"test4",children:"Test4"}),e.jsx(t.Item,{value:"test5",children:"Test5"})]})]})})},p={render:l=>e.jsx(t,{...l,children:e.jsxs(t.Slot,{name:"menu",children:[e.jsx(t.Item,{value:"ch",label:"Switzerland",children:e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-4",children:[e.jsx("img",{src:"https://flagsapi.com/CH/flat/16.png",alt:"Switzerland"}),e.jsx("p",{children:"Switzerland"})]})}),e.jsx(t.Item,{value:"icon",label:"Component",children:e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-4",children:[e.jsx("p",{children:"With a Component"}),e.jsx(s,{size:16})]})}),e.jsx(t.Item,{value:"basic",label:"Basic",children:"Basic"})]})})},h={render:l=>e.jsx(t,{...l,showStringValue:!1,children:e.jsxs(t.Slot,{name:"menu",children:[e.jsx(t.Item,{value:"ch",label:"Switzerland",children:e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-4",children:[e.jsx("img",{src:"https://flagsapi.com/CH/flat/16.png",alt:"Switzerland"}),e.jsx("p",{children:"Switzerland"})]})}),e.jsx(t.Item,{value:"icon",label:"Component",children:e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-4",children:[e.jsx("p",{children:"With a Component"}),e.jsx(s,{size:16})]})}),e.jsx(t.Item,{value:"basic",label:"Basic",children:"Basic"})]})})},T={decorators:[l=>e.jsx("div",{className:"tw-flex tw-gap-4",children:e.jsx(l,{})})],render:l=>{const[y,f]=Et.useState();return e.jsxs(e.Fragment,{children:[e.jsx(t,{onSelect:w=>{f(()=>w)},value:y,...l,children:e.jsxs(t.Slot,{name:"menu",children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]})}),e.jsx(Nt,{onPress:()=>f("test1"),children:"Set Test1"})]})}},x={args:{placeholder:"Select an item"},render:l=>e.jsxs("div",{style:{display:"flex",gap:8,maxWidth:600},children:[e.jsxs(t,{...l,children:[e.jsx(t.Item,{value:"test1",children:"Test1 - This is a very long text to see how it overflows This is a very long text to see how it overflows This is a very long text to see how it overflows y long text to see how it overflows This is a very long text to see how it overflows This is a very long text to see how it overflows y long text to see how it overflows This is a very long text to see how it overflows This is a very long text to see how it overflows"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]}),e.jsxs(t.Combobox,{...l,children:[e.jsx(t.Item,{value:"test1",children:"Test1 - This is a very long text to see how it overflows"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]}),e.jsxs(t.Combobox,{...l,children:[e.jsx(t.Item,{value:"test1",children:"Test1 - This is a very long text to see how it overflows"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]})]})},g={decorators:[l=>e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:32},children:e.jsx(l,{})})],parameters:{viewport:{viewports:{mobile:{name:"Mobile",styles:{width:"300px",height:"272px"}}},defaultViewport:"mobile"}},render:l=>e.jsxs(e.Fragment,{children:[e.jsxs(t,{...l,children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"}),e.jsx(t.Item,{value:"test4",children:"Test4"}),e.jsx(t.Item,{value:"test5",children:"Test5"}),e.jsx(t.Item,{value:"test6",children:"Test6"}),e.jsx(t.Item,{value:"test7",children:"Test7"})]}),e.jsxs(t,{...l,children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"}),e.jsx(t.Item,{value:"test4",children:"Test4"}),e.jsx(t.Item,{value:"test5",children:"Test5"}),e.jsx(t.Item,{value:"test6",children:"Test6"}),e.jsx(t.Item,{value:"test7",children:"Test7"})]}),e.jsxs(t,{...l,children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"}),e.jsx(t.Item,{value:"test4",children:"Test4"}),e.jsx(t.Item,{value:"test5",children:"Test5"}),e.jsx(t.Item,{value:"test6",children:"Test6"}),e.jsx(t.Item,{value:"test7",children:"Test7"})]}),e.jsxs(t,{...l,children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"}),e.jsx(t.Item,{value:"test4",children:"Test4"}),e.jsx(t.Item,{value:"test5",children:"Test5"}),e.jsx(t.Item,{value:"test6",children:"Test6"}),e.jsx(t.Item,{value:"test7",children:"Test7"})]})]})},j={args:{status:"success"},render:l=>e.jsxs(t,{...l,children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]})},b={args:{status:"error"},render:l=>e.jsxs(t.Combobox,{...l,children:[e.jsx(t.Item,{value:"test1",children:"Test1"}),e.jsx(t.Item,{value:"test2",children:"Test2"}),e.jsx(t.Item,{value:"test3",children:"Test3"})]})};var G,z,B;c.parameters={...c.parameters,docs:{...(G=c.parameters)==null?void 0:G.docs,source:{code:`const SimpleSelect = () => {
  return (
    <Select aria-label="Select an item" placeholder="Select an item">
      <Select.Item value="test1">Test1</Select.Item>
      <Select.Item value="test2">Test2</Select.Item>
      <Select.Item value="test3">Test3</Select.Item>
    </Select>
  );
};
`,...(B=(z=c.parameters)==null?void 0:z.docs)==null?void 0:B.source}}};var A,W,F;a.parameters={...a.parameters,docs:{...(A=a.parameters)==null?void 0:A.docs,source:{code:`const Combobox = () => {
  return (
    <Select.Combobox aria-label="Select an item" placeholder="Select an item">
      <Select.Item value="test1">Test1</Select.Item>
      <Select.Item value="test2">Test2</Select.Item>
      <Select.Item value="test3">Test3</Select.Item>
    </Select.Combobox>
  );
};
`,...(F=(W=a.parameters)==null?void 0:W.docs)==null?void 0:F.source}}};var N,E,H;n.parameters={...n.parameters,docs:{...(N=n.parameters)==null?void 0:N.docs,source:{code:`const ComboboxWithAsyncItems = () => {
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
`,...(H=(E=n.parameters)==null?void 0:E.docs)==null?void 0:H.source}}};var P,D,O;r.parameters={...r.parameters,docs:{...(P=r.parameters)==null?void 0:P.docs,source:{code:`const Disabled = () => {
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
`,...(O=(D=r.parameters)==null?void 0:D.docs)==null?void 0:O.source}}};var L,V,k;m.parameters={...m.parameters,docs:{...(L=m.parameters)==null?void 0:L.docs,source:{code:`const WithPlaceholder = () => {
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
`,...(k=(V=m.parameters)==null?void 0:V.docs)==null?void 0:k.source}}};var M,_,R;o.parameters={...o.parameters,docs:{...(M=o.parameters)==null?void 0:M.docs,source:{code:`const WithDecorator = () => {
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
`,...(R=(_=o.parameters)==null?void 0:_.docs)==null?void 0:R.source}}};var q,J,K;S.parameters={...S.parameters,docs:{...(q=S.parameters)==null?void 0:q.docs,source:{code:`const Clearable = () => {
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
`,...(K=(J=S.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};var Q,U,X;i.parameters={...i.parameters,docs:{...(Q=i.parameters)==null?void 0:Q.docs,source:{code:`const CustomClearElement = () => {
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
`,...(X=(U=i.parameters)==null?void 0:U.docs)==null?void 0:X.source}}};var Y,Z,$;u.parameters={...u.parameters,docs:{...(Y=u.parameters)==null?void 0:Y.docs,source:{code:`const DefaultItem = () => {
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
`,...($=(Z=u.parameters)==null?void 0:Z.docs)==null?void 0:$.source}}};var ee,te,le;I.parameters={...I.parameters,docs:{...(ee=I.parameters)==null?void 0:ee.docs,source:{code:`const ItemGroups = () => {
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
`,...(le=(te=I.parameters)==null?void 0:te.docs)==null?void 0:le.source}}};var se,ce,ae;d.parameters={...d.parameters,docs:{...(se=d.parameters)==null?void 0:se.docs,source:{code:`const ItemGroupsWithHeaders = () => {
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
`,...(ae=(ce=d.parameters)==null?void 0:ce.docs)==null?void 0:ae.source}}};var ne,re,me;v.parameters={...v.parameters,docs:{...(ne=v.parameters)==null?void 0:ne.docs,source:{code:`const OnlyItemGroups = () => {
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
`,...(me=(re=v.parameters)==null?void 0:re.docs)==null?void 0:me.source}}};var oe,Se,ie;p.parameters={...p.parameters,docs:{...(oe=p.parameters)==null?void 0:oe.docs,source:{code:`const CustomItem = () => {
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
`,...(ie=(Se=p.parameters)==null?void 0:Se.docs)==null?void 0:ie.source}}};var ue,Ie,de;h.parameters={...h.parameters,docs:{...(ue=h.parameters)==null?void 0:ue.docs,source:{code:`const CustomItemIncludingSelectField = () => {
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
`,...(de=(Ie=h.parameters)==null?void 0:Ie.docs)==null?void 0:de.source}}};var ve,pe,he;T.parameters={...T.parameters,docs:{...(ve=T.parameters)==null?void 0:ve.docs,source:{code:`const ExternallyControlled = () => {
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
`,...(he=(pe=T.parameters)==null?void 0:pe.docs)==null?void 0:he.source}}};var Te,xe,ge;x.parameters={...x.parameters,docs:{...(Te=x.parameters)==null?void 0:Te.docs,source:{code:`const OverflowingText = () => {
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
`,...(ge=(xe=x.parameters)==null?void 0:xe.docs)==null?void 0:ge.source}}};var je,be,we;g.parameters={...g.parameters,docs:{...(je=g.parameters)==null?void 0:je.docs,source:{code:`const ListOverflow = () => {
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
`,...(we=(be=g.parameters)==null?void 0:be.docs)==null?void 0:we.source}}};var fe,Ce,ye;j.parameters={...j.parameters,docs:{...(fe=j.parameters)==null?void 0:fe.docs,source:{code:`const Success = () => {
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
`,...(ye=(Ce=j.parameters)==null?void 0:Ce.docs)==null?void 0:ye.source}}};var Ge,ze,Be;b.parameters={...b.parameters,docs:{...(Ge=b.parameters)==null?void 0:Ge.docs,source:{code:`const Errored = () => {
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
`,...(Be=(ze=b.parameters)==null?void 0:ze.docs)==null?void 0:Be.source}}};var Ae,We,Fe;c.parameters={...c.parameters,docs:{...(Ae=c.parameters)==null?void 0:Ae.docs,source:{originalSource:`{
  name: 'Select',
  render: args => {
    return <Select {...args}>
                <Select.Item value="test1">Test1</Select.Item>
                <Select.Item value="test2">Test2</Select.Item>
                <Select.Item value="test3">Test3</Select.Item>
            </Select>;
  }
}`,...(Fe=(We=c.parameters)==null?void 0:We.docs)==null?void 0:Fe.source}}};var Ne,Ee,He;a.parameters={...a.parameters,docs:{...(Ne=a.parameters)==null?void 0:Ne.docs,source:{originalSource:`{
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
}`,...(He=(Ee=a.parameters)==null?void 0:Ee.docs)==null?void 0:He.source}}};var Pe,De,Oe;n.parameters={...n.parameters,docs:{...(Pe=n.parameters)==null?void 0:Pe.docs,source:{originalSource:`{
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
}`,...(Oe=(De=n.parameters)==null?void 0:De.docs)==null?void 0:Oe.source}}};var Le,Ve,ke;r.parameters={...r.parameters,docs:{...(Le=r.parameters)==null?void 0:Le.docs,source:{originalSource:`{
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
}`,...(ke=(Ve=r.parameters)==null?void 0:Ve.docs)==null?void 0:ke.source}}};var Me,_e,Re;m.parameters={...m.parameters,docs:{...(Me=m.parameters)==null?void 0:Me.docs,source:{originalSource:`{
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
}`,...(Re=(_e=m.parameters)==null?void 0:_e.docs)==null?void 0:Re.source}}};var qe,Je,Ke;o.parameters={...o.parameters,docs:{...(qe=o.parameters)==null?void 0:qe.docs,source:{originalSource:`{
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
}`,...(Ke=(Je=o.parameters)==null?void 0:Je.docs)==null?void 0:Ke.source}}};var Qe,Ue,Xe;S.parameters={...S.parameters,docs:{...(Qe=S.parameters)==null?void 0:Qe.docs,source:{originalSource:`{
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
}`,...(Xe=(Ue=S.parameters)==null?void 0:Ue.docs)==null?void 0:Xe.source}}};var Ye,Ze,$e;i.parameters={...i.parameters,docs:{...(Ye=i.parameters)==null?void 0:Ye.docs,source:{originalSource:`{
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
}`,...($e=(Ze=i.parameters)==null?void 0:Ze.docs)==null?void 0:$e.source}}};var et,tt,lt;u.parameters={...u.parameters,docs:{...(et=u.parameters)==null?void 0:et.docs,source:{originalSource:`{
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
}`,...(lt=(tt=u.parameters)==null?void 0:tt.docs)==null?void 0:lt.source}}};var st,ct,at;I.parameters={...I.parameters,docs:{...(st=I.parameters)==null?void 0:st.docs,source:{originalSource:`{
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
}`,...(at=(ct=I.parameters)==null?void 0:ct.docs)==null?void 0:at.source}}};var nt,rt,mt;d.parameters={...d.parameters,docs:{...(nt=d.parameters)==null?void 0:nt.docs,source:{originalSource:`{
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
}`,...(mt=(rt=d.parameters)==null?void 0:rt.docs)==null?void 0:mt.source}}};var ot,St,it;v.parameters={...v.parameters,docs:{...(ot=v.parameters)==null?void 0:ot.docs,source:{originalSource:`{
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
}`,...(it=(St=v.parameters)==null?void 0:St.docs)==null?void 0:it.source}}};var ut,It,dt;p.parameters={...p.parameters,docs:{...(ut=p.parameters)==null?void 0:ut.docs,source:{originalSource:`{
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
}`,...(dt=(It=p.parameters)==null?void 0:It.docs)==null?void 0:dt.source}}};var vt,pt,ht;h.parameters={...h.parameters,docs:{...(vt=h.parameters)==null?void 0:vt.docs,source:{originalSource:`{
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
}`,...(ht=(pt=h.parameters)==null?void 0:pt.docs)==null?void 0:ht.source}}};var Tt,xt,gt;T.parameters={...T.parameters,docs:{...(Tt=T.parameters)==null?void 0:Tt.docs,source:{originalSource:`{
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
}`,...(gt=(xt=T.parameters)==null?void 0:xt.docs)==null?void 0:gt.source}}};var jt,bt,wt;x.parameters={...x.parameters,docs:{...(jt=x.parameters)==null?void 0:jt.docs,source:{originalSource:`{
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
}`,...(wt=(bt=x.parameters)==null?void 0:bt.docs)==null?void 0:wt.source}}};var ft,Ct,yt;g.parameters={...g.parameters,docs:{...(ft=g.parameters)==null?void 0:ft.docs,source:{originalSource:`{
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
}`,...(yt=(Ct=g.parameters)==null?void 0:Ct.docs)==null?void 0:yt.source}}};var Gt,zt,Bt;j.parameters={...j.parameters,docs:{...(Gt=j.parameters)==null?void 0:Gt.docs,source:{originalSource:`{
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
}`,...(Bt=(zt=j.parameters)==null?void 0:zt.docs)==null?void 0:Bt.source}}};var At,Wt,Ft;b.parameters={...b.parameters,docs:{...(At=b.parameters)==null?void 0:At.docs,source:{originalSource:`{
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
}`,...(Ft=(Wt=b.parameters)==null?void 0:Wt.docs)==null?void 0:Ft.source}}};const ll=["SimpleSelect","Combobox","ComboboxWithAsyncItems","Disabled","WithPlaceholder","WithDecorator","Clearable","CustomClearElement","DefaultItem","ItemGroups","ItemGroupsWithHeaders","OnlyItemGroups","CustomItem","CustomItemIncludingSelectField","ExternallyControlled","OverflowingText","ListOverflow","Success","Errored"];export{S as Clearable,a as Combobox,n as ComboboxWithAsyncItems,i as CustomClearElement,p as CustomItem,h as CustomItemIncludingSelectField,u as DefaultItem,r as Disabled,b as Errored,T as ExternallyControlled,I as ItemGroups,d as ItemGroupsWithHeaders,g as ListOverflow,v as OnlyItemGroups,x as OverflowingText,c as SimpleSelect,j as Success,o as WithDecorator,m as WithPlaceholder,ll as __namedExportsOrder,tl as default};
