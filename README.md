## Week 9 Assignment Project

#### Sources:

https://clerk.com/docs/references/nextjs/clerk-middleware
https://clerk.com/docs/references/javascript/user/user
https://www.typescriptlang.org/docs/handbook/2/functions.html
https://www.typescriptlang.org/docs/handbook/typescript-tooling-in-5-minutes.html#interfaces
https://developer.mozilla.org/en-US/docs/Web/API/Event/currentTarget
https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forms_and_events/
https://www.youtube.com/watch?v=UqjJLhCm2-k&t=1026s&ab_channel=CandDev
https://clerk.com/docs/references/javascript/user/user
https://clerk.com/docs/references/backend/types/backend-user
https://www.w3schools.com/sql/sql_foreignkey.asp
https://nextjs.org/docs/pages/building-your-application/configuring/eslint#disabling-rules
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
(Matts screenshot on creating data types and using them in interfaces etc)

#### UI library used:

https://ui.shadcn.com/
(textbox and button)

#### Side notes:

**Optional chaining on profile/page.tsx**

In the specific case of line 22: const username = displayUser?.username || ''; >>>

Optional chaining prevents the app from crashing if displayUser is undefined (which could happen if the current user is not logged in or the data is still being fetched). Instead of throwing an error when trying to access username, it safely returns undefined and falls back to the empty string ''.

In the specific case of line 58: if (profile[0]?.imageUrl !== imageUrl) >>>

As above, we are preventing the site from crashing if there isn't a imageUrl (in the DB) in a nutshell.

In the specific case of line 93: [profile[0]?.slogan, profile[0]?.bio, clerk_id] >>>

Ensures that it only tries to access the slogan and bio properties if the first profile exists. If the array is empty or undefined, it won’t crash.

### Reflection:

Again, very challenging particularly when I initially decided I was going to use TS, then decided not too, then guilt-tripped myself into doing it again. Found it difficult to get going, the challenging part was linking Clerk and what I’m going to pull off it/what I can pull of it & how, combined with the DB usage/storage. A lot of moving parts and to top it off learning and using TS didn’t help (although I can only blame myself for that one).
Ultimately because I felt as though there was a lot of learning, back and forth about how I was going to do things, led to not being able to have time to implement as much as I wanted. Again, decided to sacrifice styling time for functional code learning time.
I was more determined to get the main functional elements working. Getting the profile pics up for each post was way harder than I had anticipated!

The Vercel upload was also a bit of a nightmare because I had used TS, but thankfully Sam came to the rescue!

I certainly know more about TS than I did previously which is a bonus, however much more learning to go.
