
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconSuitcaseTag12 from './IconSuitcaseTag12';import IconSuitcaseTag16 from './IconSuitcaseTag16';import IconSuitcaseTag20 from './IconSuitcaseTag20';import IconSuitcaseTag24 from './IconSuitcaseTag24';import IconSuitcaseTag32 from './IconSuitcaseTag32'
    
    function IconSuitcaseTag(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconSuitcaseTag12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconSuitcaseTag16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconSuitcaseTag20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconSuitcaseTag24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconSuitcaseTag32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconSuitcaseTag);
    export default Memo;
    