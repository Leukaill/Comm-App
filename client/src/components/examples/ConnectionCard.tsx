import ConnectionCard from '../ConnectionCard';
import { useState } from 'react';

export default function ConnectionCardExample() {
  const [status1, setStatus1] = useState<"none" | "pending" | "connected">("none");
  const [status2, setStatus2] = useState<"none" | "pending" | "connected">("connected");

  const sampleConnections = [
    {
      id: "1",
      name: "Alice Johnson",
      title: "Product Manager",
      company: "InnovateTech",
      location: "San Francisco, CA",
      mutualConnections: 5,
      skills: ["Product Strategy", "UX Design", "Analytics", "Leadership"],
      status: status1,
      onConnect: () => setStatus1("pending"),
      onMessage: () => console.log("Message Alice")
    },
    {
      id: "2",
      name: "Robert Smith", 
      title: "Business Development",
      company: "Growth Partners",
      location: "New York, NY",
      mutualConnections: 12,
      skills: ["Sales", "Partnerships", "Strategy"],
      status: status2,
      onConnect: () => setStatus2("pending"),
      onMessage: () => console.log("Message Robert")
    },
    {
      id: "3",
      name: "Emma Davis",
      title: "Financial Analyst",
      company: "Capital Advisors",
      location: "Chicago, IL", 
      mutualConnections: 3,
      skills: ["Financial Modeling", "Analysis", "Excel"],
      status: "pending" as const,
      onConnect: () => {},
      onMessage: () => {}
    }
  ];

  return (
    <div className="p-4 space-y-4 max-w-md">
      {sampleConnections.map((connection) => (
        <ConnectionCard key={connection.id} {...connection} />
      ))}
    </div>
  );
}