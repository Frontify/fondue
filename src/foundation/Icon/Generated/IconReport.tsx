
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconReport12 from './IconReport12';import IconReport16 from './IconReport16';import IconReport20 from './IconReport20';import IconReport24 from './IconReport24';import IconReport32 from './IconReport32'
    
    function IconReport(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconReport12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconReport16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconReport20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconReport24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconReport32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconReport);
    export default Memo;
    