import{r as s,j as t}from"./iframe-B2O1l8ks.js";import{a as l}from"./Box-Brsujuan.js";import{B as d}from"./Button-DjQcwXiI.js";import{D as u}from"./DialogBody-drY_7Tuv.js";import{D as g}from"./DialogFooter-BkpzOf-x.js";import{D as f}from"./DialogHeader-CN0knUTo.js";import{P as n}from"./Popover-BN_4GFDv.js";import{I as x}from"./IconIcon-FC5N_xj7.js";import"./preload-helper-D9dL-qgt.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-COX0EROc.js";import"./Divider-C95xZvJp.js";import"./FormControl-Hwu9IOSl.js";import"./InputLabel-DmUNLwe6.js";import"./TooltipIcon-DjogzR85.js";import"./LegacyTooltip-CoPDRg8Q.js";import"./useLink-yIk-67qk.js";import"./useFocusable-C8pyFffm.js";import"./useFocusRing-BEoPloIT.js";import"./useEffectEvent-Xwo7DV9O.js";import"./chain-D3CT5oan.js";import"./index-g6qngXyA.js";import"./usePopper-BS2q9LVY.js";import"./index-J5FlhQNV.js";import"./Portal-DxlPTCam.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-CVzVZL2w.js";import"./IconCheckMark-Dh0UmVD7.js";import"./IconExclamationMarkCircle24-BRyvx9K_.js";import"./IconExclamationMarkTriangle-CdmIw3Si.js";import"./IconExclamationMarkTriangle24-BrwgDn_Y.js";import"./IconQuestionMarkCircle-pwURan37.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-DTSOVJnx.js";import"./Switch-CK66TCxd.js";import"./TabItem-l09098xX.js";import"./elements-BOYmskOL.js";import"./TextInput-CJHbc71V.js";import"./IconCross-Bxz_oRST.js";import"./Tooltip-CIUtXq9Y.js";import"./useClickOutside-BnNPuVAM.js";import"./EnablePortalWrapper-BXp3LSEV.js";import"./dialog-D9O7a7Fm.js";import"./Tree-DtYzLs8M.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-BPhVc6Ll.js";import"./IconCaretDown-DkHT8ZmQ.js";import"./IconCaretDown16-DFnwRzQd.js";import"./IconTrashBin16-D9g3yNqg.js";import"./IconTrashBin24-sCuj89qM.js";import"./useButton-Bzz293T6.js";import"./Flex-BhJu9Q1b.js";import"./IconIcon16-DoGaKMA1.js";import"./IconIcon24-tizQk3a2.js";const jt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,e]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>e(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>e(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>e(!1)}]})]})})]})},o=h.bind({});o.args={};var a,p,m;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
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
