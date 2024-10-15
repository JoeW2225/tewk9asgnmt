'use client'
import React, { useState } from "react";
import { NewBiosloganFormData } from "@/app/profile/profile.type"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import ProfileEnterBio from '@/app/styling/profileStyling.module.css'
import ProfileEnterSlo from '@/app/styling/profileStyling.module.css'
import ProfileForm from '@/app/styling/profileStyling.module.css'
import ProfileButton from '@/app/styling/profileStyling.module.css'


interface  NewBiosloganProps {
    newBiosloganServerAction: (formData: NewBiosloganFormData) => Promise<void>

}

const startValue: NewBiosloganFormData = {
    slogan: "",
    bio: ""
}

export default function NewBiosloganClient({ newBiosloganServerAction }: NewBiosloganProps) {

    const [values, setValues] = useState(startValue)

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const myData = Object.fromEntries(formData.entries()) as NewBiosloganFormData

        newBiosloganServerAction(myData)
        event.currentTarget.reset()
        window.location.reload()
    }

    function handleInputChange(event: React.FormEvent<HTMLTextAreaElement>) {
        const { name, value } = event.currentTarget
        setValues({
            ...values,
            [name]: value,
            
})

    } 

    return (
        <>
            <form onSubmit={handleSubmit} className={ProfileForm.profileForm}>
                <Textarea className={ProfileEnterSlo.profileEnterSlo}
                    value = {values.slogan}
                    name = "slogan"
                    placeholder = "Enter your slogan..."
                    onChange={handleInputChange}
                />
                <Textarea className={ProfileEnterBio.profileEnterBio}
                    value = {values.bio}
                    name = "bio"
                    placeholder = "Enter your bio..."
                    onChange={handleInputChange}
                />
                <Button className={ProfileButton.profilebutton} type="submit">Submit</Button>
            </form>
        </>
    )
}