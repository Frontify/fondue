import{r as a,j as t}from"./iframe-DZsoqIQH.js";import{a as l}from"./Box-BhZbAWvx.js";import{B as d}from"./Button-DjeFZAKL.js";import{D as u}from"./DialogBody-D78tLQZL.js";import{D as g}from"./DialogFooter-TVnVsNXy.js";import{D as f}from"./DialogHeader-DSXBuWl0.js";import{P as m}from"./Popover-BtMx3Avr.js";import{I as x}from"./IconJohanna-B6FA6CsW.js";import"./preload-helper-B933Jwna.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-Hg_Jq5aN.js";import"./FormControl-jeH6ufrc.js";import"./InputLabel-CkXbkHdM.js";import"./TooltipIcon-CjIWgR0R.js";import"./LegacyTooltip-ClEwPHV5.js";import"./useLink-xEXBuUvC.js";import"./useFocusable-w9vBw5vf.js";import"./useFocusRing-DbKjnAj0.js";import"./useEffectEvent-D8w6sK6J.js";import"./chain-VSjaRpoC.js";import"./index-B1yy6L_0.js";import"./usePopper-BgKvnTxb.js";import"./index-Bz3rgcYf.js";import"./Portal-CN1TagRk.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-Bl8d1xLN.js";import"./IconCheckMark-BHBJzH8F.js";import"./IconExclamationMarkCircle24-DDwDRcD9.js";import"./IconExclamationMarkTriangle-BqNXwrRl.js";import"./IconExclamationMarkTriangle24-C0GN7WvG.js";import"./IconQuestionMarkCircle-CkUpDNDy.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-fy3UZfJY.js";import"./Switch-D1rFuCfK.js";import"./TabItem-CC4j3WN4.js";import"./elements-BOYmskOL.js";import"./TextInput-BsRYT8lu.js";import"./IconCross-DPfWkxZJ.js";import"./Tooltip-C1plt_3w.js";import"./useClickOutside-D1vWzB1y.js";import"./EnablePortalWrapper-DBbHCB_v.js";import"./dialog-D9O7a7Fm.js";import"./Tree-DDNvcnCv.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-BC-kZGBQ.js";import"./IconCaretDown-DmwJmvvT.js";import"./IconCaretDown16-Dvjt7Ada.js";import"./IconTrashBin16-kjeqw6-L.js";import"./IconTrashBin24-DN5n-TpR.js";import"./useButton-BxuZFr2v.js";import"./Flex-BV3oYkak.js";const ht={title:"Experimental/Popover/In Context",Component:m,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,o]=a.useState(!1),r=a.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>o(!i),ref:r,children:"Trigger"}),t.jsx(m,{...c,anchor:r,open:i,handleClose:()=>o(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>o(!1)}]})]})})]})},e=h.bind({});e.args={};var s,p,n;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
}`,...(n=(p=e.parameters)==null?void 0:p.docs)==null?void 0:n.source}}};const Bt=["WithHeaderAndFooter"];export{e as WithHeaderAndFooter,Bt as __namedExportsOrder,ht as default};
