import { Box } from "@chakra-ui/react"

type Props = {
    children: React.ReactNode;
};

export const BodyContainer = ({children}: Props) => <Box p={{ base: 4, md: 6, lg: 8 }}>{children}</Box>;