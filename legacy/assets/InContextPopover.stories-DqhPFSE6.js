import{r as p,j as t}from"./iframe-D5jKmvFy.js";import{a as l}from"./Box-B-f6EHAA.js";import{B as d}from"./Button-DwCG1rzi.js";import{D as u}from"./DialogBody-B-Lhlj3n.js";import{D as g}from"./DialogFooter-BY0eo08i.js";import{D as f}from"./DialogHeader-BNDmNW9V.js";import{P as n}from"./Popover-Dz3Wc4MT.js";import{I as x}from"./IconIcon-CEFqKicA.js";import"./preload-helper-C1FmrZbK.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-Cuuz4wSk.js";import"./Divider-Bvj5EVjz.js";import"./Dropdown-DZN4seAd.js";import"./useButton-BSs9oz24.js";import"./useFocusable-BgFDsCFo.js";import"./useFocusRing-CF_DgWy2.js";import"./useEffectEvent-COAqNv_C.js";import"./chain-VjPdPKMz.js";import"./index-DwAO_Mfr.js";import"./FocusScope-IhAlz2x1.js";import"./useOverlayTriggerState-LoBAR65Z.js";import"./useControlledState-CYZEwJbA.js";import"./useMenuTrigger-CRlHAnCk.js";import"./useLabels-DQCmoryD.js";import"./useLocalizedStringFormatter-BPxuIa14.js";import"./context-C5iXvv9h.js";import"./VisuallyHidden-B4JthJSH.js";import"./helper-DdJ95vwf.js";import"./keyboard-Csc3fxLT.js";import"./SelectionManager-gdH0maxf.js";import"./useField-DVkZvzOP.js";import"./useFormValidationState-ELDSdfTc.js";import"./usePopper-CXMbn7uu.js";import"./index-IIBlqUBL.js";import"./MenuItem-Brj3YH5_.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-C-HjVwgN.js";import"./IconCheckMark-QrCV5fbd.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-XxlqpNA4.js";import"./Trigger-CtdnUMm-.js";import"./IconCaretDown-sbJtFOOJ.js";import"./IconCaretDown16-DuiE5sVg.js";import"./IconCross-djj-Oyd4.js";import"./IconExclamationMarkTriangle-D8faLJTj.js";import"./IconExclamationMarkTriangle24-DA1-FB5D.js";import"./IconTrashBin16-B0HMjzoh.js";import"./IconTrashBin24-BVh-BotE.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-Czs5h7OA.js";import"./Portal-DWmcDSHy.js";import"./useMemoizedId-DeWUksGg.js";import"./FormControl-BAvj2x9i.js";import"./InputLabel-BSPFWPaA.js";import"./TooltipIcon-D3wuiUby.js";import"./LegacyTooltip-BhAlSmqQ.js";import"./useLink-xpLz3Lhk.js";import"./IconExclamationMarkCircle24-CStJ-czY.js";import"./IconQuestionMarkCircle-CIYpTH4-.js";import"./Switch-D3rvabZF.js";import"./TabItem-CdVFMx15.js";import"./TextInput-BlmxafZW.js";import"./Tooltip-CdBxvI3A.js";import"./useClickOutside-C8l2PBjA.js";import"./dialog-D9O7a7Fm.js";import"./Tree-q0L28dFW.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-uUiU4TVX.js";import"./IconIcon16-De5hfWAZ.js";import"./IconIcon24-BUbyEJBH.js";const Nt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[e,i]=p.useState(!1),r=p.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>i(!e),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:e,handleClose:()=>i(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>i(!1)}]})]})})]})},o=h.bind({});o.args={};var m,s,a;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
