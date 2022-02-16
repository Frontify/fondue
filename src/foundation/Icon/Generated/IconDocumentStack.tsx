
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconDocumentStack12 from './IconDocumentStack12';import IconDocumentStack16 from './IconDocumentStack16';import IconDocumentStack20 from './IconDocumentStack20';import IconDocumentStack24 from './IconDocumentStack24';import IconDocumentStack32 from './IconDocumentStack32'
    
    function IconDocumentStack(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconDocumentStack12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconDocumentStack16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconDocumentStack20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconDocumentStack24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconDocumentStack32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconDocumentStack);
    export default Memo;
    