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

export default function CreateWorkflowPage() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex shrink-0 items-center gap-2 border-b border-slate-200 bg-white px-6 py-4">
        <Button asChild variant="ghost" size="sm" className="gap-1.5 text-slate-600">
          <Link href="/workflows">
            <ArrowLeft className="size-4" />
            Back
          </Link>
        </Button>
      </div>
      <main className="flex-1 overflow-y-auto p-6">
        <Card className="mx-auto max-w-lg rounded-xl border border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <h2 className="text-base font-semibold text-slate-800">Create workflow</h2>
            <p className="text-sm text-slate-500">
              Automate actions when something happens in your pipeline. Choose when the workflow runs and what it does.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-slate-700">Workflow name</Label>
              <Input
                id="name"
                placeholder="e.g. Follow up when deal reaches Proposal"
                className="rounded-lg border-slate-200 text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">When (trigger)</Label>
              <Select defaultValue="stage">
                <SelectTrigger className="rounded-lg border-slate-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="stage">Deal moves to a stage</SelectItem>
                  <SelectItem value="activity">Activity is logged on a deal</SelectItem>
                  <SelectItem value="schedule">Scheduled (e.g. daily or weekly)</SelectItem>
                  <SelectItem value="risk">Deal becomes at-risk</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-slate-500">The workflow runs when this happens.</p>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">Then (action)</Label>
              <Select defaultValue="email">
                <SelectTrigger className="rounded-lg border-slate-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Send an email to the owner</SelectItem>
                  <SelectItem value="task">Create a task</SelectItem>
                  <SelectItem value="notify">Notify deal owner</SelectItem>
                  <SelectItem value="update">Update deal field</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-slate-500">This action runs when the trigger fires.</p>
            </div>
            <div className="flex gap-2 pt-2">
              <Button asChild className="rounded-lg bg-blue-800 text-white hover:bg-blue-900 text-sm font-medium">
                <Link href="/workflows">Create workflow</Link>
              </Button>
              <Button asChild variant="outline" size="sm" className="rounded-lg border-slate-200 text-sm">
                <Link href="/workflows">Cancel</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
