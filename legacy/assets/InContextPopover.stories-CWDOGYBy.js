import{r as s,j as t}from"./iframe-Cuuz2GJq.js";import{a as l}from"./Box-m4PBwias.js";import{B as d}from"./Button-DcFz9xYt.js";import{D as u}from"./DialogBody-o2DSm2rS.js";import{D as g}from"./DialogFooter-DNL5wKni.js";import{D as f}from"./DialogHeader-Ck89IArJ.js";import{P as m}from"./Popover-5KCshfaZ.js";import{I as x}from"./IconIcon-ZkJzt0iK.js";import"./preload-helper-C1FmrZbK.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-DwtTxumk.js";import"./Divider-r2r2FkbT.js";import"./FormControl-DgJ9fxYA.js";import"./InputLabel-D1BpUpFD.js";import"./TooltipIcon-Dl6pMqy1.js";import"./LegacyTooltip-DOBnvWNZ.js";import"./useLink-D0s49w-R.js";import"./useFocusable-DgoKNfv-.js";import"./useFocusRing-DgQhTTal.js";import"./useEffectEvent-DxEqDHwu.js";import"./chain-DYCdTnn2.js";import"./index-Br928Knc.js";import"./usePopper-BP7kRwwG.js";import"./index-BSoEGWQc.js";import"./Portal-CcpWWYs1.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-DY15yGWN.js";import"./IconCheckMark-BdzytnOu.js";import"./IconExclamationMarkCircle24-qz18QCqO.js";import"./IconExclamationMarkTriangle-BCkhpLUe.js";import"./IconExclamationMarkTriangle24-DNVR-sDp.js";import"./IconQuestionMarkCircle-DjVXr8Ym.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-Dyv8zZXb.js";import"./Switch-B3xYc1Gy.js";import"./TabItem-yyqhrrsM.js";import"./elements-BOYmskOL.js";import"./TextInput-B0PGVwIc.js";import"./IconCross-eNHuqyEX.js";import"./Tooltip-B-KRLugN.js";import"./useClickOutside-Uxy7utgd.js";import"./EnablePortalWrapper-Dp3mgTzX.js";import"./dialog-D9O7a7Fm.js";import"./Tree-EUWwSITk.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-CCmdIFzv.js";import"./Flex-D1WXjMbF.js";import"./IconIcon16-jLFmadog.js";import"./IconIcon24-DJ8ZzWqM.js";const ft={title:"Experimental/Popover/In Context",Component:m,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,o]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>o(!i),ref:r,children:"Trigger"}),t.jsx(m,{...c,anchor:r,open:i,handleClose:()=>o(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>o(!1)}]})]})})]})},e=h.bind({});e.args={};var a,p,n;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
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
