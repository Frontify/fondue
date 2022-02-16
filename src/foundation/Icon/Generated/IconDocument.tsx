
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconDocument12 from './IconDocument12';import IconDocument16 from './IconDocument16';import IconDocument20 from './IconDocument20';import IconDocument24 from './IconDocument24';import IconDocument32 from './IconDocument32'
    
    function IconDocument(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconDocument12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconDocument16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconDocument20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconDocument24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconDocument32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconDocument);
    export default Memo;
    