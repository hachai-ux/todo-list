//factory functions set up and return the new object when you call the function

const TodoItemFactory = (title, description, dueDate, priority, notes) => {
    const getTitle = () => title;
    const getDescription  = () => description;
    const getDueDate = () => dueDate;
    const getPriority = () => priority;
    const getNotes = () => notes;
    return {getTitle, getDescription, getDueDate, getPriority, getNotes};
};
 
const ProjectsFactory = (title) => {
        let toDoList = [];
        const getTitle = () => title;
    return {title, toDoList};
};


const DomController = () => {

};

const ProjectController = (() => {
    let projectList = [];
    const addProject = (project) => {
        projectList.push(project);
    };
    const addToDo = (project, todo) => {
        project.toDoList.push(todo);
    };
    const getProjectList = () => projectList;

    return{addProject, addToDo, getProjectList}
})();


const OnLoad = (() => {
    const defaultProject = ProjectsFactory("Default Project");
    const addDefaultProject = () => ProjectController.addProject(defaultProject);
    return {addDefaultProject};
})();



OnLoad.addDefaultProject();
console.log(ProjectController.getProjectList());