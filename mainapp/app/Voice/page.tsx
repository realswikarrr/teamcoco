"use client";

import React, { useState, useEffect } from "react";
import { useMutation } from "react-query";
import { Mic, MicOff, Volume2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import Footer from "@/components/Footer";
import Link from "next/link";

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const fetchChatGPTResponse = async ({ input }: { input: string }) => {
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
          content: `You are an Australia Taxation Expert. You will answer questions related to the tax and super of Australia. Keep in mind you are talking with vulnerable people, for example, migrants and old people. You will reply in English.`,
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

export default function VoiceAssistant() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [listening, setListening] = useState(false);
  const [helloDetected, setHelloDetected] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const mutation = useMutation(fetchChatGPTResponse, {
    onSuccess: (data) => {
      setResponse(data);
      speakResponse(data);
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const speakResponse = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSpeechRecognition = () => {
    if (isClient) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        console.log(
          "Voice recognition started. Say 'hello' followed by your query."
        );
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        console.log("Transcript: ", transcript);

        if (transcript.includes("hello")) {
          console.log("Hello detected. Listening for the command...");
          setHelloDetected(true);
          recognition.stop();
          listenForQuery();
        }
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
      };

      recognition.start();
    }
  };

  const listenForQuery = () => {
    if (isClient) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.onresult = (event) => {
        const userQuery = event.results[0][0].transcript;
        console.log("User Query: ", userQuery);
        setInput(userQuery);
        setHelloDetected(false);
        handleSubmit(userQuery);
      };
      recognition.start();
    }
  };

  const handleSubmit = (voiceInput: string) => {
    mutation.mutate({ input: voiceInput });
  };

  const toggleListening = () => {
    setListening((prev) => !prev);
    setHelloDetected(false);
  };

  useEffect(() => {
    if (listening && isClient) {
      handleSpeechRecognition();
    }
  }, [listening, isClient]);

  return (
    <>
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link className="flex items-center space-x-2" href="/">
            <span className="font-bold text-xl text-primary">EquiTax AI</span>
          </Link>

          <Link href="/">
            <Button>Go Back</Button>
          </Link>
        </div>
      </header>
      <Card className="w-full h-[600px] max-w-7xl mx-auto mt-5 mb-5">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">
            Voice Assistant: Australian Tax Expert
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-4">
            <Button
              onClick={toggleListening}
              variant={listening ? "destructive" : "default"}
              size="lg"
              className="w-48"
            >
              {listening ? (
                <>
                  <MicOff className="mr-2 h-4 w-4" /> Stop Listening
                </>
              ) : (
                <>
                  <Mic className="mr-2 h-4 w-4" /> Start Listening
                </>
              )}
            </Button>
            <p className="text-sm text-muted-foreground">
              {listening
                ? helloDetected
                  ? "Hello detected! Listening for your command..."
                  : "Listening for 'hello'..."
                : "Click to start listening"}
            </p>
          </div>
          <ScrollArea className="h-[200px] mt-4 p-4 rounded-lg border">
            <div className="space-y-4">
              {input && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-primary text-primary-foreground p-3 rounded-lg text-sm"
                >
                  <strong>You:</strong> {input}
                </motion.div>
              )}
              {response && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-muted text-muted-foreground p-3 rounded-lg text-sm"
                >
                  <strong>Assistant:</strong> {response}
                </motion.div>
              )}
            </div>
          </ScrollArea>
          {response && (
            <div className="mt-4 flex items-center justify-center">
              <Button
                onClick={() => speakResponse(response)}
                variant="outline"
                size="sm"
              >
                <Volume2 className="mr-2 h-4 w-4" /> Speak Response
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      <Footer />
    </>
  );
}
