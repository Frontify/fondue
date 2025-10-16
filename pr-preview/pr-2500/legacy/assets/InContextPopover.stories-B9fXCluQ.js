import{r as p,j as t}from"./iframe-hiR8UZb1.js";import{a as l}from"./Box-BXfZ-YTJ.js";import{B as d}from"./Button-CsgAQ1Ze.js";import{D as u}from"./DialogBody-BXw6sRiq.js";import{D as g}from"./DialogFooter-CMYKUIqn.js";import{D as f}from"./DialogHeader-Bhc9vZ9d.js";import{P as n}from"./Popover-BXyF3xxn.js";import{I as x}from"./IconJohanna-BPcTzuI1.js";import"./preload-helper-C9_mj7KT.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-C-_DQcQy.js";import"./Checkbox-BpCInNI_.js";import"./useFocusable-BCILdq-A.js";import"./useFocusRing-BR2BAc58.js";import"./useEffectEvent-C-IKAOB5.js";import"./chain-DuoQPSqe.js";import"./index-C0843eWw.js";import"./useFormValidationState-CBzLcmFd.js";import"./useControlledState-VHtsEoGt.js";import"./InputLabel-DVTWnutn.js";import"./TooltipIcon-BdKeis3H.js";import"./LegacyTooltip-DA6F3nhF.js";import"./useLink-OqhAq_XY.js";import"./usePopper-iYfCN7OJ.js";import"./index-Bfg3rXQ9.js";import"./Portal-BE88c7bW.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-C8g_De_i.js";import"./IconCheckMark-CPcP6jGi.js";import"./IconExclamationMarkCircle24-CYrEKXzW.js";import"./IconExclamationMarkTriangle-BRLHFmEi.js";import"./IconExclamationMarkTriangle24-C2uA4N2L.js";import"./IconQuestionMarkCircle-DzFus8Aq.js";import"./IconMinus-C_ROGjyB.js";import"./Divider-CVM_OPs0.js";import"./Dropdown-D4YKxmIO.js";import"./useButton-BuTqCltI.js";import"./FocusScope-CLLubA4N.js";import"./useOverlayTriggerState-YZeHQFTN.js";import"./useMenuTrigger-60eNA7wG.js";import"./useLabels-I_WHPtX6.js";import"./useLocalizedStringFormatter-DJNAmz5G.js";import"./context-CZdOiBHj.js";import"./VisuallyHidden-D2FwfA67.js";import"./helper-CuUa8o3V.js";import"./keyboard-DbttWqR4.js";import"./SelectionManager-ewl4jbqQ.js";import"./useField-kpg-rK26.js";import"./MenuItem-exd6RWSR.js";import"./IconCaretRight-BkW49fVC.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-BgTdFwYN.js";import"./Trigger-CRLRbSZf.js";import"./IconCaretDown-BNiERKAd.js";import"./IconCaretDown16-DQy0Wzy6.js";import"./IconCross-WBrqmq48.js";import"./IconTrashBin16-DHV2XC9n.js";import"./IconTrashBin24-D75gAwdl.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-Cbz1aY1U.js";import"./FormControl-Cu-skwPp.js";import"./Switch-DTzFT674.js";import"./TabItem-BGtxtLir.js";import"./TextInput-C5gXopDg.js";import"./Tooltip-D2dj-_xH.js";import"./useClickOutside-DJvglM5I.js";import"./dialog-D9O7a7Fm.js";import"./Tree-ChVxWgYn.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-Cv_55dft.js";const Nt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[e,i]=p.useState(!1),r=p.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>i(!e),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:e,handleClose:()=>i(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>i(!1)}]})]})})]})},o=h.bind({});o.args={};var m,a,s;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
