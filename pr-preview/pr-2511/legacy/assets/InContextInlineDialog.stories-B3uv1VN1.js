import{r as c,j as t}from"./iframe-DWfSlb0i.js";import{a as k}from"./Box-B8vdQMYS.js";import{B as i,b as n,a}from"./Button-DfZJCDFK.js";import{D as I}from"./DialogBody-BQqzXCEu.js";import{D as O}from"./DialogFooter-kBXbVCPE.js";import{D as E}from"./DialogHeader-COfthtdw.js";import{D as b}from"./Divider-DnBABlP5.js";import{D as T}from"./Dropdown-BHsiTQV7.js";import{F as y}from"./Flex-Dto_u-N_.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{I as w}from"./IconDotsVertical16-dNONK_aM.js";import{I as d}from"./InlineDialog-Bcr1dQGC.js";import{M as x}from"./dialog-D9O7a7Fm.js";import"./preload-helper-sQDyWCwb.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-DJgw3DOR.js";import"./Checkbox-3AnZEutj.js";import"./useFocusable-DOCSmQza.js";import"./useFocusRing-DXr4GaW4.js";import"./useEffectEvent-CI6MWEdz.js";import"./chain-BD6ckHh_.js";import"./index-RS2pu7zh.js";import"./useFormValidationState-A3yoOfI8.js";import"./useControlledState-DnAESSBa.js";import"./InputLabel-vAeK8DpM.js";import"./TooltipIcon-loeESxcb.js";import"./LegacyTooltip-8KnSS8qw.js";import"./useLink-DD_m4zw3.js";import"./usePopper-DE0FsvRn.js";import"./index-C2E5ku4L.js";import"./Portal--5uNvX5p.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-D3p_iY0w.js";import"./IconCheckMark-CWf5DU7H.js";import"./IconExclamationMarkCircle24-CzamvZqc.js";import"./IconExclamationMarkTriangle-BTKn1CzC.js";import"./IconExclamationMarkTriangle24-BF-tkgi1.js";import"./IconQuestionMarkCircle-BhvUbj5E.js";import"./IconMinus-DuFXUXkh.js";import"./FormControl-ny2reeax.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-C5zj3N-A.js";import"./Switch-D2be-V_f.js";import"./TabItem-C-vbuzzy.js";import"./elements-BOYmskOL.js";import"./TextInput-_VQAd_TX.js";import"./IconCross-BkSH3053.js";import"./Tooltip-jPx8IgnA.js";import"./useClickOutside-C0rCeFHZ.js";import"./EnablePortalWrapper-T0srCoF2.js";import"./Tree-ClX99oC1.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-kVvP6TUN.js";import"./FocusScope-BTNrxNkp.js";import"./useOverlayTriggerState-DWWP11B4.js";import"./useMenuTrigger-Du4Opddv.js";import"./useLabels-CvtAt0UP.js";import"./useLocalizedStringFormatter-C7DvXs9K.js";import"./context-hKhapaoN.js";import"./VisuallyHidden-DZNryNZ3.js";import"./helper-vBDadUUD.js";import"./keyboard-CWtqk4ZZ.js";import"./SelectionManager-zjrIR6Hq.js";import"./useField-Bh5nUEEB.js";import"./MenuItem-CVfzkKbS.js";import"./IconCaretRight-B8cJ3Bt3.js";import"./Trigger-BpYCVTVr.js";import"./IconCaretDown-CS4fl5qd.js";import"./IconCaretDown16-DXYTdGKY.js";import"./IconTrashBin16-C5mIjvXn.js";import"./IconTrashBin24-B9qsB300.js";const{action:s}=__STORYBOOK_MODULE_ACTIONS__,Zt={title:"Experimental/InlineDialog/In Context",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{placement:"bottom-start",modality:x.Modal,offset:[0,8],flip:!0,width:360,minWidth:360,maxWidth:360,autoHeight:!1,maxHeight:"auto",minHeight:0,roundedCorners:!0,strategy:"absolute",enablePortal:!1},argTypes:{...S,modality:{options:Object.values(x),control:{type:"select"}},"data-test-id":{type:"string"},role:{type:"string"},autoHeight:{type:"boolean"},roundedCorners:{type:"boolean"},zIndex:{table:{disable:!0}}}},e=()=>t.jsx("p",{className:"tw-my-2 tw-text-text",children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio fugiat hic incidunt, inventore odio praesentium qui quisquam! Dignissimos nemo quisquam unde voluptatem. Animi ea iusto numquam odio omnis. Dicta, voluptatum."}),R=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs(y,{justify:"start",children:[t.jsx(i,{onClick:s("onClick"),style:n.Default,children:"Button"}),t.jsx(i,{onClick:s("onClick"),style:n.Danger,children:"Button"}),t.jsx(i,{ref:r,emphasis:a.Default,icon:t.jsx(w,{}),onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsx(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:t.jsx(I,{children:t.jsx(k,{className:"tw-p-4",children:t.jsx(e,{})})})}),t.jsx(i,{onClick:s("onClick"),style:n.Loud,children:"Button"})]})},F=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs("div",{children:[t.jsxs(y,{justify:"end",children:[t.jsx(i,{onClick:s("onClick"),emphasis:a.Default,style:n.Default,children:"Button"}),t.jsx(i,{ref:r,onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsxs(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:[t.jsx(E,{title:"Collaborator Settings",padding:"compact",onClose:()=>o(!1)}),t.jsx(I,{children:t.jsxs("div",{className:"tw-p-2 tw-text-text",children:[t.jsx(T,{enablePortal:!1,onChange:j=>console.log(j),activeItemId:"1",menuBlocks:[{id:"block1",menuItems:[{id:"1",title:"Item 1"},{id:"2",title:"Item 2"},{id:"3",title:"Item 3"},{id:"4",title:"Item 4"},{id:"5",title:"Item 5"}]}]}),t.jsx("p",{className:"tw-flex tw-items-center tw-my-2",children:"Label 2"}),t.jsx(e,{}),t.jsx(e,{})]})}),t.jsx(O,{actionButtons:[{children:"Cancel",emphasis:a.Default,onClick:()=>o(!1)},{children:"Confirm",onClick:()=>o(!1)}]})]}),t.jsx(i,{onClick:s("onClick"),emphasis:a.Strong,style:n.Loud,children:"Button"})]}),t.jsx(b,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(i,{emphasis:a.Default,style:n.Default,onClick:s("onClick"),children:"Button"})]})},m=R.bind({}),p=F.bind({});var g,f,h;m.parameters={...m.parameters,docs:{...(g=m.parameters)==null?void 0:g.docs,source:{originalSource:`args => {
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
}`,...(D=(C=p.parameters)==null?void 0:C.docs)==null?void 0:D.source}}};const $t=["WithNoFocusableContent","InContextWithDialogHeaderAndDialogFooter"];export{p as InContextWithDialogHeaderAndDialogFooter,m as WithNoFocusableContent,$t as __namedExportsOrder,Zt as default};
