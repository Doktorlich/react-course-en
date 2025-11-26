import AuthForm from "../components/AuthForm";
import PageContent from "../components/PageContent";
import { redirect } from "react-router-dom";

function AuthenticationPage() {
    return (
        <PageContent>
            <AuthForm />
        </PageContent>
    );
}

export default AuthenticationPage;

export async function action({ request }) {
    const url = new URL(request.url);
    const mode = url.searchParams.get("mode");

    if (mode !== "login" && mode !== "signup") {
        throw new Response(JSON.stringify({ message: "Unsupported mode." }), { status: 422 });
    }

    const formData = await request.formData();
    const data = {
        email: formData.get("email"),
        password: formData.get("password"),
    };

    const response = await fetch(`http://localhost:8080/${mode}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
    });
    if (response.status === 422 || response.status === 401) {
        return response;
    }
    if (!response.ok) {
        throw new Response(JSON.stringify({ message: "Could not authenticate user." }), {
            status: 500,
        });
    }

    const resData = await response.json();
    const token = resData.token;
    localStorage.setItem("token", token);
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);
    localStorage.setItem("expiration", expiration.toISOString());
    return redirect(mode === "login" ? "/" : `/auth?mode=login`);
}
