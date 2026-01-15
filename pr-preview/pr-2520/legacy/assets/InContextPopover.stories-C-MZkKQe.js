import{r as s,j as t}from"./iframe-soc7eeRF.js";import{a as l}from"./Box-CdpqC20i.js";import{B as d}from"./Button-CimA_5h4.js";import{D as u}from"./DialogBody-QLmDILr0.js";import{D as g}from"./DialogFooter-DTlysciJ.js";import{D as f}from"./DialogHeader-CRCzrcor.js";import{P as n}from"./Popover-CF9V0azb.js";import{I as x}from"./IconIcon-UnBWykWm.js";import"./preload-helper-OAyExbmo.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-DSXlP7Mn.js";import"./Checkbox-BdtkPgCH.js";import"./useFocusable-D74tmFum.js";import"./useFocusRing-CPG57cIB.js";import"./useEffectEvent-ECKUQGF_.js";import"./chain-CNqfjszP.js";import"./index-D9RNLCkm.js";import"./useFormValidationState-CVuV3DO0.js";import"./useControlledState-eiQn8EjX.js";import"./InputLabel-CwMDVsPB.js";import"./TooltipIcon-DU5Rfwoh.js";import"./LegacyTooltip-CEYOzJay.js";import"./useLink-B1qS4TAf.js";import"./usePopper-Dpcm42jv.js";import"./index-E2yKpKq0.js";import"./Portal-BgIRH8iS.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-DzThg7Zj.js";import"./IconCheckMark-pz-eNdCt.js";import"./IconExclamationMarkCircle24-CXdjwykF.js";import"./IconExclamationMarkTriangle-DWfhq3tK.js";import"./IconExclamationMarkTriangle24-BURBLQPR.js";import"./IconQuestionMarkCircle-C_gZVRGQ.js";import"./IconMinus-qopJAP1y.js";import"./Divider-D6gP2duN.js";import"./FormControl-DoDWSLWm.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-MFJ2GuR8.js";import"./Switch-DH40OcLG.js";import"./TabItem-jWEFaDbx.js";import"./elements-BOYmskOL.js";import"./TextInput-Bt-2m2kK.js";import"./IconCross-BFEpEYT5.js";import"./Tooltip-Oncdock3.js";import"./useClickOutside-Cajk1VzK.js";import"./EnablePortalWrapper-pMPqFqBW.js";import"./dialog-D9O7a7Fm.js";import"./Tree-Cr7iaRvK.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-ChPdrCGo.js";import"./Flex-BhadUkzB.js";import"./IconIcon16-F40_P8R6.js";import"./IconIcon24-BpsLmXM2.js";const Ct={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,o]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>o(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>o(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>o(!1)}]})]})})]})},e=h.bind({});e.args={};var a,p,m;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  return <div className="tw-h-32 tw-flex tw-justify-center tw-items-center">
            <Button icon={<IconIcon />} onClick={() => setIsOpen(!isOpen)} ref={triggerRef}>
                Trigger
            </Button>
            <Popover {...args} anchor={triggerRef} open={isOpen} handleClose={() => setIsOpen(false)}>
                <Box className="tw-w-[400px]">
                    <DialogHeader title="Title" padding="compact"></DialogHeader>
                    <DialogBody padding="compact">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae
                            quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod
                            ullam. Beatae deserunt eum quibusdam ratione.
                        </p>
                    </DialogBody>
                    <DialogFooter padding="compact" actionButtons={[{
          children: 'Confirm',
          onClick: () => setIsOpen(false)
        }]}></DialogFooter>
                </Box>
            </Popover>
        </div>;
}`,...(m=(p=e.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};const jt=["WithHeaderAndFooter"];export{e as WithHeaderAndFooter,jt as __namedExportsOrder,Ct as default};
