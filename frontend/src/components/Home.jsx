import { useEffect } from "react";
import HeroSection from "./HeroSection";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("/admin/companies");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-bg text-text flex flex-col">
      <main className="flex-grow space-y-16 m-2">
        <HeroSection />
      </main>
    </div>
  );
};

export default Home;
