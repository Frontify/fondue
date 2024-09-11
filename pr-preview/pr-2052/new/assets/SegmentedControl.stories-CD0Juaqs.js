import{j as e}from"./jsx-runtime-Nms4Y4qS.js";import{r as g,R as m}from"./index-BwDkhjyp.js";import{c as p}from"./fondue-icons324-_g5P3FDE.js";import{a as te}from"./chunk-454WOBUV-CM0pFb8Z.js";import{L as oe}from"./Label-DGO3QOB6.js";import{c as ne}from"./index-BWD2N0gV.js";import{P as y}from"./index-Brw_kfkv.js";import{c as $,R as re,I as se}from"./index-ImmjAmjo.js";import{c as ae}from"./index-DOnKqARA.js";import{u as G}from"./index-DGaPG0k3.js";import{u as le}from"./index-C8IlRUt1.js";import"./_commonjsHelpers-BosuxZz1.js";import"./v4-CQkTLCs1.js";import"./styleUtilities-BnElyh0X.js";import"./index-DxjWwZXO.js";import"./index-BCwfsm-V.js";import"./index-DduqEaLY.js";var ie="Toggle",H=g.forwardRef((t,s)=>{const{pressed:o,defaultPressed:n=!1,onPressedChange:r,...a}=t,[d=!1,l]=G({prop:o,onChange:r,defaultProp:n});return e.jsx(y.button,{type:"button","aria-pressed":d,"data-state":d?"on":"off","data-disabled":t.disabled?"":void 0,...a,ref:s,onClick:ae(t.onClick,()=>{t.disabled||l(!d)})})});H.displayName=ie;var h="ToggleGroup",[J,ke]=ne(h,[$]),K=$(),P=m.forwardRef((t,s)=>{const{type:o,...n}=t;if(o==="single"){const r=n;return e.jsx(de,{...r,ref:s})}if(o==="multiple"){const r=n;return e.jsx(ce,{...r,ref:s})}throw new Error(`Missing prop \`type\` expected on \`${h}\``)});P.displayName=h;var[Q,X]=J(h),de=m.forwardRef((t,s)=>{const{value:o,defaultValue:n,onValueChange:r=()=>{},...a}=t,[d,l]=G({prop:o,defaultProp:n,onChange:r});return e.jsx(Q,{scope:t.__scopeToggleGroup,type:"single",value:d?[d]:[],onItemActivate:l,onItemDeactivate:m.useCallback(()=>l(""),[l]),children:e.jsx(Y,{...a,ref:s})})}),ce=m.forwardRef((t,s)=>{const{value:o,defaultValue:n,onValueChange:r=()=>{},...a}=t,[d=[],l]=G({prop:o,defaultProp:n,onChange:r}),c=m.useCallback(I=>l((u=[])=>[...u,I]),[l]),v=m.useCallback(I=>l((u=[])=>u.filter(ee=>ee!==I)),[l]);return e.jsx(Q,{scope:t.__scopeToggleGroup,type:"multiple",value:d,onItemActivate:c,onItemDeactivate:v,children:e.jsx(Y,{...a,ref:s})})});P.displayName=h;var[me,ue]=J(h),Y=m.forwardRef((t,s)=>{const{__scopeToggleGroup:o,disabled:n=!1,rovingFocus:r=!0,orientation:a,dir:d,loop:l=!0,...c}=t,v=K(o),I=le(d),u={role:"group",dir:I,...c};return e.jsx(me,{scope:o,rovingFocus:r,disabled:n,children:r?e.jsx(re,{asChild:!0,...v,orientation:a,dir:I,loop:l,children:e.jsx(y.div,{...u,ref:s})}):e.jsx(y.div,{...u,ref:s})})}),T="ToggleGroupItem",Z=m.forwardRef((t,s)=>{const o=X(T,t.__scopeToggleGroup),n=ue(T,t.__scopeToggleGroup),r=K(t.__scopeToggleGroup),a=o.value.includes(t.value),d=n.disabled||t.disabled,l={...t,pressed:a,disabled:d},c=m.useRef(null);return n.rovingFocus?e.jsx(se,{asChild:!0,...r,focusable:!d,active:a,ref:c,children:e.jsx(w,{...l,ref:s})}):e.jsx(w,{...l,ref:s})});Z.displayName=T;var w=m.forwardRef((t,s)=>{const{__scopeToggleGroup:o,value:n,...r}=t,a=X(T,o),d={role:"radio","aria-checked":t.pressed,"aria-pressed":void 0},l=a.type==="single"?d:void 0;return e.jsx(H,{...l,...r,ref:s,onPressedChange:c=>{c?a.onItemActivate(n):a.onItemDeactivate(n)}})}),ge=P,pe=Z;const ve=({prop:t,defaultProp:s,onChange:o=()=>{}})=>{const[n,r]=Ie({defaultProp:s,onChange:o}),a=t!==void 0,d=a?t:n,l=g.useMemo(()=>o,[o]),c=g.useCallback(v=>{if(a){const u=typeof v=="function"?v(t):v;u!==t&&l(u)}else r(v)},[a,t,r,l]);return[d,c]},Ie=({defaultProp:t,onChange:s})=>{const o=g.useState(t),[n]=o,r=g.useRef(n),a=g.useMemo(()=>s,[s]);return g.useEffect(()=>{r.current!==n&&(a==null||a(n),r.current=n)},[n,r,a]),o},fe="_root_1b6uw_5",he="_item_1b6uw_25",Ce="_itemLabel_1b6uw_45",Se="_itemLabelActive_1b6uw_64",xe="_itemLabelInactive_1b6uw_87",je="_activeIndicator_1b6uw_111",be="_separator_1b6uw_202",f={root:fe,item:he,itemLabel:Ce,itemLabelActive:Se,itemLabelInactive:xe,activeIndicator:je,separator:be},_=({children:t,value:s,defaultValue:o,onValueChange:n,...r},a)=>{const[d,l]=ve({prop:s,defaultProp:o,onChange:n});return e.jsxs(ge,{ref:a,...r,className:f.root,onValueChange:c=>{c&&l(c)},value:d,type:"single",asChild:!1,"aria-disabled":r.disabled,children:[t,e.jsx("div",{className:f.activeIndicator})]})};_.displayName="SegmentedControl.Root";const R=({children:t,...s},o)=>e.jsxs(pe,{ref:o,...s,className:f.item,asChild:!1,children:[e.jsx("span",{className:f.separator}),e.jsxs("span",{className:f.itemLabel,children:[e.jsx("span",{className:f.itemLabelActive,children:t}),e.jsx("span",{className:f.itemLabelInactive,children:t})]})]});R.displayName="SegmentedControl.Item";const i={Root:g.forwardRef(_),Item:g.forwardRef(R)};_.__docgenInfo={description:"",methods:[],displayName:"SegmentedControl.Root",props:{id:{required:!1,tsType:{name:"string"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""},defaultValue:{required:!0,tsType:{name:"string"},description:`The default value of the segmented control
Used for uncontrolled components`},value:{required:!1,tsType:{name:"string"},description:"The controlled value of the segmented control"},onValueChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:"Event handler called when the value changes"},disabled:{required:!1,tsType:{name:"boolean"},description:`Disable the segmented control
@default false`}}};R.__docgenInfo={description:"",methods:[],displayName:"SegmentedControl.Item",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},value:{required:!0,tsType:{name:"string"},description:""}}};const Oe={title:"Components/Segmented Control",component:_,subcomponents:{"SegmentedControl.Item":R},tags:["autodocs"],parameters:{status:{type:"released"}},args:{defaultValue:"first",disabled:!1,onValueChange:te("onValueChange")},decorators:t=>e.jsx("div",{className:"tw-w-64",children:e.jsx(t,{})})},C={render:t=>e.jsxs(i.Root,{...t,children:[e.jsx(i.Item,{value:"first",children:"First"}),e.jsx(i.Item,{value:"second",children:"Second"}),e.jsx(i.Item,{value:"third",children:"Third"})]})},S={render:t=>e.jsxs(i.Root,{...t,children:[e.jsx(i.Item,{value:"first",children:e.jsx(p,{size:20})}),e.jsx(i.Item,{value:"second",children:e.jsx(p,{size:20})}),e.jsx(i.Item,{value:"third",children:e.jsx(p,{size:20})})]})},x={render:t=>e.jsxs(i.Root,{...t,children:[e.jsxs(i.Item,{value:"first",children:[e.jsx(p,{size:20}),"First"]}),e.jsxs(i.Item,{value:"second",children:[e.jsx(p,{size:20}),"Second"]}),e.jsxs(i.Item,{value:"third",children:[e.jsx(p,{size:20}),"Third"]})]})},j={render:t=>e.jsxs(i.Root,{...t,disabled:!0,children:[e.jsxs(i.Item,{value:"first",children:[e.jsx(p,{size:20}),"First"]}),e.jsxs(i.Item,{value:"second",children:[e.jsx(p,{size:20}),"Second"]}),e.jsxs(i.Item,{value:"third",children:[e.jsx(p,{size:20}),"Third"]})]})},b={render:t=>e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2",children:[e.jsx(oe,{htmlFor:"segmented-control",children:"Segmented Control"}),e.jsxs(i.Root,{...t,id:"segmented-control",children:[e.jsx(i.Item,{value:"first",children:"First"}),e.jsx(i.Item,{value:"second",children:"Second"}),e.jsx(i.Item,{value:"third",children:"Third"})]})]})};var N,L,z;C.parameters={...C.parameters,docs:{...(N=C.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: args => <SegmentedControl.Root {...args}>
            <SegmentedControl.Item value="first">First</SegmentedControl.Item>
            <SegmentedControl.Item value="second">Second</SegmentedControl.Item>
            <SegmentedControl.Item value="third">Third</SegmentedControl.Item>
        </SegmentedControl.Root>
}`,...(z=(L=C.parameters)==null?void 0:L.docs)==null?void 0:z.source}}};var F,V,A;S.parameters={...S.parameters,docs:{...(F=S.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: args => <SegmentedControl.Root {...args}>
            <SegmentedControl.Item value="first">
                <IconIcon size={20} />
            </SegmentedControl.Item>
            <SegmentedControl.Item value="second">
                <IconIcon size={20} />
            </SegmentedControl.Item>
            <SegmentedControl.Item value="third">
                <IconIcon size={20} />
            </SegmentedControl.Item>
        </SegmentedControl.Root>
}`,...(A=(V=S.parameters)==null?void 0:V.docs)==null?void 0:A.source}}};var E,M,q;x.parameters={...x.parameters,docs:{...(E=x.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: args => <SegmentedControl.Root {...args}>
            <SegmentedControl.Item value="first">
                <IconIcon size={20} />
                First
            </SegmentedControl.Item>
            <SegmentedControl.Item value="second">
                <IconIcon size={20} />
                Second
            </SegmentedControl.Item>
            <SegmentedControl.Item value="third">
                <IconIcon size={20} />
                Third
            </SegmentedControl.Item>
        </SegmentedControl.Root>
}`,...(q=(M=x.parameters)==null?void 0:M.docs)==null?void 0:q.source}}};var D,k,O;j.parameters={...j.parameters,docs:{...(D=j.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: args => <SegmentedControl.Root {...args} disabled>
            <SegmentedControl.Item value="first">
                <IconIcon size={20} />
                First
            </SegmentedControl.Item>
            <SegmentedControl.Item value="second">
                <IconIcon size={20} />
                Second
            </SegmentedControl.Item>
            <SegmentedControl.Item value="third">
                <IconIcon size={20} />
                Third
            </SegmentedControl.Item>
        </SegmentedControl.Root>
}`,...(O=(k=j.parameters)==null?void 0:k.docs)==null?void 0:O.source}}};var U,B,W;b.parameters={...b.parameters,docs:{...(U=b.parameters)==null?void 0:U.docs,source:{originalSource:`{
  render: args => {
    return <div className="tw-flex tw-flex-col tw-gap-2">
                <Label htmlFor="segmented-control">Segmented Control</Label>

                <SegmentedControl.Root {...args} id="segmented-control">
                    <SegmentedControl.Item value="first">First</SegmentedControl.Item>
                    <SegmentedControl.Item value="second">Second</SegmentedControl.Item>
                    <SegmentedControl.Item value="third">Third</SegmentedControl.Item>
                </SegmentedControl.Root>
            </div>;
  }
}`,...(W=(B=b.parameters)==null?void 0:B.docs)==null?void 0:W.source}}};const Ue=["TextOnly","IconOnly","IconAndText","Disabled","WithLabel"];export{j as Disabled,x as IconAndText,S as IconOnly,C as TextOnly,b as WithLabel,Ue as __namedExportsOrder,Oe as default};
