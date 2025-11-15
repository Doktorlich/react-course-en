import MainNavigation from "../components/MainNavigation";

export default function ErrorPage() {
    return <>
        <MainNavigation/>
        <main className={"content"}>
            <h1> An error occurred 404</h1>
            <p>Could not find this page!</p>
        </main>
    </>;
}