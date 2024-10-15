import { SignUp } from '@clerk/nextjs'

export default function Page() {
    return ( 
        <div className='flex items-center justify-center flex-col gap-10'>
            <h2 className='text-2xl'>Sign-up</h2>
            <SignUp />
        </div>
    
    )
}