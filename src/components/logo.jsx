import Image from 'next/image';
import React from 'react';
import logo from "@/assets/easylogo.png"
import { cn } from '@/lib/utils';

const Logo = ({className = ""}) => {
    return (
        <div>
            <Image className={cn("max-w-[200px]", className)} src={logo} alt="logo"        />
        </div>
    );
};

export default Logo;