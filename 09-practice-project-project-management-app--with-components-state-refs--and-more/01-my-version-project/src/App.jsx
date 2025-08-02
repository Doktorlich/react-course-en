import ProjectsSidebar from "./components/ProjectsSidebar.jsx";
import NewProject from "./components/NewProject.jsx";
import NoProjectSection from "./components/NoProjectSection.jsx";
import { useState } from "react";

function App() {
    // хук состояния , в котором храним объект
    const [projectsState, setProjectsState] = useState({
        selectedProject: undefined,
        projects: [],
    });
    // функция управления , которая работает с предыдущим состоянием и перезаписывает свойство selectedProjectId
    function handleStartAddProject() {
        setProjectsState(prevState => {
            return { ...prevState, selectedProjectId: null };
        });
    }
    // функция управления, которая работает с предыдущим состоянием и при её вызове создает
    // в предыдущем состоянии создает элемент массива с созданным на лету ID
    function handleAddProject(projectData) {
        setProjectsState(prevState => {
            const newProject = {
                ...projectData,
                id: Math.random(),
            };
            return { ...prevState, projects: [...prevState.projects, newProject] };
        });
    }

    console.log(projectsState);
    // условие отображения компонентов , если selectedProjectId равен null то в content выводим
    // компонент NewProject, который представляет из себя форму для ввода данных
    // если же selectedProjectId равен undefined то в content выводим компонент
    // NoProjectSection, который представляет из себя превью страницу по предложению создания нового "проекта"
    let content;
    if (projectsState.selectedProjectId === null) {
        // в компонент NewProject отправляем props onAdd в котором передаем функцию handleAddProject
        content = <NewProject onAdd={handleAddProject} />;
    } else if (projectsState.selectedProjectId === undefined) {
        // в компонент NoProjectSection отправляем props onAddProject в котором передаем функцию handleStartAddProject
        content = <NoProjectSection onAddProject={handleStartAddProject} />;
    }

    return (
        <main className="h-screen my-8 flex gap-8">
            <ProjectsSidebar onAddProject={handleStartAddProject} />
            {content}
        </main>
    );
}

export default App;
