import React from "react";
import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import { ChatMessage } from "./ChatMessage";
import { PageHeader } from "./PageHeader";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      id: "1",
      content: "Hello! How can I assist you today?",
      role: "assistant",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = {
      id: Date.now().toString(),
      content: input,
      role: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: input,
        system:
          "You are a helpful AI assistant. Provide concise and accurate responses.",
      });

      const aiMessage = {
        id: (Date.now() + 1).toString(),
        content: text,
        role: "assistant",
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error generating response:", error);
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I encountered an error. Please try again.",
        role: "assistant",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <PageHeader />
      <main className="flex min-h-screen max-h-screen flex-col items-center justify-between p-12 md:p-12">
        <div className="flex flex-col flex-1 z-10 w-full max-w-3xl ">
          <div className="mt-8 flex h-[calc(100vh-120px)] flex-col justify-between rounded-lg border border-gray-200 shadow-sm">
            <div className="flex-1 overflow-y-auto p-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
                {isLoading && (
                  <div className="flex items-center space-x-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                      <span className="text-xs">AI</span>
                    </div>
                    <div className="flex h-6 items-center space-x-1">
                      <div className="h-2 w-2 animate-bounce rounded-full bg-blue-400"></div>
                      <div
                        className="h-2 w-2 animate-bounce rounded-full bg-blue-400"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="h-2 w-2 animate-bounce rounded-full bg-blue-400"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="border-t-[1px] border-t-gray-200 p-4">
              <form onSubmit={handleSubmit} className="flex space-x-2">
                <input
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isLoading}
                  className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-[#044074] focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-[#044074] text-white hover:bg-[#044074]/80 focus:outline-none disabled:opacity-50 transition"
                >
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
