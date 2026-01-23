import{r as s,j as t}from"./iframe-DH_Vpvc8.js";import{a as l}from"./Box-lmRurSI5.js";import{B as d}from"./Button-CRfrGFua.js";import{D as u}from"./DialogBody-5ICjfYzB.js";import{D as g}from"./DialogFooter-BRfDefUt.js";import{D as f}from"./DialogHeader-C1z6EjGe.js";import{P as n}from"./Popover-BPS4ULxu.js";import{I as x}from"./IconIcon-CelNsdA8.js";import"./preload-helper-CxFeC-BG.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-fMLuskIO.js";import"./Checkbox-BKDFmUYg.js";import"./useFocusable-BfaIOJFi.js";import"./useFocusRing-CBL7_Hgl.js";import"./useEffectEvent-ClEuPD_7.js";import"./chain-BXWUlVD-.js";import"./index-BEyY7rkE.js";import"./useFormValidationState-BLSqlG-U.js";import"./useControlledState-BcEV7UZo.js";import"./InputLabel-DD2Ppz5-.js";import"./TooltipIcon-BUevwMOK.js";import"./LegacyTooltip-CJ8JehmO.js";import"./useLink-CfQmoYLi.js";import"./usePopper-7nuAm56J.js";import"./index-DswGKGRV.js";import"./Portal-DfJTwWgR.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-h7ZSLYPU.js";import"./IconCheckMark-CBAEpExY.js";import"./IconExclamationMarkCircle24-D3Uxl3xP.js";import"./IconExclamationMarkTriangle-C4yhxZCE.js";import"./IconExclamationMarkTriangle24-CfZExJL9.js";import"./IconQuestionMarkCircle-5nNliWG4.js";import"./IconMinus-0cOeQ8LJ.js";import"./Divider-Du5UKnrr.js";import"./FormControl-B2FtJwKU.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-CfdqrWn5.js";import"./Switch-C8jSVRUG.js";import"./TabItem-B7u6UvQ-.js";import"./elements-BOYmskOL.js";import"./TextInput-Be_uW0xW.js";import"./IconCross-Clz4DbLP.js";import"./Tooltip-DOykOIXa.js";import"./useClickOutside-BmDR2us8.js";import"./EnablePortalWrapper-BdDHCmiv.js";import"./dialog-D9O7a7Fm.js";import"./Tree-p5r-5Ig9.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-Bu4woFqc.js";import"./IconCaretDown-Bt6Qf-uZ.js";import"./IconCaretDown16-CxMSiV6T.js";import"./IconTrashBin16-BMY5sjUw.js";import"./IconTrashBin24-BwZ2YLrM.js";import"./useButton-DwlojS2s.js";import"./Flex-DKOzSj2x.js";import"./IconIcon16-BPtSTGDn.js";import"./IconIcon24-Cr1gPKRH.js";const vt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,e]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>e(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>e(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>e(!1)}]})]})})]})},o=h.bind({});o.args={};var p,a,m;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:`args => {
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
}`,...(m=(a=o.parameters)==null?void 0:a.docs)==null?void 0:m.source}}};const qt=["WithHeaderAndFooter"];export{o as WithHeaderAndFooter,qt as __namedExportsOrder,vt as default};
