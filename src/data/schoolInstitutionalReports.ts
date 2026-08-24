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
  'blach-intermediate': {
    schoolId: 'blach-intermediate',
    title: 'Institutional Evaluation of Georgina P. Blach Intermediate School',
    subtitle: 'History, Academic Frameworks, District Dynamics, and Student Experience',
    overview: {
      leadParagraph:
        'Georgina P. Blach Intermediate School is a top-performing public junior high school located at 1120 Covington Road in southern Los Altos, California [1]. Operating within the Los Altos School District (LASD), Blach serves approximately 388 to 423 students in the seventh and eighth grades [1, 3]. The school functions as the primary middle school destination for students matriculating from southern and western Los Altos elementary campuses, including Almond, Covington, Loyola, Oak, and Springer elementary schools [1].',
      metricsParagraph:
        'The institution holds a long-standing reputation for high academic performance, consistently ranking among the top 15 public middle schools in California and receiving an overall grade of A+ on educational review platforms [2, 3]. Blach was designated a National Blue Ribbon School by the U.S. Department of Education in 2014 and earned California Distinguished School honors in 1990, 1992, and 2023 [1]. For a prospective parent evaluating middle school options, Blach presents an educational environment characterized by academic challenge, structured extracurricular programs, modern facilities, and a tight-knit community context [1].',
      benchmarkTable: [
        {
          metric: 'Grades Served & Grade Structure',
          schoolValue: '7th – 8th Grade [1]',
          districtValue: 'TK–8 (LASD)',
          stateValue: 'K–12 Public',
        },
        {
          metric: 'Student Enrollment Cohort',
          schoolValue: '388 – 423 Students [3]',
          districtValue: '~3,400 Total',
          stateValue: '~600 Avg Middle',
        },
        {
          metric: 'Student-to-Teacher Ratio',
          schoolValue: '18:1 [3]',
          districtValue: '18:1',
          stateValue: '22:1',
        },
        {
          metric: 'State & Federal Honors',
          schoolValue: 'Blue Ribbon (2014) / 3x CA Dist. [1]',
          districtValue: 'High Baseline',
          stateValue: 'Standard',
        },
        {
          metric: 'Niche California Rankings',
          schoolValue: '#15 Best Teachers / #44 School [3]',
          districtValue: 'Top 5% in CA',
          stateValue: 'State Average',
        },
        {
          metric: 'Feeder Elementary Campuses',
          schoolValue: 'Almond, Covington, Loyola, Oak, Springer [1]',
          districtValue: '7 Elementary Sites',
          stateValue: 'N/A',
        },
      ],
    },
    academics: {
      lead:
        'Blach Intermediate School delivers a rigorous core curriculum structured to prepare seventh and eighth-grade students for the transition to regional high schools within the Mountain View–Los Altos Union High School District (MVLA) [1]. Core academic requirements include English Language Arts, Mathematics, Science, and Social Studies, alongside specialized elective choices [1].',
      teamingModel: {
        title: 'Core Academics & High School Preparation',
        description:
          'Blach structures seventh and eighth-grade instruction to ensure comprehensive mastery of core subjects and smooth matriculation to Los Altos High School or Mountain View High School [1]. Instruction combines high academic expectations with individualized social-emotional support under a "care and push" approach [1, 11].',
      },
      mathProgression: {
        title: 'MATHCOUNTS & Competitive Mathematics League',
        description:
          'Blach fields a dedicated competitive math team in the Peninsula Chapter MATHCOUNTS league [19]. Coached by faculty leaders, Blach\'s math program regularly competes against top public and private schools in Silicon Valley, challenging students in advanced algebra, geometry, speed arithmetic, and complex logic, and frequently advancing individual students and team cohorts to the Northern California State MATHCOUNTS Competition and the AMC 8 contest [19, 21, 22].',
      },
      choiceProgram: {
        name: 'Science Olympiad ("Blach MS-Green") & LAHS Mentorship',
        description:
          'Blach maintains an active Science Olympiad program (competing under the team handle "Blach MS-Green") that participates in regional and university tournaments, including the Santa Clara County Regional Science Olympiad and the Scioly Invitational at UC Berkeley [20, 23]. Blach’s program benefits from a direct mentorship pipeline with nearby Los Altos High School (LAHS), where LAHS officers and alumni regularly mentor Blach students in laboratory preparation and engineering builds [25].',
        pillars: [
          {
            title: 'Study Events',
            description:
              'Academic testing in specialized fields such as anatomy, astronomy, meteorology, and epidemiology [24].',
          },
          {
            title: 'Lab & Inquiry Events',
            description:
              'Hands-on experimental challenges in chemistry, physics, and forensic science [24].',
          },
          {
            title: 'Engineering & Building Events',
            description:
              'Pre-built design projects where student teams construct functional devices—such as gliders, wooden bridges, or rubber-band-powered vehicles—to satisfy strict engineering benchmarks [24].',
          },
          {
            title: 'High School Mentorship Pipeline',
            description:
              'Direct workshop guidance and build review sessions conducted by Los Altos High School Science Olympiad officers [25].',
          },
        ],
        governance: 'Coached by faculty leads and parent volunteers in coordination with LAHS STEM leadership.',
      },
      foundationFunding: {
        name: 'Los Altos Education Foundation (LAEF) & PTA Funding',
        description:
          'Direct financial support from the local community plays an essential role in sustaining academic programming and student wellness through the Los Altos Education Foundation (LAEF) and the Blach PTA [1].',
        initiatives: [
          'Fund dedicated school counselors and mental health support personnel across the district [1].',
          'Support specialized literacy coaches, writing pedagogy specialists, and STEM elective teachers [1].',
          'Finance campus librarians, physical education equipment, and state-of-the-art classroom materials [1].',
          'Sponsor student wellness initiatives in partnership with EQ Schools for mindfulness and positive peer culture [11].',
        ],
      },
    },
    athletics: {
      leagueArchitecture: {
        title: 'League Architecture: Valley Athletic League (VAL) & Los Altos Recreation',
        leagues: [
          {
            name: 'Valley Athletic League (VAL)',
            description:
              'Blach competes in the Valley Athletic League for nearly all official school sports [26]. The VAL is an interscholastic sports league comprising 11 middle schools across four local public school districts (LASD, CUSD, SSD, and MVWSD), providing structured regional competition against neighboring cities without requiring costly private club fees [28]. (Note: SCVAL is the high school athletic conference serving MVLA [32]).',
          },
          {
            name: 'Los Altos Recreation Department Administration',
            description:
              'Following school-based tryouts led by PE staff and coaches, rostered student-athletes register through the Los Altos Recreation Department and pay a standard $115 athletic registration fee per sport [27].',
          },
        ],
      },
      seasonalSchedule: [
        {
          season: 'Season 1 (Aug–Sept)',
          sports: 'Co-Ed Cross Country, Girls Softball, Boys Basketball [27]',
          structure: 'Tryouts for Basketball/Softball; Cross Country is non-cut and open to all students [27].',
        },
        {
          season: 'Season 2 (Oct–Nov)',
          sports: 'Girls Volleyball, Co-Ed Wrestling [27]',
          structure: 'Tryouts for Volleyball; Wrestling is non-cut and inclusive [27].',
        },
        {
          season: 'Season 3 (Dec–Jan)',
          sports: 'Boys Volleyball, Girls Soccer [27]',
          structure: 'Tryouts held on gym courts and central campus soccer fields [27].',
        },
        {
          season: 'Season 4 (Feb–Mar)',
          sports: 'Boys Soccer, Girls Basketball [27]',
          structure: 'Tryouts held on gym courts and soccer fields [27].',
        },
        {
          season: 'Season 5 (Apr–May)',
          sports: 'Co-Ed Track & Field [27]',
          structure: 'Non-cut, inclusive team open to all students on the campus running track [27].',
        },
        {
          season: 'Independent Seasons',
          sports: 'Tennis (Mid-Peninsula), Flag Football [27]',
          structure: 'Administered outside VAL league structures during spring and fall [27].',
        },
      ],
      focusSportsAnalysis: [
        {
          title: 'Soccer Program (Girls: Season 3 / Boys: Season 4)',
          description:
            'Tryouts take place on Blach’s central grass soccer field, fielding distinct 7th-grade and 8th-grade teams that compete against other VAL middle schools [27]. Campus fields also serve as host sites for community youth sports organizations, including AYSO Region 1099 and i9 Sports co-ed leagues [33, 34].',
        },
        {
          title: 'Track & Field & Athletic Recognition (Blach Jacket)',
          description:
            'Track & Field operates as a non-cut, co-ed sport during April and May on the campus track complex [27]. Student-athletes who complete four or more official interscholastic sports seasons during their two years at Blach are awarded an official Blach Athletics jacket at the end-of-year Sports Awards assembly [35].',
        },
      ],
    },
    community: {
      behavioralCharter: {
        name: 'Falcon Culture: "Care and Push" Philosophy',
        motto: 'Combining High Academic Expectations with Individualized Social-Emotional Support',
        pillars: [
          { name: 'Academic Accountability', description: 'Emphasizing high expectations and preparation for high school success [1].' },
          { name: 'Social-Emotional Wellness', description: 'Partnering with EQ Schools for mindfulness and emotional resilience [11].' },
          { name: 'Falcon Pride', description: 'Celebrating school spirit, Pancake Breakfasts, and Holiday Faires [1].' },
          { name: 'Inclusive Community', description: 'Zero tolerance for hate; partnering with ADL for anti-bias learning [40].' },
          { name: 'Thrive & Vibe', description: 'Building authentic peer connections in dedicated campus wellness lounges [30].' },
        ],
      },
      communityEngagement: {
        title: 'Community Traditions & Parent Partnerships',
        description:
          'School culture at Blach is defined by high parent involvement, active community partnerships, and civic participation [1]. The Parent Teacher Association (PTA) and the Los Altos Education Foundation (LAEF) provide significant financial and volunteer resources [1].',
        initiatives: [
          'PTA Family Pancake Breakfast and community morning gatherings [1].',
          'Annual Campus Holiday Faire and student artisan showcase [1].',
          'Back-to-School Night and 7th-Grade Transition Orientations [1, 36].',
          'Eighth-Grade Graduation Ceremonies & Outdoor Leadership recognition [38].',
        ],
      },
      academicClimateAndWellbeing: {
        historicalContext:
          'Operating in high-performing Los Altos, LASD balances academic rigor with structured mental health supports [1, 2]. District leadership emphasizes a student-centered culture where moderate enrollment (~400 students) ensures every student is recognized and supported [1].',
        investigationFindings:
          'In partnership with EQ Schools, faculty members receive training in student social-emotional wellness and positive peer culture to create a supportive middle school transition [11, 17].',
        countermeasures: [
          'Thrive and Vibe Center: A dedicated space on campus where 7th and 8th graders meet during breaks to relax, interact with peers, and build friendships in a supportive environment [30].',
          'Multi-Tiered System of Supports (MTSS): Faculty utilizes MTSS protocols, co-teaching models, and targeted intervention strategies to assist students needing academic reinforcement [44].',
          'LAEF-Funded Counselors: Community contributions fund professional school counselors and mental health specialists [1].',
          'Anti-Bias & Anti-Hate Partnerships: Active student and faculty workshops conducted with the Anti-Defamation League (ADL) [40].',
        ],
      },
    },
    facilities: {
      architecturalHeritage: {
        architects: 'Gelfand Partners Architects',
        year: 2002,
        history:
          'Originally established in 1957, the campus underwent a comprehensive 75,000-square-foot architectural modernization in 2002 designed by Gelfand Partners [42]. The project transformed 1950s infrastructure into a modern learning environment with passive daylighting, natural cross-ventilation, and permanent construction, earning the AIA California Council Energy Efficiency Integration Merit Award, CEFPI Project of Distinction, and verification as an Ultralow Energy facility by the New Buildings Institute [42].',
      },
      keyFacilities: [
        {
          name: 'Ultralow Energy Classroom Wings',
          category: 'Instructional',
          description:
            'AIA-award-winning classrooms engineered with natural cross-ventilation, optimized daylighting, and modern instructional tech [42].',
        },
        {
          name: 'Thrive and Vibe Center',
          category: 'Wellness',
          description:
            'Dedicated on-campus student lounge for breaks, mindfulness, and relaxed peer interaction [30].',
        },
        {
          name: 'Central Athletic Complex & Grass Fields',
          category: 'Athletics',
          description:
            'Expansive grass soccer field, running track complex, and gymnasium hosting VAL games and community youth leagues [27, 33].',
        },
      ],
    },
    logistics: {
      counselingModel: {
        name: 'LAEF-Funded Counseling & MTSS Interventions',
        description:
          'Dedicated school counselors funded through LAEF collaborate with teachers and MTSS specialists to provide continuous academic and emotional guidance [1, 44].',
      },
      academicInterventions: {
        name: 'Rotating Advisory & Block Scheduling',
        description:
          'A rotating schedule that balances standard 46-minute periods (Mon/Fri) with Tuesday 28-min Advisory, Wednesday Late Start (9:12 AM) 82-min blocks with 38-min afternoon Advisory, and Thursday block days [36, 43].',
      },
      safetyAndTransit: {
        title: 'Commute Safety, 1:1 Technology & Universal Nutrition',
        points: [
          'Covington Road Traffic Safety: City of Los Altos installed dedicated roadway signage, crossing indicators, and traffic-calming enhancements along Covington Road [39].',
          '1:1 Chromebook Deployment: Every incoming student is provided with an official Blach student planner and an LASD-issued Chromebook charger set on day one; charged nightly at home [36].',
          'Universal Meals Program: Free breakfast and lunch daily under California\'s Universal Meals Program; third-party commercial deliveries (DoorDash/UberEats) strictly prohibited [36].',
          'Short Commute to Sunnyvale MP4: ~10 minute drive to Sunnyvale MP4 workplace; top bikeability throughout Los Altos neighborhoods [5, 6].',
        ],
      },
    },
    extracurriculars: {
      stemCompetitions: [
        {
          category: 'Mathematics',
          name: 'MATHCOUNTS & AMC 8 Competitive Team',
          description:
            'Peninsula Chapter league coaching and competition, frequently advancing individual students and cohorts to Northern California State [19, 21].',
        },
        {
          category: 'STEM Olympiad',
          name: 'Science Olympiad ("Blach MS-Green")',
          description:
            '23 Division B events (Study, Lab, Engineering) competing in Santa Clara Regional and Berkeley Scioly with Los Altos High School mentorship [20, 24, 25].',
        },
        {
          category: 'Student Life',
          name: 'Student Clubs & Digital Magazine',
          description:
            'Student-led clubs in student government, drama, instrumental band, creative writing, art, robotics, and digital journalism [1, 6].',
        },
      ],
      outdoorAndMedia: [
        {
          name: '8th-Grade Yosemite National Park Trip',
          grade: 'Grade 8 (November)',
          description:
            'A landmark tradition: annual weeklong outdoor education trip to Yosemite National Park immersing students in environmental science, hiking, and team-building [37].',
        },
        {
          name: 'Blach Student Digital Magazine',
          grade: 'Grades 7–8',
          description:
            'Student-created digital publication featuring creative writing, photography, and campus news updates [6].',
        },
        {
          name: 'Music & Performing Arts',
          grade: 'Grades 7–8',
          description:
            'Concert band, jazz ensemble, drama productions, and musical performances supported by LAEF and PTA [1].',
        },
      ],
      dayInTheLife: [
        {
          time: '8:25 AM',
          activity: 'First Bell & Campus Arrival',
          description: 'Students arrive via Covington Road bike paths, carpools, or neighborhood walks; Chromebooks ready for morning classes [36, 43].',
        },
        {
          time: '8:30 AM – 10:50 AM',
          activity: 'Core Academic Periods (ELA / Math / Science)',
          description: 'Attending core academic instruction in literature, mathematics (pre-algebra/algebra), and physical/life science [43].',
        },
        {
          time: '10:54 AM – 11:09 AM',
          activity: 'Morning Brunch Break & Thrive & Vibe Check-In',
          description: '15-minute brunch break; relaxing in the Thrive and Vibe Center or central courtyard [30, 43].',
        },
        {
          time: '11:00 AM (Tuesdays)',
          activity: 'Dedicated Advisory Period',
          description: '28-minute advisory block for community-building, mindfulness with EQ Schools, and announcements [11, 43].',
        },
        {
          time: '11:13 AM – 12:47 PM',
          activity: 'Elective Explorations & Social Studies',
          description: 'Instruction in Spanish, robotics, studio art, instrumental band, or world history [1, 43].',
        },
        {
          time: '12:47 PM – 1:25 PM',
          activity: 'Universal Free Lunch & Quad Socializing',
          description: '38-minute lunch period; hot meals provided under California Universal Meals Program and quad games [36, 43].',
        },
        {
          time: '1:29 PM – 3:03 PM',
          activity: 'Afternoon Block / Academic Lab Periods',
          description: 'Hands-on laboratory investigations and collaborative group projects prior to 3:03 PM dismissal [43].',
        },
        {
          time: '3:05 PM – 4:45 PM',
          activity: 'VAL Athletics & STEM Team Coaching',
          description: 'After-school sports practice (cross country, soccer, track, volleyball) or MATHCOUNTS / Science Olympiad builds [26, 27].',
        },
      ],
    },
    historyAndLeadership: {
      historicalChronology: [
        '1909: Los Altos School District (LASD) founded with a single schoolhouse on San Antonio Road [2].',
        '1957: Blach Intermediate School established during post-WWII suburban expansion to maintain dedicated sub-800 student junior high campuses [2].',
        '1990, 1992, 2023: Designated a California Distinguished School by the California Department of Education [1].',
        '2002: Campus undergoes comprehensive 75,000 sq ft modernization by Gelfand Partners, winning AIA California Council Energy Efficiency Integration and CEFPI awards [42].',
        '2003–Present: Complex Proposition 39 district facility negotiations regarding Bullis Charter School (BCS) allocations [2, 10].',
        '2014: Honored as a National Blue Ribbon School by the U.S. Department of Education [1].',
        'July 2023: Veteran LASD educator Wade Spenader appointed Principal, advancing the "care and push" SEL philosophy [4, 11, 13].',
      ],
      namesakeBackground:
        'Named in honor of Georgina P. Blach, a pioneering local educator and community advocate remembered for her dedicated support of youth development in Los Altos [8].',
      leadershipCohort: [
        {
          gradeOrRole: 'Principal',
          administrator: 'Wade Spenader (B.A. CSU Chico, M.A. San Jose State) [4, 13]',
          counselor: 'LAEF-Funded Counseling Team [1]',
        },
        {
          gradeOrRole: 'District Leadership',
          administrator: 'Sandra McGonagle (Superintendent, LASD) [40]',
          counselor: 'District Student Services & MTSS Specialists [44]',
        },
        {
          gradeOrRole: '7th & 8th Grade Cohorts',
          administrator: 'Wade Spenader / Department Chairs [12]',
          counselor: 'Site Counselors & Wellness Coordinators [1, 30]',
        },
      ],
      mediaAnalysis: {
        positive:
          'Local news outlets and real estate publications regularly spotlight Blach\'s academic accolades (#15 Best Public Middle School Teachers in CA, #44 Best Public Middle School in CA by Niche), top state standardized test percentiles, and smooth high school matriculation to Mountain View and Los Altos High Schools [1, 3, 38].',
        neutral:
          'Regional news organizations (Los Altos Town Crier) frequently cover the broader administrative landscape of LASD, including enrollment shifts, municipal safety improvements on Covington Road, and Proposition 39 facility-sharing agreements with Bullis Charter School [2, 10, 39].',
        critical: {
          incidentSummary:
            'In December 2023, local media (including J. The Jewish News of Northern California) reported on an antisemitic vandalism incident in the boys\' P.E. locker room where seven swastikas sketched in pen were discovered [40].',
          reforms: [
            'Superintendent Sandra McGonagle issued a districtwide message affirming zero tolerance for hate or discrimination [40].',
            'Principal Wade Spenader contacted the Los Altos Police Department, oversaw immediate graffiti remediation, and communicated safety steps directly to families [40].',
            'Campus partnered with the Anti-Defamation League (ADL) to conduct anti-bias and anti-hate workshops for students and faculty [40].',
          ],
        },
      },
    },
    prospectiveFamilySynthesis: {
      summary:
        'For a prospective parent evaluating Georgina P. Blach Intermediate School, Blach presents an exemplary public junior high environment balancing academic excellence, active STEM competition pathways (MATHCOUNTS, Science Olympiad), structured VAL athletics, modern ultralow-energy facilities, and experienced leadership committed to social-emotional wellness [1, 3].',
      keyTakeaways: [
        'Academic Rigor & STEM Pathways: Strong core preparation for MVLA high schools, top MATHCOUNTS competitive team advancing to State, and Science Olympiad mentored by Los Altos High School [1, 19, 25].',
        'Moderate School Size (~400 Students): Allows faculty to know students personally, fostering high accountability and supportive mentorship under Principal Wade Spenader\'s "care and push" leadership [1, 11].',
        'Comprehensive Athletics & Non-Cut Sports: 5 seasonal sports periods under VAL and Los Altos Recreation Department, including non-cut Cross Country, Wrestling, and Track & Field, plus the 4-sport varsity jacket tradition [26, 27, 35].',
        'Modern Ultralow Energy Campus: Award-winning 75,000 sq ft Gelfand Partners reconstruction with passive daylighting, Thrive & Vibe Center, and Covington Road safety upgrades [30, 39, 42].',
      ],
    },
    worksCited: [
      { id: 1, title: 'About Blach School - Los Altos', url: 'https://www.blachschool.org/about-blach-school' },
      { id: 2, title: 'Los Altos School District - Wikipedia', url: 'https://en.wikipedia.org/wiki/Los_Altos_School_District' },
      { id: 3, title: 'Georgina P. Blach Junior High School in Los Altos, CA - Niche', url: 'https://www.niche.com/k12/georgina-p-blach-junior-high-school-los-altos-ca/' },
      { id: 4, title: 'School Profile: Georgina P. Blach Junior High (CA Dept of Education)', url: 'https://www.cde.ca.gov/sdprofile/details.aspx?cds=43695186047435' },
      { id: 5, title: 'Los Altos Real Estate & Neighborhood Guide | Nancy Liu Team', url: 'https://www.nancyliurealty.com/los-altos-realtor' },
      { id: 6, title: 'Los Altos Schools and Real Estate Market for Families', url: 'https://www.davidazimigroup.com/los-altos-education-property' },
      { id: 7, title: "Principal's Message - Blach Intermediate School", url: 'https://www.blachschool.org/principals-message' },
      { id: 8, title: 'Georgina P Blach Falcons Apparel | Prep Sportswear', url: 'https://www.prepsportswear.com/school/us/california/los-altos/georgina-p-blach-intermediate-school-falcons?schoolid=147752' },
      { id: 9, title: 'Los Altos Homes & Lifestyle Guide | Explore the Area - Campi Group', url: 'https://campi.com/neighborhoods/los-altos' },
      { id: 10, title: 'Schoolyard Fight - Daily Journal', url: 'https://dailyjournal.com/articles/246898-schoolyard-fight' },
      { id: 11, title: 'EQ Schools Impact | Transforming School Communities', url: 'https://eqschools.com/impact/' },
      { id: 12, title: 'Teachers and Staff - Blach Intermediate School', url: 'https://www.blachschool.org/teachers-and-staff' },
      { id: 13, title: 'Wade Spenader - Age, Phone Number, Email, Contact ... - Radaris', url: 'https://radaris.com/p/Wade/Spenader/' },
      { id: 14, title: 'Camp Visit: Decathlon Sports Club Offers Students a Glimpse of the', url: 'https://patch.com/california/losaltos/camp-visit-decathlon-sports-club-offers-students-a-gl5e3de9d2be' },
      { id: 15, title: 'Los Altos Elementary Salaries - California - GovSalaries', url: 'https://govsalaries.com/salaries/CA/los-altos-elementary' },
      { id: 16, title: 'EdSummit LASD: Directory - Sched', url: 'https://edsummitlasd2014.sched.com/directory/descriptions/4' },
      { id: 17, title: 'Schoolwide SEL Wellness & Learning Program - EQ Schools', url: 'https://eqschools.com/sel-program/' },
      { id: 18, title: '921 Loraine Ave, Los Altos, CA 94024 | Redfin', url: 'https://www.redfin.com/CA/Los-Altos/921-Loraine-Ave-94024/home/168870061' },
      { id: 19, title: 'San Mateo County Mathcounts Chapter - 2018 Schools and Results', url: 'https://sites.google.com/view/san-mateo-county-mathcounts/participating-schools-and-results/2018-schools-and-results' },
      { id: 20, title: 'Participating Schools - Scilympiad', url: 'https://scilympiad.com/scioly-at-berkeley/Reg/School' },
      { id: 21, title: 'Peninsula Chapter - MATHCOUNTS of California', url: 'https://cspeef.org/competitions/peninsula/' },
      { id: 22, title: 'Peninsula Advancing Students 2025 - MATHCOUNTS of California', url: 'https://cspeef.org/competitions/peninsula/peninsula-advancing-students-2025/' },
      { id: 23, title: 'Santa Clara County Regional Science Olympiad - Scilympiad', url: 'https://scilympiad.com/santa-clara-so/Info/Results/0b4bff75-2c1c-474c-8509-8addf5ad5ab8' },
      { id: 24, title: 'Team Registration - Northern California Science Olympiad', url: 'https://www.norcalscioly.org/?tab=registration' },
      { id: 25, title: 'Los Altos High School - Wiki - Scioly.org', url: 'https://scioly.org/wiki/Los_Altos_High_School' },
      { id: 26, title: 'Sports Seasons - Blach Intermediate School', url: 'https://www.blachschool.org/sports-seasons' },
      { id: 27, title: 'Team Selection & Tryouts - Los Altos - Blach Intermediate School', url: 'https://www.blachschool.org/team-selection-tryouts' },
      { id: 28, title: 'Schools - Valley Athletic League', url: 'https://www.valleyal.org/content/8260/Schools' },
      { id: 29, title: 'Blach Athletics - Blach Intermediate School', url: 'https://www.blachschool.org/index.php?pageID=smartSiteFeed&psqFeed=true&articleID=84455757' },
      { id: 30, title: 'Blach Banner - August 21, 2026', url: 'https://www.blachschool.org/index.php?pageID=smartSiteFeed&psqFeed=true&articleID=84984134' },
      { id: 31, title: 'West Valley Athletic League (WVAL) - Redwood Sports - Google Sites', url: 'https://sites.google.com/saratogausd.org/redwood-sports/west-valley-athletic-league' },
      { id: 32, title: 'Santa Clara Valley Athletic League - Wikipedia', url: 'https://en.wikipedia.org/wiki/Santa_Clara_Valley_Athletic_League' },
      { id: 33, title: 'Menlo Park - Soccer League - Fall 2026 Outdoor, Saturday - i9 Sports', url: 'https://www.i9sports.com/programs/menlo-park-menlo-atherton-high-school-soccer-league-september-2026/186068' },
      { id: 34, title: 'Welcome to AYSO Region 1099 - Half Moon Bay', url: 'https://www.ayso1099.org/Default.aspx?tabid=736842&mid=814890&templateid=-1&ctl=viewallfieldstatus' },
      { id: 35, title: 'Athletic Recognition - Blach Intermediate School', url: 'https://www.blachschool.org/athletic-recognition' },
      { id: 36, title: 'Blach Banner Welcome Back Edition 2 - August 5, 2026', url: 'https://www.blachschool.org/index.php?pageID=smartSiteFeed&psqFeed=true&articleID=81112377' },
      { id: 37, title: 'Blach Intermediate School - Home', url: 'https://www.blachschool.org/' },
      { id: 38, title: "Blach's Graduates Spread Their Wings | Los Altos, CA Patch", url: 'https://patch.com/california/losaltos/blach-s-graduates-spread-their-wings' },
      { id: 39, title: 'Traffic Safety Sign Upgrades on Covington Road - Los Altos, CA', url: 'http://www.losaltosca.gov/m/newsflash/Home/Detail/29' },
      { id: 40, title: 'Two Bay Area middle schools respond to Nazi salutes, graffiti', url: 'https://jweekly.com/2023/12/28/two-bay-area-middle-schools-respond-to-nazi-salutes-graffiti/' },
      { id: 41, title: "UPDATED: We've mapped antisemitism at K-12 Bay Area schools", url: 'https://jweekly.com/2025/09/10/where-has-antisemitism-at-schools-been-reported-this-map-shows-you/' },
      { id: 42, title: 'Blach Intermediate School - Gelfand Partners Architects', url: 'https://www.gelfand-partners.com/projects/blach/' },
      { id: 43, title: 'Bell Schedule - Blach Intermediate School', url: 'https://www.blachschool.org/bell-schedule' },
      { id: 44, title: 'Our Superintendent - Bayshore Elementary School District', url: 'https://www.thebayshoreschool.org/Our-District/Our-Superintendent/index.html' },
    ],
  },
};
