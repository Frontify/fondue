/* (c) Copyright Frontify Ltd., all rights reserved. */

import componentIndex from "../../components/manifests/manifest.json";
import iconsManifest from "../../icons/manifest.json";
import tokensManifest from "../../tokens/manifest.json";

import {
    type ComponentDetail,
    type ComponentSummary,
    type Icon,
    type Token,
    type Utility,
} from "./types.ts";

type RawComponentIndex = {
    schemaVersion: string;
    packageName: string;
    generatedAt: string;
    components: Record<
        string,
        {
            name: string;
            description: string;
            status: string;
            category: string;
            tags: string[];
            subComponentNames: string[];
            manifestPath: string;
        }
    >;
};

type RawTokensManifest = {
    tokens: Token[];
    utilities: Utility[];
};

type RawIconsManifest = {
    sizes: number[];
    icons: Icon[];
};

const componentDetailModules = import.meta.glob<ComponentDetail>(
    "../../components/manifests/*.manifest.json",
    {
        eager: true,
        import: "default",
    },
);

let componentSummaryList: ComponentSummary[] | undefined;
let componentSummaryMap: Map<string, ComponentSummary> | undefined;
let componentDetailMap: Map<string, ComponentDetail> | undefined;
let tokenList: Token[] | undefined;
let tokenMap: Map<string, Token> | undefined;
let tokenCategoryMap: Map<string, Token[]> | undefined;
let utilityList: Utility[] | undefined;
let iconList: Icon[] | undefined;
let iconNameMap: Map<string, Icon> | undefined;
let iconExportNameMap: Map<string, Icon> | undefined;

export function getComponentSummaries(): ComponentSummary[] {
    if (!componentSummaryList) {
        const index = componentIndex as RawComponentIndex;
        componentSummaryList = Object.values(index.components).map(
            ({
                name,
                description,
                status,
                category,
                tags,
                subComponentNames,
            }) => ({
                name,
                description,
                status,
                category,
                tags,
                subComponentNames,
            }),
        );
    }
    return componentSummaryList;
}

export function getComponentSummaryMap(): Map<string, ComponentSummary> {
    if (!componentSummaryMap) {
        componentSummaryMap = new Map();
        for (const summary of getComponentSummaries()) {
            componentSummaryMap.set(summary.name.toLowerCase(), summary);
        }
    }
    return componentSummaryMap;
}

export function getComponentDetailMap(): Map<string, ComponentDetail> {
    if (!componentDetailMap) {
        componentDetailMap = new Map();
        for (const mod of Object.values(componentDetailModules)) {
            const detail = mod as ComponentDetail;
            componentDetailMap.set(detail.name.toLowerCase(), detail);
        }
    }
    return componentDetailMap;
}

function getTokensManifest(): RawTokensManifest {
    return tokensManifest as RawTokensManifest;
}

export function getTokenList(): Token[] {
    if (!tokenList) {
        tokenList = getTokensManifest().tokens;
    }
    return tokenList;
}

export function getTokenMap(): Map<string, Token> {
    if (!tokenMap) {
        tokenMap = new Map();
        for (const token of getTokenList()) {
            tokenMap.set(token.id, token);
        }
    }
    return tokenMap;
}

export function getTokenCategoryMap(): Map<string, Token[]> {
    if (!tokenCategoryMap) {
        tokenCategoryMap = new Map();
        for (const token of getTokenList()) {
            const existing = tokenCategoryMap.get(token.category);
            if (existing) {
                existing.push(token);
            } else {
                tokenCategoryMap.set(token.category, [token]);
            }
        }
    }
    return tokenCategoryMap;
}

export function getUtilityList(): Utility[] {
    if (!utilityList) {
        utilityList = getTokensManifest().utilities;
    }
    return utilityList;
}

function getIconsManifest(): RawIconsManifest {
    return iconsManifest as RawIconsManifest;
}

export function getIconList(): Icon[] {
    if (!iconList) {
        iconList = getIconsManifest().icons;
    }
    return iconList;
}

export function getIconNameMap(): Map<string, Icon> {
    if (!iconNameMap) {
        iconNameMap = new Map();
        for (const icon of getIconList()) {
            iconNameMap.set(icon.name.toLowerCase(), icon);
        }
    }
    return iconNameMap;
}

export function getIconExportNameMap(): Map<string, Icon> {
    if (!iconExportNameMap) {
        iconExportNameMap = new Map();
        for (const icon of getIconList()) {
            iconExportNameMap.set(icon.exportName.toLowerCase(), icon);
        }
    }
    return iconExportNameMap;
}
