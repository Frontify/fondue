import{r as s,j as t}from"./iframe-DNYqvrxY.js";import{a as l}from"./Box-0VJkUxml.js";import{B as d}from"./Button-BQoAZ5jH.js";import{D as u}from"./DialogBody-g5E6ZGdF.js";import{D as g}from"./DialogFooter-BAt5soiE.js";import{D as f}from"./DialogHeader-zhUGkfmt.js";import{P as n}from"./Popover-CASel1BA.js";import{I as x}from"./IconIcon-Dcq84XF9.js";import"./preload-helper-MprHWY6w.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-D_zMi6m8.js";import"./Checkbox-CXW6lAAx.js";import"./useFocusable-DBLtVD04.js";import"./useFocusRing-inbe820I.js";import"./useEffectEvent-CqN8Xrle.js";import"./chain-rs3ruS8C.js";import"./index-Bz5Vwsqb.js";import"./useFormValidationState-C24859Ua.js";import"./useControlledState-BRYIGsaT.js";import"./InputLabel-8jf6vFiR.js";import"./TooltipIcon-CznUc7eq.js";import"./LegacyTooltip-wX-IP1mX.js";import"./useLink-C7zrBBAu.js";import"./usePopper-CbHMkx37.js";import"./index-TZyNZ7K3.js";import"./Portal-DstCpxkq.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-Cu-zzjsD.js";import"./IconCheckMark-D4hbZDn0.js";import"./IconExclamationMarkCircle24-CPMHklPN.js";import"./IconExclamationMarkTriangle-Ctk9IIB1.js";import"./IconExclamationMarkTriangle24-S70vgnAQ.js";import"./IconQuestionMarkCircle-BF5yWsBY.js";import"./IconMinus-D1zhuFKR.js";import"./Divider-BDmH5yTu.js";import"./FormControl-D4mHbKxO.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-BHuiThN5.js";import"./Switch-bVu7ZsXz.js";import"./TabItem-DcBBPJkU.js";import"./elements-BOYmskOL.js";import"./TextInput-C_-B3EDu.js";import"./IconCross-BPkFsv-s.js";import"./Tooltip-BN9TOj8b.js";import"./useClickOutside-COpRyopr.js";import"./EnablePortalWrapper-Djvws7ud.js";import"./dialog-D9O7a7Fm.js";import"./Tree-DsaVjoSD.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-CW7BOuLr.js";import"./Flex-ClwDGvFt.js";import"./IconIcon16-CbN7vnIr.js";import"./IconIcon24-CfHbtpjq.js";const Ct={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,o]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>o(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>o(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>o(!1)}]})]})})]})},e=h.bind({});e.args={};var a,p,m;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
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
