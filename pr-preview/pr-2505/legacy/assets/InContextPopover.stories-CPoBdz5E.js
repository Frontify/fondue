import{r as p,j as t}from"./iframe-O6Xb67gi.js";import{a as l}from"./Box-BHmfZPGu.js";import{B as d}from"./Button-fwlsdqhf.js";import{D as u}from"./DialogBody-BPYdeEy2.js";import{D as g}from"./DialogFooter-CtJjVeuI.js";import{D as f}from"./DialogHeader-4GGBaOqD.js";import{P as n}from"./Popover-DWHXMxtP.js";import{I as x}from"./IconJohanna-Ba-KF0gm.js";import"./preload-helper-DpV-BRze.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-C1Wd_Pe4.js";import"./Divider-OLZKORyi.js";import"./Dropdown-DkJ1LQLr.js";import"./useButton-D5BwoBXI.js";import"./useFocusable-CIKgwDH6.js";import"./useFocusRing-CHeGnMQA.js";import"./useEffectEvent-DTA_MKoh.js";import"./chain-CQUeJXJW.js";import"./index-CQ6zbiUp.js";import"./FocusScope--mUmRhU_.js";import"./useOverlayTriggerState-C-z83KL3.js";import"./useControlledState-Bqg_pIq_.js";import"./useMenuTrigger-BdgnVO0V.js";import"./useLabels-BSIpPAgP.js";import"./useLocalizedStringFormatter-Cz4luPbj.js";import"./context-ByKPL08u.js";import"./VisuallyHidden-B2p5YlCX.js";import"./helper-DUvrElbv.js";import"./keyboard-B1J9S0AG.js";import"./SelectionManager-bbMc2UWc.js";import"./useField-CsabfYa2.js";import"./useFormValidationState-DWOowmKC.js";import"./usePopper-DUNlXtjr.js";import"./index-B9jSwJHi.js";import"./MenuItem-DBzSyDfl.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-C-Bl03aw.js";import"./IconCheckMark-CKGB0Mef.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-BypHdLvW.js";import"./Trigger-DPZTu-hN.js";import"./IconCaretDown-CbXQpFjn.js";import"./IconCaretDown16-spw0sC6J.js";import"./IconCross-BxWaSX4m.js";import"./IconExclamationMarkTriangle-C1H0ir6P.js";import"./IconExclamationMarkTriangle24-DYPgUd-A.js";import"./IconTrashBin16-DBuvi8VI.js";import"./IconTrashBin24-1mHVIMfW.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-D4p2tHkH.js";import"./Portal-D436pgRI.js";import"./useMemoizedId-DoJPVw-z.js";import"./FormControl-By4HoBU2.js";import"./InputLabel-Bhp6BFGH.js";import"./TooltipIcon-COw8BRsT.js";import"./LegacyTooltip-Bv0XhaDP.js";import"./useLink-BbG6K7ZD.js";import"./IconExclamationMarkCircle24-1lif7gA0.js";import"./IconQuestionMarkCircle-BIFVHJje.js";import"./Switch-OtYNeozi.js";import"./TabItem-B01iiyD0.js";import"./TextInput-CfBurs0_.js";import"./Tooltip-BsVrbu4u.js";import"./useClickOutside--9sKWVao.js";import"./dialog-D9O7a7Fm.js";import"./Tree-BAe8On3F.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-Br6p_LRl.js";const Ft={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,e]=p.useState(!1),r=p.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>e(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>e(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>e(!1)}]})]})})]})},o=h.bind({});o.args={};var m,a,s;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
