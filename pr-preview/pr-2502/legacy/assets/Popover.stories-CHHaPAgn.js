import{r as p,j as e}from"./iframe-DZsoqIQH.js";import{B as j}from"./Button-DjeFZAKL.js";import{C as T}from"./Container-DQv2jtkR.js";import{P as c}from"./Popover-BtMx3Avr.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{a as y}from"./IconExclamationMarkTriangle-BqNXwrRl.js";import{I as P}from"./IconJohanna-B6FA6CsW.js";import"./preload-helper-B933Jwna.js";import"./useButton-BxuZFr2v.js";import"./useFocusable-w9vBw5vf.js";import"./useFocusRing-DbKjnAj0.js";import"./useEffectEvent-D8w6sK6J.js";import"./chain-VSjaRpoC.js";import"./index-B1yy6L_0.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-BhZbAWvx.js";import"./borderStyle-D9jrV09G.js";import"./input-Hg_Jq5aN.js";import"./FormControl-jeH6ufrc.js";import"./InputLabel-CkXbkHdM.js";import"./TooltipIcon-CjIWgR0R.js";import"./LegacyTooltip-ClEwPHV5.js";import"./useLink-xEXBuUvC.js";import"./usePopper-BgKvnTxb.js";import"./index-Bz3rgcYf.js";import"./Portal-CN1TagRk.js";import"./useMemoizedId-Bl8d1xLN.js";import"./IconCheckMark-BHBJzH8F.js";import"./IconExclamationMarkCircle24-DDwDRcD9.js";import"./IconQuestionMarkCircle-CkUpDNDy.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-fy3UZfJY.js";import"./Switch-D1rFuCfK.js";import"./TabItem-CC4j3WN4.js";import"./elements-BOYmskOL.js";import"./TextInput-BsRYT8lu.js";import"./IconCross-DPfWkxZJ.js";import"./Tooltip-C1plt_3w.js";import"./useClickOutside-D1vWzB1y.js";import"./EnablePortalWrapper-DBbHCB_v.js";import"./dialog-D9O7a7Fm.js";import"./Tree-DDNvcnCv.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-BC-kZGBQ.js";import"./IconCaretDown-DmwJmvvT.js";import"./IconCaretDown16-Dvjt7Ada.js";import"./IconTrashBin16-kjeqw6-L.js";import"./IconTrashBin24-DN5n-TpR.js";import"./IconExclamationMarkTriangle24-C0GN7WvG.js";const ye={title:"Experimental/Popover",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=m=>{const[i,t]=p.useState(!1),n=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(P,{}),onClick:()=>t(!i),ref:n,children:"Trigger"}),e.jsx(c,{...m,anchor:n,open:i,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},k=m=>{const[i,t]=p.useState(!1),n=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{type:"button",ref:n,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(y,{})]}),e.jsx(c,{...m,anchor:n,open:i,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},r=l.bind({});r.args={};const o=k.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const a=l.bind({});a.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
