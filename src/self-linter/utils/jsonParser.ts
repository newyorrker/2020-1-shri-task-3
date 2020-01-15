import * as jsonToAst from "json-to-ast";

export function parseJson (json: any): any {
	return jsonToAst(json);
}
