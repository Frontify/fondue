import{r as a,j as e}from"./iframe-ggc05qp5.js";import{B as j}from"./Button-CCY2toq0.js";import{C as T}from"./Container-Dw4wO7CE.js";import{P as c}from"./Popover-DZCaEP_z.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{a as y}from"./IconExclamationMarkTriangle-bsquF2_C.js";import{I as P}from"./IconIcon-CAiHJIjd.js";import"./preload-helper-OAyExbmo.js";import"./useButton-ChNz3TLR.js";import"./useFocusable-NG717gvg.js";import"./useFocusRing-ClbPovyK.js";import"./useEffectEvent-TMNpvARu.js";import"./chain-dhKHu04B.js";import"./index-IV9VHTlK.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-BpSuB_gv.js";import"./borderStyle-D9jrV09G.js";import"./input-MEkF5shV.js";import"./DialogBody-BZzJ_mys.js";import"./dialog-D9O7a7Fm.js";import"./Divider-CoERhSuw.js";import"./Dropdown-CIxnL_ee.js";import"./FocusScope-D9wOCa0s.js";import"./useOverlayTriggerState-BJ1qhrKO.js";import"./useControlledState-ykz0Rnfd.js";import"./useMenuTrigger-DpVn8X_E.js";import"./useLabels-BJDRUN-n.js";import"./useLocalizedStringFormatter-CKti8yL1.js";import"./context-BJnIPN4y.js";import"./VisuallyHidden-CLxKSwTK.js";import"./helper-BAjx2dyn.js";import"./keyboard-BeorW_Hq.js";import"./SelectionManager-BgHaICas.js";import"./useField-w-TvaOu_.js";import"./useFormValidationState-HmZu6JVu.js";import"./usePopper-BlHz01pa.js";import"./index-Bn025ITx.js";import"./MenuItem-BbNksaEj.js";import"./IconCaretRight-DEkBsEC9.js";import"./IconCheckMark-B5O2hbzH.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-DezT8zwL.js";import"./Trigger-x6X4PO3H.js";import"./IconCaretDown-BnU7RbiA.js";import"./IconCaretDown16-CtPRSIn5.js";import"./IconCross-CUTgcpeg.js";import"./IconTrashBin16--VXJ7hVf.js";import"./IconTrashBin24-CpCFRkQE.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-Bs-6SVfL.js";import"./Portal-Bc7Myuvb.js";import"./useMemoizedId-Bc83Oy8u.js";import"./FormControl-XMXivdja.js";import"./InputLabel-BbwthhXI.js";import"./TooltipIcon-DvQt9lcI.js";import"./LegacyTooltip-DXwI5ThW.js";import"./useLink-BzKQhfIP.js";import"./IconExclamationMarkCircle24-BOb3PsaO.js";import"./IconQuestionMarkCircle-CmkyKBhr.js";import"./Switch-CB9EEJT-.js";import"./TabItem-DAOe0Mbq.js";import"./TextInput-4ALtVpG0.js";import"./Tooltip-Cb2lYsA2.js";import"./useClickOutside-5Nput7Ah.js";import"./Tree-BOR5MZeE.js";import"./_Uint8Array-CwPxMkg2.js";import"./IconExclamationMarkTriangle24-Db5_YIYF.js";import"./IconIcon16-Btrp1hmx.js";import"./IconIcon24-uujTmcnN.js";const Je={title:"Experimental/Popover",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=m=>{const[p,t]=a.useState(!1),r=a.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(P,{}),onClick:()=>t(!p),ref:r,children:"Trigger"}),e.jsx(c,{...m,anchor:r,open:p,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},k=m=>{const[p,t]=a.useState(!1),r=a.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{type:"button",ref:r,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(y,{})]}),e.jsx(c,{...m,anchor:r,open:p,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},n=l.bind({});n.args={};const o=k.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const i=l.bind({});i.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
}`,...(R=(v=i.parameters)==null?void 0:v.docs)==null?void 0:R.source}}};const Ke=["TriggeredOnClick","TriggeredOnHover","DarkTheme","WithArrowAndDarkTheme"];export{s as DarkTheme,n as TriggeredOnClick,o as TriggeredOnHover,i as WithArrowAndDarkTheme,Ke as __namedExportsOrder,Je as default};
