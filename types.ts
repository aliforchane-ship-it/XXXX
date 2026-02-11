
export interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface StudyTip {
  title: string;
  content: string;
  category: 'Math' | 'Physique' | 'SI' | 'Conseil' | 'Motivation';
}

export interface MotivationalResponse {
  quote: string;
  author: string;
  tips: StudyTip[];
}
