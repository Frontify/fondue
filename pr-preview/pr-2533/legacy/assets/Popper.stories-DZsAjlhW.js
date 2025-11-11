import{r as p,j as t}from"./iframe-CqMYqlgR.js";import{a as b}from"./Box-Dbyzt1Zk.js";import{B as h}from"./Button-CYHT2AMY.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-CZgfioZM.js";import"./preload-helper-BrHt6s3f.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-EhKZN_1O.js";import"./Divider-Z6m92kut.js";import"./FormControl-DylzNNc3.js";import"./InputLabel-CS1iO4pu.js";import"./TooltipIcon-Z0eJr2D6.js";import"./LegacyTooltip-Co0qD5RC.js";import"./useLink-D7Pri6Nz.js";import"./useFocusable-BZgzPKtn.js";import"./useFocusRing-CLIn77jc.js";import"./useEffectEvent-D05mPwwN.js";import"./chain-B9Eo87tn.js";import"./index-Cy9q-1wD.js";import"./usePopper-BK18999i.js";import"./index-Bjym0GCp.js";import"./Portal-BsHqlhbb.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-DAyKmQUl.js";import"./IconCheckMark-BAMG8MDz.js";import"./IconExclamationMarkCircle24-ChMlYYeR.js";import"./IconExclamationMarkTriangle-3XRG4Ouh.js";import"./IconExclamationMarkTriangle24-DSIS2BTO.js";import"./IconQuestionMarkCircle-BxAoOfIQ.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-DxO-53u-.js";import"./Switch-BVW5p_vz.js";import"./TabItem-Dey0TnTM.js";import"./elements-BOYmskOL.js";import"./TextInput-B2n_17-q.js";import"./IconCross-Csh70OY3.js";import"./Tree-CxepOoim.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-BqpM5goS.js";import"./IconCaretDown-CJIKu6X8.js";import"./IconCaretDown16-hlAzjhEC.js";import"./IconTrashBin16-DbBfC4Gf.js";import"./IconTrashBin24-Dqge_01c.js";import"./useButton-vGfdsb0j.js";import"./useClickOutside-DLthHa0m.js";import"./EnablePortalWrapper-D8D0Lbv4.js";import"./dialog-D9O7a7Fm.js";const wt={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},e=u.bind({});e.args={enablePortal:!1};const o=u.bind({});o.args={enablePortal:!0};var s,i,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
