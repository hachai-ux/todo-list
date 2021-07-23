//factory functions set up and return the new object when you call the function

//todo items carry information about the todos
const TodoFactory = (title, description, dueDate, priority, notes) => {
    const getTitle = () => title;
    const getDescription  = () => description;
    const getDueDate = () => dueDate;
    const getPriority = () => priority;
    const getNotes = () => notes;
    return {getTitle, getDescription, getDueDate, getPriority, getNotes};
};
 
//projects carry name and a todo list
const ProjectsFactory = (title) => {
    let toDoList = [];
    const getTitle = () => title;
    const getToDoList = () => toDoList;
    return {getTitle, getToDoList};
};

//manages a list of projects
const ProjectController = (() => {
    let projectList = [];
    const addProject = (project) => {
        projectList.push(project);
    };
    const getProjectList = () => projectList;

    return{addProject, getProjectList}
})();

//manages the todo-list for each project
const ToDoController = (() => {
    //add a todo to a project
    const addToDo = (todo, project) => {
        project.getToDoList().push(todo);
    };


    return{addToDo}
})();

const OnLoad = (() => {
    const defaultProject = ProjectsFactory("Default Project");
    const addDefaultProject = () => ProjectController.addProject(defaultProject);
    return {addDefaultProject};
})();



OnLoad.addDefaultProject();
const project2 = ProjectsFactory("Project 2");
const todo1 = TodoFactory("Name", "Description", "DueDate", "Priority", "Notes");
//add a project to project list
ProjectController.addProject(project2);
//add todo to a project
ToDoController.addToDo(todo1, project2);
console.log(ProjectController.getProjectList());
//get title of todo in project 2
console.log(project2.getToDoList()[0].getTitle());



//backlog:
//make description, due date, priority and notes optional
//set todos as complete
//change todo priority
//change name etc.

//DOM modules