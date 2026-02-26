"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plug } from "lucide-react";

const apps = [
  { name: "Stripe", desc: "Payments", benefit: "Sync invoices and payments to deals" },
  { name: "Zapier", desc: "Automations", benefit: "Connect 5,000+ apps to your pipeline" },
  { name: "Slack", desc: "Notifications", benefit: "Get deal and at-risk alerts in Slack" },
  { name: "Google Sheets", desc: "Data sync", benefit: "Export and sync deal data to sheets" },
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
        <Card className="mx-auto max-w-2xl rounded-xl border border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-blue-100 text-blue-800">
                <Plug className="size-5" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-slate-800">Connect an app</h2>
                <p className="text-sm text-slate-500">
                  Integrations bring data into your pipeline and automate actions. Choose an app to connect.
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {apps.map((app) => (
              <div
                key={app.name}
                className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 bg-slate-50/50 p-4"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-700 text-sm font-semibold">
                    {app.name.slice(0, 1)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-800">{app.name}</p>
                    <p className="text-xs text-slate-500">{app.desc} · {app.benefit}</p>
                  </div>
                </div>
                <Button className="shrink-0 rounded-lg bg-blue-800 text-white hover:bg-blue-900 text-xs font-medium">
                  Connect
                </Button>
              </div>
            ))}
            <Button asChild variant="outline" size="sm" className="mt-4 rounded-lg border-slate-200 text-sm">
              <Link href="/apps">Back to Apps</Link>
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
