import{r as p,j as t}from"./iframe-BqDpTz8L.js";import{a as l}from"./Box-yDJFD71A.js";import{B as d}from"./Button-Bkb2ujAG.js";import{D as u}from"./DialogBody-jSfC3Pq3.js";import{D as g}from"./DialogFooter-ByX8UHX1.js";import{D as f}from"./DialogHeader-kqm1_ZrY.js";import{P as n}from"./Popover-Dy76aGrf.js";import{I as x}from"./IconJohanna-DwpaZlKX.js";import"./preload-helper-ByQXrLpA.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-CTkk_4sX.js";import"./Divider-BDkhKOpT.js";import"./Dropdown-DIeWOy5O.js";import"./useButton-BGLu1zCr.js";import"./useFocusable-C1aQJPOg.js";import"./useFocusRing-Xgnq7-RG.js";import"./useEffectEvent-CfjbAp9f.js";import"./chain-BF0-ro9P.js";import"./index-D7I4QJ3V.js";import"./FocusScope-CrwMUh0H.js";import"./useOverlayTriggerState-Dxar4kSR.js";import"./useControlledState-DRzZhX7e.js";import"./useMenuTrigger-B-xTmkst.js";import"./useLabels-CShK178M.js";import"./useLocalizedStringFormatter-CT_IKlGg.js";import"./context-Cuf97275.js";import"./VisuallyHidden-Z6NBypG9.js";import"./helper-CawoOU1g.js";import"./keyboard-D68Nodq9.js";import"./SelectionManager-ClMwx0j_.js";import"./useField-BAnoDg69.js";import"./useFormValidationState-BoxxuQfu.js";import"./usePopper-s4jp2qgP.js";import"./index-CY-jsk3T.js";import"./MenuItem-PZQtIurR.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-PlITsN3f.js";import"./IconCheckMark-BbPCPrTa.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-BxttBEHu.js";import"./Trigger-DSSj9pCU.js";import"./IconCaretDown-R6whlyjw.js";import"./IconCaretDown16-Bdm0zhQl.js";import"./IconCross-B8K-nVuA.js";import"./IconExclamationMarkTriangle-DRWrILNB.js";import"./IconExclamationMarkTriangle24-XYss3Qca.js";import"./IconTrashBin16-DR0ZRfF3.js";import"./IconTrashBin24-CciGS0Cs.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-Dvj5TfsF.js";import"./Portal-B7rzZNWn.js";import"./useMemoizedId-Dw0wROnJ.js";import"./FormControl-DcBQh53j.js";import"./InputLabel-CF4ejW5R.js";import"./TooltipIcon-Dg_9MSCk.js";import"./LegacyTooltip-h-bi0B10.js";import"./useLink-_NQoLbRX.js";import"./IconExclamationMarkCircle24-BixhjAUI.js";import"./IconQuestionMarkCircle-gMiBNDjP.js";import"./Switch-DHEC4TsF.js";import"./TabItem-3JcYdrD1.js";import"./TextInput-CRHj7Htq.js";import"./Tooltip-CMa0Vima.js";import"./useClickOutside-BZvZNjns.js";import"./dialog-D9O7a7Fm.js";import"./Tree-4CeaLJ8E.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-BlHpiAPT.js";const Ft={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,e]=p.useState(!1),r=p.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>e(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>e(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>e(!1)}]})]})})]})},o=h.bind({});o.args={};var m,a,s;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
