import{r as p,j as e}from"./iframe-MoBs3oke.js";import{B as j}from"./Button-CHSQ5G04.js";import{C as T}from"./Container-CbgK7SUc.js";import{P as c}from"./Popover-B-2-mAYp.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{a as y}from"./IconExclamationMarkTriangle-Q8ertc4w.js";import{I as P}from"./IconJohanna-BsvqMck9.js";import"./preload-helper-B933Jwna.js";import"./useButton-C5tY8d-2.js";import"./useFocusable-CXK0fL0G.js";import"./useFocusRing-2zpbRi_h.js";import"./useEffectEvent-B10gOIRQ.js";import"./chain-bxVqvEcS.js";import"./index-XNeqmIYg.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-BBpNHmR5.js";import"./borderStyle-D9jrV09G.js";import"./input-Vnz1g2HA.js";import"./DialogBody-B9R5tIxS.js";import"./dialog-D9O7a7Fm.js";import"./Divider-BiSgeS5Z.js";import"./Dropdown-BZzjCJXd.js";import"./FocusScope-AHMkJDTf.js";import"./useOverlayTriggerState-CBCaqV4y.js";import"./useControlledState-BMEIdEBn.js";import"./useMenuTrigger-Cfg04eQV.js";import"./useLabels-DVbtlKZe.js";import"./useLocalizedStringFormatter-CkHgGyi4.js";import"./context-DuKYVhKu.js";import"./VisuallyHidden-DQNXk2fv.js";import"./helper-BqzIPBnA.js";import"./keyboard-Bh-3d-67.js";import"./SelectionManager-BeylGFv3.js";import"./useField-URXo4TDX.js";import"./useFormValidationState-iA7Vh-Q-.js";import"./usePopper-BG1lwv8D.js";import"./index-DaGbxSuI.js";import"./MenuItem-DHR5LbTg.js";import"./IconCaretRight-BNCvjaUk.js";import"./IconCheckMark-Dq94ZI-W.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-CeR8qJR0.js";import"./Trigger-CtQV1a50.js";import"./IconCaretDown-KuloZ5wo.js";import"./IconCaretDown16-Bd0YWETo.js";import"./IconCross-Drpj3pyS.js";import"./IconTrashBin16-DW5TDvsW.js";import"./IconTrashBin24-M6xuWU20.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-qB3CI-P9.js";import"./Portal-DqGP2ziF.js";import"./useMemoizedId-IOJoatZ5.js";import"./FormControl-CesNQFPy.js";import"./InputLabel-CXvfWDQS.js";import"./TooltipIcon-Dt5djrIf.js";import"./LegacyTooltip--XkvheMY.js";import"./useLink-BCZ4_2_m.js";import"./IconExclamationMarkCircle24-sI7DpcuD.js";import"./IconQuestionMarkCircle-Bm_G3GHX.js";import"./Switch-B69oNbL0.js";import"./TabItem-BL2HOdhs.js";import"./TextInput-Yo756f2e.js";import"./Tooltip-B25CwDsd.js";import"./useClickOutside-XWlSsuBV.js";import"./Tree-C4Hqtk5X.js";import"./_Uint8Array-CwPxMkg2.js";import"./IconExclamationMarkTriangle24-B9dRqTTK.js";const Ge={title:"Experimental/Popover",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=m=>{const[a,t]=p.useState(!1),r=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(P,{}),onClick:()=>t(!a),ref:r,children:"Trigger"}),e.jsx(c,{...m,anchor:r,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},k=m=>{const[a,t]=p.useState(!1),r=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{type:"button",ref:r,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(y,{})]}),e.jsx(c,{...m,anchor:r,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},n=l.bind({});n.args={};const o=k.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const i=l.bind({});i.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
