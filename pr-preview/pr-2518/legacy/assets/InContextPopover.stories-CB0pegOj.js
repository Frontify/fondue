import{r as p,j as t}from"./iframe-vjbYvHXD.js";import{a as l}from"./Box-Bwp3i62f.js";import{B as d}from"./Button-lhTfhg7d.js";import{D as u}from"./DialogBody-rQWIk067.js";import{D as g}from"./DialogFooter-CPpI_GfE.js";import{D as f}from"./DialogHeader-BaAFmvMe.js";import{P as n}from"./Popover-B0sGFmMo.js";import{I as x}from"./IconIcon-CE2cQ8pQ.js";import"./preload-helper-D9dL-qgt.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-fcS-PJ4Z.js";import"./Divider-CuFPhQ6S.js";import"./Dropdown-BSAzKnZF.js";import"./useButton-CxkdNakB.js";import"./useFocusable-ByREZ_n_.js";import"./useFocusRing-CsZ9CHXr.js";import"./useEffectEvent-CTQjz-1h.js";import"./chain-B-60xBaJ.js";import"./index-7nxr46c5.js";import"./FocusScope-CLzN_lI2.js";import"./useOverlayTriggerState-B81FpLIC.js";import"./useControlledState-COAt9VZQ.js";import"./useMenuTrigger-DPQNAKRw.js";import"./useLabels-Db1-Bo-V.js";import"./useLocalizedStringFormatter-BepfFFxN.js";import"./context-9Ze-MI-m.js";import"./VisuallyHidden-rr0pwMtP.js";import"./helper-BzVKhoc9.js";import"./keyboard-JWSOmIrU.js";import"./SelectionManager-DLk5Bhmx.js";import"./useField-Dii7Ap5y.js";import"./useFormValidationState-DhSBWnv0.js";import"./usePopper-BxbMqRB2.js";import"./index-D6FU8wL4.js";import"./MenuItem-BxlFqfFZ.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-DCeo5KTY.js";import"./IconCheckMark-DefVy1w1.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-DyUqzlpN.js";import"./Trigger-IeR8b6zt.js";import"./IconCaretDown-zm52kRBZ.js";import"./IconCaretDown16-ln6Oz95d.js";import"./IconCross-DSBvcEAU.js";import"./IconExclamationMarkTriangle-gKRpV5Gs.js";import"./IconExclamationMarkTriangle24-BHHbNpkJ.js";import"./IconTrashBin16-dfdTfdUx.js";import"./IconTrashBin24-BYrHxqvh.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-C6HwsMzv.js";import"./Portal-CgK8zL4W.js";import"./useMemoizedId-C05Z425a.js";import"./FormControl-DoQSNUge.js";import"./InputLabel-CoPfkvwk.js";import"./TooltipIcon-BqrO-IBv.js";import"./LegacyTooltip-CJWD8yyY.js";import"./useLink-CeyolHSB.js";import"./IconExclamationMarkCircle24-DqowYawI.js";import"./IconQuestionMarkCircle-DYdPob5o.js";import"./Switch-CyEhT5DE.js";import"./TabItem-K8h6fVvz.js";import"./TextInput-BjgdiGrp.js";import"./Tooltip-DIcCdMDS.js";import"./useClickOutside-5e2WfSL9.js";import"./dialog-D9O7a7Fm.js";import"./Tree-C3-VaJJR.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-Ciur6B89.js";import"./IconIcon16-Dlwz-4vh.js";import"./IconIcon24-DOAzCn2c.js";const Nt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[e,i]=p.useState(!1),r=p.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>i(!e),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:e,handleClose:()=>i(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>i(!1)}]})]})})]})},o=h.bind({});o.args={};var m,s,a;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
