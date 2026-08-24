export interface SchoolDimensionDetails {
  researchJustification: string;
  lookFors: string[];
}

export const SCHOOL_RUBRIC_GUIDES: Record<string, Record<string, SchoolDimensionDetails>> = {
  'jls-middle': {
    academics: {
      researchJustification: 'Compacted math tracks (Algebra/Geometry in 8th), Homework Habitat free after-school study in library, PAUSD homework limits.',
      lookFors: ['Observe Homework Habitat.', 'Ask about math compaction.'],
    },
    athletics: {
      researchJustification: 'City MSA league competitive soccer & track, on-campus fields + adjacent 21-acre Mitchell Park sports complex.',
      lookFors: ['Check out Mitchell Park fields.', 'Ask about MSA league tryouts.'],
    },
    community: {
      researchJustification: "Top bikeable neighborhood community (Midtown/Charleston Meadows), strict 'Off and Away' phone ban, Wellness Center.",
      lookFors: ['Observe the Wellness Center.', 'Gauge the neighborhood vibe.'],
    },
    facilities: {
      researchJustification: 'Dedicated 6-8 campus, Measure Z modernizations (new Admin, Library, Cafetorium), large lunch quads.',
      lookFors: ['Tour the new Library and Cafetorium.', 'Check out the lunch quads.'],
    },
    logistics: {
      researchJustification: 'Guaranteed resident enrollment, $0 tuition, ~10-15 min commute to Sunnyvale workplace down Middlefield/Central Expy.',
      lookFors: ['Test the commute down Middlefield.', 'Confirm resident enrollment process.'],
    },
    extracurriculars: {
      researchJustification: '6th-grade exploratory wheel, 30+ electives (robotics, marine bio, KJLS broadcast), outdoor science camp.',
      lookFors: ['Ask about KJLS broadcast.', 'Inquire about robotics elective.'],
    },
  },
  'blach-intermediate': {
    academics: {
      researchJustification: 'Top 1% CA test scores, compacted math to Geometry, LAEF-funded writing specialists, district homework limits.',
      lookFors: ['Observe writing specialists.', 'Ask about math to Geometry.'],
    },
    athletics: {
      researchJustification: 'VAL league competitive soccer & track, on-campus fields/gym, Rec Dept partnership.',
      lookFors: ['Check the on-campus fields.', 'Ask about VAL league soccer.'],
    },
    community: {
      researchJustification: "High local friend density in Los Altos/South MV, strict 'Away for the Day' phone ban, strong LAEF community foundation.",
      lookFors: ['Gauge the local friend density.', 'Ask about the phone ban enforcement.'],
    },
    facilities: {
      researchJustification: 'Dedicated 7-8 junior high campus (smaller 390-student cohort), soccer field, track, CSTEM labs, Blach Multi.',
      lookFors: ['Tour the CSTEM labs.', 'Check the soccer field.'],
    },
    logistics: {
      researchJustification: 'Guaranteed resident enrollment, $0 tuition, shortest work commute (~8-12 min to Sunnyvale!), feeds to top-tier MVLA high schools.',
      lookFors: ['Test the commute to Sunnyvale.', 'Confirm MVLA feeder process.'],
    },
    extracurriculars: {
      researchJustification: '6th-grade Science Camp in LASD elementary, LAEF band/orchestra, Science Olympiad, robotics.',
      lookFors: ['Ask about Science Olympiad.', 'Inquire about LAEF band.'],
    },
  },
  'hillview-middle': {
    academics: {
      researchJustification: '8-time CA Distinguished School, compacted math pathways, Qu3ST daily study support period.',
      lookFors: ['Observe Qu3ST daily study support.', 'Ask about compacted math.'],
    },
    athletics: {
      researchJustification: 'After-school athletics (no-cut competitive teams), City Rec league partnership, fitness PE.',
      lookFors: ['Check the fitness PE.', 'Ask about no-cut teams.'],
    },
    community: {
      researchJustification: 'Top neighborhood community in Menlo Park, 100-student Academy model, PBIS Restorative Justice, strict phone ban.',
      lookFors: ['Observe the Academy model.', 'Ask about PBIS Restorative Justice.'],
    },
    facilities: {
      researchJustification: 'Dedicated 6-8 middle school, modern campus rebuild, PAC theater, all-weather turf field & track, double gym.',
      lookFors: ['Tour the PAC theater.', 'Check the turf field.'],
    },
    logistics: {
      researchJustification: 'Guaranteed resident enrollment with move, $0 tuition, ~15-20 min drive to Sunnyvale work.',
      lookFors: ['Test the drive to Sunnyvale.', 'Confirm resident enrollment.'],
    },
    extracurriculars: {
      researchJustification: '6-spoke exploratory wheel, award-winning band/orchestra/jazz, drama/musical theater, ASB.',
      lookFors: ['Ask about the exploratory wheel.', 'Inquire about drama/musical theater.'],
    },
  },
  'fletcher-middle': {
    academics: {
      researchJustification: 'Top 1-2% statewide, math acceleration validation, PAUSD homework limits, PiE writing support.',
      lookFors: ['Observe PiE writing support.', 'Ask about math acceleration.'],
    },
    athletics: {
      researchJustification: 'City of Palo Alto MSA sports (soccer, track, basketball), lunchtime intramural tournaments.',
      lookFors: ['Check lunchtime intramurals.', 'Ask about MSA sports.'],
    },
    community: {
      researchJustification: 'South Palo Alto bikeable community (Barron Park/Greenmeadow), strict phone policy, ~600 student community scale.',
      lookFors: ['Gauge the community scale.', 'Ask about phone policy.'],
    },
    facilities: {
      researchJustification: 'Dedicated 6-8 campus, modernized science labs, library, gym, athletic fields.',
      lookFors: ['Tour the modernized science labs.', 'Check the athletic fields.'],
    },
    logistics: {
      researchJustification: 'Guaranteed resident enrollment, $0 tuition, ~10-15 min drive to Sunnyvale work, free city shuttle.',
      lookFors: ['Test the drive to Sunnyvale.', 'Ask about the free city shuttle.'],
    },
    extracurriculars: {
      researchJustification: '6th-grade outdoor science camp, PiE music/arts, Computer Science, sustainability electives.',
      lookFors: ['Ask about Computer Science electives.', 'Inquire about sustainability electives.'],
    },
  },
  'sunnyvale-middle': {
    academics: {
      researchJustification: 'Amplify Desmos math pathways to Algebra/Geometry, structured ELA writing units, balanced homework load.',
      lookFors: ['Observe ELA writing units.', 'Ask about Desmos math pathways.'],
    },
    athletics: {
      researchJustification: '5-season VAL competitive league (Cross Country, Soccer, Track, Basketball), Mon-Thu practices, grass fields & courts.',
      lookFors: ['Check the grass fields.', 'Ask about VAL competitive league.'],
    },
    community: {
      researchJustification: "Hyper-local Sunnyvale peer density, strict 'Away for the Day' phone ban, WEB 6th-grade peer mentorship.",
      lookFors: ['Observe WEB 6th-grade peer mentorship.', 'Gauge the local peer density.'],
    },
    facilities: {
      researchJustification: 'Dedicated 6-8 campus, brand new Measure GG 2-story building, new 6th-grade wing and Student Union.',
      lookFors: ['Tour the new 6th-grade wing.', 'Check the Student Union.'],
    },
    logistics: {
      researchJustification: 'Ultimate convenience (3-5 min to school, 5-8 min to Sunnyvale workplace!), $0 tuition, KLAS aftercare.',
      lookFors: ['Test the commute.', 'Ask about KLAS aftercare.'],
    },
    extracurriculars: {
      researchJustification: 'District-sponsored outdoor science camp, year-long band/orchestra or 3-trimester exploratory wheel, robotics.',
      lookFors: ['Ask about the exploratory wheel.', 'Inquire about robotics.'],
    },
  },
  'menlo-school': {
    academics: {
      researchJustification: 'Strong writing program, 6th-grade TED Talk, 4 world languages, daily tutorial/Learning Seminar.',
      lookFors: ['Observe 6th-grade TED Talk prep.', 'Ask about daily tutorial.'],
    },
    athletics: {
      researchJustification: 'Daily 1:00 PM built-in athletics (preserves evenings), no-cut WBAL competitive soccer & track, 54k sq ft athletic center.',
      lookFors: ['Check the 54k sq ft athletic center.', 'Ask about daily 1:00 PM athletics.'],
    },
    community: {
      researchJustification: 'Strict phone policy, strong advisory; trade-off is geographically dispersed student network.',
      lookFors: ['Observe the advisory.', 'Gauge the dispersed student network.'],
    },
    facilities: {
      researchJustification: 'Dedicated Arrillaga Middle School quad, Spieker Center 380-seat theater, turf fields, dining commons.',
      lookFors: ['Tour the Arrillaga quad.', 'Check the dining commons.'],
    },
    logistics: {
      researchJustification: 'Bus routes / short drive, library open until 7 PM; $67.8k tuition (100% need met).',
      lookFors: ['Ask about bus routes.', 'Check the library after hours.'],
    },
    extracurriculars: {
      researchJustification: '6th-grade Outdoor Ed retreat, Whitaker Lab robotics/biotech, 4-quarter arts rotation.',
      lookFors: ['Tour the Whitaker Lab.', 'Ask about 4-quarter arts rotation.'],
    },
  },
  'graham-middle': {
    academics: {
      researchJustification: 'Eureka math acceleration, ELA writing workshops, feeds to top-tier MVLA high schools.',
      lookFors: ['Observe ELA writing workshops.', 'Ask about Eureka math acceleration.'],
    },
    athletics: {
      researchJustification: 'VAL league soccer & track, MVEF athletic bus funding, adjacent Sports Pavilion.',
      lookFors: ['Check the adjacent Sports Pavilion.', 'Ask about VAL league soccer.'],
    },
    community: {
      researchJustification: 'Cuesta Park/Old Mountain View bikeable neighborhood density, strict phone ban, advisory period.',
      lookFors: ['Gauge the neighborhood density.', 'Observe the advisory period.'],
    },
    facilities: {
      researchJustification: 'Dedicated 6-8 campus, turf fields, track, auditorium, science labs.',
      lookFors: ['Tour the science labs.', 'Check the turf fields.'],
    },
    logistics: {
      researchJustification: 'Guaranteed resident enrollment, $0 tuition, ~8-12 min commute to Sunnyvale workplace, View Teen Center.',
      lookFors: ['Test the commute to Sunnyvale.', 'Ask about View Teen Center.'],
    },
    extracurriculars: {
      researchJustification: '8th-grade Yosemite expedition, FLL competitive robotics, outdoor science camp, music electives.',
      lookFors: ['Ask about FLL competitive robotics.', 'Inquire about music electives.'],
    },
  },
  'sacred-heart': {
    academics: {
      researchJustification: 'Tiered math pathways, MS101 executive function course, Homer Science Center.',
      lookFors: ['Observe MS101 executive function course.', 'Tour the Homer Science Center.'],
    },
    athletics: {
      researchJustification: 'WBAL league, 50m Olympic pool (Dunlevie), multi-sport turf stadium, Spieker Pavilion.',
      lookFors: ['Check the Olympic pool.', 'Tour the turf stadium.'],
    },
    community: {
      researchJustification: 'Five Goals & Criteria, Code of the Heart, Buddy Program; moderate geographic dispersion.',
      lookFors: ['Observe the Buddy Program.', 'Gauge the geographic dispersion.'],
    },
    facilities: {
      researchJustification: "64-acre campus, dedicated St. Joseph's MS classrooms, Campbell Performing Arts Center.",
      lookFors: ["Tour the St. Joseph's MS classrooms.", 'Check the Campbell Performing Arts Center.'],
    },
    logistics: {
      researchJustification: '~10-15 min drive, $59.5k tuition (Clarity aid), extended day options.',
      lookFors: ['Test the drive time.', 'Ask about extended day options.'],
    },
    extracurriculars: {
      researchJustification: '6th-grade outdoor ed camp, 8th-grade DC trip, robotics/STEAM guilds, organic farm.',
      lookFors: ['Tour the organic farm.', 'Ask about robotics/STEAM guilds.'],
    },
  },
  'la-entrada-middle': {
    academics: {
      researchJustification: 'Top 5% CA public, Singapore math to Big Ideas, Teachers College writing workshop.',
      lookFors: ['Observe Teachers College writing workshop.', 'Ask about Singapore math.'],
    },
    athletics: {
      researchJustification: 'Las Lomitas League competitive soccer & track, cross country, M-A high school feeder.',
      lookFors: ['Check the competitive soccer.', 'Ask about M-A high school feeder.'],
    },
    community: {
      researchJustification: 'Strong Sharon Heights neighborhood community, high parent foundation support (LLEF), strict phone policy.',
      lookFors: ['Gauge the neighborhood community.', 'Ask about LLEF support.'],
    },
    facilities: {
      researchJustification: 'Dedicated 6-8 wing, 6 athletic field sections, multi-use gym/atrium.',
      lookFors: ['Tour the dedicated 6-8 wing.', 'Check the athletic field sections.'],
    },
    logistics: {
      researchJustification: 'Guaranteed resident enrollment with move, $0 tuition, ~15-20 min to Sunnyvale.',
      lookFors: ['Test the commute to Sunnyvale.', 'Confirm resident enrollment.'],
    },
    extracurriculars: {
      researchJustification: 'STEAM Academy robotics, Code for Fun, band/orchestra, musical theater, 6th-grade outdoor camp.',
      lookFors: ['Ask about STEAM Academy robotics.', 'Inquire about musical theater.'],
    },
  },
  'woodside-priory': {
    academics: {
      researchJustification: 'Integrated Humanities homeroom model, 3-year language tracks, Study Skills course in 6th grade.',
      lookFors: ['Observe Integrated Humanities homeroom.', 'Ask about Study Skills course.'],
    },
    athletics: {
      researchJustification: 'WBAL league, 6th-grade sports teams, Rothrock gym, pool, inclusive participation.',
      lookFors: ['Check the Rothrock gym.', 'Ask about 6th-grade sports teams.'],
    },
    community: {
      researchJustification: 'Benedictine values (hospitality, community, balance), close-knit ~100 MS cohort, phone policy.',
      lookFors: ['Gauge the close-knit MS cohort.', 'Ask about Benedictine values.'],
    },
    facilities: {
      researchJustification: 'Standalone Middle School village (ideal transition from TK-5), 50-acre wooded campus, turf fields.',
      lookFors: ['Tour the Middle School village.', 'Check the turf fields.'],
    },
    logistics: {
      researchJustification: '~18-22 min drive via I-280 / Alpine Rd; $64.5k tuition (aid available), daily lunch included.',
      lookFors: ['Test the drive via I-280.', 'Ask about daily lunch.'],
    },
    extracurriculars: {
      researchJustification: 'Campus hiking & outdoor games elective, FIRST Tech Challenge robotics, Tinker lab, retreats.',
      lookFors: ['Tour the Tinker lab.', 'Ask about FIRST Tech Challenge robotics.'],
    },
  },
  'waldorf-peninsula': {
    academics: {
      researchJustification: 'Immersive 105-min main lesson blocks, phenomenological science, screen-free classroom, hand-drawn Main Lesson books.',
      lookFors: ['Observe how Aiden responds to hand-drawn Main Lesson bookwork and experiential science.', 'Discuss how math progression transitions to high school.'],
    },
    athletics: {
      researchJustification: '"Everyone Plays" no-cut policy in Small Schools Independent League (SSIL). Cross Country, Soccer, Track & Field, Basketball.',
      lookFors: ['Check out winter soccer and spring track participation in SSIL.'],
    },
    community: {
      researchJustification: 'Perfect alignment with screen-free / phone-free philosophy. Looping class teacher model, whole-child education ("head, heart, hands").',
      lookFors: ['Observe looping class teacher rapport.', 'Gauge tight-knit parent community.'],
    },
    facilities: {
      researchJustification: 'Mountain View 6-12 campus features specialized artisan studios (woodworking, handwork, painting), music rooms, science labs.',
      lookFors: ['Tour artisan woodworking and handwork studios.', 'Check the black-box theater.'],
    },
    logistics: {
      researchJustification: '~5-10 min drive to Sunnyvale workplace. Tuition of $37,900 includes all overnight trips and athletics. Over $1.5M in Clarity aid.',
      lookFors: ['Test the drive time down El Camino / Central Expy.', 'Confirm financial aid and included trip costs.'],
    },
    extracurriculars: {
      researchJustification: 'Mandatory annual multi-day wilderness camping expeditions; annual full-class theatrical productions; orchestral strings; practical woodcraft.',
      lookFors: ['Inquire about annual wilderness trips.', 'Ask about orchestral strings program.'],
    },
  },
  'pinewood-school': {
    academics: {
      researchJustification: 'Departmentalized subject specialists in Grades 3-6, strong writing workshop, math acceleration, 8:1 ratio.',
      lookFors: ['Observe writing workshop.', 'Ask about math acceleration.'],
    },
    athletics: {
      researchJustification: 'Daily PE built into school day, WBAL league competitive soccer/track/basketball (no-cut in 6th grade), Pinewood Athletics Center.',
      lookFors: ['Check the Pinewood Athletics Center.', 'Ask about WBAL league.'],
    },
    community: {
      researchJustification: 'Nurturing ~150-student Middle Campus (3-6) where 6th graders are school leaders, Wayfinder SEL curriculum, strict phone-free policy.',
      lookFors: ['Observe Wayfinder SEL.', 'Gauge the middle campus culture.'],
    },
    facilities: {
      researchJustification: '477 Fremont Ave Los Altos Middle Campus, dedicated science/art labs, turf play area; transitions to Upper Campus in 7th grade.',
      lookFors: ['Tour the science/art labs.', 'Check the turf play area.'],
    },
    logistics: {
      researchJustification: 'Shortest private school commute to Sunnyvale workplace (~8-12 min via Fremont Ave/Foothill Expy), $62,090 tuition, extended day to 5 PM.',
      lookFors: ['Test the commute.', 'Ask about extended day.'],
    },
    extracurriculars: {
      researchJustification: 'Every student performs in annual stage play, 6th-grade overnight outdoor science camp, CS&E robotics lab.',
      lookFors: ['Tour the CS&E robotics lab.', 'Ask about the stage play.'],
    },
  },
  'hillbrook-school': {
    academics: {
      researchJustification: '"Just-Right Challenge" model, Scott Center for Social Entrepreneurship, Socratic writing workshops, math tracks.',
      lookFors: ['Observe Socratic writing workshops.', 'Ask about "Just-Right Challenge".'],
    },
    athletics: {
      researchJustification: 'Interscholastic sports start in 5th grade (Soccer, Track, Cross Country, Basketball), no-cut policy, grass fields and courts.',
      lookFors: ['Check the grass fields and courts.', 'Ask about interscholastic sports.'],
    },
    community: {
      researchJustification: '"Be kind, be curious, take risks, be your best", 10 core SEL competencies, phone-free policy, tight-knit parent community.',
      lookFors: ['Observe SEL competencies in action.', 'Gauge the tight-knit community.'],
    },
    facilities: {
      researchJustification: '14-acre foothill village campus in Los Gatos (pure JK-8 setting), creek study areas, iLab maker spaces.',
      lookFors: ['Tour the iLab maker spaces.', 'Check the creek study areas.'],
    },
    logistics: {
      researchJustification: '~15-20 min commute to Sunnyvale down CA-85, $51,100 tuition (Flexible Tuition aid via Clarity), extended day care.',
      lookFors: ['Test the commute down CA-85.', 'Ask about extended day care.'],
    },
    extracurriculars: {
      researchJustification: 'Overnight outdoor science camp, Scott Center social impact projects, visual arts/ceramics, STUCO leadership.',
      lookFors: ['Ask about Scott Center projects.', 'Inquire about STUCO leadership.'],
    },
  },
};
