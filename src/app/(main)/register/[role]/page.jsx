'use client';

import React from 'react';
import { SignupForm } from '../_components/signup-form.jsx'; // fix the path if needed
import { useParams } from 'next/navigation';

const RegisterPage = () => {
    const { role } = useParams();

    return (
        <div className="w-full flex-col h-screen flex items-center justify-center">
            <div className="container">
                <SignupForm role={role} />
            </div>
        </div>
    );
};

export default RegisterPage;