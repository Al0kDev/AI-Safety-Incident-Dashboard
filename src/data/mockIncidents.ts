import { Incident } from '../types/incident';

export const mockIncidents: Incident[] = [
  {
    id: 1, 
    title: "Biased Recommendation Algorithm", 
    description: "Algorithm consistently favored certain demographics in job recommendations, resulting in unequal opportunity distribution across user groups. Initial analysis suggests training data imbalance as the primary cause.",
    severity: "Medium", 
    reported_at: "2025-03-15T10:00:00Z"
  },
  {
    id: 2, 
    title: "LLM Hallucination in Critical Info", 
    description: "Large Language Model provided incorrect safety procedure information when queried about emergency protocols in a healthcare setting. The false information could have led to harmful actions if followed.",
    severity: "High", 
    reported_at: "2025-04-01T14:30:00Z"
  },
  {
    id: 3, 
    title: "Minor Data Leak via Chatbot", 
    description: "Chatbot inadvertently exposed non-sensitive user metadata through verbose error messages. No personally identifiable information was compromised, but the incident revealed a potential vulnerability in the system.",
    severity: "Low", 
    reported_at: "2025-03-20T09:15:00Z"
  },
  {
    id: 4,
    title: "Automated Content Moderation Failure",
    description: "AI content moderation system failed to detect harmful content in multiple languages, allowing prohibited material to remain visible for approximately 3 hours before manual intervention.",
    severity: "High",
    reported_at: "2025-03-25T16:45:00Z"
  },
  {
    id: 5,
    title: "Facial Recognition False Positive",
    description: "Security system incorrectly identified an individual as a person of interest, triggering unnecessary security protocols. Investigation showed the system has a higher error rate for certain demographic groups.",
    severity: "Medium",
    reported_at: "2025-04-05T11:20:00Z"
  }
];