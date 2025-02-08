'use client';

import { AppContext } from "@/app/providers/app-provider";
import { use } from "react";
import styled from "@emotion/styled";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@chakra-ui/react";

const Container = styled.header`
    background: var(--chakra-colors-color-palette-solid);
    padding: 8px;
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

export default function Header() {
    const { user, logout, dogsFavourite } = use(AppContext);
    
    return (
        <Container>
            <Avatar variant='subtle' name={user?.name} />
            <Button onClick={logout}>Logout</Button>
        </Container>
    );
}