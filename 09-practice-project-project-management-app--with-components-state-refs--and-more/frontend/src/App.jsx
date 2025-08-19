import ProjectsSidebar from "./components/ProjectsSidebar.jsx";
import NewProject from "./components/NewProject.jsx";
import NoProjectSection from "./components/NoProjectSection.jsx";
import { Fragment, useEffect, useState } from "react";
import SelectedProject from "./components/SelectedProject.jsx";
import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import Loader from "./components/Loader.jsx";
import EditProject from "./components/EditProject.jsx";
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/";
// const API_BASE_URL = "http://localhost:8080/";
function App() {
    const navigate = useNavigate();
    const [projectsState, setProjectsState] = useState({
        selectedProjectId: undefined,
        projects: [],
        tasks: [],
    });
    const [isLoading, setIsLoading] = useState(true);

    const [currentDragTask, setCurrentDragTask] = useState(null);

    const { projectId } = useParams();

    useEffect(() => {
        fetch(`${API_BASE_URL}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                const allTasks = data.projects.flatMap(project =>
                    project.tasks.map(task => ({
                        ...task,
                        projectId: project._id, // Добавляем projectId к каждой задаче
                    })),
                );
                return setProjectsState(prevState => {
                    return {
                        ...prevState,
                        projects: [...data.projects],
                        selectedProjectId: projectId || undefined,
                        tasks: allTasks,
                    };
                });
            })
            .catch(error => {
                console.error("Error:", error);
            })
            .finally(() => setIsLoading(false));
    }, []);

    // работа с task
    function handleAddTask(text) {
        console.log("projectsState.selectedProjectId", projectsState.selectedProjectId);
        fetch(`${API_BASE_URL}project/${projectsState.selectedProjectId}/create-task`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                text: text,
            }),
        })
            .then(response => {
                // console.log("response.json()", response.json());
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                console.log("DATA TASK", data);
                setProjectsState(prevState => {
                    const newTask = {
                        _id: data.task._id,
                        text: data.task.text,
                        projectId: projectsState.selectedProjectId,
                    };
                    return {
                        ...prevState,
                        tasks: [newTask, ...prevState.tasks],
                    };
                });
            })
            .catch(error => {
                console.error("Error:", error);
            });
    }

    function handleDeleteTask(taskId) {
        fetch(`${API_BASE_URL}project/${projectsState.selectedProjectId}/${taskId}/delete-task`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json", // Обязательно для non-simple запросов
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                return response.json();
            })
            .then(data => {
                return setProjectsState(prevState => {
                    return {
                        ...prevState,
                        tasks: prevState.tasks.filter(task => {
                            return task._id.toString() !== taskId.toString();
                        }),
                    };
                });
            })
            .catch(err => {
                console.log(err);
            });

        // navigate("/");
    }

    function handleUpdateTask(taskId, updatedText) {
        fetch(`${API_BASE_URL}project/${projectsState.selectedProjectId}/${taskId}/update-task`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                text: updatedText,
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                return setProjectsState(prevState => {
                    return {
                        ...prevState,
                        tasks: prevState.tasks.map(task => {
                            return task._id === taskId ? { ...task, text: updatedText } : task;
                        }),
                    };
                });
            })
            .catch(error => {
                console.error("Error:", error);
            });
    }

    function handleSelectProject(id) {
        fetch(`${API_BASE_URL}project/${id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                console.log("select data", data);
                return setProjectsState(prevState => {
                    return {
                        ...prevState,
                        selectedProjectId: id,
                        tasks: [...data.project.tasks],
                    };
                });
            })
            .catch(error => {
                console.error("Error:", error);
            });
        navigate(`/project/${id}`);
    }
    function handleDeleteProject(id) {
        fetch(`${API_BASE_URL}project/${id}/delete`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json", // Обязательно для non-simple запросов
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .catch(err => {
                console.log(err);
            });
        setProjectsState(prevState => {
            return {
                ...prevState,
                selectedProjectId: undefined,
                projects: prevState.projects.filter(project => {
                    return project._id.toString() !== id.toString();
                }),
            };
        });
        navigate("/");
    }

    function handleStartAddProject() {
        setProjectsState(prevState => {
            return {
                ...prevState,
                selectedProjectId: null,
            };
        });
        navigate("/create-project");
    }

    function handleCancelAddProject() {
        setProjectsState(prevState => {
            return {
                ...prevState,
                selectedProjectId: undefined,
            };
        });
        navigate("/");
    }

    function handleCancelEditProject(id) {
        setProjectsState(prevState => {
            return {
                ...prevState,
                selectedProjectId: id,
            };
        });
        navigate(`/project/${id}`);
    }
    function handleAddProject(projectFormData) {
        fetch(`${API_BASE_URL}create-project/create`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: projectFormData.title,
                description: projectFormData.description,
                dueDate: projectFormData.dueDate,
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                return setProjectsState(prevState => {
                    const projectId = {
                        ...projectFormData,
                        _id: data.project._id,
                    };
                    return {
                        ...prevState,
                        projects: [...prevState.projects, projectId],
                    };
                });
            })
            .catch(err => {
                console.log(err);
            });
        navigate("/");
    }
    function handleUpdateProjectData(updateProjectData) {
        fetch(`${API_BASE_URL}project/${updateProjectData._id}/update-project`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: updateProjectData.title,
                description: updateProjectData.description,
                dueDate: updateProjectData.dueDate,
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                return setProjectsState(prevState => {
                    return {
                        ...prevState,
                        projects: [
                            ...prevState.projects.map(project => {
                                return project._id === updateProjectData._id
                                    ? {
                                          ...project,
                                          title: updateProjectData.title,
                                          description: updateProjectData.description,
                                          dueDate: updateProjectData.dueDate,
                                      }
                                    : project;
                            }),
                        ],
                        selectedProjectId: updateProjectData._id,
                    };
                });
            })
            .catch(err => {
                console.log(err);
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

    function handleDragStart(event, task) {
        console.log("drag start", task);
        setCurrentDragTask(task);
        event.target.classList.add("opacity-40");
        console.log("currentDragTask", currentDragTask);
    }
    function handleDragEnd(event, task) {
        event.target.classList.remove("opacity-40");
    }
    function handleDragOver(event, task) {
        event.preventDefault();
    }

    function handleDrop(event, droppedTask) {
        event.preventDefault();
        const updatePromises = [
            fetch(`${API_BASE_URL}project/${projectsState.selectedProjectId}/${currentDragTask._id}/update-order`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    order: droppedTask.order, // Берем order задачи, на которую бросили
                }),
            }),

            fetch(`${API_BASE_URL}project/${projectsState.selectedProjectId}/${droppedTask._id}/update-order`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    order: currentDragTask.order, // Берем order перетащенной задачи
                }),
            }),
        ];

        Promise.all(updatePromises)
            .then(responses => {
                const errorResponse = responses.find(response => !response.ok);
                if (errorResponse) {
                    throw new Error("Network response was not ok");
                }
                return Promise.all(responses.map(r => r.json()));
            })
            .then(data => {
                setProjectsState(prevState => ({
                    ...prevState,
                    tasks: prevState.tasks.map(item => {
                        if (item._id === currentDragTask._id) {
                            return { ...item, order: droppedTask.order };
                        }
                        if (item._id === droppedTask._id) {
                            return { ...item, order: currentDragTask.order };
                        }
                        return item;
                    }),
                }));
                setCurrentDragTask(null);
            })
            .catch(error => {
                console.error("Error updating tasks:", error);
            });
    }

    const sortTask = (a, b) => {
        if (a.order > b.order) {
            return 1;
        } else {
            return -1;
        }
    };

    const selectedProject = projectsState.projects.find(project => project._id === projectsState.selectedProjectId);
    return (
        <main className="h-screen my-8 flex gap-8">
            <ProjectsSidebar
                onStartAddProject={handleStartAddProject}
                projectsState={projectsState}
                onSelectProject={handleSelectProject}
                selectedProjectId={projectsState.selectedProjectId}
            />
            <Routes>
                <Route path={"/"} element={<NoProjectSection onStartAddProject={handleStartAddProject} />} />
                <Route
                    path={"/create-project"}
                    element={
                        <NewProject onAddData={handleAddProject} onReset={handleResetCreateProject} onCancel={handleCancelAddProject} />
                    }
                />
                <Route
                    path={`/project/:projectId`}
                    element={
                        isLoading ? (
                            <Loader />
                        ) : (
                            <SelectedProject
                                project={selectedProject}
                                onDelete={handleDeleteProject}
                                onAddTask={handleAddTask}
                                onDeleteTask={handleDeleteTask}
                                tasks={projectsState.tasks.sort(sortTask)}
                                onSelectProject={handleSelectProject}
                                onUpdateTask={handleUpdateTask}
                                dragStart={handleDragStart}
                                dragEnd={handleDragEnd}
                                dragOver={handleDragOver}
                                drop={handleDrop}
                            />
                        )
                    }
                />
                <Route
                    path={"/project/:projectId/edit-project"}
                    element={
                        <EditProject
                            project={selectedProject}
                            onCancelEditProject={handleCancelEditProject}
                            onUpdateProjectData={handleUpdateProjectData}
                        />
                    }
                />
            </Routes>
            {/*{content}*/}
        </main>
    );
}

export default App;
