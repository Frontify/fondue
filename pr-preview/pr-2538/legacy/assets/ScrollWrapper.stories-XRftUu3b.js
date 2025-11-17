import{r as c,j as e}from"./iframe-B6wMFBmr.js";import{$ as l}from"./chain-DULsJ5c3.js";import{B as m}from"./Button-BAqzJ5Pv.js";import{F as d,b as x,a as f}from"./FormControl-BerGKFeK.js";import{T as b}from"./TextInput-tcJ9GSxD.js";import{a as i,S as a}from"./ScrollWrapper-CNsm8uUk.js";import"./preload-helper-B3RP-zrM.js";import"./useEffectEvent-CikN4lv1.js";import"./useButton-DD58yLyN.js";import"./useFocusable-k5y2-4wJ.js";import"./useFocusRing-CGF_IT6k.js";import"./index-BEaJUMGy.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./InputLabel-QH3KoYmW.js";import"./TooltipIcon-W-6H6r9U.js";import"./LegacyTooltip-BCilkNdt.js";import"./useLink-DkTIgE5u.js";import"./usePopper-0MaFEurT.js";import"./index-8VFt0Zma.js";import"./Portal-nAgA0YlW.js";import"./useMemoizedId-DnKqk2fp.js";import"./IconCheckMark-DBwBkYZ5.js";import"./IconExclamationMarkCircle24-DoWZywMv.js";import"./IconExclamationMarkTriangle-BYVM_8KN.js";import"./IconExclamationMarkTriangle24-CQVhFF9W.js";import"./IconQuestionMarkCircle-I-XoRTAy.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-CGnUCcrv.js";import"./IconCross-YTa4RDxM.js";const M={title:"Components/ScrollWrapper",component:a,tags:["autodocs"],argTypes:{scrollShadows:{control:{type:"boolean"},defaultValue:!1},direction:{options:Object.values(i),control:{type:"select"},defaultValue:i.Vertical},tabindex:{control:{type:"number"},defaultValue:0}},args:{direction:i.Vertical,tabindex:0,"data-test-id":"custom-data-test-id",scrollShadows:!0},parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Scroll Area](/docs/current_components-text-scroll-area--documentation) instead."}}}},t=p=>{const[n,u]=c.useState("");return e.jsx("div",{className:"tw-max-h-[300px] tw-flex tw-flex-col",children:e.jsxs(a,{...p,children:[e.jsx("p",{className:"tw-w-[200px]",children:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor velit reiciendis nobis assumenda itaque tenetur ducimus quia qui! Tempore enim beatae est suscipit excepturi iure explicabo, fugiat perferendis consequatur."}),e.jsx("p",{className:"tw-w-[200px] ",children:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor velit reiciendis nobis assumenda itaque tenetur ducimus quia qui! Tempore enim beatae est suscipit excepturi iure explicabo, fugiat perferendis consequatur."}),e.jsx("p",{className:"tw-w-[200px]",children:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor velit reiciendis nobis assumenda itaque tenetur ducimus quia qui! Tempore enim beatae est suscipit excepturi iure explicabo, fugiat perferendis consequatur."}),e.jsx("div",{className:"tw-my-4",children:e.jsx(d,{style:f.Primary,direction:x.Vertical,label:{children:"Input Label",required:!1,htmlFor:l(),tooltip:{content:"Tooltip Text"}},children:e.jsx(b,{value:n,onChange:u})})}),e.jsx(m,{children:"Action"})]})})};t.__docgenInfo={description:"",methods:[],displayName:"Default"};var r,o,s;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`args => {
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
