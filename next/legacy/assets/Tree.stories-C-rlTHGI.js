import{j as n,r as d}from"./iframe-1Dzly0tf.js";import{C as h,t as g,u as xe,a as me}from"./Container-BMnhK6qf.js";import{a as v,b as O,c as k,d as E,e as _,f as N,T as c}from"./Tree-Dh45SO05.js";import{I as Ie}from"./IconDocument-uJIU9jDb.js";import{T as j,u as be}from"./TreeItem-DSNDRYpd.js";import"./preload-helper-2PZZeCBp.js";import"./focusStyle-6rwBDk7H.js";import"./merge-DI-veSMP.js";import"./index-BeKLPKQL.js";import"./index-BMjLumW4.js";import"./IconSize-BcCrF_mi.js";const{action:l}=__STORYBOOK_MODULE_ACTIONS__,Ne={title:"Legacy Components/Tree",component:c,tags:["autodocs"],args:{id:"storybook-tree",draggable:!0,selectedIds:["2"],dragHandlerPosition:"left",showDragHandlerOnHoverOnly:!0,showContentWhileDragging:!1,spacingY:"none",contentHight:"single-line",shadow:"none",borderRadius:"small",borderWidth:"none",borderStyle:"none",activeColorStyle:"neutral"},argTypes:{draggable:{control:{type:"boolean"}},showDragHandlerOnHoverOnly:{table:{category:"Item Options"},control:{type:"boolean"}},showContentWhileDragging:{table:{category:"Item Options"},control:{type:"boolean"}},dragHandlerPosition:{table:{category:"Item Options"},options:["left","right","none"],control:{type:"inline-radio"}},spacingY:{table:{category:"Item Style"},name:"itemStyle.spacingY",options:[...Object.keys(N)],mapping:[...Object.values(N)],control:{type:"inline-radio"}},contentHight:{table:{category:"Item Style"},name:"itemStyle.contentHight",options:["content-fit","single-line"],control:{type:"inline-radio"}},shadow:{table:{category:"Item Style"},name:"itemStyle.shadow",options:[...Object.keys(_)],mapping:[...Object.values(_)],control:{type:"select"}},borderRadius:{table:{category:"Item Style"},name:"itemStyle.borderRadius",options:[...Object.keys(E)],mapping:[...Object.values(E)],control:{type:"select"}},borderWidth:{table:{category:"Item Style"},name:"itemStyle.borderWidth",options:[...Object.keys(k)],mapping:[...Object.values(k)],control:{type:"select"}},borderStyle:{table:{category:"Item Style"},name:"itemStyle.borderStyle",options:[...Object.keys(O)],mapping:[...Object.values(O)],control:{type:"select"}},activeColorStyle:{table:{category:"Item Style"},name:"itemStyle.activeColorStyle",options:[...Object.keys(v)],mapping:[...Object.values(v)],control:{type:"inline-radio"}},selectedIds:{control:{type:"object"}},expandedIds:{control:{type:"object"}}},parameters:{docs:{description:{component:`### *Legacy component warning*
#### This is a unmaintained legacy component. It will be deprecated and replaced with a new component in an upcoming release.`}}}},pe=({title:e})=>n.jsxs("div",{className:"tw-flex tw-space-x-1.5 tw-w-full",children:[n.jsx("span",{className:"tw-flex tw-justify-center tw-items-center tw-w-5",children:n.jsx(Ie,{})}),n.jsx("span",{children:e})]}),Te=({label:e,contentComponent:t,nodes:o,...r})=>{const s=`${e} CUSTOM`,a=()=>l("onDrop");return n.jsx(j,{label:s,...r,onDrop:a,children:o==null?void 0:o.map(i=>ue({...i,nodes:i.nodes}))})},ue=({id:e,onDrop:t,...o})=>n.jsx(Te,{id:e,onDrop:t??l("onDrop"),...o},`${e}-custom`),f=({nodes:e,onDrop:t,ignoreItemDoubleClick:o,expandOnSelect:r,...s})=>d.createElement(j,{...s,ignoreItemDoubleClick:o,expandOnSelect:r,key:s.id,onDrop:t??l("onDrop")},e==null?void 0:e.map(a=>f({...a,nodes:a.nodes,onDrop:t,ignoreItemDoubleClick:o,expandOnSelect:r}))),p=({nodes:e,label:t,numChildNodes:o,onDrop:r,...s})=>{const a=(e==null?void 0:e.length)??0,i=o!==void 0?!!o:a>0;return d.createElement(j,{...s,key:s.id,contentComponent:n.jsx(pe,{title:t||"NO TITLE"}),onDrop:r??l("onDrop"),showCaret:i},e==null?void 0:e.map(p))},u=({...e})=>{const t={spacingY:e.spacingY,contentHight:e.contentHight,shadow:e.shadow,borderRadius:e.borderRadius,borderWidth:e.borderWidth,borderStyle:e.borderStyle,activeColorStyle:e.activeColorStyle,...e.itemStyle};return delete e.spacingY,delete e.contentHight,delete e.shadow,delete e.borderRadius,delete e.borderWidth,delete e.borderStyle,delete e.activeColorStyle,{...e,itemStyle:t}},y=({...e})=>{const t=()=>l("onDrop");return n.jsx(h,{maxWidth:"400px",children:n.jsx(c,{id:e.id,...u(e),children:g.map(o=>f({...o,onDrop:t}))})})},x=({...e})=>{const t=()=>l("onDrop");return n.jsx(h,{maxWidth:"400px",children:n.jsx(c,{id:e.id,...u(e),children:g.map(o=>ue({...o,onDrop:t}))})})},I=({...e})=>{const[t,o]=d.useState([]),r=a=>{o(i=>[...i,a])},s=a=>{o(i=>i.filter(m=>m!==a))};return n.jsx("div",{style:{position:"fixed",height:"800px",width:"800px",backgroundColor:"white"},children:n.jsx("div",{style:{width:"800px",height:"300px",overflow:"auto",position:"absolute"},children:n.jsx(c,{id:e.id,...u(e),expandedIds:t,onExpand:r,onShrink:s,children:g.map(f)})})})},b=({...e})=>n.jsx(h,{maxWidth:"400px",children:n.jsx(c,{id:e.id,...u(e),children:g.map(p)})}),T=({...e})=>{const[t,o]=d.useState([]),r=u(e);return d.useEffect(()=>{setTimeout(()=>{o([{id:"2-1",label:"Document Category 2",nodes:[{id:"2-1-1",label:"Home",type:"document-page"},{id:"2-1-2",label:"Members",type:"document-page"},{id:"2-1-3",label:"About us",type:"document-page"}],type:"document-category",accepts:["document-page","document-page-within","document-category"].join(", ")}])},500)},[]),n.jsx(h,{maxWidth:"400px",children:n.jsxs(c,{id:e.id,...r,children:[g.map(p),t.map(p)]})})},Se=({...e})=>{const[t,o]=d.useState([]),[r]=xe(t),s=i=>{o([...t,i])},a=i=>{o(t.filter(m=>m!==i))};return n.jsxs(c,{id:e.id,...u(e),draggable:!0,expandedIds:t,onExpand:s,onShrink:a,children:[p({id:"first-fixed-tree-item",draggable:!1,label:"First Fixed TreeItem"}),r.length>0&&r.map(p),p({id:"last-fixed-tree-item",draggable:!1,label:"Last Fixed TreeItem"})]})},S=({...e})=>n.jsx(h,{maxWidth:"400px",children:n.jsx(Se,{...e,id:"dynamic-navigation"})}),he=d.memo(({label:e,numChildNodes:t,onDrop:o,...r})=>{const{isExpanded:s}=be(r.id),{nodes:a}=me(r.id,s),i=d.useMemo(()=>a.map(L=>L),[a]),m=()=>l("onDrop");return n.jsx(j,{contentComponent:n.jsx(pe,{title:e||"NO TITLE"}),onDrop:o??m,showCaret:!!t,...r,children:i.map(ge)})});he.displayName="FondueStoryLazyLoadingTreeItem";const ge=({id:e,...t})=>n.jsx(he,{id:`${e}-lazyloaded`,...t},`${e}-lazyloaded`),ye=d.memo(({...e})=>{const[t,o]=d.useState([]),{nodes:r}=me(void 0,!0,!0),s=m=>{o([...t,m])},a=m=>{o(t.filter(L=>L!==m))},i=()=>l("onDrop");return n.jsxs(c,{...e,draggable:!0,expandedIds:t,onExpand:s,onShrink:a,children:[p({id:"first-fixed-tree-item",draggable:!1,label:"First Fixed TreeItem",onDrop:i}),...r.map(ge),p({id:"last-fixed-tree-item",draggable:!1,label:"Last Fixed TreeItem",onDrop:i})]})});ye.displayName="FondueStoryLazyLoadingTreeRoot";const C=({...e})=>n.jsx(ye,{...u(e),id:"dynamic-navigation",children:null}),w=({...e})=>{const t=()=>l("onDrop");return n.jsx(h,{maxWidth:"400px",children:n.jsx(c,{id:e.id,...u(e),children:g.map(o=>f({...o,onDrop:t,ignoreItemDoubleClick:!0}))})})},W=({...e})=>{const t=()=>l("onDrop");return n.jsx(h,{maxWidth:"400px",children:n.jsx(c,{id:e.id,...u(e),children:g.map(o=>f({...o,onDrop:t,expandOnSelect:!0}))})})},Ce=e=>y(e),D=Ce.bind({});D.args={id:"storybook-tree",draggable:!0,selectedIds:["2"],dragHandlerPosition:"left",showDragHandlerOnHoverOnly:!0,showContentWhileDragging:!0,spacingY:"large",contentHight:"content-fit",shadow:"small",borderRadius:"large",borderWidth:"x-small",borderStyle:"solid",activeColorStyle:"soft"};y.__docgenInfo={description:"",methods:[],displayName:"WithLabel"};x.__docgenInfo={description:"",methods:[],displayName:"WithCustomTreeItem"};I.__docgenInfo={description:"",methods:[],displayName:"ScrollableWithLabel"};b.__docgenInfo={description:"",methods:[],displayName:"WithBasicItem"};T.__docgenInfo={description:"",methods:[],displayName:"WithAwaitedItem"};S.__docgenInfo={description:"",methods:[],displayName:"WithDynamicNavigation"};C.__docgenInfo={description:"",methods:[],displayName:"CustomItemsWithLazyLoadedChildren"};w.__docgenInfo={description:"",methods:[],displayName:"WithCancelSelectionOnDoubleClick"};W.__docgenInfo={description:"",methods:[],displayName:"WithExpandOnSelect"};var M,H,P;y.parameters={...y.parameters,docs:{...(M=y.parameters)==null?void 0:M.docs,source:{originalSource:`({
  ...args
}) => {
  const onDrop = () => action('onDrop');
  return <Container maxWidth="400px">
            <TreeView id={args.id} {...cleanProps(args)}>
                {treeItemsMock.map(item => renderTreeItemLabel({
        ...item,
        onDrop
      }))}
            </TreeView>
        </Container>;
}`,...(P=(H=y.parameters)==null?void 0:H.docs)==null?void 0:P.source}}};var R,V,z;x.parameters={...x.parameters,docs:{...(R=x.parameters)==null?void 0:R.docs,source:{originalSource:`({
  ...args
}: TreeProps) => {
  const onDrop = () => action('onDrop');
  return <Container maxWidth="400px">
            <TreeView id={args.id} {...cleanProps(args)}>
                {treeItemsMock.map(item => renderCustomTreeItem({
        ...item,
        onDrop
      }))}
            </TreeView>
        </Container>;
}`,...(z=(V=x.parameters)==null?void 0:V.docs)==null?void 0:z.source}}};var A,F,Y;I.parameters={...I.parameters,docs:{...(A=I.parameters)==null?void 0:A.docs,source:{originalSource:`({
  ...args
}: TreeProps) => {
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const handleItemExpand = (id: string) => {
    setExpandedIds(ids => [...ids, id]);
  };
  const handleItemShrink = (id: string) => {
    setExpandedIds(ids => ids.filter((itemId: string) => itemId !== id));
  };
  return <div style={{
    position: 'fixed',
    height: '800px',
    width: '800px',
    backgroundColor: 'white'
  }}>
            <div style={{
      width: '800px',
      height: '300px',
      overflow: 'auto',
      position: 'absolute'
    }}>
                <TreeView id={args.id} {...cleanProps(args)} expandedIds={expandedIds} onExpand={handleItemExpand} onShrink={handleItemShrink}>
                    {treeItemsMock.map(renderTreeItemLabel)}
                </TreeView>
            </div>
        </div>;
}`,...(Y=(F=I.parameters)==null?void 0:F.docs)==null?void 0:Y.source}}};var B,$,U;b.parameters={...b.parameters,docs:{...(B=b.parameters)==null?void 0:B.docs,source:{originalSource:`({
  ...args
}: TreeProps) => {
  return <Container maxWidth="400px">
            <TreeView id={args.id} {...cleanProps(args)}>
                {treeItemsMock.map(renderTreeItemComponent)}
            </TreeView>
        </Container>;
}`,...(U=($=b.parameters)==null?void 0:$.docs)==null?void 0:U.source}}};var K,q,G;T.parameters={...T.parameters,docs:{...(K=T.parameters)==null?void 0:K.docs,source:{originalSource:`({
  ...args
}: TreeProps) => {
  const [awaitedItems, setAwaitedItems] = useState<TreeItemMock[]>([]);
  const cleanArgs = cleanProps(args);
  useEffect(() => {
    setTimeout(() => {
      setAwaitedItems([{
        id: '2-1',
        label: 'Document Category 2',
        nodes: [{
          id: '2-1-1',
          label: 'Home',
          type: 'document-page'
        }, {
          id: '2-1-2',
          label: 'Members',
          type: 'document-page'
        }, {
          id: '2-1-3',
          label: 'About us',
          type: 'document-page'
        }],
        type: 'document-category',
        accepts: ['document-page', 'document-page-within', 'document-category'].join(', ')
      }]);
    }, 500);
  }, []);
  return <Container maxWidth="400px">
            <TreeView id={args.id} {...cleanArgs}>
                {treeItemsMock.map(renderTreeItemComponent)}
                {awaitedItems.map(renderTreeItemComponent)}
            </TreeView>
        </Container>;
}`,...(G=(q=T.parameters)==null?void 0:q.docs)==null?void 0:G.source}}};var J,Q,X;S.parameters={...S.parameters,docs:{...(J=S.parameters)==null?void 0:J.docs,source:{originalSource:`({
  ...args
}: TreeProps) => {
  return <Container maxWidth="400px">
            <DynamicNavigation {...args} id="dynamic-navigation" />
        </Container>;
}`,...(X=(Q=S.parameters)==null?void 0:Q.docs)==null?void 0:X.source}}};var Z,ee,te;C.parameters={...C.parameters,docs:{...(Z=C.parameters)==null?void 0:Z.docs,source:{originalSource:`({
  ...args
}: TreeProps) => {
  return <LazyLoadingTreeRoot {...cleanProps(args)} id="dynamic-navigation">
            {null}
        </LazyLoadingTreeRoot>;
}`,...(te=(ee=C.parameters)==null?void 0:ee.docs)==null?void 0:te.source}}};var oe,ne,re;w.parameters={...w.parameters,docs:{...(oe=w.parameters)==null?void 0:oe.docs,source:{originalSource:`({
  ...args
}: TreeProps) => {
  const onDrop = () => action('onDrop');
  return <Container maxWidth="400px">
            <TreeView id={args.id} {...cleanProps(args)}>
                {treeItemsMock.map(item => renderTreeItemLabel({
        ...item,
        onDrop,
        ignoreItemDoubleClick: true
      }))}
            </TreeView>
        </Container>;
}`,...(re=(ne=w.parameters)==null?void 0:ne.docs)==null?void 0:re.source}}};var ae,ie,se;W.parameters={...W.parameters,docs:{...(ae=W.parameters)==null?void 0:ae.docs,source:{originalSource:`({
  ...args
}: TreeProps) => {
  const onDrop = () => action('onDrop');
  return <Container maxWidth="400px">
            <TreeView id={args.id} {...cleanProps(args)}>
                {treeItemsMock.map(item => renderTreeItemLabel({
        ...item,
        onDrop,
        expandOnSelect: true
      }))}
            </TreeView>
        </Container>;
}`,...(se=(ie=W.parameters)==null?void 0:ie.docs)==null?void 0:se.source}}};var de,ce,le;D.parameters={...D.parameters,docs:{...(de=D.parameters)==null?void 0:de.docs,source:{originalSource:`args => {
  return WithLabel(args);
}`,...(le=(ce=D.parameters)==null?void 0:ce.docs)==null?void 0:le.source}}};const Me=["WithLabel","WithCustomTreeItem","ScrollableWithLabel","WithBasicItem","WithAwaitedItem","WithDynamicNavigation","CustomItemsWithLazyLoadedChildren","WithCancelSelectionOnDoubleClick","WithExpandOnSelect","WithTreeItemsStyled"];export{C as CustomItemsWithLazyLoadedChildren,I as ScrollableWithLabel,T as WithAwaitedItem,b as WithBasicItem,w as WithCancelSelectionOnDoubleClick,x as WithCustomTreeItem,S as WithDynamicNavigation,W as WithExpandOnSelect,y as WithLabel,D as WithTreeItemsStyled,Me as __namedExportsOrder,Ne as default};
