"use client";

import * as Y from "yjs";
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
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { FormEvent, useState, useTransition } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BotIcon, LanguagesIcon } from "lucide-react";
import { toast } from "sonner";
import MarkDown from "react-markdown";

type Language =
  | "english"
  | "tamil"
  | "spanish"
  | "portuguese"
  | "japanese"
  | "french"
  | "german"
  | "chinese"
  | "arabic"
  | "hindi"
  | "russian";

const languages: Language[] = [
  "english",
  "tamil",
  "spanish",
  "portuguese",
  "japanese",
  "french",
  "german",
  "chinese",
  "arabic",
  "hindi",
  "russian",
];

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

const TranslateDocument = ({ doc }: { doc: Y.Doc }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const [summary, setSummary] = useState("");
  const [question, setQuestion] = useState("");

  const handleAskQuestion = (e: FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      const documentData = doc.get("document-store").toJSON();

      const plainText = extractTextFromDocumentData(documentData);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/translateDocument`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            documentData: plainText,
            targetLang: language,
          }),
        }
      );

      if (res.ok) {
        const { translated_text } = await res.json();

        console.log("Translated Text:", translated_text);

        setSummary(translated_text);

        console.log("translated successfully");

        toast.success("Translated Summary Successfully!");
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button asChild variant="outline">
        <DialogTrigger>
          <LanguagesIcon />
          Translate
        </DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Translate the Document</DialogTitle>
          <DialogDescription>
            Select a language and AI will translate and provide the summary of
            the text in the selected language
          </DialogDescription>
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
          <Select
            value={language}
            onValueChange={(value) => setLanguage(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a Language" />
            </SelectTrigger>
            <SelectContent>
              {languages.sort().map((language) => (
                <SelectItem
                  key={language}
                  value={language}
                  className="capitalize"
                >
                  {language}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button type="submit" disabled={languages?.length === 0 || isPending}>
            {isPending ? "Translating..." : "Translate"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default TranslateDocument;
