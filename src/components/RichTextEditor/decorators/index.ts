import { CompositeDecorator } from "draft-js";
import findLinkEntities from "./strategies/findLinkEntities";
import LinkDecorator from "./components/LinkDecorator";

export const decorators = new CompositeDecorator([
    {
        strategy: findLinkEntities,
        component: LinkDecorator,
    },
]);
