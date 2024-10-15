import { connect } from "@/app/utils/connect"
import { auth } from "@clerk/nextjs/server";
import { Post, NewPostFormData } from "./feed.type";
import NewPostComponent from "@/app/components/feedComponent/NewPostComponent"
import Image from 'next/image';

export default async function FeedPage() {
    const db = connect()
    const { userId } = auth()
    //^ getting the user from Clerk
    

    const profileResult = await db.query(`
        SELECT id AS clerk_id, imageurl, firstname, lastname
        FROM profiles
        WHERE clerk_id = $1;`,[userId]);

    const {clerk_id} = profileResult.rows[0]

    const postList: Post[] = (await db.query(`
        SELECT profiles.clerk_id, profiles.imageurl, profiles.firstname, profiles.lastname, feed.post 
        FROM feed 
        INNER JOIN profiles
        ON feed.clerk_id = profiles.id
        AND feed.firstname_id = profiles.id
        AND feed.lastname_id = profiles.id
        AND feed.imageUrl_id = profiles.id`)).rows
    //^ fetching all posts from feed table in db
    console.log(postList);

    //! POSTING new formData to db:
    async function newPostServerAction(formData: NewPostFormData) {
        'use server'
        const db = connect()
        const { post } = formData

        try {
            await db.query(`
                INSERT INTO feed (clerk_id, imageurl_id, firstname_id, lastname_id, post) 
                VALUES ($1, $2, $3, $4, $5)`,[clerk_id, clerk_id, clerk_id, clerk_id, post])
        } catch(error) {
            console.error("Inserting data failed",error)
        }
    }

    return (
        <>
            <div>
            {postList.map((post) => (
            <div key={post.clerk_id}>
            <Image
                className="rounded-full h-24 w-24 flex items-center justify-center"
                src={post.imageurl}
                alt={`${post.firstname} ${post.lastname}'s profile picture`}
                width={200}
                height={200}
            />
            <h5 className="m-4">{post.firstname} {post.lastname}</h5>
            <p className="m-4">{post.post}</p>
        </div>
        ))}
            </div>
            <div>
                <NewPostComponent newPostServerAction={newPostServerAction}/>
            </div>
        </>
    )
}

