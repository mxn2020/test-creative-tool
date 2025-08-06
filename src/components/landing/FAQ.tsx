import React, { useState } from 'react';
import { Container, Div, H2, P } from '@/lib/dev-container';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: 'Is there a free trial?',
    answer: 'Yes! We offer a 14‑day free trial with full access to all features.',
  },
  {
    question: 'Can I cancel anytime?',
    answer: 'Absolutely. You can cancel or downgrade directly from your account settings.',
  },
  {
    question: 'Do you support multiple teams?',
    answer: 'Our platform includes role‑based permissions and team management out of the box.',
  },
  {
    question: 'Is my data secure?',
    answer: 'All data is encrypted at rest and in transit, complying with industry‑standard security practices.',
  },
];

export const LandingFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <Container componentId="landing-faq">
      <Div devId="faq-section" className="py-20 bg-gray-100">
        <H2 devId="faq-heading" className="text-3xl font-bold text-center mb-12">
          Frequently Asked Questions
        </H2>
        <Div devId="faq-list" className="max-w-3xl mx-auto space-y-4">
          {faqItems.map((item, idx) => (
            <Div
              key={idx}
              className="bg-white rounded-md border border-gray-200 p-4"
            >
              <Div className="flex items-center justify-between cursor-pointer" onClick={() => toggle(idx)}>
                <P className="font-medium">{item.question}</P>
                {openIndex === idx ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </Div>
              {openIndex === idx && (
                <P className="mt-2 text-gray-600">{item.answer}</P>
              )}
            </Div>
          ))}
        </Div>
      </Div>
    </Container>
  );
};

export default LandingFAQ;