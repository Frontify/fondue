import{r as s,j as t}from"./iframe-Beui0H1c.js";import{a as l}from"./Box-uuBYmGRN.js";import{B as d}from"./Button-DnZtnktA.js";import{D as u}from"./DialogBody-D8aaM_bg.js";import{D as g}from"./DialogFooter-DKv3y65V.js";import{D as f}from"./DialogHeader-C8DHWsyS.js";import{P as n}from"./Popover-bBmWKU-a.js";import{I as x}from"./IconIcon-D8VucdiJ.js";import"./preload-helper-D9dL-qgt.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-CYW3MOm3.js";import"./Divider-YnMq-R2j.js";import"./FormControl-DN7M8VTy.js";import"./InputLabel-BqDw17Qg.js";import"./TooltipIcon-_5Y6PKzH.js";import"./LegacyTooltip-0NWrsVVI.js";import"./useLink-B4o722xV.js";import"./useFocusable-DdspXHcE.js";import"./useFocusRing-BIDMvR_3.js";import"./useEffectEvent-Bp9vJCdB.js";import"./chain-JmzeWE3B.js";import"./index-BUsDxj03.js";import"./usePopper-DtTS-UJd.js";import"./index-D2IfjKmw.js";import"./Portal-BEzQ9XOj.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-CYnPCNT7.js";import"./IconCheckMark-BvwNxobl.js";import"./IconExclamationMarkCircle24-CLVAKX75.js";import"./IconExclamationMarkTriangle-B0G0H6ib.js";import"./IconExclamationMarkTriangle24-BI4Jmley.js";import"./IconQuestionMarkCircle-TF2jjIXx.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-Dzw_nEZs.js";import"./Switch-Cuw25dgW.js";import"./TabItem-Fa3-4SBg.js";import"./elements-BOYmskOL.js";import"./TextInput-BW5xzcvJ.js";import"./IconCross-BmVZ4B-G.js";import"./Tooltip-BId0SaHy.js";import"./useClickOutside-pUlnx7N8.js";import"./EnablePortalWrapper-CWKYfC51.js";import"./dialog-D9O7a7Fm.js";import"./Tree-xyCe6zFy.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-BjdWHd67.js";import"./IconCaretDown-oHjAg5Ab.js";import"./IconCaretDown16-eEXgEFP7.js";import"./IconTrashBin16-Z1gzhZlr.js";import"./IconTrashBin24-DQZaocrI.js";import"./useButton-HURAn407.js";import"./Flex-zPVnd-Pw.js";import"./IconIcon16-DXvrCXuh.js";import"./IconIcon24-C94cF4ca.js";const jt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,e]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>e(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>e(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>e(!1)}]})]})})]})},o=h.bind({});o.args={};var a,p,m;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
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
