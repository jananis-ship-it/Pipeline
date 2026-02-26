"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Workflow, Plus } from "lucide-react";

export default function WorkflowsPage() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
        <h1 className="text-xl font-medium tracking-tight text-slate-700">Workflows</h1>
        <Button asChild className="h-8 gap-1.5 rounded-lg bg-blue-800 text-white hover:bg-blue-900 text-xs font-medium">
          <Link href="/workflows/create">
            <Plus className="size-4" />
            New workflow
          </Link>
        </Button>
      </div>
      <main className="flex-1 overflow-y-auto p-6">
        <Card className="rounded-xl border border-slate-100 bg-white shadow-none">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                <Workflow className="size-6" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-slate-700">Automate your pipeline</h2>
                <p className="text-sm text-slate-500">
                  Create workflows that run when deals move stages, when activity is logged, or on a schedule.
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50/50 p-8 text-center">
              <p className="text-xs text-slate-500">No workflows yet.</p>
              <Button asChild variant="outline" size="sm" className="mt-3 rounded-lg border-slate-200 text-xs">
                <Link href="/workflows/create">Create your first workflow</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
