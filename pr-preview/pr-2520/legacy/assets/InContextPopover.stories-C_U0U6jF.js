import{r as s,j as t}from"./iframe-B-0ohXx5.js";import{a as l}from"./Box-Bfo7eN4W.js";import{B as d}from"./Button-pohYv-VU.js";import{D as u}from"./DialogBody-Q9kaKyyS.js";import{D as g}from"./DialogFooter-CLvXaVmd.js";import{D as f}from"./DialogHeader-1YoD57Ac.js";import{P as n}from"./Popover-DSrjBLk_.js";import{I as x}from"./IconIcon-D5T0Cc9E.js";import"./preload-helper-OAyExbmo.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-BLGEgUqg.js";import"./Divider-CdBcJplS.js";import"./FormControl-QEmihnsL.js";import"./InputLabel-X8nwfpcT.js";import"./TooltipIcon-DgDxTaA8.js";import"./LegacyTooltip-5Gi4Bp92.js";import"./useLink-CsU7i9kB.js";import"./useFocusable-C_GXbrLR.js";import"./useFocusRing-Cj3WTh8B.js";import"./useEffectEvent-Cdq6nVtj.js";import"./chain-CI-qFvAv.js";import"./index-CqIiypJE.js";import"./usePopper-DCmNwhOA.js";import"./index-CN4ZOjmZ.js";import"./Portal-CmfkkRzZ.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-Dgblw7Vq.js";import"./IconCheckMark-CcoOjp0X.js";import"./IconExclamationMarkCircle24--X2w823R.js";import"./IconExclamationMarkTriangle-uD4qB27T.js";import"./IconExclamationMarkTriangle24-DOknGV0-.js";import"./IconQuestionMarkCircle-DXcByOTD.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-yJg0DNzg.js";import"./Switch-BEwTQN5Z.js";import"./TabItem-Bew6ASJr.js";import"./elements-BOYmskOL.js";import"./TextInput-vQHf8d1r.js";import"./IconCross-BZrhiKKk.js";import"./Tooltip-C6TcTlCS.js";import"./useClickOutside-BzLjgKkr.js";import"./EnablePortalWrapper-gT6-UTcE.js";import"./dialog-D9O7a7Fm.js";import"./Tree-BXR9YqgN.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-Db62SCyU.js";import"./IconCaretDown-vU3eGj--.js";import"./IconCaretDown16-ByN1R2fU.js";import"./IconTrashBin16-BR1M6xpE.js";import"./IconTrashBin24-DXN2McME.js";import"./useButton-DmkFeJ1M.js";import"./Flex-2An9NkDI.js";import"./IconIcon16-Bqwukxqy.js";import"./IconIcon24-C2r5jP0p.js";const jt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,e]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>e(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>e(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>e(!1)}]})]})})]})},o=h.bind({});o.args={};var a,p,m;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
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
