import{r as a,j as e}from"./iframe-BAs66q-y.js";import{B as j}from"./Button-DiFEGYOd.js";import{C as T}from"./Container-BaNI128Q.js";import{P as c}from"./Popover-C5_o3-Qy.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{a as y}from"./IconExclamationMarkTriangle-CUgf1hN4.js";import{I as P}from"./IconIcon-BfBLbMWD.js";import"./preload-helper-DyHTrhc7.js";import"./useButton-CYVFW046.js";import"./useFocusable-sCR6hlmP.js";import"./useFocusRing-DtTNLt6b.js";import"./useEffectEvent-DUywcjoj.js";import"./chain-DnRJsLVr.js";import"./index-Bh1fiD1s.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-Czuxq3f_.js";import"./borderStyle-D9jrV09G.js";import"./input-Df4HuyWW.js";import"./Divider-BHk6ADaB.js";import"./Dropdown-CyVeFiwv.js";import"./FocusScope-D9HFzMt2.js";import"./useOverlayTriggerState-D6F0qxv5.js";import"./useControlledState-DJ95kXMR.js";import"./useMenuTrigger-DjMW7zZh.js";import"./useLabels-Dg7dxfz3.js";import"./useLocalizedStringFormatter-CwIUowm7.js";import"./context-BqDYnsXe.js";import"./VisuallyHidden-BsEKTHRO.js";import"./helper-BgMr6a0O.js";import"./keyboard-PIaYjKXa.js";import"./SelectionManager-B__P9tjp.js";import"./useField-CzlnO5I0.js";import"./useFormValidationState-C3ThlA5x.js";import"./usePopper-DnwQV-I2.js";import"./index-DAF0bHRr.js";import"./MenuItem-CvekQis2.js";import"./IconCaretRight-B83ypG7N.js";import"./IconCheckMark-ClJoYzcd.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-stetqMeh.js";import"./Trigger-BmWuE7Ap.js";import"./IconCaretDown-BgNMmECk.js";import"./IconCaretDown16-C3ruKkfy.js";import"./IconCross-DQtaiSeo.js";import"./IconTrashBin16-OauIEEpQ.js";import"./IconTrashBin24-CQB4zbX2.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-Bz-0KfR0.js";import"./Portal-CZvTnhKZ.js";import"./useMemoizedId-4MNB7gNb.js";import"./FormControl-8DuxOAbG.js";import"./InputLabel-D4el736C.js";import"./TooltipIcon-BgDhRiQe.js";import"./LegacyTooltip-B4izmg71.js";import"./useLink-dheUg-NM.js";import"./IconExclamationMarkCircle24-DerCV26r.js";import"./IconQuestionMarkCircle-CjKqKFR0.js";import"./Switch-DEUU4lT2.js";import"./TabItem-C-Hm3P-3.js";import"./TextInput-BL5oiPXa.js";import"./Tooltip-PuWPc4b0.js";import"./useClickOutside-C7qyTSbO.js";import"./dialog-D9O7a7Fm.js";import"./Tree-uW6T6fR6.js";import"./_Uint8Array-CwPxMkg2.js";import"./IconExclamationMarkTriangle24-fIc-6H-A.js";import"./IconIcon16-B6wo4Wzb.js";import"./IconIcon24-BmOp81ZF.js";const qe={title:"Experimental/Popover",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=m=>{const[p,t]=a.useState(!1),r=a.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(P,{}),onClick:()=>t(!p),ref:r,children:"Trigger"}),e.jsx(c,{...m,anchor:r,open:p,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},k=m=>{const[p,t]=a.useState(!1),r=a.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{type:"button",ref:r,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(y,{})]}),e.jsx(c,{...m,anchor:r,open:p,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},n=l.bind({});n.args={};const o=k.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const i=l.bind({});i.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  return <div className="tw-h-32 tw-flex tw-justify-center tw-items-center">
            <Button icon={<IconIcon />} onClick={() => setIsOpen(!isOpen)} ref={triggerRef}>
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
}`,...(O=(h=o.parameters)==null?void 0:h.docs)==null?void 0:O.source}}};var w,I,x;s.parameters={...s.parameters,docs:{...(w=s.parameters)==null?void 0:w.docs,source:{originalSource:`args => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  return <div className="tw-h-32 tw-flex tw-justify-center tw-items-center">
            <Button icon={<IconIcon />} onClick={() => setIsOpen(!isOpen)} ref={triggerRef}>
                Trigger
            </Button>
            <Popover {...args} anchor={triggerRef} open={isOpen} handleClose={() => setIsOpen(false)}>
                <Container padding={8}>
                    <p>Some Content</p>
                </Container>
            </Popover>
        </div>;
}`,...(x=(I=s.parameters)==null?void 0:I.docs)==null?void 0:x.source}}};var C,v,R;i.parameters={...i.parameters,docs:{...(C=i.parameters)==null?void 0:C.docs,source:{originalSource:`args => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  return <div className="tw-h-32 tw-flex tw-justify-center tw-items-center">
            <Button icon={<IconIcon />} onClick={() => setIsOpen(!isOpen)} ref={triggerRef}>
                Trigger
            </Button>
            <Popover {...args} anchor={triggerRef} open={isOpen} handleClose={() => setIsOpen(false)}>
                <Container padding={8}>
                    <p>Some Content</p>
                </Container>
            </Popover>
        </div>;
}`,...(R=(v=i.parameters)==null?void 0:v.docs)==null?void 0:R.source}}};const Je=["TriggeredOnClick","TriggeredOnHover","DarkTheme","WithArrowAndDarkTheme"];export{s as DarkTheme,n as TriggeredOnClick,o as TriggeredOnHover,i as WithArrowAndDarkTheme,Je as __namedExportsOrder,qe as default};
