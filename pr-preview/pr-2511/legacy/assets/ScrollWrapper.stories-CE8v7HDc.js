import{r as c,j as e}from"./iframe-DWfSlb0i.js";import{$ as l}from"./chain-BD6ckHh_.js";import{B as m}from"./Button-DfZJCDFK.js";import{F as d,b as x,a as f}from"./FormControl-ny2reeax.js";import{T as b}from"./TextInput-_VQAd_TX.js";import{a as i,S as a}from"./ScrollWrapper-TmG7nafq.js";import"./preload-helper-sQDyWCwb.js";import"./useEffectEvent-CI6MWEdz.js";import"./useButton-kVvP6TUN.js";import"./useFocusable-DOCSmQza.js";import"./useFocusRing-DXr4GaW4.js";import"./index-RS2pu7zh.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./InputLabel-vAeK8DpM.js";import"./TooltipIcon-loeESxcb.js";import"./LegacyTooltip-8KnSS8qw.js";import"./useLink-DD_m4zw3.js";import"./usePopper-DE0FsvRn.js";import"./index-C2E5ku4L.js";import"./Portal--5uNvX5p.js";import"./useMemoizedId-D3p_iY0w.js";import"./IconCheckMark-CWf5DU7H.js";import"./IconExclamationMarkCircle24-CzamvZqc.js";import"./IconExclamationMarkTriangle-BTKn1CzC.js";import"./IconExclamationMarkTriangle24-BF-tkgi1.js";import"./IconQuestionMarkCircle-BhvUbj5E.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-C5zj3N-A.js";import"./IconCross-BkSH3053.js";const M={title:"Components/ScrollWrapper",component:a,tags:["autodocs"],argTypes:{scrollShadows:{control:{type:"boolean"},defaultValue:!1},direction:{options:Object.values(i),control:{type:"select"},defaultValue:i.Vertical},tabindex:{control:{type:"number"},defaultValue:0}},args:{direction:i.Vertical,tabindex:0,"data-test-id":"custom-data-test-id",scrollShadows:!0},parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Scroll Area](/docs/current_components-text-scroll-area--documentation) instead."}}}},t=p=>{const[n,u]=c.useState("");return e.jsx("div",{className:"tw-max-h-[300px] tw-flex tw-flex-col",children:e.jsxs(a,{...p,children:[e.jsx("p",{className:"tw-w-[200px]",children:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor velit reiciendis nobis assumenda itaque tenetur ducimus quia qui! Tempore enim beatae est suscipit excepturi iure explicabo, fugiat perferendis consequatur."}),e.jsx("p",{className:"tw-w-[200px] ",children:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor velit reiciendis nobis assumenda itaque tenetur ducimus quia qui! Tempore enim beatae est suscipit excepturi iure explicabo, fugiat perferendis consequatur."}),e.jsx("p",{className:"tw-w-[200px]",children:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor velit reiciendis nobis assumenda itaque tenetur ducimus quia qui! Tempore enim beatae est suscipit excepturi iure explicabo, fugiat perferendis consequatur."}),e.jsx("div",{className:"tw-my-4",children:e.jsx(d,{style:f.Primary,direction:x.Vertical,label:{children:"Input Label",required:!1,htmlFor:l(),tooltip:{content:"Tooltip Text"}},children:e.jsx(b,{value:n,onChange:u})})}),e.jsx(m,{children:"Action"})]})})};t.__docgenInfo={description:"",methods:[],displayName:"Default"};var r,o,s;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`args => {
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
