import{r as a,j as t}from"./iframe--Jwmn5D-.js";import{a as l}from"./Box-Et_4T-SY.js";import{B as d}from"./Button-C1Y_tYwc.js";import{D as u}from"./DialogBody-C254sygp.js";import{D as g}from"./DialogFooter-DAHnq7Wt.js";import{D as f}from"./DialogHeader-BENGYRb-.js";import{P as m}from"./Popover-Ih5PupIE.js";import{I as x}from"./IconJohanna-DjIaVIg4.js";import"./preload-helper-C1FmrZbK.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-oxA4BEID.js";import"./Divider-D2ZnFssU.js";import"./FormControl-C-LQRfxU.js";import"./InputLabel-B79pAkr5.js";import"./TooltipIcon-CRhFNSLa.js";import"./LegacyTooltip-ByQFAeaJ.js";import"./useLink-CohimIAD.js";import"./useFocusable-Cu085tWC.js";import"./useFocusRing-DwBzFpku.js";import"./useEffectEvent-Bym9W6jw.js";import"./chain-BPJgKXju.js";import"./index-OQaAeiiY.js";import"./usePopper-ByvW9noJ.js";import"./index--8-NLEZe.js";import"./Portal-CjvBd1X7.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-BF4Nox5M.js";import"./IconCheckMark-CgkR-PYF.js";import"./IconExclamationMarkCircle24-BFh5bYkz.js";import"./IconExclamationMarkTriangle-k8ETbr_u.js";import"./IconExclamationMarkTriangle24-fvtOH1dG.js";import"./IconQuestionMarkCircle-BQ4XNqE1.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-mzVZJmok.js";import"./Switch-BUIowyLA.js";import"./TabItem-BgzUtCyF.js";import"./elements-BOYmskOL.js";import"./TextInput-bTNnAIWW.js";import"./IconCross-BlzaGa9v.js";import"./Tooltip-CNf4xB7a.js";import"./useClickOutside-BzEiWd5g.js";import"./EnablePortalWrapper-D4_K_OrF.js";import"./dialog-D9O7a7Fm.js";import"./Tree-C3YIS7GP.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-DNEBB71r.js";import"./Flex-8LGkByRV.js";const ut={title:"Experimental/Popover/In Context",Component:m,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,o]=a.useState(!1),r=a.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>o(!i),ref:r,children:"Trigger"}),t.jsx(m,{...c,anchor:r,open:i,handleClose:()=>o(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>o(!1)}]})]})})]})},e=h.bind({});e.args={};var s,n,p;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
