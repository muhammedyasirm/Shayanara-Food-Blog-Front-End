import React from 'react';
import { useSelector } from "react-redux";
import ScrollableFeed from 'react-scrollable-feed';
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from '../../config/ChatLogics';
import { Avatar, Tooltip } from '@chakra-ui/react';
const ScrollableChat = ({ messages }) => {
    const { userDetails } = useSelector((state) => state.user);
    const user = userDetails.user;
  return (
    <ScrollableFeed>
      {messages && messages.map((m,i) => (
        <div style={{ display: "flex"}} key={m._id}>
            {(isSameSender(messages, m, i, user._id)
            || isLastMessage(messages, i, user._id)
            ) && (
                <Tooltip
                label={m.sender.fullName}
                placement='bottom-start'
                hasArrow
                >
                    <Avatar
                    mt="7px"
                    mr={1}
                    size="sm"
                    cursor="pointer"
                    name={m.sender.fullName}
                    src={m.sender.profilePic}
                    />
                </Tooltip>
            )}

            <span style={{
                backgroundColor: `${
                    m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                }`,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10
            }}>
                {m.content}
            </span>
        </div>
      ))}
    </ScrollableFeed>
  )
}

export default ScrollableChat
