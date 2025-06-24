export interface JobOpening {
    id: number; 
    name: string; 
    title: string;
    experience: string;
    location: string;
    type: string;
    posted?: string; 
    route: string;
    publish: number;  
    description: string;
    responsibilities?: string[];
    skillsQualifications?: string[];
    whatWeOffer?: string[];
  }