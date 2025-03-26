import React from "react";
import styles from "./css/ChatMessage.module.css";
import ChatBotIcon from "./ChatBotIcon";

export default function ChatMessage({ role, message }) {
  const isUserMessage = role === "User" ? true : false;
  const isThinking =
    role === "Model" && message === "Thinking..." ? true : false;
  return (
    <div
      className={`${styles.message} ${
        isUserMessage ? styles.userMessage : styles.botMessage
      }`}
    >
      {role === "Model" && <ChatBotIcon />}
      {isUserMessage ? (
        <p className={isUserMessage ? styles.userText : styles.messageText}>
          {message}
        </p>
      ) : isThinking ? (
        <div className={`${styles.wave} ${styles.messageText}`}>
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
        </div>
      ) : (
        <p className={isUserMessage ? styles.userText : styles.messageText}>
          {message}
        </p>
      )}
    </div>
  );
}
