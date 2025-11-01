import{r as s,j as t}from"./iframe-87vQE0G8.js";import{a as l}from"./Box-ECz8v9Ex.js";import{B as d}from"./Button-mrkxkHAJ.js";import{D as u}from"./DialogBody-14SVNgmB.js";import{D as g}from"./DialogFooter-Bf8VfB_E.js";import{D as f}from"./DialogHeader-DSGfJPOj.js";import{P as m}from"./Popover-CjxowcWX.js";import{I as x}from"./IconIcon-CCsk5gR6.js";import"./preload-helper-D9dL-qgt.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-C4UkkDl1.js";import"./Divider-XWC33T1C.js";import"./FormControl-13wrbNAQ.js";import"./InputLabel-B9cVIxJ9.js";import"./TooltipIcon-UcJUXDWL.js";import"./LegacyTooltip--lHixilP.js";import"./useLink-DwC9KDJ-.js";import"./useFocusable-D5IUiL0q.js";import"./useFocusRing-YMxsAiq0.js";import"./useEffectEvent-CJcvK5ne.js";import"./chain-Cw4GZpOU.js";import"./index-DVCfecQC.js";import"./usePopper-CDDnR_Bd.js";import"./index-BPT-xlNM.js";import"./Portal-CNkWJhCS.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-1N2am3Y0.js";import"./IconCheckMark-_BQk6PBx.js";import"./IconExclamationMarkCircle24-CqxwnR-h.js";import"./IconExclamationMarkTriangle-C1fztYa9.js";import"./IconExclamationMarkTriangle24-BTPIBAv2.js";import"./IconQuestionMarkCircle-DCG9F14E.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-BxwRdzx8.js";import"./Switch-CsAb3kz2.js";import"./TabItem-D7e03095.js";import"./elements-BOYmskOL.js";import"./TextInput-BcLe5O15.js";import"./IconCross-pAScAbBc.js";import"./Tooltip-wJfNmnc-.js";import"./useClickOutside-vCdYX0ix.js";import"./EnablePortalWrapper-OWct0vFK.js";import"./dialog-D9O7a7Fm.js";import"./Tree-Bb7X1EMA.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-DgiAo-w-.js";import"./Flex-CCgOrPIS.js";import"./IconIcon16-D2RtooaI.js";import"./IconIcon24-BDL8yMOG.js";const ft={title:"Experimental/Popover/In Context",Component:m,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,o]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>o(!i),ref:r,children:"Trigger"}),t.jsx(m,{...c,anchor:r,open:i,handleClose:()=>o(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>o(!1)}]})]})})]})},e=h.bind({});e.args={};var a,p,n;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
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
