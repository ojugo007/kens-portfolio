import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import emailjs from '@emailjs/browser';

import {
  Field,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FaUser } from "react-icons/fa";
import { MdAlternateEmail, MdEmail } from "react-icons/md";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Please enter a valid email"),
  message: z.string().min(1, "Message is required"),
});

export default function ContactForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });


  const onSubmit = async ( values) => {
    try {
      const response = await emailjs
        .send(
          import.meta.env.VITE_SERVICE_ID,
          import.meta.env.VITE_TEMPLATE_ID,
          {
            from_name : values.name,
            reply_to : values.email,
            message : values.message
          },
           
          import.meta.env.VITE_PUBLIC_KEY
        )

        if(response.status === 200){
          toast.success("Form submitted successfully");
          form.reset();          
        }else {
          toast.error("Something went wrong. Please try again.");
          console.warn("Unexpected response:", response);
        }

        
        // console.log(JSON.stringify(values, null, 2));
        
      } catch (error) {
        console.error("Form submission error", error);
        toast.error("Failed to submit the form. Please try again.");
      }
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6 w-full p-6 bg-card flex flex-col "
    >
      <Field>
        <div className="flex items-stretch w-full h-12.5 ">
          <FieldLabel htmlFor="name" className={"p-4 bg-surface-alt text-ink-muted cursor-pointer"}> <FaUser /> </FieldLabel>
          <Input
            id="name"
            placeholder="Name"
            {...form.register("name")}
            className={"h-full rounded-none bg-card-alt text-[12px] text-ink-muted placeholder:text-[12px] font-medium border-0 ring-0 focus-visible:ring-0 focus-visible:outline-none w-full"}
          />

        </div>


        <FieldError className={"text-red-400 text-[10px] text-left"} >
          {form.formState.errors.name?.message}
        </FieldError>
      </Field>

      <Field>
        <div className="flex items-stretch w-full h-12.5 ">

          <FieldLabel htmlFor="email" className={"p-4 bg-surface-alt text-ink-muted cursor-pointer"}><MdAlternateEmail />
          </FieldLabel>

          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            {...form.register("email")}
            className={"h-full rounded-none bg-card-alt text-[12px] text-ink-muted placeholder:text-[12px] font-medium border-0 ring-0 focus-visible:ring-0 focus-visible:outline-none w-full"}
          />
        </div>

        <FieldError className={"text-red-400 text-[10px] text-left"} >
          {form.formState.errors.email?.message}
        </FieldError>
      </Field>

      <Field>
        <div className="flex items-stretch w-full h-37.5 ">

          <FieldLabel htmlFor="message" className={"p-4 bg-surface-alt text-ink-muted flex items-start  transition-all ease-in-out duration-200 cursor-pointer "} ><MdEmail /></FieldLabel>

          <Textarea
            id="message"
            placeholder="Tell me about your project..."
            rows={6}
            {...form.register("message")}
            className={"h-full rounded-none bg-card-alt text-[12px] text-ink-muted placeholder:text-[12px] font-medium border-0 ring-0 focus-visible:ring-0 focus-visible:outline-none pt-4 max-w-full"}
          />
        </div>

        <FieldError className={"text-red-400 text-[10px] text-left"} >
          {form.formState.errors.message?.message}
        </FieldError>
      </Field>

      <Button
        type="submit"
        disabled={form.formState.isSubmitting}
        className="px-4 py-2 bg-accent w-37.5 text-[#382400] uppercase text-[12px] font-bold tracking-widest cursor-pointer transition-all duration-600 ease-in-out text-center hover:tracking-wider rounded-none "
      >
        {form.formState.isSubmitting ? "Sending..." : "Submit"}
      </Button>
    </form>
  );
}