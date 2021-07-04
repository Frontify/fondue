declare module "*.svg" {
    import * as React from "react";
    import { IconProps } from "@components/Icon/Icon";

    const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement> & IconProps>;

    export { ReactComponent };
}
