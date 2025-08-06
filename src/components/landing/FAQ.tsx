import React, { useState } from 'react';
import {
  Container,
  Div,
  H2,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/lib/dev-container';
import { ChevronDown, ChevronUp } from 'lucide-react';
const faqData = [
  {
    question: 'What is the pricing model?',
    answer:
      'Our platform offers flexible subscription plans with monthly or annual billing. No hidden fees.',
  },
  {
    question: 'Can I integrate with existing tools?',
    answer:
      'Yes, we provide robust APIs and native integrations for popular services such as Slack, Zapier, and more.',
  },
  {
    question: 'Is there a free trial available?',
    answer:
      'Absolutely! Sign up to start a 14‑day free trial with full feature access.',
  },
];
export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };
  return (
    <Container componentId="landing-faq">
      <Div className="py-16 bg-gray-50">
        <H2 className="text-3xl font-bold text-center mb-8">
          Frequently Asked Questions
        </H2>
        <Div className="max-w-2xl mx-auto space-y-4">
          {faqData.map((item, idx) => (
            <Card key={idx} className="p-4">
              <CardHeader
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggle(idx)}
              >
                <CardTitle className="text-lg font-medium">{item.question}</CardTitle>
                {openIndex === idx ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </CardHeader>
              {openIndex === idx && (
                <CardDescription className="mt-2 text-gray-700">
                  {item.answer}
                </CardDescription>
              )}
            </Card>
          ))}
        </Div>
      </Div>
    </Container>
  );
};
export default FAQ;