import{r as p,j as e}from"./iframe-CMpkON89.js";import{B as j}from"./Button-DBQd5wjc.js";import{C as T}from"./Container-jjFa6ynJ.js";import{P as c}from"./Popover-DT0wxqj7.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{a as y}from"./IconExclamationMarkTriangle-Jy0sbFD7.js";import{I as P}from"./IconIcon-CM7K97Qf.js";import"./preload-helper-B3whO8fc.js";import"./useButton-CNY16gNn.js";import"./useFocusable-HnrZsKbR.js";import"./useFocusRing-DIEOJSVz.js";import"./useEffectEvent-4-XY5svK.js";import"./chain-BCNQpcpO.js";import"./index-B9LBdfw3.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-g_fvXqx6.js";import"./borderStyle-D9jrV09G.js";import"./input-DWk1JnjE.js";import"./DialogBody-BUjD0nOH.js";import"./dialog-D9O7a7Fm.js";import"./Divider-BKkgUAbC.js";import"./FormControl-BcgCajyc.js";import"./InputLabel-hjiDARke.js";import"./TooltipIcon-VB0vu51_.js";import"./LegacyTooltip-COl642PU.js";import"./useLink-BukK8isd.js";import"./usePopper-P6sL91Sq.js";import"./index-Ckuc5XOc.js";import"./Portal-5x1gUpXv.js";import"./useMemoizedId-BQ7TLkNl.js";import"./IconCheckMark-B_wXSDGe.js";import"./IconExclamationMarkCircle24-B5rNnrJ5.js";import"./IconQuestionMarkCircle-tH6uHRs_.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-QlXdVjZL.js";import"./Switch-DRlDhOgo.js";import"./TabItem-D6DFutG5.js";import"./elements-BOYmskOL.js";import"./TextInput-DqAlllq3.js";import"./IconCross-qTsAaCLg.js";import"./Tooltip-BUYOplGK.js";import"./useClickOutside-B_5vnK3p.js";import"./EnablePortalWrapper-BPlcZ-uN.js";import"./Tree-BCJT0uuz.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-D7jn93Yi.js";import"./IconCaretDown-2ULPbKV-.js";import"./IconCaretDown16-DPkMkxHs.js";import"./IconTrashBin16-Cn-rAnRV.js";import"./IconTrashBin24-rcV-ZyH-.js";import"./IconExclamationMarkTriangle24-C4ujeA1c.js";import"./IconIcon16-DbxyF2VI.js";import"./IconIcon24-BmdjrfHd.js";const be={title:"Experimental/Popover",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=m=>{const[a,t]=p.useState(!1),r=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(P,{}),onClick:()=>t(!a),ref:r,children:"Trigger"}),e.jsx(c,{...m,anchor:r,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},k=m=>{const[a,t]=p.useState(!1),r=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{type:"button",ref:r,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(y,{})]}),e.jsx(c,{...m,anchor:r,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},n=l.bind({});n.args={};const o=k.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const i=l.bind({});i.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
