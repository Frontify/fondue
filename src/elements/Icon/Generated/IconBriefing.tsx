import * as React from "react";
import IconProps from "@elements/Icon/IconProps";
import IconSize from "@elements/Icon/IconSize";
const iconSizeMap = {
    [IconSize.Size8]: "h-2 w-2",
    [IconSize.Size12]: "h-3 w-3",
    [IconSize.Size16]: "h-4 w-4",
    [IconSize.Size20]: "h-5 w-5",
    [IconSize.Size24]: "h-6 w-6",
    [IconSize.Size32]: "h-8 w-8",
};

function IconBriefing(props: IconProps): React.ReactElement<IconProps> {
    const customClassName = [
        "flex items-center justify-center fill-current",
        iconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className={customClassName}
            {...props}
        >
            <path d="M3.5 5.081A3.089 3.089 0 016.587 2h6.765c.427 0 1.023.235 1.339.532l5.243 4.936c.313.294.566.878.566 1.305v10.155c0 1.696-1.391 3.072-3.098 3.072H6.598A3.087 3.087 0 013.5 18.919V5.08zm15.455 5.38h-6.186A.767.767 0 0112 9.693V3.538H6.596c-.853 0-1.55.686-1.55 1.532v13.86c0 .847.69 1.532 1.541 1.532h10.826c.852 0 1.542-.686 1.542-1.532v-8.468zm0-1.538v-.177l-5.41-5.063v5.24h5.41zm-8.15 9.44a.911.911 0 01-.912-.908c0-.503.408-.91.913-.91h5.48c.503 0 .912.407.912.91 0 .502-.409.909-.913.909h-5.48zm-2.739 0a.911.911 0 01-.913-.908c0-.503.409-.91.913-.91s.913.407.913.91c0 .502-.409.909-.913.909zm2.74-3.636a.911.911 0 01-.913-.909c0-.502.408-.909.913-.909h5.48c.503 0 .912.407.912.91 0 .501-.409.908-.913.908h-5.48zm-2.74 0a.911.911 0 01-.913-.909c0-.502.409-.909.913-.909s.913.407.913.91c0 .501-.409.908-.913.908z" />
        </svg>
    );
}

const MemoIconBriefing = React.memo(IconBriefing);
export default MemoIconBriefing;
