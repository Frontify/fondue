import{r as p,j as t}from"./iframe-B6Fsh8wO.js";import{a as l}from"./Box-DZIHhLpx.js";import{B as d}from"./Button-CTeWu5QI.js";import{D as u}from"./DialogBody-sd0Hzl4i.js";import{D as g}from"./DialogFooter-BFAaz8La.js";import{D as f}from"./DialogHeader-h26iPr-C.js";import{P as n}from"./Popover-CP4106qQ.js";import{I as x}from"./IconIcon-X4VK5Uiq.js";import"./preload-helper-C7xgB0v-.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-SgIqKYa5.js";import"./Divider-Bnk8qrLs.js";import"./Dropdown-BEGPwQIj.js";import"./useButton-C_YFdV8A.js";import"./useFocusable-CeOvDitS.js";import"./useFocusRing-Bdrp9XdB.js";import"./useEffectEvent-Dl59sVm-.js";import"./chain-C6B0p970.js";import"./index-CoZ5L15w.js";import"./FocusScope-ClH7KjZa.js";import"./useOverlayTriggerState-1mg1A1KF.js";import"./useControlledState-CJn3VMU_.js";import"./useMenuTrigger-BYllBfWO.js";import"./useLabels-zcWK2wri.js";import"./useLocalizedStringFormatter-CQaq9hql.js";import"./context-CsJ_YUC1.js";import"./VisuallyHidden-DG9XBPVM.js";import"./helper-BJlGUtn-.js";import"./keyboard-Cw3s1FpC.js";import"./SelectionManager-Bua5579K.js";import"./useField-CSBdA6n2.js";import"./useFormValidationState-cJc_Go-N.js";import"./usePopper-B0nz0Esg.js";import"./index-Bx1oau7k.js";import"./MenuItem-CradgR82.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-DpO6Gkbq.js";import"./IconCheckMark-DssBFA02.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-BbWdkKq5.js";import"./Trigger-CFa4fkib.js";import"./IconCaretDown-B5NftqOx.js";import"./IconCaretDown16-a2jOArLI.js";import"./IconCross-CoWtkC50.js";import"./IconExclamationMarkTriangle-C2uJYOwY.js";import"./IconExclamationMarkTriangle24-DDo1kmbH.js";import"./IconTrashBin16-BvngYm6R.js";import"./IconTrashBin24-Coai0v3x.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-BvIBe2v_.js";import"./Portal-ig7PMOYe.js";import"./useMemoizedId-DHoNY-YT.js";import"./FormControl-CZcnzlmK.js";import"./InputLabel-C3itSB6h.js";import"./TooltipIcon-BseKfH2P.js";import"./LegacyTooltip-DclvBP1X.js";import"./useLink-Dk33Rpfs.js";import"./IconExclamationMarkCircle24-xFA6TqE-.js";import"./IconQuestionMarkCircle-sp7lPGqD.js";import"./Switch-DUWVxLi-.js";import"./TabItem-1rwAvsm2.js";import"./TextInput-B_U6EtAR.js";import"./Tooltip-DWGrBfIB.js";import"./useClickOutside-BAGN5dDk.js";import"./dialog-D9O7a7Fm.js";import"./Tree-Cyx_z67h.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-BUlXl2Xn.js";import"./IconIcon16-C5UnHEsZ.js";import"./IconIcon24-CCm8Wx90.js";const Nt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[e,i]=p.useState(!1),r=p.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>i(!e),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:e,handleClose:()=>i(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>i(!1)}]})]})})]})},o=h.bind({});o.args={};var m,s,a;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
