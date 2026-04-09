"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { useCopy } from "@/hooks/use-locale";
import { useWealthStore } from "@/hooks/use-wealth-store";
import { getActionDisplayTitle } from "@/lib/wealth";

export function ActionChecklist() {
  const { copy, locale } = useCopy();
  const { state, toggleAction } = useWealthStore();

  return (
    <Card>
      <p className="text-xs uppercase tracking-wide text-secondaryText">{copy.sections.nextActions}</p>
      <ul className="mt-4 space-y-3">
        {state.actions.map((action) => (
          <li key={action.id} className="flex items-start gap-3">
            <Checkbox checked={action.completed} onCheckedChange={() => toggleAction(action.id)} />
            <span className={action.completed ? "text-sm text-secondaryText line-through" : "text-sm text-primaryText"}>
              {getActionDisplayTitle(action, locale)}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
