"use client";

import MemberCard from "@/components/cards/MemberCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { promos } from "@/data/promos";
import { useState } from "react";

export default function PromosPage() {
  const [selectedPromo, setSelectedPromo] = useState("2025");

  const filteredMembers = promos[selectedPromo];

  return (
    <div className="min-h-screen bg-background/50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Les Promotions de DOUBLE JEU
            </h1>
          </div>

          <div className="mb-8 flex justify-center">
            <div className="bg-card rounded-xl inline-flex p-1">
              <Select
                value={selectedPromo}
                onValueChange={(value) => setSelectedPromo(value)}
              >
                <SelectTrigger className="w-55 text-lg font-medium">
                  <SelectValue placeholder="Sélectionner une année" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(promos).map((year) => (
                    <SelectItem key={year} value={year}>
                      Promotion {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="bg-card p-6 rounded-xl border border-border">
            {filteredMembers.length === 0 ? (
              <p className="text-center py-8 text-muted-foreground">
                Aucun membre trouvé pour cette promotion
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredMembers.map((member, index) => (
                  <MemberCard key={index} member={member} index={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
