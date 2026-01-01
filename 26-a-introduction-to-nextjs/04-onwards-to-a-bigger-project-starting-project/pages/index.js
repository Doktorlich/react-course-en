import MeetupList from "../components/meetups/MeetupList";

import { MongoClient } from "mongodb";
import { Fragment } from "react";
import Head from "next/head";

function HomePage(props) {
    return (
        <Fragment>
            <Head>
                <title>React Meetups</title>
                <meta
                    name={"description"}
                    content={"Browse a huge list of highly active React meetups!"}
                />
            </Head>
            <MeetupList meetups={props.meetups} />
        </Fragment>
    );
}
// функция которая реализует алгоритм  рендера через  Static Generation
export async function getStaticProps() {
    //fetch data from an API

    const client = await MongoClient.connect(process.env.NEXT_PUBLIC_API_URL);
    const db = client.db();

    const meetupsCollection = db.collection("meetups");
    const meetups = await meetupsCollection.find().toArray();

    await client.close();

    return {
        props: {
            meetups: meetups.map(meetup => {
                return {
                    id: meetup._id.toString(),
                    title: meetup.title,
                    image: meetup.image,
                    address: meetup.address,
                    description: meetup.description,
                };
            }),
        },
        // свойство , которое заставляет перегенерировать данные на сервере в значении указывается временной интервал
        revalidate: 1,
    };
}

// // функция которая реализует алгоритм  рендера через  SSR
// export async function getServerSideProps(){
//     //fetch data from an API
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS,
//         }
//     }
//
// }

export default HomePage;
