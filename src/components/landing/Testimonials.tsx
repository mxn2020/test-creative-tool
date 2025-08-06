import React from 'react';
import { Container, Div, H2, P } from '@/lib/dev-container';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const testimonials = [
  {
    name: 'Alexandra P.',
    role: 'Founder, StartupX',
    quote: 'The platform streamlined our client onboarding and cut scheduling time by 40%.',
    avatar: '',
  },
  {
    name: 'Michael B.',
    role: 'Operations Manager, HealthCo',
    quote: 'Team collaboration features made compliance tracking painless and transparent.',
    avatar: '',
  },
  {
    name: 'Sofia L.',
    role: 'Freelance Designer',
    quote: 'I love the intuitive UI – I can manage my bookings on the go without hassle.',
    avatar: '',
  },
];

export const LandingTestimonials: React.FC = () => {
  return (
    <Container componentId="landing-testimonials">
      <Div devId="testimonials-section" className="py-20 bg-white">
        <H2 devId="testimonials-heading" className="text-3xl font-bold text-center mb-12">
          What Our Users Say
        </H2>
        <Div devId="testimonials-grid" className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((t, idx) => (
            <Card key={idx} className="p-6 flex flex-col items-center text-center">
              <CardHeader className="flex flex-col items-center">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={t.avatar} />
                  <AvatarFallback>{t.name[0]}</AvatarFallback>
                </Avatar>
                <CardTitle className="mt-4 text-lg font-medium">{t.name}</CardTitle>
                <P className="text-sm text-gray-500">{t.role}</P>
              </CardHeader>
              <CardContent className="mt-4">
                <P className="italic text-gray-700">&ldquo;{t.quote}&rdquo;</P>
              </CardContent>
            </Card>
          ))}
        </Div>
      </Div>
    </Container>
  );
};

export default LandingTestimonials;