import * as React from 'react';
import {
  Body,
  Column,
  Hr,
  Html,
  Link,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

interface ContactEmailProps {
  message: string;
}

export function ContactEmail({
  message = 'Thanks for your reply!!',
}: ContactEmailProps) {
  return (
    <Html lang="en">
      <Tailwind>
        <Body className="mx-auto max-w-3xl font-sans">
          <Section className="pb-10">
            <Text>{message}</Text>
          </Section>

          <Section className="rounded-lg bg-[linear-gradient(110deg,#360D50,#000,#59146e)] px-4">
            <Text className="text-4xl font-semibold tracking-wide text-white">
              Fishkido.tv
            </Text>
            <Hr
              style={{
                borderTop: '1px solid #737373',
              }}
            />

            <Row>
              <Column className="w-1/3">
                <Text className="text-white">
                  Date: {new Date().toLocaleDateString('en-UK')}
                </Text>
              </Column>
              <Column className="w-1/3">
                <Link className="text-white" href="https://fishkido.tv">
                  Fishkido.tv
                </Link>
              </Column>
              <Column className="w-1/3">
                <Text className="text-white">
                  Replies will not be forwarded.
                </Text>
              </Column>
            </Row>
          </Section>
        </Body>
      </Tailwind>
    </Html>
  );
}

export default ContactEmail;
