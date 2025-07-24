import React from 'react';
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from '@/lib/utils';

const EnrollCourse = ({ asLink }) => {

    return (
 <>
    <form>
        {asLink ? (
             <Button
             type="submit"
             variant="ghost"
             className="text-xs text-sky-700 h-7 gap-1"
           >
             Enroll
             <ArrowRight className="w-3" />
           </Button> 
        ): (
            <Button type="submit" className={cn(buttonVariants({ size: "lg" }))}>
            Enroll Now
          </Button>
        )} 

    </form>

    
 </>
    );
};

export default EnrollCourse;