import{r as p,j as e}from"./iframe-BqDpTz8L.js";import{B as j}from"./Button-Bkb2ujAG.js";import{C as T}from"./Container-QHYqDt2E.js";import{P as c}from"./Popover-Dy76aGrf.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{a as y}from"./IconExclamationMarkTriangle-DRWrILNB.js";import{I as P}from"./IconJohanna-DwpaZlKX.js";import"./preload-helper-ByQXrLpA.js";import"./useButton-BGLu1zCr.js";import"./useFocusable-C1aQJPOg.js";import"./useFocusRing-Xgnq7-RG.js";import"./useEffectEvent-CfjbAp9f.js";import"./chain-BF0-ro9P.js";import"./index-D7I4QJ3V.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-yDJFD71A.js";import"./borderStyle-D9jrV09G.js";import"./input-CTkk_4sX.js";import"./Divider-BDkhKOpT.js";import"./Dropdown-DIeWOy5O.js";import"./FocusScope-CrwMUh0H.js";import"./useOverlayTriggerState-Dxar4kSR.js";import"./useControlledState-DRzZhX7e.js";import"./useMenuTrigger-B-xTmkst.js";import"./useLabels-CShK178M.js";import"./useLocalizedStringFormatter-CT_IKlGg.js";import"./context-Cuf97275.js";import"./VisuallyHidden-Z6NBypG9.js";import"./helper-CawoOU1g.js";import"./keyboard-D68Nodq9.js";import"./SelectionManager-ClMwx0j_.js";import"./useField-BAnoDg69.js";import"./useFormValidationState-BoxxuQfu.js";import"./usePopper-s4jp2qgP.js";import"./index-CY-jsk3T.js";import"./MenuItem-PZQtIurR.js";import"./IconCaretRight-PlITsN3f.js";import"./IconCheckMark-BbPCPrTa.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-BxttBEHu.js";import"./Trigger-DSSj9pCU.js";import"./IconCaretDown-R6whlyjw.js";import"./IconCaretDown16-Bdm0zhQl.js";import"./IconCross-B8K-nVuA.js";import"./IconTrashBin16-DR0ZRfF3.js";import"./IconTrashBin24-CciGS0Cs.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-Dvj5TfsF.js";import"./Portal-B7rzZNWn.js";import"./useMemoizedId-Dw0wROnJ.js";import"./FormControl-DcBQh53j.js";import"./InputLabel-CF4ejW5R.js";import"./TooltipIcon-Dg_9MSCk.js";import"./LegacyTooltip-h-bi0B10.js";import"./useLink-_NQoLbRX.js";import"./IconExclamationMarkCircle24-BixhjAUI.js";import"./IconQuestionMarkCircle-gMiBNDjP.js";import"./Switch-DHEC4TsF.js";import"./TabItem-3JcYdrD1.js";import"./TextInput-CRHj7Htq.js";import"./Tooltip-CMa0Vima.js";import"./useClickOutside-BZvZNjns.js";import"./dialog-D9O7a7Fm.js";import"./Tree-4CeaLJ8E.js";import"./_Uint8Array-CwPxMkg2.js";import"./IconExclamationMarkTriangle24-XYss3Qca.js";const ze={title:"Experimental/Popover",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=m=>{const[a,t]=p.useState(!1),r=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(P,{}),onClick:()=>t(!a),ref:r,children:"Trigger"}),e.jsx(c,{...m,anchor:r,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},k=m=>{const[a,t]=p.useState(!1),r=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{type:"button",ref:r,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(y,{})]}),e.jsx(c,{...m,anchor:r,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},n=l.bind({});n.args={};const o=k.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const i=l.bind({});i.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
