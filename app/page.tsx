
"use client";

import { useState, useMemo, useEffect } from "react";
import { olympicEvents, SportCategory, OlympicEvent } from "@/lib/data";
import { EventCard } from "@/components/dashboard/event-card";
import { SportFilter } from "@/components/dashboard/sport-filter";
import { Snowflake, CalendarClock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const [selectedSport, setSelectedSport] = useState<SportCategory | 'All'>('All');
  const [currentTime, setCurrentTime] = useState<Date | null>(null); // Start null to avoid hydration mismatch

  // Hydration fix: set time on mount
  useEffect(() => {
    setCurrentTime(new Date());
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const availableSports = useMemo(() => {
    const sports = new Set(olympicEvents.map(e => e.sport));
    return Array.from(sports).sort();
  }, []);

  const filteredEvents = useMemo(() => {
    let events = olympicEvents;
    if (selectedSport !== 'All') {
      events = events.filter(e => e.sport === selectedSport);
    }
    // Sort by start time
    return events.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
  }, [selectedSport]);

  const getEventStatus = (event: OlympicEvent, now: Date) => {
    const start = new Date(event.startTime);
    const end = new Date(event.endTime);

    if (now >= start && now <= end) return 'Live';
    if (now > end) return 'Finished';
    return 'Upcoming';
  };

  // Group events by Date ? Or just list them. 
  // Let's list them by Day headers for better UX.
  const groupedEvents = useMemo(() => {
    const groups: Record<string, typeof olympicEvents> = {};
    filteredEvents.forEach(event => {
      const dateKey = new Date(event.startTime).toLocaleDateString(undefined, {
        weekday: 'long', month: 'long', day: 'numeric'
      });
      if (!groups[dateKey]) groups[dateKey] = [];
      groups[dateKey].push(event);
    });
    return groups;
  }, [filteredEvents]);

  if (!currentTime) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="animate-spin text-blue-600">
        <Snowflake className="h-8 w-8" />
      </div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 h-[60px] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <Snowflake className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-cyan-500 hidden sm:block">
              Milano Cortina 2026
            </h1>
            <h1 className="text-xl font-bold text-blue-700 sm:hidden">
              2026
            </h1>
          </div>
          <div className="text-sm font-medium text-slate-500 flex items-center gap-2">
            <CalendarClock className="h-4 w-4" />
            <span>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>
      </header>

      {/* Filters */}
      <SportFilter
        selectedSport={selectedSport}
        onSelectSport={setSelectedSport}
        availableSports={availableSports}
      />

      {/* Content */}
      <main className="container mx-auto px-4 pt-6 space-y-8">
        {Object.entries(groupedEvents).map(([date, events]) => (
          <section key={date} className="space-y-4">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-bold text-slate-800 bg-white/50 px-3 py-1 rounded-full border shadow-sm">
                {date}
              </h2>
              <div className="h-px bg-slate-200 flex-1" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {events.map(event => (
                <EventCard
                  key={event.id}
                  event={event}
                  status={getEventStatus(event, currentTime)}
                />
              ))}
            </div>
          </section>
        ))}

        {filteredEvents.length === 0 && (
          <div className="text-center py-20 text-slate-400">
            <p className="text-lg">No events found for this filter.</p>
            <Button variant="link" onClick={() => setSelectedSport('All')}>
              Clear Filters
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
