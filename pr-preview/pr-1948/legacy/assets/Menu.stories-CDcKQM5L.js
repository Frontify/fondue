import{j as e}from"./jsx-runtime-Nms4Y4qS.js";import{M as i}from"./Menu-DrrhIXZ4.js";import{r as c}from"./index-BwDkhjyp.js";import{B as x}from"./Button-DqlvyMV-.js";import{b as a}from"./MenuItem-D_nT2Y1I.js";import"./usePopper-DPXU-o95.js";import"./index-DxjWwZXO.js";import"./_commonjsHelpers-BosuxZz1.js";import"./index-CfyPTyT-.js";import"./useClickOutside-CKV3CrvD.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./useButton-DFNFXdnN.js";import"./useFocusable-wKuCPQI4.js";import"./useFocusRing-Vzyl7-Lk.js";import"./SSRProvider-CYXx33DY.js";import"./chain-D5h1pgIF.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-CBFElZiz.js";import"./IconCaretRight-CxmZKZHS.js";import"./IconCheckMark-CLvJH1sB.js";import"./elements-BOYmskOL.js";const f=[{label:"Button Item 1",onClick:()=>{}},{label:"Button Item 2",onClick:()=>{}},{label:"Button Item 3",onClick:()=>{}}],N=[{label:"Some first label",link:"/?path=/docs/components-menu--docs"},{label:"Some second label",link:"/?path=/docs/components-menu--docs"},{label:"Some third label",link:"/?path=/docs/components-menu--docs"}],R=(n,r)=>e.jsx(a,{link:n.link,onClick:n.onClick,disabled:n.disabled,children:n.label},`item-${r}`),h=()=>e.jsxs(i,{children:[e.jsx(a,{link:"/?path=/docs/components-menu--docs",children:"Item 1"}),e.jsx(a,{link:"/?path=/docs/components-menu--docs",children:"Item 2"}),e.jsx(a,{link:"/?path=/docs/components-menu--docs",children:"Item 3"})]}),k=n=>{const r=c.useRef(null),[_,m]=c.useState(!1),E=()=>{m(O=>!O)},B=()=>{m(!1)};return e.jsxs("div",{"data-test-id":"menu-container",children:[e.jsx(x,{ref:r,onClick:E,children:"Open menu"}),e.jsx(i,{...n,triggerRef:r,open:_,onClose:B,children:n.items.map(R)})]})},j=`
const getMenuItem = (item: Item, index?: number) => (
    <MenuItem link={item.link} onClick={item.onClick} disabled={item.disabled} key={\`item-\${index}\`}>
        {item.label}
    </MenuItem>
);
`,S=`
${j}
export const BasicMenuComponent = (props: MenuProps & { items: Item[] }) => {
    const triggerRef = useRef<HTMLButtonElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleTriggerClick = () => {
        setIsMenuOpen((isOpen) => !isOpen);
    };

    const handleOnClose = () => {
        setIsMenuOpen(false);
    };

    return (
        <div data-test-id="menu-container">
            <Button ref={triggerRef} onClick={handleTriggerClick}>
                Open menu
            </Button>
            <Menu {...props} triggerRef={triggerRef} open={isMenuOpen} onClose={handleOnClose}>
                {props.items.map(getMenuItem)}
            </Menu>
        </div>
    );
};
`,y=`
${S}
// Usage Example

<BasicMenuComponent
    items={[
    { label: 'Button Item 1', onClick: () => {} },
    { label: 'Button Item 2', onClick: () => {} },
    { label: 'Button Item 3', onClick: () => {} },
  ]}
/>
`,P=`
${S}
// Usage Example

<BasicMenuComponent
    items={[
    { label: 'Some first label', link: '/?path=/docs/components-menu--docs' },
    { label: 'Some second label', link: '/?path=/docs/components-menu--docs' },
    { label: 'Some third label', link: '/?path=/docs/components-menu--docs' },
  ]}
/>
`,v=`
<Menu>
    <MenuItem link="/?path=/docs/components-menu--docs">Item 1</MenuItem>
    <MenuItem link="/?path=/docs/components-menu--docs">Item 2</MenuItem>
    <MenuItem link="/?path=/docs/components-menu--docs">Item 3</MenuItem>
</Menu>
`;h.__docgenInfo={description:"",methods:[],displayName:"ComponentStructure"};k.__docgenInfo={description:"",methods:[],displayName:"BasicMenuComponent",props:{triggerRef:{required:!1,tsType:{name:"RefObject",elements:[{name:"Element"}],raw:"RefObject<Element>"},description:""},open:{required:!1,tsType:{name:"boolean"},description:""},children:{required:!1,tsType:{name:"union",raw:"ReactNode | ReactNode[]",elements:[{name:"ReactNode"},{name:"Array",elements:[{name:"ReactNode"}],raw:"ReactNode[]"}]},description:""},onClose:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},offset:{required:!1,tsType:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:""},items:{required:!0,tsType:{name:"Array",elements:[{name:"Item"}],raw:"Item[]"},description:""}}};const se={title:"Components/Menu",component:i,tags:["autodocs"]},w=()=>e.jsx("div",{className:"tw-p-4",children:e.jsx(h,{})}),T=n=>e.jsx(k,{...n}),t=w.bind({});t.args={items:f};t.parameters={docs:{source:{code:v,language:"tsx"}}};const o=T.bind({});o.args={open:!0,items:f};o.parameters={docs:{source:{code:y,language:"tsx"}}};const s=T.bind({});s.args={items:N};s.parameters={docs:{source:{code:P,language:"tsx"}}};var l,p,u;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`() => <div className="tw-p-4">
        <ComponentStructure />
    </div>`,...(u=(p=t.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var d,I,g;o.parameters={...o.parameters,docs:{...(d=o.parameters)==null?void 0:d.docs,source:{originalSource:"args => <BasicMenuComponent {...args} />",...(g=(I=o.parameters)==null?void 0:I.docs)==null?void 0:g.source}}};var M,C,b;s.parameters={...s.parameters,docs:{...(M=s.parameters)==null?void 0:M.docs,source:{originalSource:"args => <BasicMenuComponent {...args} />",...(b=(C=s.parameters)==null?void 0:C.docs)==null?void 0:b.source}}};const re=["BasicComponentStructure","BasicMenu","BasicMenuWithLinks"];export{t as BasicComponentStructure,o as BasicMenu,s as BasicMenuWithLinks,re as __namedExportsOrder,se as default};
