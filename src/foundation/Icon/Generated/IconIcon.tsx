
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconIcon12 from './IconIcon12';import IconIcon16 from './IconIcon16';import IconIcon20 from './IconIcon20';import IconIcon24 from './IconIcon24';import IconIcon32 from './IconIcon32'
    
    function IconIcon(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconIcon12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconIcon16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconIcon20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconIcon24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconIcon32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconIcon);
    export default Memo;
    