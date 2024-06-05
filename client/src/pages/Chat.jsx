import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useContext, useEffect, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import DataInput from "./DataInput";
import { jwtDecode } from "jwt-decode";
import UserContextProvider, {
  UserContext,
} from "../context/UserContextProvider";
import { TbLoader2 } from "react-icons/tb";

const Chat = () => {
  const navigate = useNavigate();
  const { user, loading, isUserLoggedIn } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [receiver, setReceiver] = useState(null);
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState("");
  const [text, setText] = useState();
  useEffect(() => {
    if (!isUserLoggedIn) {
      navigate("/login");
    }
  }, []);
  return (
    <>
      {loading ? (
        <div className="flex flex-col min-h-screen w-full justify-center items-center">
          <TbLoader2 className="animate-spin text-3xl" />
        </div>
      ) : (
        <div className="flex md:flex-row flex-col w-full mt-24 md:mt-16 ">
          <div className="w-[100%] md:w-[50%]  bg-gray-50  ">
            <DataInput />
          </div>
          <div
            className="z-10 w-[100%] md:w-[50%] h-[90dvh] 
            bg-white border  px-3  flex flex-col  pt-4 pb-5"
          >
            <div className="flex-1 box-border">
              <div className=" overflow-auto w-full border-y rounded-md py-5 border-gray-300  h-[26rem] bg-gray-200 px-2">
                <div className="grid gap-4 ">
                  <div className="flex items-start gap-4">
                    <div className="bg-white  shadow-lg rounded-lg p-4">
                      <b>LinguifyAI</b>
                      <p>Hey there! How can I help you with the PDF?</p>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        10:30 AM
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 justify-end ">
                    <div className="bg-black shadow-lg text-white rounded-lg text-right p-4">
                      <b>{user?.username}</b>
                      <p className="text-left">
                        I'm having trouble finding a specific section. Can you
                        help me navigate to it?
                      </p>
                      <div className="text-xs text-gray-200 mt-1">10:32 AM</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-white  shadow-lg rounded-lg p-4">
                      <b>LinguifyAI</b>
                      <p>Hey there! How can I help you with the PDF?</p>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        10:30 AM
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-white  shadow-lg rounded-lg p-4">
                      <b>LinguifyAI</b>
                      <p>Hey there! How can I help you with the PDF?</p>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        10:30 AM
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="py-3 ">
                <div className="relative">
                  <textarea
                    className="w-full rounded-lg border border-gray-300 min-h-[50px] p-3 pr-16 resize-none"
                    placeholder="Type your message..."
                    rows={3}
                  />
                  <button className="absolute top-3 right-3" type="submit">
                    <FaPaperPlane className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;
