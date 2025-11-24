import{r as s,j as t}from"./iframe-CI4Kawm5.js";import{a as l}from"./Box-Cx50b-Ce.js";import{B as d}from"./Button-CC2xgBz8.js";import{D as u}from"./DialogBody-Dda5lqvc.js";import{D as g}from"./DialogFooter-BznxTllo.js";import{D as f}from"./DialogHeader-CpZ4bJFX.js";import{P as n}from"./Popover-CY4ugCGg.js";import{I as x}from"./IconIcon-ARHVfxoT.js";import"./preload-helper-yOERg7rY.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-DCT2qH2I.js";import"./Checkbox-DXLFTzy2.js";import"./useFocusable-DkBkn9iT.js";import"./useFocusRing-CyQhVCri.js";import"./useEffectEvent-Cfpi8PP8.js";import"./chain-D7U0_On1.js";import"./index-zpwVSNjA.js";import"./useFormValidationState-BhtDhUXV.js";import"./useControlledState-CUmOUvGM.js";import"./InputLabel-CKTuZCMG.js";import"./TooltipIcon-BbIRjZyI.js";import"./LegacyTooltip-Dou_-Yzh.js";import"./useLink--dmh_mM5.js";import"./usePopper-BppasZrv.js";import"./index-C-x7Nr5k.js";import"./Portal-Bx0n0vOk.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-BhGmyCqr.js";import"./IconCheckMark-DZdXXIdU.js";import"./IconExclamationMarkCircle24-B1fijdn3.js";import"./IconExclamationMarkTriangle-tJv2AngU.js";import"./IconExclamationMarkTriangle24-BZgyqp3m.js";import"./IconQuestionMarkCircle-CKHNeUmL.js";import"./IconMinus-BWmFQkW3.js";import"./Divider-Cez8lt_3.js";import"./FormControl-CCavmj5m.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-CsOnGPDG.js";import"./Switch-BoyC4ozW.js";import"./TabItem-CnOdriQC.js";import"./elements-BOYmskOL.js";import"./TextInput-Bfa7-qoa.js";import"./IconCross-76Znu6aF.js";import"./Tooltip-giYO8ALz.js";import"./useClickOutside-Bl5b8N1C.js";import"./EnablePortalWrapper-B_5uTan4.js";import"./dialog-D9O7a7Fm.js";import"./Tree-DkbN3ZYU.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-0gYD7YN5.js";import"./Flex-CsBb-GJS.js";import"./IconIcon16-D-it6Xou.js";import"./IconIcon24-CPklV-p0.js";const Ct={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,o]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>o(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>o(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>o(!1)}]})]})})]})},e=h.bind({});e.args={};var a,p,m;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
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
