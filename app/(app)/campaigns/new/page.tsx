"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";

export default function NewCampaignPage() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex shrink-0 items-center gap-2 border-b border-slate-200 bg-white px-6 py-4">
        <Button asChild variant="ghost" size="sm" className="gap-1.5 text-slate-600">
          <Link href="/campaigns">
            <ArrowLeft className="size-4" />
            Back
          </Link>
        </Button>
      </div>
      <main className="flex-1 overflow-y-auto p-6">
        <Card className="mx-auto max-w-lg rounded-xl border border-slate-100 bg-white shadow-none">
          <CardHeader>
            <h2 className="text-base font-semibold text-slate-700">New campaign</h2>
            <p className="text-xs text-slate-500">Create an email or sequence campaign tied to your pipeline.</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-xs">Campaign name</Label>
              <Input id="name" placeholder="e.g. Q1 outreach" className="rounded-lg border-slate-200 text-sm" />
            </div>
            <div className="flex gap-2 pt-2">
              <Button asChild className="rounded-lg bg-slate-500 text-white hover:bg-slate-600 text-xs">
                <Link href="/campaigns">Create campaign</Link>
              </Button>
              <Button asChild variant="outline" size="sm" className="rounded-lg border-slate-200 text-xs">
                <Link href="/campaigns">Cancel</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
