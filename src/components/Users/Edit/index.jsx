import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../../../layout/dashboard";
import Section from "../../../../layout/global/Section";
import Container from "../../../../layout/global/Container";
import {
    Breadcrumbs,
    Button,
    Label,
    Input,
    Select,
    Card,
} from "../../../../components";
import { users, country, language } from "../../../../store";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const userStatus = [
    { name: "Active" },
    { name: "Suspended" },
    { name: "Pending" },
];

const userPlan = [{ name: "Free" }, { name: "Strater" }, { name: "Premium" }];

function UserEdit() {
    [];
    const { userId } = useParams();

    const user = users.filter((user) => user.id === userId)[0];

    const statusIndex = userStatus.findIndex((object) => {
        return object.name.toLowerCase() === user.status.toLowerCase();
    });

    const countryIndex = country.findIndex((object) => {
        return object.code.toLowerCase() === user.country.toLowerCase();
    });
    const languageIndex = language.findIndex((object) => {
        return object.code.toLowerCase() === user.language.toLowerCase();
    });

    const planIndex = userPlan.findIndex((object) => {
        return object.name.toLowerCase() === user.plan.toLowerCase();
    });

    const [selectedStatus, setSelectedStatus] = useState(
        userStatus[statusIndex]
    );
    const [selectedLanguage, setSelectedLanguage] = useState(
        language[languageIndex]
    );
    const [selectedCountry, setSelectedCountry] = useState(
        country[countryIndex]
    );
    const [selectedPlan, setSelectedPlan] = useState(userPlan[planIndex]);

    return (
        <Layout title={`Update - ${user.name}`}>
            <Section className="px-3 py-6">
                <Container>
                    <div className="mb-7 flex justify-between items-center -mx-3">
                        <div className="px-3">
                            <h2 className="text-xl font-bold text-slate-700 dark:text-white mb-2">
                                Edit User Info
                            </h2>
                            <Breadcrumbs
                                items={[
                                    {
                                        text: "User List",
                                        link: "/admin/users",
                                    },
                                    { text: user.name },
                                ]}
                            />
                        </div>
                        <div className="px-3">
                            <Button
                                as="Link"
                                to="/admin/users"
                                className="bg-slate-200 text-slate-600 hover:bg-blue-600 hover:text-white"
                            >
                                <ArrowLeftIcon className="h-5 -mx-2 sm:mx-0 sm:h-4" />
                                <span className="hidden sm:block">Back</span>
                            </Button>
                        </div>
                    </div>

                    <Card>
                        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800">
                            <h2 className="text-xl font-bold text-slate-700 dark:text-white">
                                <span className="text-base text-slate-400 font-normal">
                                    Edit -{" "}
                                </span>{" "}
                                {user.name}
                            </h2>
                        </div>
                        <div className="px-6 pt-5 pb-6 border-b border-slate-200 dark:border-slate-800">
                            <div className="flex flex-wrap items-center -mx-3 -my-2">
                                <div className="w-full lg:w-1/2 xl:w-2/5 px-3">
                                    <div className="py-2">
                                        <Label
                                            htmlFor="userid"
                                            className="mb-2"
                                        >
                                            User ID
                                        </Label>
                                        <Input
                                            disabled
                                            defaultValue={user.id}
                                            id="userid"
                                        />
                                    </div>
                                </div>
                                <div className="w-full lg:w-1/2 xl:w-2/5 px-3">
                                    <div className="py-2">
                                        <Label
                                            htmlFor="username"
                                            className="mb-2"
                                        >
                                            Full Name
                                        </Label>
                                        <Input
                                            defaultValue={user.name}
                                            id="username"
                                        />
                                    </div>
                                </div>
                                <div className="w-full lg:w-1/2 xl:w-2/5 px-3">
                                    <div className="py-2">
                                        <Label
                                            htmlFor="useremail"
                                            className="mb-2"
                                        >
                                            Email
                                        </Label>
                                        <Input
                                            defaultValue={user.email}
                                            id="useremail"
                                        />
                                    </div>
                                </div>
                                <div className="w-full lg:w-1/2 xl:w-2/5 px-3">
                                    <div className="py-2">
                                        <Label
                                            htmlFor="userphone"
                                            className="mb-2"
                                        >
                                            Phone
                                        </Label>
                                        <Input
                                            defaultValue={user.phone}
                                            id="useremail"
                                        />
                                    </div>
                                </div>
                                <div className="w-full lg:w-1/2 xl:w-2/5 px-3">
                                    <div className="py-2">
                                        <Label
                                            htmlFor="usercountry"
                                            className="mb-2"
                                        >
                                            Counrty
                                        </Label>
                                        <Select
                                            options={country}
                                            selected={selectedCountry}
                                            onChange={(value) => {
                                                setSelectedCountry(value);
                                            }}
                                            id="usercountry"
                                        />
                                    </div>
                                </div>

                                <div className="w-full lg:w-1/2 xl:w-2/5 px-3">
                                    <div className="py-2">
                                        <Label
                                            htmlFor="userlanguage"
                                            className="mb-2"
                                        >
                                            Language
                                        </Label>
                                        <Select
                                            options={language}
                                            selected={selectedLanguage}
                                            onChange={(value) => {
                                                setSelectedLanguage(value);
                                            }}
                                            id="userlanguage"
                                        />
                                    </div>
                                </div>
                                <div className="w-full lg:w-1/2 xl:w-2/5 px-3">
                                    <div className="py-2">
                                        <Label
                                            htmlFor="userstatus"
                                            className="mb-2"
                                        >
                                            User Status
                                        </Label>
                                        <Select
                                            options={userStatus}
                                            selected={selectedStatus}
                                            onChange={(value) => {
                                                setSelectedStatus(value);
                                            }}
                                            id="userstatus"
                                        />
                                    </div>
                                </div>
                                <div className="w-full lg:w-1/2 xl:w-2/5 px-3">
                                    <div className="py-2">
                                        <Label
                                            htmlFor="userplan"
                                            className="mb-2"
                                        >
                                            Plan
                                        </Label>
                                        <Select
                                            options={userPlan}
                                            selected={selectedPlan}
                                            onChange={(value) => {
                                                setSelectedPlan(value);
                                            }}
                                            id="userplan"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="px-6 pt-4 pb-5">
                            <div className="w-full xl:w-2/3 mb-2">
                                <h2 className="text-xl font-bold text-slate-700 dark:text-white mb-2">
                                    Reset Password
                                </h2>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Password must be at least 8 character and
                                    contain symbols.
                                </p>
                                <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
                                    Leave it empty if you don't want to change
                                    the user's password!
                                </p>
                            </div>
                            <div className="flex flex-wrap items-center -mx-3">
                                <div className="w-full lg:w-1/2 xl:w-2/5 px-3">
                                    <div className="py-2">
                                        <Label
                                            htmlFor="newPassword"
                                            className="mb-2"
                                        >
                                            New Password
                                        </Label>
                                        <Input
                                            defaultValue=""
                                            id="newPassword"
                                            type="password"
                                        />
                                    </div>
                                </div>
                                <div className="w-full lg:w-1/2 xl:w-2/5 px-3">
                                    <div className="py-2">
                                        <Label
                                            htmlFor="confirmPassword"
                                            className="mb-2"
                                        >
                                            Confirm Password
                                        </Label>
                                        <Input
                                            defaultValue=""
                                            id="confirmPassword"
                                            type="password"
                                        />
                                    </div>
                                </div>
                                <div className="w-full px-3 pb-2 pt-4">
                                    <Button className="bg-blue-600 text-white hover:bg-blue-800">
                                        Update Profile
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                </Container>
            </Section>
        </Layout>
    );
}

export default UserEdit;
