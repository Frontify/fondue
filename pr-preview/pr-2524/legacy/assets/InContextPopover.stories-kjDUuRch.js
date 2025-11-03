import{r as p,j as t}from"./iframe-DHJNyQxo.js";import{a as l}from"./Box-C_iYJlA_.js";import{B as d}from"./Button-Bz5l9fFw.js";import{D as u}from"./DialogBody-B4X60cKO.js";import{D as g}from"./DialogFooter-BZ9Ove5l.js";import{D as f}from"./DialogHeader-DutIkZ5-.js";import{P as n}from"./Popover-BQWQWqqQ.js";import{I as x}from"./IconIcon-BNQ-ve5p.js";import"./preload-helper-B3whO8fc.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-D_k0C73b.js";import"./Divider-BXeSGeKm.js";import"./Dropdown-d5_LYKcZ.js";import"./useButton-DwubD-XP.js";import"./useFocusable-D5HdRnEL.js";import"./useFocusRing-DhzU2rzG.js";import"./useEffectEvent-DYQItPuc.js";import"./chain-B5RY7uR0.js";import"./index-BxGX3BcV.js";import"./FocusScope-DX9B5RKj.js";import"./useOverlayTriggerState-BEkkRvA4.js";import"./useControlledState-DUIHJl1j.js";import"./useMenuTrigger-CjE0IAFF.js";import"./useLabels-CfNjFPp8.js";import"./useLocalizedStringFormatter-D1oZF1Ci.js";import"./context-BlFbVras.js";import"./VisuallyHidden-JaYy16_u.js";import"./helper-DQGEWuSf.js";import"./keyboard-C3lyFOtL.js";import"./SelectionManager-Br4fKZAs.js";import"./useField-54V9F_KU.js";import"./useFormValidationState-j_DXGcLe.js";import"./usePopper-CVebcDly.js";import"./index-BO7U6kLL.js";import"./MenuItem-BNKaaE7-.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-C3fT22HC.js";import"./IconCheckMark-C0I6DwCb.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-DlwenYNP.js";import"./Trigger-DvjgR99v.js";import"./IconCaretDown-Dn1fGRBq.js";import"./IconCaretDown16-Bt3L5TZm.js";import"./IconCross-CeLFj-Tn.js";import"./IconExclamationMarkTriangle-D-qwnL_a.js";import"./IconExclamationMarkTriangle24-Bcm1eOQj.js";import"./IconTrashBin16-BgOvfRku.js";import"./IconTrashBin24-Ba6vzsX_.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-DIZ4PN6h.js";import"./Portal-BBTX_6xk.js";import"./useMemoizedId-BjgiKJF8.js";import"./FormControl-D_wxmtI1.js";import"./InputLabel-BC2n9p1e.js";import"./TooltipIcon-sv_lbCi_.js";import"./LegacyTooltip-2VrwoOLQ.js";import"./useLink-C3wnjwwv.js";import"./IconExclamationMarkCircle24-GljXm9kR.js";import"./IconQuestionMarkCircle-C1-1BR4o.js";import"./Switch-fnjkMqwf.js";import"./TabItem-Czu4RU1S.js";import"./TextInput-DVwsuleh.js";import"./Tooltip-o6mjVQnL.js";import"./useClickOutside-CvOBOSKF.js";import"./dialog-D9O7a7Fm.js";import"./Tree-D0c1EG9_.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-COgZPegj.js";import"./IconIcon16-1P5WiTce.js";import"./IconIcon24-BS-upCXW.js";const Nt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[e,i]=p.useState(!1),r=p.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>i(!e),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:e,handleClose:()=>i(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>i(!1)}]})]})})]})},o=h.bind({});o.args={};var m,s,a;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
