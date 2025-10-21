import{r as p,j as e}from"./iframe-DRxQCg9a.js";import{B as j}from"./Button-CIxnSoQq.js";import{C as T}from"./Container-8Bpbg3vZ.js";import{P as c}from"./Popover-BgwQh9cU.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{a as y}from"./IconExclamationMarkTriangle-DQQrK4m0.js";import{I as P}from"./IconJohanna-dLntP1S7.js";import"./preload-helper-B933Jwna.js";import"./useButton-CaY_ggp1.js";import"./useFocusable-8O9dnkeU.js";import"./useFocusRing-CDuBllxv.js";import"./useEffectEvent-C11MyYjR.js";import"./chain-DLnWFCho.js";import"./index-C2BXy0YL.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-C34Bg7KU.js";import"./borderStyle-D9jrV09G.js";import"./input-AJfke0WY.js";import"./Checkbox-CMyJRR04.js";import"./useFormValidationState-lbdngbA6.js";import"./useControlledState-cCHdfjOT.js";import"./InputLabel-BC_NRBMK.js";import"./TooltipIcon-B9nnve_b.js";import"./LegacyTooltip-D7uYac6s.js";import"./useLink-CpQXiALR.js";import"./usePopper-BOynIysI.js";import"./index-CM4_PlpL.js";import"./Portal--C5krueF.js";import"./useMemoizedId-BmgNnHm6.js";import"./IconCheckMark-xBz8T-9Q.js";import"./IconExclamationMarkCircle24-RPPdBWQ5.js";import"./IconQuestionMarkCircle-DRX44Jra.js";import"./IconMinus-BI2n4BJc.js";import"./Divider-DTXwmr9D.js";import"./FormControl-CXqM3mKO.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-DkrT1Noy.js";import"./Switch-BdTgVx8w.js";import"./TabItem-Ch9xLX9r.js";import"./elements-BOYmskOL.js";import"./TextInput-BWQ3LRqh.js";import"./IconCross-CCD_lv3H.js";import"./Tooltip-D34PNnLI.js";import"./useClickOutside-BdAbYC8d.js";import"./EnablePortalWrapper-CxFCl6rm.js";import"./dialog-D9O7a7Fm.js";import"./Tree-bcpaaWBP.js";import"./_Uint8Array-CwPxMkg2.js";import"./IconExclamationMarkTriangle24-DQmQMI4I.js";const ye={title:"Experimental/Popover",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=m=>{const[i,t]=p.useState(!1),n=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(P,{}),onClick:()=>t(!i),ref:n,children:"Trigger"}),e.jsx(c,{...m,anchor:n,open:i,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},k=m=>{const[i,t]=p.useState(!1),n=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{type:"button",ref:n,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(y,{})]}),e.jsx(c,{...m,anchor:n,open:i,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},r=l.bind({});r.args={};const o=k.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const a=l.bind({});a.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
}`,...(C=(x=s.parameters)==null?void 0:x.docs)==null?void 0:C.source}}};var I,v,R;a.parameters={...a.parameters,docs:{...(I=a.parameters)==null?void 0:I.docs,source:{originalSource:`args => {
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
}`,...(R=(v=a.parameters)==null?void 0:v.docs)==null?void 0:R.source}}};const Pe=["TriggeredOnClick","TriggeredOnHover","DarkTheme","WithArrowAndDarkTheme"];export{s as DarkTheme,r as TriggeredOnClick,o as TriggeredOnHover,a as WithArrowAndDarkTheme,Pe as __namedExportsOrder,ye as default};
