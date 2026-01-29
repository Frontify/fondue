import{j as e}from"./iframe-BpVoFxtH.js";import{m as b}from"./proxy-Belao1Vj.js";import{A as u}from"./index-BAt-iNcn.js";import"./preload-helper-D9dL-qgt.js";const o=({children:t,isOpen:c=!1,preventInitialAnimation:m=!1,animateOpacity:h=!0,"data-test-id":w="collapsible-wrap"})=>e.jsx(u,{initial:m?!1:void 0,children:c&&t?e.jsx(b.div,{initial:"collapsed",animate:"open",exit:"collapsed",variants:{open:{height:"auto",overflow:"hidden",opacity:1,transitionEnd:{overflow:"visible"}},collapsed:{height:0,overflow:"hidden",opacity:h?0:1}},transition:{type:"tween"},"data-test-id":w,children:t}):null});o.displayName="FondueCollapsibleWrap";o.__docgenInfo={description:"@deprecated Use `Accordion` from `@frontify/fondue/components` instead.",methods:[],displayName:"FondueCollapsibleWrap",props:{isOpen:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},preventInitialAnimation:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},animateOpacity:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'collapsible-wrap'",computed:!1}}}};const C={title:"Legacy Components/Deprecated/Collapsible Wrap",component:o,tags:["autodocs"],args:{isOpen:!0,animateOpacity:!0},parameters:{status:{type:"deprecated"},docs:{description:{component:`### *Legacy component warning*
#### This is a deprecated component. It will be removed in the next major version.
#### _**Use the [new Accordion component](/docs/current_components-accordion--documentation) instead.**_`}}}},a=t=>e.jsx("div",{className:"tw-border tw-border-black-10 tw-rounded-md",children:e.jsxs("div",{className:"tw-divide-y tw-divide-black-10",children:[e.jsx("div",{className:"tw-p-3",children:e.jsx("h2",{children:"Collapsible Wrap"})}),e.jsx(o,{...t,children:e.jsxs("div",{className:"tw-h-[200px] tw-p-5 tw-bg-black-5 tw-flex tw-justify-center tw-items-center tw-flex-col",children:[e.jsx("p",{children:"I am the child content of the Collapsible Wrap Component."}),e.jsx("p",{children:"Toggle the open state to hide me."})]})})]})}),i=t=>e.jsx("div",{className:"tw-border tw-border-black-10 tw-rounded-md",children:e.jsxs("div",{className:"tw-divide-y tw-divide-black-10",children:[e.jsx("div",{className:"tw-p-3",children:e.jsx("h2",{children:"Collapsible Wrap Without First Animation"})}),e.jsx(o,{...t,preventInitialAnimation:!0,children:e.jsxs("div",{className:"tw-h-[200px] tw-p-5 tw-bg-black-5 tw-flex tw-justify-center tw-items-center tw-flex-col",children:[e.jsx("p",{children:"I am the child content of the Collapsible Wrap Component."}),e.jsx("p",{children:"Toggle the open state to hide me."})]})})]})});a.__docgenInfo={description:"",methods:[],displayName:"CollapsibleWrap"};i.__docgenInfo={description:"",methods:[],displayName:"CollapsibleWrapNoStartingAnimation"};var n,s,l;a.parameters={...a.parameters,docs:{...(n=a.parameters)==null?void 0:n.docs,source:{originalSource:`args => <div className="tw-border tw-border-black-10 tw-rounded-md">
        <div className="tw-divide-y tw-divide-black-10">
            <div className="tw-p-3">
                <h2>Collapsible Wrap</h2>
            </div>
            <CollapsibleWrapComponent {...args}>
                <div className="tw-h-[200px] tw-p-5 tw-bg-black-5 tw-flex tw-justify-center tw-items-center tw-flex-col">
                    <p>I am the child content of the Collapsible Wrap Component.</p>
                    <p>Toggle the open state to hide me.</p>
                </div>
            </CollapsibleWrapComponent>
        </div>
    </div>`,...(l=(s=a.parameters)==null?void 0:s.docs)==null?void 0:l.source}}};var r,d,p;i.parameters={...i.parameters,docs:{...(r=i.parameters)==null?void 0:r.docs,source:{originalSource:`args => <div className="tw-border tw-border-black-10 tw-rounded-md">
        <div className="tw-divide-y tw-divide-black-10">
            <div className="tw-p-3">
                <h2>Collapsible Wrap Without First Animation</h2>
            </div>
            <CollapsibleWrapComponent {...args} preventInitialAnimation>
                <div className="tw-h-[200px] tw-p-5 tw-bg-black-5 tw-flex tw-justify-center tw-items-center tw-flex-col">
                    <p>I am the child content of the Collapsible Wrap Component.</p>
                    <p>Toggle the open state to hide me.</p>
                </div>
            </CollapsibleWrapComponent>
        </div>
    </div>`,...(p=(d=i.parameters)==null?void 0:d.docs)==null?void 0:p.source}}};const y=["CollapsibleWrap","CollapsibleWrapNoStartingAnimation"];export{a as CollapsibleWrap,i as CollapsibleWrapNoStartingAnimation,y as __namedExportsOrder,C as default};
