import{r as s,j as t}from"./iframe-Dtv_d4MA.js";import{a as l}from"./Box-DCbtbvtw.js";import{B as d}from"./Button-AhiRq03v.js";import{D as u}from"./DialogBody-COQ0nsQi.js";import{D as g}from"./DialogFooter-ppHQDsQY.js";import{D as f}from"./DialogHeader-B8yvizYi.js";import{P as n}from"./Popover-DbRYXLUU.js";import{I as x}from"./IconIcon-BJpS0hKQ.js";import"./preload-helper-CG1F6kIz.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-R4YNlsPt.js";import"./Divider-CKoslmaP.js";import"./FormControl-CPJhbF1h.js";import"./InputLabel-DP0y05V2.js";import"./TooltipIcon-CZeG-wrX.js";import"./LegacyTooltip-BdDs6s_5.js";import"./useLink-CMU7b8Lj.js";import"./useFocusable-ChmdYu_U.js";import"./useFocusRing-2TK22Yzc.js";import"./useEffectEvent-BhMP4fDQ.js";import"./chain-BK5lgvFT.js";import"./index-QsOm0Z73.js";import"./usePopper-CXXgD1zG.js";import"./index-DIZXDwSI.js";import"./Portal-C4NeOveZ.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-EsADRd1i.js";import"./IconCheckMark-CEjGYX8V.js";import"./IconExclamationMarkCircle24-B5XLZaDh.js";import"./IconExclamationMarkTriangle-DCk5u_fB.js";import"./IconExclamationMarkTriangle24-CNF0uGCC.js";import"./IconQuestionMarkCircle-C9gk7KDs.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-Bh1tzUUj.js";import"./Switch-Dd7mJo-Q.js";import"./TabItem-D7puLzXF.js";import"./elements-BOYmskOL.js";import"./TextInput-BXSd55Uz.js";import"./IconCross-C7dBWIsm.js";import"./Tooltip-wXNz05mk.js";import"./useClickOutside-CfIem1tQ.js";import"./EnablePortalWrapper-5yA4SmAn.js";import"./dialog-D9O7a7Fm.js";import"./Tree-DjhLfOhm.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-AKpq8hpJ.js";import"./IconCaretDown-jzEnFqOW.js";import"./IconCaretDown16-DnTz79r-.js";import"./IconTrashBin16-BHhG90S7.js";import"./IconTrashBin24-BGGW-9GF.js";import"./useButton-CmB1QZWu.js";import"./Flex-2-81N-Oa.js";import"./IconIcon16-CnuNgU4v.js";import"./IconIcon24-BRzsfM1Q.js";const jt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,e]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>e(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>e(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>e(!1)}]})]})})]})},o=h.bind({});o.args={};var a,p,m;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
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
