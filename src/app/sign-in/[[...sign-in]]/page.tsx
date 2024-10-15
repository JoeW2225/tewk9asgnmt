import { SignIn } from '@clerk/nextjs'

export default function Page() {


    return ( 
        <div className='flex items-center justify-center flex-col gap-10'>
            <h2 className='text-2xl'>Sign-in</h2>
            <SignIn />
        </div>
    
    )
}