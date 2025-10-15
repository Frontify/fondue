import{r as p,j as e}from"./iframe-sarzTi8L.js";import{B as j}from"./Button-V9rFQHqA.js";import{C as T}from"./Container-DJRpKg0k.js";import{P as c}from"./Popover-LVIvcx_Q.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{a as y}from"./IconExclamationMarkTriangle-D_Bn4azM.js";import{I as P}from"./IconJohanna-DlYMMGV6.js";import"./preload-helper-D7hvLZ4Y.js";import"./useButton-BfqVDKT2.js";import"./useFocusable-BZQrvG5Y.js";import"./useFocusRing-CJslZTVh.js";import"./useEffectEvent-DXJV4zsr.js";import"./chain-MnvsB7gO.js";import"./index-DJJW3p-i.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-CyBGUzcO.js";import"./borderStyle-D9jrV09G.js";import"./input-D4wH6B5Q.js";import"./Checkbox-6y-EpNiA.js";import"./useFormValidationState-4Te4vK6C.js";import"./useControlledState-B6Tx6Nhk.js";import"./InputLabel-DuLcCPUV.js";import"./TooltipIcon-BjXJdlzR.js";import"./LegacyTooltip-C-HQV77A.js";import"./useLink-Y2z5Scob.js";import"./usePopper-Ck-CZu4g.js";import"./index-D2Z16GHo.js";import"./Portal-CFiQojYp.js";import"./useMemoizedId-C2H8E_mU.js";import"./IconCheckMark-B35tL5o7.js";import"./IconExclamationMarkCircle24-BJNv-ZIi.js";import"./IconQuestionMarkCircle-Shiv9VzZ.js";import"./IconMinus-DrINymAZ.js";import"./FormControl-B-YAd-L_.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-B6EIods_.js";import"./Switch-DabsP_E8.js";import"./TabItem-BlJOjUxn.js";import"./elements-BOYmskOL.js";import"./TextInput-CyegwwzZ.js";import"./IconCross-B83ZgxXS.js";import"./Tooltip-Dcr_vg-B.js";import"./useClickOutside-DN9tvAKQ.js";import"./EnablePortalWrapper-KCbmKcGa.js";import"./dialog-D9O7a7Fm.js";import"./Tree-CPQWooIF.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-DpjUExqf.js";import"./IconCaretDown-JRJFTHDc.js";import"./IconCaretDown16-Dr5y3NF-.js";import"./IconTrashBin16-B1LvMOjZ.js";import"./IconTrashBin24-yZhZCG6Y.js";import"./IconExclamationMarkTriangle24-l8-Sm8AF.js";const be={title:"Experimental/Popover",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=m=>{const[a,t]=p.useState(!1),n=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(P,{}),onClick:()=>t(!a),ref:n,children:"Trigger"}),e.jsx(c,{...m,anchor:n,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},k=m=>{const[a,t]=p.useState(!1),n=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{type:"button",ref:n,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(y,{})]}),e.jsx(c,{...m,anchor:n,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},r=l.bind({});r.args={};const o=k.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const i=l.bind({});i.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
}`,...(g=(d=r.parameters)==null?void 0:d.docs)==null?void 0:g.source}}};var f,h,O;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`args => {
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
}`,...(R=(v=i.parameters)==null?void 0:v.docs)==null?void 0:R.source}}};const Ee=["TriggeredOnClick","TriggeredOnHover","DarkTheme","WithArrowAndDarkTheme"];export{s as DarkTheme,r as TriggeredOnClick,o as TriggeredOnHover,i as WithArrowAndDarkTheme,Ee as __namedExportsOrder,be as default};
