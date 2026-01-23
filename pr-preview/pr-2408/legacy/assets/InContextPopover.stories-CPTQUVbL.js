import{r as p,j as t}from"./iframe-BMoEVkia.js";import{a as l}from"./Box-Ck0wkAr4.js";import{B as d}from"./Button-CMxzLdN7.js";import{D as u}from"./DialogBody-BKUtSbj7.js";import{D as g}from"./DialogFooter-CpT8ta-c.js";import{D as f}from"./DialogHeader-C5t-mUp3.js";import{P as n}from"./Popover-BXBx0d8d.js";import{I as x}from"./IconIcon-CSh3-jGx.js";import"./preload-helper-DyHTrhc7.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-DnJps9Th.js";import"./Divider-ogvYhdWC.js";import"./Dropdown-h-_P0JcJ.js";import"./useButton-xnxPy2XF.js";import"./useFocusable-Cp2GeeMz.js";import"./useFocusRing-C73RBflu.js";import"./useLayoutEffect-rRRXELWE.js";import"./chain-DdvpU25y.js";import"./index-FARF4T7D.js";import"./FocusScope-BWWCni5r.js";import"./useOverlayTriggerState-BscwV0_k.js";import"./useControlledState-DLOCLdQG.js";import"./useMenuTrigger-BjJQY40i.js";import"./useLabels-C6e4wMf2.js";import"./useLocalizedStringFormatter-BIB_5D2d.js";import"./context-M0dbH2oo.js";import"./VisuallyHidden-g2kmG1TR.js";import"./helper-C8VoCvyE.js";import"./keyboard-BKPY6eUK.js";import"./SelectionManager-CpptwNa1.js";import"./useField-CPaAlSWD.js";import"./useFormValidationState-DLDuLEaJ.js";import"./usePopper-C5V21KjV.js";import"./index-64kaxFay.js";import"./MenuItem-CwVw2b8z.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-D9ce8Ep2.js";import"./IconCheckMark-D7Vq66o9.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-3kSH1pYv.js";import"./Trigger-qElrFG2x.js";import"./IconCaretDown-CYC5SuWc.js";import"./IconCaretDown16-DYRPZHz8.js";import"./IconCross-r6CCOpp8.js";import"./IconExclamationMarkTriangle-BT5YClV6.js";import"./IconExclamationMarkTriangle24-8EVQOO01.js";import"./IconTrashBin16-BuG0O87O.js";import"./IconTrashBin24-Mt8xpYuL.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-CubsVp9j.js";import"./Portal-mlOdlOHj.js";import"./useMemoizedId-CMP0SDkl.js";import"./FormControl-Dldgd06i.js";import"./InputLabel-jBmbu52z.js";import"./TooltipIcon-CSWY0EL4.js";import"./LegacyTooltip-wjZJe6RC.js";import"./useLink-C7m8Sslo.js";import"./IconExclamationMarkCircle24-DwIlh9zC.js";import"./IconQuestionMarkCircle-CLss9Dli.js";import"./Switch-BxoXzsTj.js";import"./TabItem-DfMYK3dV.js";import"./TextInput-BNVRlzHU.js";import"./Tooltip-CDntw8rD.js";import"./useClickOutside-DvH66BFI.js";import"./dialog-D9O7a7Fm.js";import"./Tree-Dua2iz_i.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-BEfuIy4-.js";import"./IconIcon16-CBFc7K1s.js";import"./IconIcon24-Bg5pNJ11.js";const Nt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[e,i]=p.useState(!1),r=p.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>i(!e),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:e,handleClose:()=>i(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>i(!1)}]})]})})]})},o=h.bind({});o.args={};var m,s,a;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
