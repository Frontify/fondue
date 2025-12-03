import{r as p,j as t}from"./iframe-C_GHvEZT.js";import{a as l}from"./Box-Cip11ddf.js";import{B as d}from"./Button-CQIP-Mg7.js";import{D as u}from"./DialogBody-Ddab9o3Q.js";import{D as g}from"./DialogFooter-BKNDwWdx.js";import{D as f}from"./DialogHeader-BGO12afH.js";import{P as n}from"./Popover-XnIH5Hxc.js";import{I as x}from"./IconIcon-CJF9oIkb.js";import"./preload-helper-OAyExbmo.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-DWfECB1-.js";import"./Divider-yIGg7oPq.js";import"./Dropdown-D_WKyz9W.js";import"./useButton-C7l_P4Iy.js";import"./useFocusable-C2iFP6iC.js";import"./useFocusRing-CJnEQ5am.js";import"./useEffectEvent-DAjv-Jen.js";import"./chain-6Jk1-UC4.js";import"./index-QJjDQ7Xf.js";import"./FocusScope-B7wUO5Zj.js";import"./useOverlayTriggerState-Cp0OKtOG.js";import"./useControlledState-PjtM5WBE.js";import"./useMenuTrigger-Dcmx8nxf.js";import"./useLabels-CwKCfnBg.js";import"./useLocalizedStringFormatter-CPtoQqLu.js";import"./context-CWf9WvL2.js";import"./VisuallyHidden-Mw1FRbj3.js";import"./helper-kkuNsIZ9.js";import"./keyboard-BhRelnxJ.js";import"./SelectionManager-g-kljnEN.js";import"./useField-Bor0JvY9.js";import"./useFormValidationState-BbZ2eqzz.js";import"./usePopper-m4Bd7R8k.js";import"./index-CO1OXd26.js";import"./MenuItem-B91LYjLU.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-Bcj82g9d.js";import"./IconCheckMark-BAqkuMY0.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-DOm0I8Jz.js";import"./Trigger-BlSq6oYu.js";import"./IconCaretDown-CNstUptU.js";import"./IconCaretDown16-Dj8XnOCu.js";import"./IconCross-BC056rW2.js";import"./IconExclamationMarkTriangle-yZZexPcC.js";import"./IconExclamationMarkTriangle24-D9T-eMHY.js";import"./IconTrashBin16-C5OpDg77.js";import"./IconTrashBin24-BfqsuaLi.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-dLxVMZI8.js";import"./Portal-DtuayT2h.js";import"./useMemoizedId-q3VnK7Ir.js";import"./FormControl-DcjwG3O_.js";import"./InputLabel-CefsbhdV.js";import"./TooltipIcon-Vxr-uYi6.js";import"./LegacyTooltip-RHdatcnr.js";import"./useLink-CS0k3SZc.js";import"./IconExclamationMarkCircle24-yNkh65l8.js";import"./IconQuestionMarkCircle-CBe0CFaE.js";import"./Switch-B_kakr_h.js";import"./TabItem-Dd-JX1VM.js";import"./TextInput-Cf5p4-Xc.js";import"./Tooltip-CvP4Pgth.js";import"./useClickOutside-BcxbmJP1.js";import"./dialog-D9O7a7Fm.js";import"./Tree-D-LlCZ9K.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-CHThfdJ0.js";import"./IconIcon16-BbJwZtGO.js";import"./IconIcon24-Dn_YClL_.js";const Nt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[e,i]=p.useState(!1),r=p.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>i(!e),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:e,handleClose:()=>i(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>i(!1)}]})]})})]})},o=h.bind({});o.args={};var m,s,a;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
