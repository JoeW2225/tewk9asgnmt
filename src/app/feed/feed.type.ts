//? TS TYPE DEFINITIONS FOR FEED FILE:

//! For displaying our posts
export type Post = {
    clerk_id: number,
    imageurl: string,
    firstname: string,
    lastname: string,
    post: string
}

//! This is the server-side part of the formData:
export type ServerPostData = {
    clerk_id: number;
    firstname: string;
    lastname: string;
    post: string;
}

//! This is the client-side for when the user submits only posts:
// Here we are only getting the post field info, we don't need the rest
export type NewPostFormData = {
    post: string;
}
