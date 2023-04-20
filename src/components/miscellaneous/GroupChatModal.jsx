import { useDisclosure } from '@chakra-ui/hooks';
import { Box, Button, FormControl, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast } from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import { ChatState } from '../../Context/ChatProvider';
import { useSelector } from "react-redux";
import axios from '../../axios/userAxios';
import UserListItem from '../UserAvatar/UserListItem';
import UserBadgeItem from '../UserAvatar/UserBadgeItem';

const GroupChatModal = ({ children }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [groupChatName, setGroupChatName] = useState();
    const [selectedUser, setSelectedUser] = useState([]);
    const [search, setSearch] = useState();
    const [searchResult, setSearchResult] = useState([]);
    const[loading, setLoading] = useState(false);

    const {chats,setChats} = ChatState();
    const { userDetails } = useSelector((state) => state.user);
    const user = userDetails.user;

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

    const handleSubmit = async () => {
        if(!groupChatName || !selectedUser){
            toast({
                title: "Please fill all the fields",
                description: "Failed to load the Search Result",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position:"top"
            });
        } else {
            try {
               const { data } = await axios.post('/chat/group',{
                name: groupChatName,
                users: JSON.stringify(selectedUser.map((u)=> u._id))
               }) 
               setChats([data, ...chats]);
               onClose();
               toast({
                title: "New Group Chat Created",
                status: "success",
                duration: 5000,
                isClosable: true,
                position:"bottom"
            });
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

    const handleDelete = (delUser) => {
        setSelectedUser(selectedUser.filter(sel => sel._id !== delUser._id))
    }

    const handleGroup = (userToAdd) => {
        if(selectedUser.includes(userToAdd)){
            toast({
                title: "Error Already Added",
                description: "Failed to load the Search Result",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position:"top"
            });
            return;
        }
        setSelectedUser([...selectedUser, userToAdd]);
    }

    const toast = useToast();
    return (
        <>
            <span onClick={onOpen}>{children}</span>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                    fontSize="35px"
                    fontFamily="Work sans"
                    display="flex"
                    justifyContent="center"
                    >Create Group Chat</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody display="flex" flexDir="column" alignItems="center" >
                        <FormControl>
                            <Input 
                            placeholder='Chat Name' 
                            mb={3}
                            onChange={(e) => setGroupChatName(e.target.value)}
                            />
                        </FormControl>
                        <FormControl>
                            <Input 
                            placeholder='Add Users' 
                            mb={1}
                            onChange={(e) => handleSearch(e.target.value)}
                            />
                        </FormControl>
                        <Box w="100%" display="flex" flexWrap="wrap">
                        {selectedUser.map(u => (
                            <UserBadgeItem key={user._id} user={u} handleFunction={() => handleDelete(u)}/>
                        ))}
                        </Box>
                        {loading ? (
                        <div>loading</div>
                        ) : (
                            searchResult?.slice(0,4).map((user) => <UserListItem key={user._id} user={user} handleFunction={()=>handleGroup(user)}/>)
                        )}
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' onClick={handleSubmit}>
                            Create Chat
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default GroupChatModal
