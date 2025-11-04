import{r as p,j as e}from"./iframe-fM7Rz_IH.js";import{B as j}from"./Button-C-HesLNs.js";import{C as T}from"./Container-BwaMrMYF.js";import{P as c}from"./Popover-C5DQjM_i.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{a as y}from"./IconExclamationMarkTriangle-dTKdaA8A.js";import{I as P}from"./IconIcon-5mReaAj0.js";import"./preload-helper-r7mqpNn-.js";import"./useButton-B0RvFuLn.js";import"./useFocusable-BnOXMtFf.js";import"./useFocusRing-D96vsHFl.js";import"./useEffectEvent-Dd15XCAb.js";import"./chain-6uoIjD58.js";import"./index-B2Xp44i3.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-9T55CxCZ.js";import"./borderStyle-D9jrV09G.js";import"./input-OlyhZ4Ot.js";import"./Divider-Cey2ANbQ.js";import"./FormControl-Cr1hpC_m.js";import"./InputLabel-BNXUoyxB.js";import"./TooltipIcon-CKGMLqVo.js";import"./LegacyTooltip-Dba4Z-VI.js";import"./useLink-CZIaAhwd.js";import"./usePopper-CMM9W_Aw.js";import"./index-DsmMH1Qe.js";import"./Portal-7y-WN4RV.js";import"./useMemoizedId-D44gSj9_.js";import"./IconCheckMark-D0okpupZ.js";import"./IconExclamationMarkCircle24-CeaBDf6Z.js";import"./IconQuestionMarkCircle-oN5ApYd_.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-q8L7gn0a.js";import"./Switch-ClYNwfm9.js";import"./TabItem-qskUbBBO.js";import"./elements-BOYmskOL.js";import"./TextInput-YMeucMFi.js";import"./IconCross-cI4LqOlP.js";import"./Tooltip-BQCTamfd.js";import"./useClickOutside-D7zc52GW.js";import"./EnablePortalWrapper-DDg5D4xi.js";import"./dialog-D9O7a7Fm.js";import"./Tree-D5eBpZdj.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-D9BtGDKJ.js";import"./IconCaretDown-CqemCPlr.js";import"./IconCaretDown16-C2ZoekrW.js";import"./IconTrashBin16-B5vK85cE.js";import"./IconTrashBin24-B4FK4PfT.js";import"./IconExclamationMarkTriangle24-BhnTYriZ.js";import"./IconIcon16-D_nIzqoW.js";import"./IconIcon24-VpH2cmoq.js";const Be={title:"Experimental/Popover",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=m=>{const[a,t]=p.useState(!1),n=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(P,{}),onClick:()=>t(!a),ref:n,children:"Trigger"}),e.jsx(c,{...m,anchor:n,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},k=m=>{const[a,t]=p.useState(!1),n=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{type:"button",ref:n,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(y,{})]}),e.jsx(c,{...m,anchor:n,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},r=l.bind({});r.args={};const o=k.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const i=l.bind({});i.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
}`,...(R=(v=i.parameters)==null?void 0:v.docs)==null?void 0:R.source}}};const be=["TriggeredOnClick","TriggeredOnHover","DarkTheme","WithArrowAndDarkTheme"];export{s as DarkTheme,r as TriggeredOnClick,o as TriggeredOnHover,i as WithArrowAndDarkTheme,be as __namedExportsOrder,Be as default};
