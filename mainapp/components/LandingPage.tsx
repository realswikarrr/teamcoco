import Link from "next/link";
import { Mic, MessageSquare, CheckCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Footer from "./Footer";

export default function LandingPageOption3() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link className="flex items-center space-x-2" href="#">
            <span className="font-bold text-xl text-primary">AusTaxAI</span>
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link className="text-sm font-medium hover:text-primary" href="#">
              Features
            </Link>
            <Link className="text-sm font-medium hover:text-primary" href="#">
              How It Works
            </Link>
            <Link className="text-sm font-medium hover:text-primary" href="#">
              FAQ
            </Link>
            <Link className="text-sm font-medium hover:text-primary" href="#">
              Contact
            </Link>
          </nav>
          <Button>Try for Free</Button>
        </div>
      </header>
      <main className="flex-grow">
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-6">
                Professional Tax Assistance Powered by AI
              </h1>
              <p className="text-xl mb-8">
                Get expert help with Australian taxes through voice or chat, in
                your preferred language.
              </p>
              <div className="flex justify-center space-x-4">
                <Link href="/Voice">
                  <Button size="lg">
                    Start with Voice <Mic className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/Chat">
                  <Button size="lg" variant="outline">
                    Start Chatting <MessageSquare className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Choose Your Preferred Method
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-center">
                    <Mic className="w-6 h-6 mr-2 text-primary" />
                    Voice Assistant
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                      Hands-free operation
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                      Natural language processing
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                      Quick responses to verbal queries
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 mr-2 text-primary" />
                    Chat Assistant
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                      Multilingual support
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                      Detailed written responses
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                      Easy to save and reference later
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="max-w-2xl mx-auto">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  How accurate is the AI tax advice?
                </AccordionTrigger>
                <AccordionContent>
                  Our AI is trained on the latest Australian tax regulations and
                  is regularly updated. However, for complex situations, we
                  recommend consulting with a human tax professional.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  What languages are supported?
                </AccordionTrigger>
                <AccordionContent>
                  Our chat system supports multiple languages including English,
                  Mandarin, Arabic, Vietnamese, and Greek. Voice support is
                  currently limited to English.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Is my data secure?</AccordionTrigger>
                <AccordionContent>
                  Yes, we take data security very seriously. All communications
                  are encrypted, and we do not store personal tax information
                  beyond the duration of your session.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
