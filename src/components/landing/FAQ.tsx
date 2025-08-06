import React, { useState } from 'react';
import { Container, Div, H2, P, Button } from '@/lib/dev-container';
import { ChevronDown, ChevronUp } from 'lucide-react';

type FAQItem = {
  question: string;
  answer: string;
};

const faqData: FAQItem[] = [
  {
    question: 'What is the pricing model?',
    answer: 'We offer flexible subscription plans with a 14‑day free trial. Choose monthly or annual billing.',
  },
  {
    question: 'Can I import existing data?',
    answer: 'Yes, our import wizard lets you bring in data from CSV, Excel, or other platforms with just a few clicks.',
  },
  {
    question: 'Is there a limit to the number of users?',
    answer: 'Our platform scales with your organization – from small teams to enterprise‑wide deployments.',
  },
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Container componentId="landing-faq" className="bg-gray-50 py-20">
      <Div className="max-w-4xl mx-auto px-4">
        <H2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</H2>
        <Div className="space-y-4">
          {faqData.map((item, idx) => (
            <Div key={idx} className="border-b pb-4">
              <Button
                devId={`faq-toggle-${idx}`}
                variant="ghost"
                className="w-full flex justify-between items-center text-left"
                onClick={() => toggle(idx)}
              >
                <P className="font-medium">{item.question}</P>
                {openIndex === idx ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </Button>
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

export default FAQ;