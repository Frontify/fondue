import{r as c,j as t}from"./iframe-VY73Ap13.js";import{a as k}from"./Box-CLLqKugf.js";import{B as i,b as n,a}from"./Button-DELFvd4r.js";import{D as I}from"./DialogBody-yOq8Zz1q.js";import{D as O}from"./DialogFooter-pydP6LII.js";import{D as E}from"./DialogHeader-BUlNKlaN.js";import{D as b}from"./Divider-BcAAUxfh.js";import{D as T}from"./Dropdown-CCRPHitn.js";import{F as y}from"./Flex-BaPm82S6.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{I as w}from"./IconDotsVertical16-9g8r0vly.js";import{I as d}from"./InlineDialog-sMf3fYzW.js";import{M as x}from"./dialog-D9O7a7Fm.js";import"./preload-helper-CxFeC-BG.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-NhFKuIuf.js";import"./FormControl-jg1nLEKB.js";import"./InputLabel-BPpbNn23.js";import"./TooltipIcon-CQs5rkSB.js";import"./LegacyTooltip-XNI--7kK.js";import"./useLink-D6w5pNvA.js";import"./useFocusable-DGcHobBC.js";import"./useFocusRing-FYXzC7oH.js";import"./useEffectEvent-B9Wa_Khk.js";import"./chain-BpCjk0xr.js";import"./index-D4GOJQ2j.js";import"./usePopper-D6_OusyC.js";import"./index-DftGEHB6.js";import"./Portal-CdDr4tzA.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-BDfUaXHh.js";import"./IconCheckMark-81szwvvv.js";import"./IconExclamationMarkCircle24-BlMDUN5A.js";import"./IconExclamationMarkTriangle-DhUkGljA.js";import"./IconExclamationMarkTriangle24-B9YH9o9Q.js";import"./IconQuestionMarkCircle-De1xUr8F.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-BF7iQc4k.js";import"./Switch-Gi54ffVI.js";import"./TabItem-BRHV03C5.js";import"./elements-BOYmskOL.js";import"./TextInput-DkYLuvbX.js";import"./IconCross-UphrbeRF.js";import"./Tooltip-BX0UDRlx.js";import"./useClickOutside-DGbKMmNc.js";import"./EnablePortalWrapper-Cd9JJ5gy.js";import"./Tree-CT3mRs9P.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-t59T1mpS.js";import"./IconCaretDown-B-lBqeTo.js";import"./IconCaretDown16-BdTk2Dp5.js";import"./IconTrashBin16-ShLh3Fnh.js";import"./IconTrashBin24-IJdl3A2U.js";import"./useButton-CpPLXiL6.js";import"./FocusScope-lBPFh-5N.js";import"./useOverlayTriggerState-BLdKk0LU.js";import"./useControlledState-BnsV0SH2.js";import"./useMenuTrigger-qjn33xnp.js";import"./useLabels-0biqzkbe.js";import"./useLocalizedStringFormatter-Bf_C1X_K.js";import"./context-D07mX5et.js";import"./VisuallyHidden-DTg4kE-9.js";import"./helper-CMkjiFRq.js";import"./keyboard-bPmy2E5Q.js";import"./SelectionManager-BXo_FqwK.js";import"./useField-CMqyhA3q.js";import"./useFormValidationState-hJ0IPfCD.js";import"./MenuItem-BHFBMccb.js";import"./IconCaretRight-BZX4ublw.js";const{action:s}=__STORYBOOK_MODULE_ACTIONS__,Qt={title:"Experimental/InlineDialog/In Context",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{placement:"bottom-start",modality:x.Modal,offset:[0,8],flip:!0,width:360,minWidth:360,maxWidth:360,autoHeight:!1,maxHeight:"auto",minHeight:0,roundedCorners:!0,strategy:"absolute",enablePortal:!1},argTypes:{...S,modality:{options:Object.values(x),control:{type:"select"}},"data-test-id":{type:"string"},role:{type:"string"},autoHeight:{type:"boolean"},roundedCorners:{type:"boolean"},zIndex:{table:{disable:!0}}}},e=()=>t.jsx("p",{className:"tw-my-2 tw-text-text",children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio fugiat hic incidunt, inventore odio praesentium qui quisquam! Dignissimos nemo quisquam unde voluptatem. Animi ea iusto numquam odio omnis. Dicta, voluptatum."}),R=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs(y,{justify:"start",children:[t.jsx(i,{onClick:s("onClick"),style:n.Default,children:"Button"}),t.jsx(i,{onClick:s("onClick"),style:n.Danger,children:"Button"}),t.jsx(i,{ref:r,emphasis:a.Default,icon:t.jsx(w,{}),onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsx(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:t.jsx(I,{children:t.jsx(k,{className:"tw-p-4",children:t.jsx(e,{})})})}),t.jsx(i,{onClick:s("onClick"),style:n.Loud,children:"Button"})]})},F=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs("div",{children:[t.jsxs(y,{justify:"end",children:[t.jsx(i,{onClick:s("onClick"),emphasis:a.Default,style:n.Default,children:"Button"}),t.jsx(i,{ref:r,onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsxs(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:[t.jsx(E,{title:"Collaborator Settings",padding:"compact",onClose:()=>o(!1)}),t.jsx(I,{children:t.jsxs("div",{className:"tw-p-2 tw-text-text",children:[t.jsx(T,{enablePortal:!1,onChange:j=>console.log(j),activeItemId:"1",menuBlocks:[{id:"block1",menuItems:[{id:"1",title:"Item 1"},{id:"2",title:"Item 2"},{id:"3",title:"Item 3"},{id:"4",title:"Item 4"},{id:"5",title:"Item 5"}]}]}),t.jsx("p",{className:"tw-flex tw-items-center tw-my-2",children:"Label 2"}),t.jsx(e,{}),t.jsx(e,{})]})}),t.jsx(O,{actionButtons:[{children:"Cancel",emphasis:a.Default,onClick:()=>o(!1)},{children:"Confirm",onClick:()=>o(!1)}]})]}),t.jsx(i,{onClick:s("onClick"),emphasis:a.Strong,style:n.Loud,children:"Button"})]}),t.jsx(b,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(i,{emphasis:a.Default,style:n.Default,onClick:s("onClick"),children:"Button"})]})},m=R.bind({}),p=F.bind({});var g,f,h;m.parameters={...m.parameters,docs:{...(g=m.parameters)==null?void 0:g.docs,source:{originalSource:`args => {
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
