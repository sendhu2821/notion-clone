"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormEvent, startTransition, useState, useTransition } from "react";
import { Button } from "./ui/button";
import { useRoom } from "@liveblocks/react/suspense";
import { useRouter } from "next/navigation";
import { deleteDocument, inviteUserToDocument } from "@/actions/actions";
import { toast } from "sonner";
import { Input } from "./ui/input";
import * as Y from "yjs";
import { BotIcon, MessageCircleCode } from "lucide-react";
import MarkDown from "react-markdown";

function extractTextFromDocumentData(documentData: any): string {
  if (typeof documentData !== "string") {
    console.warn("Expected documentData to be a string");
    return "";
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(documentData, "text/xml");

  // Get all headings and paragraphs
  const textElements = doc.querySelectorAll("heading, paragraph");

  let result = "";
  textElements.forEach((el) => {
    const textContent = el.textContent?.trim();
    if (textContent) {
      result += textContent + "\n"; // Added line break after each block
    }
  });

  return result.trim();
}

const ChatToDocument = ({ doc }: { doc: Y.Doc }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isPending, startTransition] = useTransition();
  const [summary, setSummary] = useState("");
  const [question, setQuestion] = useState("");

  const handleAskQuestion = async (e: FormEvent) => {
    e.preventDefault();
    setQuestion(input);

    startTransition(async () => {
      const documentData = doc.get("document-store").toJSON();

      const plainText = extractTextFromDocumentData(documentData);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/chatToDocument`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            documentData: plainText,
            question: input,
          }),
        }
      );

      if (res.ok) {
        const { message } = await res.json();

        setInput("");
        setSummary(message);

        toast.success("Translated Summary Successfully!");
      } else {
        toast.error(
          "Unfortunately, the dev is too broke to subscribe for openAI services"
        );
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button asChild variant="outline">
        <DialogTrigger>
          <MessageCircleCode className="mr-2" />
          Chat to Document
        </DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chat to the Document</DialogTitle>
          <DialogDescription>
            Ask a question and chat with Document through AI.
          </DialogDescription>

          <hr className="mt-5" />

          {question && <p className="mt-5 text-gray-500"> Q: {question}</p>}
        </DialogHeader>
        {summary && (
          <div className="flex flex-col items-start max-h-96 overflow-y-scroll gap-2 p-5 bg-gray-100">
            <div className="flex">
              <BotIcon className="w-10 shrink-0" />
              <p className="font-bold">
                GPT {isPending ? "is Thinking..." : "says"}
              </p>
            </div>
            {isPending ? <p>Thinking...</p> : <MarkDown>{summary}</MarkDown>}
          </div>
        )}
        <form className="flex gap-2" onSubmit={handleAskQuestion}>
          <Input
            type="text"
            placeholder="i.e what is this about ?"
            className="w-full"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button type="submit" disabled={!input || isPending}>
            {isPending ? "Asking..." : "Ask "}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default ChatToDocument;
