import{r as p,j as e}from"./iframe-Byq4RgVa.js";import{B as j}from"./Button-BIzAMqFG.js";import{C as T}from"./Container-Ca_YKXZB.js";import{P as c}from"./Popover-DEtpiAph.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{a as y}from"./IconExclamationMarkTriangle-D_-jLFh-.js";import{I as P}from"./IconIcon-B7eOr2IJ.js";import"./preload-helper-DXpIkoC8.js";import"./useButton-CTv9pbma.js";import"./useFocusable-CEz2cnMa.js";import"./useFocusRing-1VzCYPXM.js";import"./useEffectEvent-CQqcouob.js";import"./chain-NL_CYzOj.js";import"./index-CTq3ycsr.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-Cw0zQjzG.js";import"./borderStyle-D9jrV09G.js";import"./input-BGtg1dMb.js";import"./Checkbox-B-n8zZ-S.js";import"./useFormValidationState-Dv2uWviW.js";import"./useControlledState-BlIu1hRZ.js";import"./InputLabel-CrIA_ZUr.js";import"./TooltipIcon-CqfIsxQ1.js";import"./LegacyTooltip-BPixO4E9.js";import"./useLink-CB5zyTe8.js";import"./usePopper-UMr1qiz5.js";import"./index-DZVnwIzI.js";import"./Portal-Cs3GVWse.js";import"./useMemoizedId-DwOUk7Ve.js";import"./IconCheckMark-BTbz00I9.js";import"./IconExclamationMarkCircle24-ffcPYjGw.js";import"./IconQuestionMarkCircle-BUN0gvmv.js";import"./IconMinus-DHtgKNf5.js";import"./Divider-DE8fBejH.js";import"./FormControl-Giah9BCH.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-C279Nnsi.js";import"./Switch-ns2yYJAp.js";import"./TabItem-BG0dI_Ab.js";import"./elements-BOYmskOL.js";import"./TextInput-ChxiREjX.js";import"./IconCross-D0b98GpB.js";import"./Tooltip-Dv9NXgiv.js";import"./useClickOutside-CXetdB8E.js";import"./EnablePortalWrapper-DXU3Bq8F.js";import"./dialog-D9O7a7Fm.js";import"./Tree-NI69QXvD.js";import"./_Uint8Array-CwPxMkg2.js";import"./IconExclamationMarkTriangle24-D32Lmmh1.js";import"./IconIcon16-DVhiMCPv.js";import"./IconIcon24-CUNoBgQc.js";const ke={title:"Experimental/Popover",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=m=>{const[a,t]=p.useState(!1),n=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(P,{}),onClick:()=>t(!a),ref:n,children:"Trigger"}),e.jsx(c,{...m,anchor:n,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},k=m=>{const[a,t]=p.useState(!1),n=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{type:"button",ref:n,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(y,{})]}),e.jsx(c,{...m,anchor:n,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},r=l.bind({});r.args={};const o=k.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const i=l.bind({});i.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
}`,...(R=(v=i.parameters)==null?void 0:v.docs)==null?void 0:R.source}}};const Be=["TriggeredOnClick","TriggeredOnHover","DarkTheme","WithArrowAndDarkTheme"];export{s as DarkTheme,r as TriggeredOnClick,o as TriggeredOnHover,i as WithArrowAndDarkTheme,Be as __namedExportsOrder,ke as default};
