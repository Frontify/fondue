import{r as p,j as t}from"./iframe-BsrH74wW.js";import{a as b}from"./Box-BoU9j_-M.js";import{B as h}from"./Button-Ca7IJx5d.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-BHVUW8DF.js";import"./preload-helper-B933Jwna.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-CMubI7vX.js";import"./DialogBody-ZzDA7jur.js";import"./dialog-D9O7a7Fm.js";import"./Dropdown-vrNjwJ4t.js";import"./useButton-PikOkiBX.js";import"./useFocusable-D4UOYfqs.js";import"./useFocusRing-hWS3vXVU.js";import"./useEffectEvent-BNtJsWpB.js";import"./chain-F-BtQllU.js";import"./index-BuHowFQm.js";import"./FocusScope-D-MiZ49_.js";import"./useOverlayTriggerState-CQObmmI1.js";import"./useControlledState-B5iqGSbV.js";import"./useMenuTrigger-DHg7FuWy.js";import"./useLabels-DykprWij.js";import"./useLocalizedStringFormatter-BnBHXZ2i.js";import"./context-WDB9iL2j.js";import"./VisuallyHidden-DoRJ1ABU.js";import"./helper-BASIhnZe.js";import"./keyboard-DY2UNgnm.js";import"./SelectionManager-dybXC34z.js";import"./useField-Dzkf9Z-B.js";import"./useFormValidationState-XqvpKhv-.js";import"./usePopper-D4H62yBu.js";import"./index-BVx1uj1e.js";import"./MenuItem-Dw6fhHFt.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-C5TlupxE.js";import"./IconCheckMark-BonruZ95.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-s8Rinl8F.js";import"./Trigger-DYPmnBhX.js";import"./IconCaretDown-ClCIJDke.js";import"./IconCaretDown16-V3Dju6dr.js";import"./IconCross-BWIuzEwt.js";import"./IconExclamationMarkTriangle-Bu22p--y.js";import"./IconExclamationMarkTriangle24-D4qPWYL4.js";import"./IconTrashBin16-DlVR9DwO.js";import"./IconTrashBin24-Clf_HqQZ.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-IRN-cTF_.js";import"./Portal-BJaQAvNu.js";import"./useMemoizedId-JCqlWWiP.js";import"./FormControl-DCqfzu6M.js";import"./InputLabel-BeG_0hG4.js";import"./TooltipIcon-a-cgVA81.js";import"./LegacyTooltip-w6VRqQyz.js";import"./useLink-N5D_jC9v.js";import"./IconExclamationMarkCircle24-onFYI8CK.js";import"./IconQuestionMarkCircle-DvRcLFtP.js";import"./Switch-CAzpIv7f.js";import"./TabItem-C5L6J1Pg.js";import"./TextInput-B5tiVWeN.js";import"./Tree-BK8uNI6q.js";import"./_Uint8Array-CwPxMkg2.js";import"./useClickOutside-BoYLtvpE.js";const _t={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=p.useState(!1),n=p.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},o=u.bind({});o.args={enablePortal:!1};const e=u.bind({});e.args={enablePortal:!0};var i,s,a;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`args => {
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
