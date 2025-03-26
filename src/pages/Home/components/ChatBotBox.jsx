//* Technical Insurance Narrative Assistant (TINA)
import React, { useEffect, useRef, useState } from "react";
import styles from "./css/ChatBotBox.module.css";
import ChatBotIcon from "./ChatBotIcon";
import ChatMessage from "./ChatMessage";

export default function ChatBotBox() {
  const inputRef = useRef();
  const messagesEndRef = useRef(null);

  const [chatHistory, setChatHistory] = useState([
    {
      role: "Model",
      parts: [
        {
          text: "Hey there 👋, I'm TINA, your Technical Insurance Narrative Assistant. I am here to help you to choose the right insurance policy. May I ask you a few personal questions to make sure I recommend the best policy for you?",
        },
      ],
    },
  ]);
  const [showChatBot, setShowChatBot] = useState(false);

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
    }, 600);
    setTimeout(() => {
      generateBotResponse(userMessage);
    }, 1800);
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

      const updateHistory = (text) => {
        setChatHistory((prev) => [
          ...prev.filter((msg) => msg.parts[0].text !== "Thinking..."),
          { role: "Model", parts: [{ text: text }] },
        ]);
      };

      updateHistory(data.response);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    resetChatBot();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  return (
    <div
      div
      className={`${styles.container} ${showChatBot ? styles.showChatBot : ""}`}
    >
      <button
        onClick={() => setShowChatBot((prev) => !prev)}
        id={styles.chatBotToggler}
      >
        <span className="material-symbols-outlined">mode_comment</span>
        <span className="material-symbols-outlined">close</span>
      </button>
      <div className={styles.chatBotPopUp}>
        <div className={styles.chatHeader}>
          <div className={styles.headerInfo}>
            <ChatBotIcon />
            <h2 className={styles.headerText}>T.I.N.A</h2>
          </div>
          <button className={styles.materialSymbolsRounded}>
            <span className="material-symbols-outlined">
              keyboard_arrow_down
            </span>
          </button>
        </div>

        <div className={styles.chatBotBody}>
          {chatHistory.map((chat, index) => {
            return (
              <ChatMessage
                key={index}
                role={chat.role}
                message={chat.parts[0].text}
              />
            );
          })}
          <div ref={messagesEndRef} />
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
                      stroke="#000"
                      fill="none"
                      r="158.5"
                      cy="168.5"
                      cx="168.5"
                    ></circle>
                    <path
                      strokeLinecap="round"
                      strokeWidth="25"
                      stroke="#000"
                      d="M167.759 79V259"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeWidth="25"
                      stroke="#000"
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
                    stroke="#000"
                    d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
                  ></path>
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
