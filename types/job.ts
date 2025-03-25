export interface JobResponsibility {
  title: string;
  items: string[];
}

export interface JobRequirement {
  title: string;
  items: string[];
}

export interface Job {
  id: string;
  title: string;
  location: string;
  type: string;
  experience: string;
  salary: string;
  description: string;
  responsibilities: JobResponsibility[];
  requirements: JobRequirement[];
  supplementarySkills: string[];
  applicationDeadline: string; // Add this new property
}
