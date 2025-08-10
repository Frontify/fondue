import{j as t}from"./jsx-runtime-BYYWji4R.js";import{r as a}from"./index-ClcD9ViR.js";import{a as l}from"./Box-C5WhNuuT.js";import{c as d}from"./Button-BkcxChke.js";import{D as u}from"./DialogBody-CKaSimJT.js";import{D as g}from"./DialogFooter-CmdrwtaG.js";import{D as f}from"./DialogHeader-JCm4sy1X.js";import{P as n}from"./Popover-Kh20meQQ.js";import{I as x}from"./IconJohanna-SvJ9aa_T.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-BtNTXUM4.js";import"./input-DevYctQy.js";import"./Divider-Drwt0P6l.js";import"./FormControl-BkRGxkdF.js";import"./InputLabel-BBoeJyMH.js";import"./TooltipIcon-CBNLwOmC.js";import"./LegacyTooltip-DwGdpKnT.js";import"./useLink-DLd-zCvm.js";import"./useFocusable-NpJIjJzn.js";import"./useFocusRing-CqhiwHAH.js";import"./useEffectEvent-23OTMzEQ.js";import"./chain-zZtnTS2i.js";import"./index-Cho7bklK.js";import"./usePopper-BHXQC2xD.js";import"./index-DlnOb27V.js";import"./Portal-B3A1C5qZ.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-DU5NJZZj.js";import"./IconCheckMark-DDrIoLdu.js";import"./IconExclamationMarkCircle24-4UiwpX0o.js";import"./IconExclamationMarkTriangle-DOh84ahI.js";import"./IconExclamationMarkTriangle24-BCoex7hw.js";import"./IconQuestionMarkCircle-7EPrDyIp.js";import"./validation-CJXPAjNB.js";import"./LoadingCircle-N4gckcbl.js";import"./Switch-Cd2vSyfE.js";import"./TabItem-7zIDIg2o.js";import"./elements-BOYmskOL.js";import"./TextInput-DxGfxErH.js";import"./IconCross-BVasaH61.js";import"./Tooltip-PS__CsyB.js";import"./useClickOutside-BcVMXM8r.js";import"./EnablePortalWrapper-DHpdIRHB.js";import"./dialog-Dre1eVQK.js";import"./Tree-zO-e1FBW.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-DtS_F8DS.js";import"./IconCaretDown-BLgqrlDL.js";import"./IconCaretDown16-Df8Xsbqc.js";import"./IconTrashBin16-DOiZQ5Am.js";import"./IconTrashBin24-10Yg3nt7.js";import"./useButton-CmN_Qqm3.js";import"./Flex-CoSbIumb.js";const Ct={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,e]=a.useState(!1),r=a.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>e(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>e(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>e(!1)}]})]})})]})},o=h.bind({});o.args={};var s,p,m;o.parameters={...o.parameters,docs:{...(s=o.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
}`,...(m=(p=o.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};const jt=["WithHeaderAndFooter"];export{o as WithHeaderAndFooter,jt as __namedExportsOrder,Ct as default};
