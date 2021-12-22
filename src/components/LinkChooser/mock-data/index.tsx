/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconType, SearchResult } from "../types";

export const EXAMPLE_DATA: SearchResult[] = [
    {
        id: "1",
        title: "Brand listening - A Memoir",
        subtitle: "Guideline XYZ",
        link: "https://www.frontify.com",
        icon: IconType.Document,
    },
    {
        id: "2",
        title: "Document Group",
        subtitle: "Guide ABC",
        link: "https://www.frontify.com/en/brand-guidelines/",
        icon: IconType.Document,
    },
    {
        id: "3",
        title: "Brand listening - Glossary & Docu.",
        subtitle: "Guideline XYZ",
        link: "https://www.frontify.com/en/digital-asset-management/",
        icon: IconType.Document,
    },
    {
        id: "4",
        title: '"www.website.com"',
        link: "https://www.frontify.com/en/digital-and-print-templates/",
        icon: IconType.External,
    },
    {
        id: "7",
        title: "Aerial City View",
        subtitle: "Corporate Library",
        link: "",
        icon: IconType.Template,
    },
    {
        id: "8",
        title: "Brooklyn",
        subtitle: "Template Library Old Brand",
        link: "",
        icon: IconType.Template,
    },
    {
        id: "9",
        title: "City",
        subtitle: "SRF Kultur On Screen",
        link: "",
        icon: IconType.Template,
    },
    {
        id: "10",
        title: "Malaya Poster",
        subtitle: "UNICEF Social Campaign",
        link: "",
        icon: IconType.Template,
    },
    {
        id: "11",
        title: "Brand Business Card",
        subtitle: "Corporate Library",
        link: "",
        icon: IconType.Template,
    },
];

export const EXAMPLE_TEMPLATES: SearchResult[] = [
    {
        id: "7",
        preview:
            "https://images.frontify.test/s3/frontify-dev-files/eyJwYXRoIjoibXNpcmljXC9hY2NvdW50c1wvYzRcLzFcL3Byb2plY3RzXC8yXC9hc3NldHNcLzhmXC83XC85MWU4MzdjZDk2YWQzN2EwYWY4OTZhYzA5OWRlNzIyNi0xNjM0MzAxNDUxLmpwZyJ9:msiric:Li3v_e6ogrxBoH-kli3whbqekW1K4ar5Dshif80q2o0?width=2400&height={height}",
        title: "Aerial City View",
        subtitle: "Corporate Library",
        link: "#",
        icon: IconType.Template,
    },
    {
        id: "8",
        preview:
            "https://images.frontify.test/s3/frontify-dev-files/eyJwYXRoIjoibXNpcmljXC9hY2NvdW50c1wvYzRcLzFcL3Byb2plY3RzXC8yXC9hc3NldHNcL2M5XC84XC9lYjI2YWQzZWIwMGMxYWE4MDQ3MGQ4Y2U4YjVhZjcwNS0xNjM0MzAxNDUxLmpwZyJ9:msiric:GjhRABJhT0SYjJr9ANQ5QpwdrPCRiEcImzRZXOC_XHo?width=2400&height={height}",
        title: "Brooklyn",
        subtitle: "Template Library Old Brand",
        link: "#",
        icon: IconType.Template,
    },
    {
        id: "9",
        preview:
            "https://images.frontify.test/s3/frontify-dev-files/eyJwYXRoIjoibXNpcmljXC9hY2NvdW50c1wvYzRcLzFcL3Byb2plY3RzXC8yXC9hc3NldHNcL2QzXC8xMFwvOTY1ZjU0YzFiYzcxMzJjYTZlNzgwYTBhNWU2ZTgyYTctMTYzNDMwMTQ1MS5qcGcifQ:msiric:_Vs4FXozFK81i3I6J69aAG8FOq_8ld1fV8oWsWYSF2Y?width=2400&height={height}",
        title: "City",
        subtitle: "SRF Kultur On Screen",
        link: "#",
        icon: IconType.Template,
    },
    {
        id: "10",
        preview:
            "https://images.frontify.test/s3/frontify-dev-files/eyJwYXRoIjoibXNpcmljXC9hY2NvdW50c1wvYzRcLzFcL3Byb2plY3RzXC8yXC9hc3NldHNcLzY1XC8xMVwvYTA0NmQ0YTNiNTk1MGZkODc3NWI3Y2IzYWUwZTVlMDAtMTYzNDMwMTQ1MS5qcGcifQ:msiric:ZBtHCtUwKM6dDiuJALxz5Z6ZfJLk68cEgd6_jNJbuWc?width=2400&height={height}",
        title: "Malaya Poster",
        subtitle: "UNICEF Social Campaign",
        link: "#",
        icon: IconType.Template,
    },
    {
        id: "11",
        preview:
            "https://images.frontify.test/s3/frontify-dev-files/eyJwYXRoIjoibXNpcmljXC9hY2NvdW50c1wvYzRcLzFcL3Byb2plY3RzXC8yXC9hc3NldHNcL2MyXC8xMlwvYTFkYzA0YTJkYmQwZTkxMTRlOGM2ODQzMWVmMjU5OTMtMTYzNDMwMTQ1MS5qcGcifQ:msiric:MLRtZYQCaEyWpPqgpGbA6P20PDgvagyoowNOllXgoCk?width=2400&height={height}",
        title: "Brand Business Card",
        subtitle: "Corporate Library",
        link: "#",
        icon: IconType.Template,
    },
];
