
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { OlympicEvent } from "@/lib/data";
import { StatusBadge } from "./status-badge";
import { MapPin, Trophy } from "lucide-react";

interface EventCardProps {
    event: OlympicEvent;
    status: 'Live' | 'Upcoming' | 'Finished';
}

export function EventCard({ event, status }: EventCardProps) {
    return (
        <Card className={cn(
            "overflow-hidden transition-all duration-300 hover:shadow-md border-l-4",
            status === 'Live' ? "border-l-red-500 shadow-red-100" :
                status === 'Finished' ? "border-l-slate-300 opacity-80" :
                    "border-l-blue-500"
        )}>
            <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        {event.sport}
                    </span>
                    {event.isMedalEvent && (
                        <Trophy className="h-3.5 w-3.5 text-yellow-500" aria-label="Medal Event" />
                    )}
                </div>
                <StatusBadge status={status} startTime={event.startTime} />
            </CardHeader>
            <CardContent className="p-4 pt-1">
                <h3 className="font-semibold text-lg leading-tight mb-2">
                    {event.title}
                </h3>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" />
                        <span className="truncate max-w-[150px]">{event.location}</span>
                    </div>
                    <div className="text-xs px-2 py-0.5 rounded-full bg-slate-100">
                        {event.gender}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
