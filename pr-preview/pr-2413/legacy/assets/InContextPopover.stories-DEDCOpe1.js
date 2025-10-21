import{r as p,j as t}from"./iframe-DFnutv5M.js";import{a as l}from"./Box-CCVc1H_1.js";import{B as d}from"./Button-DvPoOfB7.js";import{D as u}from"./DialogBody-Dv0qt-3k.js";import{D as g}from"./DialogFooter-DQnM0ZEH.js";import{D as f}from"./DialogHeader-poOZ143Q.js";import{P as n}from"./Popover-b660rGi5.js";import{I as x}from"./IconJohanna-DzcnpWC6.js";import"./preload-helper-DI9Pv0v-.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-BZ4Yt3Vy.js";import"./Divider-BnEqrrOk.js";import"./Dropdown-DoUsbxMd.js";import"./useButton-B9ck-Vwc.js";import"./useFocusable-C-JPn9OE.js";import"./useFocusRing-BZNNB2Hj.js";import"./useEffectEvent-DBbK-aqN.js";import"./chain-Dsa_W8ml.js";import"./index-a1h4e75G.js";import"./FocusScope-CzNHlT6r.js";import"./useOverlayTriggerState-BU83XqOv.js";import"./useControlledState-CO8iWZC6.js";import"./useMenuTrigger-NR-AZ6fL.js";import"./useLabels-BgJwTBe8.js";import"./useLocalizedStringFormatter-CI2DTdCM.js";import"./context-CMCPGXhG.js";import"./VisuallyHidden-CP5cAKcA.js";import"./helper-CDma-XAN.js";import"./keyboard-B9Pv78ZV.js";import"./SelectionManager-CSpmgRXH.js";import"./useField-DIDYlmQE.js";import"./useFormValidationState-C58z87tk.js";import"./usePopper-mGKvFZOV.js";import"./index-BvzBMR0H.js";import"./MenuItem-CCE2SmwD.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-Qf6FLOlU.js";import"./IconCheckMark-DIQLzXWs.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-DdXCySpe.js";import"./Trigger-Bc1liQcc.js";import"./IconCaretDown-CntmYteF.js";import"./IconCaretDown16-DXJrcr77.js";import"./IconCross-DSLOUOUE.js";import"./IconExclamationMarkTriangle-Dk_iCro-.js";import"./IconExclamationMarkTriangle24-DXphiQNc.js";import"./IconTrashBin16-m420LrHr.js";import"./IconTrashBin24-DSRZEAzA.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-B4vmv_6a.js";import"./Portal-r1TzMWAQ.js";import"./useMemoizedId-BId1lVLh.js";import"./FormControl-3LdqEtgD.js";import"./InputLabel-B_1U839I.js";import"./TooltipIcon-BRLLXESC.js";import"./LegacyTooltip-gb8qWYaE.js";import"./useLink-B28rYbuM.js";import"./IconExclamationMarkCircle24-Uarnc71I.js";import"./IconQuestionMarkCircle-DXpZoFVo.js";import"./Switch-DVVv0LyY.js";import"./TabItem-BVGGwMV_.js";import"./TextInput-BmJc5mOX.js";import"./Tooltip-Dfn4QrZ1.js";import"./useClickOutside-Cy27KqaZ.js";import"./dialog-D9O7a7Fm.js";import"./Tree-7KbZYas7.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-fKpJkOro.js";const Ft={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,e]=p.useState(!1),r=p.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>e(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>e(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>e(!1)}]})]})})]})},o=h.bind({});o.args={};var m,a,s;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
