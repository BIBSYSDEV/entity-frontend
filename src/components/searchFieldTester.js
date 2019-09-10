import { and, or, rankWith, scopeEndsWith } from '@jsonforms/core';

export default rankWith(
	Number.MAX_VALUE,
	or(scopeEndsWith('narrower'), and(scopeEndsWith('broader'), scopeEndsWith('broaderInput')))
);
