import{r as p,j as t}from"./iframe-CfBLd35K.js";import{a as l}from"./Box-BW40DMyr.js";import{B as d}from"./Button-BMq1fE2z.js";import{D as u}from"./DialogBody-C4Zwdxq3.js";import{D as g}from"./DialogFooter-Oy9w8mHO.js";import{D as f}from"./DialogHeader-B0hC51kU.js";import{P as n}from"./Popover-CZza1y8q.js";import{I as x}from"./IconIcon-w-cmo38_.js";import"./preload-helper-CG1F6kIz.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-LRIhm9ZT.js";import"./Divider-CEFbS-0k.js";import"./Dropdown-msJI69H3.js";import"./useButton-HWEtsWO-.js";import"./useFocusable-BcIBCRrh.js";import"./useFocusRing-HQOnF_Kw.js";import"./useEffectEvent-DtYDcY6c.js";import"./chain-pG_FVjze.js";import"./index-Bt8gmfke.js";import"./FocusScope-NaJ6X-7k.js";import"./useOverlayTriggerState-6pXikwCB.js";import"./useControlledState-C9WHfCYO.js";import"./useMenuTrigger-zDXar3N1.js";import"./useLabels-DT9Bb-sB.js";import"./useLocalizedStringFormatter-BvdwTUs4.js";import"./context-CMvj-BfJ.js";import"./VisuallyHidden-CEBIOZFZ.js";import"./helper-DA_iJq6R.js";import"./keyboard-D8xRU-Ay.js";import"./SelectionManager-1koXhfc4.js";import"./useField-DVkUr7OL.js";import"./useFormValidationState-BETjbCr0.js";import"./usePopper-gF1CZnu9.js";import"./index-Deq_MCO1.js";import"./MenuItem-5mcUlOkg.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-DMhBk2l8.js";import"./IconCheckMark-C_jUhamR.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-DTHCP9Mo.js";import"./Trigger-CMbarR76.js";import"./IconCaretDown-BUciQsUp.js";import"./IconCaretDown16-bn1bAJM-.js";import"./IconCross-CVl0uK4o.js";import"./IconExclamationMarkTriangle-BoMnVsxx.js";import"./IconExclamationMarkTriangle24-kc206Dg0.js";import"./IconTrashBin16-D2jqe9uk.js";import"./IconTrashBin24-CffgCcCE.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-BEYQ1EgJ.js";import"./Portal-DJoc2mSv.js";import"./useMemoizedId-BANpn3Gk.js";import"./FormControl-Dc2R__I5.js";import"./InputLabel-DJehHiuq.js";import"./TooltipIcon-zj5xDHAE.js";import"./LegacyTooltip-D3XZnxSi.js";import"./useLink-Br-w_ucj.js";import"./IconExclamationMarkCircle24-B8H-ybyW.js";import"./IconQuestionMarkCircle-CtFKirTB.js";import"./Switch-BGmleg8v.js";import"./TabItem-Oa5L5Tkf.js";import"./TextInput-CnhhlBIJ.js";import"./Tooltip-DT6vH3pO.js";import"./useClickOutside-BUIhcMEJ.js";import"./dialog-D9O7a7Fm.js";import"./Tree-jLSMCZKA.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-CyBMyncv.js";import"./IconIcon16-Bz2n6xnY.js";import"./IconIcon24-B8j4oezz.js";const Nt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[e,i]=p.useState(!1),r=p.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>i(!e),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:e,handleClose:()=>i(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>i(!1)}]})]})})]})},o=h.bind({});o.args={};var m,s,a;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
