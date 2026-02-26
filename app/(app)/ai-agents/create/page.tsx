"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";

const agentTypes = [
  { value: "summary", label: "Deal summarizer", desc: "Generates short summaries and next-step suggestions for any deal." },
  { value: "followup", label: "Follow-up writer", desc: "Suggests email and message copy based on stage and last activity." },
  { value: "scorer", label: "Lead scorer", desc: "Scores new leads using your pipeline history and win patterns." },
];

export default function CreateAgentPage() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex shrink-0 items-center gap-2 border-b border-slate-200 bg-white px-6 py-4">
        <Button asChild variant="ghost" size="sm" className="gap-1.5 text-slate-600">
          <Link href="/ai-agents">
            <ArrowLeft className="size-4" />
            Back
          </Link>
        </Button>
      </div>
      <main className="flex-1 overflow-y-auto p-6">
        <Card className="mx-auto max-w-lg rounded-xl border border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <h2 className="text-base font-semibold text-slate-800">Create AI agent</h2>
            <p className="text-sm text-slate-500">
              Agents run on your deal data to summarize, suggest follow-ups, or score leads. Pick a type and name it.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">Agent type</Label>
              <Select defaultValue="summary">
                <SelectTrigger className="rounded-lg border-slate-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {agentTypes.map((t) => (
                    <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-slate-700">Agent name</Label>
              <Input
                id="name"
                placeholder="e.g. Deal summary for sales team"
                className="rounded-lg border-slate-200 text-sm"
              />
            </div>
            <div className="flex gap-2 pt-2">
              <Button asChild className="rounded-lg bg-blue-800 text-white hover:bg-blue-900 text-sm font-medium">
                <Link href="/ai-agents">Create agent</Link>
              </Button>
              <Button asChild variant="outline" size="sm" className="rounded-lg border-slate-200 text-sm">
                <Link href="/ai-agents">Cancel</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
