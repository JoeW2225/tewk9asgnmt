import { connect } from "@/app/utils/connect"
import { currentUser, auth  } from "@clerk/nextjs/server";
import { post, NewBiosloganFormData, profile } from "@/app/profile/profile.type"
import NewBiosloganClient from "@/app/components/profileComponent/NewBiosloComponent"
import Image from 'next/image';
import ProfileName from '@/app/styling/profileStyling.module.css'
import SloganStyle from '@/app/styling/profileStyling.module.css'
import BioStyle from '@/app/styling/profileStyling.module.css'
import ProfileNames from '@/app/styling/profileStyling.module.css'
import ProfilePost from '@/app/styling/profileStyling.module.css'
import PostTitle from '@/app/styling/profileStyling.module.css'
import BioSloForm from '@/app/styling/profileStyling.module.css'

export default async function ProfilePage() {
    'use server'
    const db = connect()
    const displayUser = await currentUser()
    const { userId } = auth()
    const imageUrl = displayUser?.imageUrl || '';
    const firstName = displayUser?.firstName || '';
    const lastName = displayUser?.lastName || '';
    const username = displayUser?.username || '';
    //^^ If displayUser?.username (or any of the others) is undefined or an empty string, 
    // it will fall back to the empty string '' on the right side of ||. This ensures that username always has a value, 
    // even if displayUser or username is missing. (called optional chaining, see reason why in this case in README.md)

    console.log(imageUrl)

    const clerkIdResult = await db.query(`
        SELECT id AS clerk_id
        FROM profiles
        WHERE clerk_id = $1`,[userId]);

    const {clerk_id, dbimageurl} = clerkIdResult.rows[0]

    if (dbimageurl !== dbimageurl) {
        await db.query(`
            UPDATE profiles
            SET dbImageUrl = $1
            WHERE clerk_id = $2`, [imageUrl, userId]);
    }

        //! Get the profile from the DB:
        const profileInfo = await db.query(`SELECT * FROM profiles WHERE clerk_id = $1`,
            [userId])

        const profile: profile[] = profileInfo.rows
        // we give the profile a type as we will use it on line 54 for the imageUrl
        
        //! If the profile doesn't exist, add to DB:
        if (profile.length === 0 ) {
            await db.query(`INSERT INTO profiles
                (clerk_id, username, firstname, lastname, imageUrl) VALUES ($1, $2, $3, $4, $5)`,
            [userId, username, firstName, lastName, imageUrl])
        }

        //! If the profile pic  URL doesn't match the URL in the DB:
        if (profile[0]?.imageUrl !== imageUrl) {
            //^ we're saying is: 
            // profile[0] looks at the first item in the array
            // , ?. (optional chaining)- checks if there is a first item in the profile[0] array,
            // if it doesn't exist, it won't try to access imageUrl.
            
            // so: profile[0]?.imageUrl means it will try to access the 1st item in the array, if it does it will
            // return the imageUrl, if it doesn't exist it will return undefined but NOT THROW AN ERROR because of ?

            // if the old DB imageUrl IS NOT the same as the current imgURL, then UPDATE DB:

            await db.query(`UPDATE profiles SET imageUrl = $1 WHERE clerk_id = $2`, [imageUrl, userId])
        }
        
        //! Get posts linked to the profile:
        const profilePosts: post[] = (await db.query(`
            SELECT profiles.clerk_id, profiles.firstname, profiles.lastname, feed.post FROM feed 
            INNER JOIN profiles
            ON feed.clerk_id = profiles.id 
            AND feed.firstname_id = profiles.id
            AND feed.lastname_id = profiles.id
            WHERE profiles.clerk_id = $1`,[userId])).rows

        //! Get bio & slogan
        const bioSlogan = (await db.query(`
            SELECT slogan, bio FROM bioslogan WHERE clerk_id = $1`, [clerk_id])).rows[0];
        
        //! If slogan or bio doesn't exist (empty), update the DB:
        if (!bioSlogan || !bioSlogan.slogan || !bioSlogan.bio) {
            //^ we're saying is: If there’s no bioSlogan record at all (!bioSlogan), 
            // or if there is a bioSlogan record but either the slogan or bio field is missing or empty, 
            // then the following code block will run:

            await db.query(`UPDATE bioslogan 
                SET slogan= $1, bio = $2
                WHERE clerk_id = $3`, [profile[0]?.slogan, profile[0]?.bio, clerk_id])
        }
            //^ see README.md for further notes about: [profile[0]?.slogan, profile[0]?.bio, clerk_id]

        //! POSTING new bio & slogan to db:
        async function newBiosloganServerAction(formData: NewBiosloganFormData) {
        'use server'
        const db = connect()
        const { slogan, bio } = formData

        try {
            await db.query(`
                INSERT INTO bioslogan (clerk_id, slogan, bio)
                VALUES ($1, $2, $3)
                ON CONFLICT (clerk_id)
                DO UPDATE SET slogan = EXCLUDED.slogan, bio = EXCLUDED.bio`,[clerk_id, slogan, bio])
        } catch(error) {
            console.error("Inserting data failed",error)
        }
    }
        

    return (
        <>
            <div className={ProfileName.profileName}>
                    <h2>Hello_ {firstName} {lastName}</h2>
            </div>
            <div>
                {bioSlogan && (
                    <div key={clerk_id}>
                        <h5 className={SloganStyle.sloganStyle}>{`Slogan_ ${bioSlogan.slogan || "No slogan yet."}`}</h5>
                        <h5 className={BioStyle.bioStyle}>{`Bio_ ${bioSlogan.bio || "No bio yet."}`}</h5>
                    </div>
                )}
            </div>
            <div className={BioSloForm.bioSloForm}>
                <NewBiosloganClient newBiosloganServerAction={newBiosloganServerAction}/>
            </div>
            <h2 className={PostTitle.postTitle}>Your Posts_</h2>
            <div>
                <Image className="rounded-full h-24 w-24 flex items-center justify-center" 
                src={imageUrl} 
                alt={`${firstName} ${lastName}'s profile picture`}
                width={200}
                height={200}/>
            </div>
            <div>
                {profilePosts.map((post) => (
                    <div key={post.clerk_id}>
                        <h5 className={ProfileNames.profileNames}>{post.firstname} | {post.lastname}</h5>
                        <p className={ProfilePost.profilePost}>{post.post}</p>
                    </div>
                ))}
            </div>
        </>
    )
}
