import{r as s,j as t}from"./iframe-BYByppjA.js";import{a as l}from"./Box-CpWSRXPq.js";import{B as d}from"./Button-w-4T45cJ.js";import{D as u}from"./DialogBody-BEsGN2b8.js";import{D as g}from"./DialogFooter-Fect6xgt.js";import{D as f}from"./DialogHeader-Cc70JMNJ.js";import{P as n}from"./Popover-5IE-_hpA.js";import{I as x}from"./IconIcon-CYme7f2M.js";import"./preload-helper-DyHTrhc7.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-DCKI2hXM.js";import"./Divider-BQt0MZd2.js";import"./FormControl-C4_d0t2A.js";import"./InputLabel-_c3nWSSE.js";import"./TooltipIcon-BNrqRANO.js";import"./LegacyTooltip-DPlDs3Bg.js";import"./useLink-Dgto1joU.js";import"./useFocusable-BzCPMRzm.js";import"./useFocusRing-DJ3Txbg8.js";import"./useEffectEvent-DYOD1mFo.js";import"./chain-BRjlEOf0.js";import"./index-BvXv4Kpv.js";import"./usePopper-BjMBxjrj.js";import"./index-BloTn-Pt.js";import"./Portal-BdCRmzA4.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-iS5UWw9V.js";import"./IconCheckMark-DTAVvTol.js";import"./IconExclamationMarkCircle24-D_uJ6XBQ.js";import"./IconExclamationMarkTriangle-DKHG93a_.js";import"./IconExclamationMarkTriangle24-CeFjqNf5.js";import"./IconQuestionMarkCircle-CWDsgLYP.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-DoOSAgJQ.js";import"./Switch-C9Kuu0Vg.js";import"./TabItem-C5qIyEHY.js";import"./elements-BOYmskOL.js";import"./TextInput-BeY6dKVb.js";import"./IconCross-4Gqhnlgf.js";import"./Tooltip-CpSqVSMX.js";import"./useClickOutside-xR95UeCJ.js";import"./EnablePortalWrapper-C6aDJWM9.js";import"./dialog-D9O7a7Fm.js";import"./Tree-BlTmC7Ez.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-uO8VVVTq.js";import"./IconCaretDown-BcsA1pbK.js";import"./IconCaretDown16-BbjYTRIB.js";import"./IconTrashBin16-Cnls3zl1.js";import"./IconTrashBin24-BoXg_kBS.js";import"./useButton-BB9tuRtI.js";import"./Flex-BKZIbO_E.js";import"./IconIcon16-C85prtTt.js";import"./IconIcon24-CtxJoCsy.js";const jt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,e]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>e(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>e(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>e(!1)}]})]})})]})},o=h.bind({});o.args={};var a,p,m;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
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
