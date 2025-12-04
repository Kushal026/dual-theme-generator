export interface RealCollege {
  id: number;
  name: string;
  location: string;
  city: string;
  state: string;
  distance: string;
  rating: number;
  courses: string[];
  fees: string;
  cutoff: string;
  facilities: string[];
  phone: string;
  website: string;
  type: 'Government' | 'Aided' | 'Private';
  forClass: '10th' | '12th' | 'both';
  stream?: 'Science' | 'Commerce' | 'Arts' | 'All';
  category?: string;
  established: string;
  accreditation: string;
  placement: string;
  hostel: boolean;
  scholarships: string[];
}

export const realColleges: RealCollege[] = [
  {
    id: 101,
    name: "Indian Institute of Technology, Bombay",
    location: "Mumbai, Maharashtra",
    city: "Mumbai",
    state: "Maharashtra",
    distance: "15 km",
    rating: 4.9,
    courses: ["B.Tech CSE", "B.Tech Mechanical", "B.Tech Electrical", "B.Tech Chemical", "B.Tech Civil"],
    fees: "₹2,00,000/year",
    cutoff: "JEE Advanced Top 500",
    facilities: ["Research Labs", "Innovation Center", "Sports Complex", "Library", "Hostel"],
    phone: "+91-22-2576-7001",
    website: "www.iitb.ac.in",
    type: "Government",
    forClass: "12th",
    stream: "Science",
    category: "Engineering",
    established: "1958",
    accreditation: "NAAC A++",
    placement: "₹24 LPA average, 100% placement",
    hostel: true,
    scholarships: ["Merit-cum-Means", "SC/ST Scholarship", "Institute Fellowship"]
  },
  {
    id: 102,
    name: "All India Institute of Medical Sciences",
    location: "New Delhi, Delhi",
    city: "New Delhi",
    state: "Delhi",
    distance: "12 km",
    rating: 4.9,
    courses: ["MBBS", "B.Sc. Nursing", "B.Sc. Paramedical"],
    fees: "₹5,000/year",
    cutoff: "NEET AIR under 100",
    facilities: ["Hospital", "Research Center", "Library", "Hostel", "Sports"],
    phone: "+91-11-2658-8500",
    website: "www.aiims.edu",
    type: "Government",
    forClass: "12th",
    stream: "Science",
    category: "Medical",
    established: "1956",
    accreditation: "MCI Approved",
    placement: "100% placement in top hospitals",
    hostel: true,
    scholarships: ["Government Scholarship", "Research Fellowship"]
  },
  {
    id: 103,
    name: "Shri Ram College of Commerce",
    location: "New Delhi, Delhi",
    city: "New Delhi",
    state: "Delhi",
    distance: "8 km",
    rating: 4.8,
    courses: ["B.Com Honours", "B.A. Economics Honours", "B.Com"],
    fees: "₹35,000/year",
    cutoff: "CUET 98%+",
    facilities: ["Library", "Computer Lab", "Auditorium", "Sports Ground"],
    phone: "+91-11-2766-6859",
    website: "www.srcc.edu",
    type: "Government",
    forClass: "12th",
    stream: "Commerce",
    category: "Business",
    established: "1926",
    accreditation: "NAAC A++",
    placement: "₹12 LPA average, 95% placement",
    hostel: false,
    scholarships: ["Merit Scholarship", "SC/ST Scholarship"]
  },
  {
    id: 104,
    name: "National Law School of India University",
    location: "Bangalore, Karnataka",
    city: "Bangalore",
    state: "Karnataka",
    distance: "18 km",
    rating: 4.9,
    courses: ["B.A. LLB", "LLM", "Ph.D. in Law"],
    fees: "₹2,50,000/year",
    cutoff: "CLAT AIR under 100",
    facilities: ["Moot Court", "Legal Aid Clinic", "Library", "Hostel"],
    phone: "+91-80-2321-3160",
    website: "www.nls.ac.in",
    type: "Government",
    forClass: "12th",
    stream: "Arts",
    category: "Law",
    established: "1987",
    accreditation: "BCI Approved",
    placement: "₹25 LPA average, 100% placement",
    hostel: true,
    scholarships: ["Merit Scholarship", "Need-based Aid"]
  },
  {
    id: 105,
    name: "Indian Institute of Technology, Delhi",
    location: "New Delhi, Delhi",
    city: "New Delhi",
    state: "Delhi",
    distance: "10 km",
    rating: 4.9,
    courses: ["B.Tech CSE", "B.Tech Mechanical", "B.Tech Electrical", "B.Tech Civil"],
    fees: "₹2,10,000/year",
    cutoff: "JEE Advanced Top 300",
    facilities: ["Research Labs", "Incubation Center", "Sports Complex", "Library", "Hostel"],
    phone: "+91-11-2659-1000",
    website: "www.iitd.ac.in",
    type: "Government",
    forClass: "12th",
    stream: "Science",
    category: "Engineering",
    established: "1961",
    accreditation: "NAAC A++",
    placement: "₹26 LPA average, 100% placement",
    hostel: true,
    scholarships: ["Merit-cum-Means", "SC/ST Scholarship"]
  }
];
