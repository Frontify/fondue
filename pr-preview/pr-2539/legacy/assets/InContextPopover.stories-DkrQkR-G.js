import{r as s,j as t}from"./iframe-CCw9I7Bu.js";import{a as l}from"./Box-CmiEbl-q.js";import{B as d}from"./Button-DCrtMV-f.js";import{D as u}from"./DialogBody-Cdcimvml.js";import{D as g}from"./DialogFooter-BCIa6iJ_.js";import{D as f}from"./DialogHeader-CofC0Smk.js";import{P as n}from"./Popover-SattXKVw.js";import{I as x}from"./IconIcon-BbNdp3Od.js";import"./preload-helper-264tqYC2.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-Ce3bWD3w.js";import"./Divider-Bzb98vsz.js";import"./FormControl-AszKrOhn.js";import"./InputLabel-RIUzsHS1.js";import"./TooltipIcon-CQoHGHh4.js";import"./LegacyTooltip-EP6kgRuB.js";import"./useLink-otdWWK7D.js";import"./useFocusable-DtleDefI.js";import"./useFocusRing-CRu4vqVV.js";import"./useEffectEvent-Ck9HMdMD.js";import"./chain-8k56sdoK.js";import"./index-CPmhc4Xn.js";import"./usePopper-D5gYnfxh.js";import"./index-DASe7JJU.js";import"./Portal-DQ9hcTUw.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-DLxNPgoQ.js";import"./IconCheckMark-9CNIruEE.js";import"./IconExclamationMarkCircle24-DqkCmx6y.js";import"./IconExclamationMarkTriangle-sbrhWL-D.js";import"./IconExclamationMarkTriangle24-9lE6ubOu.js";import"./IconQuestionMarkCircle-CYKV5inN.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-C-4-p9pl.js";import"./Switch-OfBdwERx.js";import"./TabItem-aycfG7Sv.js";import"./elements-BOYmskOL.js";import"./TextInput-CPCrtAaB.js";import"./IconCross-DQV7Z95N.js";import"./Tooltip-BgZpwKBc.js";import"./useClickOutside-Bk_bMd-K.js";import"./EnablePortalWrapper-C5GDd9fT.js";import"./dialog-D9O7a7Fm.js";import"./Tree-CO5WdhY1.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-BCt-O3sJ.js";import"./IconCaretDown-C1vuk0WO.js";import"./IconCaretDown16-CMCzgPBz.js";import"./IconTrashBin16-W99sZLY1.js";import"./IconTrashBin24-DmKPPE09.js";import"./useButton-CTSBvX_x.js";import"./Flex-MROG9ZlO.js";import"./IconIcon16-DfJvNpv2.js";import"./IconIcon24-BvaBfYgA.js";const jt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,e]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>e(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>e(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>e(!1)}]})]})})]})},o=h.bind({});o.args={};var a,p,m;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
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
