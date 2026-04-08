"use client";

import { useState } from "react";
import { ActionChecklist } from "@/components/sections/action-checklist";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useWealthStore } from "@/hooks/use-wealth-store";

export default function ActionsPage() {
  const { addAction } = useWealthStore();
  const [title, setTitle] = useState("");

  return (
    <div className="page-grid">
      <Card>
        <p className="text-xs uppercase tracking-wide text-secondaryText">Action plan</p>
        <h1 className="mt-2 text-3xl font-semibold">What should I do next?</h1>
        <p className="mt-2 text-sm text-secondaryText">Add one action that directly moves you toward your next wealth level.</p>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Input
            placeholder="Add a high-leverage action"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button
            onClick={() => {
              addAction(title);
              setTitle("");
            }}
          >
            Add action
          </Button>
        </div>
      </Card>

      <ActionChecklist />
    </div>
  );
}
