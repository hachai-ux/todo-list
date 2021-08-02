//factory functions set up and return the new object when you call the function

//todo items carry information about the todos
//'' works
const ToDoFactory = (title, description, dueDate, priority, notes) => {
    const getTitle = () => title;
    const getDescription  = () => description;
    const getDueDate = () => dueDate;
    const getPriority = () => priority;
    const getNotes = () => notes;

   

    return {getTitle, getDescription, getDueDate, getPriority, getNotes,
        //setter needs to be declared in an object
        set title(ti){
            title = ti;
        },
        set description(des){
            description = des;
        },
        set dueDate(date){
            dueDate = date;
        },
        set priority(prio){ 
            priority = prio;
        },
        set priority(n){
            notes = n;
        }
        
    };
};

//projects carry name and a todo list
const ProjectsFactory = (title) => {
    let toDoList = [];
    const getTitle = () => title;
    const getToDoList = () => toDoList;
    return {getTitle, getToDoList};
};

export {ToDoFactory, ProjectsFactory};