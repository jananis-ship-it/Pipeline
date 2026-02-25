"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Building2, Bell, Shield } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex shrink-0 items-center justify-between border-b border-border bg-card px-6 py-4">
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm">Save changes</Button>
      </div>
      <main className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-2xl space-y-6">
          <Card className="rounded-xl border-border bg-card shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <User className="size-5 text-muted-foreground" />
                <h2 className="text-lg font-semibold">Profile</h2>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full name</Label>
                <Input id="name" placeholder="Your name" className="bg-card" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@company.com" className="bg-card" />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl border-border bg-card shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Building2 className="size-5 text-muted-foreground" />
                <h2 className="text-lg font-semibold">Organization</h2>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="org">Organization name</Label>
                <Input id="org" placeholder="Acme Inc" className="bg-card" />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl border-border bg-card shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Bell className="size-5 text-muted-foreground" />
                <h2 className="text-lg font-semibold">Notifications</h2>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <label className="flex items-center justify-between">
                <span className="text-sm">Email when a deal is at risk</span>
                <input type="checkbox" className="rounded border-border" defaultChecked />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-sm">Weekly pipeline summary</span>
                <input type="checkbox" className="rounded border-border" defaultChecked />
              </label>
            </CardContent>
          </Card>

          <Card className="rounded-xl border-border bg-card shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Shield className="size-5 text-muted-foreground" />
                <h2 className="text-lg font-semibold">Security</h2>
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="outline">Change password</Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
