import{r as p,j as t}from"./iframe-DI3FmvMg.js";import{a as l}from"./Box-BzvOCXyp.js";import{B as d}from"./Button-81HPhAZq.js";import{D as u}from"./DialogBody-RgxVECr_.js";import{D as g}from"./DialogFooter-DvzQOVAq.js";import{D as f}from"./DialogHeader-DOZPaoRR.js";import{P as n}from"./Popover-ByrxN9KB.js";import{I as x}from"./IconJohanna-BMVk4L5a.js";import"./preload-helper-D2dEV7R8.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-CCyWXpuB.js";import"./Checkbox-D44al-eW.js";import"./useFocusable-CDu369YP.js";import"./useFocusRing-DYIZffxr.js";import"./useEffectEvent-BH88ISlG.js";import"./chain-BslaglIs.js";import"./index-BM8UhHH_.js";import"./useFormValidationState-Cld0AnK4.js";import"./useControlledState-BiOOwxHx.js";import"./InputLabel-Cg4r-In2.js";import"./TooltipIcon-xRvsiuV-.js";import"./LegacyTooltip-_ICJCfzv.js";import"./useLink-UjFHOFNi.js";import"./usePopper--KY0_hMj.js";import"./index-CXZaHicV.js";import"./Portal-BFDMwOGS.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-CkMIAu3W.js";import"./IconCheckMark-B7kLsSyY.js";import"./IconExclamationMarkCircle24-D4tF03zx.js";import"./IconExclamationMarkTriangle-DIy9MoLo.js";import"./IconExclamationMarkTriangle24-CEjgCUBS.js";import"./IconQuestionMarkCircle-DSdNDavw.js";import"./IconMinus-BVHXyRcm.js";import"./Dropdown-Dvj_d9Nt.js";import"./useButton-BbxjUP_K.js";import"./FocusScope-C1m5l3e0.js";import"./useOverlayTriggerState-DODiVQDU.js";import"./useMenuTrigger-ffLGp00v.js";import"./useLabels-BxWS0UcL.js";import"./useLocalizedStringFormatter--MnVfld8.js";import"./context-BqltTJBl.js";import"./VisuallyHidden-DIGLDGTy.js";import"./helper-Dmt6oJnd.js";import"./keyboard-DKrOuDO8.js";import"./SelectionManager-C4qB5YQ6.js";import"./useField-CXlZh9cC.js";import"./MenuItem-B3oQ8NBJ.js";import"./IconCaretRight-Cnjf463B.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-mnpTZaSB.js";import"./Trigger-DxWASr5H.js";import"./IconCaretDown-D8Q90axM.js";import"./IconCaretDown16-DnKeo0fq.js";import"./IconCross-zXwZw5XO.js";import"./IconTrashBin16-k6iK24Cb.js";import"./IconTrashBin24-CT3rUXQo.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-CJRjb42v.js";import"./FormControl-5EUEioxo.js";import"./Switch-zWc6Snnf.js";import"./TabItem-CImVNYIL.js";import"./TextInput-CbSujYQZ.js";import"./Tooltip-D8RjORwC.js";import"./useClickOutside-B67-0z1Q.js";import"./dialog-D9O7a7Fm.js";import"./Tree-4JOtMfCe.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-D43PR0Qh.js";const kt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,e]=p.useState(!1),r=p.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>e(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>e(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>e(!1)}]})]})})]})},o=h.bind({});o.args={};var m,a,s;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
}`,...(s=(a=o.parameters)==null?void 0:a.docs)==null?void 0:s.source}}};const Nt=["WithHeaderAndFooter"];export{o as WithHeaderAndFooter,Nt as __namedExportsOrder,kt as default};
