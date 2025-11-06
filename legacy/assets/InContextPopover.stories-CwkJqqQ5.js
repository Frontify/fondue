import{r as p,j as t}from"./iframe-SquABeg9.js";import{a as l}from"./Box-DUDHtOFb.js";import{B as d}from"./Button-bhuDGfA_.js";import{D as u}from"./DialogBody-BboDpkLJ.js";import{D as g}from"./DialogFooter-DzExcYDH.js";import{D as f}from"./DialogHeader-CJRGxXMa.js";import{P as n}from"./Popover-BNRjWzB4.js";import{I as x}from"./IconIcon-C6KdYx6G.js";import"./preload-helper-C1FmrZbK.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-IHYNAO0Y.js";import"./Divider-BZjJAXxX.js";import"./Dropdown-loYZguqP.js";import"./useButton-CIEkMiEW.js";import"./useFocusable-DSYH9RGK.js";import"./useFocusRing-BNK5FnXw.js";import"./useEffectEvent-I7gaBWEc.js";import"./chain-DWdr7d2C.js";import"./index-B6kSvp4Y.js";import"./FocusScope-BNpOWlK1.js";import"./useOverlayTriggerState-TQABtVAH.js";import"./useControlledState-CKOYWGYS.js";import"./useMenuTrigger-DnkaOMKE.js";import"./useLabels-C2pOqwIg.js";import"./useLocalizedStringFormatter-9I6FMkHq.js";import"./context-DonO3nJ8.js";import"./VisuallyHidden-B0vXfdTD.js";import"./helper-CeKBxdXa.js";import"./keyboard-DlKDWBwh.js";import"./SelectionManager-CyzKPpQE.js";import"./useField-IHSvhna4.js";import"./useFormValidationState-DSSo4usY.js";import"./usePopper-D1AGYINs.js";import"./index-DDB6fytH.js";import"./MenuItem-BwhCH_fz.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-BUVD6u9U.js";import"./IconCheckMark-66M7SP9V.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-DJUiJZHt.js";import"./Trigger-CeaegHCh.js";import"./IconCaretDown-0LGKf1hU.js";import"./IconCaretDown16-i3yW0a_h.js";import"./IconCross-Cti5Whzf.js";import"./IconExclamationMarkTriangle-CsYvi7vh.js";import"./IconExclamationMarkTriangle24-B0l4j4Hn.js";import"./IconTrashBin16-D4ch4T_K.js";import"./IconTrashBin24-DvkTTty9.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-DB6ILfFA.js";import"./Portal-jeo8LuUZ.js";import"./useMemoizedId-ClOqGxXF.js";import"./FormControl-CHlMP_eN.js";import"./InputLabel-f3Z9IsXu.js";import"./TooltipIcon-BeNX6opp.js";import"./LegacyTooltip-kSW3trmM.js";import"./useLink-BZ12yVmf.js";import"./IconExclamationMarkCircle24-DFTnLpMP.js";import"./IconQuestionMarkCircle-BlPUz1KK.js";import"./Switch-BlNXVOTN.js";import"./TabItem-DRZ9YnlT.js";import"./TextInput-D54uz858.js";import"./Tooltip-B0voCar7.js";import"./useClickOutside-C9lEFXjz.js";import"./dialog-D9O7a7Fm.js";import"./Tree-CIOoVjhp.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-Db0bV6Ww.js";import"./IconIcon16-Cl1UB5lb.js";import"./IconIcon24-lzPlbpt9.js";const Nt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[e,i]=p.useState(!1),r=p.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>i(!e),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:e,handleClose:()=>i(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>i(!1)}]})]})})]})},o=h.bind({});o.args={};var m,s,a;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
