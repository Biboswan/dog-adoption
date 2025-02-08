import { Box, Image, Text, IconButton, VStack, HStack } from "@chakra-ui/react";
import { Heart } from "lucide-react";

const DogCard = ({ name, age, breed, zipCode, imageUrl }: { 
    name: string;
    age: number;
    breed: string;
    zipCode: string;
    imageUrl: string;
}) => {
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
                <Image src={imageUrl} alt={name} width="100%" height="auto" objectFit="cover" />
                
                {/* Favorite Button (Heart) */}
                <IconButton
                    aria-label="Favorite"
                    size="sm"
                    position="absolute"
                    top="10px"
                    right="10px"
                    bg="transparent"
                    color="blackAlpha.700"
                    _hover={{ color: "red.500" }}
                >
                    <Heart size={20} />
                </IconButton>
            </Box>

            {/* Dog Details */}
            <VStack p={3}>
                <HStack>
                    <Text fontSize="lg" fontWeight="bold">{name}</Text>
                    <Text fontSize="md" color="gray.600">({age}yr)</Text>
                </HStack>
                <Text fontSize="md" color="gray.700">{breed}</Text>
                <Text fontSize="md" fontWeight="bold">{zipCode}</Text>
            </VStack>
        </Box>
    );
};

export default DogCard;
