import{r as a,j as t}from"./iframe-DooYt4M7.js";import{a as l}from"./Box-BwEcDh6u.js";import{B as d}from"./Button-CBoATLw8.js";import{D as u}from"./DialogBody-DC9sg-IR.js";import{D as g}from"./DialogFooter-BkPIH7P-.js";import{D as f}from"./DialogHeader-Bt0JbCOM.js";import{P as m}from"./Popover-iJPHh-qs.js";import{I as x}from"./IconJohanna-4s0y4gcU.js";import"./preload-helper-C1FmrZbK.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-DvPRuWXh.js";import"./Divider-CTgkkRKv.js";import"./FormControl-BALsk9gh.js";import"./InputLabel-CqO-tlpI.js";import"./TooltipIcon-K7_0wyZX.js";import"./LegacyTooltip-Bme4L1gf.js";import"./useLink-Bg3T3WJF.js";import"./useFocusable-Bz_tnZql.js";import"./useFocusRing-9IwpsfI2.js";import"./useEffectEvent-BtxKI83K.js";import"./chain-CxoLEBLW.js";import"./index-C5RpMxi5.js";import"./usePopper-Bj5tkPE3.js";import"./index-Cl8iBCh-.js";import"./Portal-BQitoXWA.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-Bz_bLNYA.js";import"./IconCheckMark-ByI5Yptv.js";import"./IconExclamationMarkCircle24-BD3X71HN.js";import"./IconExclamationMarkTriangle-CRq7c9ri.js";import"./IconExclamationMarkTriangle24-DYaHi-Qa.js";import"./IconQuestionMarkCircle-DyhSd_qX.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-BCS4R7Lt.js";import"./Switch-If4UHubP.js";import"./TabItem-Bau7eHFp.js";import"./elements-BOYmskOL.js";import"./TextInput-rjYQRaAk.js";import"./IconCross-squDdsNY.js";import"./Tooltip-C8ikGp9U.js";import"./useClickOutside-Bfn2OFCW.js";import"./EnablePortalWrapper-OYZPVrt8.js";import"./dialog-D9O7a7Fm.js";import"./Tree-ClE5BDJR.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-drRkTRRK.js";import"./Flex-D6rLuSz0.js";const ut={title:"Experimental/Popover/In Context",Component:m,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,o]=a.useState(!1),r=a.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>o(!i),ref:r,children:"Trigger"}),t.jsx(m,{...c,anchor:r,open:i,handleClose:()=>o(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>o(!1)}]})]})})]})},e=h.bind({});e.args={};var s,n,p;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
}`,...(p=(n=e.parameters)==null?void 0:n.docs)==null?void 0:p.source}}};const gt=["WithHeaderAndFooter"];export{e as WithHeaderAndFooter,gt as __namedExportsOrder,ut as default};
