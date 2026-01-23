import{r as a,j as e}from"./iframe-BgclmNi_.js";import{B as j}from"./Button-Jh62-Uss.js";import{C as T}from"./Container-CUQQnetc.js";import{P as c}from"./Popover-CGJHY001.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{a as y}from"./IconExclamationMarkTriangle-BmgyKCQw.js";import{I as P}from"./IconIcon-BPygaErP.js";import"./preload-helper-OAyExbmo.js";import"./useButton-DXvY-MRW.js";import"./useFocusable-DtKQAfqn.js";import"./useFocusRing-DC_lV9ru.js";import"./useEffectEvent-TAw_EjWl.js";import"./chain-Dy5Kpw7j.js";import"./index-u9euIB8F.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-BVJjrt8A.js";import"./borderStyle-D9jrV09G.js";import"./input-BhenJ9Jt.js";import"./Divider-VQQdNwek.js";import"./Dropdown-Cp5EZUx7.js";import"./FocusScope-CBd9q2H5.js";import"./useOverlayTriggerState-CIHMJDQp.js";import"./useControlledState-CKTk-GQk.js";import"./useMenuTrigger-idV-rg2K.js";import"./useLabels-AY-KNK8b.js";import"./useLocalizedStringFormatter-CuZbqWk8.js";import"./context-3Mddb9Fq.js";import"./VisuallyHidden-ruA9c2G9.js";import"./helper-OJgaBbqu.js";import"./keyboard-DIao9I3o.js";import"./SelectionManager-CX98pLVM.js";import"./useField-CiKFOMbH.js";import"./useFormValidationState-DwyVTzUy.js";import"./usePopper-DHW2kk9d.js";import"./index-LSGqXRyL.js";import"./MenuItem-3_wVpizr.js";import"./IconCaretRight-DMwnH2Td.js";import"./IconCheckMark-BpvxRbMV.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-DiKkRkPJ.js";import"./Trigger-DZeP-byj.js";import"./IconCaretDown-DyTKIuZ4.js";import"./IconCaretDown16-DHUVfGTZ.js";import"./IconCross-DUAsfivl.js";import"./IconTrashBin16-DWP8Iw1O.js";import"./IconTrashBin24-c4Eg252N.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-DwrtlsaZ.js";import"./Portal-CCWlAhWK.js";import"./useMemoizedId-CkykZqr2.js";import"./FormControl-qgdXJIv8.js";import"./InputLabel-B4u8vZ8Y.js";import"./TooltipIcon-CeN63lwH.js";import"./LegacyTooltip-DwJuubBB.js";import"./useLink-Chx8Vlbe.js";import"./IconExclamationMarkCircle24-CzSbzoG8.js";import"./IconQuestionMarkCircle-12jh82xR.js";import"./Switch-BivgEHUR.js";import"./TabItem-Bz9ynkg7.js";import"./TextInput-rmiPtBno.js";import"./Tooltip-DbQPi6yz.js";import"./useClickOutside-BfvyDHTE.js";import"./dialog-D9O7a7Fm.js";import"./Tree-Blm9d-j4.js";import"./_Uint8Array-CwPxMkg2.js";import"./IconExclamationMarkTriangle24-DcKSRA4_.js";import"./IconIcon16-Bm2Dc8DY.js";import"./IconIcon24-wHWLFgxs.js";const qe={title:"Experimental/Popover",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=m=>{const[p,t]=a.useState(!1),r=a.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(P,{}),onClick:()=>t(!p),ref:r,children:"Trigger"}),e.jsx(c,{...m,anchor:r,open:p,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},k=m=>{const[p,t]=a.useState(!1),r=a.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{type:"button",ref:r,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(y,{})]}),e.jsx(c,{...m,anchor:r,open:p,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},n=l.bind({});n.args={};const o=k.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const i=l.bind({});i.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
