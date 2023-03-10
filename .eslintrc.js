/**
 * Config file for eslint
 * Defines global environment variables, the eslint plugins being used, and the specific rules eslint
 * is testing for
 * Rule Severity: 0 (no error), 1 (warn), or 2 (error)
 * 
 * ESLint will catch any errors looked for by eslint:recommend whether or not the specific
 * rule is listed in the rules section. If the sdl plugin is including the package.json dependencies and is
 * installed, eslint will check for all rules provided by the plugin at the default severity levels. If the sdl
 * plugin is not installed as a dependency, eslint will only check for rules specified
 * in the rules section at the given severity level. If both are done, the config file takes precedence.
 * However, the rule must have an entry in ErrorTypes.js - If it doesn't, or if the ruleID eslint returns doesn't match
 * the name in the ErrorTypes.js entry, the error will be processed as ErrorTypes[-1] (no error). Note the ruleID
 * to Error Type name conversion function replaces all '-' with ' '.
 * 
 * Note: Not all rules for each plugin are enabled. Some are too strict, and some overlap.

 */

module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		"eslint:recommended",
	],
	parserOptions: {
		ecmaVersion: 12,
		sourceType: "module",
	},
	rules: {
		"security-node/detect-absence-of-name-option-in-exrpress-session": 2, // exrpress misspelling is correct
		"security-node/detect-buffer-unsafe-allocation": 2,
		"security-node/detect-crlf": 2,
		"security-node/detect-dangerous-redirects": 2,
		"security-node/detect-nosql-injection": 2,
		"security-node/detect-option-multiplestatements-in-mysql": 2,
		"security-node/detect-security-missconfiguration-cookie": 2,
		"security-node/detect-sql-injection": 2,
		"security-node/disable-ssl-across-node-server": 2,
		"security-node/detect-improper-exception-handling": 2,
		"security-node/detect-unhandled-async-errors": 2,
		"security-node/detect-unhandled-event-errors": 2,
		"no-eval": 2,
		"no-implied-eval": 2,
		"@microsoft/sdl/no-inner-html": 2,
		"no-secrets/no-secrets": [2, {"tolerance":4.1}], // tolerance: max randomness allowed, 4 is default
		"xss/no-mixed-html": 2,
		"xss/no-location-href-assign": 2,
		"security/detect-bidi-characters": 2,
		"security/detect-buffer-noassert": 2,
		"security/detect-child-process": 2,
		"security/detect-disable-mustache-escape": 2,
		"security/detect-new-buffer": 2,
		"security/detect-no-csrf-before-method-override": 2,
		"security/detect-non-literal-fs-filename": 2,
		"security/detect-non-literal-regexp": 2,
		"security/detect-non-literal-require": 2,
		//"security/detect-object-injection": 2, not included - generates error in ErrorTypes files
		"security/detect-possible-timing-attacks": 2,
		"security/detect-pseudoRandomBytes": 2,
		"security/detect-unsafe-regex": 2,
		"no-unused-vars":0,
		"constructor-super":0,
		"for-direction":0,
		"getter-return":0,
		"no-async-promise-executor":0,
		"no-await-in-loop":0,
		"no-class-assign":0,
		"no-compare-neg-zero":0,
		"no-cond-assign":0,
		"no-const-assign":0,
		"no-constant-condition":0,
		"no-constructor-return":0,
		"no-control-regex":0,
		"no-debugger":0,
		"no-dupe-args":0,
		"no-dupe-class-members":0,
		"no-dupe-else-if":0,
		"no-dupe-keys":0,
		"no-duplicate-case":0,
		"no-duplicate-imports":0,	
		"no-empty-character-class":0,
		"no-empty-pattern":0,
		"no-ex-assign":0,
		"no-fallthrough":0,
		"no-func-assign":0,
		"no-import-assign":0,
		"no-inner-declarations":0,	
		"no-invalid-regexp":0,
		"no-irregular-whitespace":0,
		"no-loss-of-precision":0,
		"no-misleading-character-class":0,
		"no-new-symbol":0,
		"no-obj-calls":0,
		"no-promise-executor-return":0,
		"no-prototype-builtins":0,
		"no-self-assign":0,
		"no-self-compare":0,
		"no-setter-return":0,
		"no-sparse-arrays":0,
		"no-template-curly-in-string":0,
		"no-this-before-super":0,
		"no-undef":0,
		"no-unexpected-multiline":0,
		"no-unmodified-loop-condition":0,
		"no-unreachable":0,
		"no-unreachable-loop":0,
		"no-unsafe-finally":0,
		"no-unsafe-negation":0,
		"no-unsafe-optional-chaining":0,
		"no-unused-private-class-members":0,
		"no-unused-vars":0,
		"no-use-before-define":0,
		"no-useless-backreference":0,
		"require-atomic-updates":0,
		"use-isnan":0,
		"valid-typeof":0,
	},
	plugins: ["@microsoft/eslint-plugin-sdl", "no-secrets", "xss", "security", "security-node"]
};
