import{r as p,j as t}from"./iframe-Bc-0m40g.js";import{a as b}from"./Box-BC7f7yDg.js";import{B as h}from"./Button-0Lc8yrOz.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-D65DgYPV.js";import"./preload-helper-C1FmrZbK.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-B3VZ7Rq7.js";import"./DialogBody-Dld9aPJm.js";import"./dialog-D9O7a7Fm.js";import"./Divider-C8NNHF9m.js";import"./FormControl-yndCSK4f.js";import"./InputLabel-DqA6cmfW.js";import"./TooltipIcon-ByM_dO20.js";import"./LegacyTooltip-Cr6rxS0g.js";import"./useLink-C81JbUT1.js";import"./useFocusable-DKEjpfV8.js";import"./useFocusRing-mXNrc4Vo.js";import"./useEffectEvent-CRNIM4-p.js";import"./chain-ktRrW4jm.js";import"./index-DG7sG-fA.js";import"./usePopper-DheOg4-1.js";import"./index-DrE0jYhD.js";import"./Portal-CRH4LxLX.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-CocKipVj.js";import"./IconCheckMark-kpeWHNNt.js";import"./IconExclamationMarkCircle24-CBgKnXpx.js";import"./IconExclamationMarkTriangle-C8obBTCZ.js";import"./IconExclamationMarkTriangle24-CHQeZCaQ.js";import"./IconQuestionMarkCircle-CspliPOa.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-B67CcELu.js";import"./Switch-DZKwesw6.js";import"./TabItem-uAN6v55f.js";import"./elements-BOYmskOL.js";import"./TextInput-C8zS8WB7.js";import"./IconCross-DAh3-6yo.js";import"./Tree-D2CWTejl.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-B_jNvcmv.js";import"./IconCaretDown-CaxFsv5M.js";import"./IconCaretDown16-DzyXh8nV.js";import"./IconTrashBin16-DR3D71pr.js";import"./IconTrashBin24-DzVxuYG2.js";import"./useButton-Daacn22Z.js";import"./useClickOutside-Dj6mOh2i.js";import"./EnablePortalWrapper-D9n8VH5a.js";const bt={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},e=u.bind({});e.args={enablePortal:!1};const o=u.bind({});o.args={enablePortal:!0};var s,i,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
}`,...(l=(c=o.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};const ht=["Default","WithPortal"];export{e as Default,o as WithPortal,ht as __namedExportsOrder,bt as default};
