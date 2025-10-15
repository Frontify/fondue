import{r as p,j as t}from"./iframe-CKSe3Fqe.js";import{a as l}from"./Box-DEPf0Ngh.js";import{B as d}from"./Button-BbgN8YT0.js";import{D as u}from"./DialogBody-BG0nOpLi.js";import{D as g}from"./DialogFooter-DY2tSlRE.js";import{D as f}from"./DialogHeader-CeoChys1.js";import{P as n}from"./Popover-Dr6-AnNE.js";import{I as x}from"./IconJohanna-BSGaewrS.js";import"./preload-helper-h55SgzPI.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input--uFCJWpf.js";import"./Divider-Bv6Jm9W8.js";import"./Dropdown-RYEb7gr6.js";import"./useButton-DgyyYZg2.js";import"./useFocusable-DQCP7yek.js";import"./useFocusRing-BQoRK99m.js";import"./useEffectEvent-CiRKx17B.js";import"./chain-Dd3df6pO.js";import"./index-BPMpVAZo.js";import"./FocusScope-g4nBy1T5.js";import"./useOverlayTriggerState-BXRdEGhS.js";import"./useControlledState-DdOe7TCg.js";import"./useMenuTrigger-BBANgVXr.js";import"./useLabels-n-CMa9-N.js";import"./useLocalizedStringFormatter-BfOcmrtd.js";import"./context-DS6XwCl4.js";import"./VisuallyHidden-C-0myvF4.js";import"./helper-DhyHdWO2.js";import"./keyboard-fgHsnZ5J.js";import"./SelectionManager-3hucHCSe.js";import"./useField-BHFNPV93.js";import"./useFormValidationState-Tubgfymy.js";import"./usePopper-AUSlNj6G.js";import"./index-DAN2AmUJ.js";import"./MenuItem-BL5l2ryH.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-BTLUY8GD.js";import"./IconCheckMark-DAilidFq.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-CtM1sAez.js";import"./Trigger-CdwHkVGq.js";import"./IconCaretDown-CYM-4S_c.js";import"./IconCaretDown16-Cq0_e1LD.js";import"./IconCross-BMzgP3k8.js";import"./IconExclamationMarkTriangle-DkY8FJQ1.js";import"./IconExclamationMarkTriangle24-DqG8_uUA.js";import"./IconTrashBin16-BwyJnQhs.js";import"./IconTrashBin24-Cg69eDvd.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-DBduxGiL.js";import"./Portal-D2beUhEQ.js";import"./useMemoizedId-CzKriQUz.js";import"./FormControl-XCmk-78w.js";import"./InputLabel-3X3wCC3G.js";import"./TooltipIcon-LYoTL7qa.js";import"./LegacyTooltip-DDj7Pmgz.js";import"./useLink-NIXYB2di.js";import"./IconExclamationMarkCircle24-BW3Bxg0w.js";import"./IconQuestionMarkCircle-C8cYJKKB.js";import"./Switch-C2N6EkkU.js";import"./TabItem-Cv_3JCop.js";import"./TextInput-Dz8QchSO.js";import"./Tooltip-CdUOKI5_.js";import"./useClickOutside-Q_ZO0Q94.js";import"./dialog-D9O7a7Fm.js";import"./Tree-BrjqE8_n.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-DMTRwSix.js";const Ft={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,e]=p.useState(!1),r=p.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>e(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>e(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>e(!1)}]})]})})]})},o=h.bind({});o.args={};var m,a,s;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  return <div className="tw-h-32 tw-flex tw-justify-center tw-items-center">
            <Button icon={<IconJohanna />} onClick={() => setIsOpen(!isOpen)} ref={triggerRef}>
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
}`,...(s=(a=o.parameters)==null?void 0:a.docs)==null?void 0:s.source}}};const kt=["WithHeaderAndFooter"];export{o as WithHeaderAndFooter,kt as __namedExportsOrder,Ft as default};
