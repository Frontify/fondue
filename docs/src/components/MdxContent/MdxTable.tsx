/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type DetailedHTMLProps, type HTMLAttributes } from 'react';

const Table = (props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) => {
    return <table className="tw-w-full tw-min-w-fit tw-mb-8 tw-border tw-border-collapse">{props.children}</table>;
};

const TableData = (props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) => {
    return <td className="tw-min-w-fit tw-p-2 tw-border">{props.children}</td>;
};

const TableHeader = (props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) => {
    return (
        <th className="tw-min-w-fit tw-px-2 tw-border" align="left">
            {props.children}
        </th>
    );
};

export const MdxTable = {
    table: Table,
    td: TableData,
    th: TableHeader,
};
