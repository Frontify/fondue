import{r as c,j as t}from"./iframe-ahMwwdsf.js";import{a as k}from"./Box-C8LnBuXA.js";import{B as i,b as n,a}from"./Button-w0YMQI20.js";import{D as I}from"./DialogBody-B2GvHwT1.js";import{D as O}from"./DialogFooter-DHRM7dUo.js";import{D as E}from"./DialogHeader-BPp6WKzk.js";import{D as b}from"./Divider-DpgHFPV1.js";import{D as T}from"./Dropdown-svNldc3Q.js";import{F as y}from"./Flex-DRJ62vin.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{I as w}from"./IconDotsVertical16-CvIfT50G.js";import{I as d}from"./InlineDialog-dmPr6wol.js";import{M as x}from"./dialog-D9O7a7Fm.js";import"./preload-helper-CG1F6kIz.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input--7aMGOFq.js";import"./FormControl-Cz8QE23N.js";import"./InputLabel-RKPNgSoW.js";import"./TooltipIcon-9SG9vwuW.js";import"./LegacyTooltip-8C24OgCi.js";import"./useLink-BQDoW3mf.js";import"./useFocusable-Ch_wBML2.js";import"./useFocusRing-DaQclxv6.js";import"./useEffectEvent-Bed0HKrm.js";import"./chain-C53qR8mF.js";import"./index-B6RK_iYZ.js";import"./usePopper-CDxDTjFc.js";import"./index-CVrNqSrl.js";import"./Portal-DKS8nUwW.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-CZOTONQe.js";import"./IconCheckMark-CJeheIoj.js";import"./IconExclamationMarkCircle24-BSoLODou.js";import"./IconExclamationMarkTriangle-BZvUO_9Q.js";import"./IconExclamationMarkTriangle24-CrA51qy3.js";import"./IconQuestionMarkCircle-DwcKSdMS.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-CpxXuuZu.js";import"./Switch-wdnbPpFm.js";import"./TabItem-D5LwT7_5.js";import"./elements-BOYmskOL.js";import"./TextInput-Dz32-b9A.js";import"./IconCross-DtgV0uoe.js";import"./Tooltip-BU8jlWYN.js";import"./useClickOutside-J1ExsWnc.js";import"./EnablePortalWrapper-BwU3w8We.js";import"./Tree-DHmt4Idc.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-DLhm0yas.js";import"./FocusScope-Bzv2WeXp.js";import"./useOverlayTriggerState-Bu5TuFq8.js";import"./useControlledState-DNYTr6ro.js";import"./useMenuTrigger-B0mf0h1D.js";import"./useLabels-Dts9_kB5.js";import"./useLocalizedStringFormatter-B3uWwqsq.js";import"./context-Cwx5vL9r.js";import"./VisuallyHidden-DUEyq-Cs.js";import"./helper-DY0o5nBN.js";import"./keyboard-CXAxgyJA.js";import"./SelectionManager-Cf_3T95Q.js";import"./useField-B-F_ybfn.js";import"./useFormValidationState-9z_gHNgo.js";import"./MenuItem-BeGq7gvA.js";import"./IconCaretRight-YmhPr-ED.js";import"./Trigger-Bg-sKnk_.js";import"./IconCaretDown-BWkY7x9m.js";import"./IconCaretDown16-BCuUFWC8.js";import"./IconTrashBin16-BvirWvL2.js";import"./IconTrashBin24-Dyp1RBtU.js";const{action:s}=__STORYBOOK_MODULE_ACTIONS__,Qt={title:"Experimental/InlineDialog/In Context",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{placement:"bottom-start",modality:x.Modal,offset:[0,8],flip:!0,width:360,minWidth:360,maxWidth:360,autoHeight:!1,maxHeight:"auto",minHeight:0,roundedCorners:!0,strategy:"absolute",enablePortal:!1},argTypes:{...S,modality:{options:Object.values(x),control:{type:"select"}},"data-test-id":{type:"string"},role:{type:"string"},autoHeight:{type:"boolean"},roundedCorners:{type:"boolean"},zIndex:{table:{disable:!0}}}},e=()=>t.jsx("p",{className:"tw-my-2 tw-text-text",children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio fugiat hic incidunt, inventore odio praesentium qui quisquam! Dignissimos nemo quisquam unde voluptatem. Animi ea iusto numquam odio omnis. Dicta, voluptatum."}),R=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs(y,{justify:"start",children:[t.jsx(i,{onClick:s("onClick"),style:n.Default,children:"Button"}),t.jsx(i,{onClick:s("onClick"),style:n.Danger,children:"Button"}),t.jsx(i,{ref:r,emphasis:a.Default,icon:t.jsx(w,{}),onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsx(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:t.jsx(I,{children:t.jsx(k,{className:"tw-p-4",children:t.jsx(e,{})})})}),t.jsx(i,{onClick:s("onClick"),style:n.Loud,children:"Button"})]})},F=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs("div",{children:[t.jsxs(y,{justify:"end",children:[t.jsx(i,{onClick:s("onClick"),emphasis:a.Default,style:n.Default,children:"Button"}),t.jsx(i,{ref:r,onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsxs(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:[t.jsx(E,{title:"Collaborator Settings",padding:"compact",onClose:()=>o(!1)}),t.jsx(I,{children:t.jsxs("div",{className:"tw-p-2 tw-text-text",children:[t.jsx(T,{enablePortal:!1,onChange:j=>console.log(j),activeItemId:"1",menuBlocks:[{id:"block1",menuItems:[{id:"1",title:"Item 1"},{id:"2",title:"Item 2"},{id:"3",title:"Item 3"},{id:"4",title:"Item 4"},{id:"5",title:"Item 5"}]}]}),t.jsx("p",{className:"tw-flex tw-items-center tw-my-2",children:"Label 2"}),t.jsx(e,{}),t.jsx(e,{})]})}),t.jsx(O,{actionButtons:[{children:"Cancel",emphasis:a.Default,onClick:()=>o(!1)},{children:"Confirm",onClick:()=>o(!1)}]})]}),t.jsx(i,{onClick:s("onClick"),emphasis:a.Strong,style:n.Loud,children:"Button"})]}),t.jsx(b,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(i,{emphasis:a.Default,style:n.Default,onClick:s("onClick"),children:"Button"})]})},m=R.bind({}),p=F.bind({});var g,f,h;m.parameters={...m.parameters,docs:{...(g=m.parameters)==null?void 0:g.docs,source:{originalSource:`args => {
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
