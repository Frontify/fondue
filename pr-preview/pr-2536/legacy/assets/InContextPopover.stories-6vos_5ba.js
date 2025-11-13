import{r as s,j as t}from"./iframe-IPoq-zMV.js";import{a as l}from"./Box-RN8TvVkR.js";import{B as d}from"./Button-Mum_B5-6.js";import{D as u}from"./DialogBody-TzszWOJj.js";import{D as g}from"./DialogFooter-4o9q4-7S.js";import{D as f}from"./DialogHeader-Tm5OMtt0.js";import{P as n}from"./Popover-B8s1cbuq.js";import{I as x}from"./IconIcon-DHZ_k9Vi.js";import"./preload-helper-CTxuOSTo.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-BqguaTeR.js";import"./Divider-Bivo3lpm.js";import"./FormControl-qESiwCJz.js";import"./InputLabel-BzxqF8Ol.js";import"./TooltipIcon-BFVvOwwO.js";import"./LegacyTooltip-CN9F89CS.js";import"./useLink-DojGKHY9.js";import"./useFocusable-CbgYFhRR.js";import"./useFocusRing-C0-tGYTB.js";import"./useEffectEvent-ChfQPq2b.js";import"./chain-CsqahItZ.js";import"./index-DNIGD9BW.js";import"./usePopper-BWfLn5bL.js";import"./index-DexOFgAg.js";import"./Portal-rUqAI-7S.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-BV8eur7_.js";import"./IconCheckMark-DtfXOLPy.js";import"./IconExclamationMarkCircle24-C0Qj6h9c.js";import"./IconExclamationMarkTriangle-CJLSg2Dq.js";import"./IconExclamationMarkTriangle24-CsRwIySD.js";import"./IconQuestionMarkCircle-VDVPgREv.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-DrBVcZWp.js";import"./Switch-3Rux1RWK.js";import"./TabItem-rxMYQwo3.js";import"./elements-BOYmskOL.js";import"./TextInput-Dwkikkiq.js";import"./IconCross-CTBX3sAW.js";import"./Tooltip-Ch0JSD50.js";import"./useClickOutside-DQtoJQq8.js";import"./EnablePortalWrapper-D6PzXFmT.js";import"./dialog-D9O7a7Fm.js";import"./Tree-n_Nz8-z8.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-BVFMtr5h.js";import"./IconCaretDown-DIalihrO.js";import"./IconCaretDown16-CntekHao.js";import"./IconTrashBin16-CuhuliP4.js";import"./IconTrashBin24-DWMBDYZm.js";import"./useButton-Chg-g04_.js";import"./Flex-CYyUr1bf.js";import"./IconIcon16-CJxNVrN9.js";import"./IconIcon24-zBn9pGaV.js";const jt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,e]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>e(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>e(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>e(!1)}]})]})})]})},o=h.bind({});o.args={};var a,p,m;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
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
