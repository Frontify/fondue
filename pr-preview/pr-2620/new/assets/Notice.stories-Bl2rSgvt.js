import{j as s}from"./iframe-Daulk9LM.js";import{n as r,b as a,r as A,l as B,e as t}from"./fondue-icons372-BWvkyUkX.js";import{B as o}from"./Button-D1dvcQ-R.js";import{N as i}from"./Notice-Ez22a8U7.js";import"./preload-helper-DI-8CSFo.js";import"./useTranslation-NqToP_WS.js";const{action:n}=__STORYBOOK_MODULE_ACTIONS__,Se={title:"Components/Notice",component:i,tags:["autodocs"],parameters:{status:{type:"released"},docs:{description:{component:["The notice component is a persistent, inline message that communicates important information, status updates, or actions within the context of the UI.","","It helps keep users informed without interrupting their workflow by presenting clear, accessible feedback that stays visible until acknowledged.","","A notice is made up of clearly defined parts that work together to deliver information and optionally prompt a response. Each element plays a specific role in supporting the overall purpose of the message — whether it's informing the user, alerting them, or encouraging a quick action.","","**Emphasis:** Emphasis controls the visual weight of a notice and shapes how users perceive its importance. `default` for standard messages that don't need to compete for attention, `strong` to draw attention to critical or high-priority information, and `weak` for subtle messages that are informative but not urgent.","","**Variant:** Variants communicate the tone and intent of a notice. `default` for general-purpose messages without emotional weight or urgency, `highlight` for informational messages that are noteworthy but not critical, `positive` for success or confirmation, `warning` for caution when something needs attention but isn't dangerous, and `danger` for high-priority or critical messages such as errors requiring immediate action — use carefully and sparingly.","","**Icon:** Using an icon in a notice can enhance its recognizability and convey its function more intuitively, improving usability by allowing users to quickly grasp the meaning of the message without relying solely on text.","","**Dismissible:** When a notice is dismissible, a close icon is displayed, allowing users to remove the message.","","**Button:** Use a button when there's a clear, lightweight action that directly relates to the message content. Avoid using this prop if no immediate action is needed.","","**In the dark:** To ensure all notice components work seamlessly in dark mode, each color token is paired with a themed counterpart. When the dark theme is active, tokens automatically switch to their dark variants."].join(`
`)}}},args:{variant:"default",emphasis:"default",size:"medium"}},c={render:e=>s.jsx(i,{...e,children:"Neutral message text"})},m={render:e=>s.jsx(i,{...e,icon:s.jsx(r,{size:"16"}),children:"Neutral message text"})},d={args:{onDismiss:n("onDismiss")},render:e=>s.jsx(i,{...e,icon:s.jsx(r,{size:"16"}),children:"Neutral message text"})},l={render:e=>s.jsx(i,{...e,icon:s.jsx(r,{size:"16"}),action:s.jsxs(o,{size:"small",emphasis:"default",onPress:n("undo"),children:[s.jsx(a,{size:16}),"Undo"]}),children:"Neutral message text"})},u={args:{onDismiss:n("onDismiss")},render:e=>s.jsx(i,{...e,icon:s.jsx(r,{size:"16"}),action:s.jsxs(o,{size:"small",emphasis:"default",onPress:n("undo"),children:[s.jsx(a,{size:16}),"Undo"]}),children:"Neutral message text"})},g={args:{variant:"highlight"},render:e=>s.jsx(i,{...e,icon:s.jsx(r,{size:"16"}),children:"Highlight message text"})},h={args:{variant:"positive"},render:e=>s.jsx(i,{...e,icon:s.jsx(A,{size:"16"}),children:"Success message text"})},p={args:{variant:"danger"},render:e=>s.jsx(i,{...e,icon:s.jsx(B,{size:"16"}),children:"Error message text"})},z={args:{variant:"warning"},render:e=>s.jsx(i,{...e,icon:s.jsx(B,{size:"16"}),children:"Warning message text"})},x={args:{emphasis:"strong",variant:"positive"},render:e=>s.jsx(i,{...e,icon:s.jsx(A,{size:"16"}),children:"Strong emphasis message"})},f={args:{emphasis:"weak",variant:"positive"},render:e=>s.jsx(i,{...e,icon:s.jsx(A,{size:"16"}),children:"Weak emphasis message"})},w={args:{size:"large"},render:e=>s.jsx(i,{...e,icon:s.jsx(r,{size:"20"}),action:s.jsxs(o,{size:"small",emphasis:"default",onPress:n("undo"),children:[s.jsx(a,{size:16}),"Undo"]}),onDismiss:n("onDismiss"),children:"This is a large notice with more vertical space"})},v={render:e=>s.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-4",children:[s.jsx(i,{...e,variant:"default",icon:s.jsx(r,{size:"16"}),children:"Default variant"}),s.jsx(i,{...e,variant:"highlight",icon:s.jsx(r,{size:"16"}),children:"Highlight variant"}),s.jsx(i,{...e,variant:"positive",icon:s.jsx(A,{size:"16"}),children:"Positive variant"}),s.jsx(i,{...e,variant:"danger",icon:s.jsx(B,{size:"16"}),children:"Danger variant"}),s.jsx(i,{...e,variant:"warning",icon:s.jsx(B,{size:"16"}),children:"Warning variant"})]})},N={args:{variant:"positive"},render:e=>s.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-4",children:[s.jsx(i,{...e,emphasis:"strong",icon:s.jsx(A,{size:"16"}),children:"Strong emphasis"}),s.jsx(i,{...e,emphasis:"default",icon:s.jsx(A,{size:"16"}),children:"Default emphasis"}),s.jsx(i,{...e,emphasis:"weak",icon:s.jsx(A,{size:"16"}),children:"Weak emphasis"})]})},D={render:e=>s.jsx(i,{...e,icon:s.jsx(r,{size:"16"}),action:s.jsx(o,{size:"small",emphasis:"default",onPress:n("learn-more"),children:"Learn More"}),onDismiss:n("onDismiss"),children:"This is a notice with much longer content to demonstrate how the component handles text wrapping. The content area should expand to accommodate all the text while maintaining proper spacing between elements."})},I={render:e=>s.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-4",children:[s.jsx(i,{...e,variant:"default",icon:s.jsx(t,{size:"16"}),action:s.jsxs(o,{size:"small",emphasis:"default",onPress:n("undo"),children:[s.jsx(a,{size:16}),"Undo"]}),onDismiss:n("onDismiss"),children:"Neutral message text"}),s.jsx(i,{...e,variant:"highlight",icon:s.jsx(t,{size:"16"}),action:s.jsxs(o,{size:"small",emphasis:"default",onPress:n("undo"),children:[s.jsx(a,{size:16}),"Undo"]}),onDismiss:n("onDismiss"),children:"Highlight message text"}),s.jsx(i,{...e,variant:"positive",icon:s.jsx(t,{size:"16"}),action:s.jsxs(o,{size:"small",emphasis:"default",onPress:n("undo"),children:[s.jsx(a,{size:16}),"Undo"]}),onDismiss:n("onDismiss"),children:"Positive message text"}),s.jsx(i,{...e,variant:"warning",icon:s.jsx(t,{size:"16"}),action:s.jsxs(o,{size:"small",emphasis:"default",onPress:n("undo"),children:[s.jsx(a,{size:16}),"Undo"]}),onDismiss:n("onDismiss"),children:"Warning message text"}),s.jsx(i,{...e,variant:"danger",icon:s.jsx(t,{size:"16"}),action:s.jsxs(o,{size:"small",emphasis:"default",onPress:n("undo"),children:[s.jsx(a,{size:16}),"Undo"]}),onDismiss:n("onDismiss"),children:"Danger message text"})]})},k={render:e=>s.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-4",children:[s.jsx(i,{...e,variant:"default",emphasis:"weak",icon:s.jsx(t,{size:"16"}),action:s.jsxs(o,{size:"small",emphasis:"default",onPress:n("undo"),children:[s.jsx(a,{size:16}),"Undo"]}),onDismiss:n("onDismiss"),children:"Neutral message text"}),s.jsx(i,{...e,variant:"highlight",emphasis:"weak",icon:s.jsx(t,{size:"16"}),action:s.jsxs(o,{size:"small",emphasis:"default",onPress:n("undo"),children:[s.jsx(a,{size:16}),"Undo"]}),onDismiss:n("onDismiss"),children:"Highlight message text"}),s.jsx(i,{...e,variant:"positive",emphasis:"weak",icon:s.jsx(t,{size:"16"}),action:s.jsxs(o,{size:"small",emphasis:"default",onPress:n("undo"),children:[s.jsx(a,{size:16}),"Undo"]}),onDismiss:n("onDismiss"),children:"Positive message text"}),s.jsx(i,{...e,variant:"warning",emphasis:"weak",icon:s.jsx(t,{size:"16"}),action:s.jsxs(o,{size:"small",emphasis:"default",onPress:n("undo"),children:[s.jsx(a,{size:16}),"Undo"]}),onDismiss:n("onDismiss"),children:"Warning message text"}),s.jsx(i,{...e,variant:"danger",emphasis:"weak",icon:s.jsx(t,{size:"16"}),action:s.jsxs(o,{size:"small",emphasis:"default",onPress:n("undo"),children:[s.jsx(a,{size:16}),"Undo"]}),onDismiss:n("onDismiss"),children:"Danger message text"})]})},j={render:e=>s.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-4",children:[s.jsx(i,{...e,variant:"default",emphasis:"strong",icon:s.jsx(t,{size:"16"}),action:s.jsxs(o,{size:"small",emphasis:"default",onPress:n("undo"),children:[s.jsx(a,{size:16}),"Undo"]}),onDismiss:n("onDismiss"),children:"Neutral message text"}),s.jsx(i,{...e,variant:"highlight",emphasis:"strong",icon:s.jsx(t,{size:"16"}),action:s.jsxs(o,{size:"small",emphasis:"default",onPress:n("undo"),children:[s.jsx(a,{size:16}),"Undo"]}),onDismiss:n("onDismiss"),children:"Highlight message text"}),s.jsx(i,{...e,variant:"positive",emphasis:"strong",icon:s.jsx(t,{size:"16"}),action:s.jsxs(o,{size:"small",emphasis:"default",onPress:n("undo"),children:[s.jsx(a,{size:16}),"Undo"]}),onDismiss:n("onDismiss"),children:"Positive message text"}),s.jsx(i,{...e,variant:"warning",emphasis:"strong",icon:s.jsx(t,{size:"16"}),action:s.jsxs(o,{size:"small",emphasis:"default",onPress:n("undo"),children:[s.jsx(a,{size:16}),"Undo"]}),onDismiss:n("onDismiss"),children:"Warning message text"}),s.jsx(i,{...e,variant:"danger",emphasis:"strong",icon:s.jsx(t,{size:"16"}),action:s.jsxs(o,{size:"small",emphasis:"default",onPress:n("undo"),children:[s.jsx(a,{size:16}),"Undo"]}),onDismiss:n("onDismiss"),children:"Danger message text"})]})};var P,U,C;c.parameters={...c.parameters,docs:{...(P=c.parameters)==null?void 0:P.docs,source:{code:`const Default = () => (
  <Notice variant="default" emphasis="default" size="medium">
    Neutral message text
  </Notice>
);
`,...(C=(U=c.parameters)==null?void 0:U.docs)==null?void 0:C.source}}};var W,L,R;m.parameters={...m.parameters,docs:{...(W=m.parameters)==null?void 0:W.docs,source:{code:`const WithIcon = () => (
  <Notice
    variant="default"
    emphasis="default"
    size="medium"
    icon={<IconInfo size="16" />}
  >
    Neutral message text
  </Notice>
);
`,...(R=(L=m.parameters)==null?void 0:L.docs)==null?void 0:R.source}}};var S,E,M;d.parameters={...d.parameters,docs:{...(S=d.parameters)==null?void 0:S.docs,source:{code:`const WithDismiss = () => (
  <Notice
    variant="default"
    emphasis="default"
    size="medium"
    onDismiss={action("onDismiss")}
    icon={<IconInfo size="16" />}
  >
    Neutral message text
  </Notice>
);
`,...(M=(E=d.parameters)==null?void 0:E.docs)==null?void 0:M.source}}};var V,y,T;l.parameters={...l.parameters,docs:{...(V=l.parameters)==null?void 0:V.docs,source:{code:`const WithAction = () => (
  <Notice
    variant="default"
    emphasis="default"
    size="medium"
    icon={<IconInfo size="16" />}
    action={
      <Button size="small" emphasis="default" onPress={action("undo")}>
        <IconArrowRoundAntiClockwise size={16} />
        Undo
      </Button>
    }
  >
    Neutral message text
  </Notice>
);
`,...(T=(y=l.parameters)==null?void 0:y.docs)==null?void 0:T.source}}};var b,H,_;u.parameters={...u.parameters,docs:{...(b=u.parameters)==null?void 0:b.docs,source:{code:`const WithActionAndDismiss = () => (
  <Notice
    variant="default"
    emphasis="default"
    size="medium"
    onDismiss={action("onDismiss")}
    icon={<IconInfo size="16" />}
    action={
      <Button size="small" emphasis="default" onPress={action("undo")}>
        <IconArrowRoundAntiClockwise size={16} />
        Undo
      </Button>
    }
  >
    Neutral message text
  </Notice>
);
`,...(_=(H=u.parameters)==null?void 0:H.docs)==null?void 0:_.source}}};var O,q,K;g.parameters={...g.parameters,docs:{...(O=g.parameters)==null?void 0:O.docs,source:{code:`const VariantHighlight = () => (
  <Notice
    variant="highlight"
    emphasis="default"
    size="medium"
    icon={<IconInfo size="16" />}
  >
    Highlight message text
  </Notice>
);
`,...(K=(q=g.parameters)==null?void 0:q.docs)==null?void 0:K.source}}};var Y,F,G;h.parameters={...h.parameters,docs:{...(Y=h.parameters)==null?void 0:Y.docs,source:{code:`const VariantPositive = () => (
  <Notice
    variant="positive"
    emphasis="default"
    size="medium"
    icon={<IconCheckMark size="16" />}
  >
    Success message text
  </Notice>
);
`,...(G=(F=h.parameters)==null?void 0:F.docs)==null?void 0:G.source}}};var J,Q,X;p.parameters={...p.parameters,docs:{...(J=p.parameters)==null?void 0:J.docs,source:{code:`const VariantDanger = () => (
  <Notice
    variant="danger"
    emphasis="default"
    size="medium"
    icon={<IconExclamationMarkTriangle size="16" />}
  >
    Error message text
  </Notice>
);
`,...(X=(Q=p.parameters)==null?void 0:Q.docs)==null?void 0:X.source}}};var Z,$,ss;z.parameters={...z.parameters,docs:{...(Z=z.parameters)==null?void 0:Z.docs,source:{code:`const VariantWarning = () => (
  <Notice
    variant="warning"
    emphasis="default"
    size="medium"
    icon={<IconExclamationMarkTriangle size="16" />}
  >
    Warning message text
  </Notice>
);
`,...(ss=($=z.parameters)==null?void 0:$.docs)==null?void 0:ss.source}}};var es,ns,is;x.parameters={...x.parameters,docs:{...(es=x.parameters)==null?void 0:es.docs,source:{code:`const EmphasisStrong = () => (
  <Notice
    variant="positive"
    emphasis="strong"
    size="medium"
    icon={<IconCheckMark size="16" />}
  >
    Strong emphasis message
  </Notice>
);
`,...(is=(ns=x.parameters)==null?void 0:ns.docs)==null?void 0:is.source}}};var os,as,ts;f.parameters={...f.parameters,docs:{...(os=f.parameters)==null?void 0:os.docs,source:{code:`const EmphasisWeak = () => (
  <Notice
    variant="positive"
    emphasis="weak"
    size="medium"
    icon={<IconCheckMark size="16" />}
  >
    Weak emphasis message
  </Notice>
);
`,...(ts=(as=f.parameters)==null?void 0:as.docs)==null?void 0:ts.source}}};var rs,cs,ms;w.parameters={...w.parameters,docs:{...(rs=w.parameters)==null?void 0:rs.docs,source:{code:`const SizeLarge = () => (
  <Notice
    variant="default"
    emphasis="default"
    size="large"
    icon={<IconInfo size="20" />}
    action={
      <Button size="small" emphasis="default" onPress={action("undo")}>
        <IconArrowRoundAntiClockwise size={16} />
        Undo
      </Button>
    }
    onDismiss={action("onDismiss")}
  >
    This is a large notice with more vertical space
  </Notice>
);
`,...(ms=(cs=w.parameters)==null?void 0:cs.docs)==null?void 0:ms.source}}};var ds,ls,us;v.parameters={...v.parameters,docs:{...(ds=v.parameters)==null?void 0:ds.docs,source:{code:`const AllVariants = () => (
  <div className="tw-flex tw-flex-col tw-gap-4">
    <Notice
      emphasis="default"
      size="medium"
      variant="default"
      icon={<IconInfo size="16" />}
    >
      Default variant
    </Notice>
    <Notice
      emphasis="default"
      size="medium"
      variant="highlight"
      icon={<IconInfo size="16" />}
    >
      Highlight variant
    </Notice>
    <Notice
      emphasis="default"
      size="medium"
      variant="positive"
      icon={<IconCheckMark size="16" />}
    >
      Positive variant
    </Notice>
    <Notice
      emphasis="default"
      size="medium"
      variant="danger"
      icon={<IconExclamationMarkTriangle size="16" />}
    >
      Danger variant
    </Notice>
    <Notice
      emphasis="default"
      size="medium"
      variant="warning"
      icon={<IconExclamationMarkTriangle size="16" />}
    >
      Warning variant
    </Notice>
  </div>
);
`,...(us=(ls=v.parameters)==null?void 0:ls.docs)==null?void 0:us.source}}};var gs,hs,ps;N.parameters={...N.parameters,docs:{...(gs=N.parameters)==null?void 0:gs.docs,source:{code:`const AllEmphasis = () => (
  <div className="tw-flex tw-flex-col tw-gap-4">
    <Notice
      variant="positive"
      size="medium"
      emphasis="strong"
      icon={<IconCheckMark size="16" />}
    >
      Strong emphasis
    </Notice>
    <Notice
      variant="positive"
      size="medium"
      emphasis="default"
      icon={<IconCheckMark size="16" />}
    >
      Default emphasis
    </Notice>
    <Notice
      variant="positive"
      size="medium"
      emphasis="weak"
      icon={<IconCheckMark size="16" />}
    >
      Weak emphasis
    </Notice>
  </div>
);
`,...(ps=(hs=N.parameters)==null?void 0:hs.docs)==null?void 0:ps.source}}};var zs,xs,fs;D.parameters={...D.parameters,docs:{...(zs=D.parameters)==null?void 0:zs.docs,source:{code:`const LongContent = () => (
  <Notice
    variant="default"
    emphasis="default"
    size="medium"
    icon={<IconInfo size="16" />}
    action={
      <Button size="small" emphasis="default" onPress={action("learn-more")}>
        Learn More
      </Button>
    }
    onDismiss={action("onDismiss")}
  >
    This is a notice with much longer content to demonstrate how the component
    handles text wrapping. The content area should expand to accommodate all the
    text while maintaining proper spacing between elements.
  </Notice>
);
`,...(fs=(xs=D.parameters)==null?void 0:xs.docs)==null?void 0:fs.source}}};var ws,vs,Ns;I.parameters={...I.parameters,docs:{...(ws=I.parameters)==null?void 0:ws.docs,source:{code:`const AllVariantsWithActions = () => (
  <div className="tw-flex tw-flex-col tw-gap-4">
    <Notice
      emphasis="default"
      size="medium"
      variant="default"
      icon={<IconLightning size="16" />}
      action={
        <Button size="small" emphasis="default" onPress={action("undo")}>
          <IconArrowRoundAntiClockwise size={16} />
          Undo
        </Button>
      }
      onDismiss={action("onDismiss")}
    >
      Neutral message text
    </Notice>
    <Notice
      emphasis="default"
      size="medium"
      variant="highlight"
      icon={<IconLightning size="16" />}
      action={
        <Button size="small" emphasis="default" onPress={action("undo")}>
          <IconArrowRoundAntiClockwise size={16} />
          Undo
        </Button>
      }
      onDismiss={action("onDismiss")}
    >
      Highlight message text
    </Notice>
    <Notice
      emphasis="default"
      size="medium"
      variant="positive"
      icon={<IconLightning size="16" />}
      action={
        <Button size="small" emphasis="default" onPress={action("undo")}>
          <IconArrowRoundAntiClockwise size={16} />
          Undo
        </Button>
      }
      onDismiss={action("onDismiss")}
    >
      Positive message text
    </Notice>
    <Notice
      emphasis="default"
      size="medium"
      variant="warning"
      icon={<IconLightning size="16" />}
      action={
        <Button size="small" emphasis="default" onPress={action("undo")}>
          <IconArrowRoundAntiClockwise size={16} />
          Undo
        </Button>
      }
      onDismiss={action("onDismiss")}
    >
      Warning message text
    </Notice>
    <Notice
      emphasis="default"
      size="medium"
      variant="danger"
      icon={<IconLightning size="16" />}
      action={
        <Button size="small" emphasis="default" onPress={action("undo")}>
          <IconArrowRoundAntiClockwise size={16} />
          Undo
        </Button>
      }
      onDismiss={action("onDismiss")}
    >
      Danger message text
    </Notice>
  </div>
);
`,...(Ns=(vs=I.parameters)==null?void 0:vs.docs)==null?void 0:Ns.source}}};var Ds,Is,ks;k.parameters={...k.parameters,docs:{...(Ds=k.parameters)==null?void 0:Ds.docs,source:{code:`const AllVariantsWeakEmphasis = () => (
  <div className="tw-flex tw-flex-col tw-gap-4">
    <Notice
      size="medium"
      variant="default"
      emphasis="weak"
      icon={<IconLightning size="16" />}
      action={
        <Button size="small" emphasis="default" onPress={action("undo")}>
          <IconArrowRoundAntiClockwise size={16} />
          Undo
        </Button>
      }
      onDismiss={action("onDismiss")}
    >
      Neutral message text
    </Notice>
    <Notice
      size="medium"
      variant="highlight"
      emphasis="weak"
      icon={<IconLightning size="16" />}
      action={
        <Button size="small" emphasis="default" onPress={action("undo")}>
          <IconArrowRoundAntiClockwise size={16} />
          Undo
        </Button>
      }
      onDismiss={action("onDismiss")}
    >
      Highlight message text
    </Notice>
    <Notice
      size="medium"
      variant="positive"
      emphasis="weak"
      icon={<IconLightning size="16" />}
      action={
        <Button size="small" emphasis="default" onPress={action("undo")}>
          <IconArrowRoundAntiClockwise size={16} />
          Undo
        </Button>
      }
      onDismiss={action("onDismiss")}
    >
      Positive message text
    </Notice>
    <Notice
      size="medium"
      variant="warning"
      emphasis="weak"
      icon={<IconLightning size="16" />}
      action={
        <Button size="small" emphasis="default" onPress={action("undo")}>
          <IconArrowRoundAntiClockwise size={16} />
          Undo
        </Button>
      }
      onDismiss={action("onDismiss")}
    >
      Warning message text
    </Notice>
    <Notice
      size="medium"
      variant="danger"
      emphasis="weak"
      icon={<IconLightning size="16" />}
      action={
        <Button size="small" emphasis="default" onPress={action("undo")}>
          <IconArrowRoundAntiClockwise size={16} />
          Undo
        </Button>
      }
      onDismiss={action("onDismiss")}
    >
      Danger message text
    </Notice>
  </div>
);
`,...(ks=(Is=k.parameters)==null?void 0:Is.docs)==null?void 0:ks.source}}};var js,As,Bs;j.parameters={...j.parameters,docs:{...(js=j.parameters)==null?void 0:js.docs,source:{code:`const AllVariantsStrongEmphasis = () => (
  <div className="tw-flex tw-flex-col tw-gap-4">
    <Notice
      size="medium"
      variant="default"
      emphasis="strong"
      icon={<IconLightning size="16" />}
      action={
        <Button size="small" emphasis="default" onPress={action("undo")}>
          <IconArrowRoundAntiClockwise size={16} />
          Undo
        </Button>
      }
      onDismiss={action("onDismiss")}
    >
      Neutral message text
    </Notice>
    <Notice
      size="medium"
      variant="highlight"
      emphasis="strong"
      icon={<IconLightning size="16" />}
      action={
        <Button size="small" emphasis="default" onPress={action("undo")}>
          <IconArrowRoundAntiClockwise size={16} />
          Undo
        </Button>
      }
      onDismiss={action("onDismiss")}
    >
      Highlight message text
    </Notice>
    <Notice
      size="medium"
      variant="positive"
      emphasis="strong"
      icon={<IconLightning size="16" />}
      action={
        <Button size="small" emphasis="default" onPress={action("undo")}>
          <IconArrowRoundAntiClockwise size={16} />
          Undo
        </Button>
      }
      onDismiss={action("onDismiss")}
    >
      Positive message text
    </Notice>
    <Notice
      size="medium"
      variant="warning"
      emphasis="strong"
      icon={<IconLightning size="16" />}
      action={
        <Button size="small" emphasis="default" onPress={action("undo")}>
          <IconArrowRoundAntiClockwise size={16} />
          Undo
        </Button>
      }
      onDismiss={action("onDismiss")}
    >
      Warning message text
    </Notice>
    <Notice
      size="medium"
      variant="danger"
      emphasis="strong"
      icon={<IconLightning size="16" />}
      action={
        <Button size="small" emphasis="default" onPress={action("undo")}>
          <IconArrowRoundAntiClockwise size={16} />
          Undo
        </Button>
      }
      onDismiss={action("onDismiss")}
    >
      Danger message text
    </Notice>
  </div>
);
`,...(Bs=(As=j.parameters)==null?void 0:As.docs)==null?void 0:Bs.source}}};var Ps,Us,Cs;c.parameters={...c.parameters,docs:{...(Ps=c.parameters)==null?void 0:Ps.docs,source:{originalSource:`{
  render: args => <Notice {...args}>Neutral message text</Notice>
}`,...(Cs=(Us=c.parameters)==null?void 0:Us.docs)==null?void 0:Cs.source}}};var Ws,Ls,Rs;m.parameters={...m.parameters,docs:{...(Ws=m.parameters)==null?void 0:Ws.docs,source:{originalSource:`{
  render: args => <Notice {...args} icon={<IconInfo size="16" />}>
            Neutral message text
        </Notice>
}`,...(Rs=(Ls=m.parameters)==null?void 0:Ls.docs)==null?void 0:Rs.source}}};var Ss,Es,Ms;d.parameters={...d.parameters,docs:{...(Ss=d.parameters)==null?void 0:Ss.docs,source:{originalSource:`{
  args: {
    onDismiss: action('onDismiss')
  },
  render: args => <Notice {...args} icon={<IconInfo size="16" />}>
            Neutral message text
        </Notice>
}`,...(Ms=(Es=d.parameters)==null?void 0:Es.docs)==null?void 0:Ms.source}}};var Vs,ys,Ts;l.parameters={...l.parameters,docs:{...(Vs=l.parameters)==null?void 0:Vs.docs,source:{originalSource:`{
  render: args => <Notice {...args} icon={<IconInfo size="16" />} action={<Button size="small" emphasis="default" onPress={action('undo')}>
                    <IconArrowRoundAntiClockwise size={16} />
                    Undo
                </Button>}>
            Neutral message text
        </Notice>
}`,...(Ts=(ys=l.parameters)==null?void 0:ys.docs)==null?void 0:Ts.source}}};var bs,Hs,_s;u.parameters={...u.parameters,docs:{...(bs=u.parameters)==null?void 0:bs.docs,source:{originalSource:`{
  args: {
    onDismiss: action('onDismiss')
  },
  render: args => <Notice {...args} icon={<IconInfo size="16" />} action={<Button size="small" emphasis="default" onPress={action('undo')}>
                    <IconArrowRoundAntiClockwise size={16} />
                    Undo
                </Button>}>
            Neutral message text
        </Notice>
}`,...(_s=(Hs=u.parameters)==null?void 0:Hs.docs)==null?void 0:_s.source}}};var Os,qs,Ks;g.parameters={...g.parameters,docs:{...(Os=g.parameters)==null?void 0:Os.docs,source:{originalSource:`{
  args: {
    variant: 'highlight'
  },
  render: args => <Notice {...args} icon={<IconInfo size="16" />}>
            Highlight message text
        </Notice>
}`,...(Ks=(qs=g.parameters)==null?void 0:qs.docs)==null?void 0:Ks.source}}};var Ys,Fs,Gs;h.parameters={...h.parameters,docs:{...(Ys=h.parameters)==null?void 0:Ys.docs,source:{originalSource:`{
  args: {
    variant: 'positive'
  },
  render: args => <Notice {...args} icon={<IconCheckMark size="16" />}>
            Success message text
        </Notice>
}`,...(Gs=(Fs=h.parameters)==null?void 0:Fs.docs)==null?void 0:Gs.source}}};var Js,Qs,Xs;p.parameters={...p.parameters,docs:{...(Js=p.parameters)==null?void 0:Js.docs,source:{originalSource:`{
  args: {
    variant: 'danger'
  },
  render: args => <Notice {...args} icon={<IconExclamationMarkTriangle size="16" />}>
            Error message text
        </Notice>
}`,...(Xs=(Qs=p.parameters)==null?void 0:Qs.docs)==null?void 0:Xs.source}}};var Zs,$s,se;z.parameters={...z.parameters,docs:{...(Zs=z.parameters)==null?void 0:Zs.docs,source:{originalSource:`{
  args: {
    variant: 'warning'
  },
  render: args => <Notice {...args} icon={<IconExclamationMarkTriangle size="16" />}>
            Warning message text
        </Notice>
}`,...(se=($s=z.parameters)==null?void 0:$s.docs)==null?void 0:se.source}}};var ee,ne,ie;x.parameters={...x.parameters,docs:{...(ee=x.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  args: {
    emphasis: 'strong',
    variant: 'positive'
  },
  render: args => <Notice {...args} icon={<IconCheckMark size="16" />}>
            Strong emphasis message
        </Notice>
}`,...(ie=(ne=x.parameters)==null?void 0:ne.docs)==null?void 0:ie.source}}};var oe,ae,te;f.parameters={...f.parameters,docs:{...(oe=f.parameters)==null?void 0:oe.docs,source:{originalSource:`{
  args: {
    emphasis: 'weak',
    variant: 'positive'
  },
  render: args => <Notice {...args} icon={<IconCheckMark size="16" />}>
            Weak emphasis message
        </Notice>
}`,...(te=(ae=f.parameters)==null?void 0:ae.docs)==null?void 0:te.source}}};var re,ce,me;w.parameters={...w.parameters,docs:{...(re=w.parameters)==null?void 0:re.docs,source:{originalSource:`{
  args: {
    size: 'large'
  },
  render: args => <Notice {...args} icon={<IconInfo size="20" />} action={<Button size="small" emphasis="default" onPress={action('undo')}>
                    <IconArrowRoundAntiClockwise size={16} />
                    Undo
                </Button>} onDismiss={action('onDismiss')}>
            This is a large notice with more vertical space
        </Notice>
}`,...(me=(ce=w.parameters)==null?void 0:ce.docs)==null?void 0:me.source}}};var de,le,ue;v.parameters={...v.parameters,docs:{...(de=v.parameters)==null?void 0:de.docs,source:{originalSource:`{
  render: args => <div className="tw-flex tw-flex-col tw-gap-4">
            <Notice {...args} variant="default" icon={<IconInfo size="16" />}>
                Default variant
            </Notice>
            <Notice {...args} variant="highlight" icon={<IconInfo size="16" />}>
                Highlight variant
            </Notice>
            <Notice {...args} variant="positive" icon={<IconCheckMark size="16" />}>
                Positive variant
            </Notice>
            <Notice {...args} variant="danger" icon={<IconExclamationMarkTriangle size="16" />}>
                Danger variant
            </Notice>
            <Notice {...args} variant="warning" icon={<IconExclamationMarkTriangle size="16" />}>
                Warning variant
            </Notice>
        </div>
}`,...(ue=(le=v.parameters)==null?void 0:le.docs)==null?void 0:ue.source}}};var ge,he,pe;N.parameters={...N.parameters,docs:{...(ge=N.parameters)==null?void 0:ge.docs,source:{originalSource:`{
  args: {
    variant: 'positive'
  },
  render: args => <div className="tw-flex tw-flex-col tw-gap-4">
            <Notice {...args} emphasis="strong" icon={<IconCheckMark size="16" />}>
                Strong emphasis
            </Notice>
            <Notice {...args} emphasis="default" icon={<IconCheckMark size="16" />}>
                Default emphasis
            </Notice>
            <Notice {...args} emphasis="weak" icon={<IconCheckMark size="16" />}>
                Weak emphasis
            </Notice>
        </div>
}`,...(pe=(he=N.parameters)==null?void 0:he.docs)==null?void 0:pe.source}}};var ze,xe,fe;D.parameters={...D.parameters,docs:{...(ze=D.parameters)==null?void 0:ze.docs,source:{originalSource:`{
  render: args => <Notice {...args} icon={<IconInfo size="16" />} action={<Button size="small" emphasis="default" onPress={action('learn-more')}>
                    Learn More
                </Button>} onDismiss={action('onDismiss')}>
            This is a notice with much longer content to demonstrate how the component handles text wrapping. The
            content area should expand to accommodate all the text while maintaining proper spacing between elements.
        </Notice>
}`,...(fe=(xe=D.parameters)==null?void 0:xe.docs)==null?void 0:fe.source}}};var we,ve,Ne;I.parameters={...I.parameters,docs:{...(we=I.parameters)==null?void 0:we.docs,source:{originalSource:`{
  render: args => <div className="tw-flex tw-flex-col tw-gap-4">
            <Notice {...args} variant="default" icon={<IconLightning size="16" />} action={<Button size="small" emphasis="default" onPress={action('undo')}>
                        <IconArrowRoundAntiClockwise size={16} />
                        Undo
                    </Button>} onDismiss={action('onDismiss')}>
                Neutral message text
            </Notice>
            <Notice {...args} variant="highlight" icon={<IconLightning size="16" />} action={<Button size="small" emphasis="default" onPress={action('undo')}>
                        <IconArrowRoundAntiClockwise size={16} />
                        Undo
                    </Button>} onDismiss={action('onDismiss')}>
                Highlight message text
            </Notice>
            <Notice {...args} variant="positive" icon={<IconLightning size="16" />} action={<Button size="small" emphasis="default" onPress={action('undo')}>
                        <IconArrowRoundAntiClockwise size={16} />
                        Undo
                    </Button>} onDismiss={action('onDismiss')}>
                Positive message text
            </Notice>
            <Notice {...args} variant="warning" icon={<IconLightning size="16" />} action={<Button size="small" emphasis="default" onPress={action('undo')}>
                        <IconArrowRoundAntiClockwise size={16} />
                        Undo
                    </Button>} onDismiss={action('onDismiss')}>
                Warning message text
            </Notice>
            <Notice {...args} variant="danger" icon={<IconLightning size="16" />} action={<Button size="small" emphasis="default" onPress={action('undo')}>
                        <IconArrowRoundAntiClockwise size={16} />
                        Undo
                    </Button>} onDismiss={action('onDismiss')}>
                Danger message text
            </Notice>
        </div>
}`,...(Ne=(ve=I.parameters)==null?void 0:ve.docs)==null?void 0:Ne.source}}};var De,Ie,ke;k.parameters={...k.parameters,docs:{...(De=k.parameters)==null?void 0:De.docs,source:{originalSource:`{
  render: args => <div className="tw-flex tw-flex-col tw-gap-4">
            <Notice {...args} variant="default" emphasis="weak" icon={<IconLightning size="16" />} action={<Button size="small" emphasis="default" onPress={action('undo')}>
                        <IconArrowRoundAntiClockwise size={16} />
                        Undo
                    </Button>} onDismiss={action('onDismiss')}>
                Neutral message text
            </Notice>
            <Notice {...args} variant="highlight" emphasis="weak" icon={<IconLightning size="16" />} action={<Button size="small" emphasis="default" onPress={action('undo')}>
                        <IconArrowRoundAntiClockwise size={16} />
                        Undo
                    </Button>} onDismiss={action('onDismiss')}>
                Highlight message text
            </Notice>
            <Notice {...args} variant="positive" emphasis="weak" icon={<IconLightning size="16" />} action={<Button size="small" emphasis="default" onPress={action('undo')}>
                        <IconArrowRoundAntiClockwise size={16} />
                        Undo
                    </Button>} onDismiss={action('onDismiss')}>
                Positive message text
            </Notice>
            <Notice {...args} variant="warning" emphasis="weak" icon={<IconLightning size="16" />} action={<Button size="small" emphasis="default" onPress={action('undo')}>
                        <IconArrowRoundAntiClockwise size={16} />
                        Undo
                    </Button>} onDismiss={action('onDismiss')}>
                Warning message text
            </Notice>
            <Notice {...args} variant="danger" emphasis="weak" icon={<IconLightning size="16" />} action={<Button size="small" emphasis="default" onPress={action('undo')}>
                        <IconArrowRoundAntiClockwise size={16} />
                        Undo
                    </Button>} onDismiss={action('onDismiss')}>
                Danger message text
            </Notice>
        </div>
}`,...(ke=(Ie=k.parameters)==null?void 0:Ie.docs)==null?void 0:ke.source}}};var je,Ae,Be;j.parameters={...j.parameters,docs:{...(je=j.parameters)==null?void 0:je.docs,source:{originalSource:`{
  render: args => <div className="tw-flex tw-flex-col tw-gap-4">
            <Notice {...args} variant="default" emphasis="strong" icon={<IconLightning size="16" />} action={<Button size="small" emphasis="default" onPress={action('undo')}>
                        <IconArrowRoundAntiClockwise size={16} />
                        Undo
                    </Button>} onDismiss={action('onDismiss')}>
                Neutral message text
            </Notice>
            <Notice {...args} variant="highlight" emphasis="strong" icon={<IconLightning size="16" />} action={<Button size="small" emphasis="default" onPress={action('undo')}>
                        <IconArrowRoundAntiClockwise size={16} />
                        Undo
                    </Button>} onDismiss={action('onDismiss')}>
                Highlight message text
            </Notice>
            <Notice {...args} variant="positive" emphasis="strong" icon={<IconLightning size="16" />} action={<Button size="small" emphasis="default" onPress={action('undo')}>
                        <IconArrowRoundAntiClockwise size={16} />
                        Undo
                    </Button>} onDismiss={action('onDismiss')}>
                Positive message text
            </Notice>
            <Notice {...args} variant="warning" emphasis="strong" icon={<IconLightning size="16" />} action={<Button size="small" emphasis="default" onPress={action('undo')}>
                        <IconArrowRoundAntiClockwise size={16} />
                        Undo
                    </Button>} onDismiss={action('onDismiss')}>
                Warning message text
            </Notice>
            <Notice {...args} variant="danger" emphasis="strong" icon={<IconLightning size="16" />} action={<Button size="small" emphasis="default" onPress={action('undo')}>
                        <IconArrowRoundAntiClockwise size={16} />
                        Undo
                    </Button>} onDismiss={action('onDismiss')}>
                Danger message text
            </Notice>
        </div>
}`,...(Be=(Ae=j.parameters)==null?void 0:Ae.docs)==null?void 0:Be.source}}};const Ee=["Default","WithIcon","WithDismiss","WithAction","WithActionAndDismiss","VariantHighlight","VariantPositive","VariantDanger","VariantWarning","EmphasisStrong","EmphasisWeak","SizeLarge","AllVariants","AllEmphasis","LongContent","AllVariantsWithActions","AllVariantsWeakEmphasis","AllVariantsStrongEmphasis"];export{N as AllEmphasis,v as AllVariants,j as AllVariantsStrongEmphasis,k as AllVariantsWeakEmphasis,I as AllVariantsWithActions,c as Default,x as EmphasisStrong,f as EmphasisWeak,D as LongContent,w as SizeLarge,p as VariantDanger,g as VariantHighlight,h as VariantPositive,z as VariantWarning,l as WithAction,u as WithActionAndDismiss,d as WithDismiss,m as WithIcon,Ee as __namedExportsOrder,Se as default};
