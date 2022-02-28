// /* (c) Copyright Frontify Ltd., all rights reserved. */

// import { Item } from "@react-stately/collections";
// import React, { FC } from "react";
// import { Select } from "./TextStyleDropdown/Select";
// import { getTextStyles, TextStyles, TextStyleType } from "./utils/getTextStyles";

// type Props = {
//     textStyles?: TextStyleType[];
// };

// export const headingTitle: Record<TextStyles, string> = {
//     [TextStyles.ELEMENT_HEADING1]: "Heading 1",
//     [TextStyles.ELEMENT_HEADING2]: "Heading 2",
//     [TextStyles.ELEMENT_HEADING3]: "Heading 3",
//     [TextStyles.ELEMENT_HEADING4]: "Heading 4",
//     [TextStyles.ELEMENT_CUSTOM1]: "Custom 01",
//     [TextStyles.ELEMENT_CUSTOM2]: "Custom 02",
// };

// export const BlockStyleDropdown: FC<Props> = ({ textStyles }) => {
//     const getMenuItemStyle = (identifier: TextStyleType["type"]) =>
//         [getTextStyles(identifier, textStyles), "tw-truncate"].join(" ");

//     return (
//         <Select
//             aria-label="Block Style Select"
//             onSelectionChange={(id) => console.log(id)}
//             //selectedKey={blockTypeId || headingTitle[BlockStyleTypes.Paragraph]}
//             placeholder={"Select font"}
//         >
//             <Item textValue={headingTitle[TextStyles.ELEMENT_HEADING1]} key={TextStyles.ELEMENT_HEADING1}>
//                 <h1 className={getMenuItemStyle(TextStyles.ELEMENT_HEADING1)}>
//                     {headingTitle[TextStyles.ELEMENT_HEADING1]}
//                 </h1>
//             </Item>
//             <Item textValue={headingTitle[TextStyles.ELEMENT_HEADING2]} key={TextStyles.ELEMENT_HEADING2}>
//                 <h2 className={getMenuItemStyle(TextStyles.ELEMENT_HEADING2)}>
//                     {headingTitle[TextStyles.ELEMENT_HEADING2]}
//                 </h2>
//             </Item>
//             <Item textValue={headingTitle[TextStyles.ELEMENT_HEADING3]} key={TextStyles.ELEMENT_HEADING3}>
//                 <h3 className={getMenuItemStyle(TextStyles.ELEMENT_HEADING3)}>
//                     {headingTitle[TextStyles.ELEMENT_HEADING3]}
//                 </h3>
//             </Item>
//             <Item textValue={headingTitle[TextStyles.ELEMENT_HEADING4]} key={TextStyles.ELEMENT_HEADING4}>
//                 <h4 className={getMenuItemStyle(TextStyles.ELEMENT_HEADING4)}>
//                     {headingTitle[TextStyles.ELEMENT_HEADING4]}
//                 </h4>
//             </Item>
//             <Item textValue={headingTitle[TextStyles.ELEMENT_CUSTOM1]} key={TextStyles.ELEMENT_CUSTOM1}>
//                 <div className={getMenuItemStyle(TextStyles.ELEMENT_CUSTOM1)}>
//                     {headingTitle[TextStyles.ELEMENT_CUSTOM1]}
//                 </div>
//             </Item>
//             <Item textValue={headingTitle[TextStyles.ELEMENT_CUSTOM2]} key={TextStyles.ELEMENT_CUSTOM2}>
//                 <div className={getMenuItemStyle(TextStyles.ELEMENT_CUSTOM2)}>
//                     {headingTitle[TextStyles.ELEMENT_CUSTOM2]}
//                 </div>
//             </Item>
//         </Select>
//     );
// };
