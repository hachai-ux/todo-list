//manages a list of projects
const ProjectController = (() => {
    const projectList = [];
    const addProject = (project) => {
   
        projectList.push(project);
    };
    const getProjectList = () => projectList;

    return{addProject, getProjectList};
})();


//manages the todo-list for each project
const ToDoController = (() => {
    //add a todo to a project
    const addToDo = (toDo, project) => {
        project.getToDoList().push(toDo);
        console.log(project.getToDoList());
    };


    const editToDo = (toDo, newTitle, newDescription, newDueDate, newPriority, newNotes) => {
        toDo.title = newTitle;
        toDo.description = newDescription;
        toDo.dueDate = newDueDate;
        toDo.priority = newPriority;
        toDo.newNotes = newNotes;
    };

    const completeToDo = (toDo, project)=>{
        const index = project.getToDoList().findIndex((toDo)=> toDo);
        //removes from todo-list after complete
        project.getToDoList().splice(index, 1);
    };

    const changePriority = (toDo, project, priority)=>{
        //access setter of the todo
        const index = project.getToDoList().findIndex((toDo)=> toDo);
        //removes from todo-list after complete
        project.getToDoList()[index].priority = priority;
        
    };

    return{addToDo, editToDo, completeToDo, changePriority}
})();

export {ProjectController, ToDoController};