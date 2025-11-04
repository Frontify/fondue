import{r as s,j as t}from"./iframe-CDRstm0C.js";import{a as l}from"./Box-BgOrf3UO.js";import{B as d}from"./Button-D_bQ7VR6.js";import{D as u}from"./DialogBody-CKf3dQRE.js";import{D as g}from"./DialogFooter-Bljt6oqK.js";import{D as f}from"./DialogHeader-Bu885KOO.js";import{P as n}from"./Popover-7vlW3rg3.js";import{I as x}from"./IconIcon-CdbYs8L3.js";import"./preload-helper-C7xgB0v-.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-DOmezKEq.js";import"./FormControl-BMOfwmhC.js";import"./InputLabel-Cs5CZTpg.js";import"./TooltipIcon-BwT6eVvl.js";import"./LegacyTooltip-DvSdpi8G.js";import"./useLink-8zG_vWba.js";import"./useFocusable-B15QcTZF.js";import"./useFocusRing-UE97zQCw.js";import"./useEffectEvent-DzdohreD.js";import"./chain-nZg9lPIx.js";import"./index-DjgXOIjb.js";import"./usePopper-DPsNEqxC.js";import"./index-F0GCa985.js";import"./Portal-C2RK98Mp.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-lvykKVxc.js";import"./IconCheckMark-Br7aTwB8.js";import"./IconExclamationMarkCircle24-DaaHPybN.js";import"./IconExclamationMarkTriangle-DVll2-1a.js";import"./IconExclamationMarkTriangle24-YbouCJLf.js";import"./IconQuestionMarkCircle-2BNxGubK.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-SAaKEIFA.js";import"./Switch-_bNcJ9jc.js";import"./TabItem-DaCdgH_t.js";import"./elements-BOYmskOL.js";import"./TextInput-DQx74ckt.js";import"./IconCross-zQeoCE8b.js";import"./Tooltip-C0ivaCGJ.js";import"./useClickOutside-B_ETivn7.js";import"./EnablePortalWrapper-CfV2-txn.js";import"./dialog-D9O7a7Fm.js";import"./Tree-DbKNVcoZ.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-DG9gd2Uq.js";import"./IconCaretDown-_xIch-96.js";import"./IconCaretDown16-ttgvU4nX.js";import"./IconTrashBin16-TK6B-iwP.js";import"./IconTrashBin24-D8bBYc2Y.js";import"./useButton-0YDeVxAZ.js";import"./Flex-DSR3Timc.js";import"./IconIcon16-DL3aASQL.js";import"./IconIcon24-IH8Oc-OY.js";const Ct={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,o]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>o(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>o(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>o(!1)}]})]})})]})},e=h.bind({});e.args={};var a,p,m;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
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
