/* eslint-disable no-secrets/no-secrets */
// ^ Because it catches the urls

// Severity Scores:
	// 0: This is not an error.
	// 1: You didn't use a method that could delay/divert an attacker; There a moderately less vulnerable alternative
	// 2: The method you used is significantly more vulnerable than the current best practice/standard.
	// The past severity score is retained in a comment beside the new one.
	// If in doubt, use 2.
exports.ErrorList = {};
exports.ErrorList[-1] = {
	Name: "Error",
	Description: "This Error is not a Security error.",
	Severity: 0,
	CWE: null,
	MoreInfo: null
};
exports.ErrorList[0] = {
	Language: "JavaScript",
	Name: "no caller",
	Description:
		"usage of deprecated functions arguments.caller() and arguments.callee was detected, this could potentially allow access to call stack.",
	//OG Description: Bans usage of deprecated functions arguments.caller() and arguments.callee that could potentially allow access to call stack.
	Severity: 2, //6,
	CWE: "https://cwe.mitre.org/data/definitions/477.html",
	MoreInfo: "https://eslint.org/docs/latest/rules/no-caller"
};
exports.ErrorList[1] = {
	Language: "JavaScript",
	Name: "no delete var",
	Description:
		"usage of delete on variables was detected, this could potentially lead to unexpected behavior.",
	//OG Description: Bans usage of operator delete on variables as it can lead to unexpected behavior.
	Severity: 1, //2,
	CWE: "https://cwe.mitre.org/data/definitions/480.html",
	MoreInfo: "https://eslint.org/docs/latest/rules/no-delete-var"
};
exports.ErrorList[2] = {
	Language: "JavaScript",
	Name: "no eval",
	Description:
		"Usage of eval() was detected, which could potentially lead to code execution from string argument.",
	//OG Description: no-eval, Bans usage of eval() that allows code execution from string argument.
	Severity: 2, //9,
	CWE: "https://cwe.mitre.org/data/definitions/95.html",
	MoreInfo: "https://eslint.org/docs/latest/rules/no-eval"
};
exports.ErrorList[3] = {
	Language: "JavaScript",
	Name: "no implied eval",
	Description:
		"Usage of setTimeout(), setInterval() or execScript() was detected. These functions are prone to code execution.",
	//OG Description: no-implied-eval, Bans usage of setTimeout(), setInterval() and execScript(). These functions are similar to eval() and prone to code execution.
	Severity: 2, //7, //?
	CWE: "https://cwe.mitre.org/data/definitions/95.html",
	MoreInfo: "https://eslint.org/docs/latest/rules/no-implied-eval"
};
exports.ErrorList[4] = {
	Language: "JavaScript",
	Name: "no new func",
	Description:
		"Usage of new Function() was detected, which is prone to code execution.",
	//OG Description: no-new-func, Bans calling new Function() as it's similar to eval() and prone to code execution.
	Severity: 2, //7, //?
	CWE: "https://cwe.mitre.org/data/definitions/95.html",
	MoreInfo: "https://eslint.org/docs/latest/rules/no-new-func"
};
exports.ErrorList[5] = {
	Language: "JavaScript",
	Name: "node/no deprecated api",
	Description: "Usage of deprecated API in Node was detected.",
	//OG Description: node/no-deprecated-api, Bans usage of deprecated APIs in Node.
	Severity: 2, //5, //?
	CWE: "https://cwe.mitre.org/data/definitions/477.html",
	MoreInfo: "https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-deprecated-api.md"
};
exports.ErrorList[6] = {
	Language: "JavaScript",
	Name: "@microsoft/sdl/no angular bypass sanitizer",
	Description:
		"Call to bypassSecurityTrustHtml, bypassSecurityTrustScript or a similar method was detected, which could bypass DomSanitizer in Angular.",
	//OG Description: @microsoft/sdl/no-angular-bypass-sanitizer, Calls to bypassSecurityTrustHtml, bypassSecurityTrustScript and similar methods bypass DomSanitizer in Angular and need to be reviewed.
	Severity: 2, //6, //?
	CWE: "https://cwe.mitre.org/data/definitions/80.html",
	MoreInfo: "https://github.com/microsoft/eslint-plugin-sdl/blob/main/docs/rules/no-angular-bypass-sanitizer.md"
};
exports.ErrorList[7] = {
	Language: "JavaScript",
	Name: "@microsoft/sdl/no angularjs bypass sce",
	Description:
		"Call to $sceProvider.enabled(false), $sceDelegate.trustAs(), $sce.trustAs() or a relevant shorthand method was detected, which could bypass Strict Contextual Escaping (SCE) in AngularJS.",
	//OG Description: @microsoft/sdl/no-angularjs-bypass-sce, Calls to $sceProvider.enabled(false), $sceDelegate.trustAs(), $sce.trustAs() and relevant shorthand methods (e.g. trustAsHtml or trustAsJs) bypass Strict Contextual Escaping (SCE) in AngularJS and need to be reviewed.
	Severity: 2, //8, //?
	CWE: "https://cwe.mitre.org/data/definitions/80.html",
	MoreInfo: "https://github.com/microsoft/eslint-plugin-sdl/blob/main/docs/rules/no-angularjs-bypass-sce.md"
};
exports.ErrorList[8] = {
	Language: "JavaScript",
	Name: "@microsoft/sdl/no angularjs enable svg",
	Description:
		"Call to $sanitizeProvider.enableSvg(true) was detected, which could increase attack surface of the application by enabling SVG support in AngularJS sanitizer",
	//OG Description: @microsoft/sdl/no-angularjs-enable-svg, Calls to $sanitizeProvider.enableSvg(true) increase attack surface of the application by enabling SVG support in AngularJS sanitizer and need to be reviewed.
	Severity: 1, //2, //?
	CWE: "https://cwe.mitre.org/data/definitions/1021.html",
	MoreInfo: "https://github.com/microsoft/eslint-plugin-sdl/blob/main/docs/rules/no-angularjs-enable-svg.md"
};
exports.ErrorList[9] = {
	Language: "JavaScript",
	Name: "@microsoft/sdl/no angularjs sanitization whitelist",
	Description: "Call to $compileProvider.aHrefSanitizationWhitelist or $compileProvider.imgSrcSanitizationWhitelist was detected, which could configure whitelists in AngularJS sanitizer",
	//OG Description: @microsoft/sdl/no-angularjs-sanitization-whitelist, Calls to $compileProvider.aHrefSanitizationWhitelist or $compileProvider.imgSrcSanitizationWhitelist configure whitelists in AngularJS sanitizer and need to be reviewed.
	Severity: 2, //6, //?
	CWE: "https://cwe.mitre.org/data/definitions/80.html",
	MoreInfo: "https://github.com/microsoft/eslint-plugin-sdl/blob/main/docs/rules/no-angularjs-sanitization-whitelist.md"
};
exports.ErrorList[10] = {
	Language: "JavaScript",
	Name: "@microsoft/sdl/no cookies",
	Description:
		"HTTP cookies were detected, which are an old client-side storage mechanism with inherent risks and limitations. Use Web Storage, IndexedDB or other modern methods instead.",
	//OG Description: @microsoft/sdl/no-cookies, HTTP cookies are an old client-side storage mechanism with inherent risks and limitations. Use Web Storage, IndexedDB or other modern methods instead.
	Severity: 2, //4, //?
	CWE: null,
	MoreInfo: "https://github.com/microsoft/eslint-plugin-sdl/blob/main/docs/rules/no-cookies.md"
};
exports.ErrorList[11] = {
	Language: "JavaScript",
	Name: "@microsoft/sdl/no document domain",
	Description:
		"Write to document.domain property was detected, which must be reviewed to avoid bypass of same-origin checks, or usage of top level domains such as azurewebsites.net was detected.",
	//OG Description: @microsoft/sdl/no-document-domain, Writes to document.domain property must be reviewed to avoid bypass of same-origin checks. Usage of top level domains such as azurewebsites.net is strictly prohibited.
	Severity: 2, //6, //?
	CWE: "https://cwe.mitre.org/data/definitions/20.html",
	MoreInfo: "https://github.com/microsoft/eslint-plugin-sdl/blob/main/docs/rules/no-document-domain.md"
};
exports.ErrorList[12] = {
	Language: "JavaScript",
	Name: "@microsoft/sdl/no document write",
	Description:
		"Call to document.write or document.writeln was detected, which manipulate DOM directly without any sanitization and should be avoided. Use document.createElement() or similar methods instead.",
	//OG Description: @microsoft/sdl/no-document-write, Calls to document.write or document.writeln manipulate DOM directly without any sanitization and should be avoided. Use document.createElement() or similar methods instead.
	Severity: 2, //9, //?
	CWE: "https://cwe.mitre.org/data/definitions/20.html",
	MoreInfo: "https://github.com/microsoft/eslint-plugin-sdl/blob/main/docs/rules/no-document-write.md"
};
exports.ErrorList[13] = {
	Language: "JavaScript",
	Name: "@microsoft/sdl/no electron node integration",
	Description:
		"Node.js Integration was detected, which must not be enabled in any renderer that loads remote content to avoid remote code execution attacks.",
	//OG Description: @microsoft/sdl/no-electron-node-integration, Node.js Integration must not be enabled in any renderer that loads remote content to avoid remote code execution attacks.
	Severity: 2, //8, //?
	CWE: "https://cwe.mitre.org/data/definitions/94.html",
	MoreInfo: "https://github.com/microsoft/eslint-plugin-sdl/blob/main/docs/rules/no-electron-node-integration.md"
};
exports.ErrorList[14] = {
	Language: "JavaScript",
	Name: "@microsoft/sdl/no html method",
	Description:
		"Direct call to method html() was detected, which often manipulate DOM without any sanitization and should be avoided. Use document.createElement() or similar methods instead.",
	//OG Description: @microsoft/sdl/no-html-method, Direct calls to method html() often (e.g. in jQuery framework) manipulate DOM without any sanitization and should be avoided. Use document.createElement() or similar methods instead.
	Severity: 2, //6, //?
	CWE: "https://cwe.mitre.org/data/definitions/20.html",
	MoreInfo: "https://github.com/microsoft/eslint-plugin-sdl/blob/main/docs/rules/no-html-method.md"
};
exports.ErrorList[15] = {
	Language: "JavaScript",
	Name: "@microsoft/sdl/no inner html",
	Description:
		"Assignment to innerHTML or outerHTML properties was detected, which manipulate DOM directly without any sanitization and should be avoided. Use document.createElement() or similar methods instead.",
	//OG Description: @microsoft/sdl/no-inner-html, Assignments to innerHTML or outerHTML properties manipulate DOM directly without any sanitization and should be avoided. Use document.createElement() or similar methods instead.
	Severity: 2, //6, //?
	CWE: "https://cwe.mitre.org/data/definitions/20.html",
	MoreInfo: "https://github.com/microsoft/eslint-plugin-sdl/blob/main/docs/rules/no-inner-html.md"
};
exports.ErrorList[16] = {
	Language: "JavaScript",
	Name: "@microsoft/sdl/no insecure url",
	Description:
		"Insecure protocols such as HTTP or FTP were detected, which should be replaced by their encrypted counterparts (HTTPS, FTPS) to avoid sending potentially sensitive data over untrusted networks in plaintext.",
	//OG Description: @microsoft/sdl/no-insecure-url, Insecure protocols such as HTTP or FTP should be replaced by their encrypted counterparts (HTTPS, FTPS) to avoid sending potentially sensitive data over untrusted networks in plaintext.
	Severity: 2, //5, //?
	CWE: "https://cwe.mitre.org/data/definitions/319.html",
	MoreInfo: "https://github.com/microsoft/eslint-plugin-sdl/blob/main/docs/rules/no-insecure-url.md"
};
exports.ErrorList[17] = {
	Language: "JavaScript",
	Name: "@microsoft/sdl/no msapp exec unsafe",
	Description:
		"Call to MSApp.execUnsafeLocalFunction() was detected, which bypasses script injection validation and should be avoided.",
	//OG Description: @microsoft/sdl/no-msapp-exec-unsafe, Calls to MSApp.execUnsafeLocalFunction() bypass script injection validation and should be avoided.
	Severity: 2, //8, //?
	CWE: "https://cwe.mitre.org/data/definitions/20.html",
	MoreInfo: "https://github.com/microsoft/eslint-plugin-sdl/blob/main/docs/rules/no-msapp-exec-unsafe.md"
};
exports.ErrorList[18] = {
	Language: "JavaScript",
	Name: "@microsoft/sdl/no postmessage star origin",
	Description:
		"Use of * instead of specific target origin was detected, which should be avoided when sending data to other windows using postMessage to avoid data leakage outside of trust boundary.",
	//OG Description: @microsoft/sdl/no-postmessage-star-origin, Always provide specific target origin, not * when sending data to other windows using postMessage to avoid data leakage outside of trust boundary.
	Severity: 2, //6, //?
	CWE: "https://cwe.mitre.org/data/definitions/941.html",
	MoreInfo: "https://github.com/microsoft/eslint-plugin-sdl/blob/main/docs/rules/no-postmessage-star-origin.md"
};
exports.ErrorList[19] = {
	Language: "JavaScript",
	Name: "@microsoft/sdl/no unsafe alloc",
	Description:
		"Use of Buffer.allocUnsafe or Buffer.allocUnsafeSlow was detected. When calling Buffer.allocUnsafe and Buffer.allocUnsafeSlow, the allocated memory is not wiped-out and can contain old, potentially sensitive data.",
	//OG Description: @microsoft/sdl/no-unsafe-alloc, When calling Buffer.allocUnsafe and Buffer.allocUnsafeSlow, the allocated memory is not wiped-out and can contain old, potentially sensitive data.
	Severity: 2, //6, //?
	CWE: "https://cwe.mitre.org/data/definitions/212.html",
	MoreInfo: "https://github.com/microsoft/eslint-plugin-sdl/blob/main/docs/rules/no-unsafe-alloc.md"
};
exports.ErrorList[20] = {
	Language: "JavaScript",
	Name: "@microsoft/sdl/no winjs html unsafe",
	Description:
		"Call to WinJS.Utilities.setInnerHTMLUnsafe() or similar method was detected, which does not perform any input validation and should be avoided. Use WinJS.Utilities.setInnerHTML() instead.",
	//OG Description: @microsoft/sdl/no-winjs-html-unsafe, Calls to WinJS.Utilities.setInnerHTMLUnsafe() and similar methods do not perform any input validation and should be avoided. Use WinJS.Utilities.setInnerHTML() instead.
	Severity: 2, //7, //?
	CWE: "https://cwe.mitre.org/data/definitions/20.html",
	MoreInfo: "https://github.com/microsoft/eslint-plugin-sdl/blob/main/docs/rules/no-winjs-html-unsafe.md"
};
exports.ErrorList[21] = {
	Language: "JavaScript",
	Name: "@microsoft/sdl/react iframe missing sandbox",
	Description:
		"The sandbox attribute enables an extra set of restrictions for the content in the iframe and should always be specified.",
	//OG Description: @microsoft/sdl/react-iframe-missing-sandbox, The sandbox attribute enables an extra set of restrictions for the content in the iframe and should always be specified.
	Severity: 2, //4, //?
	CWE: "https://cwe.mitre.org/data/definitions/1021.html",
	MoreInfo: "https://github.com/microsoft/eslint-plugin-sdl/blob/main/docs/rules/react-iframe-missing-sandbox.md"
};
exports.ErrorList[22] = {
	Language: "JavaScript",
	Name: "react/no danger",
	Description: "Usage of dangerouslySetInnerHTML property in React was detected, which allows passing unsanitized HTML in DOM.",
	//OG Description: react/no-danger, Bans usage of dangerouslySetInnerHTML property in React as it allows passing unsanitized HTML in DOM.
	Severity: 2, //7, //?
	CWE: "https://cwe.mitre.org/data/definitions/20.html",
	MoreInfo: "https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-danger.md"
};
exports.ErrorList[23] = {
	Language: "JavaScript",
	Name: "no implied eval",
	Description:
		"Usage of setTimeout(), setInterval(), setImmediate(), execScript() or new Function() was detected, which may allow code execution from string arguments.",
	//OG Description: @typescript-eslint/no-implied-eval, Similar to built-in ESLint rule no-implied-eval. Bans usage of setTimeout(), setInterval(), setImmediate(), execScript() or new Function() as they are similar to eval() and allow code execution from string arguments.
	Severity: 2, //9, //?
	CWE: "https://cwe.mitre.org/data/definitions/95.html",
	MoreInfo: "https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-implied-eval.md"
};
// all severities below here are med (5) without assessment
exports.ErrorList[24] = {
	Language: "JavaScript",
	Name: "no secrets/no secrets",
	Description: "An eslint rule that searches for potential secrets/keys in code and JSON files",
	Severity: 2, 
	CWE: "https://attack.mitre.org/techniques/T1552/004/",
	MoreInfo: "https://github.com/nickdeis/eslint-plugin-no-secrets"
};
exports.ErrorList[25] = {
	Language: "JavaScript",
	Name: "xss/no mixed html",
	Description: "Checks for missing encoding when concatenating HTML strings",
	Severity: 2,
	CWE: "https://cwe.mitre.org/data/definitions/1033.html",
	MoreInfo: "https://github.com/Rantanen/eslint-plugin-xss/blob/master/docs/rules/no-mixed-html.md"
};
exports.ErrorList[26] = {
	Language: "JavaScript",
	Name: "xss/no location href assign",
	Description: "This rule ensures that you are calling escape logic before assigning to location.href property",
	Severity: 2,
	CWE: "https://cwe.mitre.org/data/definitions/1033.html",
	MoreInfo: "https://github.com/Rantanen/eslint-plugin-xss/blob/master/docs/rules/no-location-href-assign.md"
};
exports.ErrorList[27] = {
	Language: "JavaScript",
	Name: "security/detect bidi characters",
	Description: "Detects trojan source attacks that employ unicode bidi attacks to inject malicious code",
	Severity: 2,
	CWE: "https://cwe.mitre.org/data/definitions/507.html",
	// eslint-disable-next-line no-secrets/no-secrets
	MoreInfo: "https://github.com/eslint-community/eslint-plugin-security/blob/0c9c1defce36d4baa904012b80a57be4cebfd13b/docs/rules/detect-bidi-characters.md"
};
exports.ErrorList[28] = {
	Language: "JavaScript",
	Name: "security/detect buffer noassert",
	Description: "Detects calls to buffer with noAssert flag set",
	Severity: 2,
	CWE: "https://cwe.mitre.org/data/definitions/726.html",
	// eslint-disable-next-line no-secrets/no-secrets
	MoreInfo: "https://github.com/eslint-community/eslint-plugin-security/blob/0c9c1defce36d4baa904012b80a57be4cebfd13b/docs/rules/detect-buffer-noassert.md"
};
exports.ErrorList[29] = {
	Language: "JavaScript",
	Name: "security/detect child process",
	Description: "Detects instances of child_process & non-literal exec() calls",
	Severity: 2,
	CWE: "https://cwe.mitre.org/data/definitions/78.html",
	MoreInfo: "https://github.com/eslint-community/eslint-plugin-security"
};
exports.ErrorList[30] = {
	Language: "JavaScript",
	Name: "security/detect disable mustache escape",
	Description: "Detects object.escapeMarkup = false, which can be used with some template engines to disable escaping of HTML entities",
	Severity: 2,
	CWE: "https://cwe.mitre.org/data/definitions/1033.html",
	MoreInfo: "https://owasp.org/www-community/attacks/xss/"
};
exports.ErrorList[31] = {
	Language: "JavaScript",
	Name: "security/detect new buffer",
	Description: "Detects instances of new Buffer(argument) where argument is any non-literal value",
	Severity: 2,
	CWE: "https://cwe.mitre.org/data/definitions/726.html",
	MoreInfo: "https://github.com/eslint-community/eslint-plugin-security"
};
exports.ErrorList[32] = {
	Language: "JavaScript",
	Name: "security/detect no csrf before method override",
	Description: "Detects Express csrf middleware setup before method-override middleware",
	Severity: 2,
	CWE: "https://cwe.mitre.org/data/definitions/352.html",
	MoreInfo: "https://github.com/eslint-community/eslint-plugin-security/blob/main/docs/bypass-connect-csrf-protection-by-abusing.md"
};
exports.ErrorList[33] = {
	Language: "JavaScript",
	Name: "security/detect non literal fs filename",
	Description: "Detects variable in filename argument of fs calls, which might allow an attacker to access anything on your system",
	Severity: 2,
	CWE: "https://cwe.mitre.org/data/definitions/35.html",
	MoreInfo: "https://owasp.org/www-community/attacks/Path_Traversal"
};
exports.ErrorList[34] = {
	Language: "JavaScript",
	Name: "security/detect non literal regexp",
	Description: "Detects RegExp(variable), which might allow an attacker to DOS your server with a long-running regular expression",
	Severity: 2,
	CWE: "https://cwe.mitre.org/data/definitions/1333.html",
	MoreInfo: "https://github.com/eslint-community/eslint-plugin-security/blob/main/docs/regular-expression-dos-and-node.md"
};
exports.ErrorList[35] = {
	Language: "JavaScript",
	Name: "security/detect non literal require",
	Description: "Detects require(variable), which might allow an attacker to load and run arbitrary code, or access arbitrary files on disk",
	Severity: 2,
	CWE: "https://cwe.mitre.org/data/definitions/23.html",
	MoreInfo: "https://www.bennadel.com/blog/2169-where-does-node-js-and-require-look-for-modules.htm"
};
exports.ErrorList[36] = {
	Language: "JavaScript",
	Name: "security/detect object injection",
	Description: "Detects variable[key] as a left- or right-hand assignment operand",
	Severity: 2,
	CWE: "https://cwe.mitre.org/data/definitions/20.html",
	MoreInfo: "https://github.com/eslint-community/eslint-plugin-security/blob/main/docs/the-dangers-of-square-bracket-notation.md"
};
exports.ErrorList[37] = {
	Language: "JavaScript",
	Name: "security/detect possible timing attacks",
	Description: "Detects insecure comparisons (==, !=, !== and ===), which check input sequentially",
	Severity: 2,
	CWE: "https://cwe.mitre.org/data/definitions/1254.html",
	MoreInfo: "https://github.com/eslint-community/eslint-plugin-security"
};
exports.ErrorList[38] = {
	Language: "JavaScript",
	Name: "security/detect pseudoRandomBytes",
	Description: "Detects if pseudoRandomBytes() is in use, which might not give you the randomness you need and expect",
	Severity: 2,
	CWE: "https://cwe.mitre.org/data/definitions/338.html",
	MoreInfo: "https://github.com/eslint-community/eslint-plugin-security"
};
exports.ErrorList[39] = {
	Language: "JavaScript",
	Name: "security/detect unsafe regex",
	Description: "Detects potentially unsafe regular expressions, which may take a very long time to run, blocking the event loop",
	Severity: 2,
	CWE: "https://cwe.mitre.org/data/definitions/1333.html",
	MoreInfo: "https://github.com/eslint-community/eslint-plugin-security/blob/main/docs/regular-expression-dos-and-node.md"
};
exports.ErrorList[40] = {
	Language: "JavaScript",
	Name: "security node/detect absence of name option in exrpress session",
	Description: "Use name instead of seesionID in express session to delay attacker reconnaissance efforts",
	Severity: 1,
	CWE: null,
	MoreInfo: "https://github.com/gkouziik/eslint-plugin-security-node/blob/master/docs/rules/detect-absence-of-name-option-in-exrpress-session.md"
};
exports.ErrorList[41] = {
	Language: "JavaScript",
	Name: "security node/detect buffer unsafe allocation",
	Description: "Use of Buffer.allocUnsafe()",
	Severity: 2,
	CWE: "https://cwe.mitre.org/data/definitions/131.html",
	MoreInfo: "https://github.com/gkouziik/eslint-plugin-security-node/blob/master/docs/rules/detect-buffer-unsafe-allocation.md"
};
exports.ErrorList[42] = {
	Language: "JavaScript",
	Name: "security node/detect crlf",
	Description: "Detects code vulnerable to 'Carriage Line Return Feed' (clrf) attacks aka log injection",
	Severity: 2,
	CWE: "https://cwe.mitre.org/data/definitions/117.html",
	MoreInfo: "https://github.com/gkouziik/eslint-plugin-security-node/blob/master/docs/rules/detect-crlf.md"
};
exports.ErrorList[43] = {
	Language: "JavaScript",
	Name: "security node/detect dangerous redirects",
	Description: "Web app accepts unvalidated input that could cause the web app to redirect the request to a URL contained within the input",
	Severity: 2,
	CWE: "https://cwe.mitre.org/data/definitions/601.html",
	MoreInfo: "https://github.com/gkouziik/eslint-plugin-security-node/blob/master/docs/rules/detect-dangerous-redirects.md"
};
exports.ErrorList[44] = {
	Language: "JavaScript",
	Name: "security node/detect nosql injection",
	Description: "Use of $where operator allows attacker to pass in a string that will be evaluated inside server",
	Severity: 2,
	CWE: "https://capec.mitre.org/data/definitions/676.html",
	MoreInfo: "https://github.com/gkouziik/eslint-plugin-security-node/blob/master/docs/rules/detect-nosql-injection.md"
};
exports.ErrorList[45] = {
	Language: "JavaScript",
	Name: "security node/detect option multiplestatements in mysql",
	Description: "Option mulitpleStatements:true in createConnection method of mysql is used",
	Severity: 2,
	CWE: null,
	MoreInfo: "https://github.com/gkouziik/eslint-plugin-security-node/blob/master/docs/rules/detect-option-multiplestatements-in-mysql.md"
};
exports.ErrorList[46] = {
	Language: "JavaScript",
	Name: "security node/detect security missconfiguration cookie",
	Description: "Server is misconfigured to leak internal implementation details via cookie names or HTTP response headers",
	Severity: 2,
	CWE: "https://cwe.mitre.org/data/definitions/16.html",
	MoreInfo: "https://github.com/gkouziik/eslint-plugin-security-node/blob/master/docs/rules/detect-security-missconfiguration-cookie.md"
};
exports.ErrorList[47] = {
	Language: "JavaScript",
	Name: "security node/detect sql injection",
	Description: "Detects Dynamic database queries that include user-supplied inputs",
	Severity: 2,
	CWE: "https://cwe.mitre.org/data/definitions/89.html",
	MoreInfo: "https://github.com/gkouziik/eslint-plugin-security-node/blob/master/docs/rules/detect-sql-injection.md"
};
exports.ErrorList[48] = {
	Language: "JavaScript",
	Name: "security node/disable ssl across node server",
	Description: "Checks for process.env.NODE_TLS_REJECT_UNAUTHORIZED='0' which disables ssl across node server",
	Severity: 2,
	CWE: "https://cwe.mitre.org/data/definitions/295.html",
	MoreInfo: "https://github.com/gkouziik/eslint-plugin-security-node/blob/master/docs/rules/disable-ssl-across-node-server.md"
};
exports.ErrorList[49] = {
	Language: "JavaScript",
	Name: "security node/detect improper exception handling",
	Description: "Improper exception handling can release details like stack traces",
	Severity: 1,
	CWE: "https://cwe.mitre.org/data/definitions/703.html",
	MoreInfo: "https://github.com/gkouziik/eslint-plugin-security-node/blob/master/docs/rules/detect-improper-exception-handling.md"
};
exports.ErrorList[50] = {
	Language: "JavaScript",
	Name: "security node/detect unhandled async errors",
	Description: "Code does not contain try-catch or error handling function for async errors",
	Severity: 1,
	CWE: "https://cwe.mitre.org/data/definitions/703.html",
	MoreInfo: "https://github.com/gkouziik/eslint-plugin-security-node/blob/master/docs/rules/detect-unhandled-async-errors.md"
};
exports.ErrorList[51] = {
	Language: "JavaScript",
	Name: "security node/detect unhandled event errors",
	Description: "Code does not contain and error event listener",
	Severity: 1,
	CWE: "https://cwe.mitre.org/data/definitions/703.html",
	MoreInfo: "https://github.com/gkouziik/eslint-plugin-security-node/blob/master/docs/rules/detect-unhandled-event-errors.md"
};


//TO-DO: add all python errors
// exports.ErrorList[101] = {
// 	Language: "Python",
// 	Name: "",
// 	Description:
// 		"",
// 	//OG Description: @typescript-eslint/no-implied-eval, Similar to built-in ESLint rule no-implied-eval. Bans usage of setTimeout(), setInterval(), setImmediate(), execScript() or new Function() as they are similar to eval() and allow code execution from string arguments.
// 	Severity: 9, //?
// };
//If it returns -1 then it is a normal ESLINT Error and not a Security Error
exports.convertRuleIDToErrorType = (ErrorID) => {
	if (!ErrorID) {
		return -1;
	}
	for (const [key, value] of Object.entries(exports.ErrorList)) {
		if ("" + value["Name"] == ErrorID.replaceAll("-", " ")) {
			return key;
		}
	}
	return -1;
};

exports.ReturnErrorTypeInformation = (ErrorID) => {
	return exports.ErrorList[ErrorID];
	//return JSON.stringify({"Name" : ErrorList[1].Name});
};

exports.getErrorTypesNum = () =>
{
	
	return Object.keys(exports.ErrorList).length;
}
