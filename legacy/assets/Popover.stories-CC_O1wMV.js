import{r as p,j as e}from"./iframe-CEGctSHX.js";import{B as j}from"./Button-BZzDmGaR.js";import{C as T}from"./Container-DJFe-Vgj.js";import{P as c}from"./Popover-JmbMHh1X.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{a as y}from"./IconExclamationMarkTriangle-CynoSzMS.js";import{I as P}from"./IconIcon-DqMpJtvE.js";import"./preload-helper-C1FmrZbK.js";import"./useButton-DFF6GcDi.js";import"./useFocusable-CtzgC14Z.js";import"./useFocusRing-Bv4R3Ovq.js";import"./useEffectEvent-DrJ20lr8.js";import"./chain-Cpd5fKoW.js";import"./index-qovRXh6B.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-DkyT3aKM.js";import"./borderStyle-D9jrV09G.js";import"./input-DJ6XBMtK.js";import"./DialogBody-CEcPYNz4.js";import"./dialog-D9O7a7Fm.js";import"./Divider-BeBLM6Mv.js";import"./FormControl-CUySWPby.js";import"./InputLabel-CBxU2xN6.js";import"./TooltipIcon-DtePhnn1.js";import"./LegacyTooltip-Ma9zHI77.js";import"./useLink-UVVSuqAD.js";import"./usePopper-DGStH3Xm.js";import"./index-Db-rlS7X.js";import"./Portal-5dABEhza.js";import"./useMemoizedId-B4Od0BIt.js";import"./IconCheckMark-Bb5rnSIA.js";import"./IconExclamationMarkCircle24-BOA3F-xU.js";import"./IconQuestionMarkCircle-Coh-AG_l.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-DP1NdcMz.js";import"./Switch-Bv4NxhQr.js";import"./TabItem-CmJ8ZrTz.js";import"./elements-BOYmskOL.js";import"./TextInput-r9KFS6ZN.js";import"./IconCross-CuXLf-Hi.js";import"./Tooltip-ASd5pd6P.js";import"./useClickOutside-CrC1bxQQ.js";import"./EnablePortalWrapper-D2YQ0Z7S.js";import"./Tree-BxskEPPi.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-bHFXXoh5.js";import"./IconCaretDown-DfgsHdCy.js";import"./IconCaretDown16-C_HntNHA.js";import"./IconTrashBin16-BlMRtp6Z.js";import"./IconTrashBin24-BtQ0b77B.js";import"./IconExclamationMarkTriangle24-BV4vtwSh.js";import"./IconIcon16-XatWV1da.js";import"./IconIcon24-DbRKdz7v.js";const be={title:"Experimental/Popover",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=m=>{const[a,t]=p.useState(!1),r=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(P,{}),onClick:()=>t(!a),ref:r,children:"Trigger"}),e.jsx(c,{...m,anchor:r,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},k=m=>{const[a,t]=p.useState(!1),r=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{type:"button",ref:r,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(y,{})]}),e.jsx(c,{...m,anchor:r,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},n=l.bind({});n.args={};const o=k.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const i=l.bind({});i.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
}`,...(R=(v=i.parameters)==null?void 0:v.docs)==null?void 0:R.source}}};const Ee=["TriggeredOnClick","TriggeredOnHover","DarkTheme","WithArrowAndDarkTheme"];export{s as DarkTheme,n as TriggeredOnClick,o as TriggeredOnHover,i as WithArrowAndDarkTheme,Ee as __namedExportsOrder,be as default};
