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

const pipelineTypes = [
  { value: "sales", label: "Sales", desc: "Lead → Qualified → Meeting → Proposal → Negotiation → Won/Lost" },
  { value: "leadgen", label: "Lead gen", desc: "New → Contacted → Qualified → Handoff" },
  { value: "renewals", label: "Renewals", desc: "Upcoming → In review → Renewed / Churned" },
];

export default function NewPipelinePage() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex shrink-0 items-center gap-2 border-b border-slate-200 bg-white px-6 py-4">
        <Button asChild variant="ghost" size="sm" className="gap-1.5 text-slate-600">
          <Link href="/pipelines">
            <ArrowLeft className="size-4" />
            Back
          </Link>
        </Button>
      </div>
      <main className="flex-1 overflow-y-auto p-6">
        <Card className="mx-auto max-w-lg rounded-xl border border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <h2 className="text-base font-semibold text-slate-800">New pipeline</h2>
            <p className="text-sm text-slate-500">
              Pipelines define how deals move through stages. Choose a template or create from scratch.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">Pipeline type</Label>
              <Select defaultValue="sales">
                <SelectTrigger className="rounded-lg border-slate-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {pipelineTypes.map((t) => (
                    <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-slate-700">Pipeline name</Label>
              <Input
                id="name"
                placeholder="e.g. Sales pipeline"
                className="rounded-lg border-slate-200 text-sm"
              />
            </div>
            <div className="flex gap-2 pt-2">
              <Button asChild className="rounded-lg bg-blue-800 text-white hover:bg-blue-900 text-sm font-medium">
                <Link href="/pipelines">Create pipeline</Link>
              </Button>
              <Button asChild variant="outline" size="sm" className="rounded-lg border-slate-200 text-sm">
                <Link href="/pipelines">Cancel</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
