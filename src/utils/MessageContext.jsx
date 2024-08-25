import PropTypes from "prop-types";
import { createContext, useContext, useState } from "react";

const MessageContext = createContext();

export function useMessage() {
  return useContext(MessageContext);
}

export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  const addMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
    if (message.timeout) {
      setTimeout(() => {
        setMessages((prevMessages) =>
          prevMessages.filter((msg) => msg !== message)
        );
      }, message.timeout);
    }
  };

  const removeMessage = (message) => {
    setMessages((prevMessages) =>
      prevMessages.filter((msg) => msg !== message)
    );
  };

  return (
    <MessageContext.Provider value={{ messages, addMessage, removeMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

MessageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};