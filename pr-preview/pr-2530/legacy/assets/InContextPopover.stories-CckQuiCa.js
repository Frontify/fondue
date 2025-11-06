import{r as p,j as t}from"./iframe-BYgk9eGi.js";import{a as l}from"./Box-CHcpe9rj.js";import{B as d}from"./Button-BFRQ7uMU.js";import{D as u}from"./DialogBody-LuKc4CP-.js";import{D as g}from"./DialogFooter-DdQnCL6s.js";import{D as f}from"./DialogHeader-HOyv2b_x.js";import{P as n}from"./Popover-BAE0Vf2m.js";import{I as x}from"./IconIcon-Cxo3Py9G.js";import"./preload-helper-C4wRLVzE.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-CHp1aGuG.js";import"./Divider-t83pYnJu.js";import"./Dropdown-55K6xzNt.js";import"./useButton-aMrX7lQB.js";import"./useFocusable-DWkWAuuj.js";import"./useFocusRing-B9FX5t9d.js";import"./useEffectEvent-C0BQ6d8E.js";import"./chain-DewOEu23.js";import"./index-JL1iOob4.js";import"./FocusScope-CLV--g8F.js";import"./useOverlayTriggerState-B1KvkfS4.js";import"./useControlledState-WuYbSOBR.js";import"./useMenuTrigger-DtAliMr4.js";import"./useLabels-DNjgnGlH.js";import"./useLocalizedStringFormatter-D3YJL1Sl.js";import"./context-DhZg-eiB.js";import"./VisuallyHidden-Cxyhrmyz.js";import"./helper-DwPYLC8Q.js";import"./keyboard-DUIElv65.js";import"./SelectionManager-ihQjKTL6.js";import"./useField-tEdRTGkN.js";import"./useFormValidationState-CCcBhnXp.js";import"./usePopper-Bjy0ueTZ.js";import"./index-DF7w3mCS.js";import"./MenuItem-DsRkCZfU.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-ZPWSrGDF.js";import"./IconCheckMark-C86ecLPI.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-DFHIC5me.js";import"./Trigger-CXI_k5eO.js";import"./IconCaretDown-DJft5W7d.js";import"./IconCaretDown16-DFWIPfbf.js";import"./IconCross-CHQ9kAFF.js";import"./IconExclamationMarkTriangle-BZIhdvAU.js";import"./IconExclamationMarkTriangle24-orZPE0b5.js";import"./IconTrashBin16-DKWtSmRV.js";import"./IconTrashBin24-C-V8KFup.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-BnAgViow.js";import"./Portal-DSR4zoF2.js";import"./useMemoizedId-DTXcstyd.js";import"./FormControl-Rgqig6QS.js";import"./InputLabel-BzgpUWCY.js";import"./TooltipIcon-KrhHCJfq.js";import"./LegacyTooltip-DepAC3Bc.js";import"./useLink-YF0z-YX4.js";import"./IconExclamationMarkCircle24-vzChveiq.js";import"./IconQuestionMarkCircle-DNg9QlGt.js";import"./TabItem-Crjs_qi7.js";import"./TextInput-hOyDqsAD.js";import"./Tooltip-BymIuUo6.js";import"./useClickOutside-DqRgZ3e-.js";import"./dialog-D9O7a7Fm.js";import"./Tree-l_6RWbbv.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-D6OdUIvG.js";import"./IconIcon16-CEOPLr-r.js";import"./IconIcon24-DHbgf2rn.js";const kt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,e]=p.useState(!1),r=p.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>e(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>e(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>e(!1)}]})]})})]})},o=h.bind({});o.args={};var m,s,a;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
}`,...(a=(s=o.parameters)==null?void 0:s.docs)==null?void 0:a.source}}};const Nt=["WithHeaderAndFooter"];export{o as WithHeaderAndFooter,Nt as __namedExportsOrder,kt as default};
