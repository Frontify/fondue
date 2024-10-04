import{j as t}from"./jsx-runtime-Nms4Y4qS.js";import{r as p}from"./index-BwDkhjyp.js";import{B as l}from"./Box-CT6CRMOQ.js";import{B as d}from"./Button-DqlvyMV-.js";import{D as u}from"./DialogBody-Do0JJJbs.js";import{D as g}from"./DialogFooter-CnuOkHBv.js";import{D as f}from"./DialogHeader-BuDoZ_Ra.js";import{P as n}from"./Popover-Dda271VY.js";import{I as x}from"./IconJohanna-DA7UWbqY.js";import"./_commonjsHelpers-BosuxZz1.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-CBFElZiz.js";import"./input-Cz4DmtBe.js";import"./Checkbox-YZLaHRUP.js";import"./useFormValidationState-Bo5Bz1o-.js";import"./SSRProvider-CYXx33DY.js";import"./useFocusRing-Vzyl7-Lk.js";import"./useFocusable-wKuCPQI4.js";import"./chain-D5h1pgIF.js";import"./useControlledState-C0C-dzuH.js";import"./InputLabel-DrkD0R8a.js";import"./TooltipIcon-C8fsnENL.js";import"./LegacyTooltip-D2Oc8Nam.js";import"./useLink-Bd1Qu62S.js";import"./usePopper-DPXU-o95.js";import"./index-DxjWwZXO.js";import"./index-CfyPTyT-.js";import"./Portal-0C9N3MSP.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-EtHZ7Sxa.js";import"./IconCheckMark-BVQYjlwc.js";import"./IconExclamationMarkCircle-BkFYjnTO.js";import"./IconExclamationMarkCircle24-ChDY1Cve.js";import"./IconExclamationMarkTriangle-BucVSAOs.js";import"./IconExclamationMarkTriangle24-C3Ss9MHq.js";import"./IconQuestionMarkCircle-CMNESB9s.js";import"./IconMinus-B-roMI7c.js";import"./FormControl-BY_eMu2R.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-CZrma5le.js";import"./SegmentedControls-EyNzYqVo.js";import"./FocusScope-DegwnO3I.js";import"./useField-DuYpSm4Z.js";import"./useLabels-DH9bA-v0.js";import"./context-C2PaECDE.js";import"./VisuallyHidden-BM0TqGgS.js";import"./motion-C48bHxkn.js";import"./Switch-O77c4Oge.js";import"./TabItem-DYJEWVSF.js";import"./elements-BOYmskOL.js";import"./TextInput-Bg0oUMhx.js";import"./IconEyeOff-BaqRyiPL.js";import"./IconCross-BUeQrH0h.js";import"./Tooltip-CP_K22RC.js";import"./useClickOutside-CKV3CrvD.js";import"./EnablePortalWrapper-DvpkRq0I.js";import"./dialog-Dre1eVQK.js";import"./Tree-CHGGPXgG.js";import"./immer-DBm1MMjE.js";import"./IconGrabHandle12-EPEmE8ra.js";import"./Trigger-CcP8S0KO.js";import"./IconCaretDown-C-LXN2Z7.js";import"./IconCaretDown16-Bqoo7UzD.js";import"./IconTrashBin-ruSc1bNE.js";import"./IconTrashBin16-D8pYIjKc.js";import"./IconTrashBin24-DrDNK9RT.js";import"./useButton-DFNFXdnN.js";import"./Flex-BnoL8OCl.js";import"./IconArrowLeft-BgBTiPGg.js";const Ft={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,e]=p.useState(!1),r=p.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>e(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>e(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>e(!1)}]})]})})]})},o=h.bind({});o.args={};var m,s,a;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
}`,...(a=(s=o.parameters)==null?void 0:s.docs)==null?void 0:a.source}}};const kt=["WithHeaderAndFooter"];export{o as WithHeaderAndFooter,kt as __namedExportsOrder,Ft as default};
