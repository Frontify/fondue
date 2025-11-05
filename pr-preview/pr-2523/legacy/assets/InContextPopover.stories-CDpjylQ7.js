import{r as p,j as t}from"./iframe-Btcqq7dy.js";import{a as l}from"./Box-DpGr1gAY.js";import{B as d}from"./Button-BJWDyIXg.js";import{D as u}from"./DialogBody-7mgcdLeR.js";import{D as g}from"./DialogFooter--4zXbZH0.js";import{D as f}from"./DialogHeader-D21gxtB1.js";import{P as n}from"./Popover-B6-2DGNY.js";import{I as x}from"./IconIcon-Bx24dPNO.js";import"./preload-helper-DuVWtNEG.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-j6CHzBS2.js";import"./Divider-D8IsyLFN.js";import"./Dropdown-B9ewyHVx.js";import"./useButton-C-fjEikW.js";import"./useFocusable-B5oCXX1Q.js";import"./useFocusRing-CRTzIFTL.js";import"./useEffectEvent-OytRhKGv.js";import"./chain-0g0PQBn7.js";import"./index-Dg_J2bTk.js";import"./FocusScope-DiLtXHSf.js";import"./useOverlayTriggerState-B3emzcfU.js";import"./useControlledState-B6lTJX0Y.js";import"./useMenuTrigger-B58YUeRM.js";import"./useLabels-Cqto7ldn.js";import"./useLocalizedStringFormatter-DPAWjLIl.js";import"./context-AWO_E1Rs.js";import"./VisuallyHidden-ZU57im9S.js";import"./helper-B_D4xBgJ.js";import"./keyboard-CKNJrqZs.js";import"./SelectionManager-CsPlexP0.js";import"./useField-B_ILzA0j.js";import"./useFormValidationState-BuJhAC3m.js";import"./usePopper-r4kRogtv.js";import"./index-BSTB5kN_.js";import"./MenuItem-DZjawJox.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-DkRmiAV1.js";import"./IconCheckMark-CbRYdrdl.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-ClK6hDzW.js";import"./Trigger-w8Q7QteU.js";import"./IconCaretDown-CMjs7Hwf.js";import"./IconCaretDown16-CYI6RP9H.js";import"./IconCross-G9Cp_5r0.js";import"./IconExclamationMarkTriangle-CMBfXy_7.js";import"./IconExclamationMarkTriangle24-CNFYIAsk.js";import"./IconTrashBin16-BqZ-EI5F.js";import"./IconTrashBin24-FWGMcxTm.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-BmGLW7YV.js";import"./Portal-2wuCuHYB.js";import"./useMemoizedId-D4wuPA5x.js";import"./FormControl-wpYfjRpI.js";import"./InputLabel-CjpeikWg.js";import"./TooltipIcon-CKQb9OIh.js";import"./LegacyTooltip-B_706KVn.js";import"./useLink-CVYcev56.js";import"./IconExclamationMarkCircle24-Cstr3t-z.js";import"./IconQuestionMarkCircle-B5G7YBHp.js";import"./Switch-8QVx9HIV.js";import"./TabItem-DZEKG9rH.js";import"./TextInput-D7W__3Pe.js";import"./Tooltip-CbuuYnTN.js";import"./useClickOutside-92K5fpau.js";import"./dialog-D9O7a7Fm.js";import"./Tree-CDb-Fq9V.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-CgN6nFIZ.js";import"./IconIcon16-DuYEzxCZ.js";import"./IconIcon24-D-hR5sMS.js";const Nt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[e,i]=p.useState(!1),r=p.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>i(!e),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:e,handleClose:()=>i(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>i(!1)}]})]})})]})},o=h.bind({});o.args={};var m,s,a;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
