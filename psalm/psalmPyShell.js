let { PythonShell } = require("python-shell");

exports.runPsalm = async (dirToPyFiles, isJson) => {
  let optionsJSON = {
    mode: "json",
    //pythonPath: 'path/to/python',
    pythonOptions: ["-u"], // get print results in real-time
    scriptPath: __dirname,
    args: [dirToPyFiles, "1"],
  };

  let optionsCsv = {
    mode: "text",
    //pythonPath: 'path/to/python',
    pythonOptions: ["-u"], // get print results in real-time
    scriptPath: __dirname,
    args: [dirToPyFiles, "0"],
  };

  const shellOutput = await new Promise((resolve, reject) => {
    //dir actually at index.js  (codechomper root)
    if (isJson === true) {
      PythonShell.run("/main.py", optionsJSON, (err, results) => {
        console.log("the pythonshell results are: ");
  
        if (err) {

          return reject(err);
        }
        return resolve(results);
      });
    } else {
      PythonShell.run("/main.py", optionsCsv, (err, results) => {
        if (err) return reject(err);
        return resolve(results);
      });
    }
  });

  return shellOutput;
};
