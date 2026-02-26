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
        <Card className="mx-auto max-w-lg rounded-xl border border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <h2 className="text-base font-semibold text-slate-800">New campaign</h2>
            <p className="text-sm text-slate-500">
              Campaigns send emails to contacts or deals in your pipeline. Choose type and who receives it.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">Campaign type</Label>
              <Select defaultValue="sequence">
                <SelectTrigger className="rounded-lg border-slate-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sequence">Email sequence (multiple emails over time)</SelectItem>
                  <SelectItem value="oneoff">One-off email (single send)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">Audience</Label>
              <Select defaultValue="open">
                <SelectTrigger className="rounded-lg border-slate-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">All open deals</SelectItem>
                  <SelectItem value="atrisk">At-risk deals only</SelectItem>
                  <SelectItem value="stage">Deals in a specific stage</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-slate-500">Who will receive this campaign.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-slate-700">Campaign name</Label>
              <Input
                id="name"
                placeholder="e.g. Q1 outreach to Proposal stage"
                className="rounded-lg border-slate-200 text-sm"
              />
            </div>
            <div className="flex gap-2 pt-2">
              <Button asChild className="rounded-lg bg-blue-800 text-white hover:bg-blue-900 text-sm font-medium">
                <Link href="/campaigns">Create campaign</Link>
              </Button>
              <Button asChild variant="outline" size="sm" className="rounded-lg border-slate-200 text-sm">
                <Link href="/campaigns">Cancel</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
