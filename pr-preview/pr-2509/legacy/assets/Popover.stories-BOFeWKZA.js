import{r as p,j as e}from"./iframe-CTdaKj4d.js";import{B as j}from"./Button-Bm_WcOm-.js";import{C as T}from"./Container-DG5VCnaI.js";import{P as c}from"./Popover-B2X50sLj.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{a as y}from"./IconExclamationMarkTriangle-FJXci0JT.js";import{I as P}from"./IconJohanna-KdayrNUf.js";import"./preload-helper-D5qcpbyD.js";import"./useButton-BoyR-gLm.js";import"./useFocusable-D5v5BXOS.js";import"./useFocusRing-qvQmERHy.js";import"./useEffectEvent-C0QjiGlT.js";import"./chain-C4zg1uY7.js";import"./index-BxZHv3Q3.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-DboJyZSQ.js";import"./borderStyle-D9jrV09G.js";import"./input-Ba-n1B2U.js";import"./Divider-BZSXkwNY.js";import"./Dropdown-BbPKlORf.js";import"./FocusScope-ChEvNH6k.js";import"./useOverlayTriggerState-DvdaRORr.js";import"./useControlledState-BdRnahj0.js";import"./useMenuTrigger-BGbq9tho.js";import"./useLabels-DJeEYSDO.js";import"./useLocalizedStringFormatter-DxXej0b0.js";import"./context-CBgqpM37.js";import"./VisuallyHidden-B0vggYPD.js";import"./helper-JqKjmzWS.js";import"./keyboard-BKG3APZl.js";import"./SelectionManager-CY7iX6yC.js";import"./useField-DACdsH3V.js";import"./useFormValidationState-Dcwylu08.js";import"./usePopper-COiRSxUA.js";import"./index-CpwT1ZzU.js";import"./MenuItem-Dq7ojpGP.js";import"./IconCaretRight-tNfIFY6w.js";import"./IconCheckMark-BLO_YVDU.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-DjvG9W6K.js";import"./Trigger-DjFT1fqu.js";import"./IconCaretDown-B2RHgjKn.js";import"./IconCaretDown16-j1AblOCd.js";import"./IconCross-Befib3GN.js";import"./IconTrashBin16-CdiktYZv.js";import"./IconTrashBin24-MMIBMUjF.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-DePDkhO3.js";import"./Portal-I51V88Fn.js";import"./useMemoizedId-CCMoqEOy.js";import"./FormControl-Z3syqaE3.js";import"./InputLabel-BUE6hJiL.js";import"./TooltipIcon-uAUvErbA.js";import"./LegacyTooltip-CKi7Gu9g.js";import"./useLink-Bp2GiKfO.js";import"./IconExclamationMarkCircle24-BO32xN40.js";import"./IconQuestionMarkCircle-BqZGmMJ5.js";import"./Switch-Kl-DuV0i.js";import"./TabItem-BC_hjA78.js";import"./TextInput-Dtm7IYNA.js";import"./Tooltip-CyAZuE7b.js";import"./useClickOutside-mFCCHlJ7.js";import"./dialog-D9O7a7Fm.js";import"./Tree-CcWwUQpW.js";import"./_Uint8Array-CwPxMkg2.js";import"./IconExclamationMarkTriangle24-Do1nSI1f.js";const ze={title:"Experimental/Popover",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=m=>{const[a,t]=p.useState(!1),r=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(P,{}),onClick:()=>t(!a),ref:r,children:"Trigger"}),e.jsx(c,{...m,anchor:r,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},k=m=>{const[a,t]=p.useState(!1),r=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{type:"button",ref:r,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(y,{})]}),e.jsx(c,{...m,anchor:r,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},n=l.bind({});n.args={};const o=k.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const i=l.bind({});i.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  return <div className="tw-h-32 tw-flex tw-justify-center tw-items-center">
            <Button icon={<IconJohanna />} onClick={() => setIsOpen(!isOpen)} ref={triggerRef}>
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
}`,...(O=(h=o.parameters)==null?void 0:h.docs)==null?void 0:O.source}}};var w,x,C;s.parameters={...s.parameters,docs:{...(w=s.parameters)==null?void 0:w.docs,source:{originalSource:`args => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  return <div className="tw-h-32 tw-flex tw-justify-center tw-items-center">
            <Button icon={<IconJohanna />} onClick={() => setIsOpen(!isOpen)} ref={triggerRef}>
                Trigger
            </Button>
            <Popover {...args} anchor={triggerRef} open={isOpen} handleClose={() => setIsOpen(false)}>
                <Container padding={8}>
                    <p>Some Content</p>
                </Container>
            </Popover>
        </div>;
}`,...(C=(x=s.parameters)==null?void 0:x.docs)==null?void 0:C.source}}};var I,v,R;i.parameters={...i.parameters,docs:{...(I=i.parameters)==null?void 0:I.docs,source:{originalSource:`args => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  return <div className="tw-h-32 tw-flex tw-justify-center tw-items-center">
            <Button icon={<IconJohanna />} onClick={() => setIsOpen(!isOpen)} ref={triggerRef}>
                Trigger
            </Button>
            <Popover {...args} anchor={triggerRef} open={isOpen} handleClose={() => setIsOpen(false)}>
                <Container padding={8}>
                    <p>Some Content</p>
                </Container>
            </Popover>
        </div>;
}`,...(R=(v=i.parameters)==null?void 0:v.docs)==null?void 0:R.source}}};const Ge=["TriggeredOnClick","TriggeredOnHover","DarkTheme","WithArrowAndDarkTheme"];export{s as DarkTheme,n as TriggeredOnClick,o as TriggeredOnHover,i as WithArrowAndDarkTheme,Ge as __namedExportsOrder,ze as default};
