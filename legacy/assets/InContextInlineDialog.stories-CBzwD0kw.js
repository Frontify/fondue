import{r as c,j as t}from"./iframe-Syg1N3Dt.js";import{a as k}from"./Box-CaWE6VsJ.js";import{B as i,b as n,a}from"./Button-BFs_n6MT.js";import{D as I}from"./DialogBody-CxRHQV_R.js";import{D as O}from"./DialogFooter-TfVlZPJU.js";import{D as E}from"./DialogHeader-AVjbBN5c.js";import{D as b}from"./Divider-CzVOQ1Js.js";import{D as T}from"./Dropdown-FbW3XryH.js";import{F as y}from"./Flex-PXxiSRIZ.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{I as w}from"./IconDotsVertical16-Cp7DsIG8.js";import{I as d}from"./InlineDialog-B52NuCbv.js";import{M as x}from"./dialog-D9O7a7Fm.js";import"./preload-helper-C1FmrZbK.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-BrLvrPMg.js";import"./FormControl-hBMNzJT5.js";import"./InputLabel-BiMasARO.js";import"./TooltipIcon-DfPc9HBh.js";import"./LegacyTooltip-BEqX41nh.js";import"./useLink-wNWEYCfF.js";import"./useFocusable-DzcY2h-6.js";import"./useFocusRing-CNnJjRGa.js";import"./useEffectEvent-_xfm6Ewt.js";import"./chain-_zCgTghY.js";import"./index-zygbjzbv.js";import"./usePopper-B30N6m7R.js";import"./index-DCKuEH0C.js";import"./Portal-Bs2LRsId.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-C9g_fFO8.js";import"./IconCheckMark-DYOFifCV.js";import"./IconExclamationMarkCircle24-Dn7AMifS.js";import"./IconExclamationMarkTriangle-DJ78vW8L.js";import"./IconExclamationMarkTriangle24-B2npFYMD.js";import"./IconQuestionMarkCircle-CuSuBHcI.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-Bk8CKUnf.js";import"./Switch-cBzas6OX.js";import"./TabItem-D-04gcC8.js";import"./elements-BOYmskOL.js";import"./TextInput-C_NhoOs1.js";import"./IconCross-BYLKbJOe.js";import"./Tooltip-JU-TLIRP.js";import"./useClickOutside-ChN67Rl1.js";import"./EnablePortalWrapper-BPSk3zeA.js";import"./Tree-C_Tw8-89.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-3D8uMnpX.js";import"./FocusScope-BnipxogD.js";import"./useOverlayTriggerState-B9wdWD5W.js";import"./useControlledState-DY5nY8Wt.js";import"./useMenuTrigger-nOoY-5UA.js";import"./useLabels-B3d7_WnD.js";import"./useLocalizedStringFormatter-Dm55UTSr.js";import"./context-BwIwx3bW.js";import"./VisuallyHidden-b3B-snrg.js";import"./helper-kDDgvgzp.js";import"./keyboard-qlZGpQI7.js";import"./SelectionManager-CvY-fpmx.js";import"./useField-DLq7O62T.js";import"./useFormValidationState-D0MtgxJw.js";import"./MenuItem-vWr4hvv2.js";import"./IconCaretRight-BYNbkOLO.js";import"./Trigger-8K1Z5TCZ.js";import"./IconCaretDown-BM9A8thm.js";import"./IconCaretDown16-CJ0CPWki.js";import"./IconTrashBin16-B-os8M5m.js";import"./IconTrashBin24-B7qkH7Me.js";const{action:s}=__STORYBOOK_MODULE_ACTIONS__,Qt={title:"Experimental/InlineDialog/In Context",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{placement:"bottom-start",modality:x.Modal,offset:[0,8],flip:!0,width:360,minWidth:360,maxWidth:360,autoHeight:!1,maxHeight:"auto",minHeight:0,roundedCorners:!0,strategy:"absolute",enablePortal:!1},argTypes:{...S,modality:{options:Object.values(x),control:{type:"select"}},"data-test-id":{type:"string"},role:{type:"string"},autoHeight:{type:"boolean"},roundedCorners:{type:"boolean"},zIndex:{table:{disable:!0}}}},e=()=>t.jsx("p",{className:"tw-my-2 tw-text-text",children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio fugiat hic incidunt, inventore odio praesentium qui quisquam! Dignissimos nemo quisquam unde voluptatem. Animi ea iusto numquam odio omnis. Dicta, voluptatum."}),R=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs(y,{justify:"start",children:[t.jsx(i,{onClick:s("onClick"),style:n.Default,children:"Button"}),t.jsx(i,{onClick:s("onClick"),style:n.Danger,children:"Button"}),t.jsx(i,{ref:r,emphasis:a.Default,icon:t.jsx(w,{}),onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsx(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:t.jsx(I,{children:t.jsx(k,{className:"tw-p-4",children:t.jsx(e,{})})})}),t.jsx(i,{onClick:s("onClick"),style:n.Loud,children:"Button"})]})},F=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs("div",{children:[t.jsxs(y,{justify:"end",children:[t.jsx(i,{onClick:s("onClick"),emphasis:a.Default,style:n.Default,children:"Button"}),t.jsx(i,{ref:r,onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsxs(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:[t.jsx(E,{title:"Collaborator Settings",padding:"compact",onClose:()=>o(!1)}),t.jsx(I,{children:t.jsxs("div",{className:"tw-p-2 tw-text-text",children:[t.jsx(T,{enablePortal:!1,onChange:j=>console.log(j),activeItemId:"1",menuBlocks:[{id:"block1",menuItems:[{id:"1",title:"Item 1"},{id:"2",title:"Item 2"},{id:"3",title:"Item 3"},{id:"4",title:"Item 4"},{id:"5",title:"Item 5"}]}]}),t.jsx("p",{className:"tw-flex tw-items-center tw-my-2",children:"Label 2"}),t.jsx(e,{}),t.jsx(e,{})]})}),t.jsx(O,{actionButtons:[{children:"Cancel",emphasis:a.Default,onClick:()=>o(!1)},{children:"Confirm",onClick:()=>o(!1)}]})]}),t.jsx(i,{onClick:s("onClick"),emphasis:a.Strong,style:n.Loud,children:"Button"})]}),t.jsx(b,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(i,{emphasis:a.Default,style:n.Default,onClick:s("onClick"),children:"Button"})]})},m=R.bind({}),p=F.bind({});var g,f,h;m.parameters={...m.parameters,docs:{...(g=m.parameters)==null?void 0:g.docs,source:{originalSource:`args => {
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
}`,...(D=(C=p.parameters)==null?void 0:C.docs)==null?void 0:D.source}}};const Xt=["WithNoFocusableContent","InContextWithDialogHeaderAndDialogFooter"];export{p as InContextWithDialogHeaderAndDialogFooter,m as WithNoFocusableContent,Xt as __namedExportsOrder,Qt as default};
