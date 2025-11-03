import{r as p,j as e}from"./iframe-c512yrIH.js";import{B as j}from"./Button-CQ2twKwQ.js";import{C as T}from"./Container-BLO8z0cg.js";import{P as c}from"./Popover-CCBoXmPd.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{a as y}from"./IconExclamationMarkTriangle-D0OAcy7G.js";import{I as P}from"./IconIcon-e7_Ntrop.js";import"./preload-helper-DuVWtNEG.js";import"./useButton-B443xHOa.js";import"./useFocusable-CF9RzjNn.js";import"./useFocusRing-pRW46DX8.js";import"./useEffectEvent-DKu7Utjh.js";import"./chain-CfHjZEmK.js";import"./index-BPiDMcMS.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-Bg-lACQJ.js";import"./borderStyle-D9jrV09G.js";import"./input-DAbnrn4s.js";import"./Checkbox-VGd323Ci.js";import"./useFormValidationState-yuQ204mm.js";import"./useControlledState-C0RSaY3j.js";import"./InputLabel-B86WLvjV.js";import"./TooltipIcon-BTYBy4eU.js";import"./LegacyTooltip-nkYMLArH.js";import"./useLink-qwOmUS1x.js";import"./usePopper-DqfTW_q9.js";import"./index-0bzfsZuo.js";import"./Portal-aqbXDSbc.js";import"./useMemoizedId-CQNzOXzl.js";import"./IconCheckMark-Dsh2IxuG.js";import"./IconExclamationMarkCircle24-BpjzptM1.js";import"./IconQuestionMarkCircle-seQQRrmY.js";import"./IconMinus-gxLnqE3X.js";import"./Divider-DlUNLzPc.js";import"./FormControl-C_BMoidY.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-BUQQWMLi.js";import"./Switch-DCarcGco.js";import"./TabItem-Bg44aVa7.js";import"./elements-BOYmskOL.js";import"./TextInput-D9V2hlzg.js";import"./IconCross-XkaW0Zf_.js";import"./Tooltip-DJYsqGzv.js";import"./useClickOutside-n9EKo7xD.js";import"./EnablePortalWrapper-BeV-lT_S.js";import"./dialog-D9O7a7Fm.js";import"./Tree-pvsOByw0.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-LRcnMm3f.js";import"./IconCaretDown-sOW78wV8.js";import"./IconCaretDown16-B0YkCtOb.js";import"./IconTrashBin16-ophRe3jP.js";import"./IconTrashBin24-zXSq5zF0.js";import"./IconExclamationMarkTriangle24-D_roIFdK.js";import"./IconIcon16-D1RUzGVn.js";import"./IconIcon24-t2BzWxkI.js";const Ne={title:"Experimental/Popover",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=m=>{const[a,t]=p.useState(!1),r=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(P,{}),onClick:()=>t(!a),ref:r,children:"Trigger"}),e.jsx(c,{...m,anchor:r,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},k=m=>{const[a,t]=p.useState(!1),r=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{type:"button",ref:r,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(y,{})]}),e.jsx(c,{...m,anchor:r,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},n=l.bind({});n.args={};const o=k.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const i=l.bind({});i.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
