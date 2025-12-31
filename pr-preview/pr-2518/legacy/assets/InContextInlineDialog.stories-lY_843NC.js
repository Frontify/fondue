import{r as c,j as t}from"./iframe-fyGLPEYM.js";import{a as k}from"./Box-CLX-pImO.js";import{B as i,b as n,a}from"./Button-cVJBJqzI.js";import{D as I}from"./DialogBody-Bvw7zbor.js";import{D as O}from"./DialogFooter-BYPrbXYQ.js";import{D as E}from"./DialogHeader-B_E2FcBJ.js";import{D as b}from"./Divider-CUG5X0NG.js";import{D as T}from"./Dropdown-CW8s2CEB.js";import{F as y}from"./Flex-AACo28_K.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{I as w}from"./IconDotsVertical16-4Ee5_ygg.js";import{I as d}from"./InlineDialog-BHed35DN.js";import{M as x}from"./dialog-D9O7a7Fm.js";import"./preload-helper-D9dL-qgt.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-Bcv275Kl.js";import"./FormControl-DfYHdAvy.js";import"./InputLabel-CMSMoU7u.js";import"./TooltipIcon-DojCEOrM.js";import"./LegacyTooltip-adcI7jgp.js";import"./useLink-Bts17Baq.js";import"./useFocusable-CKsTcjuM.js";import"./useFocusRing-S7LgmWKU.js";import"./useEffectEvent-C4w1I5nw.js";import"./chain-DUvsbXUL.js";import"./index-rU3a83jg.js";import"./usePopper-CdXWRaSH.js";import"./index-C1SclwXe.js";import"./Portal-BFyePCGh.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-BHlk_IDS.js";import"./IconCheckMark-BVHtCiaM.js";import"./IconExclamationMarkCircle24-CV7jvQVR.js";import"./IconExclamationMarkTriangle-B3hEA56l.js";import"./IconExclamationMarkTriangle24-C0iMsZEC.js";import"./IconQuestionMarkCircle-e2jbGF9X.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle--yaP7k9p.js";import"./Switch-C30WT3Qx.js";import"./TabItem-B8eVqrP3.js";import"./elements-BOYmskOL.js";import"./TextInput-BgILU15o.js";import"./IconCross-Ig2qIE-C.js";import"./Tooltip-Bl4bjOy6.js";import"./useClickOutside-CXLXbWqI.js";import"./EnablePortalWrapper-BFYUrxbk.js";import"./useButton-BxjTpxd6.js";import"./FocusScope-BofnYDbV.js";import"./useOverlayTriggerState-BPH_-RmW.js";import"./useControlledState-bSOLzVj8.js";import"./useMenuTrigger-B_c3SX2D.js";import"./useLabels-BOFM69v1.js";import"./useLocalizedStringFormatter-CjpGldFB.js";import"./context-DLSWAIon.js";import"./VisuallyHidden-C1wvoU9Q.js";import"./helper-0DZFZwKJ.js";import"./keyboard-DLX4-mrO.js";import"./SelectionManager-D_KBFvFi.js";import"./useField-DmAUzR3T.js";import"./useFormValidationState-CIYZenN_.js";import"./MenuItem-CuvtCm-B.js";import"./IconCaretRight-DlvzdMdo.js";import"./Trigger-DLUhttzg.js";import"./IconCaretDown-dZv4dnmu.js";import"./IconCaretDown16-CXS1PZab.js";import"./IconTrashBin16-BECWu1mb.js";import"./IconTrashBin24-9caGt8Mh.js";const{action:s}=__STORYBOOK_MODULE_ACTIONS__,Ut={title:"Experimental/InlineDialog/In Context",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{placement:"bottom-start",modality:x.Modal,offset:[0,8],flip:!0,width:360,minWidth:360,maxWidth:360,autoHeight:!1,maxHeight:"auto",minHeight:0,roundedCorners:!0,strategy:"absolute",enablePortal:!1},argTypes:{...S,modality:{options:Object.values(x),control:{type:"select"}},"data-test-id":{type:"string"},role:{type:"string"},autoHeight:{type:"boolean"},roundedCorners:{type:"boolean"},zIndex:{table:{disable:!0}}}},e=()=>t.jsx("p",{className:"tw-my-2 tw-text-text",children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio fugiat hic incidunt, inventore odio praesentium qui quisquam! Dignissimos nemo quisquam unde voluptatem. Animi ea iusto numquam odio omnis. Dicta, voluptatum."}),R=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs(y,{justify:"start",children:[t.jsx(i,{onClick:s("onClick"),style:n.Default,children:"Button"}),t.jsx(i,{onClick:s("onClick"),style:n.Danger,children:"Button"}),t.jsx(i,{ref:r,emphasis:a.Default,icon:t.jsx(w,{}),onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsx(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:t.jsx(I,{children:t.jsx(k,{className:"tw-p-4",children:t.jsx(e,{})})})}),t.jsx(i,{onClick:s("onClick"),style:n.Loud,children:"Button"})]})},F=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs("div",{children:[t.jsxs(y,{justify:"end",children:[t.jsx(i,{onClick:s("onClick"),emphasis:a.Default,style:n.Default,children:"Button"}),t.jsx(i,{ref:r,onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsxs(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:[t.jsx(E,{title:"Collaborator Settings",padding:"compact",onClose:()=>o(!1)}),t.jsx(I,{children:t.jsxs("div",{className:"tw-p-2 tw-text-text",children:[t.jsx(T,{enablePortal:!1,onChange:j=>console.log(j),activeItemId:"1",menuBlocks:[{id:"block1",menuItems:[{id:"1",title:"Item 1"},{id:"2",title:"Item 2"},{id:"3",title:"Item 3"},{id:"4",title:"Item 4"},{id:"5",title:"Item 5"}]}]}),t.jsx("p",{className:"tw-flex tw-items-center tw-my-2",children:"Label 2"}),t.jsx(e,{}),t.jsx(e,{})]})}),t.jsx(O,{actionButtons:[{children:"Cancel",emphasis:a.Default,onClick:()=>o(!1)},{children:"Confirm",onClick:()=>o(!1)}]})]}),t.jsx(i,{onClick:s("onClick"),emphasis:a.Strong,style:n.Loud,children:"Button"})]}),t.jsx(b,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(i,{emphasis:a.Default,style:n.Default,onClick:s("onClick"),children:"Button"})]})},m=R.bind({}),p=F.bind({});var g,f,h;m.parameters={...m.parameters,docs:{...(g=m.parameters)==null?void 0:g.docs,source:{originalSource:`args => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  return <Flex justify="start">
            <Button onClick={action('onClick')} style={ButtonStyle.Default}>
                Button
            </Button>
            <Button onClick={action('onClick')} style={ButtonStyle.Danger}>
                Button
            </Button>
            <Button ref={triggerRef} emphasis={ButtonEmphasis.Default} icon={<IconDotsVertical16 />} onClick={() => setIsOpen(!isOpen)}>
                InlineDialog Trigger
            </Button>
            <InlineDialog {...args} anchor={triggerRef} open={isOpen} handleClose={() => setIsOpen(false)}>
                <DialogBody>
                    <Box className="tw-p-4">
                        <TextExample />
                    </Box>
                </DialogBody>
            </InlineDialog>
            <Button onClick={action('onClick')} style={ButtonStyle.Loud}>
                Button
            </Button>
        </Flex>;
}`,...(h=(f=m.parameters)==null?void 0:f.docs)==null?void 0:h.source}}};var B,C,D;p.parameters={...p.parameters,docs:{...(B=p.parameters)==null?void 0:B.docs,source:{originalSource:`args => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  return <div>
            <Flex justify="end">
                <Button onClick={action('onClick')} emphasis={ButtonEmphasis.Default} style={ButtonStyle.Default}>
                    Button
                </Button>
                <Button ref={triggerRef} onClick={() => setIsOpen(!isOpen)}>
                    InlineDialog Trigger
                </Button>
                <InlineDialog {...args} anchor={triggerRef} open={isOpen} handleClose={() => setIsOpen(false)}>
                    <DialogHeader title="Collaborator Settings" padding="compact" onClose={() => setIsOpen(false)} />
                    <DialogBody>
                        <div className="tw-p-2 tw-text-text">
                            <Dropdown enablePortal={false} onChange={id => console.log(id)} activeItemId={'1'} menuBlocks={[{
              id: 'block1',
              menuItems: [{
                id: '1',
                title: 'Item 1'
              }, {
                id: '2',
                title: 'Item 2'
              }, {
                id: '3',
                title: 'Item 3'
              }, {
                id: '4',
                title: 'Item 4'
              }, {
                id: '5',
                title: 'Item 5'
              }]
            }]} />
                            <p className="tw-flex tw-items-center tw-my-2">Label 2</p>

                            <TextExample />
                            <TextExample />
                        </div>
                    </DialogBody>
                    <DialogFooter actionButtons={[{
          children: 'Cancel',
          emphasis: ButtonEmphasis.Default,
          onClick: () => setIsOpen(false)
        }, {
          children: 'Confirm',
          onClick: () => setIsOpen(false)
        }]}></DialogFooter>
                </InlineDialog>
                <Button onClick={action('onClick')} emphasis={ButtonEmphasis.Strong} style={ButtonStyle.Loud}>
                    Button
                </Button>
            </Flex>
            <Divider />
            <TextExample />
            <TextExample />
            <TextExample />
            <TextExample />
            <TextExample />
            <TextExample />
            <Button emphasis={ButtonEmphasis.Default} style={ButtonStyle.Default} onClick={action('onClick')}>
                Button
            </Button>
        </div>;
}`,...(D=(C=p.parameters)==null?void 0:C.docs)==null?void 0:D.source}}};const Jt=["WithNoFocusableContent","InContextWithDialogHeaderAndDialogFooter"];export{p as InContextWithDialogHeaderAndDialogFooter,m as WithNoFocusableContent,Jt as __namedExportsOrder,Ut as default};
