import {
    createConnection,
    ProposedFeatures,
    TextDocuments,
    InitializeParams,
    TextDocument,
    TextDocumentSyncKind,
    Diagnostic,
    DiagnosticSeverity,
    DidChangeConfigurationParams
} from 'vscode-languageserver';

import { basename } from 'path';

import { lint } from './self-linter/linter';

import { ExampleConfiguration, Severity, RuleKeys } from './configuration';
import { makeLint, LinterProblem } from './linter';

let conn = createConnection(ProposedFeatures.all);
let docs = new TextDocuments();
let conf: ExampleConfiguration | undefined = undefined;
let sync: TextDocumentSyncKind = TextDocumentSyncKind.Full;

conn.onInitialize((params: InitializeParams) => {
    return {
        capabilities: {
            textDocumentSync: sync
        }
    };
});

function GetSeverity(key: RuleKeys): DiagnosticSeverity | undefined {
    if (!conf || !conf.severity) {
        return undefined;
    }

    const severity: Severity = conf.severity[key];
    console.log(key);
    console.log(conf.severity);
    console.log(severity);
    console.log('');

    switch (severity) {
        case Severity.Error:
            return DiagnosticSeverity.Information;
        case Severity.Warning:
            return DiagnosticSeverity.Warning;
        case Severity.Information:
            return DiagnosticSeverity.Information;
        case Severity.Hint:
            return DiagnosticSeverity.Hint;
        default:
            return undefined;
    }
}

async function validateTextDocument(textDocument: TextDocument): Promise<void> {
    const source = basename(textDocument.uri);
    const json = textDocument.getText();

    const diagnostics: Diagnostic[] = lint(json).reduce(
        (
            list: Diagnostic[],
            problem: LinterProblem<RuleKeys>
        ): Diagnostic[] => {
            const severity = GetSeverity(problem.code);

            // console.log(list);
            // console.log(problem);

            if (severity) {
                const message = problem.key;

                let diagnostic: Diagnostic = {
                    range: {
                        start: textDocument.positionAt(
                            problem.loc.start.offset
                        ),
                        end: textDocument.positionAt(problem.loc.end.offset)
                    },
                    severity,
                    message,
                    source
                };

                list.push(diagnostic);
            }

            // console.log(list, 'list');

            return list;
        },
        []
    );

    if (diagnostics.length) {
        conn.sendDiagnostics({ uri: textDocument.uri, diagnostics });
    }
}

async function validateAll() {
    for (const document of docs.all()) {
        await validateTextDocument(document);
    }
}

docs.onDidChangeContent(change => {
    validateTextDocument(change.document);
});

conn.onDidChangeConfiguration(({ settings }: DidChangeConfigurationParams) => {
    conf = settings.example;
    validateAll();
});

docs.listen(conn);
conn.listen();
