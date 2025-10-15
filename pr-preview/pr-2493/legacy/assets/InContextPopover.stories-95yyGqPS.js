import{r as a,j as t}from"./iframe-0YDHrRt6.js";import{a as l}from"./Box-Dxsrqlvj.js";import{B as d}from"./Button-2G_0paTC.js";import{D as u}from"./DialogBody-BYZH2FwO.js";import{D as g}from"./DialogFooter-Cba8ZMGB.js";import{D as f}from"./DialogHeader-Gbvhf8TB.js";import{P as n}from"./Popover-6CsZ-YVy.js";import{I as x}from"./IconJohanna-GcqBqxdH.js";import"./preload-helper-h55SgzPI.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-CAusm6h1.js";import"./Divider-uDIg1p3e.js";import"./FormControl-DONs9dV5.js";import"./InputLabel-BpxxMALc.js";import"./TooltipIcon-BzU7idz7.js";import"./LegacyTooltip-BWZ1XHjf.js";import"./useLink-CxfHgizR.js";import"./useFocusable-D2xehFAO.js";import"./useFocusRing-D4vnbWSH.js";import"./useEffectEvent-B9VOC_Iw.js";import"./chain-BsYcESRq.js";import"./index-CFitZhhZ.js";import"./usePopper-CsQKkv4s.js";import"./index-DjyKXdH0.js";import"./Portal-Bx3snlZl.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-BDmarxCk.js";import"./IconCheckMark-DbuNgHzm.js";import"./IconExclamationMarkCircle24-Dvdhmgm2.js";import"./IconExclamationMarkTriangle-B-LVrLFl.js";import"./IconExclamationMarkTriangle24-CfAmBqxS.js";import"./IconQuestionMarkCircle-BzWDTn-W.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-BjRJPyXu.js";import"./Switch-Dgxm9PcJ.js";import"./TabItem-CDBnffFz.js";import"./elements-BOYmskOL.js";import"./TextInput-Bdj8YO8t.js";import"./IconCross-0SyrPz9-.js";import"./Tooltip-DmqQVPid.js";import"./useClickOutside-FnyOu7d3.js";import"./EnablePortalWrapper-BLsW0qxC.js";import"./dialog-D9O7a7Fm.js";import"./Tree-Cl47lOuk.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-Be9U765P.js";import"./IconCaretDown-D1jHnc0u.js";import"./IconCaretDown16-BDg74fiZ.js";import"./IconTrashBin16-DM8ocjtE.js";import"./IconTrashBin24-6X4hQTbO.js";import"./useButton-BehVG7Qf.js";import"./Flex-DUJwscQz.js";const Bt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,o]=a.useState(!1),r=a.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>o(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>o(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>o(!1)}]})]})})]})},e=h.bind({});e.args={};var s,p,m;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
}`,...(m=(p=e.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};const Ct=["WithHeaderAndFooter"];export{e as WithHeaderAndFooter,Ct as __namedExportsOrder,Bt as default};
