"use client"
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import Link from "next/link";
import { updateUserInfo } from '@/app/actions/account';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

const PersonalDetails = ({ userInfo }) => {
    // console.log(userInfo);
    const [infoState, setInfoState] = useState({
        "firstName": userInfo.firstName,
        "lastName": userInfo.lastName,
        "email": userInfo.email,
        "designation": userInfo.designation,
        "bio": userInfo.bio,
    });

    const handleChange = (event) => {
        const field = event.target.name;
        const value = event.target.value;
        setInfoState({
            ...infoState, [field]: value
        });
    }
    /// console.log(infoState);

    const handleUpdate = async (event) => {
        event.preventDefault();
        try {
            await updateUserInfo(userInfo?.email, infoState);
            toast.success("User details updated successfully");
        } catch (error) {
            toast.error(`Error: ${error.message}`);
        }
    }



    const t = useTranslations('Account');
    return (
        <div className="p-6 rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900">
            <h5 className="text-lg font-semibold mb-4">{t('personalDetail')} :</h5>
            <form onSubmit={handleUpdate} >
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
                    <div>
                        <Label className="mb-2 block">
                            {t('firstName')} : <span className="text-red-600">*</span>
                        </Label>
                        <Input
                            type="text"
                            placeholder={`${t('firstName')}:`}
                            id="firstName"
                            name="firstName"
                            value={infoState?.firstName}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Label className="mb-2 block">
                            {t('lastName')} : <span className="text-red-600">*</span>
                        </Label>
                        <Input
                            type="text"
                            placeholder={`${t('lastName')}:`}
                            id="lastName"
                            name="lastName"
                            value={infoState?.lastName}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Label className="mb-2 block">
                            {t('email')} : <span className="text-red-600">*</span>
                        </Label>
                        <Input
                            type="email"
                            placeholder={t('email')}
                            id="email"
                            name="email"
                            value={infoState?.email}
                            disabled
                        />
                    </div>
                    <div>
                        <Label className="mb-2 block">{t('occupation')} :</Label>
                        <Input
                            id="designation"
                            name="designation"
                            value={infoState?.designation}
                            type="text"
                            onChange={handleChange}
                            placeholder={`${t('occupation')} :`}
                        />
                    </div>
                </div>
                {/*end grid*/}
                <div className="grid grid-cols-1">
                    <div className="mt-5">
                        <Label className="mb-2 block">{t('description')} :</Label>
                        <Textarea
                            id="bio"
                            name="bio"
                            value={infoState?.bio}
                            onChange={handleChange}
                            placeholder={`${t('message')} :`}
                        />
                    </div>
                </div>
                {/*end row*/}
                <Button className="mt-5" asChild>
                    <input type="submit" name="send" value={t('saveChanges')} />
                </Button>
            </form>
            {/*end form*/}
        </div>
    );
};

export default PersonalDetails;