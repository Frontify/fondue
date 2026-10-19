/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * Deprecated MCP endpoint. The Storybook MCP that used to live here was replaced by
 * the Fondue agent skill, which queries the locally installed `@frontify/fondue/sdk`.
 * This stub stays so existing client configs get a pointer to the skill instead of a 404.
 */

const DEPRECATION_MESSAGE = [
    'The Fondue Storybook MCP server has been deprecated and no longer serves component documentation.',
    'Use the Fondue agent skill instead. It queries the `@frontify/fondue` version installed in your project:',
    '',
    '    npx skills add frontify/fondue/packages/sdk',
    '',
    'Then remove this MCP server from your agent configuration.',
    'Docs: https://fondue-components.frontify.com/llms.txt',
].join('\n');

// Kept under the names the Storybook MCP exposed, so agents calling them get the notice.
const TOOL_NAMES = ['docs-list', 'docs-show', 'docs-show-story'];

const PROTOCOL_VERSION = '2025-06-18';

const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Accept, Mcp-Session-Id, Mcp-Protocol-Version',
};

type JsonRpcRequest = {
    jsonrpc: '2.0';
    id?: string | number | null;
    method: string;
    params?: { protocolVersion?: string };
};

const handleRequest = ({ id, method, params }: JsonRpcRequest) => {
    switch (method) {
        case 'initialize':
            return {
                jsonrpc: '2.0',
                id,
                result: {
                    protocolVersion: params?.protocolVersion ?? PROTOCOL_VERSION,
                    capabilities: { tools: {} },
                    serverInfo: { name: 'fondue-storybook-mcp (deprecated)', version: '0.0.0' },
                    instructions: DEPRECATION_MESSAGE,
                },
            };
        case 'ping':
            return { jsonrpc: '2.0', id, result: {} };
        case 'tools/list':
            return {
                jsonrpc: '2.0',
                id,
                result: {
                    tools: TOOL_NAMES.map((name) => ({
                        name,
                        description: `Deprecated. ${DEPRECATION_MESSAGE}`,
                        inputSchema: { type: 'object', properties: {}, additionalProperties: true },
                    })),
                },
            };
        case 'tools/call':
            return {
                jsonrpc: '2.0',
                id,
                result: { content: [{ type: 'text', text: DEPRECATION_MESSAGE }], isError: true },
            };
        default:
            return { jsonrpc: '2.0', id, error: { code: -32601, message: `Method not found: ${method}` } };
    }
};

const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), { status, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' } });

export default async (req: Request): Promise<Response> => {
    if (req.method === 'OPTIONS') {
        return new Response(null, { status: 204, headers: CORS_HEADERS });
    }
    if (req.method !== 'POST') {
        return new Response(DEPRECATION_MESSAGE, { status: 405, headers: { ...CORS_HEADERS, Allow: 'POST, OPTIONS' } });
    }

    let body: JsonRpcRequest | JsonRpcRequest[];
    try {
        body = (await req.json()) as JsonRpcRequest | JsonRpcRequest[];
    } catch {
        return json({ jsonrpc: '2.0', id: null, error: { code: -32700, message: 'Parse error' } }, 400);
    }

    // Notifications (no id) get no response body.
    const responses = (Array.isArray(body) ? body : [body])
        .filter((message) => message.id !== undefined && message.id !== null)
        .map(handleRequest);
    if (responses.length === 0) {
        return new Response(null, { status: 202, headers: CORS_HEADERS });
    }
    return json(Array.isArray(body) ? responses : responses[0]);
};

export const config = {
    path: '/mcp',
    preferStatic: true,
};
