import{r as a,j as t}from"./iframe-CTXLivY8.js";import{a as l}from"./Box-BQieRTHc.js";import{B as d}from"./Button-DCljNXtc.js";import{D as u}from"./DialogBody-wjjDVdJ6.js";import{D as g}from"./DialogFooter-BMxhXmkW.js";import{D as f}from"./DialogHeader-Dhhr_J9z.js";import{P as n}from"./Popover-CRcJVa-h.js";import{I as x}from"./IconJohanna-kaWkMdY9.js";import"./preload-helper-DyHTrhc7.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-Bg7fCg-l.js";import"./Checkbox-BXYguyvX.js";import"./useFocusable-Fy4mj47n.js";import"./useFocusRing-DxlK4WZQ.js";import"./useEffectEvent-B49_Zhdn.js";import"./chain-EXeTzYH_.js";import"./index-mQO8KMxu.js";import"./useFormValidationState-Cw8cWDlN.js";import"./useControlledState-Cw5CfhaG.js";import"./InputLabel-D6AfCBUp.js";import"./TooltipIcon-BWR7R5-Y.js";import"./LegacyTooltip-D0noZPlh.js";import"./useLink-DEZC7gZp.js";import"./usePopper-BGGHykmi.js";import"./index-CgNE5YLq.js";import"./Portal-D-CJ77je.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-1M-ec1Hq.js";import"./IconCheckMark-DMYeimA-.js";import"./IconExclamationMarkCircle24-D0tKG_-m.js";import"./IconExclamationMarkTriangle-wbtYn5kk.js";import"./IconExclamationMarkTriangle24-BfmsB-D9.js";import"./IconQuestionMarkCircle-CMWzJ-Zb.js";import"./IconMinus-UDOanuAs.js";import"./Divider-C_OADzd4.js";import"./FormControl-DDYD9aaz.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-H9peAm6B.js";import"./Switch-C_gBk2PI.js";import"./TabItem-CHDa2kRW.js";import"./elements-BOYmskOL.js";import"./TextInput-Cj5SStR8.js";import"./IconCross-DIWLVRH5.js";import"./Tooltip-BpGBwBBf.js";import"./useClickOutside-BgKkwizU.js";import"./EnablePortalWrapper-DHAsqKAK.js";import"./dialog-D9O7a7Fm.js";import"./Tree-CKuoPrff.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-BPLwD6A2.js";import"./IconCaretDown-BFwd3XzJ.js";import"./IconCaretDown16-bN0PHrxT.js";import"./IconTrashBin16-NL7WtKTs.js";import"./IconTrashBin24-Bfgy-rr2.js";import"./useButton-CFyYJW6h.js";import"./Flex-CgtbL_Lr.js";const Dt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,e]=a.useState(!1),r=a.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>e(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>e(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>e(!1)}]})]})})]})},o=h.bind({});o.args={};var s,p,m;o.parameters={...o.parameters,docs:{...(s=o.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
}`,...(m=(p=o.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};const vt=["WithHeaderAndFooter"];export{o as WithHeaderAndFooter,vt as __namedExportsOrder,Dt as default};
