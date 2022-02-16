
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconArchive12 from './IconArchive12';import IconArchive16 from './IconArchive16';import IconArchive20 from './IconArchive20';import IconArchive24 from './IconArchive24';import IconArchive32 from './IconArchive32'
    
    function IconArchive(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconArchive12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconArchive16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconArchive20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconArchive24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconArchive32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconArchive);
    export default Memo;
    