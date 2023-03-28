exports.PYErrorList = {};
exports.PYErrorList[101] = {
	Name: "Test for use of assert",
	Description:
		"Use of assert detected. The enclosed code will be removed when compiling to optimised byte code.",
    Severity:  1, //low
    CWE: "https://cwe.mitre.org/data/definitions/703.html",
    // eslint-disable-next-line no-secrets/no-secrets
    MoreInfo: "https://bugs.launchpad.net/juniperopenstack/+bug/1456193",
    Group: "Misc tests"   
};
exports.PYErrorList[102] = {
	Name: "Test for the use of exec",
	Description:
		"Use of exec detected, which can allow for dynamically generated code to be run (possibly based on user input).",
    Severity:  2, //5, //med
    CWE: "https://cwe.mitre.org/data/definitions/78.html",
    MoreInfo: "https://www.python.org/dev/peps/pep-0551/#background", 
    Group: "Misc tests" 
};
exports.PYErrorList[103] = {
	Name: "Test for setting permissive file permissions",
	Description:
		"Looks for the use of chmod and will alert when it is used to set particularly permissive control flags. A MEDIUM warning is generated if a file is set to group write or executable and a HIGH warning is reported if a file is set world write or executable. ",
    Severity: 2, //8, // can be MED or HIGH
    CWE: "https://cwe.mitre.org/data/definitions/732.html",
    MoreInfo: "https://security.openstack.org/guidelines/dg_apply-restrictive-file-permissions.html",
    Group: "Misc tests"    
};
exports.PYErrorList[104] = {
	Name: "Test for binding to all interfaces",
	Description:
		"Binding to all network interfaces can potentially open up a service to traffic on unintended interfaces, that may not be properly documented or secured. This plugin test looks for a string pattern “0.0.0.0” that may indicate a hardcoded binding to all network interfaces.",
    Severity: 2, //5, // MED
    CWE: "https://cwe.mitre.org/data/definitions/605.html",
    MoreInfo: "https://nvd.nist.gov/vuln/detail/CVE-2018-1281" ,
    Group: "Misc tests"  
};
exports.PYErrorList[105] = {
	Name: "Test for use of hard-coded password strings",
	Description:
		"The use of hard-coded passwords increases the possibility of password guessing tremendously. Note: this can be noisy and may generate false positives.",
    Severity: 2, //4, //  LOW for some reason
    CWE: "https://cwe.mitre.org/data/definitions/259.html",
    MoreInfo: "https://bandit.readthedocs.io/en/latest/plugins/b105_hardcoded_password_string.html" ,
    Group: "Misc tests"  
};
exports.PYErrorList[106] = {
	Name: "Test for use of hard-coded password function arguments",
	Description:
		"The use of hard-coded passwords increases the possibility of password guessing tremendously. This test looks for all function calls being passed a keyword argument that is a string literal. It checks that the assigned local variable does not look like a password. Note: this can be noisy and may generate false positives.",
    Severity: 2, //4, //LOW for some reason
    CWE: "https://cwe.mitre.org/data/definitions/259.html",
    MoreInfo: "https://bandit.readthedocs.io/en/latest/plugins/b106_hardcoded_password_funcarg.html" ,
    Group: "Misc tests"  
};
exports.PYErrorList[107] = {
	Name: "Test for use of hard-coded password argument defaults",
	Description:
		"The use of hard-coded passwords increases the possibility of password guessing tremendously. This test looks for all function definitions that specify a default string literal for some argument. It checks that the argument does not look like a password. Note: this can be noisy and may generate false positives.",
    Severity: 2, //4, //LOW for some reason
    CWE: "https://cwe.mitre.org/data/definitions/259.html",
    MoreInfo: "https://bandit.readthedocs.io/en/latest/plugins/b107_hardcoded_password_default.html" ,
    Group: "Misc tests"  
};
exports.PYErrorList[108] = {
	Name: "Test for insecure usage of tmp file/directory",
	Description:
		"Safely creating a temporary file or directory means following a number of rules (see the references for more details). This plugin test looks for strings starting with (configurable) commonly used temporary paths",
    Severity: 2, //5, // MED
    CWE: "https://cwe.mitre.org/data/definitions/377.html",
    MoreInfo: "https://bandit.readthedocs.io/en/latest/plugins/b108_hardcoded_tmp_directory.html" ,
    Group: "Misc tests"  
};
exports.PYErrorList[109] = {
	Name: "Test for a password based config option not marked secret",
	Description:
		"Passwords are sensitive and must be protected appropriately. In OpenStack Oslo there is an option to mark options “secret” which will ensure that they are not logged. This plugin detects usages of oslo configuration functions that appear to deal with strings ending in ‘password’ and flag usages where they have not been marked secret.",
    Severity: 2, //5, // MED
    CWE: "",
    MoreInfo: "https://bandit.readthedocs.io/en/latest/plugins/b109_password_config_option_not_marked_secret.html" ,
    Group: "Misc tests"  
};
exports.PYErrorList[110] = {
	Name: "Test for a pass in the except block",
	Description:
		"Errors in Python code bases are typically communicated using Exceptions. An exception object is ‘raised’ in the event of an error and can be ‘caught’ at a later point in the program, typically some error handling or logging action will then be performed. However, it is possible to catch an exception and silently ignore it using pass, potentially causing a security issue.",
    Severity: 2, // LOW
    CWE: "https://cwe.mitre.org/data/definitions/703.html",
    MoreInfo: "https://bandit.readthedocs.io/en/latest/plugins/b110_try_except_pass.html" ,
    Group: "Misc tests"  
};
exports.PYErrorList[111] = {
	Name: "Test for the use of rootwrap running as root",
	Description:
		"Running commands as root dramatically increase their potential risk. Running commands with restricted user privileges provides defense in depth against command injection attacks, or developer and configuration error. This plugin test checks for specific methods being called with a keyword parameter run_as_root set to True, a common OpenStack idiom.",
    Severity: 2, // LOW
    CWE: "",
    MoreInfo: "https://bandit.readthedocs.io/en/latest/plugins/b111_execute_with_run_as_root_equals_true.html" ,
    Group: "Misc tests"  
};
exports.PYErrorList[112] = {
	Name: "Test for a continue in the except block",
	Description:
		"Errors in Python code bases are typically communicated using Exceptions. An exception object is ‘raised’ in the event of an error and can be ‘caught’ at a later point in the program, typically some error handling or logging action will then be performed. However, it is possible to catch an exception and silently ignore it using 'continue' while in a loop, potentially causing a security issue.",
    Severity: 2, // LOW
    CWE: "https://cwe.mitre.org/data/definitions/703.html",
    MoreInfo: "https://bandit.readthedocs.io/en/latest/plugins/b112_try_except_continue.html" ,
    Group: "Misc tests" 
};
exports.PYErrorList[113] = {
	Name: "Test for missing requests timeout",
	Description:
    "Checks for requests calls without a timeout specified. Nearly all production code should use this parameter in nearly all requests, Failure to do so can cause your program to hang indefinitely."  ,  
    Severity: 2, //5, // "MED"
    CWE: "https://cwe.mitre.org/data/definitions/400.html",
    MoreInfo: "https://bandit.readthedocs.io/en/latest/plugins/b113_request_without_timeout.html" ,
    Group: "Misc tests" 
};
exports.PYErrorList[201] = {
	Name: "Test for use of flask app with debug set to true",
	Description:
    "Running Flask applications in debug mode results in the Werkzeug debugger being enabled. This includes a feature that allows arbitrary code execution. It should not be enabled in a production server."  ,  
    Severity: 2, //9, // "HIGH"
    CWE: "https://cwe.mitre.org/data/definitions/94.html",
    MoreInfo: "https://bandit.readthedocs.io/en/latest/plugins/b201_flask_debug_true.html" ,
    Group: "Application/framework misconfiguration" 
};
exports.PYErrorList[202] = {
	Name: "Test for tarfile.extractall",
	Description:
    "Tarfile.extractall used without proper validation. Potential path traversal vulnerability."  ,  
    Severity: 2, //3, // "DEPENDS"
    CWE: "https://cwe.mitre.org/data/definitions/22.html",
    MoreInfo: "https://bandit.readthedocs.io/en/latest/plugins/b202_tarfile_unsafe_members.html" ,
    Group: "Application/framework misconfiguration" 
};

exports.PYErrorList[324] = {	
	Name: "Test use of insecure md4, md5, or sha1 hash functions in hashlib",
	Description:
    "This plugin checks for the usage of the insecure MD4, MD5, or SHA1 hash functions in hashlib"  ,  
    Severity: 2, //9, // "HIGH"
    CWE: "https://cwe.mitre.org/data/definitions/327.html",
    MoreInfo: "https://bandit.readthedocs.io/en/latest/plugins/b324_hashlib.html" ,
    Group: "Blacklists (calls)" 
};
exports.PYErrorList[501] = {	
	Name: "Test for request with missing certificate validation",
	Description:
    "If certificate validation is explicitly turned off Bandit will return a HIGH severity error."  ,  
    Severity: 2, //9, // "HIGH"
    CWE: "https://cwe.mitre.org/data/definitions/295.html",
    MoreInfo: "https://bandit.readthedocs.io/en/latest/plugins/b501_request_with_no_cert_validation.html" ,
    Group: "Cryptography" 
};
exports.PYErrorList[502] = {	
	Name: "Test for SSL use with bad version used",
	Description:
    "This plugin test scans for calls to Python methods with parameters that indicate the used broken SSL/TLS protocol versions. Currently, detection supports methods using Python’s native SSL/TLS support and the pyOpenSSL module"  ,  
    Severity: 2, //9, // "HIGH"
    CWE: "https://cwe.mitre.org/data/definitions/327.html",
    MoreInfo: "https://bandit.readthedocs.io/en/latest/plugins/b502_ssl_with_bad_version.html" ,
    Group: "Cryptography" 
};
exports.PYErrorList[503] = {	
	Name: "Test for SSL use with bad defaults specified",
	Description:
    "Scans for Python methods with default parameter values that specify the use of broken SSL/TLS protocol versions."  ,  
    Severity: 2, //5, // "MED"
    CWE: "https://cwe.mitre.org/data/definitions/327.html",
    MoreInfo: "https://bandit.readthedocs.io/en/latest/plugins/b503_ssl_with_bad_defaults.html" ,
    Group: "Cryptography" 
};
exports.PYErrorList[504] = {	
	Name: "Test for SSL use with no version specified",
	Description:
    "Scans for specific methods in Python’s native SSL/TLS support and the pyOpenSSL module that configure the version of SSL/TLS protocol to use. These methods are known to provide default value that maximize compatibility, but permit use of broken protocol versions."  ,  
    Severity: 2, // "LOW"
    CWE: "https://cwe.mitre.org/data/definitions/327.html",
    MoreInfo: "https://bandit.readthedocs.io/en/latest/plugins/b504_ssl_with_no_version.html" ,
    Group: "Cryptography" 
};
exports.PYErrorList[505] = {
	Name: "Test for weak cryptographic key use",
	Description:
    "The recommended key length size for RSA and DSA algorithms is 2048 and higher. 1024 bits and below are now considered breakable. EC key length sizes are recommended to be 224 and higher with 160 and below considered breakable. This plugin test checks for use of any key less than those limits and returns a high severity error if lower than the lower threshold and a medium severity error for those lower than the higher threshold."  ,  
    Severity: 2, //3, // "DEPENDS"
    CWE: "https://cwe.mitre.org/data/definitions/326.html",
    MoreInfo: "https://bandit.readthedocs.io/en/latest/plugins/b505_weak_cryptographic_key.html" ,
    Group: "Cryptography" 
};
exports.PYErrorList[506] = {	
	Name: "Test for use of yaml load",
	Description:
    "The yaml.load function provides the ability to construct an arbitrary Python object, which may be dangerous if you receive a YAML document from an untrusted source. The function yaml.safe_load limits this ability to simple Python objects like integers or lists."  ,  
    Severity: 2, //5, // "MED"
    CWE: "https://cwe.mitre.org/data/definitions/20.html",
    MoreInfo: "https://bandit.readthedocs.io/en/latest/plugins/b506_yaml_load.html" ,
    Group: "Cryptography" 
};
exports.PYErrorList[507] = {
	Name: "Test for missing host key validation for SSH",
	Description:
    "TWhen paramiko methods are used, host keys are verified by default. If host key verification is disabled, Bandit will return a HIGH severity error."  ,  
    Severity: 2, //5, // "MED"
    CWE: "https://cwe.mitre.org/data/definitions/295.html",
    MoreInfo: "https://bandit.readthedocs.io/en/latest/plugins/b507_ssh_no_host_key_verification.html" ,
    Group: "Cryptography" 
};
exports.PYErrorList[508] = {
	Name: "Checking for insecure SNMP versions",
	Description:
    "This test is for checking for the usage of insecure SNMP version like v1, v2c"  ,  
    Severity:  2, //5, //"MED"
    CWE: "https://cwe.mitre.org/data/definitions/319.html",
    MoreInfo: "https://bandit.readthedocs.io/en/latest/plugins/b508_snmp_insecure_version.html" ,
    Group: "Cryptography" 
};
exports.PYErrorList[509] = {
	Name: "Checking for weak SNMP cryptography",
	Description:
    "This test is for checking for the usage of insecure SNMP version like v1, v2c"  ,  
    Severity: 2, //5, // "MED"
    CWE: "https://cwe.mitre.org/data/definitions/319.html",
    MoreInfo: "https://bandit.readthedocs.io/en/latest/plugins/b509_snmp_weak_cryptography.html" ,
    Group: "Cryptography" 
};
exports.PYErrorList[601] = {
	Name: "Test for shell injection within Paramiko",
	Description:
    "Paramiko is a Python library designed to work with the SSH2 protocol for secure (encrypted and authenticated) connections to remote machines. It is intended to run commands on a remote host. These commands are run within a shell on the target and are thus vulnerable to various shell injection attacks. Bandit reports a MEDIUM issue when it detects the use of Paramiko’s “exec_command” method advising the user to check inputs are correctly sanitized."  ,  
    Severity: 2, //5, // "MED"
    CWE: "https://cwe.mitre.org/data/definitions/78.html",
    MoreInfo: "https://bandit.readthedocs.io/en/latest/plugins/b601_paramiko_calls.html" ,
    Group: "Injection" 
};
exports.PYErrorList[602] = {
	Name: "Test for use of popen with shell equals true",
	Description:
    " this test looks for the spawning of a subprocess using a command shell. This type of subprocess invocation is dangerous as it is vulnerable to various shell injection attacks. Great care should be taken to sanitize all input in order to mitigate this risk. Additionally, this plugin scans the command string given and adjusts its reported severity based on how it is presented. If the command string is a simple static string containing no special shell characters, then the resulting issue has low severity. If the string is static, but contains shell formatting characters or wildcards, then the reported issue is medium. Finally, if the string is computed using Python’s string manipulation or formatting operations, then the reported issue has high severity."  ,  
    Severity: 2, //3, // "DEPENDS"
    CWE: "https://cwe.mitre.org/data/definitions/78.html",
    MoreInfo: "https://bandit.readthedocs.io/en/latest/plugins/b602_subprocess_popen_with_shell_equals_true.html" ,
    Group: "Injection" 
};
exports.PYErrorList[603] = {
	Name: "Test for use of subprocess without shell equals true",
	Description:
    "Looks for the spawning of a subprocess without the use of a command shell. This type of subprocess invocation is not vulnerable to shell injection attacks, but care should still be taken to ensure validity of input."  ,  
    Severity: 2, // "LOW"
    CWE: "https://cwe.mitre.org/data/definitions/78.html",
    MoreInfo: "https://bandit.readthedocs.io/en/latest/plugins/b603_subprocess_without_shell_equals_true.html" ,
    Group: "Injection" 
};
exports.PYErrorList[604] = {
	Name: "Test for any function with shell equals true",
	Description:
    "Interrogates method calls for the presence of a keyword parameter shell equalling true. It is related to detection of shell injection issues and is intended to catch custom wrappers to vulnerable methods that may have been created."  ,  
    Severity: 2, //5, // "MED"
    CWE: "https://cwe.mitre.org/data/definitions/78.html",
    MoreInfo: "https://bandit.readthedocs.io/en/latest/plugins/b604_any_other_function_with_shell_equals_true.html" ,
    Group: "Injection" 
};
exports.PYErrorList[605] = {
	Name: "Test for starting a process with a shell",
	Description:
    "This test looks for the spawning of a subprocess using a command shell. This type of subprocess invocation is dangerous as it is vulnerable to various shell injection attacks. Great care should be taken to sanitize all input in order to mitigate this risk. Calls of this type are identified by the use of certain commands which are known to use shells."  ,  
    Severity: 2, // "LOW"
    CWE: "https://cwe.mitre.org/data/definitions/78.html",
    MoreInfo: "https://bandit.readthedocs.io/en/latest/plugins/b605_start_process_with_a_shell.html" ,
    Group: "Injection" 
};
exports.PYErrorList[606] = {
	Name: "Test for starting a process with no shell",
	Description:
    "This test looks for the spawning of a subprocess in a way that doesn’t use a shell. Although this is generally safe, it maybe useful for penetration testing workflows to track where external system calls are used. "  ,  
    Severity: 2, // "LOW"
    CWE: "https://cwe.mitre.org/data/definitions/78.html",
    MoreInfo: "https://bandit.readthedocs.io/en/latest/plugins/b606_start_process_with_no_shell.html" ,
    Group: "Injection" 
};
exports.PYErrorList[607] = {
	Name: "Test for starting a process with a partial path",
	Description:
    "This test will scan the parameters of all configured Python methods, looking for paths that do not start at the filesystem root, that is, do not have a leading ‘/’ character."  ,  
    Severity: 2, // "LOW"
    CWE: "https://cwe.mitre.org/data/definitions/78.html",
    MoreInfo: "https://bandit.readthedocs.io/en/latest/plugins/b607_start_process_with_partial_path.html" ,
    Group: "Injection" 
};
exports.PYErrorList[608] = {
	Name: "Test for Hardcoded SQL Expressions (SQL injection)",
	Description:
    "Looks for strings that resemble SQL statements that are involved in some form of string building operation. Unless care is taken to sanitize and control the input data when building such SQL statement strings, an injection attack becomes possible."  ,  
    Severity: 3, // "DEPENDS"
    CWE: "https://cwe.mitre.org/data/definitions/89.html",
    MoreInfo: "https://bandit.readthedocs.io/en/latest/plugins/b608_hardcoded_sql_expressions.html" ,
    Group: "Injection" 
};
exports.PYErrorList[609] = {
	Name: "Test for use of wildcard injection",
	Description:
    "This test plugin looks for usage of the following commands in conjunction with wild card (*) parameters: ‘chown’ ‘chmod’ ‘tar’ ‘rsync’"  ,  
    Severity: 2, // "LOW"
    CWE: "https://cwe.mitre.org/data/definitions/78.html",
    MoreInfo: "https://bandit.readthedocs.io/en/latest/plugins/b609_linux_commands_wildcard_injection.html" ,
    Group: "Injection" 
};
exports.PYErrorList[610] = {
	Name: "Potential SQL injection on extra function (django)",
	Description:
    "This test plugin looks for usage of django function extra. see: https://docs.djangoproject.com/en/dev/topics/security/#sql-injection-protection"  ,  
    Severity: 2, //5, // "MED"
    CWE: "https://cwe.mitre.org/data/definitions/89.html",
    MoreInfo: "https://bandit.readthedocs.io/en/latest/plugins/b610_django_extra_used.html" ,
    Group: "Injection" 
};
exports.PYErrorList[610] = {
	Name: "Potential SQL injection on extra function (django)",
	Description:
    "This test plugin looks for usage of django function extra. see: https://docs.djangoproject.com/en/dev/topics/security/#sql-injection-protection"  ,  
    Severity: 2, //5, // "MED"
    CWE: "https://cwe.mitre.org/data/definitions/89.html",
    MoreInfo: "https://bandit.readthedocs.io/en/latest/plugins/b610_django_extra_used.html" ,
    Group: "Injection" 
};
exports.PYErrorList[611] = {
	Name: "Potential SQL injection on RawSQL function",
	Description:
    "This test plugin looks for usage of django function RawSQL. see: https://docs.djangoproject.com/en/dev/topics/security/#sql-injection-protection"  ,  
    Severity: 2, //5, // "MED"
    CWE: "https://cwe.mitre.org/data/definitions/89.html",
    MoreInfo: "https://bandit.readthedocs.io/en/latest/plugins/b611_django_rawsql_used.htmll" ,
    Group: "Injection" 
};
exports.PYErrorList[612] = {
	Name: "Test for insecure use of logging.config.listen",
	Description:
    "This plugin test checks for the unsafe usage of the logging.config.listen function. The logging.config.listen function provides the ability to listen for external configuration files on a socket server. Because portions of the configuration are passed through eval(), use of this function may open its users to a security risk."  ,  
    Severity: 2, //5, // "MED"
    CWE: "https://cwe.mitre.org/data/definitions/94.html",
    MoreInfo: "https://bandit.readthedocs.io/en/latest/plugins/b612_logging_config_insecure_listen.html" ,
    Group: "Injection" 
};
exports.PYErrorList[701] = {
	Name: "Test for not auto escaping in jinja2",
	Description:
    " When autoescaping is enabled, Jinja2 will filter input strings to escape any HTML content submitted via template variables. Without escaping HTML input the application becomes vulnerable to Cross Site Scripting (XSS) attacks."  ,  
    Severity: 2, //9, // "HIGH"
    CWE: "https://cwe.mitre.org/data/definitions/94.html",
    MoreInfo: "https://bandit.readthedocs.io/en/latest/plugins/b701_jinja2_autoescape_false.html" ,
    Group: "XSS" 
};
exports.PYErrorList[702] = {
	Name: "Test for use of mako templates",
	Description:
    "Unlike Jinja2 (an alternative templating system), Mako has no environment wide variable escaping mechanism. Because of this, all input variables must be carefully escaped before use to prevent possible vulnerabilities to Cross Site Scripting (XSS) attacks."  ,  
    Severity: 2, //5, // "MED"
    CWE: "https://cwe.mitre.org/data/definitions/80.html",
    MoreInfo: "https://bandit.readthedocs.io/en/latest/plugins/b702_use_of_mako_templates.html" ,
    Group: "XSS" 
};
exports.PYErrorList[703] = {
	Name: "Potential XSS on mark_safe function (Django)",
	Description:
    "Potential XSS on mark_safe function if unsafe string is set. See: https://docs.djangoproject.com/en/dev/ref/utils/#module-django.utils.safestring"  ,  
    Severity: 2, //5, // "MED"
    CWE: "https://cwe.mitre.org/data/definitions/80.html",
    MoreInfo: "https://bandit.readthedocs.io/en/latest/plugins/b703_django_mark_safe.html" ,
    Group: "XSS" 
};

exports.ReturnPYErrorTypeInformation = (ErrorID) => {
	return exports.PYErrorList[ErrorID];
	//return JSON.stringify({"Name" : ErrorList[1].Name});
};

exports.getPYErrorIDs = () =>
{
	return Object.keys(exports.PYErrorList);
}
