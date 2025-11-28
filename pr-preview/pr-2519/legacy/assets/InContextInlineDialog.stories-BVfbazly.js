import{r as c,j as t}from"./iframe-Ng_GWW1n.js";import{a as k}from"./Box-C2AAiLRg.js";import{B as i,b as n,a}from"./Button-DTnAJnJD.js";import{D as I}from"./DialogBody-CWMSK4ia.js";import{D as O}from"./DialogFooter-CLJjh1va.js";import{D as E}from"./DialogHeader-L6SybCe3.js";import{D as b}from"./Divider-DnHImugK.js";import{D as T}from"./Dropdown-g0nQpBx8.js";import{F as y}from"./Flex-CdtIbowj.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{I as w}from"./IconDotsVertical16-CQZ6qfiQ.js";import{I as d}from"./InlineDialog-CHM-pWIr.js";import{M as x}from"./dialog-D9O7a7Fm.js";import"./preload-helper-MprHWY6w.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-CMtuz_oX.js";import"./FormControl-C1uigTas.js";import"./InputLabel-8bD9O_qh.js";import"./TooltipIcon-CNSgQRo7.js";import"./LegacyTooltip-D6E4E5LN.js";import"./useLink-DyG-X6Mh.js";import"./useFocusable-ukr0GfSS.js";import"./useFocusRing-DW1gfD-f.js";import"./useEffectEvent-D_3aKM3f.js";import"./chain-CFpcU0Bc.js";import"./index-BWy1gd5z.js";import"./usePopper-ZqHfhPUT.js";import"./index-CQojNdc7.js";import"./Portal-DKQJFHxR.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-76AoiODA.js";import"./IconCheckMark-BWLVd7ff.js";import"./IconExclamationMarkCircle24-D0fOYVRR.js";import"./IconExclamationMarkTriangle-DLzZIkKJ.js";import"./IconExclamationMarkTriangle24-Dukgs8V3.js";import"./IconQuestionMarkCircle-B25uHDGN.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-DoE3fbTl.js";import"./Switch-DlNN-b77.js";import"./TabItem-DgdG8pku.js";import"./elements-BOYmskOL.js";import"./TextInput-BRzonyv2.js";import"./IconCross-CT7zuVHP.js";import"./Tooltip-BDiP1-AM.js";import"./useClickOutside-CZbtNKDE.js";import"./EnablePortalWrapper-DgbBhakT.js";import"./Tree-KUPNwcnx.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-BnRdYpLk.js";import"./FocusScope-Bg3iLTeW.js";import"./useOverlayTriggerState-BJlJtWl6.js";import"./useControlledState-CKnfmfQy.js";import"./useMenuTrigger-CNSiM-C0.js";import"./useLabels-CNOoZD7Y.js";import"./useLocalizedStringFormatter-b8eE6xTQ.js";import"./context-BH81GxqX.js";import"./VisuallyHidden-Crqqq_7l.js";import"./helper-B6uRg3cb.js";import"./keyboard-0lmQA3iJ.js";import"./SelectionManager-DfiDyjBP.js";import"./useField-BkPqU3UH.js";import"./useFormValidationState-BW_6XHst.js";import"./MenuItem-CCdrowHd.js";import"./IconCaretRight-DWmwE3lB.js";import"./Trigger-CT7r-TNL.js";import"./IconCaretDown-BeLZn-V4.js";import"./IconCaretDown16-n8xDA44x.js";import"./IconTrashBin16-6jfmxe3F.js";import"./IconTrashBin24-CXO5t2ea.js";const{action:s}=__STORYBOOK_MODULE_ACTIONS__,Qt={title:"Experimental/InlineDialog/In Context",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{placement:"bottom-start",modality:x.Modal,offset:[0,8],flip:!0,width:360,minWidth:360,maxWidth:360,autoHeight:!1,maxHeight:"auto",minHeight:0,roundedCorners:!0,strategy:"absolute",enablePortal:!1},argTypes:{...S,modality:{options:Object.values(x),control:{type:"select"}},"data-test-id":{type:"string"},role:{type:"string"},autoHeight:{type:"boolean"},roundedCorners:{type:"boolean"},zIndex:{table:{disable:!0}}}},e=()=>t.jsx("p",{className:"tw-my-2 tw-text-text",children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio fugiat hic incidunt, inventore odio praesentium qui quisquam! Dignissimos nemo quisquam unde voluptatem. Animi ea iusto numquam odio omnis. Dicta, voluptatum."}),R=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs(y,{justify:"start",children:[t.jsx(i,{onClick:s("onClick"),style:n.Default,children:"Button"}),t.jsx(i,{onClick:s("onClick"),style:n.Danger,children:"Button"}),t.jsx(i,{ref:r,emphasis:a.Default,icon:t.jsx(w,{}),onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsx(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:t.jsx(I,{children:t.jsx(k,{className:"tw-p-4",children:t.jsx(e,{})})})}),t.jsx(i,{onClick:s("onClick"),style:n.Loud,children:"Button"})]})},F=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs("div",{children:[t.jsxs(y,{justify:"end",children:[t.jsx(i,{onClick:s("onClick"),emphasis:a.Default,style:n.Default,children:"Button"}),t.jsx(i,{ref:r,onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsxs(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:[t.jsx(E,{title:"Collaborator Settings",padding:"compact",onClose:()=>o(!1)}),t.jsx(I,{children:t.jsxs("div",{className:"tw-p-2 tw-text-text",children:[t.jsx(T,{enablePortal:!1,onChange:j=>console.log(j),activeItemId:"1",menuBlocks:[{id:"block1",menuItems:[{id:"1",title:"Item 1"},{id:"2",title:"Item 2"},{id:"3",title:"Item 3"},{id:"4",title:"Item 4"},{id:"5",title:"Item 5"}]}]}),t.jsx("p",{className:"tw-flex tw-items-center tw-my-2",children:"Label 2"}),t.jsx(e,{}),t.jsx(e,{})]})}),t.jsx(O,{actionButtons:[{children:"Cancel",emphasis:a.Default,onClick:()=>o(!1)},{children:"Confirm",onClick:()=>o(!1)}]})]}),t.jsx(i,{onClick:s("onClick"),emphasis:a.Strong,style:n.Loud,children:"Button"})]}),t.jsx(b,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(i,{emphasis:a.Default,style:n.Default,onClick:s("onClick"),children:"Button"})]})},m=R.bind({}),p=F.bind({});var g,f,h;m.parameters={...m.parameters,docs:{...(g=m.parameters)==null?void 0:g.docs,source:{originalSource:`args => {
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
