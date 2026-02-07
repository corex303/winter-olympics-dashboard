
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle2, Radio } from "lucide-react";

type EventStatus = 'Live' | 'Upcoming' | 'Finished';

interface StatusBadgeProps {
    status: EventStatus;
    startTime?: string;
    className?: string;
}

export function StatusBadge({ status, startTime, className }: StatusBadgeProps) {
    if (status === 'Live') {
        return (
            <Badge variant="destructive" className={cn("animate-pulse gap-1.5", className)}>
                <Radio className="h-3 w-4" />
                LIVE
            </Badge>
        );
    }

    if (status === 'Finished') {
        return (
            <Badge variant="secondary" className={cn("gap-1.5 bg-slate-200 text-slate-600 hover:bg-slate-300", className)}>
                <CheckCircle2 className="h-3 w-3" />
                Finished
            </Badge>
        );
    }

    // Upcoming
    return (
        <Badge variant="outline" className={cn("gap-1.5 border-slate-300 text-slate-600", className)}>
            <Clock className="h-3 w-3" />
            {startTime ? new Date(startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Upcoming'}
        </Badge>
    );
}
