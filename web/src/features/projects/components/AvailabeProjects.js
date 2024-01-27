// project object must have
// - title
// - description
// - implementationURL - to be able to see the final result
// - list of problems as links
// - difficulty
// - date of creation
// - ? number of users completed


// problems must include css problems. How to do it?:
// - writing styles
// - making animations
// The issue is to check whether the user did implement it or not
// - using the same method as in css battles:
// --- that is checking each pixel and deriving simillarity percentage
// - avoid checking styling
// --- in this case final product must vary depending on user styles
// --- this is very problematic

// new problem object must contain: 
// - boiler code not shown to the user
// - list of possbile solutions

// solutions object: 
// - author user id
// - created date
// - code
// - average runtime
// - memory usage
// - explanation or description in sections

// questions: 
// - how to handle event listeners
// - 

export default function AvailableProjects(){
    return (
        <main className="AvailableProjects">

        </main>
    ) 
}


import numpy as np

def getInterval(a,b,step):
    return np.arange(a,b,step)

def f(t):
    return np.add(np.exp(np.multiply(t,2)),1)

#  getting sample data 
interval = np.arange(0,1,0.01)
timeSeriesData = f(interval)

#  library functions definition
def l1(t):
    return t
def l2(t):
    return np.multiply(t,t)
def l3(t):
    return np.multiply(np.multiply(t,t),t)
def l4(t):
    return np.exp(np.multiply(2,t))
# o1func = lambda x: 1
def l5(t):
    return np.ones(t.shape)

fs = [l1,l2,l3,l4,l5]

# library matrix initialization
def initLib(fs, data):
    lib = fs[0](interval)
    for index,candidateFunc in enumerate(fs):
        if index == 0: 
            continue
        lib = np.vstack([lib, candidateFunc(interval)])
    return lib
    
lib = np.transpose(initLib(fs,timeSeriesData))


# derivatives calculation

def df(t):
    return np.multiply(np.exp(np.multiply(t,2)),2)

derivatives = df(interval)

def convertToRegressionMatrix(lib):
    res = []
    for row in range(lib.shape[1]):
        a = []
        for col in range(lib.shape[1]):
            sum = 0
            for n in range(lib.shape[0]):
                sum = sum + lib[n,col]*lib[n,row]
            a.append(sum)
        res.append(a)
    return np.matrix(res)
def convertToRegressionVector(lib,dx):
    res = []
    for row in range(lib.shape[1]):
        sum = 0
        for n in range(lib.shape[0]):
            sum = sum + dx[n]*lib[n,row]
        res.append(sum)
    return  np.array(res)
    
# def regression(a,b):
#     X = np.column_stack((np.ones(a.shape[0]), a))
#     coefs = np.linalg.inv(X.T @ X) @ X.T @ b
#     return coefs
def regression(a,b):
    coefs = np.linalg.solve(a, b)
    return coefs
def regressionAdvanced(a,b,threshold):
    coefs = []
    for i in range(10):
        A = convertToRegressionMatrix(a)
        B = convertToRegressionVector(a,b)
        coefs = regression(A,B)
        print(coefs)
        deleted = False
        for k in reversed(range(len(coefs))):
            if abs(coefs[k]) < threshold:
                deleted = True
                a = np.delete(a, k, axis=1)
                break
        if not deleted:
            break
    return coefs

print(regressionAdvanced(lib,derivatives,0.00001))