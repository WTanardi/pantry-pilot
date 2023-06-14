import { useSession } from "next-auth/react";

const TestPage = () => {
  const { data: session } = useSession();
  return (
    <>
      <p>{session?.user.email}</p>
    </>
  );
};

export default TestPage;
