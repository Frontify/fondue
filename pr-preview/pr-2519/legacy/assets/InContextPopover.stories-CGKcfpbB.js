import{r as s,j as t}from"./iframe-BdpEJ73u.js";import{a as l}from"./Box-B8xOPFrQ.js";import{B as d}from"./Button-CyrRRo22.js";import{D as u}from"./DialogBody-CT3j9-ey.js";import{D as g}from"./DialogFooter-8_O_QIdl.js";import{D as f}from"./DialogHeader-U2v2NRN5.js";import{P as n}from"./Popover-Dh4lHI37.js";import{I as x}from"./IconIcon-DninGn3h.js";import"./preload-helper-MprHWY6w.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-CiV_SEfN.js";import"./Divider-6_usVKa3.js";import"./FormControl-BFo-JPTy.js";import"./InputLabel-DebL1FVz.js";import"./TooltipIcon-DKBgdncx.js";import"./LegacyTooltip-ChszLcz-.js";import"./useLink-hiDguVaH.js";import"./useFocusable-dja3mNt3.js";import"./useFocusRing-BoREWGHn.js";import"./useEffectEvent-BtbNxUmw.js";import"./chain-CSPh-k5E.js";import"./index-CkqZHkB8.js";import"./usePopper-DodwAGz1.js";import"./index-DjmiaQRC.js";import"./Portal-DcQaeB9f.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-CroDTlnv.js";import"./IconCheckMark-JGl78NQC.js";import"./IconExclamationMarkCircle24-oCV7DLvN.js";import"./IconExclamationMarkTriangle-BCFecG3K.js";import"./IconExclamationMarkTriangle24-DDeoj2zf.js";import"./IconQuestionMarkCircle-yKiZOJks.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-iQPwxUq0.js";import"./Switch-Cs2uWJoh.js";import"./TabItem-7kIsjaIc.js";import"./elements-BOYmskOL.js";import"./TextInput-wgiRUPvd.js";import"./IconCross-2s4J7Pvo.js";import"./Tooltip-BeCtgi9G.js";import"./useClickOutside-yhAcwUeS.js";import"./EnablePortalWrapper-C1kCJOjn.js";import"./dialog-D9O7a7Fm.js";import"./Tree-CeZOBO5O.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-M8Uz0PUR.js";import"./IconCaretDown-DjMqE6GK.js";import"./IconCaretDown16-BPKmHEp2.js";import"./IconTrashBin16-D1isIcK9.js";import"./IconTrashBin24-CFqe0mJW.js";import"./useButton-CzTp58mm.js";import"./Flex-_yPhTSLz.js";import"./IconIcon16-BoznwXcv.js";import"./IconIcon24-m8JrQ1p_.js";const jt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,e]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>e(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>e(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>e(!1)}]})]})})]})},o=h.bind({});o.args={};var a,p,m;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
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
