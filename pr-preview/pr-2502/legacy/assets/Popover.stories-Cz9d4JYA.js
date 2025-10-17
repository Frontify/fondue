import{r as p,j as e}from"./iframe-C4oRDf00.js";import{B as j}from"./Button-PWCBVfYK.js";import{C as T}from"./Container-BEDvSPFT.js";import{P as c}from"./Popover-CcRnjc6R.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{a as y}from"./IconExclamationMarkTriangle-CyysmFxL.js";import{I as P}from"./IconJohanna-DPZ_ljhi.js";import"./preload-helper-B933Jwna.js";import"./useButton-Y6cWZoe9.js";import"./useFocusable-DaMtZN9H.js";import"./useFocusRing-Cfoq8wro.js";import"./useEffectEvent-vTlljP4j.js";import"./chain-BFYyGSXr.js";import"./index-C2GFe8M8.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-BWpIYFSE.js";import"./borderStyle-D9jrV09G.js";import"./input-Bc_G07yT.js";import"./DialogBody-DEk5hy8F.js";import"./dialog-D9O7a7Fm.js";import"./Divider-C8cRfcZ6.js";import"./Dropdown-DUWRUVei.js";import"./FocusScope-DQFEHFLy.js";import"./useOverlayTriggerState-L7vIiDuI.js";import"./useControlledState-Dt4aAtWN.js";import"./useMenuTrigger-BVyRaPKJ.js";import"./useLabels-CbM2_Ixf.js";import"./useLocalizedStringFormatter-blnl1i68.js";import"./context-BcRBNBSY.js";import"./VisuallyHidden-Bj5e8_W7.js";import"./helper-IakdE2XA.js";import"./keyboard-CyR-BIXM.js";import"./SelectionManager-D4_ZQnS-.js";import"./useField-CY0QFutb.js";import"./useFormValidationState-BFKh7Upf.js";import"./usePopper-oEgZSIdK.js";import"./index-pkMoDo0F.js";import"./MenuItem-ICxexfNS.js";import"./IconCaretRight-Boy6Hij2.js";import"./IconCheckMark-CdXL73bS.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-D7ecF-OQ.js";import"./Trigger-wHjcz8EF.js";import"./IconCaretDown-B7rtaYOu.js";import"./IconCaretDown16-B36G00fo.js";import"./IconCross-CGngu9gm.js";import"./IconTrashBin16-BH2hEHIY.js";import"./IconTrashBin24-DvFCY5K4.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-BJveQmLF.js";import"./Portal-Ca2NGuOZ.js";import"./useMemoizedId-A1bQAbDX.js";import"./FormControl-qigTchXL.js";import"./InputLabel-BMNa0YCt.js";import"./TooltipIcon-DuZRyfzt.js";import"./LegacyTooltip-DIWZRn-L.js";import"./useLink-CAaZ-YI_.js";import"./IconExclamationMarkCircle24-BU0c1aoh.js";import"./IconQuestionMarkCircle-Dymvr5cg.js";import"./Switch-B_KgIiqf.js";import"./TabItem-DZAsVXzH.js";import"./TextInput-YBFtltCu.js";import"./Tooltip--tXYZ45_.js";import"./useClickOutside-DvXyCqyI.js";import"./Tree-CAPrKYGD.js";import"./_Uint8Array-CwPxMkg2.js";import"./IconExclamationMarkTriangle24-B9Jh6rAf.js";const Ge={title:"Experimental/Popover",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=m=>{const[a,t]=p.useState(!1),r=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(P,{}),onClick:()=>t(!a),ref:r,children:"Trigger"}),e.jsx(c,{...m,anchor:r,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},k=m=>{const[a,t]=p.useState(!1),r=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{type:"button",ref:r,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(y,{})]}),e.jsx(c,{...m,anchor:r,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},n=l.bind({});n.args={};const o=k.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const i=l.bind({});i.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  return <div className="tw-h-32 tw-flex tw-justify-center tw-items-center">
            <Button icon={<IconJohanna />} onClick={() => setIsOpen(!isOpen)} ref={triggerRef}>
                Trigger
            </Button>
            <Popover {...args} anchor={triggerRef} open={isOpen} handleClose={() => setIsOpen(false)}>
                <Container padding={8}>
                    <p>Some Content</p>
                </Container>
            </Popover>
        </div>;
}`,...(g=(d=n.parameters)==null?void 0:d.docs)==null?void 0:g.source}}};var f,h,O;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`args => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  return <div className="tw-h-32 tw-flex tw-justify-center tw-items-center">
            <button type="button" ref={triggerRef} className="tw-flex tw-items-center" onMouseEnter={() => setIsOpen(true)} onFocus={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)} onBlur={() => setIsOpen(false)}>
                <span className="tw-mr-1">Information</span> <IconExclamationMarkTriangle16 />
            </button>
            <Popover {...args} anchor={triggerRef} open={isOpen} handleClose={() => setIsOpen(false)}>
                <Container padding={8}>
                    <p>Some Content</p>
                </Container>
            </Popover>
        </div>;
}`,...(O=(h=o.parameters)==null?void 0:h.docs)==null?void 0:O.source}}};var w,x,C;s.parameters={...s.parameters,docs:{...(w=s.parameters)==null?void 0:w.docs,source:{originalSource:`args => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  return <div className="tw-h-32 tw-flex tw-justify-center tw-items-center">
            <Button icon={<IconJohanna />} onClick={() => setIsOpen(!isOpen)} ref={triggerRef}>
                Trigger
            </Button>
            <Popover {...args} anchor={triggerRef} open={isOpen} handleClose={() => setIsOpen(false)}>
                <Container padding={8}>
                    <p>Some Content</p>
                </Container>
            </Popover>
        </div>;
}`,...(C=(x=s.parameters)==null?void 0:x.docs)==null?void 0:C.source}}};var I,v,R;i.parameters={...i.parameters,docs:{...(I=i.parameters)==null?void 0:I.docs,source:{originalSource:`args => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  return <div className="tw-h-32 tw-flex tw-justify-center tw-items-center">
            <Button icon={<IconJohanna />} onClick={() => setIsOpen(!isOpen)} ref={triggerRef}>
                Trigger
            </Button>
            <Popover {...args} anchor={triggerRef} open={isOpen} handleClose={() => setIsOpen(false)}>
                <Container padding={8}>
                    <p>Some Content</p>
                </Container>
            </Popover>
        </div>;
}`,...(R=(v=i.parameters)==null?void 0:v.docs)==null?void 0:R.source}}};const Ye=["TriggeredOnClick","TriggeredOnHover","DarkTheme","WithArrowAndDarkTheme"];export{s as DarkTheme,n as TriggeredOnClick,o as TriggeredOnHover,i as WithArrowAndDarkTheme,Ye as __namedExportsOrder,Ge as default};
