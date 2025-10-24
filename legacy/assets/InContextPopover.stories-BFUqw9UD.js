import{r as p,j as t}from"./iframe-xk1vLOp0.js";import{a as l}from"./Box-mEuDaPks.js";import{B as d}from"./Button-BDfk1GAp.js";import{D as u}from"./DialogBody-E_gVVTTf.js";import{D as g}from"./DialogFooter-4WGPY_an.js";import{D as f}from"./DialogHeader-XBbhjcOj.js";import{P as n}from"./Popover-B0tEvzGo.js";import{I as x}from"./IconJohanna-BgjyQkVb.js";import"./preload-helper-C1FmrZbK.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-DQi93OXc.js";import"./Checkbox-BDHm3nmY.js";import"./useFocusable-DMpt9YP_.js";import"./useFocusRing-Cd2XRZg0.js";import"./useEffectEvent-BjDNl9OE.js";import"./chain-Ct5H3mE4.js";import"./index-CfHX2Wg2.js";import"./useFormValidationState-C4HEZm9c.js";import"./useControlledState-sFywO5I-.js";import"./InputLabel-CKCtkZJu.js";import"./TooltipIcon-CjhCXMFE.js";import"./LegacyTooltip-DFmu5-8O.js";import"./useLink-BuoFStRX.js";import"./usePopper-Ja3ynHP-.js";import"./index-v42I2N6P.js";import"./Portal-CcS2aujD.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-DNCYjqen.js";import"./IconCheckMark-CZRtbEQD.js";import"./IconExclamationMarkCircle24-D7sTGgkk.js";import"./IconExclamationMarkTriangle-D1Rp3cke.js";import"./IconExclamationMarkTriangle24-Dcd-X1K7.js";import"./IconQuestionMarkCircle-BvBztHwq.js";import"./IconMinus-CyK0suNY.js";import"./Divider-c1srpwsu.js";import"./Dropdown-D4CKN3Yl.js";import"./useButton-DVBleBPx.js";import"./FocusScope-EbRQ0Guv.js";import"./useOverlayTriggerState-D-Z8dNYM.js";import"./useMenuTrigger-DHZu3ZPY.js";import"./useLabels-lxgQttMN.js";import"./useLocalizedStringFormatter-i_SGUCjN.js";import"./context-BZ0Ub6M7.js";import"./VisuallyHidden-CR78Mz5T.js";import"./helper-Cai0qWzg.js";import"./keyboard-yMV5D90t.js";import"./SelectionManager-BOLg2PNO.js";import"./useField-Bu-QY__9.js";import"./MenuItem-fUS3Gbeo.js";import"./IconCaretRight-BbznFg1A.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-BJF6o0jm.js";import"./Trigger-BJxh1iXv.js";import"./IconCaretDown-x05uh9Bd.js";import"./IconCaretDown16-Dah412Df.js";import"./IconCross-_hgb6uSI.js";import"./IconTrashBin16-BRdjN3Qb.js";import"./IconTrashBin24-CFcOsdbb.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-DxmYvQ98.js";import"./FormControl-pa0Ro9Q8.js";import"./Switch-CeWE716z.js";import"./TabItem-D54vmuw7.js";import"./TextInput-Bof6OvPM.js";import"./Tooltip-D0_Z4MgN.js";import"./useClickOutside-WTAjM1BO.js";import"./dialog-D9O7a7Fm.js";import"./Tree-eLoCCjyC.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-B3F-pczw.js";const Nt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[e,i]=p.useState(!1),r=p.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>i(!e),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:e,handleClose:()=>i(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>i(!1)}]})]})})]})},o=h.bind({});o.args={};var m,a,s;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
}`,...(s=(a=o.parameters)==null?void 0:a.docs)==null?void 0:s.source}}};const Lt=["WithHeaderAndFooter"];export{o as WithHeaderAndFooter,Lt as __namedExportsOrder,Nt as default};
