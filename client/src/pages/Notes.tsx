import { useState } from "react";
import NoteCard from "@/components/NoteCard";
import NoteDetail from "@/components/NoteDetail";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, FileText, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Notes() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNote, setSelectedNote] = useState<string | null>(null);
  
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
    setSelectedNote(noteId);
    console.log(`Opening note: ${noteId}`);
  };

  const handleMarkAsRead = () => {
    if (selectedNote) {
      console.log(`Marking note as read: ${selectedNote}`);
      // Todo: implement mark as read functionality
    }
  };

  const getSelectedNoteData = () => {
    if (!selectedNote) return null;
    return allNotes.find(note => note.id === selectedNote) || null;
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-gradient-to-br from-background via-background to-primary/5">
      {/* Enhanced Header with gradient background */}
      <header className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-background to-primary/10 border-b border-border/50 px-4 sm:px-6 py-4 sm:py-6">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-50"></div>
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-primary/15 rounded-full blur-2xl opacity-40 animate-pulse delay-1000"></div>
        
        <div className="relative z-10 space-y-4">
          {/* Title with icon */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/15 rounded-xl">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-foreground" data-testid="page-title">
                Notes
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground">Discover insights and stay informed</p>
            </div>
          </div>
          
          {/* Enhanced search bar */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-xl blur-sm"></div>
            <div className="relative bg-background/80 backdrop-blur-xl rounded-xl border border-border/50 shadow-lg">
              <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary/70" />
              <Input
                placeholder="Search notes, topics, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-search-notes"
                className="pl-12 pr-4 py-3 bg-transparent border-0 focus:ring-0 placeholder:text-muted-foreground/60 text-foreground"
              />
            </div>
          </div>
        </div>
      </header>

      <Tabs defaultValue="unread" className="flex-1 flex flex-col min-h-0">
        {/* Enhanced tabs with better styling */}
        <div className="px-4 sm:px-6 pt-4 pb-2">
          <TabsList className="grid w-full grid-cols-3 bg-muted/30 backdrop-blur-sm border border-border/30 rounded-xl p-1">
            <TabsTrigger 
              value="unread" 
              data-testid="tab-unread"
              className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-md transition-all duration-200"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="font-medium">Unread</span>
                <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full font-semibold">
                  {unreadNotes.length}
                </span>
              </div>
            </TabsTrigger>
            <TabsTrigger 
              value="all" 
              data-testid="tab-all"
              className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-md transition-all duration-200"
            >
              <span className="font-medium">All Notes</span>
            </TabsTrigger>
            <TabsTrigger 
              value="read" 
              data-testid="tab-read"
              className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-md transition-all duration-200"
            >
              <span className="font-medium">Read</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="unread" className="flex-1 mt-0 overflow-y-auto">
          {/* Mobile: Single column layout */}
          <div className="md:hidden px-4 sm:px-6 space-y-4 pb-[calc(env(safe-area-inset-bottom)+80px)]">
            {unreadNotes.length > 0 ? (
              unreadNotes.map((note, index) => (
                <div
                  key={note.id}
                  className="animate-in slide-in-from-bottom-4 duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <NoteCard
                    {...note}
                    onClick={() => handleNoteClick(note.id)}
                  />
                </div>
              ))
            ) : (
              <div className="text-center py-16">
                <div className="mb-4">
                  <Sparkles className="h-16 w-16 text-muted-foreground/30 mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">All caught up!</h3>
                <p className="text-muted-foreground">No unread notes to display</p>
              </div>
            )}
          </div>
          
          {/* Desktop/Tablet: Split-view layout */}
          <div className="hidden md:flex h-full">
            {/* Left Panel - Notes List */}
            <div className="w-1/2 lg:w-2/5 border-r border-border overflow-y-auto">
              <div className="p-4 lg:p-6 space-y-4">
                {unreadNotes.length > 0 ? (
                  unreadNotes.map((note, index) => (
                    <div
                      key={note.id}
                      className={cn(
                        "cursor-pointer transition-all duration-200 rounded-lg border",
                        selectedNote === note.id 
                          ? "ring-2 ring-primary border-primary bg-primary/5" 
                          : "border-border hover:border-primary/50 hover:bg-muted/30"
                      )}
                      onClick={() => handleNoteClick(note.id)}
                    >
                      <NoteCard {...note} onClick={() => handleNoteClick(note.id)} />
                    </div>
                  ))
                ) : (
                  <div className="text-center py-16">
                    <div className="mb-4">
                      <Sparkles className="h-16 w-16 text-muted-foreground/30 mx-auto" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">All caught up!</h3>
                    <p className="text-muted-foreground">No unread notes to display</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Right Panel - Note Detail */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-4 lg:p-6">
                <NoteDetail 
                  note={getSelectedNoteData()} 
                  onMarkAsRead={handleMarkAsRead}
                />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="all" className="flex-1 mt-0 overflow-y-auto">
          {/* Mobile: Single column layout */}
          <div className="md:hidden px-4 sm:px-6 space-y-4 pb-[calc(env(safe-area-inset-bottom)+80px)]">
            {filteredNotes.map((note, index) => (
              <div
                key={note.id}
                className="animate-in slide-in-from-bottom-4 duration-300"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <NoteCard
                  {...note}
                  onClick={() => handleNoteClick(note.id)}
                />
              </div>
            ))}
          </div>
          
          {/* Desktop/Tablet: Split-view layout */}
          <div className="hidden md:flex h-full">
            {/* Left Panel - Notes List */}
            <div className="w-1/2 lg:w-2/5 border-r border-border overflow-y-auto">
              <div className="p-4 lg:p-6 space-y-4">
                {filteredNotes.map((note, index) => (
                  <div
                    key={note.id}
                    className={cn(
                      "cursor-pointer transition-all duration-200 rounded-lg border",
                      selectedNote === note.id 
                        ? "ring-2 ring-primary border-primary bg-primary/5" 
                        : "border-border hover:border-primary/50 hover:bg-muted/30"
                    )}
                    onClick={() => handleNoteClick(note.id)}
                  >
                    <NoteCard {...note} onClick={() => handleNoteClick(note.id)} />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right Panel - Note Detail */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-4 lg:p-6">
                <NoteDetail 
                  note={getSelectedNoteData()} 
                  onMarkAsRead={handleMarkAsRead}
                />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="read" className="flex-1 mt-0 overflow-y-auto">
          {/* Mobile: Single column layout */}
          <div className="md:hidden px-4 sm:px-6 space-y-4 pb-[calc(env(safe-area-inset-bottom)+80px)]">
            {readNotes.length > 0 ? (
              readNotes.map((note, index) => (
                <div
                  key={note.id}
                  className="animate-in slide-in-from-bottom-4 duration-300"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <NoteCard
                    {...note}
                    onClick={() => handleNoteClick(note.id)}
                  />
                </div>
              ))
            ) : (
              <div className="text-center py-16">
                <div className="mb-4">
                  <FileText className="h-16 w-16 text-muted-foreground/30 mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">No read notes yet</h3>
                <p className="text-muted-foreground">Start reading to see notes here</p>
              </div>
            )}
          </div>
          
          {/* Desktop/Tablet: Split-view layout */}
          <div className="hidden md:flex h-full">
            {/* Left Panel - Notes List */}
            <div className="w-1/2 lg:w-2/5 border-r border-border overflow-y-auto">
              <div className="p-4 lg:p-6 space-y-4">
                {readNotes.length > 0 ? (
                  readNotes.map((note, index) => (
                    <div
                      key={note.id}
                      className={cn(
                        "cursor-pointer transition-all duration-200 rounded-lg border",
                        selectedNote === note.id 
                          ? "ring-2 ring-primary border-primary bg-primary/5" 
                          : "border-border hover:border-primary/50 hover:bg-muted/30"
                      )}
                      onClick={() => handleNoteClick(note.id)}
                    >
                      <NoteCard {...note} onClick={() => handleNoteClick(note.id)} />
                    </div>
                  ))
                ) : (
                  <div className="text-center py-16">
                    <div className="mb-4">
                      <FileText className="h-16 w-16 text-muted-foreground/30 mx-auto" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">No read notes yet</h3>
                    <p className="text-muted-foreground">Start reading to see notes here</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Right Panel - Note Detail */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-4 lg:p-6">
                <NoteDetail 
                  note={getSelectedNoteData()} 
                  onMarkAsRead={handleMarkAsRead}
                />
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}