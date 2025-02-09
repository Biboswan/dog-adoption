import { Box, Image, Text, IconButton, VStack, HStack } from "@chakra-ui/react";
import { Heart } from "lucide-react";
import { memo } from "react";

interface DogCardProps {
    id: string;
    name: string;
    age: number;
    breed: string;
    zipCode: string;
    imageUrl: string;
    isFavourite: boolean;
    toggleFavourite: (isFavourite: boolean, id: string) => void;
};

const DogCard = memo(({ id, name, age, breed, zipCode, imageUrl, isFavourite, toggleFavourite }: DogCardProps) => {
    return (
        <Box 
            borderWidth="1px" 
            borderRadius="md" 
            boxShadow="md" 
            overflow="hidden" 
            maxW="250px"
            textAlign="center"
        >
            {/* Image Container */}
            <Box position="relative">
                <Image src={imageUrl} alt={name} width="100%" height="auto" objectFit="cover" aspectRatio="1/1"
                    maxHeight="200px" />
            </Box>

            <VStack p={3} position="relative">
                <HStack justifyContent="center">
                    <Text fontSize="lg" fontWeight="bold">{name}</Text>
                    <Text fontSize="md" color="gray.600">({age}yr)</Text>
                </HStack>
                <Text fontSize="md" color="gray.700">{breed}</Text>

                <HStack width="100%" justifyContent="space-between" px={3}>
                    <Text fontSize="md" fontWeight="bold">{zipCode}</Text>

                    {/* Heart Button Moved to Bottom Right */}
                    <IconButton
                        aria-label="Favorite"
                        size="sm"
                        bg="transparent"
                        onClick={() => toggleFavourite(isFavourite, id)}
                        color={isFavourite ? "red.500" : "blackAlpha.700"}
                        aria-pressed={isFavourite}
                        _hover={{ color: "red.500", transform: "scale(1.1)" }}
                        transition="all 0.2s ease-in-out"
                    >
                        <Heart size={20} fill={isFavourite ? "red" : "none"} />
                    </IconButton>
                </HStack>
            </VStack>
        </Box>
    );
});

DogCard.displayName = "DogCard"; 

export default DogCard;
