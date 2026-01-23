import{r as p,j as t}from"./iframe-EAnBKUwW.js";import{a as l}from"./Box-0XmEUewe.js";import{B as d}from"./Button-C4jHKFK9.js";import{D as u}from"./DialogBody-CsKEGXZw.js";import{D as g}from"./DialogFooter-Cy8WmUHK.js";import{D as f}from"./DialogHeader-CSLGkv3d.js";import{P as n}from"./Popover-CnYP8OTZ.js";import{I as x}from"./IconIcon-7uc21ay7.js";import"./preload-helper-D9dL-qgt.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-DkaDrsIb.js";import"./Divider-gBEEXaWE.js";import"./Dropdown-B1Lt8Byy.js";import"./useButton-41t4cyxA.js";import"./useFocusable-DuI7dfbU.js";import"./useFocusRing-BeQFm_V6.js";import"./useEffectEvent-C1lqxX7E.js";import"./chain-EmpxMCW5.js";import"./index-Dr4nN6b0.js";import"./FocusScope-BJLWHjPu.js";import"./useOverlayTriggerState-B3smdlTO.js";import"./useControlledState-CN3IzYYN.js";import"./useMenuTrigger-DLcyDwsq.js";import"./useLabels-DEWZbhOx.js";import"./useLocalizedStringFormatter-C6X_Q_bB.js";import"./context-2GLmmQTX.js";import"./VisuallyHidden-CzVGMPQV.js";import"./helper-CdIpQeou.js";import"./keyboard-BZ6b5TUF.js";import"./SelectionManager-b5QLYy5C.js";import"./useField-DvYtj8qk.js";import"./useFormValidationState-Dre4cyXl.js";import"./usePopper-CPetpVYB.js";import"./index-qBGALtzT.js";import"./MenuItem-C6Fjlc4C.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-DII2jJiv.js";import"./IconCheckMark-CnYP4iYd.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-D5gsxc0H.js";import"./Trigger-C6t7XVPV.js";import"./IconCaretDown-CEoAVXN2.js";import"./IconCaretDown16-DTXLKGRf.js";import"./IconCross-CQ3qrcPd.js";import"./IconExclamationMarkTriangle-CeH_KVhG.js";import"./IconExclamationMarkTriangle24-DKmb3WiR.js";import"./IconTrashBin16-C38eKVWH.js";import"./IconTrashBin24-hC-tYyNL.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-D4qhEscH.js";import"./Portal-BZCteqHW.js";import"./useMemoizedId-C0HR5vRU.js";import"./FormControl-DuADWXuI.js";import"./InputLabel-ChnK1EbS.js";import"./TooltipIcon-BQSnXH9l.js";import"./LegacyTooltip-BJW8lT4k.js";import"./useLink-BYCWLkC0.js";import"./IconExclamationMarkCircle24-B2fHNFvs.js";import"./IconQuestionMarkCircle-C1HsKCLB.js";import"./Switch-D3-ZBx8j.js";import"./TabItem-D5lxDox0.js";import"./TextInput-B06f0icZ.js";import"./Tooltip-mn7uGpA2.js";import"./useClickOutside-BbI0dQrT.js";import"./dialog-D9O7a7Fm.js";import"./Tree-BIAzcwgb.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-7N2jQ5Y0.js";import"./IconIcon16-BBbsSMmW.js";import"./IconIcon24-DULi7rhw.js";const Nt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[e,i]=p.useState(!1),r=p.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>i(!e),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:e,handleClose:()=>i(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>i(!1)}]})]})})]})},o=h.bind({});o.args={};var m,s,a;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
