import{r as p,j as t}from"./iframe-De5WdDij.js";import{a as l}from"./Box-Bs5EGgiC.js";import{B as d}from"./Button-09EX6ZTM.js";import{D as u}from"./DialogBody-Csx6B1MY.js";import{D as g}from"./DialogFooter-lC62D2cV.js";import{D as f}from"./DialogHeader-826FfkwB.js";import{P as n}from"./Popover-CKf1Rrls.js";import{I as x}from"./IconJohanna-G-raZXPE.js";import"./preload-helper-ClJkntjM.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-DF23E4C5.js";import"./Divider-B_5cdPy3.js";import"./Dropdown-ChyJAipO.js";import"./useButton-wWrMugoC.js";import"./useFocusable-BRaVtCgU.js";import"./useFocusRing-CDNuK9Yy.js";import"./useEffectEvent-Oo8ltylB.js";import"./chain-uDd9vtXp.js";import"./index-OktaPfof.js";import"./FocusScope-Fc_hKNYU.js";import"./useOverlayTriggerState-B9SrujZh.js";import"./useControlledState-Dc1RW1nq.js";import"./useMenuTrigger-CCLXEo6s.js";import"./useLabels-Buo-DWDy.js";import"./useLocalizedStringFormatter-CSBD8Wrw.js";import"./context-IzgTfYKF.js";import"./VisuallyHidden-a9fblbuF.js";import"./helper-BnolPM_n.js";import"./keyboard-Db0PXyBP.js";import"./SelectionManager-Cbaox9XQ.js";import"./useField-ClQqDpYA.js";import"./useFormValidationState-Dvh7J7d5.js";import"./usePopper-CPSdMAYJ.js";import"./index-BMpwRIf4.js";import"./MenuItem-CB3827LO.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-CZbFa_6C.js";import"./IconCheckMark-Dwl8F3NX.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-Gd4Agliv.js";import"./Trigger-D24NGVoU.js";import"./IconCaretDown-qTkkGzu1.js";import"./IconCaretDown16-B-zdzFN4.js";import"./IconCross-BPIha1Ld.js";import"./IconExclamationMarkTriangle-D7c6olcW.js";import"./IconExclamationMarkTriangle24-DIV8Z7-v.js";import"./IconTrashBin16-CJnKFFEA.js";import"./IconTrashBin24-Ok3Wr0xL.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-CR6SPP09.js";import"./Portal-Gz9-g2Z0.js";import"./useMemoizedId-C_RAM1u5.js";import"./FormControl-BVqhXDip.js";import"./InputLabel-BIycgYsu.js";import"./TooltipIcon-CkQrSsNW.js";import"./LegacyTooltip-k6QBDt5j.js";import"./useLink-Dlv3Y4nM.js";import"./IconExclamationMarkCircle24-Y07_rCrq.js";import"./IconQuestionMarkCircle-CwIRfAjS.js";import"./Switch-DDaCN14y.js";import"./TabItem-CZyEI5Y9.js";import"./TextInput-D-oGAlNq.js";import"./Tooltip-DDutmWKf.js";import"./useClickOutside-DTMqyjhj.js";import"./dialog-D9O7a7Fm.js";import"./Tree-CawA_3wD.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-DgCziaq_.js";const Ft={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,e]=p.useState(!1),r=p.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>e(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>e(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>e(!1)}]})]})})]})},o=h.bind({});o.args={};var m,a,s;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
