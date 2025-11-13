import{r as s,j as t}from"./iframe-H5fKr2lK.js";import{a as l}from"./Box-CiEveiJr.js";import{B as d}from"./Button-DedJ5cEf.js";import{D as u}from"./DialogBody-COIg_L-T.js";import{D as g}from"./DialogFooter-CO7B8sRK.js";import{D as f}from"./DialogHeader-Wd3Vm2yb.js";import{P as m}from"./Popover-ANrtzqYf.js";import{I as x}from"./IconIcon-BlKXqQUa.js";import"./preload-helper-CG1F6kIz.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-CGhYkvhj.js";import"./Divider-BAqjVsW8.js";import"./FormControl-BS3Bj8q7.js";import"./InputLabel-4CvSm-vK.js";import"./TooltipIcon-CExJ1Siy.js";import"./LegacyTooltip-DuXAQOyV.js";import"./useLink-CeT7Livh.js";import"./useFocusable-DNYvC84J.js";import"./useFocusRing-DtaK5aSY.js";import"./useEffectEvent-DQqboR6P.js";import"./chain-qzkAdS19.js";import"./index-BVC4X8_m.js";import"./usePopper-DrsZ70BZ.js";import"./index-BCUQEk2R.js";import"./Portal-CIDxWqZM.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-DInnuta0.js";import"./IconCheckMark-6VrCKXsG.js";import"./IconExclamationMarkCircle24-90LliH1G.js";import"./IconExclamationMarkTriangle-VSgGC7Jo.js";import"./IconExclamationMarkTriangle24--iKle1vV.js";import"./IconQuestionMarkCircle-BAcIJM79.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-HuymAlKl.js";import"./Switch-De9UVpi7.js";import"./TabItem-Crml4eW0.js";import"./elements-BOYmskOL.js";import"./TextInput-CoiYLDBh.js";import"./IconCross-SNsH-Sph.js";import"./Tooltip-jwvwV_h2.js";import"./useClickOutside-DcfitwWG.js";import"./EnablePortalWrapper-DOQc5dap.js";import"./dialog-D9O7a7Fm.js";import"./Tree-Bo3CmtdV.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-C_zRKw1l.js";import"./Flex-oyo-mjCz.js";import"./IconIcon16-C1K1bPxd.js";import"./IconIcon24-C31MV7ia.js";const ft={title:"Experimental/Popover/In Context",Component:m,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,o]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>o(!i),ref:r,children:"Trigger"}),t.jsx(m,{...c,anchor:r,open:i,handleClose:()=>o(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>o(!1)}]})]})})]})},e=h.bind({});e.args={};var a,p,n;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
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
}`,...(n=(p=e.parameters)==null?void 0:p.docs)==null?void 0:n.source}}};const xt=["WithHeaderAndFooter"];export{e as WithHeaderAndFooter,xt as __namedExportsOrder,ft as default};
