import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaPaperPlane } from "react-icons/fa";
import { TbLoader2 } from "react-icons/tb";
import DataInput from "./DataInput";
import { jwtDecode } from "jwt-decode";
import UserContextProvider, {
  UserContext,
} from "../context/UserContextProvider";
import chat from "../utils/chat";
import axios from "axios";
import { ChatContext } from "../context/ChatContextProvider";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Chat = () => {
  const navigate = useNavigate();
  const { user, loading, isUserLoggedIn } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [receiver, setReceiver] = useState(null);
  const [text, setText] = useState("");
  const [question, setQuestion] = useState("");
  const [loadingChat, setLoadingChat] = useState(false);
  const { chatText } = useContext(ChatContext);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!isUserLoggedIn) {
      navigate("/login");
    }
  }, [isUserLoggedIn, navigate]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendQuestion = async () => {
    if (question.length > 0) {
      const newMessage = { author: user?.username, text: question };
      setMessages([...messages, newMessage]);

      setLoadingChat(true);
      const res = await chat(chatText, question);
      const responseMessage = { author: "LinguifyAI", text: res };
      setLoadingChat(false);
      setMessages((prevMessages) => [...prevMessages, responseMessage]);
      setQuestion("");
    }
  };

  return (
    <>
      {loading ? (
        <div className="flex flex-col min-h-screen w-full justify-center items-center">
          <TbLoader2 className="animate-spin text-3xl" />
        </div>
      ) : (
        <div className="flex md:flex-row flex-col w-full mt-24 md:mt-16">
          <div
            className={`w-[100%] ${
              chatText == "" ? "md:w-[100%]" : "md:w-[50%]"
            }  bg-gray-50`}
          >
            <DataInput />
          </div>
          {!chatText == "" && (
            <div className="z-10 w-[100%] md:w-[50%] h-[90dvh] bg-white border px-3 flex flex-col pt-4 pb-5">
              <div className="flex-1 box-border">
                <div className="overflow-auto w-full border-y rounded-md py-5 border-gray-300 h-[26rem] bg-gray-200 px-2">
                  <div className="grid gap-4">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex items-start gap-4 ${
                          message.author === user?.username ? "justify-end" : ""
                        }`}
                      >
                        <div
                          className={`${
                            message.author === user?.username
                              ? "bg-black text-white text-right"
                              : "bg-white"
                          } shadow-lg rounded-lg p-4`}
                        >
                          <b>{message.author}</b>
                          <p className="whitespace-pre-wrap text-sm">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                              {message.text}
                            </ReactMarkdown>
                          </p>
                        </div>
                      </div>
                    ))}
                    {loadingChat && (
                      <div className={`flex items-start justify-start`}>
                        <div className={`bg-white shadow-lg rounded-lg p-2`}>
                          <div className="flex gap-2 ">
                            <img
                              src="/loading.gif"
                              alt=""
                              srcset=""
                              className="w-8 h-8"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef}></div>
                  </div>
                </div>
                <div className="py-3">
                  <div className="relative">
                    <textarea
                      className="w-full rounded-lg border border-gray-300 min-h-[50px] p-3 pr-16 resize-none"
                      placeholder="Type your message..."
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      rows={3}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          sendQuestion();
                          setQuestion("");
                        }
                      }}
                    />
                    <button
                      onClick={sendQuestion}
                      className="absolute top-3 right-3"
                      type="submit"
                    >
                      <FaPaperPlane className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Chat;
