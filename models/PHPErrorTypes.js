exports.PHPErrorList = {};
exports.PHPErrorList[-1] = {
	Name: "Error",
	Description: "This Error is not a Security error.",
	Severity: 0,
	CWE: null,
	MoreInfo: null
};
exports.PHPErrorList[0] = {
	Language: "PHP",
	Name: "TaintedSql",
	Description:
		"Emitted when user-controlled input can be passed into to a SQL command.",
	Severity: 2,
	CWE: null,
	MoreInfo: "https://psalm.dev/docs/running_psalm/issues/TaintedSql/"
};
exports.PHPErrorList[1] = {
	Language: "PHP",
	Name: "TaintedLdap",
	Description:
		"Potential LDAP injection. This rule is emitted when user-controlled input can be passed into an LDAP request.",
	Severity: 2,
	CWE: null,
	MoreInfo: "https://psalm.dev/docs/running_psalm/issues/TaintedLdap/"
};
exports.PHPErrorList[2] = {
	Language: "PHP",
	Name: "TaintedHtml",
	Description:
		"Emitted when user-controlled input that can contain HTML can be passed into to an echo statement.",
	Severity: 2,
	CWE: null,
	MoreInfo: "https://psalm.dev/docs/running_psalm/issues/TaintedHtml/"
};
exports.PHPErrorList[3] = {
	Language: "PHP",
	Name: "TaintedInclude",
	Description:
		"Emitted when user-controlled input can be passed into to an include or require expression.",
	Severity: 2,
	CWE: null,
	MoreInfo: "https://psalm.dev/docs/running_psalm/issues/TaintedInclude/"
};
exports.PHPErrorList[4] = {
	Language: "PHP",
	Name: "TaintedShell",
	Description:
		"Emitted when user-controlled input can be passed into to an exec call or similar.",
	Severity: 2,
	CWE: null,
	MoreInfo: "https://psalm.dev/docs/running_psalm/issues/TaintedShell/"
};
exports.PHPErrorList[5] = {
	Language: "PHP",
	Name: "TaintedCallable",
	Description:
		"Emitted when tainted text is used in an arbitrary function call.",
	Severity: 2,
	CWE: null,
	MoreInfo: "https://psalm.dev/docs/running_psalm/issues/TaintedCallable/"
};
exports.PHPErrorList[6] = {
	Language: "PHP",
	Name: "TaintedUnserialize",
	Description:
		"Tainted input detected to an unserialize call.",
	Severity: 2,
	CWE: null,
	MoreInfo: "https://psalm.dev/docs/running_psalm/issues/TaintedUnserialize/"
};
exports.PHPErrorList[7] = {
	Language: "PHP",
	Name: "TaintedInput",
	Description:
		"Emitted when tainted input detection is turned on",
	Severity: 2,
	CWE: null,
	MoreInfo: "https://psalm.dev/docs/running_psalm/issues/TaintedInput/"
};
exports.PHPErrorList[8] = {
	Language: "PHP",
	Name: "TaintedEval",
	Description:
		"Emitted when user-controlled input can be passed into to an eval call.",
	Severity: 2,
	CWE: null,
	MoreInfo: "https://psalm.dev/docs/running_psalm/issues/TaintedEval/"
};
exports.PHPErrorList[9] = {
	Language: "PHP",
	Name: "TaintedSSRF",
	Description:
		"Potential Server-Side Request Forgery vulnerability. This rule is emitted when user-controlled input can be passed into a network request.",
	Severity: 2,
	CWE: null,
	MoreInfo: "https://psalm.dev/docs/running_psalm/issues/TaintedSSRF/"
};
exports.PHPErrorList[10] = {
	Language: "PHP",
	Name: "TaintedFile",
	Description:
		"This rule is emitted when user-controlled input can be passed into a sensitive file operation.",
	Severity: 2,
	CWE: null,
	MoreInfo: "https://psalm.dev/docs/running_psalm/issues/TaintedFile/"
};
exports.PHPErrorList[11] = {
	Language: "PHP",
	Name: "TaintedCookie",
	Description:
		"Potential cookie injection. This rule is emitted when user-controlled input can be passed into a cookie.",
	Severity: 2,
	CWE: null,
	MoreInfo: "https://psalm.dev/docs/running_psalm/issues/TaintedCookie/"
};
exports.PHPErrorList[12] = {
	Language: "PHP",
	Name: "TaintedHeader",
	Description:
		"Potential header injection. This rule is emitted when user-controlled input can be passed into a HTTP header.",
	Severity: 2,
	CWE: null,
	MoreInfo: "https://psalm.dev/docs/running_psalm/issues/TaintedHeader/"
};
exports.PHPErrorList[13] = {
	Language: "PHP",
	Name: "TaintedUserSecret",
	Description:
		"Emitted when tainted input detection is turned on and data marked as a user secret is detected somewhere it shouldn’t be.",
	Severity: 2,
	CWE: null,
	MoreInfo: "https://psalm.dev/docs/running_psalm/issues/TaintedUserSecret/"
};
exports.PHPErrorList[14] = {
	Language: "PHP",
	Name: "TaintedSystemSecret",
	Description:
		"Emitted when data marked as a system secret is detected somewhere it shouldn’t be.",
	Severity: 2,
	CWE: null,
	MoreInfo: "https://psalm.dev/docs/running_psalm/issues/TaintedSystemSecret/"
};
exports.PHPErrorList[12] = {
	Language: "PHP",
	Name: "argument_injection",
	Description:
		"The product constructs a string for a command to executed by a separate component in another control sphere, but it does not properly delimit the intended arguments, options, or switches within that command string.",
	Severity: 2,
	CWE: "https://cwe.mitre.org/data/definitions/88.html",
	MoreInfo: null
};
exports.PHPErrorList[16] = {
	Language: "PHP",
	Name: "eval_injection",
	Description:
		"The product receives input from an upstream component, but it does not neutralize or incorrectly neutralizes code syntax before using the input in a dynamic evaluation call",
	Severity: 2,
	CWE: "https://cwe.mitre.org/data/definitions/95.html",
	MoreInfo: null
};
exports.PHPErrorList[17] = {
	Language: "PHP",
	Name: "static_code_injection",
	Description:
		"The product receives input from an upstream component, but it does not neutralize or incorrectly neutralizes code syntax before inserting the input into an executable resource, such as a library, configuration file, or template.",
	Severity: 2,
	CWE: "https://cwe.mitre.org/data/definitions/96.html",
	MoreInfo: null
};
exports.PHPErrorList[18] = {
	Language: "PHP",
	Name: "PHP_remote_file_inclusion",
	Description:
		"The PHP application receives input from an upstream component, but it does not restrict or incorrectly restricts the input before its usage in require, include, or similar functions.",
	Severity: 2,
	CWE: "https://cwe.mitre.org/data/definitions/98.html",
	MoreInfo: null
};
exports.PHPErrorList[19] = {
	Language: "PHP",
	Name: "sensitive_information",
	Description:
		"The product generates an error message that includes sensitive information about its environment, users, or associated data.",
	Severity: 2,
	CWE: "https://cwe.mitre.org/data/definitions/209.html",
	MoreInfo: null
};
exports.PHPErrorList[20] = {
	Language: "PHP",
	Name: "dangerous_type",
	Description:
		"The product allows the attacker to upload or transfer files of dangerous types that can be automatically processed within the product's environment.",
	Severity: 2,
	CWE: "https://cwe.mitre.org/data/definitions/434.html",
	MoreInfo: null
};
exports.PHPErrorList[21] = {
	Language: "PHP",
	Name: "variable_initialization",
	Description:
		"The product, by default, initializes an internal variable with an insecure or less secure value than is possible.",
	Severity: 2,
	CWE: "https://cwe.mitre.org/data/definitions/453.html",
	MoreInfo: null
};
exports.PHPErrorList[22] = {
	Language: "PHP",
	Name: "trusted_variables",
	Description:
		"The product initializes critical internal variables or data stores using inputs that can be modified by untrusted actors.",
	Severity: 2,
	CWE: "https://cwe.mitre.org/data/definitions/454.html",
	MoreInfo: null
};
exports.PHPErrorList[23] = {
	Language: "PHP",
	Name: "uninitialized_variable",
	Description:
		"The code uses a variable that has not been initialized, leading to unpredictable or unintended results.",
	Severity: 2,
	CWE: "https://cwe.mitre.org/data/definitions/457.html",
	MoreInfo: null
};
exports.PHPErrorList[24] = {
	Language: "PHP",
	Name: "unsafe_reflection",
	Description:
		"The product uses external input with reflection to select which classes or code to use, but it does not sufficiently prevent the input from selecting improper classes or code.",
	Severity: 2,
	CWE: "https://cwe.mitre.org/data/definitions/470.html",
	MoreInfo: null
};
exports.PHPErrorList[25] = {
	Language: "PHP",
	Name: "variable_modification",
	Description:
		"A PHP application does not properly protect against the modification of variables from external sources, such as query parameters or cookies. This can expose the application to numerous weaknesses that would not exist otherwise.",
	Severity: 2,
	CWE: "https://cwe.mitre.org/data/definitions/473.html",
	MoreInfo: null
};
exports.PHPErrorList[26] = {
	Language: "PHP",
	Name: "inconsistent_implementations",
	Description:
		"The code uses a function that has inconsistent implementations across operating systems and versions.",
	Severity: 2,
	CWE: "https://cwe.mitre.org/data/definitions/474.html",
	MoreInfo: null
};
exports.PHPErrorList[27] = {
	Language: "PHP",
	Name: "omitted_break",
	Description:
		"The product omits a break statement within a switch or similar construct, causing code associated with multiple conditions to execute. This can cause problems when the programmer only intended to execute code associated with one condition.",
	Severity: 2,
	CWE: "https://cwe.mitre.org/data/definitions/484.html",
	MoreInfo: null
};
exports.PHPErrorList[28] = {
	Language: "PHP",
	Name: "untrusted_data",
	Description:
		"The product deserializes untrusted data without sufficiently verifying that the resulting data will be valid.",
	Severity: 2,
	CWE: "https://cwe.mitre.org/data/definitions/502.html",
	MoreInfo: null
};
exports.PHPErrorList[29] = {
	Language: "PHP",
	Name: "object_references",
	Description:
		"The product compares object references instead of the contents of the objects themselves, preventing it from detecting equivalent objects.",
	Severity: 2,
	CWE: "https://cwe.mitre.org/data/definitions/595.html",
	MoreInfo: null
};
exports.PHPErrorList[30] = {
	Language: "PHP",
	Name: "incomplete_identification",
	Description:
		"The PHP application uses an old method for processing uploaded files by referencing the four global variables that are set for each file (e.g. $varname, $varname_size, $varname_name, $varname_type). These variables could be overwritten by attackers, causing the application to process unauthorized files.",
	Severity: 2,
	CWE: "https://cwe.mitre.org/data/definitions/616.html",
	MoreInfo: null
};
exports.PHPErrorList[31] = {
	Language: "PHP",
	Name: "extraction_error",
	Description:
		"The product uses external input to determine the names of variables into which information is extracted, without verifying that the names of the specified variables are valid. This could cause the program to overwrite unintended variables.",
	Severity: 2,
	CWE: "https://cwe.mitre.org/data/definitions/621.html",
	MoreInfo: null
};
exports.PHPErrorList[32] = {
	Language: "PHP",
	Name: "expression_error",
	Description:
		"The product uses a regular expression that either (1) contains an executable component with user-controlled inputs, or (2) allows a user to enable execution by inserting pattern modifiers.",
	Severity: 2,
	CWE: "https://cwe.mitre.org/data/definitions/624.html",
	MoreInfo: null
};
exports.PHPErrorList[33] = {
	Language: "PHP",
	Name: "regular_expression",
	Description:
		"The product uses a regular expression that does not sufficiently restrict the set of allowed values.",
	Severity: 2,
	CWE: "https://cwe.mitre.org/data/definitions/625.html",
	MoreInfo: null
};
exports.PHPErrorList[34] = {
	Language: "PHP",
	Name: "poison_null_byte",
	Description:
		"The product does not properly handle null bytes or NUL characters when passing data between different representations or components.",
	Severity: 2,
	CWE: "https://cwe.mitre.org/data/definitions/626.html",
	MoreInfo: null
};
exports.PHPErrorList[35] = {
	Language: "PHP",
	Name: "dynamic_variable_evaluation",
	Description:
		"In a language where the user can influence the name of a variable at runtime, if the variable names are not controlled, an attacker can read or write to arbitrary variables, or access arbitrary functions.",
	Severity: 2,
	CWE: "https://cwe.mitre.org/data/definitions/627.html",
	MoreInfo: null
};
exports.PHPErrorList[36] = {
	Language: "PHP",
	Name: "improper_modification",
	Description:
		"The product receives input from an upstream component that specifies multiple attributes, properties, or fields that are to be initialized or updated in an object, but it does not properly control which attributes can be modified.",
	Severity: 2,
	CWE: "https://cwe.mitre.org/data/definitions/915.html",
	MoreInfo: null
};
exports.PHPErrorList[37] = {
	Language: "PHP",
	Name: "incompatible_types",
	Description:
		"The product performs a comparison between two entities, but the entities are of different, incompatible types that cannot be guaranteed to provide correct results when they are directly compared.",
	Severity: 2,
	CWE: "https://cwe.mitre.org/data/definitions/1024.html",
	MoreInfo: null
};
exports.PHPErrorList[38] = {
	Language: "PHP",
	Name: "improper_neutralization",
	Description:
		"The product uses a template engine to insert or process externally-influenced input, but it does not neutralize or incorrectly neutralizes special elements or syntax that can be interpreted as template expressions or other code directives when processed by the engine.",
	Severity: 2,
	CWE: "https://cwe.mitre.org/data/definitions/1336.html",
	MoreInfo: null
};
exports.PHPErrorList[39] = {
	Language: "PHP",
	Name: "UndefinedFunction",
	Description:
		"Emitted when referencing a function that doesn't exist",
	Severity: 1,
	CWE: null,
	MoreInfo: "https://psalm.dev/docs/running_psalm/issues/UndefinedFunction/"
};
exports.PHPErrorList[40] = {
	Language: "PHP",
	Name: "MissingFile",
	Description:
		"Emitted when using include or require on a file that does not exist",
	Severity: 1,
	CWE: null,
	MoreInfo: "https://psalm.dev/docs/running_psalm/issues/MissingFile/"
};
exports.PHPErrorList[41] = {
	Language: "PHP",
	Name: "PossiblyInvalidArgument",
	Description:
		"Emitted when a supplied function/method argument is incompatible with the method signature or docblock one.",
	Severity: 0,
	CWE: null,
	MoreInfo: "https://psalm.dev/docs/running_psalm/issues/PossiblyInvalidArgument/"
};


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

exports.ReturnPHPErrorTypeInformation = (ErrorID) => {
	return exports.PHPErrorList[ErrorID];
	//return JSON.stringify({"Name" : ErrorList[1].Name});
};

exports.getPHPErrorIDs = () =>
{
	return Object.keys(exports.PHPErrorList).length;
}