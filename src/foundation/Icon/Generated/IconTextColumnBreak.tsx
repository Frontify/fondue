
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconTextColumnBreak12 from './IconTextColumnBreak12';import IconTextColumnBreak16 from './IconTextColumnBreak16';import IconTextColumnBreak20 from './IconTextColumnBreak20';import IconTextColumnBreak24 from './IconTextColumnBreak24';import IconTextColumnBreak32 from './IconTextColumnBreak32'
    
    function IconTextColumnBreak(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconTextColumnBreak12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconTextColumnBreak16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconTextColumnBreak20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconTextColumnBreak24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconTextColumnBreak32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconTextColumnBreak);
    export default Memo;
    