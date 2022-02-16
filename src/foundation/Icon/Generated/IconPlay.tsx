
    import React, { memo } from "react";
    import { GeneratedIconProps } from "@foundation/Icon/IconProps";
    import { IconSize } from "@foundation/Icon/IconSize";

    import IconPlay12Filled from './IconPlay12Filled';import IconPlay12 from './IconPlay12';import IconPlay16Filled from './IconPlay16Filled';import IconPlay16 from './IconPlay16';import IconPlay20Filled from './IconPlay20Filled';import IconPlay20 from './IconPlay20';import IconPlay24Filled from './IconPlay24Filled';import IconPlay24 from './IconPlay24';import IconPlay32Filled from './IconPlay32Filled';import IconPlay32 from './IconPlay32'
    
    function IconPlay(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
        const size = props.size || IconSize.Size16;
        return (
            <span>
                {size === IconSize.Size12 && props.filled && (
                    <IconPlay12Filled/>
                )}{size === IconSize.Size12 && !props.filled && (
                    <IconPlay12/>
                )}{size === IconSize.Size16 && props.filled && (
                    <IconPlay16Filled/>
                )}{size === IconSize.Size16 && !props.filled && (
                    <IconPlay16/>
                )}{size === IconSize.Size20 && props.filled && (
                    <IconPlay20Filled/>
                )}{size === IconSize.Size20 && !props.filled && (
                    <IconPlay20/>
                )}{size === IconSize.Size24 && props.filled && (
                    <IconPlay24Filled/>
                )}{size === IconSize.Size24 && !props.filled && (
                    <IconPlay24/>
                )}{size === IconSize.Size32 && props.filled && (
                    <IconPlay32Filled/>
                )}{size === IconSize.Size32 && !props.filled && (
                    <IconPlay32/>
                )}
            </span>
        );
    }
    
    const Memo = memo(IconPlay);
    export default Memo;
    