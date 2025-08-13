"use client";

import * as z from "zod";
// import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateCourse } from "@/app/actions/course";
import { toast } from 'sonner';

const formSchema = z.object({
    subtitle: z.string().min(1, { message: "Subtitle is required" }),
    subtitleKh: z.string().optional(),
});

export const SubTitleForm = ({ initialData = {}, courseId }) => {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: initialData,
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values) => {
        try {
            await updateCourse(courseId, values)
            toggleEdit();
            router.refresh();
            toast.success("Course subtitle has been updated");
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="mt-6 border bg-gray-50 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Course Subtitle
                <Button variant="ghost" onClick={toggleEdit}>
                    {isEditing ? (
                        <>Cancel</>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit SubTitle
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                <div className="text-sm mt-2 space-y-1">
                    <p>EN: {initialData.subtitle}</p>
                    {initialData.subtitleKh && <p>KH: {initialData.subtitleKh}</p>}
                </div>
            )}
            {isEditing && (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 mt-4"
                    >
                        <FormField
                            control={form.control}
                            name="subtitle"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder="e.g. 'Advanced web development'"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="subtitleKh"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder="Khmer subtitle"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Button disabled={!isValid || isSubmitting} type="submit">
                                Save
                            </Button>
                        </div>
                    </form>
                </Form>
            )}
        </div>
    );
};