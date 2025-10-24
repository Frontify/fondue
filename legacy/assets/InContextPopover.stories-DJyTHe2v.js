import{r as p,j as t}from"./iframe-Syg1N3Dt.js";import{a as l}from"./Box-CaWE6VsJ.js";import{B as d}from"./Button-BFs_n6MT.js";import{D as u}from"./DialogBody-CxRHQV_R.js";import{D as g}from"./DialogFooter-TfVlZPJU.js";import{D as f}from"./DialogHeader-AVjbBN5c.js";import{P as n}from"./Popover-Y4qSLRCI.js";import{I as x}from"./IconIcon-DCZWogsb.js";import"./preload-helper-C1FmrZbK.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-BrLvrPMg.js";import"./Divider-CzVOQ1Js.js";import"./Dropdown-FbW3XryH.js";import"./useButton-3D8uMnpX.js";import"./useFocusable-DzcY2h-6.js";import"./useFocusRing-CNnJjRGa.js";import"./useEffectEvent-_xfm6Ewt.js";import"./chain-_zCgTghY.js";import"./index-zygbjzbv.js";import"./FocusScope-BnipxogD.js";import"./useOverlayTriggerState-B9wdWD5W.js";import"./useControlledState-DY5nY8Wt.js";import"./useMenuTrigger-nOoY-5UA.js";import"./useLabels-B3d7_WnD.js";import"./useLocalizedStringFormatter-Dm55UTSr.js";import"./context-BwIwx3bW.js";import"./VisuallyHidden-b3B-snrg.js";import"./helper-kDDgvgzp.js";import"./keyboard-qlZGpQI7.js";import"./SelectionManager-CvY-fpmx.js";import"./useField-DLq7O62T.js";import"./useFormValidationState-D0MtgxJw.js";import"./usePopper-B30N6m7R.js";import"./index-DCKuEH0C.js";import"./MenuItem-vWr4hvv2.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-BYNbkOLO.js";import"./IconCheckMark-DYOFifCV.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-Bk8CKUnf.js";import"./Trigger-8K1Z5TCZ.js";import"./IconCaretDown-BM9A8thm.js";import"./IconCaretDown16-CJ0CPWki.js";import"./IconCross-BYLKbJOe.js";import"./IconExclamationMarkTriangle-DJ78vW8L.js";import"./IconExclamationMarkTriangle24-B2npFYMD.js";import"./IconTrashBin16-B-os8M5m.js";import"./IconTrashBin24-B7qkH7Me.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-BPSk3zeA.js";import"./Portal-Bs2LRsId.js";import"./useMemoizedId-C9g_fFO8.js";import"./FormControl-hBMNzJT5.js";import"./InputLabel-BiMasARO.js";import"./TooltipIcon-DfPc9HBh.js";import"./LegacyTooltip-BEqX41nh.js";import"./useLink-wNWEYCfF.js";import"./IconExclamationMarkCircle24-Dn7AMifS.js";import"./IconQuestionMarkCircle-CuSuBHcI.js";import"./Switch-cBzas6OX.js";import"./TabItem-D-04gcC8.js";import"./TextInput-C_NhoOs1.js";import"./Tooltip-JU-TLIRP.js";import"./useClickOutside-ChN67Rl1.js";import"./dialog-D9O7a7Fm.js";import"./Tree-C_Tw8-89.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-PXxiSRIZ.js";import"./IconIcon16-BARz5uTQ.js";import"./IconIcon24-GwEmUqGW.js";const Nt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[e,i]=p.useState(!1),r=p.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>i(!e),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:e,handleClose:()=>i(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>i(!1)}]})]})})]})},o=h.bind({});o.args={};var m,s,a;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
