import{r as p,j as e}from"./iframe-DPRBJ5Qg.js";import{B as j}from"./Button-IuUjxokW.js";import{C as T}from"./Container-DdbecOJJ.js";import{P as c}from"./Popover-B1HysAbs.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{a as y}from"./IconExclamationMarkTriangle-BcdDPU1z.js";import{I as P}from"./IconIcon-Be8qJiWw.js";import"./preload-helper-DuVWtNEG.js";import"./useButton-CLoXWK9R.js";import"./useFocusable-DKvvMmRO.js";import"./useFocusRing-B6arhbyw.js";import"./useEffectEvent-BwxOOVcC.js";import"./chain-BgKcRe8x.js";import"./index-Bj6WzqIE.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-DsQ8GRqr.js";import"./borderStyle-D9jrV09G.js";import"./input-Dt18Tw5W.js";import"./Checkbox-BKmiJK_B.js";import"./useFormValidationState-D2KMc6vr.js";import"./useControlledState-CWoR01mQ.js";import"./InputLabel-Bdk_cdx2.js";import"./TooltipIcon-Cyyr7b5a.js";import"./LegacyTooltip-CRLNNlT6.js";import"./useLink-DZQQcpzx.js";import"./usePopper-BNoVGNL_.js";import"./index-LfTGALDi.js";import"./Portal-D5MJmr8l.js";import"./useMemoizedId-CijxVOQa.js";import"./IconCheckMark-BZ7o3ynj.js";import"./IconExclamationMarkCircle24-Bp1yl0E2.js";import"./IconQuestionMarkCircle-C0GcLQTC.js";import"./IconMinus-CGzil4rt.js";import"./Divider-CwuaR7Ij.js";import"./FormControl-C70XPd0o.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-BkptVitq.js";import"./Switch-DDNvQKpv.js";import"./TabItem-CojwcqMz.js";import"./elements-BOYmskOL.js";import"./TextInput-B46JoAHb.js";import"./IconCross-oUizg1TI.js";import"./Tooltip-CkEMlWgN.js";import"./useClickOutside-DjMq5qtV.js";import"./EnablePortalWrapper-BQdW5VMb.js";import"./dialog-D9O7a7Fm.js";import"./Tree-7M4K1sUp.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-BC5AK8iF.js";import"./IconCaretDown-C3VJjq6F.js";import"./IconCaretDown16-DUI6oM7I.js";import"./IconTrashBin16-BFeyR-yx.js";import"./IconTrashBin24-BntiU_ti.js";import"./IconExclamationMarkTriangle24-CjI5zqAF.js";import"./IconIcon16-Csx_5aDB.js";import"./IconIcon24-CztCPZlm.js";const Ne={title:"Experimental/Popover",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=m=>{const[a,t]=p.useState(!1),r=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(P,{}),onClick:()=>t(!a),ref:r,children:"Trigger"}),e.jsx(c,{...m,anchor:r,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},k=m=>{const[a,t]=p.useState(!1),r=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{type:"button",ref:r,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(y,{})]}),e.jsx(c,{...m,anchor:r,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},n=l.bind({});n.args={};const o=k.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const i=l.bind({});i.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
