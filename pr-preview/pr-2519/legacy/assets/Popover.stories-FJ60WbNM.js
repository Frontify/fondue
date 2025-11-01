import{r as a,j as e}from"./iframe-B0eONuky.js";import{B as j}from"./Button-BlGIO2tE.js";import{C as T}from"./Container-D67v4tzr.js";import{P as c}from"./Popover-CVopVUla.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{a as y}from"./IconExclamationMarkTriangle-E9iCfFGJ.js";import{I as P}from"./IconIcon-D3PJDy2i.js";import"./preload-helper-MprHWY6w.js";import"./useButton-5FbdIYcR.js";import"./useFocusable-bBkjSLpf.js";import"./useFocusRing-DE6ZkWyf.js";import"./useEffectEvent-2_Uk2eyz.js";import"./chain-V8glzwK0.js";import"./index-DVbrmjAE.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-Bx-HGFN9.js";import"./borderStyle-D9jrV09G.js";import"./input-CH-sbZx6.js";import"./Divider-Ctv_3Wyq.js";import"./Dropdown-BfzPlYYt.js";import"./FocusScope-CyQyhzxw.js";import"./useOverlayTriggerState-lO9KGur7.js";import"./useControlledState-BVDDe9gl.js";import"./useMenuTrigger-DoHZFNAI.js";import"./useLabels-DLn4iTZj.js";import"./useLocalizedStringFormatter-D45KdaND.js";import"./context-BiMFL_PP.js";import"./VisuallyHidden-CpTHZVNZ.js";import"./helper-4xrQ1och.js";import"./keyboard-DpUZzzD5.js";import"./SelectionManager-DZOcDTAx.js";import"./useField-D1_sbYus.js";import"./useFormValidationState-CiR8hia_.js";import"./usePopper-CSmw89St.js";import"./index-Cq0fKC_P.js";import"./MenuItem-DOiZqrOT.js";import"./IconCaretRight-CVZt_dym.js";import"./IconCheckMark-Do5BaNJh.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-CuP6zKKO.js";import"./Trigger-BkTp6a6g.js";import"./IconCaretDown-DGfG4Bhv.js";import"./IconCaretDown16-K9H94xLN.js";import"./IconCross-DKzK2egq.js";import"./IconTrashBin16-B3PCevQV.js";import"./IconTrashBin24-j-bA0P1z.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-CWbGt64c.js";import"./Portal-D_InDcfX.js";import"./useMemoizedId-B3YhzS_A.js";import"./FormControl-BHe39TIa.js";import"./InputLabel-ZriXx0s-.js";import"./TooltipIcon-iXKlKXAf.js";import"./LegacyTooltip-B7q53XOK.js";import"./useLink-B03_KRRE.js";import"./IconExclamationMarkCircle24-DhRVyq7-.js";import"./IconQuestionMarkCircle-R6W4K534.js";import"./Switch-OeDDwXU2.js";import"./TabItem-76GLqhix.js";import"./TextInput-Gv7lpT9-.js";import"./Tooltip-Dwst5rQ3.js";import"./useClickOutside-BBDKVLV6.js";import"./dialog-D9O7a7Fm.js";import"./Tree-D-Zdn97c.js";import"./_Uint8Array-CwPxMkg2.js";import"./IconExclamationMarkTriangle24-BgvkgKew.js";import"./IconIcon16-Ba_Pu6iK.js";import"./IconIcon24-BaZ0imhr.js";const qe={title:"Experimental/Popover",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=m=>{const[p,t]=a.useState(!1),r=a.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(P,{}),onClick:()=>t(!p),ref:r,children:"Trigger"}),e.jsx(c,{...m,anchor:r,open:p,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},k=m=>{const[p,t]=a.useState(!1),r=a.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{type:"button",ref:r,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(y,{})]}),e.jsx(c,{...m,anchor:r,open:p,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},n=l.bind({});n.args={};const o=k.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const i=l.bind({});i.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
