import { BotIcon, Loader2, Send } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z, { set } from "zod";
import { useServiceStore } from "../store/useServiceStore.js";

const querySchema = z.object({
  query: z.string().min(3, "Message should be atleast of 3 characters"),
});

const HintButton = ({ problem, userCode }) => {
  const [messages, setMessages] = useState([]);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: zodResolver(querySchema),
  });
  const { isGenerating, hint, getHint } = useServiceStore();

  const onSubmit = async (data) => {
    if (!data.query.trim()) return;
    try {
      const userMessage = {
        role: "user",
        text: data.query,
      };
      setMessages((prev) => [...prev, userMessage]);
      const hintText = await getHint(
        problem?.description,
        userCode,
        data.query
      );
      reset();
      console.log(hint);
      const botMessage = {
        role: "bot",
        text: hintText || "Sorry, I didn't get that.",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Error Fetching Response" },
      ]);
      console.log("Error in Query Answer", error);
      toast("Query Failed");
    }
  };
  console.log(hint);
  console.log(messages);

  return (
    <div className="bg-[var(--steel-dark)] rounded-2xl px-6 py-4">
      <div className="flex gap-3 items-center">
        <BotIcon className="w-6 h-6 text-[var(--cream)]" />
        <h1 className="text-xl" style={{ color: "var(--cream)" }}>
          Gemini Bot
        </h1>
        <span className="text-xs text-gray-400">
          (This Bot Provides you Only Hints){" "}
        </span>
      </div>
      <hr className="mt-2 text-gray-400" />

      <div className="flex flex-col w-full mx-auto h-[60vh] overflow-y-auto rounded-lg shadow-inner mt-3 px-6 py-3 space-y-8">
        <div className="flex-grow" />
        {isGenerating ? (
          <div className="flex items-center justify-center text-gray-400">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Generating response...</span>
          </div>
        ) : messages.length === 0 ? (
          <div className="mt-30 flex flex-col gap-2 py-10 justify-center items-center opacity-40">
            <BotIcon className="w-10 h-10" />
            <h1 style={{ color: "var(--cream)" }}>
              Ask Me Anything About Problem
            </h1>
          </div>
        ) : (
          messages.map((msg, i) => (
            <div className="flex flex-col items-start gap-1">
              <span
                className={`${
                  msg.role === "user"
                    ? "opacity-60 w-10 rounded-lg text-center text-[var(--cream)] self-end ml-auto"
                    : "opacity-60 self-start mr-auto"
                }`}
              >
                {msg.role === "user" ? "You" : msg.role.charAt(0).toUpperCase() + msg.role.slice(1)}
              </span>

              <div
                key={i}
                className={`p-2 rounded-lg max-w-[75%]
      ${
        msg.role === "user"
          ? "bg-[var(--navy)] text-[var(--cream)] self-end ml-auto"
          : "bg-[var(--navy-dark)] text-[var(--cream)] self-start mr-auto"
      }
    `}
              >
                {msg.text}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-20">
        <hr className="text-gray-400" />
        <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
          <input
            type="text"
            className="input mt-3 w-[85%] bg-[var(--navy)] text-[var(--cream)] rounded-lg opacity-100 py-1"
            placeholder="Ask About Problem, Get Hints..."
            {...register("query")}
          />
          <button
            disabled={isGenerating}
            type="submit"
            className="flex gap-1 items-center justify-center mt-3 bg-[var(--beige)] text-[var(--navy)] hover:bg-[var(--navy)] hover:text-[var(--cream)] rounded-lg px-2 text-md w-20 h-9"
          >
            <Send className="w-4 h-4" />
            Ask
          </button>
        </form>
      </div>
    </div>
  );
};

export default HintButton;
