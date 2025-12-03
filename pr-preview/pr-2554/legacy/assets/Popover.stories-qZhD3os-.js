import{r as p,j as e}from"./iframe-B6gvnC9G.js";import{B as j}from"./Button-U5VlevU2.js";import{C as T}from"./Container-Bqj_i1zb.js";import{P as c}from"./Popover-8I_o9lZx.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{a as y}from"./IconExclamationMarkTriangle-BIGUCjg0.js";import{I as P}from"./IconIcon-xo_-0px2.js";import"./preload-helper-1L8wWKLL.js";import"./useButton-Csf4pE_W.js";import"./useFocusable-BFOTHm5b.js";import"./useFocusRing-lDQQmtVG.js";import"./useEffectEvent-Br9oWhz1.js";import"./chain-DkU4Parx.js";import"./index-Ca3jtKOM.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-D2ZqmUHl.js";import"./borderStyle-D9jrV09G.js";import"./input-g2tGremA.js";import"./Checkbox-D6vyio4z.js";import"./useFormValidationState-D8jGKcTw.js";import"./useControlledState-BGX5OVF3.js";import"./InputLabel-Piz3csh8.js";import"./TooltipIcon-u9szC1VU.js";import"./LegacyTooltip-CUQq3jNY.js";import"./useLink-DpQXp-4I.js";import"./usePopper-D6IpfkbE.js";import"./index-Bkk43B7y.js";import"./Portal-FN-7ZB7K.js";import"./useMemoizedId-CoFSyPjm.js";import"./IconCheckMark-CJRGY1pq.js";import"./IconExclamationMarkCircle24-dSHdz95B.js";import"./IconQuestionMarkCircle-Dl_P1dkt.js";import"./IconMinus-CFenzC2Z.js";import"./Divider-C1YILpIw.js";import"./FormControl-DYPrqQx1.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-CDo8ljLK.js";import"./Switch-BlEQeOTC.js";import"./TabItem-Db1inNG6.js";import"./elements-BOYmskOL.js";import"./TextInput-ByQEBCRv.js";import"./IconCross-v4Os9_kc.js";import"./Tooltip-lCQmm1Hl.js";import"./useClickOutside--V2jy9Qc.js";import"./EnablePortalWrapper-C9__I8yL.js";import"./dialog-D9O7a7Fm.js";import"./Tree-q-pdklRr.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-CN1tEa_w.js";import"./IconCaretDown-CPNCjoYn.js";import"./IconCaretDown16-DnxqvEec.js";import"./IconTrashBin16-Cy7a5y_v.js";import"./IconTrashBin24-Cvl42CmC.js";import"./IconExclamationMarkTriangle24-BTWBP6oJ.js";import"./IconIcon16-o3EkPJXe.js";import"./IconIcon24-DCDjMDzQ.js";const Ne={title:"Experimental/Popover",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=m=>{const[a,t]=p.useState(!1),r=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(P,{}),onClick:()=>t(!a),ref:r,children:"Trigger"}),e.jsx(c,{...m,anchor:r,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},k=m=>{const[a,t]=p.useState(!1),r=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{type:"button",ref:r,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(y,{})]}),e.jsx(c,{...m,anchor:r,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},n=l.bind({});n.args={};const o=k.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const i=l.bind({});i.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
}`,...(R=(v=i.parameters)==null?void 0:v.docs)==null?void 0:R.source}}};const Ae=["TriggeredOnClick","TriggeredOnHover","DarkTheme","WithArrowAndDarkTheme"];export{s as DarkTheme,n as TriggeredOnClick,o as TriggeredOnHover,i as WithArrowAndDarkTheme,Ae as __namedExportsOrder,Ne as default};
