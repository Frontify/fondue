
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconIntercom12 from './IconIntercom12';import IconIntercom16 from './IconIntercom16';import IconIntercom20 from './IconIntercom20';import IconIntercom24 from './IconIntercom24';import IconIntercom32 from './IconIntercom32'
    
    function IconIntercom(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconIntercom12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconIntercom16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconIntercom20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconIntercom24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconIntercom32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconIntercom);
    export default Memo;
    