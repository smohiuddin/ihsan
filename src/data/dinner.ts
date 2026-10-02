export type Attendee = {
  name: string;
  company?: string;
  role?: string;
  linkedin?: string;
};

export const dinner = {
  title: 'Series A+',
  emphasis: 'Founders Dinner',
  description:
    'A dinner for Muslim founders who have raised a Series A or later, built around shared learnings.',
  details: [
    { label: 'Date', value: 'Thursday, October 29' },
    { label: 'Time', value: '7pm' },
    { label: 'Location', value: 'San Francisco' },
  ],
  // Fill in to show the attendee list on the page.
  attendees: [] as Attendee[],
};
