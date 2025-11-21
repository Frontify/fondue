import{r as s,j as t}from"./iframe-CEGctSHX.js";import{a as l}from"./Box-DkyT3aKM.js";import{B as d}from"./Button-BZzDmGaR.js";import{D as u}from"./DialogBody-CEcPYNz4.js";import{D as g}from"./DialogFooter-DNXVssmj.js";import{D as f}from"./DialogHeader-Bus9qpGm.js";import{P as n}from"./Popover-JmbMHh1X.js";import{I as x}from"./IconIcon-DqMpJtvE.js";import"./preload-helper-C1FmrZbK.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-DJ6XBMtK.js";import"./Divider-BeBLM6Mv.js";import"./FormControl-CUySWPby.js";import"./InputLabel-CBxU2xN6.js";import"./TooltipIcon-DtePhnn1.js";import"./LegacyTooltip-Ma9zHI77.js";import"./useLink-UVVSuqAD.js";import"./useFocusable-CtzgC14Z.js";import"./useFocusRing-Bv4R3Ovq.js";import"./useEffectEvent-DrJ20lr8.js";import"./chain-Cpd5fKoW.js";import"./index-qovRXh6B.js";import"./usePopper-DGStH3Xm.js";import"./index-Db-rlS7X.js";import"./Portal-5dABEhza.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-B4Od0BIt.js";import"./IconCheckMark-Bb5rnSIA.js";import"./IconExclamationMarkCircle24-BOA3F-xU.js";import"./IconExclamationMarkTriangle-CynoSzMS.js";import"./IconExclamationMarkTriangle24-BV4vtwSh.js";import"./IconQuestionMarkCircle-Coh-AG_l.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-DP1NdcMz.js";import"./Switch-Bv4NxhQr.js";import"./TabItem-CmJ8ZrTz.js";import"./elements-BOYmskOL.js";import"./TextInput-r9KFS6ZN.js";import"./IconCross-CuXLf-Hi.js";import"./Tooltip-ASd5pd6P.js";import"./useClickOutside-CrC1bxQQ.js";import"./EnablePortalWrapper-D2YQ0Z7S.js";import"./dialog-D9O7a7Fm.js";import"./Tree-BxskEPPi.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-bHFXXoh5.js";import"./IconCaretDown-DfgsHdCy.js";import"./IconCaretDown16-C_HntNHA.js";import"./IconTrashBin16-BlMRtp6Z.js";import"./IconTrashBin24-BtQ0b77B.js";import"./useButton-DFF6GcDi.js";import"./Flex-Dq0cgIZ1.js";import"./IconIcon16-XatWV1da.js";import"./IconIcon24-DbRKdz7v.js";const jt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,e]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>e(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>e(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>e(!1)}]})]})})]})},o=h.bind({});o.args={};var a,p,m;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
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
}`,...(m=(p=o.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};const It=["WithHeaderAndFooter"];export{o as WithHeaderAndFooter,It as __namedExportsOrder,jt as default};
