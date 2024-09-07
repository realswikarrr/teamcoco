"use client";

import { useState } from "react";
import { useMutation } from "react-query";

const fetchChatGPTResponse = async (input: unknown) => {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4", // Specify the model
      messages: [
        {
          role: "system",
          content:
            "You are a Australia Taxation Expert. You will answer questions related to the tax and super of Australia. Keep In Mind You Are Talking With Vulnerable People for example migrants and old people.",
        },
        { role: "user", content: input },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch response from OpenAI API");
  }

  const data = await response.json();
  return data.choices[0].message.content;
};

export default function ChatCompletion() {
  // State For Input And Response Of The Chat GPT

  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  // React Query To Manage Loading State Of The Data
  const mutation = useMutation(fetchChatGPTResponse, {
    onSuccess: (data) => {
      setResponse(data);
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });

  const handleSubmit = () => {
    mutation.mutate(input);
  };

  return (
    <div className="App">
      <h1>Chat with GPT</h1>
      <textarea
        // @ts-expect-error
        rows="4"
        // @ts-expect-error
        cols="50"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
      />
      <br />
      <button onClick={handleSubmit} disabled={mutation.isLoading}>
        {mutation.isLoading ? "Loading..." : "Send"}
      </button>
      <p>Response: {response}</p>
    </div>
  );
}
