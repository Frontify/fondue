import{r as p,j as t}from"./iframe-DkeuAZGN.js";import{a as b}from"./Box-CKSPIqz1.js";import{B as h}from"./Button-Cyg2loOs.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-BWUoNyF1.js";import"./preload-helper-CG1F6kIz.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-x2DM1voP.js";import"./Divider-BOKamc1v.js";import"./Dropdown-Dz6KAcG4.js";import"./useButton-DMxfMeHO.js";import"./useFocusable-BFcWdvIz.js";import"./useFocusRing-DV1ndlYm.js";import"./useEffectEvent-p_mtkbDO.js";import"./chain-CAdXsIYK.js";import"./index-DGl5uXCK.js";import"./FocusScope-CWLvvfZj.js";import"./useOverlayTriggerState-DfyYWZfM.js";import"./useControlledState-BMnYmkPp.js";import"./useMenuTrigger-CSYe2A-2.js";import"./useLabels-a9mHBJ4N.js";import"./useLocalizedStringFormatter-DZ9hskvU.js";import"./context-CwvE4v2V.js";import"./VisuallyHidden-B2MJ5_a1.js";import"./helper-CaAYgyFI.js";import"./keyboard-Cy4ODuoA.js";import"./SelectionManager-DzET1wUq.js";import"./useField-BLvA30x0.js";import"./useFormValidationState-Bfsywdbb.js";import"./usePopper-DJ8Ra6pa.js";import"./index-QN_6ztFs.js";import"./MenuItem-cnoEN4N-.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-DbFwzl53.js";import"./IconCheckMark-BiPkWBUo.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-DcHgqeRw.js";import"./Trigger-g-PSolXT.js";import"./IconCaretDown-DYgzH1Dj.js";import"./IconCaretDown16-z4g6R74Y.js";import"./IconCross-BAyIl8km.js";import"./IconExclamationMarkTriangle-BJT3VxjX.js";import"./IconExclamationMarkTriangle24-WjiVeEOa.js";import"./IconTrashBin16-BbxXYwm0.js";import"./IconTrashBin24-De7vrx_E.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-9dEMfA_M.js";import"./Portal-BMGHkKMU.js";import"./useMemoizedId-nou-DeIg.js";import"./FormControl-Cr4pEOLe.js";import"./InputLabel-g3xE7uYS.js";import"./TooltipIcon-CTQIKmsd.js";import"./LegacyTooltip-DhsEbG6A.js";import"./useLink-D_dJZrWN.js";import"./IconExclamationMarkCircle24-Dc8IlBFK.js";import"./IconQuestionMarkCircle-BTA8lui4.js";import"./Switch-C_UZItiR.js";import"./TabItem-nV4RBMGC.js";import"./TextInput-DJpfvaHj.js";import"./Tree-DhyCmg2e.js";import"./_Uint8Array-CwPxMkg2.js";import"./useClickOutside-DnmkQ4-b.js";import"./dialog-D9O7a7Fm.js";const _t={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},o=u.bind({});o.args={enablePortal:!1};const e=u.bind({});e.args={enablePortal:!0};var i,s,a;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`args => {
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
