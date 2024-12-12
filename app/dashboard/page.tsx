'use client';
import { Center, Text } from "@chakra-ui/react";
import { useAuth } from "../auth/hooks/useAuth";

function Dashboard() {
  const session = useAuth();
  console.log(session);
  return (
    <>
      <Center>
        <Text fontSize='6xl'>Your Decks</Text>
      </Center>
      <div className="border-t border-gray-100 my-8 mx-8" />
    </>
  );
}

export default Dashboard;;