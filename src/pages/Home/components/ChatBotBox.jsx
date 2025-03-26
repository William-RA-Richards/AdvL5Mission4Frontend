//* Technical Insurance Narrative Assistant (TINA)
import React, { useEffect, useRef, useState } from "react";
import styles from "./css/ChatBotBox.module.css";
import ChatBotIcon from "./ChatBotIcon";
import ChatMessage from "./ChatMessage";

export default function ChatBotBox() {
  const inputRef = useRef();

  const [chatHistory, setChatHistory] = useState([
    {
      role: "Model",
      parts: [
        {
          text: "Hey there 👋, I'm TINA, your Technical Insurance Narrative Assistant. I Help You to choose the right insurance policy. May I ask you a few personal questions to make sure I recommend the best policy for you?",
        },
      ],
    },
  ]);

  function handleFormSubmit(e) {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;
    inputRef.current.value = "";

    setChatHistory((history) => [
      ...history,
      { role: "User", parts: [{ text: userMessage }] },
    ]);

    setTimeout(() => {
      setChatHistory((history) => [
        ...history,
        { role: "Model", parts: [{ text: "Thinking..." }] },
      ]);
    }, 1200);

    generateBotResponse(userMessage);
  }

  async function resetChatBot() {
    try {
      const result = fetch("http://localhost:4000/api/reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ chatHistory }),
      });

      const data = await result.json();
    } catch (error) {
      console.log(error);
    }
  }

  async function generateBotResponse(userInput) {
    try {
      const result = await fetch("http://localhost:4000/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userInput }),
      });

      const data = await result.json();

      setChatHistory((history) => [
        ...history,
        { role: "Model", parts: [{ text: data.response }] },
      ]);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    chatHistory.forEach((chat) => console.log(chat));
  }, [chatHistory]);

  return (
    <div className={styles.chatBotPopUp}>
      <div className={styles.chatHeader}>
        <div className={styles.headerInfo}>
          <ChatBotIcon />
          <h2 className={styles.headerText}>T.I.N.A</h2>
        </div>
        <button className="material-symbols-rounded">^</button>
      </div>

      <div className={styles.chatBotBody}>
        <div className={`${styles.message} ${styles.botMessage}`}>
          <ChatBotIcon />
          <p className={styles.messageText}>
            Hey there 👋, I'm TINA, your Technical Insurance Narrative
            Assistant. I Help You to choose the right insurance policy. May I
            ask you a few personal questions to make sure I recommend the best
            policy for you?
          </p>
        </div>
        {chatHistory.map((chat, index) => {
          return (
            <ChatMessage
              key={index}
              role={chat.role}
              message={chat.parts[0].text}
            />
          );
        })}
      </div>

      <div className={styles.chatBotFooter}>
        <form className={styles.chatForm} onSubmit={handleFormSubmit}>
          <div className={styles.messageBox}>
            <div className={styles.fileUploadWrapper}>
              <label htmlFor="file">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 337 337"
                >
                  <circle
                    strokeWidth="20"
                    stroke="#6c6c6c"
                    fill="none"
                    r="158.5"
                    cy="168.5"
                    cx="168.5"
                  ></circle>
                  <path
                    strokeLinecap="round"
                    strokeWidth="25"
                    stroke="#6c6c6c"
                    d="M167.759 79V259"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeWidth="25"
                    stroke="#6c6c6c"
                    d="M79 167.138H259"
                  ></path>
                </svg>
                <span className={styles.tooltip}>Add an image</span>
              </label>
              <input type="file" id="file" name="file" />
            </div>
            <input
              ref={inputRef}
              required=""
              placeholder="Message..."
              type="text"
              id="messageInput"
            />
            <button id={styles.sendButton}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 664 663"
              >
                <path
                  fill="none"
                  d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
                ></path>
                <path
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="33.67"
                  stroke="#6c6c6c"
                  d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
                ></path>
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
