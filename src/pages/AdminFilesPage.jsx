import React from "react";
import { AdminFiles } from "../AdminComponents/AdminFiles";
import { MenuAdminProvider } from "../context/MenuAdminContext";
const LayoutAdmin = React.lazy(() => import('./LayoutAdmin'));

export default function AdminFilesPage() {
    return (
        <MenuAdminProvider>
            <LayoutAdmin children={<AdminFiles />} />
        </MenuAdminProvider>
    );
} 