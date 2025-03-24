"use client";

import MemberCard from "@/components/cards/MemberCard";
import { promos } from "@/data/promos";
import { useState } from "react";

export default function PromosPage() {
  const [selectedPromo, setSelectedPromo] = useState("2024");

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
            <div className="bg-card p-4 rounded-xl inline-flex shadow-sm border border-border">
              <select
                className="px-4 py-2 border border-input rounded-md text-lg font-medium text-foreground bg-background"
                value={selectedPromo}
                onChange={(e) => setSelectedPromo(e.target.value)}
              >
                {Object.keys(promos).map((year) => (
                  <option key={year} value={year}>
                    Promotion {year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
            {filteredMembers.length === 0 ? (
              <p className="text-center py-8 text-muted-foreground">
                Aucun membre trouvé pour cette promotion
              </p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
