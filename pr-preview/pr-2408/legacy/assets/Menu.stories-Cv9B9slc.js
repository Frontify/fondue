import{j as e,r as c}from"./iframe-a7WslOQu.js";import{M as i}from"./Menu-BiIev_v7.js";import{B as x}from"./Button-Dtrv8XCd.js";import{b as a}from"./MenuItem-DvHi3q0c.js";import"./preload-helper-DyHTrhc7.js";import"./usePopper-DC4mMBi2.js";import"./index-DveCA8QO.js";import"./index-CgZkkAzJ.js";import"./useClickOutside-DiPuqPle.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./useButton-DyYnusnA.js";import"./useFocusable-CVLtKeEK.js";import"./useFocusRing-BsKtOWIg.js";import"./useLayoutEffect-BSvyou2-.js";import"./chain-D_hLnw2Y.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./IconCaretRight-Bh5xw6kV.js";import"./IconCheckMark-BAxYou-z.js";import"./elements-BOYmskOL.js";const b=[{label:"Button Item 1",onClick:()=>{}},{label:"Button Item 2",onClick:()=>{}},{label:"Button Item 3",onClick:()=>{}}],N=[{label:"Some first label",link:"/?path=/docs/components-menu--docs"},{label:"Some second label",link:"/?path=/docs/components-menu--docs"},{label:"Some third label",link:"/?path=/docs/components-menu--docs"}],R=(n,r)=>e.jsx(a,{link:n.link,onClick:n.onClick,disabled:n.disabled,children:n.label},`item-${r}`),f=()=>e.jsxs(i,{children:[e.jsx(a,{link:"/?path=/docs/components-menu--docs",children:"Item 1"}),e.jsx(a,{link:"/?path=/docs/components-menu--docs",children:"Item 2"}),e.jsx(a,{link:"/?path=/docs/components-menu--docs",children:"Item 3"})]}),k=n=>{const r=c.useRef(null),[S,m]=c.useState(!1),E=()=>{m(O=>!O)},B=()=>{m(!1)};return e.jsxs("div",{"data-test-id":"menu-container",children:[e.jsx(x,{ref:r,onClick:E,children:"Open menu"}),e.jsx(i,{...n,triggerRef:r,open:S,onClose:B,children:n.items.map(R)})]})},j=`
const getMenuItem = (item: Item, index?: number) => (
    <MenuItem link={item.link} onClick={item.onClick} disabled={item.disabled} key={\`item-\${index}\`}>
        {item.label}
    </MenuItem>
);
`,T=`
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
${T}
// Usage Example

<BasicMenuComponent
    items={[
    { label: 'Button Item 1', onClick: () => {} },
    { label: 'Button Item 2', onClick: () => {} },
    { label: 'Button Item 3', onClick: () => {} },
  ]}
/>
`,P=`
${T}
// Usage Example

<BasicMenuComponent
    items={[
    { label: 'Some first label', link: '/?path=/docs/components-menu--docs' },
    { label: 'Some second label', link: '/?path=/docs/components-menu--docs' },
    { label: 'Some third label', link: '/?path=/docs/components-menu--docs' },
  ]}
/>
`,w=`
<Menu>
    <MenuItem link="/?path=/docs/components-menu--docs">Item 1</MenuItem>
    <MenuItem link="/?path=/docs/components-menu--docs">Item 2</MenuItem>
    <MenuItem link="/?path=/docs/components-menu--docs">Item 3</MenuItem>
</Menu>
`;f.__docgenInfo={description:"",methods:[],displayName:"ComponentStructure"};k.__docgenInfo={description:"",methods:[],displayName:"BasicMenuComponent",props:{triggerRef:{required:!1,tsType:{name:"RefObject",elements:[{name:"Element"}],raw:"RefObject<Element>"},description:""},open:{required:!1,tsType:{name:"boolean"},description:""},children:{required:!1,tsType:{name:"union",raw:"ReactNode | ReactNode[]",elements:[{name:"ReactNode"},{name:"Array",elements:[{name:"ReactNode"}],raw:"ReactNode[]"}]},description:""},onClose:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},offset:{required:!1,tsType:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:""},items:{required:!0,tsType:{name:"Array",elements:[{name:"Item"}],raw:"Item[]"},description:""}}};const oe={title:"Components/Menu",component:i,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dropdown component](/docs/current_components-dropdown--documentation) instead."}}}},v=()=>e.jsx("div",{className:"tw-p-4",children:e.jsx(f,{})}),_=n=>e.jsx(k,{...n}),t=v.bind({});t.args={items:b};t.parameters={docs:{source:{code:w,language:"tsx"}}};const o=_.bind({});o.args={open:!0,items:b};o.parameters={docs:{source:{code:y,language:"tsx"}}};const s=_.bind({});s.args={items:N};s.parameters={docs:{source:{code:P,language:"tsx"}}};var p,l,d;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`() => <div className="tw-p-4">
        <ComponentStructure />
    </div>`,...(d=(l=t.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};var u,I,g;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:"args => <BasicMenuComponent {...args} />",...(g=(I=o.parameters)==null?void 0:I.docs)==null?void 0:g.source}}};var M,C,h;s.parameters={...s.parameters,docs:{...(M=s.parameters)==null?void 0:M.docs,source:{originalSource:"args => <BasicMenuComponent {...args} />",...(h=(C=s.parameters)==null?void 0:C.docs)==null?void 0:h.source}}};const se=["BasicComponentStructure","BasicMenu","BasicMenuWithLinks"];export{t as BasicComponentStructure,o as BasicMenu,s as BasicMenuWithLinks,se as __namedExportsOrder,oe as default};
