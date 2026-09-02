import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"

import {
    Field,
    FieldLabel,
    FieldError,
} from "@/components/ui/field"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { MdAlternateEmail } from "react-icons/md"
import { RiLockPasswordLine } from "react-icons/ri"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"

const formSchema = z.object({
    email: z.string().email("Enter a valid email address"),
    password: z.string().min(1, "Password is required"),
})


const AdminLogin = () => {
    const [hidePassword, setHidePassword] = useState(true)
    const navigate = useNavigate()
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })


    async function onSubmit(values) {
        const API_URL = import.meta.env.VITE_API_URL
        try {
            const response = await axios.post(`${API_URL}/auth/signin`, values)
            const {message, success, data} = response.data
            if(success){
                localStorage.setItem("token", data.token)
                toast.success(message)
                navigate("/admin/dashboard", {replace:true})
            }
        } catch (error) {
            toast.error(error.response.data.message ||"Failed to submit the form. Please try again." )
        }
    }


    return (
        <section className="min-h-screen bg-base text-ink flex items-center justify-center px-4 py-10">

            <div className="w-full max-w-6xl flex justify-center">

                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="
                        w-[50%]
                        max-w-2xl
                        min-[701px]:w-[50%]
                        max-[700px]:w-full
                        bg-card
                        p-6
                        sm:p-8
                        lg:p-10
                        flex
                        flex-col
                        shadow-sm
                        border
                        border-edge
                    "
                >

                    {/* Header */}
                    <div className="mb-10 text-left">

                        <span className="
                            inline-block
                            text-accent
                            text-[10px]
                            font-bold
                            tracking-[0.25em]
                            uppercase
                            mb-3
                        ">
                            Admin Portal
                        </span>

                        <h2 className="
                            text-[24px]
                            sm:text-[28px]
                            font-semibold
                            text-ink
                            tracking-tight
                            mb-2
                        ">
                            Welcome Back!
                        </h2>

                        <p className="
                            text-[12px]
                            sm:text-[13px]
                            text-ink-muted
                            leading-5
                        ">
                            Sign in to access your dashboard.
                        </p>

                    </div>


                    {/* Email */}
                    <Field className="mb-7">

                        <div className="flex items-stretch w-full h-12.5">

                            <FieldLabel
                                htmlFor="email"
                                className="
                                    w-13
                                    shrink-0
                                    flex
                                    items-center
                                    justify-center
                                    bg-surface-alt
                                    text-ink-muted
                                    cursor-pointer
                                    border-r
                                    border-edge
                                "
                            >
                                <MdAlternateEmail size={18} />
                            </FieldLabel>

                            <Input
                                id="email"
                                type="email"
                                placeholder="your@email.com"
                                {...form.register("email")}
                                className="
                                    h-full
                                    rounded-none
                                    bg-card-alt
                                    text-[12px]
                                    text-ink
                                    placeholder:text-[12px]
                                    placeholder:text-ink-muted
                                    font-medium
                                    border-0
                                    ring-0
                                    focus-visible:ring-0
                                    focus-visible:outline-none
                                    w-full
                                "
                            />

                        </div>

                        <FieldError className="text-red-400 text-[10px] text-left mt-2">
                            {form.formState.errors.email?.message}
                        </FieldError>

                    </Field>


                    {/* Password */}
                    <Field className="mb-8">

                        <div className="flex items-stretch w-full h-12.5">

                            <FieldLabel
                                htmlFor="password"
                                className="
                                    w-13
                                    shrink-0
                                    flex
                                    items-center
                                    justify-center
                                    bg-surface-alt
                                    text-ink-muted
                                    cursor-pointer
                                    border-r
                                    border-edge
                                "
                            >
                                <RiLockPasswordLine size={18} />
                            </FieldLabel>

                            <Input
                                id="password"
                                type= {hidePassword? "password" : "text"}
                                placeholder="••••••••"
                                {...form.register("password")}
                                className="
                                    h-full
                                    rounded-none
                                    bg-card-alt
                                    text-[12px]
                                    text-ink
                                    placeholder:text-[12px]
                                    placeholder:text-ink-muted
                                    font-medium
                                    border-0
                                    ring-0
                                    focus-visible:ring-0
                                    focus-visible:outline-none
                                    w-full
                                "
                                
                            />
                            <span 
                            onClick={()=>setHidePassword(!hidePassword)}
                            className="
                                    w-13
                                    shrink-0
                                    flex
                                    items-center
                                    justify-center
                                    bg-surface-alt
                                    text-ink-muted
                                    cursor-pointer
                                    border-r
                                    border-edge
                                ">
                                    {/* {hidePassword?(<p>show</p>):(<p>hide</p>)} */}
                                    {hidePassword?(<FaRegEye/>):(<FaRegEyeSlash/>)}
                                </span>

                        </div>

                        <FieldError className="text-red-400 text-[10px] text-left mt-2">
                            {form.formState.errors.password?.message}
                        </FieldError>

                    </Field>


                    {/* Submit */}
                    <Button
                        type="submit"
                        disabled={form.formState.isSubmitting}
                        className="
                            h-12
                            px-4
                            bg-accent
                            w-full
                            text-[#382400]
                            uppercase
                            text-[11px]
                            font-bold
                            tracking-[0.2em]
                            cursor-pointer
                            transition-all
                            duration-500
                            ease-in-out
                            hover:tracking-[0.28em]
                            rounded-none
                            border-0
                        "
                    >
                        {form.formState.isSubmitting
                            ? "Logging in..."
                            : "Sign In"
                        }
                    </Button>


                    {/* Footer */}
                    <div className="mt-8 pt-5 border-t border-edge">

                        <p className="
                            text-[10px]
                            text-ink-muted
                            text-center
                            uppercase
                            tracking-widest
                        ">
                            Authorized access only
                        </p>

                    </div>

                </form>

            </div>

        </section>
    )
}

export default AdminLogin
