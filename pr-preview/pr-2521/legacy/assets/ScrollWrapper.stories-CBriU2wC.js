import{r as c,j as e}from"./iframe-B1NH0d8E.js";import{$ as l}from"./chain-CDNEhT9V.js";import{B as m}from"./Button-CjOUnz39.js";import{F as d,b as x,a as f}from"./FormControl-DKa4d7cu.js";import{T as b}from"./TextInput-CwXX9Bla.js";import{a as i,S as a}from"./ScrollWrapper-CUzHe53B.js";import"./preload-helper-CxFeC-BG.js";import"./useEffectEvent-Cuuo5Go7.js";import"./useButton-CXaNqm_z.js";import"./useFocusable-DP6unWF8.js";import"./useFocusRing-rvuW17v-.js";import"./index-NnVgL01k.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./InputLabel-DK0GeTMZ.js";import"./TooltipIcon-CaQbfCOt.js";import"./LegacyTooltip-DWKf2bEz.js";import"./useLink-DGFVcWby.js";import"./usePopper-jtv-PNE8.js";import"./index-C7tiHcAr.js";import"./Portal-CySXwQ73.js";import"./useMemoizedId-B10bANt6.js";import"./IconCheckMark-Az9s2S0p.js";import"./IconExclamationMarkCircle24-Bbl11HkU.js";import"./IconExclamationMarkTriangle-BR7mnz4z.js";import"./IconExclamationMarkTriangle24-DoKVx44R.js";import"./IconQuestionMarkCircle-DdcULYxs.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-DgTICg-p.js";import"./IconCross-CS9vqEH5.js";const M={title:"Components/ScrollWrapper",component:a,tags:["autodocs"],argTypes:{scrollShadows:{control:{type:"boolean"},defaultValue:!1},direction:{options:Object.values(i),control:{type:"select"},defaultValue:i.Vertical},tabindex:{control:{type:"number"},defaultValue:0}},args:{direction:i.Vertical,tabindex:0,"data-test-id":"custom-data-test-id",scrollShadows:!0},parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Scroll Area](/docs/current_components-text-scroll-area--documentation) instead."}}}},t=p=>{const[n,u]=c.useState("");return e.jsx("div",{className:"tw-max-h-[300px] tw-flex tw-flex-col",children:e.jsxs(a,{...p,children:[e.jsx("p",{className:"tw-w-[200px]",children:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor velit reiciendis nobis assumenda itaque tenetur ducimus quia qui! Tempore enim beatae est suscipit excepturi iure explicabo, fugiat perferendis consequatur."}),e.jsx("p",{className:"tw-w-[200px] ",children:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor velit reiciendis nobis assumenda itaque tenetur ducimus quia qui! Tempore enim beatae est suscipit excepturi iure explicabo, fugiat perferendis consequatur."}),e.jsx("p",{className:"tw-w-[200px]",children:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor velit reiciendis nobis assumenda itaque tenetur ducimus quia qui! Tempore enim beatae est suscipit excepturi iure explicabo, fugiat perferendis consequatur."}),e.jsx("div",{className:"tw-my-4",children:e.jsx(d,{style:f.Primary,direction:x.Vertical,label:{children:"Input Label",required:!1,htmlFor:l(),tooltip:{content:"Tooltip Text"}},children:e.jsx(b,{value:n,onChange:u})})}),e.jsx(m,{children:"Action"})]})})};t.__docgenInfo={description:"",methods:[],displayName:"Default"};var r,o,s;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`args => {
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
