"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { useWealthStore } from "@/hooks/use-wealth-store";

export function ActionChecklist() {
  const { state, toggleAction } = useWealthStore();

  return (
    <Card>
      <p className="text-xs uppercase tracking-wide text-secondaryText">Next actions</p>
      <ul className="mt-4 space-y-3">
        {state.actions.map((action) => (
          <li key={action.id} className="flex items-start gap-3">
            <Checkbox checked={action.completed} onCheckedChange={() => toggleAction(action.id)} />
            <span className={action.completed ? "text-sm text-secondaryText line-through" : "text-sm text-primaryText"}>
              {action.title}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
