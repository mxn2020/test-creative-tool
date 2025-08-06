import React from 'react';
import { Container, Div, H3, P } from '@/lib/dev-container';
import { Quote } from 'lucide-react';

type Testimonial = {
  name: string;
  role: string;
  quote: string;
};

const testimonials: Testimonial[] = [
  {
    name: 'Jane Doe',
    role: 'Product Manager',
    quote: 'The platform transformed the way our team collaborates – everything is faster and more organized.',
  },
  {
    name: 'John Smith',
    role: 'CTO',
    quote: 'Automation saved us hours of manual work each week. The analytics are spot on.',
  },
  {
    name: 'Emily Chen',
    role: 'Designer',
    quote: 'A beautiful, intuitive UI makes adoption painless for the whole company.',
  },
];

const Testimonials: React.FC = () => {
  return (
    <Container componentId="landing-testimonials" className="py-20 bg-white">
      <Div className="max-w-4xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t) => (
          <Div
            key={t.name}
            className="flex flex-col items-center text-center p-6 border rounded-md hover:shadow-md transition-shadow"
          >
            <Quote className="h-8 w-8 text-purple-600 mb-4" />
            <P className="italic text-gray-800 mb-2">“{t.quote}”</P>
            <H3 className="font-semibold">{t.name}</H3>
            <P className="text-sm text-gray-500">{t.role}</P>
          </Div>
        ))}
      </Div>
    </Container>
  );
};

export default Testimonials;