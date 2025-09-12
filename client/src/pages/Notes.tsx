import { useState } from "react";
import NoteCard from "@/components/NoteCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function Notes() {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Todo: remove mock functionality
  const [allNotes] = useState([
    {
      id: "1",
      title: "Professional Development Guidelines",
      content: "Essential guidelines for career advancement and professional growth within our network. This comprehensive document covers best practices, skill development recommendations, and career pathway suggestions.",
      category: "Training",
      tags: ["Career", "Development", "Guidelines", "Professional Growth"],
      type: "text" as const,
      isRead: false,
      readCount: 23,
      createdAt: "2 days ago"
    },
    {
      id: "2",
      title: "Q4 Networking Event Photos",
      content: "Photos from our quarterly networking event featuring key speakers and attendees. Great memories and networking moments captured.",
      category: "Update",
      tags: ["Photos", "Events", "Q4"],
      type: "image" as const,
      isRead: true,
      readCount: 45,
      createdAt: "1 week ago"
    },
    {
      id: "3",
      title: "Partnership Agreement Template",
      content: "Legal template for establishing new business partnerships within the BPN network. Includes standard terms, conditions, and best practices.",
      category: "Policy",
      tags: ["Legal", "Partnership", "Template", "Business"],
      type: "pdf" as const,
      isRead: false,
      readCount: 12,
      createdAt: "3 days ago"
    },
    {
      id: "4",
      title: "Code of Conduct Updates",
      content: "Important updates to our professional code of conduct. Please review the changes and acknowledge your understanding.",
      category: "Policy",
      tags: ["Policy", "Conduct", "Updates"],
      type: "text" as const,
      isRead: true,
      readCount: 67,
      createdAt: "5 days ago"
    },
    {
      id: "5",
      title: "Digital Marketing Best Practices",
      content: "Comprehensive guide to digital marketing strategies specifically tailored for BPN members and their businesses.",
      category: "Training",
      tags: ["Marketing", "Digital", "Best Practices", "Strategy"],
      type: "pdf" as const,
      isRead: false,
      readCount: 34,
      createdAt: "1 week ago"
    }
  ]);

  const filteredNotes = allNotes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const unreadNotes = filteredNotes.filter(note => !note.isRead);
  const readNotes = filteredNotes.filter(note => note.isRead);

  const handleNoteClick = (noteId: string) => {
    console.log(`Opening note: ${noteId}`);
    // Todo: navigate to note detail view
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      <header className="bg-card border-b border-border px-4 py-3 space-y-3">
        <h1 className="text-xl font-semibold" data-testid="page-title">
          Notes
        </h1>
        
        <div className="relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            data-testid="input-search-notes"
            className="pl-10"
          />
        </div>
      </header>

      <Tabs defaultValue="unread" className="flex-1 flex flex-col">
        <div className="px-4 pt-2">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="unread" data-testid="tab-unread">
              Unread ({unreadNotes.length})
            </TabsTrigger>
            <TabsTrigger value="all" data-testid="tab-all">
              All Notes
            </TabsTrigger>
            <TabsTrigger value="read" data-testid="tab-read">
              Read
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="unread" className="flex-1 mt-0">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-4 pb-24">
              {unreadNotes.length > 0 ? (
                unreadNotes.map((note) => (
                  <NoteCard
                    key={note.id}
                    {...note}
                    onClick={() => handleNoteClick(note.id)}
                  />
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No unread notes</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="all" className="flex-1 mt-0">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-4 pb-24">
              {filteredNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  {...note}
                  onClick={() => handleNoteClick(note.id)}
                />
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="read" className="flex-1 mt-0">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-4 pb-24">
              {readNotes.length > 0 ? (
                readNotes.map((note) => (
                  <NoteCard
                    key={note.id}
                    {...note}
                    onClick={() => handleNoteClick(note.id)}
                  />
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No read notes</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}