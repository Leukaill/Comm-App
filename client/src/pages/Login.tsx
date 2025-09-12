import LoginCard from "@/components/LoginCard";

interface LoginPageProps {
  onLogin: (email: string, password: string) => void;
}

export default function Login({ onLogin }: LoginPageProps) {
  return <LoginCard onLogin={onLogin} />;
}