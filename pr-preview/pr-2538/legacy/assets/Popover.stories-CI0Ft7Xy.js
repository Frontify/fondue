import{r as p,j as e}from"./iframe-B6wMFBmr.js";import{B as j}from"./Button-BAqzJ5Pv.js";import{C as T}from"./Container-CFbNNFQA.js";import{P as m}from"./Popover-dEH6ICg0.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{a as y}from"./IconExclamationMarkTriangle-BYVM_8KN.js";import{I as P}from"./IconIcon-DhP849Wp.js";import"./preload-helper-B3RP-zrM.js";import"./useButton-DD58yLyN.js";import"./useFocusable-k5y2-4wJ.js";import"./useFocusRing-CGF_IT6k.js";import"./useEffectEvent-CikN4lv1.js";import"./chain-DULsJ5c3.js";import"./index-BEaJUMGy.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-N8_xKnJ-.js";import"./borderStyle-D9jrV09G.js";import"./input-evml2QDQ.js";import"./Divider-BkQnAn1F.js";import"./FormControl-BerGKFeK.js";import"./InputLabel-QH3KoYmW.js";import"./TooltipIcon-W-6H6r9U.js";import"./LegacyTooltip-BCilkNdt.js";import"./useLink-DkTIgE5u.js";import"./usePopper-0MaFEurT.js";import"./index-8VFt0Zma.js";import"./Portal-nAgA0YlW.js";import"./useMemoizedId-DnKqk2fp.js";import"./IconCheckMark-DBwBkYZ5.js";import"./IconExclamationMarkCircle24-DoWZywMv.js";import"./IconQuestionMarkCircle-I-XoRTAy.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-CGnUCcrv.js";import"./Switch-BLVO3_NP.js";import"./TabItem-rWyOgEJ4.js";import"./elements-BOYmskOL.js";import"./TextInput-tcJ9GSxD.js";import"./IconCross-YTa4RDxM.js";import"./Tooltip-BEmzkewf.js";import"./useClickOutside-D09WEkaY.js";import"./EnablePortalWrapper-BhSC5jqe.js";import"./dialog-D9O7a7Fm.js";import"./Tree-C2Vrhmv9.js";import"./_Uint8Array-CwPxMkg2.js";import"./IconExclamationMarkTriangle24-CQVhFF9W.js";import"./IconIcon16-6KWVaRRG.js";import"./IconIcon24-Dk6NLM01.js";const je={title:"Experimental/Popover",component:m,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=c=>{const[a,t]=p.useState(!1),n=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(P,{}),onClick:()=>t(!a),ref:n,children:"Trigger"}),e.jsx(m,{...c,anchor:n,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},k=c=>{const[a,t]=p.useState(!1),n=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{type:"button",ref:n,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(y,{})]}),e.jsx(m,{...c,anchor:n,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},r=l.bind({});r.args={};const o=k.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const i=l.bind({});i.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
}`,...(R=(v=i.parameters)==null?void 0:v.docs)==null?void 0:R.source}}};const Se=["TriggeredOnClick","TriggeredOnHover","DarkTheme","WithArrowAndDarkTheme"];export{s as DarkTheme,r as TriggeredOnClick,o as TriggeredOnHover,i as WithArrowAndDarkTheme,Se as __namedExportsOrder,je as default};
