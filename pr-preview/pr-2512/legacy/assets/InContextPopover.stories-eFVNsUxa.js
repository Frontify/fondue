import{r as s,j as t}from"./iframe-BJKrgMsT.js";import{a as l}from"./Box-BlT_eC2X.js";import{B as d}from"./Button-CjadhTmL.js";import{D as u}from"./DialogBody-DzB2ZZgL.js";import{D as g}from"./DialogFooter-CIBE66Jn.js";import{D as f}from"./DialogHeader-Dg5-lon1.js";import{P as m}from"./Popover-B9vFd25w.js";import{I as x}from"./IconIcon-DT6LLxMP.js";import"./preload-helper-DqI2Z-E9.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-DGwfrx-R.js";import"./Divider-CYI80JyK.js";import"./FormControl-BZ0mtm7p.js";import"./InputLabel-Buz3h1He.js";import"./TooltipIcon-D-rDAdiW.js";import"./LegacyTooltip-DrbUxBgR.js";import"./useLink-Xttdml0-.js";import"./useFocusable-D02DpTt5.js";import"./useFocusRing-BldqIYxH.js";import"./useEffectEvent-Duvqr8iK.js";import"./chain-Bvi37PFb.js";import"./index-CdqStL1j.js";import"./usePopper-BhBjtLqF.js";import"./index-Dp9pTiFo.js";import"./Portal-DqeH8oQh.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-BvlRzixw.js";import"./IconCheckMark-Cv4GW5R2.js";import"./IconExclamationMarkCircle24-C_fuGlRC.js";import"./IconExclamationMarkTriangle-sRh5tL4h.js";import"./IconExclamationMarkTriangle24-cPBP4VDB.js";import"./IconQuestionMarkCircle-knPUljvz.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-CQA52sqE.js";import"./Switch-oqywBLTl.js";import"./TabItem-5KePTQD7.js";import"./elements-BOYmskOL.js";import"./TextInput-C_pxFzry.js";import"./IconCross-C9JbtjCK.js";import"./Tooltip-DnjZOTIy.js";import"./useClickOutside--iCIF10_.js";import"./EnablePortalWrapper-D47WanvQ.js";import"./dialog-D9O7a7Fm.js";import"./Tree-BUjAIeJU.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-BQITPCv7.js";import"./Flex-D3HtjeVV.js";import"./IconIcon16-BNV6trom.js";import"./IconIcon24-Ds0Wf_Xm.js";const ft={title:"Experimental/Popover/In Context",Component:m,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,o]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>o(!i),ref:r,children:"Trigger"}),t.jsx(m,{...c,anchor:r,open:i,handleClose:()=>o(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>o(!1)}]})]})})]})},e=h.bind({});e.args={};var a,p,n;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
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
}`,...(n=(p=e.parameters)==null?void 0:p.docs)==null?void 0:n.source}}};const xt=["WithHeaderAndFooter"];export{e as WithHeaderAndFooter,xt as __namedExportsOrder,ft as default};
