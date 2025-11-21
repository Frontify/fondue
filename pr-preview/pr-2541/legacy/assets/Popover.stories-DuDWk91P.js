import{r as p,j as e}from"./iframe-LEv1GSvY.js";import{B as j}from"./Button-DUwtZbrH.js";import{C as T}from"./Container-DNXqodoD.js";import{P as c}from"./Popover-CVqLcDDz.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{a as y}from"./IconExclamationMarkTriangle-BcYnUjX4.js";import{I as P}from"./IconIcon-QWYlbl83.js";import"./preload-helper-DlITqhEh.js";import"./useButton-Cr6sqSYQ.js";import"./useFocusable-stfJeIpU.js";import"./useFocusRing-CmQWnBCR.js";import"./useEffectEvent-g570qV22.js";import"./chain-BYYKUROJ.js";import"./index-w8RZ3Xa7.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-CBJfGyR5.js";import"./borderStyle-D9jrV09G.js";import"./input-B4VXuL7P.js";import"./Checkbox-BGN2gp-7.js";import"./useFormValidationState-OkvhBaTv.js";import"./useControlledState-B2DC-eKR.js";import"./InputLabel-DxuW7zDn.js";import"./TooltipIcon-CV8X81_I.js";import"./LegacyTooltip-o5Kd4SF7.js";import"./useLink-saIWG3I9.js";import"./usePopper-C2pndz_I.js";import"./index-CgWYneLo.js";import"./Portal-Bl2R-8KJ.js";import"./useMemoizedId-YPBy6EbL.js";import"./IconCheckMark-DuN6dQH8.js";import"./IconExclamationMarkCircle24-jUU22MCT.js";import"./IconQuestionMarkCircle-BRsB91tC.js";import"./IconMinus-BOXaew8y.js";import"./FormControl-CNZZySl_.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-BwNxSYA8.js";import"./Switch-RSq4JAMI.js";import"./TabItem-DHWxiMih.js";import"./elements-BOYmskOL.js";import"./TextInput-CW45iaTr.js";import"./IconCross-DVGcdwIR.js";import"./Tooltip-C5O3PABQ.js";import"./useClickOutside-C4Y6OvTA.js";import"./EnablePortalWrapper-DvmytOZ7.js";import"./dialog-D9O7a7Fm.js";import"./Tree-BtUxV5Iu.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-B6ThISim.js";import"./IconCaretDown-Bq-EReh4.js";import"./IconCaretDown16-DcQxwk-i.js";import"./IconTrashBin16-xy03U9Qa.js";import"./IconTrashBin24-Dx0UE5Kn.js";import"./IconExclamationMarkTriangle24-DU65-zzt.js";import"./IconIcon16-H1gL3hnN.js";import"./IconIcon24-BmDnYPhf.js";const Me={title:"Experimental/Popover",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=m=>{const[a,t]=p.useState(!1),r=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(P,{}),onClick:()=>t(!a),ref:r,children:"Trigger"}),e.jsx(c,{...m,anchor:r,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},k=m=>{const[a,t]=p.useState(!1),r=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{type:"button",ref:r,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(y,{})]}),e.jsx(c,{...m,anchor:r,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},n=l.bind({});n.args={};const o=k.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const i=l.bind({});i.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
}`,...(R=(v=i.parameters)==null?void 0:v.docs)==null?void 0:R.source}}};const Ne=["TriggeredOnClick","TriggeredOnHover","DarkTheme","WithArrowAndDarkTheme"];export{s as DarkTheme,n as TriggeredOnClick,o as TriggeredOnHover,i as WithArrowAndDarkTheme,Ne as __namedExportsOrder,Me as default};
