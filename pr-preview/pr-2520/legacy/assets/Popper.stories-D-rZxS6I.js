import{r as p,j as t}from"./iframe-B-0ohXx5.js";import{a as b}from"./Box-Bfo7eN4W.js";import{B as h}from"./Button-pohYv-VU.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-C6TcTlCS.js";import"./preload-helper-OAyExbmo.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-BLGEgUqg.js";import"./Divider-CdBcJplS.js";import"./FormControl-QEmihnsL.js";import"./InputLabel-X8nwfpcT.js";import"./TooltipIcon-DgDxTaA8.js";import"./LegacyTooltip-5Gi4Bp92.js";import"./useLink-CsU7i9kB.js";import"./useFocusable-C_GXbrLR.js";import"./useFocusRing-Cj3WTh8B.js";import"./useEffectEvent-Cdq6nVtj.js";import"./chain-CI-qFvAv.js";import"./index-CqIiypJE.js";import"./usePopper-DCmNwhOA.js";import"./index-CN4ZOjmZ.js";import"./Portal-CmfkkRzZ.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-Dgblw7Vq.js";import"./IconCheckMark-CcoOjp0X.js";import"./IconExclamationMarkCircle24--X2w823R.js";import"./IconExclamationMarkTriangle-uD4qB27T.js";import"./IconExclamationMarkTriangle24-DOknGV0-.js";import"./IconQuestionMarkCircle-DXcByOTD.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-yJg0DNzg.js";import"./Switch-BEwTQN5Z.js";import"./TabItem-Bew6ASJr.js";import"./elements-BOYmskOL.js";import"./TextInput-vQHf8d1r.js";import"./IconCross-BZrhiKKk.js";import"./Tree-BXR9YqgN.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-Db62SCyU.js";import"./IconCaretDown-vU3eGj--.js";import"./IconCaretDown16-ByN1R2fU.js";import"./IconTrashBin16-BR1M6xpE.js";import"./IconTrashBin24-DXN2McME.js";import"./useButton-DmkFeJ1M.js";import"./useClickOutside-BzLjgKkr.js";import"./EnablePortalWrapper-gT6-UTcE.js";import"./dialog-D9O7a7Fm.js";const wt={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},e=u.bind({});e.args={enablePortal:!1};const o=u.bind({});o.args={enablePortal:!0};var s,i,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  return <div className="tw-flex tw-justify-center">
            <Button ref={anchorRef} onClick={() => setOpen(!open)}>
                Hello
            </Button>
            <Popper {...args} anchor={anchorRef} open={open}>
                <Box className="tw-bg-base tw-border tw-border-black tw-w-[400px]">
                    <p>Some content</p>
                </Box>
            </Popper>
        </div>;
}`,...(a=(i=e.parameters)==null?void 0:i.docs)==null?void 0:a.source}}};var m,c,l;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  return <div className="tw-flex tw-justify-center">
            <Button ref={anchorRef} onClick={() => setOpen(!open)}>
                Hello
            </Button>
            <Popper {...args} anchor={anchorRef} open={open}>
                <Box className="tw-bg-base tw-border tw-border-black tw-w-[400px]">
                    <p>Some content</p>
                </Box>
            </Popper>
        </div>;
}`,...(l=(c=o.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};const bt=["Default","WithPortal"];export{e as Default,o as WithPortal,bt as __namedExportsOrder,wt as default};
