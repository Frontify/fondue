import{j as t}from"./jsx-runtime-BvI67ttx.js";import{a as n}from"./chunk-D5ZWXAHU-DlerbUHg.js";import{r as c}from"./index-BEEaWAwe.js";import{B as k}from"./Box-CO2lKc8E.js";import{c as i,a as s,b as a}from"./Button-ljOzJNbm.js";import{D as I}from"./DialogBody-C9ghUfum.js";import{D as E}from"./DialogFooter-B9Ut40UQ.js";import{D as O}from"./DialogHeader-NHArTr9e.js";import{D as b}from"./Divider-BeD6tjm6.js";import{D as T}from"./Dropdown-BtR_x9Ve.js";import{F as y}from"./Flex-BijbbJox.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{I as w}from"./IconDotsVertical16-26DhV9gv.js";import{I as d}from"./InlineDialog-eXSyR-y2.js";import{M as x}from"./dialog-Dre1eVQK.js";import"./v4-CtRu48qb.js";import"./_commonjsHelpers-BosuxZz1.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-CBFElZiz.js";import"./input-92Tvgqoy.js";import"./FormControl-B09RM8pa.js";import"./InputLabel-BUzvczwB.js";import"./TooltipIcon-DeJsuRhr.js";import"./LegacyTooltip-BC90iaVE.js";import"./useLink-CGrBbYMo.js";import"./useFocusable-DySem7st.js";import"./useFocusRing-BuOUPy6p.js";import"./SSRProvider-4hSGecE0.js";import"./chain-Ck9CKbau.js";import"./usePopper-CHIbWn6Y.js";import"./index-CJX6plO5.js";import"./index-CfyPTyT-.js";import"./Portal-BFAtGiKe.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-P52koD2W.js";import"./IconCheckMark-CEVoSHhf.js";import"./IconExclamationMarkCircle24-BbewMLoq.js";import"./IconExclamationMarkTriangle-BoexdZ5m.js";import"./IconExclamationMarkTriangle24-DY2uQ5A6.js";import"./IconQuestionMarkCircle-DJ6cviju.js";import"./validation-CJXPAjNB.js";import"./LoadingCircle-CLFuk3gJ.js";import"./SegmentedControls-Btv1r2cE.js";import"./useFormValidationState-Cm7EQ7so.js";import"./FocusScope-CqItlJEB.js";import"./useField-Dc7XGbIY.js";import"./useLabels-D_OVlzwR.js";import"./context-DXnD6xbD.js";import"./VisuallyHidden-DdU2rIcI.js";import"./useControlledState-C1JYnvfk.js";import"./motion-B4glEiOI.js";import"./Switch-DqoPz_HL.js";import"./TabItem-CrQZ7sux.js";import"./elements-BOYmskOL.js";import"./TextInput-DrA2OM1M.js";import"./IconCross-B3GiP1Si.js";import"./Tooltip-Cke8RYXd.js";import"./useClickOutside-CKZcS6rn.js";import"./EnablePortalWrapper-CBs6EJfs.js";import"./Tree-DPjJ38dQ.js";import"./immer-DpFkcGey.js";import"./Trigger-DM6leiPg.js";import"./IconCaretDown-DO73XlJq.js";import"./IconCaretDown16-D1ph0gFc.js";import"./IconTrashBin16-CVizQs9b.js";import"./IconTrashBin24-D97dm6YN.js";import"./useButton-CGbfYaYu.js";import"./useOverlayTriggerState-kv3bAW5J.js";import"./useMenuTrigger-BDN5-qBG.js";import"./useLocalizedStringFormatter-GGVsfvFM.js";import"./helper-C1ILvlDl.js";import"./isScrollable-Bts8_1NI.js";import"./SelectionManager-LV9dL26g.js";import"./MenuItem-CcAAOiF6.js";import"./IconCaretRight-CmZkFCOs.js";const ee={title:"Experimental/InlineDialog/In Context",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{placement:"bottom-start",modality:x.Modal,offset:[0,8],flip:!0,width:360,minWidth:360,maxWidth:360,autoHeight:!1,maxHeight:"auto",minHeight:0,roundedCorners:!0,strategy:"absolute",enablePortal:!1},argTypes:{...S,modality:{options:Object.values(x),control:{type:"select"}},"data-test-id":{type:"string"},role:{type:"string"},autoHeight:{type:"boolean"},roundedCorners:{type:"boolean"},zIndex:{table:{disable:!0}}}},e=()=>t.jsx("p",{className:"tw-my-2 tw-text-text",children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio fugiat hic incidunt, inventore odio praesentium qui quisquam! Dignissimos nemo quisquam unde voluptatem. Animi ea iusto numquam odio omnis. Dicta, voluptatum."}),R=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs(y,{justify:"start",children:[t.jsx(i,{onClick:n("onClick"),style:s.Default,children:"Button"}),t.jsx(i,{onClick:n("onClick"),style:s.Danger,children:"Button"}),t.jsx(i,{ref:r,emphasis:a.Default,icon:t.jsx(w,{}),onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsx(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:t.jsx(I,{children:t.jsx(k,{className:"tw-p-4",children:t.jsx(e,{})})})}),t.jsx(i,{onClick:n("onClick"),style:s.Loud,children:"Button"})]})},F=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs("div",{children:[t.jsxs(y,{justify:"end",children:[t.jsx(i,{onClick:n("onClick"),emphasis:a.Default,style:s.Default,children:"Button"}),t.jsx(i,{ref:r,onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsxs(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:[t.jsx(O,{title:"Collaborator Settings",padding:"compact",onClose:()=>o(!1)}),t.jsx(I,{children:t.jsxs("div",{className:"tw-p-2 tw-text-text",children:[t.jsx(T,{enablePortal:!1,onChange:j=>console.log(j),activeItemId:"1",menuBlocks:[{id:"block1",menuItems:[{id:"1",title:"Item 1"},{id:"2",title:"Item 2"},{id:"3",title:"Item 3"},{id:"4",title:"Item 4"},{id:"5",title:"Item 5"}]}]}),t.jsx("p",{className:"tw-flex tw-items-center tw-my-2",children:"Label 2"}),t.jsx(e,{}),t.jsx(e,{})]})}),t.jsx(E,{actionButtons:[{children:"Cancel",emphasis:a.Default,onClick:()=>o(!1)},{children:"Confirm",onClick:()=>o(!1)}]})]}),t.jsx(i,{onClick:n("onClick"),emphasis:a.Strong,style:s.Loud,children:"Button"})]}),t.jsx(b,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(i,{emphasis:a.Default,style:s.Default,onClick:n("onClick"),children:"Button"})]})},m=R.bind({}),p=F.bind({});var g,f,h;m.parameters={...m.parameters,docs:{...(g=m.parameters)==null?void 0:g.docs,source:{originalSource:`args => {
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
}`,...(D=(C=p.parameters)==null?void 0:C.docs)==null?void 0:D.source}}};const oe=["WithNoFocusableContent","InContextWithDialogHeaderAndDialogFooter"];export{p as InContextWithDialogHeaderAndDialogFooter,m as WithNoFocusableContent,oe as __namedExportsOrder,ee as default};
