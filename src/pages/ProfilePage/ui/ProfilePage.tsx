import { useParams } from 'react-router-dom';
import { Page } from '@/widgets/Page';
import { EditableProfileCard } from '@/features/EditableProfileCard/ui/EditableProfileCard/EditableProfileCard';

const ProfilePage = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) return null;

  return (
    <Page dataTestid='ProfilePage'>
      <EditableProfileCard id={id} />
    </Page>
  );
};

export default ProfilePage;
