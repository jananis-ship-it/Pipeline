"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Book, MessageCircle, ExternalLink } from "lucide-react";

const links = [
  { title: "Getting started", description: "Set up your pipeline and add deals.", href: "#" },
  { title: "Risk scoring", description: "How risk scores and statuses are calculated.", href: "#" },
  { title: "AI summaries", description: "Use AI-generated deal summaries and next steps.", href: "#" },
  { title: "Workflows & automation", description: "Automate actions when deals change.", href: "#" },
];

export default function HelpPage() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex shrink-0 items-center justify-between border-b border-border bg-card px-6 py-4">
        <h1 className="text-2xl font-semibold tracking-tight">Help & support</h1>
      </div>
      <main className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-2xl space-y-6">
          <Card className="rounded-xl border-border bg-gradient-to-br from-primary/5 to-primary/10">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex size-12 items-center justify-center rounded-xl bg-primary/20 text-primary">
                <Zap className="size-6" />
              </div>
              <div className="flex-1">
                <h2 className="font-semibold">Need help?</h2>
                <p className="text-sm text-muted-foreground">Our team typically replies within 24 hours.</p>
              </div>
              <Button className="gap-2">
                <MessageCircle className="size-4" />
                Contact support
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-xl border-border bg-card shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Book className="size-5 text-muted-foreground" />
                <h2 className="text-lg font-semibold">Documentation</h2>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {links.map((link) => (
                <a
                  key={link.title}
                  href={link.href}
                  className="flex items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
                >
                  <div>
                    <p className="font-medium">{link.title}</p>
                    <p className="text-sm text-muted-foreground">{link.description}</p>
                  </div>
                  <ExternalLink className="size-4 text-muted-foreground" />
                </a>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
