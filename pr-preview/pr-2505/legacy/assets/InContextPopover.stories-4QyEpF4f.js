import{r as a,j as t}from"./iframe-CeUxCpPC.js";import{a as l}from"./Box-xuFDPGMY.js";import{B as d}from"./Button-CxGZHxoX.js";import{D as u}from"./DialogBody-Ja6sXUym.js";import{D as g}from"./DialogFooter-DjaVq4I5.js";import{D as f}from"./DialogHeader-JIw050iq.js";import{P as m}from"./Popover-Ch-1nSjV.js";import{I as x}from"./IconJohanna-DMa6Bzy4.js";import"./preload-helper-DpV-BRze.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-CXv7Ls6T.js";import"./Divider-D5z2d8OX.js";import"./FormControl-tA730R-E.js";import"./InputLabel-DDXnEbj6.js";import"./TooltipIcon-BVplYrUn.js";import"./LegacyTooltip-kTodRFC3.js";import"./useLink-BX6Sa-AY.js";import"./useFocusable-vGbM0ZuL.js";import"./useFocusRing-CJ0jx8fE.js";import"./useEffectEvent-BYfJK1FS.js";import"./chain-BtVLX8K0.js";import"./index--jDPQ2CC.js";import"./usePopper-DYgMtgk8.js";import"./index-D4Uana3l.js";import"./Portal-Bb68Jec6.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-Cb0ErC6G.js";import"./IconCheckMark-3Dk1pvPo.js";import"./IconExclamationMarkCircle24-D7mWRICj.js";import"./IconExclamationMarkTriangle-DU2vNAlo.js";import"./IconExclamationMarkTriangle24-Ce52pyNp.js";import"./IconQuestionMarkCircle-CDNb_VnN.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-DmHbHNit.js";import"./Switch-OwfbnXcX.js";import"./TabItem-Cnfs7aY-.js";import"./elements-BOYmskOL.js";import"./TextInput-x089nf5b.js";import"./IconCross-DftM46H0.js";import"./Tooltip-DUXyvgpR.js";import"./useClickOutside-BP9UeQtb.js";import"./EnablePortalWrapper-BDJVfwgV.js";import"./dialog-D9O7a7Fm.js";import"./Tree-BhfeJdcG.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-DfIAN4RH.js";import"./Flex-DIYDY9g4.js";const ut={title:"Experimental/Popover/In Context",Component:m,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,o]=a.useState(!1),r=a.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>o(!i),ref:r,children:"Trigger"}),t.jsx(m,{...c,anchor:r,open:i,handleClose:()=>o(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>o(!1)}]})]})})]})},e=h.bind({});e.args={};var s,n,p;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
}`,...(p=(n=e.parameters)==null?void 0:n.docs)==null?void 0:p.source}}};const gt=["WithHeaderAndFooter"];export{e as WithHeaderAndFooter,gt as __namedExportsOrder,ut as default};
