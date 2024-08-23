import React from "react";
import Layout from "../../../layout/dashboard";
import Section from "../../../layout/global/Section";
import Container from "../../../layout/global/Container";
import { Breadcrumbs, Button } from "../../../components";
import UsersTable from "./UsersTable";

function UserList() {
    return (
        <Layout>
            <Section className="px-3 py-6">
                <Container>
                    <div className="mb-7 flex justify-between items-center -mx-3">
                        <div className="px-3">
                            <h2 className="text-xl font-bold text-slate-700 dark:text-white mb-2">
                                All Users
                            </h2>
                            <Breadcrumbs
                                items={[
                                    { text: "Dashboard", link: "/admin" },
                                    { text: "User List" },
                                ]}
                            />
                        </div>
                        <div className="px-3">
                            <Button
                                className="bg-blue-600 text-white hover:bg-blue-800"
                            >
                                Create User
                            </Button>
                        </div>
                    </div>
                    <UsersTable />
                </Container>
            </Section>
        </Layout>
    );
}

export default UserList;
