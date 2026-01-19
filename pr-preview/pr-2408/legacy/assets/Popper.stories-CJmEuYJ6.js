import{r as s,j as e}from"./iframe-a7WslOQu.js";import{a as b}from"./Box-B4ArSx2T.js";import{B as h}from"./Button-Dtrv8XCd.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-Bp0Luloz.js";import"./preload-helper-DyHTrhc7.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-p2o5I04Y.js";import"./Divider-BSeUtVmc.js";import"./FormControl-mosS9VJ8.js";import"./InputLabel-CX4PTXEL.js";import"./TooltipIcon-vPN4jXOd.js";import"./LegacyTooltip-D7WbcWjf.js";import"./useLink-CKXoXPie.js";import"./useFocusable-CVLtKeEK.js";import"./useFocusRing-BsKtOWIg.js";import"./useLayoutEffect-BSvyou2-.js";import"./chain-D_hLnw2Y.js";import"./index-DveCA8QO.js";import"./usePopper-DC4mMBi2.js";import"./index-CgZkkAzJ.js";import"./Portal-DVDn18Ze.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-CHuQFIPb.js";import"./IconCheckMark-BAxYou-z.js";import"./IconExclamationMarkCircle24-CEyW54Cy.js";import"./IconExclamationMarkTriangle-DO0xbDzJ.js";import"./IconExclamationMarkTriangle24-DDnsUeoa.js";import"./IconQuestionMarkCircle-B8crfUXz.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-C_zkTnDZ.js";import"./Switch-N7gvfehH.js";import"./TabItem-BfSLCPbW.js";import"./elements-BOYmskOL.js";import"./TextInput-wAQd4tEv.js";import"./IconCross-bxooVkc0.js";import"./Tree-CbUACvEy.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-DyYnusnA.js";import"./useClickOutside-DiPuqPle.js";import"./EnablePortalWrapper-e5As7i-G.js";import"./dialog-D9O7a7Fm.js";const le={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=s.useState(!1),n=s.useRef(null);return e.jsxs("div",{className:"tw-flex tw-justify-center",children:[e.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),e.jsx(d,{...f,anchor:n,open:r,children:e.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:e.jsx("p",{children:"Some content"})})})]})},t=u.bind({});t.args={enablePortal:!1};const o=u.bind({});o.args={enablePortal:!0};var p,a,i;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`args => {
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
}`,...(i=(a=t.parameters)==null?void 0:a.docs)==null?void 0:i.source}}};var c,l,m;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:`args => {
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
}`,...(m=(l=o.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};const me=["Default","WithPortal"];export{t as Default,o as WithPortal,me as __namedExportsOrder,le as default};
