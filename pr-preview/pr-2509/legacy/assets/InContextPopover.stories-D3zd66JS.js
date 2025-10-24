import{r as p,j as t}from"./iframe-CTdaKj4d.js";import{a as l}from"./Box-DboJyZSQ.js";import{B as d}from"./Button-Bm_WcOm-.js";import{D as u}from"./DialogBody-BJqiQkfj.js";import{D as g}from"./DialogFooter-BnysW5o6.js";import{D as f}from"./DialogHeader-CPeCFyub.js";import{P as n}from"./Popover-B2X50sLj.js";import{I as x}from"./IconJohanna-KdayrNUf.js";import"./preload-helper-D5qcpbyD.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-Ba-n1B2U.js";import"./Divider-BZSXkwNY.js";import"./Dropdown-BbPKlORf.js";import"./useButton-BoyR-gLm.js";import"./useFocusable-D5v5BXOS.js";import"./useFocusRing-qvQmERHy.js";import"./useEffectEvent-C0QjiGlT.js";import"./chain-C4zg1uY7.js";import"./index-BxZHv3Q3.js";import"./FocusScope-ChEvNH6k.js";import"./useOverlayTriggerState-DvdaRORr.js";import"./useControlledState-BdRnahj0.js";import"./useMenuTrigger-BGbq9tho.js";import"./useLabels-DJeEYSDO.js";import"./useLocalizedStringFormatter-DxXej0b0.js";import"./context-CBgqpM37.js";import"./VisuallyHidden-B0vggYPD.js";import"./helper-JqKjmzWS.js";import"./keyboard-BKG3APZl.js";import"./SelectionManager-CY7iX6yC.js";import"./useField-DACdsH3V.js";import"./useFormValidationState-Dcwylu08.js";import"./usePopper-COiRSxUA.js";import"./index-CpwT1ZzU.js";import"./MenuItem-Dq7ojpGP.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-tNfIFY6w.js";import"./IconCheckMark-BLO_YVDU.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-DjvG9W6K.js";import"./Trigger-DjFT1fqu.js";import"./IconCaretDown-B2RHgjKn.js";import"./IconCaretDown16-j1AblOCd.js";import"./IconCross-Befib3GN.js";import"./IconExclamationMarkTriangle-FJXci0JT.js";import"./IconExclamationMarkTriangle24-Do1nSI1f.js";import"./IconTrashBin16-CdiktYZv.js";import"./IconTrashBin24-MMIBMUjF.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-DePDkhO3.js";import"./Portal-I51V88Fn.js";import"./useMemoizedId-CCMoqEOy.js";import"./FormControl-Z3syqaE3.js";import"./InputLabel-BUE6hJiL.js";import"./TooltipIcon-uAUvErbA.js";import"./LegacyTooltip-CKi7Gu9g.js";import"./useLink-Bp2GiKfO.js";import"./IconExclamationMarkCircle24-BO32xN40.js";import"./IconQuestionMarkCircle-BqZGmMJ5.js";import"./Switch-Kl-DuV0i.js";import"./TabItem-BC_hjA78.js";import"./TextInput-Dtm7IYNA.js";import"./Tooltip-CyAZuE7b.js";import"./useClickOutside-mFCCHlJ7.js";import"./dialog-D9O7a7Fm.js";import"./Tree-CcWwUQpW.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-Tq1wLe5g.js";const Ft={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,e]=p.useState(!1),r=p.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>e(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>e(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>e(!1)}]})]})})]})},o=h.bind({});o.args={};var m,a,s;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
