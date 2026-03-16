export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl: string;
  image: string | null;
  description: string | null;
}

export interface CertificationsDict {
  title: string;
  viewCredential: string;
  items: CertificationItem[];
}
