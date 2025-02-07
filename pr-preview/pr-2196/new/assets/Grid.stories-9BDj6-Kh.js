import{j as e}from"./jsx-runtime-BSxFkHFN.js";import{B as w,D as C}from"./Box-BBCocSiH.js";import{r as N}from"./index-i66itsuO.js";import{p as E}from"./propsToCssVariables-DVyyXmoh.js";import"./_commonjsHelpers-Cpj98o6Y.js";const S="_root_umks5_5",V={root:S},s=N.forwardRef(({as:a="div","data-test-id":v="fondue-grid",children:D,role:B,"aria-label":f,"aria-hidden":g,"aria-describedby":h,"aria-labelledby":G,"aria-expanded":b,"aria-haspopup":y,..._},R)=>e.jsx(a,{className:V.root,"data-test-id":v,style:E(_,{justify:"justify-items"}),role:B,"aria-label":f,"aria-hidden":g,"aria-describedby":h,"aria-labelledby":G,"aria-expanded":b,"aria-haspopup":y,ref:R,children:D}));s.displayName="Grid";s.__docgenInfo={description:"",methods:[],displayName:"Grid",props:{as:{defaultValue:{value:"'div'",computed:!1},required:!1},"data-test-id":{defaultValue:{value:"'fondue-grid'",computed:!1},required:!1}}};const r=a=>e.jsx(w,{width:"100px",height:"100px",...a,children:e.jsx(C,{})});r.displayName="DecorativeBox";const I={title:"Layout/Grid",component:s,tags:["autodocs"],parameters:{status:{type:"released"}},args:{columns:"repeat(3, 1fr)",gap:4}},o={render:a=>e.jsxs(s,{...a,children:[e.jsx(r,{}),e.jsx(r,{}),e.jsx(r,{}),e.jsx(r,{}),e.jsx(r,{}),e.jsx(r,{})]})},t={render:a=>e.jsxs(s,{...a,children:[e.jsx(r,{}),e.jsx(r,{}),e.jsx(r,{}),e.jsx(r,{}),e.jsx(r,{}),e.jsx(r,{}),e.jsx(r,{}),e.jsx(r,{}),e.jsx(r,{}),e.jsx(r,{}),e.jsx(r,{}),e.jsx(r,{})]}),args:{columns:3}},n={render:a=>e.jsxs(s,{...a,children:[e.jsx(r,{}),e.jsx(r,{}),e.jsx(r,{}),e.jsx(r,{}),e.jsx(r,{}),e.jsx(r,{}),e.jsx(r,{}),e.jsx(r,{}),e.jsx(r,{}),e.jsx(r,{}),e.jsx(r,{}),e.jsx(r,{})]}),args:{columns:{base:"repeat(1, 1fr)",xs:"repeat(4, 1fr)",sm:"repeat(5, 1fr)",md:"repeat(6, 1fr)","2xl":"repeat(8, 1fr)"}}};var i,d,x;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`{
  render: args => {
    return <Grid {...args}>
                <DecorativeBox />
                <DecorativeBox />
                <DecorativeBox />
                <DecorativeBox />
                <DecorativeBox />
                <DecorativeBox />
            </Grid>;
  }
}`,...(x=(d=o.parameters)==null?void 0:d.docs)==null?void 0:x.source}}};var c,p,l;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: args => {
    return <Grid {...args}>
                <DecorativeBox />
                <DecorativeBox />
                <DecorativeBox />
                <DecorativeBox />
                <DecorativeBox />
                <DecorativeBox />
                <DecorativeBox />
                <DecorativeBox />
                <DecorativeBox />
                <DecorativeBox />
                <DecorativeBox />
                <DecorativeBox />
            </Grid>;
  },
  args: {
    columns: 3
  }
}`,...(l=(p=t.parameters)==null?void 0:p.docs)==null?void 0:l.source}}};var u,m,j;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: args => {
    return <Grid {...args}>
                <DecorativeBox />
                <DecorativeBox />
                <DecorativeBox />
                <DecorativeBox />
                <DecorativeBox />
                <DecorativeBox />
                <DecorativeBox />
                <DecorativeBox />
                <DecorativeBox />
                <DecorativeBox />
                <DecorativeBox />
                <DecorativeBox />
            </Grid>;
  },
  args: {
    columns: {
      base: 'repeat(1, 1fr)',
      xs: 'repeat(4, 1fr)',
      sm: 'repeat(5, 1fr)',
      md: 'repeat(6, 1fr)',
      '2xl': 'repeat(8, 1fr)'
    }
  }
}`,...(j=(m=n.parameters)==null?void 0:m.docs)==null?void 0:j.source}}};const L=["Default","GridWithFixedColumnsAndRows","ResponsiveGrid"];export{o as Default,t as GridWithFixedColumnsAndRows,n as ResponsiveGrid,L as __namedExportsOrder,I as default};
