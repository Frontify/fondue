import{r as p,j as t}from"./iframe-AUIfQrP4.js";import{a as b}from"./Box-lCOHognj.js";import{B as h}from"./Button-DlFiAFHP.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-BAyR836C.js";import"./preload-helper-sQDyWCwb.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-C06IVxfj.js";import"./Divider-DRPbvsLK.js";import"./Dropdown-C-r4J8l_.js";import"./useButton-D0wGE8qM.js";import"./useFocusable-CnizbhnP.js";import"./useFocusRing-BoSeZWz5.js";import"./useEffectEvent-Bcoupwh6.js";import"./chain-oFsE9aEj.js";import"./index-BEcmyHTP.js";import"./FocusScope-Ch0sNNKQ.js";import"./useOverlayTriggerState-CuK4f_N_.js";import"./useControlledState-BAllyYje.js";import"./useMenuTrigger-B7Fpswne.js";import"./useLabels--84juFjK.js";import"./useLocalizedStringFormatter-gnsmCImp.js";import"./context-Cy3OkrWF.js";import"./VisuallyHidden-DuFlpOV3.js";import"./helper-5kMBwN-m.js";import"./keyboard-XYTEU8GG.js";import"./SelectionManager-D1hXYaW9.js";import"./useField-CFbP_W3z.js";import"./useFormValidationState-C43Yln6j.js";import"./usePopper-BdKXdpb8.js";import"./index-zrmajsre.js";import"./MenuItem-ChgvnhCc.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-VlGptlRu.js";import"./IconCheckMark-B520aOQQ.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-CxtaYhTg.js";import"./Trigger-SlyTZoZ6.js";import"./IconCaretDown-Bj4WZxKG.js";import"./IconCaretDown16-DPOLoDZ8.js";import"./IconCross-qw3ZfYE1.js";import"./IconExclamationMarkTriangle-gBP2crPl.js";import"./IconExclamationMarkTriangle24-LaFkKa3a.js";import"./IconTrashBin16-B-qnlzDI.js";import"./IconTrashBin24-cBVJi1WR.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-BKs_Z6VZ.js";import"./Portal-CCtPellx.js";import"./useMemoizedId-Df0mYjrE.js";import"./FormControl-84pwgQ7U.js";import"./InputLabel-BynWe2eY.js";import"./TooltipIcon-Dw_mQpTa.js";import"./LegacyTooltip-DttKv4lK.js";import"./useLink-BENDotdL.js";import"./IconExclamationMarkCircle24-CpDxWh5c.js";import"./IconQuestionMarkCircle-CHVAx3jv.js";import"./Switch-D0kayeZk.js";import"./TabItem-L0p1LsT0.js";import"./TextInput-BnZMKyuu.js";import"./Tree-Re2vGutZ.js";import"./_Uint8Array-CwPxMkg2.js";import"./useClickOutside-D7WUOaPV.js";import"./dialog-D9O7a7Fm.js";const _t={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},o=u.bind({});o.args={enablePortal:!1};const e=u.bind({});e.args={enablePortal:!0};var i,s,a;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`args => {
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
