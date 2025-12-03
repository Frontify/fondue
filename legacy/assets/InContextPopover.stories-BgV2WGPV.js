import{r as s,j as t}from"./iframe-CPVXeDTJ.js";import{a as l}from"./Box-CRe9VAG5.js";import{B as d}from"./Button-DcvZ1DZ0.js";import{D as u}from"./DialogBody-BYFVVfe1.js";import{D as g}from"./DialogFooter-CjHW2usu.js";import{D as f}from"./DialogHeader-B2LDRXDi.js";import{P as n}from"./Popover-B5AyTyPD.js";import{I as x}from"./IconIcon-B0Ani2p6.js";import"./preload-helper-C1FmrZbK.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-5Qr1kmcq.js";import"./Divider-CuNYdysP.js";import"./FormControl-C_o05XeK.js";import"./InputLabel-DWHhHPOs.js";import"./TooltipIcon-CXQeRWDh.js";import"./LegacyTooltip-BU4dCUVV.js";import"./useLink-CXlKXDhg.js";import"./useFocusable-wuqHFRru.js";import"./useFocusRing-D193FtFi.js";import"./useEffectEvent-CSmJharH.js";import"./chain-GAT8LxO8.js";import"./index-BDGYgm0p.js";import"./usePopper-DOqAeV49.js";import"./index-Ymu7xFIT.js";import"./Portal-B44rDUW3.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-CohZOODg.js";import"./IconCheckMark-BM1Nx-81.js";import"./IconExclamationMarkCircle24-D7s9QYvy.js";import"./IconExclamationMarkTriangle-UZ-zXXAT.js";import"./IconExclamationMarkTriangle24-BBWvN_rT.js";import"./IconQuestionMarkCircle-eH6dV0Lo.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-BrEgRMi_.js";import"./Switch-CwQRvBgj.js";import"./TabItem-DV3wlJoW.js";import"./elements-BOYmskOL.js";import"./TextInput-B1MRhG65.js";import"./IconCross-zRrar9C3.js";import"./Tooltip-DpuhuC-M.js";import"./useClickOutside-nuWxa3yt.js";import"./EnablePortalWrapper-DvER4Fo2.js";import"./dialog-D9O7a7Fm.js";import"./Tree-F8IHkW6W.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger--iYref-1.js";import"./IconCaretDown-Ce40xpyy.js";import"./IconCaretDown16-CA92RyIj.js";import"./IconTrashBin16-p0_Z_tzM.js";import"./IconTrashBin24-BASiy9Cc.js";import"./useButton-C3Gymf-D.js";import"./Flex-Cicr9OBS.js";import"./IconIcon16-B7hSD_xg.js";import"./IconIcon24-O2yydysh.js";const jt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,e]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>e(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>e(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>e(!1)}]})]})})]})},o=h.bind({});o.args={};var a,p,m;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
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
