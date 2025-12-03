import{r as c,j as t}from"./iframe-B2O1l8ks.js";import{a as k}from"./Box-Brsujuan.js";import{B as i,b as n,a}from"./Button-DjQcwXiI.js";import{D as I}from"./DialogBody-drY_7Tuv.js";import{D as O}from"./DialogFooter-BkpzOf-x.js";import{D as E}from"./DialogHeader-CN0knUTo.js";import{D as b}from"./Divider-C95xZvJp.js";import{D as T}from"./Dropdown-CdTWV9q3.js";import{F as y}from"./Flex-BhJu9Q1b.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{I as w}from"./IconDotsVertical16-DLAajFZh.js";import{I as d}from"./InlineDialog-Dp8OaVqc.js";import{M as x}from"./dialog-D9O7a7Fm.js";import"./preload-helper-D9dL-qgt.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-COX0EROc.js";import"./FormControl-Hwu9IOSl.js";import"./InputLabel-DmUNLwe6.js";import"./TooltipIcon-DjogzR85.js";import"./LegacyTooltip-CoPDRg8Q.js";import"./useLink-yIk-67qk.js";import"./useFocusable-C8pyFffm.js";import"./useFocusRing-BEoPloIT.js";import"./useEffectEvent-Xwo7DV9O.js";import"./chain-D3CT5oan.js";import"./index-g6qngXyA.js";import"./usePopper-BS2q9LVY.js";import"./index-J5FlhQNV.js";import"./Portal-DxlPTCam.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-CVzVZL2w.js";import"./IconCheckMark-Dh0UmVD7.js";import"./IconExclamationMarkCircle24-BRyvx9K_.js";import"./IconExclamationMarkTriangle-CdmIw3Si.js";import"./IconExclamationMarkTriangle24-BrwgDn_Y.js";import"./IconQuestionMarkCircle-pwURan37.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-DTSOVJnx.js";import"./Switch-CK66TCxd.js";import"./TabItem-l09098xX.js";import"./elements-BOYmskOL.js";import"./TextInput-CJHbc71V.js";import"./IconCross-Bxz_oRST.js";import"./Tooltip-CIUtXq9Y.js";import"./useClickOutside-BnNPuVAM.js";import"./EnablePortalWrapper-BXp3LSEV.js";import"./Tree-DtYzLs8M.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-BPhVc6Ll.js";import"./IconCaretDown-DkHT8ZmQ.js";import"./IconCaretDown16-DFnwRzQd.js";import"./IconTrashBin16-D9g3yNqg.js";import"./IconTrashBin24-sCuj89qM.js";import"./useButton-Bzz293T6.js";import"./FocusScope-BwzDr3At.js";import"./useOverlayTriggerState-K3eYvz7R.js";import"./useControlledState-CJHKrRp8.js";import"./useMenuTrigger-Db74_L1a.js";import"./useLabels-CkfN9pbN.js";import"./useLocalizedStringFormatter-DlT0URoc.js";import"./context-8g_6qPnt.js";import"./VisuallyHidden-S1E3DabF.js";import"./helper-BkSOkjv_.js";import"./keyboard-clbjsO8Q.js";import"./SelectionManager-DkUNUNox.js";import"./useField-d_0-zJLA.js";import"./useFormValidationState-DKzPu93G.js";import"./MenuItem-Ck5d5Zod.js";import"./IconCaretRight-DuXWDOio.js";const{action:s}=__STORYBOOK_MODULE_ACTIONS__,Qt={title:"Experimental/InlineDialog/In Context",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{placement:"bottom-start",modality:x.Modal,offset:[0,8],flip:!0,width:360,minWidth:360,maxWidth:360,autoHeight:!1,maxHeight:"auto",minHeight:0,roundedCorners:!0,strategy:"absolute",enablePortal:!1},argTypes:{...S,modality:{options:Object.values(x),control:{type:"select"}},"data-test-id":{type:"string"},role:{type:"string"},autoHeight:{type:"boolean"},roundedCorners:{type:"boolean"},zIndex:{table:{disable:!0}}}},e=()=>t.jsx("p",{className:"tw-my-2 tw-text-text",children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio fugiat hic incidunt, inventore odio praesentium qui quisquam! Dignissimos nemo quisquam unde voluptatem. Animi ea iusto numquam odio omnis. Dicta, voluptatum."}),R=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs(y,{justify:"start",children:[t.jsx(i,{onClick:s("onClick"),style:n.Default,children:"Button"}),t.jsx(i,{onClick:s("onClick"),style:n.Danger,children:"Button"}),t.jsx(i,{ref:r,emphasis:a.Default,icon:t.jsx(w,{}),onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsx(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:t.jsx(I,{children:t.jsx(k,{className:"tw-p-4",children:t.jsx(e,{})})})}),t.jsx(i,{onClick:s("onClick"),style:n.Loud,children:"Button"})]})},F=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs("div",{children:[t.jsxs(y,{justify:"end",children:[t.jsx(i,{onClick:s("onClick"),emphasis:a.Default,style:n.Default,children:"Button"}),t.jsx(i,{ref:r,onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsxs(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:[t.jsx(E,{title:"Collaborator Settings",padding:"compact",onClose:()=>o(!1)}),t.jsx(I,{children:t.jsxs("div",{className:"tw-p-2 tw-text-text",children:[t.jsx(T,{enablePortal:!1,onChange:j=>console.log(j),activeItemId:"1",menuBlocks:[{id:"block1",menuItems:[{id:"1",title:"Item 1"},{id:"2",title:"Item 2"},{id:"3",title:"Item 3"},{id:"4",title:"Item 4"},{id:"5",title:"Item 5"}]}]}),t.jsx("p",{className:"tw-flex tw-items-center tw-my-2",children:"Label 2"}),t.jsx(e,{}),t.jsx(e,{})]})}),t.jsx(O,{actionButtons:[{children:"Cancel",emphasis:a.Default,onClick:()=>o(!1)},{children:"Confirm",onClick:()=>o(!1)}]})]}),t.jsx(i,{onClick:s("onClick"),emphasis:a.Strong,style:n.Loud,children:"Button"})]}),t.jsx(b,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(i,{emphasis:a.Default,style:n.Default,onClick:s("onClick"),children:"Button"})]})},m=R.bind({}),p=F.bind({});var g,f,h;m.parameters={...m.parameters,docs:{...(g=m.parameters)==null?void 0:g.docs,source:{originalSource:`args => {
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
