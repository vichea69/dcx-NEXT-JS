"use client"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle } from "lucide-react";
import { PlayCircle } from "lucide-react";
import { Lock } from "lucide-react";
import Link from "next/link";
import { SidebarLessons } from "./sidebar-lessons";
import { replaceMongoIdInArray } from "@/lib/convertData";
import { useSearchParams } from "next/navigation";

export const SidebarModules = ({ courseId, modules }) => {

    const seachParams = useSearchParams();
    const allModules = replaceMongoIdInArray(modules).toSorted((a, b) => a.order - b.order);

    const query = seachParams.get('name');

    const expandModule = allModules.find((module) => {
        return module.lessonIds.find((lesson) => {
            return lesson.slug === query;
        });
    });

    const exapndModuleId = expandModule?.id ?? allModules[0].id;


    return (
        <Accordion
            defaultValue={exapndModuleId}
            type="single"
            collapsible
            className="w-full px-6"
        >

            {
                allModules.map((module) => (
                    <AccordionItem key={module.id} className="border-0" value={module.id}>
                        <AccordionTrigger>{module.title} </AccordionTrigger>

                        <SidebarLessons courseId={courseId} lessons={module.lessonIds} module={module.slug} />

                    </AccordionItem>
                ))
            }




        </Accordion>
    )

}