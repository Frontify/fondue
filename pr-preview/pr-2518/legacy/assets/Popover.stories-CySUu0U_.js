import{r as a,j as e}from"./iframe-mBD-AuCT.js";import{B as j}from"./Button-BhPspr2O.js";import{C as T}from"./Container-DfVTkaeb.js";import{P as c}from"./Popover-DTAwXr3H.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{a as y}from"./IconExclamationMarkTriangle-DqpgRJRQ.js";import{I as P}from"./IconIcon-BQilQbOa.js";import"./preload-helper-D9dL-qgt.js";import"./useButton-D-Nbc6Na.js";import"./useFocusable-DXmFQ-Hx.js";import"./useFocusRing-DuRzJrJR.js";import"./useEffectEvent-pe2_FiFR.js";import"./chain-B6Y7B1-O.js";import"./index-Cyjkes1y.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-BmI01P-O.js";import"./borderStyle-D9jrV09G.js";import"./input-BJtwRwWl.js";import"./Divider-CyNv4tUv.js";import"./Dropdown-Dq0Ms9-1.js";import"./FocusScope-DgjzWB0B.js";import"./useOverlayTriggerState-BctEXfHz.js";import"./useControlledState-B6GpZLHS.js";import"./useMenuTrigger-Mq8ScBc7.js";import"./useLabels-DRYwn0g6.js";import"./useLocalizedStringFormatter-D_i_jBZw.js";import"./context-Mh9QfmU1.js";import"./VisuallyHidden-D9_wafRX.js";import"./helper-BGLeyA6q.js";import"./keyboard-BA3Msqld.js";import"./SelectionManager-DjjzU2Tj.js";import"./useField-r5ZYFHZL.js";import"./useFormValidationState-B9L8KDiQ.js";import"./usePopper-aEWF7LpH.js";import"./index-ChPYWZnj.js";import"./MenuItem-BE2QCwDa.js";import"./IconCaretRight-xD5iAQ8R.js";import"./IconCheckMark-BSe8qHmE.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-B-gv9Ve-.js";import"./Trigger-uuT5TkZo.js";import"./IconCaretDown-BD4Dl5od.js";import"./IconCaretDown16-Dyqz2sdD.js";import"./IconCross-CQTF90o9.js";import"./IconTrashBin16-BVuGxt0P.js";import"./IconTrashBin24-CxLpERYY.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-DkNopmNx.js";import"./Portal-_yzzHhGt.js";import"./useMemoizedId-DEI-3hVY.js";import"./FormControl-BkzR22vN.js";import"./InputLabel-BKReFpg8.js";import"./TooltipIcon--SsjAZ56.js";import"./LegacyTooltip-CQ9s119n.js";import"./useLink-CUJ7p1SF.js";import"./IconExclamationMarkCircle24-CbROWlL7.js";import"./IconQuestionMarkCircle-D5gNDsEa.js";import"./Switch-CZc7I_c8.js";import"./TabItem-Ct4qjJJe.js";import"./TextInput-D5geOiLQ.js";import"./Tooltip-CipzHdYy.js";import"./useClickOutside-CHNIQSRo.js";import"./dialog-D9O7a7Fm.js";import"./Tree-3-D_6k8Z.js";import"./_Uint8Array-CwPxMkg2.js";import"./IconExclamationMarkTriangle24-CGGNSbqG.js";import"./IconIcon16-BwW-QYHf.js";import"./IconIcon24-DhYxU4i8.js";const qe={title:"Experimental/Popover",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=m=>{const[p,t]=a.useState(!1),r=a.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(P,{}),onClick:()=>t(!p),ref:r,children:"Trigger"}),e.jsx(c,{...m,anchor:r,open:p,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},k=m=>{const[p,t]=a.useState(!1),r=a.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{type:"button",ref:r,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(y,{})]}),e.jsx(c,{...m,anchor:r,open:p,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},n=l.bind({});n.args={};const o=k.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const i=l.bind({});i.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
}`,...(R=(v=i.parameters)==null?void 0:v.docs)==null?void 0:R.source}}};const Je=["TriggeredOnClick","TriggeredOnHover","DarkTheme","WithArrowAndDarkTheme"];export{s as DarkTheme,n as TriggeredOnClick,o as TriggeredOnHover,i as WithArrowAndDarkTheme,Je as __namedExportsOrder,qe as default};
