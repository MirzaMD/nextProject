"use client"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"

const contactsSchema = z.object({
    name: z.string().max(10, "Can't be more than 10 characters"),
    num: z.string()
        .min(10, "Must contain 10 digits")
        .max(10, "Can only be 10 digits")
        .transform((value) => Number(value))
})

type ContactFormValues = z.infer<typeof contactsSchema>

export default function AddContactPage() {
    const router = useRouter()
    const { 
        register, 
        handleSubmit, 
        reset, 
        formState: { errors, isSubmitting } 
    } = useForm<ContactFormValues>({ resolver: zodResolver(contactsSchema) })

    async function onSubmit(data: ContactFormValues) {
        try {
            const response = await fetch("/api/contacts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
            if (!response.ok) throw new Error("Failed to save contact")

            reset()  // Reset form fields
            router.push("/") // Navigate back to home
        } catch (error) {
            console.error("Some error has taken place:", error)
        }
    }

    return (
        <form 
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 p-4 max-w-md mx-auto border border-gray-500 rounded-lg mt-20"
        >
            {/* Name Field */}
            <div className="flex flex-col">
                <label className="font-semibold">Name:</label>
                <input 
                    {...register("name")}
                    type="text"
                    className="border p-2 rounded-md"
                />
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            </div>

            {/* Number Field */}
            <div className="flex flex-col">
                <label className="font-semibold">Phone Number:</label>
                <input 
                    {...register("num")}
                    type="text"
                    className="border p-2 rounded-md"
                />
                {errors.num && <p className="text-red-500">{errors.num.message}</p>}
            </div>

            {/* Buttons */}
            <div className="flex justify-between">
                <button 
                    type="button" 
                    onClick={() => router.push("/")} 
                    className="bg-gray-500 text-white px-4 py-2 rounded-md"
                >
                    Cancel
                </button>
                <button 
                    type="submit" 
                    disabled={isSubmitting} 
                    className="bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                    {isSubmitting ? "Saving..." : "Save"}
                </button>
            </div>
        </form>
    )
}
