import{r as p,j as t}from"./iframe-C4oRDf00.js";import{a as l}from"./Box-BWpIYFSE.js";import{B as d}from"./Button-PWCBVfYK.js";import{D as u}from"./DialogBody-DEk5hy8F.js";import{D as g}from"./DialogFooter-DowIprQc.js";import{D as f}from"./DialogHeader-ClvXWL93.js";import{P as n}from"./Popover-CcRnjc6R.js";import{I as x}from"./IconJohanna-DPZ_ljhi.js";import"./preload-helper-B933Jwna.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-Bc_G07yT.js";import"./Divider-C8cRfcZ6.js";import"./Dropdown-DUWRUVei.js";import"./useButton-Y6cWZoe9.js";import"./useFocusable-DaMtZN9H.js";import"./useFocusRing-Cfoq8wro.js";import"./useEffectEvent-vTlljP4j.js";import"./chain-BFYyGSXr.js";import"./index-C2GFe8M8.js";import"./FocusScope-DQFEHFLy.js";import"./useOverlayTriggerState-L7vIiDuI.js";import"./useControlledState-Dt4aAtWN.js";import"./useMenuTrigger-BVyRaPKJ.js";import"./useLabels-CbM2_Ixf.js";import"./useLocalizedStringFormatter-blnl1i68.js";import"./context-BcRBNBSY.js";import"./VisuallyHidden-Bj5e8_W7.js";import"./helper-IakdE2XA.js";import"./keyboard-CyR-BIXM.js";import"./SelectionManager-D4_ZQnS-.js";import"./useField-CY0QFutb.js";import"./useFormValidationState-BFKh7Upf.js";import"./usePopper-oEgZSIdK.js";import"./index-pkMoDo0F.js";import"./MenuItem-ICxexfNS.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-Boy6Hij2.js";import"./IconCheckMark-CdXL73bS.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-D7ecF-OQ.js";import"./Trigger-wHjcz8EF.js";import"./IconCaretDown-B7rtaYOu.js";import"./IconCaretDown16-B36G00fo.js";import"./IconCross-CGngu9gm.js";import"./IconExclamationMarkTriangle-CyysmFxL.js";import"./IconExclamationMarkTriangle24-B9Jh6rAf.js";import"./IconTrashBin16-BH2hEHIY.js";import"./IconTrashBin24-DvFCY5K4.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-BJveQmLF.js";import"./Portal-Ca2NGuOZ.js";import"./useMemoizedId-A1bQAbDX.js";import"./FormControl-qigTchXL.js";import"./InputLabel-BMNa0YCt.js";import"./TooltipIcon-DuZRyfzt.js";import"./LegacyTooltip-DIWZRn-L.js";import"./useLink-CAaZ-YI_.js";import"./IconExclamationMarkCircle24-BU0c1aoh.js";import"./IconQuestionMarkCircle-Dymvr5cg.js";import"./Switch-B_KgIiqf.js";import"./TabItem-DZAsVXzH.js";import"./TextInput-YBFtltCu.js";import"./Tooltip--tXYZ45_.js";import"./useClickOutside-DvXyCqyI.js";import"./dialog-D9O7a7Fm.js";import"./Tree-CAPrKYGD.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-DnNeuM86.js";const Ft={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,e]=p.useState(!1),r=p.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>e(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>e(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>e(!1)}]})]})})]})},o=h.bind({});o.args={};var m,a,s;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
