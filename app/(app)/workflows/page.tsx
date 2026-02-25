"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Workflow, Plus } from "lucide-react";

export default function WorkflowsPage() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex shrink-0 items-center justify-between border-b border-border bg-card px-6 py-4">
        <h1 className="text-2xl font-semibold tracking-tight">Workflows</h1>
        <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm">
          <Plus className="size-4" />
          New workflow
        </Button>
      </div>
      <main className="flex-1 overflow-y-auto p-6">
        <Card className="rounded-xl border-border bg-card shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Workflow className="size-6" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Automate your pipeline</h2>
                <p className="text-sm text-muted-foreground">
                  Create workflows that run when deals move stages, when activity is logged, or on a schedule.
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-dashed border-border bg-muted/30 p-8 text-center">
              <p className="text-sm text-muted-foreground">No workflows yet.</p>
              <Button variant="outline" className="mt-3">
                Create your first workflow
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
