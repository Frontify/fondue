import{r as p,j as e}from"./iframe-BQiMkHw5.js";import{B as j}from"./Button-Bmrxg36I.js";import{C as T}from"./Container-BIsb9Vrw.js";import{P as c}from"./Popover-jbu0bhuV.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{a as y}from"./IconExclamationMarkTriangle-CoYzxOLH.js";import{I as P}from"./IconIcon-DxHU4_Zg.js";import"./preload-helper-C1FmrZbK.js";import"./useButton-Ug7NB8nr.js";import"./useFocusable-CgS9ZZhd.js";import"./useFocusRing-BD4-S_g1.js";import"./useEffectEvent-CcicRBmQ.js";import"./chain-BIBRZ_SZ.js";import"./index-CnZnx3bY.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-DetMvp8V.js";import"./borderStyle-D9jrV09G.js";import"./input-DINfxS63.js";import"./Checkbox-Dt22eygm.js";import"./useFormValidationState-BzO4C-br.js";import"./useControlledState-DzPm4K8q.js";import"./InputLabel-CI_YTO0E.js";import"./TooltipIcon-CeEh8SWi.js";import"./LegacyTooltip-BTPYh-Ag.js";import"./useLink-DFD-nYUU.js";import"./usePopper-Cc6K-R7q.js";import"./index-CQBCO6mf.js";import"./Portal-C-kI49Kt.js";import"./useMemoizedId-tQVpYmKZ.js";import"./IconCheckMark-BS1oKRJV.js";import"./IconExclamationMarkCircle24-CJ1G6dL5.js";import"./IconQuestionMarkCircle-CTimdRgj.js";import"./IconMinus-CLKltAiw.js";import"./Divider-i3Nx4C_N.js";import"./FormControl-D1EHzNHy.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-D5u200MM.js";import"./Switch-9WQaKYNl.js";import"./TabItem-CgWMMnEC.js";import"./elements-BOYmskOL.js";import"./TextInput-CR5drUal.js";import"./IconCross-Bgju1hVK.js";import"./Tooltip-IB7ez1El.js";import"./useClickOutside-BvanHLsZ.js";import"./EnablePortalWrapper-CbtLSXEI.js";import"./dialog-D9O7a7Fm.js";import"./Tree-Qzvf_nh7.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-DV_vxb7X.js";import"./IconCaretDown-DOdhsPZo.js";import"./IconCaretDown16-aDP8LU-M.js";import"./IconTrashBin16-fC3Gnm9z.js";import"./IconTrashBin24-ByHOH091.js";import"./IconExclamationMarkTriangle24-20B1ME08.js";import"./IconIcon16-DcVWGb6h.js";import"./IconIcon24-BFn2tO0G.js";const Ne={title:"Experimental/Popover",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=m=>{const[a,t]=p.useState(!1),r=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(P,{}),onClick:()=>t(!a),ref:r,children:"Trigger"}),e.jsx(c,{...m,anchor:r,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},k=m=>{const[a,t]=p.useState(!1),r=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{type:"button",ref:r,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(y,{})]}),e.jsx(c,{...m,anchor:r,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},n=l.bind({});n.args={};const o=k.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const i=l.bind({});i.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
