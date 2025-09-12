import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Image, FileIcon, Clock, Users, Eye } from "lucide-react";

interface NoteDetailProps {
  note?: {
    id: string;
    title: string;
    content: string;
    category: string;
    tags: string[];
    type: "text" | "image" | "pdf";
    isRead: boolean;
    readCount: number;
    createdAt: string;
  } | null;
  onMarkAsRead?: () => void;
}

export default function NoteDetail({ note, onMarkAsRead }: NoteDetailProps) {
  if (!note) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[400px] bg-muted/20 rounded-lg border-2 border-dashed border-muted-foreground/20">
        <div className="text-center space-y-3">
          <FileText className="h-12 w-12 mx-auto text-muted-foreground/40" />
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-muted-foreground">Select a note</h3>
            <p className="text-sm text-muted-foreground/70">Choose a note from the list to read its content</p>
          </div>
        </div>
      </div>
    );
  }

  const getTypeIcon = () => {
    switch (note.type) {
      case "image": return <Image className="h-5 w-5" />;
      case "pdf": return <FileIcon className="h-5 w-5" />;
      default: return <FileText className="h-5 w-5" />;
    }
  };

  const getCategoryStyle = () => {
    const styles = {
      "Training": "bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-700 dark:text-blue-300 border-blue-500/30",
      "Policy": "bg-gradient-to-r from-green-500/20 to-green-600/20 text-green-700 dark:text-green-300 border-green-500/30",
      "Update": "bg-gradient-to-r from-orange-500/20 to-orange-600/20 text-orange-700 dark:text-orange-300 border-orange-500/30",
      "General": "bg-gradient-to-r from-gray-500/20 to-gray-600/20 text-gray-700 dark:text-gray-300 border-gray-500/30"
    };
    return styles[note.category as keyof typeof styles] || styles.General;
  };

  const expandedContent = `${note.content}\n\nThis is an expanded view of the note content. In a real application, this would contain the full document content, potentially with rich formatting, embedded media, or structured data depending on the note type.\n\nFor PDF documents, this would show the document viewer. For image notes, this would display the full image gallery. For text notes like this one, it would show the complete formatted content with proper typography and layout.`;

  return (
    <div className="flex-1 space-y-4 sm:space-y-6">
      {/* Note Header */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3 flex-1">
              <div className="p-2 bg-primary/10 rounded-lg">
                {getTypeIcon()}
              </div>
              <div className="flex-1">
                <CardTitle className="text-xl sm:text-2xl leading-tight mb-2">
                  {note.title}
                </CardTitle>
                <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                  <Badge variant="secondary" className={`font-medium border ${getCategoryStyle()}`}>
                    {note.category}
                  </Badge>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {note.createdAt}
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {note.readCount} readers
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {!note.isRead && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <Badge variant="default" className="bg-primary/10 text-primary font-medium">
                    New
                  </Badge>
                </div>
              )}
              {!note.isRead && onMarkAsRead && (
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={onMarkAsRead}
                  className="ml-2"
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Mark as Read
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Tags */}
      <Card>
        <CardContent className="p-4 sm:p-6">
          <h3 className="font-semibold mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {note.tags.map((tag) => (
              <Badge 
                key={tag} 
                variant="outline" 
                className="bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Note Content */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Content</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="prose prose-sm sm:prose max-w-none">
            {note.type === "text" ? (
              <div className="whitespace-pre-wrap text-foreground leading-relaxed">
                {expandedContent}
              </div>
            ) : note.type === "image" ? (
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">{note.content}</p>
                <div className="bg-muted/20 rounded-lg p-8 text-center">
                  <Image className="h-16 w-16 mx-auto text-muted-foreground/40 mb-4" />
                  <p className="text-sm text-muted-foreground">Image gallery would be displayed here</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">{note.content}</p>
                <div className="bg-muted/20 rounded-lg p-8 text-center">
                  <FileIcon className="h-16 w-16 mx-auto text-muted-foreground/40 mb-4" />
                  <p className="text-sm text-muted-foreground">PDF document viewer would be displayed here</p>
                  <Button variant="outline" size="sm" className="mt-4">
                    Download PDF
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}