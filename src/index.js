import './style.css';
import {OnLoad} from './onLoad.js';
import {LocalStorageFacilitator} from './storage.js';

 


OnLoad.loadInitialUI();
LocalStorageFacilitator.loadProjects();

if(localStorage.getItem('Projects') === null){
OnLoad.addDefaultProject();
};

LocalStorageFacilitator.saveProjects();

/*
//mockup testing
const project2 = ProjectsFactory("Project 2");
const toDo1 = TodoFactory("Name", "Description", "DueDate", "Priority", "Notes");
//add a project to project list
ProjectController.addProject(project2);
//add todo to a project
ToDoController.addToDo(toDo1, project2);
console.log(ProjectController.getProjectList());
//get title of todo in project 2
console.log(project2.getToDoList()[0].getTitle());
*/

//backlog:

//set todos as complete +1
//change todo priority +1
//change name etc.

//DOM modules +1

//execute functions on load
//recognize which project page is open for the to-dos
//getOpenProject function
//setOpenProject function(has to do with dom?)
//where to put getOpenProject?

//connect dom element to the project object(map or iterating over ids?) +1

//view all projects

//make into ES6 modules
//webpack

//open form only once until it's closed +1
//createProject module+1

//make new project button work +1

//make to-dos into buttons +1

//make to-do associator +1
//open to-dos modal window; write_openToDoModal function +1
//make submit and cancel button working +1
//open edit to-do form only once +1
//delete to-do+1


//make sidebar and content side by side +1
//show projects in a vertical list +1
//show to-dos in a vertical list +1
//format to-dos in a set frame +1
//make modal windows for adding and editing forms

//localStorage
