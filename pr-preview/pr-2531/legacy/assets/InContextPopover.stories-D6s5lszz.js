import{r as s,j as t}from"./iframe-DCHxdJJL.js";import{a as l}from"./Box-ClD16GlE.js";import{B as d}from"./Button-BOVRr_VK.js";import{D as u}from"./DialogBody-CcTqaRYt.js";import{D as g}from"./DialogFooter-DCN5rcuv.js";import{D as f}from"./DialogHeader-Cv-5EVnE.js";import{P as n}from"./Popover-CdPSPa8S.js";import{I as x}from"./IconIcon-9wR8EJXS.js";import"./preload-helper-CG1F6kIz.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-B2uo5-9v.js";import"./FormControl-DV_ve0gI.js";import"./InputLabel-3rUZu65A.js";import"./TooltipIcon-BHok7F3T.js";import"./LegacyTooltip-BPLxraqb.js";import"./useLink-DplWYx_F.js";import"./useFocusable-DIlwdSvs.js";import"./useFocusRing-NS3ORKFM.js";import"./useEffectEvent-CaPcg895.js";import"./chain-DYnA2Q_y.js";import"./index-DEaTr9qN.js";import"./usePopper-CpV8NQSw.js";import"./index-BZ3yWc9Q.js";import"./Portal-CLMTTZF6.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-D693TNpH.js";import"./IconCheckMark-Da733Bh3.js";import"./IconExclamationMarkCircle24-D8Ono7-T.js";import"./IconExclamationMarkTriangle-CEZ6l-Yc.js";import"./IconExclamationMarkTriangle24-CLFUWlBV.js";import"./IconQuestionMarkCircle-B6Gxe0PS.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-D3dJEsfv.js";import"./Switch-p8G-DWEq.js";import"./TabItem-MoKtoPFo.js";import"./elements-BOYmskOL.js";import"./TextInput-BLkzvTVk.js";import"./IconCross-Bqm8OI8p.js";import"./Tooltip-DMwPFP63.js";import"./useClickOutside-ByZz3Ht9.js";import"./EnablePortalWrapper-B1UBWcym.js";import"./dialog-D9O7a7Fm.js";import"./Tree-D8QmdZw6.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-DKoG9R7o.js";import"./IconCaretDown-DYk-T0lB.js";import"./IconCaretDown16-CQaTfpZE.js";import"./IconTrashBin16-BEUChuce.js";import"./IconTrashBin24-DQyH_yCZ.js";import"./useButton-Cu7rW_1V.js";import"./Flex-DiIFtn4E.js";import"./IconIcon16-O3akcPMA.js";import"./IconIcon24-BgysHC0I.js";const Ct={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,o]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>o(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>o(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>o(!1)}]})]})})]})},e=h.bind({});e.args={};var a,p,m;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
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
