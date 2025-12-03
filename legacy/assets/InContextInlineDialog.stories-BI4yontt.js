import{r as c,j as t}from"./iframe-Daozt3iQ.js";import{a as k}from"./Box-xGIeYbF0.js";import{B as i,b as n,a}from"./Button-Bd7LWYaJ.js";import{D as I}from"./DialogBody-Cw1V-grV.js";import{D as O}from"./DialogFooter-Dma9M4EM.js";import{D as E}from"./DialogHeader-BRza9JEH.js";import{D as b}from"./Divider-Bsg79Mxz.js";import{D as T}from"./Dropdown-BcvaZJ3L.js";import{F as y}from"./Flex-CwY_nNhN.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{I as w}from"./IconDotsVertical16-BYUrCb1o.js";import{I as d}from"./InlineDialog-ColiRWgX.js";import{M as x}from"./dialog-D9O7a7Fm.js";import"./preload-helper-C1FmrZbK.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-D8x9f3pr.js";import"./FormControl-DWwqpw-d.js";import"./InputLabel-CVDMD-Tn.js";import"./TooltipIcon-DYcAVd3n.js";import"./LegacyTooltip-ChAPEshh.js";import"./useLink-Dy-sCuG2.js";import"./useFocusable-DL4Y5ggQ.js";import"./useFocusRing-CGU-cSgr.js";import"./useEffectEvent-12J7pWwB.js";import"./chain-CsCbg1Z2.js";import"./index-BfIvuXwT.js";import"./usePopper-vdmvH7Th.js";import"./index-OWryF59X.js";import"./Portal-DTK6lLVZ.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-Dk7Aese3.js";import"./IconCheckMark-Clmozq0X.js";import"./IconExclamationMarkCircle24-BwRpG_-o.js";import"./IconExclamationMarkTriangle-Dk5-PKfw.js";import"./IconExclamationMarkTriangle24-C02DR5Po.js";import"./IconQuestionMarkCircle-BAV0QCbN.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-DDuBjsDb.js";import"./Switch-BvmLFAiE.js";import"./TabItem-Cfcnd0Sr.js";import"./elements-BOYmskOL.js";import"./TextInput-C78iyWbb.js";import"./IconCross-CTbg5X3_.js";import"./Tooltip-D8rhxf09.js";import"./useClickOutside-ZxkCjlDe.js";import"./EnablePortalWrapper-B8rj-dCL.js";import"./Tree-CgXzFTP6.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-B2W7P8Z-.js";import"./IconCaretDown-JmDsgtmL.js";import"./IconCaretDown16-HYLk9eai.js";import"./IconTrashBin16-ZQBoDWZj.js";import"./IconTrashBin24-Du6CqYoX.js";import"./useButton-ObNU-Eop.js";import"./FocusScope-D8t9qzx3.js";import"./useOverlayTriggerState-BIV9Y_F4.js";import"./useControlledState-9xSKll3C.js";import"./useMenuTrigger-DeWAQNjR.js";import"./useLabels-CBaeWtqR.js";import"./useLocalizedStringFormatter-CHoYkr8t.js";import"./context-DBemmwkA.js";import"./VisuallyHidden-CQyKb6qs.js";import"./helper-C4jNQD4O.js";import"./keyboard-Bc3Vz1rz.js";import"./SelectionManager-CM08G_eI.js";import"./useField-D8TXgJ1L.js";import"./useFormValidationState-D_0nW8rr.js";import"./MenuItem-86Zp0U4R.js";import"./IconCaretRight-BIBMnu8h.js";const{action:s}=__STORYBOOK_MODULE_ACTIONS__,Qt={title:"Experimental/InlineDialog/In Context",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{placement:"bottom-start",modality:x.Modal,offset:[0,8],flip:!0,width:360,minWidth:360,maxWidth:360,autoHeight:!1,maxHeight:"auto",minHeight:0,roundedCorners:!0,strategy:"absolute",enablePortal:!1},argTypes:{...S,modality:{options:Object.values(x),control:{type:"select"}},"data-test-id":{type:"string"},role:{type:"string"},autoHeight:{type:"boolean"},roundedCorners:{type:"boolean"},zIndex:{table:{disable:!0}}}},e=()=>t.jsx("p",{className:"tw-my-2 tw-text-text",children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio fugiat hic incidunt, inventore odio praesentium qui quisquam! Dignissimos nemo quisquam unde voluptatem. Animi ea iusto numquam odio omnis. Dicta, voluptatum."}),R=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs(y,{justify:"start",children:[t.jsx(i,{onClick:s("onClick"),style:n.Default,children:"Button"}),t.jsx(i,{onClick:s("onClick"),style:n.Danger,children:"Button"}),t.jsx(i,{ref:r,emphasis:a.Default,icon:t.jsx(w,{}),onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsx(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:t.jsx(I,{children:t.jsx(k,{className:"tw-p-4",children:t.jsx(e,{})})})}),t.jsx(i,{onClick:s("onClick"),style:n.Loud,children:"Button"})]})},F=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs("div",{children:[t.jsxs(y,{justify:"end",children:[t.jsx(i,{onClick:s("onClick"),emphasis:a.Default,style:n.Default,children:"Button"}),t.jsx(i,{ref:r,onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsxs(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:[t.jsx(E,{title:"Collaborator Settings",padding:"compact",onClose:()=>o(!1)}),t.jsx(I,{children:t.jsxs("div",{className:"tw-p-2 tw-text-text",children:[t.jsx(T,{enablePortal:!1,onChange:j=>console.log(j),activeItemId:"1",menuBlocks:[{id:"block1",menuItems:[{id:"1",title:"Item 1"},{id:"2",title:"Item 2"},{id:"3",title:"Item 3"},{id:"4",title:"Item 4"},{id:"5",title:"Item 5"}]}]}),t.jsx("p",{className:"tw-flex tw-items-center tw-my-2",children:"Label 2"}),t.jsx(e,{}),t.jsx(e,{})]})}),t.jsx(O,{actionButtons:[{children:"Cancel",emphasis:a.Default,onClick:()=>o(!1)},{children:"Confirm",onClick:()=>o(!1)}]})]}),t.jsx(i,{onClick:s("onClick"),emphasis:a.Strong,style:n.Loud,children:"Button"})]}),t.jsx(b,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(i,{emphasis:a.Default,style:n.Default,onClick:s("onClick"),children:"Button"})]})},m=R.bind({}),p=F.bind({});var g,f,h;m.parameters={...m.parameters,docs:{...(g=m.parameters)==null?void 0:g.docs,source:{originalSource:`args => {
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
