import{j as e,F as T,r as C}from"./iframe-CBI3O4RD.js";import{h as W,i as $,j as al,k as rl}from"./fondue-icons369-CbTfuGaN.js";import{B as d}from"./Button-BVl8QLCc.js";import{a as V}from"./Checkbox-Cs3dRiu1.js";import{h as w}from"./Dropdown-XAr0sbJ3.js";import{S as M}from"./Switch-DQolRZKo.js";import{T as O}from"./TextInput-BlKJFrh_.js";import{T as sl,a as nl,b as il,c as ol,d as tl,e as dl,f as l}from"./Table-55dgkPW6.js";import"./preload-helper-mNEUNaaY.js";import"./styleUtilities-A7Ia-tuh.js";import"./focusStyle-CSp3JXta.js";import"./index-B03M6g3G.js";import"./index-BUvDLYP2.js";import"./index-DFifiIuC.js";import"./index-CnuFKASM.js";import"./index-D33IcAos.js";import"./index-LiOrJMEM.js";import"./index-JZ3s9IqL.js";import"./index-CkAtkCko.js";import"./index-BRG7g9oz.js";import"./component-CCx_p904.js";import"./index-DZlSGdl2.js";import"./useTranslation-XMRImJt8.js";import"./LoadingCircle-CKFR8m-B.js";import"./useSyncRefs-DDeXYnyr.js";import"./domUtilities-DGDVwu3_.js";import"./Box-BLe4oypA.js";const zl={title:"Components/Table",component:dl,subcomponents:{"Table.Header":tl,"Table.HeaderCell":ol,"Table.Body":il,"Table.Row":nl,"Table.RowCell":sl},tags:["autodocs"],parameters:{status:{type:"released"}},args:{"aria-label":"User Management Table"},argTypes:{layout:{control:{type:"select"},options:["auto","fixed"],defaultValue:"auto"},gutter:{control:{type:"text"},description:'Spacing between table cells (horizontal gutter). Accepts any CSS length value (e.g., "16px", "1rem", "48px")',defaultValue:"0px"}}},s=[{id:1,firstName:"Chris",lastName:"Glasser",name:"Chris Glasser",age:32,role:"Senior Developer",email:"c.a.glasser@outlook.com",invited:"Rhonda Rhodes",lastSeen:"Oct 23, 2024",initialLogin:"SSO",lastLogin:"SSO",twoFa:!0},{id:2,firstName:"David",lastName:"Elson",name:"David Elson",age:28,role:"Product Manager",email:"david29@gmail.com",invited:"Rodger Struck",lastSeen:"Oct 21, 2024",initialLogin:"SSO",lastLogin:"SSO",twoFa:!0},{id:3,firstName:"Eddie",lastName:"Lake",name:"Eddie Lake",age:35,role:"UX Designer",email:"eddie_lake@gmail.com",invited:"Frances Swann",lastSeen:"Nov 11, 2024",initialLogin:"SSO",lastLogin:"SSO",twoFa:!0},{id:4,firstName:"James",lastName:"Hall",name:"James Hall",age:41,role:"Technical Lead",email:"james_hall@gmail.com",invited:"Alex Buckmaster",lastSeen:"Nov 12, 2024",initialLogin:"SSO",lastLogin:"SSO",twoFa:!0},{id:5,firstName:"Jerry",lastName:"Helfer",name:"Jerry Helfer",age:39,role:"Frontend Developer",email:"jerry73@aol.com",invited:"Bradley Lawlor",lastSeen:"Nov 1, 2024",initialLogin:"SSO",lastLogin:"SSO",twoFa:!0}],x={render:({...r})=>e.jsxs(l.Root,{...r,children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Admin"}),e.jsx(l.HeaderCell,{children:"Invited by"}),e.jsx(l.HeaderCell,{children:"Last seen"}),e.jsx(l.HeaderCell,{children:"Initial login"}),e.jsx(l.HeaderCell,{children:"Last login"}),e.jsx(l.HeaderCell,{children:"2FA"}),e.jsx(l.HeaderCell,{children:"Analytics access"}),e.jsx(l.HeaderCell,{children:"Actions"})]})}),e.jsx(l.Body,{children:s.map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"tw-flex tw-items-center tw-gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"tw-font-medium",children:a.name}),e.jsx("div",{className:"tw-body-small tw-text-secondary",children:a.email})]})})}),e.jsx(l.RowCell,{children:e.jsx(M,{size:"small","aria-label":"Admin"})}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{children:a.lastSeen}),e.jsx(l.RowCell,{children:a.initialLogin}),e.jsx(l.RowCell,{children:a.lastLogin}),e.jsx(l.RowCell,{children:a.twoFa?"Yes":"No"}),e.jsx(l.RowCell,{children:e.jsx(M,{size:"small","aria-label":"Analytics"})}),e.jsx(l.RowCell,{children:e.jsxs(T,{gap:"0.25rem",children:[e.jsx(d,{size:"small",aspect:"square",emphasis:"weak",children:e.jsx(W,{size:16})}),e.jsx(d,{variant:"danger",size:"small",aspect:"square",emphasis:"weak",children:e.jsx($,{size:16})})]})})]},a.email))})]})},R={render:({...r})=>e.jsxs(l.Root,{...r,fontSize:"small",children:[e.jsx(l.Header,{children:e.jsxs("tr",{children:[e.jsx(l.HeaderCell,{width:"100px",children:"Name"}),e.jsx(l.HeaderCell,{children:"Role"}),e.jsx(l.HeaderCell,{children:"Last Seen"})]})}),e.jsx(l.Body,{children:s.map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:a.name}),e.jsx(l.RowCell,{children:a.role}),e.jsx(l.RowCell,{children:a.lastSeen})]},a.id))})]})},j={render:({...r})=>e.jsxs(l.Root,{...r,children:[e.jsx(l.Header,{children:e.jsxs("tr",{children:[e.jsx(l.HeaderCell,{width:"100px",children:"Name"}),e.jsx(l.HeaderCell,{children:"Role"}),e.jsx(l.HeaderCell,{children:"Last Seen"})]})}),e.jsx(l.Body,{children:s.map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:a.name}),e.jsx(l.RowCell,{children:a.role}),e.jsx(l.RowCell,{children:a.lastSeen})]},a.id))})]})},p={render:({...r})=>e.jsxs(l.Root,{...r,layout:"fixed",children:[e.jsx(l.Header,{children:e.jsxs("tr",{children:[e.jsx(l.HeaderCell,{width:"100px",children:"Name"}),e.jsx(l.HeaderCell,{children:"Role"}),e.jsx(l.HeaderCell,{children:"Last Seen"})]})}),e.jsx(l.Body,{children:s.map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:a.name}),e.jsx(l.RowCell,{children:a.role}),e.jsx(l.RowCell,{children:a.lastSeen})]},a.id))})]})},u={render:({...r})=>{const[a,o]=C.useState(null),[t,c]=C.useState(),h=[...s].sort((n,i)=>{if(!a||!t)return 0;const b=n[a],m=i[a];return t==="ascending"?b>m?1:-1:b<m?1:-1});return e.jsxs(l.Root,{...r,children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{sortDirection:a==="name"?t:void 0,onSortChange:n=>{o("name"),c(n)},children:"Name"}),e.jsx(l.HeaderCell,{truncate:!0,sortDirection:a==="invited"?t:void 0,onSortChange:n=>{o("invited"),c(n)},state:"loading",loadingStateAriaLabel:"Loading Data",children:"Invited by"}),e.jsx(l.HeaderCell,{sortDirection:a==="lastSeen"?t:void 0,onSortChange:n=>{o("lastSeen"),c(n)},children:"Last seen"})]})}),e.jsx(l.Body,{children:h.map(n=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"tw-flex tw-items-center tw-gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"tw-font-medium",children:n.name}),e.jsx("div",{className:"tw-body-small tw-text-secondary",children:n.email})]})})}),e.jsx(l.RowCell,{truncate:!0,children:n.invited}),e.jsx(l.RowCell,{children:n.lastSeen})]},n.email))})]})}},H={render:({...r})=>e.jsxs(l.Root,{...r,children:[e.jsx(l.Header,{sticky:!0,children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{width:"250px",children:"Name"}),e.jsx(l.HeaderCell,{width:"150px",children:"Invited by"}),e.jsx(l.HeaderCell,{width:"120px",children:"Last seen"}),e.jsx(l.HeaderCell,{width:"120px",children:"Initial login"}),e.jsx(l.HeaderCell,{width:"120px",children:"Last login"}),e.jsx(l.HeaderCell,{width:"80px",children:"2FA"})]})}),e.jsx(l.Body,{children:[...s,...s,...s,...s,...s,...s].map((a,o)=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"tw-flex tw-items-center tw-gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"tw-font-medium",children:a.name}),e.jsx("div",{className:"tw-body-small tw-text-secondary",children:a.email})]})})}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{children:a.lastSeen}),e.jsx(l.RowCell,{children:a.initialLogin}),e.jsx(l.RowCell,{children:a.lastLogin}),e.jsx(l.RowCell,{children:a.twoFa?"Yes":"No"})]},`${a.email}-${o}`))})]})},g={parameters:{viewport:{viewports:{mobile:{name:"Mobile",styles:{width:"320px",height:"600px"}}},defaultViewport:"mobile"}},render:({...r})=>e.jsxs(l.Root,{...r,children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Invited by"}),e.jsx(l.HeaderCell,{children:"Last seen"}),e.jsx(l.HeaderCell,{children:"Initial login"}),e.jsx(l.HeaderCell,{children:"Last login"}),e.jsx(l.HeaderCell,{children:"2FA"})]})}),e.jsx(l.Body,{firstColumnSticky:!0,children:s.map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"tw-flex tw-items-center tw-gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"tw-font-medium",children:a.name}),e.jsx("div",{className:"tw-body-small tw-text-secondary",children:a.email})]})})}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{children:a.lastSeen}),e.jsx(l.RowCell,{children:a.initialLogin}),e.jsx(l.RowCell,{children:a.lastLogin}),e.jsx(l.RowCell,{children:a.twoFa?"Yes":"No"})]},a.email))})]})},v={parameters:{viewport:{viewports:{mobile:{name:"Mobile",styles:{width:"320px",height:"600px"}}},defaultViewport:"mobile"}},render:({...r})=>e.jsxs(l.Root,{...r,children:[e.jsx(l.Header,{sticky:!0,children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Invited by"}),e.jsx(l.HeaderCell,{children:"Last seen"}),e.jsx(l.HeaderCell,{children:"Initial login"}),e.jsx(l.HeaderCell,{children:"Last login"}),e.jsx(l.HeaderCell,{children:"2FA"})]})}),e.jsx(l.Body,{firstColumnSticky:!0,children:[...s,...s,...s].map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"tw-flex tw-items-center tw-gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"tw-font-medium",children:a.name}),e.jsx("div",{className:"tw-body-small tw-text-secondary",children:a.email})]})})}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{children:a.lastSeen}),e.jsx(l.RowCell,{children:a.initialLogin}),e.jsx(l.RowCell,{children:a.lastLogin}),e.jsx(l.RowCell,{children:a.twoFa?"Yes":"No"})]},a.email))})]})},y={parameters:{viewport:{viewports:{mobile:{name:"Mobile",styles:{width:"320px",height:"600px"}}},defaultViewport:"mobile"}},render:({...r})=>e.jsxs(l.Root,{...r,children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Invited by"}),e.jsx(l.HeaderCell,{children:"Last seen"}),e.jsx(l.HeaderCell,{children:"Initial login"}),e.jsx(l.HeaderCell,{children:"Last login"}),e.jsx(l.HeaderCell,{children:"Actions"})]})}),e.jsx(l.Body,{lastColumnSticky:!0,children:s.map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"tw-flex tw-items-center tw-gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"tw-font-medium",children:a.name}),e.jsx("div",{className:"tw-text-small tw-text-primary-on-primary",children:a.email})]})})}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{children:a.lastSeen}),e.jsx(l.RowCell,{children:a.initialLogin}),e.jsx(l.RowCell,{children:a.lastLogin}),e.jsx(l.RowCell,{children:e.jsxs(T,{gap:"0.25rem",children:[e.jsx(d,{size:"small",aspect:"square",emphasis:"weak",children:e.jsx(W,{size:16})}),e.jsx(d,{variant:"danger",size:"small",aspect:"square",emphasis:"weak",children:e.jsx($,{size:16})})]})})]},a.email))})]})},S={parameters:{viewport:{viewports:{mobile:{name:"Mobile",styles:{width:"320px",height:"600px"}}},defaultViewport:"mobile"}},render:({...r})=>e.jsxs(l.Root,{...r,children:[e.jsx(l.Header,{sticky:!0,children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Invited by"}),e.jsx(l.HeaderCell,{children:"Last seen"}),e.jsx(l.HeaderCell,{children:"Initial login"}),e.jsx(l.HeaderCell,{children:"Last login"}),e.jsx(l.HeaderCell,{children:"Actions"})]})}),e.jsx(l.Body,{lastColumnSticky:!0,children:[...s,...s,...s].map((a,o)=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"tw-flex tw-items-center tw-gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"tw-font-medium",children:a.name}),e.jsx("div",{className:"tw-text-small tw-text-primary-on-primary",children:a.email})]})})}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{children:a.lastSeen}),e.jsx(l.RowCell,{children:a.initialLogin}),e.jsx(l.RowCell,{children:a.lastLogin}),e.jsx(l.RowCell,{children:e.jsxs(T,{gap:"0.25rem",children:[e.jsx(d,{size:"small",aspect:"square",emphasis:"weak",children:e.jsx(W,{size:16})}),e.jsx(d,{variant:"danger",size:"small",aspect:"square",emphasis:"weak",children:e.jsx($,{size:16})})]})})]},`${a.email}-${o}`))})]})},A={name:"Sticky Header, Left & Right Columns",parameters:{viewport:{viewports:{mobile:{name:"Mobile",styles:{width:"320px",height:"600px"}}},defaultViewport:"mobile"}},render:({...r})=>e.jsxs(l.Root,{...r,children:[e.jsx(l.Header,{sticky:!0,children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Invited by"}),e.jsx(l.HeaderCell,{children:"Last seen"}),e.jsx(l.HeaderCell,{children:"Initial login"}),e.jsx(l.HeaderCell,{children:"Last login"}),e.jsx(l.HeaderCell,{children:"Actions"})]})}),e.jsx(l.Body,{firstColumnSticky:!0,lastColumnSticky:!0,children:[...s,...s,...s].map((a,o)=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"tw-flex tw-items-center tw-gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"tw-font-medium",children:a.name}),e.jsx("div",{className:"tw-text-small tw-text-primary-on-primary",children:a.email})]})})}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{children:a.lastSeen}),e.jsx(l.RowCell,{children:a.initialLogin}),e.jsx(l.RowCell,{children:a.lastLogin}),e.jsx(l.RowCell,{children:e.jsxs(T,{gap:"0.25rem",children:[e.jsx(d,{size:"small",aspect:"square",emphasis:"weak",children:e.jsx(W,{size:16})}),e.jsx(d,{variant:"danger",size:"small",aspect:"square",emphasis:"weak",children:e.jsx($,{size:16})})]})})]},`${a.email}-${o}`))})]})},B={render:({...r})=>e.jsxs(l.Root,{...r,children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Invited by"}),e.jsx(l.HeaderCell,{children:"Last seen"}),e.jsx(l.HeaderCell,{children:"Action"})]})}),e.jsx(l.Body,{children:s.map(a=>e.jsxs(l.Row,{onClick:()=>alert(`Clicked on ${a.name}`),children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"tw-flex tw-items-center tw-gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"tw-font-medium",children:a.name}),e.jsx("div",{className:"tw-body-small tw-text-secondary",children:a.email})]})})}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{children:a.lastSeen}),e.jsx(l.RowCell,{children:e.jsx(d,{onPress:()=>alert("Button pressed — this does NOT trigger row click"),children:e.jsx("span",{children:"Press me"})})})]},a.email))})]})},L={render:({...r})=>e.jsxs(l.Root,{...r,children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Invited by"}),e.jsx(l.HeaderCell,{children:"Last seen"})]})}),e.jsx(l.Body,{children:s.map((a,o)=>e.jsxs(l.Row,{onClick:()=>alert(`Clicked on ${a.name}`),disabled:o%3===0,children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"tw-flex tw-items-center tw-gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"tw-font-medium",children:a.name}),e.jsx("div",{className:"tw-body-small tw-text-secondary",children:a.email})]})})}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{children:a.lastSeen})]},a.email))})]})},N={render:({...r})=>e.jsxs(l.Root,{...r,children:[e.jsx(l.Caption,{children:"User Management Dashboard"}),e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Invited by"}),e.jsx(l.HeaderCell,{children:"Last seen"})]})}),e.jsx(l.Body,{children:s.slice(0,5).map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"tw-flex tw-items-center tw-gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"tw-font-medium",children:a.name}),e.jsx("div",{className:"tw-body-small tw-text-secondary",children:a.email})]})})}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{children:a.lastSeen})]},a.email))})]})},f={render:({...r})=>e.jsx("div",{style:{width:"500px"},children:e.jsxs(l.Root,{...r,children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{truncate:!0,children:"Name"}),e.jsx(l.HeaderCell,{children:"Invited by"}),e.jsx(l.HeaderCell,{truncate:!0,children:"Last seen"})]})}),e.jsx(l.Body,{children:s.slice(0,5).map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{truncate:!0,children:a.name}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{truncate:!0,children:a.lastSeen})]},a.email))})]})})},k={render:({...r})=>{const[a,o]=C.useState(""),[t,c]=C.useState("all"),h=C.useMemo(()=>{let n=[...s];return a&&(n=n.filter(i=>i.firstName.toLowerCase().includes(a.toLowerCase())||i.lastName.toLowerCase().includes(a.toLowerCase()))),t!=="all"&&(n=n.filter(i=>t==="young"?i.age<30:i.age>=30)),n},[a,t]);return e.jsxs(T,{direction:"column",gap:"1rem",children:[e.jsxs(T,{gap:"1rem",children:[e.jsx(O,{placeholder:"Search...",value:a,onChange:n=>o(n.target.value),children:e.jsx(O.Slot,{children:e.jsx(al,{size:"16"})})}),e.jsxs(w.Root,{children:[e.jsx(w.Trigger,{children:e.jsxs(d,{emphasis:"default",children:[e.jsx(rl,{size:"16"}),"Filter by age"]})}),e.jsxs(w.Content,{children:[e.jsx(w.Item,{onSelect:()=>c("all"),children:"All"}),e.jsx(w.Item,{onSelect:()=>c("young"),children:"Young"}),e.jsx(w.Item,{onSelect:()=>c("old"),children:"Old"})]})]})]}),e.jsxs(l.Root,{...r,children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Age"}),e.jsx(l.HeaderCell,{children:"Role"})]})}),e.jsx(l.Body,{children:h.map(n=>e.jsxs(l.Row,{onClick:()=>console.log(`View details for ${n.firstName}`),children:[e.jsx(l.RowCell,{children:n.name}),e.jsx(l.RowCell,{children:n.age}),e.jsx(l.RowCell,{children:n.role})]},n.id))})]})]})}},D={render:({...r})=>{const[a,o]=C.useState(()=>new Set),t=()=>{a.size===s.length?o(new Set):o(new Set(s.map(i=>i.id)))},c=(i,b)=>{i.stopPropagation();const m=new Set(a);m.has(b)?m.delete(b):m.add(b),o(m)},h=a.size===s.length,n=a.size>0&&a.size<s.length;return e.jsxs(l.Root,{...r,"aria-multiselectable":!0,children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:e.jsx(V,{value:n?"indeterminate":h,onChange:t})}),e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Age"})]})}),e.jsx(l.Body,{children:s.map(i=>e.jsxs(l.Row,{selected:a.has(i.id),onClick:()=>console.log(`View details for ${i.firstName}`),children:[e.jsx(l.RowCell,{children:e.jsx(V,{value:a.has(i.id),onChange:b=>c(b,i.id)})}),e.jsx(l.RowCell,{children:i.name}),e.jsx(l.RowCell,{children:i.age})]},i.id))})]})}},F={name:"Cell Alignment Options",render:({...r})=>e.jsxs(l.Root,{...r,children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{align:"left",children:"Left Header"}),e.jsx(l.HeaderCell,{align:"center",children:"Centered Header"}),e.jsx(l.HeaderCell,{align:"right",children:"Right Header"}),e.jsx(l.HeaderCell,{align:"left",children:"Mixed Alignment"})]})}),e.jsx(l.Body,{children:s.map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{align:"left",children:a.firstName}),e.jsx(l.RowCell,{align:"center",children:a.role}),e.jsx(l.RowCell,{align:"right",children:a.age}),e.jsx(l.RowCell,{children:e.jsxs(T,{justify:"space-between",align:"center",children:[e.jsx("span",{children:a.invited}),e.jsx("span",{children:a.lastLogin})]})})]},a.id))})]})},I={render:({...r})=>e.jsx("div",{style:{width:"800px"},children:e.jsxs(l.Root,{...r,layout:"fixed",children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{width:"100px",children:"Fixed Width & No Shrink"}),e.jsx(l.HeaderCell,{width:"100px",truncate:!0,children:"Truncated Very Long Header Title That Should Be Cut Off"}),e.jsx(l.HeaderCell,{width:"50%",children:"Percentage Width"}),e.jsx(l.HeaderCell,{children:"Auto Width"})]})}),e.jsx(l.Body,{children:s.map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:"Fixed Width Content"}),e.jsx(l.RowCell,{truncate:!0,children:`${a.firstName} ${a.lastName} - ${a.role} - ${a.lastLogin}`}),e.jsx(l.RowCell,{children:"Normal Cell"}),e.jsx(l.RowCell,{children:"Auto Width Content"})]},a.id))})]})})},E={name:"No Border (Within Container)",render:({...r})=>e.jsxs(T,{direction:"column",gap:"2rem",children:[e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"0.5rem"},children:"Without noBorder (default)"}),e.jsx("div",{style:{border:"1px solid var(--color-line-mid)",borderRadius:"8px",padding:"0 1rem"},children:e.jsxs(l.Root,{...r,children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Role"}),e.jsx(l.HeaderCell,{children:"Last Seen"})]})}),e.jsx(l.Body,{children:s.slice(0,3).map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:a.name}),e.jsx(l.RowCell,{children:a.role}),e.jsx(l.RowCell,{children:a.lastSeen})]},a.id))})]})})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"0.5rem"},children:"With noBorder=true"}),e.jsx("div",{style:{border:"1px solid var(--color-line-mid)",borderRadius:"8px",padding:"0 1rem"},children:e.jsxs(l.Root,{...r,noBorder:!0,children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Role"}),e.jsx(l.HeaderCell,{children:"Last Seen"})]})}),e.jsx(l.Body,{children:s.slice(0,3).map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:a.name}),e.jsx(l.RowCell,{children:a.role}),e.jsx(l.RowCell,{children:a.lastSeen})]},a.id))})]})})]})]})},z={name:"Custom Gutter Spacing",render:({...r})=>e.jsxs(T,{direction:"column",gap:"2rem",children:[e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"0.5rem"},children:"Default (no extra gutter)"}),e.jsxs(l.Root,{...r,children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Role"}),e.jsx(l.HeaderCell,{children:"Last Seen"})]})}),e.jsx(l.Body,{children:s.slice(0,3).map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:a.name}),e.jsx(l.RowCell,{children:a.role}),e.jsx(l.RowCell,{children:a.lastSeen})]},a.id))})]})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"0.5rem"},children:"16px gutter"}),e.jsxs(l.Root,{...r,gutter:"16px",children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Role"}),e.jsx(l.HeaderCell,{children:"Last Seen"})]})}),e.jsx(l.Body,{children:s.slice(0,3).map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:a.name}),e.jsx(l.RowCell,{children:a.role}),e.jsx(l.RowCell,{children:a.lastSeen})]},a.id))})]})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"0.5rem"},children:"48px gutter"}),e.jsxs(l.Root,{...r,gutter:"48px",children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Role"}),e.jsx(l.HeaderCell,{children:"Last Seen"})]})}),e.jsx(l.Body,{children:s.slice(0,3).map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:a.name}),e.jsx(l.RowCell,{children:a.role}),e.jsx(l.RowCell,{children:a.lastSeen})]},a.id))})]})]})]})},_={name:"Minimum Width Columns (Last Expands)",render:({...r})=>e.jsxs(l.Root,{...r,children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{noShrink:!0,children:"Name"}),e.jsx(l.HeaderCell,{noShrink:!0,children:"Role"}),e.jsx(l.HeaderCell,{children:"Last Seen (Expands)"})]})}),e.jsx(l.Body,{children:s.slice(0,3).map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:a.name}),e.jsx(l.RowCell,{children:a.role}),e.jsx(l.RowCell,{children:a.lastSeen})]},a.id))})]})};var q,P,Y;x.parameters={...x.parameters,docs:{...(q=x.parameters)==null?void 0:q.docs,source:{originalSource:`{
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
                            <div className="tw-flex tw-items-center tw-gap-2">
                                <div>
                                    <div className="tw-font-medium">{user.name}</div>
                                    <div className="tw-body-small tw-text-secondary">{user.email}</div>
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
}`,...(Y=(P=x.parameters)==null?void 0:P.docs)==null?void 0:Y.source}}};var U,G,J;R.parameters={...R.parameters,docs:{...(U=R.parameters)==null?void 0:U.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => <Table.Root {...args} fontSize="small">
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
}`,...(J=(G=R.parameters)==null?void 0:G.docs)==null?void 0:J.source}}};var X,K,Q;j.parameters={...j.parameters,docs:{...(X=j.parameters)==null?void 0:X.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => <Table.Root {...args}>
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
}`,...(Q=(K=j.parameters)==null?void 0:K.docs)==null?void 0:Q.source}}};var Z,ee,le;p.parameters={...p.parameters,docs:{...(Z=p.parameters)==null?void 0:Z.docs,source:{originalSource:`{
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
}`,...(le=(ee=p.parameters)==null?void 0:ee.docs)==null?void 0:le.source}}};var ae,re,se;u.parameters={...u.parameters,docs:{...(ae=u.parameters)==null?void 0:ae.docs,source:{originalSource:`{
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
                        <Table.HeaderCell truncate sortDirection={sortField === 'invited' ? sortDirection : undefined} onSortChange={direction => {
            setSortField('invited');
            setSortDirection(direction);
          }} state="loading" loadingStateAriaLabel="Loading Data">
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
                                <div className="tw-flex tw-items-center tw-gap-2">
                                    <div>
                                        <div className="tw-font-medium">{user.name}</div>
                                        <div className="tw-body-small tw-text-secondary">{user.email}</div>
                                    </div>
                                </div>
                            </Table.RowCell>
                            <Table.RowCell truncate>{user.invited}</Table.RowCell>
                            <Table.RowCell>{user.lastSeen}</Table.RowCell>
                        </Table.Row>)}
                </Table.Body>
            </Table.Root>;
  }
}`,...(se=(re=u.parameters)==null?void 0:re.docs)==null?void 0:se.source}}};var ne,ie,oe;H.parameters={...H.parameters,docs:{...(ne=H.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => <Table.Root {...args}>
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
                                <div className="tw-flex tw-items-center tw-gap-2">
                                    <div>
                                        <div className="tw-font-medium">{user.name}</div>
                                        <div className="tw-body-small tw-text-secondary">{user.email}</div>
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
}`,...(oe=(ie=H.parameters)==null?void 0:ie.docs)==null?void 0:oe.source}}};var te,de,ce;g.parameters={...g.parameters,docs:{...(te=g.parameters)==null?void 0:te.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '320px',
            height: '600px'
          }
        }
      },
      defaultViewport: 'mobile'
    }
  },
  render: ({
    ...args
  }) => <Table.Root {...args}>
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
            <Table.Body firstColumnSticky>
                {TABLE_DATA.map(user => <Table.Row key={user.email}>
                        <Table.RowCell>
                            <div className="tw-flex tw-items-center tw-gap-2">
                                <div>
                                    <div className="tw-font-medium">{user.name}</div>
                                    <div className="tw-body-small tw-text-secondary">{user.email}</div>
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
}`,...(ce=(de=g.parameters)==null?void 0:de.docs)==null?void 0:ce.source}}};var Te,be,me;v.parameters={...v.parameters,docs:{...(Te=v.parameters)==null?void 0:Te.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '320px',
            height: '600px'
          }
        }
      },
      defaultViewport: 'mobile'
    }
  },
  render: ({
    ...args
  }) => <Table.Root {...args}>
            <Table.Header sticky>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Invited by</Table.HeaderCell>
                    <Table.HeaderCell>Last seen</Table.HeaderCell>
                    <Table.HeaderCell>Initial login</Table.HeaderCell>
                    <Table.HeaderCell>Last login</Table.HeaderCell>
                    <Table.HeaderCell>2FA</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body firstColumnSticky>
                {[...TABLE_DATA, ...TABLE_DATA, ...TABLE_DATA].map(user => <Table.Row key={user.email}>
                        <Table.RowCell>
                            <div className="tw-flex tw-items-center tw-gap-2">
                                <div>
                                    <div className="tw-font-medium">{user.name}</div>
                                    <div className="tw-body-small tw-text-secondary">{user.email}</div>
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
}`,...(me=(be=v.parameters)==null?void 0:be.docs)==null?void 0:me.source}}};var we,Ce,he;y.parameters={...y.parameters,docs:{...(we=y.parameters)==null?void 0:we.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '320px',
            height: '600px'
          }
        }
      },
      defaultViewport: 'mobile'
    }
  },
  render: ({
    ...args
  }) => <Table.Root {...args}>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Invited by</Table.HeaderCell>
                    <Table.HeaderCell>Last seen</Table.HeaderCell>
                    <Table.HeaderCell>Initial login</Table.HeaderCell>
                    <Table.HeaderCell>Last login</Table.HeaderCell>
                    <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body lastColumnSticky>
                {TABLE_DATA.map(user => <Table.Row key={user.email}>
                        <Table.RowCell>
                            <div className="tw-flex tw-items-center tw-gap-2">
                                <div>
                                    <div className="tw-font-medium">{user.name}</div>
                                    <div className="tw-text-small tw-text-primary-on-primary">{user.email}</div>
                                </div>
                            </div>
                        </Table.RowCell>
                        <Table.RowCell>{user.invited}</Table.RowCell>
                        <Table.RowCell>{user.lastSeen}</Table.RowCell>
                        <Table.RowCell>{user.initialLogin}</Table.RowCell>
                        <Table.RowCell>{user.lastLogin}</Table.RowCell>
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
}`,...(he=(Ce=y.parameters)==null?void 0:Ce.docs)==null?void 0:he.source}}};var xe,Re,je;S.parameters={...S.parameters,docs:{...(xe=S.parameters)==null?void 0:xe.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '320px',
            height: '600px'
          }
        }
      },
      defaultViewport: 'mobile'
    }
  },
  render: ({
    ...args
  }) => <Table.Root {...args}>
            <Table.Header sticky>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Invited by</Table.HeaderCell>
                    <Table.HeaderCell>Last seen</Table.HeaderCell>
                    <Table.HeaderCell>Initial login</Table.HeaderCell>
                    <Table.HeaderCell>Last login</Table.HeaderCell>
                    <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body lastColumnSticky>
                {[...TABLE_DATA, ...TABLE_DATA, ...TABLE_DATA].map((user, index) => <Table.Row key={\`\${user.email}-\${index}\`}>
                        <Table.RowCell>
                            <div className="tw-flex tw-items-center tw-gap-2">
                                <div>
                                    <div className="tw-font-medium">{user.name}</div>
                                    <div className="tw-text-small tw-text-primary-on-primary">{user.email}</div>
                                </div>
                            </div>
                        </Table.RowCell>
                        <Table.RowCell>{user.invited}</Table.RowCell>
                        <Table.RowCell>{user.lastSeen}</Table.RowCell>
                        <Table.RowCell>{user.initialLogin}</Table.RowCell>
                        <Table.RowCell>{user.lastLogin}</Table.RowCell>
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
}`,...(je=(Re=S.parameters)==null?void 0:Re.docs)==null?void 0:je.source}}};var pe,ue,He;A.parameters={...A.parameters,docs:{...(pe=A.parameters)==null?void 0:pe.docs,source:{originalSource:`{
  name: 'Sticky Header, Left & Right Columns',
  parameters: {
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '320px',
            height: '600px'
          }
        }
      },
      defaultViewport: 'mobile'
    }
  },
  render: ({
    ...args
  }) => <Table.Root {...args}>
            <Table.Header sticky>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Invited by</Table.HeaderCell>
                    <Table.HeaderCell>Last seen</Table.HeaderCell>
                    <Table.HeaderCell>Initial login</Table.HeaderCell>
                    <Table.HeaderCell>Last login</Table.HeaderCell>
                    <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body firstColumnSticky lastColumnSticky>
                {[...TABLE_DATA, ...TABLE_DATA, ...TABLE_DATA].map((user, index) => <Table.Row key={\`\${user.email}-\${index}\`}>
                        <Table.RowCell>
                            <div className="tw-flex tw-items-center tw-gap-2">
                                <div>
                                    <div className="tw-font-medium">{user.name}</div>
                                    <div className="tw-text-small tw-text-primary-on-primary">{user.email}</div>
                                </div>
                            </div>
                        </Table.RowCell>
                        <Table.RowCell>{user.invited}</Table.RowCell>
                        <Table.RowCell>{user.lastSeen}</Table.RowCell>
                        <Table.RowCell>{user.initialLogin}</Table.RowCell>
                        <Table.RowCell>{user.lastLogin}</Table.RowCell>
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
}`,...(He=(ue=A.parameters)==null?void 0:ue.docs)==null?void 0:He.source}}};var ge,ve,ye;B.parameters={...B.parameters,docs:{...(ge=B.parameters)==null?void 0:ge.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => <Table.Root {...args}>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Invited by</Table.HeaderCell>
                    <Table.HeaderCell>Last seen</Table.HeaderCell>
                    <Table.HeaderCell>Action</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {TABLE_DATA.map(user => <Table.Row key={user.email} onClick={() => alert(\`Clicked on \${user.name}\`)}>
                        <Table.RowCell>
                            <div className="tw-flex tw-items-center tw-gap-2">
                                <div>
                                    <div className="tw-font-medium">{user.name}</div>
                                    <div className="tw-body-small tw-text-secondary">{user.email}</div>
                                </div>
                            </div>
                        </Table.RowCell>
                        <Table.RowCell>{user.invited}</Table.RowCell>
                        <Table.RowCell>{user.lastSeen}</Table.RowCell>
                        <Table.RowCell>
                            <Button onPress={() => alert('Button pressed — this does NOT trigger row click')}>
                                <span>Press me</span>
                            </Button>
                        </Table.RowCell>
                    </Table.Row>)}
            </Table.Body>
        </Table.Root>
}`,...(ye=(ve=B.parameters)==null?void 0:ve.docs)==null?void 0:ye.source}}};var Se,Ae,Be;L.parameters={...L.parameters,docs:{...(Se=L.parameters)==null?void 0:Se.docs,source:{originalSource:`{
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
                            <div className="tw-flex tw-items-center tw-gap-2">
                                <div>
                                    <div className="tw-font-medium">{user.name}</div>
                                    <div className="tw-body-small tw-text-secondary">{user.email}</div>
                                </div>
                            </div>
                        </Table.RowCell>
                        <Table.RowCell>{user.invited}</Table.RowCell>
                        <Table.RowCell>{user.lastSeen}</Table.RowCell>
                    </Table.Row>)}
            </Table.Body>
        </Table.Root>
}`,...(Be=(Ae=L.parameters)==null?void 0:Ae.docs)==null?void 0:Be.source}}};var Le,Ne,fe;N.parameters={...N.parameters,docs:{...(Le=N.parameters)==null?void 0:Le.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => <Table.Root {...args}>
            <Table.Caption>User Management Dashboard</Table.Caption>
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
                            <div className="tw-flex tw-items-center tw-gap-2">
                                <div>
                                    <div className="tw-font-medium">{user.name}</div>
                                    <div className="tw-body-small tw-text-secondary">{user.email}</div>
                                </div>
                            </div>
                        </Table.RowCell>
                        <Table.RowCell>{user.invited}</Table.RowCell>
                        <Table.RowCell>{user.lastSeen}</Table.RowCell>
                    </Table.Row>)}
            </Table.Body>
        </Table.Root>
}`,...(fe=(Ne=N.parameters)==null?void 0:Ne.docs)==null?void 0:fe.source}}};var ke,De,Fe;f.parameters={...f.parameters,docs:{...(ke=f.parameters)==null?void 0:ke.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => <div style={{
    width: '500px'
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
}`,...(Fe=(De=f.parameters)==null?void 0:De.docs)==null?void 0:Fe.source}}};var Ie,Ee,ze;k.parameters={...k.parameters,docs:{...(Ie=k.parameters)==null?void 0:Ie.docs,source:{originalSource:`{
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
}`,...(ze=(Ee=k.parameters)==null?void 0:Ee.docs)==null?void 0:ze.source}}};var _e,We,$e;D.parameters={...D.parameters,docs:{...(_e=D.parameters)==null?void 0:_e.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => {
    const [selectedRows, setSelectedRows] = useState<Set<number>>(() => new Set());
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
    return <Table.Root {...args} aria-multiselectable>
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
}`,...($e=(We=D.parameters)==null?void 0:We.docs)==null?void 0:$e.source}}};var Ve,Me,Oe;F.parameters={...F.parameters,docs:{...(Ve=F.parameters)==null?void 0:Ve.docs,source:{originalSource:`{
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
                {TABLE_DATA.map(user => <Table.Row key={user.id}>
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
}`,...(Oe=(Me=F.parameters)==null?void 0:Me.docs)==null?void 0:Oe.source}}};var qe,Pe,Ye;I.parameters={...I.parameters,docs:{...(qe=I.parameters)==null?void 0:qe.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => <div style={{
    width: '800px'
  }}>
            <Table.Root {...args} layout="fixed">
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
}`,...(Ye=(Pe=I.parameters)==null?void 0:Pe.docs)==null?void 0:Ye.source}}};var Ue,Ge,Je;E.parameters={...E.parameters,docs:{...(Ue=E.parameters)==null?void 0:Ue.docs,source:{originalSource:`{
  name: 'No Border (Within Container)',
  render: ({
    ...args
  }) => <Flex direction="column" gap="2rem">
            <div>
                <h3 style={{
        marginBottom: '0.5rem'
      }}>Without noBorder (default)</h3>
                <div style={{
        border: '1px solid var(--color-line-mid)',
        borderRadius: '8px',
        padding: '0 1rem'
      }}>
                    <Table.Root {...args}>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Role</Table.HeaderCell>
                                <Table.HeaderCell>Last Seen</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {TABLE_DATA.slice(0, 3).map(user => <Table.Row key={user.id}>
                                    <Table.RowCell>{user.name}</Table.RowCell>
                                    <Table.RowCell>{user.role}</Table.RowCell>
                                    <Table.RowCell>{user.lastSeen}</Table.RowCell>
                                </Table.Row>)}
                        </Table.Body>
                    </Table.Root>
                </div>
            </div>
            <div>
                <h3 style={{
        marginBottom: '0.5rem'
      }}>With noBorder=true</h3>
                <div style={{
        border: '1px solid var(--color-line-mid)',
        borderRadius: '8px',
        padding: '0 1rem'
      }}>
                    <Table.Root {...args} noBorder>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Role</Table.HeaderCell>
                                <Table.HeaderCell>Last Seen</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {TABLE_DATA.slice(0, 3).map(user => <Table.Row key={user.id}>
                                    <Table.RowCell>{user.name}</Table.RowCell>
                                    <Table.RowCell>{user.role}</Table.RowCell>
                                    <Table.RowCell>{user.lastSeen}</Table.RowCell>
                                </Table.Row>)}
                        </Table.Body>
                    </Table.Root>
                </div>
            </div>
        </Flex>
}`,...(Je=(Ge=E.parameters)==null?void 0:Ge.docs)==null?void 0:Je.source}}};var Xe,Ke,Qe;z.parameters={...z.parameters,docs:{...(Xe=z.parameters)==null?void 0:Xe.docs,source:{originalSource:`{
  name: 'Custom Gutter Spacing',
  render: ({
    ...args
  }) => <Flex direction="column" gap="2rem">
            <div>
                <h3 style={{
        marginBottom: '0.5rem'
      }}>Default (no extra gutter)</h3>
                <Table.Root {...args}>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Role</Table.HeaderCell>
                            <Table.HeaderCell>Last Seen</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {TABLE_DATA.slice(0, 3).map(user => <Table.Row key={user.id}>
                                <Table.RowCell>{user.name}</Table.RowCell>
                                <Table.RowCell>{user.role}</Table.RowCell>
                                <Table.RowCell>{user.lastSeen}</Table.RowCell>
                            </Table.Row>)}
                    </Table.Body>
                </Table.Root>
            </div>
            <div>
                <h3 style={{
        marginBottom: '0.5rem'
      }}>16px gutter</h3>
                <Table.Root {...args} gutter="16px">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Role</Table.HeaderCell>
                            <Table.HeaderCell>Last Seen</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {TABLE_DATA.slice(0, 3).map(user => <Table.Row key={user.id}>
                                <Table.RowCell>{user.name}</Table.RowCell>
                                <Table.RowCell>{user.role}</Table.RowCell>
                                <Table.RowCell>{user.lastSeen}</Table.RowCell>
                            </Table.Row>)}
                    </Table.Body>
                </Table.Root>
            </div>
            <div>
                <h3 style={{
        marginBottom: '0.5rem'
      }}>48px gutter</h3>
                <Table.Root {...args} gutter="48px">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Role</Table.HeaderCell>
                            <Table.HeaderCell>Last Seen</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {TABLE_DATA.slice(0, 3).map(user => <Table.Row key={user.id}>
                                <Table.RowCell>{user.name}</Table.RowCell>
                                <Table.RowCell>{user.role}</Table.RowCell>
                                <Table.RowCell>{user.lastSeen}</Table.RowCell>
                            </Table.Row>)}
                    </Table.Body>
                </Table.Root>
            </div>
        </Flex>
}`,...(Qe=(Ke=z.parameters)==null?void 0:Ke.docs)==null?void 0:Qe.source}}};var Ze,el,ll;_.parameters={..._.parameters,docs:{...(Ze=_.parameters)==null?void 0:Ze.docs,source:{originalSource:`{
  name: 'Minimum Width Columns (Last Expands)',
  render: ({
    ...args
  }) => <Table.Root {...args}>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell noShrink>Name</Table.HeaderCell>
                    <Table.HeaderCell noShrink>Role</Table.HeaderCell>
                    <Table.HeaderCell>Last Seen (Expands)</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {TABLE_DATA.slice(0, 3).map(user => <Table.Row key={user.id}>
                        <Table.RowCell>{user.name}</Table.RowCell>
                        <Table.RowCell>{user.role}</Table.RowCell>
                        <Table.RowCell>{user.lastSeen}</Table.RowCell>
                    </Table.Row>)}
            </Table.Body>
        </Table.Root>
}`,...(ll=(el=_.parameters)==null?void 0:el.docs)==null?void 0:ll.source}}};const _l=["Basic","SmallText","AutoLayout","FixedLayout","Sortable","StickyHead","StickyFirstColumn","StickyHeadAndCol","StickyRightColumn","StickyHeaderAndRightColumn","StickyAllDirections","Interactive","Disabled","WithCaption","TruncatedContent","WithSearchAndFilters","WithSelection","CellAlignments","WidthControl","NoBorder","CustomGutter","MinimumWidthColumnsWithExpandingLast"];export{j as AutoLayout,x as Basic,F as CellAlignments,z as CustomGutter,L as Disabled,p as FixedLayout,B as Interactive,_ as MinimumWidthColumnsWithExpandingLast,E as NoBorder,R as SmallText,u as Sortable,A as StickyAllDirections,g as StickyFirstColumn,H as StickyHead,v as StickyHeadAndCol,S as StickyHeaderAndRightColumn,y as StickyRightColumn,f as TruncatedContent,I as WidthControl,N as WithCaption,k as WithSearchAndFilters,D as WithSelection,_l as __namedExportsOrder,zl as default};
