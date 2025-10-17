import{r as a,j as t}from"./iframe-D2yG1z8G.js";import{a as l}from"./Box-cMH4V9vz.js";import{B as d}from"./Button-DyZJdRzC.js";import{D as u}from"./DialogBody-D7PRHc-t.js";import{D as g}from"./DialogFooter-D75GnAHg.js";import{D as f}from"./DialogHeader-BrEXBcEY.js";import{P as n}from"./Popover-C0HezWOb.js";import{I as x}from"./IconJohanna-gb8S5t15.js";import"./preload-helper-B933Jwna.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-Ds3xxMY8.js";import"./Divider-8HP3TTIU.js";import"./FormControl-BQlH37kN.js";import"./InputLabel-CNCsiG3z.js";import"./TooltipIcon-esB0x96Z.js";import"./LegacyTooltip-Bza-CyWY.js";import"./useLink-B4iVauNq.js";import"./useFocusable-CG5e2_ae.js";import"./useFocusRing-CUPlW5s2.js";import"./useEffectEvent-BWMeWV83.js";import"./chain-DIy-ezxT.js";import"./index-DOTWLTGL.js";import"./usePopper-B1ucurC2.js";import"./index-BRHXjPQc.js";import"./Portal-CUyHPEXT.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-Nwa-rf0T.js";import"./IconCheckMark-DEoILCsa.js";import"./IconExclamationMarkCircle24-D4bTeovh.js";import"./IconExclamationMarkTriangle-LCwcPvTX.js";import"./IconExclamationMarkTriangle24-DmNRqQJY.js";import"./IconQuestionMarkCircle-D93ThXMY.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-AiTfB69Q.js";import"./Switch-6QMjr_-q.js";import"./TabItem-NmAy5Dtx.js";import"./elements-BOYmskOL.js";import"./TextInput-DSHnXubY.js";import"./IconCross-BPtP3osG.js";import"./Tooltip-PeIXMsPF.js";import"./useClickOutside-D4LI5oid.js";import"./EnablePortalWrapper-BhbHE_zt.js";import"./dialog-D9O7a7Fm.js";import"./Tree-C5tDh8AG.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-B9HV8M2g.js";import"./IconCaretDown-DAlyAeDs.js";import"./IconCaretDown16-LfI1PUaG.js";import"./IconTrashBin16-0ahnzJRY.js";import"./IconTrashBin24-CaSAfRi-.js";import"./useButton-BoO6ZY0i.js";import"./Flex-eKuEzAxs.js";const Bt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,o]=a.useState(!1),r=a.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>o(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>o(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>o(!1)}]})]})})]})},e=h.bind({});e.args={};var s,p,m;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
