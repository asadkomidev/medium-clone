import {
  Body,
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
  code: string;
};
const logoUrl = process.env.LOGO_URL || "";

export function TwoFactorEmail({ code }: Props) {
  return (
    <Html lang="en">
      {/* <Head /> */}
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
              Enter the following code to finish your two factor authentication
              sign in.
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Section style={codeBox}>
                <Text style={confirmationCodeText}>{code}</Text>
              </Section>
            </Section>
            <Hr className="my-[18px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px] text-center">
              Not expecting this email? <br /> Contact support@company.com if
              you did not request this code.
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

export default TwoFactorEmail;

const codeBox = {
  background: "rgb(245, 244, 245)",
  borderRadius: "4px",
  marginBottom: "10px",
  padding: "10px 10px",
  width: "50%",
};

const confirmationCodeText = {
  fontSize: "30px",
  textAlign: "center" as const,
  verticalAlign: "middle",
};
