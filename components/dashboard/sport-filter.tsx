
"use client";

import * as React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SportCategory } from "@/lib/data";

interface SportFilterProps {
    selectedSport: SportCategory | 'All';
    onSelectSport: (sport: SportCategory | 'All') => void;
    availableSports: SportCategory[];
}

export function SportFilter({ selectedSport, onSelectSport, availableSports }: SportFilterProps) {
    return (
        <div className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-[60px] z-40">
            <ScrollArea className="w-full whitespace-nowrap">
                <div className="flex w-max space-x-2 p-4">
                    <Button
                        variant={selectedSport === 'All' ? "default" : "outline"}
                        onClick={() => onSelectSport('All')}
                        className="rounded-full"
                        size="sm"
                    >
                        All Sports
                    </Button>
                    {availableSports.map((sport) => (
                        <Button
                            key={sport}
                            variant={selectedSport === sport ? "default" : "outline"}
                            onClick={() => onSelectSport(sport)}
                            className="rounded-full"
                            size="sm"
                        >
                            {sport}
                        </Button>
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    );
}
