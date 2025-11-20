import{r as c,j as t}from"./iframe-hrVkOCwH.js";import{a as k}from"./Box-BWuKVa5u.js";import{B as i,b as n,a}from"./Button-W5JU2GYF.js";import{D as I}from"./DialogBody-DSM1Gazo.js";import{D as O}from"./DialogFooter-CMI1TMPq.js";import{D as E}from"./DialogHeader-C48NAOxu.js";import{D as b}from"./Divider-CFprP-7p.js";import{D as T}from"./Dropdown-84j--ydh.js";import{F as y}from"./Flex-CGTQfS8c.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{I as w}from"./IconDotsVertical16-C8CdPWH2.js";import{I as d}from"./InlineDialog-B9i1Q5Y-.js";import{M as x}from"./dialog-D9O7a7Fm.js";import"./preload-helper-C1FmrZbK.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-HM8QN-Dx.js";import"./Checkbox-BPm9Jugo.js";import"./useFocusable-B4p0MNCv.js";import"./useFocusRing-1BNT7VFY.js";import"./useEffectEvent-r0uIPgQg.js";import"./chain--XmeI2qo.js";import"./index-B71KNn4Z.js";import"./useFormValidationState-BwX-GImz.js";import"./useControlledState-71UIMywV.js";import"./InputLabel-DavHylX_.js";import"./TooltipIcon-Cr95l-NA.js";import"./LegacyTooltip-DHrljL_9.js";import"./useLink-DOG0Yu1Y.js";import"./usePopper-J_p-icdG.js";import"./index-CGZABk5_.js";import"./Portal-DTFr9_A2.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-sOEvST2M.js";import"./IconCheckMark-B-YCLBcL.js";import"./IconExclamationMarkCircle24-481k8n6W.js";import"./IconExclamationMarkTriangle-CBe5H8Hw.js";import"./IconExclamationMarkTriangle24-jdOtgNlK.js";import"./IconQuestionMarkCircle-DYtN5BBW.js";import"./IconMinus-D4AubFA7.js";import"./FormControl-DVxoqDTe.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-B35Oo3EB.js";import"./Switch-imIT-kcW.js";import"./TabItem-aB0k9Fro.js";import"./elements-BOYmskOL.js";import"./TextInput-DmxJRx96.js";import"./IconCross-CC8OVy8K.js";import"./Tooltip-3_-Yc6si.js";import"./useClickOutside-D66VdyW1.js";import"./EnablePortalWrapper-CGVUP28H.js";import"./Tree-7T50P4iA.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-Bgg3h0fg.js";import"./IconCaretDown-COnPOjBQ.js";import"./IconCaretDown16-CwmIioRV.js";import"./IconTrashBin16-BhYglj6k.js";import"./IconTrashBin24-DlsKPU2P.js";import"./useButton-DZD6mn4U.js";import"./FocusScope-Cw-KBXLf.js";import"./useOverlayTriggerState-Cvso7mUw.js";import"./useMenuTrigger-dINMcV5G.js";import"./useLabels-CEhUj6kL.js";import"./useLocalizedStringFormatter-CDoLW0UQ.js";import"./context-7EnkloMM.js";import"./VisuallyHidden-B2NBSuQA.js";import"./helper-AyX-w3Jl.js";import"./keyboard-DN5zZ3_G.js";import"./SelectionManager-dXuotmYo.js";import"./useField-CmitCZja.js";import"./MenuItem-DlkMY8wX.js";import"./IconCaretRight-qWk9Lipi.js";const{action:s}=__STORYBOOK_MODULE_ACTIONS__,Zt={title:"Experimental/InlineDialog/In Context",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{placement:"bottom-start",modality:x.Modal,offset:[0,8],flip:!0,width:360,minWidth:360,maxWidth:360,autoHeight:!1,maxHeight:"auto",minHeight:0,roundedCorners:!0,strategy:"absolute",enablePortal:!1},argTypes:{...S,modality:{options:Object.values(x),control:{type:"select"}},"data-test-id":{type:"string"},role:{type:"string"},autoHeight:{type:"boolean"},roundedCorners:{type:"boolean"},zIndex:{table:{disable:!0}}}},e=()=>t.jsx("p",{className:"tw-my-2 tw-text-text",children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio fugiat hic incidunt, inventore odio praesentium qui quisquam! Dignissimos nemo quisquam unde voluptatem. Animi ea iusto numquam odio omnis. Dicta, voluptatum."}),R=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs(y,{justify:"start",children:[t.jsx(i,{onClick:s("onClick"),style:n.Default,children:"Button"}),t.jsx(i,{onClick:s("onClick"),style:n.Danger,children:"Button"}),t.jsx(i,{ref:r,emphasis:a.Default,icon:t.jsx(w,{}),onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsx(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:t.jsx(I,{children:t.jsx(k,{className:"tw-p-4",children:t.jsx(e,{})})})}),t.jsx(i,{onClick:s("onClick"),style:n.Loud,children:"Button"})]})},F=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs("div",{children:[t.jsxs(y,{justify:"end",children:[t.jsx(i,{onClick:s("onClick"),emphasis:a.Default,style:n.Default,children:"Button"}),t.jsx(i,{ref:r,onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsxs(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:[t.jsx(E,{title:"Collaborator Settings",padding:"compact",onClose:()=>o(!1)}),t.jsx(I,{children:t.jsxs("div",{className:"tw-p-2 tw-text-text",children:[t.jsx(T,{enablePortal:!1,onChange:j=>console.log(j),activeItemId:"1",menuBlocks:[{id:"block1",menuItems:[{id:"1",title:"Item 1"},{id:"2",title:"Item 2"},{id:"3",title:"Item 3"},{id:"4",title:"Item 4"},{id:"5",title:"Item 5"}]}]}),t.jsx("p",{className:"tw-flex tw-items-center tw-my-2",children:"Label 2"}),t.jsx(e,{}),t.jsx(e,{})]})}),t.jsx(O,{actionButtons:[{children:"Cancel",emphasis:a.Default,onClick:()=>o(!1)},{children:"Confirm",onClick:()=>o(!1)}]})]}),t.jsx(i,{onClick:s("onClick"),emphasis:a.Strong,style:n.Loud,children:"Button"})]}),t.jsx(b,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(i,{emphasis:a.Default,style:n.Default,onClick:s("onClick"),children:"Button"})]})},m=R.bind({}),p=F.bind({});var g,f,h;m.parameters={...m.parameters,docs:{...(g=m.parameters)==null?void 0:g.docs,source:{originalSource:`args => {
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
