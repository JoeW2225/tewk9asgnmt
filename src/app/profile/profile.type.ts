//? TS TYPE DEFINITIONS FOR PROFILE FILE:

//! For displaying our posts
export type post = {
    clerk_id: string,
    imageurl: string,
    firstname: string,
    lastname: string,
    post: string
}

//! This is the client-side for when the user submits a slogan & bio posts:
// Here we are only getting the post field info, we don't need the rest
export type NewBiosloganFormData = {
    slogan: string,
    bio: string
}