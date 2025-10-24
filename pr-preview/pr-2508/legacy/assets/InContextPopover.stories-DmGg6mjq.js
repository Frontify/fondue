import{r as p,j as t}from"./iframe-G9JT5kV6.js";import{a as l}from"./Box-BXjR2_Z3.js";import{B as d}from"./Button-Bab7Gocy.js";import{D as u}from"./DialogBody-DLPbsoos.js";import{D as g}from"./DialogFooter-Dt_4_q07.js";import{D as f}from"./DialogHeader-D0aFozgS.js";import{P as n}from"./Popover-D-OM7FjU.js";import{I as x}from"./IconJohanna-C4neRtvt.js";import"./preload-helper-BT-T7auE.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-CyIEBhYg.js";import"./Divider-BphgxLdT.js";import"./Dropdown-DKBYnEUG.js";import"./useButton-DRJTCrJS.js";import"./useFocusable-_OrUWNR5.js";import"./useFocusRing-nqJc486L.js";import"./useEffectEvent-BtkyKS4G.js";import"./chain-Dq4AkA76.js";import"./index-ixDem6kg.js";import"./FocusScope-BQmzPqxS.js";import"./useOverlayTriggerState-CMU_LIfs.js";import"./useControlledState-Cj5gkz49.js";import"./useMenuTrigger-BlRHj5bV.js";import"./useLabels-KuIW6JFx.js";import"./useLocalizedStringFormatter-M66PnT3E.js";import"./context-D-Ee0elB.js";import"./VisuallyHidden-e-4RAJYE.js";import"./helper-C4FDoqim.js";import"./keyboard-BKMGdIrx.js";import"./SelectionManager-BxHqVy6b.js";import"./useField-B7g4wq1Y.js";import"./useFormValidationState-CYiU8C3p.js";import"./usePopper-CO8wOoTT.js";import"./index-BIhVL1ld.js";import"./MenuItem-DdrQgOb6.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-1JdDjgKO.js";import"./IconCheckMark-BSYvEIzf.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-BnxRTcOc.js";import"./Trigger-B8TaoXJF.js";import"./IconCaretDown-CrHZrdXv.js";import"./IconCaretDown16-DcFtQQYB.js";import"./IconCross-Bqxox6ZH.js";import"./IconExclamationMarkTriangle-DVD-it4x.js";import"./IconExclamationMarkTriangle24-DCgtctLG.js";import"./IconTrashBin16-C34r7-hb.js";import"./IconTrashBin24-D6DR5WcG.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-u-oEUjA8.js";import"./Portal-BaI4ybdx.js";import"./useMemoizedId-TQZvyQJc.js";import"./FormControl-Cp0g-HlA.js";import"./InputLabel-TK4YHNFL.js";import"./TooltipIcon-D4kwX34e.js";import"./LegacyTooltip-Dp6OP9ku.js";import"./useLink-CXoGfmc2.js";import"./IconExclamationMarkCircle24-Yrdvbpyd.js";import"./IconQuestionMarkCircle-COwcdCLG.js";import"./Switch-DK-d02t4.js";import"./TabItem-BJhUeMKX.js";import"./TextInput-CZsf1API.js";import"./Tooltip-CTni-LrV.js";import"./useClickOutside-Riqja6k4.js";import"./dialog-D9O7a7Fm.js";import"./Tree-CEaSpKgj.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-CFQIkk-S.js";const Ft={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,e]=p.useState(!1),r=p.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>e(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>e(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>e(!1)}]})]})})]})},o=h.bind({});o.args={};var m,a,s;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
