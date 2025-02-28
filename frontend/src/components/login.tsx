import { X } from "lucide-react";

const Login = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 bg-[#000000]/60 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="flex justify-center bg-white p-5">
        <h1 onClick={onClose}>Text</h1>
      </div>
    </div>
  );
};

export default Login;
