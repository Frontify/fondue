import{r as c,j as e}from"./iframe-CqMYqlgR.js";import{$ as l}from"./chain-B9Eo87tn.js";import{B as m}from"./Button-CYHT2AMY.js";import{F as d,b as x,a as f}from"./FormControl-DylzNNc3.js";import{T as b}from"./TextInput-B2n_17-q.js";import{a as i,S as a}from"./ScrollWrapper-CgvMs8qk.js";import"./preload-helper-BrHt6s3f.js";import"./useEffectEvent-D05mPwwN.js";import"./useButton-vGfdsb0j.js";import"./useFocusable-BZgzPKtn.js";import"./useFocusRing-CLIn77jc.js";import"./index-Cy9q-1wD.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./InputLabel-CS1iO4pu.js";import"./TooltipIcon-Z0eJr2D6.js";import"./LegacyTooltip-Co0qD5RC.js";import"./useLink-D7Pri6Nz.js";import"./usePopper-BK18999i.js";import"./index-Bjym0GCp.js";import"./Portal-BsHqlhbb.js";import"./useMemoizedId-DAyKmQUl.js";import"./IconCheckMark-BAMG8MDz.js";import"./IconExclamationMarkCircle24-ChMlYYeR.js";import"./IconExclamationMarkTriangle-3XRG4Ouh.js";import"./IconExclamationMarkTriangle24-DSIS2BTO.js";import"./IconQuestionMarkCircle-BxAoOfIQ.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-DxO-53u-.js";import"./IconCross-Csh70OY3.js";const M={title:"Components/ScrollWrapper",component:a,tags:["autodocs"],argTypes:{scrollShadows:{control:{type:"boolean"},defaultValue:!1},direction:{options:Object.values(i),control:{type:"select"},defaultValue:i.Vertical},tabindex:{control:{type:"number"},defaultValue:0}},args:{direction:i.Vertical,tabindex:0,"data-test-id":"custom-data-test-id",scrollShadows:!0},parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Scroll Area](/docs/current_components-text-scroll-area--documentation) instead."}}}},t=p=>{const[n,u]=c.useState("");return e.jsx("div",{className:"tw-max-h-[300px] tw-flex tw-flex-col",children:e.jsxs(a,{...p,children:[e.jsx("p",{className:"tw-w-[200px]",children:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor velit reiciendis nobis assumenda itaque tenetur ducimus quia qui! Tempore enim beatae est suscipit excepturi iure explicabo, fugiat perferendis consequatur."}),e.jsx("p",{className:"tw-w-[200px] ",children:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor velit reiciendis nobis assumenda itaque tenetur ducimus quia qui! Tempore enim beatae est suscipit excepturi iure explicabo, fugiat perferendis consequatur."}),e.jsx("p",{className:"tw-w-[200px]",children:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor velit reiciendis nobis assumenda itaque tenetur ducimus quia qui! Tempore enim beatae est suscipit excepturi iure explicabo, fugiat perferendis consequatur."}),e.jsx("div",{className:"tw-my-4",children:e.jsx(d,{style:f.Primary,direction:x.Vertical,label:{children:"Input Label",required:!1,htmlFor:l(),tooltip:{content:"Tooltip Text"}},children:e.jsx(b,{value:n,onChange:u})})}),e.jsx(m,{children:"Action"})]})})};t.__docgenInfo={description:"",methods:[],displayName:"Default"};var r,o,s;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`args => {
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
