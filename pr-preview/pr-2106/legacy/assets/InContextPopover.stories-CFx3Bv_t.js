import{j as t}from"./jsx-runtime-Nms4Y4qS.js";import{r as p}from"./index-BwDkhjyp.js";import{a as l}from"./Box-yzDSpzkK.js";import{e as d}from"./Button-2a8yg1iB.js";import{D as u}from"./DialogBody-BGcfsRcP.js";import{D as g}from"./DialogFooter-C9mj8PMt.js";import{D as f}from"./DialogHeader-DxI9n4pC.js";import{P as n}from"./Popover-CDWNxeow.js";import{I as x}from"./IconJohanna-CrQWJB5v.js";import"./_commonjsHelpers-BosuxZz1.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-CBFElZiz.js";import"./input-CZYRp-vG.js";import"./Divider-C61FZ2pw.js";import"./FormControl-DOcmnppy.js";import"./InputLabel-CEoY-eW-.js";import"./TooltipIcon-FKMBcYJt.js";import"./LegacyTooltip-BI7N2mWT.js";import"./useLink-BrkukSAv.js";import"./useFocusable-ClqOF1PM.js";import"./useFocusRing-Vzyl7-Lk.js";import"./SSRProvider-CYXx33DY.js";import"./chain-CSFqNvhK.js";import"./usePopper-DDlDeltW.js";import"./index-CS4BWtGh.js";import"./index-CfyPTyT-.js";import"./Portal-BBACcjoK.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-EtHZ7Sxa.js";import"./IconCheckMark-ByVuQE55.js";import"./IconExclamationMarkCircle-DIK3qNWl.js";import"./IconExclamationMarkCircle24-Vs83y98-.js";import"./IconExclamationMarkTriangle-DvvXw1YP.js";import"./IconExclamationMarkTriangle24-NdDZZD89.js";import"./IconQuestionMarkCircle-DpV6l-09.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-CZrma5le.js";import"./SegmentedControls-B09tr5m3.js";import"./useFormValidationState-Bo5Bz1o-.js";import"./FocusScope-CryrrNNO.js";import"./useField-CqwgNQmU.js";import"./useLabels-Bp6d37Qr.js";import"./context-C2PaECDE.js";import"./VisuallyHidden-p15syWYz.js";import"./useControlledState-C0C-dzuH.js";import"./motion-C48bHxkn.js";import"./Switch-_8YbL5Fl.js";import"./TabItem-DYJEWVSF.js";import"./elements-BOYmskOL.js";import"./TextInput-BcH7nD9x.js";import"./IconEyeOff-BAmb6qT8.js";import"./IconCross-CxP4FPDR.js";import"./Tooltip-BNjN88zs.js";import"./useClickOutside-CKV3CrvD.js";import"./EnablePortalWrapper-B_d3Ldct.js";import"./dialog-Dre1eVQK.js";import"./Tree-CIPah2yq.js";import"./immer-DBm1MMjE.js";import"./IconGrabHandle12-OyP2wwdJ.js";import"./Trigger-gz8WCINE.js";import"./IconCaretDown-BFa2RsTm.js";import"./IconCaretDown16-mzuMIk3a.js";import"./IconTrashBin-BqqROPt7.js";import"./IconTrashBin16-g_sB0yBJ.js";import"./IconTrashBin24-DyoUj1kc.js";import"./useButton-B0CVDvll.js";import"./Flex-CNmf2317.js";import"./IconArrowLeft-CK1u11Y9.js";const yt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,e]=p.useState(!1),r=p.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>e(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>e(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>e(!1)}]})]})})]})},o=h.bind({});o.args={};var m,a,s;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
}`,...(s=(a=o.parameters)==null?void 0:a.docs)==null?void 0:s.source}}};const Ft=["WithHeaderAndFooter"];export{o as WithHeaderAndFooter,Ft as __namedExportsOrder,yt as default};
