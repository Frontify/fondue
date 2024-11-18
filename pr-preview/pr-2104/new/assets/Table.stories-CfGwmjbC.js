import{j as e}from"./jsx-runtime-Nms4Y4qS.js";import{r as T}from"./index-BwDkhjyp.js";import{f as Pe,g as Ye,b as Ke,h as Je,i as Ge,j as Xe}from"./fondue-icons332-CfapKW84.js";import{B as q}from"./Button-BD32N3dP.js";import{a as M}from"./Checkbox-D9XbQE54.js";import{h as w}from"./Dropdown-Q1sa1_ON.js";import{F}from"./Flex-DCHQJD5L.js";import{S as U}from"./Switch-BQLJOOsp.js";import{T as P}from"./TextInput-CpB5g_th.js";import"./_commonjsHelpers-BosuxZz1.js";import"./styleUtilities-CZDH020m.js";import"./focusStyle-IgMhxCMT.js";import"./index-BtCsUTRM.js";import"./index-CS4BWtGh.js";import"./index-BSNoMcJN.js";import"./index-DOnKqARA.js";import"./index-DGaPG0k3.js";import"./index-BgCrdp81.js";import"./index-kUwV4muI.js";import"./index-C1SWbrhG.js";import"./index-B0lKOUy8.js";import"./index-BnOD_KYf.js";import"./index-C8IlRUt1.js";import"./index-CAR1Fn1S.js";import"./usePreventDropdownOverflow-DisCSAPV.js";import"./index-DduqEaLY.js";import"./index-BudAUfSk.js";import"./propsToCssVariables-BE5Q_-YS.js";const Qe="_table_ctdxh_4",Ze="_header_ctdxh_31",el="_headerCell_ctdxh_42",ll="_sortButton_ctdxh_59",al="_body_ctdxh_84",rl="_rowCell_ctdxh_87",nl="_row_ctdxh_87",h={table:Qe,header:Ze,headerCell:el,sortButton:ll,body:al,rowCell:rl,row:nl},qe=["button","[href]","input","select","textarea",'[tabindex]:not([tabindex="-1"])'].join(", "),sl=r=>["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Home","End"].includes(r),Me=r=>(r==null?void 0:r.querySelector(qe))??null,tl=r=>Array.from(r.querySelectorAll(qe)),Y=(r,a)=>r.children[a],ol=(r,a)=>{const n=r.closest("tr");if(!n)return null;const s=Array.from(n.children).indexOf(r);switch(a){case"ArrowUp":{const o=n.previousElementSibling;return o?Y(o,s):null}case"ArrowDown":{const o=n.nextElementSibling;return o?Y(o,s):null}case"ArrowLeft":return r.previousElementSibling;case"ArrowRight":return r.nextElementSibling;case"Home":case"End":{const o=Array.from(n.querySelectorAll("td, th"));return o[a==="Home"?0:o.length-1]}}},Ue=(r,a)=>{const n=ol(r,a);return n?Me(n)?n:Ue(n,a):null},K=(r,a)=>{if(!sl(r.key))return;const n=Ue(a,r.key);if(!n)return;const s=Me(n);s&&(r.preventDefault(),s.focus())},dl=(r,a,n)=>{var d;const s=tl(a),o=s.indexOf(n);if(o===-1)return;const t=(o+(r.key==="ArrowLeft"?-1:1)+s.length)%s.length;r.preventDefault(),(d=s[t])==null||d.focus()},il=r=>{const a=r.target,n=a.closest("td, th"),s=a.closest("table");if(s){if(n&&(r.key==="ArrowUp"||r.key==="ArrowDown")){K(r,n);return}if(r.ctrlKey&&n&&(r.key==="Home"||r.key==="End")){K(r,n);return}(r.key==="ArrowLeft"||r.key==="ArrowRight")&&dl(r,s,a)}},_=T.forwardRef(({caption:r,layout:a="auto",fullWidth:n=!0,children:s,"aria-label":o,"aria-describedby":c,"aria-busy":t=!1},d)=>e.jsx("div",{ref:d,onKeyDown:il,role:"grid",tabIndex:-1,children:e.jsxs("table",{className:h.table,"data-layout":a,"data-full-width":n,"aria-label":o,"aria-describedby":c,"aria-busy":t,children:[r&&e.jsx("caption",{children:r}),s]})}));_.displayName="Table.Root";const I=T.forwardRef(({sticky:r=!1,children:a,"aria-label":n,"aria-busy":s},o)=>e.jsx("thead",{ref:o,className:h.header,"data-sticky":r,"aria-label":n,"aria-busy":s,children:a}));I.displayName="Table.Header";const E=T.forwardRef(({scope:r="col",sortDirection:a,width:n,align:s="left",truncate:o=!1,sortTranslations:c,noShrink:t=!1,onSortChange:d,children:m},b)=>{const W=T.useId(),u=T.useMemo(()=>{const C=typeof m=="string"?m:"";return a==="ascending"?((c==null?void 0:c.sortDescending)??"Sort by {column} descending").replace("{column}",C):((c==null?void 0:c.sortAscending)??"Sort by {column} ascending").replace("{column}",C)},[m,a,c]),O=()=>{if(!d)return;d(a===void 0||a==="descending"?"ascending":"descending")};return e.jsx("th",{ref:b,className:h.headerCell,style:{textAlign:s,width:n},"data-truncate":o,"data-no-shrink":t,scope:r,children:d?e.jsxs("button",{id:W,onClick:O,className:h.sortButton,"aria-label":u,children:[m,a==="ascending"?e.jsx(Pe,{size:"12"}):a==="descending"?e.jsx(Ye,{size:"12"}):null]}):m})});E.displayName="Table.HeaderCell";const $=T.forwardRef(({stickyFirstColumn:r,children:a,"aria-busy":n},s)=>e.jsx("tbody",{ref:s,className:h.body,"data-sticky-first-column":r,"aria-busy":n,children:a}));$.displayName="Table.Body";const V=T.forwardRef(({selected:r=!1,disabled:a=!1,href:n,onNavigate:s,onClick:o,children:c,"aria-label":t,"data-test-id":d},m)=>{const b=(o!==void 0||s!==void 0)&&!a,W=!!(s&&n),u=()=>{a||(s?s(n):o&&o())},O=C=>{b&&(C.key==="Enter"||C.key===" ")&&(C.preventDefault(),u())};return e.jsx("tr",{ref:m,tabIndex:b?0:void 0,role:W?"link":b?"button":"row",className:h.row,"data-href":n,"data-selected":r,"data-interactive":b,"data-disabled":a,"aria-selected":r,"aria-disabled":a,"aria-label":t,onClick:b?u:void 0,onKeyDown:b?O:void 0,"data-test-id":d,children:c})});V.displayName="Table.Row";const z=T.forwardRef(({truncate:r,align:a="left",children:n,"aria-label":s},o)=>e.jsx("td",{ref:o,"data-truncate":r,className:h.rowCell,style:{textAlign:a},"aria-label":s,children:n}));z.displayName="Table.RowCell";const l={Root:_,Header:I,HeaderCell:E,Body:$,Row:V,RowCell:z};_.__docgenInfo={description:"",methods:[],displayName:"Table.Root",props:{layout:{defaultValue:{value:"'auto'",computed:!1},required:!1},fullWidth:{defaultValue:{value:"true",computed:!1},required:!1},"aria-busy":{defaultValue:{value:"false",computed:!1},required:!1}}};I.__docgenInfo={description:"",methods:[],displayName:"Table.Header",props:{sticky:{defaultValue:{value:"false",computed:!1},required:!1}}};E.__docgenInfo={description:"",methods:[],displayName:"Table.HeaderCell",props:{scope:{defaultValue:{value:"'col'",computed:!1},required:!1},align:{defaultValue:{value:"'left'",computed:!1},required:!1},truncate:{defaultValue:{value:"false",computed:!1},required:!1},noShrink:{defaultValue:{value:"false",computed:!1},required:!1}}};$.__docgenInfo={description:"",methods:[],displayName:"Table.Body"};V.__docgenInfo={description:"",methods:[],displayName:"Table.Row",props:{selected:{defaultValue:{value:"false",computed:!1},required:!1},disabled:{defaultValue:{value:"false",computed:!1},required:!1}}};z.__docgenInfo={description:"",methods:[],displayName:"Table.RowCell",props:{align:{defaultValue:{value:"'left'",computed:!1},required:!1}}};const $l={component:_,subcomponents:{"Table.Header":I,"Table.HeaderCell":E,"Table.Body":$,"Table.Row":V,"Table.RowCell":z},tags:["autodocs"],parameters:{status:{type:"released"}},args:{},argTypes:{layout:{control:{type:"select",options:["auto","fixed"]},defaultValue:"auto"},fullWidth:{control:"boolean",defaultValue:!0},caption:{control:"text",defaultValue:""}}},i=[{id:1,firstName:"Chris",lastName:"Glasser",name:"Chris Glasser",age:32,role:"Senior Developer",email:"c.a.glasser@outlook.com",invited:"Rhonda Rhodes",lastSeen:"Oct 23, 2024",initialLogin:"SSO",lastLogin:"SSO",twoFa:!0},{id:2,firstName:"David",lastName:"Elson",name:"David Elson",age:28,role:"Product Manager",email:"david29@gmail.com",invited:"Rodger Struck",lastSeen:"Oct 21, 2024",initialLogin:"SSO",lastLogin:"SSO",twoFa:!0},{id:3,firstName:"Eddie",lastName:"Lake",name:"Eddie Lake",age:35,role:"UX Designer",email:"eddie_lake@gmail.com",invited:"Frances Swann",lastSeen:"Nov 11, 2024",initialLogin:"SSO",lastLogin:"SSO",twoFa:!0},{id:4,firstName:"James",lastName:"Hall",name:"James Hall",age:41,role:"Technical Lead",email:"james_hall@gmail.com",invited:"Alex Buckmaster",lastSeen:"Nov 12, 2024",initialLogin:"SSO",lastLogin:"SSO",twoFa:!0},{id:5,firstName:"Jerry",lastName:"Helfer",name:"Jerry Helfer",age:39,role:"Frontend Developer",email:"jerry73@aol.com",invited:"Bradley Lawlor",lastSeen:"Nov 1, 2024",initialLogin:"SSO",lastLogin:"SSO",twoFa:!0}],x={render:({...r})=>e.jsxs(l.Root,{...r,children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Admin"}),e.jsx(l.HeaderCell,{children:"Invited by"}),e.jsx(l.HeaderCell,{children:"Last seen"}),e.jsx(l.HeaderCell,{children:"Initial login"}),e.jsx(l.HeaderCell,{children:"Last login"}),e.jsx(l.HeaderCell,{children:"2FA"}),e.jsx(l.HeaderCell,{children:"Analytics access"}),e.jsx(l.HeaderCell,{children:"Actions"})]})}),e.jsx(l.Body,{children:i.map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"flex items-center gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"font-medium",children:a.name}),e.jsx("div",{className:"text-sm text-gray-500",children:a.email})]})})}),e.jsx(l.RowCell,{children:e.jsx(U,{size:"small","aria-label":"Admin"})}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{children:a.lastSeen}),e.jsx(l.RowCell,{children:a.initialLogin}),e.jsx(l.RowCell,{children:a.lastLogin}),e.jsx(l.RowCell,{children:a.twoFa?"Yes":"No"}),e.jsx(l.RowCell,{children:e.jsx(U,{size:"small","aria-label":"Analytics"})}),e.jsx(l.RowCell,{children:e.jsxs(F,{gap:"0.25rem",children:[e.jsx(q,{size:"small",aspect:"square",emphasis:"weak",children:e.jsx(Ke,{size:16})}),e.jsx(q,{variant:"danger",size:"small",aspect:"square",emphasis:"weak",children:e.jsx(Je,{size:16})})]})})]},a.email))})]})},R={render:({...r})=>e.jsxs(l.Root,{...r,layout:"auto",children:[e.jsx(l.Header,{children:e.jsxs("tr",{children:[e.jsx(l.HeaderCell,{width:"100px",children:"Name"}),e.jsx(l.HeaderCell,{children:"Role"}),e.jsx(l.HeaderCell,{children:"Last Seen"})]})}),e.jsx(l.Body,{children:i.map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:a.name}),e.jsx(l.RowCell,{children:a.role}),e.jsx(l.RowCell,{children:a.lastSeen})]},a.id))})]})},g={render:({...r})=>e.jsxs(l.Root,{...r,layout:"fixed",children:[e.jsx(l.Header,{children:e.jsxs("tr",{children:[e.jsx(l.HeaderCell,{width:"100px",children:"Name"}),e.jsx(l.HeaderCell,{children:"Role"}),e.jsx(l.HeaderCell,{children:"Last Seen"})]})}),e.jsx(l.Body,{children:i.map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:a.name}),e.jsx(l.RowCell,{children:a.role}),e.jsx(l.RowCell,{children:a.lastSeen})]},a.id))})]})},p={render:({...r})=>e.jsxs(l.Root,{...r,fullWidth:!1,children:[e.jsx(l.Header,{children:e.jsxs("tr",{children:[e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Role"}),e.jsx(l.HeaderCell,{children:"Last Seen"})]})}),e.jsx(l.Body,{children:i.map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:a.name}),e.jsx(l.RowCell,{children:a.role}),e.jsx(l.RowCell,{children:a.lastSeen})]},a.id))})]})},j={render:({...r})=>{const[a,n]=T.useState(null),[s,o]=T.useState(),c=[...i].sort((t,d)=>{if(!a||!s)return 0;const m=t[a],b=d[a];return s==="ascending"?m>b?1:-1:m<b?1:-1});return e.jsxs(l.Root,{...r,children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{sortDirection:a==="name"?s:void 0,onSortChange:t=>{n("name"),o(t)},children:"Name"}),e.jsx(l.HeaderCell,{sortDirection:a==="invited"?s:void 0,onSortChange:t=>{n("invited"),o(t)},children:"Invited by"}),e.jsx(l.HeaderCell,{sortDirection:a==="lastSeen"?s:void 0,onSortChange:t=>{n("lastSeen"),o(t)},children:"Last seen"})]})}),e.jsx(l.Body,{children:c.map(t=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"flex items-center gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"font-medium",children:t.name}),e.jsx("div",{className:"text-sm text-gray-500",children:t.email})]})})}),e.jsx(l.RowCell,{children:t.invited}),e.jsx(l.RowCell,{children:t.lastSeen})]},t.email))})]})}},H={render:({...r})=>e.jsx("div",{className:"h-96 overflow-auto border rounded-lg",children:e.jsxs(l.Root,{...r,children:[e.jsx(l.Header,{sticky:!0,children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{width:"250px",children:"Name"}),e.jsx(l.HeaderCell,{width:"150px",children:"Invited by"}),e.jsx(l.HeaderCell,{width:"120px",children:"Last seen"}),e.jsx(l.HeaderCell,{width:"120px",children:"Initial login"}),e.jsx(l.HeaderCell,{width:"120px",children:"Last login"}),e.jsx(l.HeaderCell,{width:"80px",children:"2FA"})]})}),e.jsx(l.Body,{children:[...i,...i,...i,...i,...i,...i].map((a,n)=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"flex items-center gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"font-medium",children:a.name}),e.jsx("div",{className:"text-sm text-gray-500",children:a.email})]})})}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{children:a.lastSeen}),e.jsx(l.RowCell,{children:a.initialLogin}),e.jsx(l.RowCell,{children:a.lastLogin}),e.jsx(l.RowCell,{children:a.twoFa?"Yes":"No"})]},`${a.email}-${n}`))})]})})},f={render:({...r})=>e.jsx("div",{style:{width:"700px",overflow:"auto"},children:e.jsxs(l.Root,{...r,layout:"auto",children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Invited by"}),e.jsx(l.HeaderCell,{children:"Last seen"}),e.jsx(l.HeaderCell,{children:"Initial login"}),e.jsx(l.HeaderCell,{children:"Last login"}),e.jsx(l.HeaderCell,{children:"2FA"})]})}),e.jsx(l.Body,{stickyFirstColumn:!0,children:i.map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"flex items-center gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"font-medium",children:a.name}),e.jsx("div",{className:"text-sm text-gray-500",children:a.email})]})})}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{children:a.lastSeen}),e.jsx(l.RowCell,{children:a.initialLogin}),e.jsx(l.RowCell,{children:a.lastLogin}),e.jsx(l.RowCell,{children:a.twoFa?"Yes":"No"})]},a.email))})]})})},y={render:({...r})=>e.jsxs(l.Root,{...r,children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Invited by"}),e.jsx(l.HeaderCell,{children:"Last seen"})]})}),e.jsx(l.Body,{children:i.map(a=>e.jsxs(l.Row,{onClick:()=>alert(`Clicked on ${a.name}`),children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"flex items-center gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"font-medium",children:a.name}),e.jsx("div",{className:"text-sm text-gray-500",children:a.email})]})})}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{children:a.lastSeen})]},a.email))})]})},v={render:({...r})=>e.jsxs(l.Root,{...r,children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Invited by"}),e.jsx(l.HeaderCell,{children:"Last seen"})]})}),e.jsx(l.Body,{children:i.map(a=>e.jsxs(l.Row,{href:`/users/${a.email}`,onNavigate:n=>alert(`Navigating to ${n}`),children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"flex items-center gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"font-medium",children:a.name}),e.jsx("div",{className:"text-sm text-gray-500",children:a.email})]})})}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{children:a.lastSeen})]},a.email))})]})},S={render:({...r})=>e.jsxs(l.Root,{...r,children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Invited by"}),e.jsx(l.HeaderCell,{children:"Last seen"})]})}),e.jsx(l.Body,{children:i.map((a,n)=>e.jsxs(l.Row,{onClick:()=>alert(`Clicked on ${a.name}`),disabled:n%3===0,children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"flex items-center gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"font-medium",children:a.name}),e.jsx("div",{className:"text-sm text-gray-500",children:a.email})]})})}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{children:a.lastSeen})]},a.email))})]})},A={render:({...r})=>e.jsxs(l.Root,{...r,caption:"User Management Dashboard",children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Invited by"}),e.jsx(l.HeaderCell,{children:"Last seen"})]})}),e.jsx(l.Body,{children:i.slice(0,5).map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"flex items-center gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"font-medium",children:a.name}),e.jsx("div",{className:"text-sm text-gray-500",children:a.email})]})})}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{children:a.lastSeen})]},a.email))})]})},N={render:({...r})=>e.jsx("div",{style:{width:"200px"},children:e.jsxs(l.Root,{...r,children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{truncate:!0,children:"Name"}),e.jsx(l.HeaderCell,{children:"Invited by"}),e.jsx(l.HeaderCell,{truncate:!0,children:"Last seen"})]})}),e.jsx(l.Body,{children:i.slice(0,5).map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{truncate:!0,children:a.name}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{truncate:!0,children:a.lastSeen})]},a.email))})]})})},L={render:({...r})=>{const[a,n]=T.useState(""),[s,o]=T.useState("all"),c=T.useMemo(()=>{let t=[...i];return a&&(t=t.filter(d=>d.firstName.toLowerCase().includes(a.toLowerCase())||d.lastName.toLowerCase().includes(a.toLowerCase()))),s!=="all"&&(t=t.filter(d=>s==="young"?d.age<30:d.age>=30)),t},[a,s]);return e.jsxs(F,{direction:"column",gap:"1rem",children:[e.jsxs(F,{gap:"1rem",children:[e.jsx(P,{placeholder:"Search...",value:a,onChange:t=>n(t.target.value),children:e.jsx(P.Slot,{children:e.jsx(Ge,{size:"16"})})}),e.jsxs(w.Root,{children:[e.jsx(w.Trigger,{children:e.jsxs(q,{emphasis:"default",children:[e.jsx(Xe,{size:"16"}),"Filter by age"]})}),e.jsxs(w.Content,{children:[e.jsx(w.Item,{onSelect:()=>o("all"),children:"All"}),e.jsx(w.Item,{onSelect:()=>o("young"),children:"Young"}),e.jsx(w.Item,{onSelect:()=>o("old"),children:"Old"})]})]})]}),e.jsxs(l.Root,{...r,children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Age"}),e.jsx(l.HeaderCell,{children:"Role"})]})}),e.jsx(l.Body,{children:c.map(t=>e.jsxs(l.Row,{onClick:()=>console.log(`View details for ${t.firstName}`),children:[e.jsx(l.RowCell,{children:t.name}),e.jsx(l.RowCell,{children:t.age}),e.jsx(l.RowCell,{children:t.role})]},t.id))})]})]})}},B={render:({...r})=>{const[a,n]=T.useState(new Set),s=()=>{a.size===i.length?n(new Set):n(new Set(i.map(d=>d.id)))},o=(d,m)=>{d.stopPropagation();const b=new Set(a);b.has(m)?b.delete(m):b.add(m),n(b)},c=a.size===i.length,t=a.size>0&&a.size<i.length;return e.jsxs(l.Root,{...r,children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:e.jsx(M,{value:t?"indeterminate":c,onChange:s})}),e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Age"})]})}),e.jsx(l.Body,{children:i.map(d=>e.jsxs(l.Row,{selected:a.has(d.id),onClick:()=>console.log(`View details for ${d.firstName}`),children:[e.jsx(l.RowCell,{children:e.jsx(M,{value:a.has(d.id),onChange:m=>o(m,d.id)})}),e.jsx(l.RowCell,{children:d.name}),e.jsx(l.RowCell,{children:d.age})]},d.id))})]})}},D={name:"Cell Alignment Options",render:({...r})=>e.jsxs(l.Root,{...r,children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{align:"left",children:"Left Header"}),e.jsx(l.HeaderCell,{align:"center",children:"Centered Header"}),e.jsx(l.HeaderCell,{align:"right",children:"Right Header"}),e.jsx(l.HeaderCell,{align:"left",children:"Mixed Alignment"})]})}),e.jsx(l.Body,{children:i.map(a=>e.jsxs(l.Row,{onClick:()=>console.log(`Clicked ${a.firstName}'s user`),children:[e.jsx(l.RowCell,{align:"left",children:a.firstName}),e.jsx(l.RowCell,{align:"center",children:a.role}),e.jsx(l.RowCell,{align:"right",children:a.age}),e.jsx(l.RowCell,{children:e.jsxs(F,{justify:"space-between",align:"center",children:[e.jsx("span",{children:a.invited}),e.jsx("span",{children:a.lastLogin})]})})]},a.id))})]})},k={render:({...r})=>e.jsx("div",{style:{width:"800px"},children:e.jsxs(l.Root,{...r,children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{width:"100px",children:"Fixed Width & No Shrink"}),e.jsx(l.HeaderCell,{width:"100px",truncate:!0,children:"Truncated Very Long Header Title That Should Be Cut Off"}),e.jsx(l.HeaderCell,{width:"50%",children:"Percentage Width"}),e.jsx(l.HeaderCell,{children:"Auto Width"})]})}),e.jsx(l.Body,{children:i.map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:"Fixed Width Content"}),e.jsx(l.RowCell,{truncate:!0,children:`${a.firstName} ${a.lastName} - ${a.role} - ${a.lastLogin}`}),e.jsx(l.RowCell,{children:"Normal Cell"}),e.jsx(l.RowCell,{children:"Auto Width Content"})]},a.id))})]})})};var J,G,X;x.parameters={...x.parameters,docs:{...(J=x.parameters)==null?void 0:J.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => <Table.Root {...args}>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Admin</Table.HeaderCell>
                    <Table.HeaderCell>Invited by</Table.HeaderCell>
                    <Table.HeaderCell>Last seen</Table.HeaderCell>
                    <Table.HeaderCell>Initial login</Table.HeaderCell>
                    <Table.HeaderCell>Last login</Table.HeaderCell>
                    <Table.HeaderCell>2FA</Table.HeaderCell>
                    <Table.HeaderCell>Analytics access</Table.HeaderCell>
                    <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {TABLE_DATA.map(user => <Table.Row key={user.email}>
                        <Table.RowCell>
                            <div className="flex items-center gap-2">
                                <div>
                                    <div className="font-medium">{user.name}</div>
                                    <div className="text-sm text-gray-500">{user.email}</div>
                                </div>
                            </div>
                        </Table.RowCell>
                        <Table.RowCell>
                            <Switch size="small" aria-label="Admin" />
                        </Table.RowCell>
                        <Table.RowCell>{user.invited}</Table.RowCell>
                        <Table.RowCell>{user.lastSeen}</Table.RowCell>
                        <Table.RowCell>{user.initialLogin}</Table.RowCell>
                        <Table.RowCell>{user.lastLogin}</Table.RowCell>
                        <Table.RowCell>{user.twoFa ? 'Yes' : 'No'}</Table.RowCell>
                        <Table.RowCell>
                            <Switch size="small" aria-label="Analytics" />
                        </Table.RowCell>

                        <Table.RowCell>
                            <Flex gap="0.25rem">
                                <Button size="small" aspect="square" emphasis="weak">
                                    <IconPen size={16} />
                                </Button>
                                <Button variant="danger" size="small" aspect="square" emphasis="weak">
                                    <IconTrashBin size={16} />
                                </Button>
                            </Flex>
                        </Table.RowCell>
                    </Table.Row>)}
            </Table.Body>
        </Table.Root>
}`,...(X=(G=x.parameters)==null?void 0:G.docs)==null?void 0:X.source}}};var Q,Z,ee;R.parameters={...R.parameters,docs:{...(Q=R.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => <Table.Root {...args} layout="auto">
            <Table.Header>
                <tr>
                    <Table.HeaderCell width="100px">Name</Table.HeaderCell>
                    <Table.HeaderCell>Role</Table.HeaderCell>
                    <Table.HeaderCell>Last Seen</Table.HeaderCell>
                </tr>
            </Table.Header>
            <Table.Body>
                {TABLE_DATA.map(user => <Table.Row key={user.id}>
                        <Table.RowCell>{user.name}</Table.RowCell>
                        <Table.RowCell>{user.role}</Table.RowCell>
                        <Table.RowCell>{user.lastSeen}</Table.RowCell>
                    </Table.Row>)}
            </Table.Body>
        </Table.Root>
}`,...(ee=(Z=R.parameters)==null?void 0:Z.docs)==null?void 0:ee.source}}};var le,ae,re;g.parameters={...g.parameters,docs:{...(le=g.parameters)==null?void 0:le.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => <Table.Root {...args} layout="fixed">
            <Table.Header>
                <tr>
                    <Table.HeaderCell width="100px">Name</Table.HeaderCell>
                    <Table.HeaderCell>Role</Table.HeaderCell>
                    <Table.HeaderCell>Last Seen</Table.HeaderCell>
                </tr>
            </Table.Header>
            <Table.Body>
                {TABLE_DATA.map(user => <Table.Row key={user.id}>
                        <Table.RowCell>{user.name}</Table.RowCell>
                        <Table.RowCell>{user.role}</Table.RowCell>
                        <Table.RowCell>{user.lastSeen}</Table.RowCell>
                    </Table.Row>)}
            </Table.Body>
        </Table.Root>
}`,...(re=(ae=g.parameters)==null?void 0:ae.docs)==null?void 0:re.source}}};var ne,se,te;p.parameters={...p.parameters,docs:{...(ne=p.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => <Table.Root {...args} fullWidth={false}>
            <Table.Header>
                <tr>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Role</Table.HeaderCell>
                    <Table.HeaderCell>Last Seen</Table.HeaderCell>
                </tr>
            </Table.Header>
            <Table.Body>
                {TABLE_DATA.map(user => <Table.Row key={user.id}>
                        <Table.RowCell>{user.name}</Table.RowCell>
                        <Table.RowCell>{user.role}</Table.RowCell>
                        <Table.RowCell>{user.lastSeen}</Table.RowCell>
                    </Table.Row>)}
            </Table.Body>
        </Table.Root>
}`,...(te=(se=p.parameters)==null?void 0:se.docs)==null?void 0:te.source}}};var oe,de,ie;j.parameters={...j.parameters,docs:{...(oe=j.parameters)==null?void 0:oe.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => {
    const [sortField, setSortField] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<'ascending' | 'descending'>();
    const sortedUsers = [...TABLE_DATA].sort((a, b) => {
      if (!sortField || !sortDirection) {
        return 0;
      }
      const aValue = a[sortField as keyof typeof a];
      const bValue = b[sortField as keyof typeof b];
      if (sortDirection === 'ascending') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
    return <Table.Root {...args}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell sortDirection={sortField === 'name' ? sortDirection : undefined} onSortChange={direction => {
            setSortField('name');
            setSortDirection(direction);
          }}>
                            Name
                        </Table.HeaderCell>
                        <Table.HeaderCell sortDirection={sortField === 'invited' ? sortDirection : undefined} onSortChange={direction => {
            setSortField('invited');
            setSortDirection(direction);
          }}>
                            Invited by
                        </Table.HeaderCell>
                        <Table.HeaderCell sortDirection={sortField === 'lastSeen' ? sortDirection : undefined} onSortChange={direction => {
            setSortField('lastSeen');
            setSortDirection(direction);
          }}>
                            Last seen
                        </Table.HeaderCell>
                        {/* Other columns without sorting */}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {sortedUsers.map(user => <Table.Row key={user.email}>
                            <Table.RowCell>
                                <div className="flex items-center gap-2">
                                    <div>
                                        <div className="font-medium">{user.name}</div>
                                        <div className="text-sm text-gray-500">{user.email}</div>
                                    </div>
                                </div>
                            </Table.RowCell>
                            <Table.RowCell>{user.invited}</Table.RowCell>
                            <Table.RowCell>{user.lastSeen}</Table.RowCell>
                        </Table.Row>)}
                </Table.Body>
            </Table.Root>;
  }
}`,...(ie=(de=j.parameters)==null?void 0:de.docs)==null?void 0:ie.source}}};var ce,me,be;H.parameters={...H.parameters,docs:{...(ce=H.parameters)==null?void 0:ce.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => <div className="h-96 overflow-auto border rounded-lg">
            <Table.Root {...args}>
                <Table.Header sticky>
                    <Table.Row>
                        <Table.HeaderCell width="250px">Name</Table.HeaderCell>
                        <Table.HeaderCell width="150px">Invited by</Table.HeaderCell>
                        <Table.HeaderCell width="120px">Last seen</Table.HeaderCell>
                        <Table.HeaderCell width="120px">Initial login</Table.HeaderCell>
                        <Table.HeaderCell width="120px">Last login</Table.HeaderCell>
                        <Table.HeaderCell width="80px">2FA</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {[...TABLE_DATA, ...TABLE_DATA, ...TABLE_DATA, ...TABLE_DATA, ...TABLE_DATA, ...TABLE_DATA].map((user, index) => <Table.Row key={\`\${user.email}-\${index}\`}>
                                <Table.RowCell>
                                    <div className="flex items-center gap-2">
                                        <div>
                                            <div className="font-medium">{user.name}</div>
                                            <div className="text-sm text-gray-500">{user.email}</div>
                                        </div>
                                    </div>
                                </Table.RowCell>
                                <Table.RowCell>{user.invited}</Table.RowCell>
                                <Table.RowCell>{user.lastSeen}</Table.RowCell>
                                <Table.RowCell>{user.initialLogin}</Table.RowCell>
                                <Table.RowCell>{user.lastLogin}</Table.RowCell>
                                <Table.RowCell>{user.twoFa ? 'Yes' : 'No'}</Table.RowCell>
                            </Table.Row>)}
                </Table.Body>
            </Table.Root>
        </div>
}`,...(be=(me=H.parameters)==null?void 0:me.docs)==null?void 0:be.source}}};var Te,Ce,he;f.parameters={...f.parameters,docs:{...(Te=f.parameters)==null?void 0:Te.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => <div style={{
    width: '700px',
    overflow: 'auto'
  }}>
            <Table.Root {...args} layout="auto">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Invited by</Table.HeaderCell>
                        <Table.HeaderCell>Last seen</Table.HeaderCell>
                        <Table.HeaderCell>Initial login</Table.HeaderCell>
                        <Table.HeaderCell>Last login</Table.HeaderCell>
                        <Table.HeaderCell>2FA</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body stickyFirstColumn>
                    {TABLE_DATA.map(user => <Table.Row key={user.email}>
                            <Table.RowCell>
                                <div className="flex items-center gap-2">
                                    <div>
                                        <div className="font-medium">{user.name}</div>
                                        <div className="text-sm text-gray-500">{user.email}</div>
                                    </div>
                                </div>
                            </Table.RowCell>
                            <Table.RowCell>{user.invited}</Table.RowCell>
                            <Table.RowCell>{user.lastSeen}</Table.RowCell>
                            <Table.RowCell>{user.initialLogin}</Table.RowCell>
                            <Table.RowCell>{user.lastLogin}</Table.RowCell>
                            <Table.RowCell>{user.twoFa ? 'Yes' : 'No'}</Table.RowCell>
                        </Table.Row>)}
                </Table.Body>
            </Table.Root>
        </div>
}`,...(he=(Ce=f.parameters)==null?void 0:Ce.docs)==null?void 0:he.source}}};var we,ue,xe;y.parameters={...y.parameters,docs:{...(we=y.parameters)==null?void 0:we.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => <Table.Root {...args}>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Invited by</Table.HeaderCell>
                    <Table.HeaderCell>Last seen</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {TABLE_DATA.map(user => <Table.Row key={user.email} onClick={() => alert(\`Clicked on \${user.name}\`)}>
                        <Table.RowCell>
                            <div className="flex items-center gap-2">
                                <div>
                                    <div className="font-medium">{user.name}</div>
                                    <div className="text-sm text-gray-500">{user.email}</div>
                                </div>
                            </div>
                        </Table.RowCell>
                        <Table.RowCell>{user.invited}</Table.RowCell>
                        <Table.RowCell>{user.lastSeen}</Table.RowCell>
                    </Table.Row>)}
            </Table.Body>
        </Table.Root>
}`,...(xe=(ue=y.parameters)==null?void 0:ue.docs)==null?void 0:xe.source}}};var Re,ge,pe;v.parameters={...v.parameters,docs:{...(Re=v.parameters)==null?void 0:Re.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => <Table.Root {...args}>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Invited by</Table.HeaderCell>
                    <Table.HeaderCell>Last seen</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {TABLE_DATA.map(user => <Table.Row key={user.email} href={\`/users/\${user.email}\`} onNavigate={href => alert(\`Navigating to \${href}\`)}>
                        <Table.RowCell>
                            <div className="flex items-center gap-2">
                                <div>
                                    <div className="font-medium">{user.name}</div>
                                    <div className="text-sm text-gray-500">{user.email}</div>
                                </div>
                            </div>
                        </Table.RowCell>
                        <Table.RowCell>{user.invited}</Table.RowCell>
                        <Table.RowCell>{user.lastSeen}</Table.RowCell>
                    </Table.Row>)}
            </Table.Body>
        </Table.Root>
}`,...(pe=(ge=v.parameters)==null?void 0:ge.docs)==null?void 0:pe.source}}};var je,He,fe;S.parameters={...S.parameters,docs:{...(je=S.parameters)==null?void 0:je.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => <Table.Root {...args}>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Invited by</Table.HeaderCell>
                    <Table.HeaderCell>Last seen</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {TABLE_DATA.map((user, index) => <Table.Row key={user.email} onClick={() => alert(\`Clicked on \${user.name}\`)} disabled={index % 3 === 0}>
                        <Table.RowCell>
                            <div className="flex items-center gap-2">
                                <div>
                                    <div className="font-medium">{user.name}</div>
                                    <div className="text-sm text-gray-500">{user.email}</div>
                                </div>
                            </div>
                        </Table.RowCell>
                        <Table.RowCell>{user.invited}</Table.RowCell>
                        <Table.RowCell>{user.lastSeen}</Table.RowCell>
                    </Table.Row>)}
            </Table.Body>
        </Table.Root>
}`,...(fe=(He=S.parameters)==null?void 0:He.docs)==null?void 0:fe.source}}};var ye,ve,Se;A.parameters={...A.parameters,docs:{...(ye=A.parameters)==null?void 0:ye.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => <Table.Root {...args} caption="User Management Dashboard">
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Invited by</Table.HeaderCell>
                    <Table.HeaderCell>Last seen</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {TABLE_DATA.slice(0, 5).map(user => <Table.Row key={user.email}>
                        <Table.RowCell>
                            <div className="flex items-center gap-2">
                                <div>
                                    <div className="font-medium">{user.name}</div>
                                    <div className="text-sm text-gray-500">{user.email}</div>
                                </div>
                            </div>
                        </Table.RowCell>
                        <Table.RowCell>{user.invited}</Table.RowCell>
                        <Table.RowCell>{user.lastSeen}</Table.RowCell>
                    </Table.Row>)}
            </Table.Body>
        </Table.Root>
}`,...(Se=(ve=A.parameters)==null?void 0:ve.docs)==null?void 0:Se.source}}};var Ae,Ne,Le;N.parameters={...N.parameters,docs:{...(Ae=N.parameters)==null?void 0:Ae.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => <div style={{
    width: '200px'
  }}>
            <Table.Root {...args}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell truncate>Name</Table.HeaderCell>
                        <Table.HeaderCell>Invited by</Table.HeaderCell>
                        <Table.HeaderCell truncate>Last seen</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {TABLE_DATA.slice(0, 5).map(user => <Table.Row key={user.email}>
                            <Table.RowCell truncate>{user.name}</Table.RowCell>
                            <Table.RowCell>{user.invited}</Table.RowCell>
                            <Table.RowCell truncate>{user.lastSeen}</Table.RowCell>
                        </Table.Row>)}
                </Table.Body>
            </Table.Root>
        </div>
}`,...(Le=(Ne=N.parameters)==null?void 0:Ne.docs)==null?void 0:Le.source}}};var Be,De,ke;L.parameters={...L.parameters,docs:{...(Be=L.parameters)==null?void 0:Be.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [ageFilter, setAgeFilter] = useState<'all' | 'young' | 'old'>('all');
    const filteredAndSortedData = useMemo(() => {
      let result = [...TABLE_DATA];
      if (searchTerm) {
        result = result.filter(user => user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || user.lastName.toLowerCase().includes(searchTerm.toLowerCase()));
      }
      if (ageFilter !== 'all') {
        result = result.filter(user => ageFilter === 'young' ? user.age < 30 : user.age >= 30);
      }
      return result;
    }, [searchTerm, ageFilter]);
    return <Flex direction="column" gap="1rem">
                <Flex gap="1rem">
                    <TextInput placeholder="Search..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}>
                        <TextInput.Slot>
                            <IconMagnifier size="16" />
                        </TextInput.Slot>
                    </TextInput>
                    <Dropdown.Root>
                        <Dropdown.Trigger>
                            <Button emphasis="default">
                                <IconFunnel size="16" />
                                Filter by age
                            </Button>
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                            <Dropdown.Item onSelect={() => setAgeFilter('all')}>All</Dropdown.Item>
                            <Dropdown.Item onSelect={() => setAgeFilter('young')}>Young</Dropdown.Item>
                            <Dropdown.Item onSelect={() => setAgeFilter('old')}>Old</Dropdown.Item>
                        </Dropdown.Content>
                    </Dropdown.Root>
                </Flex>

                <Table.Root {...args}>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Age</Table.HeaderCell>
                            <Table.HeaderCell>Role</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {filteredAndSortedData.map(user => <Table.Row key={user.id} onClick={() => console.log(\`View details for \${user.firstName}\`)}>
                                <Table.RowCell>{user.name}</Table.RowCell>
                                <Table.RowCell>{user.age}</Table.RowCell>
                                <Table.RowCell>{user.role}</Table.RowCell>
                            </Table.Row>)}
                    </Table.Body>
                </Table.Root>
            </Flex>;
  }
}`,...(ke=(De=L.parameters)==null?void 0:De.docs)==null?void 0:ke.source}}};var Fe,_e,Ie;B.parameters={...B.parameters,docs:{...(Fe=B.parameters)==null?void 0:Fe.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => {
    const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
    const handleSelectAll = () => {
      if (selectedRows.size === TABLE_DATA.length) {
        setSelectedRows(new Set());
      } else {
        setSelectedRows(new Set(TABLE_DATA.map(user => user.id)));
      }
    };
    const handleSelectRow = (event: FormEvent<HTMLButtonElement>, id: number) => {
      event.stopPropagation();
      const newSelection = new Set(selectedRows);
      if (newSelection.has(id)) {
        newSelection.delete(id);
      } else {
        newSelection.add(id);
      }
      setSelectedRows(newSelection);
    };
    const isAllSelected = selectedRows.size === TABLE_DATA.length;
    const isPartiallySelected = selectedRows.size > 0 && selectedRows.size < TABLE_DATA.length;
    return <Table.Root {...args}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>
                            <Checkbox value={isPartiallySelected ? 'indeterminate' : isAllSelected} onChange={handleSelectAll} />
                        </Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Age</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {TABLE_DATA.map(user => <Table.Row key={user.id} selected={selectedRows.has(user.id)} onClick={() => console.log(\`View details for \${user.firstName}\`)}>
                            <Table.RowCell>
                                <Checkbox value={selectedRows.has(user.id)} onChange={event => handleSelectRow(event, user.id)} />
                            </Table.RowCell>
                            <Table.RowCell>{user.name}</Table.RowCell>
                            <Table.RowCell>{user.age}</Table.RowCell>
                        </Table.Row>)}
                </Table.Body>
            </Table.Root>;
  }
}`,...(Ie=(_e=B.parameters)==null?void 0:_e.docs)==null?void 0:Ie.source}}};var Ee,$e,Ve;D.parameters={...D.parameters,docs:{...(Ee=D.parameters)==null?void 0:Ee.docs,source:{originalSource:`{
  name: 'Cell Alignment Options',
  render: ({
    ...args
  }) => <Table.Root {...args}>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell align="left">Left Header</Table.HeaderCell>
                    <Table.HeaderCell align="center">Centered Header</Table.HeaderCell>
                    <Table.HeaderCell align="right">Right Header</Table.HeaderCell>
                    <Table.HeaderCell align="left">Mixed Alignment</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {TABLE_DATA.map(user => <Table.Row key={user.id} onClick={() => console.log(\`Clicked \${user.firstName}'s user\`)}>
                        <Table.RowCell align="left">{user.firstName}</Table.RowCell>
                        <Table.RowCell align="center">{user.role}</Table.RowCell>
                        <Table.RowCell align="right">{user.age}</Table.RowCell>
                        <Table.RowCell>
                            <Flex justify="space-between" align="center">
                                <span>{user.invited}</span>
                                <span>{user.lastLogin}</span>
                            </Flex>
                        </Table.RowCell>
                    </Table.Row>)}
            </Table.Body>
        </Table.Root>
}`,...(Ve=($e=D.parameters)==null?void 0:$e.docs)==null?void 0:Ve.source}}};var ze,We,Oe;k.parameters={...k.parameters,docs:{...(ze=k.parameters)==null?void 0:ze.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => <div style={{
    width: '800px'
  }}>
            <Table.Root {...args}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width="100px">Fixed Width & No Shrink</Table.HeaderCell>
                        <Table.HeaderCell width="100px" truncate>
                            Truncated Very Long Header Title That Should Be Cut Off
                        </Table.HeaderCell>
                        <Table.HeaderCell width="50%">Percentage Width</Table.HeaderCell>
                        <Table.HeaderCell>Auto Width</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {TABLE_DATA.map(user => <Table.Row key={user.id}>
                            <Table.RowCell>Fixed Width Content</Table.RowCell>
                            <Table.RowCell truncate>
                                {\`\${user.firstName} \${user.lastName} - \${user.role} - \${user.lastLogin}\`}
                            </Table.RowCell>
                            <Table.RowCell>Normal Cell</Table.RowCell>
                            <Table.RowCell>Auto Width Content</Table.RowCell>
                        </Table.Row>)}
                </Table.Body>
            </Table.Root>
        </div>
}`,...(Oe=(We=k.parameters)==null?void 0:We.docs)==null?void 0:Oe.source}}};const Vl=["Basic","AutoLayout","FixedLayout","NonFullWidth","Sortable","StickyHeader","StickyFirstColumn","Interactive","WithLinks","Disabled","WithCaption","TruncatedContent","WithSearchAndFilters","WithSelection","CellAlignments","WidthControl"];export{R as AutoLayout,x as Basic,D as CellAlignments,S as Disabled,g as FixedLayout,y as Interactive,p as NonFullWidth,j as Sortable,f as StickyFirstColumn,H as StickyHeader,N as TruncatedContent,k as WidthControl,A as WithCaption,v as WithLinks,L as WithSearchAndFilters,B as WithSelection,Vl as __namedExportsOrder,$l as default};
