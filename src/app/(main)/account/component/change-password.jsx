"use client"
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { changePassword } from '@/app/actions/account';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

const ChangePassword = ({ email }) => {
    //console.log(email);

    const [passwordState, setPasswordState] = useState({
        "oldPassword": "",
        "newPassword": "",
    });

    const handleChange = (event) => {
        const key = event.target.name;
        const value = event.target.value;
        setPasswordState({
            ...passwordState, [key]: value
        });
    }

    async function doPasswordChange(event) {
        event.preventDefault();

        try {
            await changePassword(email, passwordState?.oldPassword, passwordState?.newPassword);
            toast.success("Password changed successfully")
        } catch (error) {
            toast.error(`Error: ${error.message}`);
        }
    }



    const t = useTranslations('Account');
    return (
        <div>
            <h5 className="text-lg font-semibold mb-4">{t('changePassword')} :</h5>
            <form onSubmit={doPasswordChange}>
                <div className="grid grid-cols-1 gap-5">
                    <div>
                        <Label className="mb-2 block">{t('oldPassword')} :</Label>
                        <Input
                            type="password"
                            id="oldPassword"
                            name="oldPassword"
                            onChange={handleChange}
                            placeholder={t('oldPassword')}
                            required=""
                        />
                    </div>
                    <div>
                        <Label className="mb-2 block">{t('newPassword')} :</Label>
                        <Input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            onChange={handleChange}
                            placeholder={t('newPassword')}
                            required=""
                        />
                    </div>
                    <div>
                        <Label className="mb-2 block">{t('retypeNewPassword')} :</Label>
                        <Input
                            type="password"
                            placeholder={t('retypeNewPassword')}
                            required=""
                        />
                    </div>
                </div>
                {/*end grid*/}
                <Button className="mt-5" type="submit">{t('savePassword')}</Button>
            </form>
        </div>
    );
};

export default ChangePassword;