import{r as s,j as t}from"./iframe-BQiMkHw5.js";import{a as l}from"./Box-DetMvp8V.js";import{B as d}from"./Button-Bmrxg36I.js";import{D as u}from"./DialogBody-ByzhJvYj.js";import{D as g}from"./DialogFooter-ZPh4-auQ.js";import{D as f}from"./DialogHeader-DLTqH8iV.js";import{P as n}from"./Popover-jbu0bhuV.js";import{I as x}from"./IconIcon-DxHU4_Zg.js";import"./preload-helper-C1FmrZbK.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-DINfxS63.js";import"./Checkbox-Dt22eygm.js";import"./useFocusable-CgS9ZZhd.js";import"./useFocusRing-BD4-S_g1.js";import"./useEffectEvent-CcicRBmQ.js";import"./chain-BIBRZ_SZ.js";import"./index-CnZnx3bY.js";import"./useFormValidationState-BzO4C-br.js";import"./useControlledState-DzPm4K8q.js";import"./InputLabel-CI_YTO0E.js";import"./TooltipIcon-CeEh8SWi.js";import"./LegacyTooltip-BTPYh-Ag.js";import"./useLink-DFD-nYUU.js";import"./usePopper-Cc6K-R7q.js";import"./index-CQBCO6mf.js";import"./Portal-C-kI49Kt.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-tQVpYmKZ.js";import"./IconCheckMark-BS1oKRJV.js";import"./IconExclamationMarkCircle24-CJ1G6dL5.js";import"./IconExclamationMarkTriangle-CoYzxOLH.js";import"./IconExclamationMarkTriangle24-20B1ME08.js";import"./IconQuestionMarkCircle-CTimdRgj.js";import"./IconMinus-CLKltAiw.js";import"./Divider-i3Nx4C_N.js";import"./FormControl-D1EHzNHy.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-D5u200MM.js";import"./Switch-9WQaKYNl.js";import"./TabItem-CgWMMnEC.js";import"./elements-BOYmskOL.js";import"./TextInput-CR5drUal.js";import"./IconCross-Bgju1hVK.js";import"./Tooltip-IB7ez1El.js";import"./useClickOutside-BvanHLsZ.js";import"./EnablePortalWrapper-CbtLSXEI.js";import"./dialog-D9O7a7Fm.js";import"./Tree-Qzvf_nh7.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-DV_vxb7X.js";import"./IconCaretDown-DOdhsPZo.js";import"./IconCaretDown16-aDP8LU-M.js";import"./IconTrashBin16-fC3Gnm9z.js";import"./IconTrashBin24-ByHOH091.js";import"./useButton-Ug7NB8nr.js";import"./Flex-L27E0wWN.js";import"./IconIcon16-DcVWGb6h.js";import"./IconIcon24-BFn2tO0G.js";const vt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,e]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>e(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>e(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>e(!1)}]})]})})]})},o=h.bind({});o.args={};var p,a,m;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:`args => {
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
}`,...(m=(a=o.parameters)==null?void 0:a.docs)==null?void 0:m.source}}};const qt=["WithHeaderAndFooter"];export{o as WithHeaderAndFooter,qt as __namedExportsOrder,vt as default};
