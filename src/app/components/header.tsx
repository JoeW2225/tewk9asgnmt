import Link from "next/link"
import { auth } from '@clerk/nextjs/server'
import { UserButton } from '@clerk/nextjs'

export default async function header() {
    const { userId } = auth()


    return (
    <div className="bg-slate-400">
        <div className="container mx-auto flex items-center justify-between py-4">
            <div>
                {userId ? (
                    <div className="flex gap-4 items-center">
                        <Link href='/'>Home</Link>
                        <UserButton/>
                    </div>
                ) : (
                    <div className="flex gap-4 items-center">
                        <Link href='/sign-in'>Sign In</Link>
                        <Link href='/sign-up'>Sign Up</Link>
                    </div>
                )}
            </div>
        </div>
    </div>
    )
}
//!^ if the user is signed in, display the UserButton feature, otherwise display sign-in/sign-up
