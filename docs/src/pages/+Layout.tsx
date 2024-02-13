/* (c) Copyright Frontify Ltd., all rights reserved. */

import '../renderer/index.css';
import { type ReactNode } from 'react';

import fondueLogo from '../assets/images/fondue_logo.png';
import { Link } from '../renderer/Link';

export const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <main className="tw-h-dvh tw-flex tw-flex-col tw-overflow-y-auto" style={{ scrollbarGutter: 'stable' }}>
            <header className="tw-px-4 tw-flex tw-items-center tw-h-16 tw-min-h-[4rem]">
                <a className="tw-p-1 tw-h-8" href="/">
                    <img className="tw-h-full tw-object-contain" src={fondueLogo} alt="Fondue Logo" />
                </a>

                <nav className="tw-w-full">
                    <ul className="tw-w-full tw-items-center tw-justify-center tw-flex tw-gap-4">
                        {[
                            { label: 'Getting started', href: '/getting-started' },
                            { label: 'Tokens', href: '/tokens' },
                            { label: 'Components', href: '/components' },
                            { label: 'Icons', href: '/icons' },
                        ].map(({ label, href }) => (
                            <li key={href}>
                                <Link
                                    className="data-[route-active=true]:tw-underline tw-underline-offset-4 tw-decoration-2"
                                    href={href}
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </header>

            <div className="tw-h-full tw-flex">{children}</div>
        </main>
    );
};
