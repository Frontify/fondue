import{r as p,j as t}from"./iframe-B0eONuky.js";import{a as b}from"./Box-Bx-HGFN9.js";import{B as h}from"./Button-BlGIO2tE.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-Dwst5rQ3.js";import"./preload-helper-MprHWY6w.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-CH-sbZx6.js";import"./Divider-Ctv_3Wyq.js";import"./Dropdown-BfzPlYYt.js";import"./useButton-5FbdIYcR.js";import"./useFocusable-bBkjSLpf.js";import"./useFocusRing-DE6ZkWyf.js";import"./useEffectEvent-2_Uk2eyz.js";import"./chain-V8glzwK0.js";import"./index-DVbrmjAE.js";import"./FocusScope-CyQyhzxw.js";import"./useOverlayTriggerState-lO9KGur7.js";import"./useControlledState-BVDDe9gl.js";import"./useMenuTrigger-DoHZFNAI.js";import"./useLabels-DLn4iTZj.js";import"./useLocalizedStringFormatter-D45KdaND.js";import"./context-BiMFL_PP.js";import"./VisuallyHidden-CpTHZVNZ.js";import"./helper-4xrQ1och.js";import"./keyboard-DpUZzzD5.js";import"./SelectionManager-DZOcDTAx.js";import"./useField-D1_sbYus.js";import"./useFormValidationState-CiR8hia_.js";import"./usePopper-CSmw89St.js";import"./index-Cq0fKC_P.js";import"./MenuItem-DOiZqrOT.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-CVZt_dym.js";import"./IconCheckMark-Do5BaNJh.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-CuP6zKKO.js";import"./Trigger-BkTp6a6g.js";import"./IconCaretDown-DGfG4Bhv.js";import"./IconCaretDown16-K9H94xLN.js";import"./IconCross-DKzK2egq.js";import"./IconExclamationMarkTriangle-E9iCfFGJ.js";import"./IconExclamationMarkTriangle24-BgvkgKew.js";import"./IconTrashBin16-B3PCevQV.js";import"./IconTrashBin24-j-bA0P1z.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-CWbGt64c.js";import"./Portal-D_InDcfX.js";import"./useMemoizedId-B3YhzS_A.js";import"./FormControl-BHe39TIa.js";import"./InputLabel-ZriXx0s-.js";import"./TooltipIcon-iXKlKXAf.js";import"./LegacyTooltip-B7q53XOK.js";import"./useLink-B03_KRRE.js";import"./IconExclamationMarkCircle24-DhRVyq7-.js";import"./IconQuestionMarkCircle-R6W4K534.js";import"./Switch-OeDDwXU2.js";import"./TabItem-76GLqhix.js";import"./TextInput-Gv7lpT9-.js";import"./Tree-D-Zdn97c.js";import"./_Uint8Array-CwPxMkg2.js";import"./useClickOutside-BBDKVLV6.js";import"./dialog-D9O7a7Fm.js";const _t={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},o=u.bind({});o.args={enablePortal:!1};const e=u.bind({});e.args={enablePortal:!0};var i,s,a;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`args => {
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
}`,...(a=(s=o.parameters)==null?void 0:s.docs)==null?void 0:a.source}}};var m,c,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
}`,...(l=(c=e.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};const Ht=["Default","WithPortal"];export{o as Default,e as WithPortal,Ht as __namedExportsOrder,_t as default};
