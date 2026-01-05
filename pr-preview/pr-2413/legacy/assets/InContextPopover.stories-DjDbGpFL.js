import{r as p,j as t}from"./iframe-DHhHn_Xd.js";import{a as l}from"./Box-MgqszGR_.js";import{B as d}from"./Button-twCtatvA.js";import{D as u}from"./DialogBody-D38T9vnY.js";import{D as g}from"./DialogFooter-cABrOQQF.js";import{D as f}from"./DialogHeader-DAeMpfD9.js";import{P as n}from"./Popover-CqcPPZfq.js";import{I as x}from"./IconIcon-RSB4Bo_6.js";import"./preload-helper-DI9Pv0v-.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-DTjDp1yX.js";import"./Divider-CWxjOnot.js";import"./Dropdown-D-MqyGOZ.js";import"./useButton-Ba6bJoqp.js";import"./useFocusable-CXMGbqTn.js";import"./useFocusRing-DmIFv9Ke.js";import"./useEffectEvent-C_rtojrN.js";import"./chain-BYrUscth.js";import"./index-JgQzKZqR.js";import"./FocusScope-jD0jHaDs.js";import"./useOverlayTriggerState--lHa6GRX.js";import"./useControlledState-C5QBV-5N.js";import"./useMenuTrigger-Ba2LFcNw.js";import"./useLabels-DZu6LvK2.js";import"./useLocalizedStringFormatter-CnwYXU_D.js";import"./context-D98oYbyU.js";import"./VisuallyHidden-ChNuZUmx.js";import"./helper-96siw9_E.js";import"./keyboard-DN0A5UFX.js";import"./SelectionManager-BmeslHph.js";import"./useField-C1Hy9AZ6.js";import"./useFormValidationState-DFbP1eAN.js";import"./usePopper-k8-xH0Mb.js";import"./index-Dxw9FBAV.js";import"./MenuItem-DNXPOJNM.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-CLwpUh1P.js";import"./IconCheckMark-BVSctc7O.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-CfwzJ-WV.js";import"./Trigger-CBI5WoJV.js";import"./IconCaretDown-ibszVH90.js";import"./IconCaretDown16-CrKcLaqR.js";import"./IconCross-BNiwUk40.js";import"./IconExclamationMarkTriangle-BOUPVeYb.js";import"./IconExclamationMarkTriangle24-BgB_bcU3.js";import"./IconTrashBin16-onKoxhQU.js";import"./IconTrashBin24-CyaeCWRk.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-CASadrCE.js";import"./Portal-B16H0Alf.js";import"./useMemoizedId-BUaa68Zx.js";import"./FormControl-B0f2ybAX.js";import"./InputLabel-ChSoeug1.js";import"./TooltipIcon-CTskAz0a.js";import"./LegacyTooltip-B5e2tBdw.js";import"./useLink-B5wz_Dbi.js";import"./IconExclamationMarkCircle24-SHVZolFQ.js";import"./IconQuestionMarkCircle-CuCpXsjy.js";import"./Switch-b4QCHyCj.js";import"./TabItem-B1-ZGQ2E.js";import"./TextInput-DsDId-ew.js";import"./Tooltip-CYknrnEg.js";import"./useClickOutside-BMR6voSv.js";import"./dialog-D9O7a7Fm.js";import"./Tree-B-qAXyrm.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-C505uEvj.js";import"./IconIcon16-CYLT6J1w.js";import"./IconIcon24-Amavt8cU.js";const Nt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[e,i]=p.useState(!1),r=p.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>i(!e),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:e,handleClose:()=>i(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>i(!1)}]})]})})]})},o=h.bind({});o.args={};var m,s,a;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
