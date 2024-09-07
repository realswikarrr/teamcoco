"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { motion } from "framer-motion";
import { useMutation } from "react-query";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Footer from "@/components/Footer";
import Link from "next/link";
import LoadingBubble from "@/components/LoadingBubble"; // Import the new component

type Message = {
  role: "user" | "assistant";
  content: string;
};

const fetchChatGPTResponse = async ({
  input,
  language,
}: {
  input: string;
  language: string;
}) => {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are an Australia Taxation Expert. You will answer questions related to the tax and super of Australia. Keep in mind you are talking with vulnerable people, for example, migrants and old people. You will reply in ${language}.`,
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

export default function ChatComponent() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState("English");

  const mutation = useMutation(fetchChatGPTResponse, {
    onSuccess: (data) => {
      setMessages((prev) => [...prev, { role: "assistant", content: data }]);
    },
    onError: (error) => {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, an error occurred. Please try again.",
        },
      ]);
    },
  });

  const handleSend = () => {
    if (input.trim()) {
      setMessages((prev) => [...prev, { role: "user", content: input }]);
      mutation.mutate({ input, language });
      setInput("");
    }
  };

  return (
    <>
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link className="flex items-center space-x-2" href="/">
            <span className="font-bold text-xl text-primary">AusTaxAI</span>
          </Link>

          <Link href="/">
            <Button>Go Back</Button>
          </Link>
        </div>
      </header>
      <Card className="w-full h-auto max-w-7xl mx-auto mt-5 mb-5">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">
            Australian Tax Assistant
          </CardTitle>
        </CardHeader>
        <CardContent className="flex gap-10 justify-between">
          <ScrollArea className=" h-[600px] w-screen mb-4 p-4 rounded-lg border">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`mb-4 ${
                  message.role === "user" ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-block p-3 rounded-lg ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {message.content}
                </div>
              </motion.div>
            ))}
            {mutation.isLoading && (
              <div className="text-center mt-4">
                <LoadingBubble />
              </div>
            )}
          </ScrollArea>
          <div className="flex max-w-sm w-screen flex-col space-y-2">
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Hindi">Hindi</SelectItem>
                <SelectItem value="Mandarin">Mandarin</SelectItem>
              </SelectContent>
            </Select>
            <Textarea
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={4}
            />
            <Button
              onClick={handleSend}
              className="w-full"
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? "Sending..." : "Send"}
              <Send className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
      <Footer />
    </>
  );
}
