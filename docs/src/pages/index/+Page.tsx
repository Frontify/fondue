import { Tag } from 'components';
export { Page };

console.log('all');

function Page() {
    return (
        <>
            <h1>Welcome</h1>
            This page is:
            <ul>
                <li>Rendered to HTML.</li>
                <li>Interactive.</li>
            </ul>
            <Tag />
        </>
    );
}
