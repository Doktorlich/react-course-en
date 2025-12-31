// our-domain.com/news/something-important


import { useRouter } from "next/router";

export default  function DetailPage() {
    const route = useRouter()

    console.log(route.query.newsId);

    return (
        <>
            <h1>Detail Page</h1>

        </>
    );
}
