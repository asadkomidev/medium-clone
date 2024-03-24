import {
  Body,
  Button,
  Container,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

type Props = {
  link: string;
  name: string;
};

const logoUrl = process.env.LOGO_URL || "";

export function VerifyEmail({ link, name }: Props) {
  return (
    <Html lang="en">
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Section className="my-[12px] text-center">
              <Link
                href="https://www.asadkomi.com/"
                className="text-center text-2xl font-bold flex text-black">
                <Img src={logoUrl} width="140" height="33" alt="acme" />
              </Link>
            </Section>
            <Hr className="mb-[26px] mx-0 w-full" />
            <Heading className="text-black text-[16px] font-normal p-0 my-[30px] mx-0">
              <strong>Verify your email address</strong>
            </Heading>
            <Text className="text-[#666666] text-[14px] leading-[24px]">
              Hello {name},
            </Text>
            <Text className="text-[#666666] text-[14px] leading-[24px]">
              You’re almost ready to start enjoying acme. Simply click the
              Verify button below to verify your email address.
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                href={link}>
                Verify
              </Button>
            </Section>

            <Text className="text-[#666666] text-[14px] leading-[24px]">
              Thanks,
              <br /> The acme team
            </Text>
            <Hr className="my-[18px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px] text-center">
              You received this email because you signed up on acme.com
            </Text>
            <Text className="text-[#666666] text-[10px] leading-[24px] text-center">
              acme. <br />
              123 Main St, Chandler, AZ 12345
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export default VerifyEmail;
