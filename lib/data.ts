
export type SportCategory =
    | 'Alpine Skiing'
    | 'Biathlon'
    | 'Bobsleigh'
    | 'Cross-Country Skiing'
    | 'Curling'
    | 'Figure Skating'
    | 'Freestyle Skiing'
    | 'Ice Hockey'
    | 'Luge'
    | 'Nordic Combined'
    | 'Short Track'
    | 'Skeleton'
    | 'Ski Jumping'
    | 'Ski Mountaineering'
    | 'Snowboard'
    | 'Speed Skating'
    | 'Opening Ceremony'
    | 'Closing Ceremony';

export interface OlympicEvent {
    id: string;
    sport: SportCategory;
    title: string;
    startTime: string; // ISO 8601
    endTime: string;   // ISO 8601
    location: string;
    gender: 'Men' | 'Women' | 'Mixed' | 'Open';
    isMedalEvent: boolean;
}

// Helper to create dates in Feb 2026 (UTC+1 for Italy)
// However, we'll store as UTC or ISO strings.
// Italy is CET (UTC+1).
const createEvent = (
    id: string,
    day: number,
    hour: number,
    minute: number,
    durationMinutes: number,
    sport: SportCategory,
    title: string,
    location: string,
    gender: 'Men' | 'Women' | 'Mixed' | 'Open',
    isMedalEvent: boolean = false
): OlympicEvent => {
    const start = new Date(Date.UTC(2026, 1, day, hour - 1, minute)); // hour - 1 to convert CET to UTC approx for simplicity, or just use ISO
    // Let's use string manipulation to ensure precise local time representation if we want, or just standard ISO.
    // We'll stick to ISO strings.
    // 2026-02-06T20:00:00+01:00 (Italy Time)
    const pad = (n: number) => n.toString().padStart(2, '0');
    const startTimeISO = `2026-02-${pad(day)}T${pad(hour)}:${pad(minute)}:00+01:00`;

    const end = new Date(new Date(startTimeISO).getTime() + durationMinutes * 60000);
    const endTimeISO = end.toISOString().replace('Z', '+00:00'); // This might differ in timezone offset representation but date-fns handles it.
    // Actually, let's just manually construct the end ISO string with same offset to keep it simple and consistent for "local" time parsing
    // But calculating end time with rolled over hours is annoying manually.
    // Let's trust the Date object to handle duration added to the absolute time.

    return {
        id,
        sport,
        title,
        startTime: startTimeISO,
        endTime: end.toISOString(), // Keep it simple, client will format
        location,
        gender,
        isMedalEvent
    };
};

export const olympicEvents: OlympicEvent[] = [
    // Opening Ceremony
    createEvent('oc-1', 6, 20, 0, 180, 'Opening Ceremony', 'Opening Ceremony', 'San Siro Stadium, Milan', 'Open', false),

    // Feb 7 (Day 1)
    createEvent('alp-1', 7, 11, 0, 120, 'Alpine Skiing', 'Men\'s Downhill Training 1', 'Stelvio, Bormio', 'Men'),
    createEvent('ice-1', 7, 14, 0, 150, 'Ice Hockey', 'Men\'s Prelim Group A: USA vs ITA', 'PalaItalia, Milan', 'Men'),
    createEvent('ski-1', 7, 10, 30, 90, 'Ski Jumping', 'Men\'s Normal Hill Qualification', 'Predazzo', 'Men'),
    createEvent('bio-1', 7, 15, 0, 60, 'Biathlon', 'Mixed Relay 4x6km (W+M)', 'Antholz', 'Mixed', true),

    // Feb 8 (Day 2)
    createEvent('alp-2', 8, 11, 0, 120, 'Alpine Skiing', 'Men\'s Downhill', 'Stelvio, Bormio', 'Men', true),
    createEvent('luge-1', 8, 10, 0, 180, 'Luge', 'Men\'s Singles Runs 1 & 2', 'Cortina Sliding Centre', 'Men'),
    createEvent('spd-1', 8, 13, 30, 120, 'Speed Skating', 'Women\'s 3000m', 'Baselga di Piné', 'Women', true),
    createEvent('cur-1', 8, 9, 0, 180, 'Curling', 'Mixed Doubles Round Robin', 'Cortina Olympic Stadium', 'Mixed'),

    // Feb 9 (Day 3)
    createEvent('fig-1', 9, 10, 0, 210, 'Figure Skating', 'Team Event: Men\'s Free / Pairs Free', 'Forum, Milan', 'Mixed', true),
    createEvent('sno-1', 9, 11, 30, 90, 'Snowboard', 'Women\'s Slopestyle Final', 'Livigno', 'Women', true),
    createEvent('ice-2', 9, 18, 0, 150, 'Ice Hockey', 'Women\'s Group B: CAN vs SUI', 'Fiera Milano', 'Women'),

    // Feb 10 (Day 4)
    createEvent('alp-3', 10, 10, 30, 120, 'Alpine Skiing', 'Women\'s Super-G', 'Olympia delle Tofane, Cortina', 'Women', true),
    createEvent('cro-1', 10, 14, 0, 75, 'Cross-Country Skiing', 'Men\'s Sprint Free Qualification', 'Val di Fiemme', 'Men'),
    createEvent('cro-2', 10, 16, 30, 90, 'Cross-Country Skiing', 'Men\'s Sprint Free Finals', 'Val di Fiemme', 'Men', true),

    // Feb 11 (Day 5)
    createEvent('sno-2', 11, 12, 0, 90, 'Snowboard', 'Men\'s Halfpipe Qualification', 'Livigno', 'Men'),
    createEvent('ske-1', 11, 9, 30, 120, 'Skeleton', 'Women\'s Heat 1 & 2', 'Cortina Sliding Centre', 'Women'),
    createEvent('ice-3', 11, 20, 0, 150, 'Ice Hockey', 'Men\'s Prelim: SWE vs FIN', 'PalaItalia, Milan', 'Men'),

    // Feb 12 (Day 6)
    createEvent('alp-4', 12, 11, 0, 120, 'Alpine Skiing', 'Men\'s Super Combination (Downhill)', 'Stelvio, Bormio', 'Men'),
    createEvent('alp-5', 12, 14, 30, 60, 'Alpine Skiing', 'Men\'s Super Combination (Slalom)', 'Stelvio, Bormio', 'Men', true),
    createEvent('sno-3', 12, 10, 0, 90, 'Snowboard', 'Men\'s Halfpipe Final', 'Livigno', 'Men', true),

    // Feb 13 (Day 7)
    createEvent('bio-2', 13, 15, 0, 60, 'Biathlon', 'Women\'s 7.5km Sprint', 'Antholz', 'Women', true),
    createEvent('spd-2', 13, 14, 0, 100, 'Speed Skating', 'Men\'s 1000m', 'Baselga di Piné', 'Men', true),
    createEvent('bob-1', 13, 10, 0, 150, 'Bobsleigh', 'Women\'s Monobob Heat 1 & 2', 'Cortina Sliding Centre', 'Women'),

    // Feb 14 (Day 8) - Valentines!
    createEvent('fig-2', 14, 19, 0, 180, 'Figure Skating', 'Ice Dance: Rhythm Dance', 'Forum, Milan', 'Mixed'),
    createEvent('cur-2', 14, 14, 0, 180, 'Curling', 'Men\'s Round Robin', 'Cortina Olympic Stadium', 'Men'),
    createEvent('ice-4', 14, 12, 0, 150, 'Ice Hockey', 'Women\'s Quarterfinal 1', 'Fiera Milano', 'Women'),

    // Feb 15 (Day 9)
    createEvent('alp-6', 15, 10, 0, 120, 'Alpine Skiing', 'Women\'s Downhill', 'Olympia delle Tofane, Cortina', 'Women', true),
    createEvent('bio-3', 15, 12, 30, 45, 'Biathlon', 'Men\'s 12.5km Pursuit', 'Antholz', 'Men', true),
    createEvent('bio-4', 15, 14, 30, 45, 'Biathlon', 'Women\'s 10km Pursuit', 'Antholz', 'Women', true),

    // Feb 16 (Day 10)
    createEvent('fre-1', 16, 19, 0, 90, 'Freestyle Skiing', 'Women\'s Aerials Final', 'Livigno', 'Women', true),
    createEvent('bob-2', 16, 10, 0, 150, 'Bobsleigh', '2-Man Heat 1 & 2', 'Cortina Sliding Centre', 'Men'),
    createEvent('ice-5', 16, 21, 0, 150, 'Ice Hockey', 'Men\'s Qualification Playoff 1', 'PalaItalia, Milan', 'Men'),

    // Feb 17 (Day 11)
    createEvent('alp-7', 17, 10, 0, 120, 'Alpine Skiing', 'Team Parallel', 'Olympia delle Tofane, Cortina', 'Mixed', true),
    createEvent('fig-3', 17, 19, 0, 200, 'Figure Skating', 'Women\'s Short Program', 'Forum, Milan', 'Women'),
    createEvent('nor-1', 17, 15, 0, 60, 'Nordic Combined', 'Individual Gundersen LH/10km', 'Val di Fiemme', 'Men', true),

    // Feb 18 (Day 12)
    createEvent('ice-6', 18, 14, 0, 150, 'Ice Hockey', 'Men\'s Quarterfinal 1', 'PalaItalia, Milan', 'Men'),
    createEvent('ice-7', 18, 18, 30, 150, 'Ice Hockey', 'Men\'s Quarterfinal 2', 'PalaItalia, Milan', 'Men'),
    createEvent('sho-1', 18, 19, 30, 120, 'Short Track', 'Women\'s 1500m Final', 'Forum, Milan', 'Women', true),

    // Feb 19 (Day 13)
    createEvent('cur-3', 19, 14, 0, 180, 'Curling', 'Women\'s Semifinal', 'Cortina Olympic Stadium', 'Women'),
    createEvent('fig-4', 19, 19, 0, 210, 'Figure Skating', 'Women\'s Free Skating', 'Forum, Milan', 'Women', true),

    // Feb 20 (Day 14)
    createEvent('ice-8', 20, 14, 0, 150, 'Ice Hockey', 'Men\'s Semifinal 1', 'PalaItalia, Milan', 'Men'),
    createEvent('bio-5', 20, 15, 0, 45, 'Biathlon', 'Men\'s 15km Mass Start', 'Antholz', 'Men', true),
    createEvent('cur-4', 20, 19, 0, 180, 'Curling', 'Men\'s Gold Medal Game', 'Cortina Olympic Stadium', 'Men', true),

    // Feb 21 (Day 15)
    createEvent('alp-8', 21, 10, 30, 120, 'Alpine Skiing', 'Men\'s Slalom Clean', 'Stelvio, Bormio', 'Men', true),
    createEvent('ice-9', 21, 16, 0, 150, 'Ice Hockey', 'Men\'s Bronze Medal Game', 'PalaItalia, Milan', 'Men', true),
    createEvent('fig-5', 21, 20, 0, 150, 'Figure Skating', 'Gala Exhibition', 'Forum, Milan', 'Open'),

    // Feb 22 (Day 16) - Closing
    createEvent('ice-10', 22, 14, 0, 150, 'Ice Hockey', 'Men\'s Gold Medal Game', 'PalaItalia, Milan', 'Men', true),
    createEvent('cro-3', 22, 11, 0, 150, 'Cross-Country Skiing', 'Women\'s 30km Mass Start', 'Val di Fiemme', 'Women', true),
    createEvent('cc-1', 22, 20, 0, 180, 'Closing Ceremony', 'Closing Ceremony', 'Verona Arena', 'Open', false),
];
