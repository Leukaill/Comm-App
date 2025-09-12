import UserAvatar from '../UserAvatar';

export default function UserAvatarExample() {
  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-4">
        <UserAvatar name="John Doe" size="sm" showStatus status="online" />
        <UserAvatar name="Sarah Wilson" size="md" showStatus status="away" />
        <UserAvatar name="Michael Chen" size="lg" showStatus status="busy" />
      </div>
      <div className="flex items-center gap-4">
        <UserAvatar name="Alice Johnson" size="md" />
        <UserAvatar name="Robert Smith" size="md" />
        <UserAvatar name="Emma Davis" size="md" />
      </div>
    </div>
  );
}