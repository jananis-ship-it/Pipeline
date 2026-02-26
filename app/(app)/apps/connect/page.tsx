"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const apps = [
  { name: "Stripe", desc: "Payments" },
  { name: "Zapier", desc: "Automations" },
  { name: "Slack", desc: "Notifications" },
  { name: "Google Sheets", desc: "Data sync" },
];

export default function ConnectAppPage() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex shrink-0 items-center gap-2 border-b border-slate-200 bg-white px-6 py-4">
        <Button asChild variant="ghost" size="sm" className="gap-1.5 text-slate-600">
          <Link href="/apps">
            <ArrowLeft className="size-4" />
            Back
          </Link>
        </Button>
      </div>
      <main className="flex-1 overflow-y-auto p-6">
        <Card className="mx-auto max-w-2xl rounded-xl border border-slate-100 bg-white shadow-none">
          <CardHeader>
            <h2 className="text-base font-semibold text-slate-700">Connect an app</h2>
            <p className="text-xs text-slate-500">Choose an integration to connect to your pipeline.</p>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 sm:grid-cols-2">
              {apps.map((app) => (
                <button
                  key={app.name}
                  type="button"
                  className="flex items-center gap-3 rounded-lg border border-slate-100 p-3 text-left hover:bg-slate-50 transition-colors"
                >
                  <div className="flex size-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600 text-sm font-semibold">
                    {app.name.slice(0, 1)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">{app.name}</p>
                    <p className="text-xs text-slate-500">{app.desc}</p>
                  </div>
                </button>
              ))}
            </div>
            <Button asChild variant="outline" size="sm" className="mt-4 rounded-lg border-slate-200 text-xs">
              <Link href="/apps">Cancel</Link>
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
