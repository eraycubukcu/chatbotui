export function ChatMessage({ message }) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex items-start gap-3 ${
        isUser ? "flex-row-reverse" : "flex-row"
      }`}
    >
      {isUser ? (
        <></>
      ) : (
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full bg-[#044074] text-white`}
        >
          <span className="text-xs">AI</span>
        </div>
      )}
      <div
        className={`rounded-lg px-4 py-2 max-w-[80%] ${
          isUser ? "bg-[#044074] text-white" : "bg-gray-100 text-gray-800"
        }`}
      >
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  );
}
