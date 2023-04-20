import { ViewIcon } from '@chakra-ui/icons'
import { Box, Button, FormControl, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { ChatState } from '../../Context/ChatProvider'
import UserBadgeItem from '../UserAvatar/UserBadgeItem';
import axios from '../../axios/userAxios';
import UserListItem from '../UserAvatar/UserListItem';

const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain, fetchMessages }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatName, setGroupChatName] = useState();
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [renameLoading, setRenameLoading] = useState(false);

    const toast = useToast();
    const { userDetails } = useSelector((state) => state.user);
    const { selectedChat, setSelectedChat } = ChatState();
    const user = userDetails.user;

    const handleRemove = async (user1) => {
        if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
            toast({
                title: "Only Admin can add someone!",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom"
            });
            return;
        } 

        try {
            setLoading(true);
            const { data } = await axios.put(`/chat/groupRemove`,
            {
                chatId: selectedChat._id,
                userId: user1._id
            })

            user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            fetchMessages();
            setLoading(false);
        } catch (error) {
            toast({
                title: "Error Occured",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position:"bottom"
            });
            setLoading(false);
        }
    }

    const handleAddUser = async (user1) => {
        if (selectedChat.users.find((u) => u._id === user1._id)) {
            toast({
                title: "User Already in group",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom"
            });
            return;
        }

        if (selectedChat.groupAdmin._id !== user._id) {
            toast({
                title: "Only Admin can add someone!",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom"
            });
            return;
        } 
        try {
            setLoading(true);
            const {data} = await axios.put('/chat/groupAdd',
            {
                chatId: selectedChat._id,
                userId: user1._id
            });
            setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            setLoading(false);
        } catch (error) {
            toast({
                title: "Error Occured",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position:"bottom"
            });
            setLoading(false);
        }


    }

    const handleRename = async () => {
        if ( !groupChatName ) {
            return
        } else {
            try {
                setRenameLoading(true)
                const { data } = await axios.put('/chat/rename',{
                    chatId: selectedChat._id,
                    chatName: groupChatName
                });

                setSelectedChat(data);
                setFetchAgain(!fetchAgain);
                setRenameLoading(false)
            } catch (error) {
                toast({
                    title: "Error Occured",
                    description: error.response.data.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position:"bottom"
                });
                setRenameLoading(false);
            }

            setGroupChatName("");
        }
    }

    const handleSearch = async (query) => {
        setSearch(query)
        if(!query){
            return;
        } else{
            try {
                setLoading(true)
                const { data } = await axios.get(`/user/searchChat?search=${search}`)
                setLoading(false);
                console.log("Groupchat users",data);
                setSearchResult(data);
            } catch (error) {
                toast({
                    title: "Error Occured",
                    description: "Failed to load the Search Result",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position:"bottom-left"
                });
            }
        }
    }
    return (
        <>
          <IconButton display={{base: "flex" }} icon={<ViewIcon/>} onClick={onOpen}/>
    
          <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader
              fontSize="35px"
              fontFamily="Work sans"
              display="flex"
              justifyContent="center"
              >{selectedChat.chatName}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
               <Box w="100%" display="flex" flexWrap="wrap" pb={3}>
                {selectedChat.users.map(u => (
                    <UserBadgeItem key={user._id} user={u} handleFunction={() => handleRemove(u)}/>
                ))}
               </Box>
               <FormControl display="flex">
                <Input 
                placeholder='Chat Name'
                mb={3}
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
                />
                <Button
                variant="solid"
                colorScheme='teal'
                ml={1}
                isLoading={renameLoading}
                onClick={handleRename}
                >
                    Update
                </Button>
               </FormControl>
               <FormControl>
                <Input
                placeholder='Add User to Group'
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
                />
               </FormControl>
               {loading ? (
                <Spinner size="lg"/>
               ) : (
                searchResult?.map((user) => (
                    <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleAddUser(user)}
                    />
                ))
               )}
              </ModalBody>
    
              <ModalFooter>
                <Button colorScheme='red' onClick={() => handleRemove(user)}>
                  Leave Group
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )
}

export default UpdateGroupChatModal
