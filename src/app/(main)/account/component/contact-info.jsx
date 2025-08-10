import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from 'next-intl';

const ContactInfo = () => {
    const t = useTranslations('Account');
    return (
        <div>
            <h5 className="text-lg font-semibold mb-4">{t('contactInfo')} :</h5>
            <form>
                <div className="grid grid-cols-1 gap-5">
                    <div>
                        <Label className="mb-2 block">{t('phone')} :</Label>
                        <Input
                            name="number"
                            id="number"
                            type="number"
                            placeholder={`${t('phone')} :`}
                        />
                    </div>
                    <div>
                        <Label className="mb-2 block">{t('website')} :</Label>
                        <Input
                            name="url"
                            id="url"
                            type="url"
                            placeholder={`${t('url')} :`}
                        />
                    </div>
                </div>
                {/*end grid*/}
                <Button className="mt-5" type="submit">{t('add')}</Button>
            </form>
        </div>
    );
};

export default ContactInfo;