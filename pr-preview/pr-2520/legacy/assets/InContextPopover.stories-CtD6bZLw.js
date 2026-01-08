import{r as p,j as t}from"./iframe-r6J4ePyW.js";import{a as l}from"./Box-Bl-FmnYQ.js";import{B as d}from"./Button-B1yAmkes.js";import{D as u}from"./DialogBody-DynW4GVE.js";import{D as g}from"./DialogFooter-BZEmuS53.js";import{D as f}from"./DialogHeader-D_XKNjRI.js";import{P as n}from"./Popover-B0wgGp7E.js";import{I as x}from"./IconIcon-CJHR9eFk.js";import"./preload-helper-OAyExbmo.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-DeNj_XFe.js";import"./Divider-BkI3pdWZ.js";import"./Dropdown-BDyipOjR.js";import"./useButton-B1zHGReO.js";import"./useFocusable-DCJrmwZe.js";import"./useFocusRing-CxZt1wZ_.js";import"./useEffectEvent-BKHWtOuK.js";import"./chain-DWwlhufM.js";import"./index-DanPgCzI.js";import"./FocusScope-0mMA6Wdy.js";import"./useOverlayTriggerState-CkLymXkQ.js";import"./useControlledState-D9rO8aDp.js";import"./useMenuTrigger-DKdAqa2m.js";import"./useLabels-TKPvOifT.js";import"./useLocalizedStringFormatter-VxTtgFts.js";import"./context-C9814rFJ.js";import"./VisuallyHidden-Cl-7enWq.js";import"./helper-CLSoKP_a.js";import"./keyboard-COdlhFeM.js";import"./SelectionManager-2PtmdLez.js";import"./useField-EqXWDY-0.js";import"./useFormValidationState-Bgh-X1l9.js";import"./usePopper-oL3B2z11.js";import"./index-ArdyNbxO.js";import"./MenuItem-BGnHswsU.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-YrwioAi6.js";import"./IconCheckMark-yRS16sIs.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-BneBwhpl.js";import"./Trigger-CC_tcFMw.js";import"./IconCaretDown-C-fPzg7E.js";import"./IconCaretDown16-B5FxHLj0.js";import"./IconCross-DWPjQDuq.js";import"./IconExclamationMarkTriangle-CtnaEOu6.js";import"./IconExclamationMarkTriangle24-ktM439Z_.js";import"./IconTrashBin16-DCfYG6TI.js";import"./IconTrashBin24-BO36GBxN.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-BwP_sxyp.js";import"./Portal-MZ_7L158.js";import"./useMemoizedId-B7Oc4OmJ.js";import"./FormControl-ByUUpRZ0.js";import"./InputLabel-DV9eTz9u.js";import"./TooltipIcon-KPPSDsV-.js";import"./LegacyTooltip-b55Gn0bP.js";import"./useLink-DQCZr1gq.js";import"./IconExclamationMarkCircle24-Cpf4UxZa.js";import"./IconQuestionMarkCircle-DxJ2lW_A.js";import"./Switch-CmcbY307.js";import"./TabItem-Bxfpf6zV.js";import"./TextInput-BqIyJtSt.js";import"./Tooltip-C4hf8uVA.js";import"./useClickOutside-BIYYl7xv.js";import"./dialog-D9O7a7Fm.js";import"./Tree-Dy5asAZ1.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-DEmysH2d.js";import"./IconIcon16-B1v-vDDR.js";import"./IconIcon24-Vghd6_GC.js";const Nt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[e,i]=p.useState(!1),r=p.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>i(!e),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:e,handleClose:()=>i(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>i(!1)}]})]})})]})},o=h.bind({});o.args={};var m,s,a;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
}`,...(a=(s=o.parameters)==null?void 0:s.docs)==null?void 0:a.source}}};const Lt=["WithHeaderAndFooter"];export{o as WithHeaderAndFooter,Lt as __namedExportsOrder,Nt as default};
