import LoginCard from '../LoginCard';

export default function LoginCardExample() {
  return (
    <LoginCard 
      onLogin={(email, password) => {
        console.log("Login:", { email, password });
        alert(`Login successful for ${email}`);
      }}
    />
  );
}