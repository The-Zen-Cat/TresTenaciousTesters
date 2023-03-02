exports.PHPErrorList = {};
exports.PHPErrorList[-1] = {
	Name: "Error",
	Description: "This Error is not a Security error.",
	Severity: 0,
	CWE: null,
	MoreInfo: null
};
exports.PHPErrorList[1001] = {
	Language: "PHP",
	Name: "sql",
	Description:
		"used for strings that could contain SQL",
	Severity: 5,
	MoreInfo: "https://psalm.dev/docs/security_analysis/#taint-types"
};
exports.PHPErrorList[1002] = {
	Language: "PHP",
	Name: "ldap",
	Description:
		"used for strings that could contain a ldap DN or filter",
	Severity: 5,
	MoreInfo: "https://psalm.dev/docs/security_analysis/#taint-types"
};
exports.PHPErrorList[1003] = {
	Language: "PHP",
	Name: "html",
	Description:
		"used for strings that could contain angle brackets or unquoted strings",
	Severity: 5,
	MoreInfo: "https://psalm.dev/docs/security_analysis/#taint-types"
};
exports.PHPErrorList[1004] = {
	Language: "PHP",
	Name: "has_quotes",
	Description:
		"used for strings that could contain unquoted strings",
	Severity: 5,
	MoreInfo: "https://psalm.dev/docs/security_analysis/#taint-types"
};
exports.PHPErrorList[1005] = {
	Language: "PHP",
	Name: "shell",
	Description:
		"used for strings that could contain shell commands",
	Severity: 5,
	MoreInfo: "https://psalm.dev/docs/security_analysis/#taint-types"
};
exports.PHPErrorList[1006] = {
	Language: "PHP",
	Name: "callable",
	Description:
		"used for callable strings that could be user-controlled",
	Severity: 5,
	MoreInfo: "https://psalm.dev/docs/security_analysis/#taint-types"
};
exports.PHPErrorList[1007] = {
	Language: "PHP",
	Name: "unserialize",
	Description:
		"used for strings that could contain a serialized string",
	Severity: 5,
	MoreInfo: "https://psalm.dev/docs/security_analysis/#taint-types"
};
exports.PHPErrorList[1008] = {
	Language: "PHP",
	Name: "include",
	Description:
		"used for strings that could contain a path being included",
	Severity: 5,
	MoreInfo: "https://psalm.dev/docs/security_analysis/#taint-types"
};
exports.PHPErrorList[1009] = {
	Language: "PHP",
	Name: "eval",
	Description:
		"used for strings that could contain code",
	Severity: 5,
	MoreInfo: "https://psalm.dev/docs/security_analysis/#taint-types"
};
exports.PHPErrorList[1010] = {
	Language: "PHP",
	Name: "ssrf",
	Description:
		"used for strings that could contain text passed to Curl or similar",
	Severity: 5,
	MoreInfo: "https://psalm.dev/docs/security_analysis/#taint-types"
};
exports.PHPErrorList[1011] = {
	Language: "PHP",
	Name: "file",
	Description:
		"used for strings that could contain a path",
	Severity: 5,
	MoreInfo: "https://psalm.dev/docs/security_analysis/#taint-types"
};
exports.PHPErrorList[1012] = {
	Language: "PHP",
	Name: "cookie",
	Description:
		"used for strings that could contain a http cookie",
	Severity: 5,
	MoreInfo: "https://psalm.dev/docs/security_analysis/#taint-types"
};
exports.PHPErrorList[1013] = {
	Language: "PHP",
	Name: "header",
	Description:
		"used for strings that could contain a http header",
	Severity: 5,
	MoreInfo: "https://psalm.dev/docs/security_analysis/#taint-types"
};
exports.PHPErrorList[1014] = {
	Language: "PHP",
	Name: "user_secret",
	Description:
		"used for strings that could contain user-supplied secrets",
	Severity: 5,
	MoreInfo: "https://psalm.dev/docs/security_analysis/#taint-types"
};
exports.PHPErrorList[1015] = {
	Language: "PHP",
	Name: "system_secret",
	Description:
		"used for strings that could contain system secrets",
	Severity: 5,
	MoreInfo: "https://psalm.dev/docs/security_analysis/#taint-types"
};
exports.PHPErrorList[2001] = {
	Language: "PHP",
	Name: "argument_injection",
	Description:
		"The product constructs a string for a command to executed by a separate component in another control sphere, but it does not properly delimit the intended arguments, options, or switches within that command string.",
	Severity: 5,
	CWE: "https://cwe.mitre.org/data/definitions/88.html"
};
exports.PHPErrorList[2002] = {
	Language: "PHP",
	Name: "eval_injection",
	Description:
		"The product receives input from an upstream component, but it does not neutralize or incorrectly neutralizes code syntax before using the input in a dynamic evaluation call",
	Severity: 5,
	CWE: "https://cwe.mitre.org/data/definitions/95.html"
};
exports.PHPErrorList[2003] = {
	Language: "PHP",
	Name: "static_code_injection",
	Description:
		"The product receives input from an upstream component, but it does not neutralize or incorrectly neutralizes code syntax before inserting the input into an executable resource, such as a library, configuration file, or template.",
	Severity: 5,
	CWE: "https://cwe.mitre.org/data/definitions/96.html"
};
exports.PHPErrorList[2004] = {
	Language: "PHP",
	Name: "PHP_remote_file_inclusion",
	Description:
		"The PHP application receives input from an upstream component, but it does not restrict or incorrectly restricts the input before its usage in require, include, or similar functions.",
	Severity: 5,
	CWE: "https://cwe.mitre.org/data/definitions/98.html"
};
exports.PHPErrorList[2005] = {
	Language: "PHP",
	Name: "sensitive_information",
	Description:
		"The product generates an error message that includes sensitive information about its environment, users, or associated data.",
	Severity: 5,
	CWE: "https://cwe.mitre.org/data/definitions/209.html"
};
exports.PHPErrorList[2006] = {
	Language: "PHP",
	Name: "dangerous_type",
	Description:
		"The product allows the attacker to upload or transfer files of dangerous types that can be automatically processed within the product's environment.",
	Severity: 5,
	CWE: "https://cwe.mitre.org/data/definitions/434.html"
};
exports.PHPErrorList[2007] = {
	Language: "PHP",
	Name: "variable_initialization",
	Description:
		"The product, by default, initializes an internal variable with an insecure or less secure value than is possible.",
	Severity: 5,
	CWE: "https://cwe.mitre.org/data/definitions/453.html"
};
exports.PHPErrorList[2008] = {
	Language: "PHP",
	Name: "trusted_variables",
	Description:
		"The product initializes critical internal variables or data stores using inputs that can be modified by untrusted actors.",
	Severity: 5,
	CWE: "https://cwe.mitre.org/data/definitions/454.html"
};
exports.PHPErrorList[2009] = {
	Language: "PHP",
	Name: "uninitialized_variable",
	Description:
		"The code uses a variable that has not been initialized, leading to unpredictable or unintended results.",
	Severity: 5,
	CWE: "https://cwe.mitre.org/data/definitions/457.html"
};
exports.PHPErrorList[2010] = {
	Language: "PHP",
	Name: "unsafe_reflection",
	Description:
		"The product uses external input with reflection to select which classes or code to use, but it does not sufficiently prevent the input from selecting improper classes or code.",
	Severity: 5,
	CWE: "https://cwe.mitre.org/data/definitions/470.html"
};
exports.PHPErrorList[2011] = {
	Language: "PHP",
	Name: "variable_modification",
	Description:
		"A PHP application does not properly protect against the modification of variables from external sources, such as query parameters or cookies. This can expose the application to numerous weaknesses that would not exist otherwise.",
	Severity: 5,
	CWE: "https://cwe.mitre.org/data/definitions/473.html"
};
exports.PHPErrorList[2012] = {
	Language: "PHP",
	Name: "inconsistent_implementations",
	Description:
		"The code uses a function that has inconsistent implementations across operating systems and versions.",
	Severity: 5,
	CWE: "https://cwe.mitre.org/data/definitions/474.html"
};
exports.PHPErrorList[2013] = {
	Language: "PHP",
	Name: "omitted_break",
	Description:
		"The product omits a break statement within a switch or similar construct, causing code associated with multiple conditions to execute. This can cause problems when the programmer only intended to execute code associated with one condition.",
	Severity: 5,
	CWE: "https://cwe.mitre.org/data/definitions/484.html"
};
exports.PHPErrorList[2014] = {
	Language: "PHP",
	Name: "untrusted_data",
	Description:
		"The product deserializes untrusted data without sufficiently verifying that the resulting data will be valid.",
	Severity: 5,
	CWE: "https://cwe.mitre.org/data/definitions/502.html"
};
exports.PHPErrorList[2015] = {
	Language: "PHP",
	Name: "object_references",
	Description:
		"The product compares object references instead of the contents of the objects themselves, preventing it from detecting equivalent objects.",
	Severity: 5,
	CWE: "https://cwe.mitre.org/data/definitions/595.html"
};
exports.PHPErrorList[2016] = {
	Language: "PHP",
	Name: "incomplete_identification",
	Description:
		"The PHP application uses an old method for processing uploaded files by referencing the four global variables that are set for each file (e.g. $varname, $varname_size, $varname_name, $varname_type). These variables could be overwritten by attackers, causing the application to process unauthorized files.",
	Severity: 5,
	CWE: "https://cwe.mitre.org/data/definitions/616.html"
};
exports.PHPErrorList[2017] = {
	Language: "PHP",
	Name: "extraction_error",
	Description:
		"The product uses external input to determine the names of variables into which information is extracted, without verifying that the names of the specified variables are valid. This could cause the program to overwrite unintended variables.",
	Severity: 5,
	CWE: "https://cwe.mitre.org/data/definitions/621.html"
};
exports.PHPErrorList[2018] = {
	Language: "PHP",
	Name: "expression_error",
	Description:
		"The product uses a regular expression that either (1) contains an executable component with user-controlled inputs, or (2) allows a user to enable execution by inserting pattern modifiers.",
	Severity: 5,
	CWE: "https://cwe.mitre.org/data/definitions/624.html"
};
exports.PHPErrorList[2019] = {
	Language: "PHP",
	Name: "regular_expression",
	Description:
		"The product uses a regular expression that does not sufficiently restrict the set of allowed values.",
	Severity: 5,
	CWE: "https://cwe.mitre.org/data/definitions/625.html"
};
exports.PHPErrorList[2020] = {
	Language: "PHP",
	Name: "poison_null_byte",
	Description:
		"The product does not properly handle null bytes or NUL characters when passing data between different representations or components.",
	Severity: 5,
	CWE: "https://cwe.mitre.org/data/definitions/626.html"
};
exports.PHPErrorList[2021] = {
	Language: "PHP",
	Name: "dynamic_variable_evaluation",
	Description:
		"In a language where the user can influence the name of a variable at runtime, if the variable names are not controlled, an attacker can read or write to arbitrary variables, or access arbitrary functions.",
	Severity: 5,
	CWE: "https://cwe.mitre.org/data/definitions/627.html"
};
exports.PHPErrorList[2022] = {
	Language: "PHP",
	Name: "improper_modification",
	Description:
		"The product receives input from an upstream component that specifies multiple attributes, properties, or fields that are to be initialized or updated in an object, but it does not properly control which attributes can be modified.",
	Severity: 5,
	CWE: "https://cwe.mitre.org/data/definitions/915.html"
};
exports.PHPErrorList[2023] = {
	Language: "PHP",
	Name: "incompatible_types",
	Description:
		"The product performs a comparison between two entities, but the entities are of different, incompatible types that cannot be guaranteed to provide correct results when they are directly compared.",
	Severity: 5,
	CWE: "https://cwe.mitre.org/data/definitions/1024.html"
};
exports.PHPErrorList[2024] = {
	Language: "PHP",
	Name: "improper_neutralization",
	Description:
		"The product uses a template engine to insert or process externally-influenced input, but it does not neutralize or incorrectly neutralizes special elements or syntax that can be interpreted as template expressions or other code directives when processed by the engine.",
	Severity: 5,
	CWE: "https://cwe.mitre.org/data/definitions/1336.html"
};


// exports.convertRuleIDToErrorType = (ErrorID) => {
// 	if (!ErrorID) {
// 		return -1;
// 	}
// 	for (const [key, value] of Object.entries(exports.ErrorList)) {
// 		if ("" + value["Name"] == ErrorID.replace("-", " ")) {
// 			return key;
// 		}
// 	}
// 	return -1;
// };

exports.ReturnErrorTypeInformation = (ErrorID) => {
	return exports.PHPErrorList[ErrorID];
	//return JSON.stringify({"Name" : ErrorList[1].Name});
};

exports.getErrorTypesNum = () =>
{
	return Object.keys(exports.PHPErrorList).length;
}