import { useGetDogsInfo } from "@/app/hooks/useGetDogsInfo";
import { findDogMatch } from "@/app/lib/api/dogs";
import { Dog } from "@/app/types/dog";
import { Box, Button, Flex, Text, Image } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { memo, useCallback, useState } from "react";
import {
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogHeader,
    DialogRoot,
    DialogTitle,
  } from "@/components/ui/dialog";
import { Avatar } from "@/components/ui/avatar";
import { User } from "@/app/types/user";

const MatchDogDialog = ({dog, name, open, setOpen}: {dog: Dog, name: string, open: boolean,setOpen: (isOpen: boolean) => void }) => {
    return (<DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
    <DialogContent>
      <DialogHeader display='flex' justifyContent='center'>
        <DialogTitle>Congratulations</DialogTitle>
      </DialogHeader>
      <DialogBody>
      <Flex justify="center" align="center" gap={4}>

            <Box textAlign="center">
              <Avatar name={name} shape='square' width={100} height={100} />
              <Text>{name}</Text>
            </Box>

            <Text>Is a<br />Match</Text>

            <Box textAlign="center">
              <Image 
                src={dog.img} 
                alt={dog.name}
                boxSize="100px"
                borderRadius="md"
                objectFit="cover"
              />
              <Text>{dog.name}</Text>
            </Box>
          </Flex>
      </DialogBody>
      <DialogCloseTrigger />
    </DialogContent>
  </DialogRoot>
)
};

export const FindAMatch = memo(({dogsFavourite, user}: {dogsFavourite: string[], user: User}) => {
    const queryClient = useQueryClient();
    const [matchId, setMatch] = useState<string | null>(null);
    const { data: dogs } = useGetDogsInfo(matchId ? [matchId] : []);
    const [open, setOpen] = useState(false);

    const handleFindMatch = useCallback(async () => {
        const {match: dogMatchId} = await queryClient.fetchQuery({ queryKey: ['dog-match', ...dogsFavourite], queryFn: () => findDogMatch(dogsFavourite) });
        setMatch(dogMatchId);
        setOpen(true);
    },[queryClient, dogsFavourite]);

    return (<>
        <Button onClick={handleFindMatch}>Find A Match</Button>
        {dogs && <MatchDogDialog dog={dogs[0]} name={user.name} open={open} setOpen={setOpen}  />}
        </>);
});

FindAMatch.displayName = 'FindAMatch';