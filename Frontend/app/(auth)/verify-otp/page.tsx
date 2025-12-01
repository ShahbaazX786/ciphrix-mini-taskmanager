import VerifyOTPForm from "../components/VerifyOTPForm";

const VerifyOTPPage = () => {
  return (
    <main className="w-full h-screen bg-gray-300 dark:bg-gray-800 px-4 pt-[10%]">
      <div className="flex flex-col justify-start items-start gap-5">
        <h1 className="text-2xl md:text-4xl lg:text-7xl font-bold">
          Verify OTP
        </h1>
        <h2 className="text-gray-800 text-base dark:text-gray-400 md:text-lg lg:text-2xl">
          Your One Time Password (OTP) must have reached your registered email,
          <br></br>Kindly submit it below to proceed further.
        </h2>
      </div>
      <div className="mt-4">
        <VerifyOTPForm />
      </div>
    </main>
  );
};

export default VerifyOTPPage;
