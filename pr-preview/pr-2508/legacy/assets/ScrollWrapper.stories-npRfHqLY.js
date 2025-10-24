import{r as c,j as e}from"./iframe-G9JT5kV6.js";import{$ as l}from"./chain-Dq4AkA76.js";import{B as m}from"./Button-Bab7Gocy.js";import{F as d,b as x,a as f}from"./FormControl-Cp0g-HlA.js";import{T as b}from"./TextInput-CZsf1API.js";import{a as i,S as a}from"./ScrollWrapper-C__xVQGt.js";import"./preload-helper-BT-T7auE.js";import"./useEffectEvent-BtkyKS4G.js";import"./useButton-DRJTCrJS.js";import"./useFocusable-_OrUWNR5.js";import"./useFocusRing-nqJc486L.js";import"./index-ixDem6kg.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./InputLabel-TK4YHNFL.js";import"./TooltipIcon-D4kwX34e.js";import"./LegacyTooltip-Dp6OP9ku.js";import"./useLink-CXoGfmc2.js";import"./usePopper-CO8wOoTT.js";import"./index-BIhVL1ld.js";import"./Portal-BaI4ybdx.js";import"./useMemoizedId-TQZvyQJc.js";import"./IconCheckMark-BSYvEIzf.js";import"./IconExclamationMarkCircle24-Yrdvbpyd.js";import"./IconExclamationMarkTriangle-DVD-it4x.js";import"./IconExclamationMarkTriangle24-DCgtctLG.js";import"./IconQuestionMarkCircle-COwcdCLG.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-BnxRTcOc.js";import"./IconCross-Bqxox6ZH.js";const M={title:"Components/ScrollWrapper",component:a,tags:["autodocs"],argTypes:{scrollShadows:{control:{type:"boolean"},defaultValue:!1},direction:{options:Object.values(i),control:{type:"select"},defaultValue:i.Vertical},tabindex:{control:{type:"number"},defaultValue:0}},args:{direction:i.Vertical,tabindex:0,"data-test-id":"custom-data-test-id",scrollShadows:!0},parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Scroll Area](/docs/current_components-text-scroll-area--documentation) instead."}}}},t=p=>{const[n,u]=c.useState("");return e.jsx("div",{className:"tw-max-h-[300px] tw-flex tw-flex-col",children:e.jsxs(a,{...p,children:[e.jsx("p",{className:"tw-w-[200px]",children:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor velit reiciendis nobis assumenda itaque tenetur ducimus quia qui! Tempore enim beatae est suscipit excepturi iure explicabo, fugiat perferendis consequatur."}),e.jsx("p",{className:"tw-w-[200px] ",children:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor velit reiciendis nobis assumenda itaque tenetur ducimus quia qui! Tempore enim beatae est suscipit excepturi iure explicabo, fugiat perferendis consequatur."}),e.jsx("p",{className:"tw-w-[200px]",children:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor velit reiciendis nobis assumenda itaque tenetur ducimus quia qui! Tempore enim beatae est suscipit excepturi iure explicabo, fugiat perferendis consequatur."}),e.jsx("div",{className:"tw-my-4",children:e.jsx(d,{style:f.Primary,direction:x.Vertical,label:{children:"Input Label",required:!1,htmlFor:l(),tooltip:{content:"Tooltip Text"}},children:e.jsx(b,{value:n,onChange:u})})}),e.jsx(m,{children:"Action"})]})})};t.__docgenInfo={description:"",methods:[],displayName:"Default"};var r,o,s;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`args => {
  const [input, setInput] = useState('');
  return <div className="tw-max-h-[300px] tw-flex tw-flex-col">
            <ScrollWrapper {...args}>
                <p className="tw-w-[200px]">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor velit reiciendis nobis assumenda
                    itaque tenetur ducimus quia qui! Tempore enim beatae est suscipit excepturi iure explicabo, fugiat
                    perferendis consequatur.
                </p>
                <p className="tw-w-[200px] ">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor velit reiciendis nobis assumenda
                    itaque tenetur ducimus quia qui! Tempore enim beatae est suscipit excepturi iure explicabo, fugiat
                    perferendis consequatur.
                </p>
                <p className="tw-w-[200px]">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor velit reiciendis nobis assumenda
                    itaque tenetur ducimus quia qui! Tempore enim beatae est suscipit excepturi iure explicabo, fugiat
                    perferendis consequatur.
                </p>
                <div className="tw-my-4">
                    <FormControl style={FormControlStyle.Primary} direction={FormControlDirection.Vertical} label={{
          children: 'Input Label',
          required: false,
          htmlFor: useId(),
          tooltip: {
            content: 'Tooltip Text'
          }
        }}>
                        <TextInput value={input} onChange={setInput} />
                    </FormControl>
                </div>
                <Button>Action</Button>
            </ScrollWrapper>
        </div>;
}`,...(s=(o=t.parameters)==null?void 0:o.docs)==null?void 0:s.source}}};const Q=["Default"];export{t as Default,Q as __namedExportsOrder,M as default};
