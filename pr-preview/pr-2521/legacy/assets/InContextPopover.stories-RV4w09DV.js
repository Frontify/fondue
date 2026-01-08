import{r as p,j as t}from"./iframe-B1NH0d8E.js";import{a as l}from"./Box-C-xSTCCc.js";import{B as d}from"./Button-CjOUnz39.js";import{D as u}from"./DialogBody-CYckLbUx.js";import{D as g}from"./DialogFooter-BS09aUrT.js";import{D as f}from"./DialogHeader-BYv8-r-L.js";import{P as n}from"./Popover-BxnqJ1Z3.js";import{I as x}from"./IconIcon-DLdYtT1Q.js";import"./preload-helper-CxFeC-BG.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-DG65ErTG.js";import"./Divider-Bvi631jR.js";import"./Dropdown-CRsrFL1r.js";import"./useButton-CXaNqm_z.js";import"./useFocusable-DP6unWF8.js";import"./useFocusRing-rvuW17v-.js";import"./useEffectEvent-Cuuo5Go7.js";import"./chain-CDNEhT9V.js";import"./index-NnVgL01k.js";import"./FocusScope-CSl_sW_4.js";import"./useOverlayTriggerState-EK37ykhd.js";import"./useControlledState-VV8iETpF.js";import"./useMenuTrigger-CLvR65IU.js";import"./useLabels-D6M7Y-Ad.js";import"./useLocalizedStringFormatter-B_wUy5H5.js";import"./context-DkQ0DKut.js";import"./VisuallyHidden-Dc2v8xjK.js";import"./helper-BAqNwAfB.js";import"./keyboard-Cfnwcw1j.js";import"./SelectionManager-CGSidPqj.js";import"./useField-Ck-FbqVi.js";import"./useFormValidationState-BS6Czv8J.js";import"./usePopper-jtv-PNE8.js";import"./index-C7tiHcAr.js";import"./MenuItem-B5L2unfa.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-D43a9Ky7.js";import"./IconCheckMark-Az9s2S0p.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-DgTICg-p.js";import"./Trigger-0BTyAmbE.js";import"./IconCaretDown-BKOjvZBQ.js";import"./IconCaretDown16-CgcPEXOJ.js";import"./IconCross-CS9vqEH5.js";import"./IconExclamationMarkTriangle-BR7mnz4z.js";import"./IconExclamationMarkTriangle24-DoKVx44R.js";import"./IconTrashBin16-DLhMgjk_.js";import"./IconTrashBin24-OmLsHuw5.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-BaBU1IWY.js";import"./Portal-CySXwQ73.js";import"./useMemoizedId-B10bANt6.js";import"./FormControl-DKa4d7cu.js";import"./InputLabel-DK0GeTMZ.js";import"./TooltipIcon-CaQbfCOt.js";import"./LegacyTooltip-DWKf2bEz.js";import"./useLink-DGFVcWby.js";import"./IconExclamationMarkCircle24-Bbl11HkU.js";import"./IconQuestionMarkCircle-DdcULYxs.js";import"./Switch-Zpluh7dE.js";import"./TabItem-CZOwDr0W.js";import"./TextInput-CwXX9Bla.js";import"./Tooltip-CULISYh2.js";import"./useClickOutside-CqVgQgGM.js";import"./dialog-D9O7a7Fm.js";import"./Tree-BpEz_X_Z.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-CNEtKSUH.js";import"./IconIcon16-C17HQfvi.js";import"./IconIcon24-C0nl7tvE.js";const Nt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[e,i]=p.useState(!1),r=p.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>i(!e),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:e,handleClose:()=>i(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>i(!1)}]})]})})]})},o=h.bind({});o.args={};var m,s,a;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
