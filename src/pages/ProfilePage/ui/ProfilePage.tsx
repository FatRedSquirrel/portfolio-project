import { useParams } from 'react-router-dom';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
  profileReducer,
} from '@/entities/Profile';
import { Page } from '@/widgets/Page';
import { EditableProfileCard } from '@/features/EditableProfileCard/ui/EditableProfileCard/EditableProfileCard';

const reducers: ReducersList = {
  profile: profileReducer,
};

const ProfilePage = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) return null;

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <Page dataTestid='ProfilePage'>
        {/* <ProfilePageHeader />
        <ProfilePageErrors />
        <ProfileCard /> */}
        <EditableProfileCard id={id} />
      </Page>
    </DynamicModuleLoader>
  );
};

export default ProfilePage;
