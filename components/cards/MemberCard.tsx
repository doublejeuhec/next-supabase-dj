import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { roleAbbreviations } from "@/data/promos";
import Image from "next/image";

interface MemberCardProps {
  member: {
    src: string;
    title: string;
    poste: string;
    roles: Record<string, string | number>;
    commentaireOR?: string;
  };
  index: number;
}

export default function MemberCard({ member, index }: MemberCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-border group">
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={member.src}
          alt={member.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
          quality={80}
          loading={index < 4 ? "eager" : "lazy"}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
        />
      </div>
      <CardHeader className="pb-1 pt-3">
        <CardTitle className="text-base font-bold text-foreground">
          {member.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="font-medium text-brand-red text-sm mb-2 border-b border-brand-red/20 pb-2">
          {member.poste}
        </p>

        <div className="space-y-1 mb-2">
          <p className="text-xs font-semibold text-foreground/80">Rôles :</p>
          <ul className="text-xs text-muted-foreground space-y-1">
            {Object.entries(member.roles).map(([abbr, role], idx) => (
              <li key={idx} className="pl-2 border-l-2 border-brand-red/20">
                <span className="font-medium text-brand-red">
                  {roleAbbreviations[abbr] || abbr}
                </span>{" "}
                : {typeof role === "string" ? role : String(role)}
              </li>
            ))}
          </ul>
        </div>

        {member.commentaireOR && (
          <div className="text-xs italic text-muted-foreground mt-3 pt-2 border-t border-border">
            <span className="font-medium text-brand-red">On raconte </span>
            {member.commentaireOR}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
