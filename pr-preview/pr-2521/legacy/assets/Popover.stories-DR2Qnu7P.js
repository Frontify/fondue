import{r as p,j as e}from"./iframe-DH_Vpvc8.js";import{B as j}from"./Button-CRfrGFua.js";import{C as T}from"./Container-awAPD11-.js";import{P as c}from"./Popover-BPS4ULxu.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{a as y}from"./IconExclamationMarkTriangle-C4yhxZCE.js";import{I as P}from"./IconIcon-CelNsdA8.js";import"./preload-helper-CxFeC-BG.js";import"./useButton-DwlojS2s.js";import"./useFocusable-BfaIOJFi.js";import"./useFocusRing-CBL7_Hgl.js";import"./useEffectEvent-ClEuPD_7.js";import"./chain-BXWUlVD-.js";import"./index-BEyY7rkE.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-lmRurSI5.js";import"./borderStyle-D9jrV09G.js";import"./input-fMLuskIO.js";import"./Checkbox-BKDFmUYg.js";import"./useFormValidationState-BLSqlG-U.js";import"./useControlledState-BcEV7UZo.js";import"./InputLabel-DD2Ppz5-.js";import"./TooltipIcon-BUevwMOK.js";import"./LegacyTooltip-CJ8JehmO.js";import"./useLink-CfQmoYLi.js";import"./usePopper-7nuAm56J.js";import"./index-DswGKGRV.js";import"./Portal-DfJTwWgR.js";import"./useMemoizedId-h7ZSLYPU.js";import"./IconCheckMark-CBAEpExY.js";import"./IconExclamationMarkCircle24-D3Uxl3xP.js";import"./IconQuestionMarkCircle-5nNliWG4.js";import"./IconMinus-0cOeQ8LJ.js";import"./Divider-Du5UKnrr.js";import"./FormControl-B2FtJwKU.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-CfdqrWn5.js";import"./Switch-C8jSVRUG.js";import"./TabItem-B7u6UvQ-.js";import"./elements-BOYmskOL.js";import"./TextInput-Be_uW0xW.js";import"./IconCross-Clz4DbLP.js";import"./Tooltip-DOykOIXa.js";import"./useClickOutside-BmDR2us8.js";import"./EnablePortalWrapper-BdDHCmiv.js";import"./dialog-D9O7a7Fm.js";import"./Tree-p5r-5Ig9.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-Bu4woFqc.js";import"./IconCaretDown-Bt6Qf-uZ.js";import"./IconCaretDown16-CxMSiV6T.js";import"./IconTrashBin16-BMY5sjUw.js";import"./IconTrashBin24-BwZ2YLrM.js";import"./IconExclamationMarkTriangle24-CfZExJL9.js";import"./IconIcon16-BPtSTGDn.js";import"./IconIcon24-Cr1gPKRH.js";const Ne={title:"Experimental/Popover",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=m=>{const[a,t]=p.useState(!1),r=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(P,{}),onClick:()=>t(!a),ref:r,children:"Trigger"}),e.jsx(c,{...m,anchor:r,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},k=m=>{const[a,t]=p.useState(!1),r=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{type:"button",ref:r,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(y,{})]}),e.jsx(c,{...m,anchor:r,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},n=l.bind({});n.args={};const o=k.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const i=l.bind({});i.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
