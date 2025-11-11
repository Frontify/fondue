import{r as s,j as t}from"./iframe-CqMYqlgR.js";import{a as l}from"./Box-Dbyzt1Zk.js";import{B as d}from"./Button-CYHT2AMY.js";import{D as u}from"./DialogBody-BrhfKFM5.js";import{D as g}from"./DialogFooter-B4yexa2X.js";import{D as f}from"./DialogHeader-DWhWu6kh.js";import{P as n}from"./Popover-CmetYuMO.js";import{I as x}from"./IconIcon-gNljK24O.js";import"./preload-helper-BrHt6s3f.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-EhKZN_1O.js";import"./Divider-Z6m92kut.js";import"./FormControl-DylzNNc3.js";import"./InputLabel-CS1iO4pu.js";import"./TooltipIcon-Z0eJr2D6.js";import"./LegacyTooltip-Co0qD5RC.js";import"./useLink-D7Pri6Nz.js";import"./useFocusable-BZgzPKtn.js";import"./useFocusRing-CLIn77jc.js";import"./useEffectEvent-D05mPwwN.js";import"./chain-B9Eo87tn.js";import"./index-Cy9q-1wD.js";import"./usePopper-BK18999i.js";import"./index-Bjym0GCp.js";import"./Portal-BsHqlhbb.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-DAyKmQUl.js";import"./IconCheckMark-BAMG8MDz.js";import"./IconExclamationMarkCircle24-ChMlYYeR.js";import"./IconExclamationMarkTriangle-3XRG4Ouh.js";import"./IconExclamationMarkTriangle24-DSIS2BTO.js";import"./IconQuestionMarkCircle-BxAoOfIQ.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-DxO-53u-.js";import"./Switch-BVW5p_vz.js";import"./TabItem-Dey0TnTM.js";import"./elements-BOYmskOL.js";import"./TextInput-B2n_17-q.js";import"./IconCross-Csh70OY3.js";import"./Tooltip-CZgfioZM.js";import"./useClickOutside-DLthHa0m.js";import"./EnablePortalWrapper-D8D0Lbv4.js";import"./dialog-D9O7a7Fm.js";import"./Tree-CxepOoim.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-BqpM5goS.js";import"./IconCaretDown-CJIKu6X8.js";import"./IconCaretDown16-hlAzjhEC.js";import"./IconTrashBin16-DbBfC4Gf.js";import"./IconTrashBin24-Dqge_01c.js";import"./useButton-vGfdsb0j.js";import"./Flex-rl2nqSsW.js";import"./IconIcon16-BR33IxhP.js";import"./IconIcon24-CMuTYtJx.js";const jt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,e]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>e(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>e(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>e(!1)}]})]})})]})},o=h.bind({});o.args={};var a,p,m;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
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
