import{r as p,j as e}from"./iframe-BsrH74wW.js";import{B as j}from"./Button-Ca7IJx5d.js";import{C as T}from"./Container-CFvLfMcp.js";import{P as c}from"./Popover-BJE_KCY0.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{a as y}from"./IconExclamationMarkTriangle-Bu22p--y.js";import{I as P}from"./IconJohanna-mJLCPGVa.js";import"./preload-helper-B933Jwna.js";import"./useButton-PikOkiBX.js";import"./useFocusable-D4UOYfqs.js";import"./useFocusRing-hWS3vXVU.js";import"./useEffectEvent-BNtJsWpB.js";import"./chain-F-BtQllU.js";import"./index-BuHowFQm.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-BoU9j_-M.js";import"./borderStyle-D9jrV09G.js";import"./input-CMubI7vX.js";import"./DialogBody-ZzDA7jur.js";import"./dialog-D9O7a7Fm.js";import"./Dropdown-vrNjwJ4t.js";import"./FocusScope-D-MiZ49_.js";import"./useOverlayTriggerState-CQObmmI1.js";import"./useControlledState-B5iqGSbV.js";import"./useMenuTrigger-DHg7FuWy.js";import"./useLabels-DykprWij.js";import"./useLocalizedStringFormatter-BnBHXZ2i.js";import"./context-WDB9iL2j.js";import"./VisuallyHidden-DoRJ1ABU.js";import"./helper-BASIhnZe.js";import"./keyboard-DY2UNgnm.js";import"./SelectionManager-dybXC34z.js";import"./useField-Dzkf9Z-B.js";import"./useFormValidationState-XqvpKhv-.js";import"./usePopper-D4H62yBu.js";import"./index-BVx1uj1e.js";import"./MenuItem-Dw6fhHFt.js";import"./IconCaretRight-C5TlupxE.js";import"./IconCheckMark-BonruZ95.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-s8Rinl8F.js";import"./Trigger-DYPmnBhX.js";import"./IconCaretDown-ClCIJDke.js";import"./IconCaretDown16-V3Dju6dr.js";import"./IconCross-BWIuzEwt.js";import"./IconTrashBin16-DlVR9DwO.js";import"./IconTrashBin24-Clf_HqQZ.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-IRN-cTF_.js";import"./Portal-BJaQAvNu.js";import"./useMemoizedId-JCqlWWiP.js";import"./FormControl-DCqfzu6M.js";import"./InputLabel-BeG_0hG4.js";import"./TooltipIcon-a-cgVA81.js";import"./LegacyTooltip-w6VRqQyz.js";import"./useLink-N5D_jC9v.js";import"./IconExclamationMarkCircle24-onFYI8CK.js";import"./IconQuestionMarkCircle-DvRcLFtP.js";import"./Switch-CAzpIv7f.js";import"./TabItem-C5L6J1Pg.js";import"./TextInput-B5tiVWeN.js";import"./Tooltip-BHVUW8DF.js";import"./useClickOutside-BoYLtvpE.js";import"./Tree-BK8uNI6q.js";import"./_Uint8Array-CwPxMkg2.js";import"./IconExclamationMarkTriangle24-D4qPWYL4.js";const ze={title:"Experimental/Popover",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=m=>{const[a,t]=p.useState(!1),r=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(P,{}),onClick:()=>t(!a),ref:r,children:"Trigger"}),e.jsx(c,{...m,anchor:r,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},k=m=>{const[a,t]=p.useState(!1),r=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{type:"button",ref:r,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(y,{})]}),e.jsx(c,{...m,anchor:r,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},n=l.bind({});n.args={};const o=k.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const i=l.bind({});i.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
}`,...(R=(v=i.parameters)==null?void 0:v.docs)==null?void 0:R.source}}};const Ge=["TriggeredOnClick","TriggeredOnHover","DarkTheme","WithArrowAndDarkTheme"];export{s as DarkTheme,n as TriggeredOnClick,o as TriggeredOnHover,i as WithArrowAndDarkTheme,Ge as __namedExportsOrder,ze as default};
