-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  class TEXT NOT NULL DEFAULT '12',
  stream TEXT NOT NULL DEFAULT 'Science',
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id)
);

-- Create colleges table
CREATE TABLE public.colleges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  type TEXT NOT NULL,
  streams TEXT[] NOT NULL DEFAULT '{}',
  ranking INTEGER,
  fees TEXT,
  website TEXT,
  description TEXT,
  image_url TEXT,
  courses TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create favorites table for user college favorites
CREATE TABLE public.favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  college_id UUID NOT NULL REFERENCES public.colleges(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, college_id)
);

-- Create scholarships table
CREATE TABLE public.scholarships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  eligibility TEXT,
  amount TEXT,
  deadline DATE,
  website TEXT,
  streams TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create exams table for competitive exams
CREATE TABLE public.exams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  exam_date DATE,
  registration_start DATE,
  registration_end DATE,
  website TEXT,
  streams TEXT[] DEFAULT '{}',
  exam_type TEXT DEFAULT 'entrance',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.colleges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scholarships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exams ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = user_id);

-- Colleges policies (public read)
CREATE POLICY "Anyone can view colleges"
ON public.colleges FOR SELECT
TO authenticated
USING (true);

-- Favorites policies
CREATE POLICY "Users can view their own favorites"
ON public.favorites FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can add favorites"
ON public.favorites FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove favorites"
ON public.favorites FOR DELETE
USING (auth.uid() = user_id);

-- Scholarships policies (public read for authenticated)
CREATE POLICY "Authenticated users can view scholarships"
ON public.scholarships FOR SELECT
TO authenticated
USING (true);

-- Exams policies (public read for authenticated)
CREATE POLICY "Authenticated users can view exams"
ON public.exams FOR SELECT
TO authenticated
USING (true);

-- Create trigger for updating profiles timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, name, class, stream, location)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'name', 'User'),
    COALESCE(NEW.raw_user_meta_data ->> 'class', '12'),
    COALESCE(NEW.raw_user_meta_data ->> 'stream', 'Science'),
    NEW.raw_user_meta_data ->> 'location'
  );
  RETURN NEW;
END;
$$;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample colleges
INSERT INTO public.colleges (name, location, type, streams, ranking, fees, website, description, courses) VALUES
('Indian Institute of Technology Delhi', 'New Delhi, Delhi', 'Government', ARRAY['Science'], 1, '₹2,00,000/year', 'https://home.iitd.ac.in', 'Premier engineering institute known for cutting-edge research and innovation.', ARRAY['B.Tech', 'M.Tech', 'PhD']),
('Indian Institute of Technology Bombay', 'Mumbai, Maharashtra', 'Government', ARRAY['Science'], 2, '₹2,00,000/year', 'https://www.iitb.ac.in', 'Leading technical institution with world-class infrastructure.', ARRAY['B.Tech', 'M.Tech', 'PhD']),
('Indian Institute of Technology Madras', 'Chennai, Tamil Nadu', 'Government', ARRAY['Science'], 3, '₹2,00,000/year', 'https://www.iitm.ac.in', 'Top-ranked IIT with strong industry partnerships.', ARRAY['B.Tech', 'M.Tech', 'PhD']),
('Indian Institute of Technology Kanpur', 'Kanpur, Uttar Pradesh', 'Government', ARRAY['Science'], 4, '₹2,00,000/year', 'https://www.iitk.ac.in', 'Known for its entrepreneurial ecosystem and research.', ARRAY['B.Tech', 'M.Tech', 'PhD']),
('Indian Institute of Technology Kharagpur', 'Kharagpur, West Bengal', 'Government', ARRAY['Science'], 5, '₹2,00,000/year', 'https://www.iitkgp.ac.in', 'Oldest IIT with the largest campus in India.', ARRAY['B.Tech', 'M.Tech', 'PhD']),
('All India Institute of Medical Sciences', 'New Delhi, Delhi', 'Government', ARRAY['Science'], 1, '₹5,000/year', 'https://www.aiims.edu', 'Premier medical institution in India.', ARRAY['MBBS', 'MD', 'MS', 'PhD']),
('Armed Forces Medical College', 'Pune, Maharashtra', 'Government', ARRAY['Science'], 2, '₹50,000/year', 'https://www.afmc.nic.in', 'Top medical college for defense aspirants.', ARRAY['MBBS', 'MD', 'MS']),
('Christian Medical College', 'Vellore, Tamil Nadu', 'Private', ARRAY['Science'], 3, '₹2,50,000/year', 'https://www.cmch-vellore.edu', 'Renowned private medical college.', ARRAY['MBBS', 'MD', 'MS']),
('Shri Ram College of Commerce', 'New Delhi, Delhi', 'Government', ARRAY['Commerce'], 1, '₹30,000/year', 'https://www.srcc.edu', 'Top commerce college in India.', ARRAY['B.Com', 'M.Com']),
('Lady Shri Ram College', 'New Delhi, Delhi', 'Government', ARRAY['Commerce', 'Arts'], 2, '₹25,000/year', 'https://www.lsr.edu.in', 'Premier women''s college for commerce and arts.', ARRAY['B.Com', 'BA', 'MA']),
('St. Xavier''s College', 'Mumbai, Maharashtra', 'Private', ARRAY['Commerce', 'Arts', 'Science'], 3, '₹40,000/year', 'https://xaviers.edu', 'Multi-disciplinary autonomous college.', ARRAY['B.Com', 'BA', 'B.Sc']),
('Hindu College', 'New Delhi, Delhi', 'Government', ARRAY['Arts', 'Science'], 1, '₹20,000/year', 'https://www.hinducollege.ac.in', 'One of the oldest and most prestigious colleges in India.', ARRAY['BA', 'B.Sc', 'MA']),
('Presidency College', 'Kolkata, West Bengal', 'Government', ARRAY['Arts', 'Science'], 2, '₹5,000/year', 'https://www.presiuniv.ac.in', 'Historic institution with excellent faculty.', ARRAY['BA', 'B.Sc', 'MA']),
('Miranda House', 'New Delhi, Delhi', 'Government', ARRAY['Arts', 'Science'], 3, '₹20,000/year', 'https://www.mirandahouse.ac.in', 'Top-ranked women''s college.', ARRAY['BA', 'B.Sc', 'MA']),
('National Law School of India University', 'Bangalore, Karnataka', 'Government', ARRAY['Arts'], 1, '₹2,50,000/year', 'https://www.nls.ac.in', 'Premier law school in India.', ARRAY['BA LLB', 'LLM', 'PhD']),
('Indian Institute of Management Ahmedabad', 'Ahmedabad, Gujarat', 'Government', ARRAY['Commerce'], 1, '₹25,00,000/course', 'https://www.iima.ac.in', 'Top-ranked business school.', ARRAY['MBA', 'PhD']),
('National Institute of Design', 'Ahmedabad, Gujarat', 'Government', ARRAY['Arts'], 1, '₹3,00,000/year', 'https://www.nid.edu', 'Premier design institute.', ARRAY['B.Des', 'M.Des']),
('Film and Television Institute of India', 'Pune, Maharashtra', 'Government', ARRAY['Arts'], 1, '₹1,50,000/year', 'https://www.ftiindia.com', 'Top film school in India.', ARRAY['Diploma', 'PG Diploma']),
('Indian Statistical Institute', 'Kolkata, West Bengal', 'Government', ARRAY['Science'], 1, '₹10,000/year', 'https://www.isical.ac.in', 'Premier institute for statistics and data science.', ARRAY['B.Stat', 'M.Stat', 'PhD']),
('Birla Institute of Technology and Science', 'Pilani, Rajasthan', 'Private', ARRAY['Science'], 6, '₹5,00,000/year', 'https://www.bits-pilani.ac.in', 'Top private engineering institute.', ARRAY['B.E.', 'M.E.', 'PhD']);

-- Insert sample scholarships
INSERT INTO public.scholarships (name, description, eligibility, amount, deadline, website, streams) VALUES
('National Merit Scholarship', 'For meritorious students from economically weaker sections', 'Class 12 with 80%+ marks, family income below ₹8 lakh', '₹12,000/year', '2025-03-31', 'https://scholarships.gov.in', ARRAY['Science', 'Commerce', 'Arts']),
('INSPIRE Scholarship', 'For students pursuing science at undergraduate level', 'Top 1% in Class 12 board exams', '₹80,000/year', '2025-04-15', 'https://online-inspire.gov.in', ARRAY['Science']),
('Central Sector Scholarship', 'For college students from low-income families', 'Class 12 with 80%+ marks, family income below ₹8 lakh', '₹10,000/year', '2025-02-28', 'https://scholarships.gov.in', ARRAY['Science', 'Commerce', 'Arts']),
('Post Matric Scholarship for SC/ST', 'For SC/ST students pursuing higher education', 'SC/ST category students', 'Full tuition + maintenance', '2025-01-31', 'https://scholarships.gov.in', ARRAY['Science', 'Commerce', 'Arts']),
('Kishore Vaigyanik Protsahan Yojana', 'Fellowship for students pursuing science', 'Class 11-12 science students with aptitude', '₹5,000-7,000/month', '2025-08-31', 'https://kvpy.iisc.ac.in', ARRAY['Science']),
('Tata Scholarship', 'For students from low-income families', 'Merit-based, family income below ₹4 lakh', 'Up to ₹6 lakh/year', '2025-05-31', 'https://www.tatatrusts.org', ARRAY['Science', 'Commerce', 'Arts']),
('Reliance Foundation Scholarship', 'For undergraduate students', 'Students with strong academic record', '₹2,00,000/year', '2025-06-30', 'https://www.reliancefoundation.org', ARRAY['Science', 'Commerce', 'Arts']),
('Aditya Birla Scholarship', 'For top performers in premier institutions', 'Students of IITs, IIMs, BITS, XLRI, Law schools', '₹65,000-1,80,000/year', '2025-07-31', 'https://www.adityabirlascholars.net', ARRAY['Science', 'Commerce', 'Arts']),
('ONGC Scholarship', 'For SC/ST/OBC students', 'Class 12 with 60%+ marks', '₹48,000/year', '2025-04-30', 'https://www.ongcindia.com', ARRAY['Science', 'Commerce', 'Arts']),
('Sitaram Jindal Foundation Scholarship', 'For students in financial need', 'Students with 60%+ marks', '₹15,000-60,000/year', '2025-08-15', 'https://www.sitaramjindalfoundation.org', ARRAY['Science', 'Commerce', 'Arts']);

-- Insert sample exams
INSERT INTO public.exams (name, description, exam_date, registration_start, registration_end, website, streams, exam_type) VALUES
('JEE Main 2025 Session 1', 'Joint Entrance Examination for engineering admissions', '2025-01-20', '2024-11-01', '2024-11-30', 'https://jeemain.nta.nic.in', ARRAY['Science'], 'entrance'),
('JEE Main 2025 Session 2', 'Joint Entrance Examination for engineering admissions', '2025-04-15', '2025-02-01', '2025-03-15', 'https://jeemain.nta.nic.in', ARRAY['Science'], 'entrance'),
('JEE Advanced 2025', 'For admission to IITs', '2025-05-25', '2025-04-20', '2025-05-05', 'https://jeeadv.ac.in', ARRAY['Science'], 'entrance'),
('NEET UG 2025', 'National Eligibility cum Entrance Test for medical admissions', '2025-05-04', '2025-02-01', '2025-03-10', 'https://neet.nta.nic.in', ARRAY['Science'], 'entrance'),
('BITSAT 2025', 'BITS Admission Test', '2025-05-20', '2025-01-15', '2025-04-15', 'https://www.bitsadmission.com', ARRAY['Science'], 'entrance'),
('CLAT 2025', 'Common Law Admission Test', '2025-05-11', '2024-11-01', '2025-04-15', 'https://consortiumofnlus.ac.in', ARRAY['Arts'], 'entrance'),
('CUET 2025', 'Common University Entrance Test', '2025-05-15', '2025-02-01', '2025-03-31', 'https://cuet.samarth.ac.in', ARRAY['Science', 'Commerce', 'Arts'], 'entrance'),
('NDA Exam 2025 (I)', 'National Defence Academy Examination', '2025-04-13', '2024-12-15', '2025-01-31', 'https://upsc.gov.in', ARRAY['Science', 'Commerce', 'Arts'], 'entrance'),
('NDA Exam 2025 (II)', 'National Defence Academy Examination', '2025-09-07', '2025-05-15', '2025-06-30', 'https://upsc.gov.in', ARRAY['Science', 'Commerce', 'Arts'], 'entrance'),
('CAT 2025', 'Common Admission Test for MBA', '2025-11-24', '2025-08-01', '2025-09-15', 'https://iimcat.ac.in', ARRAY['Commerce'], 'entrance'),
('GATE 2025', 'Graduate Aptitude Test in Engineering', '2025-02-01', '2024-08-24', '2024-10-07', 'https://gate2025.iitr.ac.in', ARRAY['Science'], 'entrance'),
('UPSC CSE Prelims 2025', 'Civil Services Preliminary Examination', '2025-05-25', '2025-02-01', '2025-02-21', 'https://upsc.gov.in', ARRAY['Science', 'Commerce', 'Arts'], 'competitive'),
('SSC CGL 2025', 'Staff Selection Commission Combined Graduate Level', '2025-07-15', '2025-04-01', '2025-05-15', 'https://ssc.nic.in', ARRAY['Science', 'Commerce', 'Arts'], 'competitive'),
('IBPS PO 2025', 'Institute of Banking Personnel Selection PO Exam', '2025-10-15', '2025-08-01', '2025-08-31', 'https://www.ibps.in', ARRAY['Commerce'], 'competitive'),
('RBI Grade B 2025', 'Reserve Bank of India Officer Grade B', '2025-03-15', '2025-01-15', '2025-02-15', 'https://www.rbi.org.in', ARRAY['Commerce'], 'competitive');