
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconTextFormatStrikethrough12 from './IconTextFormatStrikethrough12';import IconTextFormatStrikethrough16 from './IconTextFormatStrikethrough16';import IconTextFormatStrikethrough20 from './IconTextFormatStrikethrough20';import IconTextFormatStrikethrough24 from './IconTextFormatStrikethrough24';import IconTextFormatStrikethrough32 from './IconTextFormatStrikethrough32'
    
    function IconTextFormatStrikethrough(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconTextFormatStrikethrough12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconTextFormatStrikethrough16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconTextFormatStrikethrough20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconTextFormatStrikethrough24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconTextFormatStrikethrough32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconTextFormatStrikethrough);
    export default Memo;
    