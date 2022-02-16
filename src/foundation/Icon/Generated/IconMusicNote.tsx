
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconMusicNote12 from './IconMusicNote12';import IconMusicNote16 from './IconMusicNote16';import IconMusicNote20 from './IconMusicNote20';import IconMusicNote24 from './IconMusicNote24';import IconMusicNote32 from './IconMusicNote32'
    
    function IconMusicNote(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && !props.filled && (
                    <IconMusicNote12/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconMusicNote16/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconMusicNote20/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconMusicNote24/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconMusicNote32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconMusicNote);
    export default Memo;
    