import NoteCard from '../NoteCard';

export default function NoteCardExample() {
  const sampleNotes = [
    {
      id: "1",
      title: "Professional Development Guidelines",
      content: "Essential guidelines for career advancement and professional growth within our network...",
      category: "Training",
      tags: ["Career", "Development", "Guidelines"],
      type: "text" as const,
      isRead: false,
      readCount: 23,
      createdAt: "2 days ago"
    },
    {
      id: "2", 
      title: "Q4 Networking Event Photos",
      content: "Photos from our quarterly networking event featuring key speakers and attendees",
      category: "Update",
      tags: ["Photos", "Events"],
      type: "image" as const,
      isRead: true,
      readCount: 45,
      createdAt: "1 week ago"
    },
    {
      id: "3",
      title: "Partnership Agreement Template",
      content: "Legal template for establishing new business partnerships within the BPN network",
      category: "Policy",
      tags: ["Legal", "Partnership", "Template"],
      type: "pdf" as const,
      isRead: false,
      readCount: 12,
      createdAt: "3 days ago"
    }
  ];

  return (
    <div className="p-4 space-y-4 max-w-md">
      {sampleNotes.map((note) => (
        <NoteCard 
          key={note.id}
          {...note}
          onClick={() => console.log(`Opened note: ${note.title}`)}
        />
      ))}
    </div>
  );
}