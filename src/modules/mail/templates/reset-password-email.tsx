import {
  Body,
  Button,
  Container,
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
};

const logoUrl = process.env.LOGO_URL || "";

export function ResetPassword({ link }: Props) {
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

            <Text className="text-[#666666] text-[14px] leading-[24px]">
              Hello
            </Text>
            <Text className="text-[#666666] text-[14px] leading-[24px]">
              Someone recently requested a password change for your account. If
              this was you, you can set a new password here.
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                href={link}>
                Reset password
              </Button>
            </Section>
            <Text className="text-[#666666] text-[14px] leading-[24px]">
              If you don&apos;t want to change your password or didn&apos;t
              request this, just ignore and delete this message.
            </Text>

            <Text className="text-[#666666] text-[14px] leading-[24px]">
              Thanks,
              <br /> The acme team
            </Text>
            <Hr className="my-[18px] mx-0 w-full" />
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

export default ResetPassword;
