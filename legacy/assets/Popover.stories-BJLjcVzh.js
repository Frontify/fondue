import{r as p,j as e}from"./iframe-Dkg06RjX.js";import{B as j}from"./Button-Ck3U3EnT.js";import{C as T}from"./Container-Dj7FoRO7.js";import{P as c}from"./Popover-Bkjeahzp.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{a as y}from"./IconExclamationMarkTriangle-DXcgw6u2.js";import{I as P}from"./IconIcon-CXGukDuZ.js";import"./preload-helper-C1FmrZbK.js";import"./useButton-DUilcnPW.js";import"./useFocusable-Dxaa7OPm.js";import"./useFocusRing-CEtI7pDJ.js";import"./useEffectEvent-KNqAjB1f.js";import"./chain-CgS8Uj0H.js";import"./index-CBpye4dH.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-DJ_QB4qy.js";import"./borderStyle-D9jrV09G.js";import"./input-C9VEbcfm.js";import"./Checkbox-CDButxBc.js";import"./useFormValidationState-nmuzmEoy.js";import"./useControlledState-CPPx_1ny.js";import"./InputLabel-BEJ9owXS.js";import"./TooltipIcon-ZSWAEMEr.js";import"./LegacyTooltip-CNBxqgOu.js";import"./useLink-BiIAuQPL.js";import"./usePopper-BAL_8qLj.js";import"./index-CFlcmsyM.js";import"./Portal-D1nUMvyP.js";import"./useMemoizedId-BAlQ1vfb.js";import"./IconCheckMark-i1BAgGgA.js";import"./IconExclamationMarkCircle24-BJC0lc_m.js";import"./IconQuestionMarkCircle-Bb7y1LEg.js";import"./IconMinus-C-ho5-_Q.js";import"./Divider-BjOepDpQ.js";import"./FormControl-BkAQXhRL.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-B-i1jWHW.js";import"./Switch-DcE0cref.js";import"./TabItem-Dz7rWhGx.js";import"./elements-BOYmskOL.js";import"./TextInput-jYI9A8oV.js";import"./IconCross-DiOEwTiI.js";import"./Tooltip-B4AmaOSr.js";import"./useClickOutside-B3jYYgtq.js";import"./EnablePortalWrapper-kTZGOFtg.js";import"./dialog-D9O7a7Fm.js";import"./Tree-CV7W9H3_.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-DW_2JkVx.js";import"./IconCaretDown-DOg4ihB9.js";import"./IconCaretDown16-ClPYJULt.js";import"./IconTrashBin16-DASFbRcE.js";import"./IconTrashBin24-omzGfmal.js";import"./IconExclamationMarkTriangle24-Dn4iwSTT.js";import"./IconIcon16-B2oVpvfD.js";import"./IconIcon24-CWei1RON.js";const Ne={title:"Experimental/Popover",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=m=>{const[a,t]=p.useState(!1),r=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(P,{}),onClick:()=>t(!a),ref:r,children:"Trigger"}),e.jsx(c,{...m,anchor:r,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},k=m=>{const[a,t]=p.useState(!1),r=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{type:"button",ref:r,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(y,{})]}),e.jsx(c,{...m,anchor:r,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},n=l.bind({});n.args={};const o=k.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const i=l.bind({});i.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
