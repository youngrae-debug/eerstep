"use client";

import { useState } from "react";
import { ActionChecklist } from "@/components/sections/action-checklist";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCopy } from "@/hooks/use-locale";
import { useWealthStore } from "@/hooks/use-wealth-store";

export default function ActionsPage() {
  const { copy } = useCopy();
  const { addAction } = useWealthStore();
  const [title, setTitle] = useState("");

  return (
    <div className="page-grid">
      <Card>
        <p className="text-xs uppercase tracking-wide text-secondaryText">{copy.actionsPage.eyebrow}</p>
        <h1 className="mt-2 text-3xl font-semibold">{copy.actionsPage.title}</h1>
        <p className="mt-2 text-sm text-secondaryText">{copy.actionsPage.description}</p>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Input
            placeholder={copy.actionsPage.placeholder}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button
            onClick={() => {
              addAction(title);
              setTitle("");
            }}
          >
            {copy.actionsPage.submit}
          </Button>
        </div>
      </Card>

      <ActionChecklist />
    </div>
  );
}
