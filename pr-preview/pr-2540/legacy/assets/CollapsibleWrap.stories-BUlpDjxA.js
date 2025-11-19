import{j as e}from"./iframe-BRudlSFq.js";import{H as m}from"./Heading-Bzrgf5KV.js";import{T as l}from"./Text-B-QefaUA.js";import{A as f}from"./index-C49U94TP.js";import{m as v}from"./proxy-Tf77dRs7.js";import"./preload-helper-3V9JWH0H.js";import"./merge-DI-veSMP.js";import"./records-DFIz8BfL.js";const o=({children:t,isOpen:w=!1,preventInitialAnimation:b=!1,animateOpacity:h=!0,"data-test-id":u="collapsible-wrap"})=>e.jsx(f,{initial:b?!1:void 0,children:w&&t?e.jsx(v.div,{initial:"collapsed",animate:"open",exit:"collapsed",variants:{open:{height:"auto",overflow:"hidden",opacity:1,transitionEnd:{overflow:"visible"}},collapsed:{height:0,overflow:"hidden",opacity:h?0:1}},transition:{type:"tween"},"data-test-id":u,children:t}):null});o.displayName="FondueCollapsibleWrap";o.__docgenInfo={description:"@deprecated Use `Accordion` from `@frontify/fondue/components` instead.",methods:[],displayName:"FondueCollapsibleWrap",props:{isOpen:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},preventInitialAnimation:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},animateOpacity:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'collapsible-wrap'",computed:!1}}}};const k={title:"Legacy Components/Collapsible Wrap",component:o,tags:["autodocs"],args:{isOpen:!0,animateOpacity:!0},parameters:{docs:{description:{component:`### *Legacy component warning*
#### This is a unmaintained legacy component. It will be deprecated and replaced with a new component in an upcoming release.`}}}},a=t=>e.jsx("div",{className:"tw-border tw-border-black-10 tw-rounded-md",children:e.jsxs("div",{className:"tw-divide-y tw-divide-black-10",children:[e.jsx("div",{className:"tw-p-3",children:e.jsx(m,{children:"Collapsible Wrap"})}),e.jsx(o,{...t,children:e.jsxs("div",{className:"tw-h-[200px] tw-p-5 tw-bg-black-5 tw-flex tw-justify-center tw-items-center tw-flex-col",children:[e.jsx(l,{children:"I am the child content of the Collapsible Wrap Component."}),e.jsx(l,{children:"Toggle the open state to hide me."})]})})]})}),i=t=>e.jsx("div",{className:"tw-border tw-border-black-10 tw-rounded-md",children:e.jsxs("div",{className:"tw-divide-y tw-divide-black-10",children:[e.jsx("div",{className:"tw-p-3",children:e.jsx(m,{children:"Collapsible Wrap Without First Animation"})}),e.jsx(o,{...t,preventInitialAnimation:!0,children:e.jsxs("div",{className:"tw-h-[200px] tw-p-5 tw-bg-black-5 tw-flex tw-justify-center tw-items-center tw-flex-col",children:[e.jsx(l,{children:"I am the child content of the Collapsible Wrap Component."}),e.jsx(l,{children:"Toggle the open state to hide me."})]})})]})});a.__docgenInfo={description:"",methods:[],displayName:"CollapsibleWrap"};i.__docgenInfo={description:"",methods:[],displayName:"CollapsibleWrapNoStartingAnimation"};var n,s,r;a.parameters={...a.parameters,docs:{...(n=a.parameters)==null?void 0:n.docs,source:{originalSource:`args => <div className="tw-border tw-border-black-10 tw-rounded-md">
        <div className="tw-divide-y tw-divide-black-10">
            <div className="tw-p-3">
                <Heading>Collapsible Wrap</Heading>
            </div>
            <CollapsibleWrapComponent {...args}>
                <div className="tw-h-[200px] tw-p-5 tw-bg-black-5 tw-flex tw-justify-center tw-items-center tw-flex-col">
                    <Text>I am the child content of the Collapsible Wrap Component.</Text>
                    <Text>Toggle the open state to hide me.</Text>
                </div>
            </CollapsibleWrapComponent>
        </div>
    </div>`,...(r=(s=a.parameters)==null?void 0:s.docs)==null?void 0:r.source}}};var d,p,c;i.parameters={...i.parameters,docs:{...(d=i.parameters)==null?void 0:d.docs,source:{originalSource:`args => <div className="tw-border tw-border-black-10 tw-rounded-md">
        <div className="tw-divide-y tw-divide-black-10">
            <div className="tw-p-3">
                <Heading>Collapsible Wrap Without First Animation</Heading>
            </div>
            <CollapsibleWrapComponent {...args} preventInitialAnimation>
                <div className="tw-h-[200px] tw-p-5 tw-bg-black-5 tw-flex tw-justify-center tw-items-center tw-flex-col">
                    <Text>I am the child content of the Collapsible Wrap Component.</Text>
                    <Text>Toggle the open state to hide me.</Text>
                </div>
            </CollapsibleWrapComponent>
        </div>
    </div>`,...(c=(p=i.parameters)==null?void 0:p.docs)==null?void 0:c.source}}};const A=["CollapsibleWrap","CollapsibleWrapNoStartingAnimation"];export{a as CollapsibleWrap,i as CollapsibleWrapNoStartingAnimation,A as __namedExportsOrder,k as default};
