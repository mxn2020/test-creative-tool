import React from 'react';
import { Container, Div, Card, CardHeader, CardTitle, CardDescription, Avatar } from '@/lib/dev-container';
import { Quote } from 'lucide-react';
const testimonials = [
  {
    name: 'Jane Doe',
    title: 'CEO, Acme Corp',
    quote: 'The platform transformed our workflow and increased productivity by 30%.',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    name: 'John Smith',
    title: 'Product Lead, Beta LLC',
    quote: 'An intuitive UI combined with powerful analytics gave us real insight.',
    avatar: 'https://i.pravatar.cc/150?img=2',
  },
  {
    name: 'Emily Chen',
    title: 'CTO, Gamma Inc.',
    quote: 'Security and compliance features let us focus on growth, not risks.',
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
];
export const Testimonials: React.FC = () => {
  return (
    <Container componentId="landing-testimonials">
      <Div devId="testimonials-section" className="py-16 bg-white">
        <Div devId="testimonials-heading" className="text-center mb-12">
          <h2 className="text-3xl font-bold">What Our Customers Say</h2>
        </Div>
        <Div devId="testimonials-grid" className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          {testimonials.map((t, idx) => (
            <Card key={idx} devId={`testimonial-card-${idx}`} className="flex flex-col items-center p-6 text-center">
              <Avatar
                devId={`testimonial-avatar-${idx}`}
                src={t.avatar}
                alt={t.name}
                className="w-16 h-16 rounded-full mb-4"
              />
              <CardHeader devId={`testimonial-header-${idx}`}>
                <CardTitle devId={`testimonial-title-${idx}`} className="text-lg font-semibold">
                  {t.name}
                </CardTitle>
                <CardDescription devId={`testimonial-description-${idx}`} className="text-sm text-gray-500">
                  {t.title}
                </CardDescription>
              </CardHeader>
              <Div devId={`testimonial-body-${idx}`} className="mt-4 flex-1">
                <Quote className="h-5 w-5 text-indigo-600 mx-auto mb-2" />
                <p className="text-gray-700">{t.quote}</p>
              </Div>
            </Card>
          ))}
        </Div>
      </Div>
    </Container>
  );
};
export default Testimonials;
---END:src/components/landing/Testimonials.tsx---