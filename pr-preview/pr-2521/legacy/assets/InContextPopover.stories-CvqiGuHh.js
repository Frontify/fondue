import{r as s,j as t}from"./iframe-C_X0LXbg.js";import{a as l}from"./Box-B_S8Ft3n.js";import{B as d}from"./Button-B754AGQe.js";import{D as u}from"./DialogBody-DVUSWRRm.js";import{D as g}from"./DialogFooter-DEqg-ScX.js";import{D as f}from"./DialogHeader-Di90skSv.js";import{P as n}from"./Popover-Xwu1eCU4.js";import{I as x}from"./IconIcon-ChhkPF50.js";import"./preload-helper-CxFeC-BG.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-t0kgNqw6.js";import"./Divider-BxFiowZD.js";import"./FormControl-ByW68mW_.js";import"./InputLabel-1yMw0qct.js";import"./TooltipIcon-bb09_uCV.js";import"./LegacyTooltip-aT3hUqb3.js";import"./useLink-DktwXh-5.js";import"./useFocusable-P2cNa7fe.js";import"./useFocusRing-B-vCA7C1.js";import"./useEffectEvent-C56Z2Ejq.js";import"./chain-CAXrBEkW.js";import"./index-BaX3WfTo.js";import"./usePopper-BKJV8bok.js";import"./index-TSPbpfDB.js";import"./Portal-D7PHIvhz.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-FH4PEaL_.js";import"./IconCheckMark-BnM0QKU_.js";import"./IconExclamationMarkCircle24-DaeyL940.js";import"./IconExclamationMarkTriangle-DLo9WXRn.js";import"./IconExclamationMarkTriangle24-DOz5qtx1.js";import"./IconQuestionMarkCircle-DiDI1qTj.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-DTyihbQY.js";import"./Switch-BZcGK09Q.js";import"./TabItem-I_soBAN8.js";import"./elements-BOYmskOL.js";import"./TextInput-BM0na_zO.js";import"./IconCross-CWs_FIyp.js";import"./Tooltip-qZyF5ts2.js";import"./useClickOutside-GZ1jhqSx.js";import"./EnablePortalWrapper-COewq2TS.js";import"./dialog-D9O7a7Fm.js";import"./Tree-CBueg_AQ.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-DERfro1Z.js";import"./IconCaretDown-EYx4PbZj.js";import"./IconCaretDown16-CLwxTr_H.js";import"./IconTrashBin16-DNwZ9xB_.js";import"./IconTrashBin24-YMd-jiRQ.js";import"./useButton-DeuSuATS.js";import"./Flex-CMWiq_-K.js";import"./IconIcon16-B9Mu62ke.js";import"./IconIcon24-B9c6HUrH.js";const jt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,e]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>e(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>e(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>e(!1)}]})]})})]})},o=h.bind({});o.args={};var a,p,m;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
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
