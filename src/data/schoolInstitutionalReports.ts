export interface InstitutionalReport {
  schoolId: string;
  title: string;
  subtitle: string;
  overview: {
    leadParagraph: string;
    metricsParagraph: string;
    benchmarkTable: {
      metric: string;
      schoolValue: string;
      districtValue: string;
      stateValue: string;
    }[];
  };
  academics: {
    lead: string;
    teamingModel: {
      title: string;
      description: string;
    };
    mathProgression: {
      title: string;
      description: string;
    };
    choiceProgram?: {
      name: string;
      description: string;
      pillars: { title: string; description: string }[];
      governance: string;
    };
    foundationFunding: {
      name: string;
      description: string;
      initiatives: string[];
    };
  };
  athletics: {
    leagueArchitecture: {
      title: string;
      leagues: { name: string; description: string }[];
    };
    seasonalSchedule: {
      season: string;
      sports: string;
      structure: string;
    }[];
    focusSportsAnalysis: {
      title: string;
      description: string;
    }[];
  };
  community: {
    behavioralCharter: {
      name: string;
      motto: string;
      pillars: { name: string; description: string }[];
    };
    communityEngagement: {
      title: string;
      description: string;
      initiatives: string[];
    };
    academicClimateAndWellbeing: {
      historicalContext: string;
      investigationFindings: string;
      countermeasures: string[];
    };
  };
  facilities: {
    architecturalHeritage: {
      architects: string;
      year: number;
      history: string;
    };
    keyFacilities: {
      name: string;
      description: string;
      category: string;
    }[];
  };
  logistics: {
    counselingModel: {
      name: string;
      description: string;
    };
    academicInterventions: {
      name: string;
      description: string;
    };
    safetyAndTransit: {
      title: string;
      points: string[];
    };
  };
  extracurriculars: {
    stemCompetitions: {
      category: string;
      name: string;
      description: string;
    }[];
    outdoorAndMedia: {
      name: string;
      grade: string;
      description: string;
    }[];
    dayInTheLife: {
      time: string;
      activity: string;
      description: string;
    }[];
  };
  historyAndLeadership?: {
    historicalChronology: string[];
    namesakeBackground: string;
    leadershipCohort: {
      gradeOrRole: string;
      administrator: string;
      counselor: string;
    }[];
    mediaAnalysis: {
      positive: string;
      neutral: string;
      critical: {
        incidentSummary: string;
        reforms: string[];
      };
    };
  };
  prospectiveFamilySynthesis: {
    summary: string;
    keyTakeaways: string[];
  };
  worksCited: {
    id: number;
    title: string;
    url: string;
  }[];
}

export const INSTITUTIONAL_REPORTS: Record<string, InstitutionalReport> = {
  'jls-middle': {
    schoolId: 'jls-middle',
    title: 'Institutional Evaluation of Jane Lathrop Stanford Middle School',
    subtitle: 'History, Academic Frameworks, District Dynamics, and Student Experience',
    overview: {
      leadParagraph:
        'Jane Lathrop Stanford Middle School (locally known as JLS) is a public middle school located at 480 East Meadow Drive in Palo Alto, California [1]. Operating within the Palo Alto Unified School District (PAUSD), JLS serves approximately 1,000 to 1,100 students in grades 6 through 8 [1]. JLS serves as a primary feeder school to two public high schools in Silicon Valley: Henry M. Gunn High School and Palo Alto High School [6].',
      metricsParagraph:
        'Standardized assessment metrics place JLS in the top 1% of public middle schools in California [5]. Approximately 83% of JLS students meet or exceed state standards in English language arts, mathematics, and science, compared to a district average of 80% and a California state average of 41% [5]. The campus operates with a student-to-teacher ratio of approximately 14.8:1, maintains a chronic absenteeism rate of 5.3% (significantly lower than state and regional averages), and operates within a school district characterized by a per-pupil expenditure of $43,117 [5].',
      benchmarkTable: [
        {
          metric: 'Students Meeting/Exceeding Academic Standards',
          schoolValue: '83%',
          districtValue: '80%',
          stateValue: '41%',
        },
        {
          metric: 'Chronic Absenteeism Rate',
          schoolValue: '5.3%',
          districtValue: '~6.5%',
          stateValue: '~24.3%',
        },
        {
          metric: 'Student-to-Teacher Ratio',
          schoolValue: '14.8:1',
          districtValue: '14.2:1',
          stateValue: '22.0:1',
        },
        {
          metric: 'Per-Pupil Operating Expenditure Context',
          schoolValue: '$43,117',
          districtValue: '$43,117',
          stateValue: '~$17,000',
        },
      ],
    },
    academics: {
      lead:
        'Academic instruction at JLS is organized around a foundational instructional delivery model known as "Pure Teaming" [9]. Under this model, an interdisciplinary team of core teachers (covering English Language Arts, Social Studies, Mathematics, and Science) shares a dedicated cohort of students across the school year [9]. Teaming allows core instructors to hold weekly coordination meetings to evaluate individual student performance, integrate cross-curricular units, and provide timely interventions [9].',
      teamingModel: {
        title: 'Pure Teaming Instructional Model',
        description:
          'Teachers in core subjects share the exact same roster of students, enabling interdisciplinary project planning, synchronized homework deadlines, and multi-teacher student support meetings.',
      },
      mathProgression: {
        title: 'Core Mathematics Curriculum and Progression',
        description:
          'In the 6th grade, all matriculating students are enrolled in Math 6, where instruction is differentiated within the classroom to provide both foundational reinforcement and academic extension [9]. As students transition into the 7th and 8th grades, mathematical pathways branch into standard and accelerated tracks, including Compacted Math and Algebra offerings [11]. Course placement is informed by diagnostic evaluations administered late in the 5th-grade year alongside ongoing classroom performance metrics [11].',
      },
      choiceProgram: {
        name: 'The Connections Program (Choice Alternative)',
        description:
          'JLS hosts an alternative choice program known as the Connections Program [9]. Comprising approximately four classroom sections per grade level, Connections is an inquiry-based learning community operating within the larger JLS campus [9]. Admission is managed via a centralized PAUSD choice application and lottery system conducted during the winter of a student’s 5th-grade year [10].',
        pillars: [
          {
            title: 'Project-Based Learning (PBL)',
            description:
              'Core academic standards are satisfied through long-term, multi-disciplinary student projects [10].',
          },
          {
            title: 'Cross-Curricular Integration',
            description:
              'Units synthesise ELA, Social Studies, and Science standards around central global themes [10].',
          },
          {
            title: 'Student Autonomy',
            description:
              'Learners are given latitude in selecting research topics, project mediums, and presentation formats [10].',
          },
          {
            title: 'Parent Governance',
            description:
              'The program is supported by the JLS Connections Board, an independent 501(c)(3) non-profit organization that raises funds for program-specific materials, field trips, and social events [10].',
          },
        ],
        governance:
          'Governed by the JLS Connections Board 501(c)(3) alongside PAUSD choice lottery pathways.',
      },
      foundationFunding: {
        name: 'Palo Alto Partners in Education (PiE) Signature Funding',
        description:
          'Direct financial support from the local community plays an essential role in sustaining academic programming through Palo Alto Partners in Education (PiE) [14]. PiE is an independent non-profit educational foundation dedicated exclusively to funding PAUSD personnel and instruction [14].',
        initiatives: [
          'Reduce elective class sizes and expand STEAM elective offerings (such as computer programming, biotechnology, creative writing, stage technology, and music) [14].',
          'Fund instructional literacy and writing specialists who collaborate with classroom teachers to refine writing pedagogy [14].',
          'Finance additional counselor hours and on-campus mental health support staff [14].',
          'Award PiE Innovation Grants directly to teachers for piloting creative instructional methods, such as integrating tablet technology into foreign language classrooms [17].',
        ],
      },
    },
    athletics: {
      leagueArchitecture: {
        title: 'League Architecture: Valley Athletic League (VAL) and Middle School Athletics (MSA)',
        leagues: [
          {
            name: 'Valley Athletic League (VAL)',
            description:
              'VAL serves as the regional interscholastic athletic conference that schedules competitions and establishes athletic guidelines across public and private middle schools in the Silicon Valley area [19].',
          },
          {
            name: 'Middle School Athletics (MSA)',
            description:
              'Unlike many public school systems where athletics are managed internally by school physical education departments, PAUSD middle school sports are administered by the City of Palo Alto Recreation Department [18]. The city manages registration, hires coaching personnel, schedules facility usage, and processes payments using its municipal Enjoy! portal [18]. Because program demand often exceeds field capacity, the City of Palo Alto utilizes a lottery-based system for sports registration [18].',
          },
        ],
      },
      seasonalSchedule: [
        {
          season: 'Season 1 (Fall: Sept–Oct)',
          sports: 'Cross Country, Girls Volleyball, Flag Football',
          structure:
            'Cross Country operates with a strict "No-Cuts" policy [19]. Registration opens in August via the city lottery [9].',
        },
        {
          season: 'Season 2 (Winter: Nov–Jan)',
          sports: 'Boys Basketball, Girls Basketball',
          structure:
            'Includes 6th-grade Basketball Training clinics alongside 7th/8th competitive team rosters [9].',
        },
        {
          season: 'Season 3 (Spring: Apr–May)',
          sports: 'Track & Field, Girls Soccer, Boys Volleyball',
          structure:
            'Track & Field is non-cut with high participation [19]. Girls Soccer competes in VAL matches [19].',
        },
      ],
      focusSportsAnalysis: [
        {
          title: 'Track & Field and Cross Country',
          description:
            'Track & Field (Spring) and Cross Country (Fall) represent two of the largest athletic cohorts at JLS [9]. Cross Country functions on a non-cut basis, allowing all interested students to participate [19]. Interscholastic meets feature competitions against local PAUSD middle schools, such as Ellen Fletcher Middle School and Frank S. Greene Jr. Middle School [5].',
        },
        {
          title: 'Soccer Framework & Community League Access',
          description:
            'Girls Soccer is offered during Season 3 under VAL interscholastic governance [19]. Because school-sponsored soccer is limited to a single spring season, local athletic organizations—such as Coach Ken Soccer Academy—regularly lease JLS turf fields to conduct year-round community youth soccer training [22].',
        },
      ],
    },
    community: {
      behavioralCharter: {
        name: 'The JLS Way',
        motto: 'Kindness is the Norm',
        pillars: [
          {
            name: 'Compassionate',
            description: 'Respect peers and offer assistance to others [9].',
          },
          {
            name: 'Connected',
            description: 'Actively include peers and honor diversity within the student body [9].',
          },
          {
            name: 'Courteous',
            description: 'Demonstrate appreciation and offer praise [9].',
          },
          {
            name: 'Complimentary',
            description: 'Eliminate put-downs, derogatory remarks, and hate speech [9].',
          },
          {
            name: 'Community',
            description: 'Maintain campus cleanliness and preserve physical facilities [9].',
          },
        ],
      },
      communityEngagement: {
        title: 'Community Engagement and Volunteer Networks',
        description:
          'Parent participation is integrated into school operations through the JLS Parent Teacher Association (PTA) and program-specific parent boards [10].',
        initiatives: [
          '"Noon Angels" Program: Parent volunteers assist staff in supervising quad areas, outdoor eating spaces, and recreation zones during lunch breaks to foster positive peer interactions [25].',
          'Principal Coffees & Community Chats: Administration maintains regular communication through monthly in-person "Principal Coffees" and virtual "Community Chats" [20].',
        ],
      },
      academicClimateAndWellbeing: {
        historicalContext:
          'Understanding the school culture at JLS requires examining the broader academic climate of Palo Alto [28]. PAUSD is nationally recognized for high academic achievement, supported by substantial real estate tax revenues and proximity to Stanford University [4]. However, this environment has historically been accompanied by high levels of youth academic anxiety and perfectionism [28].',
        investigationFindings:
          'The district experienced two high-profile youth suicide clusters—in 2008–2009 and 2014–2015—involving high school students in Palo Alto [29]. These events prompted extensive epidemiological investigations by the Centers for Disease Control and Prevention (CDC) and the Substance Abuse and Mental Health Services Administration (SAMHSA) [29]. The CDC report highlighted the complex intersection of adolescent mental health conditions, sleep deprivation, and intense socio-academic expectations [29].',
        countermeasures: [
          'Structural Schedule Shifts: High schools eliminated early-morning "zero period" classes to mitigate sleep deprivation [28].',
          'Homework and Assessment Caps: District policies instituted strict caps on nightly homework hours and regulated holiday assignment loads [28].',
          'Multi-Tiered Support Systems: PAUSD expanded access to licensed mental health professionals, established the "Project Safety Net" community coalition, and integrated structured Social-Emotional Learning (SEL) curricula into middle school programs [9, 14].',
        ],
      },
    },
    facilities: {
      architecturalHeritage: {
        architects: 'Birge Clark and Walter Stromquist',
        year: 1953,
        history:
          'The JLS campus was designed in 1953 by architectural partners Birge Clark and Walter Stromquist [4]. Constructed during the post-war suburban expansion of Palo Alto, the campus reflects mid-century California educational design, featuring single-story "finger wings," sloped rooflines, exterior corridors, and large windows to maximize natural lighting and cross-ventilation [4]. The physical land was originally owned by three farmers named Diss [4]. The property was acquired by Joseph Eichler, a mid-century residential builder, who developed the surrounding modern housing tracts and donated the land parcel for both the middle school and the adjacent Fairmeadow Elementary School [4].',
      },
      keyFacilities: [
        {
          name: 'Cafetorium & Assembly Auditorium',
          category: 'Performing Arts & Dining',
          description:
            'A multi-purpose facility combining a cafeteria and assembly auditorium [4]. It features an elevated stage equipped with flies, stage curtains, dressing rooms, storage, and an attached full-service commercial kitchen [4].',
        },
        {
          name: 'Dual-Sided Gymnasium & Athletic Complex',
          category: 'Athletics & Recreation',
          description:
            'Physical education facilities include a dual-sided indoor gymnasium (historically configured with separate boys\' and girls\' sides), double locker facilities, a dedicated wrestling room, a dance studio, equipment storage, and physical education faculty offices [4]. Outdoor spaces include basketball courts, blacktops, track ovals, and multi-use turf playing fields [4].',
        },
        {
          name: 'Modern Science Building & Academic Wing',
          category: 'STEM & Classrooms',
          description:
            'JLS has undergone multiple modernizations over its history [4]. These upgrades added a dedicated hands-on science building, a two-story academic wing housing ten additional classrooms, an updated student store, and a television production studio for campus media broadcasts [4]. Recent capital projects have also renovated and relocated the central campus library [4].',
        },
      ],
    },
    logistics: {
      counselingModel: {
        name: 'Cohort-Based Counseling and "Looping" Model',
        description:
          'JLS utilizes a continuous, grade-level administrative and counseling distribution model [9]. Rather than assigning counselors and grade-level administrators by academic department, staff members are assigned to an incoming 6th-grade cohort and remain with that same group of students through their 7th- and 8th-grade years [9]. This "looping" approach ensures that counselors and assistant principals develop long-term relationships with students and families, allowing for personalized academic tracking and targeted social-emotional support [9].',
      },
      academicInterventions: {
        name: 'Homework Habitat (Staffed Homework & Study Support)',
        description:
          'For students requiring structured academic assistance, JLS operates "Homework Habitat" after school from Monday through Thursday, as well as during late-start Monday mornings [26]. Staffed by school personnel, Homework Habitat offers a quiet workspace, computing infrastructure, internet access, and direct assignment support [26].',
      },
      safetyAndTransit: {
        title: 'Health, Safety, and Transportation Logistics',
        points: [
          'Mental Health Infrastructure: In addition to grade-level counselors, students have access to digital mental health platforms (such as Tbh) [27]. PiE funding supports licensed Wellness Associate Therapists on campus to provide swift crisis triage and ongoing counseling [16].',
          'Safe Routes to School: Due to high student bicycle commute volumes, JLS actively coordinates with the Palo Alto Safe Routes to School program [18]. The school enforces designated bike ingress and egress pathways, restricts vehicular drop-offs in construction zones, and hosts on-campus bicycle repair clinics and anti-theft registration through the Bike Index system [18].',
        ],
      },
    },
    extracurriculars: {
      stemCompetitions: [
        {
          category: 'Mathematics',
          name: 'AMC 8 (American Mathematics Competitions 8)',
          description:
            'Administered by the Mathematical Association of America (MAA), the AMC 8 is a 25-question, 40-minute contest [36]. JLS hosts the AMC 8 annually on campus during its dedicated PRIME flex period [36].',
        },
        {
          category: 'Mathematics',
          name: 'MATHCOUNTS',
          description:
            'JLS maintains a competitive MATHCOUNTS team that competes in regional San Mateo/Santa Clara chapter and state-level competitions [21].',
        },
        {
          category: 'Science & Engineering',
          name: 'Science Olympiad (Mentored by Paly High)',
          description:
            'Science Olympiad encompasses 23 individual team events spanning biology, earth science, chemistry, physics, and engineering. JLS maintains an active Science Olympiad program [39]. The team operates in direct partnership with Palo Alto High School (Paly), where high school Science Olympiad officers and alumni mentor JLS students and co-manage the program directorship [40].',
        },
        {
          category: 'Robotics',
          name: 'VEX IQ, FLL & Paly Robotics Summer Camp',
          description:
            'Competitive STEM extracurriculars include participation in VEX Robotics (VEX IQ) and FIRST LEGO League (FLL) [41]. In addition to student clubs, Palo Alto High School’s Paly Robotics team conducts an annual summer robotics camp explicitly designed for incoming JLS 6th–8th graders [42] at the Paly lab space (CAD prototyping, Python programming, entrepreneurship, web and graphic design).',
        },
      ],
      outdoorAndMedia: [
        {
          grade: '6th Grade',
          name: 'NatureBridge Science Camp (Golden Gate)',
          description:
            'Sixth-grade students participate in an overnight outdoor science camp at NatureBridge Golden Gate, focusing on coastal ecology, environmental science, and team building [13]. This program complements "Panther Camp," an on-campus orientation held during the first week of school [9].',
        },
        {
          grade: '7th Grade',
          name: 'California Academy of Sciences Experiential Trip',
          description:
            'Seventh-grade learning includes experiential field trips to major scientific institutions, including the California Academy of Sciences [13].',
        },
        {
          grade: '6th-8th Grade',
          name: 'KJLS Student Broadcast News Studio',
          description:
            'Students produce KJLS, a digital news broadcast program managed through the Video Production elective, which covers campus news, events, and fundraising efforts [25].',
        },
      ],
      dayInTheLife: [
        {
          time: '08:15 AM',
          activity: 'Arrival & Campus Ingress',
          description:
            'The student arrives via bicycle, utilizing designated Safe Routes bike lanes, and locks their bike in the main enclosures [18]. They check their primary academic locker to gather materials for morning classes [9].',
        },
        {
          time: '08:30 AM',
          activity: 'Morning Core Block (Pure Teaming)',
          description:
            'The student attends a double period of English Language Arts and Social Studies with their core team cohort [9]. Interdisciplinary lessons integrate historical analysis with descriptive writing [10].',
        },
        {
          time: '10:30 AM',
          activity: 'Mathematics Block (Math 6)',
          description:
            'The student moves to Math 6, where instruction incorporates small-group problem-solving and differentiated skill building [9].',
        },
        {
          time: '11:30 AM',
          activity: 'PRIME Mandatory Flex Period',
          description:
            'The student attends PRIME, a mandatory flex period [27]. During PRIME, the student may access academic tutorial help from teachers, complete digital citizenship badge quizzes ("Digital Driver\'s License"), or participate in school-wide academic contests like the AMC 8 [27].',
        },
        {
          time: '12:15 PM',
          activity: 'Lunch & Social Quad Break',
          description:
            'The student purchases lunch in the cafetorium or eats outdoors on the central quad [4]. Noon Angels parent volunteers supervise the quad while lunchtime clubs meet in adjacent classrooms [23].',
        },
        {
          time: '01:00 PM',
          activity: 'Physical Education / Music Rotation',
          description:
            'The student changes into PE clothes in the locker room [9]. JLS alternates PE two days a week with Music instruction (Band, Orchestra, or Choir) two days a week [9].',
        },
        {
          time: '02:00 PM',
          activity: '6th Grade Exploratory Wheel',
          description:
            'The student attends their final class period in the 6th Grade Exploratory Wheel [9]. Over the course of the year, they rotate quarterly through introductory electives, including Art, Industrial Technology/Woodshop, Home Economics, and Drama [4].',
        },
        {
          time: '03:05 PM',
          activity: 'Dismissal & Extended Day Support',
          description:
            'Following dismissal, the student either goes to the library for "Homework Habitat" [26] or heads to the athletic fields for after-school Middle School Athletics (MSA) cross-country practice [9].',
        },
      ],
    },
    historyAndLeadership: {
      historicalChronology: [
        'August 18, 1953: Opened as Ray Lyman Wilbur Junior High School in honor of Ray Lyman Wilbur, former president of Stanford University (serving 650 students in grades 7-9, mascot Warrior, scarlet & gray) [4].',
        '1975: 9th-grade cohorts transitioned from junior high campuses to local high schools [4].',
        '1985: Demographic contraction ("Great PAUSD Depression") prompted district consolidation; Jordan Middle School closed and all 7th-8th students consolidated at Wilbur campus [3].',
        '1985: Formally renamed Jane Lathrop Stanford Middle School (JLS), transitioning to a middle school model with Panther mascot and royal blue/white colors [3, 4].',
        'Early 1990s: 6th grade officially incorporated into the campus [4].',
      ],
      namesakeBackground:
        'The school’s namesake, Jane Lathrop Stanford (1828–1905), co-founded Stanford University alongside her husband, Leland Stanford, in memory of their deceased adolescent son, Leland Stanford Jr. [45]. Jane Stanford was a prominent Bay Area philanthropist who financed early kindergarten programs, primary music education, orphanages, and hospitals, while advocating for women’s civic and educational rights [45].',
      leadershipCohort: [
        {
          gradeOrRole: 'Principal',
          administrator: 'Chris Grierson (former Barron Park & Duveneck Elementary Principal) [1, 47]',
          counselor: 'N/A',
        },
        {
          gradeOrRole: '6th-Grade Team',
          administrator: 'Sarah Pierce / Kim Lohse [20]',
          counselor: 'Arvind Arya [20]',
        },
        {
          gradeOrRole: '7th-Grade Team',
          administrator: 'Ivette Daugherty / Sarah Pierce [20]',
          counselor: 'Adriana Flores Ragade [20]',
        },
        {
          gradeOrRole: '8th-Grade Team',
          administrator: 'Bryson Peckenpaugh / Ivette Daugherty [20]',
          counselor: 'Micaela Flores Amaro [20]',
        },
      ],
      mediaAnalysis: {
        positive:
          'Regional educational media and analytical reporting routinely highlight JLS for exceptional academic performance [5]. Reports highlight that JLS ranks in the top 1% of California middle schools while achieving lower per-student operational costs than several peer high-wealth suburban districts [5]. Furthermore, reporting emphasizes JLS\'s progress with non-traditional cohorts; both Special Education students and English Language Learners at JLS perform in significantly higher state test percentiles compared to statewide demographic averages [5].',
        neutral:
          'In March 2020, JLS featured in local press outlets (such as Verde Magazine) when district administrators took early action to isolate and send home students following potential COVID-19 exposures prior to statewide shelter-in-place orders [49]. The coverage documented early municipal public health responses and emergency communication protocols [49].',
        critical: {
          incidentSummary:
            'In May 2023, JLS became the focus of critical media coverage in local news publications, including The Paly Voice, following a physical safety incident on campus [50]. Due to privacy protections surrounding minors and personnel files, specific details were withheld; however, public testimony delivered by PAUSD educators at district board meetings revealed that the incident caused an "unimaginable, catastrophic loss" for an affected staff member [51].',
          reforms: [
            'Superintendent Don Austin commissioned an independent third-party investigation in June 2023 to evaluate safety protocols and organizational responses [51].',
            'District amended site administrator evaluation criteria, adding requirements for handling student discipline and special education behavioral plans [51].',
            'District safety guidelines updated to instruct teachers facing physical altercations to activate wall-mounted panic buttons and evacuate classrooms rather than physically intervening in fights [51].',
          ],
        },
      },
    },
    prospectiveFamilySynthesis: {
      summary:
        'For a prospective parent evaluating Jane Lathrop Stanford Middle School for an incoming 6th-grade student, JLS presents a public middle school model backed by community funding, low elective class sizes, and top academic outcomes [5].',
      keyTakeaways: [
        'Academic Progression: JLS offers strong core academics through Pure Teaming alongside alternative pathways like the lottery-based Connections Program [9]. STEM opportunities—including AMC 8 math competitions, Science Olympiad co-mentored by Paly High School, and VEX Robotics—are among the most developed in the region [36].',
        'Transition and Support: The 6th-grade transition is supported by Panther Camp orientation, the Exploratory Wheel, and a continuous counseling model where counselors follow students through all three middle school years [9].',
        'Athletic Framework: After-school athletics (operated via the City of Palo Alto Recreation lottery under VAL governance) provide non-cut options in Cross Country and Track & Field alongside traditional team sports [18].',
        'District Context: Prospective families should remain aware of PAUSD\'s high-expectation environment [28]. Parents are encouraged to actively utilize the school\'s social-emotional support networks, Homework Habitat, and counseling infrastructure to ensure a balanced academic experience [9].',
      ],
    },
    worksCited: [
      { id: 1, title: 'Jane Lathrop Stanford Middle - School Directory Details (CA Dept of Education)', url: 'https://www.cde.ca.gov/schooldirectory/details?cdscode=43696416060081' },
      { id: 2, title: 'School Profile: Jane Lathrop Stanford Middle (CA Dept of Education)', url: 'https://www.cde.ca.gov/sdprofile/details.aspx?cds=43696416060081' },
      { id: 3, title: 'Palo Alto Unified School District - Wikipedia', url: 'https://en.wikipedia.org/wiki/Palo_Alto_Unified_School_District' },
      { id: 4, title: 'History - JLS Middle School', url: 'https://jls.pausd.org/about-us/history' },
      { id: 5, title: 'Jane Lathrop Stanford Middle - Palo Alto - SchoolDigger', url: 'https://www.schooldigger.com/go/CA/schools/2961004598/school.aspx' },
      { id: 6, title: 'JLS Middle School: Home', url: 'https://jls.pausd.org/' },
      { id: 7, title: 'Science, Engineering, and Math, Reviewed | Bay Area School Guide', url: 'https://bayareaschoolguide.com/en/guides/best-stem-schools' },
      { id: 8, title: 'Palo Alto High School', url: 'https://en-academic.com/dic.nsf/enwiki/621924' },
      { id: 9, title: '5th Grade Rising Parent Information JLS Middle School', url: 'https://papie.org/wp-content/uploads/2017/10/JLS-Rising-Parent-Slides.pdf' },
      { id: 10, title: 'Connections Program - JLS Middle School', url: 'https://jls.pausd.org/learning/connections-program' },
      { id: 11, title: 'Course Catalog - JLS Middle School', url: 'https://jls.pausd.org/learning/course-catalog' },
      { id: 12, title: 'Important Dates for Incoming 6th Grade Families - Palo Alto Unified', url: 'https://www.pausd.org/enrollment/dates-for-incoming-6th' },
      { id: 13, title: 'Choice Programs - Palo Alto Unified School District', url: 'https://www.pausd.org/enrollment/choice-programs' },
      { id: 14, title: 'Middle Schools - Palo Alto Partners in Education', url: 'https://papie.org/schools-of-pausd/middle-schools/' },
      { id: 15, title: 'Donate - JLS Middle School - Palo Alto Unified School District', url: 'https://jls.pausd.org/connecting/donate' },
      { id: 16, title: 'Greene Middle School - Palo Alto Partners in Education', url: 'https://papie.org/news/school/greene-middle-school/' },
      { id: 17, title: 'PiE Innovation Grants - Palo Alto Partners in Education', url: 'https://papie.org/schools-of-pausd/pie-innovation-grants/' },
      { id: 18, title: 'Jane Lathrop Stanford Middle PTA - Palo Alto Council of PTAs', url: 'https://jlswp.paloaltopta.org/' },
      { id: 19, title: 'Game Schedules - Valley Athletic League', url: 'https://valleyal.org/schedules' },
      { id: 20, title: 'JLS Back To School Information – August 13, 2024', url: 'https://jls.pausd.org/connecting/news/jls/~board/jls/post/jls-back-to-school-information-read-by-august-13-2024' },
      { id: 21, title: 'San Mateo County Mathcounts Chapter - Participating Schools and Results', url: 'https://sites.google.com/view/san-mateo-county-mathcounts/participating-schools-and-results/2019-schools-and-results' },
      { id: 22, title: 'Coach Ken Soccer Academy - ActivityHero', url: 'https://www.activityhero.com/biz/coach-ken-soccer-academy?geo=palo-alto-ca&location_id=105383' },
      { id: 23, title: 'JLS Events, Reminders and Resources', url: 'https://jls.pausd.org/connecting/news/jls/~board/jls/post/jls-events-reminders-and-resources' },
      { id: 24, title: 'JLS eNews | Jane Lathrop Stanford Middle PTA', url: 'https://jlswp.paloaltopta.org/index.php/jls-enews/' },
      { id: 25, title: 'Principal\'s Update: Drop Off Reminders, Getting Involved, Parent Ed', url: 'https://jls.pausd.org/connecting/news/jls/~board/jls/post/principals-update-drop-off-reminders-getting-involved-parent-ed-and-special-schedules' },
      { id: 26, title: 'Monday\'s Bell Schedule, Student Support & Counselor Survey', url: 'https://jls.pausd.org/connecting/news/jls/~board/jls/post/principals-update-mondays-bell-schedule-student-support-counselor-survey-amc8-noon-angels-and-upcoming-events' },
      { id: 27, title: 'News - JLS Middle School', url: 'https://jls.pausd.org/connecting/news' },
      { id: 28, title: 'The Suicide Clusters in Palo Alto - Maggie Wang', url: 'https://maggiewang.org/writing/the-suicide-clusters-in-palo-alto/' },
      { id: 29, title: 'CDC releases preliminary findings on Palo Alto suicide clusters - Stanford Daily', url: 'https://stanforddaily.com/2016/07/21/cdc-releases-preliminary-findings-on-palo-alto-suicide-clusters/' },
      { id: 30, title: 'The Price of Perfection: The Silicon Valley Suicides - The Kim Foundation', url: 'https://thekimfoundation.org/the-price-of-perfection-the-silicon-valley-suicides/' },
      { id: 31, title: 'Palo Alto teen suicide clusters spark study of numbers - SFGATE', url: 'https://www.sfgate.com/health/article/Report-offers-insight-into-teenage-suicide-8376814.php' },
      { id: 32, title: 'Lessons Learned - Homeland Security Digital Library', url: 'https://www.hsdl.org/c/view?docid=732107' },
      { id: 33, title: 'Schedule : 4City Palo Alto - LeagueApps', url: 'https://4citypaloalto.leagueapps.com/clubteams/4159703/schedule' },
      { id: 34, title: 'Back to School - JLS Middle School - Palo Alto Unified School District', url: 'https://jls.pausd.org/school-life/back-to-school' },
      { id: 35, title: 'JLS Back To School Information – Read Now!', url: 'https://jls.pausd.org/connecting/news/jls/~board/jls/post/jls-back-to-school-information-read-now' },
      { id: 36, title: 'Support, Halloween, AMC8, Upcoming Events | JLS News Display', url: 'https://jls.pausd.org/connecting/news/jls/~board/jls/post/principals-community-update-support-halloween-amc8-upcoming-events' },
      { id: 37, title: 'Lawsuit claims Palo Alto Unified denies students opportunities', url: 'https://archive.is/SoVDT' },
      { id: 38, title: 'Synthetic Admissions Counselor: Pathfinder', url: 'https://www.reviewmyapplication.org/' },
      { id: 39, title: 'Staff - Palo Alto Students Foundation', url: 'https://www.paloaltostudents.org/staff' },
      { id: 40, title: 'Meet Your Officers - Paly Science Olympiad - WordPress.com', url: 'https://palyscioly.wordpress.com/meet-your-officers/' },
      { id: 41, title: 'How to Join a Robotics Competition Team in the Bay Area (FLL, VEX)', url: 'https://www.aifunlab.io/learn/bay-area-robotics-competition-teams-fll-vex-frc' },
      { id: 42, title: 'Paly Robotics Summer Camp - Palo Alto', url: 'https://www.palyrobotics.com/summercamp/' },
      { id: 43, title: 'JLS Back To School Information – August 8, 2023', url: 'https://jls.pausd.org/connecting/news/jls/~board/jls/post/jls-back-to-school-information-read-by-august-8-2023' },
      { id: 44, title: 'Jane Lathrop Stanford Middle School - Edgarpedia', url: 'http://edgarpedia.wikidot.com/jane-lathrop-stanford-middle-school' },
      { id: 45, title: 'Fun Facts - JLS Middle School', url: 'https://jls.pausd.org/about-us/fun-facts' },
      { id: 46, title: 'School Administrators - JLS Middle School', url: 'https://jls.pausd.org/school-life/school-administrators' },
      { id: 47, title: 'Covering the Palo Alto Unified School District - School News Roll Call', url: 'http://schoolnewsrollcall.com/wp-content/uploads/2019/02/PAL_02_19.pdf' },
      { id: 48, title: 'Covering the Palo Alto Unified School District Vol 1', url: 'https://resources.finalsite.net/images/v1613771379/pausdorg/udgv7q7d2h4njo4qsffz/Vol1Issue1Nov2018.pdf' },
      { id: 49, title: 'JLS, Paly students sent home over coronavirus concern - Verde Magazine', url: 'https://verdemagazine.com/jls-paly-students-sent-home-over-coronavirus-concern' },
      { id: 50, title: 'Daniel Nguyen - IDCrawl', url: 'https://www.idcrawl.com/daniel-nguyen' },
      { id: 51, title: 'Investigation to begin as JLS incident sparks concern - The Paly Voice', url: 'https://palyvoice.com/172797/news/investigation-to-begin-as-jls-incident-sparks-concern/' },
    ],
  },
};
