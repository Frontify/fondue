/* (c) Copyright Frontify Ltd., all rights reserved. */

// Typed here because vite/client would change the type of the glob call.
type ViteImportMeta = ImportMeta & {
    glob: (pattern: string, options: { eager: true; import: string }) => Record<string, Record<string, string>>;
};

const pluginStrings = (import.meta as ViteImportMeta).glob('../plugins/*/locales/pt-PT.ts', {
    eager: true,
    import: 'default',
});

export const ptPT = {
    lang: 'pt-PT',
    translationStrings: {
        RichTextEditor_alignCenter: 'Centrar',
        RichTextEditor_alignJustify: 'Justificar',
        RichTextEditor_alignLeft: 'Alinhar à esquerda',
        RichTextEditor_alignRight: 'Alinhar à direita',
        RichTextEditor_announceBoth: '${first}. ${second}',
        RichTextEditor_apply: 'Aplicar',
        RichTextEditor_blockedInvalid: 'Não é possível editar porque este conteúdo não é válido.',
        RichTextEditor_blockedLimit: 'Não é possível editar porque este conteúdo excede um limite de tamanho.',
        RichTextEditor_blockedMigration:
            'Não é possível editar porque este conteúdo não pode ser atualizado para a versão atual.',
        RichTextEditor_blockedVersion:
            'Não é possível editar porque este conteúdo usa um formato ou modelo desconhecido.',
        RichTextEditor_bold: 'Negrito',
        RichTextEditor_brandStyles: 'Estilos da marca',
        RichTextEditor_bubbleToolbar: 'Formatação da seleção',
        RichTextEditor_bulletList: 'Lista com marcadores',
        RichTextEditor_cancel: 'Cancelar',
        RichTextEditor_checkColorMeaningReview: 'Significado transmitido pela cor',
        RichTextEditor_checkColorMeaningReviewHelp:
            'Verifique se a cor não é a única forma de este texto transmitir significado, como um estado ou um item obrigatório. Acrescente também palavras.',
        RichTextEditor_checkContrastLow: 'Contraste de texto baixo',
        RichTextEditor_checkContrastLowHelp:
            'A cor do texto e o fundo têm pouco contraste para muitas pessoas. Escolha uma cor de texto que o menu ofereça para este fundo.',
        RichTextEditor_checkContrastUnknown: 'Contraste de texto impossível de medir',
        RichTextEditor_checkContrastUnknownHelp:
            'O editor não conhece a cor deste texto ou do seu fundo. Verifique se o texto se lê com facilidade, com um contraste de pelo menos 4,5 para 1, ou 3 para 1 em texto grande.',
        RichTextEditor_checkGenericImageWords:
            'imagem|foto|fotografia|gráfico|ilustração|ícone|logótipo|logo|banner|captura de ecrã|texto alternativo|marcador de posição|sem título|miniatura',
        RichTextEditor_checkHeadingDescriptiveReview: 'Texto do título',
        RichTextEditor_checkHeadingDescriptiveReviewHelp:
            'Verifique se cada título diz de que trata a sua secção, para que se encontre uma secção só pelos títulos.',
        RichTextEditor_checkHeadingEmpty: 'Título vazio',
        RichTextEditor_checkHeadingEmptyHelp:
            'Um título sem texto aparece mesmo assim na lista de títulos que os leitores de ecrã oferecem. Adicione o texto ou transforme-o em texto normal.',
        RichTextEditor_checkHeadingSkippedLevel: 'Nível de título saltado',
        RichTextEditor_checkHeadingSkippedLevelHelp:
            'Os níveis de título formam a estrutura do documento. Um título deve estar no máximo um nível abaixo do título anterior.',
        RichTextEditor_checkImageAltMissing: 'Imagem sem texto alternativo',
        RichTextEditor_checkImageAltMissingHelp:
            'Decida se a imagem acrescenta informação. Se sim, descreva em poucas palavras o que mostra. Se for apenas decorativa, marque-a como decorativa.',
        RichTextEditor_checkImageAltSuspicious: 'Texto alternativo que pode não descrever a imagem',
        RichTextEditor_checkImageAltSuspiciousHelp:
            'O texto alternativo parece um nome de ficheiro ou uma palavra genérica. Se não diz o que a imagem mostra nem porque está ali, escreva antes uma descrição curta.',
        RichTextEditor_checkImageContentReview: 'Conteúdo da imagem',
        RichTextEditor_checkImageContentReviewHelp:
            'Verifique se a imagem mostra texto que devia estar no documento, se mexe ou pisca durante mais de cinco segundos ou cintila mais de três vezes por segundo.',
        RichTextEditor_checkLanguagePartsReview: 'Passagens noutra língua',
        RichTextEditor_checkLanguagePartsReviewHelp:
            'Verifique se alguma passagem está numa língua diferente da do documento. Marcar a sua língua permite aos leitores de ecrã pronunciá-la bem.',
        RichTextEditor_checkLinkPurposeReview: 'Finalidade da ligação',
        RichTextEditor_checkLinkPurposeReviewHelp:
            'Verifique se o texto da ligação, com a sua frase, diz para onde vai a ligação e o que acontece ao segui-la.',
        RichTextEditor_checkLinkTextEmpty: 'Ligação sem texto',
        RichTextEditor_checkLinkTextEmptyHelp:
            'Uma ligação precisa de texto que um leitor de ecrã possa ler. Adicione texto que diga para onde vai a ligação.',
        RichTextEditor_checkLinkTextVague: 'Texto de ligação que não diz para onde vai',
        RichTextEditor_checkLinkTextVagueHelp:
            'Leia o texto da ligação sozinho, como uma lista de ligações o mostra. Se não diz para onde vai, como «aqui» ou «ler mais», indique antes o destino.',
        RichTextEditor_checkSensoryReview: 'Instruções que dependem dos sentidos',
        RichTextEditor_checkSensoryReviewHelp:
            'Verifique se nenhuma instrução depende só da forma, cor, tamanho, som ou posição na página. Indique também o nome do elemento, para que todos possam segui-la.',
        RichTextEditor_checkStructureReview: 'Estrutura apenas visual',
        RichTextEditor_checkStructureReviewHelp:
            'Verifique se alguma estrutura é mostrada apenas visualmente, como texto a negrito usado como título, parágrafos que começam com um travessão ou um número usados como lista, ou um avanço que marca uma citação. Use antes os comandos de título, lista e citação.',
        RichTextEditor_checkVagueLinkTexts:
            'clique aqui|clique|aqui|ligação|esta ligação|link|mais|ler mais|saber mais|mais informações|info|detalhes|continuar|ir|esta página|site',
        RichTextEditor_checks: 'Verificações de acessibilidade',
        RichTextEditor_clearFormatting: 'Limpar formatação',
        RichTextEditor_close: 'Fechar',
        RichTextEditor_code: 'Código',
        RichTextEditor_codeBlock: 'Bloco de código',
        RichTextEditor_codeLanguageMenu: 'Linguagem do código',
        RichTextEditor_colorMenu: 'Cor',
        RichTextEditor_columnBreak: 'Quebra de coluna',
        RichTextEditor_columnBreakInactive: 'Quebra de coluna, inativa',
        RichTextEditor_contextMenu: 'Ações da seleção',
        RichTextEditor_convertToText: 'Converter em texto',
        RichTextEditor_convertedToText: 'Convertido em texto',
        RichTextEditor_originalCopied: 'Original copiado',
        RichTextEditor_copyContent: 'Copiar conteúdo',
        RichTextEditor_copyFailed: 'Não foi possível copiar. Selecione o conteúdo e copie-o com o teclado.',
        RichTextEditor_copyOriginal: 'Copiar original',
        RichTextEditor_defaultStyle: 'Estilo predefinido',
        RichTextEditor_divider: 'Divisor',
        RichTextEditor_emoji: 'Emoji',
        RichTextEditor_gapCursor: 'Entre blocos. Escreva para adicionar um parágrafo.',
        RichTextEditor_image: 'Imagem',
        RichTextEditor_imageAlignMenu: 'Alinhamento da imagem',
        RichTextEditor_imageAltEdit: 'Texto alternativo',
        RichTextEditor_imageAltReviewPrompt: 'A imagem mudou. Confirme que o texto alternativo ainda a descreve.',
        RichTextEditor_imageReplace: 'Substituir imagem',
        RichTextEditor_imageReplaceRemoved: 'A imagem não foi substituída porque foi removida.',
        RichTextEditor_imageSizeCustom: 'Largura personalizada…',
        RichTextEditor_imageSizeMenu: 'Tamanho da imagem',
        RichTextEditor_imageTargetRemoved: 'A imagem não foi inserida porque o local para ela foi removido.',
        RichTextEditor_imageUnavailable: 'Imagem indisponível',
        RichTextEditor_italic: 'Itálico',
        RichTextEditor_language: 'Idioma',
        RichTextEditor_link: 'Ligação',
        RichTextEditor_linkNewWindow: '(abre numa nova janela)',
        RichTextEditor_mention: 'Mencionar',
        RichTextEditor_mentionFailed: 'A pesquisa falhou',
        RichTextEditor_mentionLoadMore: 'Carregar mais',
        RichTextEditor_mentionLoading: 'A pesquisar…',
        RichTextEditor_mentionNoResults: 'Sem resultados',
        RichTextEditor_mentionOption: '${label}, ${type}, ${position} de ${total}',
        RichTextEditor_mentionResults: 'Resultados: ${count}',
        RichTextEditor_mentionSuggestions: 'Sugestões de menção',
        RichTextEditor_mentionUnavailable: 'indisponível',
        RichTextEditor_mentionUnknown: 'Desconhecido (${resourceType})',
        RichTextEditor_more: 'Mais',
        RichTextEditor_moveDown: 'Mover para baixo',
        RichTextEditor_moveUp: 'Mover para cima',
        RichTextEditor_nodeViewError: 'Esta parte do conteúdo não pode ser apresentada',
        RichTextEditor_normalText: 'Texto normal',
        RichTextEditor_numberedList: 'Lista numerada',
        RichTextEditor_outline: 'Estrutura',
        RichTextEditor_panelError: 'Não foi possível mostrar este painel.',
        RichTextEditor_pasteFormattingRemoved: 'Parte da formatação foi removida.',
        RichTextEditor_pasteMediaDropped: 'Multimédia não colado: ${count}',
        RichTextEditor_pasteTooLarge: 'O conteúdo colado é demasiado grande.',
        RichTextEditor_profileLoadFailed: 'Não foi possível carregar o editor.',
        RichTextEditor_quote: 'Citação',
        RichTextEditor_readerBlockedInvalid: 'Este conteúdo não pode ser apresentado',
        RichTextEditor_readerBlockedUnsupported: 'Este conteúdo não pode ser apresentado aqui',
        RichTextEditor_readerIslandFeature: 'Conteúdo não suportado: ${feature}',
        RichTextEditor_readerIslandGeneric: 'Conteúdo não suportado',
        RichTextEditor_readerIslandNotice: 'Alguns conteúdos não são suportados aqui.',
        RichTextEditor_recoveryMessage:
            'O editor deixou de funcionar. As suas alterações mais recentes são mostradas abaixo.',
        RichTextEditor_redo: 'Refazer',
        RichTextEditor_retry: 'Tentar novamente',
        RichTextEditor_saveConflict:
            'Outra pessoa alterou este conteúdo. As suas alterações são mantidas, mas não foram guardadas.',
        RichTextEditor_saveFailed: 'Não foi possível guardar. As suas alterações não estão guardadas.',
        RichTextEditor_saveForbidden:
            'Não guardado: não pode editar este conteúdo. Peça acesso ou inicie sessão novamente.',
        RichTextEditor_saveIncompatible: 'Não guardado: este editor está desatualizado. Recarregue a página.',
        RichTextEditor_saveInvalid: 'Não guardado: o conteúdo não foi aceite. Copie-o para manter as suas alterações.',
        RichTextEditor_saveOffline: 'Sem ligação. As alterações serão guardadas quando voltar a estar online.',
        RichTextEditor_saveRetrying: 'Não foi possível guardar. A tentar novamente…',
        RichTextEditor_saveSaved: 'Todas as alterações guardadas',
        RichTextEditor_saveSaving: 'A guardar…',
        RichTextEditor_saveUnsaved: 'Alterações não guardadas',
        RichTextEditor_slashInsert: 'Inserir',
        RichTextEditor_slashTurnInto: 'Converter em',
        RichTextEditor_startNumbering: 'Iniciar a numeração em',
        RichTextEditor_strike: 'Rasurado',
        RichTextEditor_submitEmpty: 'Introduza texto antes de enviar.',
        RichTextEditor_submitHint: 'Para enviar, prima ${submit}. Para uma nova linha, prima ${newLine}.',
        RichTextEditor_submitHintSingleLine: 'Para enviar, prima ${submit}.',
        RichTextEditor_subscript: 'Inferior à linha',
        RichTextEditor_suggestionOption: '${label}, ${position} de ${total}',
        RichTextEditor_suggestions: 'Sugestões',
        RichTextEditor_superscript: 'Superior à linha',
        RichTextEditor_taskList: 'Lista de tarefas',
        RichTextEditor_textStyle: 'Estilo de texto',
        RichTextEditor_toolbar: 'Formatação de texto',
        RichTextEditor_toolbarAlways: 'Mostrar sempre a barra de ferramentas',
        RichTextEditor_toolbarOnSelection: 'Mostrar a barra de ferramentas apenas ao selecionar',
        RichTextEditor_turnIntoCurrent: 'Converter em: ${type}',
        RichTextEditor_unavailable: 'Indisponível na seleção atual',
        RichTextEditor_unavailableNotAllowed: 'Não permitido neste editor',
        RichTextEditor_unavailableReadOnly: 'O conteúdo é só de leitura',
        RichTextEditor_underline: 'Sublinhado',
        RichTextEditor_undo: 'Anular',
        RichTextEditor_uploadCancel: 'Cancelar carregamento',
        RichTextEditor_uploadCancelled: 'Carregamento cancelado: ${name}',
        RichTextEditor_uploadCompleted: 'Carregado: ${name}',
        RichTextEditor_uploadCompletedNoAlt: 'Carregado: ${name}. A imagem ainda não tem texto alternativo.',
        RichTextEditor_uploadFailed: 'O carregamento falhou: ${name}',
        RichTextEditor_uploadRetry: 'Repetir carregamento',
        RichTextEditor_uploadStarted: 'A carregar: ${name}',
        RichTextEditor_uploadStartedCount: 'A carregar ficheiros: ${count}',
        RichTextEditor_uploadTooLarge:
            '${name} não foi carregado porque o ficheiro é demasiado grande. Escolha um ficheiro do tipo ${types} com até ${size}.',
        RichTextEditor_uploadTooManyPixels:
            '${name} não foi carregado porque a imagem tem demasiados píxeis. Escolha uma imagem com até ${megapixels} megapíxeis e ${side} píxeis por lado.',
        RichTextEditor_uploadUnreadable:
            '${name} não foi carregado porque não é possível ler o tamanho da imagem. Escolha um ficheiro do tipo ${types} com até ${size}.',
        RichTextEditor_uploadUnsafe:
            '${name} não foi carregado porque o SVG contém um script. Escolha um ficheiro do tipo ${types} com até ${size}.',
        RichTextEditor_uploadWrongType:
            '${name} não foi carregado porque este tipo de ficheiro não é aceite. Escolha um ficheiro do tipo ${types} com até ${size}.',
        ...(Object.assign({}, ...Object.values(pluginStrings)) as Record<string, string>),
    },
};
