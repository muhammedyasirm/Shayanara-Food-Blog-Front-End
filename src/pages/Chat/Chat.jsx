import React, {useState} from 'react';
import NavBar from '../../components/navBar/NavBar';
import { Box } from '@chakra-ui/react';
import { useSelector } from "react-redux";
import SideDrawer from '../../components/miscellaneous/SideDrawer';
import MyChats from '../../components/miscellaneous/MyChats';
import ChatBox from '../../components/miscellaneous/ChatBox';

const Chat = () => {
  const { userDetails } = useSelector((state) => state.user);
  const [fetchAgain, setFetchAgain] = useState(false)

  return (
    <>
      <div style={{ width: "100%" }}>
      <NavBar/>
      { userDetails && <SideDrawer/>}
      <Box
      display="flex"
      justifyContent="space-between"
      w="100%"
      h="91.5vh"
      p="10px"
      >
        { userDetails && <MyChats fetchAgain={fetchAgain}/> }
        { userDetails && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/> }
      </Box>
      </div>
    </>
  )
}

export default Chat
