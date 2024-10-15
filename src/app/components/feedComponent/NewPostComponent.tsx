'use client'
import React, { useState } from "react";
import { NewPostFormData } from "@/app/feed/feed.type";
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import PostStyling from "@/app/styling/feedStyling.module.css"
import FormStyling from "@/app/styling/feedStyling.module.css"


interface  NewPostProps {
    newPostServerAction: (formData: NewPostFormData) => Promise<void>
//^Carrying on from comments in feed, we need to use Promise<void> to tell TS that this is an async function that we are pushing through.
//^ Accepts only the 'post' field (column)
}

const startValue: NewPostFormData = {
    post: ""
}
//^ here we making sure the post field is set to empty (""), the NPFD has only one field, as per feed.type.ts

export default function NewPostComponent({ newPostServerAction }: NewPostProps) {
// ^here the client-side NewPostComponent is only capturing the 'post' field.

    const [values, setValues] = useState(startValue)

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
// ^we use the React.FormEvent...etc to let TS know that the 'event' is a form trigger type
        event.preventDefault()
        // ^prevents form data appearing in URL
        const formData = new FormData(event.currentTarget)
        const myData = Object.fromEntries(formData.entries()) as NewPostFormData
//^ the reason we do it this way & not .from Entries(formData) is due to a TS type safety thing:
// we are reinforcing that myData will have the right 'shape' aka one object being one property 'post' and one value being a 'string'
// if we don't do this, TS will error below on the newPSA(myData) (saying Error: Argument of type...), this is because TS
// can't be sure that the new data will match that of NewPFD
        newPostServerAction(myData)
        event.currentTarget.reset()
        //^ form reset on submission
        window.location.reload()
    }

    function handleInputChange(event: React.FormEvent<HTMLTextAreaElement>) {
        const { name, value } = event.currentTarget
//^ name refers to name of input field (post). value refers to the current value of what the user has typed

        setValues({
            //^ we update the values by changing setValues
            ...values,
            //^ spread op has all the existing values
            [name]: value,
            //^ live updates the specific field (post), with the new value just entered by the user.
            
})

    } 

    return (
        <>
            <form className= {FormStyling.formStyling} onSubmit={handleSubmit}>
                <Textarea className={PostStyling.postStyling}
                    value = {values.post}
                    name = "post"
                    placeholder = "🗣️..."
                    onChange={handleInputChange}
                />
                <Button type="submit">Post</Button>
            </form>
        </>
    )
}
