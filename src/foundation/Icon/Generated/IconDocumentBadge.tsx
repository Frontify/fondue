
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconDocumentBadge12 from './IconDocumentBadge12';import IconDocumentBadge16 from './IconDocumentBadge16';import IconDocumentBadge20 from './IconDocumentBadge20';import IconDocumentBadge24 from './IconDocumentBadge24';import IconDocumentBadge32 from './IconDocumentBadge32'
    
    function IconDocumentBadge(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconDocumentBadge12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconDocumentBadge16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconDocumentBadge20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconDocumentBadge24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconDocumentBadge32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconDocumentBadge);
    export default Memo;
    