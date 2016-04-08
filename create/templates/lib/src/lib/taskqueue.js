/**
 * Description: 任务队列
 * User: 常胤 <satans17@gmail.com>
 * Date: 15/11/7
 * Copyright(c) 2015 Taobao.com
 */

export default function taskQueue() {
}

taskQueue.prototype = Object.create({
  addTask(task){
    let tasks = this.__task;
    tasks.push(function () {
      let timer = null;
      let next = function () {
        let n = tasks.shift();
        if (n) {
          n.call(null)
        }
        if(timer){
          clearTimeout(timer);
        }
      };
      try{
        task.call(null, next);
      }catch(e){
        next();
      }
      timer = setTimeout(()=>{
        next();
      },6000)
    });
  },
  execTask(){
    let tasks = this.__task;
    if (tasks.length > 0) {
      this.__task.shift().call(this);
    }
  }
}, {
  __task: {
    value: []
  }
})

