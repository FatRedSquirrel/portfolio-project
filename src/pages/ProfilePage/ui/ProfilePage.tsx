import { useParams } from 'react-router-dom';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
  ProfileCard,
  profileReducer,
} from '@/entities/Profile';
import { Page } from '@/widgets/Page';
import ProfilePageHeader from './ProfilePageHeader/ProfilePageHeader';
import ProfilePageErrors from './ProfilePageErrors';

const reducers: ReducersList = {
  profile: profileReducer,
};

const ProfilePage = () => {
  const { id } = useParams<{id: string}>();

  if (!id) return null;

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <Page dataTestid='ProfilePage'>
        <ProfilePageHeader />
        <ProfilePageErrors />
        <ProfileCard id={id} />
      </Page>
    </DynamicModuleLoader>
  );
};

export default ProfilePage;
