import { useNavigate } from "react-router-dom";
import PrimaryBtn from "../components/PrimaryBtn";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-6xl sm:text-8xl font-bold text-[#2D9CDB]">404</h1>
      <p className="mt-4 text-lg sm:text-xl text-gray-600">PAGE NOT FOUND</p>
      <p className="mt-2 text-base sm:text-lg text-gray-500">
        We looked everywhere for this page.
      </p>
      <p className="mt-2 text-base sm:text-lg text-gray-500">
        Are you sure the website URL is correct?
      </p>
      <p className="mt-2 mb-5 text-base sm:text-lg text-gray-500">
        Get in touch with the site owner.
      </p>
      <PrimaryBtn onClick={() => navigate("/landing")} px="px-4" py="py-2">
        Go Back
      </PrimaryBtn>
    </div>
  );
}

export default NotFoundPage;
