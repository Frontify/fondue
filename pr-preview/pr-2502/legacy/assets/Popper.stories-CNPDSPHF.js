import{r as s,j as t}from"./iframe-BeiBdUkj.js";import{a as b}from"./Box-D4F-X9ac.js";import{B as h}from"./Button-CEdhFolC.js";import{P as g}from"./constantStories-DEfmjXOT.js";import{b as x,P as d}from"./Tooltip-BlwHkNi4.js";import"./preload-helper-B933Jwna.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-Dues2-Nh.js";import"./DialogBody-DnUjNEmB.js";import"./dialog-D9O7a7Fm.js";import"./Divider-CLJmmEDX.js";import"./FormControl-CBftJPGv.js";import"./InputLabel-BemZWnj2.js";import"./TooltipIcon-CvcUFsUW.js";import"./LegacyTooltip-3hRALyjK.js";import"./useLink-BDEcosNp.js";import"./useFocusable-K9RKW1xo.js";import"./useFocusRing-tD2j4ccM.js";import"./useEffectEvent-CUg9NzP8.js";import"./chain-BnPfELDY.js";import"./index-C_AqB298.js";import"./usePopper-BHsjRDQS.js";import"./index-P2pbIT9A.js";import"./Portal-10ds-kWa.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-DpnrngAE.js";import"./IconCheckMark-DjE8xlPN.js";import"./IconExclamationMarkCircle24-C6BOKAZO.js";import"./IconExclamationMarkTriangle-DYfoTdmg.js";import"./IconExclamationMarkTriangle24-z_nTLkhR.js";import"./IconQuestionMarkCircle-DVDkCeg5.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-yqG1DmvY.js";import"./Switch-COUJExrf.js";import"./TabItem-C8DEnH_5.js";import"./elements-BOYmskOL.js";import"./TextInput-DwAUnCKi.js";import"./IconCross-BKyvJ37_.js";import"./Tree-C-ulmRr-.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-Bfzzcqg5.js";import"./useClickOutside-DpjInTHt.js";import"./EnablePortalWrapper-BTQthFT8.js";const mt={title:"Utilities/Popper",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout](/docs/current_components-flyout--documentation) component instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,strategy:"absolute",withArrow:!1,arrowCustomColors:x},argTypes:{...g,withArrow:{control:{type:"boolean"}},arrowCustomColors:{description:'Color Styling for the popper arrow using tailwind classes and before prefix, example: "before:tw-border before:tw-border-line-x-strong before:tw-bg-base"',control:{type:"text"}},isDetached:{description:"if true, the popper container will detach from the Trigger position and act as a Dialog",control:{type:"boolean"}},verticalAlignment:{description:"if isDetached is set to true, verticalAlignment will position the Dialog either in the center of the viewport or on Top of the screen.",options:["top","centered"],control:{type:"radio"}}}},u=f=>{const[r,w]=s.useState(!1),n=s.useRef(null);return t.jsxs("div",{className:"tw-flex tw-justify-center",children:[t.jsx(h,{ref:n,onClick:()=>w(!r),children:"Hello"}),t.jsx(d,{...f,anchor:n,open:r,children:t.jsx(b,{className:"tw-bg-base tw-border tw-border-black tw-w-[400px]",children:t.jsx("p",{children:"Some content"})})})]})},e=u.bind({});e.args={enablePortal:!1};const o=u.bind({});o.args={enablePortal:!0};var p,a,i;e.parameters={...e.parameters,docs:{...(p=e.parameters)==null?void 0:p.docs,source:{originalSource:`args => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  return <div className="tw-flex tw-justify-center">
            <Button ref={anchorRef} onClick={() => setOpen(!open)}>
                Hello
            </Button>
            <Popper {...args} anchor={anchorRef} open={open}>
                <Box className="tw-bg-base tw-border tw-border-black tw-w-[400px]">
                    <p>Some content</p>
                </Box>
            </Popper>
        </div>;
}`,...(i=(a=e.parameters)==null?void 0:a.docs)==null?void 0:i.source}}};var c,l,m;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:`args => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  return <div className="tw-flex tw-justify-center">
            <Button ref={anchorRef} onClick={() => setOpen(!open)}>
                Hello
            </Button>
            <Popper {...args} anchor={anchorRef} open={open}>
                <Box className="tw-bg-base tw-border tw-border-black tw-w-[400px]">
                    <p>Some content</p>
                </Box>
            </Popper>
        </div>;
}`,...(m=(l=o.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};const dt=["Default","WithPortal"];export{e as Default,o as WithPortal,dt as __namedExportsOrder,mt as default};
