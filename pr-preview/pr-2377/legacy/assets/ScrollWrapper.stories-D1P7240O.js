import{j as e}from"./jsx-runtime-DF2Pcvd1.js";import{c as u}from"./Button-B03MOMoD.js";import{F as l,b as m,a as d}from"./FormControl-VeeO6oFR.js";import{T as x}from"./TextInput-CMhZqw9a.js";import{$ as f}from"./chain-z5L_5vtA.js";import{r as b}from"./index-B2-qRKKC.js";import{S as i,a}from"./ScrollWrapper-BRXVXsWJ.js";import"./useButton-BrS_O84a.js";import"./useFocusable-ChjCOJSh.js";import"./useFocusRing-BL9DkcEN.js";import"./useEffectEvent-BOE4tD14.js";import"./index-CFX93qP1.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-BtNTXUM4.js";import"./merge-DI-veSMP.js";import"./InputLabel-w6niovgZ.js";import"./TooltipIcon-CF3uJZkE.js";import"./LegacyTooltip-B35WBZfv.js";import"./useLink-CzmlOd4E.js";import"./usePopper-jmXS5rjc.js";import"./index-DlnOb27V.js";import"./Portal-CuQPhhwF.js";import"./useMemoizedId-BB39KVn8.js";import"./IconCheckMark-Db5JnUcj.js";import"./IconExclamationMarkCircle24-DMv0ETG3.js";import"./IconExclamationMarkTriangle-BrhtYKnY.js";import"./IconExclamationMarkTriangle24-DvJpj6jb.js";import"./IconQuestionMarkCircle-DkhS77IB.js";import"./validation-CJXPAjNB.js";import"./LoadingCircle-DyxURJrK.js";import"./IconCross-DWAMoEGy.js";const Q={title:"Components/ScrollWrapper",component:a,tags:["autodocs"],argTypes:{scrollShadows:{control:{type:"boolean"},defaultValue:!1},direction:{options:Object.values(i),control:{type:"select"},defaultValue:i.Vertical},tabindex:{control:{type:"number"},defaultValue:0}},args:{direction:i.Vertical,tabindex:0,"data-test-id":"custom-data-test-id",scrollShadows:!0},parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Scroll Area](/docs/current_components-text-scroll-area--documentation) instead."}}}},t=p=>{const[n,c]=b.useState("");return e.jsx("div",{className:"tw-max-h-[300px] tw-flex tw-flex-col",children:e.jsxs(a,{...p,children:[e.jsx("p",{className:"tw-w-[200px]",children:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor velit reiciendis nobis assumenda itaque tenetur ducimus quia qui! Tempore enim beatae est suscipit excepturi iure explicabo, fugiat perferendis consequatur."}),e.jsx("p",{className:"tw-w-[200px] ",children:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor velit reiciendis nobis assumenda itaque tenetur ducimus quia qui! Tempore enim beatae est suscipit excepturi iure explicabo, fugiat perferendis consequatur."}),e.jsx("p",{className:"tw-w-[200px]",children:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor velit reiciendis nobis assumenda itaque tenetur ducimus quia qui! Tempore enim beatae est suscipit excepturi iure explicabo, fugiat perferendis consequatur."}),e.jsx("div",{className:"tw-my-4",children:e.jsx(l,{style:d.Primary,direction:m.Vertical,label:{children:"Input Label",required:!1,htmlFor:f(),tooltip:{content:"Tooltip Text"}},children:e.jsx(x,{value:n,onChange:c})})}),e.jsx(u,{children:"Action"})]})})};t.__docgenInfo={description:"",methods:[],displayName:"Default"};var r,o,s;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`args => {
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
}`,...(s=(o=t.parameters)==null?void 0:o.docs)==null?void 0:s.source}}};const U=["Default"];export{t as Default,U as __namedExportsOrder,Q as default};
