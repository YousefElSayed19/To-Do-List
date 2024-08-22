let tasks=[
    // {
    //     "title":"gdaskl;",
    //     "date":"lfsk",
    //     "isDone":false,
    // },
    // {
    //     "title":"gdaskl;",
    //     "date":"lfsk",
    //     "isDone":false,
    // },
    // {
    //     "title":"gdaskl;",
    //     "date":"lfsk",
    //     "isDone":false,
    // },
    // {
    //     "title":"gdaskl;",
    //     "date":"lfsk",
    //     "isDone":false,
    // },
    // {
    //     "title":"gdaskl;",
    //     "date":"lfsk",
    //     "isDone":false,
    // },
]

let allTasks=document.querySelector(".tasks");

let add=document.querySelector(".add");
let parent=document.querySelector(".parent")

add.addEventListener("click",function(){
    let box=document.createElement("div");
    box.classList.add("box");
    box.style.cssText="position:absolute;left:50%;top:50%;background:#50238d;width:600px;min-height:250px ; transform:translate(-50%,-50%);text-align:center;border-radius:10px";
    let p=document.createElement("p");
    p.textContent="Input Your Task To Add";
    p.style.cssText="text-align:center;font-size:25px;color:white;margin-top:50px"
    box.appendChild(p);
    
    let input=document.createElement("input");
    input.classList.add("input");
    input.type="text";
    input.classList.add("form-control")
    input.placeholder="Enter Text !";
    input.style.cssText="height: 35px;width: 70%;padding: 5px;border-radius: 10px;border: none;margin-top:30px;margin:30px auto"
    box.appendChild(input);
    document.body.appendChild(box);
    parent.style.opacity="0.7";
    input.focus();

    let button=document.createElement("button");
    button.textContent="Send";  
    button.style.cssText="height: 35px;width: 20%;padding: 5px;border-radius: 10px;border: none;margin-top:30px;display:block; margin:30px auto;background:#ffc107;color:white;font-weight:bold ; box-shadow:0 2px 10px black    "
    box.appendChild(button);

    let span=document.createElement("span");
    span.textContent="X";  
    span.style.cssText="cursor: pointer;position:absolute;right:-20px;top:-20px;width:35px;height:35px ;border-radius:50%;background:red; color:white;display:flex;justify-content:center;align-items:center"
    box.appendChild(span);
    
    span.addEventListener("click",()=>{
        box.remove();
        parent.style.opacity="1";
    })
    button.addEventListener("click",()=>{
        if (input.value.length>0){
            parent.style.opacity="1";
            let date=new Date();
            let taskOpj={
                "title":input.value,
                "date":`${date.getHours()>12? date.getHours()-12 : date.getHours()}:${date.getMinutes().length==1?'0'+date.getMinutes():date.getMinutes()} | ${date.getDate()} / ${date.getMonth()+1} / ${date.getFullYear()} <i class="fa-solid fa-calendar-days"></i>`,
                "isDone":false,
            }
            tasks.push(taskOpj);
            box.remove();
            addTasks()
        }else{
            alert("No Thing In field ! ")
        }
    })
})

function addTasks(){
    allTasks.innerHTML ='';
    let index=0;
    for (let task of tasks){
        let content=    
        `
            <div class="task ${task.isDone?"done":""}">
                <div class="left">
                    <button class="change" onclick="changeTask(${index})"><i class="fa-solid fa-pen-to-square"></i></button>
                    ${task.isDone?`<button class="done" onclick="doneTask(${index})" style="background:#aa43d9"><i class="fa-solid fa-x"></i></button>`
                        :
                        `<button class="done" onclick="doneTask(${index})"><i class="fa-solid fa-check"></i></button>`}
                    <button class="delete" onclick="deleteTask(${index})"><i class="fa-solid fa-trash"></i></button>
                </div>
                <div class="right">
                    <p>${task.title}</p>
                    <span>${task.date} <i class="fa-solid fa-calendar-days"></i></span>
                </div>
            </div>
        `
        allTasks.innerHTML +=content;
        index++;
        saveDate()
    }
}

function deleteTask(index){
    let isConfirm=confirm("Are you sure you want to delete the task? ");
    if (isConfirm){
        tasks.splice(index,1);
        addTasks()
        saveDate()
    }
}

function changeTask(index){
    let massege=prompt("Enter Your New Content ! : ") ;
    tasks[index].title=massege;
    addTasks()
    saveDate()
}

function doneTask(index){
    tasks[index].isDone=true
    addTasks()
    saveDate()
}


function saveDate(){
    localStorage.setItem("tasks",JSON.stringify(tasks))
}

window.onload=function(){
    if(localStorage.getItem("tasks")){
        tasks=JSON.parse(localStorage.getItem("tasks"));
        addTasks()
    }
}