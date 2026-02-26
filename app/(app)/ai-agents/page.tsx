"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, Plus, Sparkles } from "lucide-react";

const agents = [
  { name: "Deal summary agent", description: "Generates AI summaries for deal details and risk.", status: "Active" },
  { name: "Follow-up writer", description: "Suggests follow-up email copy based on stage and activity.", status: "Active" },
  { name: "Lead scorer", description: "Scores and prioritizes new leads using pipeline history.", status: "Paused" },
];

export default function AIAgentsPage() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
        <h1 className="text-xl font-medium tracking-tight text-slate-700">AI agents</h1>
        <Button asChild className="h-8 gap-1.5 rounded-lg bg-slate-500 text-white hover:bg-slate-600 text-xs font-medium">
          <Link href="/ai-agents/create">
            <Plus className="size-4" />
            New agent
          </Link>
        </Button>
      </div>
      <main className="flex-1 overflow-y-auto p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent) => (
            <Card key={agent.name} className="rounded-xl border-border bg-card shadow-sm overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Bot className="size-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{agent.name}</h3>
                      <span className={`text-xs ${agent.status === "Active" ? "text-emerald-600" : "text-amber-600"}`}>
                        {agent.status}
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{agent.description}</p>
                <Button variant="outline" size="sm" className="mt-3 w-full">Configure</Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="mt-6 rounded-xl border-border bg-gradient-to-br from-primary/5 to-primary/10">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex size-12 items-center justify-center rounded-xl bg-primary/20 text-primary">
              <Sparkles className="size-6" />
            </div>
            <div>
              <h3 className="font-semibold">Use AI in your pipeline</h3>
              <p className="text-sm text-muted-foreground">Agents can summarize deals, suggest next steps, and score risk.</p>
            </div>
            <Button asChild className="ml-auto h-8 rounded-lg bg-slate-500 text-white hover:bg-slate-600 text-xs">
            <Link href="/ai-agents/create">Create agent</Link>
          </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
