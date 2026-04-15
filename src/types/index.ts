export interface Lead {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service_interest?: string;
  message?: string;
}

export interface CaseStudy {
  tag: string;
  headline: string;
  body: string;
  outcome: string;
}

export interface ServiceItem {
  icon: string;
  title: string;
  description: string;
  href: string;
}
