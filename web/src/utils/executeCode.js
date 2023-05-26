function runInSeparateThread(fn, timeLimit) {
    return new Promise((resolve, reject) => {
        const worker = new Worker(URL.createObjectURL(new Blob([`
            const fn = ${fn.toString()};
            let result;
            let environmentLogs = []
            const startTime = performance.now()
            const customConsole = {
                log: (msg) => environmentLogs.push(msg)
            }
            try {
                result = fn(customConsole);
                const runtime = Math.round((performance.now() - startTime)*10)/10;
                result = {result: result, logs: environmentLogs, runtime: runtime}
                self.postMessage({ type: 'result', result });
            } catch (error) {
                const runtime = Math.round((performance.now() - startTime)*10)/10;
                self.postMessage({ type: 'error', error: error.message, runtime: runtime});
            }
           
        `], { type: 'text/javascript' })));
  
        const timeout = setTimeout(() => {
            worker.terminate();
            reject(new Error(`Function exceeded time limit of ${timeLimit}ms`));
        }, timeLimit);
    
        worker.onmessage = (event) => {
            if (event.data.type === 'result') {
                clearTimeout(timeout);
                resolve(event.data.result);
            } else if (event.data.type === 'error') {
                clearTimeout(timeout)
                reject({error: event.data.error, runtime: event.data.runtime});
            }
        };
    });
}
function executeCode (code, testcase, runTimeLimit){
    const args = Object.keys(testcase.case).map(key => testcase.case[key])
    const codeFunction = Function('console', code + `return solve(${args.join(', ')});`)
    return runInSeparateThread(codeFunction, runTimeLimit)
}
async function executeCode2(code, testcase, runTimeLimit){
    const args = Object.keys(testcase.case).sort().map(key => testcase.case[key])
    const codeFunction = Function('console', code + `return solve(${args.join(', ')});`)
    let res = {result: undefined, runtime: undefined, error: undefined, logs: []}
    try {
        const {result, logs, runtime} = await runInSeparateThread(codeFunction, runTimeLimit)
        res.result = result
        res.logs = logs
        res.runtime = runtime
    } catch (errorData){
        res.error = errorData.error
        res.result = 'error'
        res.runtime = errorData.runtime
    }
    return res 
}

export {executeCode, runInSeparateThread, executeCode2}



//City names = ["Almaty", "Astatna", "Shymkent", "Tashkent","Balqash","Taldykorgan", "Sidney"]
//Cons = ["Almaty-Taldykorgan","Taldykorgan-Astana", "Almaty-Shymkent","Taldykorgan-Balqash","Shymkent-Tashkent"]
// Start = "Almaty"
// Dest = "Astana"