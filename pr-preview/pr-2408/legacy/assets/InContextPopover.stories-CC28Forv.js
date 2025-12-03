import{r as s,j as t}from"./iframe-Dp4fbuuy.js";import{a as l}from"./Box-Bian4BQv.js";import{B as d}from"./Button-hpaYI8nC.js";import{D as u}from"./DialogBody-yizKFTlh.js";import{D as g}from"./DialogFooter-BLpc_Ac3.js";import{D as f}from"./DialogHeader-PNna1DdA.js";import{P as n}from"./Popover-L_-Mkb2I.js";import{I as x}from"./IconIcon-BzqqFVzk.js";import"./preload-helper-DyHTrhc7.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-B24_lVBN.js";import"./Divider-BGUO-27U.js";import"./FormControl-BXaPXzvE.js";import"./InputLabel-DPYz3LQq.js";import"./TooltipIcon-HG7TB1cj.js";import"./LegacyTooltip-yJhGCXdN.js";import"./useLink-DIITzRJO.js";import"./useFocusable-CeGMk2ep.js";import"./useFocusRing-BExXxzqs.js";import"./useEffectEvent-CfvH5P65.js";import"./chain-CGUvIyZV.js";import"./index-lmvN-6Hm.js";import"./usePopper-Cbxvd94B.js";import"./index-ByEqKqlR.js";import"./Portal-k2uf4qJr.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-BUNTmYDx.js";import"./IconCheckMark-BYsPbMZM.js";import"./IconExclamationMarkCircle24-X1Y3J7QY.js";import"./IconExclamationMarkTriangle-MgLAzRKW.js";import"./IconExclamationMarkTriangle24-Xr7VtV80.js";import"./IconQuestionMarkCircle-aiPeRZ32.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-DxhuergG.js";import"./Switch-lk3PdK-P.js";import"./TabItem-s7t3VmKE.js";import"./elements-BOYmskOL.js";import"./TextInput-B7uBBf5A.js";import"./IconCross-5hMYBooT.js";import"./Tooltip-DFKSW5ek.js";import"./useClickOutside-BiRZMhl9.js";import"./EnablePortalWrapper-CgTetPBk.js";import"./dialog-D9O7a7Fm.js";import"./Tree-ppcdhT5y.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-BpMBtIi6.js";import"./IconCaretDown-CoFnmUrM.js";import"./IconCaretDown16-DKk_tbP0.js";import"./IconTrashBin16-p1WSYv39.js";import"./IconTrashBin24-B2OaCDTK.js";import"./useButton-uXbj8Tmo.js";import"./Flex-C6CaKb3W.js";import"./IconIcon16-DlEusypu.js";import"./IconIcon24-d19ZLBCz.js";const jt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,e]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>e(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>e(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>e(!1)}]})]})})]})},o=h.bind({});o.args={};var a,p,m;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
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
