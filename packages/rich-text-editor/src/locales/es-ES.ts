/* (c) Copyright Frontify Ltd., all rights reserved. */

// Typed here because vite/client would change the type of the glob call.
type ViteImportMeta = ImportMeta & {
    glob: (pattern: string, options: { eager: true; import: string }) => Record<string, Record<string, string>>;
};

const pluginStrings = (import.meta as ViteImportMeta).glob('../plugins/*/locales/es-ES.ts', {
    eager: true,
    import: 'default',
});

export const esES = {
    lang: 'es-ES',
    translationStrings: {
        RichTextEditor_announceBoth: '${first}. ${second}',
        RichTextEditor_apply: 'Aplicar',
        RichTextEditor_blockedInvalid: 'No se puede editar porque este contenido no es válido.',
        RichTextEditor_blockedLimit: 'No se puede editar porque este contenido supera un límite de tamaño.',
        RichTextEditor_blockedMigration:
            'No se puede editar porque este contenido no se puede actualizar a la versión actual.',
        RichTextEditor_blockedVersion: 'No se puede editar porque este contenido usa un formato o modelo desconocido.',
        RichTextEditor_brandStyles: 'Estilos de marca',
        RichTextEditor_bubbleToolbar: 'Formato de la selección',
        RichTextEditor_cancel: 'Cancelar',
        RichTextEditor_checkColorMeaningReview: 'Significado transmitido por el color',
        RichTextEditor_checkColorMeaningReviewHelp:
            'Comprueba que el color no es la única forma en que este texto transmite un significado, como un estado o un elemento obligatorio. Añade también palabras.',
        RichTextEditor_checkContrastLow: 'Contraste de texto bajo',
        RichTextEditor_checkContrastLowHelp:
            'El color del texto y su fondo tienen poco contraste para muchas personas. Elige un color de texto que el menú ofrezca para este fondo.',
        RichTextEditor_checkContrastUnknown: 'Contraste de texto que no se puede medir',
        RichTextEditor_checkContrastUnknownHelp:
            'El editor no conoce el color de este texto o de su fondo. Comprueba que el texto se lee con facilidad, con un contraste de al menos 4,5 a 1, o 3 a 1 para texto grande.',
        RichTextEditor_checkGenericImageWords:
            'imagen|foto|fotografía|gráfico|ilustración|icono|logo|logotipo|banner|captura|captura de pantalla|texto alternativo|marcador|sin título|miniatura',
        RichTextEditor_checkHeadingDescriptiveReview: 'Texto del encabezado',
        RichTextEditor_checkHeadingDescriptiveReviewHelp:
            'Comprueba que cada encabezado dice de qué trata su sección, para encontrar una sección solo con los encabezados.',
        RichTextEditor_checkHeadingEmpty: 'Encabezado vacío',
        RichTextEditor_checkHeadingEmptyHelp:
            'Un encabezado sin texto aparece igualmente en la lista de encabezados que ofrecen los lectores de pantalla. Añade su texto o conviértelo en texto normal.',
        RichTextEditor_checkHeadingSkippedLevel: 'Nivel de encabezado omitido',
        RichTextEditor_checkHeadingSkippedLevelHelp:
            'Los niveles de encabezado forman el esquema del documento. Un encabezado debería estar como mucho un nivel por debajo del anterior.',
        RichTextEditor_checkImageAltMissing: 'Imagen sin texto alternativo',
        RichTextEditor_checkImageAltMissingHelp:
            'Decide si la imagen aporta información. Si es así, describe en pocas palabras lo que muestra. Si solo es decorativa, márcala como decorativa.',
        RichTextEditor_checkImageAltSuspicious: 'Texto alternativo que quizá no describe la imagen',
        RichTextEditor_checkImageAltSuspiciousHelp:
            'El texto alternativo parece un nombre de archivo o una palabra genérica. Si no dice qué muestra la imagen ni por qué está ahí, escribe una breve descripción.',
        RichTextEditor_checkImageContentReview: 'Contenido de la imagen',
        RichTextEditor_checkImageContentReviewHelp:
            'Comprueba si la imagen muestra texto que debería estar en el documento, se mueve o parpadea durante más de cinco segundos o destella más de tres veces por segundo.',
        RichTextEditor_checkLanguagePartsReview: 'Fragmentos en otro idioma',
        RichTextEditor_checkLanguagePartsReviewHelp:
            'Comprueba si algún fragmento está en un idioma distinto del documento. Marcar su idioma permite a los lectores de pantalla pronunciarlo bien.',
        RichTextEditor_checkLinkPurposeReview: 'Propósito del enlace',
        RichTextEditor_checkLinkPurposeReviewHelp:
            'Comprueba que el texto del enlace, con su frase, dice adónde lleva el enlace y qué ocurre al seguirlo.',
        RichTextEditor_checkLinkTextEmpty: 'Enlace sin texto',
        RichTextEditor_checkLinkTextEmptyHelp:
            'Un enlace necesita un texto que un lector de pantalla pueda leer. Añade un texto que diga adónde lleva el enlace.',
        RichTextEditor_checkLinkTextVague: 'Texto de enlace que no dice adónde lleva',
        RichTextEditor_checkLinkTextVagueHelp:
            'Lee el texto del enlace por sí solo, como lo muestra una lista de enlaces. Si no dice adónde lleva, como «aquí» o «leer más», nombra el destino.',
        RichTextEditor_checkSensoryReview: 'Instrucciones que dependen de los sentidos',
        RichTextEditor_checkSensoryReviewHelp:
            'Comprueba que ninguna instrucción depende solo de la forma, el color, el tamaño, el sonido o la posición en la página. Nombra también el elemento, para que todos puedan seguirla.',
        RichTextEditor_checkStructureReview: 'Estructura solo visual',
        RichTextEditor_checkStructureReviewHelp:
            'Comprueba si alguna estructura se muestra solo visualmente, como texto en negrita usado como encabezado, párrafos que empiezan con un guion o un número usados como lista, o una sangría que marca una cita. Usa en su lugar los comandos de encabezado, lista y cita.',
        RichTextEditor_checkVagueLinkTexts:
            'haz clic aquí|clic aquí|haga clic aquí|clic|aquí|enlace|este enlace|más|leer más|saber más|más información|info|detalles|continuar|esta página|sitio web',
        RichTextEditor_close: 'Cerrar',
        RichTextEditor_columnBreak: 'Salto de columna',
        RichTextEditor_columnBreakInactive: 'Salto de columna, inactivo',
        RichTextEditor_contextMenu: 'Acciones de la selección',
        RichTextEditor_convertToText: 'Convertir en texto',
        RichTextEditor_convertedToText: 'Convertido en texto',
        RichTextEditor_originalCopied: 'Original copiado',
        RichTextEditor_copyContent: 'Copiar contenido',
        RichTextEditor_copyFailed: 'No se ha podido copiar. Selecciona el contenido y cópialo con el teclado.',
        RichTextEditor_copyOriginal: 'Copiar original',
        RichTextEditor_gapCursor: 'Entre bloques. Escribe para añadir un párrafo.',
        RichTextEditor_imageAltReviewPrompt:
            'La imagen ha cambiado. Comprueba que su texto alternativo aún la describe.',
        RichTextEditor_imageReplaceRemoved: 'La imagen no se ha reemplazado porque se ha eliminado.',
        RichTextEditor_imageTargetRemoved: 'La imagen no se ha insertado porque se ha eliminado el lugar donde iba.',
        RichTextEditor_imageUnavailable: 'Imagen no disponible',
        RichTextEditor_mentionFailed: 'La búsqueda ha fallado',
        RichTextEditor_mentionLoadMore: 'Cargar más',
        RichTextEditor_mentionLoading: 'Buscando…',
        RichTextEditor_mentionNoResults: 'Sin resultados',
        RichTextEditor_mentionOption: '${label}, ${type}, ${position} de ${total}',
        RichTextEditor_mentionResults: 'Resultados: ${count}',
        RichTextEditor_mentionSuggestions: 'Sugerencias de mención',
        RichTextEditor_mentionUnavailable: 'no disponible',
        RichTextEditor_mentionUnknown: 'Desconocido (${resourceType})',
        RichTextEditor_more: 'Más',
        RichTextEditor_nodeViewError: 'Esta parte del contenido no se puede mostrar',
        RichTextEditor_panelError: 'No se ha podido mostrar este panel.',
        RichTextEditor_pasteFormattingRemoved: 'Se ha quitado parte del formato.',
        RichTextEditor_pasteMediaDropped: 'Contenido multimedia no pegado: ${count}',
        RichTextEditor_pasteTooLarge: 'El contenido pegado es demasiado grande.',
        RichTextEditor_profileLoadFailed: 'No se ha podido cargar el editor.',
        RichTextEditor_readerBlockedInvalid: 'Este contenido no se puede mostrar',
        RichTextEditor_readerBlockedUnsupported: 'Este contenido no se puede mostrar aquí',
        RichTextEditor_readerIslandFeature: 'Contenido no compatible: ${feature}',
        RichTextEditor_readerIslandGeneric: 'Contenido no compatible',
        RichTextEditor_readerIslandNotice: 'Algunos contenidos no son compatibles aquí.',
        RichTextEditor_recoveryMessage: 'El editor dejó de funcionar. Tus últimos cambios se muestran a continuación.',
        RichTextEditor_retry: 'Reintentar',
        RichTextEditor_saveConflict:
            'Otra persona ha cambiado este contenido. Tus cambios se conservan, pero no se han guardado.',
        RichTextEditor_saveFailed: 'No se ha podido guardar. Tus cambios no están guardados.',
        RichTextEditor_saveForbidden:
            'No guardado: no puedes editar este contenido. Solicita acceso o vuelve a iniciar sesión.',
        RichTextEditor_saveIncompatible: 'No guardado: este editor está desactualizado. Vuelve a cargar la página.',
        RichTextEditor_saveInvalid: 'No guardado: el contenido no se ha aceptado. Cópialo para conservar tus cambios.',
        RichTextEditor_saveOffline: 'Sin conexión. Los cambios se guardarán cuando vuelvas a estar en línea.',
        RichTextEditor_saveRetrying: 'No se ha podido guardar. Reintentando…',
        RichTextEditor_saveSaved: 'Todos los cambios guardados',
        RichTextEditor_saveSaving: 'Guardando…',
        RichTextEditor_saveUnsaved: 'Cambios sin guardar',
        RichTextEditor_slashInsert: 'Insertar',
        RichTextEditor_slashTurnInto: 'Convertir en',
        RichTextEditor_submitEmpty: 'Escribe algo de texto antes de enviar.',
        RichTextEditor_submitHint: 'Para enviar, pulsa ${submit}. Para una nueva línea, pulsa ${newLine}.',
        RichTextEditor_submitHintSingleLine: 'Para enviar, pulsa ${submit}.',
        RichTextEditor_suggestionOption: '${label}, ${position} de ${total}',
        RichTextEditor_suggestions: 'Sugerencias',
        RichTextEditor_textStyle: 'Estilo de texto',
        RichTextEditor_toolbar: 'Formato de texto',
        RichTextEditor_toolbarAlways: 'Mostrar siempre la barra de herramientas',
        RichTextEditor_toolbarOnSelection: 'Mostrar la barra de herramientas solo al seleccionar',
        RichTextEditor_turnIntoCurrent: 'Convertir en: ${type}',
        RichTextEditor_unavailable: 'No disponible en la selección actual',
        RichTextEditor_unavailableNotAllowed: 'No permitido en este editor',
        RichTextEditor_unavailableReadOnly: 'El contenido es de solo lectura',
        RichTextEditor_uploadCancel: 'Cancelar subida',
        RichTextEditor_uploadCancelled: 'Subida cancelada: ${name}',
        RichTextEditor_uploadCompleted: 'Subido: ${name}',
        RichTextEditor_uploadCompletedNoAlt: 'Subido: ${name}. Aún no tiene texto alternativo.',
        RichTextEditor_uploadFailed: 'Subida fallida: ${name}',
        RichTextEditor_uploadRetry: 'Reintentar subida',
        RichTextEditor_uploadStarted: 'Subiendo: ${name}',
        RichTextEditor_uploadStartedCount: 'Subiendo archivos: ${count}',
        RichTextEditor_uploadTooLarge:
            '${name} no se ha subido porque es demasiado grande. Elige un archivo de tipo ${types} de hasta ${size}.',
        RichTextEditor_uploadTooManyPixels:
            '${name} no se ha subido porque la imagen tiene demasiados píxeles. Elige una imagen de ${megapixels} megapíxeles como máximo y ${side} píxeles por lado.',
        RichTextEditor_uploadUnreadable:
            '${name} no se ha subido porque no se puede leer el tamaño de la imagen. Elige un archivo de tipo ${types} de hasta ${size}.',
        RichTextEditor_uploadUnsafe:
            '${name} no se ha subido porque el SVG contiene un script. Elige un archivo de tipo ${types} de hasta ${size}.',
        RichTextEditor_uploadWrongType:
            '${name} no se ha subido porque no se acepta este tipo de archivo. Elige un archivo de tipo ${types} de hasta ${size}.',
        ...(Object.assign({}, ...Object.values(pluginStrings)) as Record<string, string>),
    },
};
