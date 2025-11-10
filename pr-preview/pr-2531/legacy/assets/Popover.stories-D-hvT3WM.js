import{r as p,j as e}from"./iframe-DkUKKt5y.js";import{B as j}from"./Button-6JaeM8mU.js";import{C as T}from"./Container-DznwB-cy.js";import{P as c}from"./Popover-Z3cNWFW1.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{a as y}from"./IconExclamationMarkTriangle-DOOWrk9t.js";import{I as P}from"./IconIcon-C5JEEbm3.js";import"./preload-helper-CG1F6kIz.js";import"./useButton-CG_fcLKk.js";import"./useFocusable-BnodLyil.js";import"./useFocusRing-BLxiuku7.js";import"./useEffectEvent-Cx-ijvAI.js";import"./chain-CndHG7ua.js";import"./index-5vGpRYJt.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-Dv17W1WR.js";import"./borderStyle-D9jrV09G.js";import"./input-B9TSbNud.js";import"./Checkbox-DRqnjHKW.js";import"./useFormValidationState-fGaqfeUN.js";import"./useControlledState-LG7onZMS.js";import"./InputLabel-blbM3kcV.js";import"./TooltipIcon-C5OnEtaA.js";import"./LegacyTooltip-D55BXxvs.js";import"./useLink-BIFW9FB1.js";import"./usePopper-D77eUAEW.js";import"./index-CBYJFN7O.js";import"./Portal-BXb_EYja.js";import"./useMemoizedId-D1DXyTps.js";import"./IconCheckMark-B0sjDw5i.js";import"./IconExclamationMarkCircle24-WOKR46An.js";import"./IconQuestionMarkCircle-BcldpYoL.js";import"./IconMinus-DDQicYL5.js";import"./Divider-qyYjCJ9L.js";import"./FormControl-BpOPhv4H.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-C8tJhyot.js";import"./Switch-CFJ0_dDx.js";import"./TabItem-VZJHOXhL.js";import"./elements-BOYmskOL.js";import"./TextInput-MWeaHY13.js";import"./IconCross-C8gM1v-C.js";import"./Tooltip-Cmm_S9wY.js";import"./useClickOutside-COZiIny8.js";import"./EnablePortalWrapper-4q6q-LSO.js";import"./dialog-D9O7a7Fm.js";import"./Tree-Bzlxa0iG.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-BAXULSxE.js";import"./IconCaretDown-CkHr4F8u.js";import"./IconCaretDown16-BXjV2vc4.js";import"./IconTrashBin16-BSLG_W8z.js";import"./IconTrashBin24-Ck4Mk32o.js";import"./IconExclamationMarkTriangle24-DcTApZBc.js";import"./IconIcon16-PeN8zDcl.js";import"./IconIcon24-BczRtnsJ.js";const Ne={title:"Experimental/Popover",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=m=>{const[a,t]=p.useState(!1),r=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(P,{}),onClick:()=>t(!a),ref:r,children:"Trigger"}),e.jsx(c,{...m,anchor:r,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},k=m=>{const[a,t]=p.useState(!1),r=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{type:"button",ref:r,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(y,{})]}),e.jsx(c,{...m,anchor:r,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},n=l.bind({});n.args={};const o=k.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const i=l.bind({});i.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
