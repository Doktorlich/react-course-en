import ProjectsSidebar from "./components/ProjectsSidebar.jsx";
import NewProject from "./components/NewProject.jsx";
import NoProjectSection from "./components/NoProjectSection.jsx";

function App() {
    return (
        <main className="h-screen my-8 flex gap-8">
            <ProjectsSidebar />
            <NoProjectSection/>
            {/*<NewProject />*/}
        </main>
    );
}

export default App;
