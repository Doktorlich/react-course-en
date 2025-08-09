import ProjectsSidebar from "./components/ProjectsSidebar.jsx";
import NewProject from "./components/NewProject.jsx";
import NoProjectSection from "./components/NoProjectSection.jsx";
import { useState } from "react";
import SelectedProject from "./components/SelectedProject.jsx";

function App() {
    const [projectsState, setProjectsState] = useState({
        selectedProjectId: undefined,
        projects: [],
        tasks: [],
    });
    console.log(projectsState);

    function handleAddTask(text) {
        setProjectsState(prevState => {
            const newTask = {
                text: text,
                projectId: prevState.selectedProjectId,
                id: Math.random(),
            };
            return {
                ...prevState,
                tasks: [newTask, ...prevState.tasks],
            };
        });
    }

    function handleDeleteTask(taskId) {
        setProjectsState(prevState => {
            return {
                ...prevState,
                tasks: prevState.tasks.filter(task => task.id !== taskId),
            };
        });
    }

    function handleSelectProject(id) {
        setProjectsState(prevState => {
            return {
                ...prevState,
                selectedProjectId: id,
            };
        });
    }
    function handleDeleteProject(id) {
        setProjectsState(prevState => {
            return {
                ...prevState,
                selectedProjectId: undefined,
                projects: prevState.projects.filter(project => {
                    return project.id !== id;
                }),
            };
        });
    }

    function handleStartAddProject() {
        setProjectsState(prevState => {
            return {
                ...prevState,
                selectedProjectId: null,
            };
        });
    }

    function handleCancelAddProject() {
        setProjectsState(prevState => {
            return {
                ...prevState,
                selectedProjectId: undefined,
            };
        });
    }
    function handleAddProject(projectFormData) {
        setProjectsState(prevState => {
            const projectId = {
                ...projectFormData,
                id: Math.random(),
            };
            return {
                ...prevState,
                projects: [...prevState.projects, projectId],
            };
        });
    }

    function handleResetCreateProject() {
        setProjectsState(prevState => {
            return {
                ...prevState,
                selectedProjectId: undefined,
            };
        });
    }
    const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectId);

    let content = (
        <SelectedProject
            project={selectedProject}
            onDelete={handleDeleteProject}
            onAddTask={handleAddTask}
            onDeleteTask={handleDeleteTask}
            tasks={projectsState.tasks.filter(task => task.projectId === projectsState.selectedProjectId)}
        />
    );
    if (projectsState.selectedProjectId === undefined) {
        content = <NoProjectSection onStartAddProject={handleStartAddProject} />;
    } else if (projectsState.selectedProjectId === null) {
        content = <NewProject onAddData={handleAddProject} onReset={handleResetCreateProject} onCancel={handleCancelAddProject} />;
    }

    return (
        <main className="h-screen my-8 flex gap-8">
            <ProjectsSidebar
                onStartAddProject={handleStartAddProject}
                projectsState={projectsState}
                onSelectProject={handleSelectProject}
                selectedProjectId={projectsState.selectedProjectId}
            />
            {content}
        </main>
    );
}

export default App;
