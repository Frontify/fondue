import{r as a,j as e}from"./iframe-DkeuAZGN.js";import{B as j}from"./Button-Cyg2loOs.js";import{C as T}from"./Container-C7GI2a0_.js";import{P as c}from"./Popover-CYWYTmCb.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{a as y}from"./IconExclamationMarkTriangle-BJT3VxjX.js";import{I as P}from"./IconIcon-C84NygL6.js";import"./preload-helper-CG1F6kIz.js";import"./useButton-DMxfMeHO.js";import"./useFocusable-BFcWdvIz.js";import"./useFocusRing-DV1ndlYm.js";import"./useEffectEvent-p_mtkbDO.js";import"./chain-CAdXsIYK.js";import"./index-DGl5uXCK.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-CKSPIqz1.js";import"./borderStyle-D9jrV09G.js";import"./input-x2DM1voP.js";import"./Divider-BOKamc1v.js";import"./Dropdown-Dz6KAcG4.js";import"./FocusScope-CWLvvfZj.js";import"./useOverlayTriggerState-DfyYWZfM.js";import"./useControlledState-BMnYmkPp.js";import"./useMenuTrigger-CSYe2A-2.js";import"./useLabels-a9mHBJ4N.js";import"./useLocalizedStringFormatter-DZ9hskvU.js";import"./context-CwvE4v2V.js";import"./VisuallyHidden-B2MJ5_a1.js";import"./helper-CaAYgyFI.js";import"./keyboard-Cy4ODuoA.js";import"./SelectionManager-DzET1wUq.js";import"./useField-BLvA30x0.js";import"./useFormValidationState-Bfsywdbb.js";import"./usePopper-DJ8Ra6pa.js";import"./index-QN_6ztFs.js";import"./MenuItem-cnoEN4N-.js";import"./IconCaretRight-DbFwzl53.js";import"./IconCheckMark-BiPkWBUo.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-DcHgqeRw.js";import"./Trigger-g-PSolXT.js";import"./IconCaretDown-DYgzH1Dj.js";import"./IconCaretDown16-z4g6R74Y.js";import"./IconCross-BAyIl8km.js";import"./IconTrashBin16-BbxXYwm0.js";import"./IconTrashBin24-De7vrx_E.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-9dEMfA_M.js";import"./Portal-BMGHkKMU.js";import"./useMemoizedId-nou-DeIg.js";import"./FormControl-Cr4pEOLe.js";import"./InputLabel-g3xE7uYS.js";import"./TooltipIcon-CTQIKmsd.js";import"./LegacyTooltip-DhsEbG6A.js";import"./useLink-D_dJZrWN.js";import"./IconExclamationMarkCircle24-Dc8IlBFK.js";import"./IconQuestionMarkCircle-BTA8lui4.js";import"./Switch-C_UZItiR.js";import"./TabItem-nV4RBMGC.js";import"./TextInput-DJpfvaHj.js";import"./Tooltip-BWUoNyF1.js";import"./useClickOutside-DnmkQ4-b.js";import"./dialog-D9O7a7Fm.js";import"./Tree-DhyCmg2e.js";import"./_Uint8Array-CwPxMkg2.js";import"./IconExclamationMarkTriangle24-WjiVeEOa.js";import"./IconIcon16-CKwU6JAs.js";import"./IconIcon24-v1gbUfbP.js";const qe={title:"Experimental/Popover",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=m=>{const[p,t]=a.useState(!1),r=a.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(P,{}),onClick:()=>t(!p),ref:r,children:"Trigger"}),e.jsx(c,{...m,anchor:r,open:p,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},k=m=>{const[p,t]=a.useState(!1),r=a.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{type:"button",ref:r,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(y,{})]}),e.jsx(c,{...m,anchor:r,open:p,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},n=l.bind({});n.args={};const o=k.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const i=l.bind({});i.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
