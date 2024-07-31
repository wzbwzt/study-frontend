function timeout(deplay) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, deplay)
    })
}

//实现SuperTask
class SuperTask {
    constructor(parallelCount = 2) {
        this.parallelCount = parallelCount
        this.tasks = []
        this.runningTaskCount = 0
    }
    add(task) {
        return new Promise((resolve, reject) => {
            this.tasks.push({
                task,
                resolve,
                reject
            })
            this._run()
        })
    }
    _run() {
        while (this.tasks.length > 0 && this.runningTaskCount < this.parallelCount) {
            const { task, resolve, reject } = this.tasks.shift()
            this.runningTaskCount++
            task().then(resolve, reject).finally(() => {
                this.runningTaskCount--
                this._run()
            })
        }
    }
}


const supertask = new SuperTask()
function addTask(time, name) {
    supertask
        .add(() => timeout(time))
        .then(() => {
            console.log(`任务${name}完成`)
        })
}

addTask(10000, 1) //10s 输出1
addTask(5000, 2) //5s 输出2
addTask(3000, 3) //8s 输出3
addTask(4000, 4)  //12s 输出4
addTask(5000, 5) //15s 输出5
//得出并发度为2执行
//实现SuperTask

