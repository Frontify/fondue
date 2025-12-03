import{r as p,j as t}from"./iframe-DeHAHo2O.js";import{a as l}from"./Box-CYxxidOu.js";import{B as d}from"./Button-XeATRVB6.js";import{D as u}from"./DialogBody-DL8vE1oH.js";import{D as g}from"./DialogFooter-DBlywyB7.js";import{D as f}from"./DialogHeader-ix05pcTc.js";import{P as n}from"./Popover-nCiGgN8s.js";import{I as x}from"./IconIcon-BLbkrLUw.js";import"./preload-helper-1L8wWKLL.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-DbTBvo6h.js";import"./Divider-AunlJTwo.js";import"./Dropdown-CPWczZou.js";import"./useButton-DMcNng1z.js";import"./useFocusable-Cx6UClPu.js";import"./useFocusRing-mB5qeJ04.js";import"./useEffectEvent-z6oLVS9-.js";import"./chain-BUVmghN3.js";import"./index-r0OKhC8Q.js";import"./FocusScope-BdlMD4Yu.js";import"./useOverlayTriggerState-CvsjBNiZ.js";import"./useControlledState-Br1r4vIG.js";import"./useMenuTrigger-B6jxNwcP.js";import"./useLabels-BkYzxx14.js";import"./useLocalizedStringFormatter-BRbC8G8c.js";import"./context-hGU2fCsi.js";import"./VisuallyHidden-B7YsmtVf.js";import"./helper-Cf03TuNF.js";import"./keyboard-Dn8uKP3f.js";import"./SelectionManager-DH1yA4vK.js";import"./useField-CvLglrIT.js";import"./useFormValidationState-QO7fvPwD.js";import"./usePopper-dhPiNd2g.js";import"./index-DHbYGvEM.js";import"./MenuItem-Bmc9YqKf.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-BATNqyD1.js";import"./IconCheckMark-HBwhNn3e.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-C72EU5gX.js";import"./Trigger-DyuqwTZt.js";import"./IconCaretDown-B5WDuPoQ.js";import"./IconCaretDown16-Rghdt45D.js";import"./IconCross-nsGTd93L.js";import"./IconExclamationMarkTriangle-CuplyEgY.js";import"./IconExclamationMarkTriangle24-kfeUPeJ-.js";import"./IconTrashBin16-UcKIhf9C.js";import"./IconTrashBin24-BsnN7OSn.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-DUTWRUSV.js";import"./Portal-8lp-5d0y.js";import"./useMemoizedId-B7oc4VDX.js";import"./FormControl-hi5Ik-iU.js";import"./InputLabel-CV2tUH8t.js";import"./TooltipIcon-VUEuyZak.js";import"./LegacyTooltip-6IXUBNNu.js";import"./useLink-CnAHkscR.js";import"./IconExclamationMarkCircle24-C37jI8Jz.js";import"./IconQuestionMarkCircle-Cdp-yedE.js";import"./Switch-BZRO7Ing.js";import"./TabItem-DKyhZ-ff.js";import"./TextInput-BVn6BAjb.js";import"./Tooltip-0UlcUHze.js";import"./useClickOutside-CKkB_vX5.js";import"./dialog-D9O7a7Fm.js";import"./Tree-D_8Bk90C.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-DOm7EKbr.js";import"./IconIcon16-CcHE2ZLm.js";import"./IconIcon24-BLfDtBMf.js";const Nt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[e,i]=p.useState(!1),r=p.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>i(!e),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:e,handleClose:()=>i(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>i(!1)}]})]})})]})},o=h.bind({});o.args={};var m,s,a;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
