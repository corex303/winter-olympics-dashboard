
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

// Helper: 2026-02-XX T HH:MM (Italy Time UTC+1)
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
    const pad = (n: number) => n.toString().padStart(2, '0');
    const startTimeISO = `2026-02-${pad(day)}T${pad(hour)}:${pad(minute)}:00+01:00`;
    const end = new Date(new Date(startTimeISO).getTime() + durationMinutes * 60000);

    return {
        id,
        sport,
        title,
        startTime: startTimeISO,
        endTime: end.toISOString(),
        location,
        gender,
        isMedalEvent
    };
};

export const olympicEvents: OlympicEvent[] = [
    // --- Feb 4 (Day -2) ---
    createEvent('cur-pre-1', 4, 19, 0, 120, 'Curling', 'Mixed Doubles Round Robin - Session 1', 'Cortina Olympic Stadium', 'Mixed'),
    createEvent('cur-pre-2', 4, 14, 0, 120, 'Curling', 'Mixed Doubles Round Robin - Session 2', 'Cortina Olympic Stadium', 'Mixed'),

    // --- Feb 5 (Day -1) ---
    createEvent('ice-pre-1', 5, 12, 0, 150, 'Ice Hockey', 'Women\'s Prelim: USA vs JPN', 'Fiera Milano', 'Women'),
    createEvent('cur-pre-3', 5, 9, 0, 120, 'Curling', 'Mixed Doubles Round Robin - Session 3', 'Cortina Olympic Stadium', 'Mixed'),
    createEvent('cur-pre-4', 5, 14, 0, 120, 'Curling', 'Mixed Doubles Round Robin - Session 4', 'Cortina Olympic Stadium', 'Mixed'),
    createEvent('fre-mog-q', 5, 11, 0, 90, 'Freestyle Skiing', 'Men\'s & Women\'s Moguls Qual.', 'Livigno', 'Mixed'),

    // --- Feb 6 (Day 0) - Opening ---
    createEvent('alp-tr-1', 6, 10, 0, 120, 'Alpine Skiing', 'Men\'s Downhill Training 1', 'Stelvio, Bormio', 'Men'),
    createEvent('ski-tr-1', 6, 11, 0, 90, 'Ski Jumping', 'Normal Hill Training', 'Predazzo', 'Mixed'),
    createEvent('fig-team-1', 6, 14, 0, 180, 'Figure Skating', 'Team Event: Men\'s SP / Pairs SP', 'Forum, Milan', 'Mixed'),
    createEvent('oc-1', 6, 20, 0, 180, 'Opening Ceremony', 'Opening Ceremony', 'San Siro Stadium, Milan', 'Open', false),

    // --- Feb 7 (Day 1) ---
    createEvent('alp-1', 7, 11, 0, 120, 'Alpine Skiing', 'Men\'s Downhill Training 2', 'Stelvio, Bormio', 'Men'),
    createEvent('cro-w-ski', 7, 10, 0, 90, 'Cross-Country Skiing', 'Women\'s 15km Skiathlon', 'Val di Fiemme', 'Women', true),
    createEvent('spd-w-3000', 7, 13, 0, 120, 'Speed Skating', 'Women\'s 3000m', 'Baselga di Piné', 'Women', true),
    createEvent('ice-w-pre2', 7, 16, 0, 150, 'Ice Hockey', 'Women\'s Prelim: CAN vs FIN', 'Fiera Milano', 'Women'),
    createEvent('luge-m-1', 7, 10, 0, 150, 'Luge', 'Men\'s Singles Run 1 & 2', 'Cortina Sliding Centre', 'Men'),
    createEvent('ski-m-nh-q', 7, 12, 0, 60, 'Ski Jumping', 'Men\'s Normal Hill Qualification', 'Predazzo', 'Men'),
    createEvent('bio-mix-r', 7, 15, 0, 75, 'Biathlon', 'Mixed Relay 4x6km', 'Antholz', 'Mixed', true),
    createEvent('sho-mix-r', 7, 19, 0, 60, 'Short Track', 'Mixed Team Relay Final', 'Forum, Milan', 'Mixed', true),

    // --- Feb 8 (Day 2) ---
    createEvent('alp-m-dh', 8, 11, 0, 120, 'Alpine Skiing', 'Men\'s Downhill', 'Stelvio, Bormio', 'Men', true),
    createEvent('cro-m-ski', 8, 10, 0, 90, 'Cross-Country Skiing', 'Men\'s 30km Skiathlon', 'Val di Fiemme', 'Men', true),
    createEvent('spd-m-5000', 8, 13, 30, 120, 'Speed Skating', 'Men\'s 5000m', 'Baselga di Piné', 'Men', true),
    createEvent('luge-m-f', 8, 10, 0, 150, 'Luge', 'Men\'s Singles Run 3 & 4', 'Cortina Sliding Centre', 'Men', true),
    createEvent('ski-m-nh-f', 8, 12, 30, 90, 'Ski Jumping', 'Men\'s Normal Hill Final', 'Predazzo', 'Men', true),
    createEvent('fre-w-mog', 8, 19, 0, 90, 'Freestyle Skiing', 'Women\'s Moguls Final', 'Livigno', 'Women', true),
    createEvent('sno-w-slope', 8, 10, 30, 90, 'Snowboard', 'Women\'s Slopestyle Final', 'Livigno', 'Women', true),

    // --- Feb 9 (Day 3) ---
    createEvent('alp-w-gs-1', 9, 10, 0, 90, 'Alpine Skiing', 'Women\'s Giant Slalom Run 1', 'Olympia delle Tofane, Cortina', 'Women'),
    createEvent('alp-w-gs-2', 9, 13, 0, 90, 'Alpine Skiing', 'Women\'s Giant Slalom Run 2', 'Olympia delle Tofane, Cortina', 'Women', true),
    createEvent('fig-team-f', 9, 10, 0, 180, 'Figure Skating', 'Team Event: Women\'s Free / Dance Free', 'Forum, Milan', 'Mixed', true),
    createEvent('bio-w-15', 9, 14, 30, 90, 'Biathlon', 'Women\'s 15km Individual', 'Antholz', 'Women', true),
    createEvent('sho-w-500', 9, 19, 0, 90, 'Short Track', 'Women\'s 500m Final', 'Forum, Milan', 'Women', true),
    createEvent('sho-m-1000', 9, 20, 0, 90, 'Short Track', 'Men\'s 1000m Final', 'Forum, Milan', 'Men', true),
    createEvent('fre-m-mog', 9, 19, 30, 90, 'Freestyle Skiing', 'Men\'s Moguls Final', 'Livigno', 'Men', true),
    createEvent('sno-m-slope', 9, 11, 0, 90, 'Snowboard', 'Men\'s Slopestyle Final', 'Livigno', 'Men', true),

    // --- Feb 10 (Day 4) ---
    createEvent('alp-m-sg', 10, 11, 0, 120, 'Alpine Skiing', 'Men\'s Super-G', 'Stelvio, Bormio', 'Men', true),
    createEvent('spd-w-1500', 10, 13, 30, 90, 'Speed Skating', 'Women\'s 1500m', 'Baselga di Piné', 'Women', true),
    createEvent('bio-m-20', 10, 14, 30, 90, 'Biathlon', 'Men\'s 20km Individual', 'Antholz', 'Men', true),
    createEvent('luge-w-1', 10, 10, 0, 150, 'Luge', 'Women\'s Singles Run 1 & 2', 'Cortina Sliding Centre', 'Women'),
    createEvent('cro-spr-q', 10, 9, 0, 120, 'Cross-Country Skiing', 'Sprint Free Qualification', 'Val di Fiemme', 'Mixed'),
    createEvent('cro-spr-f', 10, 12, 30, 120, 'Cross-Country Skiing', 'Sprint Free Finals', 'Val di Fiemme', 'Mixed', true),
    createEvent('ice-m-pre1', 10, 16, 0, 150, 'Ice Hockey', 'Men\'s Prelim: USA vs SVK', 'PalaItalia, Milan', 'Men'),
    createEvent('cur-mix-gold', 10, 20, 0, 180, 'Curling', 'Mixed Doubles Gold Medal', 'Cortina Olympic Stadium', 'Mixed', true),

    // --- Feb 11 (Day 5) ---
    createEvent('alp-w-sl-1', 11, 10, 0, 90, 'Alpine Skiing', 'Women\'s Slalom Run 1', 'Olympia delle Tofane, Cortina', 'Women'),
    createEvent('alp-w-sl-2', 11, 13, 0, 90, 'Alpine Skiing', 'Women\'s Slalom Run 2', 'Olympia delle Tofane, Cortina', 'Women', true),
    createEvent('fre-w-big', 11, 11, 0, 90, 'Freestyle Skiing', 'Women\'s Big Air Final', 'Livigno', 'Women', true),
    createEvent('sno-m-hp-f', 11, 12, 30, 90, 'Snowboard', 'Men\'s Halfpipe Final', 'Livigno', 'Men', true),
    createEvent('ske-w-1', 11, 9, 30, 120, 'Skeleton', 'Women\'s Heat 1 & 2', 'Cortina Sliding Centre', 'Women'),
    createEvent('luge-d-1', 11, 14, 0, 90, 'Luge', 'Doubles Run 1 & 2', 'Cortina Sliding Centre', 'Mixed', true), // Doubles often same day
    createEvent('nor-nh-10', 11, 15, 0, 90, 'Nordic Combined', 'Individual NH/10km', 'Val di Fiemme', 'Men', true),
    createEvent('fig-m-sp', 11, 19, 0, 210, 'Figure Skating', 'Men\'s Short Program', 'Forum, Milan', 'Men'),

    // --- Feb 12 (Day 6) ---
    createEvent('alp-m-comb', 12, 10, 30, 180, 'Alpine Skiing', 'Men\'s Alpine Combined', 'Stelvio, Bormio', 'Men', true),
    createEvent('spd-m-1500', 12, 13, 30, 90, 'Speed Skating', 'Men\'s 1500m', 'Baselga di Piné', 'Men', true),
    createEvent('ske-m-1', 12, 9, 30, 120, 'Skeleton', 'Men\'s Heat 1 & 2', 'Cortina Sliding Centre', 'Men'),
    createEvent('ske-w-f', 12, 14, 0, 120, 'Skeleton', 'Women\'s Heat 3 & 4', 'Cortina Sliding Centre', 'Women', true),
    createEvent('cro-w-10', 12, 11, 0, 90, 'Cross-Country Skiing', 'Women\'s 10km Classic', 'Val di Fiemme', 'Women', true),
    createEvent('sno-wx-cross', 12, 12, 0, 90, 'Snowboard', 'Mixed Team Snowboard Cross', 'Livigno', 'Mixed', true),
    createEvent('fre-mix-aer', 12, 19, 0, 90, 'Freestyle Skiing', 'Mixed Team Aerials', 'Livigno', 'Mixed', true),
    createEvent('ice-m-pre2', 12, 20, 0, 150, 'Ice Hockey', 'Men\'s Prelim: CAN vs SWE', 'PalaItalia, Milan', 'Men'),

    // --- Feb 13 (Day 7) ---
    createEvent('alp-w-sg', 13, 11, 0, 120, 'Alpine Skiing', 'Women\'s Super-G', 'Olympia delle Tofane, Cortina', 'Women', true),
    createEvent('cro-m-15', 13, 11, 0, 90, 'Cross-Country Skiing', 'Men\'s 15km Classic', 'Val di Fiemme', 'Men', true),
    createEvent('bio-w-sp', 13, 15, 0, 75, 'Biathlon', 'Women\'s 7.5km Sprint', 'Antholz', 'Women', true),
    createEvent('ske-m-f', 13, 9, 30, 120, 'Skeleton', 'Men\'s Heat 3 & 4', 'Cortina Sliding Centre', 'Men', true),
    createEvent('spd-w-500', 13, 14, 0, 90, 'Speed Skating', 'Women\'s 500m', 'Baselga di Piné', 'Women', true),
    createEvent('sho-w-1000', 13, 19, 0, 90, 'Short Track', 'Women\'s 1000m Final', 'Forum, Milan', 'Women', true),
    createEvent('sho-m-relay', 13, 20, 0, 60, 'Short Track', 'Men\'s 5000m Relay Heats', 'Forum, Milan', 'Men'),
    createEvent('cur-m-rr', 13, 9, 0, 180, 'Curling', 'Men\'s Round Robin', 'Cortina Olympic Stadium', 'Men'),

    // --- Feb 14 (Day 8) ---
    createEvent('bio-m-sp', 14, 11, 0, 75, 'Biathlon', 'Men\'s 10km Sprint', 'Antholz', 'Men', true),
    createEvent('cro-w-rel', 14, 10, 30, 90, 'Cross-Country Skiing', 'Women\'s 4x5km Relay', 'Val di Fiemme', 'Women', true),
    createEvent('spd-w-team', 14, 13, 30, 90, 'Speed Skating', 'Women\'s Team Pursuit', 'Baselga di Piné', 'Women', true),
    createEvent('fig-dance-r', 14, 19, 0, 180, 'Figure Skating', 'Ice Dance Rhythm Dance', 'Forum, Milan', 'Mixed'),
    createEvent('ski-w-lh', 14, 12, 0, 90, 'Ski Jumping', 'Women\'s Large Hill Final', 'Predazzo', 'Women', true),
    createEvent('ske-team', 14, 15, 0, 90, 'Skeleton', 'Mixed Team', 'Cortina Sliding Centre', 'Mixed', true),
    createEvent('alp-tr-m-gs', 14, 10, 0, 60, 'Alpine Skiing', 'Men\'s Training', 'Stelvio, Bormio', 'Men'),

    // --- Feb 15 (Day 9) ---
    createEvent('alp-m-gs-1', 15, 10, 0, 90, 'Alpine Skiing', 'Men\'s Giant Slalom Run 1', 'Stelvio, Bormio', 'Men'),
    createEvent('alp-m-gs-2', 15, 13, 0, 90, 'Alpine Skiing', 'Men\'s Giant Slalom Run 2', 'Stelvio, Bormio', 'Men', true),
    createEvent('cro-m-rel', 15, 10, 30, 105, 'Cross-Country Skiing', 'Men\'s 4x10km Relay', 'Val di Fiemme', 'Men', true),
    createEvent('bio-w-pur', 15, 12, 30, 45, 'Biathlon', 'Women\'s 10km Pursuit', 'Antholz', 'Women', true),
    createEvent('bio-m-pur', 15, 14, 30, 45, 'Biathlon', 'Men\'s 12.5km Pursuit', 'Antholz', 'Men', true),
    createEvent('spd-m-team', 15, 13, 30, 90, 'Speed Skating', 'Men\'s Team Pursuit', 'Baselga di Piné', 'Men', true),
    createEvent('fre-w-aer', 15, 19, 0, 90, 'Freestyle Skiing', 'Women\'s Aerials Final', 'Livigno', 'Women', true),
    createEvent('bob-m-2', 15, 10, 0, 150, 'Bobsleigh', '2-Man Heat 1 & 2', 'Cortina Sliding Centre', 'Men'),
    createEvent('sno-m-big', 15, 12, 0, 90, 'Snowboard', 'Men\'s Big Air Final', 'Livigno', 'Men', true),

    // --- Feb 16 (Day 10) ---
    createEvent('alp-w-dh', 16, 11, 0, 120, 'Alpine Skiing', 'Women\'s Downhill', 'Olympia delle Tofane, Cortina', 'Women', true),
    createEvent('bob-m-2-f', 16, 10, 0, 150, 'Bobsleigh', '2-Man Heat 3 & 4', 'Cortina Sliding Centre', 'Men', true),
    createEvent('fre-m-aer', 16, 19, 0, 90, 'Freestyle Skiing', 'Men\'s Aerials Final', 'Livigno', 'Men', true),
    createEvent('ice-w-sf', 16, 14, 0, 150, 'Ice Hockey', 'Women\'s Semifinal 1', 'Fiera Milano', 'Women'),
    createEvent('ice-w-sf2', 16, 19, 0, 150, 'Ice Hockey', 'Women\'s Semifinal 2', 'Fiera Milano', 'Women'),
    createEvent('ski-m-team', 16, 16, 0, 120, 'Ski Jumping', 'Men\'s Team Large Hill', 'Predazzo', 'Men', true),

    // --- Feb 17 (Day 11) ---
    createEvent('alp-mix-team', 17, 10, 0, 120, 'Alpine Skiing', 'Mixed Team Parallel', 'Olympia delle Tofane, Cortina', 'Mixed', true),
    createEvent('nor-lh-10', 17, 15, 0, 90, 'Nordic Combined', 'Individual LH/10km', 'Val di Fiemme', 'Men', true),
    createEvent('fig-w-sp', 17, 19, 0, 210, 'Figure Skating', 'Women\'s Short Program', 'Forum, Milan', 'Women'),
    createEvent('bio-m-rel', 17, 14, 30, 90, 'Biathlon', 'Men\'s 4x7.5km Relay', 'Antholz', 'Men', true),
    createEvent('spd-w-1000', 17, 13, 30, 90, 'Speed Skating', 'Women\'s 1000m', 'Baselga di Piné', 'Women', true),
    createEvent('fre-w-ski', 17, 12, 0, 90, 'Freestyle Skiing', 'Women\'s Ski Cross Final', 'Livigno', 'Women', true),
    createEvent('ice-m-po', 17, 18, 0, 150, 'Ice Hockey', 'Men\'s Qualification Playoff', 'PalaItalia, Milan', 'Men'),

    // --- Feb 18 (Day 12) ---
    createEvent('alp-m-sl-1', 18, 10, 0, 90, 'Alpine Skiing', 'Men\'s Slalom Run 1', 'Stelvio, Bormio', 'Men'),
    createEvent('alp-m-sl-2', 18, 13, 0, 90, 'Alpine Skiing', 'Men\'s Slalom Run 2', 'Stelvio, Bormio', 'Men', true),
    createEvent('bio-w-rel', 18, 15, 0, 90, 'Biathlon', 'Women\'s 4x6km Relay', 'Antholz', 'Women', true),
    createEvent('fre-m-ski', 18, 12, 0, 90, 'Freestyle Skiing', 'Men\'s Ski Cross Final', 'Livigno', 'Men', true),
    createEvent('ice-m-qf', 18, 14, 0, 150, 'Ice Hockey', 'Men\'s Quarterfinal 1', 'PalaItalia, Milan', 'Men'),
    createEvent('ice-m-qf2', 18, 16, 30, 150, 'Ice Hockey', 'Men\'s Quarterfinal 2', 'PalaItalia, Milan', 'Men'),
    createEvent('bob-w-2', 18, 10, 0, 150, 'Bobsleigh', 'Women\'s 2-Man Heat 1 & 2', 'Cortina Sliding Centre', 'Women'),

    // --- Feb 19 (Day 13) ---
    createEvent('alp-w-comb', 19, 10, 30, 180, 'Alpine Skiing', 'Women\'s Alpine Combined', 'Olympia delle Tofane, Cortina', 'Women', true),
    createEvent('nor-team', 19, 15, 0, 90, 'Nordic Combined', 'Team LH/4x5km', 'Val di Fiemme', 'Men', true),
    createEvent('fig-w-fs', 19, 19, 0, 210, 'Figure Skating', 'Women\'s Free Skating', 'Forum, Milan', 'Women', true),
    createEvent('cur-m-sf', 19, 14, 0, 180, 'Curling', 'Men\'s Semifinal', 'Cortina Olympic Stadium', 'Men'),
    createEvent('cur-w-sf', 19, 19, 0, 180, 'Curling', 'Women\'s Semifinal', 'Cortina Olympic Stadium', 'Women'),
    createEvent('ice-w-bronze', 19, 16, 0, 150, 'Ice Hockey', 'Women\'s Bronze Medal', 'PalaItalia, Milan', 'Women', true),
    createEvent('ice-w-gold', 19, 20, 0, 150, 'Ice Hockey', 'Women\'s Gold Medal', 'PalaItalia, Milan', 'Women', true),
    createEvent('bob-w-2-f', 19, 10, 0, 150, 'Bobsleigh', 'Women\'s 2-Man Heat 3 & 4', 'Cortina Sliding Centre', 'Women', true),

    // --- Feb 20 (Day 14) ---
    createEvent('bio-m-mass', 20, 12, 30, 45, 'Biathlon', 'Men\'s 15km Mass Start', 'Antholz', 'Men', true),
    createEvent('bio-w-mass', 20, 14, 30, 45, 'Biathlon', 'Women\'s 12.5km Mass Start', 'Antholz', 'Women', true),
    createEvent('fre-hp-m', 20, 11, 0, 90, 'Freestyle Skiing', 'Men\'s Halfpipe Final', 'Livigno', 'Men', true),
    createEvent('ice-m-sf1', 20, 14, 0, 150, 'Ice Hockey', 'Men\'s Semifinal 1', 'PalaItalia, Milan', 'Men'),
    createEvent('ice-m-sf2', 20, 20, 0, 150, 'Ice Hockey', 'Men\'s Semifinal 2', 'PalaItalia, Milan', 'Men'),
    createEvent('cur-m-bronze', 20, 14, 0, 180, 'Curling', 'Men\'s Bronze Medal', 'Cortina Olympic Stadium', 'Men', true),
    createEvent('cur-w-bronze', 20, 19, 0, 180, 'Curling', 'Women\'s Bronze Medal', 'Cortina Olympic Stadium', 'Women', true),
    createEvent('spd-m-1000', 20, 13, 30, 90, 'Speed Skating', 'Men\'s 1000m', 'Baselga di Piné', 'Men', true),

    // --- Feb 21 (Day 15) ---
    createEvent('cro-m-50', 21, 10, 0, 150, 'Cross-Country Skiing', 'Men\'s 50km Mass Start', 'Val di Fiemme', 'Men', true),
    createEvent('cur-m-gold', 21, 14, 0, 180, 'Curling', 'Men\'s Gold Medal', 'Cortina Olympic Stadium', 'Men', true),
    createEvent('cur-w-gold', 21, 19, 0, 180, 'Curling', 'Women\'s Gold Medal', 'Cortina Olympic Stadium', 'Women', true),
    createEvent('fig-pair-fs', 21, 19, 0, 180, 'Figure Skating', 'Pairs Free Skating', 'Forum, Milan', 'Mixed', true),
    createEvent('ice-m-bronze', 21, 16, 0, 150, 'Ice Hockey', 'Men\'s Bronze Medal', 'PalaItalia, Milan', 'Men', true),
    createEvent('bob-4-1', 21, 10, 0, 150, 'Bobsleigh', '4-Man Heat 1 & 2', 'Cortina Sliding Centre', 'Men'),
    createEvent('spd-mass', 21, 13, 30, 90, 'Speed Skating', 'Men\'s & Women\'s Mass Start', 'Baselga di Piné', 'Mixed', true),

    // --- Feb 22 (Day 16) - Closing ---
    createEvent('cro-w-30', 22, 11, 0, 120, 'Cross-Country Skiing', 'Women\'s 30km Mass Start', 'Val di Fiemme', 'Women', true),
    createEvent('ice-m-gold', 22, 14, 0, 150, 'Ice Hockey', 'Men\'s Gold Medal', 'PalaItalia, Milan', 'Men', true),
    createEvent('bob-4-f', 22, 10, 0, 150, 'Bobsleigh', '4-Man Heat 3 & 4', 'Cortina Sliding Centre', 'Men', true),
    createEvent('cc-1', 22, 20, 0, 180, 'Closing Ceremony', 'Closing Ceremony', 'Verona Arena', 'Open', false),
];
