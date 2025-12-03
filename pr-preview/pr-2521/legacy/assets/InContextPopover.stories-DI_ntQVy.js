import{r as s,j as t}from"./iframe-BCnoYE3v.js";import{a as l}from"./Box-CpZt1Cbh.js";import{B as d}from"./Button-KRRI2ROt.js";import{D as u}from"./DialogBody-C7FRKsbm.js";import{D as g}from"./DialogFooter-BzEqLRlO.js";import{D as f}from"./DialogHeader-MmxR2EyK.js";import{P as n}from"./Popover-aARr5xRA.js";import{I as x}from"./IconIcon-CKLarbCy.js";import"./preload-helper-CxFeC-BG.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-DVAx1I1O.js";import"./Checkbox-BJPmY04E.js";import"./useFocusable-BBZX1YeC.js";import"./useFocusRing-Bt6TIjh0.js";import"./useEffectEvent-Cl2TEo8j.js";import"./chain-RHkf15pv.js";import"./index-B1Ba_Hxv.js";import"./useFormValidationState-DeO7vRLY.js";import"./useControlledState-D-ye-mCq.js";import"./InputLabel-DZ0wBnnP.js";import"./TooltipIcon-BHPjB9_w.js";import"./LegacyTooltip-ywfbnU0Y.js";import"./useLink-AT_Qezkp.js";import"./usePopper-CSBCD_Iq.js";import"./index-DPhmVeXH.js";import"./Portal-BgzAls8n.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-BkXgJuWW.js";import"./IconCheckMark-G4vdsaU_.js";import"./IconExclamationMarkCircle24-_8_MiX60.js";import"./IconExclamationMarkTriangle-CZrmTRcm.js";import"./IconExclamationMarkTriangle24-C26brak3.js";import"./IconQuestionMarkCircle-D1o3Q7kb.js";import"./IconMinus-EfteyY8R.js";import"./Divider-C5OnfpLt.js";import"./FormControl-yt0CRSo5.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-DDJ9to7C.js";import"./Switch-BacF1OQD.js";import"./TabItem-DgZmaAfE.js";import"./elements-BOYmskOL.js";import"./TextInput-Cg55WOmg.js";import"./IconCross-DA4M5IUx.js";import"./Tooltip-DAW2sPOn.js";import"./useClickOutside-DzvhqzKg.js";import"./EnablePortalWrapper-Dbw9xd1X.js";import"./dialog-D9O7a7Fm.js";import"./Tree-fyDDg268.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-Dc4hn-aq.js";import"./Flex-DFEvCooJ.js";import"./IconIcon16-BpnFrGHR.js";import"./IconIcon24-DaIXjrxh.js";const Ct={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,o]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>o(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>o(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>o(!1)}]})]})})]})},e=h.bind({});e.args={};var a,p,m;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
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
}`,...(m=(p=e.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};const jt=["WithHeaderAndFooter"];export{e as WithHeaderAndFooter,jt as __namedExportsOrder,Ct as default};
