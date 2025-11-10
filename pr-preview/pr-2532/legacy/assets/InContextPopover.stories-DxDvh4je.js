import{r as p,j as t}from"./iframe-C8H_7DY9.js";import{a as l}from"./Box-BO92NLkH.js";import{B as d}from"./Button-DVNUWGG3.js";import{D as u}from"./DialogBody-B3QbHjug.js";import{D as g}from"./DialogFooter-iBIG1TGN.js";import{D as f}from"./DialogHeader-DeHojW63.js";import{P as n}from"./Popover-C7Q3pQ1j.js";import{I as x}from"./IconIcon-iGJQ7amK.js";import"./preload-helper-DXpIkoC8.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-Czrebvap.js";import"./Divider-BpmF_J73.js";import"./Dropdown-DfNjV_ZV.js";import"./useButton-t9MXzejI.js";import"./useFocusable-8qbfmW5v.js";import"./useFocusRing-CJxA-gpa.js";import"./useEffectEvent-VMJO_dOH.js";import"./chain-BXb1kVuv.js";import"./index-DZCJL87_.js";import"./FocusScope-C1bX1n8D.js";import"./useOverlayTriggerState-DC6hQTLJ.js";import"./useControlledState-C2cdbZxy.js";import"./useMenuTrigger-BjcfuX5m.js";import"./useLabels-72emSVl1.js";import"./useLocalizedStringFormatter-cm118eAR.js";import"./context-BTMC7ivx.js";import"./VisuallyHidden-BoBFLgJk.js";import"./helper-CmB9xjw3.js";import"./keyboard-BenEYFGr.js";import"./SelectionManager-COazW9mI.js";import"./useField-DaD3Atg1.js";import"./useFormValidationState-DpfiB6vy.js";import"./usePopper-vtl3bzbL.js";import"./index-C3FFT934.js";import"./MenuItem-B0WXsgJ8.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-DOUKjwPz.js";import"./IconCheckMark-B_lKELEt.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-BdlCAikA.js";import"./Trigger-C--yUzlG.js";import"./IconCaretDown-CTppYQfl.js";import"./IconCaretDown16-B77Q68v1.js";import"./IconCross-CiHpCsD-.js";import"./IconExclamationMarkTriangle-CS0LP3d9.js";import"./IconExclamationMarkTriangle24-DG07jT0q.js";import"./IconTrashBin16-B9SVOy9U.js";import"./IconTrashBin24-v7uaG4hB.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-Civee1Xz.js";import"./Portal-CTZNYkGv.js";import"./useMemoizedId-DVcqOGKj.js";import"./FormControl-M1v2DF3z.js";import"./InputLabel-CBDugHuf.js";import"./TooltipIcon-Mqj9Z8ia.js";import"./LegacyTooltip-B_h0nf2a.js";import"./useLink-s7baPPKW.js";import"./IconExclamationMarkCircle24-Ca9Amb8y.js";import"./IconQuestionMarkCircle-BXeztdNR.js";import"./Switch-DNNxcjn1.js";import"./TabItem-CUf-Qhvj.js";import"./TextInput-Cqo3PLSF.js";import"./Tooltip-BP3Y9Y1a.js";import"./useClickOutside-C6oP5oUz.js";import"./dialog-D9O7a7Fm.js";import"./Tree-DUasgvv9.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-CcBjfhJJ.js";import"./IconIcon16-BVUNeovq.js";import"./IconIcon24-Bq4bkSOT.js";const Nt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[e,i]=p.useState(!1),r=p.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>i(!e),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:e,handleClose:()=>i(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>i(!1)}]})]})})]})},o=h.bind({});o.args={};var m,s,a;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
