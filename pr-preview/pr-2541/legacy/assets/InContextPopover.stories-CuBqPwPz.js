import{r as s,j as t}from"./iframe-GsWVCcip.js";import{a as l}from"./Box-CzVZfpA_.js";import{B as d}from"./Button-FFHUDWdy.js";import{D as u}from"./DialogBody-GL9P_79t.js";import{D as g}from"./DialogFooter-DjgLL7iQ.js";import{D as f}from"./DialogHeader-BTSKVQRR.js";import{P as m}from"./Popover-CcT2erAn.js";import{I as x}from"./IconIcon-BldICVWs.js";import"./preload-helper-DlITqhEh.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-B0dPYVBl.js";import"./Divider-DanDfYFG.js";import"./FormControl-spbLzwVx.js";import"./InputLabel-CahyiKfm.js";import"./TooltipIcon-DYpwK9w-.js";import"./LegacyTooltip-CLoes_20.js";import"./useLink-BYKTpev_.js";import"./useFocusable-Cw227HY_.js";import"./useFocusRing-CSdGRXHf.js";import"./useEffectEvent-Q8O3nA3c.js";import"./chain-CWiBJnxB.js";import"./index-DbWXpaPI.js";import"./usePopper-BaFuLpop.js";import"./index-BW__ZAa-.js";import"./Portal-Cy88iIFN.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-Cwgw6BYb.js";import"./IconCheckMark-DUGK9hQx.js";import"./IconExclamationMarkCircle24-D0fkRMzk.js";import"./IconExclamationMarkTriangle-BwVEr5i3.js";import"./IconExclamationMarkTriangle24-3hVkDfff.js";import"./IconQuestionMarkCircle-CDPtksXt.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-B_3E0qZN.js";import"./Switch-CuVKeTGx.js";import"./TabItem-BPl3vW_R.js";import"./elements-BOYmskOL.js";import"./TextInput-DmYgNNdi.js";import"./IconCross-B3O7pvAH.js";import"./Tooltip-CFDY_RrF.js";import"./useClickOutside-ConM1ri9.js";import"./EnablePortalWrapper-DM6k7ufD.js";import"./dialog-D9O7a7Fm.js";import"./Tree-BDmC0Bw_.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-BshwJNnM.js";import"./Flex-BL7B4h2X.js";import"./IconIcon16-CYRbqumU.js";import"./IconIcon24-CjcJZeQj.js";const ft={title:"Experimental/Popover/In Context",Component:m,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,o]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>o(!i),ref:r,children:"Trigger"}),t.jsx(m,{...c,anchor:r,open:i,handleClose:()=>o(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>o(!1)}]})]})})]})},e=h.bind({});e.args={};var a,p,n;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
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
