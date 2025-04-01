"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { User } from "@/types/database";
import { ChevronDown, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface MemberDirectoryProps {
  members: User[];
}

type SortOption = "name-asc" | "name-desc" | "year-asc" | "year-desc";

export default function MemberDirectory({ members }: MemberDirectoryProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMembers, setFilteredMembers] = useState<User[]>(members);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState<SortOption>("name-asc");
  const membersPerPage = 10;

  // Get unique promotion years from members
  const years = Array.from(
    new Set(members.map((member) => member.join_year))
  ).sort((a, b) => b - a); // Sort years in descending order (newest first)

  useEffect(() => {
    let filtered = [...members];

    // Filter by selected year if any
    if (selectedYear !== null) {
      filtered = filtered.filter((member) => member.join_year === selectedYear);
    }

    // Then filter by search term
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter((member) => {
        return (
          member.first_name.toLowerCase().includes(searchLower) ||
          member.last_name.toLowerCase().includes(searchLower) ||
          (member.nickname &&
            member.nickname.toLowerCase().includes(searchLower)) ||
          (member.company &&
            member.company.toLowerCase().includes(searchLower)) ||
          (member.job && member.job.toLowerCase().includes(searchLower))
        );
      });
    }

    // Sort the filtered members
    filtered = sortMembers(filtered, sortOption);

    setFilteredMembers(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, members, selectedYear, sortOption]);

  // Get initials for avatar fallback
  const getInitials = (first: string, last: string) => {
    return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();
  };

  // Sort members based on the selected sort option
  const sortMembers = (membersToSort: User[], option: SortOption): User[] => {
    const sortedMembers = [...membersToSort];

    switch (option) {
      case "name-asc":
        return sortedMembers.sort((a, b) =>
          `${a.last_name} ${a.first_name}`.localeCompare(
            `${b.last_name} ${b.first_name}`
          )
        );
      case "name-desc":
        return sortedMembers.sort((a, b) =>
          `${b.last_name} ${b.first_name}`.localeCompare(
            `${a.last_name} ${a.first_name}`
          )
        );
      case "year-asc":
        return sortedMembers.sort(
          (a, b) =>
            a.join_year - b.join_year || // First sort by year
            `${a.last_name} ${a.first_name}`.localeCompare(
              `${b.last_name} ${b.first_name}`
            ) // Then by name
        );
      case "year-desc":
        return sortedMembers.sort(
          (a, b) =>
            b.join_year - a.join_year || // First sort by year (desc)
            `${a.last_name} ${a.first_name}`.localeCompare(
              `${b.last_name} ${b.first_name}`
            ) // Then by name
        );
      default:
        return sortedMembers;
    }
  };

  // Get sort option label
  const getSortOptionLabel = (option: SortOption): string => {
    switch (option) {
      case "name-asc":
        return "Nom (A-Z)";
      case "name-desc":
        return "Nom (Z-A)";
      case "year-asc":
        return "Promo (croissant)";
      case "year-desc":
        return "Promo (décroissant)";
      default:
        return "Nom (A-Z)";
    }
  };

  // Calculate pagination variables
  const totalPages = Math.ceil(filteredMembers.length / membersPerPage);
  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = filteredMembers.slice(
    indexOfFirstMember,
    indexOfLastMember
  );

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 transition-all hover:shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
          Annuaire des membres
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Recherchez et connectez-vous avec d'autres membres de l'association :
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher par nom, prénom, entreprise..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  Trier: {getSortOptionLabel(sortOption)}{" "}
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSortOption("name-asc")}>
                  Nom (A-Z)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOption("name-desc")}>
                  Nom (Z-A)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOption("year-asc")}>
                  Promo (croissant)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOption("year-desc")}>
                  Promo (décroissant)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <Button
            variant={selectedYear === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedYear(null)}
          >
            Toutes les promos
          </Button>

          {years.map((year) => (
            <Button
              key={year}
              variant={selectedYear === year ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedYear(year)}
            >
              {year}
            </Button>
          ))}
        </div>

        <div className="text-sm text-muted-foreground">
          {filteredMembers.length}{" "}
          {filteredMembers.length === 1 ? "membre trouvé" : "membres trouvés"}
          {filteredMembers.length > membersPerPage &&
            ` (page ${currentPage}/${totalPages})`}
        </div>
      </div>

      <div className="space-y-4">
        {filteredMembers.length === 0 ? (
          <p className="text-center py-8 text-muted-foreground">
            Aucun membre trouvé avec ces critères
          </p>
        ) : (
          currentMembers.map((member) => (
            <Card
              key={member.id}
              className="overflow-hidden hover:shadow-md transition-all"
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12 border dark:border-brand-red">
                    <AvatarImage
                      src={member.avatar_url || ""}
                      alt={`${member.first_name} ${member.last_name}`}
                    />
                    <AvatarFallback className="bg-muted-foreground text-primary-foreground dark:bg-brand-red dark:text-primary-foreground">
                      {getInitials(member.first_name, member.last_name)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {member.first_name} {member.last_name}
                          {member.nickname && (
                            <span className="text-muted-foreground ml-2 text-sm">
                              "{member.nickname}"
                            </span>
                          )}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Promo {member.join_year}
                        </p>
                      </div>

                      {member.job && (
                        <div className="mt-2 sm:mt-0 text-sm text-right">
                          <p className="font-medium text-foreground">
                            {member.job}
                          </p>
                          {member.company && (
                            <p className="text-muted-foreground">
                              {member.company}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                      {member.phone_number && (
                        <a
                          href={`tel:${member.phone_number}`}
                          className="text-brand-red hover:underline"
                        >
                          {member.phone_number}
                        </a>
                      )}

                      <a
                        href={`mailto:${member.email}`}
                        className="text-brand-red hover:underline"
                      >
                        {member.email}
                      </a>
                    </div>

                    {member.other_hec_asso &&
                      member.other_hec_asso.length > 0 && (
                        <div className="mt-2">
                          <p className="text-xs text-muted-foreground">
                            Autres associations HEC:{" "}
                            {member.other_hec_asso.join(", ")}
                          </p>
                        </div>
                      )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center pt-4 mt-6 border-t border-border">
            <Button
              variant="outline"
              size="sm"
              onClick={prevPage}
              disabled={currentPage === 1}
              className="flex items-center gap-1"
            >
              <ChevronLeft className="h-4 w-4" /> Précédent
            </Button>

            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, i) => {
                // Show only current page, first and last pages, and one page before and after current
                if (
                  i + 1 === 1 ||
                  i + 1 === totalPages ||
                  (i + 1 >= currentPage - 1 && i + 1 <= currentPage + 1)
                ) {
                  return (
                    <Button
                      key={i}
                      variant={currentPage === i + 1 ? "default" : "outline"}
                      size="sm"
                      onClick={() => paginate(i + 1)}
                      className="w-9 h-9 p-0"
                    >
                      {i + 1}
                    </Button>
                  );
                }

                // Show ellipsis for skipped pages
                if (
                  (i + 1 === currentPage - 2 && currentPage > 3) ||
                  (i + 1 === currentPage + 2 && currentPage < totalPages - 2)
                ) {
                  return (
                    <span
                      key={i}
                      className="flex items-center justify-center w-9 h-9"
                    >
                      ...
                    </span>
                  );
                }

                return null;
              })}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1"
            >
              Suivant <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
