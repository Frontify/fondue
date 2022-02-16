
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconQuestionMark12 from './IconQuestionMark12';import IconQuestionMark16 from './IconQuestionMark16';import IconQuestionMark20 from './IconQuestionMark20';import IconQuestionMark24 from './IconQuestionMark24';import IconQuestionMark32 from './IconQuestionMark32'
    
    function IconQuestionMark(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconQuestionMark12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconQuestionMark16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconQuestionMark20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconQuestionMark24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconQuestionMark32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconQuestionMark);
    export default Memo;
    